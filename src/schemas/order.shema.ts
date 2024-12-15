import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class OrderProduct {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;
}

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  useremail: string;

  @Prop({ required: true, type: [OrderProduct] })
  products: OrderProduct[];

  @Prop({ required: true })
  total: number;

  @Prop({ required: true, default: 'pending' })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

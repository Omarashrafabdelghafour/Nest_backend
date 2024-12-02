import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  user: string;  // User who placed the order (User ID)

  @Prop({ required: true, type: [{ type: String, ref: 'Product' }] })
  products: string[];  // List of product IDs in the order

  @Prop({ required: true })
  total: number;  // Total amount for the order

  @Prop({ required: true, default: 'pending' })
  status: string;  // Order status (e.g., pending, completed)
}

export const OrderSchema = SchemaFactory.createForClass(Order);

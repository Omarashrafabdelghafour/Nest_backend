import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../schemas/user.shema'; // Assuming you have a User schema

@Schema()
export class Review extends Document {
  @Prop({ required: true })
  user: string;  // User who made the review (User ID)

  @Prop({ required: true })
  rating: number;  // Rating (1 to 5)

  @Prop({ required: true })
  comment: string;  // Review comment

  @Prop({ required: false, type: String })
  product?: string;  // Optional reference to a product (if it's a product review)

  @Prop({ default: Date.now })
  createdAt: Date;  // Timestamp for when the review was created
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

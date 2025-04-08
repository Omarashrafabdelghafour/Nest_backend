import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';  // Import ReviewModule
import { OrderModule } from './order/order.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true ,}),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    ProductModule,
    ReviewModule,
    MessagesModule, 
    OrderModule // Add ReviewModule here
  ],
})
export class AppModule {}

export { AuthModule };

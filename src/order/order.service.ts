import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.shema';
import { CreateOrderDto } from '../Dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<{ orderId: string; total: number }> {
    const { products, useremail } = createOrderDto;

    // Calculate the total amount
    const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

    // Create the order
    const order = new this.orderModel({
      useremail,
      products,
      total,
      status: 'pending',
    });

    // Save the order to the database
    const savedOrder = await order.save();

    return { orderId: savedOrder._id.toString(), total };
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }
}

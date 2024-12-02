import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.shema';
import { Product } from '../schemas/product.shema';
import { CreateOrderDto } from '../Dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { products, user } = createOrderDto;

    // Retrieve the products from the database
    const productsInOrder = await this.productModel.find({ _id: { $in: products } });

    if (productsInOrder.length !== products.length) {
      throw new Error('One or more products not found');
    }

    // Calculate the total amount for the order
    const total = productsInOrder.reduce((sum, product) => sum + product.price, 0);

    // Create the order
    const order = new this.orderModel({
      user,  // Attach the user ID
      products,
      total,
      status: 'pending',
    });

    // Save the order to the database
    return order.save();
  }
}

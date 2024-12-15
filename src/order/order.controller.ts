import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../Dto/order.dto';
import { AuthenticationGuard } from '../auth/authentication.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthenticationGuard)
  @Post('create')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const { orderId, total } = await this.orderService.createOrder(createOrderDto);

    return {
      message: 'Order created successfully',
      orderId,
      total,
    };
  }

  @Get('get_all_orders')
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }
}

import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../Dto/order.dto';
import { AuthenticationGuard } from '../auth/authentication.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthenticationGuard)
  @Post('create')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req,
  ) {
    const userId = req.user.sub;  // Extract user ID from JWT token (req.user)
    createOrderDto.user = userId;  // Attach the user ID to the DTO

    return this.orderService.createOrder(createOrderDto);  // Call service to create the order
  }
}

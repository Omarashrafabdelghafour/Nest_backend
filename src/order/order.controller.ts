import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../Dto/order.dto';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('orders')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Post('create')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const { orderId, total } = await this.orderService.createOrder(createOrderDto);

    return {
      message: 'Order created successfully',
      orderId,
      total,
    };
  }
@ApiBearerAuth()
@UseGuards(AuthenticationGuard,RolesGuard)
@Roles("Admin")
  @Get('get_all_orders')
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }
  @UseGuards(AuthenticationGuard)
  @Get(':useremail')
  async getOrderByEmail(@Param('useremail') useremail: string) {
    return this.orderService.getOrderByEmail(useremail);
  }
  
}

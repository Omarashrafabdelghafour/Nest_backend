import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../Dto/order.dto';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

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
  @Roles("Admin")  // Only allow access to users with the 'Admin' role
  @UseGuards(RolesGuard)  // Apply the RolesGuard for role-based access control
  @Get('get_all_order')
  async getAllOrders() {
    return this.orderService.getAllOrders();  // Retrieve all orders
  }
}

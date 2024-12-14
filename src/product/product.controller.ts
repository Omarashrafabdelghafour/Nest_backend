import { Controller, Post, Body, UseGuards, Req, Patch, Param, Get, Delete, Query, BadRequestException } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from '../Dto/product.dto';
import { AuthenticationGuard } from '../auth/authentication.guard';

@Controller('products')

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Add a new product with an image URL
  @UseGuards(AuthenticationGuard)
  @Post('add')
  async addProduct(
    @Body() productDto: ProductDto,
    @Req() req,
  ) {
    const ownertoken = req.user;  // Full JWT token from the request (set by the guard)
    return this.productService.addProduct(productDto, ownertoken);
  }

  // Update an existing product with an image URL
  @Patch(':id')
  @UseGuards(AuthenticationGuard)
  async updateProduct(
    @Param('id') id: string,
    @Body() productDto: Partial<ProductDto>,
    @Req() req,
  ) {
    const ownertoken = req.user;  // Full JWT token from the request (set by the guard)
    return this.productService.updateProduct(id, productDto, ownertoken);
  }

  // Delete a product
  @Delete(':id')
  @UseGuards(AuthenticationGuard)
  async deleteProduct(@Param('id') id: string, @Req() req) {
    const ownertoken = req.user;  // JWT token data (decoded) is stored in `req.user` by AuthenticationGuard
    return this.productService.deleteProduct(id, ownertoken);  // Pass product ID and JWT token data (ownertoken) to service
  }

  // Get all products
  @Get('get_all_product')
  async getAllProduct(@Req() req) {
    const products = await this.productService.getAllProducts();
    return products;
  }

  @Get('/search')
  search(@Query('key') key) {
    return this.productService.searchProduct(key);
  }

   }


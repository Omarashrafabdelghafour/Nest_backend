import { Controller, Post, Body, UseGuards, UseInterceptors, UploadedFile, Req, Patch, Param, Get, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ProductService } from './product.service';
import { ProductDto } from '../Dto/product.dto';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('products')
@UseGuards(AuthenticationGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Add a new product with an image
  @Post('add')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueSuffix);
        },
      }),
    }),
  )
  async addProduct(
    @Body() productDto: ProductDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    const imagePath = file ? file.path : null; 
    const ownertoken = req.user;  // Full JWT token from the request (set by the guard)
    return this.productService.addProduct(productDto, imagePath, ownertoken);
  }

  // Update an existing product
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueSuffix);
        },
      }),
    }),
  )
  async updateProduct(
    @Param('id') id: string,
    @Body() productDto: Partial<ProductDto>,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    const imagePath = file ? file.path : null;
    const ownertoken = req.user;  // Full JWT token from the request (set by the guard)
    return this.productService.updateProduct(id, productDto, imagePath, ownertoken);
  }
  @Delete(':id')
  async deleteProduct(@Param('id') id: string, @Req() req) {
    const ownertoken = req.user; // JWT token data (decoded) is stored in `req.user` by AuthenticationGuard
    return this.productService.deleteProduct(id, ownertoken); // Pass product ID and JWT token data (ownertoken) to service
  }

  // Get all products
  @Get('get_all_product')
  async getAllProduct() {
    return this.productService.get_product();
  }
}

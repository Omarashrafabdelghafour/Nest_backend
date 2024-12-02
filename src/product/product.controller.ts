import {
    Controller,
    Post,
    Body,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Req,
    Patch,
    Param,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { ProductService } from './product.service';
  import { ProductDto } from '../Dto/product.dto';
  import { AuthenticationGuard } from '../auth/authentication.guard';
  import { v4 as uuidv4 } from 'uuid';
  import { extname } from 'path';
  
  @Controller('products')
  export class ProductController {
    constructor(private readonly productService: ProductService) {}
  
    @UseGuards(AuthenticationGuard)
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
      const imagePath = file ? file.path : null; // Save the image path in the DB
      const ownertoken = req.user.sub; // Use sub from JWT as the ownertoken
      return this.productService.addProduct(productDto, imagePath, ownertoken);
    }
  
    @UseGuards(AuthenticationGuard)
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
      const ownertoken = req.user.sub; // Use sub from JWT as the ownertoken
      return this.productService.updateProduct(id, productDto, imagePath, ownertoken);
    }
  }
  
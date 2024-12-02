import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.shema';
import { ProductDto } from '../Dto/product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

  async addProduct(
    productDto: ProductDto,
    image: string,
    ownertoken: string,
  ): Promise<Product> {
    const newProduct = new this.productModel({
      ...productDto,
      image,
      Ownertoken: ownertoken,
    });
    return newProduct.save();
  }

  async updateProduct(
    id: string,
    productDto: Partial<ProductDto>,
    image: string,
    ownertoken: string,
  ): Promise<Product> {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (product.Ownertoken !== ownertoken) {
      throw new ForbiddenException(`You are not authorized to update this product`);
    }

    Object.assign(product, { ...productDto, image });
    return product.save();
  }
}

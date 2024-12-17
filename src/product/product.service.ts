import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.shema';
import { ProductDto } from '../Dto/product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

  async deleteProduct(id: string, ownertoken: any): Promise<string> {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (product.Ownertoken !== ownertoken.sub) {
      throw new ForbiddenException('You are not authorized to delete this product');
    }

    await product.deleteOne({ _id: id });

    return `Product with ID ${id} has been deleted successfully`;
  }

  async addProduct(productDto: ProductDto, ownertoken: string): Promise<Product> {
    const newProduct = new this.productModel({
      ...productDto,
      Ownertoken: ownertoken,
    });

    return newProduct.save();
  }

  async updateProduct(
    id: string,
    productDto: Partial<ProductDto>,
    ownertoken: string,
  ): Promise<Product> {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (product.Ownertoken !== ownertoken) {
      throw new ForbiddenException('You are not authorized to update this product');
    }

    Object.assign(product, productDto);
    return product.save();
  }

  async getAllProducts() {
    return this.productModel.find().exec();
  }

  async searchProduct(key: string) {
    if (!key) return [];
  
    const isNumeric = !isNaN(Number(key)); // Check if the key is numeric
  
    // If the key is numeric, match exactly on the price field.
    const keyword = isNumeric
      ? { price: Number(key) } // Exact match for numeric key (price)
      : {
          $or: [
            { category: { $regex: key, $options: 'i' } }, // Case-insensitive search for category
            // No regex search for price when key is a string
          ],
        };
  
    return await this.productModel.find(keyword);
  }
  

  

  
}

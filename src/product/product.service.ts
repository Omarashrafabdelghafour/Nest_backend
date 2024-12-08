import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.shema';
import { ProductDto } from '../Dto/product.dto';
import { th } from '@faker-js/faker';

@Injectable()
export class ProductService {

  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}
  async deleteProduct(id: string, ownertoken: any): Promise<string> {
    // Find the product by its ID
    const product = await this.productModel.findById(id);

    // If product is not found, throw a NotFoundException
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  
    // Check if the user making the request is the product owner (compare sub from the JWT to the Ownertoken)
    if (product.Ownertoken !== ownertoken.sub) { // 'sub' in JWT is the user ID or email
      throw new ForbiddenException('You are not authorized to delete this product');
    }
  
    // If authorized, delete the product
    await product.deleteOne({ _id: id });
  
    // Return a success message
    return `Product with ID ${id} has been deleted successfully`;
  }
  // Add a new product
  async addProduct(
    productDto: ProductDto,
    image: string,
    ownertoken: string,  // The full JWT token
  ): Promise<Product> {
    const newProduct = new this.productModel({
      ...productDto,
      image,
      Ownertoken: ownertoken,  // Store the full JWT token in Ownertoken
    });
    return newProduct.save();
  }

  // Update an existing product
  async updateProduct(
    id: string,
    productDto: Partial<ProductDto>,
    image: string,
    ownertoken: string,  // The full JWT token
  ): Promise<Product> {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Check if the user is the owner (compare the full JWT token with Ownertoken)
    if (product.Ownertoken !== ownertoken) {
      throw new ForbiddenException(`You are not authorized to update this product`);
    }

    // Update the product with new details
    Object.assign(product, { ...productDto, image });
    return product.save();
  }

  // Get all products
  async get_product() {
    return this.productModel.find().exec();
  }

}

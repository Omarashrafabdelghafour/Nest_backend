import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  products: string[];  // List of product IDs

  @IsNotEmpty()
  @IsString()
  user: string;  // User ID, passed from the JWT token
}

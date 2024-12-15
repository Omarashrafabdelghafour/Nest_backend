import { IsArray, IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductInput {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  quantity: number;
}

export class CreateOrderDto {
  @IsEmail()
  @IsNotEmpty()
  useremail: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductInput)
  products: ProductInput[];
}

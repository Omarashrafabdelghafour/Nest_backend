import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  user: string;  // User ID (from the JWT token)

  @IsNotEmpty()
  @IsNumber()
  rating: number;  // Rating (1 to 5)

  @IsNotEmpty()
  @IsString()
  comment: string;  // Review comment

  @IsOptional()
  @IsString()
  product?: string;  // Optional product ID (if the review is for a product)
}

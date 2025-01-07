import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength,Matches } from "class-validator";

export class userDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'The password for the user',
  })
  @IsNotEmpty()
  @MinLength(5, { message: 'Password must be at least 5 characters long' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).{5,}$/, {
    message: 'Password must contain at least one letter and one number',
  })
  password: string;


  @IsNotEmpty()
  username: string;


 
  role: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

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
  @MinLength(4)
  password: string;


  @IsNotEmpty()
  username: string;


  @IsNotEmpty()
  role: string;
}

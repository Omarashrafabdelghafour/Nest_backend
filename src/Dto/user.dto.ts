import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength,Matches, IsOptional } from "class-validator";

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


  @IsOptional()
  username: string;


 
  role: string;
}
export class logindto {
@IsEmail()  
email:string;

@IsNotEmpty()
password:string;

@IsOptional() // 👈 This makes username optional
username?: string;
}

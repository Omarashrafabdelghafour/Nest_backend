import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class userDto{
    @IsEmail()
    email: string;
  
    
    @MinLength(4)
    password: string;
 
    username: string;
    role:string
  }

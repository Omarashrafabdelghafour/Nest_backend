
import { Controller, Post, Body,Get, Param,Delete,Res ,Query, Patch,UsePipes, ValidationPipe, Redirect, HttpCode, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { userDto } from 'src/Dto/user.dto';
import { Http2ServerResponse } from 'http2';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationGuard } from './authentication.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Response } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

// import { Role } from 'src/decorators/roles.decorator';
// import { AuthorizationGuard } from './authorization.guard';
@Controller('auth')


export class AuthController {
    constructor(private readonly authService: AuthService) {}

   @Get("youtube") 
@Redirect('https://www.youtube.com/',301)
rediredttoutl(){
console.log('redirect to url')

}


    @Post('register')
    async register(@Body() user: userDto) {
      return this.authService.register(user);
    }
  
    @Post('login')
    async login(@Body() user: userDto) {
      return this.authService.login(user);
    }  

    @Get('get_users')
    @UseGuards(AuthenticationGuard)
    FindAll() {
      return this.authService.findAll();
    }
    @ApiBearerAuth()
    @Get('/:id')
    @UseGuards(AuthenticationGuard)
    FindOne(@Param('id') id: string) {
      return this.authService.findOne(id);
    }
    @Patch(':id')
    @UseGuards(AuthenticationGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async updateUser(@Param('id') id: string, @Body() userDto: userDto) {
      return this.authService.update(id,userDto);
    }
  
    @Delete('Delete_all')
    @UseGuards(AuthenticationGuard)
     Delete_all(){
     return this.authService.deleteAll();


     }


   
    @Delete('/:id')
    @UseGuards(AuthenticationGuard, RolesGuard)
    @Roles('Admin')
    Delete(@Param('id') id: string) {
      return this.authService.delete(id);
    }
  
    @Post('/search')
    Search(@Query('key') key) {
      return this.authService.search(key);
    }
  
    @Post('faker')
    Faker() {
      return this.authService.faker();
    }
    @Get("*")
    errorfun(@Res() res: Response) {
      // Set the status to 404 (Not Found)
      res.status(404);
  
      // Option 1: Send a plain text message
      res.send('Page not found');
  
    }
    
}

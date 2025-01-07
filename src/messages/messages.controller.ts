// src/messages/messages.controller.ts
import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiTags } from '@nestjs/swagger';
//import { AuthenticationGuard} from '../../../restapi/src/auth/authentication.guard'
@Controller('messages')
//@UseGuards(AuthenticationGuard)
@ApiTags("Messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('send')
  async sendMessage(
    @Body('senderEmail') senderEmail: string,
    @Body('recipientEmail') recipientEmail: string,
    @Body('content') content: string,
  ) {
    return this.messagesService.sendMessage(senderEmail, recipientEmail, content);
  }

  @Get()
  async getMessages(@Query('email') email: string) {
    return this.messagesService.getMessagesByEmail(email);
  }
  
}

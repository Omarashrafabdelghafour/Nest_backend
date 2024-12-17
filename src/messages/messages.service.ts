import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async sendMessage(
    senderEmail: string,
    recipientEmail: string,
    content: string,
  ): Promise<Message> {
    const message = new this.messageModel({ senderEmail, recipientEmail, content });
    return await message.save();
  }

  async getMessagesByEmail(email: string): Promise<Message[]> {
    return this.messageModel.find({
      $or: [{ senderEmail: email }],
    }).sort({ createdAt: -1 }).exec();
  }

}

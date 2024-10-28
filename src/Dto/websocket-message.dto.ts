import { ApiProperty } from '@nestjs/swagger';

export class WebSocketMessageDto {
  @ApiProperty({ description: 'The message content' })
  message: string;
}
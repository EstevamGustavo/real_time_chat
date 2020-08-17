import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';

import {ChatController} from 'src/controller/chat.Controller'

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [AppGateway],
})
export class AppModule {}

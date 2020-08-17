import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io'

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  
  private logger:Logger = new Logger("appGateway")
 
  handleDisconnect(client: Socket) {
    this.logger.log(`${client.id} disconnect!`)
  }
 
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`${client.id} connect!`)
  }

  afterInit(server: Server) {
    this.logger.log("Gateway started!!")
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    console.log(text);
    
    return {event: "msgToClient" , data: text};
  }
}

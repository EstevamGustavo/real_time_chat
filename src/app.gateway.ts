import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io'

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  
  private logger:Logger = new Logger("appGateway")
 
  handleDisconnect(client: Socket) {
    throw new Error("Method not implemented.");
  }
 
  handleConnection(client: Socket, ...args: any[]) {
    throw new Error("Method not implemented.");
  }

  afterInit(server: Server) {
    this.logger.log("Gateway Connected!!")
  }
  
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    return {event: "msgToClient" , data: text};
  }
}

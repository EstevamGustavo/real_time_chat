import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io'

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() wss: Server;
  
  private logger:Logger = new Logger("appGateway")

  private messages: Array<any> = []

  private usersList: Array<any> = []
 
  handleDisconnect(client: Socket) {
    const index = this.usersList.indexOf(client.id)
    this.usersList.splice(index, 1)
    this.wss.emit("usersList", this.usersList)
    
    this.logger.log(`${client.id} disconnect!`)
  }
 
  handleConnection(client: Socket, ...args: any[]) {
    client.emit("msgToClient" , this.messages)
    this.usersList.push(client.id)
    this.wss.emit("usersList", this.usersList)
    this.logger.log(`${client.id} connect!`)
  }

  afterInit(server: Server) {
    this.logger.log("Gateway started!!")
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): void {
    this.messages.push(text)
    this.wss.emit("msgToClient", this.messages)
  }
}

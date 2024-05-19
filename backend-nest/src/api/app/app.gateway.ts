import {
	SubscribeMessage,
	OnGatewayConnection,
	MessageBody,
	WebSocketGateway,
	WebSocketServer,
	OnGatewayInit,
	OnGatewayDisconnect,
	ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Global, Logger } from '@nestjs/common';
import { MessagesService } from '../messages/messages.service';

@WebSocketGateway({
	cors: {
		origin: '*',
	},
})
@Global()
export class AppGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
	constructor(private readonly messagesService: MessagesService) {}

	@WebSocketServer()
	server: Server;

	private logger: Logger = new Logger('AppGateway');

	@SubscribeMessage('CLIENT:CREATE_MESSAGE')
	async handleSendMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: any): Promise<void> {
		console.log(payload);
		const createdMessage = await this.messagesService.createMessage(payload.text, payload.dialogId, payload.senderId);
		this.server.emit('SERVER:SEND_MESSAGE', createdMessage);
		this.server.emit('SERVER:DIALOG_UPDATE_TIME', createdMessage.createdAt);
	}

	afterInit(server: Server) {
		this.logger.log(server);
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`Client disconnected: ${client.id}`);
	}

	async handleConnection(client: Socket, ...args: any[]) {
		this.logger.log(`Client connected: ${client.id}`);
	}
}

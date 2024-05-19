import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { MessagesService } from '../messages/messages.service';
import { PrismaService } from '#src/common/services';

@Module({
	providers: [AppGateway, MessagesService, PrismaService],
	exports: [AppGateway],
})
export class AppGatewayModule {}

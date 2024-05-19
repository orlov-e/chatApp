import { Module } from '@nestjs/common';
import { DialogsController } from './dialogs.controller';
import { DialogsService } from './dialogs.service';
import { PrismaService } from '#src/common/services';
import { AppGatewayModule } from '../app/app.gateway.module';

@Module({
	imports: [AppGatewayModule],
	providers: [DialogsService, PrismaService],
	controllers: [DialogsController],
})
export class DialogsModule {}

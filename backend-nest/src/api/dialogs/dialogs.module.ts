import { Module } from '@nestjs/common';
import { DialogsController } from './dialogs.controller';
import { DialogsService } from './dialogs.service';
import { PrismaService } from '#src/common/services';

@Module({
	imports: [],
	providers: [DialogsService, PrismaService],
	controllers: [DialogsController],
})
export class DialogsModule {}

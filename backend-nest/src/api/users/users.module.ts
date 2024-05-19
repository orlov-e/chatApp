import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '#common/services/prisma.service';
import { CloudinaryService } from '#src/common/services/cloudinary.service';

@Module({
	imports: [MulterModule.register({})],
	controllers: [UsersController],
	providers: [UsersService, PrismaService, CloudinaryService],
})
export class UsersModule {}

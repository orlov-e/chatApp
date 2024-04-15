import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { PrismaService } from '#common/services/prisma.service';

@Module({
	controllers: [UserController],
	providers: [UsersService, PrismaService],
})
export class UserModule {}

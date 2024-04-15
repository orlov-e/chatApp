import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '#src/api/users/users.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import JwtAuthGuard from './guards/jwt-auth-guard';
import { PrismaService } from '#src/common/services';

@Module({
	imports: [
		JwtModule.register({
			global: true,
		}),
	],
	providers: [
		AuthService,
		UsersService,
		JwtStrategy,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
		PrismaService,
	],
	controllers: [AuthController],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '#src/api/users/users.module';
import { AuthModule } from '#api/auth/auth.module';
import { DialogsModule } from './api/dialogs/dialogs.module';
import { MessagesModule } from './api/messages/messages.module';
import { AppGatewayModule } from './api/app/app.gateway.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: process.env.ENV_PATH,
			isGlobal: true,
		}),
		UsersModule,
		AuthModule,
		DialogsModule,
		MessagesModule,
		AppGatewayModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}

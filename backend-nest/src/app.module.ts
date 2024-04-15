import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '#src/api/users/users.module';
import { AuthModule } from '#api/auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: process.env.ENV_PATH,
			isGlobal: true,
		}),
		UserModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}

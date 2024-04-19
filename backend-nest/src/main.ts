import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './common/services/prisma.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.useGlobalPipes(new ValidationPipe());

	app.setGlobalPrefix('api');
	const config = new DocumentBuilder()
		.setTitle('Chat API')
		.setDescription('The chat API description')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				in: 'header',
				description: 'Auth token for all endpoints.',
			},
			'jwt',
		)
		.setVersion('1.0')
		.addTag('default')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);

	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);
	await app.listen(4000);
}

bootstrap().catch((e) => console.log(e));

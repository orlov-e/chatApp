import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './common/services/prisma.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	const config = new DocumentBuilder()
		.setTitle('Chat API')
		.setDescription('The chat API description')
		.setVersion('1.0')
		.addTag('default')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);

	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);
	await app.listen(3000);
}

bootstrap().catch((e) => console.log(e));

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initialSocket } from './socket/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	initialSocket(app);
	await app.listen(3002);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import open from 'open';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Wallet Service API')
    .setDescription('Simple wallet service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('/', app, document);

await app.listen(3000);
await open('http://localhost:3000/');
}
bootstrap();

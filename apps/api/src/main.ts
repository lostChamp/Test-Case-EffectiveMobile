
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {DocumentBuilder, SwaggerDocumentOptions, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const docPrefix = 'api';
  const config = new DocumentBuilder()
    .setTitle('Test Case For Effective Mobile')
    .setDescription('Test Case For Effective Mobile')
    .setVersion('1.0')
    .addTag('Effective Mobile')
    .build();
  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 8080;
  await app.listen(port);
  Logger.log(
    `🚀 Application API is running on: http://localhost:${port}`
  );
  Logger.log(
    `🚀 Documentation is running on: http://localhost:${port}/${docPrefix}`
  );
}

bootstrap();

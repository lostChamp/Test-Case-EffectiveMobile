/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { UserModule } from './app/user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  await app.init;
  Logger.log(
    `🚀 Application user is running`
  );
}

bootstrap();

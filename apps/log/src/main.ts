/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { LogModule } from './app/log.module';

async function bootstrap() {
  const app = await NestFactory.create(LogModule);
  await app.init;
  Logger.log(
    `🚀 Application log is running`
  );
}

bootstrap();

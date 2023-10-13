import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import {LogEntity, TypeormModuleConfig} from "@case/typeorm";
import {TypeOrmModule} from "@nestjs/typeorm";
import {rmqLogConfig} from "@case/rmq-configs";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModuleConfig,
    TypeOrmModule.forFeature([LogEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqLogConfig())
  ],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AppService } from './user.service';
import {ConfigModule} from "@nestjs/config";
import {LogEntity, TypeormModuleConfig} from "@case/typeorm";
import {TypeOrmModule} from "@nestjs/typeorm";
import {rmqLogConfig} from "@case/rmq-configs";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModuleConfig,
    TypeOrmModule.forFeature([LogEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqLogConfig()),
  ],
  controllers: [UserController],
  providers: [AppService],
})
export class UserModule {}

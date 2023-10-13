import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {UserService} from './user.service';
import {ConfigModule} from "@nestjs/config";
import {TypeormModuleConfig, UserEntity} from "@case/typeorm";
import {TypeOrmModule} from "@nestjs/typeorm";
import {rmqLogConfig} from "@case/rmq-configs";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {UserRepository} from "./user.repository";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModuleConfig,
    TypeOrmModule.forFeature([UserEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqLogConfig()),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}

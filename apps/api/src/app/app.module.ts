import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {ConfigModule} from "@nestjs/config";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {amqpApiConfig} from "@case/rmq-configs";
import {UserModule} from "../../../user/src/app/user.module";
import {LogModule} from "../../../log/src/app/log.module";



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RabbitMQModule.forRoot(RabbitMQModule, amqpApiConfig()),
    UserModule,
    LogModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

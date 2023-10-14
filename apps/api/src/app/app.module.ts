import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {amqpApiConfig} from "@case/rmq-configs";
import {UserModule} from "../../../user/src/app/user.module";
import {LogModule} from "../../../log/src/app/log.module";
import {LogApiGateway} from "./log/api-gateway/log.api-gateway";
import {UserApiGateway} from "./user/api-gateway/user.api-gateway";



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RabbitMQModule.forRoot(RabbitMQModule, amqpApiConfig()),
    UserModule,
    LogModule
  ],
  controllers: [LogApiGateway, UserApiGateway],
  providers: [],
})
export class AppModule {}

import {Body, Controller, HttpCode, HttpException, HttpStatus, Post} from '@nestjs/common';
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import {CreateUserDto} from "./dtos/create.user.dto";
import {createUserRMQConfig} from "@case/rmq-configs";



@Controller("/user")
export class AppController {
  constructor(private readonly amqpConnection: AmqpConnection) {}


  @Post("/create")
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() info: CreateUserDto) {
    try {
      const user = await this.amqpConnection.request({
        ...createUserRMQConfig(),
        payload: info,
      });
      if(user["msg"]) {
        return new HttpException(user["msg"], HttpStatus.BAD_REQUEST);
      }
      return user;
    }catch (e) {
      throw new Error(e)
    }
  }
}

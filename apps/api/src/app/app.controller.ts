import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put
} from '@nestjs/common';
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import {CreateUserDto} from "./dtos/create.user.dto";
import {createUserRMQConfig, getAllUsersRMQConfig} from "@case/rmq-configs";
import {CreateUserContract, GetUsersContract} from "@case/contracts";




@Controller("/user")
export class AppController {
  constructor(private readonly amqpConnection: AmqpConnection) {}


  @Post("/create")
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() info: CreateUserDto) {
    try {
      const user = await this.amqpConnection.request<CreateUserContract.Response>({
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

  @Get("/all")
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    try {
      const users = await this.amqpConnection.request<GetUsersContract.Response>({
        ...getAllUsersRMQConfig(),
      });
      return users;
    }catch (e) {
      throw new Error(e)
    }
  }

  @Put("/edit/:id")
  @HttpCode(HttpStatus.OK)
  async editUser() {
    try {
      const user = await this.amqpConnection.request<GetUsersContract.Response>({
        ...getAllUsersRMQConfig(),
      });
      return user;
    }catch (e) {
      throw new Error(e)
    }
  }
}

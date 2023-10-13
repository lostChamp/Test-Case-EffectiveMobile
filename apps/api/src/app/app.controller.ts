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
import {createUserRMQConfig, editUserRMQConfig, getAllUsersRMQConfig} from "@case/rmq-configs";
import {CreateUserContract, GetUsersContract} from "@case/contracts";
import {EditUserDto} from "./dtos/edit.user.dto";




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
  async editUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() info: EditUserDto
  ) {
    try {
      const user = await this.amqpConnection.request<GetUsersContract.Response>({
        ...editUserRMQConfig(),
        payload: {
          info: info,
          id: id,
        }
      });
      return user;
    }catch (e) {
      throw new Error(e)
    }
  }
}

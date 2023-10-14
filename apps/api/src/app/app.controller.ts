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
  Put, ValidationPipe
} from '@nestjs/common';
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import {CreateUserDto} from "./dtos/create.user.dto";
import {
  createLogRMQConfig,
  createUserRMQConfig,
  editUserRMQConfig,
  getAllLogRMQConfig,
  getAllUsersRMQConfig
} from "@case/rmq-configs";
import {CreateUserContract, EditUserContract, GetUsersContract} from "@case/contracts";
import {EditUserDto} from "./dtos/edit.user.dto";
import {CreateLogDto} from "./dtos/create.log.dto";




@Controller("/user")
export class AppController {
  constructor(private readonly amqpConnection: AmqpConnection) {}


  @Post("/create")
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body(ValidationPipe) info: CreateUserDto) {
    try {
      const user = await this.amqpConnection.request<CreateUserContract.Response>({
        ...createUserRMQConfig(),
        payload: info,
      });
      if(user["msg"]) {
        return new HttpException(user["msg"], HttpStatus.BAD_REQUEST);
      }
      const logInfo: CreateLogDto = {
        user_id: user["id"],
        operation: "CREATE",
      }
      await this.amqpConnection.publish(
        createLogRMQConfig().exchange,
        createLogRMQConfig().routingKey,
        logInfo
      );
      return user;
    }catch (errors) {
      return new Error(errors);
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

  @Get("/allLogs")
  @HttpCode(HttpStatus.OK)
  async getAllLog() {
    try {
      const logs = await this.amqpConnection.request({
        ...getAllLogRMQConfig()
      })
      return logs;
    }catch (e) {
      throw new Error(e);
    }
  }

  @Put("/edit/:id")
  @HttpCode(HttpStatus.OK)
  async editUser(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) info: EditUserDto
  ) {
    try {
      const user = await this.amqpConnection.request<EditUserContract.Response>({
        ...editUserRMQConfig(),
        payload: {
          info: info,
          id: id,
        }
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

import { Controller, Get } from '@nestjs/common';
import {UserService} from './user.service';
import {RabbitRPC} from "@golevelup/nestjs-rabbitmq";

import {Payload} from "@nestjs/microservices";
import {createUserRMQConfig, getAllUsersRMQConfig} from "@case/rmq-configs";
import {CreateUserContract, GetUsersContract} from "@case/contracts";


@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}


  @RabbitRPC(createUserRMQConfig())
  async createUser(@Payload() userInfo: CreateUserContract.Request) {
    const newUser = this.userService.createUser(userInfo);
    return newUser;
  }

  @RabbitRPC(getAllUsersRMQConfig())
  async getAllUsers() {
    const users = this.userService.getAllUsers();
    return users;
  }
}

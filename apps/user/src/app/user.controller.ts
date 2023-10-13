import { Controller, Get } from '@nestjs/common';
import {UserService} from './user.service';
import {RabbitRPC} from "@golevelup/nestjs-rabbitmq";

import {Payload} from "@nestjs/microservices";
import {createUserRMQConfig, editUserRMQConfig, getAllUsersRMQConfig} from "@case/rmq-configs";
import {CreateUserContract, EditUserContract} from "@case/contracts";


@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}


  @RabbitRPC(createUserRMQConfig())
  async createUser(@Payload() userInfo: CreateUserContract.Request) {
    const newUser = await this.userService.createUser(userInfo);
    return newUser;
  }

  @RabbitRPC(getAllUsersRMQConfig())
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return users;
  }

  @RabbitRPC(editUserRMQConfig())
  async editUser(@Payload() infoUser: EditUserContract.Request) {
    const user = await this.userService.editUser(infoUser);
    return user;
  }
}

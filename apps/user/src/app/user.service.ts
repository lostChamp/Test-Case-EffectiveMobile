import {Inject, Injectable} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {CreateUserContract, GetUsersContract} from "@case/contracts";

@Injectable()
export class UserService {

  constructor(@Inject(UserRepository) private userRepository: UserRepository) {}

  async createUser(userInfo: CreateUserContract.Request) {
    const newUser = await this.userRepository.createUser(userInfo);
    return newUser;
  }

  async getAllUsers() {
    const users = await this.userRepository.getAllUsers();
    return users;
  }
}

import {Inject, Injectable} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {CreateUserContract, EditUserContract} from "@case/contracts";

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

  async editUser(userInfo: EditUserContract.Request) {
    const user = await this.userRepository.editUser(userInfo);
    return user;
  }
}

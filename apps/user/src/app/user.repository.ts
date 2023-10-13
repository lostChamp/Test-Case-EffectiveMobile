import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "@case/typeorm";
import {Repository} from "typeorm";
import {CreateUserContract, GetUsersContract} from "@case/contracts";



@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserEntity: Repository<UserEntity>
  ) {}

  async createUser(userInfo: CreateUserContract.Request) {
    const userFlag = await this.UserEntity.findOne({
      where: {
        email: userInfo.email
      },
    });
    if(!userFlag) {
      const tempUser = await this.UserEntity.create({
        ...userInfo,
        created_at: new Date(),
      });
      const newUser: CreateUserContract.Response = await this.UserEntity.save(
        tempUser
      );
      return newUser;
    }else {
      const newUser = {msg: "User already exits"};
      return newUser;
    }
  }

  async getAllUsers() {
    const users = await this.UserEntity.find();
    return users;
  }
}

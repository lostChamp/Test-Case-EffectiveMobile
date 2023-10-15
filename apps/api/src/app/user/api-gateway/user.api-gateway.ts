import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param, ParseIntPipe,
  Post,
  Put,
  ValidationPipe
} from "@nestjs/common";
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import {CreateUserDto} from "../../dtos/create.user.dto";
import {CreateUserContract, EditUserContract, GetUsersContract} from "@case/contracts";
import {
  createLogRMQConfig,
  createUserRMQConfig,
  editUserRMQConfig,
  getAllUsersRMQConfig
} from "@case/rmq-configs";
import {CreateLogDto} from "../../dtos/create.log.dto";
import {EditUserDto} from "../../dtos/edit.user.dto";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('User')
@Controller("/user")
export class UserApiGateway {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post("/create")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'CREATED',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad request" })
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
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'SUCCESS',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad request" })
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
  @ApiOperation({ summary: 'Edit user by id in param' })
  @ApiBody({ type: EditUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'SUCCESS',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad request" })
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
      const logInfo: CreateLogDto = {
        user_id: user["id"],
        operation: "EDIT",
      }
      await this.amqpConnection.publish(
        createLogRMQConfig().exchange,
        createLogRMQConfig().routingKey,
        logInfo
      );
      return user;
    }catch (e) {
      throw new Error(e)
    }
  }

}

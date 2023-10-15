import {Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Query} from "@nestjs/common";
import {GetLogContract, GetUsersContract} from "@case/contracts";
import {getAllLogRMQConfig, getLogsByUserIdRMQConfig} from "@case/rmq-configs";
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {EditUserDto} from "../../dtos/edit.user.dto";

@ApiTags('Logs')
@Controller("/logs")
export class LogApiGateway {

  constructor(private readonly amqpConnection: AmqpConnection) {}
  @Get("/allLogs")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all logs' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'SUCCESS',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad request" })
  async getAllLog() {
    try {
      const logs = await this.amqpConnection.request<GetUsersContract.Response>({
        ...getAllLogRMQConfig()
      })
      return logs;
    }catch (e) {
      throw new Error(e);
    }
  }

  @Get("/:id/:page/:limit")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get logs with pagination' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'SUCCESS',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad request" })
  async getLogByUserId(
    @Param("id", ParseIntPipe) userId: number,
    @Param("page", ParseIntPipe) page: number,
    @Param("limit", ParseIntPipe) limit: number
  ) {
    try {
      const logs = await this.amqpConnection.request<GetLogContract.Response>({
        ...getLogsByUserIdRMQConfig(),
        payload: {userId: userId, page: page, limit: limit}
      });
      return logs;
    }catch (e) {
      throw new Error(e);
    }
  }
}

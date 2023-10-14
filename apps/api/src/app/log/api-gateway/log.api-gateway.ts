import {Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Query} from "@nestjs/common";
import {GetLogContract, GetUsersContract} from "@case/contracts";
import {getAllLogRMQConfig, getLogsByUserIdRMQConfig} from "@case/rmq-configs";
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";

@Controller("/logs")
export class LogApiGateway {

  constructor(private readonly amqpConnection: AmqpConnection) {}
  @Get("/allLogs")
  @HttpCode(HttpStatus.OK)
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
  async getLogByUserId(
    @Param("id", ParseIntPipe) userId: number,
    @Param("page", ParseIntPipe) page: number,
    @Param("limit", ParseIntPipe) limit: number
  ) {
    const logs = await this.amqpConnection.request<GetLogContract.Response>({
      ...getLogsByUserIdRMQConfig(),
      payload: {userId: userId, page: page, limit: limit}
    });
    return logs;
  }
}

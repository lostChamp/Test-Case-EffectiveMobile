import {Controller, Get, HttpCode, HttpStatus} from "@nestjs/common";
import {GetUsersContract} from "@case/contracts";
import {getAllLogRMQConfig} from "@case/rmq-configs";
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


}

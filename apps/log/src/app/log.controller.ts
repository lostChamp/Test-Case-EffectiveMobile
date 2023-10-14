import {Controller, Get, Param} from '@nestjs/common';

import { LogService } from './log.service';
import {RabbitRPC} from "@golevelup/nestjs-rabbitmq";
import {createLogRMQConfig, getAllLogRMQConfig, getLogsByUserIdRMQConfig} from "@case/rmq-configs";
import {Payload} from "@nestjs/microservices";
import {CreateLogContract} from "@case/contracts";

@Controller()
export class LogController {
  constructor(private readonly logService: LogService) {}

  @RabbitRPC(createLogRMQConfig())
  async createLog(@Payload() logInfo: CreateLogContract.Request) {
    await this.logService.createLog(logInfo);
  }

  @RabbitRPC(getAllLogRMQConfig())
  async getAllLogs() {
    const logs = await this.logService.getAllLogs();
    return logs;
  }

  @RabbitRPC(getLogsByUserIdRMQConfig())
  async getLogsByUserId(@Payload() userId: number) {
    const logs = await this.logService.getLogsByUserId(userId);
    return logs;
  }
}

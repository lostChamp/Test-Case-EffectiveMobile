import {Inject, Injectable} from '@nestjs/common';
import {LogRepository} from "./log.repository";
import {CreateLogContract} from "@case/contracts";

@Injectable()
export class LogService {

  constructor(@Inject(LogRepository) private logRepository: LogRepository) {}

  async createLog(logInfo: CreateLogContract.Request) {
    await this.logRepository.createLog(logInfo);
  }

  async getAllLogs() {
    const logs = await this.logRepository.getAllLogs();
    return logs;
  }
}

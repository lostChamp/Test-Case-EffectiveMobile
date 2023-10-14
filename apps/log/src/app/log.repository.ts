import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {LogEntity} from "@case/typeorm";
import {CreateLogContract, GetLogContract} from "@case/contracts";




@Injectable()
export class LogRepository {
  constructor(
    @InjectRepository(LogEntity)
    private readonly LogEntity: Repository<LogEntity>
  ) {}

  async createLog(logInfo: CreateLogContract.Request) {
    const tempLog = await this.LogEntity.create({
      ...logInfo,
      user: {
        id: logInfo.user_id
      },
      created_at: new Date()
    });
    await this.LogEntity.save(tempLog);
  }

  async getAllLogs() {
    const logs = await this.LogEntity.find({
      relations: {
        user: true,
      }
    });
    return logs;
  }

  async getLogsByUserId(info: GetLogContract.Request) {
    const [logs, total] = await this.LogEntity.findAndCount({
      where: {
        user: {
          id: info["userId"]
        }
      },
      relations: {
        user: true
      },
      skip: (info["page"] - 1) * info["limit"],
      take: info["limit"],
    });
    return {
      data: logs,
      total,
      page: info["page"],
      pageCount: Math.ceil(total / info["limit"])
    };
  }

}

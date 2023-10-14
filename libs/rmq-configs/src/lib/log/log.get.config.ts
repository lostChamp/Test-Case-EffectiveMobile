import {RmqConfig} from "../types";

export function getAllLogRMQConfig(): RmqConfig {
  return {
    exchange: 'GetLogExchange',
    routingKey: 'get-all-logs',
    queue: 'GetLogQueue',
  };
}

import {RmqConfig} from "../types";

export function getAllLogRMQConfig(): RmqConfig {
  return {
    exchange: 'GetLogExchange',
    routingKey: 'get-all-logs',
    queue: 'GetLogQueue',
  };
}

export function getLogsByUserIdRMQConfig(): RmqConfig {
  return {
    exchange: 'GetLogExchange',
    routingKey: 'get-logs-by-user-id',
    queue: 'GetLogsByUserId'
  }
}

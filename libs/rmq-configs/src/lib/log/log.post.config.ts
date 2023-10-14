import {RmqConfig} from "../types";

export function createLogRMQConfig(): RmqConfig {
  return {
    exchange: 'PostLogExchange',
    routingKey: 'create-log',
    queue: 'CreateLogQueue',
  };
}

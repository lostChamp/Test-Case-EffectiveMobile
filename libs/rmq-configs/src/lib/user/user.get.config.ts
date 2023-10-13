import {RmqConfig} from "../types";

export function getAllUsersRMQConfig(): RmqConfig {
  return {
    exchange: 'GetUsersExchange',
    routingKey: 'get-all-users',
    queue: 'GetUsersQueue',
  };
}

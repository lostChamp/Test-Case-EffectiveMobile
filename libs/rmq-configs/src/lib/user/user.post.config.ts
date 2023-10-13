import {RmqConfig} from "../types";

export function createUserRMQConfig(): RmqConfig {
  return {
    exchange: 'PostUsersExchange',
    routingKey: 'create-user',
    queue: 'CreateUserQueue',
  };
}

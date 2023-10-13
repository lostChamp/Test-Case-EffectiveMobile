import {RmqConfig} from "../types";

export function editUserRMQConfig(): RmqConfig {
  return {
    exchange: 'PutUsersExchange',
    routingKey: 'edit-user',
    queue: 'EditUserQueue',
  };
}

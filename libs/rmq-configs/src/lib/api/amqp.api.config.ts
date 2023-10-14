import {RabbitMQConfig} from '@golevelup/nestjs-rabbitmq';
import * as process from 'process';

export function amqpApiConfig(): RabbitMQConfig {
  return {
    exchanges: [
      {
        name: 'PostUsersExchange',
        type: 'topic',
      },
      {
        name: 'GetUsersExchange',
        type: 'topic',
      },
      {
        name: 'PutUsersExchange',
        type: 'topic',
      },
      {
        name: 'GetLogExchange',
        type: 'topic'
      },
      {
        name: 'PostLogExchange',
        type: 'topic'
      }
    ],
    uri: "amqp://nestjs:nestjs@localhost:5672",
    connectionInitOptions: {wait: false},
    enableControllerDiscovery: true,
  }
}

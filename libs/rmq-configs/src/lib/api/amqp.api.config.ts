import {RabbitMQConfig} from '@golevelup/nestjs-rabbitmq';
import * as process from 'process';

export function amqpApiConfig(): RabbitMQConfig {
  return {
    exchanges: [
      {
        name: 'PostApiExchange',
        type: 'topic',
      },
      {
        name: 'GetApiExchange',
        type: 'topic',
      }
    ],
    uri: "amqp://nestjs:nestjs@localhost:5672",
    connectionInitOptions: {wait: false},
    enableControllerDiscovery: true,
  }
}

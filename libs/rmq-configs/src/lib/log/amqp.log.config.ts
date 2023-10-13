import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

export function rmqLogConfig(): RabbitMQConfig {
  return {
    exchanges: [
      {
        name: 'GetUsersExchange',
        type: 'topic',
      },
    ],
    uri: "amqp://nestjs:nestjs@localhost:5672",
    connectionInitOptions: { wait: false },
    enableControllerDiscovery: true,
  };
}

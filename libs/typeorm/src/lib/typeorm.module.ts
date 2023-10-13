import { Module } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {LogEntity} from "./entities/log.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        database: configService.get('POSTGRES_DB'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        entities: [
          UserEntity,
          LogEntity
        ],
        autoLoadEntities: true,
        synchronize: true,
      }),

      inject: [ConfigService],
    }),
  ]
})
export class TypeormModuleConfig {}

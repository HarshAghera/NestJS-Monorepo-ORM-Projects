import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private configs: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      host: this.configs.get('MY_SQL_HOST'),
      port: this.configs.get('MY_SQL_PORT'),
      username: this.configs.get('MY_SQL_USERNAME'),
      password: this.configs.get('MY_SQL_PASSWORD'),
      database: this.configs.get('MY_SQL_DATABASE'),
      synchronize: false,
      autoLoadEntities: true,
      // logging: true,
    };
  }
}

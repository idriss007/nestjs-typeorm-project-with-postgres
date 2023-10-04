import { ConfigService } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource } from 'typeorm';

dotenvConfig();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('POSTGRES_HOST'),
  port: configService.getOrThrow('PORT'),
  database: configService.getOrThrow('POSTGRES_DB'),
  username: configService.getOrThrow('POSTGRES_USER'),
  password: configService.getOrThrow('POSTGRES_PASSWORD'),
  migrations: ['migrations/**'],
  entities: ['dist/src/sentences/entities/**/*.entity.js'],
});

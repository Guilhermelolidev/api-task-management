import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Task } from '../../../domain/entities/task.entity';
import { User } from '../../../domain/entities/user.entity';

dotenv.config();

function getDataBaseName() {
  const env = process.env.NODE_ENV || 'development';
  switch (env) {
    case 'production':
      return process.env.DB_DATABASE_PRODUCTION || 'task_management_prod';
    case 'test':
      return process.env.DB_DATABASE_TEST || 'task_management_test';
    case 'development':
    default:
      return process.env.DB_DATABASE_DEVELOPMENT || 'task_management';
  }
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: getDataBaseName(),
  synchronize: true,
  logging: false,
  entities: [Task, User],
  subscribers: [],
  migrations: [],
});

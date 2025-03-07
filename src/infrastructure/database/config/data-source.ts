import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Task } from '../../../domain/entities/task.entity';
import { User } from '../../../domain/entities/user.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true, // Em produção, use migrações em vez de synchronize
  logging: false,
  entities: [User, Task], // Adicione suas entidades aqui
  subscribers: [],
  migrations: [],
});

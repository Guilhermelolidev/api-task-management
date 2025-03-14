import express, { Express } from 'express';
import request from 'supertest';
import { AppDataSource } from '../../src/infrastructure/database/config/typeorm-setup';
import { userRoutes } from '../../src/main/routes/user.routes';

process.env.NODE_ENV = 'test';

describe('UserRoutesIntegration', () => {
  let app: Express;

  beforeAll(async () => {
    await AppDataSource.initialize();

    app = express();
    app.use(express.json());
    app.use(userRoutes);
  });

  afterEach(async () => {
    await AppDataSource.getRepository('User').delete({});
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should return 201 and create a user with valid data', async () => {
    const userDTO = {
      name: 'user_test',
      email: 'user_test@gmail.com',
      password: 'hashed-password',
      role: 'common',
    };

    const response = await request(app)
      .post('/')
      .send(userDTO)
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(201);
    expect(response.body).toBeNull();
  });
});

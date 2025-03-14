process.env.NODE_ENV = 'test';
import express, { Express } from 'express';
import request from 'supertest';
import { User } from '../../src/domain/entities/user.entity';
import { AppDataSource } from '../../src/infrastructure/database/config/typeorm-setup';
import { authRoutes } from '../../src/main/routes/auth.routes';
import { hashPassword } from '../../src/shared/utils/hashPassword';

jest.mock('../../src/shared/utils/auth.ts', () => ({
  comparePassword: jest.fn().mockResolvedValue(true),
  generateJwtToken: jest.fn().mockReturnValue('token-jwt'),
}));

describe('AuthRoutesIngration', () => {
  let app: Express;

  beforeAll(async () => {
    await AppDataSource.initialize();
    app = express();
    app.use(express.json());
    app.use(authRoutes);

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save({
      email: 'user_test@gmail.com',
      password: await hashPassword('hashed-password'),
      name: 'test',
      role: 'admin',
    });
  });

  afterEach(async () => {
    await AppDataSource.getRepository('User').delete({});
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should return 200 and a token if credentials are valid', async () => {
    const loginUserDto = {
      email: 'user_test@gmail.com',
      password: 'hashed-password',
    };

    const response = await request(app)
      .post('/')
      .send(loginUserDto)
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toBe('string');
    expect(response.body).toBe('token-jwt');
  });
});

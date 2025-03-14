import { LoginUserController } from '../../src/application/http/login-user.controller';
import { httpResponse } from '../../src/shared/helpers/httpResponse';
import { mockUserRepository } from '../../src/shared/mocks/repositories';
import * as authModule from '../../src/shared/utils/auth';

jest.mock('../../src/shared/utils/auth', () => ({
  comparePassword: jest.fn().mockResolvedValue(true),
  generateJwtToken: jest.fn().mockResolvedValue('token-jwt'),
}));

describe('LoginUserController', () => {
  let loginUserController: LoginUserController;

  const userDto = {
    email: 'any_email@gmail.com',
    password: 'hashed-password',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    loginUserController = new LoginUserController(mockUserRepository);
  });

  it('must return 200 and a token if user data is valid', async () => {
    mockUserRepository.findByEmail.mockResolvedValue({
      id: 1,
      email: 'any_email@gmail.com',
    });

    const httpRequest = {
      body: userDto,
    };

    const response = await loginUserController.login(httpRequest);

    expect(response).toEqual(httpResponse(200, 'token-jwt'));
  });

  it('must return 400 and a error message if user email is invalid', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    const httpRequest = {
      body: userDto,
    };

    const response = await loginUserController.login(httpRequest);

    expect(response).toEqual(httpResponse(400, 'Invalid credentials'));
  });

  it('must return 400 and a error message if user password is invalid', async () => {
    mockUserRepository.findByEmail.mockResolvedValue({
      id: 1,
      email: 'any_email@gmail.com',
    });

    (authModule.comparePassword as jest.Mock).mockResolvedValue(false);

    const httpRequest = {
      body: userDto,
    };

    const response = await loginUserController.login(httpRequest);

    expect(response).toEqual(httpResponse(400, 'Invalid credentials'));
  });
});

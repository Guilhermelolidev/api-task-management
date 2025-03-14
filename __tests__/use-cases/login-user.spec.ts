import { LoginUserUseCase } from '../../src/domain/use-cases/login-user';
import { Either } from '../../src/shared/errors';
import { mockUserRepository } from '../../src/shared/mocks/repositories';
import * as authModule from '../../src/shared/utils/auth';

jest.mock('../../src/shared/utils/auth', () => ({
  comparePassword: jest.fn().mockResolvedValue(true),
  generateJwtToken: jest.fn().mockResolvedValue('token-jwt'),
}));

describe('LoginUserUseCase', () => {
  let loginUserUseCase: LoginUserUseCase;

  const loginDto = {
    email: 'any_email@gmail.com',
    password: 'hashed-password',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    loginUserUseCase = new LoginUserUseCase(mockUserRepository);
  });

  it('must return token if email and password is valid', async () => {
    mockUserRepository.findByEmail.mockResolvedValue({
      id: 1,
      email: 'any_email@gmail.com',
    });

    const result = await loginUserUseCase.execute(loginDto);

    expect(result.right).toBe('token-jwt');
    expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      'any_email@gmail.com'
    );
    expect(authModule.comparePassword).toHaveBeenCalledTimes(1);
    expect(authModule.generateJwtToken).toHaveBeenCalledTimes(1);
    expect(authModule.generateJwtToken).toHaveBeenCalledWith({
      id: 1,
      email: 'any_email@gmail.com',
    });
  });
  it('must return Either.Left with invalid credentials if user is invalid', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    const result = await loginUserUseCase.execute(loginDto);

    expect(result.left).toEqual(Either.Error('Invalid credentials'));
    expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      'any_email@gmail.com'
    );
    expect(authModule.comparePassword).not.toHaveBeenCalled();
    expect(authModule.generateJwtToken).not.toHaveBeenCalled();
  });
  it('must return Either.Left with invalid credentials if password is invalid', async () => {
    mockUserRepository.findByEmail.mockResolvedValue({
      id: 1,
      email: 'any_email@gmail.com',
    });

    (authModule.comparePassword as jest.Mock).mockResolvedValue(false);

    const result = await loginUserUseCase.execute(loginDto);

    expect(result.left).toEqual(Either.Error('Invalid credentials'));
    expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      'any_email@gmail.com'
    );
    expect(authModule.comparePassword).toHaveBeenCalledTimes(1);
    expect(authModule.generateJwtToken).not.toHaveBeenCalled();
  });
});

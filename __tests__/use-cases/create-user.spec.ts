import { CreateUserUseCase } from '../../src/domain/use-cases/create-user';
import { Either } from '../../src/shared/errors';
import { mockUserRepository } from '../../src/shared/mocks/repositories';
import * as hashPasswordModule from '../../src/shared/utils/hashPassword';

jest.mock('../../src/shared/utils/hashPassword', () => ({
  hashPassword: jest.fn().mockResolvedValue('hashed_password'),
}));

describe('CreateUserUseCase', () => {
  const userData = {
    name: 'any_name',
    email: 'any_email@gmail.com',
    password: 'any_password',
    role: 'admin',
  };

  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    createUserUseCase = new CreateUserUseCase(mockUserRepository);
  });

  test('must create user when e-mail is not in use', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.create.mockResolvedValue(undefined);

    const result = await createUserUseCase.execute(userData);

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      'any_email@gmail.com'
    );
    expect(hashPasswordModule.hashPassword).toHaveBeenCalledWith(
      'any_password'
    );
    expect(mockUserRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'hashed_password',
        role: 'admin',
      })
    );
    expect(result.right).toBeNull();
  });

  test('must return Either.Left if email is in use', async () => {
    mockUserRepository.findByEmail.mockResolvedValue({
      id: 1,
      email: 'any_email@gmail.com',
    });

    const result = await createUserUseCase.execute(userData);

    expect(result.left).toEqual(Either.fieldAlreadyInUse('Email'));
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      'any_email@gmail.com'
    );
    expect(hashPasswordModule.hashPassword).not.toHaveBeenCalled();
    expect(mockUserRepository.create).not.toHaveBeenCalled();
  });
});

import { CreateUserController } from '../../src/application/http/create-user.controller';
import { UserRoles } from '../../src/domain/entities/user.entity';
import { httpResponse } from '../../src/shared/helpers/httpResponse';
import { mockUserRepository } from '../../src/shared/mocks/repositories';

jest.mock('../../src/shared/utils/hashPassword', () => ({
  hashPassword: jest.fn().mockResolvedValue('hashed_password'),
}));

describe('CreateUserController', () => {
  let createUserController: CreateUserController;
  beforeEach(() => {
    jest.clearAllMocks();
    createUserController = new CreateUserController(mockUserRepository);
  });

  it('must return statusCode 201 and null if the user is created', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.create.mockResolvedValue(undefined);

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'hashed_password',
        role: UserRoles.ADMIN,
      },
    };

    const response = await createUserController.create(httpRequest);

    expect(response).toEqual(httpResponse(201, null));
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      'any_email@gmail.com'
    );
    expect(mockUserRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'hashed_password',
        role: UserRoles.ADMIN,
      })
    );
  });

  it('must return statusCode 400 if the user creation fails', async () => {
    mockUserRepository.findByEmail.mockResolvedValue({
      id: 1,
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: 'hashed_password',
      role: UserRoles.ADMIN,
    });

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'hashed_password',
        role: UserRoles.ADMIN,
      },
    };

    const response = await createUserController.create(httpRequest);

    expect(response).toEqual(httpResponse(400, 'Email cannot be used'));
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      'any_email@gmail.com'
    );
    expect(mockUserRepository.create).not.toHaveBeenCalled();
  });
});

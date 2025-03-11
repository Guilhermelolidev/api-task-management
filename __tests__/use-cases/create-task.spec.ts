import { CreateTaskUseCase } from '../../src/domain/use-cases/create-task';
import { Either } from '../../src/shared/errors';
import {
  mockTaskRepository,
  mockUserRepository,
} from '../../src/shared/mocks/repositories';

describe('CreateTaskUseCase', () => {
  const taskData = {
    title: 'any_title',
    description: 'any_description',
    status: 'pending',
    user: 1,
  };

  let createTaskUseCase: CreateTaskUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    createTaskUseCase = new CreateTaskUseCase(
      mockTaskRepository,
      mockUserRepository
    );
  });

  it('must create a task if user exists', async () => {
    const newTask = {
      title: 'any_title',
      description: 'any_description',
      status: 'pending',
      user: {
        id: 1,
        email: 'teste@gmail.com',
        name: 'any_name',
        role: 'admin',
        password: 'hashed-password',
      },
    };

    mockUserRepository.findById.mockResolvedValue({
      id: 1,
      email: 'teste@gmail.com',
      name: 'any_name',
      role: 'admin',
      password: 'hashed-password',
    });

    const result = await createTaskUseCase.execute(taskData);

    expect(mockTaskRepository.create).toHaveBeenCalledWith(
      expect.objectContaining(newTask)
    );
    expect(mockTaskRepository.create).toHaveBeenCalledTimes(1);
    expect(result.right).toEqual(expect.objectContaining(newTask));
  });

  it('must return Either.Left if user does not exists', async () => {
    mockUserRepository.findById.mockResolvedValue(null);

    const result = await createTaskUseCase.execute(taskData);

    expect(result.left).toEqual(Either.Error('User not found'));
    expect(mockTaskRepository.create).not.toHaveBeenCalled();
  });
});

import { TaskStatus } from '../../src/domain/entities/task.entity';
import { UpdateTaskUseCase } from '../../src/domain/use-cases/update-task';
import { Either } from '../../src/shared/errors';
import {
  mockTaskRepository,
  mockUserRepository,
} from '../../src/shared/mocks/repositories';

describe('UpdateTaskUseCase', () => {
  const taskDTO = {
    id: '1',
    title: 'any_task',
    description: 'any_description',
    status: TaskStatus.PENDING,
    user: 1,
  };
  const userExists = {
    id: 1,
    name: 'any_name',
    email: 'any_email@gmail.com',
    password: 'any_password',
    role: 'admin',
  };
  const taskExists = {
    id: 1,
    title: 'teste update1',
    description: 'teste updates1',
    status: 'completed',
  };
  const taskCreated = {
    id: 1,
    title: 'any_task',
    description: 'any_description',
    status: TaskStatus.PENDING,
    user: userExists,
  };

  let updateTaskUseCase: UpdateTaskUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    updateTaskUseCase = new UpdateTaskUseCase(
      mockTaskRepository,
      mockUserRepository
    );
  });

  test('must update the task if task and user exists', async () => {
    mockTaskRepository.findById.mockResolvedValue(taskExists);
    mockUserRepository.findById.mockResolvedValue(userExists);
    mockTaskRepository.update.mockResolvedValue(taskCreated);

    const result = await updateTaskUseCase.execute(taskDTO);

    expect(mockTaskRepository.update).toHaveBeenCalledWith({
      id: 1,
      title: 'any_task',
      description: 'any_description',
      status: TaskStatus.PENDING,
      user: userExists,
    });
    expect(mockTaskRepository.update).toHaveBeenCalledTimes(1);
    expect(result.right).toEqual(expect.objectContaining(taskCreated));
  });
  test('must return Either.Left and a message if task was not found', async () => {
    mockTaskRepository.findById.mockResolvedValue(null);
    const result = await updateTaskUseCase.execute(taskDTO);
    expect(result.left).toEqual(Either.Error('Task not found'));
    expect(mockUserRepository.findById).not.toHaveBeenCalled();
    expect(mockTaskRepository.update).not.toHaveBeenCalled();
  });
  test('must return Either.Left and a message if user was not found', async () => {
    mockTaskRepository.findById.mockResolvedValue(taskExists);
    mockUserRepository.findById.mockResolvedValue(null);
    const result = await updateTaskUseCase.execute(taskDTO);
    expect(result.left).toEqual(Either.Error('User not found'));
    expect(mockTaskRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockTaskRepository.update).not.toHaveBeenCalled();
  });
});

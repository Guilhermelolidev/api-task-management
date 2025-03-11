import { UpdateTaskController } from '../../src/application/http/update-task.controller';
import { TaskStatus } from '../../src/domain/entities/task.entity';
import { httpResponse } from '../../src/shared/helpers/httpResponse';

describe('UpdateTaskController', () => {
  let updateTaskController: UpdateTaskController;

  const mockTaskRepository = {
    findById: jest.fn(),
    list: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  const mockUserRepository = {
    findByEmail: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
  };

  const taskDTO = {
    description: 'any_description',
    status: TaskStatus.PENDING,
    title: 'any_title',
    user: 1,
  };

  const taskUpdated = {
    id: 1,
    description: 'any_description',
    status: TaskStatus.PENDING,
    title: 'any_title',
    user: {
      id: 1,
      email: 'any_email@gmail.com',
      name: 'any_name',
      password: 'hashed-password',
      role: 'admin',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    updateTaskController = new UpdateTaskController(
      mockTaskRepository,
      mockUserRepository
    );
  });

  it('must return 200 and the taskUpdated if the task is updated', async () => {
    mockTaskRepository.findById.mockResolvedValue({
      id: 1,
      title: 'any_title',
    });
    mockUserRepository.findById.mockResolvedValue({
      id: 1,
      email: 'any_email@gmail.com',
    });
    const httpRequest = {
      body: taskDTO,
      params: {
        id: '1',
      },
    };
    mockTaskRepository.update.mockResolvedValue(taskUpdated);
    const response = await updateTaskController.updateTask(httpRequest);

    expect(response).toEqual(httpResponse(200, taskUpdated));
    expect(mockTaskRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockTaskRepository.update).toHaveBeenCalledTimes(1);
  });
  it('must return 400 and error.message if task not found', async () => {
    mockTaskRepository.findById.mockResolvedValue(null);
    const httpRequest = {
      body: taskDTO,
      params: {
        id: '1',
      },
    };
    const response = await updateTaskController.updateTask(httpRequest);

    expect(response).toEqual(httpResponse(400, 'Task not found'));
    expect(mockTaskRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findById).not.toHaveBeenCalled();
    expect(mockTaskRepository.update).not.toHaveBeenCalled();
  });

  it('must return 400 and error.message if user not found', async () => {
    mockTaskRepository.findById.mockResolvedValue({
      id: 1,
      title: 'any_title',
    });
    mockUserRepository.findById.mockResolvedValue(null);
    const httpRequest = {
      body: taskDTO,
      params: {
        id: '1',
      },
    };
    const response = await updateTaskController.updateTask(httpRequest);

    expect(response).toEqual(httpResponse(400, 'User not found'));
    expect(mockTaskRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockTaskRepository.update).not.toHaveBeenCalled();
  });
});

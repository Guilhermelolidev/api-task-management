import { CreateTaskController } from '../../src/application/http/create-task.controller';
import { TaskStatus } from '../../src/domain/entities/task.entity';
import { httpResponse } from '../../src/shared/helpers/httpResponse';

describe('CreateTaskController', () => {
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

  const userExists = {
    id: 1,
    name: 'any_name',
    email: 'any_email@gmail.com',
    password: 'hashed_password',
    role: 'admin',
  };

  let createTaskController: CreateTaskController;

  beforeEach(() => {
    jest.clearAllMocks();
    createTaskController = new CreateTaskController(
      mockTaskRepository,
      mockUserRepository
    );
  });

  test('must return httpResponse 201 and the task if the task is created', async () => {
    mockUserRepository.findById.mockResolvedValue(userExists);
    mockTaskRepository.create.mockResolvedValue(undefined);

    const httpRequest = {
      body: taskDTO,
    };

    const response = await createTaskController.create(httpRequest);

    expect(response).toEqual(
      httpResponse(201, {
        description: 'any_description',
        status: TaskStatus.PENDING,
        title: 'any_title',
        user: {
          id: 1,
          name: 'any_name',
          email: 'any_email@gmail.com',
          password: 'hashed_password',
          role: 'admin',
        },
      })
    );

    expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockTaskRepository.create).toHaveBeenCalledTimes(1);
  });
  
  test('must return httpResponse 400 and error.message if the creation fails', async () => {
    mockUserRepository.findById.mockResolvedValue(null);

    const httpRequest = {
      body: taskDTO,
    };

    const response = await createTaskController.create(httpRequest);

    expect(response).toEqual(httpResponse(400, 'User not found'));
    expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockTaskRepository.create).not.toHaveBeenCalled();
  });
});

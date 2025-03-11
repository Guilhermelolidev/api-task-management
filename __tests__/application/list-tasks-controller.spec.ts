import { ListTasksController } from '../../src/application/http/list-tasks.controller';
import { TaskStatus } from '../../src/domain/entities/task.entity';
import { httpResponse } from '../../src/shared/helpers/httpResponse';
import { mockTaskRepository } from '../../src/shared/mocks/repositories';

describe('CreateUserController', () => {
  const tasks = [
    {
      id: 1,
      title: 'teste update1',
      description: 'teste updates1',
      status: 'completed',
    },
    {
      id: 2,
      title: 'teste update2',
      description: 'teste updates2',
      status: 'completed',
    },
  ];

  let listTasksController: ListTasksController;

  beforeEach(() => {
    jest.clearAllMocks();
    listTasksController = new ListTasksController(mockTaskRepository);
  });

  it('must return 201 and a list of tasks without filter status', async () => {
    mockTaskRepository.list.mockResolvedValue(tasks);
    const httpRequest = {
      query: {},
    };

    const response = await listTasksController.list(httpRequest);

    expect(response).toEqual(httpResponse(201, tasks));
    expect(mockTaskRepository.list).toHaveBeenCalledTimes(1);
  });

  //back here to verify the execute from useCase
  it('must return 201 and a list of tasks filtering by a valid status', async () => {
    const httpRequest = {
      query: {
        status: TaskStatus.COMPLETED,
      },
    };

    const response = await listTasksController.list(httpRequest);

    expect(response).toEqual(httpResponse(201, tasks));
    expect(mockTaskRepository.list).toHaveBeenCalledTimes(1);
  });
});

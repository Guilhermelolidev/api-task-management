import { ListTasksController } from '../../src/application/http/list-tasks.controller';
import { httpResponse } from '../../src/shared/helpers/httpResponse';

describe('CreateUserController', () => {
  const mockTaskRepository = {
    findById: jest.fn(),
    list: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

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
});

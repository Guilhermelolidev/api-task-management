import { DeleteTaskController } from '../../src/application/http/delete-task.controller';
import { httpResponse } from '../../src/shared/helpers/httpResponse';

jest.mock('../../src/shared/utils/hashPassword', () => ({
  hashPassword: jest.fn().mockResolvedValue('hashed_password'),
}));

describe('CreateUserController', () => {
  const mockTaskRepository = {
    findById: jest.fn(),
    list: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const taskExists = {
    id: 1,
    title: 'teste update1',
    description: 'teste updates1',
    status: 'completed',
  };

  let deleteTaskController: DeleteTaskController;
  beforeEach(() => {
    jest.clearAllMocks();
    deleteTaskController = new DeleteTaskController(mockTaskRepository);
  });

  it('must return 200 and a success if task is deleted', async () => {
    mockTaskRepository.findById.mockResolvedValue(taskExists);
    mockTaskRepository.delete.mockResolvedValue(undefined);

    const httpRequest = {
      params: {
        id: '1',
      },
    };

    const response = await deleteTaskController.deleteTask(httpRequest);

    expect(response).toEqual(httpResponse(200, 'Task removed with success'));
    expect(mockTaskRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockTaskRepository.delete).toHaveBeenCalledTimes(1);
  });
  it('must return 400 and a error.message if the creation fails', async () => {
    mockTaskRepository.findById.mockResolvedValue(null);

    const httpRequest = {
      params: {
        id: '1',
      },
    };

    const response = await deleteTaskController.deleteTask(httpRequest);

    expect(response).toEqual(httpResponse(404, 'Task not found'));
    expect(mockTaskRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockTaskRepository.delete).not.toHaveBeenCalled();
  });
});

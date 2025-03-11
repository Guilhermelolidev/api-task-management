import { DeleteTaskUseCase } from '../../src/domain/use-cases/delete-task';
import { Either } from '../../src/shared/errors';

describe('DeleteTaskUseCase', () => {
  const mockTaskRepository = {
    findById: jest.fn(),
    list: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  let deleteTaskUseCase: DeleteTaskUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    deleteTaskUseCase = new DeleteTaskUseCase(mockTaskRepository);
  });

  test('must delete the task and return a message', async () => {
    mockTaskRepository.findById.mockResolvedValue({
      id: 1,
      title: 'teste update1',
      description: 'teste updates1',
      status: 'completed',
    });

    const result = await deleteTaskUseCase.execute('1');

    expect(mockTaskRepository.delete).toHaveBeenCalledWith('1');
    expect(mockTaskRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockTaskRepository.findById).toHaveBeenCalledTimes(1);
    expect(result.right).toBe('Task removed with success');
  });
  test('must return Either.Left and a message if task was not found', async () => {
    mockTaskRepository.findById.mockResolvedValue(null);
    const result = await deleteTaskUseCase.execute('1');
    expect(result.left).toEqual(Either.Error('Task not found'));
    expect(mockTaskRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockTaskRepository.findById).toHaveBeenCalledWith('1');
  });
});

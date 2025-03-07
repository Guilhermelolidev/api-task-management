import { TaskStatus } from '../../src/domain/entities/task.entity';
import { ListTasksUseCase } from '../../src/domain/use-cases/list-tasks';

describe('ListTasksUseCase', () => {
  const mockTaskRepository = {
    findById: jest.fn(),
    list: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  let listTasksUseCase: ListTasksUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    listTasksUseCase = new ListTasksUseCase(mockTaskRepository);
  });

  it('must return tasks filtering without status', async () => {
    mockTaskRepository.list.mockResolvedValue([
      {
        id: 1,
        title: 'teste update',
        description: 'teste updates1',
        status: 'completed',
      },
      {
        id: 2,
        title: 'teste update2',
        description: 'teste updates2',
        status: 'pending',
      },
    ]);

    const result = await listTasksUseCase.execute({});

    expect(result.right).toHaveLength(2);
    expect(result.right[0].id).toBe(1);
    expect(result.right[0].title).toBe('teste update');
    expect(result.right[1].id).toBe(2);
    expect(result.right[1].title).toBe('teste update2');
    expect(mockTaskRepository.list).toHaveBeenCalledTimes(1);
    expect(mockTaskRepository.list).toHaveBeenCalledWith(undefined);
  });

  it('must return tasks filtering by status', async () => {
    mockTaskRepository.list.mockResolvedValue([
      {
        id: 1,
        title: 'teste update',
        description: 'teste updates1',
        status: 'completed',
      },
      {
        id: 2,
        title: 'teste update2',
        description: 'teste updates2',
        status: 'completed',
      },
    ]);

    const result = await listTasksUseCase.execute({
      status: TaskStatus.COMPLETED,
    });

    expect(result.right).toHaveLength(2);
    expect(result.right[0].id).toBe(1);
    expect(result.right[0].title).toBe('teste update');
    expect(result.right[0].status).toBe('completed');
    expect(result.right[1].id).toBe(2);
    expect(result.right[1].title).toBe('teste update2');
    expect(result.right[1].status).toBe('completed');
    expect(mockTaskRepository.list).toHaveBeenCalledTimes(1);
    expect(mockTaskRepository.list).toHaveBeenCalledWith(TaskStatus.COMPLETED);
  });
});

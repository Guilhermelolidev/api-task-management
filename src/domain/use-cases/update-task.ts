import { ITaskRepository } from '../../interfaces/task-repository.interface';
import { IUserRepository } from '../../interfaces/user-repository.interface';
import { Either } from '../../shared/errors';
import { Task } from '../entities/task.entity';

type TaskWithUserId = Omit<Task, 'user' | 'id'> & { user: number; id: string };

export class UpdateTaskUseCase {
  constructor(
    private taskRepository: ITaskRepository,
    private userRepository: IUserRepository
  ) {}

  async execute({
    id,
    title,
    description,
    status,
    user,
  }: TaskWithUserId): Promise<Either> {
    const taskExists = await this.taskRepository.findById(id);

    if (!taskExists) {
      return Either.Left(Either.Error('Task not found'));
    }

    const userExists = await this.userRepository.findById(user);

    if (!userExists) {
      return Either.Left(Either.Error('User not found'));
    }

    const taskCreated = await this.taskRepository.update({
      id: Number(id),
      title,
      description,
      status,
      user: userExists,
    });

    return Either.Right(taskCreated);
  }
}

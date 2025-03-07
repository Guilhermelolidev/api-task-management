import { ITaskRepository } from '../../interfaces/task-repository.interface';
import { IUserRepository } from '../../interfaces/user-repository.interface';
import { Either } from '../../shared/errors';
import { Task } from '../entities/task.entity';

type TaskWithUserId = Omit<Task, 'user'> & { user: number };

export class CreateTaskUseCase {
  constructor(
    private taskRepository: ITaskRepository,
    private userRepository: IUserRepository
  ) {}

  async execute({
    title,
    description,
    status,
    user,
  }: TaskWithUserId): Promise<Either> {
    const userExists = await this.userRepository.findById(user);

    if (!userExists) {
      return Either.Left(Either.Error('User not found'));
    }

    const newTask = new Task();
    newTask.title = title;
    newTask.description = description;
    newTask.status = status;
    newTask.user = userExists;

    await this.taskRepository.create(newTask);

    return Either.Right(newTask);
  }
}

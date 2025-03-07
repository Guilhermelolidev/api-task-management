import { ITaskRepository } from '../../interfaces/task-repository.interface';
import { Either } from '../../shared/errors';
import { TaskStatus } from '../entities/task.entity';

export class ListTasksUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute({ status }: { status?: TaskStatus }): Promise<Either> {
    const tasks = await this.taskRepository.list(status);
    return Either.Right(tasks);
  }
}

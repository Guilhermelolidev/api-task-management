import { ITaskRepository } from '../../interfaces/task-repository.interface';
import { Either } from '../../shared/errors';

export class DeleteTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: string): Promise<Either> {
    const taskExists = await this.taskRepository.findById(id);

    if (!taskExists) {
      return Either.Left(Either.Error('Task not found'));
    }

    await this.taskRepository.delete(id);

    return Either.Right('Task removed with success');
  }
}

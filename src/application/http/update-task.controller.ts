import * as z from 'zod';
import { Task, TaskStatus } from '../../domain/entities/task.entity';
import { UpdateTaskUseCase } from '../../domain/use-cases/update-task';
import { ITaskRepository } from '../../interfaces/task-repository.interface';
import { IUserRepository } from '../../interfaces/user-repository.interface';
import { httpResponse } from '../../shared/helpers/httpResponse';
import { HttpRequest } from '../../shared/types/httpRequest';

const zodValidator = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  description: z.string({
    required_error: 'Description is required',
  }),
  status: z.nativeEnum(TaskStatus),
  user: z.number({
    required_error: 'User is required',
  }),
});

export class UpdateTaskController {
  private updateTaskUseCase: UpdateTaskUseCase;

  constructor(
    taskRepository: ITaskRepository,
    userRepository: IUserRepository
  ) {
    this.updateTaskUseCase = new UpdateTaskUseCase(
      taskRepository,
      userRepository
    );
  }

  async updateTask(httpRequest: HttpRequest) {
    const { id } = httpRequest.params!;
    const { description, title, status, user } = zodValidator.parse(
      httpRequest.body
    );

    const output = await this.updateTaskUseCase.execute({
      id,
      description,
      title,
      status,
      user,
    });

    return output.fold(
      (error: any) => httpResponse(400, error.message),
      (taskUpdated: Task) => httpResponse(200, taskUpdated)
    );
  }
}

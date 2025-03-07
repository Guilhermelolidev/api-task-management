import * as z from 'zod';
import { Task, TaskStatus } from '../../domain/entities/task.entity';
import { CreateTaskUseCase } from '../../domain/use-cases/create-task';
import { ITaskRepository } from '../../interfaces/task-repository.interface';
import { IUserRepository } from '../../interfaces/user-repository.interface';
import { httpResponse } from '../../shared/helpers/httpResponse';
import { HttpRequest } from '../../shared/types/httpRequest';
import { HttpResponse } from '../../shared/types/httpResponse';

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

export class CreateTaskController {
  private createTaskUseCase: CreateTaskUseCase;

  constructor(
    taskRepository: ITaskRepository,
    userRepository: IUserRepository
  ) {
    this.createTaskUseCase = new CreateTaskUseCase(
      taskRepository,
      userRepository
    );
  }

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { description, status, title, user } = zodValidator.parse(
      httpRequest.body
    );

    const output = await this.createTaskUseCase.execute({
      description,
      status,
      title,
      user,
    });

    return output.fold(
      (error: any) => httpResponse(400, error.message),
      (task: Task) => httpResponse(201, task)
    );
  }
}

import * as z from 'zod';
import { Task, TaskStatus } from '../../domain/entities/task.entity';
import { ListTasksUseCase } from '../../domain/use-cases/list-tasks';
import { ITaskRepository } from '../../interfaces/task-repository.interface';
import { httpResponse } from '../../shared/helpers/httpResponse';
import { HttpRequest } from '../../shared/types/httpRequest';
import { HttpResponse } from '../../shared/types/httpResponse';

const zodValidator = z.object({
  status: z.nativeEnum(TaskStatus).optional(),
});

export class listTasksController {
  private listTasksUseCase: ListTasksUseCase;

  constructor(taskRepository: ITaskRepository) {
    this.listTasksUseCase = new ListTasksUseCase(taskRepository);
  }

  async list(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { status } = zodValidator.parse(httpRequest.query);

    const output = await this.listTasksUseCase.execute({
      status,
    });

    return output.fold(
      (error: any) => httpResponse(400, error.message),
      (tasks: Task[]) => httpResponse(201, tasks)
    );
  }
}

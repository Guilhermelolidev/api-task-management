import { DeleteTaskUseCase } from '../../domain/use-cases/delete-task';
import { ITaskRepository } from '../../interfaces/task-repository.interface';
import { httpResponse } from '../../shared/helpers/httpResponse';
import { HttpRequest } from '../../shared/types/httpRequest';
import { HttpResponse } from '../../shared/types/httpResponse';

export class DeleteTaskController {
  private deleteTaskUseCase: DeleteTaskUseCase;

  constructor(taskRepository: ITaskRepository) {
    this.deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
  }

  async deleteTask(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params!;
    const output = await this.deleteTaskUseCase.execute(id);

    return output.fold(
      (error: any) => httpResponse(404, error.message),
      (success: string) => httpResponse(200, success)
    );
  }
}

import { ListTasksController } from '../../application/http/list-tasks.controller';
import { TaskRepositoryImpl } from '../../infrastructure/database/repositories/task.repository';
import { HttpRequest } from '../../shared/types/httpRequest';

export async function listTasksComposer(httpRequest: HttpRequest) {
  const taskRepository = new TaskRepositoryImpl();
  const listTaskController = new ListTasksController(taskRepository);

  const controller = await listTaskController.list(httpRequest);
  return controller;
}

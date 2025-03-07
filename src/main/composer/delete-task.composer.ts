import { DeleteTaskController } from '../../application/http/delete-task.controller';
import { TaskRepositoryImpl } from '../../infrastructure/database/repositories/task.repository';
import { HttpRequest } from '../../shared/types/httpRequest';

export async function deleteTaskComposer(httpRequest: HttpRequest) {
  const taskRepository = new TaskRepositoryImpl();
  const deleteTaskController = new DeleteTaskController(taskRepository);

  const controller = await deleteTaskController.deleteTask(httpRequest);
  return controller;
}

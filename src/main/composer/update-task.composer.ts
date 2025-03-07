import { UpdateTaskController } from '../../application/http/update-task.controller';
import { TaskRepositoryImpl } from '../../infrastructure/database/repositories/task.repository';
import { UserRepositoryImpl } from '../../infrastructure/database/repositories/user.repository';
import { HttpRequest } from '../../shared/types/httpRequest';

export async function updateTaskComposer(httpRequest: HttpRequest) {
  const taskRepository = new TaskRepositoryImpl();
  const userRepository = new UserRepositoryImpl();
  const updateTaskController = new UpdateTaskController(
    taskRepository,
    userRepository
  );

  const controller = await updateTaskController.updateTask(httpRequest);
  return controller;
}

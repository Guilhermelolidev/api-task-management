import { CreateTaskController } from '../../application/http/create-task.controller';
import { TaskRepositoryImpl } from '../../infrastructure/repositories/task.repository';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository';
import { HttpRequest } from '../../shared/types/httpRequest';

export async function createTaskComposer(httpRequest: HttpRequest) {
  const taskRepository = new TaskRepositoryImpl();
  const userRepository = new UserRepositoryImpl();
  const createTaskController = new CreateTaskController(
    taskRepository,
    userRepository
  );

  const controller = await createTaskController.create(httpRequest);
  return controller;
}

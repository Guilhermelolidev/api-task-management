import { CreateUserController } from '../../application/http/create-user.controller';
import { UserRepositoryImpl } from '../../infrastructure/database/repositories/user.repository';
import { HttpRequest } from '../../shared/types/httpRequest';

export async function createUserComposer(httpRequest: HttpRequest) {
  const userRepository = new UserRepositoryImpl();
  const createUserController = new CreateUserController(userRepository);

  const controller = await createUserController.create(httpRequest);
  return controller;
}

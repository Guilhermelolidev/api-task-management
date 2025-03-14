import { LoginUserController } from '../../application/http/login-user.controller';
import { UserRepositoryImpl } from '../../infrastructure/database/repositories/user.repository';
import { HttpRequest } from '../../shared/types/httpRequest';

export async function loginUserComposer(httpRequest: HttpRequest) {
  const userRepository = new UserRepositoryImpl();
  const loginUserController = new LoginUserController(userRepository);

  const controller = await loginUserController.login(httpRequest);
  return controller;
}

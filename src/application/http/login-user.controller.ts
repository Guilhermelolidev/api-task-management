import * as z from 'zod';
import { LoginUserUseCase } from '../../domain/use-cases/login-user';
import { IUserRepository } from '../../interfaces/user-repository.interface';
import { httpResponse } from '../../shared/helpers/httpResponse';
import { HttpRequest } from '../../shared/types/httpRequest';
import { HttpResponse } from '../../shared/types/httpResponse';

const zodValidator = z.object({
  email: z.string({
    required_error: 'Email is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
});

export class LoginUserController {
  private loginUserUseCase: LoginUserUseCase;

  constructor(userRepository: IUserRepository) {
    this.loginUserUseCase = new LoginUserUseCase(userRepository);
  }

  async login(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = zodValidator.parse(httpRequest.body);

    const output = await this.loginUserUseCase.execute({
      email,
      password,
    });

    return output.fold(
      (error: any) => httpResponse(400, error.message),
      (token: string) => httpResponse(200, token)
    );
  }
}

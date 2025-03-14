import * as z from 'zod';
import { UserRoles } from '../../domain/entities/user.entity';
import { CreateUserUseCase } from '../../domain/use-cases/create-user';
import { IUserRepository } from '../../interfaces/user-repository.interface';
import { httpResponse } from '../../shared/helpers/httpResponse';
import { HttpRequest } from '../../shared/types/httpRequest';
import { HttpResponse } from '../../shared/types/httpResponse';

const zodValidator = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  email: z
    .string({
      required_error: 'E-mail is required',
    })
    .email({
      message: 'E-mail is invalid',
    }),
  password: z.string({
    required_error: 'Password is required',
  }),
  role: z.nativeEnum(UserRoles),
});

export class CreateUserController {
  private createUserUseCase: CreateUserUseCase;

  constructor(userRepository: IUserRepository) {
    this.createUserUseCase = new CreateUserUseCase(userRepository);
  }

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, email, password, role } = zodValidator.parse(
      httpRequest.body
    );

    const output = await this.createUserUseCase.execute({
      name,
      email,
      password,
      role,
    });

    return output.fold(
      (error: any) => httpResponse(400, error.message),
      () => httpResponse(201, null)
    );
  }
}

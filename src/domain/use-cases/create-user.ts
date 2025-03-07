import { IUserRepository } from '../../interfaces/user-repository.interface';
import { Either } from '../../shared/errors';
import { hashPassword } from '../../shared/utils/hashPassword';
import { User } from '../entities/user.entity';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ name, email, password, role }: User): Promise<Either> {
    // logica do negocio: verificar email, criptografar senha
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      return Either.Left(Either.fieldAlreadyInUse('Email'));
    }

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = await hashPassword(password);
    user.role = role;

    await this.userRepository.create(user);
    return Either.Right(null);
  }
}

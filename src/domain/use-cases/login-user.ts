import { IUserRepository } from '../../interfaces/user-repository.interface';
import { Either } from '../../shared/errors';
import { LoginDTO } from '../../shared/types/loginDto';
import { comparePassword, generateJwtToken } from '../../shared/utils/auth';

export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: LoginDTO): Promise<Either> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) return Either.Left(Either.Error('Invalid credentials'));

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid)
      return Either.Left(Either.Error('Invalid credentials'));

    const token = await generateJwtToken(user);
    return Either.Right(token);
  }
}

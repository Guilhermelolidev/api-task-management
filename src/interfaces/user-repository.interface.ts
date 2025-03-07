import { User } from '../domain/entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
}

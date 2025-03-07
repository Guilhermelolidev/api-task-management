import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../interfaces/user-repository.interface';
import { AppDataSource } from '../database/config/data-source';

// interage com o banco
// guarda e busca os dados
export class UserRepositoryImpl implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOneBy({ email });
  }

  async findById(id: number): Promise<User | null> {
    return await this.repository.findOneBy({ id });
  }
}

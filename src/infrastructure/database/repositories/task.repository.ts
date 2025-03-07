import { Repository } from 'typeorm';
import { Task, TaskStatus } from '../../../domain/entities/task.entity';
import { ITaskRepository } from '../../../interfaces/task-repository.interface';
import { AppDataSource } from '../config/data-source';

export class TaskRepositoryImpl implements ITaskRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = AppDataSource.getRepository(Task);
  }

  async create(task: Task): Promise<Task> {
    return await this.repository.save(task);
  }

  async list(status: TaskStatus): Promise<Task[]> {
    return await this.repository.find({
      where: {
        status,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(Number(id));
  }

  async findById(id: string): Promise<Task | null> {
    const task = await this.repository.findOneBy({ id: Number(id) });

    return task;
  }

  async update(task: Task): Promise<Task> {
    return await this.repository.save(task);
  }
}

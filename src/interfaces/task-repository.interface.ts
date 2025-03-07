import { Task, TaskStatus } from '../domain/entities/task.entity';

export interface ITaskRepository {
  create(task: Task): Promise<Task>;
  list(status?: TaskStatus): Promise<Task[]>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Task | null>;
  update(task: Task): Promise<Task>;
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.entity';

export enum UserRoles {
  ADMIN = 'admin',
  COMMON = 'common',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.COMMON,
  })
  role!: string;

  @OneToMany(() => Task, task => task.user)
  tasks?: Task[];
}

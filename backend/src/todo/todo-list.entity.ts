import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TodoItem } from './todo-item.entity';

import { User } from 'src/users/user.entity';
import { ManyToOne } from 'typeorm';

@Entity()
export class TodoList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: 'In Progress' })
  status: string;

  @OneToMany(() => TodoItem, (todoItem) => todoItem.todoList, { cascade: true })
  todoItems: TodoItem[];

  @ManyToOne(() => User, (user) => user.todoLists, { onDelete: 'CASCADE' })
  user: User;
}

// src/todo/todo-item.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TodoList } from './todo-list.entity';

@Entity()
export class TodoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => TodoList, (todoList) => todoList.todoItems, {
    onDelete: 'CASCADE', // Это будет удалять все задачи при удалении списка
  })
  todoList: TodoList;
  
}
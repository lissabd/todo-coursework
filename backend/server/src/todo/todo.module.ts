// src/todo/todo.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from './todo-list.entity';
import { TodoItem } from './todo-item.entity';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList, TodoItem, User])],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}

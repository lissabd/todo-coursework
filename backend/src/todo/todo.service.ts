// src/todo/todo.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoList } from './todo-list.entity';
import { TodoItem } from './todo-item.entity';
import { User } from 'src/users/user.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoList) private todoListRepo: Repository<TodoList>,
    @InjectRepository(TodoItem) private todoItemRepo: Repository<TodoItem>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async getAllTodoLists(userId: number) {
    return this.todoListRepo.find({
      where: { user: { id: userId } },
      relations: ['todoItems'],
    });
  }

  async getTodoListById(id: number, userId: number) {
    const list = await this.todoListRepo.findOne({
      where: { id, user: { id: userId } },
      relations: ['todoItems'],
    });
    if (!list) throw new NotFoundException('Список не найден');
    return list;
  }

  async createTodoList(title: string, userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Пользователь не найден');

    const todoList = this.todoListRepo.create({ title, user });
    await this.todoListRepo.save(todoList);
    return this.getTodoListById(todoList.id, userId);
  }

  async update(id: number, userId: number, dto: UpdateTodoDto) {
    const todoList = await this.getTodoListById(id, userId);
    todoList.title = dto.title;
    await this.todoItemRepo.delete({ todoList: { id } });
    const newItems = dto.todoItems.map((item) =>
      this.todoItemRepo.create({
        text: item.text,
        completed: item.completed,
        todoList,
      }),
    );
    await this.todoItemRepo.save(newItems);
    return this.getTodoListById(id, userId);
  }

  async deleteTodoList(id: number, userId: number) {
    const res = await this.todoListRepo.delete({ id, user: { id: userId } });
    if (res.affected === 0)
      throw new NotFoundException('Не найден или нет доступа');
    return { deleted: true };
  }
}

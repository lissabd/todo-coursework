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
 
  
  async createTodoList(title: string, userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
  
    const todoList = this.todoListRepo.create({ title, user });
    await this.todoListRepo.save(todoList);
  
   
    return this.todoListRepo.findOne({
      where: { id: todoList.id },
      relations: ['todoItems', 'user'],
    });
  }
  
  
  async getAllTodoLists() {
    return this.todoListRepo.find({ relations: ['todoItems'] });
  }

  async getTodoListById(id: number) {
    return this.todoListRepo.findOne({
      where: { id },
      relations: ['todoItems'],
    });
  }
  
  async updateTodoList(id: number, title: string, status: string, todoItems: TodoItem[]) {
    const todoList = await this.todoListRepo.findOne({ 
      where: { id },  
      relations: ['todoItems'] 
    });
    if (todoList) {
      todoList.title = title; 
      todoList.status = status;
      todoList.todoItems = todoItems;
      return this.todoListRepo.save(todoList);
    }
  }
  
  
  

  async deleteTodoList(id: number) {
    return this.todoListRepo.delete(id);
  }

  // async update(id: number, dto: UpdateTodoDto): Promise<TodoList> {
  //   const todoList = await this.todoListRepo.findOne({
  //     where: { id },
  //     relations: ['todoItems'],
  //   });
  
  //   if (!todoList) {
  //     throw new NotFoundException('TodoList not found');
  //   }
  
  //   todoList.title = dto.title;
  
  //   // Удалить старые задачи
  //   await this.todoItemRepo.delete({ todoList: { id } });
  
  //   // Создать новые задачи
  //   const newItems = dto.todoItems.map(item =>
  //     this.todoItemRepo.create({
  //       text: item.text,
  //       completed: item.completed,
  //       todoList,
  //     })
  //   );
  
  //   await this.todoItemRepo.save(newItems);
  
  //   const updatedList = await this.todoListRepo.findOne({
  //     where: { id },
  //     relations: ['todoItems'],
  //   });
  
  //   if (!updatedList) {
  //     throw new NotFoundException('Updated TodoList not found');
  //   }
  
  //   return updatedList;
  // }

  async update(id: number, dto: UpdateTodoDto): Promise<TodoList> {
    const todoList = await this.todoListRepo.findOne({
      where: { id },
      relations: ['todoItems'],
    });
  
    if (!todoList) {
      throw new NotFoundException('TodoList not found');
    }
  
    console.log('Обновление списка дел:', todoList);
  
    todoList.title = dto.title;
  
    // Логируем задачи перед удалением и добавлением
    console.log('Задачи перед удалением:', todoList.todoItems);
  
    // Удалить старые задачи
    await this.todoItemRepo.delete({ todoList: { id } });
  
    // Логируем задачи после удаления
    console.log('Задачи после удаления.');
  
    // Создать новые задачи и установить связь с todoList
    const newItems = dto.todoItems.map(item =>
      this.todoItemRepo.create({
        text: item.text,
        completed: item.completed,
        todoList,  // Устанавливаем связь с todoList
      })
    );
  
    console.log('Новые задачи для сохранения:', newItems);
  
    await this.todoItemRepo.save(newItems);
  
    // После обновления задач, загружаем обновленный список с задачами
    const updatedList = await this.todoListRepo.findOne({
      where: { id },
      relations: ['todoItems'],
    });
  
    if (!updatedList) {
      throw new NotFoundException('Updated TodoList not found');
    }
  
    console.log('Обновленный список дел:', updatedList);
    return updatedList;
  }
  
  
  

}

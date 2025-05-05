/* eslint-disable prettier/prettier */
// src/todo/todo.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoItem } from './todo-item.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoList } from './todo-list.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    const { title, userId } = createTodoDto;
    return this.todoService.createTodoList(title, userId);
  }

  @Get()
  findAll() {
    return this.todoService.getAllTodoLists();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.getTodoListById(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.deleteTodoList(Number(id));
  }

  // @Put(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() body: { status: string; todoItems: TodoItem[] },
  // ) {
  //   return this.todoService.updateTodoList(
  //     Number(id),
  //     body.status,
  //     body.todoItems,
  //   );
  // }

  // src/todo/todo.controller.ts
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body() updateTodoDto: UpdateTodoDto,
    ): Promise<TodoList> {
      return this.todoService.update(+id, updateTodoDto);
    }

}

// src/todo/todo.controller.ts
import {
  Controller,
  UseGuards,
  Req,
  Post,
  Get,
  Param,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TodoService } from './todo.service';
import { UpdateTodoDto } from './dto/update-todo.dto';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Req() req, @Body('title') title: string) {
    return this.todoService.createTodoList(title, req.user.id);
  }

  @Get()
  findAll(@Req() req) {
    return this.todoService.getAllTodoLists(req.user.id);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: number) {
    return this.todoService.getTodoListById(id, req.user.id);
  }

  @Put(':id')
  update(@Req() req, @Param('id') id: number, @Body() dto: UpdateTodoDto) {
    return this.todoService.update(id, req.user.id, dto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: number) {
    return this.todoService.deleteTodoList(id, req.user.id);
  }
}

// src/todo/dto/update-todo.dto.ts
import {
  IsString,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class UpdateTodoItemDto {
  @IsNumber()
  id: number;

  @IsString()
  text: string;

  @IsBoolean()
  completed: boolean;
}

export class UpdateTodoDto {
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateTodoItemDto)
  todoItems: UpdateTodoItemDto[];
}

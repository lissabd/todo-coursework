// src/entities/todo/model/types.ts

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  isEditing?: boolean;  // Добавляем isEditing
}


export interface TodoList {
  id: number;
  title: string;
  status: string;
  todoItems: TodoItem[];
  userId: number;
}

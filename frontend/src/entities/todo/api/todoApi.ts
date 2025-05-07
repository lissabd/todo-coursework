
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TodoItem, TodoList } from '../model/types';


export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),  
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query<TodoList[], void>({
      query: () => 'todos',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Todo' as const, id })), { type: 'Todo', id: 'LIST' }]
          : [{ type: 'Todo', id: 'LIST' }],
    }),
    
    getTodo: builder.query<TodoList, number>({
      query: (id) => `todos/${id}`,
      providesTags: (result, error, id) => [{ type: 'Todo', id }],
    }),
    
    updateTodo: builder.mutation<void, { id: number; title: string; todoItems: TodoItem[] }>({
      query: ({ id, title, todoItems }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        body: { title, todoItems },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Todo', id }, { type: 'Todo', id: 'LIST' }],
    }),
    
    
    addTodo: builder.mutation<TodoList, { title: string; userId: number }>({
      query: (body) => ({
        url: 'todos',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Todo'],
    }),
    deleteTodo: builder.mutation<void, number>({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
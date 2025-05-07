// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/model/authSlice';
import { todoApi } from '../entities/todo/api/todoApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

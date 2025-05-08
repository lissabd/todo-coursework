// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/model/authSlice';
import { todoApi } from '../entities/todo/api/todoApi';
import { userApi } from '../entities/user/api/userApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [todoApi.reducerPath]: todoApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(todoApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

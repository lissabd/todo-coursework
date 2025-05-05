// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from './../features/auth/model/authSlice'

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './../features/auth/model/authSlice';
import { todoApi } from './../entities/todo/api/todoApi'; // Импортируем todoApi

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [todoApi.reducerPath]: todoApi.reducer, // Подключаем todoApi.reducer
  },
  // Мидлвары для кеширования запросов
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware), // Добавляем middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

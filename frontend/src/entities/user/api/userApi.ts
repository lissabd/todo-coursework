// src/entities/user/api/userApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../model/types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
    prepareHeaders: headers => {
      const token = localStorage.getItem('token');
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: builder => ({
    me: builder.query<User, void>({
      query: () => 'auth/me',
      providesTags: ['User'],
    }),
    updateName: builder.mutation<
      { message: string },
      { id: number; name: string }
    >({
      query: ({ id, name }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: ['User'],
    }),
    uploadAvatar: builder.mutation<
      { message: string; filename: string },
      { id: number; file: File }
    >({
      query: ({ id, file }) => {
        const fd = new FormData();
        fd.append('file', file);
        return {
          url: `users/${id}/avatar`,
          method: 'PATCH',
          body: fd,
        };
      },
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<{ deleted: boolean }, number>({
      query: id => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useMeQuery,
  useUpdateNameMutation,
  useUploadAvatarMutation,
  useDeleteUserMutation,
} = userApi;

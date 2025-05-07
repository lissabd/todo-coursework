import { axiosInstance } from '../../../shared/api/axiosInstance';

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },
  register: async (email: string, password: string, name: string) => {
    const response = await axiosInstance.post('/auth/register', {
      email,
      password,
      name,
    });
    return response.data;
  },
  me: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },
};

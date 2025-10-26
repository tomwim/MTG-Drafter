import apiClient from '@/lib/axios';
import { User, CreateUserDto, UpdateUserDto } from '@/types/user';

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const { data } = await apiClient.get<User[]>('/users');
    return data;
  },

  getById: async (id: number): Promise<User> => {
    const { data } = await apiClient.get<User>(`/users/${id}`);
    return data;
  },

  create: async (dto: CreateUserDto): Promise<User> => {
    const { data } = await apiClient.post<User>('/users', dto);
    return data;
  },

  update: async (id: number, dto: UpdateUserDto): Promise<User> => {
    const { data } = await apiClient.patch<User>(`/users/${id}`, dto);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};
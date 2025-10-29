import apiClient from '@/lib/axios';
import { Player, CreatePlayerDto, UpdatePlayerDto } from '@/types/player';

export const playersApi = {
    getAll: async (): Promise<Player[]> => {
        const { data } = await apiClient.get<Player[]>('/players');
        return data;
    },

    getById: async (id: number): Promise<Player> => {
        const { data } = await apiClient.get<Player>(`/players/${id}`);
        return data;
    },

    getByUserId: async (userId: number): Promise<Player[]> => {
        const { data } = await apiClient.get<Player[]>(`/users/${userId}/players`);
        return data;
    },

    create: async (dto: CreatePlayerDto): Promise<Player> => {
        const { data } = await apiClient.post<Player>('/players', dto);
        return data;
    },

    update: async (id: number, dto: UpdatePlayerDto): Promise<Player> => {
        const { data } = await apiClient.patch<Player>(`/players/${id}`, dto);
        return data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/players/${id}`);
    },
};
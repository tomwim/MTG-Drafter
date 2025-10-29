import apiClient from '@/lib/axios';
import { Matchday, CreateMatchdayDto, UpdateMatchdayDto } from '@/types/matchday';

export const matchdaysApi = {
    getAll: async (): Promise<Matchday[]> => {
        const { data } = await apiClient.get<Matchday[]>('/matchdays');
        return data;
    },

    getById: async (id: number): Promise<Matchday> => {
        const { data } = await apiClient.get<Matchday>(`/matchdays/${id}`);
        return data;
    },

    create: async (dto: CreateMatchdayDto): Promise<Matchday> => {
        const { data } = await apiClient.post<Matchday>('/matchdays', dto);
        return data;
    },

    update: async (id: number, dto: UpdateMatchdayDto): Promise<Matchday> => {
        const { data } = await apiClient.patch<Matchday>(`/matchdays/${id}`, dto);
        return data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/matchdays/${id}`);
    },
};
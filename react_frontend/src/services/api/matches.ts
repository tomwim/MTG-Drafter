import apiClient from '@/lib/axios';
import { Match, CreateMatchDto, UpdateMatchDto } from '@/types/match';

export const matchesApi = {
    getAll: async (): Promise<Match[]> => {
        const { data } = await apiClient.get<Match[]>('/matches');
        return data;
    },

    getById: async (id: number): Promise<Match> => {
        const { data } = await apiClient.get<Match>(`/matches/${id}`);
        return data;
    },

    getByMatchdayId: async (matchdayId: number): Promise<Match[]> => {
        const { data } = await apiClient.get<Match[]>(`/matchdays/${matchdayId}/matches`);
        return data;
    },

    create: async (dto: CreateMatchDto): Promise<Match> => {
        const { data } = await apiClient.post<Match>('/matches', dto);
        return data;
    },

    update: async (id: number, dto: UpdateMatchDto): Promise<Match> => {
        const { data } = await apiClient.patch<Match>(`/matches/${id}`, dto);
        return data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/matches/${id}`);
    },
};
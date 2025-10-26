import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { playersApi } from '@/services/api';
import { CreatePlayerDto, UpdatePlayerDto } from '@/types/player';
import { createQueryKeys } from '@/lib/queryKeys';

export const playerKeys = {
    ...createQueryKeys('player'),
    byUser: (userId: number) => [...playerKeys.all, 'byUser', userId] as const,
};

export const usePlayers = () => {
    return useQuery({
        queryKey: playerKeys.lists(),
        queryFn: playersApi.getAll,
    });
};

export const usePlayer = (id: number) => {
    return useQuery({
        queryKey: playerKeys.detail(id),
        queryFn: () => playersApi.getById(id),
        enabled: !!id,
    });
};

export const usePlayersByUser = (userId: number) => {
    return useQuery({
        queryKey: playerKeys.byUser(userId),
        queryFn: () => playersApi.getByUserId(userId),
        enabled: !!userId,
    });
};

export const useCreatePlayer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dto: CreatePlayerDto) => playersApi.create(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: playerKeys.lists() });
        },
    });
};

export const useUpdatePlayer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, dto }: { id: number; dto: UpdatePlayerDto }) =>
            playersApi.update(id, dto),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: playerKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: playerKeys.lists() });
        },
    });
};

export const useDeletePlayer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => playersApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: playerKeys.lists() });
        },
    });
};
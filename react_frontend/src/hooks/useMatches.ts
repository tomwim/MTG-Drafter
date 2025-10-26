import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { matchesApi } from '@/services/api';
import { CreateMatchDto, UpdateMatchDto } from '@/types/match';
import { createQueryKeys } from '@/lib/queryKeys';

export const matchKeys = {
    ...createQueryKeys('matches'),
    byMatchday: (matchdayId: number) => ['matches', 'byMatchday', matchdayId] as const,
};

export const useMatches = () => {
    return useQuery({
        queryKey: matchKeys.lists(),
        queryFn: matchesApi.getAll,
    });
};

export const useMatch = (id: number) => {
    return useQuery({
        queryKey: matchKeys.detail(id),
        queryFn: () => matchesApi.getById(id),
        enabled: !!id,
    });
};

export const useMatchesByMatchday = (matchdayId: number) => {
    return useQuery({
        queryKey: matchKeys.byMatchday(matchdayId),
        queryFn: () => matchesApi.getByMatchdayId(matchdayId),
        enabled: !!matchdayId,
    });
};

export const useCreateMatch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dto: CreateMatchDto) => matchesApi.create(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: matchKeys.lists() });
        },
    });
};

export const useUpdateMatch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, dto }: { id: number; dto: UpdateMatchDto }) =>
            matchesApi.update(id, dto),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: matchKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: matchKeys.lists() });
            // Also invalidate the matchday's matches
            if (data.matchday_id) {
                queryClient.invalidateQueries({ queryKey: matchKeys.byMatchday(data.matchday_id) });
            }
        },
    });
};

export const useDeleteMatch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => matchesApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: matchKeys.lists() });
        },
    });
};
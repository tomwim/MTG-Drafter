import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { matchdaysApi } from '@/services/api';
import { CreateMatchdayDto, UpdateMatchdayDto } from '@/types/matchday';
import { createQueryKeys } from '@/lib/queryKeys';

export const matchdayKeys = createQueryKeys('matchdays');

export const useMatchdays = () => {
    return useQuery({
        queryKey: matchdayKeys.lists(),
        queryFn: matchdaysApi.getAll,
    });
};

export const useMatchday = (id: number) => {
    return useQuery({
        queryKey: matchdayKeys.detail(id),
        queryFn: () => matchdaysApi.getById(id),
        enabled: !!id,
    });
};

export const useCreateMatchday = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dto: CreateMatchdayDto) => matchdaysApi.create(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: matchdayKeys.lists() });
        },
    });
};

export const useUpdateMatchday = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, dto }: { id: number; dto: UpdateMatchdayDto }) =>
            matchdaysApi.update(id, dto),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: matchdayKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: matchdayKeys.lists() });
        },
    });
};

export const useDeleteMatchday = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => matchdaysApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: matchdayKeys.lists() });
        },
    });
};
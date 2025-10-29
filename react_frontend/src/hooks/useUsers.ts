import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '@/services/api';
import { CreateUserDto, UpdateUserDto } from '@/types/user';
import { createQueryKeys } from '@/lib/queryKeys';

export const userKeys = createQueryKeys('users');

export const useUsers = () => {
    return useQuery({
        queryKey: userKeys.lists(),
        queryFn: usersApi.getAll,
    });
};

export const useUser = (id: number) => {
    return useQuery({
        queryKey: userKeys.detail(id),
        queryFn: () => usersApi.getById(id),
        enabled: !!id,
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dto: CreateUserDto) => usersApi.create(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, dto }: { id: number; dto: UpdateUserDto }) =>
            usersApi.update(id, dto),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => usersApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
        },
    });
};
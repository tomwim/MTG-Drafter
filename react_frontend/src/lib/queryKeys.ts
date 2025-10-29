/**
 * Creates a standardized query key factory for any entity
 * @param entityName - The name of the entity (e.g., 'users', 'matches')
 * @returns A query key factory with standard methods
 */
export function createQueryKeys<TEntity extends string>(entityName: TEntity) {
    return {
        all: [entityName] as const,
        lists: () => [entityName, 'list'] as const,
        list: (filters: string) => [entityName, 'list', { filters }] as const,
        details: () => [entityName, 'detail'] as const,
        detail: (id: number) => [entityName, 'detail', id] as const,
    };
}
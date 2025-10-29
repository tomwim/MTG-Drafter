export interface BaseEntity {
    id: number;
    created_at: string;
    updated_at: string;
}

export type OmitBase<T> = Omit<T, keyof BaseEntity>;
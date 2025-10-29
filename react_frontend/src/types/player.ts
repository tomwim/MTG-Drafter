import { BaseEntity } from './base';

export interface Player extends BaseEntity {
    user_id: number;
    name: string;
    rating: number;
    wins: number;
    losses: number;
}

export type CreatePlayerDto = Pick<Player, 'user_id' | 'name'>;

export type UpdatePlayerDto = Partial<Pick<Player, 'name' | 'rating'>>;
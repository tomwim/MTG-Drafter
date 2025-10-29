import { BaseEntity } from './base';

export type MatchdayStatus = 'upcoming' | 'active' | 'completed';

export interface Matchday extends BaseEntity {
    name: string;              // e.g., "Bloomburrow Draft Tournament"
    date: string;
    set_name: string;          // e.g., "Bloomburrow", "Duskmourn"
    format: string;            // e.g., "Draft", "Sealed"
    status: MatchdayStatus;
    best_of: 1 | 3 | 5;       // Default best-of for all matches
}

export type CreateMatchdayDto = Pick<Matchday, 'name' | 'date' | 'set_name' | 'format' | 'best_of'>;

export type UpdateMatchdayDto = Partial<Pick<Matchday, 'name' | 'date' | 'set_name' | 'format' | 'status'>>;
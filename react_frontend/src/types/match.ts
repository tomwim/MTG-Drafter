import { BaseEntity } from './base';

export type MatchStatus = 'pending' | 'in_progress' | 'completed';
export type BestOf = 1 | 3 | 5; // Bo1, Bo3, Bo5

export interface Match extends BaseEntity {
    matchday_id: number;
    player1_id: number;
    player2_id: number;
    winner_id: number | null;
    player1_wins: number;      // Games won by player 1
    player2_wins: number;      // Games won by player 2
    status: MatchStatus;
    best_of: BestOf;          // Best of 1, 3, or 5
}

export type CreateMatchDto = Pick<Match, 'matchday_id' | 'player1_id' | 'player2_id' | 'best_of'>;

export type UpdateMatchDto = Partial<Pick<Match, 'winner_id' | 'player1_wins' | 'player2_wins' | 'status'>>;
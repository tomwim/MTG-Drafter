import httpClient from "./httpClient";
import { Player } from "./playerApi";
import { Match } from "./matchApi";

export interface Matchday {
    id: number,
    date: string,
    match_type: string,
    set_id: string
}

export interface MatchdayWithPlayers extends Matchday {
    players: Partial<Player>[]
}

export const fetchMatchdays = async (): Promise<Matchday[]> => {
    const response = await httpClient.get<Matchday[]>('/matchdays');
    console.log(response.data)
    return response.data;
};

export const fetchMatchday = async (id: number): Promise<Matchday> => {
    try {
        const response = await httpClient.get<Matchday>(`/matchdays/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user with ID ${id}`);
    }
};

export const createMatchdayWithPlayers = async (matchday: Partial<Matchday>, players: Partial<Player>[], createMatches: boolean = false): Promise<MatchdayWithPlayers> => {
    try {
        const matchdayWithPlayers: Partial<MatchdayWithPlayers> = {
            ...matchday,
            players: players
        }
        const response = await httpClient.post<MatchdayWithPlayers>(`/matchday?create-matches=${createMatches}`, matchdayWithPlayers);
        return response.data;
    } catch (error: any) {
        throw new Error('Failed to create member.');
    }
};

export const fetchMatchdayPlayers = async (matchday_id: number): Promise<Player[]> => {
    try {
        const response = await httpClient.get<Player[]>(`/matchdays/${matchday_id}/players`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching players.`);
    }
};

export const fetchMatchdayMatches = async (matchday_id: number): Promise<Match[]> => {
    try {
        const response = await httpClient.get<Match[]>(`/matchdays/${matchday_id}/matches`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching players.`);
    }
};
import httpClient from "./httpClient";
import { Player } from "./playerApi";
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
}
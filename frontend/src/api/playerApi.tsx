import httpClient from "./httpClient";
import { Member } from "./memberApi";

export interface Player {
    id: number,
    member: Member,
    must_play: string,
    cannot_play: string,
    plays: string[],
    matchday: number
}

export const fetchPlayers = async (): Promise<Player[]> => {
    try {
        const response = await httpClient.get<Player[]>('/players');
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching players.`);
    }
};

export const fetchPlayer = async (id: number): Promise<Player> => {
    try {
        const response = await httpClient.get<Player>(`/players/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching player with ID ${id}.`);
    }
};

export const addPlayer = async (data: Partial<Player>) => {
    try {
        const response = await httpClient.post<Player>(`/player`, data);
        return response.data;
    } catch (error: any) {
        throw new Error('Failed to create member.');
    }
}

export const editPlayer = async (id: number, updated_data: Partial<Player>) => {
    try {
        const response = await httpClient.put<Player>(`/players/${id}`, updated_data);
        return response.data;
    } catch (error: any) {
        throw new Error('Failed to update player.');
    }
}
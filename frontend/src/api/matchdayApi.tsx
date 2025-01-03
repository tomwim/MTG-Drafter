import httpClient from "./httpClient";

export interface Matchday {
    id: number,
    date: string,
    match_type: string,
    set_id: string
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
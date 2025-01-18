import httpClient from "./httpClient";

export interface Match {
    id: number,
    match_type: string,
    match_day: number,
    player_one: number,
    player_two: number,
    score_player_one: number,
    score_player_two: number
}

export const updateScore = async (match : Match) => {
    try {
        const response = await httpClient.put(`/matches/${match.id}/score?score_player_one=${match.score_player_one}&score_player_two=${match.score_player_two}`);
        return response.data;
    } catch (error: any) {
        throw new Error(`Failed to update score of match ${match.id}.`);
    }
}
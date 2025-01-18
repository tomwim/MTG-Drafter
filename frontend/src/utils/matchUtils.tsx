export interface MatchType {
    id: string,
    name: string,
    max_games: number
}

export const MatchTypes : { [key: string]: MatchType } = {
    bo1 : { 
        id: "bo1",
        name: "Best of 1",
        max_games: 1
    },
    bo2 : { 
        id: "bo2",
        name: "Best of 2",
        max_games: 2
    },
    bo3 : { 
        id: "bo3",
        name: "Best of 3",
        max_games: 3
    },
    bo5 : { 
        id: "bo5",
        name: "Best of 5",
        max_games: 5
    }
}

export function getMatchTypeById(id: string) {
    return Object.values(MatchTypes).find((type) => type.id === id)
}
export interface MatchType {
    id: string
    name: string
}

export const MatchTypes : { [key: string]: MatchType } = {
    bo1 : { 
        id: "bo1",
        name: "Best of 1",
    },
    bo2 : { 
        id: "bo2",
        name: "Best of 2",
    },
    bo3 : { 
        id: "bo3",
        name: "Best of 3",
    },
    bo5 : { 
        id: "bo5",
        name: "Best of 5",
    }
}
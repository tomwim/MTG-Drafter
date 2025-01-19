import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Matchday, fetchMatchdays } from '../api/matchdayApi';

interface MatchdayContextType {
    matchday: Matchday | undefined;
    setMatchday: (matchday: Matchday | undefined) => void;
}

interface MatchdaysContextType {
    matchdays: Matchday[];
    setMatchdays: (matchdays: Matchday[]) => void;
}

// Create the context
const MatchdayContext = createContext<MatchdayContextType | undefined>(undefined);
const MatchdaysContext = createContext<MatchdaysContextType | undefined>(undefined);

// Context provider component
export const MatchdayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [matchday, setMatchday] = useState<Matchday | undefined>(undefined);
    const [matchdays, setMatchdays] = useState<Matchday[]>([]);

    useEffect(() => {
        const getMatchdays = async () => {
            try {
                const fetchedMatchdays = await fetchMatchdays();
                setMatchdays(fetchedMatchdays);
            } catch (err) {
                console.log("Fetch matchdays failed.")
            }
        };

        getMatchdays();
    }, []);

    useEffect(() => {
        setMatchday(matchdays[0])
    }, [matchdays]);

    return (
        <MatchdaysContext.Provider value={{ matchdays, setMatchdays }}>
            <MatchdayContext.Provider value={{ matchday, setMatchday }}>
                {children}
            </MatchdayContext.Provider>
        </MatchdaysContext.Provider>
    );
};

// Hook for easy access to the context
export const useMatchdayContext = (): MatchdayContextType => {
    const context = useContext(MatchdayContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export const useMatchdaysContext = (): MatchdaysContextType => {
    const context = useContext(MatchdaysContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Matchday, fetchMatchdays } from '../api/matchdayApi';

interface MatchdayContextType {
    matchday: Matchday | undefined;
    setMatchday: (user: Matchday | undefined) => void;
}

// Create the context
const MatchdayContext = createContext<MatchdayContextType | undefined>(undefined);

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
        setMatchday(matchdays[matchdays.length - 1])
    }, [matchdays]);

    return (
        <MatchdayContext.Provider value={{ matchday, setMatchday }}>
            {children}
        </MatchdayContext.Provider>
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
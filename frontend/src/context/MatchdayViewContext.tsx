import React, { createContext, useContext, useState, ReactNode } from 'react';

export enum MatchdayView {
    Table = "TABLE",
    Players = "PLAYERS",
    Matches = "MATCHES",
}

interface MatchdayViewContextType {
    activeView: MatchdayView;
    setActiveView: (view: MatchdayView) => void;
}

// Create the context
const MatchdayViewContext = createContext<MatchdayViewContextType | undefined>(undefined);

// Context provider component
export const MatchdayViewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeView, setActiveView] = useState<MatchdayView>(MatchdayView.Matches);

    return (
        <MatchdayViewContext.Provider value={{ activeView, setActiveView }}>
            {children}
        </MatchdayViewContext.Provider>
    );
};

// Hook for easy access to the context
export const useMatchdayViewContext = (): MatchdayViewContextType => {
    const context = useContext(MatchdayViewContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
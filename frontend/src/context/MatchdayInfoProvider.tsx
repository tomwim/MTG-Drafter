import React, { ReactNode } from 'react';
import { MatchdayProvider } from './MatchdayContext';
import { MatchdayViewProvider } from './MatchdayViewContext';

export const MatchdayInfoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <MatchdayProvider>
      <MatchdayViewProvider>{children}</MatchdayViewProvider>
    </MatchdayProvider>
  );
};
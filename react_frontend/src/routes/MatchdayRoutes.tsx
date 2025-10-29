import { Routes, Route, Navigate } from 'react-router-dom';
import { MatchdayListView } from '@/components/features/matchdays_overview/MatchdayListView';
import { MatchdayDetailPage } from '@/components/features/matches/MatchdayDetailPage';

export function MatchdayRoutes() {
  return (
    <Routes>
      <Route index element={<MatchdayListView />} />
      <Route path=":matchdayId" element={<MatchdayDetailPage />} />
      <Route path="*" element={<Navigate to="/matchdays" replace />} />
    </Routes>
  );
}
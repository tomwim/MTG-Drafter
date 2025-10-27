import { Routes, Route, Navigate } from 'react-router-dom';
import { MatchdayRoutes } from './MatchdayRoutes';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/matchdays/*" element={<MatchdayRoutes />} />
      <Route path="/" element={<Navigate to="/matchdays" replace />} />
      <Route path="*" element={<Navigate to="/matchdays" replace />} />
    </Routes>
  );
}
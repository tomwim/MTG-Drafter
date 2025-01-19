import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from '../pages/About';
import MatchdayPage from '../pages/MatchdayPage';
import MatchdaysPage from '../pages/MatchdaysPage';
import MembersPage from '../pages/MembersPage';
import EditMemberPage from '../pages/EditMemberPage';
import MemberPage from '../pages/MemberPage';
import CreateMemberPage from '../pages/CreateMemberPage';
import CreateMatchdayPage from '../pages/CreateMatchdayPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/about" element={<About />} />

        <Route path="/matchdays" element={<MatchdaysPage />} />
        <Route path="/matchdays/create" element={<CreateMatchdayPage />} />
        <Route path="/matchdays/:id" element={<MatchdayPage />} />
        <Route path="/matchday" element={<MatchdayPage />} />

        <Route path="/members" element={<MembersPage />} />
        <Route path="/members/create" element={<CreateMemberPage />} />
        <Route path="/members/:id/edit" element={<EditMemberPage />} />
        <Route path="/members/:id" element={<MemberPage />} />
    </Routes>
  );
};

export default AppRoutes;
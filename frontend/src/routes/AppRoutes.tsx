import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from '../pages/About';
import Matchday from '../pages/Matchday';
import Matchdays from '../pages/Matchdays';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/matchdays" element={<Matchdays />} />
        <Route path="/matchdays/:id" element={<Matchday />} />
    </Routes>
  );
};

export default AppRoutes;
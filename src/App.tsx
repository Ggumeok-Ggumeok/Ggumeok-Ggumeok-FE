import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import FoodBoardPage from './pages/FoodBoardPage';
import TipsCommunityPage from './pages/TipsCommunityPage';
import FoodRoulettePage from './pages/FoodRoulettePage';
import LocationMapPage from './pages/LocationMapPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/food-board" element={<FoodBoardPage />} />
        <Route path="/tips" element={<TipsCommunityPage />} />
        <Route path="/roulette" element={<FoodRoulettePage />} />
        <Route path="/map" element={<LocationMapPage />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

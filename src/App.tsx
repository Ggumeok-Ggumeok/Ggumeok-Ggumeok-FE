import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import FoodBoardPage from './pages/FoodBoardPage';
import TipsCommunityPage from './pages/TipsCommunityPage';
import FoodRoulettePage from './pages/FoodRoulettePage';
import LocationMapPage from './pages/LocationMapPage';
import MyPage from './pages/MyPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/food-board" element={<FoodBoardPage />} />
          <Route path="/tips" element={<TipsCommunityPage />} />
          <Route path="/roulette" element={<FoodRoulettePage />} />
          <Route path="/map" element={<LocationMapPage />} />
          <Route path="/mypage" element={<MyPage />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

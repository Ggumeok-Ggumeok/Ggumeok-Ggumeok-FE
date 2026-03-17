import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: '오음추', path: '/food-board' },
  { label: '꿀꿀', path: '/tips' },
  { label: '룰렛', path: '/roulette' },
  { label: '장소추천', path: '/map' },
];

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="w-full h-16 bg-white border-b border-[#FFD6E0] px-10 flex items-center justify-between sticky top-0 z-40">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-[#FF8FAB] flex items-center justify-center text-xl">
          🐷
        </div>
        <span className="text-xl font-bold text-[#FF6B9D]">꾸먹꾸먹</span>
      </Link>

      {/* Nav links */}
      <div className="flex items-center gap-8">
        {NAV_LINKS.map(({ label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`text-sm font-medium transition-colors ${
                isActive ? 'text-[#FF8FAB] font-bold' : 'text-gray-500 hover:text-[#FF8FAB]'
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Login button */}
      <Link
        to="/login"
        className="bg-[#FF8FAB] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#FF6B9D] transition-colors"
      >
        로그인
      </Link>
    </nav>
  );
};

export default Navbar;

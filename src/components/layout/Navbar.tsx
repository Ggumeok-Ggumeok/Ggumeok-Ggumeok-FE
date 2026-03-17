import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const NAV_LINKS = [
  { label: '오음추', path: '/food-board' },
  { label: '꿀꿀', path: '/tips' },
  { label: '룰렛', path: '/roulette' },
  { label: '장소추천', path: '/map' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

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

      {/* Login button or Profile dropdown */}
      {isLoggedIn && user ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-[#FFF0F3] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#FF8FAB] flex items-center justify-center text-base overflow-hidden">
              {user.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt="프로필" 
                  className="w-full h-full object-cover"
                />
              ) : (
                '🐷'
              )}
            </div>
            <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
              {user.nickname}
            </span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#FFE4EC] py-2 z-50">
              <Link
                to="/mypage"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-[#FFF0F3] transition-colors"
              >
                <svg className="w-5 h-5 text-[#FF8FAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                마이페이지
              </Link>
              <hr className="my-1 border-[#FFE4EC]" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-[#FFF0F3] transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                로그아웃
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="bg-[#FF8FAB] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#FF6B9D] transition-colors"
        >
          로그인
        </Link>
      )}
    </nav>
  );
};

export default Navbar;

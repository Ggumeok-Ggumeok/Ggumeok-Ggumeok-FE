import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  // 이미 로그인 되어 있으면 메인으로
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleKakaoLogin = () => {
    // 데모용: 카카오 로그인 시뮬레이션
    // 실제 구현에서는 백엔드 OAuth 리다이렉트 사용
    const demoUser = {
      id: 1,
      nickname: '꾸먹이',
      email: 'ggumeok@kakao.com',
      createdAt: new Date().toISOString(),
    };
    
    login(demoUser);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-10 w-[440px] flex flex-col items-center gap-6">
        {/* Pig icon */}
        <div className="w-14 h-14 rounded-full bg-[#FF8FAB] flex items-center justify-center text-3xl">
          🐷
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#FF6B9D]">꾸먹꾸먹</h1>
          <p className="text-xs text-gray-400 mt-1">먹는 즐거움, 여기서 시작돼요</p>
        </div>

        {/* Welcome message */}
        <div className="text-center">
          <p className="font-bold text-gray-700">꾸먹꾸먹에 오신 것을 환영해요!</p>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            음식도 사람도, 함께하면 더 맛있어요.
            <br />
            카카오로 간편하게 시작해보세요!
          </p>
        </div>

        {/* Divider */}
        <hr className="w-full border-[#FFE4EC]" />

        {/* Kakao login button */}
        <button
          onClick={handleKakaoLogin}
          className="w-full bg-[#FEE500] hover:bg-yellow-300 text-gray-900 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 01-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z" />
          </svg>
          카카오 로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

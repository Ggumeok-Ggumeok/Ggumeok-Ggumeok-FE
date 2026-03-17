import React from 'react';

const LoginPage: React.FC = () => {
  const handleKakaoLogin = () => {
    // TODO: Replace with your backend Kakao OAuth redirect URL
    window.location.href = '/oauth/kakao';
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
          <p className="text-xs text-gray-400 mt-1">먹는 즐거움, 여기서 시작돼요 🍴</p>
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
          <span className="text-lg">🐾</span>
          카카오 로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

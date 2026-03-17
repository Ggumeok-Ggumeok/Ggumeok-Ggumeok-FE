import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/layout/Navbar';

const MyPage: React.FC = () => {
  const { user, logout, updateNickname, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState(user?.nickname || '');

  // 로그인 안 되어 있으면 로그인 페이지로
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveNickname = () => {
    if (newNickname.trim()) {
      updateNickname(newNickname.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setNewNickname(user?.nickname || '');
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FFF5F7]">
      <Navbar />
      
      <main className="max-w-2xl mx-auto px-4 py-10">
        {/* 프로필 카드 */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          {/* 프로필 헤더 */}
          <div className="flex items-center gap-5 pb-6 border-b border-[#FFE4EC]">
            <div className="w-20 h-20 rounded-full bg-[#FF8FAB] flex items-center justify-center text-4xl">
              {user.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt="프로필" 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                '🐷'
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{user.nickname}</h1>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>

          {/* 회원 정보 섹션 */}
          <div className="py-6 space-y-5">
            <h2 className="text-lg font-bold text-gray-700">회원 정보</h2>
            
            {/* 닉네임 */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">닉네임</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={newNickname}
                    onChange={(e) => setNewNickname(e.target.value)}
                    className="mt-1 px-3 py-2 border border-[#FFD6E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8FAB] text-gray-800"
                    placeholder="새 닉네임 입력"
                    autoFocus
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{user.nickname}</p>
                )}
              </div>
              {isEditing ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveNickname}
                    className="px-4 py-2 bg-[#FF8FAB] text-white text-sm font-semibold rounded-lg hover:bg-[#FF6B9D] transition-colors"
                  >
                    저장
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    취소
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-[#FFF0F3] text-[#FF8FAB] text-sm font-semibold rounded-lg hover:bg-[#FFE4EC] transition-colors"
                >
                  수정
                </button>
              )}
            </div>

            {/* 이메일 */}
            <div>
              <p className="text-sm text-gray-400">이메일</p>
              <p className="text-gray-800 font-medium">{user.email}</p>
            </div>

            {/* 가입일 */}
            <div>
              <p className="text-sm text-gray-400">가입일</p>
              <p className="text-gray-800 font-medium">
                {new Date(user.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* 로그아웃 버튼 */}
          <div className="pt-6 border-t border-[#FFE4EC]">
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyPage;

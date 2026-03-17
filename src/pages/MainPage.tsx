import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

interface FeatureCard {
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  path: string;
  highlight?: boolean;
}

const FEATURES: FeatureCard[] = [
  {
    emoji: '🍽️',
    title: '오음추',
    subtitle: '오늘 음식 추천',
    description: '아침·점심·저녁·간식별로 음식 메뉴를 추천하고 공감받아보세요!',
    path: '/food-board',
  },
  {
    emoji: '🐽',
    title: '꿀꿀',
    subtitle: '음식 꿀팁 커뮤니티',
    description: '레시피, 맛집 정보 등 음식 관련 꿀팁을 자유롭게 공유해요!',
    path: '/tips',
  },
  {
    emoji: '🎡',
    title: '음식 룰렛',
    subtitle: '랜덤 메뉴 결정',
    description: '뭐 먹을지 고민될 땐 룰렛! 직접 입력하고 돌려보세요.',
    path: '/roulette',
  },
  {
    emoji: '📍',
    title: '장소 추천',
    subtitle: '맛집 지도 탐색',
    description: '방문한 맛집을 지도에 공유하고, 지역별 추천 식당을 찾아보세요!',
    path: '/map',
    highlight: true,
  },
];

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF5F7] flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="w-full flex flex-col items-center justify-center text-center px-8 py-24 bg-gradient-to-b from-[#FFE4EC] to-[#FFF5F7]">
        <div className="inline-flex items-center gap-2 bg-[#FFD6E0] text-[#FF6B9D] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
          🐷 음식 커뮤니티
        </div>

        <h1 className="text-7xl font-extrabold text-[#FF6B9D] mb-4">꾸먹꾸먹</h1>

        <p className="text-2xl text-gray-500 mb-4">먹는 걸 사랑하는 사람들의 공간</p>

        <p className="text-base text-gray-400 max-w-xl mb-10">
          오늘 뭐 먹을지 모르겠다고요? 꾸먹꾸먹에서 추천도 받고, 맛집도 찾고, 룰렛으로 결정까지!
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/food-board')}
            className="bg-[#FF8FAB] hover:bg-[#FF6B9D] text-white font-bold px-10 py-4 rounded-full text-base transition-colors shadow-sm"
          >
            지금 시작하기 →
          </button>
          <button
            onClick={() => navigate('/tips')}
            className="bg-white border-2 border-[#FF8FAB] text-[#FF8FAB] font-semibold px-10 py-4 rounded-full text-base transition-colors hover:bg-[#FFF5F7]"
          >
            둘러보기
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="w-full px-20 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">주요 기능</h2>
          <p className="text-gray-400">꾸먹꾸먹의 모든 기능을 한눈에 만나보세요</p>
        </div>

        <div className="grid grid-cols-4 gap-5">
          {FEATURES.map((card) => (
            <div
              key={card.path}
              onClick={() => navigate(card.path)}
              className={`rounded-2xl p-8 flex flex-col gap-4 cursor-pointer transition-transform hover:-translate-y-1 ${
                card.highlight
                  ? 'bg-[#FF8FAB] text-white'
                  : 'bg-white border border-[#FFE4EC]'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${
                  card.highlight ? 'bg-white/25' : 'bg-[#FFE4EC]'
                }`}
              >
                {card.emoji}
              </div>
              <div>
                <h3 className={`text-xl font-extrabold ${card.highlight ? 'text-white' : 'text-gray-800'}`}>
                  {card.title}
                </h3>
                <p className={`text-sm font-semibold mt-0.5 ${card.highlight ? 'text-white/80' : 'text-[#FF8FAB]'}`}>
                  {card.subtitle}
                </p>
              </div>
              <p className={`text-sm leading-relaxed ${card.highlight ? 'text-white/70' : 'text-gray-400'}`}>
                {card.description}
              </p>
              <button
                className={`self-start px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  card.highlight
                    ? 'bg-white text-[#FF8FAB] hover:bg-gray-100'
                    : 'bg-[#FF8FAB] text-white hover:bg-[#FF6B9D]'
                }`}
              >
                바로가기 →
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainPage;

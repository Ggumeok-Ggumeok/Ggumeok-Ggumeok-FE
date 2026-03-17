import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import TipCard from '../components/ui/TipCard';
import TipWriteModal from '../components/modals/TipWriteModal';
import PostDetailModal from '../components/modals/PostDetailModal';
import { TipPost } from '../types';

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_TIPS: TipPost[] = [
  {
    id: 1,
    title: '라면 맛있게 끓이는 꿀팁 🍜',
    description: '면을 먼저 넣지 말고 스프를 물과 함께 끓인 후 면을 넣으면 더 맛있어요! 달걀은 불 끄기 30초 전에!',
    author: '라면박사',
    likes: 142,
    comments: 38,
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    title: '냉장고 파먹기 레시피 - 계란볶음밥',
    description: '남은 밥에 계란, 파, 간장만 있으면 완성! 참기름 한 방울이 포인트에요.',
    author: '요리초보',
    likes: 87,
    comments: 21,
    createdAt: '2024-01-15',
  },
  {
    id: 3,
    title: '홍대 파스타 맛집 발견! 🍝',
    description: '홍대입구역 3번 출구 도보 5분. 트러플 크림 파스타가 진짜 맛있어요. 가격도 적당하고 분위기도 좋아요!',
    author: '맛집탐험가',
    likes: 203,
    comments: 55,
    createdAt: '2024-01-14',
  },
  {
    id: 4,
    title: '치킨 더 맛있게 먹는 방법 🍗',
    description: '배달 치킨은 에어프라이어에 3분만 데워 먹으면 갓 튀긴 것처럼 바삭해져요!',
    author: '치킨러버',
    likes: 321,
    comments: 79,
    createdAt: '2024-01-14',
  },
  {
    id: 5,
    title: '편의점 꿀조합 레시피 모음',
    description: '불닭볶음면 + 슬라이스치즈 + 계란 = 최고의 조합. 트위터에서 유행하는 편의점 레시피 따라해봤어요!',
    author: '편의점왕',
    likes: 156,
    comments: 43,
    createdAt: '2024-01-13',
  },
  {
    id: 6,
    title: '매운 음식 먹고 속 달래는 법',
    description: '물 마시지 말고 우유를 마세요! 카세인 단백질이 캡사이신을 중화시켜줘요. 아이스크림도 효과적!',
    author: '과학먹짱',
    likes: 98,
    comments: 27,
    createdAt: '2024-01-13',
  },
];

const TipsCommunityPage: React.FC = () => {
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<TipPost | null>(null);

  return (
    <div className="min-h-screen bg-[#FFF5F7] flex flex-col">
      <Navbar />

      <div className="w-full max-w-6xl mx-auto px-8 py-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">🐽 꿀꿀</h1>
            <p className="text-sm text-gray-400 mt-1">음식 꿀팁을 자유롭게 공유해요!</p>
          </div>
          <button
            onClick={() => setIsWriteOpen(true)}
            className="bg-[#FF8FAB] hover:bg-[#FF6B9D] text-white font-bold px-6 py-2.5 rounded-full text-sm transition-colors shadow-sm"
          >
            + 꿀팁 작성하기
          </button>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {MOCK_TIPS.map((post) => (
            <TipCard
              key={post.id}
              post={post}
              onClick={() => setSelectedPost(post)}
            />
          ))}
        </div>
      </div>

      <TipWriteModal
        isOpen={isWriteOpen}
        onClose={() => setIsWriteOpen(false)}
      />
      <PostDetailModal
        isOpen={selectedPost !== null}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
        postType="tip"
      />
    </div>
  );
};

export default TipsCommunityPage;

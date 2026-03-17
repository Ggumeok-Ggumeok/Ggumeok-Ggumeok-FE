import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import FoodCard from '../components/ui/FoodCard';
import FoodWriteModal from '../components/modals/FoodWriteModal';
import PostDetailModal from '../components/modals/PostDetailModal';
import { FoodPost, MealTime } from '../types';

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_POSTS: FoodPost[] = [
  {
    id: 1,
    title: '오늘 아침 든든한 계란토스트',
    description: '계란 두 개에 햄 넣고 만든 토스트! 간단하지만 너무 맛있어요 🍳',
    category: '아침',
    author: '꾸먹이',
    likes: 24,
    comments: 8,
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    title: '점심 추천 - 김치찌개 정식',
    description: '근처 한식당 김치찌개가 진짜 맛있어요. 밥이랑 반찬도 잘 나와서 강추합니다!',
    category: '점심',
    author: '맛집탐험가',
    likes: 41,
    comments: 12,
    createdAt: '2024-01-15',
  },
  {
    id: 3,
    title: '저녁 삼겹살 파티 🐷',
    description: '친구들이랑 삼겹살 구워 먹었어요. 소주 한 잔에 삼겹살이 최고죠!',
    category: '저녁',
    author: '먹짱',
    likes: 67,
    comments: 23,
    createdAt: '2024-01-14',
  },
  {
    id: 4,
    title: '오후 간식으로 딸기 케이크',
    description: '성심당 딸기 케이크 먹었는데 너무 맛있어요 😍 강추강추!',
    category: '간식',
    author: '달콤이',
    likes: 89,
    comments: 31,
    createdAt: '2024-01-14',
  },
  {
    id: 5,
    title: '집밥 최고 - 된장찌개',
    description: '오늘 점심은 직접 끓인 된장찌개. 두부 버섯 듬뿍 넣어서 정말 든든해요!',
    category: '점심',
    author: '집밥요리사',
    likes: 33,
    comments: 9,
    createdAt: '2024-01-13',
  },
  {
    id: 6,
    title: '편의점 간식 조합 추천',
    description: '삼각김밥 + 컵라면 조합! 가성비 최고의 간식이에요 🍜',
    category: '간식',
    author: '편의점마스터',
    likes: 15,
    comments: 5,
    createdAt: '2024-01-13',
  },
];

const MEAL_TIMES: MealTime[] = ['전체', '아침', '점심', '저녁', '간식'];

const FoodBoardPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<MealTime>('전체');
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<FoodPost | null>(null);

  const filteredPosts =
    selectedCategory === '전체'
      ? MOCK_POSTS
      : MOCK_POSTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FFF5F7] flex flex-col">
      <Navbar />

      <div className="w-full max-w-6xl mx-auto px-8 py-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">🍽️ 오음추</h1>
            <p className="text-sm text-gray-400 mt-1">오늘 먹은 음식을 추천해주세요!</p>
          </div>
          <button
            onClick={() => setIsWriteOpen(true)}
            className="bg-[#FF8FAB] hover:bg-[#FF6B9D] text-white font-bold px-6 py-2.5 rounded-full text-sm transition-colors shadow-sm"
          >
            + 메뉴 추천하기
          </button>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap">
          {MEAL_TIMES.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedCategory(time)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                selectedCategory === time
                  ? 'bg-[#FF8FAB] text-white'
                  : 'bg-white border border-[#FFE4EC] text-gray-500 hover:bg-[#FFE4EC]'
              }`}
            >
              {time}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        {filteredPosts.length === 0 ? (
          <div className="flex items-center justify-center h-60 text-gray-400 text-sm">
            아직 등록된 추천이 없습니다
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPosts.map((post) => (
              <FoodCard
                key={post.id}
                post={post}
                onClick={() => setSelectedPost(post)}
              />
            ))}
          </div>
        )}
      </div>

      <FoodWriteModal
        isOpen={isWriteOpen}
        onClose={() => setIsWriteOpen(false)}
      />
      <PostDetailModal
        isOpen={selectedPost !== null}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
        postType="food"
      />
    </div>
  );
};

export default FoodBoardPage;

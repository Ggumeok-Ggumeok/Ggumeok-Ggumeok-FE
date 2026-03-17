import React, { useState } from 'react';
import { MealTime } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { title: string; description: string; category: Exclude<MealTime, '전체'> }) => void;
}

const CATEGORIES: Exclude<MealTime, '전체'>[] = ['아침', '점심', '저녁', '간식'];

const FoodWriteModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Exclude<MealTime, '전체'>>('점심');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit?.({ title: title.trim(), description: description.trim(), category });
    setTitle('');
    setDescription('');
    setCategory('점심');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#FF8FAB] px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-bold text-lg">🍽️ 오늘의 메뉴 추천</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white text-xl font-bold">✕</button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4">
          {/* Category */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">카테고리</label>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                    category === cat
                      ? 'bg-[#FF8FAB] text-white'
                      : 'bg-[#FFF5F7] text-gray-500 border border-[#FFE4EC] hover:bg-[#FFE4EC]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="메뉴 이름을 입력해주세요"
              className="w-full border border-[#FFD6E0] rounded-xl px-4 py-2.5 text-sm bg-[#FFF5F7] placeholder-gray-300 focus:outline-none focus:border-[#FF8FAB]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">설명</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="어떤 메뉴인지 자세히 알려주세요!"
              rows={4}
              className="w-full border border-[#FFD6E0] rounded-xl px-4 py-2.5 text-sm bg-[#FFF5F7] placeholder-gray-300 focus:outline-none focus:border-[#FF8FAB] resize-none"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="w-full bg-[#FF8FAB] hover:bg-[#FF6B9D] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors"
          >
            추천 올리기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodWriteModal;

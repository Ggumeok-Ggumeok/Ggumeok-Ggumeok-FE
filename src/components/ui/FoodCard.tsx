import React from 'react';
import { FoodPost } from '../../types';

interface Props {
  post: FoodPost;
  onClick?: () => void;
}

const CATEGORY_COLORS: Record<FoodPost['category'], string> = {
  아침: 'bg-yellow-100 text-yellow-600',
  점심: 'bg-blue-100 text-blue-600',
  저녁: 'bg-purple-100 text-purple-600',
  간식: 'bg-green-100 text-green-600',
};

const FoodCard: React.FC<Props> = ({ post, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-[#FFE4EC] overflow-hidden cursor-pointer hover:shadow-md transition-shadow flex flex-col"
    >
      {/* Image */}
      <div className="h-36 bg-gray-100 overflow-hidden flex-shrink-0">
        {post.imageUrl ? (
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
            🍽️
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Category badge */}
        <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full ${CATEGORY_COLORS[post.category]}`}>
          {post.category}
        </span>

        {/* Title */}
        <h3 className="font-bold text-gray-800 text-sm line-clamp-1">{post.title}</h3>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 flex-1">{post.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-[#FFD6E0] flex items-center justify-center text-xs">
              {post.author[0]}
            </div>
            <span className="text-xs text-gray-400">{post.author}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <span className="text-[#FF8FAB]">♥</span> {post.likes}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <span>💬</span> {post.comments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

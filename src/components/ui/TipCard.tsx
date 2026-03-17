import React from 'react';
import { TipPost } from '../../types';

interface Props {
  post: TipPost;
  onClick?: () => void;
}

const TipCard: React.FC<Props> = ({ post, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-[#FFE4EC] overflow-hidden cursor-pointer hover:shadow-md transition-shadow flex flex-col"
    >
      {/* Image */}
      {post.imageUrl && (
        <div className="h-36 bg-gray-100 overflow-hidden flex-shrink-0">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Body */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Title */}
        <h3 className="font-bold text-gray-800 text-sm line-clamp-2 leading-snug">{post.title}</h3>

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

export default TipCard;

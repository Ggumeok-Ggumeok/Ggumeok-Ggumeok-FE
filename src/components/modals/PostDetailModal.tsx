import React, { useState } from 'react';
import { FoodPost, TipPost, Comment } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  post: FoodPost | TipPost | null;
  postType?: 'food' | 'tip';
}

const MOCK_COMMENTS: Comment[] = [
  { id: 1, author: '맛있쟁이', content: '너무 맛있겠다! 저도 먹어봐야겠어요 😋', createdAt: '2024-01-15' },
  { id: 2, author: '먹짱', content: '이거 진짜 강추예요! 자주 먹는 메뉴에요', createdAt: '2024-01-15' },
];

const CATEGORY_COLORS: Record<string, string> = {
  아침: 'bg-yellow-100 text-yellow-600',
  점심: 'bg-blue-100 text-blue-600',
  저녁: 'bg-purple-100 text-purple-600',
  간식: 'bg-green-100 text-green-600',
};

const PostDetailModal: React.FC<Props> = ({ isOpen, onClose, post, postType = 'food' }) => {
  const [commentInput, setCommentInput] = useState('');
  const [liked, setLiked] = useState(false);
  const [comments] = useState<Comment[]>(MOCK_COMMENTS);

  if (!isOpen || !post) return null;

  const isFoodPost = postType === 'food' && 'category' in post;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        {post.imageUrl ? (
          <div className="h-48 bg-gray-100 flex-shrink-0">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="h-32 bg-[#FFE4EC] flex items-center justify-center text-5xl flex-shrink-0">
            {isFoodPost ? '🍽️' : '🐽'}
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="px-6 py-4 flex flex-col gap-3 flex-1 overflow-y-auto">
            {/* Category badge (food only) */}
            {isFoodPost && (
              <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full ${CATEGORY_COLORS[(post as FoodPost).category]}`}>
                {(post as FoodPost).category}
              </span>
            )}

            {/* Title */}
            <h2 className="text-lg font-bold text-gray-800">{post.title}</h2>

            {/* Author + date */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#FFD6E0] flex items-center justify-center text-sm font-bold text-[#FF8FAB]">
                  {post.author[0]}
                </div>
                <span className="text-sm text-gray-500">{post.author}</span>
              </div>
              <span className="text-xs text-gray-400">{post.createdAt}</span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">{post.description}</p>

            {/* Like / comment counts */}
            <div className="flex items-center gap-4 pt-1">
              <button
                onClick={() => setLiked((v) => !v)}
                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${liked ? 'text-[#FF6B9D]' : 'text-gray-400 hover:text-[#FF8FAB]'}`}
              >
                <span>{liked ? '♥' : '♡'}</span>
                <span>{post.likes + (liked ? 1 : 0)}</span>
              </button>
              <span className="flex items-center gap-1.5 text-sm text-gray-400">
                <span>💬</span> {post.comments}
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 pt-3">
              <p className="text-sm font-semibold text-gray-700 mb-3">댓글 {comments.length}</p>
              <div className="flex flex-col gap-3">
                {comments.map((c) => (
                  <div key={c.id} className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#FFD6E0] flex items-center justify-center text-xs font-bold text-[#FF8FAB] flex-shrink-0">
                      {c.author[0]}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-700">{c.author}</span>
                        <span className="text-xs text-gray-400">{c.createdAt}</span>
                      </div>
                      <p className="text-sm text-gray-600">{c.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comment input */}
          <div className="px-6 py-4 border-t border-gray-100 flex gap-2 flex-shrink-0">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="댓글을 입력하세요..."
              className="flex-1 border border-[#FFD6E0] rounded-xl px-4 py-2 text-sm bg-[#FFF5F7] placeholder-gray-300 focus:outline-none focus:border-[#FF8FAB]"
            />
            <button
              disabled={!commentInput.trim()}
              className="px-4 py-2 bg-[#FF8FAB] hover:bg-[#FF6B9D] disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-colors"
            >
              등록
            </button>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white text-sm transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default PostDetailModal;

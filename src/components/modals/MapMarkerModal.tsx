import React from 'react';
import { Restaurant } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  restaurant: Restaurant | null;
}

const MapMarkerModal: React.FC<Props> = ({ isOpen, onClose, restaurant }) => {
  const [liked, setLiked] = React.useState(false);

  if (!isOpen || !restaurant) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-[360px] overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Restaurant image */}
        <div className="w-full h-40 bg-gray-200 relative overflow-hidden">
          {restaurant.imageUrl ? (
            <img
              src={restaurant.imageUrl}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              사진 없음
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-3">
          {/* Location badge */}
          <div className="flex items-center gap-1">
            <span className="text-[#FF8FAB] text-xs">📍</span>
            <span className="text-xs font-semibold text-[#FF8FAB]">{restaurant.location}</span>
          </div>

          {/* Restaurant name */}
          <h2 className="text-xl font-extrabold text-gray-800">{restaurant.name}</h2>

          {/* Menu description */}
          <p className="text-sm text-gray-500 leading-relaxed">{restaurant.menuDescription}</p>

          {/* Footer actions */}
          <div className="flex items-center justify-between mt-2">
            <button
              onClick={() => setLiked((prev) => !prev)}
              className={`flex items-center gap-1.5 border px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                liked
                  ? 'border-[#FF8FAB] bg-[#FFF5F7] text-[#FF8FAB]'
                  : 'border-[#FFD6E0] bg-[#FFF5F7] text-[#FF8FAB]'
              }`}
            >
              {liked ? '❤️' : '🤍'}
              <span>{restaurant.likes + (liked ? 1 : 0)}</span>
            </button>

            <button
              onClick={onClose}
              className="bg-[#FF8FAB] hover:bg-[#FF6B9D] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapMarkerModal;

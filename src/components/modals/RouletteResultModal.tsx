import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  result: string;
}

const RouletteResultModal: React.FC<Props> = ({ isOpen, onClose, result }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-[400px] overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pink accent top bar */}
        <div className="h-2 bg-[#FF8FAB] w-full" />

        {/* Body */}
        <div className="flex flex-col items-center gap-5 px-8 py-10">
          <span className="text-5xl">🎉</span>
          <p className="text-sm text-gray-400 font-medium">오늘의 메뉴는!</p>
          <p className="text-4xl font-extrabold text-[#FF6B9D]">{result} 🍗</p>

          <button
            onClick={onClose}
            className="w-full mt-2 bg-[#FF8FAB] hover:bg-[#FF6B9D] text-white font-bold py-3 rounded-2xl transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouletteResultModal;

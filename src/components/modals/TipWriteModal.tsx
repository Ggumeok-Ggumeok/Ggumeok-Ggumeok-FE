import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { title: string; description: string }) => void;
}

const TipWriteModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit?.({ title: title.trim(), description: description.trim() });
    setTitle('');
    setDescription('');
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
          <h2 className="text-white font-bold text-lg">🐽 꿀팁 작성</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white text-xl font-bold">✕</button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="꿀팁 제목을 입력해주세요"
              className="w-full border border-[#FFD6E0] rounded-xl px-4 py-2.5 text-sm bg-[#FFF5F7] placeholder-gray-300 focus:outline-none focus:border-[#FF8FAB]"
            />
          </div>

          {/* Content */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">내용</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="꿀팁 내용을 자유롭게 작성해주세요!"
              rows={5}
              className="w-full border border-[#FFD6E0] rounded-xl px-4 py-2.5 text-sm bg-[#FFF5F7] placeholder-gray-300 focus:outline-none focus:border-[#FF8FAB] resize-none"
            />
          </div>

          {/* Photo upload */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">사진 첨부 (선택)</label>
            <button className="w-full h-24 border-2 border-dashed border-[#FFD6E0] rounded-xl flex flex-col items-center justify-center gap-1 text-gray-400 hover:bg-[#FFF5F7] transition-colors">
              <span className="text-2xl">📷</span>
              <span className="text-xs">클릭하여 사진 업로드</span>
            </button>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="w-full bg-[#FF8FAB] hover:bg-[#FF6B9D] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors"
          >
            꿀팁 올리기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipWriteModal;

import React, { useState } from 'react';
import { Region } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { name: string; region: Region; menuDescription: string; imageFile: File | null }) => void;
}

const REGIONS: Region[] = ['서울', '대전', '부산', '울산', '전주'];

const RestaurantWriteModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [region, setRegion] = useState<Region>('서울');
  const [menuDescription, setMenuDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [mapSelected, setMapSelected] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit?.({ name, region, menuDescription, imageFile });
    // reset
    setName('');
    setMenuDescription('');
    setImageFile(null);
    setMapSelected(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-[480px] overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#FF8FAB] px-6 py-4 flex items-center justify-between">
          <span className="text-white font-bold text-lg">🐷 식당 추천 작성</span>
          <button onClick={onClose} className="text-white text-xl font-bold hover:opacity-70">✕</button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4">
          {/* Map location picker */}
          <div>
            <p className="text-sm font-bold text-gray-700 mb-2">📍 위치 선택</p>
            <button
              onClick={() => setMapSelected(true)}
              className={`w-full h-36 rounded-xl border flex items-center justify-center gap-2 text-sm transition-colors ${
                mapSelected
                  ? 'bg-green-50 border-green-300 text-green-600'
                  : 'bg-[#E8F5E9] border-[#C8E6C9] text-gray-500 hover:opacity-80'
              }`}
            >
              <span className="text-2xl">🗺️</span>
              {mapSelected ? '위치가 선택되었습니다' : '지도에서 위치를 선택하세요'}
            </button>
          </div>

          {/* Region select */}
          <div>
            <p className="text-sm font-bold text-gray-700 mb-2">🌏 지역 선택</p>
            <div className="flex gap-2 flex-wrap">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    region === r
                      ? 'bg-[#FF8FAB] text-white border-[#FF8FAB]'
                      : 'bg-white text-gray-500 border-[#FFD6E0]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Restaurant name */}
          <div>
            <p className="text-sm font-bold text-gray-700 mb-2">🏪 가게 이름</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="가게 이름을 입력하세요"
              className="w-full border border-[#FFD6E0] rounded-xl px-4 py-2.5 text-sm bg-[#FFF5F7] placeholder-gray-300 focus:outline-none focus:border-[#FF8FAB]"
            />
          </div>

          {/* Menu description */}
          <div>
            <p className="text-sm font-bold text-gray-700 mb-2">🍽️ 메뉴 추천 내용</p>
            <textarea
              value={menuDescription}
              onChange={(e) => setMenuDescription(e.target.value)}
              placeholder="추천하는 메뉴와 이유를 적어주세요..."
              rows={3}
              className="w-full border border-[#FFD6E0] rounded-xl px-4 py-3 text-sm bg-[#FFF5F7] placeholder-gray-300 resize-none focus:outline-none focus:border-[#FF8FAB]"
            />
          </div>

          {/* Photo upload (optional) */}
          <div>
            <p className="text-sm font-bold text-gray-700 mb-2">📷 사진 업로드 <span className="text-gray-400 font-normal">(선택)</span></p>
            <label className="w-full h-14 border border-[#FFD6E0] rounded-xl flex items-center justify-center gap-2 text-sm text-gray-400 cursor-pointer hover:bg-[#FFF5F7] transition-colors">
              🖼️ 사진 선택하기
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              />
            </label>
            {imageFile && (
              <p className="text-xs text-[#FF8FAB] mt-1">{imageFile.name}</p>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#FF8FAB] hover:bg-[#FF6B9D] text-white font-bold py-3 rounded-2xl transition-colors mt-1"
          >
            추천 등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantWriteModal;

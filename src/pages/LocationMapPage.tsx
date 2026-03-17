import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import MapMarkerModal from '../components/modals/MapMarkerModal';
import RestaurantWriteModal from '../components/modals/RestaurantWriteModal';
import { Region, Restaurant } from '../types';

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_RESTAURANTS: Restaurant[] = [
  { id: 1, name: '을지로 노가리골목', menuDescription: '🍺 맥주 + 노가리 세트', location: '서울 종로구', region: '서울', likes: 38, lat: 37.5665, lng: 126.9780 },
  { id: 2, name: '홍대 파스타 맛집 일미', menuDescription: '🍝 트러플 크림 파스타 강추!', location: '서울 마포구', region: '서울', likes: 51, lat: 37.5563, lng: 126.9234 },
  { id: 3, name: '이태원 스모키버거', menuDescription: '🍔 스모키 버거 세트 추천', location: '서울 용산구', region: '서울', likes: 29, lat: 37.5344, lng: 126.9946 },
  { id: 4, name: '종로 육칼국수', menuDescription: '🍜 육개장 칼국수 강추', location: '서울 종로구', region: '서울', likes: 17, lat: 37.5723, lng: 126.9794 },
  { id: 5, name: '성심당 카페', menuDescription: '🥐 튀소 + 딸기케이크 추천', location: '대전 중구', region: '대전', likes: 62, lat: 36.3281, lng: 127.4270 },
  { id: 6, name: '부산 해운대 횟집 바다향', menuDescription: '🐟 물회 + 모둠회 세트', location: '부산 해운대구', region: '부산', likes: 44, lat: 35.1630, lng: 129.1635 },
  { id: 7, name: '인천 차이나타운 만두집', menuDescription: '🥟 왕만두 + 짬뽕 강추', location: '인천 중구', region: '울산', likes: 33, lat: 37.4764, lng: 126.6167 },
  { id: 8, name: '전주 비빔밥 명가', menuDescription: '🥗 돌솥 비빔밥 추천', location: '전주 완산구', region: '전주', likes: 71, lat: 35.8147, lng: 127.1130 },
];

const REGIONS: Region[] = ['서울', '대전', '부산', '울산', '전주'];

// ─── Map placeholder (ready for real API integration) ─────────────────────────
/**
 * MapView component is a placeholder for a real map API (e.g. Naver Maps, Kakao Maps, Leaflet).
 * Replace the inner div with the actual map SDK initialization.
 *
 * Props:
 *  - restaurants: Restaurant[]  — list to show as markers
 *  - selectedId: number | null  — currently highlighted marker
 *  - onMarkerClick: (r: Restaurant) => void  — called when a marker is clicked
 */
interface MapViewProps {
  restaurants: Restaurant[];
  selectedId: number | null;
  onMarkerClick: (r: Restaurant) => void;
}

const MapView: React.FC<MapViewProps> = ({ restaurants, selectedId, onMarkerClick }) => {
  return (
    /**
     * TODO: Replace this div with a map SDK container.
     * For Naver Maps:  <div id="map" ref={mapRef} className="w-full h-full" />
     * For Leaflet:     <MapContainer center={[37.5665, 126.9780]} zoom={11} ... />
     */
    <div className="w-full h-full bg-[#D4E6B5] relative overflow-hidden select-none">
      {/* Decorative road grid */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div key={`h-${i}`} className="absolute left-0 right-0 h-2 bg-white opacity-50" style={{ top: `${(i + 1) * 18}%` }} />
        ))}
        {[...Array(4)].map((_, i) => (
          <div key={`v-${i}`} className="absolute top-0 bottom-0 w-2 bg-white opacity-50" style={{ left: `${(i + 1) * 22}%` }} />
        ))}
      </div>

      {/* Fake markers positioned proportionally */}
      {restaurants.map((r, i) => {
        const positions = [
          { left: '18%', top: '22%' },
          { left: '42%', top: '38%' },
          { left: '65%', top: '55%' },
          { left: '28%', top: '65%' },
          { left: '55%', top: '20%' },
          { left: '78%', top: '42%' },
          { left: '12%', top: '48%' },
          { left: '85%', top: '68%' },
        ];
        const pos = positions[i % positions.length];
        const isSelected = r.id === selectedId;

        return (
          <button
            key={r.id}
            onClick={() => onMarkerClick(r)}
            className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center transition-transform hover:scale-110"
            style={pos}
          >
            <div className={`w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-bold ${
              isSelected ? 'bg-[#FF6B9D] scale-125' : 'bg-[#FF8FAB]'
            }`}>
              {i + 1}
            </div>
            <div
              className="w-2 h-2"
              style={{
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: `6px solid ${isSelected ? '#FF6B9D' : '#FF8FAB'}`,
              }}
            />
          </button>
        );
      })}

      {/* Zoom controls */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow overflow-hidden">
        <button className="w-10 h-10 flex items-center justify-center text-gray-700 border-b border-gray-100 hover:bg-gray-50 font-bold text-lg">+</button>
        <button className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-50 font-bold text-lg">−</button>
      </div>
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────
const LocationMapPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region>('서울');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isMarkerModalOpen, setIsMarkerModalOpen] = useState(false);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);

  const filteredRestaurants = MOCK_RESTAURANTS.filter((r) => r.region === selectedRegion);

  const handleMarkerClick = (r: Restaurant) => {
    setSelectedRestaurant(r);
    setIsMarkerModalOpen(true);
  };

  const handleListItemClick = (r: Restaurant) => {
    setHighlightedId(r.id);
    // In a real map integration, this would pan/zoom the map to the marker
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] flex flex-col">
      <Navbar />

      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>

        {/* ── 1. Region sidebar ──────────────────────────────────────────────── */}
        <aside className="w-20 h-full bg-[#2C2C2C] flex flex-col gap-1 pt-5 px-0">
          <p className="text-gray-400 text-[10px] font-semibold text-center mb-2 tracking-widest uppercase">지역</p>
          {REGIONS.map((region) => {
            const isActive = region === selectedRegion;
            return (
              <button
                key={region}
                onClick={() => { setSelectedRegion(region); setHighlightedId(null); }}
                className={`w-full py-4 text-sm font-semibold rounded-lg transition-colors ${
                  isActive ? 'bg-[#FF8FAB] text-white' : 'bg-[#3A3A3A] text-gray-400 hover:bg-[#444]'
                }`}
              >
                {region}
              </button>
            );
          })}
        </aside>

        {/* ── 2. Restaurant list panel ───────────────────────────────────────── */}
        <div className="w-[300px] h-full bg-white border-r border-gray-100 flex flex-col">
          {/* Panel header */}
          <div className="px-5 h-[60px] flex items-center justify-between border-b border-gray-100 flex-shrink-0">
            <span className="text-base font-bold text-gray-800">{selectedRegion} 맛집</span>
            <span className="text-sm text-gray-400">{filteredRestaurants.length}곳</span>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {filteredRestaurants.length === 0 ? (
              <div className="flex items-center justify-center h-40 text-sm text-gray-400">
                등록된 맛집이 없습니다
              </div>
            ) : (
              filteredRestaurants.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleListItemClick(r)}
                  className={`w-full text-left px-5 py-[14px] border-b border-gray-50 transition-colors hover:bg-[#FFF5F7] flex flex-col gap-1 ${
                    highlightedId === r.id ? 'bg-[#FFF5F7]' : ''
                  }`}
                >
                  <span className={`text-sm font-bold ${highlightedId === r.id ? 'text-[#FF8FAB]' : 'text-gray-800'}`}>
                    {r.name}
                  </span>
                  <span className="text-xs text-gray-500">{r.menuDescription}</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[#FF8FAB] text-xs">♥</span>
                    <span className="text-xs text-gray-400">{r.likes}</span>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Write button */}
          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="w-full h-14 bg-[#FFF5F7] border-t border-[#FFD6E0] flex items-center justify-center gap-2 text-sm font-semibold text-[#FF8FAB] hover:bg-[#FFE4EC] transition-colors flex-shrink-0"
          >
            <span>+</span> 식당 추천 작성
          </button>
        </div>

        {/* ── 3. Map area ────────────────────────────────────────────────────── */}
        <div className="flex-1 h-full">
          <MapView
            restaurants={filteredRestaurants}
            selectedId={highlightedId}
            onMarkerClick={handleMarkerClick}
          />
        </div>
      </div>

      {/* Modals */}
      <MapMarkerModal
        isOpen={isMarkerModalOpen}
        onClose={() => setIsMarkerModalOpen(false)}
        restaurant={selectedRestaurant}
      />
      <RestaurantWriteModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
      />
    </div>
  );
};

export default LocationMapPage;

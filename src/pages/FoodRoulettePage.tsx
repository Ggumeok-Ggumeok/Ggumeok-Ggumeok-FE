import React, { useState, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import RouletteResultModal from '../components/modals/RouletteResultModal';
import { RouletteItem } from '../types';

const INITIAL_ITEMS: RouletteItem[] = [
  { id: 1, name: '치킨' },
  { id: 2, name: '피자' },
  { id: 3, name: '라면' },
  { id: 4, name: '초밥' },
  { id: 5, name: '햄버거' },
];

// Roulette wheel segment colors (rotating pink shades)
const SEGMENT_COLORS = ['#FF8FAB', '#FFB6C1', '#FFCDD2', '#FFD6E0', '#FFB6C1', '#FF8FAB'];

const FoodRoulettePage: React.FC = () => {
  const [items, setItems] = useState<RouletteItem[]>(INITIAL_ITEMS);
  const [inputValue, setInputValue] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [resultFood, setResultFood] = useState('');
  const nextId = useRef(INITIAL_ITEMS.length + 1);

  const addItem = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setItems((prev) => [...prev, { id: nextId.current++, name: trimmed }]);
    setInputValue('');
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const spin = () => {
    if (isSpinning || items.length === 0) return;

    setIsSpinning(true);
    const extraSpins = 5 * 360; // 5 full rotations
    const randomAngle = Math.floor(Math.random() * 360);
    const totalRotation = rotation + extraSpins + randomAngle;
    setRotation(totalRotation);

    setTimeout(() => {
      // Determine which item won
      const normalized = totalRotation % 360;
      const segmentAngle = 360 / items.length;
      const winnerIndex = Math.floor((360 - (normalized % 360)) / segmentAngle) % items.length;
      setResultFood(items[winnerIndex].name);
      setIsSpinning(false);
      setIsResultOpen(true);
    }, 3500);
  };

  // Build SVG roulette wheel
  const radius = 175;
  const cx = 180;
  const cy = 180;
  const segmentAngle = items.length > 0 ? 360 / items.length : 360;

  const buildPath = (index: number) => {
    const startAngle = ((index * segmentAngle - 90) * Math.PI) / 180;
    const endAngle = (((index + 1) * segmentAngle - 90) * Math.PI) / 180;
    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);
    const largeArc = segmentAngle > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] flex flex-col">
      <Navbar />

      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
        {/* Left: Food list panel */}
        <aside className="w-80 h-full bg-white border-r border-[#FFE4EC] flex flex-col gap-5 p-8">
          <div>
            <h2 className="text-xl font-bold text-gray-800">🍽️ 음식 목록</h2>
            <p className="text-sm text-gray-400 mt-1">먹고 싶은 음식을 추가해보세요</p>
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addItem()}
              placeholder="음식 이름 입력..."
              className="flex-1 border border-[#FFD6E0] rounded-xl px-4 py-2 text-sm bg-[#FFF5F7] placeholder-gray-300 focus:outline-none focus:border-[#FF8FAB]"
            />
            <button
              onClick={addItem}
              className="w-10 h-10 bg-[#FF8FAB] hover:bg-[#FF6B9D] text-white rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0 transition-colors"
            >
              +
            </button>
          </div>

          {/* Items list */}
          <div className="flex flex-col gap-2 overflow-y-auto flex-1">
            {items.map((item, i) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-[#FFF5F7] rounded-xl px-4 py-3"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }}
                  />
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-300 hover:text-gray-500 transition-colors text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </aside>

        {/* Center: Roulette wheel */}
        <main className="flex-1 flex flex-col items-center justify-center gap-8 px-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">🎡 음식 룰렛</h1>
            <p className="text-sm text-gray-400 mt-2">룰렛을 돌려서 오늘의 메뉴를 결정해요!</p>
          </div>

          {/* Wheel */}
          <div className="relative w-[360px] h-[360px]">
            {/* Pointer (top) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10">
              <div
                className="w-0 h-0"
                style={{
                  borderLeft: '12px solid transparent',
                  borderRight: '12px solid transparent',
                  borderBottom: '20px solid #FF6B9D',
                }}
              />
            </div>

            {/* SVG wheel */}
            <div
              className="w-full h-full"
              style={{
                transition: isSpinning ? 'transform 3.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
                transform: `rotate(${rotation}deg)`,
              }}
            >
              {items.length > 0 ? (
                <svg viewBox="0 0 360 360" className="w-full h-full">
                  {items.map((item, i) => (
                    <g key={item.id}>
                      <path
                        d={buildPath(i)}
                        fill={SEGMENT_COLORS[i % SEGMENT_COLORS.length]}
                        stroke="white"
                        strokeWidth="2"
                      />
                      {/* Label */}
                      {items.length <= 10 && (
                        <text
                          x={
                            cx +
                            (radius * 0.65) *
                              Math.cos((((i + 0.5) * segmentAngle - 90) * Math.PI) / 180)
                          }
                          y={
                            cy +
                            (radius * 0.65) *
                              Math.sin((((i + 0.5) * segmentAngle - 90) * Math.PI) / 180)
                          }
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="white"
                          fontSize="14"
                          fontWeight="bold"
                        >
                          {item.name}
                        </text>
                      )}
                    </g>
                  ))}
                  {/* Center circle */}
                  <circle cx={cx} cy={cy} r={30} fill="white" stroke="#FF8FAB" strokeWidth="3" />
                </svg>
              ) : (
                <div className="w-full h-full rounded-full bg-[#FFD6E0] flex items-center justify-center text-gray-400 text-sm">
                  음식을 추가해주세요
                </div>
              )}
            </div>
          </div>

          {/* Spin button */}
          <button
            onClick={spin}
            disabled={isSpinning || items.length === 0}
            className="bg-[#FF8FAB] hover:bg-[#FF6B9D] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg px-14 py-4 rounded-full shadow-md transition-colors"
          >
            🎲 룰렛 돌리기!
          </button>
        </main>
      </div>

      <RouletteResultModal
        isOpen={isResultOpen}
        onClose={() => setIsResultOpen(false)}
        result={resultFood}
      />
    </div>
  );
};

export default FoodRoulettePage;

import React, { useState } from 'react';
import { CHINA_CITIES, ChinaCity } from '../data/chinaData';
import { Language } from '../utils/i18n';
import { playClickSound } from '../utils/audio';

interface ChinaIllustratedMapProps {
  lang: Language;
  soundEnabled: boolean;
  unlockedBadges: string[];
  selectedCity: ChinaCity;
  onSelectCity: (city: ChinaCity, enterDetails?: boolean) => void;
  onCityStickerClick?: (city: ChinaCity) => void;
}

// Precise pixel coordinates on 900x600 illustrated canvas
const CITY_MAP_POSITIONS: Record<string, { x: number; y: number; sticker: string; stickerOffset: { x: number; y: number } }> = {
  beijing: { x: 635, y: 220, sticker: '🏯', stickerOffset: { x: 0, y: -36 } },
  hangzhou: { x: 695, y: 395, sticker: '🌸', stickerOffset: { x: 18, y: 0 } },
  xian: { x: 530, y: 325, sticker: '🏺', stickerOffset: { x: 0, y: -36 } },
  chengdu: { x: 450, y: 390, sticker: '🐼', stickerOffset: { x: -28, y: 0 } },
  shanghai: { x: 725, y: 375, sticker: '🗼', stickerOffset: { x: 22, y: -20 } },
  guilin: { x: 545, y: 475, sticker: '⛰️', stickerOffset: { x: -26, y: 0 } },
  suzhou: { x: 690, y: 365, sticker: '🪷', stickerOffset: { x: 0, y: -36 } },
  dunhuang: { x: 325, y: 230, sticker: '🐪', stickerOffset: { x: 0, y: -36 } },
  lhasa: { x: 260, y: 410, sticker: '🏔️', stickerOffset: { x: 0, y: -36 } },
  huangshan: { x: 655, y: 410, sticker: '🌲', stickerOffset: { x: 0, y: 26 } },
  guangzhou: { x: 595, y: 510, sticker: '🥟', stickerOffset: { x: 22, y: 15 } },
  nanjing: { x: 665, y: 350, sticker: '🏮', stickerOffset: { x: -24, y: -20 } },
};

export const ChinaIllustratedMap: React.FC<ChinaIllustratedMapProps> = ({
  lang,
  soundEnabled,
  unlockedBadges,
  selectedCity,
  onSelectCity,
  onCityStickerClick,
}) => {
  const [hoveredCityId, setHoveredCityId] = useState<string | null>(null);

  const getCityName = (city: ChinaCity) =>
    lang === 'fr' ? city.nameFr : lang === 'zh' ? city.nameZh : city.nameEn;

  const handleCityClick = (city: ChinaCity) => {
    if (soundEnabled) playClickSound();
    onSelectCity(city, false);
    if (onCityStickerClick) {
      onCityStickerClick(city);
    } else {
      onSelectCity(city, true);
    }
  };

  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] min-h-[380px] max-h-[560px] bg-sky-100 rounded-3xl border-3 border-slate-900 comic-box overflow-hidden select-none shadow-comic">
      {/* Decorative Compass Rose & Legend */}
      <div className="absolute top-3 left-3 z-10 bg-white/95 border-2 border-slate-900 px-3 py-1.5 rounded-2xl comic-box-sm flex items-center gap-2 shadow-sm pointer-events-none">
        <span className="text-xl">🧭</span>
        <div>
          <div className="font-comic text-xs font-black text-slate-900">
            {lang === 'zh' ? '华夏探险手绘大地图' : lang === 'fr' ? 'Carte Illustrée de la Chine' : 'Pictorial China Map'}
          </div>
          <div className="text-[10px] text-slate-500 font-bold">
            {lang === 'zh' ? '点击地标图标，探索名城故事 ➔' : 'Tap landmark stickers to explore!'}
          </div>
        </div>
      </div>

      {/* SVG Cartoon Map Canvas */}
      <svg
        className="w-full h-full"
        viewBox="0 0 900 600"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="oceanGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#7dd3fc" />
          </radialGradient>
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Ocean Background */}
        <rect width="900" height="600" fill="url(#oceanGlow)" />

        {/* Ocean Waves */}
        {[
          { x: 800, y: 150 },
          { x: 780, y: 280 },
          { x: 820, y: 430 },
          { x: 740, y: 530 },
          { x: 100, y: 520 },
        ].map((wave, idx) => (
          <path
            key={idx}
            d={`M${wave.x} ${wave.y} Q${wave.x + 15} ${wave.y - 8} ${wave.x + 30} ${wave.y} Q${wave.x + 45} ${wave.y - 8} ${wave.x + 60} ${wave.y}`}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ))}

        {/* China Landmass Base (Stylized Rooster Silhouette with smooth comic curves) */}
        <g filter="url(#softShadow)">
          {/* Main Continental Landmass */}
          <path
            d="
              M 160 170
              Q 260 130 380 150
              Q 480 100 580 90
              Q 680 70 760 120
              Q 800 160 760 210
              Q 700 220 670 200
              Q 640 220 670 250
              Q 740 260 760 300
              Q 780 340 740 380
              Q 720 430 680 470
              Q 640 540 560 550
              Q 480 540 440 480
              Q 380 470 300 450
              Q 220 440 180 380
              Q 120 330 130 250
              Q 140 200 160 170
              Z
            "
            fill="#dcfce7"
            stroke="#0f172a"
            strokeWidth="3.5"
          />

          {/* Western Gobi Desert & Silk Road Zone (Dunhuang / Xinjiang) */}
          <path
            d="
              M 160 170
              Q 260 130 380 150
              Q 430 200 380 270
              Q 280 290 180 260
              Q 140 200 160 170
              Z
            "
            fill="#fef08a"
            stroke="#ca8a04"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />

          {/* Qinghai-Tibet Plateau (Lhasa snow mountains) */}
          <path
            d="
              M 180 270
              Q 290 280 360 330
              Q 380 420 320 450
              Q 220 440 180 380
              Q 150 330 180 270
              Z
            "
            fill="#e0f2fe"
            stroke="#0284c7"
            strokeWidth="1.5"
          />

          {/* Little Snowy Mountain Triangles in Tibet */}
          {[
            { x: 210, y: 340 },
            { x: 250, y: 320 },
            { x: 300, y: 360 },
            { x: 230, y: 380 },
          ].map((m, idx) => (
            <polygon
              key={idx}
              points={`${m.x},${m.y} ${m.x + 12},${m.y - 16} ${m.x + 24},${m.y}`}
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth="1.5"
            />
          ))}

          {/* Desert Dune Ripples in Dunhuang */}
          {[
            { x: 290, y: 200 },
            { x: 340, y: 190 },
            { x: 310, y: 240 },
          ].map((d, idx) => (
            <path
              key={idx}
              d={`M${d.x} ${d.y} Q${d.x + 20} ${d.y - 6} ${d.x + 40} ${d.y}`}
              fill="none"
              stroke="#eab308"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}

          {/* Hainan Island */}
          <ellipse cx="560" cy="570" rx="22" ry="16" fill="#86efac" stroke="#0f172a" strokeWidth="2.5" />

          {/* Taiwan Island */}
          <ellipse cx="765" cy="460" rx="14" ry="30" fill="#86efac" stroke="#0f172a" strokeWidth="2.5" transform="rotate(-15 765 460)" />
        </g>

        {/* Famous Rivers: Yellow River (黄河 - Golden "几" shape) */}
        <g>
          <path
            d="
              M 320 310
              Q 420 280 460 250
              Q 500 200 550 200
              Q 580 200 580 290
              Q 560 310 610 300
              Q 650 280 670 250
            "
            fill="none"
            stroke="#f59e0b"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Yellow River Label */}
          <text x="500" y="190" fill="#92400e" fontSize="11" fontFamily="Comic Sans MS, sans-serif" fontWeight="bold">
            黄河 Yellow River
          </text>
        </g>

        {/* Famous Rivers: Yangtze River (长江 - Azure flowing across China) */}
        <g>
          <path
            d="
              M 280 370
              Q 360 360 410 400
              Q 460 410 510 390
              Q 580 370 630 400
              Q 670 390 710 375
            "
            fill="none"
            stroke="#0284c7"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Yangtze River Label */}
          <text x="490" y="425" fill="#0369a1" fontSize="11" fontFamily="Comic Sans MS, sans-serif" fontWeight="bold">
            长江 Yangtze River
          </text>
        </g>

        {/* 12 Iconic Cartoon City Landmark Pins */}
        {CHINA_CITIES.map((city) => {
          const pos = CITY_MAP_POSITIONS[city.id] || { x: 500, y: 300, sticker: '📍', stickerOffset: { x: 0, y: -30 } };
          const isSelected = selectedCity.id === city.id;
          const isHovered = hoveredCityId === city.id;
          const isUnlocked = unlockedBadges.includes(city.id);
          const cityName = getCityName(city);

          return (
            <g
              key={city.id}
              className="cursor-pointer group"
              onClick={() => handleCityClick(city)}
              onMouseEnter={() => setHoveredCityId(city.id)}
              onMouseLeave={() => setHoveredCityId(null)}
            >
              {/* Pulsing ring around selected/hovered city */}
              {(isSelected || isHovered) && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="24"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeDasharray="4,4"
                  className="animate-spin"
                  style={{ animationDuration: '6s' }}
                />
              )}

              {/* Pin Base Circle */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r="14"
                fill={isSelected ? '#ef4444' : isUnlocked ? '#10b981' : '#ffffff'}
                stroke="#0f172a"
                strokeWidth="2.5"
              />

              {/* City Icon in Center */}
              <text
                x={pos.x}
                y={pos.y + 5}
                textAnchor="middle"
                fontSize="14"
                className="select-none pointer-events-none"
              >
                {city.icon}
              </text>

              {/* Big Animated Character / Landmark Sticker Floating on Map */}
              <g
                transform={`translate(${pos.x + pos.stickerOffset.x}, ${pos.y + pos.stickerOffset.y}) scale(${
                  isSelected || isHovered ? 1.3 : 1.1
                })`}
                className="transition-transform duration-200"
              >
                <circle cx="0" cy="0" r="16" fill="#ffffff" stroke="#0f172a" strokeWidth="2" filter="url(#softShadow)" />
                <text x="0" y="6" textAnchor="middle" fontSize="18" className="select-none pointer-events-none">
                  {pos.sticker}
                </text>
              </g>

              {/* City Label Tag */}
              <g transform={`translate(${pos.x}, ${pos.y + 22})`}>
                <rect
                  x="-32"
                  y="-8"
                  width="64"
                  height="16"
                  rx="6"
                  fill={isSelected ? '#0f172a' : '#ffffff'}
                  stroke="#0f172a"
                  strokeWidth="1.5"
                />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fill={isSelected ? '#ffffff' : '#0f172a'}
                  fontSize="10"
                  fontFamily="Comic Sans MS, sans-serif"
                  fontWeight="bold"
                  className="select-none pointer-events-none"
                >
                  {cityName}
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      {/* Floating Bottom Card: Quick Action Preview */}
      <div className="absolute bottom-2.5 left-3 right-3 z-10 bg-white/95 border-2 border-slate-900 rounded-2xl p-2.5 sm:p-3 comic-box flex items-center justify-between gap-3 shadow-comic">
        <div
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => handleCityClick(selectedCity)}
          title={lang === 'zh' ? '点击查看城市冷知识' : 'Click to view fun fact'}
        >
          <span className="text-3xl p-1 bg-amber-100 border border-slate-900 rounded-xl group-hover:scale-110 transition-transform shadow-comic-sm">
            {selectedCity.icon}
          </span>
          <div>
            <div className="font-comic text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
              <span>{getCityName(selectedCity)}</span>
              <span className="text-[10px] bg-red-100 text-red-700 border border-red-300 px-1.5 py-0.2 rounded font-bold">
                {lang === 'fr' ? selectedCity.landmarkFr : lang === 'zh' ? selectedCity.landmarkZh : selectedCity.landmarkEn}
              </span>
            </div>
            <div className="text-[11px] text-slate-600 font-medium">
              {lang === 'fr' ? selectedCity.taglineFr : lang === 'zh' ? selectedCity.taglineZh : selectedCity.taglineEn}
            </div>
          </div>
        </div>

        <button
          onClick={() => handleCityClick(selectedCity)}
          className="comic-btn px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-comic text-xs font-black rounded-xl shadow-comic transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
        >
          <span>💡</span>
          <span>{lang === 'fr' ? 'Découvrir' : lang === 'zh' ? '查看冷知识与探索' : 'Fun Fact & Discovery'}</span>
        </button>
      </div>
    </div>
  );
};

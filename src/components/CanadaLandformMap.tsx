import React, { useState } from 'react';
import {
  CANADA_LANDFORM_REGIONS,
  CanadaLandformRegion,
  CanadaRegionId,
} from '../data/canadaLandformsData';
import { Language } from '../utils/i18n';
import { playClickSound } from '../utils/audio';

interface CanadaLandformMapProps {
  lang: Language;
  soundEnabled?: boolean;
  /** Regions currently colored in */
  coloredRegions: CanadaRegionId[];
  /** Highlighted / active region */
  selectedRegionId?: CanadaRegionId | null;
  /** Region ID that just triggered a wrong-guess shake/flash */
  wrongRegionId?: CanadaRegionId | null;
  /** Show text labels on the map (false during quiz/test mode) */
  showLabels?: boolean;
  /** If true, visually emphasizes the 3 Ontario Grade 3 regions */
  grade3OntarioOnly?: boolean;
  /** Callback when a region on the map is clicked */
  onRegionClick: (regionId: CanadaRegionId) => void;
}

interface LabelPos {
  x: number;
  y: number;
}

const REGION_LABEL_POS: Record<CanadaRegionId, LabelPos> = {
  cordillera: { x: 145, y: 315 },
  plains: { x: 295, y: 345 },
  arctic: { x: 465, y: 122 },
  shield: { x: 645, y: 315 },
  hudson: { x: 492, y: 365 },
  stlawrence: { x: 565, y: 472 },
  appalachian: { x: 740, y: 438 },
};

export const CanadaLandformMap: React.FC<CanadaLandformMapProps> = ({
  lang,
  soundEnabled = true,
  coloredRegions,
  selectedRegionId = null,
  wrongRegionId = null,
  showLabels = true,
  grade3OntarioOnly = false,
  onRegionClick,
}) => {
  const [hoveredId, setHoveredId] = useState<CanadaRegionId | null>(null);

  const getRegion = (id: CanadaRegionId): CanadaLandformRegion =>
    CANADA_LANDFORM_REGIONS.find(r => r.id === id) || CANADA_LANDFORM_REGIONS[0];

  const isRegionDisabled = (id: CanadaRegionId) =>
    grade3OntarioOnly && !getRegion(id).inOntario;

  const getFill = (id: CanadaRegionId) => {
    const region = getRegion(id);
    if (isRegionDisabled(id)) return '#e2e8f0';
    if (wrongRegionId === id) return '#fda4af'; // soft rose flash on wrong guess
    if (coloredRegions.includes(id)) return region.color;
    if (hoveredId === id) return `${region.color}55`;
    return '#ffffff'; // Crisp coloring-sheet white!
  };

  const getStrokeWidth = (id: CanadaRegionId) => {
    if (isRegionDisabled(id)) return 1.6;
    if (selectedRegionId === id || hoveredId === id) return 3.5;
    return 2.2;
  };

  const handleClick = (id: CanadaRegionId) => {
    if (isRegionDisabled(id)) return;
    if (soundEnabled) playClickSound();
    onRegionClick(id);
  };

  return (
    <div className="relative w-full aspect-[16/10.5] min-h-[310px] max-h-[540px] bg-gradient-to-b from-sky-100 via-sky-50 to-blue-100 rounded-2xl border-2 border-slate-900 overflow-hidden select-none">
      {/* Subtle ocean compass rose */}
      <div className="absolute top-3 left-3 z-10 bg-white/95 border border-slate-300 px-3 py-1.5 rounded-xl text-[11px] font-comic font-bold text-slate-700 pointer-events-none">
        <span>🇨🇦 </span>
        <span>
          {lang === 'fr'
            ? 'Carte des 7 régions physiques du Canada'
            : lang === 'zh'
            ? '加拿大七大地貌分区填色地图'
            : 'Map of Canada’s 7 Landform Regions'}
        </span>
      </div>

      {/* Compass Rose top-right */}
      <div className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/90 border border-slate-300 flex flex-col items-center justify-center font-comic text-[9px] font-black text-slate-700 pointer-events-none leading-none">
        <span className="text-red-600">N</span>
        <span>🧭</span>
      </div>

      <svg
        className="w-full h-full"
        viewBox="0 0 880 560"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Interactive Map of Canada's 7 Landform Regions"
      >
        <defs>
          <filter id="mapDrop" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Subtle ocean wave marks */}
        {[
          { x: 52, y: 420 },
          { x: 785, y: 270 },
          { x: 790, y: 500 },
          { x: 115, y: 120 },
        ].map((w, i) => (
          <path
            key={i}
            d={`M${w.x} ${w.y} Q${w.x + 12} ${w.y - 6} ${w.x + 24} ${w.y} Q${w.x + 36} ${w.y - 6} ${w.x + 48} ${w.y}`}
            fill="none"
            stroke="#7dd3fc"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}

        {/* Ocean Names */}
        <text x="58" y="375" fill="#0369a1" opacity="0.55" fontSize="11" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
          {lang === 'fr' ? 'Océan Pacifique' : lang === 'zh' ? '太平洋' : 'Pacific Ocean'}
        </text>
        <text x="745" y="330" fill="#0369a1" opacity="0.55" fontSize="11" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
          {lang === 'fr' ? 'Océan Atlantique' : lang === 'zh' ? '大西洋' : 'Atlantic Ocean'}
        </text>
        <text x="200" y="65" fill="#0369a1" opacity="0.55" fontSize="11" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
          {lang === 'fr' ? 'Océan Arctique' : lang === 'zh' ? '北冰洋' : 'Arctic Ocean'}
        </text>

        <g filter="url(#mapDrop)">
          {/* 1. L'ARCTIQUE (Northern Arctic Islands + Nunavut Arctic Lands) */}
          <g
            onClick={() => handleClick('arctic')}
            onMouseEnter={() => setHoveredId('arctic')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-opacity"
          >
            {/* Ellesmere & Queen Elizabeth Islands (Far North) */}
            <path
              d="M445 36 L515 24 L568 48 L552 95 L498 106 L448 86 Z"
              fill={getFill('arctic')}
              stroke="#0f172a"
              strokeWidth={getStrokeWidth('arctic')}
              strokeLinejoin="round"
            />
            {/* Banks & Victoria Islands */}
            <path
              d="M278 96 L356 80 L414 102 L408 158 L338 170 L272 146 Z"
              fill={getFill('arctic')}
              stroke="#0f172a"
              strokeWidth={getStrokeWidth('arctic')}
              strokeLinejoin="round"
            />
            {/* Baffin Island (distinct large eastern Arctic island) */}
            <path
              d="M498 122 L578 104 L658 168 L645 224 L575 215 L525 178 Z"
              fill={getFill('arctic')}
              stroke="#0f172a"
              strokeWidth={getStrokeWidth('arctic')}
              strokeLinejoin="round"
            />
            {/* Southampton & Northern Arctic Coastal Strip */}
            <path
              d="M398 172 L495 162 L525 196 L468 214 L402 204 Z"
              fill={getFill('arctic')}
              stroke="#0f172a"
              strokeWidth={getStrokeWidth('arctic')}
              strokeLinejoin="round"
            />
          </g>

          {/* 2. LA CORDILLÈRE (Western Mountain Belt: Yukon & BC) */}
          <g
            onClick={() => handleClick('cordillera')}
            onMouseEnter={() => setHoveredId('cordillera')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer"
          >
            <path
              d="M112 162 L182 152 L212 225 L234 328 L250 404 L165 408 L138 358 L112 288 L95 225 Z"
              fill={getFill('cordillera')}
              stroke="#0f172a"
              strokeWidth={getStrokeWidth('cordillera')}
              strokeLinejoin="round"
            />
            {/* Vancouver Island */}
            <path
              d="M118 370 L134 366 L146 404 L132 412 L114 390 Z"
              fill={getFill('cordillera')}
              stroke="#0f172a"
              strokeWidth={getStrokeWidth('cordillera')}
              strokeLinejoin="round"
            />
          </g>

          {/* 3. LES PLAINES INTÉRIEURES (Interior Plains: AB, SK, MB, NWT Mackenzie Corridor) */}
          <g
            onClick={() => handleClick('plains')}
            onMouseEnter={() => setHoveredId('plains')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer"
          >
            <path
              d="M182 152 L255 154 L292 212 L338 288 L398 352 L428 426 L250 404 L234 328 L212 225 Z"
              fill={getFill('plains')}
              stroke="#0f172a"
              strokeWidth={getStrokeWidth('plains')}
              strokeLinejoin="round"
            />
          </g>

          {/* 4. LE BOUCLIER CANADIEN (Huge Horseshoe around Hudson Bay) */}
          <g
            onClick={() => handleClick('shield')}
            onMouseEnter={() => setHoveredId('shield')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer"
          >
            <path
              d="
                M 255 154
                L 392 184
                L 446 218
                L 450 288
                L 448 338
                L 486 382
                L 538 390
                L 562 340
                L 556 260
                L 575 226
                L 658 242
                L 732 296
                L 744 352
                L 668 386
                L 616 422
                L 535 448
                L 428 426
                L 398 352
                L 338 288
                L 292 212
                Z
              "
              fill={getFill('shield')}
              stroke="#0f172a"
              strokeWidth={getStrokeWidth('shield')}
              strokeLinejoin="round"
            />
          </g>

          {/* 5. LA BASSE-TERRE DE LA BAIE D'HUDSON (Lowland crescent on SW shore of Hudson & James Bay) */}
          <g
            onClick={() => handleClick('hudson')}
            onMouseEnter={() => setHoveredId('hudson')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer"
          >
            <path
              d="
                M 448 302
                L 484 316
                L 522 336
                L 554 342
                L 550 384
                L 538 394
                L 486 386
                L 446 342
                Z
              "
              fill={getFill('hudson')}
              stroke="#0f172a"
              strokeWidth={getStrokeWidth('hudson')}
              strokeLinejoin="round"
            />
          </g>

          {/* Hudson Bay Water Label inside the horseshoe */}
          <text
            x="502"
            y="282"
            textAnchor="middle"
            fill="#0284c7"
            opacity="0.7"
            fontSize="10.5"
            fontWeight="700"
            fontFamily="Plus Jakarta Sans, sans-serif"
            className="pointer-events-none"
          >
            {lang === 'fr' ? "Baie d'Hudson" : lang === 'zh' ? '哈德逊湾' : 'Hudson Bay'}
          </text>

          {/* 6. LES BASSES-TERRES DU SAINT-LAURENT ET DES GRANDS LACS (Southern Ontario & St. Lawrence River Valley) */}
          <g
            onClick={() => handleClick('stlawrence')}
            onMouseEnter={() => setHoveredId('stlawrence')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer"
          >
            <path
              d="
                M 476 438
                L 542 444
                L 616 420
                L 668 386
                L 682 404
                L 626 446
                L 568 476
                L 512 508
                L 486 492
                L 504 468
                L 474 456
                Z
              "
              fill={getFill('stlawrence')}
              stroke="#0f172a"
              strokeWidth={getStrokeWidth('stlawrence')}
              strokeLinejoin="round"
            />
            {/* Tiny Star marker for Waterloo / Millen Woods */}
            {coloredRegions.includes('stlawrence') && (
              <circle cx="520" cy="482" r="4" fill="#fef08a" stroke="#0f172a" strokeWidth="1.2" />
            )}
          </g>

          {/* 7. LES APPALACHES (Gaspé, NB, NS, PEI & Newfoundland) */}
          <g
            onClick={() => handleClick('appalachian')}
            onMouseEnter={() => setHoveredId('appalachian')}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer"
          >
            {/* Gaspé + New Brunswick + Nova Scotia */}
            <path
              d="
                M 626 446
                L 682 404
                L 718 418
                L 725 452
                L 752 456
                L 746 476
                L 712 496
                L 694 480
                L 665 466
                Z
              "
              fill={getFill('appalachian')}
              stroke="#0f172a"
              strokeWidth={getStrokeWidth('appalachian')}
              strokeLinejoin="round"
            />
            {/* Newfoundland Island */}
            <path
              d="M754 366 L798 378 L808 424 L768 432 L750 404 Z"
              fill={getFill('appalachian')}
              stroke="#0f172a"
              strokeWidth={getStrokeWidth('appalachian')}
              strokeLinejoin="round"
            />
          </g>
        </g>

        {/* Optional Region Number & Name Labels */}
        {CANADA_LANDFORM_REGIONS.map(region => {
          const pos = REGION_LABEL_POS[region.id];
          const isColored = coloredRegions.includes(region.id);
          const isSelected = selectedRegionId === region.id;
          const isDimmed = grade3OntarioOnly && !region.inOntario;

          if (!showLabels && !isColored) {
            // In quiz/blank mode, show only a subtle clickable crayon dot until colored
            if (isDimmed) return null;
            return (
              <g key={region.id} className="pointer-events-none">
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="11"
                  fill="#ffffff"
                  stroke="#64748b"
                  strokeWidth="1.5"
                  strokeDasharray="3,2"
                />
                <text
                  x={pos.x}
                  y={pos.y + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="800"
                  fill="#475569"
                >
                  ?
                </text>
              </g>
            );
          }

          if (isDimmed && !isColored) return null;

          return (
            <g key={region.id} className="pointer-events-none">
              <rect
                x={pos.x - 58}
                y={pos.y - 11}
                width="116"
                height="22"
                rx="8"
                fill={isSelected ? '#0f172a' : 'rgba(255,255,255,0.94)'}
                stroke="#0f172a"
                strokeWidth={isSelected ? '2' : '1.3'}
              />
              <text
                x={pos.x}
                y={pos.y + 3.5}
                textAnchor="middle"
                fontSize="9.5"
                fontWeight="800"
                fontFamily="Plus Jakarta Sans, sans-serif"
                fill={isSelected ? '#ffffff' : '#0f172a'}
              >
                {region.icon} {region.shortName[lang]}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Bottom Legend Bar */}
      <div className="absolute bottom-2.5 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="bg-white/95 border border-slate-300 px-3 py-1 rounded-xl text-[11px] font-semibold text-slate-700">
          {grade3OntarioOnly
            ? lang === 'fr'
              ? '3 régions de l’Ontario (3e année)'
              : lang === 'zh'
              ? '安大略省 3 大地貌区（三年级范围）'
              : '3 Ontario Regions (Grade 3 Focus)'
            : lang === 'fr'
            ? '7 régions physiques du Canada (4e année)'
            : lang === 'zh'
            ? '加拿大 7 大地貌区（四年级全覆盖）'
            : 'All 7 Canadian Regions (Grade 4)'}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { CanadaLandformRegion } from '../data/canadaLandformsData';
import { Language } from '../utils/i18n';
import { playClickSound } from '../utils/audio';

interface CanadaRegionIllustrationProps {
  region: CanadaLandformRegion;
  lang: Language;
  soundEnabled?: boolean;
  compact?: boolean;
}

export const CanadaRegionIllustration: React.FC<CanadaRegionIllustrationProps> = ({
  region,
  lang,
  soundEnabled = true,
  compact = false,
}) => {
  const [bounced, setBounced] = useState(false);

  const handleTap = () => {
    if (soundEnabled) playClickSound();
    setBounced(true);
    setTimeout(() => setBounced(false), 350);
  };

  const sizeClass = compact
    ? 'h-36 sm:h-40 rounded-xl'
    : 'aspect-[2.2/1] min-h-[190px] max-h-[270px] rounded-2xl';

  const baseClass = `relative w-full ${sizeClass} overflow-hidden border-2 border-slate-900 select-none cursor-pointer transition-transform duration-200 ${
    bounced ? 'scale-[1.015]' : ''
  }`;

  const renderSvg = () => {
    switch (region.id) {
      case 'shield':
        // Rocky hills, pine trees, sparkling blue glacial lake & mining cart
        return (
          <div onClick={handleTap} className={`${baseClass} bg-gradient-to-b from-sky-200 via-amber-50 to-sky-200`}>
            <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid slice">
              <circle cx="515" cy="48" r="28" fill="#fbbf24" stroke="#0f172a" strokeWidth="2.5" />
              {/* Clouds */}
              <path d="M55 45 Q75 28 105 42 Q125 32 142 48 Q120 58 65 55 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
              {/* Ancient Rounded Rocky Hills */}
              <path d="M0 165 Q95 75 215 155 Q315 80 430 150 Q520 90 600 155 L600 200 L0 200 Z" fill="#94a3b8" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M120 170 Q240 95 360 168 L360 195 L120 195 Z" fill="#64748b" stroke="#0f172a" strokeWidth="2" />
              {/* Boreal Evergreen Pines */}
              {[50, 88, 128, 395, 440, 485, 535].map((x, idx) => (
                <g key={idx} transform={`translate(${x}, ${idx % 2 === 0 ? 115 : 125})`}>
                  <rect x="-4" y="34" width="8" height="16" fill="#78350f" stroke="#0f172a" strokeWidth="1.5" />
                  <polygon points="0,-10 -20,20 20,20" fill="#15803d" stroke="#0f172a" strokeWidth="2" />
                  <polygon points="0,6 -24,38 24,38" fill="#166534" stroke="#0f172a" strokeWidth="2" />
                </g>
              ))}
              {/* Sparkling Shield Lake */}
              <rect x="0" y="172" width="600" height="88" fill="#0284c7" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M35 200 Q150 190 265 200 T540 200" stroke="#7dd3fc" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {/* Granite Boulders by Shore */}
              <ellipse cx="180" cy="182" rx="34" ry="16" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2.5" />
              <ellipse cx="215" cy="188" rx="22" ry="12" fill="#94a3b8" stroke="#0f172a" strokeWidth="2" />
              {/* Red Canoe on Lake */}
              <path d="M295 215 Q340 232 390 215 L382 225 Q340 238 302 225 Z" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
              {/* Mining Nugget Sparkle on Rock */}
              <polygon points="175,176 181,170 187,176 181,182" fill="#facc15" stroke="#0f172a" strokeWidth="1.5" />
            </svg>
          </div>
        );

      case 'hudson':
        // Flat wetlands, marshes, winding blue channels, stunted evergreens & polar bear
        return (
          <div onClick={handleTap} className={`${baseClass} bg-gradient-to-b from-slate-200 via-teal-100 to-teal-200`}>
            <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid slice">
              {/* Soft Arctic-Bay Sun & Mist */}
              <circle cx="490" cy="52" r="24" fill="#fde047" stroke="#0f172a" strokeWidth="2" />
              <path d="M40 55 Q110 42 180 55 T330 55" stroke="#ffffff" strokeWidth="7" opacity="0.65" fill="none" strokeLinecap="round" />
              {/* Hudson Bay Horizon */}
              <rect x="0" y="115" width="600" height="45" fill="#0ea5e9" stroke="#0f172a" strokeWidth="2" />
              {/* Very Flat Lowland Marsh */}
              <rect x="0" y="150" width="600" height="110" fill="#65a30d" stroke="#0f172a" strokeWidth="2.5" />
              {/* Winding Wetland Channels & Bog Ponds */}
              <path d="M0 175 Q140 162 240 188 Q360 215 600 180 L600 205 Q360 238 230 212 Q125 186 0 198 Z" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
              <ellipse cx="470" cy="232" rx="68" ry="15" fill="#0284c7" stroke="#0f172a" strokeWidth="2" />
              {/* Marsh Reeds & Stunted Spruce */}
              {[60, 95, 130, 495, 535].map((x, i) => (
                <g key={i} transform={`translate(${x}, 145)`}>
                  <polygon points="0,-24 -12,10 12,10" fill="#15803d" stroke="#0f172a" strokeWidth="1.8" />
                  <rect x="-2.5" y="10" width="5" height="8" fill="#78350f" />
                </g>
              ))}
              {[190, 210, 390, 415].map((x, i) => (
                <g key={i} transform={`translate(${x}, 225)`}>
                  <line x1="0" y1="0" x2="-4" y2="-22" stroke="#14532d" strokeWidth="2.5" />
                  <line x1="6" y1="0" x2="9" y2="-20" stroke="#14532d" strokeWidth="2.5" />
                  <ellipse cx="-4" cy="-22" rx="3" ry="6" fill="#78350f" />
                </g>
              ))}
              {/* Cute Goose & Polar Bear silhouette on shore */}
              <g transform="translate(310, 156)">
                <ellipse cx="0" cy="8" rx="22" ry="13" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                <circle cx="22" cy="3" r="9" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                <circle cx="25" cy="1" r="1.8" fill="#0f172a" />
                <rect x="-14" y="16" width="7" height="10" rx="2" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                <rect x="6" y="16" width="7" height="10" rx="2" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
              </g>
            </svg>
          </div>
        );

      case 'arctic':
        // Northern lights, snowy glaciers, frozen tundra, igloo & polar bear
        return (
          <div onClick={handleTap} className={`${baseClass} bg-gradient-to-b from-indigo-950 via-sky-900 to-cyan-200`}>
            <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid slice">
              {/* Dancing Green & Teal Northern Lights (Aurora Borealis) */}
              <path d="M20 65 Q140 15 260 60 T560 40" stroke="#34d399" strokeWidth="14" opacity="0.55" fill="none" strokeLinecap="round" />
              <path d="M50 82 Q180 35 310 78 T580 58" stroke="#38bdf8" strokeWidth="10" opacity="0.5" fill="none" strokeLinecap="round" />
              {/* Twinkling Stars */}
              {[70, 165, 290, 420, 520].map((sx, idx) => (
                <circle key={idx} cx={sx} cy={idx % 2 === 0 ? 28 : 44} r="2.5" fill="#fef08a" />
              ))}
              {/* Jagged Snowy Innuitian Peaks & Glacier */}
              <polygon points="0,175 110,72 230,175" fill="#e0f2fe" stroke="#0f172a" strokeWidth="2.5" />
              <polygon points="72,107 110,72 148,107 125,115 110,104 92,115" fill="#ffffff" />
              <polygon points="370,175 480,62 600,175" fill="#bae6fd" stroke="#0f172a" strokeWidth="2.5" />
              <polygon points="442,99 480,62 518,99" fill="#ffffff" />
              {/* Icy Arctic Sea & Floe */}
              <rect x="0" y="170" width="600" height="90" fill="#0369a1" stroke="#0f172a" strokeWidth="2.5" />
              {/* Frozen Tundra / Ice Sheet Foreground */}
              <path d="M0 192 Q180 174 360 195 Q490 210 600 185 L600 260 L0 260 Z" fill="#f0f9ff" stroke="#0f172a" strokeWidth="2.5" />
              {/* Igloo */}
              <g transform="translate(155, 215)">
                <path d="M-38 15 A38 35 0 0 1 38 15 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
                <path d="M20 15 A14 14 0 0 1 46 15 Z" fill="#bae6fd" stroke="#0f172a" strokeWidth="2" />
                <line x1="-26" y1="0" x2="26" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="-18" y1="-12" x2="18" y2="-12" stroke="#94a3b8" strokeWidth="1.5" />
              </g>
              {/* Tiny Arctic Tundra Wildflower & Research Station Flag */}
              <circle cx="420" cy="222" r="4" fill="#facc15" stroke="#0f172a" strokeWidth="1" />
              <circle cx="434" cy="228" r="3.5" fill="#a855f7" stroke="#0f172a" strokeWidth="1" />
              <line x1="485" y1="220" x2="485" y2="178" stroke="#0f172a" strokeWidth="2.5" />
              <polygon points="485,178 518,186 485,195" fill="#ef4444" stroke="#0f172a" strokeWidth="1.5" />
            </svg>
          </div>
        );

      case 'plains':
        // Big blue sky, flat golden wheat prairies, red barn, grain elevator & tractor
        return (
          <div onClick={handleTap} className={`${baseClass} bg-gradient-to-b from-sky-300 via-sky-100 to-amber-100`}>
            <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid slice">
              <circle cx="515" cy="48" r="30" fill="#facc15" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M70 48 Q95 30 130 44 Q158 32 182 50 Q145 60 76 58 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
              {/* Very Flat Horizon Golden Prairies */}
              <path d="M0 148 Q300 136 600 148 L600 260 L0 260 Z" fill="#facc15" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M0 185 Q240 174 600 190 L600 260 L0 260 Z" fill="#eab308" stroke="#0f172a" strokeWidth="2" />
              {/* Crop Rows */}
              {[205, 225, 245].map((y, idx) => (
                <line key={idx} x1="0" y1={y} x2="600" y2={y + 4} stroke="#ca8a04" strokeWidth="2" strokeDasharray="14,10" />
              ))}
              {/* Classic Prairie Grain Elevator & Red Barn */}
              <g transform="translate(110, 92)">
                <rect x="0" y="16" width="38" height="46" fill="#dc2626" stroke="#0f172a" strokeWidth="2.5" />
                <polygon points="-4,16 19,-4 42,16" fill="#991b1b" stroke="#0f172a" strokeWidth="2.5" />
                <rect x="12" y="38" width="14" height="24" fill="#fef08a" stroke="#0f172a" strokeWidth="1.5" />
              </g>
              <g transform="translate(160, 108)">
                <rect x="0" y="12" width="52" height="34" fill="#ef4444" stroke="#0f172a" strokeWidth="2.5" />
                <polygon points="-5,12 26,-6 57,12" fill="#7f1d1d" stroke="#0f172a" strokeWidth="2.5" />
                <line x1="14" y1="24" x2="38" y2="44" stroke="#ffffff" strokeWidth="2" />
                <line x1="38" y1="24" x2="14" y2="44" stroke="#ffffff" strokeWidth="2" />
              </g>
              {/* Friendly Green Tractor */}
              <g transform="translate(380, 165)">
                <rect x="0" y="8" width="44" height="22" rx="4" fill="#16a34a" stroke="#0f172a" strokeWidth="2.5" />
                <rect x="24" y="-8" width="18" height="18" rx="2" fill="#bae6fd" stroke="#0f172a" strokeWidth="2" />
                <circle cx="8" cy="30" r="10" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
                <circle cx="8" cy="30" r="4" fill="#facc15" />
                <circle cx="36" cy="27" r="14" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
                <circle cx="36" cy="27" r="5" fill="#facc15" />
              </g>
            </svg>
          </div>
        );

      case 'cordillera':
        // Towering Rocky Mountains, snow caps, turquoise glacial lake & giant coastal firs
        return (
          <div onClick={handleTap} className={`${baseClass} bg-gradient-to-b from-sky-300 via-indigo-100 to-teal-100`}>
            <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid slice">
              <circle cx="88" cy="48" r="24" fill="#fef08a" stroke="#0f172a" strokeWidth="2" />
              {/* Towering Jagged Rocky Mountains */}
              <polygon points="-10,185 130,42 265,185" fill="#64748b" stroke="#0f172a" strokeWidth="2.5" />
              <polygon points="90,86 130,42 170,86 145,98 130,82 112,96" fill="#ffffff" />

              <polygon points="185,185 330,22 480,185" fill="#475569" stroke="#0f172a" strokeWidth="3" />
              <polygon points="282,76 330,22 378,76 350,90 330,72 308,88" fill="#ffffff" />

              <polygon points="395,185 515,52 625,185" fill="#64748b" stroke="#0f172a" strokeWidth="2.5" />
              <polygon points="482,89 515,52 548,89" fill="#ffffff" />

              {/* Turquoise Lake Louise */}
              <path d="M0 182 L600 182 L600 260 L0 260 Z" fill="#14b8a6" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M80 212 Q220 202 360 215 T550 210" stroke="#99f6e4" strokeWidth="3" fill="none" strokeLinecap="round" />

              {/* Giant Douglas Fir & Cedar Trees */}
              {[42, 82, 515, 558].map((x, idx) => (
                <g key={idx} transform={`translate(${x}, ${idx % 2 === 0 ? 115 : 132})`}>
                  <rect x="-5" y="55" width="10" height="22" fill="#78350f" stroke="#0f172a" strokeWidth="2" />
                  <polygon points="0,-16 -22,22 22,22" fill="#065f46" stroke="#0f172a" strokeWidth="2" />
                  <polygon points="0,8 -28,56 28,56" fill="#047857" stroke="#0f172a" strokeWidth="2" />
                </g>
              ))}
            </svg>
          </div>
        );

      case 'stlawrence':
        // Great Lakes, fertile green farms, maple trees in autumn color & CN Tower / city skyline
        return (
          <div onClick={handleTap} className={`${baseClass} bg-gradient-to-b from-sky-200 via-amber-50 to-emerald-100`}>
            <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid slice">
              <circle cx="515" cy="48" r="28" fill="#fbbf24" stroke="#0f172a" strokeWidth="2.5" />
              {/* City Skyline with CN Tower on Right */}
              <g transform="translate(365, 30)">
                <rect x="10" y="65" width="32" height="75" fill="#64748b" stroke="#0f172a" strokeWidth="2" />
                <rect x="48" y="45" width="38" height="95" fill="#334155" stroke="#0f172a" strokeWidth="2" />
                {/* CN Tower */}
                <polygon points="104,140 109,32 114,32 119,140" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
                <ellipse cx="111.5" cy="54" rx="14" ry="6" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
                <line x1="111.5" y1="32" x2="111.5" y2="8" stroke="#0f172a" strokeWidth="2.5" />
                <rect x="132" y="72" width="34" height="68" fill="#475569" stroke="#0f172a" strokeWidth="2" />
              </g>

              {/* Gentle Rolling Fertile Hills & Orchards */}
              <path d="M0 152 Q160 118 330 152 Q470 135 600 155 L600 185 L0 185 Z" fill="#4ade80" stroke="#0f172a" strokeWidth="2.5" />

              {/* Colorful Red & Orange Maple Trees */}
              {[68, 128, 195].map((x, idx) => (
                <g key={idx} transform={`translate(${x}, ${idx === 1 ? 116 : 124})`}>
                  <rect x="-4" y="18" width="8" height="24" fill="#78350f" stroke="#0f172a" strokeWidth="1.8" />
                  <circle cx="0" cy="6" r="20" fill={idx === 1 ? '#f97316' : '#ef4444'} stroke="#0f172a" strokeWidth="2" />
                </g>
              ))}

              {/* Sparkling Great Lakes / St. Lawrence River */}
              <rect x="0" y="176" width="600" height="84" fill="#2563eb" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M25 204 Q165 194 310 206 T575 204" stroke="#93c5fd" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {/* Sailboat on Great Lakes */}
              <g transform="translate(260, 195)">
                <path d="M-24 16 L24 16 L16 26 L-16 26 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                <polygon points="0,14 0,-18 22,14" fill="#facc15" stroke="#0f172a" strokeWidth="2" />
                <polygon points="-2,14 -2,-10 -18,14" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
              </g>
            </svg>
          </div>
        );

      case 'appalachian':
        // Old rounded green hills, red & white coastal lighthouse, fishing boat & Atlantic waves
        return (
          <div onClick={handleTap} className={`${baseClass} bg-gradient-to-b from-sky-200 via-emerald-50 to-sky-200`}>
            <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid slice">
              <circle cx="95" cy="48" r="25" fill="#fde047" stroke="#0f172a" strokeWidth="2" />
              {/* Old Rounded Green Appalachian Mountains */}
              <path d="M0 165 Q120 65 250 155 Q370 72 500 160 L600 160 L600 190 L0 190 Z" fill="#10b981" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M120 175 Q245 98 375 175 Z" fill="#059669" stroke="#0f172a" strokeWidth="2" />

              {/* Iconic Red & White Peggy's Cove Lighthouse */}
              <g transform="translate(460, 72)">
                <ellipse cx="0" cy="96" rx="58" ry="18" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2.5" />
                <polygon points="-16,90 -10,16 10,16 16,90" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
                <rect x="-12" y="16" width="24" height="14" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
                <polygon points="-14,16 0,2 14,16" fill="#dc2626" stroke="#0f172a" strokeWidth="2" />
                <circle cx="0" cy="23" r="4" fill="#fef08a" />
                {/* Light beam */}
                <polygon points="-14,23 -95,4 -95,42" fill="#fef08a" opacity="0.45" />
              </g>

              {/* Atlantic Ocean */}
              <rect x="0" y="175" width="600" height="85" fill="#0284c7" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M20 208 Q90 196 160 208 T300 208 T440 208 T580 208" stroke="#bae6fd" strokeWidth="2.5" fill="none" />

              {/* Fishing Boat */}
              <g transform="translate(175, 198)">
                <path d="M-32 10 L36 10 L26 24 L-24 24 Z" fill="#ef4444" stroke="#0f172a" strokeWidth="2.5" />
                <rect x="-12" y="-6" width="24" height="16" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                <rect x="-6" y="-2" width="12" height="7" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      {renderSvg()}
      {!compact && (
        <div className="absolute bottom-2.5 right-3 bg-white/95 border-2 border-slate-900 px-2.5 py-0.5 rounded-xl font-comic text-[11px] font-bold text-slate-900 shadow-xs">
          {region.icon} {region.name[lang]}
        </div>
      )}
    </div>
  );
};

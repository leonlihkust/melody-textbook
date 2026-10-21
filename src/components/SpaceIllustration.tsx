import React from 'react';
import { CelestialBody } from '../data/spaceData';
import { Language } from '../utils/i18n';

interface SpaceIllustrationProps {
  body: CelestialBody;
  lang?: Language;
}

export const SpaceIllustration: React.FC<SpaceIllustrationProps> = ({ body, lang = 'en' }) => {
  const containerClasses =
    'relative w-full aspect-[2/1] sm:aspect-[2.2/1] min-h-[190px] sm:min-h-[230px] max-h-[290px] rounded-2xl overflow-hidden border-2 border-slate-900 comic-box select-none bg-slate-950';

  const getName = () => {
    return lang === 'fr' ? body.nameFr : lang === 'zh' ? body.nameZh : body.nameEn;
  };

  const getBadgeTag = () => {
    if (lang === 'fr') return `Diamètre: ${body.diameterKm.toLocaleString()} km · ${body.orbitalPeriod}`;
    if (lang === 'zh') return `直径: ${body.diameterKm.toLocaleString()} 公里 · 公转周期: ${body.orbitalPeriod}`;
    return `Diameter: ${body.diameterKm.toLocaleString()} km · ${body.orbitalPeriod}`;
  };

  switch (body.id) {
    case 'sun':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-amber-950 via-slate-950 to-black`}>
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span>☀️</span>
            <span className="truncate">{getBadgeTag()}</span>
          </div>
          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Solar Corona & Glow Rays */}
            <circle cx="300" cy="130" r="115" fill="#f59e0b" opacity="0.15" />
            <circle cx="300" cy="130" r="95" fill="#ea580c" opacity="0.25" />
            <circle cx="300" cy="130" r="75" fill="#fde047" stroke="#0f172a" strokeWidth="3" />

            {/* Solar Flares Prominences */}
            <path d="M225 130 Q200 110 215 90 Q235 110 240 120 Z" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
            <path d="M375 130 Q400 110 385 85 Q365 105 360 120 Z" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
            <path d="M300 55 Q285 30 310 35 Q315 50 300 55 Z" fill="#f97316" stroke="#0f172a" strokeWidth="2" />

            {/* Sun Face Smile (Kid-friendly comic) */}
            <circle cx="280" cy="120" r="6" fill="#0f172a" />
            <circle cx="320" cy="120" r="6" fill="#0f172a" />
            <circle cx="282" cy="118" r="2" fill="#ffffff" />
            <circle cx="322" cy="118" r="2" fill="#ffffff" />
            <path d="M285 140 Q300 152 315 140" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <ellipse cx="265" cy="132" rx="7" ry="4" fill="#f87171" opacity="0.7" />
            <ellipse cx="335" cy="132" rx="7" ry="4" fill="#f87171" opacity="0.7" />

            {/* Floating Planets in Background */}
            <circle cx="80" cy="60" r="7" fill="#60a5fa" stroke="#0f172a" strokeWidth="1.5" />
            <circle cx="520" cy="180" r="14" fill="#d97706" stroke="#0f172a" strokeWidth="1.5" />
          </svg>
          <div className="absolute bottom-2 right-2.5 bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm">
            <span>☀️ {getName()}</span>
          </div>
        </div>
      );

    case 'earth':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-blue-950 via-slate-950 to-black`}>
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span>🌍</span>
            <span className="truncate">{getBadgeTag()}</span>
          </div>
          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Distant Sun Stars */}
            <circle cx="45" cy="40" r="2" fill="#ffffff" />
            <circle cx="550" cy="70" r="2.5" fill="#fde047" />
            <circle cx="120" cy="220" r="1.5" fill="#ffffff" />

            {/* Planet Earth Sphere */}
            <circle cx="260" cy="130" r="72" fill="#2563eb" stroke="#0f172a" strokeWidth="3" />
            {/* Continents */}
            <path d="M220 95 Q245 80 270 95 Q295 110 275 135 Q250 140 225 125 Z" fill="#16a34a" stroke="#0f172a" strokeWidth="1.5" />
            <path d="M270 140 Q290 135 295 155 Q285 180 265 175 Z" fill="#15803d" stroke="#0f172a" strokeWidth="1.5" />
            <path d="M205 130 Q215 115 220 135 Q215 155 205 145 Z" fill="#16a34a" />
            {/* Swirling Clouds */}
            <path d="M210 100 Q240 115 270 105" stroke="#ffffff" strokeWidth="4" fill="none" opacity="0.75" strokeLinecap="round" />
            <path d="M230 160 Q270 150 310 165" stroke="#ffffff" strokeWidth="4" fill="none" opacity="0.75" strokeLinecap="round" />

            {/* Orbiting Moon */}
            <ellipse cx="260" cy="130" rx="160" ry="45" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.6" transform="rotate(-15 260 130)" />
            <circle cx="420" cy="100" r="22" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2.5" />
            {/* Moon craters */}
            <circle cx="414" cy="94" r="4" fill="#94a3b8" />
            <circle cx="426" cy="104" r="5" fill="#94a3b8" />
            <circle cx="425" cy="90" r="2.5" fill="#94a3b8" />
            <circle cx="410" cy="108" r="3" fill="#94a3b8" />

            {/* Canadian Flag on Moon */}
            <line x1="432" y1="80" x2="432" y2="70" stroke="#0f172a" strokeWidth="1.5" />
            <rect x="432" y="70" width="12" height="7" fill="#ef4444" />
            <rect x="436" y="70" width="4" height="7" fill="#ffffff" />
          </svg>
          <div className="absolute bottom-2 right-2.5 bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm">
            <span>🌍 {getName()}</span>
          </div>
        </div>
      );

    case 'mars':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-rose-950 via-slate-950 to-black`}>
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span>🔴</span>
            <span className="truncate">{getBadgeTag()}</span>
          </div>
          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Red Planet Mars */}
            <circle cx="220" cy="130" r="65" fill="#ef4444" stroke="#0f172a" strokeWidth="3" />
            {/* Olympus Mons Volcano Shield */}
            <ellipse cx="210" cy="110" rx="22" ry="14" fill="#b91c1c" stroke="#0f172a" strokeWidth="1.5" />
            <circle cx="210" cy="110" r="5" fill="#7f1d1d" />
            {/* Polar Ice Cap */}
            <ellipse cx="220" cy="68" rx="20" ry="7" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />

            {/* Mars Rover (Perseverance / Curiosity) */}
            <g transform="translate(380, 110)">
              {/* Wheels */}
              <circle cx="15" cy="55" r="8" fill="#475569" stroke="#0f172a" strokeWidth="2" />
              <circle cx="45" cy="55" r="8" fill="#475569" stroke="#0f172a" strokeWidth="2" />
              <circle cx="75" cy="55" r="8" fill="#475569" stroke="#0f172a" strokeWidth="2" />
              {/* Chassis */}
              <rect x="20" y="32" width="55" height="18" rx="4" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
              {/* Mast & Camera */}
              <line x1="30" y1="32" x2="30" y2="10" stroke="#0f172a" strokeWidth="2.5" />
              <rect x="24" y="6" width="16" height="9" rx="2" fill="#f59e0b" stroke="#0f172a" strokeWidth="2" />
              <circle cx="32" cy="10" r="2.5" fill="#0f172a" />
              {/* Robotic Arm */}
              <polyline points="65,38 85,28 92,38" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </svg>
          <div className="absolute bottom-2 right-2.5 bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm">
            <span>🔴 {getName()}</span>
          </div>
        </div>
      );

    case 'saturn':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-amber-950 via-slate-950 to-black`}>
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span>🪐</span>
            <span className="truncate">{getBadgeTag()}</span>
          </div>
          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Back Ring Segment */}
            <ellipse cx="300" cy="130" rx="200" ry="50" fill="none" stroke="#fde047" strokeWidth="24" strokeOpacity="0.85" transform="rotate(-15 300 130)" />
            <ellipse cx="300" cy="130" rx="198" ry="49" fill="none" stroke="#0f172a" strokeWidth="2" strokeDasharray="8 6" transform="rotate(-15 300 130)" />

            {/* Saturn Body */}
            <circle cx="300" cy="130" r="58" fill="#eab308" stroke="#0f172a" strokeWidth="3" />
            {/* Cloud Bands */}
            <path d="M245 120 Q300 135 355 120" stroke="#ca8a04" strokeWidth="6" fill="none" />
            <path d="M248 140 Q300 155 352 140" stroke="#b45309" strokeWidth="5" fill="none" />

            {/* Front Ring Segment */}
            <path d="M107 156 A200 50 0 0 0 493 104" fill="none" stroke="#fde047" strokeWidth="24" strokeOpacity="0.95" transform="rotate(-15 300 130)" />
            <path d="M107 156 A200 50 0 0 0 493 104" fill="none" stroke="#0f172a" strokeWidth="2.5" transform="rotate(-15 300 130)" />

            {/* Moon Titan */}
            <circle cx="510" cy="70" r="10" fill="#f97316" stroke="#0f172a" strokeWidth="1.5" />
            <text x="525" y="75" fill="#fde047" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Titan</text>
          </svg>
          <div className="absolute bottom-2 right-2.5 bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm">
            <span>🪐 {getName()}</span>
          </div>
        </div>
      );

    case 'canadarm':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-sky-950 via-slate-950 to-black`}>
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span>🇨🇦</span>
            <span className="truncate">{getBadgeTag()}</span>
          </div>
          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Curved Earth Limb in bottom corner */}
            <circle cx="300" cy="480" r="320" fill="#2563eb" stroke="#60a5fa" strokeWidth="4" />
            <path d="M180 220 Q240 200 320 215 Q400 230 450 200" fill="#16a34a" stroke="#0f172a" strokeWidth="2" />

            {/* ISS Solar Array Wings */}
            <g transform="translate(180, 80)">
              {/* Left Solar Panel */}
              <rect x="0" y="0" width="70" height="40" fill="#1e3a8a" stroke="#0f172a" strokeWidth="2" />
              <line x1="23" y1="0" x2="23" y2="40" stroke="#93c5fd" strokeWidth="1.5" />
              <line x1="47" y1="0" x2="47" y2="40" stroke="#93c5fd" strokeWidth="1.5" />
              {/* ISS Main Truss */}
              <rect x="70" y="14" width="80" height="12" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
              {/* Right Solar Panel */}
              <rect x="150" y="0" width="70" height="40" fill="#1e3a8a" stroke="#0f172a" strokeWidth="2" />
              <line x1="173" y1="0" x2="173" y2="40" stroke="#93c5fd" strokeWidth="1.5" />
              <line x1="197" y1="0" x2="197" y2="40" stroke="#93c5fd" strokeWidth="1.5" />

              {/* Canadarm Robotic Boom with Red Maple Leaf */}
              <polyline points="110,26 130,55 170,50 185,75" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
              <polyline points="110,26 130,55 170,50 185,75" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
              <circle cx="130" cy="55" r="4" fill="#ef4444" stroke="#0f172a" strokeWidth="1.5" />
              <circle cx="170" cy="50" r="4" fill="#ef4444" stroke="#0f172a" strokeWidth="1.5" />
              <text x="140" y="45" fontSize="14">🍁</text>
            </g>
          </svg>
          <div className="absolute bottom-2 right-2.5 bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm">
            <span>🇨🇦 {getName()}</span>
          </div>
        </div>
      );

    case 'jwst':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-indigo-950 via-slate-950 to-black`}>
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span>🔭</span>
            <span className="truncate">{getBadgeTag()}</span>
          </div>
          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Distant Galaxies */}
            <ellipse cx="120" cy="60" rx="18" ry="8" fill="#f472b6" opacity="0.6" transform="rotate(30 120 60)" />
            <ellipse cx="500" cy="180" rx="22" ry="9" fill="#a78bfa" opacity="0.6" transform="rotate(-20 500 180)" />

            {/* Sunshield Kite Shape */}
            <polygon points="180,140 300,75 420,140 300,205" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2.5" />
            <polygon points="190,140 300,85 410,140 300,195" fill="#cbd5e1" stroke="#0f172a" strokeWidth="1.5" />

            {/* Golden Hexagonal Primary Mirror Array */}
            <g transform="translate(300, 140)">
              {/* Gold Center Honeycomb */}
              <circle cx="0" cy="0" r="28" fill="#f59e0b" stroke="#0f172a" strokeWidth="2" />
              <polygon points="-10,-17 10,-17 20,0 10,17 -10,17 -20,0" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.5" />
              <polygon points="-10,-35 10,-35 20,-18 10,-1 -10,-1 -20,-18" fill="#f59e0b" stroke="#0f172a" strokeWidth="1" />
              <polygon points="15,-18 35,-18 45,0 35,18 15,18 5,0" fill="#f59e0b" stroke="#0f172a" strokeWidth="1" />
              {/* Secondary Mirror Support Tripod */}
              <line x1="-15" y1="10" x2="0" y2="-45" stroke="#0f172a" strokeWidth="2" />
              <line x1="15" y1="10" x2="0" y2="-45" stroke="#0f172a" strokeWidth="2" />
              <circle cx="0" cy="-45" r="5" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1.5" />
            </g>
          </svg>
          <div className="absolute bottom-2 right-2.5 bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm">
            <span>🔭 {getName()}</span>
          </div>
        </div>
      );

    default:
      // Generic celestial illustration with orbit and glowing planet
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-purple-950 via-slate-950 to-black`}>
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span>{body.icon}</span>
            <span className="truncate">{getBadgeTag()}</span>
          </div>
          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Stars */}
            <circle cx="80" cy="40" r="2" fill="#ffffff" />
            <circle cx="520" cy="60" r="2" fill="#ffffff" />
            <circle cx="140" cy="220" r="2" fill="#fde047" />
            <circle cx="480" cy="210" r="1.5" fill="#ffffff" />

            {/* Orbit path */}
            <ellipse cx="300" cy="130" rx="220" ry="60" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="6 6" />

            {/* Central Celestial Body */}
            <circle cx="300" cy="130" r="50" fill={body.color} stroke="#0f172a" strokeWidth="3" />
            <circle cx="285" cy="115" r="35" fill={body.accentColor} opacity="0.6" />
          </svg>
          <div className="absolute bottom-2 right-2.5 bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm">
            <span>{body.icon} {getName()}</span>
          </div>
        </div>
      );
  }
};

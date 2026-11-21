import React, { useState } from 'react';
import { ChinaCity } from '../data/chinaData';
import { Language } from '../utils/i18n';
import { playClickSound } from '../utils/audio';

interface ChinaIllustrationProps {
  city: ChinaCity;
  lang?: Language;
  soundEnabled?: boolean;
}

export const ChinaIllustration: React.FC<ChinaIllustrationProps> = ({
  city,
  lang = 'zh',
  soundEnabled = true,
}) => {
  const [isBouncing, setIsBouncing] = useState(false);

  const containerClasses =
    'relative w-full aspect-[2/1] sm:aspect-[2.2/1] min-h-[200px] sm:min-h-[250px] max-h-[310px] rounded-2xl overflow-hidden border-2 border-slate-900 comic-box select-none cursor-pointer transition-transform duration-200 active:scale-[0.99]';

  const getName = () => (lang === 'fr' ? city.nameFr : lang === 'zh' ? city.nameZh : city.nameEn);
  const getLandmark = () => (lang === 'fr' ? city.landmarkFr : lang === 'zh' ? city.landmarkZh : city.landmarkEn);

  const handleTap = () => {
    if (soundEnabled) playClickSound();
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 400);
  };

  const renderIllustration = () => {
    switch (city.id) {
      case 'beijing':
        // Summer Palace (万寿山佛香阁 & 昆明湖十七孔桥)
        return (
          <div
            onClick={handleTap}
            className={`${containerClasses} bg-gradient-to-b from-sky-200 via-amber-100 to-sky-300 ${
              isBouncing ? 'scale-[1.01]' : ''
            }`}
          >
            <div className="absolute top-2.5 left-2.5 z-10 bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[11px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm">
              <span>🏯</span>
              <span>{lang === 'zh' ? '万寿山佛香阁 · 昆明湖十七孔桥' : 'Tower of Buddhist Incense & 17-Arch Bridge'}</span>
            </div>

            <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
              {/* Sun & Clouds */}
              <circle cx="510" cy="50" r="32" fill="#fbbf24" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M40 35 Q70 20 110 35 Q140 20 170 35 Q180 50 160 55 Q100 55 40 35 Z" fill="#ffffff" opacity="0.9" stroke="#0f172a" strokeWidth="2" />
              <path d="M420 40 Q450 25 480 40 Q500 25 520 40 Q530 50 510 55 Q470 55 420 40 Z" fill="#ffffff" opacity="0.8" stroke="#0f172a" strokeWidth="1.5" />

              {/* Distant Great Wall Mountains */}
              <path d="M0 130 Q120 70 240 120 Q360 80 480 130 Q540 90 600 130 L600 170 L0 170 Z" fill="#86efac" opacity="0.7" stroke="#0f172a" strokeWidth="2" />
              {/* Longevity Hill */}
              <path d="M140 180 Q270 50 440 180 Z" fill="#15803d" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M190 180 Q280 80 400 180 Z" fill="#166534" opacity="0.4" />

              {/* Tower of Buddhist Incense (佛香阁) */}
              <rect x="255" y="80" width="70" height="42" fill="#991b1b" stroke="#0f172a" strokeWidth="2.5" />
              <polygon points="240,80 290,52 340,80" fill="#f59e0b" stroke="#0f172a" strokeWidth="2.5" />
              <rect x="265" y="52" width="50" height="28" fill="#b91c1c" stroke="#0f172a" strokeWidth="2" />
              <polygon points="255,52 290,34 325,52" fill="#f59e0b" stroke="#0f172a" strokeWidth="2.5" />
              <circle cx="290" cy="30" r="5" fill="#fef08a" stroke="#0f172a" strokeWidth="2" />

              {/* Kunming Lake Water */}
              <rect x="0" y="170" width="600" height="90" fill="#38bdf8" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M0 190 Q150 185 300 190 T600 190" stroke="#bae6fd" strokeWidth="2" fill="none" />
              <path d="M0 215 Q150 210 300 215 T600 215" stroke="#7dd3fc" strokeWidth="2" fill="none" />

              {/* 17-Arch Bridge */}
              <path d="M40 195 Q300 168 560 195 L560 205 Q300 178 40 205 Z" fill="#f1f5f9" stroke="#0f172a" strokeWidth="2.5" />
              {[70, 110, 150, 190, 230, 270, 310, 350, 390, 430, 470, 510].map((x, i) => (
                <path key={i} d={`M${x} 203 Q${x + 12} 189 ${x + 24} 203 Z`} fill="#0284c7" stroke="#0f172a" strokeWidth="1.5" />
              ))}

              {/* Stone Boat & Cute Ducks */}
              <path d="M80 185 L145 185 L135 202 L75 202 Z" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
              <rect x="90" y="175" width="45" height="10" fill="#f59e0b" stroke="#0f172a" strokeWidth="2" />
              {/* Cute little yellow duck */}
              <ellipse cx="480" cy="225" rx="10" ry="7" fill="#facc15" stroke="#0f172a" strokeWidth="1.5" />
              <circle cx="488" cy="220" r="5" fill="#facc15" stroke="#0f172a" strokeWidth="1.5" />
              <polygon points="493,220 498,222 493,224" fill="#ea580c" />
            </svg>
          </div>
        );

      case 'hangzhou':
        // West Lake (西湖三潭印月 & 断桥)
        return (
          <div
            onClick={handleTap}
            className={`${containerClasses} bg-gradient-to-b from-indigo-100 via-teal-50 to-teal-300 ${
              isBouncing ? 'scale-[1.01]' : ''
            }`}
          >
            <div className="absolute top-2.5 left-2.5 z-10 bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[11px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm">
              <span>🌸</span>
              <span>{lang === 'zh' ? '西湖十景 · 三潭印月与断桥' : 'West Lake: 3 Pools & Broken Bridge'}</span>
            </div>

            <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
              {/* Moon & Night sky */}
              <circle cx="490" cy="50" r="32" fill="#fef08a" stroke="#0f172a" strokeWidth="2.5" />
              <circle cx="482" cy="45" r="5" fill="#fef9c3" opacity="0.6" />

              {/* Hills */}
              <path d="M0 150 Q130 90 260 150 Q360 90 500 150 Q560 110 600 150 L600 170 L0 170 Z" fill="#6ee7b7" opacity="0.7" stroke="#0f172a" strokeWidth="2" />
              {/* Leifeng Pagoda */}
              <polygon points="450,130 460,75 470,130" fill="#b45309" stroke="#0f172a" strokeWidth="2" />
              <polygon points="445,130 460,120 475,130" fill="#f59e0b" stroke="#0f172a" strokeWidth="1.5" />
              <polygon points="448,110 460,102 472,110" fill="#f59e0b" stroke="#0f172a" strokeWidth="1.5" />

              {/* Water */}
              <rect x="0" y="155" width="600" height="105" fill="#0d9488" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M0 180 Q150 175 300 180 T600 180" stroke="#5eead4" strokeWidth="2" fill="none" />
              <path d="M0 215 Q150 210 300 215 T600 215" stroke="#2dd4bf" strokeWidth="2" fill="none" />

              {/* Weeping Willow Branches */}
              <path d="M20 155 Q35 185 25 220" stroke="#15803d" strokeWidth="3" fill="none" />
              <path d="M35 155 Q55 190 45 230" stroke="#16a34a" strokeWidth="2.5" fill="none" />
              <path d="M570 155 Q555 190 560 225" stroke="#15803d" strokeWidth="3" fill="none" />

              {/* Three Stone Pagodas with yellow glowing openings */}
              {[
                { x: 190, y: 195, scale: 0.95 },
                { x: 300, y: 210, scale: 1.15 },
                { x: 410, y: 195, scale: 0.95 },
              ].map((p, idx) => (
                <g key={idx} transform={`translate(${p.x}, ${p.y}) scale(${p.scale})`}>
                  <ellipse cx="0" cy="10" rx="18" ry="7" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2" />
                  <circle cx="0" cy="-6" r="15" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
                  <circle cx="-5" cy="-6" r="4" fill="#facc15" stroke="#0f172a" strokeWidth="1" />
                  <circle cx="5" cy="-6" r="4" fill="#facc15" stroke="#0f172a" strokeWidth="1" />
                  <polygon points="-14,-17 0,-28 14,-17" fill="#94a3b8" stroke="#0f172a" strokeWidth="2" />
                  <circle cx="0" cy="-31" r="3.5" fill="#fef08a" stroke="#0f172a" strokeWidth="1.5" />
                  <ellipse cx="0" cy="20" rx="22" ry="5" stroke="#a7f3d0" strokeWidth="1.5" fill="none" />
                </g>
              ))}

              {/* Broken Bridge */}
              <path d="M70 165 Q130 145 190 165" stroke="#f8fafc" strokeWidth="6" fill="none" strokeLinecap="round" />
              <path d="M70 165 Q130 145 190 165" stroke="#0f172a" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
        );

      case 'xian':
        // Xi'an Terracotta Warriors & Giant Wild Goose Pagoda
        return (
          <div
            onClick={handleTap}
            className={`${containerClasses} bg-gradient-to-b from-amber-200 via-orange-100 to-amber-300 ${
              isBouncing ? 'scale-[1.01]' : ''
            }`}
          >
            <div className="absolute top-2.5 left-2.5 z-10 bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[11px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm">
              <span>🏺</span>
              <span>{lang === 'zh' ? '秦始皇兵马俑 · 千年大雁塔' : 'Terracotta Army & Wild Goose Pagoda'}</span>
            </div>

            <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
              <circle cx="510" cy="50" r="32" fill="#ea580c" opacity="0.85" stroke="#0f172a" strokeWidth="2.5" />

              {/* Pagoda */}
              <g transform="translate(430, 45) scale(0.9)">
                <rect x="25" y="70" width="50" height="30" fill="#d97706" stroke="#0f172a" strokeWidth="2.5" />
                <rect x="20" y="65" width="60" height="6" fill="#78350f" stroke="#0f172a" strokeWidth="2" />
                <rect x="29" y="45" width="42" height="20" fill="#d97706" stroke="#0f172a" strokeWidth="2" />
                <rect x="24" y="40" width="52" height="5" fill="#78350f" stroke="#0f172a" strokeWidth="2" />
                <rect x="33" y="25" width="34" height="15" fill="#d97706" stroke="#0f172a" strokeWidth="2" />
                <rect x="28" y="20" width="44" height="5" fill="#78350f" stroke="#0f172a" strokeWidth="2" />
                <polygon points="32,20 50,8 68,20" fill="#b45309" stroke="#0f172a" strokeWidth="2" />
              </g>

              {/* Ancient Vault Ground */}
              <rect x="0" y="140" width="600" height="120" fill="#78350f" stroke="#0f172a" strokeWidth="2.5" />
              <rect x="0" y="145" width="600" height="15" fill="#92400e" />

              {/* Cute Terracotta Warriors */}
              {[
                { x: 70, y: 155, scale: 0.95 },
                { x: 135, y: 150, scale: 1.0 },
                { x: 200, y: 158, scale: 0.95 },
                { x: 265, y: 148, scale: 1.05 },
                { x: 330, y: 156, scale: 1.0 },
              ].map((w, idx) => (
                <g key={idx} transform={`translate(${w.x}, ${w.y}) scale(${w.scale})`}>
                  <rect x="-14" y="20" width="28" height="46" fill="#b45309" stroke="#0f172a" strokeWidth="2.5" rx="5" />
                  <circle cx="0" cy="5" r="12" fill="#d97706" stroke="#0f172a" strokeWidth="2.5" />
                  <ellipse cx="4" cy="-8" rx="5" ry="4" fill="#78350f" stroke="#0f172a" strokeWidth="2" />
                  {/* Eye dots */}
                  <circle cx="-3" cy="4" r="1.5" fill="#0f172a" />
                  <circle cx="3" cy="4" r="1.5" fill="#0f172a" />
                  {/* Armor scale lines */}
                  <line x1="-10" y1="32" x2="10" y2="32" stroke="#451a03" strokeWidth="2" />
                  <line x1="-10" y1="44" x2="10" y2="44" stroke="#451a03" strokeWidth="2" />
                  {/* Boots */}
                  <rect x="-11" y="66" width="9" height="24" fill="#451a03" stroke="#0f172a" strokeWidth="2" rx="2" />
                  <rect x="2" y="66" width="9" height="24" fill="#451a03" stroke="#0f172a" strokeWidth="2" rx="2" />
                </g>
              ))}
            </svg>
          </div>
        );

      case 'chengdu':
        // Giant Panda Kingdom & Bamboo Grove
        return (
          <div
            onClick={handleTap}
            className={`${containerClasses} bg-gradient-to-b from-emerald-100 via-green-50 to-emerald-200 ${
              isBouncing ? 'scale-[1.01]' : ''
            }`}
          >
            <div className="absolute top-2.5 left-2.5 z-10 bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[11px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm">
              <span>🐼</span>
              <span>{lang === 'zh' ? '大熊猫老家 · 翠绿竹海与都江堰' : 'Panda Sanctuary & Bamboo Grove'}</span>
            </div>

            <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
              {/* Sun & Mountains */}
              <circle cx="510" cy="50" r="32" fill="#f59e0b" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M0 130 Q150 70 300 130 Q450 60 600 130 L600 260 L0 260 Z" fill="#bbf7d0" stroke="#0f172a" strokeWidth="2" />

              {/* Bamboo stalks in background */}
              {[40, 80, 130, 430, 480, 530, 570].map((bx, i) => (
                <g key={i}>
                  <line x1={bx} y1="30" x2={bx} y2="230" stroke="#16a34a" strokeWidth="7" strokeLinecap="round" />
                  <line x1={bx - 4} y1="80" x2={bx + 4} y2="80" stroke="#14532d" strokeWidth="2" />
                  <line x1={bx - 4} y1="140" x2={bx + 4} y2="140" stroke="#14532d" strokeWidth="2" />
                  {/* Bamboo leaves */}
                  <path d={`M${bx} 90 Q${bx - 20} 80 ${bx - 25} 100 Z`} fill="#22c55e" stroke="#0f172a" strokeWidth="1.5" />
                  <path d={`M${bx} 130 Q${bx + 20} 120 ${bx + 25} 140 Z`} fill="#22c55e" stroke="#0f172a" strokeWidth="1.5" />
                </g>
              ))}

              {/* Water Stream (Dujiangyan river) */}
              <path d="M0 210 Q200 190 400 215 T600 220 L600 260 L0 260 Z" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />

              {/* Main Cute Giant Panda sitting munching bamboo */}
              <g transform="translate(270, 130) scale(1.15)">
                {/* White body */}
                <ellipse cx="0" cy="35" rx="36" ry="32" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
                {/* Black back legs & feet */}
                <ellipse cx="-28" cy="55" rx="14" ry="10" fill="#0f172a" />
                <ellipse cx="28" cy="55" rx="14" ry="10" fill="#0f172a" />
                {/* White Head */}
                <circle cx="0" cy="0" r="32" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
                {/* Black Ears */}
                <circle cx="-25" cy="-25" r="11" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
                <circle cx="25" cy="-25" r="11" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
                {/* Black Eye Patches */}
                <ellipse cx="-12" cy="-3" rx="9" ry="11" fill="#0f172a" transform="rotate(-15 -12 -3)" />
                <ellipse cx="12" cy="-3" rx="9" ry="11" fill="#0f172a" transform="rotate(15 12 -3)" />
                {/* White pupils */}
                <circle cx="-11" cy="-4" r="3" fill="#ffffff" />
                <circle cx="11" cy="-4" r="3" fill="#ffffff" />
                {/* Cute black nose & smile */}
                <polygon points="-5,10 5,10 0,15" fill="#0f172a" />
                <path d="M-6 18 Q0 24 6 18" stroke="#0f172a" strokeWidth="2" fill="none" />
                {/* Bamboo stick in hand */}
                <line x1="-30" y1="40" x2="15" y2="5" stroke="#22c55e" strokeWidth="6" strokeLinecap="round" />
                {/* Black arms holding bamboo */}
                <ellipse cx="-20" cy="22" rx="12" ry="9" fill="#0f172a" transform="rotate(25 -20 22)" />
                <ellipse cx="20" cy="22" rx="12" ry="9" fill="#0f172a" transform="rotate(-25 20 22)" />
              </g>

              {/* Red Lantern */}
              <g transform="translate(180, 45) scale(0.8)">
                <ellipse cx="0" cy="15" rx="16" ry="20" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
                <line x1="0" y1="-5" x2="0" y2="35" stroke="#f59e0b" strokeWidth="2" />
                <line x1="0" y1="35" x2="0" y2="48" stroke="#ef4444" strokeWidth="3" />
              </g>
            </svg>
          </div>
        );

      case 'shanghai':
        // Modern Skyline: Oriental Pearl & Skyscraper Fireworks
        return (
          <div
            onClick={handleTap}
            className={`${containerClasses} bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900 ${
              isBouncing ? 'scale-[1.01]' : ''
            }`}
          >
            <div className="absolute top-2.5 left-2.5 z-10 bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[11px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm">
              <span>🏙️</span>
              <span>{lang === 'zh' ? '东方明珠塔 · 黄浦江外滩天际线' : 'Oriental Pearl & The Bund Skyline'}</span>
            </div>

            <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
              {/* Fireworks in night sky */}
              {[
                { x: 120, y: 50, color: '#f43f5e' },
                { x: 480, y: 40, color: '#fbbf24' },
                { x: 380, y: 65, color: '#38bdf8' },
              ].map((fw, i) => (
                <g key={i}>
                  <circle cx={fw.x} cy={fw.y} r="2" fill={fw.color} />
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, j) => {
                    const rad = (angle * Math.PI) / 180;
                    return (
                      <line
                        key={j}
                        x1={fw.x}
                        y1={fw.y}
                        x2={fw.x + Math.cos(rad) * 22}
                        y2={fw.y + Math.sin(rad) * 22}
                        stroke={fw.color}
                        strokeWidth="2"
                        strokeDasharray="2,3"
                      />
                    );
                  })}
                </g>
              ))}

              {/* Background Skyscraper Blocks */}
              <rect x="60" y="100" width="55" height="110" fill="#334155" stroke="#0f172a" strokeWidth="2" />
              <rect x="130" y="70" width="60" height="140" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
              <rect x="420" y="80" width="75" height="130" fill="#334155" stroke="#0f172a" strokeWidth="2" />
              <rect x="510" y="110" width="50" height="100" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />

              {/* Lit windows */}
              {[80, 140, 160, 440, 460].map((wx, i) => (
                <circle key={i} cx={wx} cy={120} r="3" fill="#fef08a" />
              ))}

              {/* Shanghai Tower (twisting skyscraper) */}
              <polygon points="340,210 355,50 375,50 390,210" fill="#0284c7" stroke="#0f172a" strokeWidth="2" />
              <path d="M345 170 Q365 150 385 170" stroke="#bae6fd" strokeWidth="2" fill="none" />
              <path d="M350 120 Q365 100 380 120" stroke="#bae6fd" strokeWidth="2" fill="none" />

              {/* Oriental Pearl Tower (东方明珠) in center-left */}
              <g transform="translate(250, 20)">
                <line x1="0" y1="190" x2="-22" y2="190" stroke="#ec4899" strokeWidth="4" />
                <line x1="0" y1="190" x2="22" y2="190" stroke="#ec4899" strokeWidth="4" />
                <line x1="0" y1="0" x2="0" y2="190" stroke="#ec4899" strokeWidth="5" />
                {/* Bottom Giant Sphere */}
                <circle cx="0" cy="145" r="24" fill="#ec4899" stroke="#0f172a" strokeWidth="2.5" />
                <circle cx="-5" cy="140" r="6" fill="#fbcfe8" />
                {/* Middle Sphere */}
                <circle cx="0" cy="85" r="18" fill="#f43f5e" stroke="#0f172a" strokeWidth="2.5" />
                <circle cx="-4" cy="80" r="4.5" fill="#fecdd3" />
                {/* Top Sphere Capsule */}
                <circle cx="0" cy="35" r="9" fill="#fb7185" stroke="#0f172a" strokeWidth="2" />
                {/* Antenna Needle */}
                <line x1="0" y1="26" x2="0" y2="2" stroke="#f43f5e" strokeWidth="3" />
              </g>

              {/* Huangpu River Water */}
              <rect x="0" y="200" width="600" height="60" fill="#0f172a" stroke="#0f172a" strokeWidth="2" />
              <path d="M0 215 Q150 208 300 215 T600 215" stroke="#38bdf8" strokeWidth="2" fill="none" />
              <path d="M0 235 Q150 230 300 235 T600 235" stroke="#ec4899" strokeWidth="1.5" fill="none" />

              {/* Tourist Ferry Boat */}
              <g transform="translate(140, 215)">
                <path d="M0 10 L50 10 L45 22 L10 22 Z" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
                <rect x="12" y="3" width="28" height="8" fill="#ef4444" stroke="#0f172a" strokeWidth="1.5" />
                <circle cx="20" cy="7" r="2" fill="#fef08a" />
                <circle cx="30" cy="7" r="2" fill="#fef08a" />
              </g>
            </svg>
          </div>
        );

      case 'guilin':
        // Guilin Karst Peaks & Elephant Trunk Hill & Cormorant Raft
        return (
          <div
            onClick={handleTap}
            className={`${containerClasses} bg-gradient-to-b from-teal-100 via-sky-100 to-emerald-200 ${
              isBouncing ? 'scale-[1.01]' : ''
            }`}
          >
            <div className="absolute top-2.5 left-2.5 z-10 bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[11px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm">
              <span>⛰️</span>
              <span>{lang === 'zh' ? '山水甲天下 · 漓江竹筏与象鼻山' : 'Li River & Elephant Trunk Hill'}</span>
            </div>

            <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
              <circle cx="510" cy="50" r="30" fill="#f59e0b" stroke="#0f172a" strokeWidth="2.5" />

              {/* Dramatic Sugarloaf Karst Peaks */}
              <path d="M40 180 Q80 40 120 180 Z" fill="#10b981" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M110 180 Q160 20 210 180 Z" fill="#059669" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M220 180 Q270 50 320 180 Z" fill="#10b981" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M480 180 Q530 60 580 180 Z" fill="#047857" stroke="#0f172a" strokeWidth="2.5" />

              {/* Elephant Trunk Hill (象鼻山) on the right */}
              <g transform="translate(350, 100)">
                {/* Elephant Body */}
                <ellipse cx="60" cy="50" rx="55" ry="35" fill="#0d9488" stroke="#0f172a" strokeWidth="2.5" />
                {/* Elephant Trunk reaching down */}
                <path d="M10 50 Q-10 65 -15 90 Q-2 95 10 75 Q15 60 25 50" fill="#0f766e" stroke="#0f172a" strokeWidth="2.5" />
                {/* Water-Moon Cave (hole between trunk and body) */}
                <ellipse cx="0" cy="75" rx="9" ry="8" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
                {/* Pagoda on elephant's back (Puxian Pagoda) */}
                <polygon points="55,10 65,10 60,0" fill="#b45309" stroke="#0f172a" strokeWidth="1.5" />
              </g>

              {/* Li River Mirror Water */}
              <rect x="0" y="175" width="600" height="85" fill="#38bdf8" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M0 195 Q150 190 300 195 T600 195" stroke="#bae6fd" strokeWidth="2" fill="none" />
              <path d="M0 225 Q150 220 300 225 T600 225" stroke="#7dd3fc" strokeWidth="2" fill="none" />

              {/* Fisherman on Bamboo Raft with Cormorant */}
              <g transform="translate(100, 195)">
                {/* Bamboo Raft */}
                <line x1="-35" y1="18" x2="45" y2="18" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
                {/* Fisherman figure with conical straw hat */}
                <circle cx="10" cy="-2" r="7" fill="#fde047" stroke="#0f172a" strokeWidth="1.5" />
                <polygon points="-5, -2 10,-12 25,-2" fill="#b45309" stroke="#0f172a" strokeWidth="2" />
                <rect x="5" y="5" width="10" height="14" fill="#0284c7" stroke="#0f172a" strokeWidth="1.5" />
                {/* Punting pole */}
                <line x1="18" y1="-5" x2="32" y2="28" stroke="#78350f" strokeWidth="2.5" />
                {/* Cormorant Bird perched on raft bow */}
                <ellipse cx="-25" cy="11" rx="5" ry="7" fill="#0f172a" />
                <circle cx="-25" cy="3" r="3.5" fill="#0f172a" />
                <polygon points="-28,3 -34,4 -28,5" fill="#f59e0b" />
              </g>
            </svg>
          </div>
        );

      case 'suzhou':
        // Classical Garden Moon Gate & Koi Lotus Pond
        return (
          <div
            onClick={handleTap}
            className={`${containerClasses} bg-gradient-to-b from-slate-100 via-rose-50 to-teal-100 ${
              isBouncing ? 'scale-[1.01]' : ''
            }`}
          >
            <div className="absolute top-2.5 left-2.5 z-10 bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[11px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm">
              <span>🪷</span>
              <span>{lang === 'zh' ? '拙政园月亮门 · 锦鲤荷花与水乡' : 'Moon Gate, Koi Pond & Water Town'}</span>
            </div>

            <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
              {/* White Wall with black eaves */}
              <rect x="0" y="40" width="600" height="150" fill="#f8fafc" stroke="#0f172a" strokeWidth="2.5" />
              <polygon points="0,40 300,25 600,40 600,30 300,15 0,30" fill="#334155" stroke="#0f172a" strokeWidth="2" />

              {/* Iconic Circular Moon Gate in center */}
              <circle cx="300" cy="135" r="75" fill="#0f766e" stroke="#0f172a" strokeWidth="4" />
              {/* Scenery framed inside the moon gate */}
              <path d="M225 180 Q300 90 375 180 Z" fill="#86efac" />
              {/* Bamboo shoots in courtyard */}
              <line x1="265" y1="180" x2="265" y2="120" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
              <line x1="335" y1="180" x2="335" y2="110" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
              {/* Chinese Pavilion Roof inside */}
              <polygon points="275,120 300,100 325,120" fill="#ea580c" stroke="#0f172a" strokeWidth="1.5" />

              {/* Water Pond in Foreground */}
              <rect x="0" y="185" width="600" height="75" fill="#14b8a6" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M0 205 Q150 200 300 205 T600 205" stroke="#5eead4" strokeWidth="2" fill="none" />

              {/* Pink Lotus Blossoms & Green Lily Pads */}
              {[
                { x: 100, y: 215 },
                { x: 480, y: 210 },
              ].map((lp, i) => (
                <g key={i} transform={`translate(${lp.x}, ${lp.y})`}>
                  <ellipse cx="0" cy="10" rx="28" ry="12" fill="#22c55e" stroke="#0f172a" strokeWidth="2" />
                  <path d="M0 10 L8 0" stroke="#15803d" strokeWidth="1.5" />
                  {/* Pink lotus petal */}
                  <ellipse cx="6" cy="-2" rx="10" ry="14" fill="#f43f5e" stroke="#0f172a" strokeWidth="1.5" />
                  <ellipse cx="-4" cy="-2" rx="10" ry="14" fill="#fb7185" stroke="#0f172a" strokeWidth="1.5" />
                  <ellipse cx="1" cy="-5" rx="7" ry="16" fill="#fecdd3" stroke="#0f172a" strokeWidth="1.5" />
                </g>
              ))}

              {/* Jumping Golden Koi Fish */}
              <g transform="translate(210, 195) rotate(-35)">
                <ellipse cx="0" cy="0" rx="16" ry="8" fill="#f97316" stroke="#0f172a" strokeWidth="2" />
                <polygon points="14,0 24,-7 24,7" fill="#ea580c" stroke="#0f172a" strokeWidth="1.5" />
                <circle cx="-9" cy="-2" r="2" fill="#0f172a" />
                {/* White fin */}
                <polygon points="-2,6 4,12 6,6" fill="#ffffff" />
              </g>
            </svg>
          </div>
        );

      case 'dunhuang':
        // Mogao Grottoes, Singing Sand Dunes & Crescent Moon Oasis
        return (
          <div
            onClick={handleTap}
            className={`${containerClasses} bg-gradient-to-b from-amber-200 via-orange-200 to-amber-300 ${
              isBouncing ? 'scale-[1.01]' : ''
            }`}
          >
            <div className="absolute top-2.5 left-2.5 z-10 bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[11px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm">
              <span>🐪</span>
              <span>{lang === 'zh' ? '莫高窟飞天 · 鸣沙山与神奇月牙泉' : 'Mogao Caves & Crescent Moon Oasis'}</span>
            </div>

            <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
              <circle cx="510" cy="45" r="30" fill="#ea580c" stroke="#0f172a" strokeWidth="2.5" />

              {/* Flying Apsara Ribbon in Sky */}
              <path d="M120 40 Q180 15 250 45 Q320 70 380 35" stroke="#ec4899" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M140 52 Q200 25 270 55 Q340 80 400 45" stroke="#f59e0b" strokeWidth="3" fill="none" strokeLinecap="round" />

              {/* Golden Sand Dunes */}
              <path d="M0 140 Q160 80 320 150 Q460 70 600 140 L600 260 L0 260 Z" fill="#f59e0b" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M0 165 Q180 120 360 175 Q480 130 600 170 L600 260 L0 260 Z" fill="#d97706" opacity="0.6" />

              {/* Crescent Moon Lake (月牙泉) */}
              <path d="M220 200 Q310 160 400 200 Q310 225 220 200 Z" fill="#0284c7" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M240 198 Q310 175 380 198" stroke="#7dd3fc" strokeWidth="2" fill="none" />

              {/* Traditional 4-story Pagoda by the oasis */}
              <g transform="translate(370, 140) scale(0.75)">
                <rect x="15" y="45" width="30" height="30" fill="#92400e" stroke="#0f172a" strokeWidth="2" />
                <polygon points="5,45 30,30 55,45" fill="#f59e0b" stroke="#0f172a" strokeWidth="2" />
                <rect x="18" y="22" width="24" height="15" fill="#92400e" stroke="#0f172a" strokeWidth="2" />
                <polygon points="10,22 30,10 50,22" fill="#f59e0b" stroke="#0f172a" strokeWidth="2" />
              </g>

              {/* Friendly Camel Caravan walking across dunes */}
              <g transform="translate(90, 175) scale(0.9)">
                {/* Camel 1 */}
                <ellipse cx="0" cy="15" rx="20" ry="14" fill="#b45309" stroke="#0f172a" strokeWidth="2" />
                {/* Humps */}
                <circle cx="-7" cy="2" r="7" fill="#b45309" stroke="#0f172a" strokeWidth="1.5" />
                <circle cx="7" cy="2" r="7" fill="#b45309" stroke="#0f172a" strokeWidth="1.5" />
                {/* Long neck & head */}
                <path d="M15 15 Q26 5 25 -10" stroke="#b45309" strokeWidth="6" strokeLinecap="round" />
                <ellipse cx="28" cy="-10" rx="7" ry="5" fill="#b45309" stroke="#0f172a" strokeWidth="1.5" />
                <circle cx="30" cy="-12" r="1.5" fill="#0f172a" />
                {/* Legs */}
                <line x1="-12" y1="28" x2="-14" y2="46" stroke="#0f172a" strokeWidth="2.5" />
                <line x1="-4" y1="28" x2="-2" y2="46" stroke="#0f172a" strokeWidth="2.5" />
                <line x1="8" y1="28" x2="6" y2="46" stroke="#0f172a" strokeWidth="2.5" />
                <line x1="16" y1="28" x2="18" y2="46" stroke="#0f172a" strokeWidth="2.5" />
              </g>
            </svg>
          </div>
        );

      case 'lhasa':
        // Potala Palace perched high & Prayer Flags
        return (
          <div
            onClick={handleTap}
            className={`${containerClasses} bg-gradient-to-b from-sky-300 via-sky-100 to-amber-100 ${
              isBouncing ? 'scale-[1.01]' : ''
            }`}
          >
            <div className="absolute top-2.5 left-2.5 z-10 bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[11px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm">
              <span>🏔️</span>
              <span>{lang === 'zh' ? '布达拉宫 · 雪山之巅与五彩风马旗' : 'Potala Palace & Snow Himalayas'}</span>
            </div>

            <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
              <circle cx="510" cy="45" r="30" fill="#facc15" stroke="#0f172a" strokeWidth="2.5" />

              {/* Distant Snow-capped Himalayas */}
              <polygon points="50,130 140,50 230,130" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
              <polygon points="105,82 140,50 175,82" fill="#ffffff" />
              <polygon points="380,130 470,45 560,130" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
              <polygon points="435,78 470,45 505,78" fill="#ffffff" />

              {/* Red Mountain (红山) Base */}
              <path d="M120 220 Q300 130 480 220 Z" fill="#7f1d1d" stroke="#0f172a" strokeWidth="2.5" />

              {/* Potala Palace (White Palace & Central Red Palace) */}
              <g transform="translate(190, 85)">
                {/* White Palace Wings */}
                <rect x="0" y="35" width="220" height="75" fill="#f8fafc" stroke="#0f172a" strokeWidth="3" />
                {/* Tiny windows */}
                {[20, 45, 175, 200].map((wx, i) => (
                  <rect key={i} x={wx} y="55" width="8" height="12" fill="#7f1d1d" stroke="#0f172a" strokeWidth="1" />
                ))}
                {/* Crimson Red Palace in Center */}
                <rect x="65" y="10" width="90" height="100" fill="#991b1b" stroke="#0f172a" strokeWidth="3" />
                {/* Golden Roofs on Top */}
                <polygon points="60,10 110,-5 160,10" fill="#f59e0b" stroke="#0f172a" strokeWidth="2.5" />
                {/* Yellow curtain / emblem */}
                <rect x="95" y="25" width="30" height="40" fill="#fef08a" stroke="#0f172a" strokeWidth="1.5" />
              </g>

              {/* Tibetan Prayer Flags String */}
              <path d="M0 60 Q150 100 300 70 Q450 100 600 65" stroke="#0f172a" strokeWidth="2" fill="none" />
              {[
                { x: 30, color: '#3b82f6' }, // Blue (Sky)
                { x: 60, color: '#ffffff' }, // White (Cloud)
                { x: 90, color: '#ef4444' }, // Red (Fire)
                { x: 120, color: '#22c55e' }, // Green (Water)
                { x: 150, color: '#facc15' }, // Yellow (Earth)
                { x: 450, color: '#3b82f6' },
                { x: 480, color: '#ffffff' },
                { x: 510, color: '#ef4444' },
                { x: 540, color: '#22c55e' },
                { x: 570, color: '#facc15' },
              ].map((flag, idx) => (
                <polygon key={idx} points={`${flag.x},68 ${flag.x + 18},68 ${flag.x + 9},88`} fill={flag.color} stroke="#0f172a" strokeWidth="1" />
              ))}

              {/* Plateau Ground */}
              <rect x="0" y="215" width="600" height="45" fill="#ca8a04" stroke="#0f172a" strokeWidth="2" />
            </svg>
          </div>
        );

      case 'huangshan':
        // Welcoming Pine & Sea of Clouds
        return (
          <div
            onClick={handleTap}
            className={`${containerClasses} bg-gradient-to-b from-sky-200 via-indigo-50 to-slate-200 ${
              isBouncing ? 'scale-[1.01]' : ''
            }`}
          >
            <div className="absolute top-2.5 left-2.5 z-10 bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[11px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm">
              <span>🌲</span>
              <span>{lang === 'zh' ? '天下第一奇山 · 千年迎客松与梦幻云海' : 'Huangshan Welcoming Pine & Cloud Sea'}</span>
            </div>

            <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
              <circle cx="510" cy="45" r="30" fill="#f59e0b" stroke="#0f172a" strokeWidth="2.5" />

              {/* Granite Cliff Peaks */}
              <polygon points="50,260 100,70 170,260" fill="#64748b" stroke="#0f172a" strokeWidth="2.5" />
              <polygon points="430,260 480,90 550,260" fill="#64748b" stroke="#0f172a" strokeWidth="2.5" />
              {/* Central high cliff */}
              <polygon points="200,260 270,110 380,260" fill="#475569" stroke="#0f172a" strokeWidth="2.5" />

              {/* Fluffy Rolling Sea of Clouds */}
              <path d="M0 170 Q70 140 140 170 Q210 135 280 170 Q350 140 420 170 Q490 135 600 170 L600 260 L0 260 Z" fill="#ffffff" opacity="0.9" stroke="#0f172a" strokeWidth="2" />
              <path d="M50 200 Q140 175 230 200 Q320 170 410 200 Q500 175 600 200 L600 260 L0 260 Z" fill="#e2e8f0" opacity="0.7" />

              {/* Famous Welcoming Pine (迎客松) growing on the cliff ledge */}
              <g transform="translate(180, 75)">
                {/* Rugged Trunk */}
                <path d="M50 70 Q60 40 45 15" stroke="#78350f" strokeWidth="9" strokeLinecap="round" fill="none" />
                {/* Outstretched Long Welcoming Branch */}
                <path d="M48 30 Q80 15 125 35" stroke="#78350f" strokeWidth="7" strokeLinecap="round" fill="none" />
                <path d="M45 20 Q15 5 -15 25" stroke="#78350f" strokeWidth="6" strokeLinecap="round" fill="none" />
                {/* Vibrant Pine Needles Cloud Clusters */}
                <ellipse cx="125" cy="35" rx="26" ry="14" fill="#15803d" stroke="#0f172a" strokeWidth="2" />
                <ellipse cx="100" cy="22" rx="20" ry="12" fill="#16a34a" stroke="#0f172a" strokeWidth="1.5" />
                <ellipse cx="-15" cy="25" rx="22" ry="12" fill="#15803d" stroke="#0f172a" strokeWidth="2" />
                <ellipse cx="45" cy="10" rx="24" ry="14" fill="#16a34a" stroke="#0f172a" strokeWidth="2" />
              </g>

              {/* Cute Monkey Gazing at Sea of Clouds on peak */}
              <g transform="translate(480, 80)">
                <ellipse cx="0" cy="0" rx="6" ry="8" fill="#92400e" stroke="#0f172a" strokeWidth="1" />
                <circle cx="0" cy="-7" r="4.5" fill="#b45309" stroke="#0f172a" strokeWidth="1" />
                <circle cx="-1" cy="-7" r="1" fill="#0f172a" />
              </g>
            </svg>
          </div>
        );

      case 'guangzhou':
        // Canton Tower "Slim Waist" & Steaming Dim Sum Steamer
        return (
          <div
            onClick={handleTap}
            className={`${containerClasses} bg-gradient-to-b from-rose-100 via-amber-50 to-pink-200 ${
              isBouncing ? 'scale-[1.01]' : ''
            }`}
          >
            <div className="absolute top-2.5 left-2.5 z-10 bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[11px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm">
              <span>🥟</span>
              <span>{lang === 'zh' ? '小蛮腰广州塔 · 晶莹虾饺与早茶蒸笼' : 'Canton Tower & Steaming Dim Sum'}</span>
            </div>

            <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
              <circle cx="510" cy="45" r="30" fill="#f43f5e" opacity="0.8" stroke="#0f172a" strokeWidth="2.5" />

              {/* Canton Tower (小蛮腰) on the left */}
              <g transform="translate(180, 20)">
                {/* Hyperboloid twisting lattice */}
                <path d="M-30 200 Q-10 110 -25 30 L25 30 Q10 110 30 200 Z" fill="#ec4899" opacity="0.8" stroke="#0f172a" strokeWidth="2.5" />
                {/* Diagonal criss-cross steel struts */}
                <line x1="-30" y1="200" x2="25" y2="30" stroke="#ffffff" strokeWidth="1.5" />
                <line x1="30" y1="200" x2="-25" y2="30" stroke="#ffffff" strokeWidth="1.5" />
                {/* Antenna Spire */}
                <line x1="0" y1="30" x2="0" y2="0" stroke="#0f172a" strokeWidth="3" />
                <circle cx="0" cy="0" r="4" fill="#facc15" stroke="#0f172a" strokeWidth="1.5" />
                {/* Bubble tram ring on top */}
                <ellipse cx="0" cy="30" rx="20" ry="5" fill="#fef08a" stroke="#0f172a" strokeWidth="1.5" />
              </g>

              {/* Big Bamboo Dim Sum Steamer Basket on the right */}
              <g transform="translate(400, 140)">
                {/* Steamer wood basket base */}
                <rect x="-65" y="20" width="130" height="40" fill="#d97706" stroke="#0f172a" strokeWidth="3" rx="4" />
                <line x1="-65" y1="40" x2="65" y2="40" stroke="#78350f" strokeWidth="2" />
                {/* Bamboo texture lines */}
                {[-45, -20, 5, 30].map((lx, i) => (
                  <line key={i} x1={lx} y1="20" x2={lx} y2="60" stroke="#b45309" strokeWidth="1.5" />
                ))}

                {/* Yummy Shrimp Dumplings (晶莹剔透的水晶虾饺) */}
                {[
                  { x: -35, y: 15 },
                  { x: 0, y: 10 },
                  { x: 35, y: 15 },
                ].map((d, i) => (
                  <g key={i} transform={`translate(${d.x}, ${d.y})`}>
                    <ellipse cx="0" cy="0" rx="18" ry="13" fill="#fef2f2" stroke="#0f172a" strokeWidth="2" />
                    {/* Pink shrimp filling visible through translucent skin */}
                    <ellipse cx="2" cy="1" rx="9" ry="6" fill="#f43f5e" opacity="0.8" />
                    {/* Pleats on dumpling edge */}
                    <path d="M-12 -6 Q0 -11 12 -6" stroke="#0f172a" strokeWidth="1.5" fill="none" />
                  </g>
                ))}

                {/* Cute Steam Swirls */}
                <path d="M-20 -5 Q-25 -25 -10 -40" stroke="#94a3b8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M10 -5 Q5 -25 20 -40" stroke="#94a3b8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>

              {/* Pearl River Water in Foreground */}
              <rect x="0" y="205" width="600" height="55" fill="#38bdf8" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M0 225 Q150 220 300 225 T600 225" stroke="#bae6fd" strokeWidth="2" fill="none" />
            </svg>
          </div>
        );

      case 'nanjing':
        // Ming City Wall Stone Gate & Glowing Qinhuai River Lanterns
        return (
          <div
            onClick={handleTap}
            className={`${containerClasses} bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-900 ${
              isBouncing ? 'scale-[1.01]' : ''
            }`}
          >
            <div className="absolute top-2.5 left-2.5 z-10 bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[11px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm">
              <span>🏮</span>
              <span>{lang === 'zh' ? '六朝古都明城墙 · 十里秦淮河红灯笼' : 'Ming City Wall & Qinhuai Lanterns'}</span>
            </div>

            <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
              {/* Moon */}
              <circle cx="510" cy="45" r="28" fill="#fef08a" stroke="#0f172a" strokeWidth="2.5" />

              {/* Giant Ming City Wall Fortress Gate (中华门) */}
              <g transform="translate(180, 50)">
                {/* Brick fortress structure */}
                <rect x="-80" y="40" width="160" height="100" fill="#64748b" stroke="#0f172a" strokeWidth="3" />
                {/* Battlements on top */}
                {[-75, -45, -15, 15, 45].map((bx, i) => (
                  <rect key={i} x={bx} y="25" width="20" height="18" fill="#475569" stroke="#0f172a" strokeWidth="2" />
                ))}
                {/* Arched Stone Gate Opening */}
                <path d="M-30 140 L-30 90 Q0 60 30 90 L30 140 Z" fill="#0f172a" stroke="#0f172a" strokeWidth="3" />
                {/* Brick lines */}
                <line x1="-70" y1="65" x2="-40" y2="65" stroke="#334155" strokeWidth="2" />
                <line x1="40" y1="65" x2="70" y2="65" stroke="#334155" strokeWidth="2" />
                <line x1="-60" y1="110" x2="-35" y2="110" stroke="#334155" strokeWidth="2" />
                <line x1="35" y1="110" x2="60" y2="110" stroke="#334155" strokeWidth="2" />
              </g>

              {/* Glowing Red Lanterns hanging from eaves */}
              {[70, 130, 440, 500].map((lx, i) => (
                <g key={i} transform={`translate(${lx}, 85)`}>
                  <line x1="0" y1="-25" x2="0" y2="0" stroke="#f59e0b" strokeWidth="1.5" />
                  <ellipse cx="0" cy="12" rx="14" ry="16" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
                  <line x1="0" y1="-2" x2="0" y2="26" stroke="#fbbf24" strokeWidth="2" />
                  <line x1="0" y1="28" x2="0" y2="40" stroke="#ef4444" strokeWidth="2.5" />
                </g>
              ))}

              {/* Qinhuai River with Night Glow Reflections */}
              <rect x="0" y="180" width="600" height="80" fill="#0c4a6e" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M0 200 Q150 195 300 200 T600 200" stroke="#0284c7" strokeWidth="2" fill="none" />
              <path d="M0 225 Q150 220 300 225 T600 225" stroke="#f43f5e" strokeWidth="2" fill="none" />

              {/* Traditional Painted Dragon Boat floating on river */}
              <g transform="translate(360, 185)">
                <path d="M0 12 L70 12 L60 28 L15 28 Z" fill="#b91c1c" stroke="#0f172a" strokeWidth="2.5" />
                {/* Yellow roof canopy */}
                <polygon points="10,12 40,0 70,12" fill="#facc15" stroke="#0f172a" strokeWidth="2" />
                {/* Dragon head at bow */}
                <path d="M70 14 Q85 8 82 -2" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" />
                <circle cx="82" cy="-2" r="3" fill="#facc15" />
                {/* Glow ring in water */}
                <ellipse cx="40" cy="30" rx="35" ry="4" fill="#fbbf24" opacity="0.4" />
              </g>
            </svg>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative group">
      {renderIllustration()}
      {/* Bottom Right Tag */}
      <div className="absolute bottom-2.5 right-3 bg-white/95 border-2 border-slate-900 px-2.5 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm">
        <span>🇨🇳 {getName()} · {getLandmark()}</span>
      </div>
      {/* Tap hint sticker */}
      <div className="absolute top-2.5 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-amber-400 text-slate-950 border border-slate-900 text-[10px] font-comic font-black px-2 py-0.5 rounded-lg shadow-sm">
        ✨ 点击互动
      </div>
    </div>
  );
};

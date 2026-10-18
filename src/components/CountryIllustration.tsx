import React from 'react';

interface CountryIllustrationProps {
  countryId: string;
  name: string;
  lang?: 'en' | 'zh';
}

export const CountryIllustration: React.FC<CountryIllustrationProps> = ({ countryId, name, lang = 'en' }) => {
  // Uniform responsive container with guaranteed zero-cropping and high contrast border
  const containerClasses = "relative w-full aspect-[2/1] sm:aspect-[2.2/1] min-h-[190px] sm:min-h-[230px] max-h-[290px] rounded-2xl overflow-hidden border-2 border-slate-900 comic-box select-none bg-slate-100";

  switch (countryId) {
    case 'canada':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-200`}>
          {/* Top-Left Informational Pill Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] sm:max-w-[70%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span className="shrink-0">🌲</span>
            <span className="truncate">{lang === 'zh' ? '200万+ 冰川湖泊 · 占全球60%' : '2,000,000+ Glacial Lakes (60% of World)'}</span>
          </div>

          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Soft Clouds & Golden Sun */}
            <circle cx="510" cy="65" r="32" fill="#fde047" stroke="#0f172a" strokeWidth="2.5" />
            <path d="M50 45 Q70 30 100 45 Q130 30 150 45 Q165 65 140 65 Q90 65 50 45 Z" fill="#ffffff" opacity="0.9" stroke="#0f172a" strokeWidth="1.5" />
            <path d="M430 40 Q445 28 470 40 Q490 28 505 40 Q515 55 495 55 Q460 55 430 40 Z" fill="#ffffff" opacity="0.8" stroke="#0f172a" strokeWidth="1.5" />

            {/* Canadian Rocky Mountains with Crisp Snowcaps */}
            <polygon points="50,180 160,85 270,180" fill="#94a3b8" stroke="#0f172a" strokeWidth="2" />
            <polygon points="135,110 160,85 185,110 170,122 150,122" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />

            <polygon points="170,180 300,55 430,180" fill="#64748b" stroke="#0f172a" strokeWidth="2.5" />
            <polygon points="265,95 300,55 335,95 315,112 285,112" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />

            <polygon points="360,180 460,80 560,180" fill="#94a3b8" stroke="#0f172a" strokeWidth="2" />
            <polygon points="435,105 460,80 485,105 470,118 450,118" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />

            {/* Dense Pine Forest */}
            <polygon points="30,190 55,140 80,190" fill="#15803d" stroke="#0f172a" strokeWidth="1.5" />
            <polygon points="65,190 90,145 115,190" fill="#166534" stroke="#0f172a" strokeWidth="1.5" />
            <polygon points="100,190 120,150 140,190" fill="#15803d" stroke="#0f172a" strokeWidth="1.5" />
            <polygon points="480,190 505,140 530,190" fill="#15803d" stroke="#0f172a" strokeWidth="1.5" />
            <polygon points="515,190 540,145 565,190" fill="#166534" stroke="#0f172a" strokeWidth="1.5" />

            {/* Turquoise Moraine Glacial Lake */}
            <rect x="0" y="180" width="600" height="80" fill="#06b6d4" stroke="#0f172a" strokeWidth="2.5" />
            <path d="M0 200 Q150 192 300 200 T600 200" stroke="#a5f3fc" strokeWidth="3" fill="none" />
            <path d="M0 225 Q150 218 300 225 T600 225" stroke="#67e8f9" strokeWidth="2" fill="none" />

            {/* Canadian Red Canoe */}
            <path d="M230 212 Q290 236 350 212 Q290 206 230 212 Z" fill="#ef4444" stroke="#0f172a" strokeWidth="2.5" />
            <line x1="260" y1="202" x2="305" y2="232" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
            <circle cx="280" cy="202" r="7" fill="#fbbf24" stroke="#0f172a" strokeWidth="1.5" />
            <text x="365" y="218" fontSize="18">🍁</text>
          </svg>

          {/* Bottom-Right Flag Tag */}
          <div className="absolute bottom-2 right-2.5 max-w-[80%] bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm truncate">
            <span className="truncate">🇨🇦 {lang === 'zh' ? '加拿大 · 班夫梦莲湖' : 'Banff, Alberta, Canada'}</span>
          </div>
        </div>
      );

    case 'china':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-amber-100 via-rose-100 to-emerald-200`}>
          {/* Top-Left Informational Pill Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] sm:max-w-[70%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span className="shrink-0">🍚</span>
            <span className="truncate">{lang === 'zh' ? '糯米砂浆砌筑 · 千年抗震' : 'Sticky Sweet Rice Mortar · Earthquake-Proof'}</span>
          </div>

          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Sunrise in China Mountains */}
            <circle cx="120" cy="70" r="35" fill="#ef4444" opacity="0.85" stroke="#0f172a" strokeWidth="2" />

            {/* Rolling Green Mountain Ridges */}
            <path d="M0 160 Q150 100 300 155 T600 130 L600 260 L0 260 Z" fill="#15803d" stroke="#0f172a" strokeWidth="2.5" />
            <path d="M0 190 Q200 140 400 190 T600 170 L600 260 L0 260 Z" fill="#166534" stroke="#0f172a" strokeWidth="2" />

            {/* Great Wall Winding Pathway */}
            <path d="M0 175 Q100 140 220 165 T450 135 T600 120" stroke="#78350f" strokeWidth="22" strokeLinecap="round" fill="none" />
            <path d="M0 175 Q100 140 220 165 T450 135 T600 120" stroke="#fef08a" strokeWidth="12" strokeDasharray="12 6" fill="none" />

            {/* Watchtower 1 */}
            <g transform="translate(195, 120)">
              <rect x="0" y="20" width="36" height="35" fill="#a16207" stroke="#0f172a" strokeWidth="2.5" rx="3" />
              <path d="M-5 20 Q18 5 41 20 Z" fill="#b91c1c" stroke="#0f172a" strokeWidth="2" />
              <rect x="12" y="32" width="12" height="15" rx="6" fill="#0f172a" />
            </g>

            {/* Watchtower 2 */}
            <g transform="translate(425, 95)">
              <rect x="0" y="20" width="34" height="32" fill="#a16207" stroke="#0f172a" strokeWidth="2.5" rx="3" />
              <path d="M-5 20 Q17 5 39 20 Z" fill="#b91c1c" stroke="#0f172a" strokeWidth="2" />
              <rect x="11" y="30" width="12" height="14" rx="6" fill="#0f172a" />
            </g>

            {/* Sticky Rice Ceramic Bowl Feature Callout */}
            <g transform="translate(50, 155)">
              <rect x="0" y="0" width="95" height="52" rx="12" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
              <text x="10" y="22" fontFamily="Fredoka" fontSize="12" fontWeight="bold" fill="#0f172a">
                {lang === 'zh' ? '🍚 糯米灰浆' : '🍚 Sticky Rice'}
              </text>
              <text x="10" y="40" fontFamily="Fredoka" fontSize="10" fontWeight="bold" fill="#b45309">
                {lang === 'zh' ? '长城古建奇迹' : 'Ancient Mortar'}
              </text>
            </g>
          </svg>

          {/* Bottom-Right Flag Tag */}
          <div className="absolute bottom-2 right-2.5 max-w-[80%] bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm truncate">
            <span className="truncate">🇨🇳 {lang === 'zh' ? '中国万里长城' : 'Great Wall of China'}</span>
          </div>
        </div>
      );

    case 'japan':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-rose-100 via-sky-100 to-slate-200`}>
          {/* Top-Left Informational Pill Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] sm:max-w-[70%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span className="shrink-0">🚄</span>
            <span className="truncate">{lang === 'zh' ? '翠鸟仿生学车头 · 消除隧道音爆' : 'Kingfisher Beak Biomimicry · Zero Sonic Booms'}</span>
          </div>

          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Red Rising Sun */}
            <circle cx="300" cy="85" r="45" fill="#ef4444" opacity="0.85" stroke="#0f172a" strokeWidth="2" />

            {/* Mount Fuji */}
            <polygon points="180,185 300,65 420,185" fill="#3b82f6" stroke="#0f172a" strokeWidth="2.5" />
            <polygon points="260,105 300,65 340,105 325,115 300,108 275,115" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />

            {/* Cherry Blossom Branch */}
            <path d="M0 40 Q60 60 110 30" stroke="#78350f" strokeWidth="4" fill="none" />
            <circle cx="45" cy="50" r="8" fill="#f472b6" stroke="#0f172a" strokeWidth="1" />
            <circle cx="75" cy="55" r="7" fill="#f472b6" stroke="#0f172a" strokeWidth="1" />
            <circle cx="105" cy="35" r="8" fill="#fbcfe8" stroke="#0f172a" strokeWidth="1" />

            {/* High Speed Viaduct */}
            <rect x="0" y="180" width="600" height="40" fill="#64748b" stroke="#0f172a" strokeWidth="2.5" />
            <line x1="0" y1="192" x2="600" y2="192" stroke="#0f172a" strokeWidth="3" strokeDasharray="16 10" />

            {/* Shinkansen Bullet Train */}
            <path d="M120 180 L380 180 Q480 180 540 170 Q490 158 380 158 L120 158 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
            <path d="M120 170 L380 170 Q460 170 510 166 L380 165 L120 165 Z" fill="#2563eb" />
            <circle cx="485" cy="164" r="4" fill="#fde047" stroke="#0f172a" strokeWidth="1.5" />

            {/* Kingfisher Bird with Beak Comparison */}
            <g transform="translate(60, 95)">
              <rect x="0" y="0" width="90" height="60" rx="14" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
              <ellipse cx="40" cy="30" rx="16" ry="11" fill="#0284c7" stroke="#0f172a" strokeWidth="1.5" />
              <path d="M54 30 L80 32 L54 35 Z" fill="#f97316" stroke="#0f172a" strokeWidth="1.5" />
              <circle cx="34" cy="27" r="2.5" fill="#0f172a" />
              <text x="8" y="52" fontFamily="Fredoka" fontSize="9" fontWeight="bold" fill="#0369a1">Kingfisher Beak</text>
            </g>
          </svg>

          {/* Bottom-Right Flag Tag */}
          <div className="absolute bottom-2 right-2.5 max-w-[80%] bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm truncate">
            <span className="truncate">🇯🇵 {lang === 'zh' ? '日本新干线与翠鸟' : 'Shinkansen & Kingfisher'}</span>
          </div>
        </div>
      );

    case 'australia':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-amber-200 via-orange-100 to-amber-300`}>
          {/* Top-Left Informational Pill Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] sm:max-w-[70%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span className="shrink-0">📦</span>
            <span className="truncate">{lang === 'zh' ? '神奇正方体便便 · 堆叠在岩石防滚落' : 'Cube-Shaped Droppings · Stack Without Rolling!'}</span>
          </div>

          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Outback Red Rock (Uluru) */}
            <path d="M140 150 L190 100 L410 100 L460 150 Z" fill="#ea580c" stroke="#0f172a" strokeWidth="2.5" />
            <line x1="200" y1="115" x2="400" y2="115" stroke="#c2410c" strokeWidth="2" strokeDasharray="10 6" />

            {/* Red Soil Desert Ground */}
            <rect x="0" y="165" width="600" height="95" fill="#c2410c" stroke="#0f172a" strokeWidth="2.5" />

            {/* Flat Boulder for Poop Demonstration */}
            <ellipse cx="440" cy="195" rx="75" ry="32" fill="#78350f" stroke="#0f172a" strokeWidth="2.5" />

            {/* Cute Wombat Character */}
            <g transform="translate(160, 120)">
              {/* Body */}
              <ellipse cx="65" cy="55" rx="55" ry="36" fill="#a16207" stroke="#0f172a" strokeWidth="2.5" />
              {/* Head */}
              <circle cx="20" cy="45" r="28" fill="#ca8a04" stroke="#0f172a" strokeWidth="2.5" />
              {/* Ears */}
              <circle cx="8" cy="20" r="9" fill="#ca8a04" stroke="#0f172a" strokeWidth="2" />
              <circle cx="32" cy="20" r="9" fill="#ca8a04" stroke="#0f172a" strokeWidth="2" />
              {/* Eyes & Cute Snout */}
              <circle cx="14" cy="40" r="3.5" fill="#0f172a" />
              <circle cx="28" cy="40" r="3.5" fill="#0f172a" />
              <ellipse cx="20" cy="52" rx="7" ry="5" fill="#451a03" />
              {/* Legs */}
              <rect x="25" y="80" width="16" height="18" rx="4" fill="#713f12" stroke="#0f172a" strokeWidth="2" />
              <rect x="80" y="80" width="16" height="18" rx="4" fill="#713f12" stroke="#0f172a" strokeWidth="2" />
            </g>

            {/* STACKED 3D CUBES (正方体便便) - Distinct Geometric Cubes */}
            <g transform="translate(420, 140)">
              {/* Cube 1 (Bottom Left) */}
              <rect x="0" y="24" width="24" height="24" rx="3" fill="#713f12" stroke="#0f172a" strokeWidth="2" />
              {/* Cube 2 (Bottom Right) */}
              <rect x="28" y="24" width="24" height="24" rx="3" fill="#854d0e" stroke="#0f172a" strokeWidth="2" />
              {/* Cube 3 (Stacked on Top!) */}
              <rect x="14" y="-2" width="24" height="24" rx="3" fill="#a16207" stroke="#0f172a" strokeWidth="2" />
              {/* Sparkles */}
              <text x="44" y="8" fontSize="20">✨</text>
            </g>
          </svg>

          {/* Bottom-Right Flag Tag */}
          <div className="absolute bottom-2 right-2.5 max-w-[80%] bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm truncate">
            <span className="truncate">🇦🇺 {lang === 'zh' ? '澳大利亚袋熊' : 'Australian Wombat'}</span>
          </div>
        </div>
      );

    case 'united-kingdom':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-indigo-200 via-sky-200 to-emerald-200`}>
          {/* Top-Left Informational Pill Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] sm:max-w-[70%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span className="shrink-0">🦄</span>
            <span className="truncate">{lang === 'zh' ? '苏格兰官方国兽：神话独角兽' : "Scotland's National Animal: The Unicorn"}</span>
          </div>

          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Scottish Highlands & Loch */}
            <path d="M0 160 Q150 130 300 150 T600 140 L600 260 L0 260 Z" fill="#15803d" stroke="#0f172a" strokeWidth="2.5" />

            {/* Medieval Scottish Castle */}
            <g transform="translate(430, 90)">
              <rect x="0" y="20" width="70" height="60" fill="#64748b" stroke="#0f172a" strokeWidth="2.5" />
              <rect x="0" y="8" width="18" height="16" fill="#475569" stroke="#0f172a" strokeWidth="1.5" />
              <rect x="26" y="8" width="18" height="16" fill="#475569" stroke="#0f172a" strokeWidth="1.5" />
              <rect x="52" y="8" width="18" height="16" fill="#475569" stroke="#0f172a" strokeWidth="1.5" />
              <polygon points="35,8 35,-10 50,-2 35,-2" fill="#2563eb" stroke="#0f172a" strokeWidth="1.5" />
            </g>

            {/* Majestic White Unicorn */}
            <g transform="translate(180, 80)">
              {/* Body */}
              <ellipse cx="90" cy="95" rx="50" ry="32" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
              {/* Neck & Head */}
              <path d="M55 90 L30 40 L10 50 L40 100 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
              <ellipse cx="18" cy="48" rx="18" ry="13" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
              {/* Golden Spiral Horn */}
              <polygon points="18,38 2, -5 10,36" fill="#eab308" stroke="#0f172a" strokeWidth="2" />
              <circle cx="2" cy="-6" r="4" fill="#fde047" />
              {/* Flowing Mane & Golden Hooves */}
              <path d="M35 40 Q45 60 40 85" stroke="#93c5fd" strokeWidth="6" fill="none" />
              {/* Legs */}
              <rect x="55" y="118" width="10" height="36" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
              <rect x="75" y="118" width="10" height="36" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
              <rect x="105" y="118" width="10" height="36" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
              <rect x="125" y="118" width="10" height="36" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
              <rect x="55" y="146" width="10" height="8" fill="#eab308" />
              <rect x="75" y="146" width="10" height="8" fill="#eab308" />
              <rect x="105" y="146" width="10" height="8" fill="#eab308" />
              <rect x="125" y="146" width="10" height="8" fill="#eab308" />
              {/* Royal Golden Chain Collar */}
              <ellipse cx="45" cy="85" rx="12" ry="7" fill="none" stroke="#eab308" strokeWidth="3" />
            </g>
          </svg>

          {/* Bottom-Right Flag Tag */}
          <div className="absolute bottom-2 right-2.5 max-w-[80%] bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm truncate">
            <span className="truncate">🇬🇧 {lang === 'zh' ? '英国苏格兰皇家独角兽' : 'The Scottish Royal Unicorn'}</span>
          </div>
        </div>
      );

    case 'france':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-amber-100 via-sky-200 to-emerald-100`}>
          {/* Top-Left Informational Pill Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] sm:max-w-[70%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span className="shrink-0">☀️</span>
            <span className="truncate">{lang === 'zh' ? '夏日金属热胀冷缩 · 铁塔长高 15 厘米！' : 'Thermal Expansion · ⬆ +15 cm in Summer!'}</span>
          </div>

          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Parisian Summer Sun with Sunglasses */}
            <circle cx="130" cy="70" r="35" fill="#f59e0b" stroke="#0f172a" strokeWidth="2.5" />
            <rect x="110" y="62" width="18" height="10" rx="3" fill="#0f172a" />
            <rect x="132" y="62" width="18" height="10" rx="3" fill="#0f172a" />
            <line x1="126" y1="66" x2="134" y2="66" stroke="#0f172a" strokeWidth="2.5" />

            {/* Parisian Green Champ de Mars Ground */}
            <rect x="0" y="210" width="600" height="50" fill="#15803d" stroke="#0f172a" strokeWidth="2.5" />

            {/* Grand Eiffel Tower Lattice Structure */}
            <g transform="translate(300, 30)">
              {/* Spire */}
              <line x1="0" y1="0" x2="0" y2="25" stroke="#78350f" strokeWidth="4" />
              {/* Top Tier */}
              <polygon points="-12,50 12,50 8,25 -8,25" fill="#78350f" stroke="#0f172a" strokeWidth="2" />
              {/* Middle Tier */}
              <polygon points="-24,105 24,105 14,50 -14,50" fill="#92400e" stroke="#0f172a" strokeWidth="2" />
              <rect x="-28" y="105" width="56" height="8" rx="2" fill="#451a03" stroke="#0f172a" strokeWidth="2" />
              {/* Base Legs */}
              <polygon points="-52,180 -24,113 24,113 52,180 32,180 18,135 -18,135 -32,180" fill="#78350f" stroke="#0f172a" strokeWidth="2" />
              <path d="-26 180 Q0 145 26 180 Z" fill="#93c5fd" stroke="#0f172a" strokeWidth="2" />
            </g>

            {/* Giant Thermometer / Height Expansion Ruler */}
            <g transform="translate(420, 55)">
              <rect x="0" y="0" width="115" height="135" rx="16" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
              <text x="14" y="32" fontFamily="Fredoka" fontSize="16" fontWeight="bold" fill="#ef4444">⬆ +15 cm</text>
              <text x="14" y="52" fontFamily="Fredoka" fontSize="11" fontWeight="bold" fill="#0f172a">
                {lang === 'zh' ? '夏日长高 15cm' : 'Expands in Sun'}
              </text>
              <line x1="14" y1="70" x2="100" y2="70" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 3" />
              <text x="14" y="90" fontFamily="Fredoka" fontSize="10" fill="#475569">Thermal</text>
              <text x="14" y="105" fontFamily="Fredoka" fontSize="10" fill="#475569">Expansion</text>
              <circle cx="85" cy="115" r="10" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
            </g>
          </svg>

          {/* Bottom-Right Flag Tag */}
          <div className="absolute bottom-2 right-2.5 max-w-[80%] bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm truncate">
            <span className="truncate">🇫🇷 {lang === 'zh' ? '巴黎埃菲尔铁塔' : 'Paris Eiffel Tower'}</span>
          </div>
        </div>
      );

    case 'iceland':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-indigo-950 via-teal-950 to-sky-900`}>
          {/* Top-Left Informational Pill Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] sm:max-w-[70%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span className="shrink-0">🚫 🦟</span>
            <span className="truncate">{lang === 'zh' ? '全岛零蚊子生存繁衍 · 纯净极光' : 'Zero Mosquitoes on Island · Pure Nature!'}</span>
          </div>

          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Northern Lights Aurora Waves */}
            <path d="M0 50 Q150 15 300 65 T600 35" stroke="#34d399" strokeWidth="26" opacity="0.6" fill="none" />
            <path d="M0 75 Q160 40 320 85 T600 55" stroke="#22d3ee" strokeWidth="20" opacity="0.5" fill="none" />

            {/* Glacier Volcano Mountains */}
            <polygon points="60,180 180,90 300,180" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
            <polygon points="260,180 380,80 500,180" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />

            {/* Geothermal Blue Lagoon Pool */}
            <ellipse cx="300" cy="215" rx="220" ry="40" fill="#06b6d4" stroke="#0f172a" strokeWidth="2.5" />
            <path d="M220 185 Q225 165 220 150" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.8" />
            <path d="M300 180 Q305 160 300 145" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.8" />
            <path d="M380 185 Q385 165 380 150" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.8" />

            {/* "NO MOSQUITOES" Shield */}
            <g transform="translate(60, 110)">
              <circle cx="35" cy="35" r="32" fill="#ffffff" stroke="#ef4444" strokeWidth="5" />
              <text x="20" y="42" fontSize="26">🦟</text>
              <line x1="12" y1="14" x2="58" y2="56" stroke="#ef4444" strokeWidth="5" />
            </g>
          </svg>

          {/* Bottom-Right Flag Tag */}
          <div className="absolute bottom-2 right-2.5 max-w-[80%] bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm truncate">
            <span className="truncate">🇮🇸 {lang === 'zh' ? '冰岛蓝湖温泉与极光' : 'Blue Lagoon & Aurora'}</span>
          </div>
        </div>
      );

    case 'egypt':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-amber-200 via-orange-200 to-amber-300`}>
          {/* Top-Left Informational Pill Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] sm:max-w-[70%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span className="shrink-0">🧭</span>
            <span className="truncate">{lang === 'zh' ? '误差不足1/15度 · 惊人对齐正北真方位' : 'Aligned to True Cardinal North (<0.05° Error)'}</span>
          </div>

          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Blazing Sahara Desert Sun */}
            <circle cx="300" cy="55" r="38" fill="#fde047" stroke="#0f172a" strokeWidth="2.5" />

            {/* Desert Dunes */}
            <ellipse cx="300" cy="275" rx="360" ry="75" fill="#d97706" stroke="#0f172a" strokeWidth="2.5" />

            {/* Great Pyramid of Giza (Khufu) */}
            <polygon points="180,215 300,75 420,215" fill="#f59e0b" stroke="#0f172a" strokeWidth="3" />
            <polygon points="300,75 420,215 360,215" fill="#b45309" stroke="#0f172a" strokeWidth="2" />

            {/* Neighboring Pyramids */}
            <polygon points="60,215 140,125 220,215" fill="#f59e0b" stroke="#0f172a" strokeWidth="2" />
            <polygon points="390,215 460,135 530,215" fill="#f59e0b" stroke="#0f172a" strokeWidth="2" />

            {/* Glowing Cardinal North Compass Badge */}
            <g transform="translate(450, 45)">
              <circle cx="45" cy="45" r="38" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
              <polygon points="45,15 52,45 38,45" fill="#ef4444" stroke="#0f172a" strokeWidth="1.5" />
              <polygon points="45,75 52,45 38,45" fill="#3b82f6" stroke="#0f172a" strokeWidth="1.5" />
              <circle cx="45" cy="45" r="5" fill="#eab308" />
              <text x="40" y="12" fontFamily="Fredoka" fontSize="12" fontWeight="bold" fill="#ef4444">N</text>
            </g>
          </svg>

          {/* Bottom-Right Flag Tag */}
          <div className="absolute bottom-2 right-2.5 max-w-[80%] bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm truncate">
            <span className="truncate">🇪🇬 {lang === 'zh' ? '埃及胡夫大金字塔' : 'Great Pyramid of Giza'}</span>
          </div>
        </div>
      );

    case 'brazil':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-sky-200 via-emerald-100 to-teal-300`}>
          {/* Top-Left Informational Pill Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] sm:max-w-[70%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span className="shrink-0">🐬</span>
            <span className="truncate">{lang === 'zh' ? '亚马逊天然野生粉红淡水海豚 (Boto)' : 'Wild Pink River Dolphin (Boto)'}</span>
          </div>

          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Amazon River Waters */}
            <rect x="0" y="165" width="600" height="95" fill="#0d9488" stroke="#0f172a" strokeWidth="2.5" />
            <path d="M0 190 Q150 182 300 190 T600 190" stroke="#2dd4bf" strokeWidth="3.5" fill="none" />

            {/* Rainforest Canopy */}
            <path d="M0 165 Q70 85 150 165 Q225 75 300 165 Q375 75 450 165 Q525 85 600 165 Z" fill="#15803d" stroke="#0f172a" strokeWidth="2.5" />

            {/* Playful Leaping Pink Dolphin */}
            <g transform="translate(190, 80)">
              {/* Leaping Arc Body */}
              <path d="M0 110 Q70 20 160 95 Q115 82 50 108 Z" fill="#f472b6" stroke="#0f172a" strokeWidth="3" />
              {/* Eye & Snout */}
              <circle cx="140" cy="88" r="4" fill="#0f172a" />
              <polygon points="155,90 178,92 158,98" fill="#f472b6" stroke="#0f172a" strokeWidth="2" />
              {/* Dorsal Fin */}
              <path d="M75 55 Q90 75 70 75 Z" fill="#db2777" stroke="#0f172a" strokeWidth="2" />
              {/* Tail Flukes */}
              <polygon points="-5,115 -25,100 -12,125" fill="#f472b6" stroke="#0f172a" strokeWidth="2" />
              <polygon points="-5,115 -25,130 -12,120" fill="#f472b6" stroke="#0f172a" strokeWidth="2" />
              {/* Water Splashes */}
              <circle cx="10" cy="115" r="5" fill="#ffffff" />
              <circle cx="160" cy="115" r="5" fill="#ffffff" />
              <text x="180" y="80" fontSize="20">✨</text>
            </g>
          </svg>

          {/* Bottom-Right Flag Tag */}
          <div className="absolute bottom-2 right-2.5 max-w-[80%] bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm truncate">
            <span className="truncate">🇧🇷 {lang === 'zh' ? '巴西亚马逊流域' : 'Amazon River Basin'}</span>
          </div>
        </div>
      );

    case 'antarctica':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-sky-300 via-sky-100 to-slate-200`}>
          {/* Top-Left Informational Pill Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] sm:max-w-[70%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span className="shrink-0">❄️</span>
            <span className="truncate">{lang === 'zh' ? '地球上最大最干燥的冰雪荒漠' : "World's Coldest & Largest Desert!"}</span>
          </div>

          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Giant Ice Shelf Cliffs */}
            <polygon points="0,170 180,130 380,155 600,135 600,260 0,260" fill="#f1f5f9" stroke="#0f172a" strokeWidth="2.5" />
            <path d="M0 170 L180 130 L380 155 L600 135" stroke="#38bdf8" strokeWidth="7" fill="none" />

            {/* Emperor Penguin Parent & Chick Family */}
            <g transform="translate(250, 100)">
              {/* Parent Penguin */}
              <ellipse cx="45" cy="75" rx="22" ry="42" fill="#0f172a" stroke="#0f172a" strokeWidth="2.5" />
              <ellipse cx="45" cy="80" rx="14" ry="30" fill="#ffffff" />
              {/* Golden Yellow Ear Patch */}
              <ellipse cx="45" cy="50" rx="10" ry="7" fill="#fde047" />
              <polygon points="55,50 72,53 55,56" fill="#ea580c" />

              {/* Cute Fluffy Grey Chick */}
              <ellipse cx="85" cy="98" rx="15" ry="20" fill="#64748b" stroke="#0f172a" strokeWidth="2" />
              <ellipse cx="85" cy="100" rx="9" ry="14" fill="#ffffff" />
              <polygon points="90,95 104,97 90,100" fill="#0f172a" />
            </g>
          </svg>

          {/* Bottom-Right Flag Tag */}
          <div className="absolute bottom-2 right-2.5 max-w-[80%] bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm truncate">
            <span className="truncate">🇦🇶 {lang === 'zh' ? '南极洲极地冰盖与帝企鹅' : 'Antarctica Polar Ice Shelf'}</span>
          </div>
        </div>
      );

    case 'kenya':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-orange-200 via-amber-100 to-yellow-200`}>
          {/* Top-Left Informational Pill Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] sm:max-w-[70%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span className="shrink-0">🦓</span>
            <span className="truncate">{lang === 'zh' ? '150万角马与斑马东非野生大迁徙' : '1.5 Million Wildebeest Great Migration'}</span>
          </div>

          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Blazing Sunset & Mount Kenya */}
            <circle cx="430" cy="70" r="38" fill="#f97316" stroke="#0f172a" strokeWidth="2.5" />
            <polygon points="280,180 400,90 520,180" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2" />
            <polygon points="380,110 400,90 420,110 410,115 390,115" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />

            {/* Acacia Flat-Top Tree */}
            <path d="M110 200 L110 145 L95 110 L80 105 Q110 90 145 105 L135 110 L118 145 L118 200 Z" fill="#451a03" stroke="#0f172a" strokeWidth="2" />
            <ellipse cx="115" cy="100" rx="55" ry="14" fill="#15803d" stroke="#0f172a" strokeWidth="2" />

            {/* Savanna Plains */}
            <rect x="0" y="180" width="600" height="80" fill="#ca8a04" stroke="#0f172a" strokeWidth="2.5" />

            {/* Migrating Wildebeest Herd */}
            <g transform="translate(220, 165)">
              <ellipse cx="30" cy="20" rx="18" ry="12" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
              <circle cx="16" cy="15" r="8" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
              <line x1="20" y1="30" x2="18" y2="42" stroke="#0f172a" strokeWidth="2.5" />
              <line x1="36" y1="30" x2="38" y2="42" stroke="#0f172a" strokeWidth="2.5" />
            </g>
            <g transform="translate(280, 168) scale(0.85)">
              <ellipse cx="30" cy="20" rx="18" ry="12" fill="#334155" stroke="#0f172a" strokeWidth="2" />
              <circle cx="16" cy="15" r="8" fill="#334155" stroke="#0f172a" strokeWidth="2" />
              <line x1="20" y1="30" x2="18" y2="42" stroke="#0f172a" strokeWidth="2.5" />
              <line x1="36" y1="30" x2="38" y2="42" stroke="#0f172a" strokeWidth="2.5" />
            </g>
          </svg>

          {/* Bottom-Right Flag Tag */}
          <div className="absolute bottom-2 right-2.5 max-w-[80%] bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm truncate">
            <span className="truncate">🇰🇪 {lang === 'zh' ? '马赛马拉野生大迁徙' : 'Masai Mara Savanna'}</span>
          </div>
        </div>
      );

    case 'italy':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-sky-200 via-rose-100 to-sky-300`}>
          {/* Top-Left Informational Pill Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] sm:max-w-[70%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span className="shrink-0">🛶</span>
            <span className="truncate">{lang === 'zh' ? '水城威尼斯：118 个小岛 · 完全没有汽车' : 'Venice: 118 Islands & Zero Cars Allowed!'}</span>
          </div>

          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Venetian Palazzos */}
            <rect x="40" y="90" width="110" height="90" fill="#fbcfe8" stroke="#0f172a" strokeWidth="2.5" />
            <rect x="65" y="110" width="20" height="26" rx="10" fill="#0f172a" />
            <rect x="105" y="110" width="20" height="26" rx="10" fill="#0f172a" />

            <rect x="450" y="80" width="110" height="100" fill="#fed7aa" stroke="#0f172a" strokeWidth="2.5" />
            <rect x="485" y="105" width="20" height="26" rx="10" fill="#0f172a" />

            {/* Arched Stone Rialto Bridge */}
            <path d="M150 180 Q300 110 450 180 L450 150 Q300 85 150 150 Z" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2.5" />

            {/* Venice Canal Waters */}
            <rect x="0" y="180" width="600" height="80" fill="#0284c7" stroke="#0f172a" strokeWidth="2.5" />
            <path d="M0 200 Q150 192 300 200 T600 200" stroke="#38bdf8" strokeWidth="3" fill="none" />

            {/* Striped Mooring Pole */}
            <rect x="100" y="145" width="8" height="65" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
            <line x1="100" y1="160" x2="108" y2="160" stroke="#ffffff" strokeWidth="4" />
            <line x1="100" y1="180" x2="108" y2="180" stroke="#ffffff" strokeWidth="4" />

            {/* Gondola Boat with Gondolier */}
            <g transform="translate(250, 200)">
              <path d="M0 12 Q60 36 120 12 Q60 5 0 12 Z" fill="#0f172a" stroke="#0f172a" strokeWidth="2.5" />
              <circle cx="25" cy="-8" r="6" fill="#fde047" stroke="#0f172a" strokeWidth="1.5" />
              <rect x="22" y="-2" width="7" height="15" fill="#ef4444" stroke="#0f172a" strokeWidth="1.5" />
              <line x1="15" y1="-5" x2="45" y2="25" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </svg>

          {/* Bottom-Right Flag Tag */}
          <div className="absolute bottom-2 right-2.5 max-w-[80%] bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm truncate">
            <span className="truncate">🇮🇹 {lang === 'zh' ? '意大利威尼斯水城' : 'Venice Canal Bridges'}</span>
          </div>
        </div>
      );

    case 'mexico':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-sky-200 via-amber-100 to-emerald-200`}>
          {/* Top-Left Informational Pill Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] sm:max-w-[70%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span className="shrink-0">🦜 👏</span>
            <span className="truncate">{lang === 'zh' ? '击掌回音宛如神鸟啼鸣 · 奇琴伊察玛雅塔' : 'Clap Echoes Like Quetzal Bird Chirp!'}</span>
          </div>

          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Chichen Itza Stepped Pyramid El Castillo */}
            <rect x="180" y="190" width="240" height="20" fill="#d97706" stroke="#0f172a" strokeWidth="2.5" />
            <rect x="200" y="170" width="200" height="20" fill="#d97706" stroke="#0f172a" strokeWidth="2.5" />
            <rect x="220" y="150" width="160" height="20" fill="#d97706" stroke="#0f172a" strokeWidth="2.5" />
            <rect x="240" y="130" width="120" height="20" fill="#d97706" stroke="#0f172a" strokeWidth="2.5" />
            <rect x="270" y="110" width="60" height="20" rx="2" fill="#b45309" stroke="#0f172a" strokeWidth="2.5" />
            <polygon points="292,210 300,110 308,110 316,210" fill="#fef3c7" stroke="#0f172a" strokeWidth="2" />

            {/* Sacred Resplendent Quetzal Bird in Flight */}
            <g transform="translate(90, 60)">
              <ellipse cx="25" cy="22" rx="18" ry="11" fill="#16a34a" stroke="#0f172a" strokeWidth="2" />
              <polygon points="42,22 58,23 42,27" fill="#ea580c" />
              <path d="M8 22 Q-12 30 -30 65" stroke="#15803d" strokeWidth="4" fill="none" />
              <path d="M8 25 Q-18 40 -38 75" stroke="#22c55e" strokeWidth="3" fill="none" />
              <text x="65" y="20" fontSize="16">🎶</text>
            </g>
          </svg>

          {/* Bottom-Right Flag Tag */}
          <div className="absolute bottom-2 right-2.5 max-w-[80%] bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm truncate">
            <span className="truncate">🇲🇽 {lang === 'zh' ? '奇琴伊察玛雅神庙' : 'Mayan El Castillo'}</span>
          </div>
        </div>
      );

    case 'peru':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-sky-300 via-teal-100 to-emerald-200`}>
          {/* Top-Left Informational Pill Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] sm:max-w-[70%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span className="shrink-0">🧱</span>
            <span className="truncate">{lang === 'zh' ? '无浆精密切削 · 连纸片都插不进' : 'Zero-Mortar Precision Earthquake Locks'}</span>
          </div>

          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Andes Peak Huayna Picchu */}
            <polygon points="190,200 300,50 410,200" fill="#047857" stroke="#0f172a" strokeWidth="2.5" />
            <polygon points="70,200 170,100 270,200" fill="#065f46" stroke="#0f172a" strokeWidth="2" />
            <polygon points="360,200 460,95 560,200" fill="#065f46" stroke="#0f172a" strokeWidth="2" />

            {/* Stepped Terraces */}
            <rect x="130" y="165" width="340" height="20" fill="#94a3b8" stroke="#0f172a" strokeWidth="2" />
            <rect x="160" y="185" width="280" height="20" fill="#64748b" stroke="#0f172a" strokeWidth="2" />

            {/* Fluffy Cute Andean Llama Character */}
            <g transform="translate(100, 110)">
              <rect x="25" y="45" width="30" height="30" rx="8" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
              <rect x="42" y="15" width="12" height="35" rx="5" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
              <ellipse cx="48" cy="15" rx="10" ry="7" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
              <circle cx="53" cy="14" r="2.5" fill="#0f172a" />
              <rect x="28" y="75" width="6" height="20" rx="2" fill="#cbd5e1" stroke="#0f172a" strokeWidth="1.5" />
              <rect x="46" y="75" width="6" height="20" rx="2" fill="#cbd5e1" stroke="#0f172a" strokeWidth="1.5" />
              <text x="60" y="30" fontSize="14">🦙</text>
            </g>
          </svg>

          {/* Bottom-Right Flag Tag */}
          <div className="absolute bottom-2 right-2.5 max-w-[80%] bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm truncate">
            <span className="truncate">🇵🇪 {lang === 'zh' ? '马丘比丘石堡与羊驼' : 'Machu Picchu Citadel'}</span>
          </div>
        </div>
      );

    case 'india':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-orange-200 via-amber-100 to-emerald-200`}>
          {/* Top-Left Informational Pill Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] sm:max-w-[70%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span className="shrink-0">🔢 ♞</span>
            <span className="truncate">{lang === 'zh' ? '数字“0”的发明与国际象棋摇篮' : 'Birthplace of Zero (0) & Chess!'}</span>
          </div>

          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Saffron Sky Sun */}
            <circle cx="300" cy="65" r="35" fill="#ea580c" stroke="#0f172a" strokeWidth="2.5" />

            {/* Palace Dome Architecture */}
            <path d="M245 190 L245 125 Q300 70 355 125 L355 190 Z" fill="#fed7aa" stroke="#0f172a" strokeWidth="2.5" />
            <polygon points="295,75 300,55 305,75" fill="#b45309" stroke="#0f172a" strokeWidth="2" />

            {/* Golden Numeral "0" (Zero) Breakthrough Monument */}
            <g transform="translate(120, 95)">
              <rect x="0" y="0" width="85" height="85" rx="20" fill="#fef08a" stroke="#0f172a" strokeWidth="3" />
              <text x="26" y="62" fontFamily="Fredoka" fontSize="56" fontWeight="bold" fill="#0f172a">0</text>
              <text x="12" y="77" fontFamily="Fredoka" fontSize="9" fontWeight="bold" fill="#b45309">INVENTED ZERO</text>
              <text x="65" y="25" fontSize="18">✨</text>
            </g>

            {/* Chess Knight / Chaturanga Board */}
            <g transform="translate(390, 100)">
              <rect x="0" y="0" width="75" height="80" rx="16" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
              <text x="18" y="58" fontSize="46">♞</text>
              <text x="16" y="74" fontFamily="Fredoka" fontSize="9" fontWeight="bold" fill="#0f172a">
                {lang === 'zh' ? 'CHESS 国际象棋' : 'CHESS ORIGIN'}
              </text>
            </g>
          </svg>

          {/* Bottom-Right Flag Tag */}
          <div className="absolute bottom-2 right-2.5 max-w-[80%] bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm truncate">
            <span className="truncate">🇮🇳 {lang === 'zh' ? '古印度学者婆罗摩笈多' : 'Ancient Indian Scholars'}</span>
          </div>
        </div>
      );

    case 'united-states':
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-sky-300 via-amber-100 to-emerald-200`}>
          {/* Top-Left Informational Pill Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%] sm:max-w-[70%] bg-white/95 border-2 border-slate-900 px-2.5 py-1 rounded-xl comic-box-sm font-comic text-[10px] sm:text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm truncate">
            <span className="shrink-0">🌋</span>
            <span className="truncate">{lang === 'zh' ? '黄石：世界首座国家公园 (1872) · 老忠实泉' : "Yellowstone: World's 1st National Park"}</span>
          </div>

          <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet">
            {/* Pine Forest Borders */}
            <polygon points="60,200 95,120 130,200" fill="#15803d" stroke="#0f172a" strokeWidth="2" />
            <polygon points="105,200 140,130 175,200" fill="#166534" stroke="#0f172a" strokeWidth="2" />
            <polygon points="425,200 460,120 495,200" fill="#15803d" stroke="#0f172a" strokeWidth="2" />
            <polygon points="470,200 505,130 540,200" fill="#166534" stroke="#0f172a" strokeWidth="2" />

            {/* Rainbow Grand Prismatic Spring */}
            <ellipse cx="300" cy="205" rx="180" ry="42" fill="#0284c7" stroke="#0f172a" strokeWidth="2.5" />
            <ellipse cx="300" cy="205" rx="140" ry="32" fill="#22d3ee" />
            <ellipse cx="300" cy="205" rx="95" ry="22" fill="#fde047" />

            {/* Old Faithful Geyser Eruption Plume */}
            <path d="M290 200 Q270 110 282 40 Q300 20 318 40 Q330 110 310 200 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" opacity="0.95" />
            <path d="M295 190 Q285 120 294 55 Q300 45 306 55 Q315 120 305 190 Z" fill="#e0f2fe" />
          </svg>

          {/* Bottom-Right Flag Tag */}
          <div className="absolute bottom-2 right-2.5 max-w-[80%] bg-white/95 border border-slate-900 px-2 py-0.5 rounded-xl comic-box-sm font-comic text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-sm truncate">
            <span className="truncate">🇺🇸 {lang === 'zh' ? '黄石老忠实地热泉' : 'Yellowstone Old Faithful'}</span>
          </div>
        </div>
      );

    default:
      return (
        <div className={`${containerClasses} bg-gradient-to-b from-sky-200 via-amber-100 to-emerald-200 flex items-center justify-center`}>
          <div className="text-center p-4">
            <span className="text-5xl block mb-2 filter drop-shadow">🏛️</span>
            <span className="font-comic text-base font-bold text-slate-900 bg-white/90 px-3 py-1 rounded-xl comic-box-sm inline-block">
              {name}
            </span>
          </div>
        </div>
      );
  }
};

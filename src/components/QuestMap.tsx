import React, { useState } from 'react';
import { Star, Play } from 'lucide-react';
import { WeekTopic } from '../data/mathData';
import { playClickSound } from '../utils/audio';
import { I18N, Language } from '../utils/i18n';

interface QuestMapProps {
  weeks: WeekTopic[];
  completedWeeks: Record<number, boolean>;
  weekStars: Record<number, number>;
  onSelectWeek: (week: WeekTopic) => void;
  lang: Language;
  soundEnabled: boolean;
}

const SEASONS = [
  { id: 'all', nameEn: 'All (40)', nameFr: 'Tout (40)', nameZh: '全部 (40)', icon: '🗺️' },
  { id: 'Autumn Harbor', nameEn: 'Fall 1–10', nameFr: 'Automne 1–10', nameZh: '秋季 1–10', icon: '🍂' },
  { id: 'Winter Glacier', nameEn: 'Winter 11–20', nameFr: 'Hiver 11–20', nameZh: '冬季 11–20', icon: '❄️' },
  { id: 'Spring Expedition', nameEn: 'Spring 21–30', nameFr: 'Printemps 21–30', nameZh: '春季 21–30', icon: '🌱' },
  { id: 'Summer Lighthouse', nameEn: 'Summer 31–40', nameFr: 'Été 31–40', nameZh: '夏季 31–40', icon: '☀️' },
];

const getStrandInfo = (strandKey: string, lang: Language) => {
  switch (strandKey) {
    case 'number':
      return { icon: '🔢', name: lang === 'fr' ? 'Nombres' : lang === 'zh' ? '数感' : 'Number', badge: 'bg-blue-50 text-blue-700 border-blue-200' };
    case 'geometry':
      return { icon: '📐', name: lang === 'fr' ? 'Géométrie' : lang === 'zh' ? '几何' : 'Shapes', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    case 'operations':
      return { icon: '✖️', name: lang === 'fr' ? 'Calcul' : lang === 'zh' ? '乘除' : 'Multiply', badge: 'bg-amber-50 text-amber-700 border-amber-200' };
    case 'fractions':
      return { icon: '🍕', name: lang === 'fr' ? 'Fractions' : lang === 'zh' ? '分数' : 'Fractions', badge: 'bg-purple-50 text-purple-700 border-purple-200' };
    case 'algebra':
      return { icon: '⚖️', name: lang === 'fr' ? 'Algèbre' : lang === 'zh' ? '代数' : 'Algebra', badge: 'bg-orange-50 text-orange-700 border-orange-200' };
    case 'measurement':
      return { icon: '📏', name: lang === 'fr' ? 'Mesure' : lang === 'zh' ? '测量' : 'Measure', badge: 'bg-teal-50 text-teal-700 border-teal-200' };
    case 'data':
      return { icon: '📊', name: lang === 'fr' ? 'Données' : lang === 'zh' ? '数据' : 'Data', badge: 'bg-pink-50 text-pink-700 border-pink-200' };
    case 'coding':
      return { icon: '💻', name: lang === 'fr' ? 'Codage' : lang === 'zh' ? '编程' : 'Coding', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
    case 'financial':
      return { icon: '💰', name: lang === 'fr' ? 'Argent' : lang === 'zh' ? '货币' : 'Money', badge: 'bg-green-50 text-green-700 border-green-200' };
    default:
      return { icon: '⚓', name: lang === 'fr' ? 'Maths' : lang === 'zh' ? '数学' : 'Math', badge: 'bg-slate-50 text-slate-700 border-slate-200' };
  }
};

export const QuestMap: React.FC<QuestMapProps> = ({
  weeks,
  completedWeeks,
  weekStars,
  onSelectWeek,
  lang,
  soundEnabled,
}) => {
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const t = I18N[lang].questMap;

  const filteredWeeks = weeks.filter(w => {
    return selectedSeason === 'all' || w.season === selectedSeason;
  });

  const totalStars = Object.values(weekStars).reduce((a, b) => a + b, 0);
  const clearedCount = Object.keys(completedWeeks).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-5">
      {/* Sleek, Kid-Friendly Minimal Header */}
      <div className="bg-white comic-box rounded-2xl p-4 md:p-5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-2xl bg-amber-400 border-2 border-slate-900 flex items-center justify-center text-2xl comic-box-sm shrink-0 shadow-xs">
            ⚓
          </span>
          <div>
            <h1 className="font-comic text-xl md:text-2xl font-extrabold text-slate-900 leading-tight">
              {t.title}
            </h1>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Quick Star & Clear Stats */}
        <div className="flex items-center gap-3 bg-amber-50/80 border-2 border-slate-900 rounded-xl px-3.5 py-1.5 shrink-0 comic-box-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">⭐</span>
            <span className="font-comic text-base font-extrabold text-amber-950">
              {totalStars}
            </span>
          </div>
          <div className="w-[1px] h-5 bg-amber-300" />
          <div className="flex items-center gap-1.5">
            <span className="text-lg">🏆</span>
            <span className="font-comic text-base font-extrabold text-slate-900">
              {clearedCount} <span className="text-xs font-bold text-slate-500">/ 40</span>
            </span>
          </div>
        </div>
      </div>

      {/* Clean Kid-Friendly Season Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-6 no-scrollbar">
        {SEASONS.map(s => {
          const isSelected = selectedSeason === s.id;
          const label = lang === 'fr' ? s.nameFr : lang === 'zh' ? s.nameZh : s.nameEn;
          return (
            <button
              key={s.id}
              onClick={() => {
                if (soundEnabled) playClickSound();
                setSelectedSeason(s.id);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-comic font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-amber-300 text-slate-950 border-2 border-slate-900 shadow-comic font-extrabold -translate-y-0.5'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-slate-950'
              }`}
            >
              <span>{s.icon}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Clean, Spacious 40-Week Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredWeeks.map((weekItem) => {
          const isDone = completedWeeks[weekItem.week];
          const starsEarned = weekStars[weekItem.week] || 0;
          const strand = getStrandInfo(weekItem.strandKey, lang);
          const title = lang === 'fr' ? weekItem.titleFr || weekItem.titleEn : lang === 'zh' ? weekItem.titleZh : weekItem.titleEn;
          const weekLabel = lang === 'fr' ? `Sem. ${weekItem.week}` : lang === 'zh' ? `第 ${weekItem.week} 周` : `Week ${weekItem.week}`;

          return (
            <div
              key={weekItem.week}
              onClick={() => {
                if (soundEnabled) playClickSound();
                onSelectWeek(weekItem);
              }}
              className={`comic-box rounded-2xl p-4 flex flex-col justify-between transition-all bg-white hover:-translate-y-1 hover:shadow-lg cursor-pointer select-none group ${
                isDone ? 'border-emerald-600 bg-gradient-to-b from-white to-emerald-50/30' : ''
              }`}
            >
              <div>
                {/* Clean Top: Week Tag & Mini Strand Badge */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="font-comic text-xs font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
                    {weekLabel}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border flex items-center gap-1 ${strand.badge}`}>
                    <span>{strand.icon}</span>
                    <span>{strand.name}</span>
                  </span>
                </div>

                {/* Crisp Kid-Friendly Title */}
                <h3 className="font-comic text-base font-extrabold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors mb-3">
                  {title}
                </h3>
              </div>

              {/* Bottom: Visual Star Rating & Action Button */}
              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                {/* Visual Stars */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map(starNum => {
                    const isEarned = isDone && starsEarned >= starNum;
                    return (
                      <Star
                        key={starNum}
                        size={16}
                        className={
                          isEarned
                            ? 'text-amber-400 fill-amber-400 drop-shadow-xs'
                            : 'text-slate-200 fill-slate-100'
                        }
                      />
                    );
                  })}
                </div>

                {/* Big Fun Action Button */}
                <div
                  className={`comic-btn px-3 py-1.5 rounded-xl text-xs font-comic font-extrabold flex items-center gap-1 transition-all ${
                    isDone
                      ? 'bg-slate-100 group-hover:bg-slate-200 text-slate-700'
                      : 'bg-amber-400 group-hover:bg-amber-300 text-slate-950 shadow-xs'
                  }`}
                >
                  <Play size={11} fill="currentColor" />
                  <span>{isDone ? t.review : t.play}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Compass, Star, MapPin, Award, CheckCircle, Play, Sparkles, Filter } from 'lucide-react';
import { WeekTopic } from '../data/mathData';
import { playClickSound } from '../utils/audio';

interface QuestMapProps {
  weeks: WeekTopic[];
  completedWeeks: Record<number, boolean>;
  weekStars: Record<number, number>;
  onSelectWeek: (week: WeekTopic) => void;
  lang: 'en' | 'zh';
  soundEnabled: boolean;
}

const SEASONS = [
  { id: 'all', nameEn: 'Full 40 Weeks', nameZh: '全年40周全览', icon: '🗺️' },
  { id: 'Autumn Harbor', nameEn: 'Autumn Harbor (W1–10)', nameZh: '秋季起航港湾 (W1–10)', icon: '🍂' },
  { id: 'Winter Glacier', nameEn: 'Winter Glacier (W11–20)', nameZh: '冬季冰川探险 (W11–20)', icon: '❄️' },
  { id: 'Spring Expedition', nameEn: 'Spring Expedition (W21–30)', nameZh: '春季百花巡航 (W21–30)', icon: '🌱' },
  { id: 'Summer Lighthouse', nameEn: 'Summer Lighthouse (W31–40)', nameZh: '夏季灯塔大阅兵 (W31–40)', icon: '☀️' },
];

export const QuestMap: React.FC<QuestMapProps> = ({
  weeks,
  completedWeeks,
  weekStars,
  onSelectWeek,
  lang,
  soundEnabled,
}) => {
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [selectedStrand, setSelectedStrand] = useState<string>('all');

  const filteredWeeks = weeks.filter(w => {
    const matchSeason = selectedSeason === 'all' || w.season === selectedSeason;
    const matchStrand = selectedStrand === 'all' || w.strandKey === selectedStrand;
    return matchSeason && matchStrand;
  });

  const getStrandBadge = (strandKey: string) => {
    switch (strandKey) {
      case 'number':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'geometry':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'operations':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'fractions':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'algebra':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'measurement':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      case 'data':
        return 'bg-pink-100 text-pink-800 border-pink-300';
      case 'coding':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'financial':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Expedition Header Banner */}
      <div className="bg-white comic-box-lg rounded-3xl p-6 md:p-8 mb-8 bg-halftone-blue relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg comic-box-sm">
                ⚓
              </span>
              <span className="font-comic text-xs font-bold uppercase tracking-wider text-blue-700">
                Waterloo Region District School Board · Grade 4
              </span>
              <span className="text-[11px] font-comic font-bold text-amber-900 bg-amber-200/90 border border-amber-400 px-2.5 py-0.5 rounded-full shadow-xs">
                ❤️ {lang === 'zh' ? '创作者：Yang & Melody' : 'Created by Yang & Melody'}
              </span>
            </div>
            <h1 className="font-comic text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-2">
              {lang === 'zh'
                ? '米伦伍兹水手数学航海总图'
                : 'Millen Woods Mariners 40-Week Math Map'}
            </h1>
            <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed mb-3">
              {lang === 'zh'
                ? '从秋季开学数感到夏季毕业大闯关，40 周每周 5 题夺宝循环，集结滑铁卢轻轨、月桂溪、圣雅各布斯地标！'
                : 'Journey through 40 weekly expeditions across Waterloo! Round numbers with the ION LRT, explore geometry at Perimeter Institute, and unlock treasure chests!'}
            </p>
            {/* 4 Difficulty Tiers & Dynamic Variants Feature Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-comic font-bold px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300">
                🟢 {lang === 'zh' ? 'Easy 基础稳固' : 'Easy Foundation'}
              </span>
              <span className="text-[11px] font-comic font-bold px-2 py-0.5 rounded-lg bg-amber-100 text-amber-800 border border-amber-300">
                🟡 {lang === 'zh' ? 'Medium 核心进阶' : 'Medium Progress'}
              </span>
              <span className="text-[11px] font-comic font-bold px-2 py-0.5 rounded-lg bg-rose-100 text-rose-800 border border-rose-300">
                🔴 {lang === 'zh' ? 'Hard 高难挑战' : 'Hard Challenge'}
              </span>
              <span className="text-[11px] font-comic font-bold px-2 py-0.5 rounded-lg bg-purple-100 text-purple-900 border border-purple-400">
                👑 {lang === 'zh' ? 'Olympiad 终极奥数' : 'Olympiad Master Mind'}
              </span>
              <span className="text-[11px] font-comic font-bold px-2 py-0.5 rounded-lg bg-blue-100 text-blue-900 border border-blue-300">
                🔄 {lang === 'zh' ? '动态变式题' : 'Dynamic Variations'}
              </span>
            </div>
          </div>

          {/* Quick Stats Pill Panel */}
          <div className="flex items-center gap-4 bg-white/90 comic-box rounded-2xl p-4 shrink-0 shadow-comic">
            <div className="text-center px-2">
              <div className="font-comic text-2xl font-bold text-amber-500 flex items-center justify-center gap-1">
                <Star size={20} fill="#f59e0b" />
                <span>{Object.values(weekStars).reduce((a, b) => a + b, 0)}</span>
              </div>
              <div className="text-[11px] font-semibold text-slate-500">
                {lang === 'zh' ? '总收集星星' : 'Total Stars'}
              </div>
            </div>
            <div className="w-[1px] h-10 bg-slate-200" />
            <div className="text-center px-2">
              <div className="font-comic text-2xl font-bold text-blue-600">
                {Object.keys(completedWeeks).length} / 40
              </div>
              <div className="text-[11px] font-semibold text-slate-500">
                {lang === 'zh' ? '已通关周数' : 'Weeks Clear'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Expedition Controls */}
      <div className="bg-white comic-box rounded-2xl p-4 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Season Segmented Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-300 w-full md:w-auto">
            {SEASONS.map(s => (
              <button
                key={s.id}
                onClick={() => {
                  if (soundEnabled) playClickSound();
                  setSelectedSeason(s.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-comic font-bold transition-all ${
                  selectedSeason === s.id
                    ? 'bg-amber-300 text-slate-900 border-2 border-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{s.icon} </span>
                <span>{lang === 'zh' ? s.nameZh : s.nameEn}</span>
              </button>
            ))}
          </div>

          {/* Strand Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <Filter size={14} className="text-slate-400" />
            <select
              value={selectedStrand}
              onChange={e => setSelectedStrand(e.target.value)}
              className="bg-slate-50 border-2 border-slate-900 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none"
            >
              <option value="all">{lang === 'zh' ? '全部数学分支 (All Strands)' : 'All Math Strands'}</option>
              <option value="number">{lang === 'zh' ? '数感与位值 (Number Sense)' : 'Number Sense'}</option>
              <option value="geometry">{lang === 'zh' ? '几何与空间推理 (Geometry)' : 'Geometry'}</option>
              <option value="operations">{lang === 'zh' ? '四则运算与乘除 (Operations)' : 'Operations'}</option>
              <option value="fractions">{lang === 'zh' ? '分数与小数 (Fractions & Decimals)' : 'Fractions & Decimals'}</option>
              <option value="algebra">{lang === 'zh' ? '数列与代数方程 (Algebra & Patterns)' : 'Algebra & Patterns'}</option>
              <option value="measurement">{lang === 'zh' ? '测量、周长与时间 (Measurement)' : 'Measurement'}</option>
              <option value="data">{lang === 'zh' ? '数据与概率统计 (Data & Probability)' : 'Data & Probability'}</option>
              <option value="coding">{lang === 'zh' ? '编程与坐标网格 (Coding & Location)' : 'Coding & Movement'}</option>
              <option value="financial">{lang === 'zh' ? '财商与消费找零 (Financial Literacy)' : 'Financial Literacy'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* 40-Week Adventure Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredWeeks.map((weekItem, idx) => {
          const isDone = completedWeeks[weekItem.week];
          const starsEarned = weekStars[weekItem.week] || 0;

          return (
            <div
              key={weekItem.week}
              className={`comic-box rounded-2xl p-4 flex flex-col justify-between transition-all bg-white hover:-translate-y-1 ${
                isDone ? 'border-emerald-600 bg-emerald-50/30' : ''
              }`}
            >
              <div>
                {/* Card Top: Week Tag & Landmark */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-comic text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                    Week {weekItem.week}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getStrandBadge(weekItem.strandKey)}`}>
                    {lang === 'zh' ? weekItem.strandZh : weekItem.strandEn}
                  </span>
                </div>

                {/* Week Title */}
                <h3 className="font-comic text-base font-bold text-slate-900 leading-snug mb-1">
                  {lang === 'zh' ? weekItem.titleZh : weekItem.titleEn}
                </h3>

                {/* Local Landmark */}
                <div className="flex items-center gap-1 text-xs text-slate-500 font-medium mb-3">
                  <MapPin size={12} className="text-rose-500 shrink-0" />
                  <span className="truncate">
                    {lang === 'zh' ? weekItem.landmarkZh : weekItem.landmark}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {lang === 'zh' ? weekItem.descriptionZh : weekItem.descriptionEn}
                </p>
              </div>

              {/* Card Bottom: Status & Action Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {isDone ? (
                    <div className="flex items-center gap-1 text-emerald-600 font-comic text-xs font-bold">
                      <CheckCircle size={15} />
                      <span>{lang === 'zh' ? '已通关' : 'Cleared'}</span>
                      <span className="text-amber-500 ml-1">⭐ {starsEarned}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">
                      5 {lang === 'zh' ? '道探险题' : 'Questions'}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => {
                    if (soundEnabled) playClickSound();
                    onSelectWeek(weekItem);
                  }}
                  className={`comic-btn px-3 py-1.5 rounded-xl text-xs font-comic font-bold flex items-center gap-1 transition-all ${
                    isDone
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-900'
                  }`}
                >
                  <Play size={12} fill="currentColor" />
                  <span>{isDone ? (lang === 'zh' ? '复习' : 'Replay') : (lang === 'zh' ? '启航' : 'Sail')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

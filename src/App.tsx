import React, { useState, useEffect } from 'react';
import { Compass, Globe, Star, Volume2, VolumeX, Pencil, Award, BookOpen, RefreshCw, Trophy, Sparkles, Share2 } from 'lucide-react';
import { getAllWeeks, WeekTopic } from './data/mathData';
import { WORLD_COUNTRIES } from './data/worldData';
import { QuestMap } from './components/QuestMap';
import { QuestionRunner } from './components/QuestionRunner';
import { WorldExplorer } from './components/WorldExplorer';
import { Scratchpad } from './components/Scratchpad';
import { ShareModal } from './components/ShareModal';
import { MarinerAiBuddy } from './components/MarinerAiBuddy';
import { MarinerTrophy3D } from './components/MarinerTrophy3D';
import { playClickSound } from './utils/audio';

type ActiveView = 'map' | 'runner' | 'world' | 'badges' | 'about';

export default function App() {
  const allWeeks = React.useMemo(() => getAllWeeks(), []);

  // Persistent user state
  const [lang, setLang] = useState<'en' | 'zh'>(() => {
    return (localStorage.getItem('mariner_lang') as 'en' | 'zh') || 'en';
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('mariner_sound');
    return saved !== null ? saved === 'true' : true;
  });

  const [completedWeeks, setCompletedWeeks] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('mariner_completed_weeks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [weekStars, setWeekStars] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('mariner_week_stars');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mariner_badges');
      return saved ? JSON.parse(saved) : ['canada']; // Canada unlocked by default as home base!
    } catch {
      return ['canada'];
    }
  });

  const [activeView, setActiveView] = useState<ActiveView>('map');
  const [selectedWeek, setSelectedWeek] = useState<WeekTopic | null>(null);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('mariner_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('mariner_sound', String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('mariner_completed_weeks', JSON.stringify(completedWeeks));
  }, [completedWeeks]);

  useEffect(() => {
    localStorage.setItem('mariner_week_stars', JSON.stringify(weekStars));
  }, [weekStars]);

  useEffect(() => {
    localStorage.setItem('mariner_badges', JSON.stringify(unlockedBadges));
  }, [unlockedBadges]);

  const totalStars = Object.values(weekStars).reduce((acc, curr) => acc + curr, 0) + (unlockedBadges.length * 2);

  // Rank determination
  const getRank = () => {
    if (totalStars >= 100) return { titleEn: 'Grand Fleet Admiral', titleZh: '特级荣誉舰队司令', icon: '👑' };
    if (totalStars >= 60) return { titleEn: 'Master Captain', titleZh: '资深水手船长', icon: '⚓' };
    if (totalStars >= 30) return { titleEn: 'Star Navigator', titleZh: '星际领航员', icon: '🧭' };
    if (totalStars >= 10) return { titleEn: 'First Mate Sailor', titleZh: '精英领航大副', icon: '⛵' };
    return { titleEn: 'Apprentice Mariner', titleZh: '见习水手小先锋', icon: '🐣' };
  };

  const handleSelectWeek = (week: WeekTopic) => {
    setSelectedWeek(week);
    setActiveView('runner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishStage = (starsEarned: number, weekNumber: number) => {
    setCompletedWeeks(prev => ({ ...prev, [weekNumber]: true }));
    setWeekStars(prev => ({
      ...prev,
      [weekNumber]: Math.max(prev[weekNumber] || 0, starsEarned),
    }));
    setActiveView('map');
  };

  const handleUnlockBadge = (badgeId: string) => {
    if (!unlockedBadges.includes(badgeId)) {
      setUnlockedBadges(prev => [...prev, badgeId]);
    }
  };

  const toggleLanguage = () => {
    if (soundEnabled) playClickSound();
    setLang(l => (l === 'en' ? 'zh' : 'en'));
  };

  const toggleSound = () => {
    setSoundEnabled(s => !s);
  };

  return (
    <div className="min-h-screen bg-halftone flex flex-col selection:bg-amber-300 selection:text-slate-900">
      {/* Top Bar following Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-900 px-4 md:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark & Authors */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setActiveView('map');
            }}
            className="flex items-center gap-2 text-left group shrink-0"
          >
            <span className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-comic font-bold text-lg comic-box-sm group-hover:rotate-6 transition-transform">
              ⚓
            </span>
            <span className="font-comic text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap">
              Millen Woods Mariners
            </span>
          </button>
          <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-100 border-2 border-slate-900 font-comic text-xs font-bold text-slate-900 comic-box-sm shadow-sm">
            <span>👨‍👩‍👧</span>
            <span>By Yang &amp; Melody</span>
          </span>
        </div>

        {/* Zone 2: 4 Navigation Links (Single-line text) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-comic font-bold text-slate-600">
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setActiveView('map');
            }}
            className={`whitespace-nowrap transition-colors hover:text-blue-600 ${
              activeView === 'map' || activeView === 'runner'
                ? 'text-blue-600 underline underline-offset-8 decoration-2 decoration-amber-400'
                : ''
            }`}
          >
            {lang === 'zh' ? '航海地图' : 'Math Map'}
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setActiveView('world');
            }}
            className={`whitespace-nowrap transition-colors hover:text-blue-600 ${
              activeView === 'world'
                ? 'text-blue-600 underline underline-offset-8 decoration-2 decoration-amber-400'
                : ''
            }`}
          >
            {lang === 'zh' ? '世界探索' : 'World Explorer'}
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setActiveView('badges');
            }}
            className={`whitespace-nowrap transition-colors hover:text-blue-600 ${
              activeView === 'badges'
                ? 'text-blue-600 underline underline-offset-8 decoration-2 decoration-amber-400'
                : ''
            }`}
          >
            {lang === 'zh' ? '勋章金库' : 'Badge Vault'}
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setActiveView('about');
            }}
            className={`whitespace-nowrap transition-colors hover:text-blue-600 ${
              activeView === 'about'
                ? 'text-blue-600 underline underline-offset-8 decoration-2 decoration-amber-400'
                : ''
            }`}
          >
            {lang === 'zh' ? '大纲解析' : 'WRDSB Curriculum'}
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Language, Audio, Stars Pill & Scratchpad) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Total Stars Pill */}
          <div className="hidden sm:flex items-center gap-1.5 bg-amber-100 border-2 border-slate-900 px-3 py-1 rounded-xl font-comic text-xs font-bold text-amber-950 shadow-sm">
            <span>⭐</span>
            <span>{totalStars}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`comic-btn p-2 rounded-xl text-xs font-bold ${
              soundEnabled ? 'bg-amber-100 text-slate-800' : 'bg-slate-100 text-slate-400'
            }`}
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Bilingual EN / ZH Toggle */}
          <button
            onClick={toggleLanguage}
            className="comic-btn px-2.5 py-1.5 bg-amber-300 hover:bg-amber-400 text-slate-900 font-comic text-xs font-bold rounded-xl flex items-center gap-1.5"
            title={lang === 'en' ? 'Switch to Chinese / 切换为中文' : 'Switch to English / 切换为英文'}
          >
            <Globe size={14} />
            <span className="flex items-center gap-1">
              <span className={lang === 'en' ? 'font-extrabold text-blue-900 underline' : 'opacity-60'}>EN</span>
              <span className="opacity-40">/</span>
              <span className={lang === 'zh' ? 'font-extrabold text-blue-900 underline' : 'opacity-60'}>中文</span>
            </span>
          </button>

          {/* Share Link Button */}
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setIsShareModalOpen(true);
            }}
            className="comic-btn px-3 py-1.5 bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-comic text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-comic"
            title="Share this App"
          >
            <Share2 size={14} />
            <span>{lang === 'zh' ? '分享' : 'Share'}</span>
          </button>

          {/* Scratchpad Quick Button */}
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setIsScratchpadOpen(s => !s);
            }}
            className="comic-btn px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-comic text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-comic"
            title="Open digital scratchpad"
          >
            <Pencil size={14} />
            <span className="hidden sm:inline">{lang === 'zh' ? '草稿板' : 'Scratchpad'}</span>
          </button>
        </div>
      </header>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around bg-white border-b-2 border-slate-900 px-2 py-2 text-xs font-comic font-bold text-slate-700">
        <button
          onClick={() => setActiveView('map')}
          className={`px-2 py-1 rounded-lg ${activeView === 'map' ? 'bg-amber-300 text-slate-900' : ''}`}
        >
          {lang === 'zh' ? '航海地图' : 'Math Map'}
        </button>
        <button
          onClick={() => setActiveView('world')}
          className={`px-2 py-1 rounded-lg ${activeView === 'world' ? 'bg-amber-300 text-slate-900' : ''}`}
        >
          {lang === 'zh' ? '世界探索' : 'World'}
        </button>
        <button
          onClick={() => setActiveView('badges')}
          className={`px-2 py-1 rounded-lg ${activeView === 'badges' ? 'bg-amber-300 text-slate-900' : ''}`}
        >
          {lang === 'zh' ? '勋章金库' : 'Badges'}
        </button>
        <button
          onClick={() => setActiveView('about')}
          className={`px-2 py-1 rounded-lg ${activeView === 'about' ? 'bg-amber-300 text-slate-900' : ''}`}
        >
          {lang === 'zh' ? '大纲' : 'Curriculum'}
        </button>
        <button
          onClick={() => {
            if (soundEnabled) playClickSound();
            setIsShareModalOpen(true);
          }}
          className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold"
        >
          {lang === 'zh' ? '分享' : 'Share'}
        </button>
      </div>

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'map' && (
          <QuestMap
            weeks={allWeeks}
            completedWeeks={completedWeeks}
            weekStars={weekStars}
            onSelectWeek={handleSelectWeek}
            lang={lang}
            soundEnabled={soundEnabled}
          />
        )}

        {activeView === 'runner' && selectedWeek && (
          <QuestionRunner
            topic={selectedWeek}
            lang={lang}
            soundEnabled={soundEnabled}
            onFinishStage={handleFinishStage}
            onBackToMap={() => setActiveView('map')}
            onOpenScratchpad={() => setIsScratchpadOpen(true)}
          />
        )}

        {activeView === 'world' && (
          <WorldExplorer
            lang={lang}
            soundEnabled={soundEnabled}
            unlockedBadges={unlockedBadges}
            onUnlockBadge={handleUnlockBadge}
          />
        )}

        {/* Badge Vault View */}
        {activeView === 'badges' && (
          <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in">
            <div className="bg-white comic-box-lg rounded-3xl p-6 md:p-8 bg-halftone-gold mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{getRank().icon}</span>
                    <span className="font-comic text-xs font-bold uppercase tracking-wider text-amber-800">
                      {lang === 'zh' ? '水手荣誉军衔 · Mariner Rank' : 'Mariner Naval Rank'}
                    </span>
                  </div>
                  <h1 className="font-comic text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                    {lang === 'zh' ? getRank().titleZh : getRank().titleEn}
                  </h1>
                  <p className="text-sm text-slate-600 font-medium mt-1">
                    {lang === 'zh'
                      ? `你已累计赢得 ${totalStars} 颗黄金星星，已点亮 ${Object.keys(completedWeeks).length} 个数学航行周！`
                      : `You have gathered ${totalStars} stars and conquered ${Object.keys(completedWeeks).length} weekly math expeditions!`}
                  </p>
                  <div className="mt-2 text-[11px] font-comic font-bold text-amber-900 bg-amber-200/90 border border-amber-400 px-3 py-1 rounded-full inline-block shadow-xs">
                    🏅 {lang === 'zh' ? '荣誉总督导：Yang & Melody' : 'Official Mariners Certification by Yang & Melody'}
                  </div>
                </div>

                <div className="bg-white comic-box rounded-2xl p-4 text-center shrink-0 shadow-comic">
                  <div className="text-3xl mb-1">⭐</div>
                  <div className="font-comic text-2xl font-bold text-slate-900">{totalStars}</div>
                  <div className="text-xs font-semibold text-slate-500">
                    {lang === 'zh' ? '总战绩星星' : 'Total Stars'}
                  </div>
                </div>
              </div>
            </div>

            {/* 3D Fleet Mariner Helm Trophy Card */}
            <div className="bg-white comic-box rounded-3xl p-6 mb-8 text-center bg-radial from-amber-50 via-white to-amber-50/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-2">
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏆</span>
                    <h2 className="font-comic text-xl font-bold text-slate-900">
                      {lang === 'zh' ? '3D 水手舰队终身黄金金舵' : '3D Mariner Fleet Golden Helm'}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    {lang === 'zh' ? '悬停、倾斜或点击可 360° 检阅你的专属 3D 荣誉金舵！' : 'Interactive procedural 3D trophy! Hover and tilt to inspect in 360°.'}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-xl bg-blue-100 border border-blue-400 font-comic text-xs font-bold text-blue-900 shrink-0">
                  WebGL · Three.js 3D
                </span>
              </div>
              <MarinerTrophy3D
                title="Fleet Mariner Helm"
                subtitle="Grade 4 Math Honors"
                starsCount={totalStars}
                interactive={true}
              />
            </div>

            {/* Country Badges Showcase */}
            <div className="bg-white comic-box rounded-3xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-comic text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>🎖️</span>
                  <span>{lang === 'zh' ? '16 国地理探索勋章' : '16 World Explorer Badges'}</span>
                </h2>
                <span className="text-xs font-bold text-slate-500">
                  {unlockedBadges.length} / {WORLD_COUNTRIES.length}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {WORLD_COUNTRIES.map(country => {
                  const isUnlocked = unlockedBadges.includes(country.id);
                  return (
                    <div
                      key={country.id}
                      className={`p-3.5 rounded-2xl border-2 transition-all ${
                        isUnlocked
                          ? 'border-amber-400 bg-amber-50/70 shadow-sm'
                          : 'border-slate-200 bg-slate-50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-2xl">{country.flag}</span>
                        {isUnlocked ? (
                          <span className="text-xs text-emerald-600 font-bold">✓ Earned</span>
                        ) : (
                          <span className="text-xs text-slate-400">🔒 Locked</span>
                        )}
                      </div>
                      <div className="font-comic text-xs font-bold text-slate-900 leading-tight">
                        {lang === 'zh' ? country.badgeTitleZh : country.badgeTitleEn}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                        {lang === 'zh' ? country.nameZh : country.nameEn}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reset Progress Section */}
            <div className="bg-slate-100 rounded-2xl p-4 flex items-center justify-between border border-slate-200 text-xs">
              <span className="text-slate-600 font-medium">
                {lang === 'zh' ? '想要清空记录重新体验航海闯关吗？' : 'Want to reset progress and start a fresh voyage?'}
              </span>
              <button
                onClick={() => {
                  if (window.confirm(lang === 'zh' ? '确定要重置所有星星和通关进度吗？' : 'Reset all progress and stars?')) {
                    localStorage.clear();
                    setCompletedWeeks({});
                    setWeekStars({});
                    setUnlockedBadges(['canada']);
                  }
                }}
                className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-rose-600 hover:bg-rose-50 font-bold"
              >
                {lang === 'zh' ? '重置进度' : 'Reset Progress'}
              </button>
            </div>
          </div>
        )}

        {/* Curriculum & About View */}
        {activeView === 'about' && (
          <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in">
            <div className="bg-white comic-box-lg rounded-3xl p-6 md:p-8 mb-8 bg-halftone">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">📚</span>
                <span className="font-comic text-xs font-bold uppercase tracking-wider text-blue-700">
                  WRDSB Grade 4 Long Range Plan (LRP)
                </span>
              </div>
              <h1 className="font-comic text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-3">
                {lang === 'zh' ? '滑铁卢教育局四年级数学大纲解析' : 'Ontario Grade 4 Curriculum Architecture'}
              </h1>
              {/* Authors & Creators Spotlight */}
              <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-sky-50 border-2 border-slate-900 rounded-2xl p-5 mb-8 comic-box-sm flex flex-col sm:flex-row items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-400 border-2 border-slate-900 flex items-center justify-center text-3xl comic-box-sm shrink-0">
                  👨‍👩‍👧
                </div>
                <div className="text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                    <h2 className="font-comic text-lg font-bold text-slate-900">
                      {lang === 'zh' ? '创作者 / 作者：Yang & Melody' : 'Project Creators: Yang & Melody'}
                    </h2>
                    <span className="bg-emerald-200 border border-emerald-400 text-emerald-950 px-2 py-0.5 rounded-lg text-[10px] font-comic font-bold">
                      {lang === 'zh' ? '爱心出品' : 'Custom Built with Love'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {lang === 'zh'
                      ? '本应用由家长 Yang 和 Melody 倾注心血打造，专为女儿及滑铁卢 Millen Woods Public School 等公立学校四年级同学们定制。遵循 WRDSB 全年 40 周官方教学大纲（Tier 1–3），融入滑铁卢本土真实场景，让数学与世界探索更有温度！'
                      : 'Proudly engineered by parents Yang & Melody, specifically tailored for our daughter and her fellow Grade 4 Mariners at Millen Woods Public School, Waterloo. Fully aligned to the official WRDSB 40-week Long Range Plan with local context!'}
                  </p>
                </div>
              </div>

              {/* Curriculum Strands breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                  <h3 className="font-comic text-base font-bold text-blue-900 mb-1">
                    🍂 Sept–Oct: Number Sense & Rounding
                  </h3>
                  <p className="text-xs text-blue-800 leading-relaxed font-medium">
                    {lang === 'zh'
                      ? '万以内数位拆分（标准与非标准）、ION 轻轨数轴四舍五入与逆向极值思考。'
                      : 'Numbers up to 10,000, non-standard partitioning, ION LRT number line rounding & reverse boundary logic.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <h3 className="font-comic text-base font-bold text-emerald-900 mb-1">
                    📐 Oct: Geometric Reasoning & Grid
                  </h3>
                  <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                    {lang === 'zh'
                      ? '锐角/直角/钝角 90° 基准、四边形分类、对称轴与银湖网格平移。'
                      : 'Benchmark 90° angles, quadrilateral families, lines of symmetry, and (x, y) translations.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <h3 className="font-comic text-base font-bold text-amber-900 mb-1">
                    ✖️ Oct–Jan: Arrays, Multi-Digit & Ratios
                  </h3>
                  <p className="text-xs text-amber-800 leading-relaxed font-medium">
                    {lang === 'zh'
                      ? '2× ➔ 4× ➔ 8× 翻倍链、面积模型（Area Model）、有余数除法与圣雅各布斯比率表。'
                      : 'Doubling chains, rectangular area models, division remainders, and St. Jacobs ratio tables.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                  <h3 className="font-comic text-base font-bold text-purple-900 mb-1">
                    🍕 Jan–Feb: Fractions & Tenths Decimals
                  </h3>
                  <p className="text-xs text-purple-800 leading-relaxed font-medium">
                    {lang === 'zh'
                      ? '假分数与带分数互化、集合的分数、十分之一小数及购物换算。'
                      : 'Improper fractions, mixed numbers, fractions of a set, tenths decimals (0.1–0.9), and money change.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                  <h3 className="font-comic text-base font-bold text-rose-900 mb-1">
                    ⚖️ Mar–Apr: Patterns & Balance Equations
                  </h3>
                  <p className="text-xs text-rose-800 leading-relaxed font-medium">
                    {lang === 'zh'
                      ? '递增数列规律、天平未知数方程（2x + 8 = 26）与不等式。'
                      : 'Growing pattern rules, function machines, balance scale equations, and inequality limits.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
                  <h3 className="font-comic text-base font-bold text-teal-900 mb-1">
                    📏 May–Jun: Measurement & Coding
                  </h3>
                  <p className="text-xs text-teal-800 leading-relaxed font-medium">
                    {lang === 'zh'
                      ? '长方形周长与面积、经过时间换算、5级概率连续体与伪代码 REPEAT 循环。'
                      : 'Perimeter vs area, elapsed time, 5-level probability continuum, and pseudocode REPEAT loops.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Interactive Math Scratchpad Component */}
      <Scratchpad
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
        lang={lang}
      />

      {/* Share Quest Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        lang={lang}
        soundEnabled={soundEnabled}
      />

      {/* Persistent Floating Scratchpad Trigger (Bottom Left) */}
      {!isScratchpadOpen && (
        <button
          onClick={() => {
            if (soundEnabled) playClickSound();
            setIsScratchpadOpen(true);
          }}
          className="fixed bottom-5 left-5 z-40 comic-btn px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-comic font-bold text-xs sm:text-sm rounded-2xl flex items-center gap-2 shadow-comic-lg"
          title="Open Scratchpad"
        >
          <Pencil size={18} />
          <span>{lang === 'zh' ? '演算草稿板' : 'Scratchpad'}</span>
        </button>
      )}

      {/* Floating Gemini AI Learning Buddy (Bottom Right) */}
      <MarinerAiBuddy
        lang={lang}
        soundEnabled={soundEnabled}
        currentContext={
          activeView === 'runner' && selectedWeek
            ? `Week ${selectedWeek.week}: ${selectedWeek.titleEn} (${selectedWeek.strandEn})`
            : activeView === 'world'
            ? 'World Explorer Passport'
            : activeView === 'badges'
            ? 'Mariner Badge Vault & 3D Trophy'
            : '40-Week Math Expedition Map'
        }
      />

      {/* Minimal Anti-Slop Footer */}
      <footer className="border-t-2 border-slate-900 bg-white py-6 px-4 text-center select-none">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-semibold">
          <div className="flex items-center gap-1.5">
            <span>⚓</span>
            <span>Millen Woods Mariners Math &amp; World Explorer Quest</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 font-comic font-medium">
            <span>❤️ {lang === 'zh' ? '由 Yang & Melody 为水手定制' : 'Crafted with love by Yang & Melody'}</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-400">WRDSB Grade 4</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

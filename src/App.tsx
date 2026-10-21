import React, { useState, useEffect } from 'react';
import { Globe, Volume2, VolumeX, Pencil, Share2 } from 'lucide-react';
import { getAllWeeks, WeekTopic } from './data/mathData';
import { WORLD_COUNTRIES } from './data/worldData';
import { WORLD_FRENCH_DATA } from './data/worldFrenchData';
import { QuestMap } from './components/QuestMap';
import { QuestionRunner } from './components/QuestionRunner';
import { WorldExplorer } from './components/WorldExplorer';
import { SpaceExplorer } from './components/SpaceExplorer';
import { CELESTIAL_BODIES } from './data/spaceData';
import { Scratchpad } from './components/Scratchpad';
import { ShareModal } from './components/ShareModal';
import { MarinerAiBuddy } from './components/MarinerAiBuddy';
import { MarinerTrophy3D } from './components/MarinerTrophy3D';
import { playClickSound, playChestFanfare } from './utils/audio';
import { triggerWeekVictoryConfetti, triggerBadgeUnlockConfetti } from './utils/confettiExplosion';
import { Language, I18N } from './utils/i18n';

type ActiveView = 'map' | 'runner' | 'world' | 'space' | 'badges' | 'about';

export default function App() {
  const allWeeks = React.useMemo(() => getAllWeeks(), []);

  // Persistent user state with trilingual support ('en' | 'fr' | 'zh')
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('mariner_lang');
      return saved === 'fr' || saved === 'zh' || saved === 'en' ? saved : 'en';
    } catch {
      return 'en';
    }
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

  const t = I18N[lang];

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

  // Rank determination with trilingual support
  const getRank = () => {
    if (totalStars >= 100) {
      return {
        titleEn: 'Grand Fleet Admiral',
        titleFr: 'Grand Amiral de Flotte',
        titleZh: '特级荣誉舰队司令',
        icon: '👑',
      };
    }
    if (totalStars >= 60) {
      return {
        titleEn: 'Master Captain',
        titleFr: 'Capitaine Émérite',
        titleZh: '资深水手船长',
        icon: '⚓',
      };
    }
    if (totalStars >= 30) {
      return {
        titleEn: 'Star Navigator',
        titleFr: 'Navigateur des Étoiles',
        titleZh: '星际领航员',
        icon: '🧭',
      };
    }
    if (totalStars >= 10) {
      return {
        titleEn: 'First Mate Sailor',
        titleFr: 'Premier Maître Marin',
        titleZh: '精英领航大副',
        icon: '⛵',
      };
    }
    return {
      titleEn: 'Apprentice Mariner',
      titleFr: 'Apprenti Marin',
      titleZh: '见习水手小先锋',
      icon: '🐣',
    };
  };

  // Festive celebration toast state
  const [celebrationToast, setCelebrationToast] = useState<{
    icon: string;
    title: string;
    subtitle: string;
  } | null>(null);

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

    // Trigger grand festive confetti explosion on the map!
    triggerWeekVictoryConfetti();
    if (soundEnabled) {
      playChestFanfare();
    }

    const toastTitle = lang === 'fr'
      ? `Semaine ${weekNumber} accomplie !`
      : lang === 'zh'
      ? `第 ${weekNumber} 周数学大通关！`
      : `Week ${weekNumber} Conquered!`;

    const toastSubtitle = lang === 'fr'
      ? `+${starsEarned} Étoiles d'or ajoutées à ta flotte !`
      : lang === 'zh'
      ? `为水手舰队赢取了 +${starsEarned} 颗黄金星星！`
      : `Earned +${starsEarned} Stars for your Fleet!`;

    setCelebrationToast({
      icon: '🎉',
      title: toastTitle,
      subtitle: toastSubtitle,
    });
    setTimeout(() => setCelebrationToast(null), 4500);
  };

  const handleUnlockBadge = (badgeId: string) => {
    if (!unlockedBadges.includes(badgeId)) {
      setUnlockedBadges(prev => [...prev, badgeId]);

      // Trigger festive golden badge confetti explosion!
      triggerBadgeUnlockConfetti();
      if (soundEnabled) {
        playChestFanfare();
      }

      const country = WORLD_COUNTRIES.find(c => c.id === badgeId);
      const frData = WORLD_FRENCH_DATA[badgeId];
      if (country) {
        const badgeTitle = lang === 'fr'
          ? (frData?.badgeTitleFr || country.badgeTitleEn)
          : lang === 'zh'
          ? country.badgeTitleZh
          : country.badgeTitleEn;

        const cName = lang === 'fr'
          ? (frData?.nameFr || country.nameEn)
          : lang === 'zh'
          ? country.nameZh
          : country.nameEn;

        const toastTitle = lang === 'fr'
          ? `Nouveau Badge : ${badgeTitle} !`
          : lang === 'zh'
          ? `新勋章解锁：${badgeTitle}！`
          : `New Badge: ${badgeTitle}!`;

        const toastSubtitle = lang === 'fr'
          ? `${country.flag} Honneur d'exploration du ${cName} décerné !`
          : lang === 'zh'
          ? `${country.flag} 荣获【${cName}】专属航海探索家荣誉！`
          : `${country.flag} ${country.nameEn} Explorer Honors Awarded!`;

        setCelebrationToast({
          icon: '🎖️',
          title: toastTitle,
          subtitle: toastSubtitle,
        });
        setTimeout(() => setCelebrationToast(null), 4500);
      }
    }
  };

  const handleSetLanguage = (newLang: Language) => {
    if (soundEnabled) playClickSound();
    setLang(newLang);
  };

  const toggleSound = () => {
    setSoundEnabled(s => !s);
  };

  const currentRank = getRank();
  const rankTitle = lang === 'fr' ? currentRank.titleFr : lang === 'zh' ? currentRank.titleZh : currentRank.titleEn;

  return (
    <div className="min-h-screen bg-halftone flex flex-col selection:bg-amber-300 selection:text-slate-900">
      {/* Top Bar: Zone 1 (Wordmark), Zone 2 (Nav), Zone 3 (Actions & Language Switcher) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-900 px-4 md:px-8 py-3 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setActiveView('map');
            }}
            className="flex items-center gap-2 text-left group shrink-0 cursor-pointer"
          >
            <span className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-comic font-bold text-lg comic-box-sm group-hover:rotate-6 transition-transform">
              ⚓
            </span>
            <div className="flex flex-col">
              <span className="font-comic text-base font-extrabold text-slate-900 tracking-tight leading-none">
                MILLEN WOODS
              </span>
              <span className="text-[10px] font-comic font-bold text-blue-600 tracking-wider uppercase mt-0.5">
                Grade 4 Mariners · 4e Année
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 font-comic text-xs font-bold text-slate-800">
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setActiveView('map');
            }}
            className={`whitespace-nowrap transition-colors hover:text-blue-600 cursor-pointer ${
              activeView === 'map' || activeView === 'runner'
                ? 'text-blue-600 underline underline-offset-8 decoration-2 decoration-amber-400'
                : ''
            }`}
          >
            {t.nav.map}
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setActiveView('world');
            }}
            className={`whitespace-nowrap transition-colors hover:text-blue-600 cursor-pointer ${
              activeView === 'world'
                ? 'text-blue-600 underline underline-offset-8 decoration-2 decoration-amber-400'
                : ''
            }`}
          >
            {t.nav.world}
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setActiveView('space');
            }}
            className={`whitespace-nowrap transition-colors hover:text-blue-600 cursor-pointer ${
              activeView === 'space'
                ? 'text-blue-600 underline underline-offset-8 decoration-2 decoration-amber-400'
                : ''
            }`}
          >
            {t.nav.space}
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setActiveView('badges');
            }}
            className={`whitespace-nowrap transition-colors hover:text-blue-600 cursor-pointer ${
              activeView === 'badges'
                ? 'text-blue-600 underline underline-offset-8 decoration-2 decoration-amber-400'
                : ''
            }`}
          >
            {t.nav.badges}
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setActiveView('about');
            }}
            className={`whitespace-nowrap transition-colors hover:text-blue-600 cursor-pointer ${
              activeView === 'about'
                ? 'text-blue-600 underline underline-offset-8 decoration-2 decoration-amber-400'
                : ''
            }`}
          >
            {t.nav.curriculum}
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Stars, Sound, Trilingual Selector, Share, Scratchpad) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Total Stars Pill */}
          <div className="hidden sm:flex items-center gap-1.5 bg-amber-100 border-2 border-slate-900 px-2.5 py-1 rounded-xl font-comic text-xs font-bold text-amber-950 shadow-sm">
            <span>⭐</span>
            <span>{totalStars}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`comic-btn p-1.5 sm:p-2 rounded-xl text-xs font-bold cursor-pointer ${
              soundEnabled ? 'bg-amber-100 text-slate-800' : 'bg-slate-100 text-slate-400'
            }`}
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* TRILINGUAL SELECTOR: [ EN | FR | 中文 ] */}
          <div className="flex items-center bg-slate-100 border-2 border-slate-900 rounded-xl p-0.5 comic-box-sm">
            <button
              onClick={() => handleSetLanguage('en')}
              className={`px-2 py-1 rounded-lg font-comic text-xs font-bold transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-amber-300 text-slate-950 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => handleSetLanguage('fr')}
              className={`px-2 py-1 rounded-lg font-comic text-xs font-bold transition-all cursor-pointer ${
                lang === 'fr'
                  ? 'bg-amber-300 text-slate-950 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Français (Immersion 4e année)"
            >
              FR
            </button>
            <button
              onClick={() => handleSetLanguage('zh')}
              className={`px-2 py-1 rounded-lg font-comic text-xs font-bold transition-all cursor-pointer ${
                lang === 'zh'
                  ? 'bg-amber-300 text-slate-950 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="中文 (双语辅导)"
            >
              中文
            </button>
          </div>

          {/* Share Link Button */}
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setIsShareModalOpen(true);
            }}
            className="comic-btn px-2.5 sm:px-3 py-1.5 bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-comic text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-comic cursor-pointer"
            title="Share this App"
          >
            <Share2 size={14} />
            <span className="hidden sm:inline">{t.nav.share}</span>
          </button>

          {/* Scratchpad Quick Button */}
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setIsScratchpadOpen(s => !s);
            }}
            className="comic-btn px-2.5 sm:px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-comic text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-comic cursor-pointer"
            title="Open digital scratchpad"
          >
            <Pencil size={14} />
            <span className="hidden sm:inline">{t.nav.scratchpad}</span>
          </button>
        </div>
      </header>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around bg-white border-b-2 border-slate-900 px-2 py-2 text-xs font-comic font-bold text-slate-700">
        <button
          onClick={() => setActiveView('map')}
          className={`px-2 py-1 rounded-lg cursor-pointer ${activeView === 'map' ? 'bg-amber-300 text-slate-900' : ''}`}
        >
          {t.nav.map}
        </button>
        <button
          onClick={() => setActiveView('world')}
          className={`px-2 py-1 rounded-lg cursor-pointer ${activeView === 'world' ? 'bg-amber-300 text-slate-900' : ''}`}
        >
          {t.nav.world}
        </button>
        <button
          onClick={() => setActiveView('space')}
          className={`px-2 py-1 rounded-lg cursor-pointer ${activeView === 'space' ? 'bg-amber-300 text-slate-900' : ''}`}
        >
          {t.nav.space}
        </button>
        <button
          onClick={() => setActiveView('badges')}
          className={`px-2 py-1 rounded-lg cursor-pointer ${activeView === 'badges' ? 'bg-amber-300 text-slate-900' : ''}`}
        >
          {t.nav.badges}
        </button>
        <button
          onClick={() => setActiveView('about')}
          className={`px-2 py-1 rounded-lg cursor-pointer ${activeView === 'about' ? 'bg-amber-300 text-slate-900' : ''}`}
        >
          {t.nav.curriculum}
        </button>
        <button
          onClick={() => {
            if (soundEnabled) playClickSound();
            setIsShareModalOpen(true);
          }}
          className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold cursor-pointer"
        >
          {t.nav.share}
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

        {activeView === 'space' && (
          <SpaceExplorer
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
                    <span className="text-3xl">{currentRank.icon}</span>
                    <span className="font-comic text-xs font-bold uppercase tracking-wider text-amber-800">
                      {t.badges.rankBadge}
                    </span>
                  </div>
                  <h1 className="font-comic text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                    {rankTitle}
                  </h1>
                  <p className="text-sm text-slate-600 font-medium mt-1">
                    {t.badges.starsSummary(totalStars, Object.keys(completedWeeks).length)}
                  </p>
                  <div className="mt-2 text-[11px] font-comic font-bold text-amber-900 bg-amber-200/90 border border-amber-400 px-3 py-1 rounded-full inline-block shadow-xs">
                    🏅 {t.badges.certText}
                  </div>
                </div>

                <div className="bg-white comic-box rounded-2xl p-4 text-center shrink-0 shadow-comic">
                  <div className="text-3xl mb-1">⭐</div>
                  <div className="font-comic text-2xl font-bold text-slate-900">{totalStars}</div>
                  <div className="text-xs font-semibold text-slate-500">
                    {t.badges.totalStars}
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
                      {t.badges.trophyTitle}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    {t.badges.trophySubtitle}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-xl bg-blue-100 border border-blue-400 font-comic text-xs font-bold text-blue-900 shrink-0">
                  {t.badges.trophyTag}
                </span>
              </div>
              <MarinerTrophy3D
                title={t.badges.trophyTitle}
                subtitle="Grade 4 Math Honors"
                starsCount={totalStars}
                interactive={true}
              />
            </div>

            {/* Country Badges Showcase */}
            <div className="bg-white comic-box rounded-3xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-comic text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>🌍</span>
                  <span>{t.badges.vaultTitle}</span>
                </h2>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-lg">
                  {unlockedBadges.filter(id => WORLD_COUNTRIES.some(c => c.id === id)).length} / {WORLD_COUNTRIES.length}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {WORLD_COUNTRIES.map(country => {
                  const isUnlocked = unlockedBadges.includes(country.id);
                  const frData = WORLD_FRENCH_DATA[country.id];
                  const bTitle = lang === 'fr' ? (frData?.badgeTitleFr || country.badgeTitleEn) : lang === 'zh' ? country.badgeTitleZh : country.badgeTitleEn;
                  const cName = lang === 'fr' ? (frData?.nameFr || country.nameEn) : lang === 'zh' ? country.nameZh : country.nameEn;

                  return (
                    <div
                      key={country.id}
                      onClick={() => {
                        if (isUnlocked) {
                          if (soundEnabled) playClickSound();
                          triggerBadgeUnlockConfetti();
                        }
                      }}
                      className={`p-3.5 rounded-2xl border-2 transition-all ${
                        isUnlocked
                          ? 'border-amber-400 bg-amber-50/70 shadow-sm cursor-pointer hover:scale-105 active:scale-95'
                          : 'border-slate-200 bg-slate-50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-2xl">{country.flag}</span>
                        {isUnlocked ? (
                          <span className="text-xs text-emerald-600 font-bold">{t.badges.badgeEarnedTag}</span>
                        ) : (
                          <span className="text-xs text-slate-400">{t.badges.badgeLockedTag}</span>
                        )}
                      </div>
                      <div className="font-comic text-xs font-bold text-slate-900 leading-tight">
                        {bTitle}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                        {cName}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cosmic & Planetary Badges Showcase */}
            <div className="bg-white comic-box rounded-3xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-comic text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>🚀</span>
                  <span>{t.badges.spaceVaultTitle}</span>
                </h2>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-lg">
                  {unlockedBadges.filter(id => CELESTIAL_BODIES.some(c => c.id === id)).length} / {CELESTIAL_BODIES.length}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {CELESTIAL_BODIES.map(body => {
                  const isUnlocked = unlockedBadges.includes(body.id);
                  const bTitle = lang === 'fr' ? body.badgeTitleFr : lang === 'zh' ? body.badgeTitleZh : body.badgeTitleEn;
                  const bName = lang === 'fr' ? body.nameFr : lang === 'zh' ? body.nameZh : body.nameEn;

                  return (
                    <div
                      key={body.id}
                      onClick={() => {
                        if (isUnlocked) {
                          if (soundEnabled) playClickSound();
                          triggerBadgeUnlockConfetti();
                        }
                      }}
                      className={`p-3.5 rounded-2xl border-2 transition-all ${
                        isUnlocked
                          ? 'border-purple-400 bg-purple-50/70 shadow-sm cursor-pointer hover:scale-105 active:scale-95'
                          : 'border-slate-200 bg-slate-50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-2xl">{body.icon}</span>
                        {isUnlocked ? (
                          <span className="text-xs text-purple-700 font-bold">{t.badges.badgeEarnedTag}</span>
                        ) : (
                          <span className="text-xs text-slate-400">{t.badges.badgeLockedTag}</span>
                        )}
                      </div>
                      <div className="font-comic text-xs font-bold text-slate-900 leading-tight">
                        {bTitle}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                        {bName}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reset Progress Section */}
            <div className="bg-slate-100 rounded-2xl p-4 flex items-center justify-between border border-slate-200 text-xs">
              <span className="text-slate-600 font-medium">
                {t.badges.resetTitle}
              </span>
              <button
                onClick={() => {
                  if (window.confirm(t.badges.resetPrompt)) {
                    localStorage.clear();
                    setCompletedWeeks({});
                    setWeekStars({});
                    setUnlockedBadges(['canada']);
                  }
                }}
                className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-rose-600 hover:bg-rose-50 font-bold cursor-pointer"
              >
                {t.badges.resetButton}
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
                  {t.curriculum.badge}
                </span>
              </div>
              <h1 className="font-comic text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-3">
                {t.curriculum.title}
              </h1>

              {/* Authors & Creators Spotlight */}
              <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-sky-50 border-2 border-slate-900 rounded-2xl p-5 mb-8 comic-box-sm flex flex-col sm:flex-row items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-400 border-2 border-slate-900 flex items-center justify-center text-3xl comic-box-sm shrink-0">
                  👨‍👩‍👧
                </div>
                <div className="text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                    <h2 className="font-comic text-lg font-bold text-slate-900">
                      {t.curriculum.creatorsTitle}
                    </h2>
                    <span className="bg-emerald-200 border border-emerald-400 text-emerald-950 px-2 py-0.5 rounded-lg text-[10px] font-comic font-bold">
                      {t.curriculum.creatorsBadge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {t.curriculum.creatorsText}
                  </p>
                </div>
              </div>

              {/* Curriculum Strands breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {t.curriculum.strands.map((strand, sIdx) => {
                  const bgClass = strand.color === 'blue'
                    ? 'bg-blue-50 border-blue-200 text-blue-900'
                    : strand.color === 'emerald'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : strand.color === 'amber'
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : strand.color === 'purple'
                    ? 'bg-purple-50 border-purple-200 text-purple-900'
                    : strand.color === 'rose'
                    ? 'bg-rose-50 border-rose-200 text-rose-900'
                    : 'bg-teal-50 border-teal-200 text-teal-900';

                  return (
                    <div key={sIdx} className={`p-4 rounded-2xl border ${bgClass}`}>
                      <h3 className="font-comic text-base font-bold mb-1 flex items-center gap-1.5">
                        <span>{strand.icon}</span>
                        <span>{strand.title}</span>
                      </h3>
                      <p className="text-xs leading-relaxed font-medium opacity-90">
                        {strand.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Festive Celebration Toast Notification */}
      {celebrationToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-6 duration-300 w-[90vw] max-w-md pointer-events-none">
          <div className="bg-white border-3 border-slate-900 rounded-3xl p-4 comic-box shadow-2xl flex items-center gap-3.5 bg-radial from-amber-50 to-white">
            <span className="text-3xl p-2.5 bg-amber-400 rounded-2xl border-2 border-slate-900 comic-box-sm shadow-sm shrink-0 animate-bounce">
              {celebrationToast.icon}
            </span>
            <div className="flex-1">
              <h4 className="font-comic text-base font-bold text-slate-900 leading-tight">
                {celebrationToast.title}
              </h4>
              <p className="text-xs text-slate-600 font-semibold mt-0.5">
                {celebrationToast.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Floating Scratchpad Drawer */}
      <Scratchpad
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
        lang={lang}
      />

      {/* Social / Family Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        lang={lang}
        soundEnabled={soundEnabled}
      />

      {/* Floating Mariner AI Learning Buddy */}
      <MarinerAiBuddy
        lang={lang}
        soundEnabled={soundEnabled}
        currentContext={
          selectedWeek
            ? `Grade 4 Math - Week ${selectedWeek.week}: ${selectedWeek.titleEn} (${selectedWeek.strandEn}) at ${selectedWeek.landmark}`
            : 'Grade 4 WRDSB Math Adventure'
        }
      />

      {/* Footer */}
      <footer className="bg-white border-t-2 border-slate-900 py-6 px-4 text-center mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-comic text-slate-600">
          <div className="flex items-center gap-2">
            <span className="text-base">⚓</span>
            <span className="font-bold text-slate-900">Millen Woods Mariners</span>
            <span>·</span>
            <span>WRDSB Grade 4 Math &amp; World Geography</span>
          </div>

          <div className="flex items-center gap-3">
            <span>❤️ {lang === 'fr' ? 'Fait avec amour par Yang & Melody' : lang === 'zh' ? '由 Yang & Melody 为水手定制' : 'Crafted with love by Yang & Melody'}</span>
            <span>·</span>
            <span className="text-slate-400">Waterloo, Ontario 🇨🇦</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

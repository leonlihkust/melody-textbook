import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  VolumeX,
  Compass,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Sparkles,
  Stamp,
  Award,
  LayoutGrid,
  Map as MapIcon,
  ChevronRight,
  X,
} from 'lucide-react';
import { CHINA_CITIES, ChinaCity, ChinaRegion } from '../data/chinaData';
import { ChinaIllustratedMap } from './ChinaIllustratedMap';
import { ChinaIllustration } from './ChinaIllustration';
import { playCorrectSound, playClueSound, playClickSound, speakText, stopSpeaking } from '../utils/audio';
import { triggerBadgeUnlockConfetti } from '../utils/confettiExplosion';
import { Language, I18N } from '../utils/i18n';

interface ChinaExplorerProps {
  lang: Language;
  soundEnabled: boolean;
  unlockedBadges: string[];
  onUnlockBadge: (badgeId: string, starsEarned: number) => void;
}

export const ChinaExplorer: React.FC<ChinaExplorerProps> = ({
  lang,
  soundEnabled,
  unlockedBadges,
  onUnlockBadge,
}) => {
  // Default to 'grid' view as requested so kids see the 12-city picture book immediately
  const [viewMode, setViewMode] = useState<'grid' | 'map' | 'fact'>('grid');
  const [previousViewMode, setPreviousViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<ChinaRegion | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'fact' | 'quiz'>('fact');
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Interactive City Sticker Fun Fact Modal State
  const [modalCity, setModalCity] = useState<ChinaCity | null>(null);
  const [isModalSpeaking, setIsModalSpeaking] = useState(false);

  // Passport Stamp Collection State
  const [stampedCities, setStampedCities] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mariners_china_stamps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const t = I18N[lang].china || {
    title: lang === 'zh' ? '华夏名城与文化探索' : lang === 'fr' ? 'Exploration de la Chine' : 'China Cultural Explorer',
    subtitle:
      lang === 'zh'
        ? '畅游千年古都、皇家园林与诗画江南，探索博大精深的中华胜景！'
        : lang === 'fr'
        ? 'Voyagez à travers les capitales impériales, jardins de poètes et merveilles millénaires !'
        : 'Journey through ancient capitals, imperial gardens, and poetic wonders!',
    map3D: lang === 'zh' ? '手绘探险大地图' : lang === 'fr' ? 'Carte Illustrée' : 'Illustrated Map',
    factCards: lang === 'zh' ? '趣味图解' : lang === 'fr' ? 'Images & Découverte' : 'Visual Discovery',
    badgeQuiz: lang === 'zh' ? '答题领勋章' : lang === 'fr' ? 'Défi du Savoir' : 'Heritage Quiz',
    earned: lang === 'zh' ? '已获专属勋章' : lang === 'fr' ? 'Badge Débloqué !' : 'Badge Unlocked!',
    locked: lang === 'zh' ? '答题赢取勋章' : lang === 'fr' ? 'Répondez pour Débloquer' : 'Quiz to Unlock',
    takeQuiz: lang === 'zh' ? '解锁名城勋章' : lang === 'fr' ? 'Gagner le Badge' : 'Unlock City Badge',
    inspect3D: lang === 'zh' ? '返回地图' : lang === 'fr' ? 'Retour Carte' : 'Back to Map',
  };

  const currentCity = CHINA_CITIES[selectedIdx] || CHINA_CITIES[0];
  const isBadgeUnlocked = unlockedBadges.includes(currentCity.id);
  const isCityStamped = stampedCities.includes(currentCity.id) || isBadgeUnlocked;

  // Filtered cities list
  const filteredCities = useMemo(() => {
    if (selectedRegion === 'all') return CHINA_CITIES;
    return CHINA_CITIES.filter(c => c.region === selectedRegion);
  }, [selectedRegion]);

  // Localized texts
  const cityName = lang === 'fr' ? currentCity.nameFr : lang === 'zh' ? currentCity.nameZh : currentCity.nameEn;
  const cityProvince = lang === 'fr' ? currentCity.provinceFr : lang === 'zh' ? currentCity.provinceZh : currentCity.provinceEn;
  const cityLandmark = lang === 'fr' ? currentCity.landmarkFr : lang === 'zh' ? currentCity.landmarkZh : currentCity.landmarkEn;
  const cityQuote = lang === 'fr' ? currentCity.famousQuoteFr : lang === 'zh' ? currentCity.famousQuoteZh : currentCity.famousQuoteEn;
  const cityBadgeTitle = lang === 'fr' ? currentCity.badgeTitleFr : lang === 'zh' ? currentCity.badgeTitleZh : currentCity.badgeTitleEn;
  const cityStampText = lang === 'fr' ? currentCity.stampFr : lang === 'zh' ? currentCity.stampZh : currentCity.stampEn;

  // Randomized quiz options
  const quizData = useMemo(() => {
    const q = currentCity.quiz;
    const rawOptions = lang === 'fr' ? q.optionsFr : lang === 'zh' ? q.optionsZh : q.optionsEn;
    const indices = [0, 1, 2, 3];
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return {
      options: indices.map(i => rawOptions[i]),
      correctIndex: indices.indexOf(q.correctIndex),
      question: lang === 'fr' ? q.questionFr : lang === 'zh' ? q.questionZh : q.questionEn,
      explanation: lang === 'fr' ? q.explanationFr : lang === 'zh' ? q.explanationZh : q.explanationEn,
    };
  }, [currentCity, lang]);

  const handleOpenCity = (city: ChinaCity) => {
    if (soundEnabled) playClickSound();
    stopSpeaking();
    setIsSpeaking(false);
    const idx = CHINA_CITIES.findIndex(c => c.id === city.id);
    if (idx !== -1) setSelectedIdx(idx);
    if (viewMode !== 'fact') {
      setPreviousViewMode(viewMode as 'grid' | 'map');
    }
    setViewMode('fact');
    setActiveTab('fact');
    setSelectedOpt(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const handleOpenStickerModal = (city: ChinaCity) => {
    if (soundEnabled) playClickSound();
    stopSpeaking();
    setIsSpeaking(false);
    setIsModalSpeaking(false);
    setModalCity(city);
  };

  const handleCloseModal = () => {
    if (soundEnabled) playClickSound();
    stopSpeaking();
    setIsModalSpeaking(false);
    setModalCity(null);
  };

  const handleStartDiscovery = (city: ChinaCity) => {
    if (soundEnabled) playClickSound();
    stopSpeaking();
    setIsModalSpeaking(false);
    setModalCity(null);
    handleOpenCity(city);
  };

  const handleSpeakModalFunFact = (city: ChinaCity) => {
    if (isModalSpeaking) {
      stopSpeaking();
      setIsModalSpeaking(false);
      return;
    }
    setIsModalSpeaking(true);
    const factText = lang === 'fr' ? city.funFactFr : lang === 'zh' ? city.funFactZh : city.funFactEn;
    const cName = lang === 'fr' ? city.nameFr : lang === 'zh' ? city.nameZh : city.nameEn;
    const speechText = `${cName}。${factText}`;
    speakText(speechText, lang, () => setIsModalSpeaking(false));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalCity) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalCity]);

  const handleSpeakHighlights = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    const cardsSummary = currentCity.visualCards
      .map(c => {
        const title = lang === 'fr' ? c.titleFr : lang === 'zh' ? c.titleZh : c.titleEn;
        const desc = lang === 'fr' ? c.descFr : lang === 'zh' ? c.descZh : c.descEn;
        return `${title}：${desc}`;
      })
      .join('。');

    const speechText = `${cityName}。${cityQuote}。${cardsSummary}`;
    speakText(speechText, lang, () => setIsSpeaking(false));
  };

  const handleNextCity = () => {
    stopSpeaking();
    setIsSpeaking(false);
    if (soundEnabled) playClickSound();
    setSelectedIdx(i => (i + 1) % CHINA_CITIES.length);
    setActiveTab('fact');
    setSelectedOpt(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const handlePrevCity = () => {
    stopSpeaking();
    setIsSpeaking(false);
    if (soundEnabled) playClickSound();
    setSelectedIdx(i => (i - 1 + CHINA_CITIES.length) % CHINA_CITIES.length);
    setActiveTab('fact');
    setSelectedOpt(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const handleStampPassport = () => {
    if (isCityStamped) return;
    if (soundEnabled) playCorrectSound();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#ec4899'],
    });
    const updated = [...stampedCities, currentCity.id];
    setStampedCities(updated);
    try {
      localStorage.setItem('mariners_china_stamps', JSON.stringify(updated));
    } catch {}
  };

  const handleSelectQuizOption = (idx: number) => {
    if (isAnswered) return;
    if (soundEnabled) playClickSound();
    setSelectedOpt(idx);
  };

  const handleCheckQuiz = () => {
    if (selectedOpt === null) return;

    if (selectedOpt === quizData.correctIndex) {
      setIsCorrect(true);
      setIsAnswered(true);
      if (soundEnabled) playCorrectSound();

      if (!stampedCities.includes(currentCity.id)) {
        const updated = [...stampedCities, currentCity.id];
        setStampedCities(updated);
        try {
          localStorage.setItem('mariners_china_stamps', JSON.stringify(updated));
        } catch {}
      }

      if (!isBadgeUnlocked) {
        triggerBadgeUnlockConfetti();
        onUnlockBadge(currentCity.id, 2);
      } else {
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'],
        });
      }
    } else {
      setIsCorrect(false);
      setIsAnswered(true);
      if (soundEnabled) playClueSound();
    }
  };

  const unlockedCount = unlockedBadges.filter(id => CHINA_CITIES.some(c => c.id === id)).length;
  const stampsCount = Array.from(new Set([...stampedCities, ...unlockedBadges.filter(id => CHINA_CITIES.some(c => c.id === id))])).length;

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-4 animate-in fade-in duration-300">
      {/* Top Banner & Mode Switcher (Visible in grid & map modes) */}
      {viewMode !== 'fact' && (
        <>
          <div className="bg-white comic-box rounded-2xl p-4 md:p-5 mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl">🏮</span>
                <h1 className="font-comic text-xl sm:text-2xl font-black text-slate-900 tracking-wide">
                  {t.title}
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {lang === 'zh'
                  ? '点击任意名城卡片翻开精彩图解画册，或切换手绘地图探险，答题赢取华夏勋章！'
                  : lang === 'fr'
                  ? 'Découvrez les 12 cartes illustrées ou la carte peinte, et gagnez des badges !'
                  : 'Tap any city picture card to explore, or switch to the pictorial map!'}
              </p>
            </div>

            {/* Badges & Stamps Tracker Pill */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-2 bg-red-50 border-2 border-red-300 px-3 py-1.5 rounded-xl">
                <span className="text-xl">🏆</span>
                <div>
                  <div className="font-comic text-[11px] font-bold text-red-950">
                    {lang === 'fr' ? 'Badges' : lang === 'zh' ? '名胜勋章' : 'Badges'}
                  </div>
                  <div className="text-xs font-black text-red-600">
                    {unlockedCount} / {CHINA_CITIES.length}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-amber-50 border-2 border-amber-300 px-3 py-1.5 rounded-xl">
                <span className="text-xl">💮</span>
                <div>
                  <div className="font-comic text-[11px] font-bold text-amber-950">
                    {lang === 'fr' ? 'Tampons' : lang === 'zh' ? '护照印章' : 'Stamps'}
                  </div>
                  <div className="text-xs font-black text-amber-600">
                    {stampsCount} / {CHINA_CITIES.length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Primary View Switcher: Picture Book Grid vs Illustrated Map */}
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (soundEnabled) playClickSound();
                  setViewMode('grid');
                }}
                className={`comic-btn px-4 py-2 rounded-xl font-comic text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-red-600 text-white shadow-comic'
                    : 'bg-white hover:bg-slate-100 text-slate-800 border-2 border-slate-900'
                }`}
              >
                <LayoutGrid size={16} />
                <span>{lang === 'zh' ? '🖼️ 12名城图解画册' : '12-City Picture Book'}</span>
              </button>

              <button
                onClick={() => {
                  if (soundEnabled) playClickSound();
                  setViewMode('map');
                }}
                className={`comic-btn px-4 py-2 rounded-xl font-comic text-xs sm:text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
                  viewMode === 'map'
                    ? 'bg-sky-500 text-white shadow-comic'
                    : 'bg-white hover:bg-slate-100 text-slate-800 border-2 border-slate-900'
                }`}
              >
                <MapIcon size={16} />
                <span>{lang === 'zh' ? '🗺️ 手绘探险大地图' : 'Pictorial Map'}</span>
              </button>
            </div>

            {/* Region Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', labelEn: 'All (12)', labelZh: '全部 (12)' },
                { id: 'north', labelEn: 'North', labelZh: '华北' },
                { id: 'east', labelEn: 'East', labelZh: '华东' },
                { id: 'southwest', labelEn: 'Southwest', labelZh: '西南' },
                { id: 'northwest', labelEn: 'Northwest', labelZh: '西北' },
                { id: 'south', labelEn: 'South', labelZh: '华南' },
              ].map(reg => {
                const isAct = selectedRegion === reg.id;
                const lbl = lang === 'zh' ? reg.labelZh : reg.labelEn;
                return (
                  <button
                    key={reg.id}
                    onClick={() => {
                      if (soundEnabled) playClickSound();
                      setSelectedRegion(reg.id as any);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-comic text-xs font-bold transition-all cursor-pointer ${
                      isAct
                        ? 'bg-slate-900 text-white'
                        : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-300'
                    }`}
                  >
                    {lbl}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* MODE 1: 12-CITY PICTURE BOOK GRID (DEFAULT VIEW) */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-200">
          {filteredCities.map((city, idx) => {
            const isUnlocked = unlockedBadges.includes(city.id);
            const isStamped = stampedCities.includes(city.id) || isUnlocked;
            const cName = lang === 'fr' ? city.nameFr : lang === 'zh' ? city.nameZh : city.nameEn;
            const cLandmark = lang === 'fr' ? city.landmarkFr : lang === 'zh' ? city.landmarkZh : city.landmarkEn;
            const cProvince = lang === 'fr' ? city.provinceFr : lang === 'zh' ? city.provinceZh : city.provinceEn;
            const quote = lang === 'fr' ? city.famousQuoteFr : lang === 'zh' ? city.famousQuoteZh : city.famousQuoteEn;

            return (
              <div
                key={city.id}
                onClick={() => handleOpenCity(city)}
                className="group relative bg-white comic-box rounded-2xl p-4 flex flex-col justify-between hover:translate-y-[-2px] transition-all cursor-pointer border-2 border-slate-900"
              >
                <div>
                  {/* Card Header with Icon, Name, and Stamp status */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenStickerModal(city);
                        }}
                        title={lang === 'zh' ? '点击查看冷知识' : 'Click sticker for Fun Fact!'}
                        className="text-3xl sm:text-4xl p-1 bg-amber-50 border-2 border-slate-900 rounded-xl shadow-comic-sm group-hover:scale-110 active:scale-95 transition-transform cursor-pointer relative"
                      >
                        <span>{city.icon}</span>
                        <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 text-[10px] rounded-full border border-slate-900 px-0.5 shadow-xs">
                          💡
                        </span>
                      </button>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-comic text-base font-black text-slate-900">
                            {cName}
                          </h3>
                          <span className="text-[10px] font-bold text-red-700 bg-red-100 px-1.5 py-0.2 rounded border border-red-200">
                            {cProvince}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-600 truncate max-w-[170px]">
                          {cLandmark}
                        </p>
                      </div>
                    </div>

                    {/* Stamp Indicator */}
                    <div
                      className={`w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isStamped
                          ? 'border-red-600 bg-red-50 text-red-600 shadow-sm'
                          : 'border-dashed border-slate-300 bg-slate-50 text-slate-300'
                      }`}
                      title={isStamped ? '已盖章' : '待盖章'}
                    >
                      <span className="text-sm font-black">{isStamped ? '💮' : '🔒'}</span>
                    </div>
                  </div>

                  {/* Catchy 1-line Motto / Visual Highlights Preview */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 mb-3 text-xs text-slate-700 font-medium">
                    <div className="italic text-slate-800 font-comic font-bold line-clamp-1 mb-1.5">
                      📜 {quote}
                    </div>

                    {/* 3 mini snapshot tags */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {city.visualCards.map((vc, vIdx) => (
                        <span
                          key={vIdx}
                          className="text-[10px] font-comic font-bold bg-white border border-slate-300 px-2 py-0.5 rounded-md text-slate-700 flex items-center gap-1 shadow-2xs"
                        >
                          <span>{vc.icon}</span>
                          <span>{lang === 'zh' ? vc.titleZh : vc.titleEn}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500">
                    {isUnlocked ? '🏅 勋章已获取' : '⭐ 答题领勋章 (+2🌟)'}
                  </span>
                  <div className="font-comic text-xs font-black text-red-600 group-hover:text-red-500 flex items-center gap-0.5">
                    <span>翻开画册</span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODE 2: 2D ILLUSTRATED PICTORIAL MAP */}
      {viewMode === 'map' && (
        <div className="animate-in fade-in duration-200">
          <ChinaIllustratedMap
            lang={lang}
            soundEnabled={soundEnabled}
            unlockedBadges={unlockedBadges}
            selectedCity={currentCity}
            onSelectCity={(city, enterDetails = false) => {
              const idx = CHINA_CITIES.findIndex(c => c.id === city.id);
              if (idx !== -1) setSelectedIdx(idx);
              if (enterDetails) {
                handleOpenCity(city);
              }
            }}
            onCityStickerClick={handleOpenStickerModal}
          />
        </div>
      )}

      {/* MODE 3: FOCUSED CITY PICTURE BOOK DETAILS & TRIVIA QUIZ */}
      {viewMode === 'fact' && (
        <div className="animate-in fade-in zoom-in-95 duration-200">
          {/* Top Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                stopSpeaking();
                setIsSpeaking(false);
                setViewMode(previousViewMode);
              }}
              className="comic-btn px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-comic text-xs font-bold rounded-xl flex items-center gap-2 shadow-comic transition-all cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>{previousViewMode === 'map' ? '返回手绘地图' : '返回12名城画册'}</span>
            </button>

            {/* City Carousel Pager */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevCity}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 border-2 border-slate-900 shadow-comic transition-all cursor-pointer"
                title="Previous City"
              >
                <ArrowLeft size={16} />
              </button>
              <div className="px-3.5 py-1.5 bg-white border-2 border-slate-900 rounded-xl font-comic text-xs font-bold text-slate-900 shadow-comic flex items-center gap-1.5">
                <span>{currentCity.icon}</span>
                <span>{cityName}</span>
                <span className="text-slate-400">({selectedIdx + 1}/{CHINA_CITIES.length})</span>
              </div>
              <button
                onClick={handleNextCity}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 border-2 border-slate-900 shadow-comic transition-all cursor-pointer"
                title="Next City"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Sub Tab Switcher: Picture Discovery vs Badge Quiz */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setActiveTab('fact');
              }}
              className={`flex-1 py-2.5 rounded-xl font-comic text-xs sm:text-sm font-bold border-2 border-slate-900 transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'fact'
                  ? 'bg-red-600 text-white shadow-comic'
                  : 'bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span>🖼️</span>
              <span>{t.factCards}</span>
            </button>
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setActiveTab('quiz');
              }}
              className={`flex-1 py-2.5 rounded-xl font-comic text-xs sm:text-sm font-bold border-2 border-slate-900 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-amber-400 text-slate-950 shadow-comic'
                  : 'bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span>⭐</span>
              <span>{t.badgeQuiz}</span>
              {isBadgeUnlocked && <span className="text-emerald-700 text-xs font-black">✓</span>}
            </button>
          </div>

          {/* TAB 1: VISUAL PICTURE CARDS & PASSPORT STAMP */}
          {activeTab === 'fact' ? (
            <div className="space-y-4">
              {/* Bespoke Illustrated Cartoon Banner */}
              <ChinaIllustration city={currentCity} lang={lang} soundEnabled={soundEnabled} />

              {/* City Header + Speech Audio */}
              <div className="bg-white comic-box rounded-2xl p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl">{currentCity.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-comic text-xl sm:text-2xl font-black text-slate-900">
                          {cityName}
                        </h2>
                        <span className="text-[11px] font-bold text-red-700 bg-red-100 border border-red-300 px-2 py-0.5 rounded-lg">
                          📍 {cityProvince}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-600">
                        {cityLandmark}
                      </p>
                    </div>
                  </div>

                  {/* Audio Read-Aloud Button */}
                  <button
                    onClick={handleSpeakHighlights}
                    className={`comic-btn px-4 py-2 rounded-xl border-2 border-slate-900 font-comic text-xs font-bold flex items-center justify-center gap-2 shadow-comic transition-all cursor-pointer shrink-0 ${
                      isSpeaking ? 'bg-rose-500 text-white' : 'bg-amber-300 hover:bg-amber-200 text-slate-950'
                    }`}
                  >
                    {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    <span>{isSpeaking ? '停止声音' : '🔊 听语音讲解'}</span>
                  </button>
                </div>

                {/* Catchy 1-line Motto Pill */}
                <div className="bg-amber-50 border-2 border-amber-300 px-3.5 py-2 rounded-xl mb-4 font-comic text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-2">
                  <span className="text-base">📜</span>
                  <span>{cityQuote}</span>
                </div>

                {/* 3 VISUAL DISCOVERY PICTURE CARDS */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-lg">📸</span>
                    <h3 className="font-comic text-xs sm:text-sm font-black text-slate-900 tracking-wide uppercase">
                      {lang === 'zh' ? '三大看点 · 趣味快照' : lang === 'fr' ? '3 Instantanés Amusants' : '3 Fun Snapshot Cards'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {currentCity.visualCards.map((card, idx) => {
                      const cardTitle = lang === 'fr' ? card.titleFr : lang === 'zh' ? card.titleZh : card.titleEn;
                      const cardDesc = lang === 'fr' ? card.descFr : lang === 'zh' ? card.descZh : card.descEn;

                      return (
                        <div
                          key={idx}
                          className="p-3.5 rounded-2xl border-2 border-slate-900 bg-slate-50 hover:bg-white transition-all shadow-sm flex flex-col justify-between group hover:scale-[1.02]"
                        >
                          <div>
                            {/* Card Top: Big Emoji Badge */}
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-3xl p-1.5 bg-white border-2 border-slate-900 rounded-xl shadow-comic-sm">
                                {card.icon}
                              </span>
                              <span className={`text-[10px] font-comic font-bold px-2 py-0.5 rounded-lg border ${card.tagColor}`}>
                                #{idx + 1}
                              </span>
                            </div>

                            {/* Card Title */}
                            <h4 className="font-comic text-sm font-black text-slate-900 mb-1">
                              {cardTitle}
                            </h4>

                            {/* Punchy 1-Sentence Caption */}
                            <p className="text-xs text-slate-700 font-medium leading-relaxed">
                              {cardDesc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* KID'S EXPLORER TRAVEL PASSPORT STAMP SECTION */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    {/* Visual Stamp Seal */}
                    <div
                      className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-full border-4 flex flex-col items-center justify-center shrink-0 transition-transform ${
                        isCityStamped
                          ? 'border-red-600 bg-red-50 text-red-600 rotate-[-8deg] shadow-comic animate-in zoom-in-75'
                          : 'border-dashed border-slate-400 bg-slate-100 text-slate-400'
                      }`}
                    >
                      <span className="text-2xl">{currentCity.stampIcon}</span>
                      <span className="text-[8px] font-black tracking-tight leading-none">
                        {isCityStamped ? 'PASSPORT' : 'NOT STAMPED'}
                      </span>
                      {isCityStamped && (
                        <span className="absolute -top-1 -right-1 text-xs">✓</span>
                      )}
                    </div>

                    <div>
                      <div className="font-comic text-xs sm:text-sm font-black text-slate-900 flex items-center gap-2">
                        <span>💮 {cityStampText}</span>
                        {isCityStamped && (
                          <span className="text-[10px] bg-red-100 text-red-700 border border-red-300 px-1.5 py-0.2 rounded font-bold">
                            已盖章打卡
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">
                        {lang === 'zh'
                          ? '集齐12座名城旅行印章，成为华夏大地理博学家！'
                          : lang === 'fr'
                          ? 'Collectez les 12 tampons de voyage pour votre passeport d\'explorateur !'
                          : 'Collect all 12 city passport stamps on your cultural journey!'}
                      </p>
                    </div>
                  </div>

                  {/* Stamp / CTA Button */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {!isCityStamped ? (
                      <button
                        onClick={handleStampPassport}
                        className="comic-btn w-full sm:w-auto px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-comic text-xs font-black rounded-xl shadow-comic transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Stamp size={16} />
                        <span>{lang === 'fr' ? 'Tamponner le passeport !' : lang === 'zh' ? '盖上城市印章！' : 'Stamp Passport!'}</span>
                      </button>
                    ) : (
                      <div className="text-center font-comic text-xs font-black text-red-600 bg-white border border-red-200 px-3 py-2 rounded-xl">
                        ✨ 护照已打卡收藏
                      </div>
                    )}

                    <button
                      onClick={() => {
                        if (soundEnabled) playClickSound();
                        setActiveTab('quiz');
                      }}
                      className="comic-btn w-full sm:w-auto px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-comic text-xs font-black rounded-xl shadow-comic transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Award size={16} />
                      <span>{isBadgeUnlocked ? '答题满分 ➔' : `${t.takeQuiz} ➔`}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* TAB 2: VISUAL TRIVIA QUIZ & BADGE UNLOCK */
            <div className="bg-white comic-box rounded-2xl p-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🏮</span>
                <div>
                  <h3 className="font-comic text-base font-black text-slate-900">
                    {lang === 'fr' ? `Défi : ${cityName}` : lang === 'zh' ? `【${cityName}】趣味答题挑战` : `${cityName} Fun Quiz Challenge`}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    {lang === 'fr'
                      ? 'Répondez pour débloquer le badge et remporter 2 étoiles dorées !'
                      : lang === 'zh'
                      ? '选出正确答案，解锁专属城市荣誉徽章并赢取 2 颗黄金星星！'
                      : 'Pick the right answer to unlock this collectible badge and earn 2 Gold Stars!'}
                  </p>
                </div>
              </div>

              {/* Question Box */}
              <div className="my-4 p-4 rounded-xl bg-amber-50 border-2 border-slate-900 font-comic text-sm sm:text-base font-bold text-slate-900">
                {quizData.question}
              </div>

              {/* Options */}
              <div className="space-y-2.5 mb-5">
                {quizData.options.map((opt, idx) => {
                  const isSelected = selectedOpt === idx;
                  const isOptionCorrect = idx === quizData.correctIndex;

                  let optClasses = 'border-2 border-slate-900 bg-white hover:bg-slate-50 text-slate-800';
                  if (isAnswered) {
                    if (isOptionCorrect) {
                      optClasses = 'border-2 border-emerald-600 bg-emerald-100 text-emerald-950 font-bold';
                    } else if (isSelected && !isOptionCorrect) {
                      optClasses = 'border-2 border-rose-600 bg-rose-100 text-rose-950';
                    }
                  } else if (isSelected) {
                    optClasses = 'border-2 border-red-600 bg-red-100 text-red-950 font-bold shadow-comic';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizOption(idx)}
                      disabled={isAnswered}
                      className={`w-full p-3.5 rounded-xl font-comic text-xs sm:text-sm text-left transition-all flex items-start gap-3 cursor-pointer ${optClasses}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Check Answer Button / Feedback */}
              {!isAnswered ? (
                <button
                  onClick={handleCheckQuiz}
                  disabled={selectedOpt === null}
                  className={`comic-btn w-full py-3 rounded-xl font-comic text-sm font-black shadow-comic transition-all cursor-pointer ${
                    selectedOpt !== null
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-white'
                      : 'bg-slate-200 text-slate-400 border-2 border-slate-300 cursor-not-allowed'
                  }`}
                >
                  {lang === 'fr' ? 'Valider la réponse ➔' : lang === 'zh' ? '提交答案 · 验证成果 ➔' : 'Submit Answer ➔'}
                </button>
              ) : (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div
                    className={`p-4 rounded-xl border-2 flex items-start gap-3 ${
                      isCorrect
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                        : 'bg-rose-50 border-rose-500 text-rose-950'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 size={24} className="text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={24} className="text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-comic text-sm font-bold mb-1">
                        {isCorrect
                          ? lang === 'fr'
                            ? '🎉 Bravo, réponse exacte !'
                            : lang === 'zh'
                            ? '🎉 太棒了，回答完全正确！已为你盖上印章并颁发荣誉徽章！'
                            : '🎉 Splendid! That is correct!'
                          : lang === 'fr'
                          ? 'Presque ! Voici l\'explication :'
                          : lang === 'zh'
                          ? '差一点点！别灰心，来看看知识小卡片：'
                          : 'Not quite! Here is the explanation:'}
                      </div>
                      <p className="text-xs sm:text-sm font-medium leading-relaxed">
                        {quizData.explanation}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2.5">
                    <button
                      onClick={() => {
                        if (soundEnabled) playClickSound();
                        setSelectedOpt(null);
                        setIsAnswered(false);
                      }}
                      className="comic-btn flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-comic text-xs font-bold rounded-xl border-2 border-slate-900 shadow-comic cursor-pointer"
                    >
                      {lang === 'fr' ? 'Recommencer le quiz' : lang === 'zh' ? '重新作答' : 'Try Again'}
                    </button>
                    <button
                      onClick={handleNextCity}
                      className="comic-btn flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white font-comic text-xs font-bold rounded-xl shadow-comic cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>{lang === 'fr' ? 'Ville suivante ➔' : lang === 'zh' ? '看下一座名城图解 ➔' : 'Next City ➔'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* INTERACTIVE CITY STICKER FUN FACT MODAL */}
      {modalCity && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-lg bg-white border-3 border-slate-900 rounded-3xl comic-box shadow-comic p-4 sm:p-5 overflow-hidden max-h-[92vh] flex flex-col justify-between overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border-2 border-slate-900 flex items-center justify-center shadow-comic-sm cursor-pointer transition-transform active:scale-90"
              title={lang === 'zh' ? '关闭' : 'Close'}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 pr-10 mb-3">
              <span className="text-4xl p-2 bg-amber-100 border-2 border-slate-900 rounded-2xl shadow-comic-sm shrink-0">
                {modalCity.icon}
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-comic text-xl sm:text-2xl font-black text-slate-900">
                    {lang === 'fr' ? modalCity.nameFr : lang === 'zh' ? modalCity.nameZh : modalCity.nameEn}
                  </h3>
                  <span className="text-xs font-bold text-red-700 bg-red-100 border border-red-300 px-2 py-0.5 rounded-lg">
                    📍 {lang === 'fr' ? modalCity.provinceFr : lang === 'zh' ? modalCity.provinceZh : modalCity.provinceEn}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-600">
                  {lang === 'fr' ? modalCity.landmarkFr : lang === 'zh' ? modalCity.landmarkZh : modalCity.landmarkEn}
                </p>
              </div>
            </div>

            {/* Illustrated Artwork Canvas */}
            <div className="mb-3 rounded-2xl overflow-hidden border-2 border-slate-900 shadow-comic-sm">
              <ChinaIllustration city={modalCity} lang={lang} soundEnabled={soundEnabled} />
            </div>

            {/* Illustrated Fun Fact Callout Box */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-400 rounded-2xl p-3.5 sm:p-4 mb-3 shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 font-comic text-xs sm:text-sm font-black text-amber-950">
                  <span className="text-xl">💡</span>
                  <span>
                    {lang === 'fr' ? 'Le saviez-vous ?' : lang === 'zh' ? '趣味冷知识' : 'Illustrated Fun Fact'}
                  </span>
                </div>

                {/* TTS Read-Aloud Button */}
                <button
                  onClick={() => handleSpeakModalFunFact(modalCity)}
                  className={`comic-btn px-2.5 py-1 rounded-xl border border-slate-900 font-comic text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-all cursor-pointer ${
                    isModalSpeaking ? 'bg-rose-500 text-white' : 'bg-white hover:bg-amber-100 text-slate-900'
                  }`}
                  title={lang === 'zh' ? '朗读冷知识' : 'Listen to fun fact'}
                >
                  {isModalSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  <span>{isModalSpeaking ? (lang === 'zh' ? '停止' : 'Stop') : (lang === 'zh' ? '听语音' : 'Listen')}</span>
                </button>
              </div>

              {/* Fun Fact Story Text */}
              <p className="text-xs sm:text-sm text-slate-800 font-bold leading-relaxed mb-2.5">
                {lang === 'fr' ? modalCity.funFactFr : lang === 'zh' ? modalCity.funFactZh : modalCity.funFactEn}
              </p>

              {/* Poetic quote or wonder teaser */}
              <div className="text-[11px] text-amber-900 font-comic italic flex items-center gap-1.5 bg-white/80 p-2 rounded-xl border border-amber-200">
                <span className="text-base shrink-0">📜</span>
                <span className="line-clamp-1">
                  {lang === 'fr' ? modalCity.famousQuoteFr : lang === 'zh' ? modalCity.famousQuoteZh : modalCity.famousQuoteEn}
                </span>
              </div>
            </div>

            {/* Key Wonder Highlights preview tags */}
            <div className="flex items-center gap-1.5 flex-wrap mb-4">
              {modalCity.visualCards.map((vc, idx) => (
                <span
                  key={idx}
                  className={`text-[11px] font-comic font-bold px-2.5 py-1 rounded-xl border flex items-center gap-1.5 shadow-2xs ${vc.tagColor}`}
                >
                  <span>{vc.icon}</span>
                  <span>{lang === 'fr' ? vc.titleFr : lang === 'zh' ? vc.titleZh : vc.titleEn}</span>
                </span>
              ))}
            </div>

            {/* Modal Actions featuring 'Start Discovery' button */}
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-slate-200">
              <button
                onClick={handleCloseModal}
                className="comic-btn w-full sm:w-1/3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-comic text-xs font-bold rounded-xl border-2 border-slate-900 shadow-comic cursor-pointer transition-all"
              >
                {lang === 'fr' ? 'Fermer' : lang === 'zh' ? '稍后再看' : 'Close'}
              </button>

              <button
                onClick={() => handleStartDiscovery(modalCity)}
                className="comic-btn w-full sm:flex-1 py-3 px-4 bg-red-600 hover:bg-red-500 text-white font-comic text-sm font-black rounded-xl shadow-comic cursor-pointer transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Sparkles size={16} />
                <span>
                  {lang === 'fr'
                    ? 'Start Discovery ➔'
                    : lang === 'zh'
                    ? '开始探索 · Start Discovery ➔'
                    : 'Start Discovery ➔'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

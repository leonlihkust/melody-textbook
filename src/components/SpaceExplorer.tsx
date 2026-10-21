import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Orbit,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  BookOpen,
  Target,
  Trophy,
} from 'lucide-react';
import { CELESTIAL_BODIES, CelestialBody } from '../data/spaceData';
import { SolarSystem3D } from './SolarSystem3D';
import { SpaceIllustration } from './SpaceIllustration';
import { playCorrectSound, playClueSound, playClickSound, speakText, stopSpeaking } from '../utils/audio';
import { triggerBadgeUnlockConfetti } from '../utils/confettiExplosion';
import { Language, I18N } from '../utils/i18n';

interface SpaceExplorerProps {
  lang: Language;
  soundEnabled: boolean;
  unlockedBadges: string[];
  onUnlockBadge: (badgeId: string, starsEarned: number) => void;
}

export const SpaceExplorer: React.FC<SpaceExplorerProps> = ({
  lang,
  soundEnabled,
  unlockedBadges,
  onUnlockBadge,
}) => {
  const [viewMode, setViewMode] = useState<'orrery' | 'fact'>('orrery');
  const [selectedIdx, setSelectedIdx] = useState(3); // Default to Earth & Moon (index 3)
  const [activeTab, setActiveTab] = useState<'fact' | 'quiz'>('fact');
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const t = I18N[lang].space;
  const currentBody = CELESTIAL_BODIES[selectedIdx] || CELESTIAL_BODIES[3];
  const isBadgeUnlocked = unlockedBadges.includes(currentBody.id);

  // Localized text helpers
  const bodyName = lang === 'fr' ? currentBody.nameFr : lang === 'zh' ? currentBody.nameZh : currentBody.nameEn;
  const bodyTagline = lang === 'fr' ? currentBody.taglineFr : lang === 'zh' ? currentBody.taglineZh : currentBody.taglineEn;
  const bodyFunFact = lang === 'fr' ? currentBody.funFactFr : lang === 'zh' ? currentBody.funFactZh : currentBody.funFactEn;
  const bodyBadgeTitle = lang === 'fr' ? currentBody.badgeTitleFr : lang === 'zh' ? currentBody.badgeTitleZh : currentBody.badgeTitleEn;

  const quizQuestion = lang === 'fr' ? currentBody.quiz.questionFr : lang === 'zh' ? currentBody.quiz.questionZh : currentBody.quiz.questionEn;
  const quizExplanation = lang === 'fr' ? currentBody.quiz.explanationFr : lang === 'zh' ? currentBody.quiz.explanationZh : currentBody.quiz.explanationEn;

  // Shuffle quiz options dynamically
  const quizData = useMemo(() => {
    const q = currentBody.quiz;
    const rawOptions = lang === 'fr' ? q.optionsFr : lang === 'zh' ? q.optionsZh : q.optionsEn;
    const indices = q.optionsEn.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return {
      options: indices.map(i => rawOptions[i]),
      correctIndex: indices.indexOf(q.correctIndex),
    };
  }, [currentBody, lang]);

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakText(text, lang, () => setIsSpeaking(false));
  };

  const handleNextBody = () => {
    stopSpeaking();
    setIsSpeaking(false);
    if (soundEnabled) playClickSound();
    setSelectedIdx(i => (i + 1) % CELESTIAL_BODIES.length);
    setActiveTab('fact');
    setSelectedOpt(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const handlePrevBody = () => {
    stopSpeaking();
    setIsSpeaking(false);
    if (soundEnabled) playClickSound();
    setSelectedIdx(i => (i - 1 + CELESTIAL_BODIES.length) % CELESTIAL_BODIES.length);
    setActiveTab('fact');
    setSelectedOpt(null);
    setIsAnswered(false);
    setIsCorrect(false);
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

      if (!isBadgeUnlocked) {
        triggerBadgeUnlockConfetti();
        onUnlockBadge(currentBody.id, 2);
      } else {
        // Celebratory confetti burst
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#3b82f6', '#f59e0b', '#10b981'],
        });
      }
    } else {
      setIsCorrect(false);
      setIsAnswered(true);
      if (soundEnabled) playClueSound();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* MODE 1: 3D SOLAR SYSTEM ORRERY STAGE */}
      {viewMode === 'orrery' ? (
        <div className="animate-in fade-in duration-200">
          {/* Header Bar */}
          <div className="bg-white comic-box rounded-2xl p-4 md:p-5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🚀</span>
                <span className="font-comic text-xs font-bold uppercase tracking-wider text-purple-700">
                  {t.title}
                </span>
              </div>
              <h1 className="font-comic text-xl md:text-2xl font-extrabold text-slate-900 leading-tight">
                {lang === 'fr'
                  ? 'Voyage à travers le Système Solaire 3D !'
                  : lang === 'zh'
                  ? '3D 太阳系八大行星与深空航行！'
                  : 'Journey Through the 3D Solar System!'}
              </h1>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {t.subtitle}
              </p>
            </div>

            {/* Badges collected counter */}
            <div className="bg-purple-50 border-2 border-slate-900 rounded-xl px-3.5 py-2 flex items-center gap-2.5 shrink-0 comic-box-sm">
              <span className="text-xl">🎖️</span>
              <div>
                <div className="font-comic text-base font-bold text-slate-900 leading-tight">
                  {unlockedBadges.filter(b => CELESTIAL_BODIES.some(c => c.id === b)).length} / {CELESTIAL_BODIES.length}
                </div>
                <div className="text-[10px] font-semibold text-purple-700">
                  {t.earned}
                </div>
              </div>
            </div>
          </div>

          {/* 3D Solar System Canvas */}
          <div className="mb-4">
            <SolarSystem3D
              lang={lang}
              soundEnabled={soundEnabled}
              unlockedBadges={unlockedBadges}
              selectedBody={currentBody}
              onSelectBody={(body, enterDetails = false) => {
                const idx = CELESTIAL_BODIES.findIndex(b => b.id === body.id);
                if (idx !== -1) {
                  setSelectedIdx(idx);
                }
                if (enterDetails) {
                  if (soundEnabled) playClickSound();
                  setActiveTab('fact');
                  setSelectedOpt(null);
                  setIsAnswered(false);
                  setViewMode('fact');
                }
              }}
            />
          </div>

          {/* Prompt banner to start Trivia */}
          <div className="bg-white comic-box rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-halftone">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentBody.icon}</span>
              <div>
                <div className="font-comic text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>{bodyName}</span>
                  <span className="text-xs text-purple-800 bg-purple-100 border border-purple-300 px-2 py-0.5 rounded-lg">
                    📍 {currentBody.distanceFromSun}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {bodyTagline}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setActiveTab('fact');
                setSelectedOpt(null);
                setIsAnswered(false);
                setViewMode('fact');
              }}
              className="comic-btn w-full sm:w-auto px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-comic text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-comic transition-all cursor-pointer"
            >
              <BookOpen size={15} />
              <span>
                {lang === 'fr'
                  ? `Explorer ${bodyName} ➔`
                  : lang === 'zh'
                  ? `阅读【${bodyName}】常识与勋章答题 ➔`
                  : `Explore ${bodyName} Facts ➔`}
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* MODE 2: FOCUSED PLANETARY FACT & TRIVIA QUIZ */
        <div className="animate-in fade-in zoom-in-95 duration-200">
          {/* Top Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                stopSpeaking();
                setIsSpeaking(false);
                setViewMode('orrery');
              }}
              className="comic-btn px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-comic text-xs font-bold rounded-xl flex items-center gap-2 shadow-comic transition-all cursor-pointer"
            >
              <Orbit size={15} className="animate-spin-slow" />
              <span>
                {lang === 'fr'
                  ? '⬅️ Retour au Planétaire 3D'
                  : lang === 'zh'
                  ? '⬅️ 返回 3D 太阳系'
                  : '⬅️ Back to 3D Solar System'}
              </span>
            </button>

            {/* Planetary Carousel Controls */}
            <div className="flex items-center gap-1.5 bg-white comic-box rounded-xl p-1">
              <button
                onClick={handlePrevBody}
                className="comic-btn p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 cursor-pointer"
                title="Previous Celestial Body"
              >
                <ArrowLeft size={16} />
              </button>
              <span className="font-comic text-xs font-bold px-2 text-slate-800">
                {selectedIdx + 1} / {CELESTIAL_BODIES.length}
              </span>
              <button
                onClick={handleNextBody}
                className="comic-btn p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 cursor-pointer"
                title="Next Celestial Body"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Focused Planetary Card */}
          <div className="bg-white comic-box-lg rounded-3xl p-6 md:p-8 relative bg-halftone shadow-comic">
            {/* Header: Icon, Name, Badges, Tab Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b-2 border-slate-200">
              <div className="flex items-center gap-3.5">
                <span className="text-4xl md:text-5xl drop-shadow-sm">
                  {currentBody.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-comic text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                      {bodyName}
                    </h2>
                    {isBadgeUnlocked && (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-100 border border-emerald-400 font-comic text-xs font-bold text-emerald-800 shadow-sm">
                        <Sparkles size={12} />
                        {t.earned}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5 flex items-center gap-2">
                    <span>📍 {currentBody.distanceFromSun}</span>
                    <span>·</span>
                    <span className="text-purple-700 font-bold">{bodyTagline}</span>
                  </div>
                </div>
              </div>

              {/* Tab Switcher: Fun Fact vs Cosmic Quiz */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-300">
                <button
                  onClick={() => {
                    if (soundEnabled) playClickSound();
                    setActiveTab('fact');
                  }}
                  className={`px-3 py-1.5 rounded-lg font-comic text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    activeTab === 'fact'
                      ? 'bg-amber-300 text-slate-900 shadow-sm border border-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookOpen size={13} />
                  <span>{t.funFacts}</span>
                </button>
                <button
                  onClick={() => {
                    if (soundEnabled) playClickSound();
                    setActiveTab('quiz');
                  }}
                  className={`px-3 py-1.5 rounded-lg font-comic text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    activeTab === 'quiz'
                      ? 'bg-purple-600 text-white shadow-sm border border-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Target size={13} />
                  <span>{t.badgeQuiz}</span>
                </button>
              </div>
            </div>

            {/* TAB 1: FUN FACT */}
            {activeTab === 'fact' && (
              <div className="animate-in fade-in">
                {/* Audio Read-Aloud Button */}
                <div className="flex justify-end mb-3">
                  <button
                    onClick={() => handleSpeak(bodyFunFact)}
                    className={`comic-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      isSpeaking
                        ? 'bg-amber-400 text-slate-900 ring-2 ring-slate-900'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                    title="Listen to pronunciation"
                  >
                    {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    <span>{isSpeaking ? 'Stop' : '🔊 Audio'}</span>
                  </button>
                </div>

                {/* Celestial Illustration Graphic */}
                <div className="mb-4">
                  <SpaceIllustration body={currentBody} lang={lang} />
                </div>

                {/* Key Metrics Quick Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5 text-center">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">{lang === 'fr' ? 'Diamètre' : lang === 'zh' ? '直径' : 'Diameter'}</div>
                    <div className="font-comic text-xs sm:text-sm font-bold text-slate-900">
                      Ø {currentBody.diameterKm.toLocaleString()} km
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">{lang === 'fr' ? 'Température' : lang === 'zh' ? '表面温度' : 'Temperature'}</div>
                    <div className="font-comic text-xs sm:text-sm font-bold text-slate-900">
                      {currentBody.temperature}
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">{lang === 'fr' ? 'Orbite' : lang === 'zh' ? '公转周期' : 'Orbit Period'}</div>
                    <div className="font-comic text-xs sm:text-sm font-bold text-slate-900">
                      {currentBody.orbitalPeriod}
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">{lang === 'fr' ? 'Lunes' : lang === 'zh' ? '卫星数量' : 'Moons'}</div>
                    <div className="font-comic text-xs sm:text-sm font-bold text-slate-900">
                      {currentBody.moonsCount}
                    </div>
                  </div>
                </div>

                {/* Fun Fact Box */}
                <div className="bg-purple-50/90 border-2 border-slate-900 rounded-3xl p-5 md:p-6 shadow-comic relative mb-5">
                  <span className="absolute -top-3 left-5 bg-purple-500 border-2 border-slate-900 text-white px-3 py-0.5 rounded-full font-comic text-xs font-bold uppercase tracking-wider">
                    🌟 {t.funFacts}
                  </span>

                  <p className="font-comic text-base md:text-lg font-extrabold text-slate-900 leading-relaxed mt-1">
                    {bodyFunFact}
                  </p>
                </div>

                {/* Start Quiz Action Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      if (soundEnabled) playClickSound();
                      setActiveTab('quiz');
                      setSelectedOpt(null);
                      setIsAnswered(false);
                    }}
                    className="comic-btn px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-comic text-xs font-bold rounded-2xl flex items-center gap-2 shadow-comic transition-all cursor-pointer"
                  >
                    <Trophy size={16} />
                    <span>{t.takeQuiz} ➔</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: COSMIC BADGE TRIVIA QUIZ */}
            {activeTab === 'quiz' && (
              <div className="animate-in fade-in">
                {/* Badge Trophy Banner */}
                <div className="bg-gradient-to-r from-purple-100 via-amber-50 to-purple-100 border-2 border-slate-900 rounded-2xl p-4 mb-5 flex items-center justify-between gap-4 comic-box-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-xl bg-amber-400 border-2 border-slate-900 flex items-center justify-center text-2xl comic-box-sm shrink-0">
                      {currentBody.icon}
                    </span>
                    <div>
                      <div className="font-comic text-xs font-bold uppercase tracking-wider text-purple-900">
                        {isBadgeUnlocked ? `🎉 ${t.earned}` : `🔒 ${t.locked}`}
                      </div>
                      <div className="font-comic text-base font-extrabold text-slate-900">
                        {bodyBadgeTitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 px-3 py-1 bg-amber-200 border border-amber-400 rounded-xl font-comic text-xs font-bold text-amber-950 shrink-0">
                    <span>⭐</span>
                    <span>+2 Stars</span>
                  </div>
                </div>

                {/* Question Box */}
                <div className="mb-5">
                  <h3 className="font-comic text-lg md:text-xl font-extrabold text-slate-900 leading-snug mb-2">
                    {quizQuestion}
                  </h3>
                </div>

                {/* 4 Choices */}
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {quizData.options.map((opt, i) => {
                    const isSelected = selectedOpt === i;
                    const isCorrectOption = isAnswered && i === quizData.correctIndex;
                    const isWrongSelection = isAnswered && isSelected && !isCorrect;

                    let btnStyle = 'bg-white hover:bg-purple-50 border-slate-900 text-slate-900';
                    if (isSelected && !isAnswered) {
                      btnStyle = 'bg-amber-300 ring-2 ring-slate-900 shadow-comic';
                    } else if (isCorrectOption) {
                      btnStyle = 'bg-emerald-300 border-emerald-900 text-emerald-950 font-bold';
                    } else if (isWrongSelection) {
                      btnStyle = 'bg-rose-200 border-rose-800 text-rose-950 opacity-80';
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleSelectQuizOption(i)}
                        disabled={isAnswered && isCorrect}
                        className={`comic-btn p-3.5 rounded-2xl text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-comic text-xs font-bold flex items-center justify-center shrink-0">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="font-comic text-sm font-bold leading-snug">
                            {opt}
                          </span>
                        </div>

                        {isCorrectOption && (
                          <CheckCircle2 size={20} className="text-emerald-700 shrink-0" />
                        )}
                        {isWrongSelection && (
                          <XCircle size={20} className="text-rose-700 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Solution Breakdown */}
                {isAnswered && (
                  <div
                    className={`mb-6 p-4 rounded-2xl border-2 animate-in fade-in ${
                      isCorrect ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-100 border-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1 text-sm font-comic font-bold">
                      {isCorrect ? (
                        <span className="text-emerald-800 flex items-center gap-1">
                          <Sparkles size={16} />
                          <span>{lang === 'fr' ? 'Fantastique ! Réponse correcte !' : lang === 'zh' ? '太棒了！答对啦！' : 'Brilliant, Explorer! Correct!'}</span>
                        </span>
                      ) : (
                        <span className="text-slate-800">
                          {lang === 'fr' ? 'Explication scientifique :' : lang === 'zh' ? '科学常识小结：' : 'Scientific Insight:'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-800 font-medium leading-relaxed">
                      {quizExplanation}
                    </p>
                  </div>
                )}

                {/* Bottom Action Button */}
                <div className="flex items-center justify-between pt-2 border-t-2 border-slate-200">
                  <button
                    onClick={() => {
                      if (soundEnabled) playClickSound();
                      setActiveTab('fact');
                    }}
                    className="comic-btn px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    {lang === 'fr' ? '← Revoir la leçon' : lang === 'zh' ? '← 返回常识卡' : '← Back to Facts'}
                  </button>

                  <div>
                    {!isAnswered ? (
                      <button
                        onClick={handleCheckQuiz}
                        disabled={selectedOpt === null}
                        className="comic-btn px-6 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-900 font-comic font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-comic cursor-pointer"
                      >
                        <span>{lang === 'fr' ? 'Valider la réponse ➔' : lang === 'zh' ? '提交答案 ➔' : 'Submit Answer ➔'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleNextBody}
                        className="comic-btn px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-comic font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-comic cursor-pointer"
                      >
                        <span>{lang === 'fr' ? 'Astre suivant ➔' : lang === 'zh' ? '探索下一个星球 ➔' : 'Next Celestial Body ➔'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

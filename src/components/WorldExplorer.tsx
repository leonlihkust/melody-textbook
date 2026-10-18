import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, Sparkles, Globe, Compass, ArrowLeft, ArrowRight, CheckCircle2, XCircle, Award, BookOpen, Target } from 'lucide-react';
import { WorldCountry, WORLD_COUNTRIES } from '../data/worldData';
import { COUNTRY_LANDMARKS } from '../data/landmarkData';
import { CountryIllustration } from './CountryIllustration';
import { Globe3D } from './Globe3D';
import { playCorrectSound, playClueSound, playClickSound, speakEnglish, stopSpeaking } from '../utils/audio';

interface WorldExplorerProps {
  lang: 'en' | 'zh';
  soundEnabled: boolean;
  unlockedBadges: string[];
  onUnlockBadge: (badgeId: string, starsEarned: number) => void;
}

export const WorldExplorer: React.FC<WorldExplorerProps> = ({
  lang,
  soundEnabled,
  unlockedBadges,
  onUnlockBadge,
}) => {
  // Main view mode: 'globe' (3D Interactive Earth) vs 'fact' (Focused Kid-Friendly Fun Fact & Quiz)
  const [viewMode, setViewMode] = useState<'globe' | 'fact'>('globe');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'fact' | 'quiz'>('fact');
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const filteredCountries = useMemo(() => {
    return categoryFilter === 'All'
      ? WORLD_COUNTRIES
      : WORLD_COUNTRIES.filter(c => c.category === categoryFilter);
  }, [categoryFilter]);

  const currentCountry = filteredCountries[selectedIdx] || filteredCountries[0];
  const isBadgeUnlocked = unlockedBadges.includes(currentCountry.id);
  const currentLandmark = COUNTRY_LANDMARKS[currentCountry.id];

  // Dynamic shuffle for trivia options so answers are randomly balanced across A, B, C, D
  const quizData = useMemo(() => {
    const q = currentCountry.quiz;
    const indices = q.optionsEn.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return {
      optionsEn: indices.map(i => q.optionsEn[i]),
      optionsZh: indices.map(i => q.optionsZh[i]),
      correctIndex: indices.indexOf(q.correctIndex),
    };
  }, [currentCountry]);

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakEnglish(text, () => setIsSpeaking(false));
  };

  const handleNextCountry = () => {
    stopSpeaking();
    setIsSpeaking(false);
    if (soundEnabled) playClickSound();
    setSelectedIdx(i => (i + 1) % filteredCountries.length);
    setActiveTab('fact');
    setSelectedOpt(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const handlePrevCountry = () => {
    stopSpeaking();
    setIsSpeaking(false);
    if (soundEnabled) playClickSound();
    setSelectedIdx(i => (i - 1 + filteredCountries.length) % filteredCountries.length);
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

      // Confetti for trivia victory!
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
      });

      if (!isBadgeUnlocked) {
        onUnlockBadge(currentCountry.id, 2);
      }
    } else {
      setIsCorrect(false);
      setIsAnswered(true);
      if (soundEnabled) playClueSound();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* =========================================================================
          MODE 1: 3D EARTH GLOBE STAGE (Full focus on 3D, zero text clutter)
          ========================================================================= */}
      {viewMode === 'globe' ? (
        <div className="animate-in fade-in duration-200">
          {/* Friendly Minimalist Top Bar */}
          <div className="bg-white comic-box-lg rounded-3xl p-5 md:p-6 mb-5 bg-halftone-gold flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🌍</span>
                <span className="font-comic text-xs font-bold uppercase tracking-wider text-amber-800">
                  {lang === 'zh' ? '水手 3D 航海地球仪' : 'Mariner 3D Globe Explorer'}
                </span>
              </div>
              <h1 className="font-comic text-xl md:text-2xl font-extrabold text-slate-900 leading-tight">
                {lang === 'zh' ? '点击地球上的国家与标志性地标！' : 'Spin the Globe & Tap Countries or Landmarks!'}
              </h1>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {lang === 'zh'
                  ? '拖动旋转地球，点击任意国家或地标开启神奇冷知识探险！'
                  : 'Rotate the globe, find landmarks, and tap to discover fun facts!'}
              </p>
            </div>

            {/* Badges collected counter */}
            <div className="bg-white comic-box rounded-2xl px-4 py-3 flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-lg shadow-sm">
                🎖️
              </div>
              <div>
                <div className="font-comic text-base font-bold text-slate-900 leading-tight">
                  {unlockedBadges.length} / {WORLD_COUNTRIES.length}
                </div>
                <div className="text-[10px] font-semibold text-slate-500">
                  {lang === 'zh' ? '已点亮勋章' : 'Badges Earned'}
                </div>
              </div>
            </div>
          </div>

          {/* 3D Interactive Globe Canvas */}
          <div className="mb-4">
            <Globe3D
              lang={lang}
              soundEnabled={soundEnabled}
              unlockedBadges={unlockedBadges}
              selectedCountry={currentCountry}
              onSelectCountry={country => {
                const idx = filteredCountries.findIndex(c => c.id === country.id);
                if (idx !== -1) {
                  setSelectedIdx(idx);
                }
                // Transition directly to the focused Fun Fact card and hide 3D world!
                if (soundEnabled) playClickSound();
                setActiveTab('fact');
                setSelectedOpt(null);
                setIsAnswered(false);
                setViewMode('fact');
              }}
            />
          </div>

          {/* Prompt banner to start Fun Fact */}
          <div className="bg-white comic-box rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-halftone">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentCountry.flag}</span>
              <div>
                <div className="font-comic text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>{lang === 'zh' ? currentCountry.nameZh : currentCountry.nameEn}</span>
                  {currentLandmark && (
                    <span className="text-xs text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-lg">
                      {currentLandmark.icon} {lang === 'zh' ? currentLandmark.shortNameZh : currentLandmark.shortNameEn}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {lang === 'zh' ? currentCountry.taglineZh : currentCountry.taglineEn}
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
              className="comic-btn w-full sm:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-comic text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-comic transition-all"
            >
              <BookOpen size={15} />
              <span>
                {lang === 'zh'
                  ? `阅读【${currentCountry.nameZh}】冷知识与问答 ➔`
                  : `Explore ${currentCountry.nameEn} Fun Fact ➔`}
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* =========================================================================
           MODE 2: FOCUSED FUN FACT & QUIZ (3D World is completely HIDDEN, text is concise!)
           ========================================================================= */
        <div className="animate-in fade-in zoom-in-95 duration-200">
          {/* Top Navigation Bar: Back to Globe button + Country switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                stopSpeaking();
                setIsSpeaking(false);
                setViewMode('globe');
              }}
              className="comic-btn px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-comic text-xs font-bold rounded-xl flex items-center gap-2 shadow-comic transition-all"
            >
              <Globe size={15} className="animate-spin-slow" />
              <span>{lang === 'zh' ? '⬅️ 返回 3D 地球仪' : '⬅️ Back to 3D Globe'}</span>
            </button>

            {/* Country Carousel Controls */}
            <div className="flex items-center gap-1.5 bg-white comic-box rounded-xl p-1">
              <button
                onClick={handlePrevCountry}
                className="comic-btn p-1.5 rounded-lg hover:bg-slate-100 text-slate-700"
                title="Previous Country"
              >
                <ArrowLeft size={16} />
              </button>
              <span className="font-comic text-xs font-bold px-2 text-slate-800">
                {selectedIdx + 1} / {filteredCountries.length}
              </span>
              <button
                onClick={handleNextCountry}
                className="comic-btn p-1.5 rounded-lg hover:bg-slate-100 text-slate-700"
                title="Next Country"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Focused Fun Fact Card */}
          <div className="bg-white comic-box-lg rounded-3xl p-6 md:p-8 relative bg-halftone shadow-comic">
            {/* Header: Flag, Country Name, Badges, Tab Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b-2 border-slate-200">
              <div className="flex items-center gap-3.5">
                <span className="text-4xl md:text-5xl drop-shadow-sm">
                  {currentCountry.flag}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-comic text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                      {lang === 'zh' ? currentCountry.nameZh : currentCountry.nameEn}
                    </h2>
                    {isBadgeUnlocked && (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-100 border border-emerald-400 font-comic text-xs font-bold text-emerald-800 shadow-sm">
                        <Sparkles size={12} />
                        {lang === 'zh' ? '勋章已获得' : 'Badge Unlocked'}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5 flex items-center gap-2">
                    <span>📍 {lang === 'zh' ? `首都：${currentCountry.capitalZh}` : `Capital: ${currentCountry.capitalEn}`}</span>
                    <span>·</span>
                    <span className="text-blue-600 font-bold">{lang === 'zh' ? currentCountry.taglineZh : currentCountry.taglineEn}</span>
                  </div>
                </div>
              </div>

              {/* Tab Switcher: Fun Fact vs Trivia Quiz */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-300">
                <button
                  onClick={() => {
                    if (soundEnabled) playClickSound();
                    setActiveTab('fact');
                  }}
                  className={`px-3 py-1.5 rounded-lg font-comic text-xs font-bold transition-all flex items-center gap-1 ${
                    activeTab === 'fact'
                      ? 'bg-amber-300 text-slate-900 shadow-sm border border-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookOpen size={13} />
                  <span>{lang === 'zh' ? '神奇冷知识' : 'Fun Fact'}</span>
                </button>
                <button
                  onClick={() => {
                    if (soundEnabled) playClickSound();
                    setActiveTab('quiz');
                  }}
                  className={`px-3 py-1.5 rounded-lg font-comic text-xs font-bold transition-all flex items-center gap-1 ${
                    activeTab === 'quiz'
                      ? 'bg-blue-600 text-white shadow-sm border border-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Target size={13} />
                  <span>{lang === 'zh' ? '问答赢勋章' : 'Trivia Quiz'}</span>
                </button>
              </div>
            </div>

            {/* TAB 1: BITE-SIZED FUN FACT (Short, punchy, kid-friendly) */}
            {activeTab === 'fact' && (
              <div className="animate-in fade-in">
                {/* Audio Read-Aloud Button */}
                <div className="flex justify-end mb-3">
                  <button
                    onClick={() => handleSpeak(currentCountry.funFactEn)}
                    className={`comic-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      isSpeaking ? 'bg-amber-400 text-slate-900 ring-2 ring-slate-900' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                    title="Listen to English pronunciation"
                  >
                    {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    <span>{isSpeaking ? 'Stop Audio' : '🔊 英文朗读 (Read Aloud)'}</span>
                  </button>
                </div>

                {/* Country Illustration Novel Graphic */}
                <div className="mb-4">
                  <CountryIllustration countryId={currentCountry.id} name={currentCountry.nameEn} lang={lang} />
                </div>

                {/* Single Bite-Sized Fun Fact Box */}
                <div className="bg-amber-50/90 border-2 border-slate-900 rounded-3xl p-5 md:p-6 shadow-comic relative mb-5">
                  <span className="absolute -top-3 left-5 bg-amber-400 border-2 border-slate-900 text-slate-900 px-3 py-0.5 rounded-full font-comic text-xs font-bold uppercase tracking-wider">
                    {lang === 'zh' ? '🌟 神奇冷知识 · Did You Know?' : '🌟 Fun Fact'}
                  </span>

                  <p className="font-comic text-base md:text-lg font-extrabold text-slate-900 leading-relaxed mb-2 mt-1">
                    {currentCountry.funFactEn}
                  </p>

                  {lang === 'zh' && (
                    <p className="text-sm md:text-base text-slate-700 font-semibold leading-relaxed pt-2 border-t border-amber-200">
                      {currentCountry.funFactZh}
                    </p>
                  )}
                </div>

                {/* Compact Landmark Highlight (Only 1 fun memorable sentence!) */}
                {currentLandmark && (
                  <div className="bg-slate-50 border-2 border-slate-800 rounded-2xl p-4 shadow-sm mb-5 flex items-start gap-3">
                    <span className="text-3xl p-2 bg-white rounded-xl border border-slate-200 shadow-sm shrink-0">
                      {currentLandmark.icon}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-comic text-sm font-extrabold text-slate-900">
                          {lang === 'zh' ? currentLandmark.nameZh : currentLandmark.nameEn}
                        </span>
                        <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md font-bold">
                          📍 {lang === 'zh' ? currentLandmark.cityZh : currentLandmark.cityEn}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        {lang === 'zh' ? currentLandmark.architecturalFactZh : currentLandmark.architecturalFactEn}
                      </p>
                    </div>
                  </div>
                )}

                {/* Call to action to take Quiz */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-blue-50 p-4 rounded-2xl border-2 border-blue-300 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🎖️</span>
                    <div>
                      <div className="font-comic text-sm font-bold text-blue-950">
                        {lang === 'zh' ? currentCountry.badgeTitleZh : currentCountry.badgeTitleEn}
                      </div>
                      <div className="text-xs text-blue-800 font-medium">
                        {lang === 'zh' ? '回答 1 道轻松趣味小问答，即可点亮该国探索勋章！' : 'Answer 1 quick fun trivia question to earn this badge!'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (soundEnabled) playClickSound();
                      setActiveTab('quiz');
                    }}
                    className="comic-btn w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-comic text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-comic whitespace-nowrap"
                  >
                    <span>{lang === 'zh' ? '前往有奖问答 ➔' : 'Take Trivia Quiz ➔'}</span>
                    <Target size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: TRIVIA QUIZ (1-Question Challenge) */}
            {activeTab === 'quiz' && (
              <div className="animate-in fade-in">
                <div className="mb-4">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wide flex items-center gap-1">
                    <Target size={14} />
                    <span>Trivia Challenge · {currentCountry.nameEn}</span>
                  </span>
                  <h3 className="font-comic text-lg md:text-xl font-extrabold text-slate-900 mt-1 leading-snug">
                    {currentCountry.quiz.questionEn}
                  </h3>
                  {lang === 'zh' && (
                    <p className="text-sm text-slate-600 mt-1 font-semibold">
                      {currentCountry.quiz.questionZh}
                    </p>
                  )}
                </div>

                {/* Shuffled Options */}
                <div className="grid grid-cols-1 gap-2.5 mb-5">
                  {quizData.optionsEn.map((optEn, i) => {
                    const optZh = quizData.optionsZh[i];
                    const isSelected = selectedOpt === i;
                    const isCorrectOption = isAnswered && i === quizData.correctIndex;
                    const isWrongSelection = isAnswered && isSelected && !isCorrect;

                    let style = 'bg-white hover:bg-slate-50 border-slate-900 text-slate-900';
                    if (isSelected && !isAnswered) {
                      style = 'bg-amber-300 ring-2 ring-slate-900 shadow-comic';
                    } else if (isCorrectOption) {
                      style = 'bg-emerald-300 border-emerald-900 text-emerald-950 font-bold';
                    } else if (isWrongSelection) {
                      style = 'bg-rose-200 border-rose-800 text-rose-950 opacity-80';
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleSelectQuizOption(i)}
                        disabled={isAnswered && isCorrect}
                        className={`comic-btn p-3.5 rounded-2xl text-left flex items-start gap-3 transition-all ${style}`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-comic text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <div className="flex-1">
                          <div className="font-comic font-bold text-sm leading-tight">
                            {optEn}
                          </div>
                          {lang === 'zh' && optZh !== optEn && (
                            <div className="text-xs text-slate-600 mt-0.5 font-medium">
                              {optZh}
                            </div>
                          )}
                        </div>
                        {isCorrectOption && (
                          <CheckCircle2 size={18} className="text-emerald-700 shrink-0 self-center" />
                        )}
                        {isWrongSelection && (
                          <XCircle size={18} className="text-rose-700 shrink-0 self-center" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Quiz Result / Explanation Box */}
                {isAnswered && (
                  <div
                    className={`mb-5 p-4 rounded-2xl border-2 ${
                      isCorrect ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-100 border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 font-comic text-sm font-bold">
                      {isCorrect ? (
                        <span className="text-emerald-800 flex items-center gap-1">
                          <Sparkles size={16} />
                          {lang === 'zh' ? '回答正确！勋章已盖入你的探索家护照！' : 'Correct! Official badge stamped into your passport!'}
                        </span>
                      ) : (
                        <span className="text-slate-700">
                          {lang === 'zh' ? '正确解答：' : 'Fact Explanation:'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-slate-800 font-medium leading-relaxed">
                      {currentCountry.quiz.explanationEn}
                    </p>
                    {lang === 'zh' && (
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {currentCountry.quiz.explanationZh}
                      </p>
                    )}
                  </div>
                )}

                {/* Submit or Next Button */}
                {!isAnswered ? (
                  <button
                    onClick={handleCheckQuiz}
                    disabled={selectedOpt === null}
                    className="w-full comic-btn py-3 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-900 font-comic font-bold text-sm rounded-xl shadow-comic"
                  >
                    {lang === 'zh' ? '提交答案 ➔' : 'Submit Answer ➔'}
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={handleNextCountry}
                      className="w-full sm:flex-1 comic-btn py-3 bg-blue-600 hover:bg-blue-500 text-white font-comic font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-comic"
                    >
                      <span>{lang === 'zh' ? '探索下一国家 ➔' : 'Explore Next Country ➔'}</span>
                      <ArrowRight size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('globe')}
                      className="w-full sm:w-auto comic-btn px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-comic font-bold text-sm rounded-xl flex items-center justify-center gap-1.5"
                    >
                      <Globe size={15} />
                      <span>{lang === 'zh' ? '返回地球仪' : 'Back to Globe'}</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Carousel Navigation */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t-2 border-slate-200">
              <button
                onClick={handlePrevCountry}
                className="comic-btn px-3.5 py-2 bg-slate-100 hover:bg-white text-slate-800 font-comic text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <ArrowLeft size={14} />
                <span>{lang === 'zh' ? '上一国家' : 'Previous'}</span>
              </button>

              <button
                onClick={() => setViewMode('globe')}
                className="comic-btn px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-comic text-xs font-bold rounded-xl flex items-center gap-1"
              >
                <Compass size={13} />
                <span>{lang === 'zh' ? '地球仪总览' : 'Globe View'}</span>
              </button>

              <button
                onClick={handleNextCountry}
                className="comic-btn px-3.5 py-2 bg-slate-100 hover:bg-white text-slate-800 font-comic text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <span>{lang === 'zh' ? '下一国家' : 'Next'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

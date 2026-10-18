import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, Award, ArrowLeft, ArrowRight, CheckCircle2, XCircle, Sparkles, Globe, Compass } from 'lucide-react';
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
  const [viewMode, setViewMode] = useState<'globe' | 'card'>('globe');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'fact' | 'quiz'>('fact');
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const filteredCountries = categoryFilter === 'All'
    ? WORLD_COUNTRIES
    : WORLD_COUNTRIES.filter(c => c.category === categoryFilter);

  const currentCountry = filteredCountries[selectedIdx] || filteredCountries[0];
  const isBadgeUnlocked = unlockedBadges.includes(currentCountry.id);

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

    if (selectedOpt === currentCountry.quiz.correctIndex) {
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
      {/* Passport Header Bar */}
      <div className="bg-white comic-box-lg rounded-3xl p-6 md:p-8 mb-6 bg-halftone-gold relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-2xl">🌍</span>
              <span className="font-comic text-xs font-bold uppercase tracking-wider text-amber-800">
                World Explorer Passport · 16 Nations
              </span>
              <span className="bg-amber-200/90 border border-amber-400 text-amber-950 px-2 py-0.5 rounded-lg text-[10px] font-comic font-bold">
                👨‍👩‍👧 Curated by Yang &amp; Melody
              </span>
            </div>
            <h1 className="font-comic text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
              {lang === 'zh' ? '水手世界探索家护照' : 'Mariner World Explorer Passport'}
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-medium">
              {lang === 'zh'
                ? '一页一个神奇冷知识！完成趣味有奖问答，集齐全套 16 国探索勋章！'
                : 'One bite-sized fun fact per page! Test your knowledge in trivia quizzes to earn official badges!'}
            </p>
          </div>

          {/* Badges collected counter */}
          <div className="bg-white comic-box rounded-2xl p-4 flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-xl shadow-sm">
              🎖️
            </div>
            <div>
              <div className="font-comic text-lg font-bold text-slate-900 leading-tight">
                {unlockedBadges.length} / {WORLD_COUNTRIES.length}
              </div>
              <div className="text-[11px] font-semibold text-slate-500">
                {lang === 'zh' ? '已收集勋章' : 'Badges Earned'}
              </div>
            </div>
          </div>
        </div>

        {/* View Switcher & Region Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-amber-200">
          {/* Mode Switcher: 3D Globe vs Classic Passport */}
          <div className="flex items-center gap-1.5 bg-amber-200/80 p-1 rounded-2xl border-2 border-slate-900 shadow-sm">
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setViewMode('globe');
              }}
              className={`px-3 py-1.5 rounded-xl font-comic text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'globe'
                  ? 'bg-blue-600 text-white shadow-comic border-2 border-slate-900'
                  : 'text-slate-800 hover:text-slate-950'
              }`}
            >
              <Compass size={14} className={viewMode === 'globe' ? 'animate-spin-slow text-amber-300' : ''} />
              <span>{lang === 'zh' ? '🌍 3D 航海地球仪' : '🌍 3D Mariner Globe'}</span>
            </button>
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setViewMode('card');
              }}
              className={`px-3 py-1.5 rounded-xl font-comic text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'card'
                  ? 'bg-amber-400 text-slate-950 shadow-comic border-2 border-slate-900'
                  : 'text-slate-800 hover:text-slate-950'
              }`}
            >
              <span>{lang === 'zh' ? '🗂️ 护照卡片集' : '🗂️ Passport Cards'}</span>
            </button>
          </div>

          {/* Region Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['All', 'Americas', 'Europe', 'Asia', 'Africa', 'Oceania', 'Polar'].map(cat => (
              <button
                key={cat}
                onClick={() => {
                  if (soundEnabled) playClickSound();
                  setCategoryFilter(cat);
                  setSelectedIdx(0);
                  setActiveTab('fact');
                  setSelectedOpt(null);
                  setIsAnswered(false);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-comic font-bold transition-all ${
                  categoryFilter === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3D Interactive Earth Globe Section */}
      {viewMode === 'globe' && (
        <div className="mb-6 animate-in fade-in zoom-in-95 duration-200">
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
              setActiveTab('fact');
              setSelectedOpt(null);
              setIsAnswered(false);
            }}
          />
        </div>
      )}

      {/* Main Single Country Fact Card ("一页一个 Fun Fact") */}
      <div className="bg-white comic-box-lg rounded-3xl p-6 md:p-8 relative bg-halftone mb-6">
        {/* Country Profile Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-slate-200">
          <div className="flex items-center gap-3.5">
            <span className="text-4xl md:text-5xl drop-shadow-sm">
              {currentCountry.flag}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-comic text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                  {lang === 'zh' ? currentCountry.nameZh : currentCountry.nameEn}
                </h2>
                {isBadgeUnlocked && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-100 border border-emerald-400 font-comic text-xs font-bold text-emerald-800">
                    <Sparkles size={12} />
                    {lang === 'zh' ? '已点亮' : 'Badge Earned'}
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 font-semibold mt-0.5">
                <span>{lang === 'zh' ? '首都：' : 'Capital: '}</span>
                <span className="text-slate-800 font-bold">
                  {lang === 'zh' ? currentCountry.capitalZh : currentCountry.capitalEn}
                </span>
                <span className="mx-2">·</span>
                <span className="text-blue-600 font-semibold">
                  {lang === 'zh' ? currentCountry.taglineZh : currentCountry.taglineEn}
                </span>
              </div>
            </div>
          </div>

          {/* Sub-tab Switcher: Fact vs Quiz */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-300">
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setActiveTab('fact');
              }}
              className={`px-3 py-1.5 rounded-lg font-comic text-xs font-bold transition-all ${
                activeTab === 'fact'
                  ? 'bg-amber-300 text-slate-900 shadow-sm border border-slate-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📖 {lang === 'zh' ? '冷知识百科' : 'Fun Fact'}
            </button>
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setActiveTab('quiz');
              }}
              className={`px-3 py-1.5 rounded-lg font-comic text-xs font-bold transition-all ${
                activeTab === 'quiz'
                  ? 'bg-blue-500 text-white shadow-sm border border-slate-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🎯 {lang === 'zh' ? '有奖问答' : 'Trivia Quiz'}
            </button>
          </div>
        </div>

        {/* TAB 1: FUN FACT VIEW */}
        {activeTab === 'fact' && (
          <div className="animate-in fade-in">
            {/* Audio Speech Button */}
            <div className="flex justify-end mb-3">
              <button
                onClick={() => handleSpeak(currentCountry.funFactEn)}
                className={`comic-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  isSpeaking ? 'bg-amber-400 text-slate-900 ring-2 ring-slate-900' : 'bg-slate-100 hover:bg-white text-slate-700'
                }`}
                title="Listen to English read-aloud"
              >
                {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span>{isSpeaking ? 'Stop' : '🔊 Read Fact'}</span>
              </button>
            </div>

            {/* Country Illustration Graphic Novel Visual */}
            <div className="mb-4">
              <CountryIllustration countryId={currentCountry.id} name={currentCountry.nameEn} lang={lang} />
            </div>

            {/* Giant Comic Fact Box */}
            <div className="bg-amber-50/80 border-2 border-slate-900 rounded-3xl p-6 md:p-8 shadow-comic relative mb-6">
              <span className="absolute -top-3.5 left-6 bg-amber-400 border-2 border-slate-900 text-slate-900 px-3 py-0.5 rounded-full font-comic text-xs font-bold uppercase tracking-wider">
                {lang === 'zh' ? '🌟 你知道吗？· Fun Fact' : '🌟 Did You Know?'}
              </span>

              <p className="font-comic text-lg md:text-xl font-bold text-slate-900 leading-relaxed mb-4">
                {currentCountry.funFactEn}
              </p>

              {lang === 'zh' && (
                <p className="text-sm md:text-base text-slate-700 font-medium leading-relaxed pt-3 border-t border-amber-200">
                  {currentCountry.funFactZh}
                </p>
              )}
            </div>

            {/* Landmark Showcase Box */}
            {COUNTRY_LANDMARKS[currentCountry.id] && (() => {
              const landmark = COUNTRY_LANDMARKS[currentCountry.id];
              return (
                <div className="bg-white border-2 border-slate-900 rounded-3xl p-5 md:p-6 shadow-comic mb-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b-2 border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl drop-shadow-sm">{landmark.icon}</span>
                      <div>
                        <div className="text-[11px] font-comic font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
                          <span>🏛️ {lang === 'zh' ? '国家标志性建筑与地标' : 'Iconic Landmark & Monument'}</span>
                        </div>
                        <h3 className="font-comic text-lg md:text-xl font-extrabold text-slate-900 leading-tight">
                          {lang === 'zh' ? landmark.nameZh : landmark.nameEn}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-300 font-comic text-xs font-bold text-slate-700">
                        📍 {lang === 'zh' ? landmark.cityZh : landmark.cityEn}
                      </span>
                      <span className="px-2.5 py-1 rounded-xl bg-amber-100 border border-amber-300 font-comic text-xs font-bold text-amber-900">
                        📏 {landmark.heightOrScale}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed mb-3">
                    {lang === 'zh' ? landmark.descZh : landmark.descEn}
                  </p>

                  <div className="p-3.5 rounded-2xl bg-amber-50/90 border-2 border-amber-200 text-xs text-amber-950">
                    <div className="font-comic font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                      <Sparkles size={13} className="text-amber-600" />
                      <span>{lang === 'zh' ? '🌟 建筑力学与历史秘闻：' : '🌟 Architectural Secret: '}</span>
                    </div>
                    <p className="leading-relaxed">
                      {lang === 'zh' ? landmark.architecturalFactZh : landmark.architecturalFactEn}
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Unlock Badge Preview Prompt */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-blue-50 p-4 rounded-2xl border border-blue-200">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🎖️</span>
                <div>
                  <div className="font-comic text-sm font-bold text-blue-950">
                    {lang === 'zh' ? currentCountry.badgeTitleZh : currentCountry.badgeTitleEn}
                  </div>
                  <div className="text-xs text-blue-800">
                    {lang === 'zh' ? '回答 1 道轻松趣味小问答，即可解锁该国家勋章！' : 'Answer the quick trivia quiz to claim this official badge!'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (soundEnabled) playClickSound();
                  setActiveTab('quiz');
                }}
                className="comic-btn px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-comic text-xs font-bold rounded-xl whitespace-nowrap"
              >
                {lang === 'zh' ? '前往有奖问答 ➔' : 'Take Quiz ➔'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: TRIVIA QUIZ VIEW */}
        {activeTab === 'quiz' && (
          <div className="animate-in fade-in">
            <div className="mb-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                Trivia Challenge · {currentCountry.nameEn}
              </span>
              <h3 className="font-comic text-xl font-bold text-slate-900 mt-1">
                {currentCountry.quiz.questionEn}
              </h3>
              {lang === 'zh' && (
                <p className="text-sm text-slate-600 mt-1 font-medium">
                  {currentCountry.quiz.questionZh}
                </p>
              )}
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3 mb-6">
              {currentCountry.quiz.optionsEn.map((optEn, i) => {
                const optZh = currentCountry.quiz.optionsZh[i];
                const isSelected = selectedOpt === i;
                const isCorrectOption = isAnswered && i === currentCountry.quiz.correctIndex;
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
                className={`mb-6 p-4 rounded-2xl border-2 ${
                  isCorrect ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-100 border-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 font-comic text-sm font-bold">
                  {isCorrect ? (
                    <span className="text-emerald-800 flex items-center gap-1">
                      <Sparkles size={16} />
                      {lang === 'zh' ? '回答正确！勋章已收录进你的护照！' : 'Correct! Badge stamped into your passport!'}
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

            {/* Check button */}
            {!isAnswered ? (
              <button
                onClick={handleCheckQuiz}
                disabled={selectedOpt === null}
                className="w-full comic-btn py-3 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-900 font-comic font-bold text-sm rounded-xl"
              >
                {lang === 'zh' ? '提交答案 ➔' : 'Submit Answer ➔'}
              </button>
            ) : (
              <button
                onClick={handleNextCountry}
                className="w-full comic-btn py-3 bg-blue-600 hover:bg-blue-500 text-white font-comic font-bold text-sm rounded-xl flex items-center justify-center gap-2"
              >
                <span>{lang === 'zh' ? '探索下一国家 ➔' : 'Explore Next Country ➔'}</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        )}

        {/* Paging Navigation Bottom Bar */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t-2 border-slate-200">
          <button
            onClick={handlePrevCountry}
            className="comic-btn px-4 py-2 bg-slate-100 hover:bg-white text-slate-800 font-comic text-xs font-bold rounded-xl flex items-center gap-1.5"
          >
            <ArrowLeft size={14} />
            <span>{lang === 'zh' ? '上一国' : 'Previous'}</span>
          </button>

          <span className="font-comic text-xs font-bold text-slate-500">
            {selectedIdx + 1} / {filteredCountries.length}
          </span>

          <button
            onClick={handleNextCountry}
            className="comic-btn px-4 py-2 bg-slate-100 hover:bg-white text-slate-800 font-comic text-xs font-bold rounded-xl flex items-center gap-1.5"
          >
            <span>{lang === 'zh' ? '下一国' : 'Next'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Passport Stamps Collection Showcase */}
      <div className="bg-white comic-box rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <h3 className="font-comic text-lg font-bold text-slate-900">
              {lang === 'zh' ? '水手护照印章册' : 'Passport Badge Collection'}
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {unlockedBadges.length} / {WORLD_COUNTRIES.length} {lang === 'zh' ? '枚' : 'stamps'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
          {WORLD_COUNTRIES.map((country, idx) => {
            const isCollected = unlockedBadges.includes(country.id);
            const isCurrentlyViewing = country.id === currentCountry.id;

            return (
              <button
                key={country.id}
                onClick={() => {
                  if (soundEnabled) playClickSound();
                  setCategoryFilter('All');
                  setSelectedIdx(idx);
                  setActiveTab('fact');
                  setSelectedOpt(null);
                  setIsAnswered(false);
                }}
                className={`comic-box-sm p-2 rounded-xl flex flex-col items-center justify-center transition-all ${
                  isCurrentlyViewing
                    ? 'ring-2 ring-blue-600 bg-blue-50 scale-105'
                    : isCollected
                    ? 'bg-amber-50 hover:bg-amber-100'
                    : 'bg-slate-50 opacity-50 hover:opacity-80'
                }`}
                title={country.nameEn}
              >
                <span className="text-2xl mb-1">{country.flag}</span>
                <span className="font-comic text-[11px] font-bold text-slate-800 truncate w-full text-center">
                  {lang === 'zh' ? country.nameZh : country.nameEn}
                </span>
                {isCollected ? (
                  <span className="text-[10px] text-emerald-600 font-bold">✓</span>
                ) : (
                  <span className="text-[10px] text-slate-400">🔒</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

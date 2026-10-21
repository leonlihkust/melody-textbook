import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, Sparkles, Globe, Compass, ArrowLeft, ArrowRight, CheckCircle2, XCircle, BookOpen, Target } from 'lucide-react';
import { WORLD_COUNTRIES } from '../data/worldData';
import { COUNTRY_LANDMARKS } from '../data/landmarkData';
import { WORLD_FRENCH_DATA } from '../data/worldFrenchData';
import { CountryIllustration } from './CountryIllustration';
import { Globe3D } from './Globe3D';
import { playCorrectSound, playClueSound, playClickSound, speakText, stopSpeaking } from '../utils/audio';
import { triggerBadgeUnlockConfetti } from '../utils/confettiExplosion';
import { Language, I18N } from '../utils/i18n';

interface WorldExplorerProps {
  lang: Language;
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
  const [viewMode, setViewMode] = useState<'globe' | 'fact'>('globe');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'fact' | 'quiz'>('fact');
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const t = I18N[lang].world;
  const currentCountry = WORLD_COUNTRIES[selectedIdx] || WORLD_COUNTRIES[0];
  const isBadgeUnlocked = unlockedBadges.includes(currentCountry.id);
  const currentLandmark = COUNTRY_LANDMARKS[currentCountry.id];
  const frData = WORLD_FRENCH_DATA[currentCountry.id];

  // Country text localized
  const countryName = lang === 'fr' ? (frData?.nameFr || currentCountry.nameEn) : lang === 'zh' ? currentCountry.nameZh : currentCountry.nameEn;
  const countryCapital = lang === 'fr' ? (frData?.capitalFr || currentCountry.capitalEn) : lang === 'zh' ? currentCountry.capitalZh : currentCountry.capitalEn;
  const countryTagline = lang === 'fr' ? (frData?.taglineFr || currentCountry.taglineEn) : lang === 'zh' ? currentCountry.taglineZh : currentCountry.taglineEn;
  const countryFunFact = lang === 'fr' ? (frData?.funFactFr || currentCountry.funFactEn) : lang === 'zh' ? currentCountry.funFactZh : currentCountry.funFactEn;
  const countryBadgeTitle = lang === 'fr' ? (frData?.badgeTitleFr || currentCountry.badgeTitleEn) : lang === 'zh' ? currentCountry.badgeTitleZh : currentCountry.badgeTitleEn;
  const quizQuestion = lang === 'fr' ? (frData?.quizQuestionFr || currentCountry.quiz.questionEn) : lang === 'zh' ? currentCountry.quiz.questionZh : currentCountry.quiz.questionEn;
  const quizExplanation = lang === 'fr' ? (frData?.quizExplanationFr || currentCountry.quiz.explanationEn) : lang === 'zh' ? currentCountry.quiz.explanationZh : currentCountry.quiz.explanationEn;

  // Dynamic shuffle for trivia options so answers are randomly balanced across A, B, C, D
  const quizData = useMemo(() => {
    const q = currentCountry.quiz;
    const rawOptionsFr = frData?.quizOptionsFr || q.optionsEn;
    const indices = q.optionsEn.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return {
      optionsEn: indices.map(i => q.optionsEn[i]),
      optionsZh: indices.map(i => q.optionsZh[i]),
      optionsFr: indices.map(i => rawOptionsFr[i]),
      correctIndex: indices.indexOf(q.correctIndex),
    };
  }, [currentCountry, frData]);

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakText(text, lang, () => setIsSpeaking(false));
  };

  const handleNextCountry = () => {
    stopSpeaking();
    setIsSpeaking(false);
    if (soundEnabled) playClickSound();
    setSelectedIdx(i => (i + 1) % WORLD_COUNTRIES.length);
    setActiveTab('fact');
    setSelectedOpt(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const handlePrevCountry = () => {
    stopSpeaking();
    setIsSpeaking(false);
    if (soundEnabled) playClickSound();
    setSelectedIdx(i => (i - 1 + WORLD_COUNTRIES.length) % WORLD_COUNTRIES.length);
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
        onUnlockBadge(currentCountry.id, 2);
      } else {
        // Quick celebratory burst for re-answering
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
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
      {/* MODE 1: 3D EARTH GLOBE STAGE */}
      {viewMode === 'globe' ? (
        <div className="animate-in fade-in duration-200">
          {/* Friendly Minimalist Top Bar */}
          <div className="bg-white comic-box rounded-2xl p-4 md:p-5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🌍</span>
                <span className="font-comic text-xs font-bold uppercase tracking-wider text-amber-800">
                  {t.title}
                </span>
              </div>
              <h1 className="font-comic text-xl md:text-2xl font-extrabold text-slate-900 leading-tight">
                {lang === 'fr' ? 'Tourne le globe et touche un pays !' : lang === 'zh' ? '点击地球上的国家与标志性地标！' : 'Spin the Globe & Tap Countries or Landmarks!'}
              </h1>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {t.subtitle}
              </p>
            </div>

            {/* Badges collected counter */}
            <div className="bg-amber-50/80 border-2 border-slate-900 rounded-xl px-3.5 py-2 flex items-center gap-2.5 shrink-0 comic-box-sm">
              <span className="text-xl">🎖️</span>
              <div>
                <div className="font-comic text-base font-bold text-slate-900 leading-tight">
                  {unlockedBadges.length} / {WORLD_COUNTRIES.length}
                </div>
                <div className="text-[10px] font-semibold text-slate-500">
                  {t.earned}
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
                const idx = WORLD_COUNTRIES.findIndex(c => c.id === country.id);
                if (idx !== -1) {
                  setSelectedIdx(idx);
                }
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
                  <span>{countryName}</span>
                  {currentLandmark && (
                    <span className="text-xs text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-lg">
                      {currentLandmark.icon} {lang === 'zh' ? currentLandmark.shortNameZh : currentLandmark.shortNameEn}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {countryTagline}
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
              className="comic-btn w-full sm:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-comic text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-comic transition-all cursor-pointer"
            >
              <BookOpen size={15} />
              <span>
                {lang === 'fr'
                  ? `Explorer ${countryName} ➔`
                  : lang === 'zh'
                  ? `阅读【${countryName}】知识与问答 ➔`
                  : `Explore ${countryName} Fun Fact ➔`}
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* MODE 2: FOCUSED FUN FACT & QUIZ */
        <div className="animate-in fade-in zoom-in-95 duration-200">
          {/* Top Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                stopSpeaking();
                setIsSpeaking(false);
                setViewMode('globe');
              }}
              className="comic-btn px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-comic text-xs font-bold rounded-xl flex items-center gap-2 shadow-comic transition-all cursor-pointer"
            >
              <Globe size={15} className="animate-spin-slow" />
              <span>{lang === 'fr' ? '⬅️ Retour au Globe 3D' : lang === 'zh' ? '⬅️ 返回 3D 地球仪' : '⬅️ Back to 3D Globe'}</span>
            </button>

            {/* Country Carousel Controls */}
            <div className="flex items-center gap-1.5 bg-white comic-box rounded-xl p-1">
              <button
                onClick={handlePrevCountry}
                className="comic-btn p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 cursor-pointer"
                title="Previous Country"
              >
                <ArrowLeft size={16} />
              </button>
              <span className="font-comic text-xs font-bold px-2 text-slate-800">
                {selectedIdx + 1} / {WORLD_COUNTRIES.length}
              </span>
              <button
                onClick={handleNextCountry}
                className="comic-btn p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 cursor-pointer"
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
                      {countryName}
                    </h2>
                    {isBadgeUnlocked && (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-100 border border-emerald-400 font-comic text-xs font-bold text-emerald-800 shadow-sm">
                        <Sparkles size={12} />
                        {t.earned}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5 flex items-center gap-2">
                    <span>📍 {t.capital} : {countryCapital}</span>
                    <span>·</span>
                    <span className="text-blue-600 font-bold">{countryTagline}</span>
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
                      ? 'bg-blue-600 text-white shadow-sm border border-slate-900'
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
                    onClick={() => handleSpeak(countryFunFact)}
                    className={`comic-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      isSpeaking ? 'bg-amber-400 text-slate-900 ring-2 ring-slate-900' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                    title="Listen to pronunciation"
                  >
                    {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    <span>{isSpeaking ? 'Stop' : '🔊 Audio'}</span>
                  </button>
                </div>

                {/* Country Illustration Graphic */}
                <div className="mb-4">
                  <CountryIllustration countryId={currentCountry.id} name={countryName} lang={lang} />
                </div>

                {/* Fun Fact Box */}
                <div className="bg-amber-50/90 border-2 border-slate-900 rounded-3xl p-5 md:p-6 shadow-comic relative mb-5">
                  <span className="absolute -top-3 left-5 bg-amber-400 border-2 border-slate-900 text-slate-900 px-3 py-0.5 rounded-full font-comic text-xs font-bold uppercase tracking-wider">
                    🌟 {t.funFacts}
                  </span>

                  <p className="font-comic text-base md:text-lg font-extrabold text-slate-900 leading-relaxed mt-1">
                    {countryFunFact}
                  </p>
                </div>

                {/* Compact Landmark Highlight */}
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
                        {countryBadgeTitle}
                      </div>
                      <div className="text-xs text-blue-800 font-medium">
                        {lang === 'fr'
                          ? 'Réponds au quiz pour débloquer le badge d\'exploration !'
                          : lang === 'zh'
                          ? '回答 1 道轻松趣味小问答，即可点亮该国探索勋章！'
                          : 'Answer 1 quick fun trivia question to earn this badge!'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (soundEnabled) playClickSound();
                      setActiveTab('quiz');
                    }}
                    className="comic-btn w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-comic text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-comic whitespace-nowrap cursor-pointer"
                  >
                    <span>{t.takeQuiz} ➔</span>
                    <Target size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: TRIVIA QUIZ */}
            {activeTab === 'quiz' && (
              <div className="animate-in fade-in">
                <div className="mb-4">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wide flex items-center gap-1">
                    <Target size={14} />
                    <span>Trivia · {countryName}</span>
                  </span>
                  <h3 className="font-comic text-lg md:text-xl font-extrabold text-slate-900 mt-1 leading-snug">
                    {quizQuestion}
                  </h3>
                </div>

                {/* Shuffled Options */}
                <div className="grid grid-cols-1 gap-2.5 mb-5">
                  {(lang === 'fr' ? quizData.optionsFr : lang === 'zh' ? quizData.optionsZh : quizData.optionsEn).map((optText, i) => {
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
                        className={`comic-btn p-3.5 rounded-2xl text-left flex items-start gap-3 transition-all cursor-pointer ${style}`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-comic text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <div className="flex-1">
                          <div className="font-comic font-bold text-sm leading-tight">
                            {optText}
                          </div>
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
                          {lang === 'fr'
                            ? 'Bonne réponse ! Le badge est tamponné dans ton passeport !'
                            : lang === 'zh'
                            ? '回答正确！勋章已盖入你的探索家护照！'
                            : 'Correct! Official badge stamped into your passport!'}
                        </span>
                      ) : (
                        <span className="text-slate-700">
                          {lang === 'fr' ? 'Explication :' : lang === 'zh' ? '正确解答：' : 'Fact Explanation:'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-slate-800 font-medium leading-relaxed">
                      {quizExplanation}
                    </p>
                  </div>
                )}

                {/* Submit or Next Button */}
                {!isAnswered ? (
                  <button
                    onClick={handleCheckQuiz}
                    disabled={selectedOpt === null}
                    className="w-full comic-btn py-3 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-900 font-comic font-bold text-sm rounded-xl shadow-comic cursor-pointer"
                  >
                    {lang === 'fr' ? 'Valider la réponse ➔' : lang === 'zh' ? '提交答案 ➔' : 'Submit Answer ➔'}
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={handleNextCountry}
                      className="w-full sm:flex-1 comic-btn py-3 bg-blue-600 hover:bg-blue-500 text-white font-comic font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-comic cursor-pointer"
                    >
                      <span>{lang === 'fr' ? 'Pays suivant ➔' : lang === 'zh' ? '探索下一国家 ➔' : 'Explore Next Country ➔'}</span>
                      <ArrowRight size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('globe')}
                      className="w-full sm:w-auto comic-btn px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-comic font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Globe size={15} />
                      <span>{t.globe3D}</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Carousel Navigation */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t-2 border-slate-200">
              <button
                onClick={handlePrevCountry}
                className="comic-btn px-3.5 py-2 bg-slate-100 hover:bg-white text-slate-800 font-comic text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>{lang === 'fr' ? 'Précédent' : lang === 'zh' ? '上一国家' : 'Previous'}</span>
              </button>

              <button
                onClick={() => setViewMode('globe')}
                className="comic-btn px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-comic text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
              >
                <Compass size={13} />
                <span>{t.globe3D}</span>
              </button>

              <button
                onClick={handleNextCountry}
                className="comic-btn px-3.5 py-2 bg-slate-100 hover:bg-white text-slate-800 font-comic text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <span>{lang === 'fr' ? 'Suivant' : lang === 'zh' ? '下一国家' : 'Next'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

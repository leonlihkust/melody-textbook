import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, Sparkles, HelpCircle, ArrowRight, RotateCcw, CheckCircle2, XCircle, Award, Trophy, RefreshCw, Zap } from 'lucide-react';
import { WeekTopic, QuestionItem, DifficultyTier } from '../data/mathData';
import { getQuestionsForTier, generateQuestionVariant } from '../utils/questionVariants';
import { VictoryCelebration } from './VictoryCelebration';
import { playCorrectSound, playClueSound, playChestFanfare, playClickSound, speakEnglish, stopSpeaking } from '../utils/audio';

interface QuestionRunnerProps {
  topic: WeekTopic;
  lang: 'en' | 'zh';
  soundEnabled: boolean;
  onFinishStage: (starsEarned: number, weekNumber: number) => void;
  onBackToMap: () => void;
  onOpenScratchpad: () => void;
}

export const QuestionRunner: React.FC<QuestionRunnerProps> = ({
  topic,
  lang,
  soundEnabled,
  onFinishStage,
  onBackToMap,
  onOpenScratchpad,
}) => {
  // Difficulty Mode: 'all' (progressive) or specific tier ('easy' | 'med' | 'boss' | 'olympiad')
  const [tierMode, setTierMode] = useState<'all' | DifficultyTier>('all');
  const [variantSeed, setVariantSeed] = useState<number>(0);

  // Active question set calculated based on tier mode and variant seed
  const questions: QuestionItem[] = useMemo(() => {
    const rawQuestions = getQuestionsForTier(topic.questions, tierMode, topic.week, variantSeed);
    // Shuffle options dynamically so correct answer position is uniformly distributed across A, B, C, D
    return rawQuestions.map(q => {
      const indices = q.optionsEn.map((_, i) => i);
      // Fisher-Yates shuffle
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      return {
        ...q,
        optionsEn: indices.map(i => q.optionsEn[i]),
        optionsZh: indices.map(i => q.optionsZh[i]),
        correctIndex: indices.indexOf(q.correctIndex),
      };
    });
  }, [topic, tierMode, variantSeed]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [attempt, setAttempt] = useState<1 | 2>(1);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showClue, setShowClue] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [stageStars, setStageStars] = useState(0);
  const [correctFirstTryCount, setCorrectFirstTryCount] = useState(0);
  const [showVictoryCelebration, setShowVictoryCelebration] = useState(false);

  const currentQ: QuestionItem = questions[currentIdx] || questions[0];

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const text = `${currentQ.questionEn}. Options: A: ${currentQ.optionsEn[0]}. B: ${currentQ.optionsEn[1]}. C: ${currentQ.optionsEn[2]}. D: ${currentQ.optionsEn[3]}.`;
    setIsSpeaking(true);
    speakEnglish(text, () => setIsSpeaking(false));
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered && isCorrect) return;
    if (isAnswered && attempt === 2) return;
    if (soundEnabled) playClickSound();
    setSelectedOpt(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOpt === null) return;

    if (selectedOpt === currentQ.correctIndex) {
      // Correct!
      setIsCorrect(true);
      setIsAnswered(true);
      const earned = attempt === 1 ? 2 : 1;
      setStageStars(s => s + earned);

      if (attempt === 1) {
        setCorrectFirstTryCount(c => c + 1);
      }

      if (soundEnabled) playCorrectSound();

      // Confetti burst for correct answer
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#2563eb', '#f59e0b', '#10b981', '#ec4899']
      });
    } else {
      // Incorrect
      if (attempt === 1) {
        // First chance missed -> Reveal Secret Clue!
        setShowClue(true);
        setAttempt(2);
        setSelectedOpt(null);
        if (soundEnabled) playClueSound();
      } else {
        // Second chance missed -> Reveal full solution
        setIsCorrect(false);
        setIsAnswered(true);
      }
    }
  };

  const handleNextQuestion = () => {
    stopSpeaking();
    setIsSpeaking(false);
    if (soundEnabled) playClickSound();

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOpt(null);
      setAttempt(1);
      setIsAnswered(false);
      setIsCorrect(false);
      setShowClue(false);
    } else {
      // Completed all 5 questions -> Trigger Grand Victory Celebration!
      setShowVictoryCelebration(true);
    }
  };

  // Switch difficulty mode on demand
  const handleSelectTierMode = (newMode: 'all' | DifficultyTier) => {
    if (soundEnabled) playClickSound();
    stopSpeaking();
    setIsSpeaking(false);
    setTierMode(newMode);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setAttempt(1);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowClue(false);
    setStageStars(0);
    setCorrectFirstTryCount(0);
  };

  // Generate a new variant for the current question
  const handleRegenerateCurrentVariant = () => {
    if (soundEnabled) playClickSound();
    stopSpeaking();
    setIsSpeaking(false);
    setVariantSeed(s => s + 1);
    setSelectedOpt(null);
    setAttempt(1);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowClue(false);
  };

  // Play again with a fresh variant seed
  const handlePlayAgainVariant = () => {
    setShowVictoryCelebration(false);
    setVariantSeed(s => s + 1);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setAttempt(1);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowClue(false);
    setStageStars(0);
    setCorrectFirstTryCount(0);
  };

  // Level up difficulty from victory celebration
  const handleTryHigherDifficulty = () => {
    setShowVictoryCelebration(false);
    const order: Array<'all' | DifficultyTier> = ['all', 'easy', 'med', 'boss', 'olympiad'];
    const nextIdx = Math.min(order.indexOf(tierMode) + 1, order.length - 1);
    handleSelectTierMode(order[nextIdx]);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'easy':
        return 'bg-emerald-100 text-emerald-800 border-emerald-400';
      case 'med':
        return 'bg-amber-100 text-amber-800 border-amber-400';
      case 'boss':
        return 'bg-rose-100 text-rose-800 border-rose-400';
      case 'olympiad':
        return 'bg-purple-100 text-purple-800 border-purple-400 font-bold';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-400';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Top Stage Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-white comic-box rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToMap}
            className="comic-btn px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg"
          >
            {lang === 'zh' ? '← 返回航海地图' : '← Quest Map'}
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                Week {topic.week} · {lang === 'zh' ? topic.strandZh : topic.strandEn}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-600 font-medium">
                📍 {lang === 'zh' ? topic.landmarkZh : topic.landmark}
              </span>
            </div>
            <h2 className="font-comic text-lg font-bold text-slate-900 leading-tight">
              {lang === 'zh' ? topic.titleZh : topic.titleEn}
            </h2>
          </div>
        </div>

        {/* 5-Step Progress Indicators & Scratchpad */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-300">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full flex items-center justify-center font-comic text-xs font-bold transition-all ${
                  i < currentIdx
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : i === currentIdx
                    ? 'bg-amber-400 text-slate-900 ring-2 ring-slate-900 scale-110'
                    : 'bg-white text-slate-400 border border-slate-300'
                }`}
              >
                {i < currentIdx ? '✓' : i + 1}
              </div>
            ))}
          </div>

          {/* Stars Counter */}
          <div className="flex items-center gap-1 bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-xl font-comic text-amber-900 text-sm font-bold">
            <span className="text-base">⭐</span>
            <span>+{stageStars}</span>
          </div>

          {/* Scratchpad Button */}
          <button
            onClick={onOpenScratchpad}
            className="comic-btn px-3 py-1.5 bg-sky-300 hover:bg-sky-400 text-slate-900 text-xs font-bold rounded-xl flex items-center gap-1.5"
            title="Open scratchpad"
          >
            <span>✏️</span>
            <span>{lang === 'zh' ? '草稿板' : 'Scratchpad'}</span>
          </button>
        </div>
      </div>

      {/* 4 Difficulty Tiers Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 bg-amber-50/80 border-2 border-slate-900 rounded-2xl p-2.5 comic-box-sm">
        <div className="flex items-center gap-1.5 text-xs font-comic font-bold text-slate-700 pl-1">
          <Zap size={14} className="text-amber-500" />
          <span>{lang === 'zh' ? '选择难度梯队：' : 'Select Difficulty Tier:'}</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => handleSelectTierMode('all')}
            className={`px-3 py-1 rounded-xl text-xs font-comic font-bold transition-all ${
              tierMode === 'all'
                ? 'bg-blue-600 text-white border-2 border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            🌟 {lang === 'zh' ? '循序渐进 (1➔5级递进)' : 'Progressive (1➔5)'}
          </button>

          <button
            onClick={() => handleSelectTierMode('easy')}
            className={`px-3 py-1 rounded-xl text-xs font-comic font-bold transition-all ${
              tierMode === 'easy'
                ? 'bg-emerald-500 text-white border-2 border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            🟢 {lang === 'zh' ? '基础巩固' : 'Foundation'}
          </button>

          <button
            onClick={() => handleSelectTierMode('med')}
            className={`px-3 py-1 rounded-xl text-xs font-comic font-bold transition-all ${
              tierMode === 'med'
                ? 'bg-amber-500 text-white border-2 border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            🟡 {lang === 'zh' ? '进阶强化' : 'Intermediate'}
          </button>

          <button
            onClick={() => handleSelectTierMode('boss')}
            className={`px-3 py-1 rounded-xl text-xs font-comic font-bold transition-all ${
              tierMode === 'boss'
                ? 'bg-rose-500 text-white border-2 border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
            }`}
          >
            🔴 {lang === 'zh' ? '综合挑战' : 'Advanced'}
          </button>

          <button
            onClick={() => handleSelectTierMode('olympiad')}
            className={`px-3 py-1 rounded-xl text-xs font-comic font-bold transition-all ${
              tierMode === 'olympiad'
                ? 'bg-purple-600 text-white border-2 border-slate-900 shadow-sm ring-2 ring-purple-300'
                : 'bg-white text-purple-900 border border-purple-300 hover:bg-purple-50 font-bold'
            }`}
          >
            👑 {lang === 'zh' ? '思维奥数' : 'Olympiad'}
          </button>
        </div>
      </div>

      {/* Main Comic Question Panel */}
      <div className="bg-white comic-box-lg rounded-3xl p-6 md:p-8 relative overflow-hidden bg-halftone">
        {/* Question Header & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${getTierColor(currentQ.tier)}`}>
              {lang === 'zh' ? currentQ.tierLabelZh : currentQ.tierLabelEn}
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              {lang === 'zh' ? `第 ${currentIdx + 1} / ${questions.length} 题` : `Question ${currentIdx + 1} of ${questions.length}`}
            </span>
            {attempt === 2 && !isAnswered && (
              <span className="px-2 py-0.5 text-xs font-bold bg-amber-400 text-amber-950 rounded border border-amber-500 animate-bounce">
                {lang === 'zh' ? '⚡ 最后 1 次机会！' : '⚡ 2nd Chance!'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Dynamic Variation Generator Button ("题目要有变化") */}
            <button
              onClick={handleRegenerateCurrentVariant}
              className="comic-btn flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-400 rounded-xl text-xs font-comic font-bold transition-colors"
              title="Generate new numeric variation for this question"
            >
              <RefreshCw size={14} className="text-amber-700" />
              <span>{lang === 'zh' ? '🔄 换一道变式题' : '🔄 New Variant'}</span>
            </button>

            {/* Audio Read-Aloud Button */}
            <button
              onClick={handleSpeak}
              className={`comic-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                isSpeaking ? 'bg-amber-400 text-slate-900 ring-2 ring-slate-900' : 'bg-slate-100 hover:bg-white text-slate-700'
              }`}
              title="Listen to English pronunciation"
            >
              {isSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} />}
              <span>{isSpeaking ? 'Stop' : '🔊 Read'}</span>
            </button>
          </div>
        </div>

        {/* Question Text */}
        <div className="mb-6">
          <h3 className="font-comic text-xl md:text-2xl font-bold text-slate-900 leading-snug mb-2">
            {currentQ.questionEn}
          </h3>
          {lang === 'zh' && (
            <p className="text-base text-slate-700 font-medium leading-relaxed bg-amber-50/80 p-3.5 rounded-xl border border-amber-200">
              {currentQ.questionZh}
            </p>
          )}
        </div>

        {/* Optional Question Visual Diagram Box */}
        {currentQ.visual && (
          <div className="mb-6 p-4 bg-slate-50 border-2 border-slate-900 rounded-2xl flex flex-col items-center justify-center font-mono text-sm text-slate-800 shadow-inner">
            <div className="font-bold text-slate-900 tracking-wider mb-1">
              {currentQ.visual.content}
            </div>
            {currentQ.visual.subtext && (
              <span className="text-[11px] text-slate-500 font-sans font-medium">
                {currentQ.visual.subtext}
              </span>
            )}
          </div>
        )}

        {/* 4 Choices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6">
          {currentQ.optionsEn.map((optEn, i) => {
            const optZh = currentQ.optionsZh[i];
            const isSelected = selectedOpt === i;
            const isCorrectOption = isAnswered && i === currentQ.correctIndex;
            const isWrongSelection = isAnswered && isSelected && !isCorrect;

            let btnStyle = 'bg-white hover:bg-amber-50 border-slate-900 text-slate-900';
            if (isSelected && !isAnswered) {
              btnStyle = 'bg-amber-300 ring-2 ring-slate-900 scale-[1.01] shadow-comic';
            } else if (isCorrectOption) {
              btnStyle = 'bg-emerald-300 border-emerald-900 text-emerald-950 font-bold';
            } else if (isWrongSelection) {
              btnStyle = 'bg-rose-200 border-rose-800 text-rose-950 opacity-80';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelectOption(i)}
                disabled={isAnswered && isCorrect}
                className={`comic-btn p-4 rounded-2xl text-left flex items-start gap-3 transition-all ${btnStyle}`}
              >
                <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-comic text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {String.fromCharCode(65 + i)}
                </span>
                <div className="flex-1">
                  <div className="font-comic font-bold text-base leading-tight">
                    {optEn}
                  </div>
                  {lang === 'zh' && optZh !== optEn && (
                    <div className="text-xs text-slate-600 mt-1 font-medium">
                      {optZh}
                    </div>
                  )}
                </div>
                {isCorrectOption && (
                  <CheckCircle2 size={20} className="text-emerald-700 shrink-0 self-center" />
                )}
                {isWrongSelection && (
                  <XCircle size={20} className="text-rose-700 shrink-0 self-center" />
                )}
              </button>
            );
          })}
        </div>

        {/* Secret Clue Drawer (First Attempt Miss) */}
        {showClue && !isAnswered && (
          <div className="mb-6 p-4 bg-amber-100 border-2 border-amber-500 rounded-2xl comic-box-sm animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2 mb-1.5 text-amber-900 font-comic font-bold text-sm">
              <span className="text-lg">💡</span>
              <span>{lang === 'zh' ? '侦探解题秘籍（Secret Clue）' : 'Detective Secret Clue'}</span>
            </div>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed mb-1">
              {currentQ.secretClueEn}
            </p>
            {lang === 'zh' && (
              <p className="text-xs text-amber-950 leading-relaxed font-medium">
                {currentQ.secretClueZh}
              </p>
            )}
          </div>
        )}

        {/* Solution Breakdown (After 2nd attempt or after correct) */}
        {isAnswered && (
          <div
            className={`mb-6 p-4 rounded-2xl border-2 ${
              isCorrect ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-100 border-slate-400'
            }`}
          >
            <div className="flex items-center gap-2 mb-1 text-sm font-comic font-bold">
              {isCorrect ? (
                <span className="text-emerald-800 flex items-center gap-1">
                  <Sparkles size={16} />
                  {lang === 'zh' ? '太棒了！水手回答正确！' : 'Brilliant, Mariner! Correct!'}
                </span>
              ) : (
                <span className="text-slate-800 flex items-center gap-1">
                  <HelpCircle size={16} />
                  {lang === 'zh' ? '解题锦囊与正确步骤：' : 'Step-by-Step Solution Breakdown:'}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-800 font-medium leading-relaxed">
              {currentQ.explanationEn}
            </p>
            {lang === 'zh' && (
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {currentQ.explanationZh}
              </p>
            )}
          </div>
        )}

        {/* Action Bottom Bar */}
        <div className="flex items-center justify-between pt-2 border-t-2 border-slate-200">
          <div className="text-xs text-slate-500 font-medium">
            {lang === 'zh'
              ? attempt === 1 && !isAnswered
                ? '每题有 2 次机会，首次正确获双倍星星 ⭐⭐'
                : ''
              : attempt === 1 && !isAnswered
              ? '2 chances per question · 1st-try bonus = 2 Stars ⭐⭐'
              : ''}
          </div>

          <div>
            {!isAnswered ? (
              <button
                onClick={handleCheckAnswer}
                disabled={selectedOpt === null}
                className="comic-btn px-6 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-900 font-comic font-bold text-sm rounded-xl flex items-center gap-2"
              >
                <span>{lang === 'zh' ? '提交检查 ➔' : 'Check Answer ➔'}</span>
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="comic-btn px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-comic font-bold text-sm rounded-xl flex items-center gap-2 shadow-comic"
              >
                <span>
                  {currentIdx < questions.length - 1
                    ? lang === 'zh'
                      ? '下一题 ➔'
                      : 'Next Question ➔'
                    : lang === 'zh'
                    ? '🎉 查看通关胜利大典！'
                    : '🎉 View Victory Celebration!'}
                </span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grand Full-Screen Victory Celebration Modal Component */}
      <VictoryCelebration
        isOpen={showVictoryCelebration}
        starsEarned={stageStars}
        totalQuestions={questions.length}
        correctFirstTryCount={correctFirstTryCount}
        weekNumber={topic.week}
        weekTitleEn={topic.titleEn}
        weekTitleZh={topic.titleZh}
        tierMode={tierMode}
        lang={lang}
        soundEnabled={soundEnabled}
        onPlayAgainVariant={handlePlayAgainVariant}
        onTryHigherDifficulty={handleTryHigherDifficulty}
        onReturnToMap={() => {
          setShowVictoryCelebration(false);
          onFinishStage(stageStars, topic.week);
        }}
      />
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Star, Sparkles, RefreshCw, ArrowRight, Award, Compass, CheckCircle2 } from 'lucide-react';
import { playChestFanfare, playClickSound, playCorrectSound } from '../utils/audio';
import { MarinerTrophy3D } from './MarinerTrophy3D';

interface VictoryCelebrationProps {
  isOpen: boolean;
  starsEarned: number;
  totalQuestions: number;
  correctFirstTryCount: number;
  weekNumber: number;
  weekTitleEn: string;
  weekTitleZh: string;
  tierMode: 'all' | 'easy' | 'med' | 'boss' | 'olympiad';
  lang: 'en' | 'zh';
  soundEnabled: boolean;
  onPlayAgainVariant: () => void;
  onTryHigherDifficulty: () => void;
  onReturnToMap: () => void;
}

export const VictoryCelebration: React.FC<VictoryCelebrationProps> = ({
  isOpen,
  starsEarned,
  totalQuestions,
  correctFirstTryCount,
  weekNumber,
  weekTitleEn,
  weekTitleZh,
  tierMode,
  lang,
  soundEnabled,
  onPlayAgainVariant,
  onTryHigherDifficulty,
  onReturnToMap,
}) => {
  const [chestOpened, setChestOpened] = useState(false);
  const [starsRevealed, setStarsRevealed] = useState(0);
  const [show3dTrophy, setShow3dTrophy] = useState(true);

  // Trigger grand victory fireworks and audio sequence upon opening
  useEffect(() => {
    if (!isOpen) {
      setChestOpened(false);
      setStarsRevealed(0);
      return;
    }

    if (soundEnabled) {
      playChestFanfare();
    }

    // Sequence 1: Initial confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6']
    });

    // Sequence 2: Open chest after 500ms
    const openTimer = setTimeout(() => {
      setChestOpened(true);

      // Multi-cannon confetti blast
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#fbbf24', '#f59e0b', '#38bdf8']
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#34d399', '#a78bfa', '#f472b6']
      });
    }, 500);

    // Sequence 3: Staggered star animation
    const starTimer1 = setTimeout(() => setStarsRevealed(1), 1000);
    const starTimer2 = setTimeout(() => setStarsRevealed(2), 1400);
    const starTimer3 = setTimeout(() => setStarsRevealed(3), 1800);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(starTimer1);
      clearTimeout(starTimer2);
      clearTimeout(starTimer3);
    };
  }, [isOpen, soundEnabled]);

  if (!isOpen) return null;

  // Determine honor badge title based on tier and performance
  const getHonorTitle = () => {
    if (tierMode === 'olympiad') {
      return {
        titleEn: '👑 OLYMPIAD BRAIN KING',
        titleZh: '👑 终极奥数思维脑王',
        color: 'from-purple-500 to-indigo-600'
      };
    }
    if (tierMode === 'boss') {
      return {
        titleEn: '🔴 MATH EXPEDITION MASTER',
        titleZh: '🔴 卓越高难挑战大师',
        color: 'from-rose-500 to-red-600'
      };
    }
    if (tierMode === 'med') {
      return {
        titleEn: '🟡 STAR NAVIGATOR',
        titleZh: '🟡 进阶领航精英水手',
        color: 'from-amber-400 to-orange-500'
      };
    }
    if (tierMode === 'easy') {
      return {
        titleEn: '🟢 FOUNDATION CHAMPION',
        titleZh: '🟢 扎实数感稳健冠军',
        color: 'from-emerald-400 to-teal-500'
      };
    }
    return {
      titleEn: '🌟 ALL-ROUND CONQUEROR',
      titleZh: '🌟 全能阶梯通关大赢家',
      color: 'from-blue-500 to-indigo-600'
    };
  };

  const honor = getHonorTitle();
  const isFlawless = correctFirstTryCount === totalQuestions;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      {/* Background Rotating Sunburst Rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-25">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-amber-400 via-yellow-200 to-transparent animate-[spin_30s_linear_infinite]" />
      </div>

      {/* Main Celebration Card */}
      <div className="bg-white comic-box-lg rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center relative z-10 animate-in zoom-in-95 bg-halftone-gold shadow-2xl border-4 border-slate-900">
        {/* 3D vs 2D Trophy Mode Toggle */}
        <div className="flex justify-center mb-2">
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setShow3dTrophy(v => !v);
            }}
            className="px-3 py-1 bg-amber-100 hover:bg-amber-200 border-2 border-slate-900 rounded-xl font-comic text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Sparkles size={13} className="text-amber-600" />
            <span>{show3dTrophy ? (lang === 'zh' ? '切换 2D 宝箱' : 'View 2D Chest') : (lang === 'zh' ? '✨ 开启 3D 金舵奖杯' : '✨ 3D Mariner Trophy')}</span>
          </button>
        </div>

        {/* Animated Chest & 3D Trophy Central Stage */}
        {show3dTrophy ? (
          <div className="mb-2">
            <MarinerTrophy3D
              title={lang === 'zh' ? '水手金舵奥数奖杯' : 'Mariner Golden Helm Trophy'}
              subtitle={lang === 'zh' ? '四年级数学闯关大获全胜' : 'Grade 4 Math Stage Complete'}
              starsCount={starsEarned}
              interactive={true}
            />
          </div>
        ) : (
          <div className="relative w-36 h-36 mx-auto mb-4 flex items-center justify-center">
            {/* Light Glow Aura */}
            <div className="absolute inset-0 bg-amber-400 rounded-full blur-xl opacity-60 animate-pulse" />

            {/* Treasure Chest or Trophy */}
            <div
              className={`w-32 h-32 rounded-3xl bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 border-4 border-slate-900 comic-box flex flex-col items-center justify-center transition-all duration-700 ${
                chestOpened ? 'scale-105 rotate-2' : 'scale-95 animate-bounce'
              }`}
            >
              <span className="text-6xl drop-shadow-md transition-transform duration-500 transform hover:scale-125">
                {chestOpened ? '🏆' : '🎁'}
              </span>
              <span className="font-comic text-[11px] font-bold text-slate-900 bg-white/90 px-2 py-0.5 rounded-full border border-slate-900 mt-1 shadow-sm">
                {chestOpened ? 'VICTORY!' : 'OPENING...'}
              </span>
            </div>

            {/* Flying Gems & Coins Burst */}
            {chestOpened && (
              <>
                <span className="absolute -top-3 -left-3 text-2xl animate-bounce">🪙</span>
                <span className="absolute -top-4 -right-3 text-2xl animate-pulse">💎</span>
                <span className="absolute -bottom-2 -left-4 text-2xl animate-bounce">⭐</span>
                <span className="absolute -bottom-3 -right-3 text-2xl animate-pulse">✨</span>
              </>
            )}
          </div>
        )}

        {/* Honor Badge Banner */}
        <div className={`inline-block px-4 py-1.5 rounded-2xl bg-gradient-to-r ${honor.color} text-white font-comic text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md mb-2 border-2 border-slate-900`}>
          {lang === 'zh' ? honor.titleZh : honor.titleEn}
        </div>

        <h2 className="font-comic text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-1">
          {lang === 'zh' ? '🎉 胜利大通关！' : '🎉 Stage Conquered!'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-semibold mb-4">
          Week {weekNumber} · {lang === 'zh' ? weekTitleZh : weekTitleEn}
        </p>

        {/* 3 Staggered Grand Gold Stars */}
        <div className="flex items-center justify-center gap-3 my-4">
          {[1, 2, 3].map(starNum => (
            <div
              key={starNum}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-slate-900 comic-box transition-all duration-500 ${
                starsRevealed >= starNum
                  ? 'bg-amber-400 text-slate-900 scale-110 rotate-3 shadow-comic'
                  : 'bg-slate-100 text-slate-300 scale-95 opacity-50'
              }`}
            >
              <Star
                size={32}
                className={starsRevealed >= starNum ? 'fill-amber-300 text-slate-900' : 'text-slate-300'}
              />
            </div>
          ))}
        </div>

        {/* Flawless First-Try Badge if applicable */}
        {isFlawless && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 border-2 border-slate-900 rounded-xl font-comic text-xs font-bold text-emerald-900 mb-4 shadow-sm animate-pulse">
            <Sparkles size={14} className="text-emerald-600" />
            <span>{lang === 'zh' ? '⚡ 100% 一击全中！完美首答大师！' : '⚡ 100% Flawless First-Try Accuracy!'}</span>
          </div>
        )}

        {/* Victory Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-6 text-left">
          <div className="bg-amber-50 p-3 rounded-2xl border-2 border-slate-900 comic-box-sm">
            <div className="text-xs text-slate-500 font-bold mb-0.5">⭐ {lang === 'zh' ? '获得星星' : 'Stars'}</div>
            <div className="font-comic text-xl font-bold text-amber-900">+{starsEarned}</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-2xl border-2 border-slate-900 comic-box-sm">
            <div className="text-xs text-slate-500 font-bold mb-0.5">🎯 {lang === 'zh' ? '正确题数' : 'Score'}</div>
            <div className="font-comic text-xl font-bold text-blue-900">{totalQuestions}/{totalQuestions}</div>
          </div>
          <div className="bg-emerald-50 p-3 rounded-2xl border-2 border-slate-900 comic-box-sm">
            <div className="text-xs text-slate-500 font-bold mb-0.5">⚡ {lang === 'zh' ? '首次答对' : '1st Try'}</div>
            <div className="font-comic text-xl font-bold text-emerald-900">{correctFirstTryCount}/{totalQuestions}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          {/* Practice Another Variant with Different Numbers */}
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              onPlayAgainVariant();
            }}
            className="w-full sm:flex-1 comic-btn py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-comic font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-comic"
            title="Practice again with varied numbers"
          >
            <RefreshCw size={16} />
            <span>{lang === 'zh' ? '🔄 换一组变式题练习' : '🔄 Practice New Variant'}</span>
          </button>

          {/* Level Up to Higher Difficulty */}
          {tierMode !== 'olympiad' && (
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                onTryHigherDifficulty();
              }}
              className="w-full sm:flex-1 comic-btn py-3 bg-purple-500 hover:bg-purple-400 text-white font-comic font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-comic"
            >
              <span>👑 {lang === 'zh' ? '挑战更难题目' : 'Level Up Difficulty'}</span>
            </button>
          )}

          {/* Return to Map */}
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              onReturnToMap();
            }}
            className="w-full sm:flex-1 comic-btn py-3 bg-slate-900 hover:bg-slate-800 text-white font-comic font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-comic"
          >
            <Compass size={16} />
            <span>{lang === 'zh' ? '返回航海图' : 'Back to Map'}</span>
          </button>
        </div>

        {/* Dedication Tag */}
        <div className="mt-4 pt-3 border-t border-amber-200 text-[11px] font-comic text-slate-500 flex items-center justify-center gap-1.5">
          <span>👨‍👩‍👧</span>
          <span>Crafted by Yang &amp; Melody for Millen Woods Mariners</span>
        </div>
      </div>
    </div>
  );
};

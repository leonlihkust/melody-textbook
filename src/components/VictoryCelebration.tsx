import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Star, Sparkles, RefreshCw, Compass } from 'lucide-react';
import { playChestFanfare, playClickSound } from '../utils/audio';
import { MarinerTrophy3D } from './MarinerTrophy3D';
import { triggerWeekVictoryConfetti } from '../utils/confettiExplosion';
import { Language, I18N } from '../utils/i18n';

interface VictoryCelebrationProps {
  isOpen: boolean;
  starsEarned: number;
  totalQuestions: number;
  correctFirstTryCount: number;
  weekNumber: number;
  weekTitleEn: string;
  weekTitleZh: string;
  weekTitleFr?: string;
  tierMode: 'all' | 'easy' | 'med' | 'boss' | 'olympiad';
  lang: Language;
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
  weekTitleFr,
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
  const t = I18N[lang].victory;

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

    // Sequence: Grand festive confetti explosion
    triggerWeekVictoryConfetti();

    // Sequence 2: Open chest after 450ms
    const openTimer = setTimeout(() => {
      setChestOpened(true);
    }, 450);

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

  const getHonorTitle = () => {
    if (tierMode === 'olympiad') {
      return {
        titleEn: '👑 OLYMPIAD MARINER HERO',
        titleFr: '👑 HÉROS DES OLYMPIADES',
        titleZh: '👑 奥数水手终极先锋',
        color: 'from-purple-500 to-indigo-600'
      };
    }
    if (tierMode === 'boss') {
      return {
        titleEn: '🔴 BOSS SLAYER MASTER',
        titleFr: '🔴 MAÎTRE DU DÉFI SUPRÊME',
        titleZh: '🔴 高难度挑战大元帅',
        color: 'from-rose-500 to-amber-500'
      };
    }
    if (tierMode === 'med') {
      return {
        titleEn: '🟡 SKILLED MARINER PILOT',
        titleFr: '🟡 PILOTE MARIN EXPÉRIMENTÉ',
        titleZh: '🟡 进阶探险熟练领航',
        color: 'from-amber-400 to-orange-500'
      };
    }
    if (tierMode === 'easy') {
      return {
        titleEn: '🟢 FOUNDATION CHAMPION',
        titleFr: '🟢 CHAMPION DES BASES',
        titleZh: '🟢 扎实数感稳健冠军',
        color: 'from-emerald-400 to-teal-500'
      };
    }
    return {
      titleEn: '🌟 ALL-ROUND CONQUEROR',
      titleFr: '🌟 VAINQUEUR TOUT-TERRAIN',
      titleZh: '🌟 全能阶梯通关大赢家',
      color: 'from-blue-500 to-indigo-600'
    };
  };

  const honor = getHonorTitle();
  const honorText = lang === 'fr' ? honor.titleFr : lang === 'zh' ? honor.titleZh : honor.titleEn;
  const isFlawless = correctFirstTryCount === totalQuestions;
  const currentWeekTitle = lang === 'fr' ? (weekTitleFr || weekTitleEn) : lang === 'zh' ? weekTitleZh : weekTitleEn;
  const weekLabel = lang === 'fr' ? `Semaine ${weekNumber}` : lang === 'zh' ? `第 ${weekNumber} 周` : `Week ${weekNumber}`;

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
            className="px-3 py-1 bg-amber-100 hover:bg-amber-200 border-2 border-slate-900 rounded-xl font-comic text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Sparkles size={13} className="text-amber-600" />
            <span>
              {show3dTrophy
                ? (lang === 'fr' ? 'Vue 2D Coffre' : lang === 'zh' ? '切换 2D 宝箱' : 'View 2D Chest')
                : (lang === 'fr' ? '✨ Trophée 3D' : lang === 'zh' ? '✨ 开启 3D 金舵奖杯' : '✨ 3D Mariner Trophy')}
            </span>
          </button>
        </div>

        {/* Animated Chest & 3D Trophy Central Stage */}
        {show3dTrophy ? (
          <div className="mb-2">
            <MarinerTrophy3D
              title={lang === 'fr' ? 'Trophée Gouvernail d\'Or' : lang === 'zh' ? '水手金舵奥数奖杯' : 'Mariner Golden Helm Trophy'}
              subtitle={lang === 'fr' ? 'Étape de 4e année complétée' : lang === 'zh' ? '四年级数学闯关大获全胜' : 'Grade 4 Math Stage Complete'}
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
                {chestOpened ? (lang === 'fr' ? 'VICTOIRE !' : 'VICTORY!') : (lang === 'fr' ? 'OUVERTURE...' : 'OPENING...')}
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
          {honorText}
        </div>

        <h2 className="font-comic text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-1">
          {t.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-semibold mb-4">
          {weekLabel} · {currentWeekTitle}
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
            <span>{t.firstTryPerfect}</span>
          </div>
        )}

        {/* Victory Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-6 text-left">
          <div className="bg-amber-50 p-3 rounded-2xl border-2 border-slate-900 comic-box-sm">
            <div className="text-xs text-slate-500 font-bold mb-0.5">⭐ {t.starsEarned}</div>
            <div className="font-comic text-xl font-bold text-amber-900">+{starsEarned}</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-2xl border-2 border-slate-900 comic-box-sm">
            <div className="text-xs text-slate-500 font-bold mb-0.5">🎯 {lang === 'fr' ? 'Score' : lang === 'zh' ? '正确题数' : 'Score'}</div>
            <div className="font-comic text-xl font-bold text-blue-900">{totalQuestions}/{totalQuestions}</div>
          </div>
          <div className="bg-emerald-50 p-3 rounded-2xl border-2 border-slate-900 comic-box-sm">
            <div className="text-xs text-slate-500 font-bold mb-0.5">⚡ {lang === 'fr' ? '1er coup' : lang === 'zh' ? '首次答对' : '1st Try'}</div>
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
            className="w-full sm:flex-1 comic-btn py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-comic font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-comic cursor-pointer"
            title="Practice again with varied numbers"
          >
            <RefreshCw size={16} />
            <span>{t.playAgainVariant}</span>
          </button>

          {/* Level Up to Higher Difficulty */}
          {tierMode !== 'olympiad' && (
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                onTryHigherDifficulty();
              }}
              className="w-full sm:flex-1 comic-btn py-3 bg-purple-500 hover:bg-purple-400 text-white font-comic font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-comic cursor-pointer"
            >
              <span>{t.tryOlympiad}</span>
            </button>
          )}

          {/* Return to Map */}
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              onReturnToMap();
            }}
            className="w-full sm:flex-1 comic-btn py-3 bg-slate-900 hover:bg-slate-800 text-white font-comic font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-comic cursor-pointer"
          >
            <Compass size={16} />
            <span>{t.returnToMap}</span>
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

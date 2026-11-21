import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  VolumeX,
  Star,
  Palette,
  BookOpen,
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Eye,
  EyeOff,
  ArrowRight,
  Award,
} from 'lucide-react';
import {
  CANADA_LANDFORM_REGIONS,
  CanadaLandformRegion,
  CanadaRegionId,
} from '../data/canadaLandformsData';
import { CanadaLandformMap } from './CanadaLandformMap';
import { CanadaRegionIllustration } from './CanadaRegionIllustration';
import {
  playClickSound,
  playCorrectSound,
  playClueSound,
  speakText,
  stopSpeaking,
} from '../utils/audio';
import { triggerBadgeUnlockConfetti } from '../utils/confettiExplosion';
import { Language } from '../utils/i18n';

interface CanadaLandformsExplorerProps {
  lang: Language;
  soundEnabled: boolean;
  unlockedBadges: string[];
  onUnlockBadge: (badgeId: string) => void;
}

type SubMode = 'study' | 'colorMap' | 'fridayQuiz';
type GradeLevel = 'grade4' | 'grade3';

interface QuizQuestion {
  type: 'map' | 'choice';
  categoryLabel: { en: string; fr: string; zh: string };
  categoryIcon: string;
  prompt: { en: string; fr: string; zh: string };
  targetRegionId: CanadaRegionId;
  options?: Array<{
    id: string;
    icon: string;
    text: { en: string; fr: string; zh: string };
    isCorrect: boolean;
  }>;
  explanation: { en: string; fr: string; zh: string };
}

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const CanadaLandformsExplorer: React.FC<CanadaLandformsExplorerProps> = ({
  lang,
  soundEnabled,
  unlockedBadges,
  onUnlockBadge,
}) => {
  const [subMode, setSubMode] = useState<SubMode>('study');
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('grade4');
  const [selectedRegionId, setSelectedRegionId] = useState<CanadaRegionId>('stlawrence');

  // Saved "My Group Project Region" so the student can pin the exact region they present on Friday
  const [myProjectRegionId, setMyProjectRegionId] = useState<CanadaRegionId>(() => {
    try {
      const saved = localStorage.getItem('mariner_canada_project_region') as CanadaRegionId | null;
      if (saved && CANADA_LANDFORM_REGIONS.some(r => r.id === saved)) return saved;
    } catch {
      // ignore storage errors
    }
    return 'shield';
  });

  const [isSpeaking, setIsSpeaking] = useState(false);

  // --- Color-the-Map Game State ---
  const [mapPracticeMode, setMapPracticeMode] = useState<'challenge' | 'explore'>('challenge');
  const [showMapLabels, setShowMapLabels] = useState(false);
  const [coloredRegions, setColoredRegions] = useState<CanadaRegionId[]>([]);
  const [wrongMapRegionId, setWrongMapRegionId] = useState<CanadaRegionId | null>(null);
  const [mapChallengeQueue, setMapChallengeQueue] = useState<CanadaRegionId[]>([]);
  const [mapFeedback, setMapFeedback] = useState<string | null>(null);

  // --- Friday Quiz Simulator State ---
  const [quizRegionId, setQuizRegionId] = useState<CanadaRegionId>(myProjectRegionId);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizStep, setQuizStep] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizMapSolved, setQuizMapSolved] = useState(false);
  const [quizWrongMapId, setQuizWrongMapId] = useState<CanadaRegionId | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizCorrectCount, setQuizCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const activeRegions = useMemo(
    () =>
      gradeLevel === 'grade3'
        ? CANADA_LANDFORM_REGIONS.filter(r => r.inOntario)
        : CANADA_LANDFORM_REGIONS,
    [gradeLevel]
  );

  const selectedRegion = useMemo(
    () =>
      CANADA_LANDFORM_REGIONS.find(r => r.id === selectedRegionId) ||
      CANADA_LANDFORM_REGIONS[0],
    [selectedRegionId]
  );

  // Ensure selected region stays inside active list when toggling Grade 3 Ontario filter
  useEffect(() => {
    if (!activeRegions.some(r => r.id === selectedRegionId)) {
      setSelectedRegionId(activeRegions[0].id);
    }
  }, [activeRegions, selectedRegionId]);

  // Keep Friday Quiz aligned with Grade 3 (Ontario 3 regions, no Jobs question) vs Grade 4
  useEffect(() => {
    if (subMode === 'fridayQuiz') {
      const validId = activeRegions.some(r => r.id === quizRegionId)
        ? quizRegionId
        : activeRegions[0].id;
      setQuizRegionId(validId);
      buildFridayQuiz(validId, gradeLevel);
    }
  }, [gradeLevel]);

  // Reset map challenge queue whenever grade level or map mode changes
  const resetMapChallenge = (regionsList: CanadaLandformRegion[] = activeRegions) => {
    setColoredRegions([]);
    setWrongMapRegionId(null);
    setMapFeedback(null);
    setMapChallengeQueue(shuffleArray(regionsList.map(r => r.id)));
  };

  useEffect(() => {
    resetMapChallenge(activeRegions);
  }, [gradeLevel, mapPracticeMode]);

  const currentMapTargetId = mapChallengeQueue[0] || null;
  const currentMapTarget = currentMapTargetId
    ? CANADA_LANDFORM_REGIONS.find(r => r.id === currentMapTargetId) || null
    : null;

  const handlePinProjectRegion = (id: CanadaRegionId) => {
    if (soundEnabled) playCorrectSound();
    setMyProjectRegionId(id);
    setQuizRegionId(id);
    try {
      localStorage.setItem('mariner_canada_project_region', id);
    } catch {
      // ignore storage errors
    }
  };

  const handleSpeak = (text: string, speakLang: Language = lang) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakText(text, speakLang, () => setIsSpeaking(false));
  };

  const handleSpeakRegionStudySheet = (region: CanadaLandformRegion, targetLang: Language) => {
    const jobsText = region.jobs.list.map(j => j.label[targetLang]).join(', ');
    const includeJobs = gradeLevel === 'grade4';
    const script =
      targetLang === 'fr'
        ? `${region.name.fr}. Relief : ${region.relief.summary.fr} Climat : ${region.climate.summary.fr} Végétation : ${region.vegetation.summary.fr} ${includeJobs ? `Emplois : ${jobsText}. ` : ''}Population : ${region.population.fr}.`
        : targetLang === 'zh'
        ? `${region.name.zh}。地形特征：${region.relief.summary.zh} 气候：${region.climate.summary.zh} 植被：${region.vegetation.summary.zh} ${includeJobs ? `主要工作：${jobsText}。` : ''}人口：${region.population.zh}。`
        : `${region.name.en}. Landscape: ${region.relief.summary.en} Climate: ${region.climate.summary.en} Vegetation: ${region.vegetation.summary.en} ${includeJobs ? `Jobs: ${jobsText}. ` : ''}Population: ${region.population.en}.`;
    handleSpeak(script, targetLang);
  };

  // --- Color-the-Map click handler ---
  const handleMapRegionClick = (clickedId: CanadaRegionId) => {
    if (mapPracticeMode === 'explore') {
      setSelectedRegionId(clickedId);
      setColoredRegions(prev =>
        prev.includes(clickedId) ? prev : [...prev, clickedId]
      );
      return;
    }

    // Challenge mode ("Find & Color!")
    if (!currentMapTargetId || !currentMapTarget) return;

    if (clickedId === currentMapTargetId) {
      if (soundEnabled) playCorrectSound();
      setWrongMapRegionId(null);
      const nextColored = [...coloredRegions, clickedId];
      setColoredRegions(nextColored);
      const nextQueue = mapChallengeQueue.slice(1);
      setMapChallengeQueue(nextQueue);
      setMapFeedback(
        lang === 'fr'
          ? `Bravo ! Tu as bien colorié ${currentMapTarget.name.fr} !`
          : lang === 'zh'
          ? `太棒了！成功为【${currentMapTarget.name.zh}】涂上颜色！`
          : `Awesome! You colored ${currentMapTarget.name.en}!`
      );
      if (nextQueue.length === 0) {
        confetti({
          particleCount: 80,
          spread: 75,
          origin: { y: 0.6 },
        });
      }
    } else {
      if (soundEnabled) playClueSound();
      setWrongMapRegionId(clickedId);
      const clickedRegion = CANADA_LANDFORM_REGIONS.find(r => r.id === clickedId);
      setMapFeedback(
        lang === 'fr'
          ? `Oups ! C'était ${clickedRegion?.shortName.fr}. Indice : ${currentMapTarget.location.fr}`
          : lang === 'zh'
          ? `再试一次！你点的是【${clickedRegion?.shortName.zh}】。提示：${currentMapTarget.location.zh}`
          : `Try again! That was ${clickedRegion?.shortName.en}. Hint: ${currentMapTarget.location.en}`
      );
      setTimeout(() => setWrongMapRegionId(null), 650);
    }
  };

  // --- Build Friday Quiz Questions matching teacher's exact rubric ---
  const buildFridayQuiz = (targetId: CanadaRegionId, grade: GradeLevel) => {
    const target =
      CANADA_LANDFORM_REGIONS.find(r => r.id === targetId) || CANADA_LANDFORM_REGIONS[0];
    const distractors = shuffleArray(
      CANADA_LANDFORM_REGIONS.filter(r => r.id !== target.id)
    ).slice(0, 3);

    const pool = [target, ...distractors];

    const questions: QuizQuestion[] = [
      // 1. Identify on pre-divided map
      {
        type: 'map',
        categoryIcon: '🗺️',
        categoryLabel: {
          en: '1. Map Coloring',
          fr: '1. Carte à colorier',
          zh: '1. 地图填色定位',
        },
        prompt: {
          en: `Click to colour "${target.name.en}" on the map!`,
          fr: `Clique pour colorier « ${target.name.fr} » sur la carte !`,
          zh: `在地图上点击，为【${target.name.zh}】涂上颜色！`,
        },
        targetRegionId: target.id,
        explanation: {
          en: `Location: ${target.location.en}`,
          fr: `Où est-elle située : ${target.location.fr}`,
          zh: `地理位置：${target.location.zh}`,
        },
      },
      // 2. Describe Relief (Landscape)
      {
        type: 'choice',
        categoryIcon: '⛰️',
        categoryLabel: {
          en: '2. Landscape (Relief)',
          fr: '2. Le Relief',
          zh: '2. 地形特征 (Relief)',
        },
        prompt: {
          en: `Which best describes the landscape (relief) of ${target.name.en}?`,
          fr: `Quel relief décrit le mieux ${target.name.fr} ?`,
          zh: `哪一项最符合【${target.name.zh}】的地形（Relief）？`,
        },
        targetRegionId: target.id,
        options: shuffleArray(
          pool.map(r => ({
            id: r.id,
            icon: r.relief.icon,
            text: r.relief.summary,
            isCorrect: r.id === target.id,
          }))
        ),
        explanation: target.relief.summary,
      },
      // 3. Describe Vegetation
      {
        type: 'choice',
        categoryIcon: '🌲',
        categoryLabel: {
          en: '3. Vegetation',
          fr: '3. La Végétation',
          zh: '3. 植物植被 (Végétation)',
        },
        prompt: {
          en: `What plants & trees grow in ${target.name.en}?`,
          fr: `Quelle végétation trouve-t-on dans ${target.name.fr} ?`,
          zh: `【${target.name.zh}】生长着什么植被（Végétation）？`,
        },
        targetRegionId: target.id,
        options: shuffleArray(
          pool.map(r => ({
            id: r.id,
            icon: r.vegetation.icon,
            text: r.vegetation.summary,
            isCorrect: r.id === target.id,
          }))
        ),
        explanation: target.vegetation.summary,
      },
      // 4. Describe Climate
      {
        type: 'choice',
        categoryIcon: '🌤️',
        categoryLabel: {
          en: '4. Climate',
          fr: '4. Le Climat',
          zh: '4. 气候特点 (Climat)',
        },
        prompt: {
          en: `What is the climate like in ${target.name.en}?`,
          fr: `Quel est le climat de ${target.name.fr} ?`,
          zh: `【${target.name.zh}】的气候（Climat）是怎样的？`,
        },
        targetRegionId: target.id,
        options: shuffleArray(
          pool.map(r => ({
            id: r.id,
            icon: r.climate.icon,
            text: r.climate.summary,
            isCorrect: r.id === target.id,
          }))
        ),
        explanation: target.climate.summary,
      },
    ];

    // 5. Jobs (Grade 4 only — per teacher's email!)
    if (grade === 'grade4') {
      questions.push({
        type: 'choice',
        categoryIcon: '👷',
        categoryLabel: {
          en: '5. Jobs (Grade 4)',
          fr: '5. Les Emplois (4e année)',
          zh: '5. 主要工作（四年级必考）',
        },
        prompt: {
          en: `Which jobs are listed on your class sheet for ${target.name.en}?`,
          fr: `Quels emplois sont importants dans ${target.name.fr} ?`,
          zh: `根据课堂讲义，【${target.name.zh}】有哪些主要工作（Emploi）？`,
        },
        targetRegionId: target.id,
        options: shuffleArray(
          pool.map(r => ({
            id: r.id,
            icon: r.jobs.icon,
            text: {
              en: r.jobs.list.map(j => j.label.en).join(' · '),
              fr: r.jobs.list.map(j => j.label.fr).join(' · '),
              zh: r.jobs.list.map(j => j.label.zh).join(' · '),
            },
            isCorrect: r.id === target.id,
          }))
        ),
        explanation: {
          en: `Jobs: ${target.jobs.list.map(j => j.label.en).join(', ')}`,
          fr: `Emplois : ${target.jobs.list.map(j => j.label.fr).join(', ')}`,
          zh: `主要工作：${target.jobs.list.map(j => j.label.zh).join('、')}`,
        },
      });
    }

    // 6. BONUS question (Soil/Agriculture & Population from teacher's slide!)
    questions.push({
      type: 'choice',
      categoryIcon: '🌟',
      categoryLabel: {
        en: 'BONUS: Soil, Agriculture & Population',
        fr: 'BONUS : Sol, Agriculture et Population',
        zh: '加分题 (BONUS)：土壤农业与人口',
      },
      prompt: {
        en: `BONUS! Which Soil/Agriculture & Population fact matches ${target.name.en}?`,
        fr: `BONUS ! Quelle fiche Sol/Agriculture et Population correspond à ${target.name.fr} ?`,
        zh: `加分题！哪一项土壤农业与人口信息属于【${target.name.zh}】？`,
      },
      targetRegionId: target.id,
      options: shuffleArray(
        pool.map(r => ({
          id: r.id,
          icon: r.soilAgriculture.icon,
          text: {
            en: `${r.soilAgriculture.summary.en} (${r.population.en})`,
            fr: `${r.soilAgriculture.summary.fr} (${r.population.fr})`,
            zh: `${r.soilAgriculture.summary.zh}（${r.population.zh}）`,
          },
          isCorrect: r.id === target.id,
        }))
      ),
      explanation: target.bonusFact,
    });

    setQuizQuestions(questions);
    setQuizStep(0);
    setQuizSelectedOption(null);
    setQuizMapSolved(false);
    setQuizWrongMapId(null);
    setQuizAnswered(false);
    setQuizCorrectCount(0);
    setQuizFinished(false);
  };

  const startFridayQuiz = (regionId: CanadaRegionId = quizRegionId) => {
    if (soundEnabled) playClickSound();
    stopSpeaking();
    setIsSpeaking(false);
    const validId = activeRegions.some(r => r.id === regionId)
      ? regionId
      : activeRegions[0].id;
    setQuizRegionId(validId);
    buildFridayQuiz(validId, gradeLevel);
    setSubMode('fridayQuiz');
  };

  const currentQuestion = quizQuestions[quizStep];

  const handleQuizMapClick = (clickedId: CanadaRegionId) => {
    if (!currentQuestion || currentQuestion.type !== 'map' || quizAnswered) return;
    if (clickedId === currentQuestion.targetRegionId) {
      if (soundEnabled) playCorrectSound();
      setQuizMapSolved(true);
      setQuizAnswered(true);
      setQuizCorrectCount(c => c + 1);
      setQuizWrongMapId(null);
    } else {
      if (soundEnabled) playClueSound();
      setQuizWrongMapId(clickedId);
      setTimeout(() => setQuizWrongMapId(null), 650);
    }
  };

  const handleQuizOptionPick = (optId: string, isCorrect: boolean) => {
    if (quizAnswered) return;
    setQuizSelectedOption(optId);
    setQuizAnswered(true);
    if (isCorrect) {
      if (soundEnabled) playCorrectSound();
      setQuizCorrectCount(c => c + 1);
    } else {
      if (soundEnabled) playClueSound();
    }
  };

  const handleNextQuizStep = () => {
    if (soundEnabled) playClickSound();
    if (quizStep + 1 < quizQuestions.length) {
      setQuizStep(s => s + 1);
      setQuizSelectedOption(null);
      setQuizMapSolved(false);
      setQuizWrongMapId(null);
      setQuizAnswered(false);
    } else {
      setQuizFinished(true);
      const targetRegion = CANADA_LANDFORM_REGIONS.find(r => r.id === quizRegionId);
      if (targetRegion && quizCorrectCount >= Math.ceil(quizQuestions.length * 0.6)) {
        triggerBadgeUnlockConfetti();
        onUnlockBadge(targetRegion.badgeId);
      } else {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
    }
  };

  const earnedCanadaBadges = unlockedBadges.filter(id =>
    CANADA_LANDFORM_REGIONS.some(r => r.badgeId === id)
  ).length;

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-5 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white comic-box rounded-2xl p-4 sm:p-5 mb-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="text-3xl">🍁</span>
            <h1 className="font-comic text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {lang === 'fr'
                ? 'Les Régions Physiques du Canada'
                : lang === 'zh'
                ? '加拿大地貌分区 · 社会课测验冲刺'
                : 'Canada Landform Regions · Quiz Prep'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {lang === 'fr'
              ? 'Révise la carte à colorier, le relief, le climat, la végétation et les emplois pour le quiz de vendredi !'
              : lang === 'zh'
              ? '紧扣下周五测验大纲：地图填色、地形 (Relief)、植被、气候、工作与加分项一站式复习！'
              : 'Practice map coloring, landscape (relief), vegetation, climate, jobs & bonus facts for Friday’s quiz!'}
          </p>
        </div>

        {/* Grade 3 / Grade 4 Selector + Badge Progress */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center bg-slate-100 border-2 border-slate-900 rounded-xl p-1">
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setGradeLevel('grade3');
              }}
              className={`px-3 py-1.5 rounded-lg font-comic text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                gradeLevel === 'grade3'
                  ? 'bg-red-600 text-white'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              {lang === 'fr' ? '3e (Ontario · 3)' : lang === 'zh' ? '3年级 (安省3区)' : 'Grade 3 (ON · 3)'}
            </button>
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setGradeLevel('grade4');
              }}
              className={`px-3 py-1.5 rounded-lg font-comic text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                gradeLevel === 'grade4'
                  ? 'bg-red-600 text-white'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              {lang === 'fr' ? '4e (Canada · 7)' : lang === 'zh' ? '4年级 (全加7区)' : 'Grade 4 (All · 7)'}
            </button>
          </div>

          <div className="text-xs font-comic font-bold text-slate-700 tabular-nums">
            <span>🏅 </span>
            <span className="text-red-700">{earnedCanadaBadges}</span>
            <span className="text-slate-400"> / {CANADA_LANDFORM_REGIONS.length}</span>
          </div>
        </div>
      </div>

      {/* Primary Mode Switcher Tabs (3 clear workflows) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
        <button
          onClick={() => {
            if (soundEnabled) playClickSound();
            stopSpeaking();
            setIsSpeaking(false);
            setSubMode('study');
          }}
          className={`comic-btn py-2.5 px-4 rounded-xl font-comic text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            subMode === 'study'
              ? 'bg-red-600 text-white shadow-comic'
              : 'bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-900'
          }`}
        >
          <BookOpen size={16} />
          <span>
            {lang === 'fr'
              ? '1. Fiches Visuelles'
              : lang === 'zh'
              ? '1. 图解知识卡片'
              : '1. Visual Study Cards'}
          </span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) playClickSound();
            stopSpeaking();
            setIsSpeaking(false);
            setSubMode('colorMap');
          }}
          className={`comic-btn py-2.5 px-4 rounded-xl font-comic text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            subMode === 'colorMap'
              ? 'bg-blue-600 text-white shadow-comic'
              : 'bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-900'
          }`}
        >
          <Palette size={16} />
          <span>
            {lang === 'fr'
              ? '2. Colorier la Carte'
              : lang === 'zh'
              ? '2. 地图填色特训'
              : '2. Color-the-Map Game'}
          </span>
        </button>

        <button
          onClick={() => startFridayQuiz(myProjectRegionId)}
          className={`comic-btn py-2.5 px-4 rounded-xl font-comic text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            subMode === 'fridayQuiz'
              ? 'bg-amber-400 text-slate-950 shadow-comic'
              : 'bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-900'
          }`}
        >
          <ClipboardCheck size={16} />
          <span>
            {lang === 'fr'
              ? '3. Quiz de Vendredi'
              : lang === 'zh'
              ? '3. 周五模拟测验'
              : '3. Friday Quiz Practice'}
          </span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* MODE 1: VISUAL STUDY CARDS (TWO-ZONE SANDBOX LAYOUT)      */}
      {/* ========================================================= */}
      {subMode === 'study' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Rail: Region Selector List (7 or 3 Regions) */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-comic font-bold text-slate-500 px-1 mb-1">
              {lang === 'fr'
                ? 'Choisis une région (⭐ = mon projet) :'
                : lang === 'zh'
                ? '选择要复习的地貌区（⭐ 可标记你的小组课题）：'
                : 'Select a region (⭐ = pin your group project):'}
            </div>

            {activeRegions.map(region => {
              const isSelected = region.id === selectedRegion.id;
              const isPinned = region.id === myProjectRegionId;
              const isUnlocked = unlockedBadges.includes(region.badgeId);

              return (
                <div
                  key={region.id}
                  onClick={() => {
                    if (soundEnabled) playClickSound();
                    stopSpeaking();
                    setIsSpeaking(false);
                    setSelectedRegionId(region.id);
                  }}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                    isSelected
                      ? 'bg-white border-slate-900 shadow-comic'
                      : 'bg-white/80 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-10 h-10 rounded-xl border-2 border-slate-900 flex items-center justify-center text-xl shrink-0"
                      style={{ backgroundColor: `${region.color}33` }}
                    >
                      {region.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="font-comic text-sm font-black text-slate-900 truncate">
                        {region.slideNumber}. {region.shortName[lang]}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium truncate">
                        {lang !== 'fr' ? region.name.fr : region.tagline.fr}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {isUnlocked && (
                      <span title="Badge Earned" className="text-sm">
                        🏅
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        handlePinProjectRegion(region.id);
                      }}
                      title={
                        lang === 'fr'
                          ? 'Marquer comme ma région de projet'
                          : lang === 'zh'
                          ? '设为我的小组研究区域'
                          : 'Pin as my group project region'
                      }
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isPinned
                          ? 'text-amber-500 bg-amber-50'
                          : 'text-slate-300 hover:text-amber-400'
                      }`}
                    >
                      <Star size={16} fill={isPinned ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Main Stage: Illustrated Visual Study Sheet */}
          <div className="lg:col-span-8 bg-white comic-box rounded-2xl p-4 sm:p-6">
            {/* Title Row + Audio Controls (including French Immersion Read-Aloud!) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="text-xs font-semibold text-slate-500 mb-0.5">
                  {lang === 'fr'
                    ? `Fiche #${selectedRegion.slideNumber}`
                    : lang === 'zh'
                    ? `课堂讲义第 ${selectedRegion.slideNumber} 区 · ${selectedRegion.name.fr}`
                    : `Slide #${selectedRegion.slideNumber} · ${selectedRegion.name.fr}`}
                  {selectedRegion.id === myProjectRegionId && (
                    <span className="text-amber-600 font-bold">
                      {' '}
                      · ⭐{' '}
                      {lang === 'fr'
                        ? 'Mon projet'
                        : lang === 'zh'
                        ? '我的课题区'
                        : 'My Project'}
                    </span>
                  )}
                </div>
                <h2 className="font-comic text-xl sm:text-2xl font-black text-slate-900">
                  {selectedRegion.icon} {selectedRegion.name[lang]}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {/* Primary language read-aloud */}
                <button
                  onClick={() => handleSpeakRegionStudySheet(selectedRegion, lang)}
                  className={`comic-btn px-3 py-1.5 rounded-xl border-2 border-slate-900 font-comic text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    isSpeaking
                      ? 'bg-rose-500 text-white'
                      : 'bg-amber-300 hover:bg-amber-200 text-slate-950'
                  }`}
                >
                  {isSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  <span>
                    {isSpeaking
                      ? lang === 'zh'
                        ? '停止'
                        : 'Stop'
                      : lang === 'fr'
                      ? 'Écouter'
                      : lang === 'zh'
                      ? '中文朗读'
                      : 'Read Aloud'}
                  </span>
                </button>

                {/* Always offer French pronunciation button for French Immersion students! */}
                {lang !== 'fr' && (
                  <button
                    onClick={() => handleSpeakRegionStudySheet(selectedRegion, 'fr')}
                    className="comic-btn px-3 py-1.5 rounded-xl border-2 border-slate-900 bg-blue-50 hover:bg-blue-100 text-blue-900 font-comic text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    title="Hear French Immersion vocabulary"
                  >
                    <Volume2 size={14} />
                    <span>🇫🇷 {lang === 'zh' ? '法语发音' : 'Hear French'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Bespoke Landscape Illustration */}
            <div className="mb-5">
              <CanadaRegionIllustration
                region={selectedRegion}
                lang={lang}
                soundEnabled={soundEnabled}
              />
            </div>

            {/* 6 Visual Quiz-Checklist Picture Cards (Zero long paragraphs!) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5">
              {/* 1. Relief (Landscape) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="font-comic text-sm font-black text-slate-900 mb-1.5 flex items-center justify-between">
                  <span>
                    {selectedRegion.relief.icon}{' '}
                    {lang === 'fr'
                      ? 'Relief (Paysage)'
                      : lang === 'zh'
                      ? '地形地貌 (Relief)'
                      : 'Landscape (Relief)'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mb-2">
                  {selectedRegion.relief.summary[lang]}
                </p>
                <div className="text-[11px] font-semibold text-slate-500">
                  {selectedRegion.relief.keywords.map(k => k[lang]).join(' · ')}
                </div>
              </div>

              {/* 2. Climate */}
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200">
                <div className="font-comic text-sm font-black text-slate-900 mb-1.5">
                  {selectedRegion.climate.icon}{' '}
                  {lang === 'fr'
                    ? 'Climat'
                    : lang === 'zh'
                    ? '气候特征 (Climat)'
                    : 'Climate (Climat)'}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mb-2">
                  {selectedRegion.climate.summary[lang]}
                </p>
                <div className="text-[11px] font-semibold text-sky-800/80">
                  {selectedRegion.climate.keywords.map(k => k[lang]).join(' · ')}
                </div>
              </div>

              {/* 3. Vegetation */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <div className="font-comic text-sm font-black text-slate-900 mb-1.5">
                  {selectedRegion.vegetation.icon}{' '}
                  {lang === 'fr'
                    ? 'Végétation'
                    : lang === 'zh'
                    ? '自然植被 (Végétation)'
                    : 'Vegetation (Végétation)'}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mb-2">
                  {selectedRegion.vegetation.summary[lang]}
                </p>
                <div className="text-[11px] font-semibold text-emerald-800/80">
                  {selectedRegion.vegetation.keywords.map(k => k[lang]).join(' · ')}
                </div>
              </div>

              {/* 4. Jobs (Grade 4 Required; Optional Bonus for Grade 3) */}
              <div
                className={`p-4 rounded-2xl border ${
                  gradeLevel === 'grade4'
                    ? 'bg-amber-50/80 border-amber-200'
                    : 'bg-slate-50/70 border-slate-200 opacity-75'
                }`}
              >
                <div className="font-comic text-sm font-black text-slate-900 mb-2 flex items-center justify-between gap-2">
                  <span>
                    {selectedRegion.jobs.icon}{' '}
                    {lang === 'fr'
                      ? gradeLevel === 'grade4'
                        ? 'Emplois (4e année)'
                        : 'Emplois (Bonus 3e)'
                      : lang === 'zh'
                      ? gradeLevel === 'grade4'
                        ? '主要工作 (Emploi · 4年级必考)'
                        : '主要工作 (3年级不考 · 拓展)'
                      : gradeLevel === 'grade4'
                      ? 'Jobs (Grade 4 Quiz)'
                      : 'Jobs (Grade 4 Only · Bonus)'}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {selectedRegion.jobs.list.map((job, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-slate-800 font-bold flex items-center gap-2"
                    >
                      <span>{job.icon}</span>
                      <span>{job.label[lang]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 5. Soil & Agriculture (Bonus from slides) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="font-comic text-sm font-black text-slate-900 mb-1.5">
                  {selectedRegion.soilAgriculture.icon}{' '}
                  {lang === 'fr'
                    ? 'Sol / Agriculture (Bonus)'
                    : lang === 'zh'
                    ? '土壤与农业 (加分项)'
                    : 'Soil & Agriculture (Bonus)'}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {selectedRegion.soilAgriculture.summary[lang]}
                </p>
              </div>

              {/* 6. Population & Location (Bonus from slides) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="font-comic text-sm font-black text-slate-900 mb-1.5">
                  👥{' '}
                  {lang === 'fr'
                    ? 'Population & Où (Bonus)'
                    : lang === 'zh'
                    ? '人口与位置 (加分项)'
                    : 'Population & Location (Bonus)'}
                </div>
                <div className="text-xs sm:text-sm text-slate-800 font-bold tabular-nums mb-1">
                  {selectedRegion.population[lang]}
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  📍 {selectedRegion.location[lang]}
                </div>
              </div>
            </div>

            {/* Bonus Fact Strip + Direct Practice Quiz CTA */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs sm:text-sm text-slate-700 font-medium flex-1">
                <span className="font-comic font-black text-red-700">
                  🌟 {lang === 'fr' ? 'Fait Bonus : ' : lang === 'zh' ? '加分冷知识：' : 'Bonus Fact: '}
                </span>
                {selectedRegion.bonusFact[lang]}
              </div>

              <button
                onClick={() => startFridayQuiz(selectedRegion.id)}
                className="comic-btn w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-comic text-xs sm:text-sm font-black rounded-xl shadow-comic flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <ClipboardCheck size={16} />
                <span>
                  {lang === 'fr'
                    ? `Tester : ${selectedRegion.shortName.fr}`
                    : lang === 'zh'
                    ? `模拟测验：${selectedRegion.shortName.zh}`
                    : `Quiz: ${selectedRegion.shortName.en}`}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 2: INTERACTIVE COLOR-THE-MAP PRACTICE                */}
      {/* ========================================================= */}
      {subMode === 'colorMap' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Main Interactive Map Stage */}
          <div className="lg:col-span-8 bg-white comic-box rounded-2xl p-4">
            {/* Challenge Prompt Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              {mapPracticeMode === 'challenge' ? (
                currentMapTarget ? (
                  <div className="flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-xl border-2 border-slate-900 flex items-center justify-center text-xl shrink-0"
                      style={{ backgroundColor: currentMapTarget.color }}
                    >
                      🖍️
                    </span>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-500">
                        {lang === 'fr'
                          ? `Défi de coloriage (${coloredRegions.length} / ${activeRegions.length})`
                          : lang === 'zh'
                          ? `地图填色挑战 (${coloredRegions.length} / ${activeRegions.length})`
                          : `Coloring Challenge (${coloredRegions.length} / ${activeRegions.length})`}
                      </div>
                      <div className="font-comic text-base sm:text-lg font-black text-slate-900">
                        {lang === 'fr'
                          ? `Colorie : ${currentMapTarget.name.fr}`
                          : lang === 'zh'
                          ? `请点击涂色：${currentMapTarget.name.zh}（${currentMapTarget.name.fr}）`
                          : `Find & Color: ${currentMapTarget.name.en}`}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="font-comic text-base font-black text-emerald-700 flex items-center gap-2">
                    <CheckCircle2 size={20} />
                    <span>
                      {lang === 'fr'
                        ? '🎉 Carte complète ! Tu es prêt(e) pour le quiz de vendredi !'
                        : lang === 'zh'
                        ? '🎉 全部填色通关！下周五地图题稳拿满分！'
                        : '🎉 Full Map Colored! You are ready for Friday’s map quiz!'}
                    </span>
                  </div>
                )
              ) : (
                <div className="font-comic text-sm font-bold text-slate-800">
                  🎨{' '}
                  {lang === 'fr'
                    ? 'Mode libre : clique sur n’importe quelle région pour la colorier !'
                    : lang === 'zh'
                    ? '自由探索模式：点击地图上任意区域即可涂色并查看详情！'
                    : 'Free Explore: Tap any region on the map to color and inspect it!'}
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (soundEnabled) playClickSound();
                    setShowMapLabels(s => !s);
                  }}
                  className="px-3 py-1.5 rounded-xl border-2 border-slate-900 bg-white hover:bg-slate-50 font-comic text-xs font-bold text-slate-800 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  {showMapLabels ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>
                    {showMapLabels
                      ? lang === 'fr'
                        ? 'Cacher noms'
                        : lang === 'zh'
                        ? '隐藏地名'
                        : 'Hide Names'
                      : lang === 'fr'
                      ? 'Afficher noms'
                      : lang === 'zh'
                      ? '显示地名'
                      : 'Show Names'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    if (soundEnabled) playClickSound();
                    resetMapChallenge(activeRegions);
                  }}
                  className="px-3 py-1.5 rounded-xl border-2 border-slate-900 bg-slate-100 hover:bg-slate-200 font-comic text-xs font-bold text-slate-800 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw size={14} />
                  <span>{lang === 'fr' ? 'Recommencer' : lang === 'zh' ? '重置填色' : 'Reset'}</span>
                </button>
              </div>
            </div>

            {/* Interactive SVG Canada Map */}
            <CanadaLandformMap
              lang={lang}
              soundEnabled={soundEnabled}
              coloredRegions={coloredRegions}
              selectedRegionId={mapPracticeMode === 'explore' ? selectedRegionId : null}
              wrongRegionId={wrongMapRegionId}
              showLabels={showMapLabels}
              grade3OntarioOnly={gradeLevel === 'grade3'}
              onRegionClick={handleMapRegionClick}
            />

            {/* Feedback message bar */}
            {mapFeedback && (
              <div className="mt-3 px-3.5 py-2.5 rounded-xl bg-amber-50 border border-amber-300 text-xs sm:text-sm font-bold text-slate-800">
                {mapFeedback}
              </div>
            )}
          </div>

          {/* Right Control & Color Legend Deck */}
          <div className="lg:col-span-4 bg-white comic-box rounded-2xl p-4 space-y-4">
            {/* Switch between Find & Color Challenge vs Free Explore */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-300">
              <button
                onClick={() => {
                  if (soundEnabled) playClickSound();
                  setMapPracticeMode('challenge');
                  setShowMapLabels(false);
                }}
                className={`flex-1 py-2 rounded-lg font-comic text-xs font-bold cursor-pointer transition-colors ${
                  mapPracticeMode === 'challenge'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🎯 {lang === 'fr' ? 'Défi Quiz' : lang === 'zh' ? '听题填色挑战' : 'Quiz Challenge'}
              </button>
              <button
                onClick={() => {
                  if (soundEnabled) playClickSound();
                  setMapPracticeMode('explore');
                  setShowMapLabels(true);
                }}
                className={`flex-1 py-2 rounded-lg font-comic text-xs font-bold cursor-pointer transition-colors ${
                  mapPracticeMode === 'explore'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🎨 {lang === 'fr' ? 'Exploration' : lang === 'zh' ? '自由点选' : 'Free Explore'}
              </button>
            </div>

            {/* Crayon Color Key */}
            <div>
              <h3 className="font-comic text-xs font-black text-slate-900 mb-2">
                {lang === 'fr'
                  ? 'Boîte de crayons (Légende)'
                  : lang === 'zh'
                  ? '蜡笔颜色图例'
                  : 'Crayon Color Key'}
              </h3>
              <div className="space-y-1.5">
                {activeRegions.map(r => {
                  const done = coloredRegions.includes(r.id);
                  return (
                    <div
                      key={r.id}
                      onClick={() => {
                        if (mapPracticeMode === 'explore') handleMapRegionClick(r.id);
                      }}
                      className={`px-2.5 py-2 rounded-xl border flex items-center justify-between gap-2 text-xs ${
                        done
                          ? 'bg-emerald-50/70 border-emerald-300 font-bold text-slate-900'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      } ${mapPracticeMode === 'explore' ? 'cursor-pointer hover:border-slate-400' : ''}`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-4 h-4 rounded-md border border-slate-900 shrink-0"
                          style={{ backgroundColor: r.color }}
                        />
                        <span className="truncate">
                          {r.icon} {r.shortName[lang]}
                        </span>
                      </div>
                      {done && <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {mapPracticeMode === 'explore' && (
              <div className="pt-3 border-t border-slate-200">
                <CanadaRegionIllustration
                  region={selectedRegion}
                  lang={lang}
                  soundEnabled={soundEnabled}
                  compact
                />
                <p className="text-xs text-slate-600 font-medium mt-2">
                  {selectedRegion.tagline[lang]}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 3: FRIDAY QUIZ SIMULATOR (EXACT RUBRIC CHECKLIST)    */}
      {/* ========================================================= */}
      {subMode === 'fridayQuiz' && (
        <div className="max-w-4xl mx-auto">
          {/* Region Selector Strip for Quiz */}
          <div className="bg-white comic-box rounded-2xl p-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs sm:text-sm font-comic font-bold text-slate-800">
              📝{' '}
              {lang === 'fr'
                ? 'Choisis la région à tester :'
                : lang === 'zh'
                ? '选择要模拟测试的区域（默认你的小组课题）：'
                : 'Pick which region to quiz:'}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeRegions.map(r => (
                <button
                  key={r.id}
                  onClick={() => startFridayQuiz(r.id)}
                  className={`px-2.5 py-1.5 rounded-xl font-comic text-xs font-bold border transition-all cursor-pointer whitespace-nowrap ${
                    quizRegionId === r.id
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  {r.icon} {r.shortName[lang]}
                  {r.id === myProjectRegionId ? ' ⭐' : ''}
                </button>
              ))}
            </div>
          </div>

          {!quizFinished && currentQuestion ? (
            <div className="bg-white comic-box rounded-2xl p-5 sm:p-6">
              {/* Progress Bar */}
              <div className="flex items-center justify-between text-xs font-comic font-bold text-slate-500 mb-2">
                <span>
                  {currentQuestion.categoryIcon} {currentQuestion.categoryLabel[lang]}
                </span>
                <span className="tabular-nums">
                  {quizStep + 1} / {quizQuestions.length}
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-5 border border-slate-200">
                <div
                  className="h-full bg-red-600 transition-all duration-300"
                  style={{
                    width: `${((quizStep + (quizAnswered ? 1 : 0)) / quizQuestions.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question Prompt */}
              <h2 className="font-comic text-lg sm:text-xl font-black text-slate-900 mb-4">
                {currentQuestion.prompt[lang]}
              </h2>

              {/* Map Coloring Question */}
              {currentQuestion.type === 'map' ? (
                <div>
                  <CanadaLandformMap
                    lang={lang}
                    soundEnabled={soundEnabled}
                    coloredRegions={quizMapSolved ? [currentQuestion.targetRegionId] : []}
                    wrongRegionId={quizWrongMapId}
                    showLabels={false}
                    grade3OntarioOnly={gradeLevel === 'grade3'}
                    onRegionClick={handleQuizMapClick}
                  />
                  {!quizAnswered && (
                    <p className="text-xs text-slate-500 font-medium mt-3">
                      💡{' '}
                      {lang === 'fr'
                        ? 'Astuce : clique directement sur la région sur la carte blanche pour la colorier !'
                        : lang === 'zh'
                        ? '提示：直接点击空白地图上对应的区域即可上色！'
                        : 'Tip: Tap directly on the blank region on the map to color it in!'}
                    </p>
                  )}
                </div>
              ) : (
                /* Multiple-Choice Visual Cards */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {currentQuestion.options?.map(opt => {
                    const isPicked = quizSelectedOption === opt.id;
                    let cardStyle =
                      'bg-white hover:bg-slate-50 border-2 border-slate-900 text-slate-800';
                    if (quizAnswered) {
                      if (opt.isCorrect) {
                        cardStyle =
                          'bg-emerald-50 border-2 border-emerald-600 text-emerald-950 font-bold';
                      } else if (isPicked && !opt.isCorrect) {
                        cardStyle = 'bg-rose-50 border-2 border-rose-500 text-rose-950';
                      } else {
                        cardStyle = 'bg-slate-50 border border-slate-200 text-slate-400';
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        disabled={quizAnswered}
                        onClick={() => handleQuizOptionPick(opt.id, opt.isCorrect)}
                        className={`p-4 rounded-2xl text-left transition-all flex items-start gap-3 cursor-pointer ${cardStyle}`}
                      >
                        <span className="text-2xl shrink-0">{opt.icon}</span>
                        <span className="text-xs sm:text-sm font-semibold leading-snug">
                          {opt.text[lang]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Answer Feedback & Next Button */}
              {quizAnswered && (
                <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-200">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                    {quizMapSolved ||
                    currentQuestion.options?.find(o => o.id === quizSelectedOption)?.isCorrect ? (
                      <CheckCircle2 size={22} className="text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={22} className="text-rose-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-comic font-black text-slate-900">
                        {quizMapSolved ||
                        currentQuestion.options?.find(o => o.id === quizSelectedOption)?.isCorrect
                          ? lang === 'fr'
                            ? 'Super ! Bonne réponse !'
                            : lang === 'zh'
                            ? '答对了！太棒了！'
                            : 'Spot on! Great job!'
                          : lang === 'fr'
                          ? 'Bonne pratique ! Retiens ceci :'
                          : lang === 'zh'
                          ? '记住这个要点，周五就能拿满分：'
                          : 'Good practice! Remember this key fact:'}
                      </div>
                      <p className="text-slate-600 mt-0.5">{currentQuestion.explanation[lang]}</p>
                    </div>
                  </div>

                  <button
                    onClick={handleNextQuizStep}
                    className="comic-btn w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-comic text-xs sm:text-sm font-black rounded-xl shadow-comic flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>
                      {quizStep + 1 < quizQuestions.length
                        ? lang === 'fr'
                          ? 'Question suivante'
                          : lang === 'zh'
                          ? '下一题'
                          : 'Next Question'
                        : lang === 'fr'
                        ? 'Voir mon résultat'
                        : lang === 'zh'
                        ? '查看测验成绩'
                        : 'See Quiz Results'}
                    </span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Results Celebration Card */
            <div className="bg-white comic-box rounded-2xl p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200">
              <div className="text-5xl mb-3">🏆</div>
              <h2 className="font-comic text-2xl font-black text-slate-900 mb-1">
                {lang === 'fr'
                  ? 'Prêt(e) pour le quiz de vendredi !'
                  : lang === 'zh'
                  ? '周五社会课模拟测验完成！'
                  : 'Friday Quiz Practice Complete!'}
              </h2>
              <p className="text-sm font-semibold text-slate-600 mb-5 tabular-nums">
                {lang === 'fr'
                  ? `Score : ${quizCorrectCount} sur ${quizQuestions.length}`
                  : lang === 'zh'
                  ? `本次成绩：${quizCorrectCount} / ${quizQuestions.length} 题答对`
                  : `Score: ${quizCorrectCount} out of ${quizQuestions.length} correct`}
              </p>

              {(() => {
                const region = CANADA_LANDFORM_REGIONS.find(r => r.id === quizRegionId);
                if (!region) return null;
                const passThreshold = Math.ceil(quizQuestions.length * 0.6);
                const passed = quizCorrectCount >= passThreshold;
                return (
                  <div className="max-w-md mx-auto mb-6">
                    <CanadaRegionIllustration
                      region={region}
                      lang={lang}
                      soundEnabled={soundEnabled}
                      compact
                    />
                    <div
                      className={`mt-3 font-comic text-sm font-black flex items-center justify-center gap-1.5 ${
                        passed ? 'text-red-700' : 'text-slate-600'
                      }`}
                    >
                      <Award size={18} />
                      <span>
                        {passed
                          ? `${region.badgeTitle[lang]} ✓`
                          : lang === 'fr'
                          ? `Obtiens ${passThreshold}/${quizQuestions.length} pour débloquer le badge !`
                          : lang === 'zh'
                          ? `答对 ${passThreshold}/${quizQuestions.length} 题即可解锁【${region.badgeTitle.zh}】勋章！`
                          : `Score ${passThreshold}/${quizQuestions.length} to unlock ${region.badgeTitle.en}!`}
                      </span>
                    </div>
                  </div>
                );
              })()}

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => startFridayQuiz(quizRegionId)}
                  className="comic-btn px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-comic text-xs sm:text-sm font-black rounded-xl shadow-comic cursor-pointer"
                >
                  🔄 {lang === 'fr' ? 'Refaire le quiz' : lang === 'zh' ? '再测一次' : 'Try Again'}
                </button>
                <button
                  onClick={() => setSubMode('study')}
                  className="comic-btn px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-900 font-comic text-xs sm:text-sm font-bold rounded-xl shadow-comic cursor-pointer"
                >
                  📖 {lang === 'fr' ? 'Revoir les fiches' : lang === 'zh' ? '返回知识卡片' : 'Review Cards'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

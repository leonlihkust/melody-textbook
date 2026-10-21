export type Language = 'en' | 'fr' | 'zh';

export interface Translations {
  nav: {
    map: string;
    world: string;
    space: string;
    badges: string;
    curriculum: string;
    scratchpad: string;
    share: string;
  };
  questMap: {
    title: string;
    subtitle: string;
    stars: string;
    cleared: string;
    all: string;
    fall: string;
    winter: string;
    spring: string;
    summer: string;
    weekPrefix: string;
    weekSuffix: string;
    play: string;
    review: string;
  };
  runner: {
    backToMap: string;
    weekPrefix: string;
    tier: string;
    tierAll: string;
    tierEasy: string;
    tierMed: string;
    tierBoss: string;
    tierOlympiad: string;
    questionCount: (cur: number, total: number) => string;
    secondChance: string;
    newVariant: string;
    readAloud: string;
    stopRead: string;
    scratchpad: string;
    secretClue: string;
    checkAnswer: string;
    tryAgain: string;
    nextQuestion: string;
    openChest: string;
    pickOptionPrompt: string;
  };
  victory: {
    title: string;
    subtitle: string;
    starsEarned: string;
    firstTryPerfect: string;
    playAgainVariant: string;
    tryOlympiad: string;
    returnToMap: string;
  };
  world: {
    title: string;
    subtitle: string;
    globe3D: string;
    factCards: string;
    capital: string;
    funFacts: string;
    badgeQuiz: string;
    earned: string;
    locked: string;
    takeQuiz: string;
    inspectGlobe: string;
    correctBadgeToast: (country: string, badge: string) => string;
  };
  space: {
    title: string;
    subtitle: string;
    orrery3D: string;
    factCards: string;
    funFacts: string;
    badgeQuiz: string;
    earned: string;
    locked: string;
    takeQuiz: string;
    inspect3D: string;
    correctBadgeToast: (body: string, badge: string) => string;
  };
  badges: {
    rankBadge: string;
    totalStars: string;
    starsSummary: (stars: number, weeks: number) => string;
    certText: string;
    trophyTitle: string;
    trophySubtitle: string;
    trophyTag: string;
    vaultTitle: string;
    spaceVaultTitle: string;
    resetTitle: string;
    resetPrompt: string;
    resetButton: string;
    badgeEarnedTag: string;
    badgeLockedTag: string;
  };
  curriculum: {
    badge: string;
    title: string;
    creatorsTitle: string;
    creatorsBadge: string;
    creatorsText: string;
    strands: Array<{
      icon: string;
      title: string;
      period: string;
      desc: string;
      color: string;
    }>;
  };
  scratchpad: {
    title: string;
    subtitle: string;
    pen: string;
    eraser: string;
    ruler: string;
    clear: string;
    close: string;
  };
  share: {
    title: string;
    subtitle: string;
    copyLink: string;
    copied: string;
    close: string;
  };
  ranks: Array<{
    minStars: number;
    title: string;
    desc: string;
    icon: string;
  }>;
}

export const I18N: Record<Language, Translations> = {
  en: {
    nav: {
      map: 'Math Map',
      world: 'World',
      space: 'Space',
      badges: 'Badges',
      curriculum: 'Curriculum',
      scratchpad: 'Scratchpad',
      share: 'Share',
    },
    questMap: {
      title: '40-Week Math Quest',
      subtitle: 'Solve weekly quests & collect gold stars!',
      stars: 'Stars',
      cleared: 'Cleared',
      all: 'All (40)',
      fall: 'Fall 1–10',
      winter: 'Winter 11–20',
      spring: 'Spring 21–30',
      summer: 'Summer 31–40',
      weekPrefix: 'Week',
      weekSuffix: '',
      play: 'Play',
      review: 'Review',
    },
    runner: {
      backToMap: '← Quest Map',
      weekPrefix: 'Week',
      tier: 'Tier:',
      tierAll: '🌟 Standard (1–5)',
      tierEasy: '🟢 Easy',
      tierMed: '🟡 Medium',
      tierBoss: '🔴 Hard',
      tierOlympiad: '👑 Olympiad',
      questionCount: (cur, total) => `Question ${cur} of ${total}`,
      secondChance: '⚡ 2nd Chance!',
      newVariant: '🔄 New',
      readAloud: '🔊 Read',
      stopRead: 'Stop',
      scratchpad: 'Scratchpad',
      secretClue: 'Gold Secret Clue',
      checkAnswer: 'Check Answer',
      tryAgain: 'Not quite! Read the secret clue and try one more time!',
      nextQuestion: 'Next Question ➔',
      openChest: '🎉 Open Treasure Chest!',
      pickOptionPrompt: 'Select an answer above to continue',
    },
    victory: {
      title: 'Victory Celebration!',
      subtitle: 'Treasure Chest Unlocked!',
      starsEarned: 'Gold Stars Earned',
      firstTryPerfect: '🌟 Perfect! Solved on First Try!',
      playAgainVariant: '🔄 New Numbers Variant',
      tryOlympiad: '👑 Try Olympiad Mode',
      returnToMap: 'Return to Math Map',
    },
    world: {
      title: 'World 3D Explorer',
      subtitle: 'Explore 16 countries, discover fun facts & earn badges!',
      globe3D: '3D Globe',
      factCards: 'Fact Cards',
      capital: 'Capital',
      funFacts: 'Fun Facts',
      badgeQuiz: 'Unlock Badge Quiz',
      earned: 'Earned',
      locked: 'Locked',
      takeQuiz: 'Take Quiz',
      inspectGlobe: 'Inspect in 3D',
      correctBadgeToast: (country, badge) => `Honor Awarded: ${country} Explorer · ${badge}!`,
    },
    space: {
      title: 'Solar System 3D Explorer',
      subtitle: 'Journey through 14 celestial bodies, discover space science & earn cosmic badges!',
      orrery3D: '3D Solar System',
      factCards: 'Celestial Cards',
      funFacts: 'Cosmic Facts',
      badgeQuiz: 'Unlock Cosmic Badge',
      earned: 'Earned',
      locked: 'Locked',
      takeQuiz: 'Take Cosmic Quiz',
      inspect3D: 'Inspect in 3D Orrery',
      correctBadgeToast: (body, badge) => `Cosmic Honor Awarded: ${body} Explorer · ${badge}!`,
    },
    badges: {
      rankBadge: 'Mariner Naval Rank',
      totalStars: 'Total Stars',
      starsSummary: (stars, weeks) => `You have gathered ${stars} stars and conquered ${weeks} weekly math expeditions!`,
      certText: 'Official Mariners Certification by Yang & Melody',
      trophyTitle: '3D Mariner Fleet Golden Helm',
      trophySubtitle: 'Interactive procedural 3D trophy! Hover and tilt to inspect in 360°.',
      trophyTag: 'WebGL · Three.js 3D',
      vaultTitle: '16 World Explorer Badges',
      spaceVaultTitle: '14 Cosmic & Planetary Badges',
      resetTitle: 'Want to reset progress and start a fresh voyage?',
      resetPrompt: 'Reset all progress and stars?',
      resetButton: 'Reset Progress',
      badgeEarnedTag: '✓ Earned',
      badgeLockedTag: '🔒 Locked',
    },
    curriculum: {
      badge: 'WRDSB Grade 4 Long Range Plan (LRP)',
      title: 'Ontario Grade 4 Curriculum Architecture',
      creatorsTitle: 'Project Creators: Yang & Melody',
      creatorsBadge: 'Custom Built with Love',
      creatorsText: 'Proudly engineered by parents Yang & Melody, specifically tailored for our daughter and her fellow Grade 4 Mariners at Millen Woods Public School, Waterloo. Fully aligned to the official WRDSB 40-week Long Range Plan with local context!',
      strands: [
        {
          icon: '🍂',
          title: 'Sept–Oct: Number Sense & Rounding',
          period: 'Term 1',
          desc: 'Numbers up to 10,000, non-standard partitioning, ION LRT number line rounding & reverse boundary logic.',
          color: 'blue',
        },
        {
          icon: '📐',
          title: 'Oct: Geometric Reasoning & Grid',
          period: 'Term 1',
          desc: 'Benchmark 90° angles, quadrilateral families, lines of symmetry, and (x, y) translations.',
          color: 'emerald',
        },
        {
          icon: '✖️',
          title: 'Oct–Jan: Arrays, Multi-Digit & Ratios',
          period: 'Term 1',
          desc: 'Doubling mental math, rectangular area models, division with remainders, and proportional ratio tables.',
          color: 'amber',
        },
        {
          icon: '🍕',
          title: 'Jan–Feb: Fractions & Tenths Decimals',
          period: 'Term 2',
          desc: 'Improper fractions, mixed numbers, fractions of a set, tenths decimals (0.1–0.9), and money change.',
          color: 'purple',
        },
        {
          icon: '⚖️',
          title: 'Mar–Apr: Patterns & Balance Equations',
          period: 'Term 2',
          desc: 'Growing pattern rules, function machines, balance scale equations, and inequality limits.',
          color: 'rose',
        },
        {
          icon: '📏',
          title: 'May–Jun: Measurement & Coding',
          period: 'Term 2',
          desc: 'Perimeter vs area, elapsed time, 5-level probability continuum, and pseudocode REPEAT loops.',
          color: 'teal',
        },
      ],
    },
    scratchpad: {
      title: 'Mariner Math Scratchpad',
      subtitle: 'Doodle, scratch work & grid guide',
      pen: 'Pen',
      eraser: 'Eraser',
      ruler: 'Ruler',
      clear: 'Clear',
      close: 'Close',
    },
    share: {
      title: 'Share Mariner Math Quest',
      subtitle: 'Invite classmates to explore math together!',
      copyLink: 'Copy Link',
      copied: 'Copied to Clipboard!',
      close: 'Close',
    },
    ranks: [
      { minStars: 0, title: 'Cabin Cadet', desc: 'Starting your voyage at Millen Woods!', icon: '⚓' },
      { minStars: 15, title: 'Coast Navigator', desc: 'Charting Waterloo waters and basic facts!', icon: '🧭' },
      { minStars: 35, title: 'Fleet Lieutenant', desc: 'Commanding multi-digit math and fractions!', icon: '⚔️' },
      { minStars: 60, title: 'Voyage Commander', desc: 'Master of ratio tables, geometry & coding!', icon: '🚢' },
      { minStars: 90, title: 'Grand Fleet Admiral', desc: 'Supreme master of the Grade 4 Math seas!', icon: '👑' },
    ],
  },
  fr: {
    nav: {
      map: 'Carte des maths',
      world: 'Monde 3D',
      space: 'Espace',
      badges: 'Badges',
      curriculum: 'Programme',
      scratchpad: 'Brouillon',
      share: 'Partager',
    },
    questMap: {
      title: '40 Semaines d\'Aventures Maths',
      subtitle: 'Relève les défis et gagne des étoiles d\'or !',
      stars: 'Étoiles',
      cleared: 'Réussi',
      all: 'Tout (40)',
      fall: 'Automne 1–10',
      winter: 'Hiver 11–20',
      spring: 'Printemps 21–30',
      summer: 'Été 31–40',
      weekPrefix: 'Semaine',
      weekSuffix: '',
      play: 'Jouer',
      review: 'Réviser',
    },
    runner: {
      backToMap: '← Carte des maths',
      weekPrefix: 'Semaine',
      tier: 'Niveau :',
      tierAll: '🌟 Standard (1–5)',
      tierEasy: '🟢 Facile',
      tierMed: '🟡 Moyen',
      tierBoss: '🔴 Défi',
      tierOlympiad: '👑 Olympiade',
      questionCount: (cur, total) => `Question ${cur} sur ${total}`,
      secondChance: '⚡ 2e chance !',
      newVariant: '🔄 Changer',
      readAloud: '🔊 Écouter',
      stopRead: 'Arrêter',
      scratchpad: 'Brouillon',
      secretClue: 'Indice Secret d\'Or',
      checkAnswer: 'Vérifier la réponse',
      tryAgain: 'Pas tout à fait ! Lis attentivement l\'indice secret et réessaie !',
      nextQuestion: 'Question suivante ➔',
      openChest: '🎉 Ouvrir le Coffre !',
      pickOptionPrompt: 'Choisis une réponse ci-dessus pour continuer',
    },
    victory: {
      title: 'Victoire Triomphale !',
      subtitle: 'Coffre aux trésors déverrouillé !',
      starsEarned: 'Étoiles d\'or gagnées',
      firstTryPerfect: '🌟 Parfait ! Résolu du premier coup !',
      playAgainVariant: '🔄 Nouvelle variante numérique',
      tryOlympiad: '👑 Tenter le mode Olympiade',
      returnToMap: 'Retour à la carte des maths',
    },
    world: {
      title: 'Explorateur du Monde 3D',
      subtitle: 'Explore 16 pays, découvre des faits fascinants et gagne des badges !',
      globe3D: 'Globe 3D',
      factCards: 'Cartes Pays',
      capital: 'Capitale',
      funFacts: 'Faits Amusants',
      badgeQuiz: 'Quiz pour Débloquer le Badge',
      earned: 'Obtenu',
      locked: 'Verrouillé',
      takeQuiz: 'Répondre au Quiz',
      inspectGlobe: 'Voir sur le Globe 3D',
      correctBadgeToast: (country, badge) => `Honneur attribué : Explorateur du ${country} · ${badge} !`,
    },
    space: {
      title: 'Explorateur Spatial 3D',
      subtitle: 'Voyage à travers 14 corps célestes, découvre les secrets de l\'espace et gagne des badges cosmiques !',
      orrery3D: 'Système Solaire 3D',
      factCards: 'Fiches Célestes',
      funFacts: 'Faits Cosmiques',
      badgeQuiz: 'Quiz pour Débloquer le Badge',
      earned: 'Obtenu',
      locked: 'Verrouillé',
      takeQuiz: 'Répondre au Quiz',
      inspect3D: 'Inspecter en 3D',
      correctBadgeToast: (body, badge) => `Honneur Cosmique : Explorateur de ${body} · ${badge} !`,
    },
    badges: {
      rankBadge: 'Rang Naval des Marins',
      totalStars: 'Total d\'Étoiles',
      starsSummary: (stars, weeks) => `Tu as récolté ${stars} étoiles et conquis ${weeks} semaines d'expéditions mathématiques !`,
      certText: 'Certification officielle des Marins par Yang & Melody',
      trophyTitle: 'Gouvernail d\'Or 3D de la Flotte',
      trophySubtitle: 'Trophée 3D interactif ! Survole et incline pour admirer à 360°.',
      trophyTag: 'WebGL · Three.js 3D',
      vaultTitle: '16 Badges d\'Explorateur du Monde',
      spaceVaultTitle: '14 Badges Cosmiques et Planétaires',
      resetTitle: 'Veux-tu réinitialiser ta progression et recommencer ?',
      resetPrompt: 'Réinitialiser toute la progression et les étoiles ?',
      resetButton: 'Réinitialiser',
      badgeEarnedTag: '✓ Obtenu',
      badgeLockedTag: '🔒 Verrouillé',
    },
    curriculum: {
      badge: 'Plan d\'apprentissage annuel WRDSB 4e année (LRP)',
      title: 'Programme de mathématiques de l\'Ontario 4e année',
      creatorsTitle: 'Créateurs du projet : Yang & Melody',
      creatorsBadge: 'Fait avec amour',
      creatorsText: 'Créé avec fierté par les parents Yang & Melody spécialement pour leur fille et ses camarades Marins de 4e année à l\'école publique Millen Woods de Waterloo. Conforme au programme officiel de 40 semaines du WRDSB !',
      strands: [
        {
          icon: '🍂',
          title: 'Sept–Oct : Sens du nombre et arrondissement',
          period: 'Étape 1',
          desc: 'Nombres jusqu\'à 10 000, décomposition non standard, arrondissement sur la ligne du train léger ION.',
          color: 'blue',
        },
        {
          icon: '📐',
          title: 'Oct : Raisonnement géométrique et repérage',
          period: 'Étape 1',
          desc: 'Angles repères de 90°, familles de quadrilatères, axes de symétrie et translations sur plan cartésien.',
          color: 'emerald',
        },
        {
          icon: '✖️',
          title: 'Oct–Jan : Tableaux, multiplication et rapports',
          period: 'Étape 1',
          desc: 'Calcul mental par doublement, modèles d\'aire rectangulaire, division avec reste et tables de rapports proportionnels.',
          color: 'amber',
        },
        {
          icon: '🍕',
          title: 'Jan–Fév : Fractions et dixièmes décimaux',
          period: 'Étape 2',
          desc: 'Fractions impropres, nombres mixtes, fractions d\'un ensemble, nombres décimaux (0,1 à 0,9) et monnaie.',
          color: 'purple',
        },
        {
          icon: '⚖️',
          title: 'Mar–Avr : Suites et équations d\'équilibre',
          period: 'Étape 2',
          desc: 'Règles de régularité croissante, machine à fonctions, équations avec balance et inéquations.',
          color: 'rose',
        },
        {
          icon: '📏',
          title: 'Mai–Juin : Mesure et codage',
          period: 'Étape 2',
          desc: 'Périmètre et aire, temps écoulé, continuum de probabilité à 5 niveaux et boucles de répétition.',
          color: 'teal',
        },
      ],
    },
    scratchpad: {
      title: 'Brouillon de Mathématiques',
      subtitle: 'Calculs, gribouillages et quadrillage',
      pen: 'Stylo',
      eraser: 'Gomme',
      ruler: 'Règle',
      clear: 'Effacer',
      close: 'Fermer',
    },
    share: {
      title: 'Partager l\'Aventure Mathématique',
      subtitle: 'Invite tes camarades de classe à explorer les maths ensemble !',
      copyLink: 'Copier le lien',
      copied: 'Lien copié dans le presse-papiers !',
      close: 'Fermer',
    },
    ranks: [
      { minStars: 0, title: 'Cadet de Cabine', desc: 'Début du voyage à Millen Woods !', icon: '⚓' },
      { minStars: 15, title: 'Navigateur Côtier', desc: 'Exploration des eaux de Waterloo et calculs de base !', icon: '🧭' },
      { minStars: 35, title: 'Lieutenant de Flotte', desc: 'Maître des grands nombres et des fractions !', icon: '⚔️' },
      { minStars: 60, title: 'Commandant d\'Expédition', desc: 'Expert des tables de rapports, géométrie et codage !', icon: '🚢' },
      { minStars: 90, title: 'Grand Amiral de Flotte', desc: 'Maître suprême des mers mathématiques de 4e année !', icon: '👑' },
    ],
  },
  zh: {
    nav: {
      map: '航海地图',
      world: '世界探索',
      space: '太空探索',
      badges: '勋章金库',
      curriculum: '大纲解析',
      scratchpad: '草稿板',
      share: '分享',
    },
    questMap: {
      title: '40 周数学航海大冒险',
      subtitle: '通关每周挑战，收集黄金星星！',
      stars: '星星',
      cleared: '已通关',
      all: '全部 (40)',
      fall: '秋季 1–10',
      winter: '冬季 11–20',
      spring: '春季 21–30',
      summer: '夏季 31–40',
      weekPrefix: '第',
      weekSuffix: '周',
      play: '挑战',
      review: '复习',
    },
    runner: {
      backToMap: '← 返回航海地图',
      weekPrefix: '第',
      tier: '关卡模式：',
      tierAll: '🌟 标准全关 (1–5)',
      tierEasy: '🟢 基础',
      tierMed: '🟡 进阶',
      tierBoss: '🔴 挑战',
      tierOlympiad: '👑 奥数',
      questionCount: (cur, total) => `第 ${cur} / ${total} 题`,
      secondChance: '⚡ 最后 1 次机会！',
      newVariant: '🔄 换一题',
      readAloud: '🔊 朗读',
      stopRead: '停止',
      scratchpad: '草稿板',
      secretClue: '黄金解题线索',
      checkAnswer: '提交检查答案',
      tryAgain: '差一点点！仔细阅读上方黄金线索，还有最后 1 次机会！',
      nextQuestion: '下一题 ➔',
      openChest: '🎉 打开胜利宝箱！',
      pickOptionPrompt: '请在上方选择一个答案以继续',
    },
    victory: {
      title: '水手航海胜利大典！',
      subtitle: '成功开启黄金航海宝箱！',
      starsEarned: '本周赢取黄金星星',
      firstTryPerfect: '🌟 太棒了！全对极速破关！',
      playAgainVariant: '🔄 换新题重玩',
      tryOlympiad: '👑 挑战高难度奥数',
      returnToMap: '返回航海地图',
    },
    world: {
      title: '3D 世界地理大探索',
      subtitle: '环游世界 16 国，探索趣味冷知识，解锁专属航海勋章！',
      globe3D: '3D 地球仪',
      factCards: '知识卡片',
      capital: '首都',
      funFacts: '趣味冷知识',
      badgeQuiz: '勋章答题挑战',
      earned: '已解锁',
      locked: '未解锁',
      takeQuiz: '开始答题',
      inspectGlobe: '在 3D 地球仪中检阅',
      correctBadgeToast: (country, badge) => `荣获【${country}】专属航海探索家荣誉 · ${badge}！`,
    },
    space: {
      title: '3D 太空与太阳系大探索',
      subtitle: '巡航 14 大天体与深空航天器，探索太空前沿科学，解锁专属太空勋章！',
      orrery3D: '3D 太阳系',
      factCards: '天体知识卡',
      funFacts: '太空冷知识',
      badgeQuiz: '太空勋章挑战',
      earned: '已解锁',
      locked: '未解锁',
      takeQuiz: '开始太空答题',
      inspect3D: '在 3D 太阳系中检阅',
      correctBadgeToast: (body, badge) => `荣获【${body}】太空探索家荣誉 · ${badge}！`,
    },
    badges: {
      rankBadge: '水手荣誉军衔 · Mariner Rank',
      totalStars: '总战绩星星',
      starsSummary: (stars, weeks) => `你已累计赢得 ${stars} 颗黄金星星，已点亮 ${weeks} 个数学航行周！`,
      certText: '荣誉总督导：Yang & Melody',
      trophyTitle: '3D 水手舰队终身黄金金舵',
      trophySubtitle: '悬停、倾斜或点击可 360° 检阅你的专属 3D 荣誉金舵！',
      trophyTag: 'WebGL · Three.js 3D',
      vaultTitle: '16 国地理探索勋章',
      spaceVaultTitle: '14 大深空与行星探索勋章',
      resetTitle: '想要清空记录重新体验航海闯关吗？',
      resetPrompt: '确定要重置所有星星和通关进度吗？',
      resetButton: '重置进度',
      badgeEarnedTag: '✓ 已获得',
      badgeLockedTag: '🔒 未解锁',
    },
    curriculum: {
      badge: '滑铁卢教育局四年级全学年教学规划 (LRP)',
      title: '滑铁卢教育局四年级数学大纲解析',
      creatorsTitle: '创作者 / 作者：Yang & Melody',
      creatorsBadge: '爱心出品',
      creatorsText: '本应用由家长 Yang 和 Melody 倾注心血打造，专为女儿及滑铁卢米伦伍兹公立学校（Millen Woods Public School）等同学们定制。紧扣滑铁卢教育局全年 40 周官方教学计划，融入滑铁卢本土真实场景，让数学与世界探索更有温度！',
      strands: [
        {
          icon: '🍂',
          title: '9月–10月：数感与四舍五入',
          period: '第一学期',
          desc: '万以内多位数标准与非标准数位拆分、借助滑铁卢轻轨数轴进行四舍五入与逆向极值思考。',
          color: 'blue',
        },
        {
          icon: '📐',
          title: '10月：几何思维与空间网格',
          period: '第一学期',
          desc: '锐角/直角/钝角的 90° 基准、四边形分类、对称轴以及平面坐标网格平移。',
          color: 'emerald',
        },
        {
          icon: '✖️',
          title: '10月–1月：乘法阵列与生活比率表',
          period: '第一学期',
          desc: '乘法阵列与连续翻倍心算、矩形分块面积模型、有余数除法以及生活中的正比例与比率表应用。',
          color: 'amber',
        },
        {
          icon: '🍕',
          title: '1月–2月：分数模型与小数初探',
          period: '第二学期',
          desc: '真分数、假分数与带分数互化，集合的分数表示，以及十分之一小数与找零计算。',
          color: 'purple',
        },
        {
          icon: '⚖️',
          title: '3月–4月：规律模式与天平代数',
          period: '第二学期',
          desc: '递增数列规律探索、函数机器、天平未知数方程（2x + 8 = 26）与不等式求解。',
          color: 'rose',
        },
        {
          icon: '📏',
          title: '5月–6月：周长面积、时间与编程逻辑',
          period: '第二学期',
          desc: '长方形周长与面积、经过时间推算、五级概率事件评估与编程重复循环结构。',
          color: 'teal',
        },
      ],
    },
    scratchpad: {
      title: '水手草稿演算本',
      subtitle: '自由涂鸦、竖式草稿与网格图纸',
      pen: '铅笔',
      eraser: '橡皮',
      ruler: '标尺',
      clear: '清空',
      close: '关闭',
    },
    share: {
      title: '分享水手数学航海大冒险',
      subtitle: '邀请同班水手与好友一起解题探险！',
      copyLink: '复制分享链接',
      copied: '已复制到剪贴板！',
      close: '关闭',
    },
    ranks: [
      { minStars: 0, title: '初级水手学员', desc: '在米伦伍兹启航，开启数学探险旅程！', icon: '⚓' },
      { minStars: 15, title: '海岸领航员', desc: '熟悉滑铁卢各处水域，掌握基础数感！', icon: '🧭' },
      { minStars: 35, title: '舰队先锋中尉', desc: '熟练运算多位数乘除与几何网格！', icon: '⚔️' },
      { minStars: 60, title: '远洋探险指挥官', desc: '精通生活比率表、方程天平与编程！', icon: '🚢' },
      { minStars: 90, title: '舰队终身大元帅', desc: '统领米伦伍兹舰队，四年级数学大满贯！', icon: '👑' },
    ],
  },
};

/**
 * Millen Woods Mariners - Grade 4 Cosmic Space Explorer Catalog
 * Aligned with Ontario Grade 4 Earth & Space Systems science & math curriculum.
 * Fully trilingual: English (EN), French (FR - 4e année WRDSB), and Chinese (ZH).
 */

export type CelestialCategory =
  | 'star'
  | 'terrestrial'
  | 'gas_giant'
  | 'ice_giant'
  | 'dwarf_planet'
  | 'belt'
  | 'mission';

export interface SpaceQuiz {
  questionEn: string;
  questionFr: string;
  questionZh: string;
  optionsEn: string[];
  optionsFr: string[];
  optionsZh: string[];
  correctIndex: number;
  explanationEn: string;
  explanationFr: string;
  explanationZh: string;
}

export interface CelestialBody {
  id: string;
  category: CelestialCategory;
  nameEn: string;
  nameFr: string;
  nameZh: string;
  icon: string;
  symbol: string;
  distanceFromSun: string; // e.g. "0 AU", "1.0 AU (150M km)"
  diameterKm: number;
  temperature: string;
  orbitalPeriod: string;
  moonsCount: number;
  taglineEn: string;
  taglineFr: string;
  taglineZh: string;
  funFactEn: string;
  funFactFr: string;
  funFactZh: string;
  badgeTitleEn: string;
  badgeTitleFr: string;
  badgeTitleZh: string;
  color: string;
  accentColor: string;
  quiz: SpaceQuiz;
}

export const CELESTIAL_BODIES: CelestialBody[] = [
  {
    id: 'sun',
    category: 'star',
    nameEn: 'The Sun',
    nameFr: 'Le Soleil',
    nameZh: '太阳',
    icon: '☀️',
    symbol: '☉',
    distanceFromSun: 'Center (0 AU)',
    diameterKm: 1392700,
    temperature: '5,500°C (Core 15M°C)',
    orbitalPeriod: '230 Million Years (Galactic)',
    moonsCount: 0,
    taglineEn: 'The Fiery Heart of our Solar System',
    taglineFr: 'Le cœur ardent de notre système solaire',
    taglineZh: '太阳系的炽热能量心脏',
    funFactEn: 'The Sun is so gigantic that about 1,300,000 Earths could fit inside it! It contains 99.8% of all the mass in the entire Solar System, providing light and warmth that makes life in Waterloo possible.',
    funFactFr: 'Le Soleil est si gigantesque qu\'environ 1 300 000 Terres pourraient entrer à l\'intérieur ! Il contient 99,8 % de toute la masse du système solaire, offrant lumière et chaleur à notre planète.',
    funFactZh: '太阳体积大到可以装下约 130 万个地球！它占据了整个太阳系 99.8% 的质量，为地球上的生命提供了所有的光和热。',
    badgeTitleEn: 'Solar Flare Guardian',
    badgeTitleFr: 'Gardien de l\'Éruption Solaire',
    badgeTitleZh: '太阳耀斑护卫先锋',
    color: '#f59e0b',
    accentColor: '#fbbf24',
    quiz: {
      questionEn: 'About how many Earths could fit inside the Sun?',
      questionFr: 'Environ combien de planètes Terre pourraient entrer à l\'intérieur du Soleil ?',
      questionZh: '太阳的体积大约可以容纳多少个地球？',
      optionsEn: ['About 1,300,000 Earths', 'About 10,000 Earths', 'About 500 Earths', 'About 100 Earths'],
      optionsFr: ['Environ 1 300 000 Terres', 'Environ 10 000 Terres', 'Environ 500 Terres', 'Environ 100 Terres'],
      optionsZh: ['约 130 万个地球', '约 1 万个地球', '约 500 个地球', '约 100 个地球'],
      correctIndex: 0,
      explanationEn: 'The Sun\'s diameter is 109 times Earth\'s, meaning about 1.3 million Earths would fit inside its volume!',
      explanationFr: 'Le diamètre du Soleil vaut 109 fois celui de la Terre, ce qui signifie qu\'environ 1,3 million de Terres tiendraient dans son volume !',
      explanationZh: '太阳的直径是地球的 109 倍，其体积足以容纳大约 130 万个地球！',
    },
  },
  {
    id: 'mercury',
    category: 'terrestrial',
    nameEn: 'Mercury',
    nameFr: 'Mercure',
    nameZh: '水星',
    icon: '🪨',
    symbol: '☿',
    distanceFromSun: '0.39 AU (58M km)',
    diameterKm: 4879,
    temperature: '-180°C to 430°C',
    orbitalPeriod: '88 Earth Days',
    moonsCount: 0,
    taglineEn: 'The Fastest Sprinter around the Sun',
    taglineFr: 'Le coureur le plus rapide autour du Soleil',
    taglineZh: '太阳系速度最快的近阳信使',
    funFactEn: 'Mercury races around the Sun in just 88 Earth days—faster than any other planet! But it spins so slowly on its axis that one single day-night cycle on Mercury lasts 176 Earth days!',
    funFactFr: 'Mercure fait le tour du Soleil en seulement 88 jours terrestres, plus vite que toute autre planète ! Pourtant, une seule journée sur Mercure dure 176 jours terrestres.',
    funFactZh: '水星只需 88 个地球日就能绕太阳公转一周，是太阳系里公转最快的行星！但它自转极慢，一个昼夜循环相当于地球的 176 天！',
    badgeTitleEn: 'Swift Comet Runner',
    badgeTitleFr: 'Coureur Véloce de Mercure',
    badgeTitleZh: '水星疾风极速先锋',
    color: '#94a3b8',
    accentColor: '#cbd5e1',
    quiz: {
      questionEn: 'How long does it take Mercury to orbit once around the Sun?',
      questionFr: 'Combien de temps faut-il à Mercure pour effectuer une orbite complète autour du Soleil ?',
      questionZh: '水星绕太阳公转一周大约需要多长时间？',
      optionsEn: ['365 days', '88 Earth days', '24 hours', '12 Earth years'],
      optionsFr: ['365 jours', '88 jours terrestres', '24 heures', '12 années terrestres'],
      optionsZh: ['365 天', '88 个地球日', '24 小时', '12 个地球年'],
      correctIndex: 1,
      explanationEn: 'Mercury completes its year in just 88 Earth days because it is closest to the Sun\'s powerful gravity.',
      explanationFr: 'Mercure complète son année en seulement 88 jours terrestres car elle est la planète la plus proche du Soleil.',
      explanationZh: '水星距离太阳最近，仅需 88 个地球日即可完成一次完整的公转！',
    },
  },
  {
    id: 'venus',
    category: 'terrestrial',
    nameEn: 'Venus',
    nameFr: 'Vénus',
    nameZh: '金星',
    icon: '🌋',
    symbol: '♀',
    distanceFromSun: '0.72 AU (108M km)',
    diameterKm: 12104,
    temperature: '465°C Constant',
    orbitalPeriod: '225 Earth Days',
    moonsCount: 0,
    taglineEn: 'The Hottest Greenhouse World',
    taglineFr: 'La planète fournaise à effet de serre',
    taglineZh: '炽热的温室风暴双胞胎',
    funFactEn: 'Even though Mercury is closer to the Sun, Venus is the hottest planet in the Solar System at 465°C! Its super-thick atmosphere of carbon dioxide acts like an extreme greenhouse blanket.',
    funFactFr: 'Même si Mercure est plus proche du Soleil, Vénus est la planète la plus chaude du système solaire à 465 °C en raison d\'un puissant effet de serre provoqué par son atmosphère épaisse de CO₂.',
    funFactZh: '虽然水星离太阳更近，但金星才是太阳系最热的行星，表面达 465°C！其浓密的二氧化碳大气层产生了极端的温室效应。',
    badgeTitleEn: 'Morning Star Pilot',
    badgeTitleFr: 'Pilote de l\'Étoile du Berger',
    badgeTitleZh: '启明星晨曦领航员',
    color: '#eab308',
    accentColor: '#fde047',
    quiz: {
      questionEn: 'Why is Venus hotter than Mercury even though Mercury is closer to the Sun?',
      questionFr: 'Pourquoi Vénus est-elle plus chaude que Mercure alors que Mercure est plus proche du Soleil ?',
      questionZh: '为什么金星比离太阳更近的水星还要热？',
      optionsEn: [
        'It has giant volcanoes on every square meter',
        'Its thick atmosphere traps heat in an extreme greenhouse effect',
        'It has two bright suns',
        'It has burning lakes of lava'
      ],
      optionsFr: [
        'Elle a des volcans géants sur chaque mètre carré',
        'Son atmosphère dense de CO₂ emprisonne la chaleur par effet de serre',
        'Elle possède deux soleils',
        'Elle a des lacs de lave en ébullition'
      ],
      optionsZh: [
        '因为其表面布满了活火山',
        '其浓密的大气层产生极强的温室效应锁住了热量',
        '因为它有两个太阳照耀',
        '因为表面全部是沸腾的熔岩湖'
      ],
      correctIndex: 1,
      explanationEn: 'Venus has an ultra-dense carbon dioxide atmosphere that creates runaway greenhouse warming up to 465°C!',
      explanationFr: 'L\'atmosphère épaisse de dioxyde de carbone de Vénus emprisonne la chaleur comme une immense couverture thermique.',
      explanationZh: '金星极其浓密的二氧化碳大气层锁住了热量，产生了强烈的温室效应！',
    },
  },
  {
    id: 'earth',
    category: 'terrestrial',
    nameEn: 'Earth & The Moon',
    nameFr: 'La Terre & la Lune',
    nameZh: '地球与月球',
    icon: '🌍',
    symbol: '♁',
    distanceFromSun: '1.0 AU (150M km)',
    diameterKm: 12742,
    temperature: '-88°C to 58°C (Avg 15°C)',
    orbitalPeriod: '365.25 Days',
    moonsCount: 1,
    taglineEn: 'Our Blue Oasis of Ocean & Life',
    taglineFr: 'Notre oasis bleue d\'océans et de vie',
    taglineZh: '万物生机盎然的蔚蓝家园',
    funFactEn: 'Earth is the only known planet with liquid oceans and thriving life! Our Moon is about 384,400 km away—far enough that all other 7 planets in our solar system could fit side-by-side between Earth and the Moon!',
    funFactFr: 'La Terre est la seule planète connue abritant des océans d\'eau liquide et la vie ! La Lune se trouve à environ 384 400 km de nous, une distance suffisante pour aligner toutes les autres planètes entre elles.',
    funFactZh: '地球是已知唯一拥有液态海洋和生命繁衍的星球！月球距离地球约 38.4 万公里，这个距离甚至能把太阳系其他 7 颗行星并排塞在中间！',
    badgeTitleEn: 'Home Base Navigator',
    badgeTitleFr: 'Navigateur de la Base Terrestre',
    badgeTitleZh: '地球母港星际领航官',
    color: '#3b82f6',
    accentColor: '#60a5fa',
    quiz: {
      questionEn: 'Approximately how far is the Moon from Earth?',
      questionFr: 'À quelle distance approximative la Lune se trouve-t-elle de la Terre ?',
      questionZh: '月球距离地球大约有多远？',
      optionsEn: ['384,400 km', '10,000 km', '1,500,000 km', '50,000 km'],
      optionsFr: ['384 400 km', '10 000 km', '1 500 000 km', '50 000 km'],
      optionsZh: ['约 384,400 公里', '约 10,000 公里', '约 1,500,000 公里', '约 50,000 公里'],
      correctIndex: 0,
      explanationEn: 'The Moon orbits Earth at an average distance of about 384,400 km (about 30 Earth diameters away).',
      explanationFr: 'La Lune tourne autour de la Terre à une distance moyenne d\'environ 384 400 km.',
      explanationZh: '地月平均距离约为 384,400 公里，相当于约 30 个地球直径的距离。',
    },
  },
  {
    id: 'mars',
    category: 'terrestrial',
    nameEn: 'Mars',
    nameFr: 'Mars',
    nameZh: '火星',
    icon: '🔴',
    symbol: '♂',
    distanceFromSun: '1.52 AU (228M km)',
    diameterKm: 6779,
    temperature: '-140°C to 20°C',
    orbitalPeriod: '687 Earth Days',
    moonsCount: 2,
    taglineEn: 'The Rust-Red Planet of Giant Volcanoes',
    taglineFr: 'La planète rouge aux volcans géants',
    taglineZh: '拥有太阳系第一高峰的红色星球',
    funFactEn: 'Mars is home to Olympus Mons, the tallest volcano in the entire Solar System! Standing at 22 km high, it is nearly 3 times taller than Mount Everest on Earth!',
    funFactFr: 'Mars abrite Olympus Mons, le plus haut volcan de tout le système solaire ! S\'élevant à 22 km d\'altitude, il est presque 3 fois plus haut que l\'Everest sur Terre !',
    funFactZh: '火星拥有整个太阳系最高的火山——奥林匹斯山！它高达 22 公里，相当于地球珠穆朗玛峰高度的近 3 倍！',
    badgeTitleEn: 'Red Rover Pioneer',
    badgeTitleFr: 'Pionnier des Rovers Martiens',
    badgeTitleZh: '火星漫游先锋侦察官',
    color: '#ef4444',
    accentColor: '#f87171',
    quiz: {
      questionEn: 'How high is Olympus Mons, the giant volcano on Mars?',
      questionFr: 'Quelle est la hauteur d\'Olympus Mons, le volcan géant sur Mars ?',
      questionZh: '火星上的巨型火山奥林匹斯山大约有多高？',
      optionsEn: ['About 22 km (nearly 3× Everest)', 'About 8 km', 'About 50 km', 'About 3 km'],
      optionsFr: ['Environ 22 km (près de 3× l\'Everest)', 'Environ 8 km', 'Environ 50 km', 'Environ 3 km'],
      optionsZh: ['约 22 公里（近 3 倍珠峰）', '约 8 公里', '约 50 公里', '约 3 公里'],
      correctIndex: 0,
      explanationEn: 'Olympus Mons towers 22 km above Martian plains, making it the highest planetary mountain in the Solar System.',
      explanationFr: 'Olympus Mons culmine à 22 km de hauteur, ce qui en fait le plus imposant volcan planétaire du système solaire.',
      explanationZh: '奥林匹斯山海拔高达 22 公里，基底直径达 600 公里，是太阳系已知最高峰。',
    },
  },
  {
    id: 'asteroids',
    category: 'belt',
    nameEn: 'Asteroid Belt & Ceres',
    nameFr: 'Ceinture d\'astéroïdes & Cérès',
    nameZh: '小行星带与谷神星',
    icon: '☄️',
    symbol: '⚳',
    distanceFromSun: '2.77 AU (414M km)',
    diameterKm: 940, // Ceres
    temperature: '-106°C Average',
    orbitalPeriod: '4.6 Earth Years',
    moonsCount: 0,
    taglineEn: 'The Cosmic Rocky Barrier & Dwarf World',
    taglineFr: 'La frontière rocheuse et le monde nain Cérès',
    taglineZh: '太阳系内外的岩石碎屑带与矮行星',
    funFactEn: 'Located between Mars and Jupiter, the Asteroid Belt contains millions of ancient rocks left over from the birth of the Solar System. The largest object is dwarf planet Ceres, which contains shiny salt deposits and underground water ice!',
    funFactFr: 'Située entre Mars et Jupiter, la ceinture d\'astéroïdes contient des millions de roches datant de la formation du système solaire. Le plus grand corps est la planète naine Cérès, qui abrite de la glace d\'eau souterraine !',
    funFactZh: '位于火星和木星之间，小行星带汇集了数百万块太阳系诞生初期遗留的岩石。最大的成员是矮行星谷神星，地下蕴藏着丰富的水冰！',
    badgeTitleEn: 'Asteroid Miner Ace',
    badgeTitleFr: 'As des Astéroïdes & de Cérès',
    badgeTitleZh: '小行星带探矿王牌',
    color: '#a8a29e',
    accentColor: '#d6d3d1',
    quiz: {
      questionEn: 'Where is the main Asteroid Belt located in our solar system?',
      questionFr: 'Où se situe la ceinture principale d\'astéroïdes dans notre système solaire ?',
      questionZh: '太阳系的主小行星带位于哪两颗行星轨道之间？',
      optionsEn: [
        'Between Earth and the Moon',
        'Between Mars and Jupiter',
        'Beyond Neptune only',
        'Between the Sun and Mercury'
      ],
      optionsFr: [
        'Entre la Terre et la Lune',
        'Entre Mars et Jupiter',
        'Uniquement au-delà de Neptune',
        'Entre le Soleil et Mercure'
      ],
      optionsZh: [
        '位于地球和月球之间',
        '位于火星和木星之间',
        '仅存在于海王星以外',
        '位于太阳和水星之间'
      ],
      correctIndex: 1,
      explanationEn: 'The Asteroid Belt is located between the orbits of rocky Mars and gas giant Jupiter.',
      explanationFr: 'La ceinture principale d\'astéroïdes se situe entre les orbites de Mars et de Jupiter.',
      explanationZh: '小行星带位于类地行星火星与巨型气态行星木星的轨道之间。',
    },
  },
  {
    id: 'jupiter',
    category: 'gas_giant',
    nameEn: 'Jupiter',
    nameFr: 'Jupiter',
    nameZh: '木星',
    icon: '🪐',
    symbol: '♃',
    distanceFromSun: '5.2 AU (778M km)',
    diameterKm: 139820,
    temperature: '-110°C (Cloud tops)',
    orbitalPeriod: '11.86 Earth Years',
    moonsCount: 95,
    taglineEn: 'The Giant King & The Great Red Spot',
    taglineFr: 'Le roi géant et la Grande Tache Rouge',
    taglineZh: '太阳系行星之王与大红斑风暴',
    funFactEn: 'Jupiter is more massive than ALL other planets combined! Its famous Great Red Spot is a colossal swirling hurricane that has been raging for over 350 years and is wider than planet Earth itself.',
    funFactFr: 'Jupiter est plus massive que TOUTES les autres planètes réunies ! Sa Grande Tache Rouge est un ouragan gigantesque qui tourbillonne depuis plus de 350 ans et qui est plus large que la Terre entière.',
    funFactZh: '木星的质量比太阳系其他所有行星加起来还要大 2.5 倍！它标志性的大红斑风暴已经刮了超过 350 年，直径比整个地球还要宽！',
    badgeTitleEn: 'Storm Master of Jupiter',
    badgeTitleFr: 'Maître des Tempêtes Joviennes',
    badgeTitleZh: '木星红斑风暴掌控者',
    color: '#d97706',
    accentColor: '#f59e0b',
    quiz: {
      questionEn: 'What is Jupiter\'s Great Red Spot?',
      questionFr: 'Qu\'est-ce que la Grande Tache Rouge de Jupiter ?',
      questionZh: '木星著名的大红斑究竟是什么？',
      optionsEn: [
        'A gigantic storm that has lasted over 350 years',
        'A huge red volcano',
        'A crater from a giant meteor',
        'A warm red ocean'
      ],
      optionsFr: [
        'Un ouragan géant qui tourbillonne depuis plus de 350 ans',
        'Un immense volcan rouge',
        'Un cratère de météorite géant',
        'Un océan d\'eau chaude rouge'
      ],
      optionsZh: [
        '一场持续旋转了350多年的超级反气旋风暴',
        '一座巨大的红色火山喷发口',
        '一颗巨型陨石撞击留下的陨石坑',
        '一片红色的温暖咸水海洋'
      ],
      correctIndex: 0,
      explanationEn: 'The Great Red Spot is a monstrous high-pressure storm larger than planet Earth, spinning counter-clockwise for centuries!',
      explanationFr: 'La Grande Tache Rouge est une gigantesque tempête anticyclonique plus vaste que la Terre, active depuis des siècles !',
      explanationZh: '大红斑是一个比地球还大的巨大高压反气旋风暴系统，已持续观测了三个多世纪！',
    },
  },
  {
    id: 'saturn',
    category: 'gas_giant',
    nameEn: 'Saturn',
    nameFr: 'Saturne',
    nameZh: '土星',
    icon: '🪐',
    symbol: '♄',
    distanceFromSun: '9.58 AU (1.43B km)',
    diameterKm: 116460,
    temperature: '-140°C',
    orbitalPeriod: '29.5 Earth Years',
    moonsCount: 146,
    taglineEn: 'The Jewel of the Solar System & Glowing Rings',
    taglineFr: 'Le joyau du système solaire aux anneaux éblouissants',
    taglineZh: '拥有壮丽冰晶光环的太阳系宝石',
    funFactEn: 'Saturn\'s dazzling rings span over 282,000 km across, yet they are paper-thin—only about 10 meters thick! They are made of billions of pieces of glittering water ice and rock.',
    funFactFr: 'Les magnifiques anneaux de Saturne s\'étendent sur plus de 282 000 km de largeur, mais ils ne mesurent que 10 mètres d\'épaisseur ! Ils sont composés de milliards de morceaux de glace étincelante et de roche.',
    funFactZh: '土星光环跨度超过 28 万公里，但厚度却惊人地薄——平均只有约 10 米！它们由数以亿计闪闪发光的水冰块和岩石碎片构成。',
    badgeTitleEn: 'Ring Sailor Admiral',
    badgeTitleFr: 'Amiral des Anneaux de Saturne',
    badgeTitleZh: '土星冰环舰队司令',
    color: '#eab308',
    accentColor: '#fde047',
    quiz: {
      questionEn: 'What are Saturn\'s glorious rings mainly made of?',
      questionFr: 'De quoi sont principalement composés les anneaux de Saturne ?',
      questionZh: '土星壮丽的光环主要由什么物质构成？',
      optionsEn: [
        'Solid shiny metal sheets',
        'Billions of pieces of water ice and rock',
        'Golden space dust and fire',
        'Glowing clouds of smoke'
      ],
      optionsFr: [
        'De feuilles de métal solides et brillantes',
        'De milliards de morceaux de glace d\'eau et de roche',
        'De poussière d\'or et de flammes',
        'De nuages de fumée luminescents'
      ],
      optionsZh: [
        '整块坚硬的反光金属板',
        '数以亿计的水冰颗粒与岩石碎块',
        '金色的太空尘埃与宇宙火焰',
        '发光的彩色气体烟雾'
      ],
      correctIndex: 1,
      explanationEn: 'Saturn\'s rings are 99% pure water ice particles ranging from tiny dust specks to house-sized icebergs!',
      explanationFr: 'Les anneaux de Saturne sont composés à 99 % de particules de glace d\'eau pure allant du grain de poussière à l\'iceberg !',
      explanationZh: '土星环由 99% 的纯水冰碎片组成，从微小的尘埃颗粒到房屋大小的冰山应有尽有！',
    },
  },
  {
    id: 'uranus',
    category: 'ice_giant',
    nameEn: 'Uranus',
    nameFr: 'Uranus',
    nameZh: '天王星',
    icon: '🌀',
    symbol: '♅',
    distanceFromSun: '19.2 AU (2.87B km)',
    diameterKm: 50724,
    temperature: '-224°C (Coldest Planet)',
    orbitalPeriod: '84 Earth Years',
    moonsCount: 28,
    taglineEn: 'The Sideways-Rolling Aquamarine Giant',
    taglineFr: 'Le géant aigue-marine qui roule sur le côté',
    taglineZh: '九十度躺倒旋转的青色冰巨星',
    funFactEn: 'Uranus is uniquely tilted at 98 degrees on its side! Instead of spinning like a top, it rolls around the Sun like a bowling ball. This causes extreme 42-year-long polar days and nights!',
    funFactFr: 'Uranus est inclinée à 98 degrés sur son axe ! Au lieu de tourner comme une toupie, elle roule sur le côté autour du Soleil comme une boule de bowling. Ses saisons durent chacune 21 ans !',
    funFactZh: '天王星非常神奇，它的自转轴倾斜了 98 度！它是“躺着”在轨道上像保龄球一样滚着绕太阳转的，导致它的极昼极夜各长达 42 年！',
    badgeTitleEn: 'Sideways Orbit Champion',
    badgeTitleFr: 'Champion de l\'Orbite Inclinée',
    badgeTitleZh: '天王星侧滚领航冠军',
    color: '#06b6d4',
    accentColor: '#67e8f9',
    quiz: {
      questionEn: 'What makes Uranus\'s rotation special compared to other planets?',
      questionFr: 'Qu\'est-ce qui rend la rotation d\'Uranus unique par rapport aux autres planètes ?',
      questionZh: '天王星与其他行星相比，最独特的旋转特征是什么？',
      optionsEn: [
        'It is tilted 98 degrees and rolls on its side like a ball',
        'It does not spin at all',
        'It spins twice as fast as the Sun',
        'It changes direction every 10 days'
      ],
      optionsFr: [
        'Elle est inclinée à 98 degrés et roule sur le côté comme une bille',
        'Elle ne tourne pas du tout sur elle-même',
        'Elle tourne deux fois plus vite que le Soleil',
        'Elle change de sens de rotation tous les 10 jours'
      ],
      optionsZh: [
        '自转轴倾角达98度，“躺着”在轨道上滚转',
        '它完全不发生任何自转',
        '它的自转速度比太阳快两倍',
        '它每隔10天就会调转旋转方向'
      ],
      correctIndex: 0,
      explanationEn: 'Likely due to an ancient collision with an Earth-sized protoplanet, Uranus spins tilted almost completely on its side!',
      explanationFr: 'Probablement à la suite d\'un impact géant au début du système solaire, Uranus tourne sur le côté à 98° d\'inclinaison.',
      explanationZh: '很可能在太阳系早期遭遇过一次原行星碰撞，天王星自转轴倾斜了 98 度，几乎横卧在公转轨道面上。',
    },
  },
  {
    id: 'neptune',
    category: 'ice_giant',
    nameEn: 'Neptune',
    nameFr: 'Neptune',
    nameZh: '海王星',
    icon: '🌊',
    symbol: '♆',
    distanceFromSun: '30.1 AU (4.5B km)',
    diameterKm: 49244,
    temperature: '-214°C',
    orbitalPeriod: '165 Earth Years',
    moonsCount: 16,
    taglineEn: 'The Deep Azure World of Supersonic Winds',
    taglineFr: 'Le monde azur aux vents supersoniques',
    taglineZh: '拥有太阳系最强超音速狂风的湛蓝星球',
    funFactEn: 'Neptune experiences the most ferocious winds in the Solar System, whipping up storms at over 2,100 km/h—faster than the speed of sound on Earth! Its vivid blue color comes from methane in its upper atmosphere.',
    funFactFr: 'Neptune subit les vents les plus violents du système solaire, dépassant 2 100 km/h, soit plus vite que la vitesse du son sur Terre ! Sa couleur bleu azur provient du méthane dans son atmosphère.',
    funFactZh: '海王星拥有太阳系中最狂暴的风暴，风速高达每小时 2,100 公里，超越了地球上的音速！其深邃的湛蓝色源自大气层中的甲烷气体。',
    badgeTitleEn: 'Supersonic Voyager',
    badgeTitleFr: 'Voyageur Supersonique de Neptune',
    badgeTitleZh: '超音速深蓝远征先锋',
    color: '#2563eb',
    accentColor: '#3b82f6',
    quiz: {
      questionEn: 'How fast can winds blow on stormy Neptune?',
      questionFr: 'À quelle vitesse les vents peuvent-ils souffler sur Neptune ?',
      questionZh: '海王星风暴中的最高风速可达多少？',
      optionsEn: [
        'Over 2,100 km/h (faster than sound!)',
        'About 50 km/h',
        'About 250 km/h',
        'No wind blows on Neptune'
      ],
      optionsFr: [
        'Plus de 2 100 km/h (plus vite que le son !)',
        'Environ 50 km/h',
        'Environ 250 km/h',
        'Aucun vent ne souffle sur Neptune'
      ],
      optionsZh: [
        '超过时速 2,100 公里（超越音速！）',
        '约每小时 50 公里',
        '约每小时 250 公里',
        '海王星上完全没有风'
      ],
      correctIndex: 0,
      explanationEn: 'Neptune\'s supersonic winds can exceed 2,100 km/h, which is 5 times faster than the strongest tornadoes on Earth!',
      explanationFr: 'Les vents de Neptune peuvent dépasser 2 100 km/h, soit 5 fois plus puissants que les plus violentes tornades terrestres !',
      explanationZh: '海王星上的狂风速度超过 2,100 km/h，是地球最强龙卷风风速的数倍！',
    },
  },
  {
    id: 'pluto',
    category: 'dwarf_planet',
    nameEn: 'Pluto & Kuiper Belt',
    nameFr: 'Pluton & la Ceinture de Kuiper',
    nameZh: '冥王星与柯伊伯带',
    icon: '🤍',
    symbol: '♇',
    distanceFromSun: '39.5 AU (5.9B km)',
    diameterKm: 2376,
    temperature: '-230°C',
    orbitalPeriod: '248 Earth Years',
    moonsCount: 5,
    taglineEn: 'The Beloved Icy Dwarf with a Heart Glacier',
    taglineFr: 'La planète naine adorée au cœur de glace',
    taglineZh: '拥有氮冰爱心冰原的柯伊伯带矮行星',
    funFactEn: 'When NASA\'s New Horizons spacecraft flew past Pluto in 2015, it discovered a giant heart-shaped glacier named Tombaugh Regio made of bright nitrogen ice! Pluto is smaller than Earth\'s Moon.',
    funFactFr: 'En 2015, la sonde New Horizons a découvert sur Pluton un gigantesque glacier en forme de cœur composé d\'azote gelé, appelé la région Tombaugh ! Pluton est plus petite que notre Lune.',
    funFactZh: '2015年新视野号飞掠冥王星时，拍下了一个巨大的心形氮冰冰原（汤博区）！冥王星的体积甚至比月球还要小。',
    badgeTitleEn: 'Heart of the Kuiper Belt',
    badgeTitleFr: 'Cœur de la Ceinture de Kuiper',
    badgeTitleZh: '柯伊伯带爱心探险家',
    color: '#cbd5e1',
    accentColor: '#f1f5f9',
    quiz: {
      questionEn: 'What famous shape was discovered on Pluto\'s frozen surface in 2015?',
      questionFr: 'Quelle forme célèbre a été découverte sur la surface glacée de Pluton en 2015 ?',
      questionZh: '2015年新视野号在冥王星表面拍到了什么著名的地貌形状？',
      optionsEn: [
        'A giant heart-shaped nitrogen ice glacier',
        'A giant smiley face crater',
        'A perfect square pyramid',
        'A giant letter P'
      ],
      optionsFr: [
        'Un immense glacier d\'azote en forme de cœur',
        'Un cratère en forme de bonhomme souriant',
        'Une pyramide carrée parfaite',
        'Une gigantesque lettre P'
      ],
      optionsZh: [
        '一个巨大的心形氮冰冰川（汤博区）',
        '一个笑脸形状的撞击坑',
        '一座完美的金字塔结构',
        '一个巨大的英文字母 P'
      ],
      correctIndex: 0,
      explanationEn: 'Pluto features a 1,000-km-wide bright glacier of frozen nitrogen known as Tombaugh Regio or Pluto\'s Heart!',
      explanationFr: 'La région Tombaugh est un gigantesque glacier d\'azote liquide gelé en forme de cœur de 1 000 km de large !',
      explanationZh: '冥王星表面拥有一片宽达 1,000 公里的心形氮冰高原，被称为“冥王星之心”。',
    },
  },
  {
    id: 'canadarm',
    category: 'mission',
    nameEn: 'Canadarm & ISS',
    nameFr: 'Le Canadarm & l\'ISS',
    nameZh: '加拿大臂与国际空间站',
    icon: '🛰️',
    symbol: '🇨🇦',
    distanceFromSun: '408 km above Earth',
    diameterKm: 109, // ISS length
    temperature: '-120°C to 120°C',
    orbitalPeriod: '92 Minutes (16 Orbits/Day)',
    moonsCount: 0,
    taglineEn: 'Canada\'s Legendary Robotic Hand in Orbit',
    taglineFr: 'Le bras robotique légendaire du Canada en orbite',
    taglineZh: '加拿大标志性航天机械臂与空间站',
    funFactEn: 'Canadarm and Canadarm2 are Canada\'s proudest space robotics achievements! Mounted on the International Space Station traveling at 28,000 km/h, Canadarm can catch visiting spacecraft, move multi-ton modules, and help astronauts on spacewalks.',
    funFactFr: 'Le Canadarm et le Canadarm2 sont de grandes fiertés canadiennes ! Installé sur la Station Spatiale Internationale filant à 28 000 km/h, ce bras robotique capture les capsules et assiste les astronautes lors des sorties spatiales.',
    funFactZh: '加拿大臂（Canadarm）是加拿大航天史上的骄傲成就！它安装在以时速 28,000 公里绕地飞行的国际空间站上，能精准抓取货运飞船并协助宇航员太空行走！',
    badgeTitleEn: 'Canadian Orbit Specialist',
    badgeTitleFr: 'Spécialiste de l\'Orbite Canadienne',
    badgeTitleZh: '加拿大轨道航天专家',
    color: '#dc2626',
    accentColor: '#ef4444',
    quiz: {
      questionEn: 'How fast does the International Space Station travel as it orbits Earth with the Canadarm?',
      questionFr: 'À quelle vitesse l\'ISS voyage-t-elle en orbite autour de la Terre avec le Canadarm ?',
      questionZh: '搭载加拿大臂的国际空间站绕地球飞行的速度有多快？',
      optionsEn: [
        'About 28,000 km/h (92 min per orbit)',
        'About 500 km/h',
        'About 1,000 km/h',
        'About 100,000 km/h'
      ],
      optionsFr: [
        'Environ 28 000 km/h (92 min par orbite)',
        'Environ 500 km/h',
        'Environ 1 000 km/h',
        'Environ 100 000 km/h'
      ],
      optionsZh: [
        '约每小时 28,000 公里（92分钟绕地一圈）',
        '约每小时 500 公里',
        '约每小时 1,000 公里',
        '约每小时 100,000 公里'
      ],
      correctIndex: 0,
      explanationEn: 'The ISS cruises at ~28,000 km/h, circling the entire Earth 16 times every single day!',
      explanationFr: 'L\'ISS file à environ 28 000 km/h, effectuant 16 fois le tour complet de la Terre chaque jour !',
      explanationZh: '国际空间站以每秒 7.7 公里（约 28,000 km/h）的速度飞行，宇航员每天能看到 16 次日出日落！',
    },
  },
  {
    id: 'jwst',
    category: 'mission',
    nameEn: 'James Webb Space Telescope',
    nameFr: 'Télescope Spatial James Webb',
    nameZh: '韦伯太空望远镜',
    icon: '🔭',
    symbol: '✨',
    distanceFromSun: '1.5M km from Earth (L2)',
    diameterKm: 21, // Sunshield length
    temperature: '-233°C (Detectors)',
    orbitalPeriod: 'Orbit around Sun at L2',
    moonsCount: 0,
    taglineEn: 'The Golden Eye Looking Back in Cosmic Time',
    taglineFr: 'L\'œil doré qui remonte le temps cosmique',
    taglineZh: '窥探宇宙黎明最初星系的金色神眸',
    funFactEn: 'The James Webb Space Telescope (JWST) uses 18 gold-plated hexagonal mirrors to capture infrared light from the very first stars and galaxies formed over 13.5 billion years ago! Canada provided its Fine Guidance Sensor (FGS).',
    funFactFr: 'Le télescope James Webb utilise 18 miroirs hexagonaux plaqués or pour observer les premières galaxies nées il y a plus de 13,5 milliards d\'années ! Le Canada a fourni son capteur de guidage de haute précision (FGS).',
    funFactZh: '韦伯望远镜拥有 18 面镀金六边形主镜，能捕捉 135 亿年前宇宙早期的第一缕星光！加拿大航天局为其研发了至关重要的精密制导传感器（FGS）。',
    badgeTitleEn: 'Deep Cosmos Observer',
    badgeTitleFr: 'Observateur du Cosmos Profond',
    badgeTitleZh: '深空宇宙透视家',
    color: '#d97706',
    accentColor: '#fbbf24',
    quiz: {
      questionEn: 'What are the 18 hexagonal primary mirrors of the James Webb Space Telescope coated with to reflect infrared light?',
      questionFr: 'De quoi sont recouverts les 18 miroirs hexagonaux du télescope James Webb pour réfléchir la lumière infrarouge ?',
      questionZh: '韦伯望远镜的 18 面六边形主镜表面镀了什么材料来反射红外光？',
      optionsEn: [
        'Pure microscopic gold coating',
        'Liquid silver paint',
        'Polished diamond sheets',
        'Copper foil'
      ],
      optionsFr: [
        'Une fine couche d\'or pur microscopique',
        'De la peinture argentée liquide',
        'Des plaques de diamant poli',
        'Des feuilles de cuivre'
      ],
      optionsZh: [
        '超高纯度的显微级纯金涂层',
        '普通的液态银色反光漆',
        '抛光的人造金刚石薄片',
        '传统的纯铜金属箔'
      ],
      correctIndex: 0,
      explanationEn: 'Gold is the best material for reflecting infrared light, so each beryllium mirror is coated in microscopic pure gold!',
      explanationFr: 'L\'or est le métal le plus efficace pour réfléchir le rayonnement infrarouge, c\'est pourquoi les miroirs sont plaqués or pur.',
      explanationZh: '黄金是反射红外线效率最高的材料，因此韦伯望远镜的每面铍镜都镀有仅几百纳米厚的纯金层！',
    },
  },
  {
    id: 'comet',
    category: 'mission',
    nameEn: 'Halley\'s Comet & Deep Space',
    nameFr: 'Comète de Halley & Espace Profond',
    nameZh: '哈雷彗星与深空星云',
    icon: '☄️',
    symbol: '☄',
    distanceFromSun: '0.59 to 35.1 AU',
    diameterKm: 15, // nucleus 15x8 km
    temperature: '-200°C to 100°C',
    orbitalPeriod: '75-76 Years',
    moonsCount: 0,
    taglineEn: 'The Great Cosmic Snowball with a Glowing Tail',
    taglineFr: 'La boule de neige cosmique à la queue scintillante',
    taglineZh: '拖着百万公里辉光彗尾的冰雪信使',
    funFactEn: 'Comets are essentially "dirty snowballs" made of frozen ice, dust, and rock. As Halley\'s Comet nears the Sun, solar heat vaporizes its ice into a luminous gas tail that can stretch over 100 million kilometers long!',
    funFactFr: 'Les comètes sont de véritables « boules de neige sales » de glace, de poussière et de roche. En s\'approchant du Soleil, la glace sublime et forme une queue lumineuse de plus de 100 millions de kilomètres !',
    funFactZh: '彗星本质上是“脏雪球”，由冰、水和岩石尘埃构成。当它接近太阳时，受热升华喷发出气体，形成长达上亿公里的壮丽彗尾！',
    badgeTitleEn: 'Comet Chaser Extraordinaire',
    badgeTitleFr: 'Chasseur de Comètes Émérite',
    badgeTitleZh: '深空追彗特级领航员',
    color: '#8b5cf6',
    accentColor: '#a78bfa',
    quiz: {
      questionEn: 'What causes a comet to develop its magnificent glowing tail when it approaches the Sun?',
      questionFr: 'Qu\'est-ce qui fait apparaître la queue étincelante d\'une comète lorsqu\'elle s\'approche du Soleil ?',
      questionZh: '当彗星靠近太阳时，是什么原因让它产生壮观的发光彗尾？',
      optionsEn: [
        'Solar heat vaporizes ice into gas and dust pushed by solar wind',
        'It catches fire and burns up',
        'It shoots electric sparks',
        'It turns on secret lights'
      ],
      optionsFr: [
        'La chaleur solaire sublime les glaces en gaz repoussés par le vent solaire',
        'Elle prend feu et brûle dans le vide',
        'Elle émet des étincelles électriques',
        'Elle allume des lumières secrètes'
      ],
      optionsZh: [
        '太阳的热量使冰层升华为气体，并被太阳风吹散形成彗尾',
        '彗星在太空中起火燃烧',
        '彗星与宇宙射线摩擦产生放电火花',
        '核心内部发生化学荧光反应'
      ],
      correctIndex: 0,
      explanationEn: 'The Sun\'s heat vaporizes the comet\'s ice into gases, and the solar wind blows them into a tail pointing away from the Sun!',
      explanationFr: 'La chaleur du Soleil transforme la glace en gaz, et le vent solaire repousse ces poussières pour créer une longue queue lumineuse.',
      explanationZh: '太阳的热量使冰雪升华成气体尘埃云，太阳风将其向背离太阳的方向吹散，形成了上亿公里的彗尾！',
    },
  },
];

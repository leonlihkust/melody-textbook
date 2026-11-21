export type ChinaRegion = 'north' | 'east' | 'southwest' | 'northwest' | 'south';

export interface VisualCard {
  icon: string;
  titleEn: string;
  titleZh: string;
  titleFr: string;
  descEn: string;
  descZh: string;
  descFr: string;
  tagColor: string;
}

export interface ChinaCityQuiz {
  questionEn: string;
  questionZh: string;
  questionFr: string;
  optionsEn: string[];
  optionsZh: string[];
  optionsFr: string[];
  correctIndex: number;
  explanationEn: string;
  explanationZh: string;
  explanationFr: string;
}

export interface ChinaCity {
  id: string;
  nameEn: string;
  nameZh: string;
  nameFr: string;
  provinceEn: string;
  provinceZh: string;
  provinceFr: string;
  region: ChinaRegion;
  icon: string;
  taglineEn: string;
  taglineZh: string;
  taglineFr: string;
  landmarkEn: string;
  landmarkZh: string;
  landmarkFr: string;
  famousQuoteEn: string;
  famousQuoteZh: string;
  famousQuoteFr: string;
  coordinates: {
    x: number;
    y: number;
    z: number;
    lon: number;
    lat: number;
  };
  funFactEn: string;
  funFactZh: string;
  funFactFr: string;
  architecturalWonderEn: string;
  architecturalWonderZh: string;
  architecturalWonderFr: string;
  badgeTitleEn: string;
  badgeTitleZh: string;
  badgeTitleFr: string;
  accentColor: string;
  stampIcon: string;
  stampZh: string;
  stampEn: string;
  stampFr: string;
  visualCards: VisualCard[];
  quiz: ChinaCityQuiz;
}

export const CHINA_CITIES: ChinaCity[] = [
  {
    id: 'beijing',
    nameEn: 'Beijing',
    nameZh: '北京',
    nameFr: 'Pékin',
    provinceEn: 'Capital',
    provinceZh: '首都',
    provinceFr: 'Capitale',
    region: 'north',
    icon: '🏯',
    taglineEn: 'The Imperial Capital & Summer Palace',
    taglineZh: '千年帝都 · 颐和园万寿山与长城',
    taglineFr: 'Capitale impériale & Palais d\'Été',
    landmarkEn: 'Summer Palace & Great Wall',
    landmarkZh: '颐和园与万里长城',
    landmarkFr: 'Palais d\'Été et Grande Muraille',
    famousQuoteEn: '“He who hasn\'t climbed the Great Wall is no hero!”',
    famousQuoteZh: '“不到长城非好汉，万寿山前看昆明！”',
    famousQuoteFr: '« Pas gravi la Muraille, pas un héros ! »',
    coordinates: { x: 7.2, y: 0.1, z: -4.3, lon: 116.4, lat: 39.9 },
    funFactEn: 'Kunming Lake was dug out entirely by hand!',
    funFactZh: '昆明湖巨大湖面竟然全是古人用铁铲一铲铲挖出来的！',
    funFactFr: 'Le lac Kunming a été creusé à la main !',
    architecturalWonderEn: 'The Long Corridor has 14,000 distinct hand-painted pictures!',
    architecturalWonderZh: '长廊728米长，画着14,000多幅神话故事彩画！',
    architecturalWonderFr: 'Le Long Couloir compte plus de 14 000 peintures !',
    badgeTitleEn: 'Imperial Palace Badge',
    badgeTitleZh: '皇家园林徽章',
    badgeTitleFr: 'Insigne Impérial',
    accentColor: '#ef4444',
    stampIcon: '🏯',
    stampZh: '帝都探秘·打卡',
    stampEn: 'BEIJING IMPERIAL',
    stampFr: 'PÉKIN IMPÉRIAL',
    visualCards: [
      {
        icon: '🌊',
        titleEn: 'Hand-dug Lake',
        titleZh: '人工挖出的大湖',
        titleFr: 'Lac creusé main',
        descEn: 'Workers dug Kunming lake by shovel and piled soil into Longevity Hill!',
        descZh: '古人用铁锹挖出巨型昆明湖，泥土堆成了巍峨万寿山！',
        descFr: 'La terre creusée du lac Kunming a formé la colline de la Longévité !',
        tagColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        icon: '🎨',
        titleEn: 'World\'s Longest Gallery',
        titleZh: '世界最长彩画廊',
        titleFr: 'Plus longue galerie',
        descEn: '728 meters long with 14,000 colorful cartoon and legend paintings!',
        descZh: '全长728米的长廊，梁上有14,000幅《西游记》《三国》彩画！',
        descFr: '728 m avec 14 000 peintures colorées de contes et légendes !',
        tagColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        icon: '🧱',
        titleEn: 'Dragon Wall in Clouds',
        titleZh: '崇山峻岭万里长城',
        titleFr: 'Grande Muraille',
        descEn: 'Snakes over 20,000 km across mountain ridges like a sleeping dragon!',
        descZh: '如巨龙横跨两万公里崇山峻岭，烽火台一眼望不到头！',
        descFr: 'Ondule sur 20 000 km le long des crêtes comme un dragon géant !',
        tagColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    quiz: {
      questionEn: 'How was Longevity Hill (万寿山) in Beijing\'s Summer Palace made?',
      questionZh: '北京颐和园的“万寿山”是怎么造出来的？',
      questionFr: 'Comment la colline de la Longévité a-t-elle été faite ?',
      optionsEn: [
        'Naturally formed by an ancient volcano',
        'Piled up from soil excavated to create Kunming Lake',
        'Carved out of a giant iceberg',
        'Made of bricks shipped from space'
      ],
      optionsZh: [
        '火山喷发自然形成',
        '挖昆明湖泥土堆筑而成',
        '巨大冰川雕刻而成',
        '外太空石头砌成'
      ],
      optionsFr: [
        'Volcan antique',
        'Terre creusée du lac Kunming',
        'Sculptée dans un iceberg',
        'Roches spatiales'
      ],
      correctIndex: 1,
      explanationEn: 'Workers dug the giant lake by hand and piled all the soil into Longevity Hill!',
      explanationZh: '古人挖昆明湖时，顺手把挖出的泥土堆成了万寿山！',
      explanationFr: 'La colline a été formée avec la terre retirée en creusant le lac !'
    }
  },
  {
    id: 'hangzhou',
    nameEn: 'Hangzhou',
    nameZh: '杭州',
    nameFr: 'Hangzhou',
    provinceEn: 'Zhejiang',
    provinceZh: '浙江',
    provinceFr: 'Zhejiang',
    region: 'east',
    icon: '🌸',
    taglineEn: 'Paradise on Earth & West Lake',
    taglineZh: '人间天堂 · 西湖十景与三潭印月',
    taglineFr: 'Paradis sur Terre & Lac de l\'Ouest',
    landmarkEn: 'West Lake & Three Pools',
    landmarkZh: '西湖与三潭印月',
    landmarkFr: 'Lac de l\'Ouest & 3 Étangs',
    famousQuoteEn: '“Above is heaven, below are Suzhou and Hangzhou!”',
    famousQuoteZh: '“上有天堂，下有苏杭！”',
    famousQuoteFr: '« Au ciel le paradis, sur terre Suzhou et Hangzhou ! »',
    coordinates: { x: 8.8, y: 0.1, z: 0.8, lon: 120.2, lat: 30.3 },
    funFactEn: 'There are 3 stone lanterns in the lake that mirror 33 moons at night!',
    funFactZh: '中秋夜点燃三座石塔蜡烛，湖里能倒映出33个明月！',
    funFactFr: '3 lanternes de pierre reflètent 33 lunes la nuit du festival !',
    architecturalWonderEn: 'Su Causeway spans 2.8 km of weeping willows and 6 arched bridges!',
    architecturalWonderZh: '苏堤全长2.8公里，六座石拱桥与垂柳桃花相映成趣！',
    architecturalWonderFr: 'La chaussée Su s\'étend sur 2,8 km avec 6 ponts de pierre !',
    badgeTitleEn: 'West Lake Poet Badge',
    badgeTitleZh: '西湖仙境徽章',
    badgeTitleFr: 'Insigne du Lac de l\'Ouest',
    accentColor: '#10b981',
    stampIcon: '🌸',
    stampZh: '西湖寻仙·打卡',
    stampEn: 'HANGZHOU PARADISE',
    stampFr: 'HANGZHOU PARADIS',
    visualCards: [
      {
        icon: '🌕',
        titleEn: '33 Floating Moons',
        titleZh: '一湖看见33个月亮',
        titleFr: '33 Lunes dans l\'eau',
        descEn: 'Lit candles inside the 3 stone lanterns make 33 glowing moons dance on the water!',
        descZh: '中秋夜在三座石塔放蜡烛，烛光映在湖里，加上真月亮足足有33个！',
        descFr: 'Des bougies dans 3 pagodes font briller 33 lunes sur l\'eau !',
        tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        icon: '🌉',
        titleEn: 'Broken Bridge Illusion',
        titleZh: '神奇的“断桥不断”',
        titleFr: 'Pont brisé intact',
        descEn: 'Winter snow melts from the sunlit side first, making the bridge look broken!',
        descZh: '冬天下雪后，向阳处雪先化，远远看去桥像断了一截，超级神奇！',
        descFr: 'La neige fond au soleil en premier, faisant paraître le pont coupé en deux !',
        tagColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        icon: '🍵',
        titleEn: 'Dragon Well Green Tea',
        titleZh: '西湖龙井茶香',
        titleFr: 'Thé du Puits du Dragon',
        descEn: 'Crisp green tea leaves picked by hand around spring mist hills!',
        descZh: '清明采摘的龙井嫩叶像小雀舌，泡在清泉里翠绿清香！',
        descFr: 'Des feuilles de thé Longjing cueillies dans les brumes printanières !',
        tagColor: 'bg-teal-100 text-teal-800 border-teal-300'
      }
    ],
    quiz: {
      questionEn: 'Why is the famous bridge on Hangzhou West Lake called "Broken Bridge" (断桥)?',
      questionZh: '杭州西湖著名的“断桥”为什么叫这个名字？',
      questionFr: 'Pourquoi le pont du lac de l\'Ouest est-il nommé « Pont Brisé » ?',
      optionsEn: [
        'It was smashed in half by an earthquake',
        'Melting snow on the sunny side makes it look broken from afar',
        'It was never finished by the builders',
        'A sea monster bit it in half'
      ],
      optionsZh: [
        '古代地震震断了',
        '冬天向阳面雪先融化，远远看像断开一样',
        '工匠建了一半没有建完',
        '被神仙踩碎了一半'
      ],
      optionsFr: [
        'Cassé par un séisme',
        'La neige fond au soleil, semblant couper le pont de loin',
        'Jamais terminé par les bâtisseurs',
        'Brisé par un monstre'
      ],
      correctIndex: 1,
      explanationEn: 'The snow melts first on the sunny side, creating the magical optical illusion called "Broken Bridge Remnant Snow"!',
      explanationZh: '“断桥残雪”：向阳处雪先化，远远看宛如白链中断，是西湖最著名奇景！',
      explanationFr: 'La fonte inégale de la neige crée une illusion d\'optique féerique !'
    }
  },
  {
    id: 'xian',
    nameEn: 'Xi\'an',
    nameZh: '西安',
    nameFr: 'Xi\'an',
    provinceEn: 'Shaanxi',
    provinceZh: '陕西',
    provinceFr: 'Shaanxi',
    region: 'northwest',
    icon: '🏺',
    taglineEn: 'Ancient Silk Road & Terracotta Army',
    taglineZh: '丝路起点 · 秦始皇兵马俑与古城墙',
    taglineFr: 'Route de la Soie & Soldats de Terre Cuite',
    landmarkEn: 'Terracotta Warriors & City Wall',
    landmarkZh: '秦始皇兵马俑与明城墙',
    landmarkFr: 'Guerriers de Terre Cuite & Remparts',
    famousQuoteEn: '“One step in Xi\'an walks through 3,000 years of history.”',
    famousQuoteZh: '“八水绕长安，千年兵马俑！”',
    famousQuoteFr: '« À Xi\'an, un pas traverse 3 000 ans d\'histoire. »',
    coordinates: { x: 3.8, y: 0.1, z: -1.2, lon: 108.9, lat: 34.3 },
    funFactEn: 'Over 8,000 clay warriors were buried underground, and every face is different!',
    funFactZh: '地下埋了8000多个陶土士兵，每个士兵的面部表情都不一样！',
    funFactFr: '8 000 soldats d\'argile sous terre, tous avec un visage unique !',
    architecturalWonderEn: 'The ancient stone wall is 14 km long and wide enough to ride bikes!',
    architecturalWonderZh: '古城墙足足14公里长，顶上宽阔得可以骑自行车环城！',
    architecturalWonderFr: 'Les remparts font 14 km de long et sont assez larges pour y faire du vélo !',
    badgeTitleEn: 'Terracotta Commander Badge',
    badgeTitleZh: '大秦勇士徽章',
    badgeTitleFr: 'Insigne Guerrier Qin',
    accentColor: '#d97706',
    stampIcon: '🏺',
    stampZh: '长安兵马·打卡',
    stampEn: 'XI\'AN TERRACOTTA',
    stampFr: 'XI\'AN GUERRIER',
    visualCards: [
      {
        icon: '💂',
        titleEn: '8,000 Unique Faces',
        titleZh: '8000张不一样的脸',
        titleFr: '8 000 Visages uniques',
        descEn: 'Every single clay warrior has a distinct hairstyle, mustache, and expression!',
        descZh: '8000多尊兵马俑，每一张脸、胡子和发髻都不同，栩栩如生！',
        descFr: 'Chaque guerrier a sa propre coiffure, moustache et expression !',
        tagColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        icon: '🚴',
        titleEn: 'Biking on City Walls',
        titleZh: '在城墙上骑自行车',
        titleFr: 'Vélo sur les remparts',
        descEn: 'The wall is 12 meters wide, so kids can ride bikes along the entire 14 km perimeter!',
        descZh: '城墙有12米宽，小朋友可以在上面吹着微风骑自行车逛一圈！',
        descFr: 'Les remparts font 12 m de large : on peut faire du vélo tout autour !',
        tagColor: 'bg-orange-100 text-orange-800 border-orange-300'
      },
      {
        icon: '🐫',
        titleEn: 'Silk Road Starting Point',
        titleZh: '丝绸之路起点',
        titleFr: 'Départ Route de la Soie',
        descEn: 'Camel caravans carried silk and porcelain all the way to Rome from here!',
        descZh: '古时候一队队骆驼驮着丝绸茶叶，从这里出发一直走到罗马！',
        descFr: 'Les caravanes de chameaux partaient d\'ici vers Rome avec de la soie !',
        tagColor: 'bg-yellow-100 text-yellow-800 border-yellow-300'
      }
    ],
    quiz: {
      questionEn: 'What is special about the faces of the 8,000 Terracotta Warriors?',
      questionZh: '秦始皇兵马俑的8000个士兵脸孔有什么神奇之处？',
      questionFr: 'Quelle est la particularité des 8 000 guerriers en terre cuite ?',
      optionsEn: [
        'They all look exactly the same from a mold',
        'Every single warrior face and expression is completely unique',
        'They are wearing alien helmets',
        'They were made out of green cheese'
      ],
      optionsZh: [
        '用同一个模子造的，完全一模一样',
        '每一个士兵的相貌和神情都独一无二',
        '全部戴着外星人面具',
        '是用绿色奶酪捏出来的'
      ],
      optionsFr: [
        'Tous identiques coulés dans un moule',
        'Chaque visage et expression est totalement unique',
        'Ils portent des casques extraterrestres',
        'Ils sont en fromage vert'
      ],
      correctIndex: 1,
      explanationEn: 'Ancient artists modeled every soldier after real people, so each face is distinct!',
      explanationZh: '古人根据真人士兵一对一雕刻，千人千面，令人惊叹！',
      explanationFr: 'Chaque guerrier a été sculpté individuellement avec des traits uniques !'
    }
  },
  {
    id: 'chengdu',
    nameEn: 'Chengdu',
    nameZh: '成都',
    nameFr: 'Chengdu',
    provinceEn: 'Sichuan',
    provinceZh: '四川',
    provinceFr: 'Sichuan',
    region: 'southwest',
    icon: '🐼',
    taglineEn: 'Giant Panda Kingdom & Ancient Water Dam',
    taglineZh: '天府之国 · 大熊猫老家与都江堰水利',
    taglineFr: 'Royaume des Pandas Géants & Dujiangyan',
    landmarkEn: 'Panda Base & Dujiangyan Weir',
    landmarkZh: '大熊猫繁育基地与都江堰',
    landmarkFr: 'Base des Pandas & Système Dujiangyan',
    famousQuoteEn: '“A city you will never want to leave once you visit.”',
    famousQuoteZh: '“九天开出一成都，万户千门入画图。”',
    famousQuoteFr: '« Chengdu, la ville dont on ne veut plus repartir. »',
    coordinates: { x: 1.8, y: 0.1, z: -0.4, lon: 104.1, lat: 30.7 },
    funFactEn: 'A giant panda eats up to 15 kg of bamboo every day and loves rolling around!',
    funFactZh: '大熊猫每天要吃15公斤嫩竹子，吃饱了最喜欢在草地上翻跟头！',
    funFactFr: 'Un panda mange jusqu\'à 15 kg de bambou par jour et fait des roulades !',
    architecturalWonderEn: 'Dujiangyan water system has tamed floods without a single dam wall for 2,200 years!',
    architecturalWonderZh: '都江堰不用修建大坝，靠巧妙分流防洪灌溉了2200年！',
    architecturalWonderFr: 'Dujiangyan régule les eaux sans aucun barrage depuis 2 200 ans !',
    badgeTitleEn: 'Bamboo Panda Badge',
    badgeTitleZh: '萌萌熊猫徽章',
    badgeTitleFr: 'Insigne Panda Bambou',
    accentColor: '#059669',
    stampIcon: '🐼',
    stampZh: '天府熊猫·打卡',
    stampEn: 'CHENGDU PANDA',
    stampFr: 'CHENGDU PANDA',
    visualCards: [
      {
        icon: '🐼',
        titleEn: 'Bamboo Munchers',
        titleZh: '圆滚滚吃竹子',
        titleFr: 'Amateurs de bambou',
        descEn: 'Pandas spend 12 hours a day snacking on fresh bamboo shoots and taking naps!',
        descZh: '大熊猫一天有12个小时都在香喷喷啃竹子，吃饱就趴着睡大觉！',
        descFr: 'Les pandas passent 12h par jour à croquer du bambou puis à faire la sieste !',
        tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        icon: '🌊',
        titleEn: '2,200-Year Water Marvel',
        titleZh: '2200年不用大坝的水利',
        titleFr: 'Génie sans barrage',
        descEn: 'Fish Mouth levee splits river into two channels: one for irrigation, one to flush silt!',
        descZh: '像鱼嘴一样把江水分成两股，旱时引水灌溉，汛时自动排沙！',
        descFr: 'La digue « Gueule de Poisson » divise la rivière pour irriguer et évacuer le sable !',
        tagColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        icon: '🍲',
        titleEn: 'Sichuan Spicy Hotpot',
        titleZh: '香喷喷麻辣火锅',
        titleFr: 'Fondue du Sichuan',
        descEn: 'Bubbling red soup with starry spices, lotus slices, and yummy meatballs!',
        descZh: '红亮热气腾腾的火锅，咕嘟咕嘟煮着藕片和肉丸，香气扑鼻！',
        descFr: 'Une marmite bouillonnante aux épices pour cuire légumes et boulettes !',
        tagColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    quiz: {
      questionEn: 'How does Dujiangyan water system prevent floods without a concrete dam?',
      questionZh: '成都都江堰水利工程为什么不需要高耸的大坝就能防洪？',
      questionFr: 'Comment Dujiangyan régule l\'eau sans barrage en béton ?',
      optionsEn: [
        'Giant electric pumps suck the water backwards',
        'A clever fish-mouth dyke naturally splits the river into two flow channels',
        'Trained dolphins drink the excess water',
        'Magic freezing spells'
      ],
      optionsZh: [
        '用巨型水泵把水抽回去',
        '用“鱼嘴”分水堤把岷江巧妙一分为二自动排洪',
        '训练成群海豚把水喝掉',
        '用魔法将水全部冻成冰'
      ],
      optionsFr: [
        'Pompes électriques géantes',
        'Une digue naturelle divise le fleuve en deux voies intelligentes',
        'Des dauphins dressés boivent l\'eau',
        'Magie glaciale'
      ],
      correctIndex: 1,
      explanationEn: 'The Fish Mouth embankment splits the river flow naturally, flushing out flood rocks and watering Chengdu farmland for 2,200 years!',
      explanationZh: '“鱼嘴分水、飞沙堰排沙、宝瓶口引水”，顺应自然，成为世界水利奇迹！',
      explanationFr: 'La digue divise l\'eau naturellement pour irriguer et drainer le fleuve depuis plus de deux millénaires !'
    }
  },
  {
    id: 'shanghai',
    nameEn: 'Shanghai',
    nameZh: '上海',
    nameFr: 'Shanghai',
    provinceEn: 'Municipality',
    provinceZh: '直辖市',
    provinceFr: 'Municipalité',
    region: 'east',
    icon: '🏙️',
    taglineEn: 'Pearl of the Orient & Modern Skyline',
    taglineZh: '东方明珠 · 外滩风云与摩天大楼',
    taglineFr: 'Perle de l\'Orient & Gratte-ciel Modernes',
    landmarkEn: 'Oriental Pearl & The Bund',
    landmarkZh: '东方明珠塔与外滩',
    landmarkFr: 'Tour Perle de l\'Orient & Le Bund',
    famousQuoteEn: '“Where historic stone arches look across to futuristic towers.”',
    famousQuoteZh: '“浦江两岸，百年外滩与现代陆家嘴交相辉映。”',
    famousQuoteFr: '« Le mariage du patrimoine historique et des tours du futur. »',
    coordinates: { x: 9.6, y: 0.1, z: 0.1, lon: 121.5, lat: 31.2 },
    funFactEn: 'The Oriental Pearl Tower has 11 glowing spheres inspired by shiny pearls!',
    funFactZh: '东方明珠塔有11个巨大闪耀圆球，像一串大珍珠落进玉盘！',
    funFactFr: 'La tour compte 11 sphères lumineuses comme des perles scintillantes !',
    architecturalWonderEn: 'Shanghai Tower twists like a spiral dragon to cut through strong typhoon winds!',
    architecturalWonderZh: '上海中心大厦像巨龙一样盘旋旋转上升，可以抵抗超强台风！',
    architecturalWonderFr: 'La tour de Shanghai s\'élève en vrille pour défier les typhons !',
    badgeTitleEn: 'Skyscraper Explorer Badge',
    badgeTitleZh: '摩天都市徽章',
    badgeTitleFr: 'Insigne des Gratte-ciel',
    accentColor: '#3b82f6',
    stampIcon: '🗼',
    stampZh: '魔都天际·打卡',
    stampEn: 'SHANGHAI SKYLINE',
    stampFr: 'SHANGHAI MODERNE',
    visualCards: [
      {
        icon: '🔮',
        titleEn: 'Glass Skywalk',
        titleZh: '云端悬空玻璃步道',
        titleFr: 'Passerelle de verre',
        descEn: 'Walk 259 meters high in the air on transparent glass looking straight down!',
        descZh: '站在259米高空的透明玻璃地面上，低头看小汽车像小蚂蚁！',
        descFr: 'Marchez à 259 m de haut sur un sol de verre transparent !',
        tagColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        icon: '🚢',
        titleEn: 'Huangpu River Ferry',
        titleZh: '黄浦江夜景游船',
        titleFr: 'Croisière fluviale',
        descEn: 'Boats glide under dazzling rainbow skyscraper neon lights at night!',
        descZh: '乘坐游船夜游黄浦江，两岸彩色灯光把江水染成了彩虹！',
        descFr: 'Les bateaux naviguent sous les néons étincelants des gratte-ciel !',
        tagColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        icon: '🥟',
        titleEn: 'Soup Dumplings (Xiaolongbao)',
        titleZh: '会爆汁的小笼包',
        titleFr: 'Raviolis vapeur au bouillon',
        descEn: 'Pinch carefully: bite a tiny hole, sip the delicious hot soup inside first!',
        descZh: '皮薄馅大，先咬一小口吸出鲜美浓郁的汤汁，再大口吃掉！',
        descFr: 'Piquez délicatement, buvez le bouillon chaud puis savourez !',
        tagColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    quiz: {
      questionEn: 'Why is Shanghai Tower designed with a twisting 120-degree curve as it rises?',
      questionZh: '高达632米的上海中心大厦为什么要扭曲盘旋上升？',
      questionFr: 'Pourquoi la tour de Shanghai vrille-t-elle à 120 degrés en montant ?',
      optionsEn: [
        'To look like a giant spiral ice cream cone',
        'To reduce the powerful wind load of coastal typhoons by 24%',
        'Because the builders accidentally twisted the blueprints',
        'To screw into the ground during earthquakes'
      ],
      optionsZh: [
        '为了看起来像冰淇淋蛋筒',
        '为了削减24%台风强风阻力，让大楼更安全',
        '工程师不小心把图纸画歪了',
        '地震时可以像螺丝一样旋进地底'
      ],
      optionsFr: [
        'Pour ressembler à une glace',
        'Pour réduire de 24 % la force des typhons côtiers',
        'Erreur sur les plans d\'architecte',
        'Pour se visser au sol en cas de séisme'
      ],
      correctIndex: 1,
      explanationEn: 'The spiral aerodynamic curve softens typhoon vortex winds, making the supertall tower steady and safe!',
      explanationZh: '独特的旋转外形能巧妙化解高空强风，减小24%的风阻，极具科技智慧！',
      explanationFr: 'La forme en spirale dissipe les turbulences des typhons et renforce la tour !'
    }
  },
  {
    id: 'guilin',
    nameEn: 'Guilin',
    nameZh: '桂林',
    nameFr: 'Guilin',
    provinceEn: 'Guangxi',
    provinceZh: '广西',
    provinceFr: 'Guangxi',
    region: 'south',
    icon: '⛰️',
    taglineEn: 'Top Scenery under Heaven & Li River',
    taglineZh: '山水甲天下 · 漓江竹筏与象鼻山',
    taglineFr: 'Paysages Karstiques & Rivière Li',
    landmarkEn: 'Elephant Trunk Hill & Li River',
    landmarkZh: '象鼻山与漓江竹筏',
    landmarkFr: 'Colline de la Trompe d\'Éléphant',
    famousQuoteEn: '“Guilin\'s scenery is the best under heaven.”',
    famousQuoteZh: '“桂林山水甲天下，阳朔堪称甲桂林。”',
    famousQuoteFr: '« Les monts et cours d\'eau de Guilin sont les plus beaux du monde. »',
    coordinates: { x: 4.8, y: 0.1, z: 2.2, lon: 110.3, lat: 25.3 },
    funFactEn: 'Elephant Trunk Hill looks just like a giant stone elephant drinking water with its trunk!',
    funFactZh: '象鼻山就像一只巨大的远古石象，把长长的鼻子伸进清凉江水里痛饮！',
    funFactFr: 'La colline ressemble à un éléphant plongeant sa trompe dans la rivière !',
    architecturalWonderEn: 'Fishermen float on slender bamboo rafts with diving cormorant birds!',
    architecturalWonderZh: '渔夫撑着竹筏，鱼鹰（鸬鹚）一个猛子扎进清澈水里帮渔夫捉鱼！',
    architecturalWonderFr: 'Les pêcheurs naviguent en radeaux de bambou avec des cormorans pêcheurs !',
    badgeTitleEn: 'Karst Dreamland Badge',
    badgeTitleZh: '桂林山水徽章',
    badgeTitleFr: 'Insigne Karstique de Guilin',
    accentColor: '#14b8a6',
    stampIcon: '⛰️',
    stampZh: '甲天下水·打卡',
    stampEn: 'GUILIN KARST',
    stampFr: 'GUILIN KARST',
    visualCards: [
      {
        icon: '🐘',
        titleEn: 'Stone Elephant Drinking',
        titleZh: '大象在江边喝水',
        titleFr: 'Éléphant buvant',
        descEn: 'A natural karst arch creates an elephant\'s trunk dipping straight into the Li River!',
        descZh: '天然石拱宛如象鼻吸水，象腿和象鼻之间正好形成“水月洞”！',
        descFr: 'L\'arche rocheuse forme une trompe plongeant dans l\'eau limpide !',
        tagColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        icon: '🦅',
        titleEn: 'Cormorant Fisher Bird',
        titleZh: '鱼鹰捕鱼小帮手',
        titleFr: 'Oiseau pêcheur cormoran',
        descEn: 'Trained cormorant birds dive underwater to catch fish and hop back on bamboo rafts!',
        descZh: '鸬鹚水性极好，潜入水底捉到鱼后飞回竹筏，是渔夫最棒的伙伴！',
        descFr: 'Les cormorans plongent chercher des poissons et remontent sur le radeau !',
        tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        icon: '🎋',
        titleEn: 'Bamboo Raft Drifting',
        titleZh: '轻舟荡漾在画中',
        titleFr: 'Radeau de bambou',
        descEn: 'Glide gently across mirror-clear waters while green sugarloaf peaks float past!',
        descZh: '乘坐竹筏顺流而下，两岸青翠奇峰倒映水中，人如在画中游！',
        descFr: 'Glissez sur une eau limpide qui reflète les pitons rocheux verdoyants !',
        tagColor: 'bg-cyan-100 text-cyan-800 border-cyan-300'
      }
    ],
    quiz: {
      questionEn: 'What animal does the famous mountain by the Li River in Guilin resemble?',
      questionZh: '桂林漓江边最著名的地标山峰像哪种可爱动物？',
      questionFr: 'À quel animal ressemble la montagne emblématique de Guilin ?',
      optionsEn: [
        'A giant elephant drinking water',
        'A sleeping dinosaur',
        'A soaring golden eagle',
        'A jumping kangaroo'
      ],
      optionsZh: [
        '一只把长鼻子伸进水里喝水的大象',
        '一只沉睡的剑龙',
        '一只展翅飞翔的雄鹰',
        '一只蹦跳的袋鼠'
      ],
      optionsFr: [
        'Un éléphant buvant de l\'eau',
        'Un dinosaure endormi',
        'Un aigle déployant ses ailes',
        'Un kangourou bondissant'
      ],
      correctIndex: 0,
      explanationEn: 'Elephant Trunk Hill (象鼻山) looks just like a giant elephant drinking peacefully from the river!',
      explanationZh: '象鼻山形态逼真，就像一头巨象在漓江边饮水，是桂林的城徽标志！',
      explanationFr: 'La colline de la Trompe d\'Éléphant semble boire paisiblement dans la rivière !'
    }
  },
  {
    id: 'suzhou',
    nameEn: 'Suzhou',
    nameZh: '苏州',
    nameFr: 'Suzhou',
    provinceEn: 'Jiangsu',
    provinceZh: '江苏',
    provinceFr: 'Jiangsu',
    region: 'east',
    icon: '🪷',
    taglineEn: 'Venice of the East & Classical Gardens',
    taglineZh: '东方水城 · 拙政园与水乡周庄',
    taglineFr: 'Venise de l\'Orient & Jardins Classiques',
    landmarkEn: 'Humble Administrator\'s Garden & Canals',
    landmarkZh: '拙政园与古水巷',
    landmarkFr: 'Jardin de l\'Humble Administrateur',
    famousQuoteEn: '“Every step reveals a new scenic painting inside the garden.”',
    famousQuoteZh: '“移步换景，不出城廓而获山林之趣。”',
    famousQuoteFr: '« À chaque pas dans le jardin, un nouveau tableau apparaît. »',
    coordinates: { x: 9.1, y: 0.1, z: 0.4, lon: 120.6, lat: 31.3 },
    funFactEn: 'Garden windows and moon gates are shaped like round moons, vases, and lotus petals!',
    funFactZh: '园林里的窗户和月亮门设计成花瓶、扇子、圆月形状，看出去就像画框！',
    funFactFr: 'Les portes en forme de lune et les fenêtres encadrent la nature comme des tableaux !',
    architecturalWonderEn: 'Waterways are the streets: ancient boats deliver vegetables right to back doors!',
    architecturalWonderZh: '水巷就是马路，古代乌篷船能直接划到老百姓家的后门台阶上！',
    architecturalWonderFr: 'Les canaux sont des rues : les barques accostent au pied des maisons !',
    badgeTitleEn: 'Master of Gardens Badge',
    badgeTitleZh: '江南园林徽章',
    badgeTitleFr: 'Insigne des Jardins de Suzhou',
    accentColor: '#0d9488',
    stampIcon: '🪷',
    stampZh: '水乡园林·打卡',
    stampEn: 'SUZHOU GARDEN',
    stampFr: 'SUZHOU JARDIN',
    visualCards: [
      {
        icon: '🚪',
        titleEn: 'Circular Moon Gates',
        titleZh: '圆圆的月亮门',
        titleFr: 'Porte de lune ronde',
        descEn: 'Step through circular stone doorways into secret courtyards of bamboo and koi ponds!',
        descZh: '跨过圆圆的汉白玉月亮门，眼前忽然出现满池荷花与翠绿竹林！',
        descFr: 'Passez la porte circulaire pour découvrir bambous et bassins de carpes koï !',
        tagColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        icon: '🐟',
        titleEn: 'Golden Koi Ponds',
        titleZh: '池塘里活泼的锦鲤',
        titleFr: 'Bassin de carpes koï',
        descEn: 'Hundreds of bright red and gold koi fish swim under curving zigzag bridges!',
        descZh: '在九曲回廊下扔一点面包屑，成群红黄锦鲤翻起水花抢着吃！',
        descFr: 'Des centaines de carpes rouges et or nagent sous les petits ponts courbés !',
        tagColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        icon: '🛶',
        titleEn: 'Water Town Gondolas',
        titleZh: '乌篷船穿过小石桥',
        titleFr: 'Barques sous les ponts',
        descEn: 'Boatmen sing folk songs with wooden oars under arch bridges built 800 years ago!',
        descZh: '摇着小木船从石拱桥下穿过，听船娘唱吴侬软语的水乡歌谣！',
        descFr: 'Des barques glissent sous des ponts de pierre voûtés vieux de 800 ans !',
        tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      }
    ],
    quiz: {
      questionEn: 'Why do classical Chinese gardens in Suzhou use circular "Moon Gates"?',
      questionZh: '苏州传统古典园林里为什么经常设计圆圆的“月亮门”？',
      questionFr: 'Pourquoi les jardins de Suzhou ont-ils des « portes de lune » rondes ?',
      optionsEn: [
        'To act as a picture frame turning the courtyard view into a living painting',
        'So giant bowling balls can roll through',
        'Because square doors were illegal',
        'To trap bouncing tigers'
      ],
      optionsZh: [
        '像天然画框一样，把门后的庭院假山框成一幅美丽的图画',
        '为了方便滚大保龄球',
        '古代不允许建方形门',
        '为了防止大老虎跑进来'
      ],
      optionsFr: [
        'Comme un cadre qui transforme le paysage en tableau vivant',
        'Pour faire rouler des boules géantes',
        'Les portes carrées étaient interdites',
        'Pour bloquer les tigres'
      ],
      correctIndex: 0,
      explanationEn: 'Moon gates create "borrowed scenery" (借景), framing garden trees, rocks, and ponds like an artwork!',
      explanationZh: '月亮门巧妙“借景”，走在门前看过去就像是一幅立体的中国山水画！',
      explanationFr: 'La porte circulaire encadre le paysage comme une peinture vivante !'
    }
  },
  {
    id: 'dunhuang',
    nameEn: 'Dunhuang',
    nameZh: '敦煌',
    nameFr: 'Dunhuang',
    provinceEn: 'Gansu',
    provinceZh: '甘肃',
    provinceFr: 'Gansu',
    region: 'northwest',
    icon: '🐪',
    taglineEn: 'Silk Road Treasure & Mogao Grottoes',
    taglineZh: '丝路明珠 · 莫高窟飞天与月牙泉',
    taglineFr: 'Trésor de la Soie & Grottes de Mogao',
    landmarkEn: 'Mogao Caves & Crescent Moon Lake',
    landmarkZh: '莫高窟壁画与月牙泉',
    landmarkFr: 'Grottes de Mogao & Lac du Croissant',
    famousQuoteEn: '“Golden dunes shelter an oasis that never dries up.”',
    famousQuoteZh: '“大漠孤烟直，敦煌飞天舞！”',
    famousQuoteFr: '« Les dunes dorées abritent une oasis éternelle. »',
    coordinates: { x: -0.6, y: 0.1, z: -4.8, lon: 94.7, lat: 40.1 },
    funFactEn: 'Crescent Moon Lake is surrounded by giant dunes, but the desert wind never buries it!',
    funFactZh: '月牙泉四周全是滚滚大沙山，可千百年来狂风从来没有把泉水埋掉！',
    funFactFr: 'Le lac du Croissant est au milieu des dunes mais n\'a jamais été enseveli !',
    architecturalWonderEn: 'Mogao Caves hold 45,000 square meters of colorful flying angels and dragon murals!',
    architecturalWonderZh: '莫高窟悬崖上开凿了700多座洞窟，画满了身披彩带轻盈起舞的飞天仙子！',
    architecturalWonderFr: 'Les grottes abritent 45 000 m² de fresques d\'anges volants aux rubans de soie !',
    badgeTitleEn: 'Desert Silk Badge',
    badgeTitleZh: '敦煌飞天徽章',
    badgeTitleFr: 'Insigne de Dunhuang',
    accentColor: '#eab308',
    stampIcon: '🐪',
    stampZh: '丝路飞天·打卡',
    stampEn: 'DUNHUANG OASIS',
    stampFr: 'DUNHUANG OASIS',
    visualCards: [
      {
        icon: '🌙',
        titleEn: 'Miracle Crescent Oasis',
        titleZh: '大漠中的神奇月牙泉',
        titleFr: 'Oasis du Croissant',
        descEn: 'A sparkling blue spring shaped like a crescent moon that has stayed alive for thousands of years!',
        descZh: '像一弯月亮落在黄沙之间，碧波荡漾，几千年来从不干涸！',
        descFr: 'Une source bleue en forme de croissant au milieu du désert !',
        tagColor: 'bg-yellow-100 text-yellow-800 border-yellow-300'
      },
      {
        icon: '🧕',
        titleEn: 'Flying Apsaras Murals',
        titleZh: '长袖起舞的敦煌飞天',
        titleFr: 'Fresques des Apsaras',
        descEn: 'Fairies with fluttering silk ribbons floating without wings through rainbow clouds!',
        descZh: '洞窟石壁上仙女们身披七彩长绸，不长翅膀就能在白云间轻快飞舞！',
        descFr: 'Des fées flottent sans ailes avec de longs rubans de soie colorés !',
        tagColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        icon: '🐪',
        titleEn: 'Singing Sand Dunes',
        titleZh: '会唱歌的鸣沙山',
        titleFr: 'Dunes chantantes',
        descEn: 'When wind blows or you slide down the dunes, the golden sand makes booming music!',
        descZh: '狂风吹过或者顺着沙坡滑滑梯时，沙子会发出嗡嗡像管弦乐的声响！',
        descFr: 'Le sable doré émet des sons harmonieux quand le vent souffle dessus !',
        tagColor: 'bg-orange-100 text-orange-800 border-orange-300'
      }
    ],
    quiz: {
      questionEn: 'How do the famous "Flying Apsaras" (飞天) in Dunhuang Mogao Cave murals fly?',
      questionZh: '敦煌莫高窟壁画里的“飞天”仙女是用什么方式在天空中飞行的？',
      questionFr: 'Comment volent les fées « Apsaras » dans les fresques de Dunhuang ?',
      optionsEn: [
        'They flap giant feathered bird wings',
        'They float lightly in the breeze with long colorful silk ribbons, without wings',
        'They ride on rocket brooms',
        'They have jetpacks strapped on'
      ],
      optionsZh: [
        '扇动巨大的鸟羽翅膀',
        '不长翅膀，凭借身上优美的飞扬七彩彩带在云端漂浮',
        '骑在喷火扫帚上',
        '背着火箭喷气背包'
      ],
      optionsFr: [
        'Elles battent de grandes ailes d\'oiseau',
        'Elles flottent au vent grâce à de longs rubans de soie, sans ailes',
        'Elles chevauchent des balais fusées',
        'Elles ont des réacteurs dorsaux'
      ],
      correctIndex: 1,
      explanationEn: 'Dunhuang Flying Apsaras don\'t need wings — they fly weightlessly with flowing silk ribbons and clouds!',
      explanationZh: '中国传统飞天不需要翅膀和羽毛，靠轻盈漫卷的绫罗彩带就能御风飞舞！',
      explanationFr: 'Les fées volent gracieusement au milieu des nuages grâce à leurs rubans de soie ondoyants !'
    }
  },
  {
    id: 'lhasa',
    nameEn: 'Lhasa',
    nameZh: '拉萨',
    nameFr: 'Lhassa',
    provinceEn: 'Tibet',
    provinceZh: '西藏',
    provinceFr: 'Tibet',
    region: 'southwest',
    icon: '🏔️',
    taglineEn: 'City of Sunshine & Potala Palace',
    taglineZh: '日光之城 · 布达拉宫与雪域高原',
    taglineFr: 'Cité du Soleil & Palais du Potala',
    landmarkEn: 'Potala Palace & Barkhor Street',
    landmarkZh: '布达拉宫与八廓街',
    landmarkFr: 'Palais du Potala & Barkhor',
    famousQuoteEn: '“Sitting closer to the blue sky than anywhere else on Earth.”',
    famousQuoteZh: '“红白宫殿耸立雪山之巅，离蓝天最近的圣城。”',
    famousQuoteFr: '« Plus proche du ciel bleu que nulle part ailleurs. »',
    coordinates: { x: -3.8, y: 0.1, z: 0.8, lon: 91.1, lat: 29.6 },
    funFactEn: 'Lhasa gets over 3,000 hours of bright warm sunshine every year!',
    funFactZh: '拉萨一年有超过3000小时灿烂阳光，被称为“日光之城”！',
    funFactFr: 'Lhassa compte plus de 3 000 heures de soleil par an !',
    architecturalWonderEn: 'The Potala Palace has 13 stories, over 1,000 rooms, built on a mountain 3,700 meters above sea level!',
    architecturalWonderZh: '布达拉宫依山而建13层，有1000多间房间，坐落在海拔3700米红山之上！',
    architecturalWonderFr: 'Le palais a 13 étages et plus de 1 000 pièces perché à 3 700 m !',
    badgeTitleEn: 'Plateau Guardian Badge',
    badgeTitleZh: '雪域高原徽章',
    badgeTitleFr: 'Insigne des Sommets du Tibet',
    accentColor: '#b91c1c',
    stampIcon: '🏔️',
    stampZh: '日光圣城·打卡',
    stampEn: 'LHASA POTALA',
    stampFr: 'LHASSA POTALA',
    visualCards: [
      {
        icon: '🏰',
        titleEn: 'Castle on the Mountain',
        titleZh: '红白相间的云端城堡',
        titleFr: 'Château dans les nuages',
        descEn: 'The Red Palace and White Palace blend right into the rocky cliffs under bright blue skies!',
        descZh: '红宫与白宫交相辉映，耸立在悬崖之上，仿佛伸手就能碰到白云！',
        descFr: 'Le palais rouge et blanc s\'élève sur la falaise, touchant presque les nuages !',
        tagColor: 'bg-red-100 text-red-800 border-red-300'
      },
      {
        icon: '🚩',
        titleEn: 'Rainbow Prayer Flags',
        titleZh: '五彩斑斓的风马旗',
        titleFr: 'Drapeaux de prières colorés',
        descEn: 'Blue, white, red, green, and yellow flags flutter in the high mountain wind carrying good wishes!',
        descZh: '蓝白红绿黄五色经幡挂满山口，风吹拂一次，就像为所有人送出一份吉祥祝福！',
        descFr: 'Cinq couleurs claquent au vent des sommets pour apporter bonheur et paix !',
        tagColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        icon: '🦬',
        titleEn: 'Fluffy High Plateau Yaks',
        titleZh: '毛茸茸的可爱高原牦牛',
        titleFr: 'Yaks à longue fourrure',
        descEn: 'Yaks have super thick wool coats to stay cozy and warm through snowy blizzard winters!',
        descZh: '长满厚厚长毛的高原大耗牛不怕风雪，还能产出香喷喷的牦牛奶酥油！',
        descFr: 'Les yaks ont une fourrure ultra épaisse pour affronter la neige des montagnes !',
        tagColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    quiz: {
      questionEn: 'Why are the outer walls of the Potala Palace colored in white and deep crimson red?',
      questionZh: '布达拉宫巍峨的外墙为什么要分成纯白和深红两种颜色？',
      questionFr: 'Pourquoi les murs du Potala sont-ils blancs et rouge cramoisi ?',
      optionsEn: [
        'They are painted white for peace and red for spiritual wisdom',
        'They ran out of red paint halfway through building',
        'To match strawberry and vanilla ice cream',
        'To scare away flying dragons'
      ],
      optionsZh: [
        '白宫代表纯洁和平，红宫代表佛法庄严与智慧',
        '油漆工建到一半红色油漆用完了',
        '为了看起来像草莓香草冰淇淋',
        '为了把飞天恶龙吓跑'
      ],
      optionsFr: [
        'Le blanc pour la paix et le rouge pour la sagesse spirituelle',
        'Manque de peinture rouge pendant la construction',
        'Pour imiter la glace vanille-fraise',
        'Pour effrayer les dragons'
      ],
      correctIndex: 0,
      explanationEn: 'The White Palace represents peace and daily administration, while the Red Palace enshrines sacred chapels and wisdom!',
      explanationZh: '白宫恬静庄重，红宫神圣肃穆，两座色彩交织出雪域高原独一无二的壮丽！',
      explanationFr: 'Le Palais Blanc symbolise la sérénité et le Palais Rouge incarne la spiritualité !'
    }
  },
  {
    id: 'huangshan',
    nameEn: 'Mount Huangshan',
    nameZh: '黄山',
    nameFr: 'Huangshan',
    provinceEn: 'Anhui',
    provinceZh: '安徽',
    provinceFr: 'Anhui',
    region: 'east',
    icon: '🌲',
    taglineEn: 'The Yellow Mountain & Welcoming Pine',
    taglineZh: '天下第一奇山 · 迎客松与云海',
    taglineFr: 'Montagne Jaune & Pin de Bienvenue',
    landmarkEn: 'Welcoming Pine & Sea of Clouds',
    landmarkZh: '千年迎客松与梦幻云海',
    landmarkFr: 'Pin Accueillant & Mer de Nuages',
    famousQuoteEn: '“No other mountains need to be seen after visiting Huangshan!”',
    famousQuoteZh: '“五岳归来不看山，黄山归来不看岳！”',
    famousQuoteFr: '« Après Huangshan, nul besoin de gravir une autre montagne ! »',
    coordinates: { x: 7.8, y: 0.1, z: 0.8, lon: 118.3, lat: 30.1 },
    funFactEn: 'The iconic Welcoming Pine has one long branch outstretched like a friendly hand saying "Welcome!"',
    funFactZh: '千年迎客松有一根巨大树枝伸向前方，就像热情的主人伸出双手欢迎小朋友！',
    funFactFr: 'Le Pin de Bienvenue tend une grande branche comme une main amicale tendue !',
    architecturalWonderEn: 'Fluffy white clouds roll through deep granite peaks just like an ocean with waves!',
    architecturalWonderZh: '洁白的云雾在千座花岗岩山峰间奔腾翻滚，如同浩瀚起伏的白色大海！',
    architecturalWonderFr: 'Les nuages moutonnent entre les pics de granit comme des vagues d\'océan !',
    badgeTitleEn: 'Cloud Mountain Badge',
    badgeTitleZh: '黄山云海徽章',
    badgeTitleFr: 'Insigne de la Mer de Nuages',
    accentColor: '#15803d',
    stampIcon: '🌲',
    stampZh: '黄山迎客·打卡',
    stampEn: 'HUANGSHAN PINE',
    stampFr: 'HUANGSHAN PIN',
    visualCards: [
      {
        icon: '🌲',
        titleEn: 'The Welcoming Pine',
        titleZh: '热情招手的迎客松',
        titleFr: 'Le Pin de Bienvenue',
        descEn: 'Growing out of bare granite rock for 1,300 years, waving hello to visitors!',
        descZh: '在坚硬的花岗岩石缝里扎根生长了1300年，像老爷爷伸出臂弯欢迎你！',
        descFr: 'Enraciné dans la roche de granit depuis 1 300 ans pour accueillir les marcheurs !',
        tagColor: 'bg-green-100 text-green-800 border-green-300'
      },
      {
        icon: '☁️',
        titleEn: 'Dreamy Sea of Clouds',
        titleZh: '山顶滚滚的白色云海',
        titleFr: 'Mer de nuages féerique',
        descEn: 'Peaks poke through cotton clouds like magical green islands floating in mid-air!',
        descZh: '清晨云海翻滚，奇峰怪石从云层中探出头，宛如漂浮在天上的神秘仙岛！',
        descFr: 'Les sommets émergent des nuages blancs comme des îles flottantes !',
        tagColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        icon: '🐒',
        titleEn: 'Funny Shaped Rocks',
        titleZh: '形态各异的百变怪石',
        titleFr: 'Roches aux formes drôles',
        descEn: 'Granite boulders shaped like "Monkey Gazing at Sea" and "Flying Stone"!',
        descZh: '“猴子观海”、“飞来石”，大自然把坚硬石头变成了超级有趣的雕塑！',
        descFr: 'Des rochers sculptés par la nature en singe pensif ou pierre volante !',
        tagColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    quiz: {
      questionEn: 'How does the 1,300-year-old Welcoming Pine (迎客松) survive on Mount Huangshan?',
      questionZh: '黄山这棵1300多岁的高龄“迎客松”，生长在什么神奇的地方？',
      questionFr: 'Où le Pin de Bienvenue vieux de 1 300 ans pousse-t-il sur Huangshan ?',
      optionsEn: [
        'Rooted firmly inside cracks of bare solid granite rock cliffs',
        'Planted in a giant indoor greenhouse',
        'Floating in a freshwater aquarium',
        'Made out of green plastic Lego bricks'
      ],
      optionsZh: [
        '顽强扎根在悬崖峭壁坚硬的花岗岩石缝里',
        '种在温室大花盆里',
        '漂浮在水族箱里',
        '是用绿色乐高塑料积木拼成的'
      ],
      optionsFr: [
        'Enraciné dans les fissures du granit à flanc de falaise',
        'Dans un pot sous serre chauffée',
        'Flottant dans un aquarium',
        'Construit en briques de Lego'
      ],
      correctIndex: 0,
      explanationEn: 'Its roots secrete natural acid to split granite rock and anchor firmly against raging mountain storms!',
      explanationZh: '迎客松分泌有机酸溶解岩石，树根深扎千仞绝壁，历经千年风雪依然郁郁葱葱！',
      explanationFr: 'Ses racines s\'ancrent solidement dans la roche brute pour défier les tempêtes !'
    }
  },
  {
    id: 'guangzhou',
    nameEn: 'Guangzhou',
    nameZh: '广州',
    nameFr: 'Canton (Guangzhou)',
    provinceEn: 'Guangdong',
    provinceZh: '广东',
    provinceFr: 'Guangdong',
    region: 'south',
    icon: '🥟',
    taglineEn: 'City of Flowers & Dim Sum Capital',
    taglineZh: '千年花城 · 小蛮腰广州塔与广式早茶',
    taglineFr: 'Cité des Fleurs & Capitale du Dim Sum',
    landmarkEn: 'Canton Tower & Pearl River Night',
    landmarkZh: '广州塔（小蛮腰）与珠江',
    landmarkFr: 'Tour de Canton & Rivière des Perles',
    famousQuoteEn: '“Food is in Guangzhou: delicious dim sum steamed fresh!”',
    famousQuoteZh: '“食在广州，饮早茶叹人生！”',
    famousQuoteFr: '« Les délices se savourent à Canton dès le matin ! »',
    coordinates: { x: 6.2, y: 0.1, z: 2.8, lon: 113.3, lat: 23.1 },
    funFactEn: 'Canton Tower twists like a slender dancing waist with rainbow LED light shows every night!',
    funFactZh: '广州塔中间细细的像跳舞少女纤细的腰，大家亲切叫它“小蛮腰”！',
    funFactFr: 'La tour de Canton s\'effile au centre comme une taille de danseuse !',
    architecturalWonderEn: 'A high-altitude bubble ferris wheel spins 450 meters up on the open roof of the tower!',
    architecturalWonderZh: '塔顶450米高空有一个横向摩天轮，坐在透明球舱里俯瞰整个花城！',
    architecturalWonderFr: 'Une grande roue panoramique tourne au sommet de la tour à 450 m de haut !',
    badgeTitleEn: 'Flower City Explorer Badge',
    badgeTitleZh: '南国花城徽章',
    badgeTitleFr: 'Insigne de la Cité des Fleurs',
    accentColor: '#f43f5e',
    stampIcon: '🥟',
    stampZh: '岭南早茶·打卡',
    stampEn: 'GUANGZHOU TOWER',
    stampFr: 'CANTON TOUR',
    visualCards: [
      {
        icon: '🗼',
        titleEn: 'Slender "Slim Waist" Tower',
        titleZh: '会跳舞的“小蛮腰”',
        titleFr: 'Tour « Taille Fine »',
        descEn: '600 meters tall with a twisted middle, glowing in flashing rainbow colors!',
        descZh: '高耸入云600米，中间最细处只有22米，晚上亮起梦幻彩虹灯！',
        descFr: '600 m de haut avec une taille cintrée illuminée de néons multicolores !',
        tagColor: 'bg-rose-100 text-rose-800 border-rose-300'
      },
      {
        icon: '🥟',
        titleEn: 'Steaming Dim Sum Baskets',
        titleZh: '热腾腾的竹蒸笼早茶',
        titleFr: 'Paniers de Dim Sum vapeur',
        descEn: 'Crystal shrimp dumplings (har gow) and BBQ pork buns straight from the steamer!',
        descZh: '晶莹剔透的水晶虾饺、松软香甜的叉烧包，一口一个停不下来！',
        descFr: 'Raviolis translucides aux crevettes et brioches chaudes au porc fondant !',
        tagColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        icon: '🌺',
        titleEn: 'Year-Round Flower City',
        titleZh: '一年四季常开的鲜花',
        titleFr: 'Fleurs toute l\'année',
        descEn: 'Warm tropical breezes keep bright red kapok flowers blooming even in winter!',
        descZh: '气候温暖湿润，冬天下雪北方结冰时，广州街道上依然繁花似锦！',
        descFr: 'Le climat doux fait éclore d\'immenses fleurs de cotonnier même en hiver !',
        tagColor: 'bg-pink-100 text-pink-800 border-pink-300'
      }
    ],
    quiz: {
      questionEn: 'Why do local kids and families in Guangzhou affectionately call the 600m Canton Tower "Xiao Man Yao" (小蛮腰)?',
      questionZh: '广州小朋友和市民为什么亲切地把600米高的广州塔叫做“小蛮腰”？',
      questionFr: 'Pourquoi la tour de Canton est-elle surnommée « Petite Taille Fine » ?',
      optionsEn: [
        'Because the middle part of the tower twists and pinches inward like a dancer\'s waist',
        'Because it was built by a famous wrestler named Xiao Man',
        'Because it is only 1 meter wide',
        'Because it plays belly dance music'
      ],
      optionsZh: [
        '塔身中部收紧扭转，优美纤细就像跳舞少女的小细腰',
        '由一位叫小蛮的武术家建造',
        '整座塔只有一米宽',
        '塔顶一直在播放肚皮舞音乐'
      ],
      optionsFr: [
        'Le milieu de la tour est cintré comme la taille d\'une danseuse',
        'Construite par un athlète nommé Xiao Man',
        'La tour ne fait qu\'un mètre de large',
        'Elle diffuse de la musique de danse'
      ],
      correctIndex: 0,
      explanationEn: 'The unique hyperboloid twisting lattice structure pinches narrow at the waist, creating an elegant silhouette!',
      explanationZh: '双曲面钢网结构在塔身腰部收窄，造型优美轻盈，被形象地称作“小蛮腰”！',
      explanationFr: 'La structure s\'amincit au centre, lui donnant une silhouette élancée et élégante !'
    }
  },
  {
    id: 'nanjing',
    nameEn: 'Nanjing',
    nameZh: '南京',
    nameFr: 'Nankin (Nanjing)',
    provinceEn: 'Jiangsu',
    provinceZh: '江苏',
    provinceFr: 'Jiangsu',
    region: 'east',
    icon: '🏮',
    taglineEn: 'Six Dynasties Ancient Capital & Ming City Wall',
    taglineZh: '六朝古都 · 明城墙与十里秦淮河',
    taglineFr: 'Capitale des 6 Dynasties & Remparts Ming',
    landmarkEn: 'Ming Dynasty Wall & Qinhuai River',
    landmarkZh: '明代石城墙与秦淮河夫子庙',
    landmarkFr: 'Remparts Ming & Rivière Qinhuai',
    famousQuoteEn: '“Red lanterns line the waters of the historic Qinhuai River.”',
    famousQuoteZh: '“十里秦淮生春梦，六朝金粉画中游。”',
    famousQuoteFr: '« Les lanternes rouges scintillent le long de la rivière Qinhuai. »',
    coordinates: { x: 8.5, y: 0.1, z: 0.2, lon: 118.8, lat: 32.0 },
    funFactEn: 'Every single brick of the Ming city wall was stamped with the name of the brickmaker 600 years ago!',
    funFactZh: '600年前烧制明城墙的每块城砖上，都刻着制砖工匠的名字！',
    funFactFr: 'Chaque brique des remparts porte le nom gravé de l\'artisan qui l\'a fabriquée !',
    architecturalWonderEn: 'The city wall stretched over 35 kilometers, making it the longest stone city wall in world history!',
    architecturalWonderZh: '明代城墙全长超过35公里，是世界上最长的一座古砖石城墙！',
    architecturalWonderFr: 'Longue de 35 km, c\'était la plus longue enceinte fortifiée urbaine au monde !',
    badgeTitleEn: 'Ancient Capital Gate Badge',
    badgeTitleZh: '六朝古都徽章',
    badgeTitleFr: 'Insigne de la Capitale Antique',
    accentColor: '#c026d3',
    stampIcon: '🏮',
    stampZh: '金陵秦淮·打卡',
    stampEn: 'NANJING WALL',
    stampFr: 'NANKIN MURAILLE',
    visualCards: [
      {
        icon: '🧱',
        titleEn: 'Bricks with Maker Names',
        titleZh: '刻着名字的600年古砖',
        titleFr: 'Briques avec signatures',
        descEn: '600 years ago, brickmakers carved their hometown and name onto each brick to guarantee top quality!',
        descZh: '每块城砖上都刻着造砖人的家乡和名字，如果质量不过关就要重新制作！',
        descFr: 'Chaque brique est gravée du nom de l\'ouvrier garantissant sa solidité !',
        tagColor: 'bg-purple-100 text-purple-800 border-purple-300'
      },
      {
        icon: '🏮',
        titleEn: 'Qinhuai River Lanterns',
        titleZh: '十里秦淮河红灯笼',
        titleFr: 'Lanternes de la rivière Qinhuai',
        descEn: 'Painted dragon boats glide down the water flanked by thousands of glowing paper lanterns!',
        descZh: '夜晚雕花龙船划过水面，岸边成千上万只红色纸灯笼把河道照得如梦如幻！',
        descFr: 'Des bateaux-dragons naviguent sous les reflets de milliers de lanternes rouges !',
        tagColor: 'bg-rose-100 text-rose-800 border-rose-300'
      },
      {
        icon: '🦆',
        titleEn: 'Famous Nanjing Duck',
        titleZh: '香香脆脆的金陵盐水鸭',
        titleFr: 'Canard salé réputé',
        descEn: 'Nanjing eats more delicious crispy salted duck than anywhere else on the planet!',
        descZh: '皮白肉嫩、香气扑鼻的盐水鸭和烤鸭，是南京小朋友餐桌上的最爱！',
        descFr: 'Le canard salé à la peau croustillante est le plat le plus adoré de la ville !',
        tagColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    quiz: {
      questionEn: 'Why did ancient Chinese artisans 600 years ago stamp their names on each brick of Nanjing\'s Ming Wall?',
      questionZh: '600年前建造南京明城墙时，工匠为什么要把自己的名字刻在每块砖头上？',
      questionFr: 'Pourquoi les artisans gravaient-ils leur nom sur chaque brique des remparts ?',
      optionsEn: [
        'To guarantee strict quality control — if a brick cracked, they knew who made it!',
        'Because they wanted free autographs',
        'To play a giant spelling game',
        'As secret treasure hunt codes'
      ],
      optionsZh: [
        '实行严格的质量责任制，谁造的砖如果破裂就要被问责',
        '为了给路人签名留念',
        '为了玩拼字游戏',
        '当做寻找黄金宝藏的暗号'
      ],
      optionsFr: [
        'Contrôle qualité strict : si une brique casse, le coupable est connu',
        'Pour donner des autographes',
        'Pour jouer à un jeu de lettres',
        'Codes secrets pour trouver un trésor'
      ],
      correctIndex: 0,
      explanationEn: 'This early quality-control system ensured the wall was so strong that large sections survive intact today!',
      explanationZh: '“物勒工名”，严格的工匠实名制保证了每一块砖都坚如钢铁，历经600年风雨依旧耸立！',
      explanationFr: 'Cette traçabilité garantissait une solidité extrême qui traverse les siècles !'
    }
  }
];

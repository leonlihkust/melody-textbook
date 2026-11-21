export type CanadaRegionId =
  | 'shield'
  | 'hudson'
  | 'arctic'
  | 'plains'
  | 'cordillera'
  | 'stlawrence'
  | 'appalachian';

export interface TrilingualText {
  en: string;
  fr: string;
  zh: string;
}

export interface CanadaLandformRegion {
  id: CanadaRegionId;
  badgeId: string;
  slideNumber: number;
  inOntario: boolean; // Grade 3 studies the 3 Ontario regions
  icon: string;
  color: string; // Signature crayon fill color on map
  lightBg: string;
  borderColor: string;
  name: TrilingualText;
  shortName: TrilingualText;
  tagline: TrilingualText;
  // Core Quiz Topics (directly matching teacher email + slides)
  relief: {
    icon: string;
    keywords: TrilingualText[];
    summary: TrilingualText;
  };
  climate: {
    icon: string;
    keywords: TrilingualText[];
    summary: TrilingualText;
  };
  vegetation: {
    icon: string;
    keywords: TrilingualText[];
    summary: TrilingualText;
  };
  jobs: {
    icon: string;
    list: Array<{
      icon: string;
      label: TrilingualText;
    }>;
  };
  // Bonus Topics (straight from teacher's French slide deck)
  population: TrilingualText;
  location: TrilingualText;
  soilAgriculture: {
    icon: string;
    level: 'high' | 'medium' | 'low' | 'none';
    summary: TrilingualText;
  };
  bonusFact: TrilingualText;
  badgeTitle: TrilingualText;
}

export const CANADA_LANDFORM_REGIONS: CanadaLandformRegion[] = [
  {
    id: 'shield',
    badgeId: 'ca_shield',
    slideNumber: 1,
    inOntario: true,
    icon: '🪨',
    color: '#f59e0b', // Warm amber/ochre rock
    lightBg: 'bg-amber-50',
    borderColor: 'border-amber-400',
    name: {
      en: 'The Canadian Shield',
      fr: 'Le Bouclier Canadien',
      zh: '加拿大地盾',
    },
    shortName: {
      en: 'Canadian Shield',
      fr: 'Bouclier Canadien',
      zh: '加拿大地盾',
    },
    tagline: {
      en: 'Ancient rocky hills, thousands of lakes & forests',
      fr: 'Rochers anciens, milliers de lacs et forêts',
      zh: '古老岩石丘陵、成千上万湖泊与森林',
    },
    relief: {
      icon: '🪨',
      keywords: [
        { en: 'Ancient rocks', fr: 'Rochers anciens', zh: '古老岩石' },
        { en: 'Rounded hills', fr: 'Collines arrondies', zh: '圆润低矮丘陵' },
        { en: 'Thousands of lakes', fr: 'Milliers de lacs', zh: '无数冰川湖泊' },
      ],
      summary: {
        en: 'Rocky ground with rounded hills and thousands of sparkling lakes and rivers.',
        fr: 'Terrain rocheux avec des collines arrondies et des milliers de lacs et de rivières.',
        zh: '地面遍布古老坚硬的岩石、圆润的丘陵以及成千上万个清澈湖泊。',
      },
    },
    climate: {
      icon: '❄️',
      keywords: [
        { en: 'Long, cold winters', fr: 'Hivers longs et froids', zh: '漫长寒冷的冬季' },
        { en: 'Short, warm summers', fr: 'Étés courts et chauds', zh: '短暂温暖的夏季' },
        { en: 'Lots of snow', fr: 'Beaucoup de neige', zh: '降雪丰富' },
      ],
      summary: {
        en: 'Long, cold snowy winters and short, warm summers (colder in the north).',
        fr: 'Hivers longs, froids et neigeux ; étés courts et chauds (plus froid au nord).',
        zh: '冬季漫长寒冷且多雪，夏季短暂而温暖，越往北越冷。',
      },
    },
    vegetation: {
      icon: '🌲',
      keywords: [
        { en: 'Boreal forest', fr: 'Forêt boréale', zh: '北方针叶林' },
        { en: 'Pine & spruce trees', fr: 'Conifères (pins, épinettes)', zh: '松树与云杉' },
        { en: 'Moss & berries', fr: 'Mousses et petits fruits', zh: '苔藓与野果' },
      ],
      summary: {
        en: 'Huge boreal forests filled with evergreen conifers (pine, spruce) and birch trees.',
        fr: 'Grande forêt boréale remplie de conifères (pins, épinettes) et de bouleaux.',
        zh: '大片北方针叶林，长满常绿的松树、云杉和桦树。',
      },
    },
    jobs: {
      icon: '⛏️',
      list: [
        {
          icon: '⛏️',
          label: { en: 'Mining (Mines)', fr: 'Mines', zh: '采矿业（金、镍、铜）' },
        },
        {
          icon: '🩺',
          label: {
            en: 'Services (doctor, police, firefighter)',
            fr: 'Services (médecin, policier, pompier)',
            zh: '公共服务（医生、警察、消防员）',
          },
        },
      ],
    },
    population: {
      en: 'About 2 million (2,000,000)',
      fr: 'Environ 2 millions (2 000 000)',
      zh: '约 200 万 (2,000,000)',
    },
    location: {
      en: 'Northern Ontario (plus much of Quebec, Manitoba, Saskatchewan & NWT)',
      fr: "Nord de l'Ontario (et une grande partie du Québec et du Manitoba)",
      zh: '安大略省北部（以及魁北克、曼尼托巴等大片区域）',
    },
    soilAgriculture: {
      icon: '🌱',
      level: 'low',
      summary: {
        en: 'Not much agriculture (thin, rocky soil).',
        fr: "Pas beaucoup d'agriculture (sol mince et rocheux).",
        zh: '农业很少（土壤稀薄且岩石太多）。',
      },
    },
    bonusFact: {
      en: 'It is the LARGEST landform region in Canada—shaped like a giant horseshoe around Hudson Bay!',
      fr: "C'est la PLUS GRANDE région physique du Canada, en forme de fer à cheval autour de la baie d'Hudson !",
      zh: '它是加拿大面积最大的地貌区，像一块巨大的马蹄铁环绕在哈德逊湾周围！',
    },
    badgeTitle: {
      en: 'Shield Rock Explorer',
      fr: 'Explorateur du Bouclier',
      zh: '地盾岩石探索家',
    },
  },
  {
    id: 'hudson',
    badgeId: 'ca_hudson',
    slideNumber: 2,
    inOntario: true,
    icon: '🦆',
    color: '#14b8a6', // Wetland teal
    lightBg: 'bg-teal-50',
    borderColor: 'border-teal-400',
    name: {
      en: 'Hudson Bay Lowlands',
      fr: "La basse-terre de la baie d'Hudson",
      zh: '哈德逊湾低地',
    },
    shortName: {
      en: 'Hudson Bay Lowlands',
      fr: "Baie d'Hudson",
      zh: '哈德逊湾低地',
    },
    tagline: {
      en: 'Flat, soggy wetlands & marshes along the icy bay',
      fr: 'Terres plates, marécages et tourbières au bord de la baie',
      zh: '地势低平、沼泽湿地密布的海湾低地',
    },
    relief: {
      icon: '💧',
      keywords: [
        { en: 'Very flat & low', fr: 'Très plat et bas', zh: '非常平坦低洼' },
        { en: 'Wetlands & swamps', fr: 'Marécages et tourbières', zh: '湿地与泥炭沼泽' },
        { en: 'Winding rivers', fr: 'Rivières sinueuses', zh: '蜿蜒河流' },
      ],
      summary: {
        en: 'Very flat, low-lying land covered in wetlands, bogs, and slow-moving rivers.',
        fr: 'Terres très plates et basses couvertes de marécages, de tourbières et de rivières.',
        zh: '地势极为低洼平坦，遍布湿地、沼泽和缓慢流淌的河流。',
      },
    },
    climate: {
      icon: '🌬️',
      keywords: [
        { en: 'Very cold winters', fr: 'Hivers très froids', zh: '严寒冬季' },
        { en: 'Cool, short summers', fr: 'Étés courts et frais', zh: '凉爽短暂夏季' },
        { en: 'Icy bay winds', fr: 'Vents froids de la baie', zh: '冰冷海风' },
      ],
      summary: {
        en: 'Very cold, long winters with icy winds from Hudson Bay, and short cool foggy summers.',
        fr: "Hivers très longs et froids avec des vents glacés ; étés courts, frais et brumeux.",
        zh: '冬季漫长酷寒、海风刺骨，夏季短暂凉爽且多雾。',
      },
    },
    vegetation: {
      icon: '🌿',
      keywords: [
        { en: 'Mosses & bushes', fr: 'Mousses et arbustes', zh: '苔藓与矮灌木' },
        { en: 'Small spruce trees', fr: 'Petites épinettes', zh: '矮小云杉树' },
        { en: 'Marsh grasses', fr: 'Herbes de marais', zh: '沼泽水草' },
      ],
      summary: {
        en: 'Wetland mosses, marsh grasses, low shrubs, and small stunted evergreen trees.',
        fr: 'Mousses, herbes de marais, arbustes bas et petites épinettes adaptées au froid.',
        zh: '长满沼泽苔藓、水草、低矮灌木丛以及耐寒的小云杉树。',
      },
    },
    jobs: {
      icon: '🎣',
      list: [
        {
          icon: '🩺',
          label: {
            en: 'Services (doctor, police, firefighter)',
            fr: 'Services (médecin, policier, pompier)',
            zh: '公共服务（医生、警察、消防员）',
          },
        },
        {
          icon: '🎣',
          label: { en: 'Fishing (Pêcheur)', fr: 'Pêcheur', zh: '渔夫 / 捕鱼业' },
        },
        {
          icon: '⛏️',
          label: { en: 'Mining (Mines)', fr: 'Mines', zh: '采矿业' },
        },
      ],
    },
    population: {
      en: 'About 10 thousand (10,000)',
      fr: 'Environ 10 mille (10 000)',
      zh: '约 1 万 (10,000)',
    },
    location: {
      en: 'Ontario, Manitoba, and Quebec',
      fr: 'Ontario, Manitoba et Québec',
      zh: '安大略省、曼尼托巴省和魁北克省',
    },
    soilAgriculture: {
      icon: '💧',
      level: 'low',
      summary: {
        en: 'Not much agriculture (ground is too soggy and cold).',
        fr: "Pas beaucoup d'agriculture (sol trop humide et froid).",
        zh: '农业很少（地面过于潮湿泥泞且寒冷）。',
      },
    },
    bonusFact: {
      en: 'Few roads reach here—many communities travel by small plane, boat, or winter ice roads! Polar bears visit the coast!',
      fr: "Peu de routes y mènent : on voyage en avion ou en bateau ! Les ours polaires visitent la côte !",
      zh: '这里几乎没有公路，居民多乘小飞机或冰路出行，海边还能看到北极熊！',
    },
    badgeTitle: {
      en: 'Wetland Bay Ranger',
      fr: 'Gardien de la Baie',
      zh: '湿地海湾护林员',
    },
  },
  {
    id: 'arctic',
    badgeId: 'ca_arctic',
    slideNumber: 3,
    inOntario: false,
    icon: '🐻‍❄️',
    color: '#38bdf8', // Arctic ice blue
    lightBg: 'bg-sky-50',
    borderColor: 'border-sky-400',
    name: {
      en: 'The Arctic Region',
      fr: "L'Arctique",
      zh: '北极地区',
    },
    shortName: {
      en: 'The Arctic',
      fr: "L'Arctique",
      zh: '北极地区',
    },
    tagline: {
      en: 'Frozen islands, glaciers, polar bears & northern lights',
      fr: 'Îles glacées, glaciers, ours polaires et aurores boréales',
      zh: '冰川岛屿、永冻土、北极熊与绚丽极光',
    },
    relief: {
      icon: '🧊',
      keywords: [
        { en: 'Frozen islands', fr: 'Îles glacées', zh: '冰雪群岛' },
        { en: 'Glaciers & ice', fr: 'Glaciers et glace', zh: '冰川与浮冰' },
        { en: 'Flat tundra & peaks', fr: 'Toundra plate et montagnes', zh: '平坦苔原与高耸冰峰' },
      ],
      summary: {
        en: 'Many frozen islands, flat snowy plains (tundra), ice caps, and steep snowy mountains in the far north.',
        fr: 'Nombreuses îles gelées, plaines de toundra plate, glaciers et montagnes enneigées au grand nord.',
        zh: '由众多冰雪岛屿、平坦的雪原（苔原）、冰盖以及极北端险峻的雪山组成。',
      },
    },
    climate: {
      icon: '🥶',
      keywords: [
        { en: 'Freezing all winter', fr: 'Très froid presque toute l\'année', zh: '终年严寒' },
        { en: 'Midnight sun', fr: 'Soleil de minuit en été', zh: '夏季极昼午夜太阳' },
        { en: 'Frozen ground', fr: 'Terre gelée (pergélisol)', zh: '常年冻土' },
      ],
      summary: {
        en: 'Extremely cold, dry, and windy! Very long dark winters and short, chilly summers with 24-hour sunlight.',
        fr: 'Extrêmement froid, sec et venteux ! Hivers très longs et sombres ; étés courts et frais.',
        zh: '极度寒冷、干燥且多风！冬季漫长黑夜，夏季短暂微凉但有极昼。',
      },
    },
    vegetation: {
      icon: '🌼',
      keywords: [
        { en: 'No big trees!', fr: 'Pas de grands arbres !', zh: '没有高大树木！' },
        { en: 'Moss & lichens', fr: 'Mousses et lichens', zh: '苔藓与地衣' },
        { en: 'Tiny summer flowers', fr: 'Petites fleurs de toundra', zh: '耐寒苔原小花' },
      ],
      summary: {
        en: 'Too cold for trees to grow! Only tiny tundra plants, mosses, lichens, and small summer wildflowers.',
        fr: 'Trop froid pour les arbres ! Seulement des mousses, lichens et petites fleurs de toundra.',
        zh: '太冷了长不出大树！只有矮小的苔藓、地衣和夏季绽放的微型野花。',
      },
    },
    jobs: {
      icon: '🔬',
      list: [
        {
          icon: '🎣',
          label: { en: 'Fishing & Hunting', fr: 'Pêche, chasse', zh: '捕鱼与狩猎' },
        },
        {
          icon: '🔬',
          label: { en: 'Scientific Research', fr: 'Recherche', zh: '极地科学研究' },
        },
      ],
    },
    population: {
      en: 'About 150 thousand (150,000)',
      fr: 'Environ 150 mille (150 000)',
      zh: '约 15 万 (150,000)',
    },
    location: {
      en: 'Northern Canada (Nunavut, Northwest Territories, Yukon & northern Quebec)',
      fr: 'Nord du Canada (Nunavut, Territoires du Nord-Ouest, Yukon et nord du Québec)',
      zh: '加拿大北部（努纳武特、西北地区、育空以及魁北克北部）',
    },
    soilAgriculture: {
      icon: '🧊',
      level: 'none',
      summary: {
        en: 'No agriculture · Too cold · Frozen ground (permafrost).',
        fr: "Pas d'agriculture · Trop froid · La terre gelée.",
        zh: '没有农业 · 太寒冷 · 土地常年冻结（永冻土）。',
      },
    },
    bonusFact: {
      en: 'In summer, the sun stays up even at midnight (Midnight Sun), and in winter colorful Northern Lights dance in the sky!',
      fr: 'En été, le soleil brille même à minuit ! En hiver, de magnifiques aurores boréales dansent dans le ciel !',
      zh: '夏天会出现神奇的“午夜太阳”，冬天夜空会跳起梦幻的绿色极光！',
    },
    badgeTitle: {
      en: 'Arctic Aurora Scout',
      fr: "Éclaireur de l'Arctique",
      zh: '北极极光小先锋',
    },
  },
  {
    id: 'plains',
    badgeId: 'ca_plains',
    slideNumber: 4,
    inOntario: false,
    icon: '🌾',
    color: '#eab308', // Golden wheat yellow
    lightBg: 'bg-yellow-50',
    borderColor: 'border-yellow-400',
    name: {
      en: 'The Interior Plains',
      fr: 'Les Plaines intérieures',
      zh: '加拿大中部平原（大草原）',
    },
    shortName: {
      en: 'Interior Plains',
      fr: 'Plaines intérieures',
      zh: '中部平原',
    },
    tagline: {
      en: 'Wide flat golden wheat fields, big skies & dinosaurs',
      fr: 'Grandes plaines plates, champs de blé dorés et grand ciel',
      zh: '一望无际的金色麦田、辽阔蓝天与恐龙化石',
    },
    relief: {
      icon: '🌾',
      keywords: [
        { en: 'Very flat plains', fr: 'Plaines très plates', zh: '极其平坦开阔' },
        { en: 'Gently rolling hills', fr: 'Collines douces', zh: '平缓起伏的小丘' },
        { en: 'Wide river valleys', fr: 'Larges vallées', zh: '宽阔河谷' },
      ],
      summary: {
        en: 'Vast flat grasslands and gently rolling hills where you can see for kilometres!',
        fr: 'Vastes terres plates et douces collines où l’on peut voir très loin à l’horizon !',
        zh: '一马平川的辽阔大平原和柔和起伏的低丘，视野开阔极了！',
      },
    },
    climate: {
      icon: '☀️',
      keywords: [
        { en: 'Hot, sunny summers', fr: 'Étés chauds et ensoleillés', zh: '炎热晴朗的夏季' },
        { en: 'Very cold winters', fr: 'Hivers très froids', zh: '寒冷干燥的冬季' },
        { en: 'Dry & windy', fr: 'Sec et venteux', zh: '偏干燥且多风' },
      ],
      summary: {
        en: 'Big temperature swings: hot, sunny, dry summers and very cold, crisp winters.',
        fr: 'Grands écarts de température : étés chauds et secs, hivers très froids et secs.',
        zh: '温差很大：夏天炎热多阳光、雨水较少，冬天非常寒冷干燥。',
      },
    },
    vegetation: {
      icon: '🌾',
      keywords: [
        { en: 'Tall prairie grasses', fr: 'Hautes herbes des prairies', zh: '高大草原牧草' },
        { en: 'Wheat & canola fields', fr: 'Champs de blé et canola', zh: '金黄小麦与油菜花田' },
        { en: 'Northern forests', fr: 'Forêts au nord', zh: '北部点缀森林' },
      ],
      summary: {
        en: 'Sea of golden prairie grasses and crops like wheat and canola, with forests further north.',
        fr: 'Mer d’herbes des prairies et de cultures (blé, canola), avec des forêts plus au nord.',
        zh: '连绵起伏的草原草地和金黄小麦、油菜花农田，北部过渡为森林。',
      },
    },
    jobs: {
      icon: '🚜',
      list: [
        {
          icon: '🚜',
          label: { en: 'Farming (Fermier)', fr: 'Fermier', zh: '农场主 / 农民' },
        },
        {
          icon: '🏢',
          label: {
            en: 'Office jobs (in big cities)',
            fr: 'Bureau (dans les grandes villes)',
            zh: '办公室工作（大城市）',
          },
        },
        {
          icon: '⛏️',
          label: { en: 'Mining & Energy (Mines)', fr: 'Mines', zh: '采矿与能源' },
        },
      ],
    },
    population: {
      en: 'About 7 million (7,000,000)',
      fr: 'Environ 7 millions (7 000 000)',
      zh: '约 700 万 (7,000,000)',
    },
    location: {
      en: 'Alberta, Saskatchewan, Manitoba, British Columbia & Northwest Territories',
      fr: 'Alberta, Saskatchewan, Manitoba, Colombie-Britannique et Territoires du Nord-Ouest',
      zh: '艾伯塔省、萨斯喀彻温省、曼尼托巴省、BC省和西北地区',
    },
    soilAgriculture: {
      icon: '🚜',
      level: 'high',
      summary: {
        en: 'Fertile soil · Lots of agriculture (Canada’s breadbasket!).',
        fr: "Terres fertiles · Beaucoup d'agriculture.",
        zh: '土壤肥沃 · 农业非常发达（加拿大的“大粮仓”！）。',
      },
    },
    bonusFact: {
      en: 'Millions of years ago this area was a warm sea, and today Alberta’s Badlands are famous for giant dinosaur fossils!',
      fr: "Il y a des millions d'années c'était une mer, et aujourd'hui l'Alberta est célèbre pour ses fossiles de dinosaures !",
      zh: '数千万年前这里曾是温暖古海，如今艾伯塔荒地出土了大量巨型恐龙化石！',
    },
    badgeTitle: {
      en: 'Prairie Harvest Hero',
      fr: 'Héros des Prairies',
      zh: '大草原丰收英雄',
    },
  },
  {
    id: 'cordillera',
    badgeId: 'ca_cordillera',
    slideNumber: 5,
    inOntario: false,
    icon: '🏔️',
    color: '#8b5cf6', // Rocky Mountain purple
    lightBg: 'bg-purple-50',
    borderColor: 'border-purple-400',
    name: {
      en: 'The Cordillera',
      fr: 'La Cordillère',
      zh: '科迪勒拉山脉（落基山）',
    },
    shortName: {
      en: 'The Cordillera',
      fr: 'La Cordillère',
      zh: '科迪勒拉山脉',
    },
    tagline: {
      en: 'Towering snow-capped Rocky Mountains, deep valleys & rainforests',
      fr: 'Hautes montagnes enneigées, vallées profondes et forêts géantes',
      zh: '高耸入云的落基雪山、深邃峡谷与太平洋雨林',
    },
    relief: {
      icon: '🏔️',
      keywords: [
        { en: 'Tall jagged mountains', fr: 'Hautes montagnes escarpées', zh: '巍峨险峻的高山' },
        { en: 'Deep valleys & plateaus', fr: 'Vallées profondes et plateaux', zh: '深谷与高原' },
        { en: 'Rocky Pacific coast', fr: 'Côte rocheuse du Pacifique', zh: '多峡湾太平洋海岸' },
      ],
      summary: {
        en: 'Rows of towering, jagged snow-capped mountains (the Rockies), deep valleys, and coastal fjords.',
        fr: 'Chaînes de hautes montagnes enneigées (les Rocheuses), vallées profondes et plateaux.',
        zh: '连绵高耸、白雪皑皑的落基山脉群峰、幽深山谷以及壮丽的太平洋海岸。',
      },
    },
    climate: {
      icon: '🌧️',
      keywords: [
        { en: 'Mild & rainy coast', fr: 'Doux et pluvieux sur la côte', zh: '沿海温和多雨' },
        { en: 'Snowy mountain tops', fr: 'Froid et neigeux en montagne', zh: '山顶寒冷多雪' },
        { en: 'Warm dry valleys', fr: 'Vallées chaudes et sèches', zh: '内陆山谷温暖干燥' },
      ],
      summary: {
        en: 'Mild and rainy near the Pacific Ocean (Vancouver), but cold and snowy high up in the mountains.',
        fr: 'Doux et pluvieux près de l’océan Pacifique, mais froid et neigeux au sommet des montagnes.',
        zh: '太平洋沿岸（温哥华）温和多雨，高山之巅终年寒冷积雪，内陆河谷较温暖。',
      },
    },
    vegetation: {
      icon: '🌲',
      keywords: [
        { en: 'Giant evergreen trees', fr: 'Arbres géants (cèdres, sapins)', zh: '参天巨型红杉与冷杉' },
        { en: 'Coastal rainforest', fr: 'Forêt pluviale côtière', zh: '温带雨林' },
        { en: 'Alpine meadows', fr: 'Prairies alpines', zh: '高山草甸' },
      ],
      summary: {
        en: 'Towering giant Douglas firs and cedar rainforests on the coast, with alpine meadows higher up.',
        fr: 'Forêts d’arbres géants (sapins, cèdres) sur la côte et plantes alpines en haute montagne.',
        zh: '沿海长满参天雪松和道格拉斯冷杉组成的雨林，高山处则是草甸与雪线。',
      },
    },
    jobs: {
      icon: '⛷️',
      list: [
        {
          icon: '🌿',
          label: {
            en: 'Environmental Management',
            fr: 'Gestion environnementale',
            zh: '生态环境保护与管理',
          },
        },
        {
          icon: '⛷️',
          label: { en: 'Tourism (Skiing & Parks)', fr: 'Tourisme', zh: '旅游业（滑雪与国家公园）' },
        },
      ],
    },
    population: {
      en: 'About 5.9 million',
      fr: 'Environ 5,9 millions',
      zh: '约 590 万',
    },
    location: {
      en: 'British Columbia, Yukon, Alberta & Northwest Territories',
      fr: "Colombie-Britannique, Yukon, Alberta et Territoires du Nord-Ouest",
      zh: 'BC省（不列颠哥伦比亚）、育空、艾伯塔省和西北地区',
    },
    soilAgriculture: {
      icon: '🏔️',
      level: 'low',
      summary: {
        en: 'Not much agriculture · Too many mountains! (Fruit orchards grow in sunny valleys.)',
        fr: "Pas beaucoup d'agriculture · Trop de montagnes !",
        zh: '农业很少 · 山地太多！（仅在阳光山谷有著名果园）。',
      },
    },
    bonusFact: {
      en: 'Home to Canada’s highest peak—Mount Logan (5,959 m)—and emerald turquoise mountain lakes like Lake Louise!',
      fr: 'On y trouve le plus haut sommet du Canada (mont Logan) et les lacs turquoise célèbres comme le lac Louise !',
      zh: '这里有加拿大最高峰洛根山（5,959米），以及宝石蓝的露易丝湖！',
    },
    badgeTitle: {
      en: 'Rocky Peak Climber',
      fr: 'Alpiniste de la Cordillère',
      zh: '落基雪峰登山家',
    },
  },
  {
    id: 'stlawrence',
    badgeId: 'ca_stlawrence',
    slideNumber: 6,
    inOntario: true,
    icon: '🏙️',
    color: '#ef4444', // Maple red (our home region!)
    lightBg: 'bg-rose-50',
    borderColor: 'border-rose-400',
    name: {
      en: 'Great Lakes–St. Lawrence Lowlands',
      fr: 'Les basses-terres du Saint-Laurent et des Grands Lacs',
      zh: '圣劳伦斯与五大湖低地',
    },
    shortName: {
      en: 'St. Lawrence & Great Lakes',
      fr: 'Saint-Laurent & Grands Lacs',
      zh: '五大湖与圣劳伦斯低地',
    },
    tagline: {
      en: 'Our home! Fertile farms, big cities & sparkling Great Lakes',
      fr: 'Chez nous ! Fermes fertiles, grandes villes et Grands Lacs',
      zh: '我们的家园！肥沃农田、繁华大都市与壮美五大湖',
    },
    relief: {
      icon: '🏞️',
      keywords: [
        { en: 'Flat fertile plains', fr: 'Plaines plates et fertiles', zh: '平坦肥沃的平原' },
        { en: 'Gentle rolling hills', fr: 'Collines douces', zh: '缓坡小山丘' },
        { en: 'Great Lakes & rivers', fr: 'Grands Lacs et fleuve', zh: '五大湖与圣劳伦斯河' },
      ],
      summary: {
        en: 'Flat plains and gentle rolling hills carved by glaciers, surrounded by the Great Lakes and St. Lawrence River.',
        fr: 'Plaines plates et douces collines bordées par les Grands Lacs et le fleuve Saint-Laurent.',
        zh: '平坦低地与平缓小丘，被五大湖和宽阔的圣劳伦斯河环抱。',
      },
    },
    climate: {
      icon: '🍁',
      keywords: [
        { en: '4 distinct seasons', fr: '4 saisons bien marquées', zh: '四季分明' },
        { en: 'Warm, humid summers', fr: 'Étés chauds et humides', zh: '温暖湿润的夏季' },
        { en: 'Cold, snowy winters', fr: 'Hivers froids et neigeux', zh: '寒冷多雪的冬季' },
      ],
      summary: {
        en: 'Four clear seasons: warm humid summers, colorful autumn, snowy cold winters, and rainy springs.',
        fr: 'Quatre saisons distinctes : étés chauds et humides, automnes colorés et hivers froids et neigeux.',
        zh: '四季分明：夏天温暖湿润、秋天枫叶缤纷、冬天寒冷降雪、春天多雨。',
      },
    },
    vegetation: {
      icon: '🍁',
      keywords: [
        { en: 'Maple & oak trees', fr: 'Érables et chênes (feuillus)', zh: '枫树、橡树等阔叶林' },
        { en: 'Mixed forests', fr: 'Forêts mixtes', zh: '针阔混交林' },
        { en: 'Orchards & farms', fr: 'Vergers et champs cultivés', zh: '果园与农田' },
      ],
      summary: {
        en: 'Rich mixed forests of sugar maples, oaks, and pines—turning bright red and gold every autumn!',
        fr: 'Forêts mixtes riches en érables à sucre, chênes et pins qui deviennent rouges et dorés à l’automne !',
        zh: '盛产糖枫、橡树和松树的混交林，每年秋天漫山红叶金黄！',
      },
    },
    jobs: {
      icon: '🏢',
      list: [
        {
          icon: '🏢',
          label: { en: 'Office & Tech jobs (Bureau)', fr: 'Bureau', zh: '办公室与科技工作' },
        },
        {
          icon: '🏥',
          label: { en: 'Services (Les Services)', fr: 'Les Services', zh: '各类服务业' },
        },
      ],
    },
    population: {
      en: 'About 20 million (20,000,000)',
      fr: 'Environ 20 millions (20 000 000)',
      zh: '约 2000 万 (20,000,000)',
    },
    location: {
      en: 'Southern Ontario & Quebec (including Waterloo, Toronto, Ottawa & Montreal!)',
      fr: 'Sud de l’Ontario et Québec (Waterloo, Toronto, Ottawa et Montréal !)',
      zh: '安大略省南部和魁北克省（包括滑铁卢、多伦多、渥太华和蒙特利尔！）',
    },
    soilAgriculture: {
      icon: '🍎',
      level: 'high',
      summary: {
        en: 'Fertile soil · Lots of agriculture (corn, apples, peaches & dairy!).',
        fr: "Terres fertiles · Beaucoup d'agriculture.",
        zh: '土地极其肥沃 · 农业非常丰富（水果、玉米、奶牛场！）。',
      },
    },
    bonusFact: {
      en: 'Even though it is Canada’s SMALLEST landform region, MORE THAN HALF of all Canadians live right here—including Millen Woods in Waterloo!',
      fr: "Même si c'est la PLUS PETITE région, plus de la moitié des Canadiens y habitent—y compris Waterloo !",
      zh: '虽然它是加拿大面积最小的地貌区，却居住着超过一半的加拿大人——包括我们的家乡滑铁卢！',
    },
    badgeTitle: {
      en: 'Great Lakes Home Captain',
      fr: 'Capitaine des Grands Lacs',
      zh: '五大湖家园船长',
    },
  },
  {
    id: 'appalachian',
    badgeId: 'ca_appalachian',
    slideNumber: 7,
    inOntario: false,
    icon: '⚓',
    color: '#10b981', // Atlantic forest green
    lightBg: 'bg-emerald-50',
    borderColor: 'border-emerald-400',
    name: {
      en: 'The Appalachian Region',
      fr: 'Les Appalaches',
      zh: '阿巴拉契亚山区（大西洋省份）',
    },
    shortName: {
      en: 'Appalachians',
      fr: 'Les Appalaches',
      zh: '阿巴拉契亚',
    },
    tagline: {
      en: 'Old rounded green mountains, ocean lighthouses & lobster boats',
      fr: 'Vieilles montagnes arrondies, phares marins et bateaux de pêche',
      zh: '古老圆润的青山、海边灯塔与龙虾渔船',
    },
    relief: {
      icon: '⛰️',
      keywords: [
        { en: 'Old rounded mountains', fr: 'Vieilles montagnes arrondies', zh: '古老圆润的低山' },
        { en: 'Rolling hills & valleys', fr: 'Collines et vallées fertiles', zh: '丘陵与绿色山谷' },
        { en: 'Ocean cliffs & bays', fr: 'Falaises et baies océaniques', zh: '大西洋海湾与峭壁' },
      ],
      summary: {
        en: 'Ancient mountains worn down into smooth, rounded hills, lush valleys, and rocky Atlantic ocean bays.',
        fr: 'Vieilles montagnes usées en collines arrondies, vallées verdoyantes et côtes rocheuses de l’Atlantique.',
        zh: '经亿万年风化变得圆润柔和的古老山脉、翠绿山谷和迷人的大西洋海岸。',
      },
    },
    climate: {
      icon: '🌊',
      keywords: [
        { en: 'Ocean breeze', fr: 'Influencé par l’océan', zh: '海洋性气候' },
        { en: 'Cool, rainy & foggy', fr: 'Frais, pluvieux et brumeux', zh: '湿润多雨多雾' },
        { en: 'Milder winters', fr: 'Hivers plus doux et neigeux', zh: '冬季较温和但多雪' },
      ],
      summary: {
        en: 'Shaped by the Atlantic Ocean: mild-to-cool winters, pleasant summers, plenty of rain, and misty sea fog.',
        fr: 'Influencé par l’océan Atlantique : étés agréables, hivers plus doux, beaucoup de pluie et de brouillard.',
        zh: '受大西洋海洋影响：夏季凉爽宜人，冬季较内陆温和，常有海雾和充沛降雨。',
      },
    },
    vegetation: {
      icon: '🌳',
      keywords: [
        { en: 'Mixed forests', fr: 'Forêts mixtes', zh: '茂密针阔混交林' },
        { en: 'Spruce, fir & maple', fr: 'Épinettes, sapins et érables', zh: '云杉、冷杉与枫树' },
        { en: 'Coastal wildflowers', fr: 'Fleurs côtières', zh: '海岸野花' },
      ],
      summary: {
        en: 'Thick mixed forests of spruce, fir, birch, and maple trees covering the hills down to the sea.',
        fr: 'Épaisses forêts mixtes d’épinettes, de sapins, de bouleaux et d’érables jusqu’à l’océan.',
        zh: '云杉、冷杉、桦树和枫树组成的茂密混交林一路延伸至大西洋海边。',
      },
    },
    jobs: {
      icon: '🦞',
      list: [
        {
          icon: '🦞',
          label: { en: 'Fishing (La Pêche)', fr: 'La Pêche', zh: '海洋捕鱼（龙虾、鳕鱼）' },
        },
        {
          icon: '🪵',
          label: { en: 'Forestry (Foresterie)', fr: 'Foresterie', zh: '林业与木材' },
        },
        {
          icon: '🩺',
          label: { en: 'Services', fr: 'Services', zh: '服务业' },
        },
      ],
    },
    population: {
      en: 'About 40 thousand (40,000 — per class slides)',
      fr: 'Environ 40 mille (40 000)',
      zh: '约 4 万（40,000，按课堂讲义）',
    },
    location: {
      en: 'New Brunswick, Nova Scotia, Newfoundland & Labrador, and Quebec (Gaspé)',
      fr: 'Nouveau-Brunswick, Nouvelle-Écosse, Terre-Neuve-et-Labrador et le Québec',
      zh: '新不伦瑞克省、新斯科舍省、纽芬兰与拉布拉多省及魁北克省',
    },
    soilAgriculture: {
      icon: '🥛',
      level: 'medium',
      summary: {
        en: 'Small farms (milk/dairy, fruits, vegetables — potatoes & apples!).',
        fr: 'Petites fermes (lait, fruits, légumes).',
        zh: '小型农场（牛奶、水果、蔬菜，如土豆和苹果！）。',
      },
    },
    bonusFact: {
      en: 'Home to the Bay of Fundy, which has the HIGHEST ocean tides in the entire world—boats sit on dry ocean floor at low tide!',
      fr: 'On y trouve la baie de Fundy, célèbre pour avoir les plus hautes marées du monde entier !',
      zh: '著名的芬迪湾就位于这里，拥有全世界落差最大的海洋潮汐！',
    },
    badgeTitle: {
      en: 'Atlantic Lighthouse Sailor',
      fr: 'Marin des Appalaches',
      zh: '大西洋灯塔水手',
    },
  },
];

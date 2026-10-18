export type LandmarkModelType =
  | 'cn_tower'
  | 'great_wall'
  | 'torii_gate'
  | 'pyramid'
  | 'christ_statue'
  | 'opera_house'
  | 'eiffel_tower'
  | 'leaning_tower'
  | 'volcano_geyser'
  | 'safari_outpost'
  | 'mayan_pyramid'
  | 'machu_picchu'
  | 'taj_mahal'
  | 'big_ben'
  | 'liberty_statue'
  | 'polar_station';

export interface CountryLandmark {
  countryId: string;
  nameEn: string;
  nameZh: string;
  shortNameEn: string;
  shortNameZh: string;
  cityEn: string;
  cityZh: string;
  icon: string;
  modelType: LandmarkModelType;
  heightOrScale: string;
  yearBuilt: string;
  descEn: string;
  descZh: string;
  architecturalFactEn: string;
  architecturalFactZh: string;
  color: string;
}

export const COUNTRY_LANDMARKS: Record<string, CountryLandmark> = {
  canada: {
    countryId: 'canada',
    nameEn: 'CN Tower & Banff Peaks',
    nameZh: '加拿大国家电视塔与班夫峰群',
    shortNameEn: 'CN Tower',
    shortNameZh: '加拿大电视塔',
    cityEn: 'Toronto & Alberta',
    cityZh: '多伦多 与 艾伯塔省',
    icon: '🍁',
    modelType: 'cn_tower',
    heightOrScale: '553.3 m',
    yearBuilt: '1976',
    descEn: 'A towering telecommunication wonder piercing Toronto skies with an observation pod and glass floor.',
    descZh: '刺破多伦多天际线的553米超高电视塔，拥有俯瞰安大略湖的高空玻璃观景台。',
    architecturalFactEn: 'Built with a massive hexagonal hollow steel-reinforced concrete core that sways gently up to 1.07 meters in strong hurricane winds without breaking!',
    architecturalFactZh: '采用六边形中空钢筋混凝土核心筒结构，在强风暴中塔尖可平稳摆动多达1米而不发生任何结构损伤！',
    color: '#ef4444',
  },
  china: {
    countryId: 'china',
    nameEn: 'The Great Wall of China',
    nameZh: '万里长城与烽火古堡',
    shortNameEn: 'Great Wall',
    shortNameZh: '万里长城',
    cityEn: 'Beijing & Northern Ridges',
    cityZh: '北京 · 八达岭与古北山脊',
    icon: '🧱',
    modelType: 'great_wall',
    heightOrScale: '21,196 km total',
    yearBuilt: 'Over 2,300 years ago',
    descEn: 'A colossal stone fortress twisting across mountain ridges with crenelated watchtowers and beacon smoke towers.',
    descZh: '如巨龙般盘旋在崇山峻岭之巅的石砌长城，设有垛口、箭楼与传递军情的烽火台。',
    architecturalFactEn: 'Ancient builders blended sticky sweet rice broth with slaked lime mortar, creating an organic biopolymer cement that survived centuries of earthquakes!',
    architecturalFactZh: '古代工匠将熬制的香浓熟糯米汁混合熟石灰砂浆，形成高强度的天然生物聚合物，抵御千百年风霜震动！',
    color: '#f59e0b',
  },
  japan: {
    countryId: 'japan',
    nameEn: 'Mount Fuji & Miyajima Torii',
    nameZh: '富士山与水上朱红鸟居',
    shortNameEn: 'Mount Fuji',
    shortNameZh: '富士山',
    cityEn: 'Honshu & Hiroshima Bay',
    cityZh: '本州岛 · 静冈与广岛海湾',
    icon: '🗻',
    modelType: 'torii_gate',
    heightOrScale: '3,776 m peak / 16.6 m gate',
    yearBuilt: '1168 (Torii) / Geological',
    descEn: 'The symmetrical snow-crowned sacred volcano paired with the vermilion Torii gate floating in tidal ocean waves.',
    descZh: '终年白雪覆顶的唯美火山圣峰，与矗立在潮起潮落波光之中的朱红色水上鸟居。',
    architecturalFactEn: 'The floating Great Torii stands under its own heavy weight with no pillars dug into the seabed; hollow wooden roof beams are weighted down with 7 tons of river stones!',
    architecturalFactZh: '水上大鸟居并未在地基下打桩固定，而是依靠自重挺立！屋顶横梁中装填了足足7吨鹅卵石，抗击海浪冲击！',
    color: '#dc2626',
  },
  egypt: {
    countryId: 'egypt',
    nameEn: 'Great Pyramids of Giza & Sphinx',
    nameZh: '吉萨金字塔与巨石狮身人面像',
    shortNameEn: 'Pyramids of Giza',
    shortNameZh: '吉萨金字塔',
    cityEn: 'Giza Plateau, Cairo',
    cityZh: '开罗 · 吉萨高地',
    icon: '🔺',
    modelType: 'pyramid',
    heightOrScale: '138.8 m original',
    yearBuilt: 'c. 2560 BCE',
    descEn: 'The only surviving wonder of the ancient world, aligned with astronomical precision beside the Nile River.',
    descZh: '古代世界七大奇迹中唯一完好留存至今的奇观，由数百万块巨石严丝合缝筑成。',
    architecturalFactEn: 'Constructed from over 2.3 million giant limestone blocks weighing an average of 2.5 tons each, precisely oriented to true North with less than 0.05 degree error!',
    architecturalFactZh: '由超过230万块平均重达2.5吨的巨型石灰石垒砌而成，朝向正北方向的误差竟不足0.05度！',
    color: '#d97706',
  },
  brazil: {
    countryId: 'brazil',
    nameEn: 'Christ the Redeemer & Corcovado',
    nameZh: '里约热内卢救世基督像',
    shortNameEn: 'Christ the Redeemer',
    shortNameZh: '救世基督像',
    cityEn: 'Mount Corcovado, Rio',
    cityZh: '里约热内卢 · 科科瓦多山顶',
    icon: '⛰️',
    modelType: 'christ_statue',
    heightOrScale: '38 m (statue + pedestal)',
    yearBuilt: '1931',
    descEn: 'The iconic Art Deco colossal monument spreading welcoming arms across Guanabara Bay and Atlantic oceans.',
    descZh: '雄踞于710米科科瓦多花岗岩山顶的巨型装饰艺术雕像，张开双臂博爱守护海湾。',
    architecturalFactEn: 'Covered with 6 million triangular soapstone tiles glued by local volunteers. Soapstone was selected because it resists weathering in harsh tropical seaside weather!',
    architecturalFactZh: '雕像外层贴有600万枚三角形滑石马赛克瓷砖，由志愿者逐块拼接，滑石极具耐磨耐风化特性！',
    color: '#10b981',
  },
  australia: {
    countryId: 'australia',
    nameEn: 'Sydney Opera House & Uluru',
    nameZh: '悉尼歌剧院与乌鲁鲁巨石',
    shortNameEn: 'Sydney Opera House',
    shortNameZh: '悉尼歌剧院',
    cityEn: 'Sydney Harbour & Red Centre',
    cityZh: '悉尼海港 与 澳洲红土中心',
    icon: '⛵',
    modelType: 'opera_house',
    heightOrScale: '65 m shells',
    yearBuilt: '1973',
    descEn: 'A masterwork of 20th-century expressionist architecture with interlocking white ceramic sail roofs.',
    descZh: '20世纪现代建筑瑰宝，如贝壳与白色风帆在蔚蓝的悉尼海港上层叠起伏绽放。',
    architecturalFactEn: 'Architect Jørn Utzon solved the spherical geometry riddle using pieces sliced from a single conceptual sphere, allowing modular precast concrete ribs!',
    architecturalFactZh: '建筑大师约恩·乌松从切开的橙子球体中获得灵感，所有白色贝壳风帆均源自同一个数学球面的分段！',
    color: '#38bdf8',
  },
  france: {
    countryId: 'france',
    nameEn: 'Eiffel Tower',
    nameZh: '巴黎埃菲尔铁塔',
    shortNameEn: 'Eiffel Tower',
    shortNameZh: '埃菲尔铁塔',
    cityEn: 'Champ de Mars, Paris',
    cityZh: '巴黎 · 战神广场',
    icon: '🗼',
    modelType: 'eiffel_tower',
    heightOrScale: '330 m',
    yearBuilt: '1889',
    descEn: 'The world-famous puddle-iron lattice tower standing proudly alongside the Seine River.',
    descZh: '塞纳河畔举世瞩目的熟铁镂空塔架，为1889年巴黎世界博览会百年庆典而建。',
    architecturalFactEn: 'During hot summer days, thermal expansion causes the iron tower to grow up to 15 centimeters taller and tilt slightly away from the warm sun!',
    architecturalFactZh: '在夏日阳光照射下，钢铁的热胀冷缩会使铁塔高度膨胀增加多达15厘米，并向远离太阳的一侧轻微倾斜！',
    color: '#6366f1',
  },
  italy: {
    countryId: 'italy',
    nameEn: 'Leaning Tower of Pisa & Colosseum',
    nameZh: '比萨斜塔与古罗马斗兽场',
    shortNameEn: 'Tower of Pisa',
    shortNameZh: '比萨斜塔',
    cityEn: 'Pisa & Rome',
    cityZh: '比萨奇迹广场 与 罗马城',
    icon: '🏟️',
    modelType: 'leaning_tower',
    heightOrScale: '56.7 m · tilts 3.97°',
    yearBuilt: '1173 - 1372',
    descEn: 'The freestanding circular Romanesque marble bell tower known worldwide for its dramatic gravitational tilt.',
    descZh: '以优美大理石圆拱回廊与惊人倾斜角度闻名遐迩的罗马式钟楼，世界物理学实验圣地。',
    architecturalFactEn: 'It leaned because the foundation was set into weak marshy clay and silt; engineers stabilized it in the 1990s by carefully extracting 70 metric tons of soil from the high side!',
    architecturalFactZh: '因地基位于松软泥沼冲积层而发生倾斜；近代工程师通过在较高一侧抽取70吨泥土使其回正约40厘米并成功定型！',
    color: '#ec4899',
  },
  iceland: {
    countryId: 'iceland',
    nameEn: 'Hallgrímskirkja & Great Geysir',
    nameZh: '哈尔格林姆教堂与黄金间歇泉',
    shortNameEn: 'Hallgrímskirkja',
    shortNameZh: '哈尔格林姆教堂',
    cityEn: 'Reykjavik & Haukadalur',
    cityZh: '雷克雅未克 与 地热峡谷',
    icon: '🌋',
    modelType: 'volcano_geyser',
    heightOrScale: '74.5 m tower',
    yearBuilt: '1986 / Natural',
    descEn: 'A breathtaking expressionist stepped church inspired by cooled basalt lava columns, and boiling blue geysers.',
    descZh: '以冰岛六棱玄武岩冷却柱为灵感的阶梯管风琴教堂，以及每隔数分钟喷向高空的沸水间歇泉。',
    architecturalFactEn: 'Designed by Guðjón Samúelsson to mimic volcanic traps formed when basalt lava cools and cracks into geometric vertical hexagonal stone organ pipes!',
    architecturalFactZh: '建筑师古德永依照玄武岩熔岩喷发后快速冷却开裂形成的六角形石柱群设计，兼具教堂与高耸引航灯塔功能！',
    color: '#06b6d4',
  },
  kenya: {
    countryId: 'kenya',
    nameEn: 'Maasai Mara Acacia & Safari Outpost',
    nameZh: '马赛马拉伞状金合欢与巡逻木哨所',
    shortNameEn: 'Safari Outpost',
    shortNameZh: '马赛马拉哨所',
    cityEn: 'Great Rift Valley',
    cityZh: '东非大裂谷 · 马赛马拉',
    icon: '🦒',
    modelType: 'safari_outpost',
    heightOrScale: 'Elevated timber towers',
    yearBuilt: 'Traditional Savannah Craft',
    descEn: 'Iconic flat-topped umbrella acacia trees providing shade for lions, cheetahs, and safari wildlife rangers.',
    descZh: '茫茫东非金色稀树草原上如大伞撑开的平顶金合欢树，与守护角马大迁徙的野生动物巡护哨楼。',
    architecturalFactEn: 'Umbrella acacias grow flat broad canopy crowns to maximize early morning equatorial sunlight while minimizing moisture evaporation in scorching African heat!',
    architecturalFactZh: '伞状金合欢进化出扁平如盖的树冠，能最大限度捕捉清晨柔和阳光，同时有效阻挡正午烈日蒸发水分！',
    color: '#84cc16',
  },
  mexico: {
    countryId: 'mexico',
    nameEn: 'Chichen Itza (El Castillo Pyramid)',
    nameZh: '奇琴伊察玛雅羽蛇神金字塔',
    shortNameEn: 'Chichén Itzá',
    shortNameZh: '玛雅金字塔',
    cityEn: 'Yucatan Rainforest',
    cityZh: '尤卡坦半岛 · 奇琴伊察',
    icon: '🛕',
    modelType: 'mayan_pyramid',
    heightOrScale: '30 m / 91 steps on 4 sides',
    yearBuilt: 'c. 900 CE',
    descEn: 'A monumental step-pyramid serving as a physical astronomical calendar for the ancient Maya civilization.',
    descZh: '玛雅文明建造的天文学巨石阶梯金字塔，四面各有91级台阶，加上塔顶平台恰好等于365天！',
    architecturalFactEn: 'On spring and autumn equinoxes, afternoon shadows ripple down the northwest balustrade, mimicking a giant 30-meter serpent slithering down to earth!',
    architecturalFactZh: '在春分和秋分黄昏，太阳光线在金字塔北侧台阶边缘投射出波浪状光影，如同一条长达30米的羽蛇神缓缓蜿蜒游下！',
    color: '#eab308',
  },
  peru: {
    countryId: 'peru',
    nameEn: 'Machu Picchu Sun Citadel',
    nameZh: '马丘比丘印加天空之城',
    shortNameEn: 'Machu Picchu',
    shortNameZh: '马丘比丘',
    cityEn: 'Andes Cloud Forest, Cusco',
    cityZh: '安第斯山脉 · 库斯科云雾林',
    icon: '🦙',
    modelType: 'machu_picchu',
    heightOrScale: '2,430 m elevation',
    yearBuilt: 'c. 1450 CE',
    descEn: 'An Inca stone marvel perched between two dramatic peaks in the mist-veiled Peruvian Andes mountains.',
    descZh: '高悬在安第斯绝壁深谷两峰之间的印加皇室古城，拥有数以百计的高山农业梯田与石砌神庙。',
    architecturalFactEn: 'Constructed using "ashlar" stonework: stones were carved to fit together without mortar so tightly that a thin knife blade cannot slide between them, absorbing earthquake vibrations!',
    architecturalFactZh: '采用精湛的“无浆琢石法”干砌建造，巨石之间不借助任何灰浆却严密得连刀片都插不进去，地震时能自动微动缓冲！',
    color: '#14b8a6',
  },
  india: {
    countryId: 'india',
    nameEn: 'Taj Mahal',
    nameZh: '泰姬陵 (Taj Mahal)',
    shortNameEn: 'Taj Mahal',
    shortNameZh: '泰姬陵',
    cityEn: 'Agra, Yamuna River',
    cityZh: '北方邦 · 阿格拉',
    icon: '🕌',
    modelType: 'taj_mahal',
    heightOrScale: '73 m dome',
    yearBuilt: '1632 - 1653',
    descEn: 'An immense ivory-white marble jewel celebrated worldwide for flawless symmetry and jeweled floral inlays.',
    descZh: '亚穆纳河畔纯白大理石艺术明珠，完美对称的洋葱穹顶与四座高耸的宣礼尖塔交相辉映。',
    architecturalFactEn: 'The four corner minarets were deliberately built leaning slightly outward so that in the event of an earthquake, they would fall safely away from the precious central dome!',
    architecturalFactZh: '四周的四座宣礼塔在建造时被特意设计成向外微倾斜，这样在发生强烈地震时尖塔只会向外倒塌，保护中央主殿！',
    color: '#f43f5e',
  },
  'united-kingdom': {
    countryId: 'united-kingdom',
    nameEn: 'Big Ben & Palace of Westminster',
    nameZh: '伦敦大本钟 (伊丽莎白塔)',
    shortNameEn: 'Big Ben',
    shortNameZh: '大本钟',
    cityEn: 'Thames Embankment, London',
    cityZh: '伦敦 · 泰晤士河畔',
    icon: '🔔',
    modelType: 'big_ben',
    heightOrScale: '96 m tower',
    yearBuilt: '1859',
    descEn: 'The world-famous Neo-Gothic clock tower whose resonant chimes have kept maritime Greenwich time for generations.',
    descZh: '泰晤士河畔的新哥特式钟楼，四面巨大的钟盘与悠扬钟声见证了格林威治航海天文历法。',
    architecturalFactEn: 'The pendulum speed is fine-tuned using old British pre-decimal penny coins placed atop the pendulum bob; adding or removing one coin changes time by 0.4 seconds per day!',
    architecturalFactZh: '钟摆的精确速度是通过在钟摆重锤顶部放置几枚老式英国便士铜币来微调的，加减一枚硬币每天能微调0.4秒误差！',
    color: '#3b82f6',
  },
  'united-states': {
    countryId: 'united-states',
    nameEn: 'Statue of Liberty',
    nameZh: '纽约自由女神像',
    shortNameEn: 'Statue of Liberty',
    shortNameZh: '自由女神像',
    cityEn: 'Liberty Island, New York Harbour',
    cityZh: '纽约港 · 自由岛',
    icon: '🗽',
    modelType: 'liberty_statue',
    heightOrScale: '93 m (base to torch tip)',
    yearBuilt: '1886',
    descEn: 'A neoclassical copper colossus welcoming sailors and travellers from across the oceans with a radiant golden torch.',
    descZh: '矗立在纽约港湾的青铜女神巨像，右手高擎象征光明的火炬，左手捧着独立宣言法典。',
    architecturalFactEn: 'The internal structural iron skeleton was engineered by Gustave Eiffel! The exterior copper skin is only 2.4 millimeters thick — about the thickness of two pennies together!',
    architecturalFactZh: '其内部弹性承重钢骨架由埃菲尔铁塔的设计师古斯塔夫·埃菲尔打造！外层铜皮厚度仅2.4毫米，相当于两枚硬币厚！',
    color: '#0284c7',
  },
  antarctica: {
    countryId: 'antarctica',
    nameEn: 'Amundsen-Scott South Pole Station & Domes',
    nameZh: '阿蒙森-斯科特南极科考站与科研穹顶',
    shortNameEn: 'South Pole Station',
    shortNameZh: '南极科考站',
    cityEn: 'Geographic South Pole 90°S',
    cityZh: '地理南极点 90°S',
    icon: '🐧',
    modelType: 'polar_station',
    heightOrScale: '2,835 m on ice sheet',
    yearBuilt: '2008 Modernized Station',
    descEn: 'An elevated aerodynamic research facility and telescope geodesic domes braving Antarctic ice winds.',
    descZh: '耸立在永久冰原上的可调节升降式流线型科考站建筑群与南极深空望远镜观测穹顶。',
    architecturalFactEn: 'Built on hydraulic adjustable stilts with an airfoil bottom; strong polar winds accelerate underneath the building, blowing snow away to prevent snowdrifts from burying it!',
    architecturalFactZh: '建筑架设在可液压抬升的钢制支柱上，底部呈机翼倒流线型，暴风雪会从建筑下方快速掠过，避免积雪掩埋科考站！',
    color: '#38bdf8',
  },
};

// Aliases for compatibility
COUNTRY_LANDMARKS['uk'] = COUNTRY_LANDMARKS['united-kingdom'];
COUNTRY_LANDMARKS['usa'] = COUNTRY_LANDMARKS['united-states'];

export function getCountryLandmark(countryId: string): CountryLandmark | undefined {
  if (!countryId) return undefined;
  const normalized = countryId.toLowerCase().trim();
  if (normalized === 'uk') return COUNTRY_LANDMARKS['united-kingdom'];
  if (normalized === 'usa') return COUNTRY_LANDMARKS['united-states'];
  return COUNTRY_LANDMARKS[normalized];
}

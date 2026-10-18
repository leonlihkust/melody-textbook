export interface CountryQuiz {
  questionEn: string;
  questionZh: string;
  optionsEn: string[];
  optionsZh: string[];
  correctIndex: number;
  explanationEn: string;
  explanationZh: string;
}

export interface WorldCountry {
  id: string;
  nameEn: string;
  nameZh: string;
  flag: string;
  capitalEn: string;
  capitalZh: string;
  taglineEn: string;
  taglineZh: string;
  category: 'Americas' | 'Europe' | 'Asia' | 'Africa' | 'Oceania' | 'Polar';
  funFactEn: string;
  funFactZh: string;
  badgeTitleEn: string;
  badgeTitleZh: string;
  quiz: CountryQuiz;
}

export const WORLD_COUNTRIES: WorldCountry[] = [
  {
    "id": "canada",
    "nameEn": "Canada",
    "nameZh": "加拿大",
    "flag": "🇨🇦",
    "capitalEn": "Ottawa",
    "capitalZh": "渥太华",
    "taglineEn": "The Great White North & Millen Woods Home!",
    "taglineZh": "枫叶之国与水手们的故乡！",
    "category": "Americas",
    "funFactEn": "Canada has over 2 million lakes — more natural lakes than all other countries in the entire world combined! In fact, 60% of the world’s lakes are right here in Canada.",
    "funFactZh": "加拿大拥有超过 200 万个湖泊，比全世界其余所有国家的天然湖泊加起来还要多！全球整整 60% 的湖泊都在加拿大。",
    "badgeTitleEn": "Maple Explorer Badge",
    "badgeTitleZh": "枫叶探索家勋章",
    "quiz": {
      "questionEn": "How many lakes does Canada have compared to the rest of the world?",
      "questionZh": "与世界其他国家相比，加拿大的湖泊数量如何？",
      "optionsEn": [
        "Canada has about 500 lakes in total",
        "More natural lakes than all other countries combined",
        "Second place behind Australia",
        "Only 10% of the world’s fresh water"
      ],
      "optionsZh": [
        "加拿大总共只有约 500 个湖泊",
        "比全世界其余所有国家的湖泊加起来还要多",
        "仅次于澳大利亚排世界第二",
        "仅占世界淡水湖总量的 10%"
      ],
      "correctIndex": 1,
      "explanationEn": "Canada is home to over 2 million lakes, containing more lakes than the rest of the planet combined!",
      "explanationZh": "加拿大拥有超过 200 万个湖泊，其天然湖泊总数超过了地球上其他所有国家的总和！"
    }
  },
  {
    "id": "china",
    "nameEn": "China",
    "nameZh": "中国",
    "flag": "🇨🇳",
    "capitalEn": "Beijing",
    "capitalZh": "北京",
    "taglineEn": "Land of Pandas & Ancient Wonders",
    "taglineZh": "国宝大熊猫与万里长城之乡",
    "category": "Asia",
    "funFactEn": "The mortar used to bind the ancient stones of the Great Wall was made from sticky sweet rice soup mixed with slaked lime, making it withstand earthquakes for centuries!",
    "funFactZh": "古代工匠建造万里长城时，竟然用煮熟的糯米浆混合熟石灰制成砂浆！这种糯米砂浆极具韧性，让城墙历经数百年地震仍坚不可摧。",
    "badgeTitleEn": "Dragon Navigator Badge",
    "badgeTitleZh": "飞龙领航员勋章",
    "quiz": {
      "questionEn": "What surprising delicious ingredient was used in the mortar of the Great Wall?",
      "questionZh": "万里长城的砌筑砂浆中使用了哪种令人惊奇的美食原料？",
      "optionsEn": [
        "Sticky sweet rice soup",
        "Crushed sesame paste",
        "Green tea extract",
        "Mushroom powder"
      ],
      "optionsZh": [
        "香浓糯米浆",
        "研磨黑芝麻糊",
        "高山绿茶汁",
        "干香菇粉"
      ],
      "correctIndex": 0,
      "explanationEn": "Ancient builders discovered sticky rice starch created a super-strong polymer cement that survived centuries!",
      "explanationZh": "古代工匠巧妙发现糯米中的支链淀粉能形成高强度生物聚合物，抵御数百年风雨与震动！"
    }
  },
  {
    "id": "japan",
    "nameEn": "Japan",
    "nameZh": "日本",
    "flag": "🇯🇵",
    "capitalEn": "Tokyo",
    "capitalZh": "东京",
    "taglineEn": "Biomimicry & Polite Deer",
    "taglineZh": "仿生高铁与懂礼貌的奈良鹿",
    "category": "Asia",
    "funFactEn": "Japan’s Shinkansen bullet train nose was engineered based on the beak of the Kingfisher bird to prevent noisy sonic booms when exiting tunnels!",
    "funFactZh": "日本新干线子弹头列车的流线型车头，是工程师仿照翠鸟的鸟喙设计的！这种仿生学设计消除了列车出隧道时的超大音爆噪音。",
    "badgeTitleEn": "Shinkansen Speedster Badge",
    "badgeTitleZh": "疾速新干线勋章",
    "quiz": {
      "questionEn": "Which bird inspired the aerodynamic nose of the Japanese bullet train?",
      "questionZh": "日本新干线子弹头列车的车头设计灵感来自于哪种鸟类的喙？",
      "optionsEn": [
        "The Peregrine Falcon",
        "The Great Horned Owl",
        "The Emperor Penguin",
        "The Kingfisher bird"
      ],
      "optionsZh": [
        "游隼",
        "大雕鸮",
        "帝企鹅",
        "翠鸟"
      ],
      "correctIndex": 3,
      "explanationEn": "Eiji Nakatsu, a train engineer and birdwatcher, modeled the nose after the kingfisher diving into water without splashing!",
      "explanationZh": "列车总工程师兼观鸟爱好者中津英司发现翠鸟扎入水中时水花极小，成功解决了隧道风阻和爆音！"
    }
  },
  {
    "id": "australia",
    "nameEn": "Australia",
    "nameZh": "澳大利亚",
    "flag": "🇦🇺",
    "capitalEn": "Canberra",
    "capitalZh": "堪培拉",
    "taglineEn": "The Land Down Under",
    "taglineZh": "独特的袋鼠与考拉王国",
    "category": "Oceania",
    "funFactEn": "Wombats are the only known animals on Earth that produce cube-shaped poop! They stack their cubic droppings on rocks to mark territory so they don’t roll away.",
    "funFactZh": "袋熊（Wombat）是地球上唯一已知拉出“正方体”便便的动物！它们将棱角分明的方块便便堆在石头高处标记领地，这样便便就不会滚落山坡。",
    "badgeTitleEn": "Outback Pioneer Badge",
    "badgeTitleZh": "旷野先锋勋章",
    "quiz": {
      "questionEn": "What geometric shape is the poop of an Australian wombat?",
      "questionZh": "澳大利亚袋熊拉出的便便是什么独特的几何形状？",
      "optionsEn": [
        "Spherical spheres",
        "Flat triangular prisms",
        "Perfect cubes",
        "Cylinders"
      ],
      "optionsZh": [
        "完美球体",
        "扁平三棱柱",
        "正方体",
        "细长圆柱体"
      ],
      "correctIndex": 2,
      "explanationEn": "Wombats have unique elastic grooves in their intestines that shape poop into cubes so they don’t roll off rocks!",
      "explanationZh": "袋熊肠道末端具有特殊的弹性沟槽收缩机制，能将便便挤压成方块，防止从岩石滚落！"
    }
  },
  {
    "id": "united-kingdom",
    "nameEn": "United Kingdom",
    "nameZh": "英国",
    "flag": "🇬🇧",
    "capitalEn": "London",
    "capitalZh": "伦敦",
    "taglineEn": "Castles & Mythical Legends",
    "taglineZh": "古堡与神话传奇之地",
    "category": "Europe",
    "funFactEn": "The official national animal of Scotland in the United Kingdom is the mythical Unicorn! In Celtic mythology, unicorns represent purity, strength, and wild freedom.",
    "funFactZh": "英国苏格兰的官方国兽竟然是神话中的“独角兽”（Unicorn）！在古凯尔特神话中，独角兽象征着纯洁、无畏的力量与不羁的自由。",
    "badgeTitleEn": "Royal Unicorn Badge",
    "badgeTitleZh": "皇家独角兽勋章",
    "quiz": {
      "questionEn": "What is the official national animal of Scotland?",
      "questionZh": "苏格兰官方的国家象征动物是什么？",
      "optionsEn": [
        "The Golden Eagle",
        "The Unicorn",
        "The Highland Cow",
        "The Red Fox"
      ],
      "optionsZh": [
        "金雕",
        "独角兽",
        "苏格兰高地牛",
        "红狐狸"
      ],
      "correctIndex": 1,
      "explanationEn": "Proudly featured on the Scottish Royal Coat of Arms, the mythical unicorn has been Scotland’s national symbol since the 12th century!",
      "explanationZh": "苏格兰自 12 世纪起就将神圣无畏的独角兽作为国家徽章标志！"
    }
  },
  {
    "id": "france",
    "nameEn": "France",
    "nameZh": "法国",
    "flag": "🇫🇷",
    "capitalEn": "Paris",
    "capitalZh": "巴黎",
    "taglineEn": "Art, History & Thermal Expansion",
    "taglineZh": "浪漫之都与神奇的热胀冷缩",
    "category": "Europe",
    "funFactEn": "Because iron expands in the heat, the Eiffel Tower can grow up to 15 centimeters (6 inches) taller during hot summer days!",
    "funFactZh": "由于金属的热胀冷缩原理，巴黎埃菲尔铁塔在炎热的夏天竟然会长高多达 15 厘米（约 6 英寸）！",
    "badgeTitleEn": "Eiffel Engineer Badge",
    "badgeTitleZh": "埃菲尔工程小达人勋章",
    "quiz": {
      "questionEn": "Why does the Eiffel Tower grow taller in the summer?",
      "questionZh": "为什么埃菲尔铁塔在夏天会长高多达 15 厘米？",
      "optionsEn": [
        "Thermal expansion causes the iron metal to expand",
        "Workers add new antennas each July",
        "Heavy winter snow pushes it down",
        "The river Seine floods underneath"
      ],
      "optionsZh": [
        "夏日高温让钢铁发生热胀冷缩从而延展",
        "每年七月工人们会给塔顶加装新天线",
        "冬天的厚重积雪将铁塔压低了",
        "塞纳河夏季涨潮将地基顶高了"
      ],
      "correctIndex": 0,
      "explanationEn": "Thermal expansion is real physics! Heat gives iron atoms more energy, causing them to spread out slightly.",
      "explanationZh": "这是热胀冷缩的典型物理现象！铁分子吸收热量振动加剧，使整个金属结构在夏季微微膨胀长高。"
    }
  },
  {
    "id": "iceland",
    "nameEn": "Iceland",
    "nameZh": "冰岛",
    "flag": "🇮🇸",
    "capitalEn": "Reykjavik",
    "capitalZh": "雷克雅未克",
    "taglineEn": "The Land of Fire and Ice",
    "taglineZh": "火山与冰川交织的净土",
    "category": "Europe",
    "funFactEn": "Iceland is one of the only inhabited places on Earth with zero mosquitoes! The rapid freeze-thaw cycles prevent mosquito larvae from completing their life cycle.",
    "funFactZh": "冰岛是地球上极少数完全没有蚊子繁衍的人类居住地！频繁突变的高纬度冻融天气，让蚊子幼虫根本无法存活发育。",
    "badgeTitleEn": "Glacier Shield Badge",
    "badgeTitleZh": "冰川守护盾勋章",
    "quiz": {
      "questionEn": "Which common annoying insect does NOT exist in Iceland?",
      "questionZh": "冰岛全岛完全不存在哪种我们在夏日经常见到的讨厌昆虫？",
      "optionsEn": [
        "Honeybees",
        "Ants",
        "Ladybugs",
        "Mosquitoes"
      ],
      "optionsZh": [
        "蜜蜂",
        "工蚁",
        "七星瓢虫",
        "蚊子"
      ],
      "correctIndex": 3,
      "explanationEn": "Iceland’s oceanic climate undergoes multiple rapid freeze-thaw cycles that break the mosquito breeding cycle completely.",
      "explanationZh": "冰岛奇特的高温温泉与寒潮骤变气候，让蚊子无法完成从水生幼虫到成虫的生命周期！"
    }
  },
  {
    "id": "egypt",
    "nameEn": "Egypt",
    "nameZh": "埃及",
    "flag": "🇪🇬",
    "capitalEn": "Cairo",
    "capitalZh": "开罗",
    "taglineEn": "Pyramids, Pharaohs & The Nile",
    "taglineZh": "金字塔与古老尼罗河文明",
    "category": "Africa",
    "funFactEn": "The Great Pyramid of Giza was built so accurately that its four base sides align with true geographic North, South, East, and West with less than a fraction of a degree error!",
    "funFactZh": "胡夫金字塔的四面基座方向惊人精准，它与地球正东、正南、正西、正北的偏差竟然不足十五分之一度！",
    "badgeTitleEn": "Pharaoh Compass Badge",
    "badgeTitleZh": "法老司南罗盘勋章",
    "quiz": {
      "questionEn": "How are the sides of the Great Pyramid of Giza aligned?",
      "questionZh": "吉萨胡夫大金字塔的四个基准面是怎样排列朝向的？",
      "optionsEn": [
        "Facing the Sunrise and Sunset randomly",
        "Aligned in a spiral circle",
        "Aligned almost perfectly with True Cardinal North, South, East, West",
        "Parallel with the equator only"
      ],
      "optionsZh": [
        "随机朝向日出和日落方向",
        "按神秘螺旋圆形分布",
        "几乎完美对齐地球正东、正南、正西、正北四个基本方位",
        "仅与赤道保持平行"
      ],
      "correctIndex": 2,
      "explanationEn": "Ancient Egyptian engineers used circumpolar stars to achieve jaw-dropping mathematical and astronomical alignment 4,500 years ago!",
      "explanationZh": "4500年前的古埃及工程师通过观察北极拱极星，达到了令现代科学家赞叹的惊人天文定位！"
    }
  },
  {
    "id": "kenya",
    "nameEn": "Kenya",
    "nameZh": "肯尼亚",
    "flag": "🇰🇪",
    "capitalEn": "Nairobi",
    "capitalZh": "内罗毕",
    "taglineEn": "Savanna Wildlife & Great Migration",
    "taglineZh": "东非大草原与动物大迁徙",
    "category": "Africa",
    "funFactEn": "Every year in Kenya’s Masai Mara, over 1.5 million wildebeest and zebras embark on the Great Migration, crossing crocodile-filled rivers together in giant herds!",
    "funFactZh": "每年在肯尼亚马赛马拉国家保护区，超过 150 万头角马和斑马会展开波澜壮阔的动物大迁徙，成群结队渡过满是鳄鱼的马拉河！",
    "badgeTitleEn": "Savanna Runner Badge",
    "badgeTitleZh": "草原飞跃勋章",
    "quiz": {
      "questionEn": "Approximately how many wildebeest take part in the famous Great Migration in East Africa?",
      "questionZh": "东非著名的野生动物大迁徙中，大约有多少头角马参与其中？",
      "optionsEn": [
        "About 10,000",
        "Over 1.5 million",
        "Around 50,000",
        "Exactly 500"
      ],
      "optionsZh": [
        "大约 1 万头",
        "超过 150 万头",
        "大约 5 万头",
        "恰好 500 头"
      ],
      "correctIndex": 1,
      "explanationEn": "Over 1.5 million wildebeest follow the rains across the Serengeti and Masai Mara every single year!",
      "explanationZh": "每年超过 150 万头角马追寻丰美的青草与水源，构成了地球上最壮丽的生命巡游！"
    }
  },
  {
    "id": "brazil",
    "nameEn": "Brazil",
    "nameZh": "巴西",
    "flag": "🇧🇷",
    "capitalEn": "Brasilia",
    "capitalZh": "巴西利亚",
    "taglineEn": "The Lungs of Planet Earth",
    "taglineZh": "地球之肺亚马逊与足球王国",
    "category": "Americas",
    "funFactEn": "The Amazon River in Brazil is home to the Boto — rare wild freshwater river dolphins that are naturally pink!",
    "funFactZh": "流经巴西的亚马逊河栖息着神奇的亚河豚（Boto）——它们是世界上少有的野生淡水海豚，皮肤天然呈现粉红色！",
    "badgeTitleEn": "Amazon Navigator Badge",
    "badgeTitleZh": "亚马逊水手勋章",
    "quiz": {
      "questionEn": "What unusual color is the famous freshwater dolphin found in the Amazon River?",
      "questionZh": "亚马逊河中生活着一种世界闻名的淡水海豚，它的皮肤是什么奇特颜色？",
      "optionsEn": [
        "Vibrant Pink",
        "Bright Yellow",
        "Emerald Green",
        "Pitch Black"
      ],
      "optionsZh": [
        "天然粉红色",
        "明亮柠檬黄",
        "翠绿翡翠色",
        "纯黑色"
      ],
      "correctIndex": 0,
      "explanationEn": "The Amazon pink river dolphin (Boto) gains its distinct pink tint as it grows and plays in the river water!",
      "explanationZh": "亚马逊粉红河豚随着年龄增长毛细血管更加丰沛，呈现出迷人又独特的粉红色彩！"
    }
  },
  {
    "id": "italy",
    "nameEn": "Italy",
    "nameZh": "意大利",
    "flag": "🇮🇹",
    "capitalEn": "Rome",
    "capitalZh": "罗马",
    "taglineEn": "Floating Canals & Delicious Pizza",
    "taglineZh": "水城威尼斯与美味披萨之乡",
    "category": "Europe",
    "funFactEn": "The city of Venice in Italy is built on 118 small islands linked by over 400 bridges and has zero cars — everyone travels by boat or walking!",
    "funFactZh": "意大利威尼斯整座城市建立在 118 个小岛之上，由 400 多座桥梁连接，城内完全没有汽车，所有人出行只能乘船或步行！",
    "badgeTitleEn": "Gondola Captain Badge",
    "badgeTitleZh": "贡多拉小舵手勋章",
    "quiz": {
      "questionEn": "How do people travel through the streets of historic Venice, Italy?",
      "questionZh": "在意大利历史名城威尼斯的街区里，人们主要的出行交通方式是什么？",
      "optionsEn": [
        "By subway train only",
        "By horseback on wooden tracks",
        "By electric cars and buses",
        "By boats along canals or walking on foot"
      ],
      "optionsZh": [
        "仅靠深层地下铁",
        "在木质轨道上骑马",
        "乘坐电动小汽车和城市公交",
        "乘小船水路穿行或徒步走石桥"
      ],
      "correctIndex": 3,
      "explanationEn": "Venice has canals instead of roads, so people travel by gondola, water bus (vaporetto), or across its 400+ stone bridges!",
      "explanationZh": "威尼斯是一座没有柏油马路的水上城市，大家出行靠贡多拉水运、水上巴士和步行桥！"
    }
  },
  {
    "id": "mexico",
    "nameEn": "Mexico",
    "nameZh": "墨西哥",
    "flag": "🇲🇽",
    "capitalEn": "Mexico City",
    "capitalZh": "墨西哥城",
    "taglineEn": "Pyramids, Chirping Echoes & Cocoa",
    "taglineZh": "玛雅金字塔与可可巧克力的摇篮",
    "category": "Americas",
    "funFactEn": "If you clap your hands at the base of the Mayan El Castillo pyramid in Chichen Itza, the acoustic echo sounds exactly like the chirping call of the sacred Quetzal bird!",
    "funFactZh": "如果你在奇琴伊察玛雅羽蛇神金字塔底击掌，阶梯反射出的回音听起来就像玛雅神鸟“凤尾绿咬鹃”（Quetzal）清脆的鸟鸣声！",
    "badgeTitleEn": "Maya Acoustic Badge",
    "badgeTitleZh": "玛雅声学探索勋章",
    "quiz": {
      "questionEn": "What does the acoustic echo sound like when you clap at the base of the El Castillo pyramid?",
      "questionZh": "在奇琴伊察羽蛇神金字塔前鼓掌，神奇的回音听起来像什么？",
      "optionsEn": [
        "A howling desert coyote",
        "A crack of thunder",
        "The chirp of a sacred Quetzal bird",
        "A beating battle drum"
      ],
      "optionsZh": [
        "荒原郊狼的嚎叫",
        "震耳欲聋的雷声",
        "神圣凤尾绿咬鹃的清脆啼鸣",
        "铿锵沉稳的战鼓"
      ],
      "correctIndex": 2,
      "explanationEn": "The staircase steps were mathematically engineered to create frequency-dependent chirping sound reflections!",
      "explanationZh": "古玛雅建造者精妙计算了每个台阶的宽度和仰角，使回音产生高频颤音声学奇观！"
    }
  },
  {
    "id": "peru",
    "nameEn": "Peru",
    "nameZh": "秘鲁",
    "flag": "🇵🇪",
    "capitalEn": "Lima",
    "capitalZh": "利马",
    "taglineEn": "Machu Picchu & Rainbow Mountains",
    "taglineZh": "马丘比丘与安第斯彩虹山",
    "category": "Americas",
    "funFactEn": "Inca builders at Machu Picchu carved giant stone blocks so precisely that they fit together without any mortar — you cannot even slide a piece of paper between them!",
    "funFactZh": "马丘比丘的印加石匠不用任何粘合泥浆，能把数十吨的巨石打磨契合得严丝合缝——连薄薄的一张纸都插不进去，还能防震！",
    "badgeTitleEn": "Inca Architect Badge",
    "badgeTitleZh": "印加建筑奇才勋章",
    "quiz": {
      "questionEn": "How were the stones of Machu Picchu held together?",
      "questionZh": "马丘比丘的高山石造建筑是用什么粘合固定的？",
      "optionsEn": [
        "Clay and straw cement",
        "Precision stone-cutting with zero mortar",
        "Melted gold poured in joints",
        "Pine resin glue"
      ],
      "optionsZh": [
        "厚泥土与干稻草泥浆",
        "严丝合缝的精密切削石块",
        "浇筑融化黄金的石缝",
        "天然松树树脂粘合"
      ],
      "correctIndex": 1,
      "explanationEn": "Ashlar masonry technique: Inca masons carved rocks to interlock tightly, absorbing earthquake tremors harmlessly!",
      "explanationZh": "这种印加干砌石技术不仅无浆严密，更能在地震发生时微微晃动后复位，历经大地震安然无恙！"
    }
  },
  {
    "id": "india",
    "nameEn": "India",
    "nameZh": "印度",
    "flag": "🇮🇳",
    "capitalEn": "New Delhi",
    "capitalZh": "新德里",
    "taglineEn": "Birthplace of Zero & Chess",
    "taglineZh": "发明数字“0”与国际象棋的智慧之邦",
    "category": "Asia",
    "funFactEn": "Mathematicians in ancient India invented the numeral \"0\" (Zero) as both a placeholder and a number in calculations, revolutionizing mathematics for humanity!",
    "funFactZh": "古代印度的伟大数学家发明了数字“0”（Zero），不仅作为占位符，更作为独立参与四则运算的数，彻底变革了整个人类数学史！",
    "badgeTitleEn": "Zero Mastermind Badge",
    "badgeTitleZh": "数字“0”智慧大师勋章",
    "quiz": {
      "questionEn": "Which foundational mathematical concept was invented by mathematicians in ancient India?",
      "questionZh": "哪项至关重要的基础数学概念是由古代印度学者最先提出并系统运用的？",
      "optionsEn": [
        "The decimal number \"0\" (Zero)",
        "The metric kilogram",
        "Calculus integrals",
        "The protractor"
      ],
      "optionsZh": [
        "数字“0”的独立概念与运算法则",
        "公制千克标准",
        "微积分导数",
        "量角器几何刻度"
      ],
      "correctIndex": 0,
      "explanationEn": "Ancient Indian mathematician Brahmagupta in 628 CE first defined arithmetic rules for operating with zero!",
      "explanationZh": "公元 628 年古印度数学家婆罗摩笈多首次系统制定了关于数字 0 的四则加减乘除法则！"
    }
  },
  {
    "id": "united-states",
    "nameEn": "United States",
    "nameZh": "美国",
    "flag": "🇺🇸",
    "capitalEn": "Washington, D.C.",
    "capitalZh": "华盛顿特区",
    "taglineEn": "National Parks & Moon Explorers",
    "taglineZh": "黄石地热国家公园与登月先驱",
    "category": "Americas",
    "funFactEn": "Yellowstone, established in 1872, was the world’s very first national park! It contains over half of all the geysers on Earth, including \"Old Faithful\".",
    "funFactZh": "建立于 1872 年的黄石国家公园是世界上第一个国家公园！它囊括了地球上超过一半的地热间歇泉，包括著名的“老忠实泉”。",
    "badgeTitleEn": "Yellowstone Ranger Badge",
    "badgeTitleZh": "黄石守护巡林员勋章",
    "quiz": {
      "questionEn": "What historic title does Yellowstone National Park hold?",
      "questionZh": "黄石国家公园在世界自然保护历史上拥有哪项第一？",
      "optionsEn": [
        "The largest forest on Earth",
        "The only place with wild polar bears",
        "The highest mountain peak in North America",
        "The world’s very first national park"
      ],
      "optionsZh": [
        "全球面积最大的自然森林",
        "唯一拥有野生北极熊的地区",
        "北美洲海拔最高的山峰所在地",
        "世界上第一个国家公园"
      ],
      "correctIndex": 3,
      "explanationEn": "Yellowstone was founded in 1872 as the world’s pioneer national park to preserve geothermal wonders and wildlife.",
      "explanationZh": "1872 年黄石公园创立，开创了人类划定国家公园保护珍贵地热奇观与野生动植物的先河！"
    }
  },
  {
    "id": "antarctica",
    "nameEn": "Antarctica",
    "nameZh": "南极洲",
    "flag": "🇦🇶",
    "capitalEn": "No Capital (Global Science Stations)",
    "capitalZh": "无首都（国际极地科研站）",
    "taglineEn": "The Coldest, Windiest Desert",
    "taglineZh": "地球最寒冷纯净的冰雪荒漠",
    "category": "Polar",
    "funFactEn": "Even though it is covered in ice miles thick, Antarctica is scientifically classified as the world’s largest desert because it receives almost no rain or fresh snowfall!",
    "funFactZh": "尽管表面覆盖着数千米厚的万年冰盖，在气候学上南极洲却是地球上最大的“荒漠/沙漠”，因为内陆年降水量几乎为零，空气极其干燥！",
    "badgeTitleEn": "Polar Frost Master Badge",
    "badgeTitleZh": "极地冰雪大师勋章",
    "quiz": {
      "questionEn": "Why is ice-covered Antarctica scientifically classified as a desert?",
      "questionZh": "为什么被深厚冰雪覆盖的南极洲，在地理气候学上却被定义为世界上最大的“荒漠”？",
      "optionsEn": [
        "Because sand covers the coastlines",
        "Because no animals live there",
        "Because it receives extremely low precipitation (almost zero rain/snow)",
        "Because plants turn into cactus plants"
      ],
      "optionsZh": [
        "因为其沿海全被黄沙覆盖",
        "因为没有任何生命能在那里生存",
        "因为其年降水量极低、极其干燥",
        "因为所有的极地植物都是仙人掌"
      ],
      "correctIndex": 2,
      "explanationEn": "Deserts are defined by precipitation levels (< 250 mm/year), not temperature! Antarctica’s interior is extraordinarily dry.",
      "explanationZh": "荒漠沙漠的科学定义取决于极低的年降水量（每年小于 250 毫米），而与温度冷热无关！"
    }
  }
];

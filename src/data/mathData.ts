export type DifficultyTier = 'easy' | 'med' | 'boss' | 'olympiad';

export interface VisualData {
  type: 'array' | 'number-line' | 'fraction' | 'geometry' | 'balance' | 'money' | 'grid' | 'table';
  content: string;
  subtext?: string;
}

export interface QuestionItem {
  id: string;
  tier: DifficultyTier;
  tierLabelEn: string;
  tierLabelZh: string;
  questionEn: string;
  questionZh: string;
  optionsEn: string[];
  optionsZh: string[];
  correctIndex: number;
  secretClueEn: string;
  secretClueZh: string;
  explanationEn: string;
  explanationZh: string;
  visual?: VisualData;
}

export interface WeekTopic {
  week: number;
  season: 'Autumn Harbor' | 'Winter Glacier' | 'Spring Expedition' | 'Summer Lighthouse';
  strandKey: 'number' | 'geometry' | 'data' | 'operations' | 'fractions' | 'algebra' | 'measurement' | 'financial' | 'coding';
  strandEn: string;
  strandZh: string;
  titleEn: string;
  titleZh: string;
  landmark: string;
  landmarkZh: string;
  descriptionEn: string;
  descriptionZh: string;
  questions: QuestionItem[];
}

export const WRDSB_WEEKS: WeekTopic[] = [
  {
    "week": 1,
    "season": "Autumn Harbor",
    "strandKey": "number",
    "strandEn": "Number Sense",
    "strandZh": "数感与位值",
    "titleEn": "Mariner Place Value Patrol",
    "titleZh": "水手万以内数位巡航",
    "landmark": "Millen Woods Public School",
    "landmarkZh": "米伦伍兹公立学校",
    "descriptionEn": "Explore 4-digit numbers up to 10,000 using standard and expanded form around Millen Woods!",
    "descriptionZh": "掌握万以内四位数的标准读写与数位展开式，开启水手新学期！",
    "questions": [
      {
        "id": "w1-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "In the number 4,382, what is the value of the digit 3?",
        "questionZh": "在数字 4,382 中，数字 3 的数值是多少？",
        "optionsEn": [
          "3",
          "30",
          "300",
          "3,000"
        ],
        "optionsZh": [
          "3",
          "30",
          "300（百位）",
          "3,000"
        ],
        "correctIndex": 2,
        "secretClueEn": "Look at the place column: 2 is ones, 8 is tens, 3 is hundreds, 4 is thousands.",
        "secretClueZh": "看看数位表：2 是个位，8 是十位，3 位于百位（Hundreds）。",
        "explanationEn": "The 3 is in the hundreds column, which means it represents 3 × 100 = 300.",
        "explanationZh": "数字 3 位于百位，代表 3 个 100，即 300。",
        "visual": {
          "type": "table",
          "content": "Th: 4 | H: 3 | T: 8 | O: 2",
          "subtext": "Place Value Chart"
        }
      },
      {
        "id": "w1-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "Millen Woods library logged 2 thousands, 14 tens, and 5 ones of books. What number is this?",
        "questionZh": "米伦伍兹图书馆登记了 2 个千、14 个十和 5 个一，这是多少本书？",
        "optionsEn": [
          "2,154",
          "2,045",
          "2,140",
          "2,145"
        ],
        "optionsZh": [
          "2,154 本",
          "2,045 本",
          "2,140 本",
          "2,145 本"
        ],
        "correctIndex": 3,
        "secretClueEn": "14 tens = 140. Add that to 2,000 and 5: 2,000 + 140 + 5.",
        "secretClueZh": "14 个十等于 140。把它和 2,000 与 5 相加：2,000 + 140 + 5。",
        "explanationEn": "2,000 + 140 + 5 = 2,145 books.",
        "explanationZh": "2,000 + 140 + 5 = 2,145 本。"
      },
      {
        "id": "w1-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "Which decomposition of 5,720 is NOT correct?",
        "questionZh": "下面哪一种对 5,720 的拆解方式是错误的？",
        "optionsEn": [
          "5 thousands + 7 hundreds + 2 tens",
          "4 thousands + 17 hundreds + 20 ones",
          "57 hundreds + 2 tens",
          "5 thousands + 70 tens + 2 ones"
        ],
        "optionsZh": [
          "5 个千 + 7 个百 + 2 个十",
          "4 个千 + 17 个百 + 20 个一",
          "57 个百 + 2 个十",
          "5 个千 + 70 个十 + 2 个一"
        ],
        "correctIndex": 3,
        "secretClueEn": "5,000 + (70 × 10 = 700) + 2 = 5,702, not 5,720!",
        "secretClueZh": "5,000 + 700 + 2 = 5,702，不是 5,720！",
        "explanationEn": "70 tens + 2 ones is 702, giving 5,702 which misses 18!",
        "explanationZh": "70 个十加 2 个一等于 702，总和是 5,702，因此该选项不正确。"
      },
      {
        "id": "w1-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "I am a 4-digit number. My thousands digit is double my ones digit. The sum of all digits is 15. Thousands is 6, tens is 1. What am I?",
        "questionZh": "我是一个四位数。千位是个位的2倍，千位是6，十位是1，所有数位和是15。我是谁？",
        "optionsEn": [
          "6,313",
          "6,513",
          "6,413",
          "6,613"
        ],
        "optionsZh": [
          "6,313",
          "6,513",
          "6,413",
          "6,613"
        ],
        "correctIndex": 1,
        "secretClueEn": "If thousands is 6, ones = 6 ÷ 2 = 3. Tens is 1. Sum so far = 6 + 1 + 3 = 10. Hundreds = 15 - 10.",
        "secretClueZh": "千位是6，个位就是 6 ÷ 2 = 3。已知十位是1，已占 6+1+3=10，所以百位是 15 - 10 = 5。",
        "explanationEn": "Digits are 6 (thousands), 5 (hundreds), 1 (tens), 3 (ones) = 6,513. Sum: 6+5+1+3 = 15!",
        "explanationZh": "千位6、百位5、十位1、个位3，数字是 6,513。"
      },
      {
        "id": "w1-q5",
        "tier": "med",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "How do you write \"Eight thousand forty-nine\" in standard form?",
        "questionZh": "“八千零四十九”的标准数字写法是什么？",
        "optionsEn": [
          "8,490",
          "8,049",
          "8,409",
          "8,499"
        ],
        "optionsZh": [
          "8,490",
          "8,049",
          "8,409",
          "8,499"
        ],
        "correctIndex": 1,
        "secretClueEn": "Notice there are 0 hundreds! 8 thousands, 0 hundreds, 4 tens, 9 ones.",
        "secretClueZh": "注意百位上是 0！8 个千、0 个百、4 个十、9 个一。",
        "explanationEn": "8 thousands (8), 0 hundreds (0), 4 tens and 9 ones (49) = 8,049.",
        "explanationZh": "8,000 + 49 = 8,049。"
      }
    ]
  },
  {
    "week": 2,
    "season": "Autumn Harbor",
    "strandKey": "number",
    "strandEn": "Number Sense",
    "strandZh": "数位比较与排序",
    "titleEn": "Comparing & Ordering Mariners Fleet",
    "titleZh": "水手舰队战舰吨位大比拼",
    "landmark": "Laurel Creek Conservation Area",
    "landmarkZh": "月桂溪保护区",
    "descriptionEn": "Compare 4-digit numbers using <, >, and = along Laurel Creek trails!",
    "descriptionZh": "掌握四位数的比较与由小到大排序，观察月桂溪自然保护区的小动物数据！",
    "questions": [
      {
        "id": "w2-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "Which comparison symbol correctly fills the blank: 3,429 ___ 3,492?",
        "questionZh": "哪个比较符号能正确填入空格：3,429 ___ 3,492？",
        "optionsEn": [
          "<",
          ">",
          "=",
          "+"
        ],
        "optionsZh": [
          "<（小于）",
          ">（大于）",
          "=",
          "+"
        ],
        "correctIndex": 0,
        "secretClueEn": "Both have 3 thousands and 4 hundreds. Compare tens: 2 tens vs 9 tens.",
        "secretClueZh": "千位和百位都是 3 和 4。比较十位：2 个十小于 9 个十。",
        "explanationEn": "20 is less than 90, so 3,429 < 3,492.",
        "explanationZh": "十位上 2 < 9，因此 3,429 < 3,492。"
      },
      {
        "id": "w2-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "Order these numbers from least to greatest: 6,032; 6,320; 6,023; 6,203.",
        "questionZh": "将这组数从小到大升序排列：6,032；6,320；6,023；6,203。",
        "optionsEn": [
          "6,032 < 6,023 < 6,203 < 6,320",
          "6,023 < 6,032 < 6,203 < 6,320",
          "6,320 < 6,203 < 6,032 < 6,023",
          "6,023 < 6,203 < 6,032 < 6,320"
        ],
        "optionsZh": [
          "6,032 < 6,023 < 6,203 < 6,320",
          "6,023 < 6,032 < 6,203 < 6,320",
          "6,320 < 6,203 < 6,032 < 6,023",
          "6,023 < 6,203 < 6,032 < 6,320"
        ],
        "correctIndex": 1,
        "secretClueEn": "Smallest hundreds first: 6,023 and 6,032. 23 is less than 32.",
        "secretClueZh": "百位为0的先排：23 比 32 小，所以 6,023 最小，接着 6,032。",
        "explanationEn": "6,023 < 6,032 < 6,203 < 6,320.",
        "explanationZh": "由百位与十位逐位比较可知正确的升序排列。"
      },
      {
        "id": "w2-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "Fill in the blank digit to make this statement true: 4,_58 > 4,758.",
        "questionZh": "在百位空格中填入什么数字能使不等式成立：4,_58 > 4,758？",
        "optionsEn": [
          "6",
          "7",
          "8 or 9",
          "5"
        ],
        "optionsZh": [
          "6",
          "7",
          "8 或 9",
          "5"
        ],
        "correctIndex": 2,
        "secretClueEn": "The thousands (4) and tens/ones (58) match. The blank must be greater than 7.",
        "secretClueZh": "千位相同，十位个位也相同（58）。要比 7 大，百位必须是 8 或 9。",
        "explanationEn": "Only digits 8 or 9 are strictly greater than 7 in the hundreds place.",
        "explanationZh": "百位填 8 或 9 时，4,858 或 4,958 均大于 4,758。"
      },
      {
        "id": "w2-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "How many 4-digit numbers can you form using 2, 0, 4, 7 (each digit once) that are greater than 4,000?",
        "questionZh": "用数字 2, 0, 4, 7（每个只用一次）能组成多少个大于 4,000 的四位数？",
        "optionsEn": [
          "6",
          "12",
          "18",
          "24"
        ],
        "optionsZh": [
          "6 个",
          "12 个",
          "18 个",
          "24 个"
        ],
        "correctIndex": 1,
        "secretClueEn": "Thousands digit can be 4 or 7. For each choice, how many ways to arrange the other 3 digits?",
        "secretClueZh": "千位数只能是 4 或 7（共2种选择）。对于每种选择，剩下的3个数字有 3 × 2 × 1 = 6 种排法。",
        "explanationEn": "Thousands digit can be 4 (6 permutations) or 7 (6 permutations). 6 + 6 = 12 numbers.",
        "explanationZh": "千位选 4 有 6 种，千位选 7 有 6 种，总共 2 × 6 = 12 个数。"
      },
      {
        "id": "w2-q5",
        "tier": "med",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "Which number is between 7,850 and 7,920?",
        "questionZh": "下列哪个数位于 7,850 与 7,920 之间？",
        "optionsEn": [
          "7,849",
          "7,905",
          "7,925",
          "7,809"
        ],
        "optionsZh": [
          "7,849",
          "7,905",
          "7,925",
          "7,809"
        ],
        "correctIndex": 1,
        "secretClueEn": "7,905 is bigger than 7,850 and smaller than 7,920.",
        "secretClueZh": "7,905 大于 7,850，且小于 7,920。",
        "explanationEn": "7,850 < 7,905 < 7,920.",
        "explanationZh": "7,905 处于这个区间内。"
      }
    ]
  },
  {
    "week": 3,
    "season": "Autumn Harbor",
    "strandKey": "number",
    "strandEn": "Number Sense",
    "strandZh": "数轴与四舍五入",
    "titleEn": "ION Light Rail Number Line Rounding",
    "titleZh": "ION 轻轨数轴与四舍五入探秘",
    "landmark": "ION LRT Conestoga Station",
    "landmarkZh": "ION 轻轨 Conestoga 总站",
    "descriptionEn": "Master rounding to the nearest 10, 100, and 1,000 using the ION Light Rail stations number line!",
    "descriptionZh": "借助滑铁卢 ION 轻轨车站数轴，精通向十位、百位和千位四舍五入！",
    "questions": [
      {
        "id": "w3-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "Round 3,467 to the nearest 100.",
        "questionZh": "将 3,467 四舍五入到最近的百位。",
        "optionsEn": [
          "3,400",
          "3,460",
          "3,500",
          "4,000"
        ],
        "optionsZh": [
          "3,400",
          "3,460",
          "3,500",
          "4,000"
        ],
        "correctIndex": 2,
        "secretClueEn": "Look at the tens digit: 6. Since 6 ≥ 5, round UP to 500!",
        "secretClueZh": "看十位上的数字：6。因为 6 ≥ 5，向百位进 1，变成 3,500！",
        "explanationEn": "3,467 is closer to 3,500 than to 3,400 on the number line.",
        "explanationZh": "3,467 在数轴上更靠近 3,500。",
        "visual": {
          "type": "number-line",
          "content": "3,400 ─── 3,450 ─[3,467]─ 3,500",
          "subtext": "Closer to 3,500!"
        }
      },
      {
        "id": "w3-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "The ION train carried 4,500 passengers rounded to the nearest 100. What is the SMALLEST possible actual passenger count?",
        "questionZh": "ION 轻轨今日客流四舍五入到百位后是 4,500 人。实际乘客数最小可能是多少？",
        "optionsEn": [
          "4,449",
          "4,450",
          "4,495",
          "4,549"
        ],
        "optionsZh": [
          "4,449 人",
          "4,450 人（逆向极小值）",
          "4,495 人",
          "4,549 人"
        ],
        "correctIndex": 1,
        "secretClueEn": "To round UP to 4,500, the tens digit must be at least 5. The smallest is 4,450.",
        "secretClueZh": "四舍五入能“进位”到 4,500 的最小数，十位必须从 5 开始，即 4,450。",
        "explanationEn": "Any number from 4,450 to 4,549 rounds to 4,500 to the nearest 100. The smallest is 4,450!",
        "explanationZh": "4,450 到 4,549 四舍五入到百位都是 4,500，其中最小的是 4,450。"
      },
      {
        "id": "w3-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "What is the LARGEST whole number that rounds to 8,000 when rounded to the nearest 1,000?",
        "questionZh": "四舍五入到最近的千位后是 8,000 的最大整数是多少？",
        "optionsEn": [
          "8,499",
          "8,500",
          "8,999",
          "8,450"
        ],
        "optionsZh": [
          "8,499（逆向极大值）",
          "8,500",
          "8,999",
          "8,450"
        ],
        "correctIndex": 0,
        "secretClueEn": "8,500 would round UP to 9,000! So the largest that stays at 8,000 is 8,499.",
        "secretClueZh": "8,500 就会进位到 9,000 了！因此舍去百位的最大数是 8,499。",
        "explanationEn": "8,499 has a 4 in the hundreds place, so it rounds down to 8,000. 8,500 rounds to 9,000.",
        "explanationZh": "百位最大只能填 4，因此最大数是 8,499。"
      },
      {
        "id": "w3-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "A number rounds to 300 to the nearest 10, and to 300 to the nearest 100. How many such whole numbers exist?",
        "questionZh": "一个整数四舍五入到十位是 300，且四舍五入到百位也是 300。这样的整数一共有多少个？",
        "optionsEn": [
          "5",
          "9",
          "10",
          "15"
        ],
        "optionsZh": [
          "5 个",
          "9 个",
          "10 个（295 到 304）",
          "15 个"
        ],
        "correctIndex": 2,
        "secretClueEn": "Nearest 10 is 300: 295 to 304 (10 numbers). Do all of these also round to 300 to the nearest 100?",
        "secretClueZh": "四舍五入到十位是 300 的数是 295 到 304（共 10 个）。这 10 个数四舍五入到百位也是 300 吗？是的！",
        "explanationEn": "Numbers 295, 296, 297, 298, 299, 300, 301, 302, 303, 304 all satisfy both conditions: exactly 10 numbers!",
        "explanationZh": "满足四舍五入到十位是 300 的有 295～304 共 10 个数，它们四舍五入到百位也全部是 300。"
      },
      {
        "id": "w3-q5",
        "tier": "med",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "Round 6,973 to the nearest 10.",
        "questionZh": "将 6,973 四舍五入到最近的十位。",
        "optionsEn": [
          "7,000",
          "6,980",
          "6,970",
          "6,900"
        ],
        "optionsZh": [
          "7,000",
          "6,980",
          "6,970",
          "6,900"
        ],
        "correctIndex": 2,
        "secretClueEn": "Look at the ones digit: 3. Since 3 < 5, round down to 70.",
        "secretClueZh": "看个位数：3。因为 3 < 5，四舍，所以十位保持 70。",
        "explanationEn": "3 is less than 5, so 6,973 rounds down to 6,970.",
        "explanationZh": "个位为 3，舍去得 6,970。"
      }
    ]
  },
  {
    "week": 4,
    "season": "Autumn Harbor",
    "strandKey": "operations",
    "strandEn": "Addition & Subtraction",
    "strandZh": "加减心算与估算",
    "titleEn": "Mental Math & Compensation Chains",
    "titleZh": "加法心算与拆补法大作战",
    "landmark": "RIM Park Sportsplex",
    "landmarkZh": "RIM Park 综合体育公园",
    "descriptionEn": "Use friendly numbers, compensation (+1/-1), and expanded addition strategies at RIM Park!",
    "descriptionZh": "学会使用“凑整补偿法”（如 98+45 = 100+43）进行高速精准的心算！",
    "questions": [
      {
        "id": "w4-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "Solve using compensation: 498 + 237 = ?",
        "questionZh": "使用凑整法心算：498 + 237 = ？",
        "optionsEn": [
          "735",
          "733",
          "745",
          "725"
        ],
        "optionsZh": [
          "735",
          "733",
          "745",
          "725"
        ],
        "correctIndex": 0,
        "secretClueEn": "Add 2 to 498 to make 500, then subtract 2 from 237 (235). 500 + 235 = ?",
        "secretClueZh": "给 498 加上 2 凑成 500，再从 237 减去 2 变成 235。500 + 235 = ？",
        "explanationEn": "498 + 237 = 500 + 235 = 735.",
        "explanationZh": "利用凑整法：500 + 235 = 735。"
      },
      {
        "id": "w4-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "RIM Park soccer tournament had 1,420 morning visitors and 1,890 afternoon visitors. Estimate the total to the nearest 100.",
        "questionZh": "RIM Park 足球赛上午迎来了 1,420 人，下午迎来了 1,890 人。估算总人数到最近的百位。",
        "optionsEn": [
          "3,200",
          "3,300",
          "3,400",
          "3,500"
        ],
        "optionsZh": [
          "3,200 人",
          "3,300 人",
          "3,400 人",
          "3,500 人"
        ],
        "correctIndex": 1,
        "secretClueEn": "Round first: 1,400 + 1,900 = 3,300. (Actual: 3,310 -> 3,300).",
        "secretClueZh": "先四舍五入到百位：1,400 + 1,900 = 3,300。",
        "explanationEn": "1,400 + 1,900 = 3,300 estimated visitors.",
        "explanationZh": "1,400 + 1,900 = 3,300。"
      },
      {
        "id": "w4-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "Calculate mentally: 800 - 347 = ?",
        "questionZh": "心算整百减法：800 - 347 = ？",
        "optionsEn": [
          "553",
          "463",
          "453",
          "443"
        ],
        "optionsZh": [
          "553",
          "463",
          "453",
          "443"
        ],
        "correctIndex": 2,
        "secretClueEn": "Think: 800 - 300 = 500. Then 500 - 40 = 460. Then 460 - 7 = 453.",
        "secretClueZh": "分步减：800 - 300 = 500；500 - 40 = 460；460 - 7 = 453。",
        "explanationEn": "800 - 347 = 453.",
        "explanationZh": "800 - 300 - 40 - 7 = 453。"
      },
      {
        "id": "w4-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "Find the missing digit A in: 3,4A7 + 2,685 = 6,112.",
        "questionZh": "找出等式中的未知数位 A：3,4A7 + 2,685 = 6,112。",
        "optionsEn": [
          "1",
          "2",
          "3",
          "4"
        ],
        "optionsZh": [
          "1",
          "2",
          "3",
          "4"
        ],
        "correctIndex": 1,
        "secretClueEn": "Work backwards: 6,112 - 2,685 = 3,427! So A = ?",
        "secretClueZh": "逆向减法：6,112 - 2,685 = 3,427！所以 A 是多少？",
        "explanationEn": "6,112 - 2,685 = 3,427. Therefore A = 2.",
        "explanationZh": "6,112 - 2,685 = 3,427，十位数 A 是 2。"
      },
      {
        "id": "w4-q5",
        "tier": "easy",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "What is 3,500 + 4,200?",
        "questionZh": "3,500 + 4,200 等于多少？",
        "optionsEn": [
          "7,700",
          "7,800",
          "7,600",
          "7,900"
        ],
        "optionsZh": [
          "7,700",
          "7,800",
          "7,600",
          "7,900"
        ],
        "correctIndex": 0,
        "secretClueEn": "35 hundreds + 42 hundreds = 77 hundreds.",
        "secretClueZh": "35 个百加 42 个百等于 77 个百（7,700）。",
        "explanationEn": "3,500 + 4,200 = 7,700.",
        "explanationZh": "3,500 + 4,200 = 7,700。"
      }
    ]
  },
  {
    "week": 5,
    "season": "Autumn Harbor",
    "strandKey": "operations",
    "strandEn": "Addition & Subtraction",
    "strandZh": "多位数加减与实际应用",
    "titleEn": "Mariner Voyage Log Multi-Digit Ops",
    "titleZh": "大数退位减法与水手航海日记",
    "landmark": "Conestogo River Trail",
    "landmarkZh": "科尼斯托戈河步道",
    "descriptionEn": "Regroup across zeros and solve multi-step word problems from the Waterloo Pioneer Memorial!",
    "descriptionZh": "跨越多个连续“0”的退位减法难点突破与多步骤探究！",
    "questions": [
      {
        "id": "w5-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "Subtract across zeros: 5,000 - 2,348 = ?",
        "questionZh": "计算连续退位减法：5,000 - 2,348 = ？",
        "optionsEn": [
          "3,652",
          "2,752",
          "2,652",
          "2,662"
        ],
        "optionsZh": [
          "3,652",
          "2,752",
          "2,652",
          "2,662"
        ],
        "correctIndex": 2,
        "secretClueEn": "Pro tip: Subtract 1 from both numbers! 4,999 - 2,347 requires ZERO regrouping!",
        "secretClueZh": "神奇技巧：被减数和减数同时减 1！算 4,999 - 2,347，完全不用借位退位！",
        "explanationEn": "4,999 - 2,347 = 2,652. Since both were shifted by 1, the difference is unchanged!",
        "explanationZh": "4,999 - 2,347 = 2,652，同减1差不变，无需借位轻松搞定！"
      },
      {
        "id": "w5-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "A Waterloo charity walked 3,450 km in September and 4,120 km in October. Their goal is 10,000 km. How many km are left?",
        "questionZh": "滑铁卢慈善徒步团队9月走完 3,450 km，10月走完 4,120 km。目标是 10,000 km，还剩多少 km？",
        "optionsEn": [
          "2,420 km",
          "2,530 km",
          "2,330 km",
          "2,430 km"
        ],
        "optionsZh": [
          "2,420 km",
          "2,530 km",
          "2,330 km",
          "2,430 km"
        ],
        "correctIndex": 3,
        "secretClueEn": "First find the total walked so far: 3,450 + 4,120 = 7,570. Then 10,000 - 7,570.",
        "secretClueZh": "先算已走的里程：3,450 + 4,120 = 7,570。再用 10,000 减去 7,570。",
        "explanationEn": "3,450 + 4,120 = 7,570 km. 10,000 - 7,570 = 2,430 km left.",
        "explanationZh": "已走 7,570 km，10,000 - 7,570 = 2,430 km。"
      },
      {
        "id": "w5-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "The sum of three numbers is 8,240. The first is 2,350 and the second is 3,890. What is the third number?",
        "questionZh": "三个数的和是 8,240。第一个数是 2,350，第二个数是 3,890，第三个数是多少？",
        "optionsEn": [
          "2,000",
          "2,100",
          "1,990",
          "2,010"
        ],
        "optionsZh": [
          "2,000",
          "2,100",
          "1,990",
          "2,010"
        ],
        "correctIndex": 0,
        "secretClueEn": "Add the first two: 2,350 + 3,890 = 6,240. Now subtract from 8,240.",
        "secretClueZh": "前两数相加：2,350 + 3,890 = 6,240。然后 8,240 - 6,240 = ？",
        "explanationEn": "8,240 - 6,240 = 2,000.",
        "explanationZh": "8,240 - 6,240 = 2,000。"
      },
      {
        "id": "w5-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "A container of maple syrup weighed 3,800 grams when full and 2,100 grams when half full. What is the empty container weight?",
        "questionZh": "一罐枫糖浆装满时重 3,800 克，半满时重 2,100 克。空罐本身的重量是多少克？",
        "optionsEn": [
          "800 g",
          "400 g",
          "1,700 g",
          "500 g"
        ],
        "optionsZh": [
          "800 克",
          "400 克（空罐净重）",
          "1,700 克",
          "500 克"
        ],
        "correctIndex": 1,
        "secretClueEn": "The difference (3,800 - 2,100 = 1,700 g) is the weight of HALF the syrup! So full syrup = 1,700 × 2 = 3,400 g.",
        "secretClueZh": "差值 3,800 - 2,100 = 1,700 克是“半罐糖浆”的重量！整罐糖浆重 1,700 × 2 = 3,400 克。空罐 = 3,800 - 3,400。",
        "explanationEn": "Half syrup = 1,700g. Full syrup = 3,400g. Container = 3,800g - 3,400g = 400g.",
        "explanationZh": "半罐糖浆 1,700g，满罐糖浆 3,400g，空罐重 3,800 - 3,400 = 400 克。"
      },
      {
        "id": "w5-q5",
        "tier": "med",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "Solve: 6,425 + 1,789 = ?",
        "questionZh": "计算：6,425 + 1,789 = ？",
        "optionsEn": [
          "8,224",
          "8,114",
          "8,214",
          "7,214"
        ],
        "optionsZh": [
          "8,224",
          "8,114",
          "8,214",
          "7,214"
        ],
        "correctIndex": 2,
        "secretClueEn": "5+9=14, 2+8+1=11, 4+7+1=12, 6+1+1=8.",
        "secretClueZh": "个位5+9=14写4进1，十位2+8+1=11写1进1，百位4+7+1=12写2进1，千位6+1+1=8。",
        "explanationEn": "6,425 + 1,789 = 8,214.",
        "explanationZh": "6,425 + 1,789 = 8,214。"
      }
    ]
  },
  {
    "week": 6,
    "season": "Autumn Harbor",
    "strandKey": "geometry",
    "strandEn": "Geometric Reasoning",
    "strandZh": "几何角与90°基准",
    "titleEn": "Benchmark Angles: Acute, Right & Obtuse",
    "titleZh": "锐角、直角、钝角与时钟基准",
    "landmark": "Waterloo City Hall Clock Tower",
    "landmarkZh": "滑铁卢市政厅钟楼",
    "descriptionEn": "Benchmark angles against 90° right angles using the hands of the Waterloo Clock Tower!",
    "descriptionZh": "以 90° 直角为基准，识别生活中的锐角、直角与钝角！",
    "questions": [
      {
        "id": "w6-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "An angle that is smaller than a 90° right angle is called a(n):",
        "questionZh": "比 90° 直角小的角被称作：",
        "optionsEn": [
          "Acute angle",
          "Obtuse angle",
          "Straight angle",
          "Reflex angle"
        ],
        "optionsZh": [
          "锐角（Acute angle）",
          "钝角（Obtuse angle）",
          "平角",
          "优角"
        ],
        "correctIndex": 0,
        "secretClueEn": "Remember: It is \"a cute\" little angle (< 90°)!",
        "secretClueZh": "口诀记忆：“锐利小巧”（小于 90°）的是锐角。",
        "explanationEn": "An acute angle measures strictly between 0° and 90°.",
        "explanationZh": "大于0°且小于90°的角是锐角。"
      },
      {
        "id": "w6-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "At exactly 3:00 on the Waterloo Clock Tower, what angle do the hour and minute hands form?",
        "questionZh": "滑铁卢钟楼上的时钟在整 3:00 时，时针与分针形成什么角？",
        "optionsEn": [
          "Acute angle (< 90°)",
          "Right angle (90°)",
          "Obtuse angle (> 90°)",
          "Straight angle (180°)"
        ],
        "optionsZh": [
          "锐角",
          "直角（90° Right angle）",
          "钝角",
          "平角"
        ],
        "correctIndex": 1,
        "secretClueEn": "At 3:00, minute hand points straight up at 12, hour hand points straight right at 3.",
        "secretClueZh": "3:00 时分针正指12，时针正指3，正好形成一个标准的 90° L 形直角。",
        "explanationEn": "The hands are perpendicular at 3:00, creating an exact 90° right angle.",
        "explanationZh": "分针垂直于时针，夹角为 90° 直角。"
      },
      {
        "id": "w6-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "At 5:00, what type of angle is formed between the clock hands (the interior angle)?",
        "questionZh": "在 5:00 时，时钟两针之间的较小夹角是什么角？",
        "optionsEn": [
          "Right angle",
          "Acute angle",
          "Obtuse angle",
          "Straight angle"
        ],
        "optionsZh": [
          "直角",
          "锐角",
          "钝角（150° Obtuse）",
          "平角"
        ],
        "correctIndex": 2,
        "secretClueEn": "Each hour number on a clock face represents 360° ÷ 12 = 30°. From 12 to 5 is 5 × 30° = 150°.",
        "secretClueZh": "表盘每个大格是 30°。12 到 5 共有 5 个大格：5 × 30° = 150°，大于 90°。",
        "explanationEn": "150° is greater than 90° and less than 180°, which is an obtuse angle.",
        "explanationZh": "夹角 150° 大于 90° 且小于 180°，是钝角。"
      },
      {
        "id": "w6-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "A triangle has angles 45° and 45°. What is the third angle, and what type of triangle is it?",
        "questionZh": "一个三角形有两个内角都是 45°。第三个角是多少度？这是什么三角形？",
        "optionsEn": [
          "80° (Acute triangle)",
          "100° (Obtuse triangle)",
          "60° (Equilateral triangle)",
          "90° (Right-angled Isosceles triangle)"
        ],
        "optionsZh": [
          "80°（锐角三角形）",
          "100°（钝角三角形）",
          "60°（等边三角形）",
          "90°（等腰直角三角形）"
        ],
        "correctIndex": 3,
        "secretClueEn": "The sum of all three angles in any triangle is always 180°. 180° - 45° - 45° = ?",
        "secretClueZh": "任意三角形内角和都是 180°。180° - 45° - 45° = 90°！",
        "explanationEn": "180° - 90° = 90°. A triangle with a 90° angle and two equal angles is a Right Isosceles triangle!",
        "explanationZh": "第三个角是 90°，含有直角且两底角相等，是等腰直角三角形。"
      },
      {
        "id": "w6-q5",
        "tier": "easy",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "Which shape always has four 90° right angles?",
        "questionZh": "下列哪种图形必定拥有四个 90° 直角？",
        "optionsEn": [
          "Rectangle",
          "Trapezoid",
          "Rhombus without right angles",
          "Pentagon"
        ],
        "optionsZh": [
          "长方形（Rectangle）",
          "梯形",
          "普通菱形",
          "五边形"
        ],
        "correctIndex": 0,
        "secretClueEn": "Rectangles and squares always have four right angles.",
        "secretClueZh": "长方形与正方形的四个角必定是 90° 直角。",
        "explanationEn": "By definition, a rectangle is a quadrilateral with four right angles.",
        "explanationZh": "长方形的定义就是四个内角均为直角的四边形。"
      }
    ]
  },
  {
    "week": 7,
    "season": "Autumn Harbor",
    "strandKey": "geometry",
    "strandEn": "Geometric Reasoning",
    "strandZh": "四边形分类与对称轴",
    "titleEn": "Quadrilateral Quest & Lines of Symmetry",
    "titleZh": "四边形家族谱系与对称轴探秘",
    "landmark": "Perimeter Institute for Theoretical Physics",
    "landmarkZh": "圆周理论物理研究所",
    "descriptionEn": "Classify parallelograms, rhombuses, trapezoids, and test lines of symmetry at Perimeter Institute!",
    "descriptionZh": "区分平行四边形、菱形、梯形，并测算多边形的对称轴数量！",
    "questions": [
      {
        "id": "w7-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "How many lines of symmetry does a regular square have?",
        "questionZh": "一个正方形（Square）一共有多少条对称轴？",
        "optionsEn": [
          "2",
          "4",
          "8",
          "1"
        ],
        "optionsZh": [
          "2 条",
          "4 条（水平、垂直、两条对角线）",
          "8 条",
          "1 条"
        ],
        "correctIndex": 1,
        "secretClueEn": "1 vertical, 1 horizontal, and 2 diagonal lines fold the square onto itself perfectly.",
        "secretClueZh": "水平对折1条、垂直对折1条、两条对角线各1条，共 4 条。",
        "explanationEn": "A square has 4 lines of symmetry.",
        "explanationZh": "正方形有 4 条对称轴。"
      },
      {
        "id": "w7-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "Which quadrilateral has 4 equal sides, but its angles do NOT have to be 90°?",
        "questionZh": "哪种四边形四条边完全相等，但内角不一定是 90° 直角？",
        "optionsEn": [
          "Kite with different sides",
          "Rectangle",
          "Trapezoid",
          "Rhombus"
        ],
        "optionsZh": [
          "风筝形",
          "长方形",
          "梯形",
          "菱形（Rhombus）"
        ],
        "correctIndex": 3,
        "secretClueEn": "A rhombus has 4 equal sides like a diamond shape.",
        "secretClueZh": "菱形的四条边均相等，但对角可以不是直角（像倾斜的正方形或钻石）。",
        "explanationEn": "A rhombus is an equilateral parallelogram with 4 congruent sides.",
        "explanationZh": "四条边均相等的四边形是菱形。"
      },
      {
        "id": "w7-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "A quadrilateral has EXACTLY one pair of parallel sides. What is it?",
        "questionZh": "一个四边形【恰好只有一组】对边互相平行，它叫什么？",
        "optionsEn": [
          "Trapezoid (Trapezium)",
          "Parallelogram",
          "Rectangle",
          "Rhombus"
        ],
        "optionsZh": [
          "梯形（Trapezoid）",
          "平行四边形",
          "长方形",
          "菱形"
        ],
        "correctIndex": 0,
        "secretClueEn": "Parallelograms have 2 pairs of parallel sides. A trapezoid has only 1 pair!",
        "secretClueZh": "平行四边形有两组平行对边，而梯形恰好只有一组平行对边（上底和平行下底）。",
        "explanationEn": "In Ontario Grade 4 math, a trapezoid has exactly one pair of parallel sides.",
        "explanationZh": "只有一组平行对边的四边形是梯形。"
      },
      {
        "id": "w7-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "Is a square always a rectangle, always a rhombus, and always a parallelogram?",
        "questionZh": "“正方形既是长方形，又是菱形，也是平行四边形。”这句话对吗？",
        "optionsEn": [
          "No, a square cannot be a rectangle.",
          "Yes, True! A square belongs to all three families.",
          "No, a rhombus cannot have right angles.",
          "No, a square is its own separate category."
        ],
        "optionsZh": [
          "错误，正方形不是长方形。",
          "完全正确！正方形属于这三个四边形大家族。",
          "错误，菱形不能有直角。",
          "错误，正方形是完全独立的图形。"
        ],
        "correctIndex": 1,
        "secretClueEn": "Square has 4 right angles (rectangle), 4 equal sides (rhombus), and 2 pairs of parallel sides (parallelogram)!",
        "secretClueZh": "正方形拥有4个直角（满足长方形）、4条等边（满足菱形）、两组平行边（满足平行四边形），是最完美的特殊四边形！",
        "explanationEn": "A square satisfies all definitions of rectangles, rhombuses, and parallelograms.",
        "explanationZh": "正方形是特殊的长方形与菱形，更是特殊的平行四边形。"
      },
      {
        "id": "w7-q5",
        "tier": "med",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "How many lines of symmetry does a non-square rectangle have?",
        "questionZh": "一个普通的长方形（非正方形）有多少条对称轴？",
        "optionsEn": [
          "1",
          "4",
          "2",
          "0"
        ],
        "optionsZh": [
          "1 条",
          "4 条",
          "2 条（横向中线与纵向中线）",
          "0 条"
        ],
        "correctIndex": 2,
        "secretClueEn": "Diagonals of a rectangle do NOT fold the corners onto each other! Only 2 lines across opposite sides.",
        "secretClueZh": "对角线对折长方形时角与角无法重合！所以长方形只有水平和竖直 2 条对称轴。",
        "explanationEn": "A rectangle has 2 lines of symmetry connecting midpoints of opposite sides.",
        "explanationZh": "长方形有 2 条对称轴。"
      }
    ]
  },
  {
    "week": 8,
    "season": "Autumn Harbor",
    "strandKey": "coding",
    "strandEn": "Location & Movement",
    "strandZh": "坐标网格与平移",
    "titleEn": "Mariner Grid Coordinates & Treasure Map",
    "titleZh": "水手航海网格坐标与宝藏定位",
    "landmark": "Uptown Waterloo Silver Lake",
    "landmarkZh": "上城滑铁卢银湖",
    "descriptionEn": "Plot and read (x, y) coordinates and execute translations (e.g. 3 right, 2 up) around Silver Lake!",
    "descriptionZh": "掌握（横坐标 x，纵坐标 y）的读写与平移位移法则！",
    "questions": [
      {
        "id": "w8-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "When reading coordinates (x, y), which direction do you move first?",
        "questionZh": "在读取网格坐标（x, y）时，我们应该先往哪个方向移动？",
        "optionsEn": [
          "Along the horizontal x-axis first (across, then up)",
          "Along the vertical y-axis first (up, then across)",
          "Diagonally from the top right",
          "It does not matter"
        ],
        "optionsZh": [
          "先沿水平 x 轴移动（先横着走，再竖着上）",
          "先沿垂直 y 轴移动",
          "从右上角沿对角线走",
          "随便哪个方向都可以"
        ],
        "correctIndex": 0,
        "secretClueEn": "Memory trick: Walk along the hallway (x) before taking the elevator up (y)!",
        "secretClueZh": "口诀：“先横穿走廊（x），再乘电梯上楼（y）”！",
        "explanationEn": "Coordinates are always read (horizontal x, vertical y).",
        "explanationZh": "坐标顺序始终是（横坐标，纵坐标）。"
      },
      {
        "id": "w8-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "A pirate ship is at (2, 3). It sails 4 units East (right) and 2 units North (up). What are its new coordinates?",
        "questionZh": "一艘水手帆船位于坐标 (2, 3)。它向东（向右）航行 4 格，再向北（向上）航行 2 格。新坐标是？",
        "optionsEn": [
          "(5, 6)",
          "(6, 5)",
          "(6, 1)",
          "(2, 5)"
        ],
        "optionsZh": [
          "(5, 6)",
          "(6, 5)",
          "(6, 1)",
          "(2, 5)"
        ],
        "correctIndex": 1,
        "secretClueEn": "Add to x: 2 + 4 = 6. Add to y: 3 + 2 = 5.",
        "secretClueZh": "x 轴加上 4：2 + 4 = 6。y 轴加上 2：3 + 2 = 5。新坐标即为 (6, 5)。",
        "explanationEn": "(2+4, 3+2) = (6, 5).",
        "explanationZh": "横向 2+4=6，纵向 3+2=5，坐标为 (6, 5)。"
      },
      {
        "id": "w8-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "Three corners of a rectangle on a grid are (1, 1), (1, 5), and (6, 1). What is the coordinate of the fourth corner?",
        "questionZh": "一个长方形在网格上的三个顶点是 (1, 1), (1, 5) 和 (6, 1)。第四个顶点的坐标是？",
        "optionsEn": [
          "(5, 5)",
          "(5, 6)",
          "(6, 5)",
          "(6, 6)"
        ],
        "optionsZh": [
          "(5, 5)",
          "(5, 6)",
          "(6, 5)",
          "(6, 6)"
        ],
        "correctIndex": 2,
        "secretClueEn": "The fourth corner needs x = 6 (matching (6,1)) and y = 5 (matching (1,5)).",
        "secretClueZh": "第四个顶点必须与 (6,1) 有相同的横坐标 6，与 (1,5) 有相同的纵坐标 5，即 (6, 5)。",
        "explanationEn": "The fourth vertex must be (6, 5) to complete the right-angled sides parallel to the axes.",
        "explanationZh": "补全长方形的第四个点是 (6, 5)。"
      },
      {
        "id": "w8-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "Point A is at (3, 4). If it is reflected across the vertical line x = 5, what are its new coordinates?",
        "questionZh": "点 A 位于 (3, 4)。若将它关于竖直对称轴 x = 5 做镜面对称，反射后的新坐标是？",
        "optionsEn": [
          "(7, 6)",
          "(5, 4)",
          "(8, 4)",
          "(7, 4)"
        ],
        "optionsZh": [
          "(7, 6)",
          "(5, 4)",
          "(8, 4)",
          "(7, 4)"
        ],
        "correctIndex": 3,
        "secretClueEn": "Point A has x = 3, which is 2 units left of line x = 5. The mirror point must be 2 units right of x = 5 (5 + 2 = 7). Y remains 4!",
        "secretClueZh": "点 A 的横坐标 3 距离对称线 x = 5 有 2 个单位。镜像点在对称线右侧 2 个单位：5 + 2 = 7。纵坐标 4 保持不变。",
        "explanationEn": "Distance from mirror line is 5 - 3 = 2 units. New x = 5 + 2 = 7. Y stays 4, giving (7, 4).",
        "explanationZh": "对称点坐标为 (7, 4)。"
      },
      {
        "id": "w8-q5",
        "tier": "med",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "What is the coordinate of the origin where the x-axis and y-axis intersect?",
        "questionZh": "x 轴与 y 轴相交的“原点”坐标是什么？",
        "optionsEn": [
          "(0, 0)",
          "(1, 1)",
          "(0, 1)",
          "(1, 0)"
        ],
        "optionsZh": [
          "(0, 0)（原点 Origin）",
          "(1, 1)",
          "(0, 1)",
          "(1, 0)"
        ],
        "correctIndex": 0,
        "secretClueEn": "Origin is zero across, zero up: (0, 0).",
        "secretClueZh": "原点就是横纵皆为零的起始点：(0, 0)。",
        "explanationEn": "The origin is always at (0, 0).",
        "explanationZh": "原点坐标为 (0, 0)。"
      }
    ]
  },
  {
    "week": 9,
    "season": "Autumn Harbor",
    "strandKey": "operations",
    "strandEn": "Multiplication & Division",
    "strandZh": "阵列模型与翻倍链",
    "titleEn": "Tile Arrays & Doubling Chains",
    "titleZh": "瓷砖阵列与 2× ➔ 4× ➔ 8× 翻倍心算链",
    "landmark": "St. Jacobs Farmers Market",
    "landmarkZh": "圣雅各布斯农贸市场",
    "descriptionEn": "Build rectangular arrays and use the 2x -> 4x -> 8x doubling strategy on market apple crates!",
    "descriptionZh": "通过圣雅各布斯市场的苹果箱阵列，掌握乘法结合律与连续翻倍心算神技！",
    "questions": [
      {
        "id": "w9-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "How can you calculate 8 × 7 using the doubling chain strategy?",
        "questionZh": "如何利用“翻倍心算链”快速算出 8 × 7？",
        "optionsEn": [
          "8 + 7 = 15, then multiply by 2",
          "Add 8 seven times on your fingers",
          "2 × 7 = 14, double to 28 (4×7), double again to 56 (8×7)",
          "10 × 7 = 70, then subtract 8"
        ],
        "optionsZh": [
          "8+7=15，再乘以2",
          "用手指连加 7 个 8",
          "先算 2×7=14，翻倍得 28 (4×7)，再翻倍得 56 (8×7)",
          "10×7=70，再减去8"
        ],
        "correctIndex": 2,
        "secretClueEn": "Multiplying by 8 is multiplying by 2 three times: ×2, ×2, ×2!",
        "secretClueZh": "乘以 8 就是连续乘以三次 2：14 ➔ 28 ➔ 56！",
        "explanationEn": "2×7 = 14; 4×7 = 28; 8×7 = 56. Doubling chain works every time!",
        "explanationZh": "通过 2× ➔ 4× ➔ 8× 连续翻倍，心算极速且绝不出错。"
      },
      {
        "id": "w9-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "St. Jacobs bakery displays muffins in 6 rows with 12 muffins in each row. How many muffins are there?",
        "questionZh": "圣雅各布斯烘焙坊将松饼摆成 6 排，每排 12 个。一共有多少个松饼？",
        "optionsEn": [
          "60",
          "62",
          "84",
          "72"
        ],
        "optionsZh": [
          "60 个",
          "62 个",
          "84 个",
          "72 个（拆十法：60+12）"
        ],
        "correctIndex": 3,
        "secretClueEn": "Break 12 into 10 + 2: (6 × 10) + (6 × 2) = 60 + 12.",
        "secretClueZh": "拆十法：把 12 拆成 10 + 2：6×10 = 60，6×2 = 12，60 + 12 = 72。",
        "explanationEn": "6 × 12 = (6 × 10) + (6 × 2) = 60 + 12 = 72.",
        "explanationZh": "运用乘法分配律：6×10 + 6×2 = 72。"
      },
      {
        "id": "w9-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "Calculate 12 × 15 mentally using friendly decomposition.",
        "questionZh": "运用拆分法心算：12 × 15 = ？",
        "optionsEn": [
          "180",
          "170",
          "190",
          "160"
        ],
        "optionsZh": [
          "180",
          "170",
          "190",
          "160"
        ],
        "correctIndex": 0,
        "secretClueEn": "10 × 15 = 150. Plus 2 × 15 = 30. 150 + 30 = ?",
        "secretClueZh": "10 个 15 是 150；2 个 15 是 30。150 + 30 = 180！",
        "explanationEn": "(10 × 15) + (2 × 15) = 150 + 30 = 180.",
        "explanationZh": "拆十法：150 + 30 = 180。"
      },
      {
        "id": "w9-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "A rectangular tile patio has 96 tiles. The length is 10 tiles longer than the width. What are its dimensions?",
        "questionZh": "一个长方形瓷砖平台由 96 块正方形瓷砖铺成。长比宽多 10 块。平台的长和宽各是多少？",
        "optionsEn": [
          "Width 8 tiles, Length 12 tiles",
          "Width 6 tiles, Length 16 tiles",
          "Width 4 tiles, Length 24 tiles",
          "Width 7 tiles, Length 17 tiles"
        ],
        "optionsZh": [
          "宽 8 块，长 12 块",
          "宽 6 块，长 16 块（6 × 16 = 96，差为 10）",
          "宽 4 块，长 24 块",
          "宽 7 块，长 17 块"
        ],
        "correctIndex": 1,
        "secretClueEn": "Find two factors of 96 whose difference is 10: 6 × 16 = 96, and 16 - 6 = 10!",
        "secretClueZh": "寻找两个相乘等于 96 且相差 10 的因数：6 × 16 = 96，并且 16 - 6 = 10！",
        "explanationEn": "6 × 16 = 96 tiles, and 16 - 6 = 10 tiles difference. The dimensions are 6 by 16.",
        "explanationZh": "6 × 16 = 96 块，且 16 - 6 = 10 块，符合长比宽多 10 块的条件。"
      },
      {
        "id": "w9-q5",
        "tier": "med",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "If 4 × 9 = 36, what is 8 × 9?",
        "questionZh": "如果已知 4 × 9 = 36，那么 8 × 9 等于多少？",
        "optionsEn": [
          "81",
          "64",
          "72",
          "70"
        ],
        "optionsZh": [
          "81",
          "64",
          "72（36 的两倍）",
          "70"
        ],
        "correctIndex": 2,
        "secretClueEn": "8 is double 4, so double 36: 36 + 36 = 72!",
        "secretClueZh": "8 是 4 的 2 倍，所以把 36 翻倍：36 + 36 = 72！",
        "explanationEn": "Double 36 is 72. 8 × 9 = 72.",
        "explanationZh": "利用翻倍性质：36 × 2 = 72。"
      }
    ]
  },
  {
    "week": 10,
    "season": "Autumn Harbor",
    "strandKey": "data",
    "strandEn": "Data Literacy",
    "strandZh": "象形图与比例标尺",
    "titleEn": "Pictograph Scaling & Laurel Creek Bird Watch",
    "titleZh": "象形统计图标尺换算与月桂溪观鸟",
    "landmark": "Laurel Creek Nature Trail",
    "landmarkZh": "月桂溪自然观察步道",
    "descriptionEn": "Interpret pictographs with many-to-one keys (e.g. 1 bird icon = 4 observed birds) and bar graphs!",
    "descriptionZh": "解读“以一当多”（如一个图标代表 4 只鸟）的象形统计图与条形图！",
    "questions": [
      {
        "id": "w10-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "In a pictograph, each 🦆 icon represents 5 ducks. If there are 6 icons next to Mallard, how many ducks were seen?",
        "questionZh": "在象形统计图中，每个 🦆 图标代表 5 只野鸭。野鸭栏有 6 个图标，实际看到了多少只野鸭？",
        "optionsEn": [
          "30",
          "11",
          "25",
          "35"
        ],
        "optionsZh": [
          "30 只",
          "11 只",
          "25 只",
          "35 只"
        ],
        "correctIndex": 0,
        "secretClueEn": "Multiply the number of icons by the key value: 6 icons × 5 ducks each.",
        "secretClueZh": "图标数乘以标尺值：6 × 5 = 30。",
        "explanationEn": "6 × 5 = 30 ducks.",
        "explanationZh": "6 × 5 = 30 只野鸭。"
      },
      {
        "id": "w10-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "Each 🌲 icon represents 8 trees planted. Millen Woods planted 52 trees. How should this be shown on the pictograph?",
        "questionZh": "每个 🌲 图标代表植树 8 棵。米伦伍兹学校共种了 52 棵树，应该如何用图标表示？",
        "optionsEn": [
          "5 full trees and 2 half trees",
          "6 full trees and one half tree (6.5 icons)",
          "7 full trees",
          "6 full trees exactly"
        ],
        "optionsZh": [
          "5 个完整树木图标 + 2 个半棵树",
          "6 个完整树木图标 + 1 个半棵树图标（6.5个图标）",
          "7 个完整树木图标",
          "6 个完整树木图标"
        ],
        "correctIndex": 1,
        "secretClueEn": "6 × 8 = 48 trees. That leaves 52 - 48 = 4 trees. 4 is half of 8, so half an icon!",
        "secretClueZh": "6 × 8 = 48 棵。还差 52 - 48 = 4 棵。4 恰好是 8 的一半，所以画半个图标！",
        "explanationEn": "6 full icons (48) + half icon (4) = 52 trees.",
        "explanationZh": "6 个完整图标代表 48 棵，半个图标代表 4 棵，合共 52 棵。"
      },
      {
        "id": "w10-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "Find the Range of this data set: 12, 18, 9, 25, 14.",
        "questionZh": "求这组观鸟记录数据的“极差”（Range）：12, 18, 9, 25, 14。",
        "optionsEn": [
          "9",
          "25",
          "16",
          "14"
        ],
        "optionsZh": [
          "9",
          "25",
          "16（最大值 25 减 最小值 9）",
          "14"
        ],
        "correctIndex": 2,
        "secretClueEn": "Range = Highest value - Lowest value. 25 - 9 = ?",
        "secretClueZh": "极差 = 最大值 - 最小值。最大是 25，最小是 9。25 - 9 = 16。",
        "explanationEn": "25 - 9 = 16.",
        "explanationZh": "极差是最大值与最小值的差：25 - 9 = 16。"
      },
      {
        "id": "w10-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "The mean (average) score of 4 math quizzes is 85. If three scores are 80, 90, and 85, what was the fourth score?",
        "questionZh": "4 次数学小测的平均分（Mean）是 85 分。前三次成绩分别是 80、90、85 分，第四次得了多少分？",
        "optionsEn": [
          "82",
          "88",
          "90",
          "85"
        ],
        "optionsZh": [
          "82 分",
          "88 分",
          "90 分",
          "85 分"
        ],
        "correctIndex": 3,
        "secretClueEn": "Total points = 4 × 85 = 340. Sum of 3 tests = 80 + 90 + 85 = 255. 340 - 255 = ?",
        "secretClueZh": "4次总分 = 4 × 85 = 340。前3次总和 = 80 + 90 + 85 = 255。第四次 = 340 - 255 = 85 分。",
        "explanationEn": "Total = 340. 340 - 255 = 85 points.",
        "explanationZh": "总分 340 分减去前三次总和 255 分，第四次恰好也是 85 分。"
      },
      {
        "id": "w10-q5",
        "tier": "easy",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "What is the Mode of this dataset: 7, 9, 7, 12, 15, 7, 9?",
        "questionZh": "这组数据的众数（Mode）是多少：7, 9, 7, 12, 15, 7, 9？",
        "optionsEn": [
          "7",
          "9",
          "12",
          "15"
        ],
        "optionsZh": [
          "7（出现次数最多）",
          "9",
          "12",
          "15"
        ],
        "correctIndex": 0,
        "secretClueEn": "Mode is the number that appears MOST often! Count how many 7s.",
        "secretClueZh": "众数是出现频率最高的数。7 出现了 3 次，最多。",
        "explanationEn": "7 appears three times, more than any other number.",
        "explanationZh": "7 出现 3 次，是该组数据的众数。"
      }
    ]
  },
  {
    "week": 11,
    "season": "Winter Glacier",
    "strandKey": "operations",
    "strandEn": "Multiplication & Division",
    "strandZh": "面积模型与多位数乘法",
    "titleEn": "Area Model Multiplication",
    "titleZh": "面积模型（Area Model）乘法拆解",
    "landmark": "Waterloo Memorial Recreation Complex",
    "landmarkZh": "滑铁卢纪念休闲中心",
    "descriptionEn": "Decompose 2-digit by 1-digit and 2-digit by 2-digit products into visual rectangular areas!",
    "descriptionZh": "通过长方形分块面积模型，直观理解两位数乘一位数与多位数乘法！",
    "questions": [
      {
        "id": "w11-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "Using the area model to calculate 4 × 36, you split 36 into 30 + 6. What two areas do you add?",
        "questionZh": "用面积模型算 4 × 36 时将 36 拆成 30 + 6。你需要把哪两个分块面积相加？",
        "optionsEn": [
          "(4 × 30 = 120) and (4 × 10 = 40)",
          "(4 × 3 = 12) and (4 × 6 = 24)",
          "(4 × 30 = 120) and (4 × 6 = 24)",
          "(30 × 6 = 180) and 4"
        ],
        "optionsZh": [
          "(4 × 30 = 120) 和 (4 × 10 = 40)",
          "(4 × 3 = 12) 和 (4 × 6 = 24)",
          "(4 × 30 = 120) 和 (4 × 6 = 24)",
          "(30 × 6 = 180) 和 4"
        ],
        "correctIndex": 2,
        "secretClueEn": "4 × 30 = 120, and 4 × 6 = 24. Total = 120 + 24 = 144.",
        "secretClueZh": "4 乘 30 得 120，4 乘 6 得 24。合起来是 120 + 24 = 144。",
        "explanationEn": "4 × 36 = 120 + 24 = 144.",
        "explanationZh": "分块面积相加：120 + 24 = 144。",
        "visual": {
          "type": "array",
          "content": "[4 × 30 = 120] + [4 × 6 = 24]",
          "subtext": "Area Model"
        }
      },
      {
        "id": "w11-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "Calculate 7 × 48 using mental area breakdown: (7 × 40) + (7 × 8) = ?",
        "questionZh": "用面积模型心算：7 × 48 = (7 × 40) + (7 × 8) = ？",
        "optionsEn": [
          "356",
          "326",
          "346",
          "336"
        ],
        "optionsZh": [
          "356",
          "326",
          "346",
          "336"
        ],
        "correctIndex": 3,
        "secretClueEn": "7 × 40 = 280. 7 × 8 = 56. 280 + 56 = 336.",
        "secretClueZh": "7 × 40 = 280；7 × 8 = 56。280 + 56 = 336。",
        "explanationEn": "280 + 56 = 336.",
        "explanationZh": "280 + 56 = 336。"
      },
      {
        "id": "w11-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "Using a 4-box area model for 24 × 18, which four partial products are summed?",
        "questionZh": "计算 24 × 18 的四格面积模型中，相加的四个部分乘积分别是？",
        "optionsEn": [
          "200, 160, 40, 32",
          "200, 80, 40, 32",
          "200, 180, 40, 24",
          "300, 160, 40, 32"
        ],
        "optionsZh": [
          "200, 160, 40, 32（总和 432）",
          "200, 80, 40, 32",
          "200, 180, 40, 24",
          "300, 160, 40, 32"
        ],
        "correctIndex": 0,
        "secretClueEn": "(20+4) × (10+8): 20×10=200, 20×8=160, 4×10=40, 4×8=32.",
        "secretClueZh": "(20+4) × (10+8)：20×10=200，20×8=160，4×10=40，4×8=32。总和为 432。",
        "explanationEn": "200 + 160 + 40 + 32 = 432.",
        "explanationZh": "四格乘积为 200、160、40、32，总计 432。"
      },
      {
        "id": "w11-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "If a × b = 144, and a and b are both 2-digit numbers, what is the smallest possible sum a + b?",
        "questionZh": "若两位数 a 与两位数 b 的乘积为 144，a + b 的最小可能和是多少？",
        "optionsEn": [
          "25",
          "24",
          "26",
          "28"
        ],
        "optionsZh": [
          "25",
          "24（12 + 12）",
          "26",
          "28"
        ],
        "correctIndex": 1,
        "secretClueEn": "To minimize the sum of two factors with a fixed product, make them as close as possible! 12 × 12 = 144.",
        "secretClueZh": "积一定时，两因数越接近，和越小！12 × 12 = 144，且都是两位数。12 + 12 = 24。",
        "explanationEn": "12 × 12 = 144. Both are 2-digit numbers. 12 + 12 = 24.",
        "explanationZh": "因数越接近和越小，12 + 12 = 24。"
      },
      {
        "id": "w11-q5",
        "tier": "easy",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "What is 5 × 60?",
        "questionZh": "5 × 60 等于多少？",
        "optionsEn": [
          "250",
          "350",
          "300",
          "360"
        ],
        "optionsZh": [
          "250",
          "350",
          "300",
          "360"
        ],
        "correctIndex": 2,
        "secretClueEn": "5 × 6 = 30, so 5 × 60 = 300.",
        "secretClueZh": "5 × 6 = 30，后面添一个 0 就是 300。",
        "explanationEn": "5 × 60 = 300.",
        "explanationZh": "5 × 60 = 300。"
      }
    ]
  },
  {
    "week": 12,
    "season": "Winter Glacier",
    "strandKey": "operations",
    "strandEn": "Multiplication & Division",
    "strandZh": "有余数除法与生活分配",
    "titleEn": "Division with Remainders & School Bus Logic",
    "titleZh": "有余数除法与校车乘车决策",
    "landmark": "Millen Woods Mariners Bus Loop",
    "landmarkZh": "米伦伍兹校车环线",
    "descriptionEn": "Interpret remainders in real situations: when do you round up, discard, or keep the remainder?",
    "descriptionZh": "理解除法余数的实际意义：何时进一（租大巴）、何时舍去、何时保留余数？",
    "questions": [
      {
        "id": "w12-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "Solve: 35 ÷ 4 = ?",
        "questionZh": "计算：35 ÷ 4 = ？",
        "optionsEn": [
          "8 R 3",
          "7 R 3",
          "8 R 1",
          "9 R 1"
        ],
        "optionsZh": [
          "8 余 3 (8 R 3)",
          "7 余 3",
          "8 余 1",
          "9 余 1"
        ],
        "correctIndex": 0,
        "secretClueEn": "4 × 8 = 32. 35 - 32 = 3 left over.",
        "secretClueZh": "4 × 8 = 32。35 - 32 = 3（余数是3）。",
        "explanationEn": "4 × 8 = 32, with remainder 3.",
        "explanationZh": "商是 8，余数是 3。"
      },
      {
        "id": "w12-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "50 Grade 4 students are going on a field trip to Laurel Creek. Each van holds 8 students. How many vans are needed to take EVERY student?",
        "questionZh": "米伦伍兹 50 名四年级学生去月桂溪春游。每辆面包车坐 8 人。要载上【所有】学生，最少需要租几辆车？",
        "optionsEn": [
          "6 vans",
          "7 vans",
          "8 vans",
          "5 vans"
        ],
        "optionsZh": [
          "6 辆车",
          "7 辆车（必须进一）",
          "8 辆车",
          "5 辆车"
        ],
        "correctIndex": 1,
        "secretClueEn": "50 ÷ 8 = 6 remainder 2. Those remaining 2 students cannot be left behind! You need 6 + 1 = 7 vans.",
        "secretClueZh": "50 ÷ 8 = 6 余 2。多出的 2 名同学不能被落在学校，所以必须多租 1 辆：6 + 1 = 7 辆！",
        "explanationEn": "6 vans hold 48 students, leaving 2. A 7th van is necessary for all students.",
        "explanationZh": "6 辆车只能坐 48 人，剩余 2 人需要第 7 辆车。"
      },
      {
        "id": "w12-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "A baker has 75 cookies and puts 6 cookies in each gift box. How many FULL boxes can she sell?",
        "questionZh": "面包师傅做了 75 块曲奇饼干，每盒装 6 块。她最多能卖出多少个【装满】的完整礼盒？",
        "optionsEn": [
          "11 boxes",
          "13 boxes",
          "12 boxes",
          "14 boxes"
        ],
        "optionsZh": [
          "11 盒",
          "13 盒",
          "12 盒（舍去余数）",
          "14 盒"
        ],
        "correctIndex": 2,
        "secretClueEn": "75 ÷ 6 = 12 remainder 3. She cannot sell an incomplete box with only 3 cookies!",
        "secretClueZh": "75 ÷ 6 = 12 余 3。剩下的 3 块不够装满一盒，只能装满 12 盒。",
        "explanationEn": "12 full boxes (72 cookies), with 3 cookies left over.",
        "explanationZh": "商为 12，余数 3 无法成盒，故为 12 盒。"
      },
      {
        "id": "w12-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "When a mystery number is divided by 7, the quotient is 14 and the remainder is the largest possible remainder. What is the number?",
        "questionZh": "一个神秘数除以 7，商是 14，余数是可能的最大余数。这个神秘数是多少？",
        "optionsEn": [
          "103",
          "105",
          "98",
          "104"
        ],
        "optionsZh": [
          "103",
          "105",
          "98",
          "104"
        ],
        "correctIndex": 3,
        "secretClueEn": "The remainder must be strictly less than 7, so largest remainder is 6! Number = (14 × 7) + 6.",
        "secretClueZh": "余数必须比除数 7 小，所以最大余数是 6！神秘数 = 14 × 7 + 6 = 98 + 6 = 104。",
        "explanationEn": "(14 × 7) + 6 = 98 + 6 = 104.",
        "explanationZh": "除数是 7，最大余数为 6。14 × 7 + 6 = 104。"
      },
      {
        "id": "w12-q5",
        "tier": "easy",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "What is 42 ÷ 6?",
        "questionZh": "42 ÷ 6 等于多少？",
        "optionsEn": [
          "7",
          "6",
          "8",
          "9"
        ],
        "optionsZh": [
          "7",
          "6",
          "8",
          "9"
        ],
        "correctIndex": 0,
        "secretClueEn": "6 × 7 = 42.",
        "secretClueZh": "六七四十二。",
        "explanationEn": "42 ÷ 6 = 7.",
        "explanationZh": "42 ÷ 6 = 7。"
      }
    ]
  },
  {
    "week": 13,
    "season": "Winter Glacier",
    "strandKey": "operations",
    "strandEn": "Proportional Reasoning",
    "strandZh": "正比例比率表与倍数放大",
    "titleEn": "Ratio Tables & Market Apple Cider Scaling",
    "titleZh": "圣雅各布斯苹果汁正比例比率表",
    "landmark": "St. Jacobs Cider Mill",
    "landmarkZh": "圣雅各布斯苹果榨汁工坊",
    "descriptionEn": "Use multiplicative thinking to scale recipes and fill in ratio tables!",
    "descriptionZh": "运用乘法比例思维，掌握比率表（Ratio Table）的倍数放大与缩小！",
    "questions": [
      {
        "id": "w13-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "It takes 4 fresh apples to make 1 cup of cider. How many apples are needed to make 6 cups?",
        "questionZh": "榨 1 杯苹果汁需要 4 个新鲜苹果。榨 6 杯苹果汁需要多少个苹果？",
        "optionsEn": [
          "10 apples",
          "20 apples",
          "24 apples",
          "28 apples"
        ],
        "optionsZh": [
          "10 个苹果",
          "20 个苹果",
          "24 个苹果",
          "28 个苹果"
        ],
        "correctIndex": 2,
        "secretClueEn": "Multiply both by 6: 1 cup × 6 = 6 cups. 4 apples × 6 = 24 apples.",
        "secretClueZh": "比例放大 6 倍：4 × 6 = 24 个。",
        "explanationEn": "4 × 6 = 24 apples.",
        "explanationZh": "4 × 6 = 24 个苹果。"
      },
      {
        "id": "w13-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "A recipe for 8 pancakes requires 2 eggs and 250 mL of milk. To make 24 pancakes, how much milk do you need?",
        "questionZh": "做 8 张松饼需要 2 个鸡蛋和 250 mL 牛奶。要制作 24 张松饼，需要多少 mL 牛奶？",
        "optionsEn": [
          "600 mL",
          "500 mL",
          "1,000 mL",
          "750 mL"
        ],
        "optionsZh": [
          "600 mL",
          "500 mL",
          "1,000 mL",
          "750 mL（放大 3 倍）"
        ],
        "correctIndex": 3,
        "secretClueEn": "24 pancakes is 3 times 8 (8 × 3 = 24). So multiply milk by 3: 250 × 3 = ?",
        "secretClueZh": "24 张是 8 张的 3 倍。牛奶也需放大 3 倍：250 × 3 = 750 mL。",
        "explanationEn": "Scale factor is 3. 250 mL × 3 = 750 mL.",
        "explanationZh": "放大倍数为 3，250 × 3 = 750 mL。"
      },
      {
        "id": "w13-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "In a ratio table: 3 muffins cost $5. How much will 18 muffins cost?",
        "questionZh": "比率表中：3 个松饼售价 $5 加元。买 18 个松饼需要多少加元？",
        "optionsEn": [
          "$30",
          "$25",
          "$36",
          "$15"
        ],
        "optionsZh": [
          "$30 加元",
          "$25",
          "$36",
          "$15"
        ],
        "correctIndex": 0,
        "secretClueEn": "18 muffins is 6 times 3 muffins (18 ÷ 3 = 6). 6 × $5 = $30!",
        "secretClueZh": "18 是 3 的 6 倍。价格也是 6 倍：6 × 5 = 30 加元。",
        "explanationEn": "6 × $5 = $30.",
        "explanationZh": "倍数放大 6 倍：6 × $5 = $30。"
      },
      {
        "id": "w13-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "A gear with 12 teeth turns 15 times. It is connected to a gear with 20 teeth. How many times does the 20-tooth gear turn?",
        "questionZh": "一个 12 齿的齿轮转动了 15 圈，它带动着一个 20 齿的大齿轮。这个 20 齿的齿轮转动了多少圈？",
        "optionsEn": [
          "10 turns",
          "9 turns",
          "8 turns",
          "12 turns"
        ],
        "optionsZh": [
          "10 圈",
          "9 圈",
          "8 圈",
          "12 圈"
        ],
        "correctIndex": 1,
        "secretClueEn": "Total teeth moved = 12 × 15 = 180 teeth. For the 20-tooth gear: 180 ÷ 20 = 9 turns!",
        "secretClueZh": "啮合咬合过的总齿数相同：12 × 15 = 180 齿。20 齿的齿轮需转 180 ÷ 20 = 9 圈。",
        "explanationEn": "Total teeth = 180. 180 ÷ 20 = 9 turns.",
        "explanationZh": "总齿数相等：12 × 15 = 180，180 ÷ 20 = 9 圈。"
      },
      {
        "id": "w13-q5",
        "tier": "med",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "If 2 pens cost $6, how much do 5 pens cost?",
        "questionZh": "如果 2 支水彩笔共 $6，那么 5 支水彩笔多少钱？",
        "optionsEn": [
          "$10",
          "$12",
          "$15",
          "$18"
        ],
        "optionsZh": [
          "$10",
          "$12",
          "$15",
          "$18"
        ],
        "correctIndex": 2,
        "secretClueEn": "Find the unit price first: $6 ÷ 2 = $3 per pen. 5 × $3 = $15.",
        "secretClueZh": "先求单价：6 ÷ 2 = 3 加元/支。5 支就是 5 × 3 = 15 加元。",
        "explanationEn": "Unit rate is $3/pen. 5 × $3 = $15.",
        "explanationZh": "单价 $3，5 × $3 = $15。"
      }
    ]
  },
  {
    "week": 14,
    "season": "Winter Glacier",
    "strandKey": "fractions",
    "strandEn": "Fractional Reasoning",
    "strandZh": "真分数、假分数与带分数",
    "titleEn": "Fractions of a Whole & Mixed Numbers",
    "titleZh": "真假分数、带分数互化与披萨派对",
    "landmark": "Mariners Cafeteria",
    "landmarkZh": "米伦伍兹水手餐厅",
    "descriptionEn": "Represent fractions greater than 1 as improper fractions and mixed numbers (e.g., 7/4 = 1 3/4)!",
    "descriptionZh": "掌握大于 1 的分数的带分数与假分数相互转换，熟练掌握分数条模型！",
    "questions": [
      {
        "id": "w14-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "Convert the improper fraction 7/4 into a mixed number.",
        "questionZh": "将假分数 7/4 转换为带分数。",
        "optionsEn": [
          "1 3/4",
          "2 1/4",
          "1 1/4",
          "1 2/4"
        ],
        "optionsZh": [
          "1 又 3/4 (1 3/4)",
          "2 又 1/4",
          "1 又 1/4",
          "1 又 2/4"
        ],
        "correctIndex": 0,
        "secretClueEn": "7 ÷ 4 = 1 whole, with 3 left over as the numerator.",
        "secretClueZh": "7 ÷ 4 = 1 个整数，余数为 3，所以是 1 又 3/4。",
        "explanationEn": "7 fourths = 4 fourths (1 whole) + 3 fourths = 1 3/4.",
        "explanationZh": "4/4 是 1，还剩 3/4，即 1 3/4。"
      },
      {
        "id": "w14-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "Convert 2 3/5 into an improper fraction.",
        "questionZh": "将带分数 2 又 3/5 转换为假分数。",
        "optionsEn": [
          "11/5",
          "13/5",
          "15/5",
          "10/5"
        ],
        "optionsZh": [
          "11/5",
          "13/5",
          "15/5",
          "10/5"
        ],
        "correctIndex": 1,
        "secretClueEn": "Multiply whole by denominator (2 × 5 = 10), then add numerator (10 + 3 = 13). Keep denominator 5!",
        "secretClueZh": "整数乘分母加分子：2 × 5 + 3 = 13，分母保持 5，即 13/5。",
        "explanationEn": "(2 × 5 + 3) / 5 = 13/5.",
        "explanationZh": "(2 × 5 + 3) / 5 = 13/5。"
      },
      {
        "id": "w14-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "Which fraction is equivalent to 3/4?",
        "questionZh": "下列哪个分数与 3/4 等值（Equivalent）？",
        "optionsEn": [
          "8/12",
          "6/10",
          "9/12",
          "5/8"
        ],
        "optionsZh": [
          "8/12",
          "6/10",
          "9/12 (分子分母同乘3)",
          "5/8"
        ],
        "correctIndex": 2,
        "secretClueEn": "Multiply top and bottom by 3: (3 × 3) / (4 × 3) = 9/12.",
        "secretClueZh": "分子分母同时乘 3：(3 × 3)/(4 × 3) = 9/12。",
        "explanationEn": "3/4 = 9/12.",
        "explanationZh": "3/4 与 9/12 等值。"
      },
      {
        "id": "w14-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "Which fraction is strictly greater than 5/8?",
        "questionZh": "下列哪个分数严格大于 5/8？",
        "optionsEn": [
          "7/12",
          "1/2",
          "9/16",
          "2/3"
        ],
        "optionsZh": [
          "7/12",
          "1/2",
          "9/16",
          "2/3"
        ],
        "correctIndex": 3,
        "secretClueEn": "Compare 5/8 (0.625) and 2/3 (0.667). 2/3 is 16/24 and 5/8 is 15/24. 16/24 > 15/24!",
        "secretClueZh": "通分比较：5/8 = 15/24；2/3 = 16/24。因为 16 > 15，所以 2/3 大于 5/8！",
        "explanationEn": "2/3 = 16/24 > 15/24 = 5/8.",
        "explanationZh": "通分得 16/24 > 15/24，故 2/3 更大。"
      },
      {
        "id": "w14-q5",
        "tier": "easy",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "In a bag of 12 marbles, 4 are red. What fraction of the marbles are red in simplest form?",
        "questionZh": "一袋 12 颗玻璃弹珠中有 4 颗是红色的。红色弹珠占几分之几（最简分数）？",
        "optionsEn": [
          "1/3",
          "1/4",
          "4/12",
          "2/5"
        ],
        "optionsZh": [
          "1/3（最简分数）",
          "1/4",
          "4/12",
          "2/5"
        ],
        "correctIndex": 0,
        "secretClueEn": "Divide top and bottom by 4: (4 ÷ 4) / (12 ÷ 4) = 1/3.",
        "secretClueZh": "分子分母同时除以 4：4/12 约分为 1/3。",
        "explanationEn": "4/12 = 1/3.",
        "explanationZh": "4/12 约简为 1/3。"
      }
    ]
  },
  {
    "week": 15,
    "season": "Winter Glacier",
    "strandKey": "fractions",
    "strandEn": "Decimals & Tenths",
    "strandZh": "十分之一小数与加减法",
    "titleEn": "Decimal Tenths & Metro Dollar Store Change",
    "titleZh": "十分之一小数加减与一元店找零",
    "landmark": "Conestoga Mall Shopping Centre",
    "landmarkZh": "Conestoga 购物中心",
    "descriptionEn": "Connect tenths fractions (e.g. 3/10 = 0.3) to money and number line decimal positions!",
    "descriptionZh": "建立十分之一分数（3/10 = 0.3）与小数数轴的联系，解决简单小数加减！",
    "questions": [
      {
        "id": "w15-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "What is the fraction 7/10 written as a decimal?",
        "questionZh": "分数 7/10 写成小数形式是多少？",
        "optionsEn": [
          "7.0",
          "0.07",
          "0.7",
          "0.70"
        ],
        "optionsZh": [
          "7.0",
          "0.07",
          "0.7",
          "0.70"
        ],
        "correctIndex": 2,
        "secretClueEn": "Tenths is the first digit after the decimal point: 0.7.",
        "secretClueZh": "十分位是小数点后第一位数字：0.7。",
        "explanationEn": "7 tenths = 0.7.",
        "explanationZh": "7/10 = 0.7。"
      },
      {
        "id": "w15-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "Calculate: 3.4 + 2.8 = ?",
        "questionZh": "计算小数加法：3.4 + 2.8 = ？",
        "optionsEn": [
          "5.12",
          "5.2",
          "6.12",
          "6.2"
        ],
        "optionsZh": [
          "5.12",
          "5.2",
          "6.12",
          "6.2"
        ],
        "correctIndex": 3,
        "secretClueEn": "Add tenths: 4 + 8 = 12 tenths (1 whole and 2 tenths). 3 + 2 + 1 = 6. Result: 6.2.",
        "secretClueZh": "4 个 0.1 加 8 个 0.1 是 1.2。3 + 2 + 1.2 = 6.2。",
        "explanationEn": "3.4 + 2.8 = 6.2.",
        "explanationZh": "3.4 + 2.8 = 6.2。"
      },
      {
        "id": "w15-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "Solve: 5.0 - 1.7 = ?",
        "questionZh": "计算小数减法：5.0 - 1.7 = ？",
        "optionsEn": [
          "3.3",
          "3.7",
          "4.3",
          "3.4"
        ],
        "optionsZh": [
          "3.3",
          "3.7",
          "4.3",
          "3.4"
        ],
        "correctIndex": 0,
        "secretClueEn": "Regroup 5.0 into 4 wholes and 10 tenths. 10 tenths - 7 tenths = 3 tenths. 4 - 1 = 3.",
        "secretClueZh": "借位：5.0 看作 4 元加 10 角。10 - 7 = 3 角，4 - 1 = 3 元。结果 3.3。",
        "explanationEn": "5.0 - 1.7 = 3.3.",
        "explanationZh": "5.0 - 1.7 = 3.3。"
      },
      {
        "id": "w15-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "Which decimal is exactly halfway between 4.6 and 5.2 on a number line?",
        "questionZh": "在数轴上，哪个小数恰好位于 4.6 和 5.2 的正中点？",
        "optionsEn": [
          "4.8",
          "4.9",
          "5.0",
          "4.95"
        ],
        "optionsZh": [
          "4.8",
          "4.9（中点值）",
          "5.0",
          "4.95"
        ],
        "correctIndex": 1,
        "secretClueEn": "Distance between 4.6 and 5.2 is 0.6. Half of 0.6 is 0.3. 4.6 + 0.3 = 4.9!",
        "secretClueZh": "两数相差 5.2 - 4.6 = 0.6。一半距离是 0.3。4.6 + 0.3 = 4.9。",
        "explanationEn": "(4.6 + 5.2) / 2 = 9.8 / 2 = 4.9.",
        "explanationZh": "平均中点为 4.9。"
      },
      {
        "id": "w15-q5",
        "tier": "easy",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "Which is larger: 0.8 or 0.6?",
        "questionZh": "哪个小数更大：0.8 还是 0.6？",
        "optionsEn": [
          "They are equal",
          "0.6",
          "0.8",
          "Cannot tell"
        ],
        "optionsZh": [
          "两者相等",
          "0.6",
          "0.8",
          "无法确定"
        ],
        "correctIndex": 2,
        "secretClueEn": "8 tenths is greater than 6 tenths.",
        "secretClueZh": "8 个十分之一大于 6 个十分之一。",
        "explanationEn": "0.8 > 0.6.",
        "explanationZh": "0.8 大于 0.6。"
      }
    ]
  },
  {
    "week": 16,
    "season": "Winter Glacier",
    "strandKey": "algebra",
    "strandEn": "Patterns & Relations",
    "strandZh": "数列规律与输入输出机",
    "titleEn": "Growing Patterns & Function Machine",
    "titleZh": "递增数列规律与函数机器",
    "landmark": "University of Waterloo Davis Centre",
    "landmarkZh": "滑铁卢大学戴维斯计算机中心",
    "descriptionEn": "Discover pattern rules (start at X and add Y) and tables of values at UW Davis Centre!",
    "descriptionZh": "发现数列规律（起始于 X，每次增加 Y）并预测第 N 项的值！",
    "questions": [
      {
        "id": "w16-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "What are the next two numbers in the pattern: 4, 11, 18, 25, ___ , ___ ?",
        "questionZh": "数列的接下来两个数是什么：4, 11, 18, 25, ___ , ___ ？",
        "optionsEn": [
          "32, 39",
          "30, 35",
          "31, 38",
          "33, 40"
        ],
        "optionsZh": [
          "32, 39（每次加7）",
          "30, 35",
          "31, 38",
          "33, 40"
        ],
        "correctIndex": 0,
        "secretClueEn": "Find the rule: 11 - 4 = 7. Each term adds 7! 25 + 7 = 32, 32 + 7 = 39.",
        "secretClueZh": "寻找步长：11 - 4 = 7，每次加 7。25 + 7 = 32，32 + 7 = 39。",
        "explanationEn": "Rule: Start at 4 and add 7. Next numbers are 32 and 39.",
        "explanationZh": "规律：每次增加 7。后续数字为 32, 39。"
      },
      {
        "id": "w16-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "A function machine rule is: \"Multiply input by 3, then add 2\". If the input is 8, what is the output?",
        "questionZh": "函数机器的规则是：“输入值乘 3，再加 2”。若输入是 8，输出值是多少？",
        "optionsEn": [
          "24",
          "26",
          "30",
          "28"
        ],
        "optionsZh": [
          "24",
          "26",
          "30",
          "28"
        ],
        "correctIndex": 1,
        "secretClueEn": "8 × 3 = 24. Then add 2: 24 + 2 = 26.",
        "secretClueZh": "8 × 3 = 24，24 + 2 = 26。",
        "explanationEn": "(8 × 3) + 2 = 26.",
        "explanationZh": "8 × 3 + 2 = 26。"
      },
      {
        "id": "w16-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "In a growing toothpick pattern: Figure 1 has 4 toothpicks, Figure 2 has 7, Figure 3 has 10. How many toothpicks in Figure 10?",
        "questionZh": "牙签摆成正方形链：图1用 4 根牙签，图2用 7 根，图3用 10 根。图10需要多少根牙签？",
        "optionsEn": [
          "28",
          "30",
          "31",
          "34"
        ],
        "optionsZh": [
          "28",
          "30",
          "31（公式：3n + 1）",
          "34"
        ],
        "correctIndex": 2,
        "secretClueEn": "Rule: Each new figure adds 3 toothpicks. Formula = (Figure × 3) + 1. For Figure 10: (10 × 3) + 1 = 31!",
        "secretClueZh": "规律：每次增加 3 根。第 n 幅图 = 3 × n + 1。对于图 10：3 × 10 + 1 = 31 根。",
        "explanationEn": "Figure 10 = (10 × 3) + 1 = 31 toothpicks.",
        "explanationZh": "3 × 10 + 1 = 31 根。"
      },
      {
        "id": "w16-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "What is the sum of the first 10 odd numbers: 1 + 3 + 5 + 7 + 9 + 11 + 13 + 15 + 17 + 19?",
        "questionZh": "前 10 个奇数的和是多少：1 + 3 + 5 + 7 + 9 + 11 + 13 + 15 + 17 + 19？",
        "optionsEn": [
          "120",
          "90",
          "110",
          "100"
        ],
        "optionsZh": [
          "120",
          "90",
          "110",
          "100（奇数和公式：10 × 10）"
        ],
        "correctIndex": 3,
        "secretClueEn": "Gauss pairing trick: 1 + 19 = 20, 3 + 17 = 20, 5 + 15 = 20... 5 pairs of 20 = 100! Or n × n = 10 × 10.",
        "secretClueZh": "高斯配对法：1+19=20，3+17=20，共 5 对 20，5 × 20 = 100！前 n 个奇数之和正好等于 n 的平方（10² = 100）。",
        "explanationEn": "10 × 10 = 100.",
        "explanationZh": "前 10 个奇数之和为 10² = 100。"
      },
      {
        "id": "w16-q5",
        "tier": "med",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "If the pattern is: 100, 85, 70, 55... what is the next number?",
        "questionZh": "若递减数列为：100, 85, 70, 55... 接下来的数是多少？",
        "optionsEn": [
          "40",
          "45",
          "35",
          "50"
        ],
        "optionsZh": [
          "40（每次减15）",
          "45",
          "35",
          "50"
        ],
        "correctIndex": 0,
        "secretClueEn": "Rule: Subtract 15 each time. 55 - 15 = 40.",
        "secretClueZh": "规律：每次减少 15。55 - 15 = 40。",
        "explanationEn": "55 - 15 = 40.",
        "explanationZh": "55 - 15 = 40。"
      }
    ]
  },
  {
    "week": 17,
    "season": "Winter Glacier",
    "strandKey": "algebra",
    "strandEn": "Equations & Balance",
    "strandZh": "天平平衡方程与未知数",
    "titleEn": "Balance Scales & Mystery Variables",
    "titleZh": "天平平衡方程与未知数探秘",
    "landmark": "Perimeter Institute Physics Lab",
    "landmarkZh": "圆周研究所物理实验室",
    "descriptionEn": "Keep the balance equal! Solve for unknown variables on two-pan balance scales.",
    "descriptionZh": "维持天平两端恒等，求解天平未知砝码质量！",
    "questions": [
      {
        "id": "w17-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "A balanced scale has (x + 15) grams on the left and 40 grams on the right. What is x?",
        "questionZh": "天平左盘是 (x + 15) 克，右盘是 40 克，此时天平完全平衡。x 是多少克？",
        "optionsEn": [
          "35",
          "55",
          "25",
          "20"
        ],
        "optionsZh": [
          "35 克",
          "55 克",
          "25 克",
          "20 克"
        ],
        "correctIndex": 2,
        "secretClueEn": "Subtract 15 from both sides: x = 40 - 15.",
        "secretClueZh": "两端同时减去 15：x = 40 - 15 = 25 克。",
        "explanationEn": "40 - 15 = 25.",
        "explanationZh": "40 - 15 = 25。"
      },
      {
        "id": "w17-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "Solve for mystery weight n: 3 × n = 42.",
        "questionZh": "求解未知砝码 n：3 × n = 42。",
        "optionsEn": [
          "13",
          "12",
          "16",
          "14"
        ],
        "optionsZh": [
          "13",
          "12",
          "16",
          "14"
        ],
        "correctIndex": 3,
        "secretClueEn": "Divide both sides by 3: 42 ÷ 3 = ? (30 ÷ 3 = 10, 12 ÷ 3 = 4).",
        "secretClueZh": "两边同除以 3：42 ÷ 3 = 14。",
        "explanationEn": "42 ÷ 3 = 14.",
        "explanationZh": "42 ÷ 3 = 14。"
      },
      {
        "id": "w17-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "Solve for x: 2x + 8 = 26.",
        "questionZh": "求解两步方程：2x + 8 = 26。",
        "optionsEn": [
          "9",
          "8",
          "10",
          "7"
        ],
        "optionsZh": [
          "9",
          "8",
          "10",
          "7"
        ],
        "correctIndex": 0,
        "secretClueEn": "Step 1: Subtract 8 from both sides (2x = 18). Step 2: Divide by 2 (x = 18 ÷ 2 = 9).",
        "secretClueZh": "第一步：两边减 8 得 2x = 18。第二步：两边除以 2 得 x = 9。",
        "explanationEn": "2x = 18, so x = 9.",
        "explanationZh": "2x = 18，因此 x = 9。"
      },
      {
        "id": "w17-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "Two identical apples and one banana cost $5. Four identical apples and one banana cost $8. How much is one apple?",
        "questionZh": "买 2 个相同的苹果和 1 根香蕉共 $5 加元；买 4 个苹果和 1 根香蕉共 $8 加元。1 个苹果多少钱？",
        "optionsEn": [
          "$1.00",
          "$1.50",
          "$2.00",
          "$1.25"
        ],
        "optionsZh": [
          "$1.00",
          "$1.50 加元",
          "$2.00",
          "$1.25"
        ],
        "correctIndex": 1,
        "secretClueEn": "Notice the difference! 2 extra apples cost $8 - $5 = $3. So one apple = $3 ÷ 2 = $1.50!",
        "secretClueZh": "消元法：多买了 2 个苹果，多花了 8 - 5 = 3 元。所以 2 个苹果值 3 元，1 个苹果就是 3 ÷ 2 = 1.50 元！",
        "explanationEn": "2 apples = $3. 1 apple = $1.50.",
        "explanationZh": "多出的 2 个苹果值 $3，因此 1 个苹果单价为 $1.50。"
      },
      {
        "id": "w17-q5",
        "tier": "med",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "Which value of y makes this inequality true: y + 7 < 15?",
        "questionZh": "下列哪个 y 的值能使不等式成立：y + 7 < 15？",
        "optionsEn": [
          "9",
          "8",
          "6",
          "10"
        ],
        "optionsZh": [
          "9",
          "8",
          "6",
          "10"
        ],
        "correctIndex": 2,
        "secretClueEn": "y must be strictly less than 15 - 7 = 8. Only 6 is less than 8!",
        "secretClueZh": "y 必须严格小于 15 - 7 = 8。选项中只有 6 小于 8。",
        "explanationEn": "6 + 7 = 13 < 15.",
        "explanationZh": "6 + 7 = 13 < 15。"
      }
    ]
  },
  {
    "week": 18,
    "season": "Winter Glacier",
    "strandKey": "fractions",
    "strandEn": "Fractions of a Set",
    "strandZh": "集合的分数与部分量",
    "titleEn": "Fractions of a Set & Team Jerseys",
    "titleZh": "集合的分数与球队球衣分配",
    "landmark": "Manulife Sportsplex Fields",
    "landmarkZh": "宏利金融体育场",
    "descriptionEn": "Calculate fractional parts of whole sets (e.g. 3/5 of 25 soccer players)!",
    "descriptionZh": "计算集合的分数（如 25 名足球队员的 3/5 是多少人）！",
    "questions": [
      {
        "id": "w18-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "What is 1/4 of 24 soccer balls?",
        "questionZh": "24 个足球的 1/4 是多少个？",
        "optionsEn": [
          "6",
          "4",
          "8",
          "5"
        ],
        "optionsZh": [
          "6 个",
          "4 个",
          "8 个",
          "5 个"
        ],
        "correctIndex": 0,
        "secretClueEn": "Divide 24 by 4: 24 ÷ 4 = 6.",
        "secretClueZh": "用 24 除以分母 4：24 ÷ 4 = 6。",
        "explanationEn": "24 ÷ 4 = 6 balls.",
        "explanationZh": "24 ÷ 4 = 6。"
      },
      {
        "id": "w18-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "What is 3/5 of 35 runners?",
        "questionZh": "35 名长跑选手的 3/5 是多少人？",
        "optionsEn": [
          "20",
          "21",
          "25",
          "15"
        ],
        "optionsZh": [
          "20 人",
          "21 人",
          "25 人",
          "15 人"
        ],
        "correctIndex": 1,
        "secretClueEn": "First find 1/5: 35 ÷ 5 = 7. Then multiply by 3: 7 × 3 = 21!",
        "secretClueZh": "先求 1/5：35 ÷ 5 = 7 人。再乘分子 3：7 × 3 = 21 人！",
        "explanationEn": "(35 ÷ 5) × 3 = 7 × 3 = 21.",
        "explanationZh": "35 ÷ 5 × 3 = 21。"
      },
      {
        "id": "w18-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "In a grade 4 class of 30 students, 2/3 ride bikes and 1/5 walk. How many students do neither?",
        "questionZh": "一个 30 人的四年级班级里，2/3 骑自行车，1/5 步行。其余同学乘校车，乘校车的有多少人？",
        "optionsEn": [
          "5 students",
          "6 students",
          "4 students",
          "3 students"
        ],
        "optionsZh": [
          "5 人",
          "6 人",
          "4 人",
          "3 人"
        ],
        "correctIndex": 2,
        "secretClueEn": "Bike: 2/3 of 30 = 20. Walk: 1/5 of 30 = 6. Total = 26. Rest = 30 - 26 = 4!",
        "secretClueZh": "骑车：30 的 2/3 是 20 人。步行：30 的 1/5 是 6 人。合共 26 人。剩下 30 - 26 = 4 人！",
        "explanationEn": "20 + 6 = 26. 30 - 26 = 4 students.",
        "explanationZh": "30 - 20 - 6 = 4 人。"
      },
      {
        "id": "w18-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "If 3/8 of a mystery number is 24, what is the whole number?",
        "questionZh": "如果一个数的 3/8 是 24，那么这个数原本是多少？",
        "optionsEn": [
          "48",
          "72",
          "56",
          "64"
        ],
        "optionsZh": [
          "48",
          "72",
          "56",
          "64（逆向还原）"
        ],
        "correctIndex": 3,
        "secretClueEn": "If 3 parts = 24, then 1 part = 24 ÷ 3 = 8. The whole has 8 parts: 8 × 8 = 64!",
        "secretClueZh": "3 份是 24，那么 1 份就是 24 ÷ 3 = 8。整个数有 8 份：8 × 8 = 64！",
        "explanationEn": "(24 ÷ 3) × 8 = 8 × 8 = 64.",
        "explanationZh": "24 ÷ 3 × 8 = 64。"
      },
      {
        "id": "w18-q5",
        "tier": "easy",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "What is 1/2 of 50?",
        "questionZh": "50 的 1/2 是多少？",
        "optionsEn": [
          "25",
          "20",
          "30",
          "15"
        ],
        "optionsZh": [
          "25",
          "20",
          "30",
          "15"
        ],
        "correctIndex": 0,
        "secretClueEn": "Divide 50 by 2 = 25.",
        "secretClueZh": "50 除以 2 等于 25。",
        "explanationEn": "50 ÷ 2 = 25.",
        "explanationZh": "50 ÷ 2 = 25。"
      }
    ]
  },
  {
    "week": 25,
    "season": "Spring Expedition",
    "strandKey": "measurement",
    "strandEn": "Measurement & Geometry",
    "strandZh": "长方形周长与面积",
    "titleEn": "Perimeter vs. Area: Mariners Garden Plots",
    "titleZh": "米伦伍兹生态菜园的周长与面积",
    "landmark": "Millen Woods Mariners Eco-Garden",
    "landmarkZh": "米伦伍兹生态菜园",
    "descriptionEn": "Distinguish between distance around (perimeter) and flat space covered (area) in metric units!",
    "descriptionZh": "区分围绕边缘的一周长度（周长）与平面覆盖大小（面积）！",
    "questions": [
      {
        "id": "w25-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "A rectangular garden bed is 8 m long and 5 m wide. What is its Perimeter (distance around)?",
        "questionZh": "一个长方形菜坛长 8 米，宽 5 米。它的周长（Perimeter）是多少米？",
        "optionsEn": [
          "13 m",
          "40 m",
          "26 m",
          "32 m"
        ],
        "optionsZh": [
          "13 米",
          "40 米",
          "26 米",
          "32 米"
        ],
        "correctIndex": 2,
        "secretClueEn": "Perimeter = 2 × (Length + Width). 2 × (8 + 5) = 2 × 13 = 26 m.",
        "secretClueZh": "周长 = 2 × (长 + 宽)。2 × (8 + 5) = 2 × 13 = 26 米。",
        "explanationEn": "8 + 5 + 8 + 5 = 26 m.",
        "explanationZh": "周长为 26 米。"
      },
      {
        "id": "w25-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "What is the Area of the same garden bed (8 m by 5 m)?",
        "questionZh": "这个菜坛（长 8 米，宽 5 米）的面积（Area）是多少平方米？",
        "optionsEn": [
          "48 m²",
          "26 m²",
          "80 m²",
          "40 m²"
        ],
        "optionsZh": [
          "48 m²",
          "26 m²",
          "80 m²",
          "40 平方米 (40 m²)"
        ],
        "correctIndex": 3,
        "secretClueEn": "Area = Length × Width. 8 × 5 = 40 square meters.",
        "secretClueZh": "面积 = 长 × 宽。8 × 5 = 40 平方米。",
        "explanationEn": "8 × 5 = 40 m².",
        "explanationZh": "面积为 40 平方米。"
      },
      {
        "id": "w25-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "A rectangular playground has a perimeter of 36 m. The length is 10 m. What is its width?",
        "questionZh": "一个长方形游乐场的周长是 36 米，长是 10 米。它的宽是多少米？",
        "optionsEn": [
          "8 m",
          "16 m",
          "18 m",
          "7 m"
        ],
        "optionsZh": [
          "8 米",
          "16 米",
          "18 米",
          "7 米"
        ],
        "correctIndex": 0,
        "secretClueEn": "Semi-perimeter = 36 ÷ 2 = 18 m. Width = 18 - 10 = 8 m.",
        "secretClueZh": "半周长（长+宽）= 36 ÷ 2 = 18 米。宽 = 18 - 10 = 8 米。",
        "explanationEn": "36 ÷ 2 = 18. 18 - 10 = 8 m.",
        "explanationZh": "宽为 8 米。"
      },
      {
        "id": "w25-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "You have 24 meters of fence to build a rectangular garden. What is the MAXIMUM possible area you can enclose?",
        "questionZh": "用 24 米长的围栏围成一个长方形花园。能围出的【最大可能面积】是多少平方米？",
        "optionsEn": [
          "32 m²",
          "36 m² (Square: 6m × 6m)",
          "35 m²",
          "40 m²"
        ],
        "optionsZh": [
          "32 m²",
          "36 平方米（正方形 6m × 6m）",
          "35 m²",
          "40 m²"
        ],
        "correctIndex": 1,
        "secretClueEn": "When perimeter is fixed, a SQUARE gives the largest area! Perimeter 24 -> side = 24 ÷ 4 = 6 m. Area = 6 × 6 = 36 m².",
        "secretClueZh": "周长一定时，围成正方形面积最大！边长 = 24 ÷ 4 = 6 米。面积 = 6 × 6 = 36 平方米。",
        "explanationEn": "A 6m × 6m square has perimeter 24m and area 36 m², which is the maximum.",
        "explanationZh": "正方形面积最大：6 × 6 = 36 平方米。"
      },
      {
        "id": "w25-q5",
        "tier": "easy",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "How many centimeters are in 3 meters?",
        "questionZh": "3 米等于多少厘米（cm）？",
        "optionsEn": [
          "3,000 cm",
          "30 cm",
          "300 cm",
          "30,000 cm"
        ],
        "optionsZh": [
          "3,000 cm",
          "30 cm",
          "300 厘米",
          "30,000 cm"
        ],
        "correctIndex": 2,
        "secretClueEn": "1 meter = 100 cm. So 3 meters = 3 × 100 = 300 cm.",
        "secretClueZh": "1 米 = 100 厘米，3 米 = 300 厘米。",
        "explanationEn": "3 × 100 = 300 cm.",
        "explanationZh": "3 米 = 300 厘米。"
      }
    ]
  },
  {
    "week": 30,
    "season": "Spring Expedition",
    "strandKey": "measurement",
    "strandEn": "Elapsed Time",
    "strandZh": "经过时间与作息计算",
    "titleEn": "Elapsed Time on Laurel Creek Trails",
    "titleZh": "月桂溪森林步道的经过时间计算",
    "landmark": "Laurel Creek Nature Centre",
    "landmarkZh": "月桂溪自然教育中心",
    "descriptionEn": "Calculate start time, end time, and duration across hours and minutes on hiking trails!",
    "descriptionZh": "跨越小时与分钟，熟练计算开始时间、结束时间与经过时长！",
    "questions": [
      {
        "id": "w30-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "Mariner hikers started a trail at 1:15 PM and finished at 2:45 PM. How long was their hike?",
        "questionZh": "水手徒步队下午 1:15 出发，下午 2:45 到达终点。徒步一共用了多久？",
        "optionsEn": [
          "1 hour 30 minutes",
          "1 hour 15 minutes",
          "2 hours",
          "45 minutes"
        ],
        "optionsZh": [
          "1 小时 30 分钟",
          "1 小时 15 分钟",
          "2 小时",
          "45 分钟"
        ],
        "correctIndex": 0,
        "secretClueEn": "From 1:15 to 2:15 is 1 hour. From 2:15 to 2:45 is another 30 minutes. 1 hour + 30 min!",
        "secretClueZh": "1:15 到 2:15 是 1 小时；2:15 到 2:45 又经过 30 分钟。合共 1 小时 30 分钟。",
        "explanationEn": "2:45 - 1:15 = 1 hour 30 minutes.",
        "explanationZh": "经过时间为 1 小时 30 分钟。"
      },
      {
        "id": "w30-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "A soccer match at RIM Park lasted 75 minutes. It ended at 4:10 PM. What time did it start?",
        "questionZh": "RIM Park 的一场足球赛持续了 75 分钟，在下午 4:10 结束。比赛是几点开始的？",
        "optionsEn": [
          "3:05 PM",
          "2:55 PM",
          "2:45 PM",
          "3:15 PM"
        ],
        "optionsZh": [
          "3:05 PM",
          "2:55 PM",
          "2:45 PM",
          "3:15 PM"
        ],
        "correctIndex": 1,
        "secretClueEn": "75 minutes is 1 hour and 15 minutes. Go back 1 hour from 4:10 (3:10 PM), then go back 15 minutes (2:55 PM)!",
        "secretClueZh": "75 分钟 = 1 小时 15 分钟。从 4:10 倒退 1 小时是 3:10，再倒退 15 分钟就是 2:55 PM！",
        "explanationEn": "4:10 PM - 1 hour 15 min = 2:55 PM.",
        "explanationZh": "开始时间是下午 2:55。"
      },
      {
        "id": "w30-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "How many seconds are in 2 hours and 15 minutes?",
        "questionZh": "2 小时 15 分钟一共有多少秒？",
        "optionsEn": [
          "8,000 seconds",
          "7,200 seconds",
          "8,100 seconds",
          "9,000 seconds"
        ],
        "optionsZh": [
          "8,000 秒",
          "7,200 秒",
          "8,100 秒",
          "9,000 秒"
        ],
        "correctIndex": 2,
        "secretClueEn": "2 hours = 120 minutes. 120 + 15 = 135 minutes. 135 × 60 = 8,100 seconds!",
        "secretClueZh": "2 小时 = 120 分钟；共 135 分钟。135 × 60 = 8,100 秒！",
        "explanationEn": "135 min × 60 sec = 8,100 seconds.",
        "explanationZh": "135 × 60 = 8,100 秒。"
      },
      {
        "id": "w30-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "A flight departed Toronto at 9:45 AM and landed in Vancouver at 11:55 AM local time. Vancouver is 3 hours BEHIND Toronto. How long was the actual flight?",
        "questionZh": "航班多伦多时间上午 9:45 起飞，温哥华当地时间上午 11:55 降落。温哥华比多伦多慢 3 小时时差。飞机实际飞行了多久？",
        "optionsEn": [
          "5 hours 45 minutes",
          "2 hours 10 minutes",
          "4 hours 10 minutes",
          "5 hours 10 minutes"
        ],
        "optionsZh": [
          "5 小时 45 分钟",
          "2 小时 10 分钟",
          "4 小时 10 分钟",
          "5 小时 10 分钟"
        ],
        "correctIndex": 3,
        "secretClueEn": "Convert Vancouver landing to Toronto time first: 11:55 AM + 3 hours = 2:55 PM Toronto time! From 9:45 AM to 2:55 PM is 5 hours 10 minutes!",
        "secretClueZh": "统一时区换算：温哥华 11:55 AM 相当于多伦多下午 2:55 PM！从 9:45 AM 到 2:55 PM 经过了 5 小时 10 分钟。",
        "explanationEn": "11:55 AM Vancouver = 2:55 PM Toronto. 9:45 AM to 2:55 PM = 5 hours 10 minutes.",
        "explanationZh": "实际飞行时间为 5 小时 10 分钟。"
      },
      {
        "id": "w30-q5",
        "tier": "easy",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "How many minutes are in 3 hours?",
        "questionZh": "3 个小时有多少分钟？",
        "optionsEn": [
          "180 minutes",
          "120 minutes",
          "240 minutes",
          "150 minutes"
        ],
        "optionsZh": [
          "180 分钟",
          "120 分钟",
          "240 分钟",
          "150 分钟"
        ],
        "correctIndex": 0,
        "secretClueEn": "1 hour = 60 minutes. 3 × 60 = 180.",
        "secretClueZh": "3 × 60 = 180 分钟。",
        "explanationEn": "3 × 60 = 180 minutes.",
        "explanationZh": "3 × 60 = 180 分钟。"
      }
    ]
  },
  {
    "week": 33,
    "season": "Summer Lighthouse",
    "strandKey": "data",
    "strandEn": "Probability",
    "strandZh": "五级概率连续体与公平游戏",
    "titleEn": "5-Level Probability Continuum & Fair Spinners",
    "titleZh": "五级概率连续体与公平转盘游戏",
    "landmark": "Millen Woods Mariners Carnival",
    "landmarkZh": "米伦伍兹狂欢节",
    "descriptionEn": "Categorize outcomes using the 5-level probability continuum: Impossible, Unlikely, Equally Likely, Likely, Certain!",
    "descriptionZh": "使用官方五级概率词汇（不可能、不太可能、等可能、很有可能、必定发生）评估事件与设计公平游戏！",
    "questions": [
      {
        "id": "w33-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "If a bag has 9 blue marbles and 1 red marble, drawing a blue marble is:",
        "questionZh": "若袋子里有 9 颗蓝弹珠和 1 颗红弹珠，随机摸出一颗蓝弹珠是：",
        "optionsEn": [
          "Impossible",
          "Certain",
          "Likely",
          "Equally Likely"
        ],
        "optionsZh": [
          "不可能发生",
          "必定发生（Certain）",
          "很有可能（Likely）",
          "等可能"
        ],
        "correctIndex": 2,
        "secretClueEn": "9 out of 10 are blue. It is not guaranteed (certain), but very high chance: Likely!",
        "secretClueZh": "10 颗里有 9 颗是蓝色。虽然不是 100% 必定发生（有微小概率摸到红），但可能性极高，属于“很有可能”（Likely）。",
        "explanationEn": "9/10 chance is classified as \"Likely\" on the continuum.",
        "explanationZh": "9/10 的概率属于“很有可能”（Likely）。"
      },
      {
        "id": "w33-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "Rolling a standard 6-sided die and getting an even number is:",
        "questionZh": "掷一枚普通的六面骰子，掷出偶数（2, 4, 6）的概率是：",
        "optionsEn": [
          "Unlikely",
          "Impossible",
          "Certain",
          "Equally Likely (50% chance)"
        ],
        "optionsZh": [
          "不太可能",
          "不可能发生",
          "必定发生",
          "等可能（Equally Likely / 50% 机会）"
        ],
        "correctIndex": 3,
        "secretClueEn": "Numbers 2, 4, 6 are even (3 numbers). 1, 3, 5 are odd (3 numbers). 3 out of 6 = half = equally likely!",
        "secretClueZh": "偶数有 3 个，奇数有 3 个，各占一半（3/6 = 50%），是“等可能”（Equally Likely）。",
        "explanationEn": "3 even numbers vs 3 odd numbers means equal likelihood.",
        "explanationZh": "偶数与奇数机会均等（3/6），为等可能事件。"
      },
      {
        "id": "w33-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "You want to design a fair carnival spinner for 2 players (Player A wins on Red, Player B on Green). What must be true?",
        "questionZh": "你想为 2 位玩家设计一个公平的转盘狂欢游戏（转到红 A 赢，转到绿 B 赢）。转盘必须满足什么条件？",
        "optionsEn": [
          "Red and Green sections must cover EXACTLY equal areas of the spinner circle",
          "Red must be on the top half only",
          "The spinner arrow must spin clockwise only",
          "There can only be 2 total sections"
        ],
        "optionsZh": [
          "红色与绿色区域在圆盘上所占的面积必须【严格相等】",
          "红色必须全部位于上半圆",
          "指针只能顺时针转动",
          "圆盘总共只能分成 2 个格子"
        ],
        "correctIndex": 0,
        "secretClueEn": "A fair game requires equal probability of winning for each player (equal angle/area for both colors)!",
        "secretClueZh": "公平游戏的本质是各方获胜概率完全相等，因此两色面积角度必须等大！",
        "explanationEn": "Equal surface area ensures equal 50% chance for both players.",
        "explanationZh": "各颜色区域面积相等才能保证游戏公平。"
      },
      {
        "id": "w33-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "Two standard dice are rolled and their sum is recorded. Which sum has the highest probability of appearing?",
        "questionZh": "同时掷两枚骰子并计算点数之和。哪一个和出现的概率最高？",
        "optionsEn": [
          "6",
          "7",
          "8",
          "12"
        ],
        "optionsZh": [
          "6",
          "7（共有 6 种组合）",
          "8",
          "12"
        ],
        "correctIndex": 1,
        "secretClueEn": "Sum of 7 can be made in 6 ways: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). No other sum has 6 combinations!",
        "secretClueZh": "掷出 7 的组合最多：(1,6), (2,5), (3,4), (4,3), (5,2), (6,1) 共有 6 种排法，概率是 6/36。",
        "explanationEn": "7 has 6 out of 36 outcomes, making it the most probable sum.",
        "explanationZh": "点数和为 7 的组合数最多（6种），概率最高。"
      },
      {
        "id": "w33-q5",
        "tier": "easy",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "The sun rising tomorrow morning is:",
        "questionZh": "“明天早晨太阳升起”这个事件是：",
        "optionsEn": [
          "Unlikely",
          "Impossible",
          "Certain",
          "Equally Likely"
        ],
        "optionsZh": [
          "不太可能",
          "不可能发生",
          "必定发生（Certain）",
          "等可能"
        ],
        "correctIndex": 2,
        "secretClueEn": "By the laws of nature, it is 100% Certain.",
        "secretClueZh": "自然界客观规律，必定发生（Certain）。",
        "explanationEn": "It is a certainty.",
        "explanationZh": "必定发生。"
      }
    ]
  },
  {
    "week": 35,
    "season": "Summer Lighthouse",
    "strandKey": "coding",
    "strandEn": "Coding & Movement",
    "strandZh": "编程循环与网格位移",
    "titleEn": "Pseudocode REPEAT Loops & Grid Navigation",
    "titleZh": "编程 REPEAT 循环嵌套与网格巡航",
    "landmark": "Communitech Innovation Hub",
    "landmarkZh": "Communitech 科技创新中心",
    "descriptionEn": "Trace pseudocode algorithms with REPEAT loops and calculate total steps moved on a grid!",
    "descriptionZh": "追踪伪代码 REPEAT 循环指令，精准推算机器人在网格中的最终坐标与步数！",
    "questions": [
      {
        "id": "w35-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "How many total steps does this robot move:\nREPEAT 4 times:\n  Move forward 3 steps",
        "questionZh": "这段机器人代码总共移动了多少步：\nREPEAT 4 times:\n  Move forward 3 steps",
        "optionsEn": [
          "16 steps",
          "7 steps",
          "12 steps",
          "10 steps"
        ],
        "optionsZh": [
          "16 步",
          "7 步",
          "12 步（4 × 3）",
          "10 步"
        ],
        "correctIndex": 2,
        "secretClueEn": "Repeat 4 times means 4 × 3 steps = 12 steps.",
        "secretClueZh": "循环 4 次，每次走 3 步：4 × 3 = 12 步。",
        "explanationEn": "4 × 3 = 12 steps total.",
        "explanationZh": "4 × 3 = 12 步。"
      },
      {
        "id": "w35-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "A robot starts at (0, 0) facing East. It executes:\nREPEAT 4 times:\n  Move forward 2\n  Turn Left 90°\nWhere does the robot end up?",
        "questionZh": "机器人从 (0, 0) 朝东出发，执行代码：\nREPEAT 4 times:\n  Move forward 2\n  Turn Left 90°\n机器人最终停在哪里？",
        "optionsEn": [
          "(0, 2)",
          "(2, 2)",
          "(8, 0)",
          "(0, 0) back at origin"
        ],
        "optionsZh": [
          "(0, 2)",
          "(2, 2)",
          "(8, 0)",
          "(0, 0) 回到起点原点"
        ],
        "correctIndex": 3,
        "secretClueEn": "It walks a 2×2 square! 4 turns of 90° completes a full 360° circle back to where it started.",
        "secretClueZh": "走完一个正方形！转了 4 次 90° 刚好转满 360°，最后回到了出发原点 (0, 0)。",
        "explanationEn": "Moving 2 and turning 90° four times forms a closed square path back to (0, 0).",
        "explanationZh": "四次转向形成闭合正方形，回到原点 (0, 0)。"
      },
      {
        "id": "w35-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "Look at this nested loop:\nREPEAT 3 times:\n  REPEAT 2 times:\n    Draw star\n  Move forward 1\nHow many stars are drawn in total?",
        "questionZh": "观察这个嵌套循环：\nREPEAT 3 times:\n  REPEAT 2 times:\n    Draw star\n  Move forward 1\n总共画了多少颗星星？",
        "optionsEn": [
          "6 stars",
          "5 stars",
          "9 stars",
          "12 stars"
        ],
        "optionsZh": [
          "6 颗星星 (3 × 2)",
          "5 颗",
          "9 颗",
          "12 颗"
        ],
        "correctIndex": 0,
        "secretClueEn": "The inner loop draws 2 stars. The outer loop runs 3 times. 3 × 2 = 6 stars!",
        "secretClueZh": "内层循环每次画 2 颗，外层循环执行 3 次：3 × 2 = 6 颗星星！",
        "explanationEn": "3 outer loops × 2 stars per loop = 6 stars.",
        "explanationZh": "3 × 2 = 6 颗星星。"
      },
      {
        "id": "w35-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "A robot starts at (3, 5). Code: REPEAT 5 times: [x = x + 2, y = y - 1]. What are its final coordinates?",
        "questionZh": "机器人从 (3, 5) 出发。执行 5 次循环：每次 x 增加 2，y 减少 1。最终坐标是？",
        "optionsEn": [
          "(10, 0)",
          "(13, 0)",
          "(13, 10)",
          "(8, 4)"
        ],
        "optionsZh": [
          "(10, 0)",
          "(13, 0)",
          "(13, 10)",
          "(8, 4)"
        ],
        "correctIndex": 1,
        "secretClueEn": "X increases by 5 × 2 = 10 (3 + 10 = 13). Y decreases by 5 × 1 = 5 (5 - 5 = 0). New coordinate: (13, 0)!",
        "secretClueZh": "x 增加了 5 × 2 = 10，新 x = 3 + 10 = 13；y 减少了 5 × 1 = 5，新 y = 5 - 5 = 0。最终停在 (13, 0)！",
        "explanationEn": "(3 + 10, 5 - 5) = (13, 0).",
        "explanationZh": "最终坐标为 (13, 0)。"
      },
      {
        "id": "w35-q5",
        "tier": "easy",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "How many total degrees do you turn if you turn Right 90° four times?",
        "questionZh": "如果你向右转 90° 连续转 4 次，一共转动了多少度？",
        "optionsEn": [
          "270°",
          "180°",
          "360° (Full circle)",
          "90°"
        ],
        "optionsZh": [
          "270°",
          "180°",
          "360°（刚好一整圈）",
          "90°"
        ],
        "correctIndex": 2,
        "secretClueEn": "4 × 90° = 360°.",
        "secretClueZh": "4 × 90° = 360°。",
        "explanationEn": "4 × 90° = 360°.",
        "explanationZh": "4 × 90° = 360°。"
      }
    ]
  },
  {
    "week": 37,
    "season": "Summer Lighthouse",
    "strandKey": "financial",
    "strandEn": "Financial Literacy",
    "strandZh": "加拿大货币找零与精明消费",
    "titleEn": "Canadian Currency & Best Buy Unit Pricing",
    "titleZh": "加拿大货币找零与“精明比价”单价对比",
    "landmark": "Uptown Waterloo Farmers Market",
    "landmarkZh": "上城滑铁卢市集",
    "descriptionEn": "Count Canadian bills and coins (loonies, toonies), calculate change, and find the Best Buy unit price!",
    "descriptionZh": "计算加拿大纸币与硬币（Loonie 1元，Toonie 2元）、熟练找零并进行商品单价“精明比价”！",
    "questions": [
      {
        "id": "w37-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "You buy a book for $14.25 and pay with a $20 Canadian bill. How much change do you receive?",
        "questionZh": "你在市集买了一本书花费 $14.25，付了一张 $20 加元纸币。应该找回多少零钱？",
        "optionsEn": [
          "$5.25",
          "$6.75",
          "$5.75",
          "$6.25"
        ],
        "optionsZh": [
          "$5.25",
          "$6.75",
          "$5.75 加元",
          "$6.25"
        ],
        "correctIndex": 2,
        "secretClueEn": "Count up from $14.25: + $0.75 gets to $15.00. Then + $5 gets to $20.00. Total = $5.75!",
        "secretClueZh": "向上凑整计数法：$14.25 加 75 分变成 $15；再加 $5 变成 $20。找零就是 $5.75！",
        "explanationEn": "$20.00 - $14.25 = $5.75.",
        "explanationZh": "$20.00 - $14.25 = $5.75。"
      },
      {
        "id": "w37-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "How much money is 3 toonies, 4 loonies, and 6 quarters?",
        "questionZh": "3 枚 Toonie（2元硬币）、4 枚 Loonie（1元硬币）和 6 枚 25分硬币（Quarter）一共是多少钱？",
        "optionsEn": [
          "$11.00",
          "$10.50",
          "$12.00",
          "$11.50"
        ],
        "optionsZh": [
          "$11.00",
          "$10.50",
          "$12.00",
          "$11.50 加元"
        ],
        "correctIndex": 3,
        "secretClueEn": "3 toonies = $6. 4 loonies = $4. 6 quarters = 6 × 25¢ = $1.50. $6 + $4 + $1.50 = $11.50!",
        "secretClueZh": "3 枚 2元 = $6；4 枚 1元 = $4；6 枚 25分 = $1.50。合起来是 $6 + $4 + $1.50 = $11.50。",
        "explanationEn": "$6 + $4 + $1.50 = $11.50.",
        "explanationZh": "$6 + $4 + $1.50 = $11.50。"
      },
      {
        "id": "w37-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "Best Buy comparison: Pack A has 4 juice boxes for $6. Pack B has 6 juice boxes for $8.40. Which is the better deal per juice box?",
        "questionZh": "精明消费单价比价：A 套装 4 盒果汁卖 $6；B 套装 6 盒果汁卖 $8.40。哪一款单价更划算？",
        "optionsEn": [
          "Pack B ($1.40 per box vs $1.50 in Pack A)",
          "Pack A ($1.50 per box vs $1.60 in Pack B)",
          "They cost exactly the same per box",
          "Cannot be compared"
        ],
        "optionsZh": [
          "B 套装更划算（每盒单价 $1.40，比 A 套装的 $1.50 便宜）",
          "A 套装更划算",
          "两款单价完全一样",
          "数量不同无法比较"
        ],
        "correctIndex": 0,
        "secretClueEn": "Unit price for Pack A: $6 ÷ 4 = $1.50 each. Pack B: $8.40 ÷ 6 = $1.40 each. $1.40 is cheaper!",
        "secretClueZh": "计算单价：A 盒每盒 6 ÷ 4 = $1.50；B 盒每盒 8.40 ÷ 6 = $1.40。1.40 元比 1.50 元更划算！",
        "explanationEn": "Pack B unit price ($1.40) is lower than Pack A ($1.50).",
        "explanationZh": "B 套装单价更低，更实惠。"
      },
      {
        "id": "w37-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "Maya wants to save $120 for summer sailing camp. She earns $15 each week from walking dogs. If she saves 2/3 of her earnings each week, how many weeks will it take?",
        "questionZh": "玛雅想攒 $120 加元参加夏令营。她每周遛狗赚 $15。如果她每周把收入的 2/3 存入储蓄罐，需要几周才能攒够？",
        "optionsEn": [
          "8 weeks",
          "12 weeks",
          "10 weeks",
          "15 weeks"
        ],
        "optionsZh": [
          "8 周",
          "12 周",
          "10 周",
          "15 周"
        ],
        "correctIndex": 1,
        "secretClueEn": "Weekly savings: 2/3 of $15 = (15 ÷ 3) × 2 = $10 saved per week. Target: $120 ÷ $10 = 12 weeks!",
        "secretClueZh": "每周储蓄：$15 的 2/3 是 $10。目标 $120：120 ÷ 10 = 12 周！",
        "explanationEn": "$10 saved/week. $120 ÷ $10 = 12 weeks.",
        "explanationZh": "每周存 $10，120 ÷ 10 = 12 周。"
      },
      {
        "id": "w37-q5",
        "tier": "easy",
        "tierLabelEn": "Chest Key",
        "tierLabelZh": "宝箱题",
        "questionEn": "How many quarters (25¢) make one Canadian $2 Toonie?",
        "questionZh": "多少枚 25分硬币可以换一枚 2 加元的 Toonie 硬币？",
        "optionsEn": [
          "10 quarters",
          "4 quarters",
          "8 quarters",
          "6 quarters"
        ],
        "optionsZh": [
          "10 枚",
          "4 枚",
          "8 枚（8 × 25¢ = $2.00）",
          "6 枚"
        ],
        "correctIndex": 2,
        "secretClueEn": "4 quarters = $1.00. So 8 quarters = $2.00!",
        "secretClueZh": "4 个 25 分是 1 元，8 个 25 分就是 2 元。",
        "explanationEn": "8 × $0.25 = $2.00.",
        "explanationZh": "8 枚 25 分硬币等于 2 加元。"
      }
    ]
  },
  {
    "week": 40,
    "season": "Summer Lighthouse",
    "strandKey": "operations",
    "strandEn": "Capstone Championship",
    "strandZh": "全能水手数学总决赛",
    "titleEn": "Grand Mariners Championship & Graduation",
    "titleZh": "米伦伍兹水手数学大阅兵与荣誉毕业",
    "landmark": "Millen Woods Mariners Grand Stage",
    "landmarkZh": "米伦伍兹水手大舞台",
    "descriptionEn": "The ultimate Grade 4 master quest combining all strands into real-world Waterloo problem solving!",
    "descriptionZh": "贯穿数感、几何、分数、代数与财商的全年知识终极综合闯关！",
    "questions": [
      {
        "id": "w40-q1",
        "tier": "easy",
        "tierLabelEn": "Easy",
        "tierLabelZh": "基础",
        "questionEn": "What is 4,500 + 3,800?",
        "questionZh": "4,500 + 3,800 等于多少？",
        "optionsEn": [
          "8,300",
          "8,200",
          "7,300",
          "8,400"
        ],
        "optionsZh": [
          "8,300",
          "8,200",
          "7,300",
          "8,400"
        ],
        "correctIndex": 0,
        "secretClueEn": "45 hundreds + 38 hundreds = 83 hundreds.",
        "secretClueZh": "45 个百加 38 个百等于 83 个百（8,300）。",
        "explanationEn": "4,500 + 3,800 = 8,300.",
        "explanationZh": "4,500 + 3,800 = 8,300。"
      },
      {
        "id": "w40-q2",
        "tier": "med",
        "tierLabelEn": "Medium",
        "tierLabelZh": "进阶",
        "questionEn": "A rectangle has length 12 cm and width 7 cm. What is its area?",
        "questionZh": "一个长方形长 12 厘米，宽 7 厘米。它的面积是多少平方厘米？",
        "optionsEn": [
          "38 cm²",
          "84 cm²",
          "72 cm²",
          "96 cm²"
        ],
        "optionsZh": [
          "38 cm²",
          "84 平方厘米",
          "72 cm²",
          "96 cm²"
        ],
        "correctIndex": 1,
        "secretClueEn": "Area = 12 × 7 = 84.",
        "secretClueZh": "面积 = 长 × 宽 = 12 × 7 = 84 平方厘米。",
        "explanationEn": "12 × 7 = 84 cm².",
        "explanationZh": "12 × 7 = 84 平方厘米。"
      },
      {
        "id": "w40-q3",
        "tier": "boss",
        "tierLabelEn": "Boss",
        "tierLabelZh": "挑战",
        "questionEn": "Solve for x: 3x - 5 = 25.",
        "questionZh": "求解方程未知数：3x - 5 = 25。",
        "optionsEn": [
          "8",
          "9",
          "10",
          "12"
        ],
        "optionsZh": [
          "8",
          "9",
          "10",
          "12"
        ],
        "correctIndex": 2,
        "secretClueEn": "Add 5 to both sides: 3x = 30. Divide by 3: x = 10.",
        "secretClueZh": "两边加 5 得 3x = 30。两边除以 3 得 x = 10。",
        "explanationEn": "3x = 30, x = 10.",
        "explanationZh": "3x = 30，解得 x = 10。"
      },
      {
        "id": "w40-q4",
        "tier": "olympiad",
        "tierLabelEn": "G4-5 Advanced",
        "tierLabelZh": "拔高",
        "questionEn": "A train left ION Conestoga station at 8:40 AM and arrived at Fairway station at 9:25 AM. The track is 18 km long. What was its average speed in km/h?",
        "questionZh": "ION 轻轨 8:40 AM 从 Conestoga 站出发，9:25 AM 到达 Fairway 站。全程 18 公里。列车平均时速是多少 km/h？",
        "optionsEn": [
          "36 km/h",
          "30 km/h",
          "18 km/h",
          "24 km/h"
        ],
        "optionsZh": [
          "36 km/h",
          "30 km/h",
          "18 km/h",
          "24 km/h"
        ],
        "correctIndex": 3,
        "secretClueEn": "Time elapsed: 45 minutes = 3/4 of an hour. Speed = 18 km ÷ (3/4 hour) = 18 × 4/3 = 24 km/h!",
        "secretClueZh": "经过时间：45 分钟即 3/4 小时。速度 = 距离 ÷ 时间 = 18 ÷ (3/4) = 18 × 4/3 = 24 km/h！",
        "explanationEn": "18 km in 45 min = 6 km every 15 min = 24 km in 60 min (24 km/h).",
        "explanationZh": "45分钟行驶18公里，即每15分钟6公里，1小时（60分钟）行驶 24 公里。"
      },
      {
        "id": "w40-q5",
        "tier": "easy",
        "tierLabelEn": "Master Graduation Key",
        "tierLabelZh": "水手毕业总宝箱",
        "questionEn": "What is 9 × 8?",
        "questionZh": "9 × 8 等于多少？",
        "optionsEn": [
          "72",
          "81",
          "64",
          "70"
        ],
        "optionsZh": [
          "72",
          "81",
          "64",
          "70"
        ],
        "correctIndex": 0,
        "secretClueEn": "9 × 8 = 72.",
        "secretClueZh": "八九七十二。",
        "explanationEn": "9 × 8 = 72.",
        "explanationZh": "9 × 8 = 72。"
      }
    ]
  }
];

// Helper to balance question options dynamically
function placeOptionAtTarget(opts: string[], target: number): string[] {
  if (target === 0 || opts.length <= target) return opts;
  const res = [...opts];
  const temp = res[0];
  res[0] = res[target];
  res[target] = temp;
  return res;
}

// Helper to fill in weeks 1..40 smoothly for the adventure map
export function getAllWeeks(): WeekTopic[] {
  const result: WeekTopic[] = [];
  const knownWeeksMap = new Map<number, WeekTopic>();
  WRDSB_WEEKS.forEach(w => knownWeeksMap.set(w.week, w));

  for (let i = 1; i <= 40; i++) {
    if (knownWeeksMap.has(i)) {
      result.push(knownWeeksMap.get(i)!);
    } else {
      // Interpolate topic according to WRDSB Grade 4 seasonal strands
      const baseTopic = generateWeekTopic(i);
      result.push(baseTopic);
    }
  }
  return result;
}

function generateWeekTopic(weekNum: number): WeekTopic {
  let season: 'Autumn Harbor' | 'Winter Glacier' | 'Spring Expedition' | 'Summer Lighthouse' = 'Autumn Harbor';
  if (weekNum <= 10) season = 'Autumn Harbor';
  else if (weekNum <= 20) season = 'Winter Glacier';
  else if (weekNum <= 30) season = 'Spring Expedition';
  else season = 'Summer Lighthouse';

  let strandKey: 'number' | 'geometry' | 'data' | 'operations' | 'fractions' | 'algebra' | 'measurement' | 'financial' | 'coding' = 'number';
  let strandEn = 'Number Sense';
  let strandZh = '数感与运算';
  let titleEn = `Mariner Week ${weekNum} Quest`;
  let titleZh = `第 ${weekNum} 周水手专项探险`;

  if (weekNum >= 21 && weekNum <= 24) {
    strandKey = 'fractions';
    strandEn = 'Decimals & Operations';
    strandZh = '小数与日常应用';
    titleEn = `Decimals & Market Measurements (Wk ${weekNum})`;
    titleZh = `第 ${weekNum} 周：小数换算与实际应用`;
  } else if (weekNum >= 26 && weekNum <= 29) {
    strandKey = 'algebra';
    strandEn = 'Patterns & Algebra';
    strandZh = '代数方程与规律';
    titleEn = `Equations & Pattern Puzzles (Wk ${weekNum})`;
    titleZh = `第 ${weekNum} 周：等式方程与规律探索`;
  } else if (weekNum >= 31 && weekNum <= 32) {
    strandKey = 'measurement';
    strandEn = 'Metric Measurement';
    strandZh = '公制测量与体积容量';
    titleEn = `Metric Units & Capacity (Wk ${weekNum})`;
    titleZh = `第 ${weekNum} 周：毫米、厘米、升与毫升`;
  } else if (weekNum === 34) {
    strandKey = 'data';
    strandEn = 'Probability Experiments';
    strandZh = '概率模拟实验';
    titleEn = `Probability & Spinners (Wk ${weekNum})`;
    titleZh = `第 ${weekNum} 周：公平游戏与概率统计`;
  } else if (weekNum === 36) {
    strandKey = 'coding';
    strandEn = 'Coding & Coordinates';
    strandZh = '编程逻辑与网格位移';
    titleEn = `Loop Coding & Grid Motion (Wk ${weekNum})`;
    titleZh = `第 ${weekNum} 周：编程嵌套循环与位置`;
  } else if (weekNum >= 38 && weekNum <= 39) {
    strandKey = 'financial';
    strandEn = 'Financial Math';
    strandZh = '零花钱储蓄与消费规划';
    titleEn = `Financial Planning & Change (Wk ${weekNum})`;
    titleZh = `第 ${weekNum} 周：零花钱管理与找零`;
  }

  // Create a template 5 questions for this week with balanced correct positions
  const q1Ans = (weekNum * 3 + 12).toString();
  const q1Distractors = [(weekNum * 3 + 10).toString(), (weekNum * 3 + 14).toString(), (weekNum * 3 + 8).toString()];
  const q1Target = (weekNum + 0) % 4;

  const q2Ans = (Math.round((weekNum * 125) / 100) * 100).toString();
  const q2Raw = [
    q2Ans,
    (Math.floor((weekNum * 125) / 100) * 100 - 100).toString(),
    (Math.ceil((weekNum * 125) / 100) * 100 + 100).toString(),
    (Math.round((weekNum * 125) / 10) * 10).toString()
  ];
  const q2Target = (weekNum + 1) % 4;

  const q3Ans = `${2 * (weekNum + 5 + 8)} m`;
  const q3AnsZh = `${2 * (weekNum + 5 + 8)} 米`;
  const q3RawEn = [
    q3Ans,
    `${(weekNum + 5) * 8} m`,
    `${weekNum + 13} m`,
    `${2 * (weekNum + 5 + 8) + 4} m`
  ];
  const q3RawZh = [
    q3AnsZh,
    `${(weekNum + 5) * 8} 米`,
    `${weekNum + 13} 米`,
    `${2 * (weekNum + 5 + 8) + 4} 米`
  ];
  const q3Target = (weekNum + 2) % 4;

  const q4Raw = ['10', '8', '12', '9'];
  const q4Target = (weekNum + 3) % 4;

  const q5Raw = [`${weekNum * 10}`, `${weekNum * 10 + 10}`, `${weekNum * 10 - 10}`, `${weekNum}00`];
  const q5Target = (weekNum + 1) % 4;

  return {
    week: weekNum,
    season,
    strandKey,
    strandEn,
    strandZh,
    titleEn,
    titleZh,
    landmark: 'Laurel Creek & Waterloo Woods',
    landmarkZh: '月桂溪与滑铁卢林间步道',
    descriptionEn: `Deep dive into Grade 4 ${strandEn} aligned with WRDSB Curriculum for Week ${weekNum}!`,
    descriptionZh: `紧扣滑铁卢教育局四年级教学大纲第 ${weekNum} 周核心技能，完成水手5题夺宝！`,
    questions: [
      {
        id: `w${weekNum}-q1`,
        tier: 'easy',
        tierLabelEn: 'Easy',
        tierLabelZh: '基础',
        questionEn: `Week ${weekNum} Practice: Calculate (${weekNum} × 3) + 12 = ?`,
        questionZh: `第 ${weekNum} 周基础演练：计算 (${weekNum} × 3) + 12 = ？`,
        optionsEn: placeOptionAtTarget([q1Ans, q1Distractors[0], q1Distractors[1], q1Distractors[2]], q1Target),
        optionsZh: placeOptionAtTarget([q1Ans, q1Distractors[0], q1Distractors[1], q1Distractors[2]], q1Target),
        correctIndex: q1Target,
        secretClueEn: `Multiply first: ${weekNum} × 3 = ${weekNum * 3}. Then add 12!`,
        secretClueZh: `先乘后加：${weekNum} × 3 = ${weekNum * 3}，然后加上 12。`,
        explanationEn: `(${weekNum} × 3) + 12 = ${q1Ans}.`,
        explanationZh: `(${weekNum} × 3) + 12 = ${q1Ans}。`
      },
      {
        id: `w${weekNum}-q2`,
        tier: 'med',
        tierLabelEn: 'Medium',
        tierLabelZh: '进阶',
        questionEn: `Round ${weekNum * 125} to the nearest 100.`,
        questionZh: `将数字 ${weekNum * 125} 四舍五入到最近的百位。`,
        optionsEn: placeOptionAtTarget(q2Raw, q2Target),
        optionsZh: placeOptionAtTarget(q2Raw, q2Target),
        correctIndex: q2Target,
        secretClueEn: 'Look at the tens digit: if it is 5 or more, round up; otherwise round down.',
        secretClueZh: '观察十位数字：如果大于等于5则向百位进1，否则舍去。',
        explanationEn: `${weekNum * 125} rounded to nearest 100 is ${Math.round((weekNum * 125) / 100) * 100}.`,
        explanationZh: `四舍五入后为 ${Math.round((weekNum * 125) / 100) * 100}。`
      },
      {
        id: `w${weekNum}-q3`,
        tier: 'boss',
        tierLabelEn: 'Boss',
        tierLabelZh: '挑战',
        questionEn: `A rectangular garden has length ${weekNum + 5} m and width 8 m. What is its Perimeter?`,
        questionZh: `一个长方形花园的长为 ${weekNum + 5} 米，宽为 8 米。它的周长是多少米？`,
        optionsEn: placeOptionAtTarget(q3RawEn, q3Target),
        optionsZh: placeOptionAtTarget(q3RawZh, q3Target),
        correctIndex: q3Target,
        secretClueEn: `Perimeter = 2 × (Length + Width) = 2 × (${weekNum + 5} + 8) m.`,
        secretClueZh: `周长 = 2 × (长 + 宽) = 2 × (${weekNum + 5} + 8) 米。`,
        explanationEn: `2 × (${weekNum + 13}) = ${2 * (weekNum + 13)} m.`,
        explanationZh: `周长为 ${2 * (weekNum + 13)} 米。`
      },
      {
        id: `w${weekNum}-q4`,
        tier: 'olympiad',
        tierLabelEn: 'G4-5 Advanced',
        tierLabelZh: '拔高',
        questionEn: `Solve for x: 4x + ${weekNum} = ${40 + weekNum}.`,
        questionZh: `求解未知数 x：4x + ${weekNum} = ${40 + weekNum}。`,
        optionsEn: placeOptionAtTarget(q4Raw, q4Target),
        optionsZh: placeOptionAtTarget(q4Raw, q4Target),
        correctIndex: q4Target,
        secretClueEn: `Subtract ${weekNum} from both sides: 4x = 40. Then divide by 4!`,
        secretClueZh: `两边同时减去 ${weekNum}：4x = 40。两边除以 4 得 x = 10。`,
        explanationEn: `4x = 40, so x = 10.`,
        explanationZh: '4x = 40，因此 x = 10。'
      },
      {
        id: `w${weekNum}-q5`,
        tier: 'easy',
        tierLabelEn: 'Chest Key',
        tierLabelZh: '宝箱题',
        questionEn: `Quick Calculation: What is ${weekNum} × 10?`,
        questionZh: `快速心算宝箱钥匙：${weekNum} × 10 等于多少？`,
        optionsEn: placeOptionAtTarget(q5Raw, q5Target),
        optionsZh: placeOptionAtTarget(q5Raw, q5Target),
        correctIndex: q5Target,
        secretClueEn: 'Place a 0 at the end of the number!',
        secretClueZh: '乘 10 只需在末尾添一个 0！',
        explanationEn: `${weekNum} × 10 = ${weekNum * 10}.`,
        explanationZh: `${weekNum} × 10 = ${weekNum * 10}。`
      }
    ]
  };
}

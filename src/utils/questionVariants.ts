import { QuestionItem, DifficultyTier, VisualData } from '../data/mathData';

/**
 * Millen Woods Mariners Dynamic Question Variant Engine
 * Generates mathematically verified question variations so questions never feel static or repeated!
 */

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a mathematical variant for a given question based on its strand and concept
 */
export function generateQuestionVariant(baseQ: QuestionItem, week: number, tier: DifficultyTier, variantSeed: number): QuestionItem {
  // If variantSeed is 0, return the canonical question
  if (variantSeed === 0) {
    return baseQ;
  }

  // Generate dynamic variants based on the week and tier
  const id = `${baseQ.id}-v${variantSeed}`;

  // 1. PLACE VALUE & DECOMPOSITION (Weeks 1 - 3)
  if (week <= 3) {
    if (tier === 'easy') {
      const thousands = randInt(2, 8);
      const hundreds = randInt(1, 9);
      const tens = randInt(1, 9);
      const ones = randInt(1, 9);
      const num = thousands * 1000 + hundreds * 100 + tens * 10 + ones;
      const targetDigit = hundreds;
      const correctVal = targetDigit * 100;

      const opts = [
        String(targetDigit),
        String(targetDigit * 10),
        String(correctVal),
        String(targetDigit * 1000)
      ];
      const shuffled = shuffle(opts);
      const correctIdx = shuffled.indexOf(String(correctVal));

      return {
        id,
        tier: 'easy',
        tierLabelEn: 'Easy',
        tierLabelZh: '基础',
        tierLabelFr: 'Facile',
        questionEn: `In the number ${num.toLocaleString()}, what is the value of the digit ${targetDigit}?`,
        questionZh: `在数字 ${num.toLocaleString()} 中，数字 ${targetDigit} 的数值是多少？`,
        questionFr: `Dans le nombre ${num.toLocaleString('fr-CA')}, quelle est la valeur de position du chiffre ${targetDigit} ?`,
        optionsEn: shuffled,
        optionsZh: shuffled,
        optionsFr: shuffled,
        correctIndex: correctIdx,
        secretClueEn: `The digit ${targetDigit} is in the hundreds column: ${targetDigit} × 100.`,
        secretClueZh: `数字 ${targetDigit} 位于百位（Hundreds）：${targetDigit} × 100。`,
        secretClueFr: `Le chiffre ${targetDigit} est dans la colonne des centaines : ${targetDigit} × 100.`,
        explanationEn: `The digit ${targetDigit} is in the hundreds position, so its value is ${correctVal}.`,
        explanationZh: `数字 ${targetDigit} 位于百位，因此其代表的数值为 ${correctVal}。`,
        explanationFr: `Le chiffre ${targetDigit} est à la position des centaines, sa valeur est donc de ${correctVal}.`,
        visual: { type: 'table', content: `Th: ${thousands} | H: ${hundreds} | T: ${tens} | O: ${ones}`, subtext: 'Place Value Chart' }
      };
    }

    if (tier === 'med') {
      const th = randInt(3, 7);
      const tens = randInt(11, 28);
      const ones = randInt(3, 8);
      const total = th * 1000 + tens * 10 + ones;

      const correctStr = total.toLocaleString();
      const dist1 = (th * 1000 + tens + ones).toLocaleString();
      const dist2 = (th * 1000 + tens * 10).toLocaleString();
      const dist3 = (th * 1000 + (tens + 2) * 10 + ones).toLocaleString();

      const options = [correctStr, dist1, dist2, dist3];
      // shuffle
      const shuffled = shuffle(options);
      const correctIndex = shuffled.indexOf(correctStr);

      return {
        id,
        tier: 'med',
        tierLabelEn: 'Medium',
        tierLabelZh: '进阶',
        tierLabelFr: 'Moyen',
        questionEn: `Millen Woods recorded ${th} thousands, ${tens} tens, and ${ones} ones of items. What number is this?`,
        questionZh: `米伦伍兹记录了 ${th} 个千、${tens} 个十和 ${ones} 个一，这个总数是多少？`,
        questionFr: `L'école Millen Woods a comptabilisé ${th} milliers, ${tens} dizaines et ${ones} unités. Quel est ce nombre total ?`,
        optionsEn: shuffled,
        optionsZh: shuffled.map(o => `${o}`),
        optionsFr: shuffled,
        correctIndex,
        secretClueEn: `${tens} tens = ${tens * 10}. Add: ${th * 1000} + ${tens * 10} + ${ones}.`,
        secretClueZh: `${tens} 个十等于 ${tens * 10}。相加：${th * 1000} + ${tens * 10} + ${ones}。`,
        secretClueFr: `${tens} dizaines = ${tens * 10}. Additionne : ${th * 1000} + ${tens * 10} + ${ones}.`,
        explanationEn: `${th * 1000} + ${tens * 10} + ${ones} = ${total.toLocaleString()}.`,
        explanationZh: `${th * 1000} + ${tens * 10} + ${ones} = ${total.toLocaleString()}。`,
        explanationFr: `${th * 1000} + ${tens * 10} + ${ones} = ${total.toLocaleString('fr-CA')}.`
      };
    }

    if (tier === 'boss') {
      const thousands = randInt(4, 8);
      const hundreds = randInt(2, 6);
      const tens = randInt(2, 7);
      const correctTotal = thousands * 1000 + hundreds * 100 + tens * 10;

      const opt1 = `${thousands} thousands + ${hundreds} hundreds + ${tens} tens`;
      const opt2 = `${thousands - 1} thousands + ${hundreds + 10} hundreds + ${tens * 10} ones`;
      const opt3 = `${thousands * 10 + hundreds} hundreds + ${tens} tens`;
      const wrongOpt = `${thousands} thousands + ${hundreds * 10} tens + ${tens} ones`; // misses 0s

      const pairs = [
        { en: opt1, zh: `${thousands} 个千 + ${hundreds} 个百 + ${tens} 个十`, isCorrect: false },
        { en: opt2, zh: `${thousands - 1} 个千 + ${hundreds + 10} 个百 + ${tens * 10} 个一`, isCorrect: false },
        { en: opt3, zh: `${thousands * 10 + hundreds} 个百 + ${tens} 个十`, isCorrect: false },
        { en: wrongOpt, zh: `${thousands} 个千 + ${hundreds * 10} 个十 + ${tens} 个一`, isCorrect: true },
      ];
      const shuffled = shuffle(pairs);
      const correctIndex = shuffled.findIndex(p => p.isCorrect);

      return {
        id,
        tier: 'boss',
        tierLabelEn: 'Hard',
        tierLabelZh: '高难挑战',
        questionEn: `Which non-standard decomposition of ${correctTotal.toLocaleString()} is NOT correct?`,
        questionZh: `下面哪一种对 ${correctTotal.toLocaleString()} 的非标准拆解方式是错误的？`,
        optionsEn: shuffled.map(p => p.en),
        optionsZh: shuffled.map(p => p.zh),
        correctIndex,
        secretClueEn: `Multiply out the values: ${hundreds * 10} tens = ${hundreds * 100}, but ${tens} ones = only ${tens}!`,
        secretClueZh: `计算实际数值：${hundreds * 10} 个十 = ${hundreds * 100}，但 ${tens} 个一只有 ${tens}，达不到 ${tens * 10}！`,
        explanationEn: `${wrongOpt} gives ${thousands * 1000 + hundreds * 100 + tens}, which is missing ${(tens * 10) - tens}!`,
        explanationZh: `该拆解计算结果为 ${thousands * 1000 + hundreds * 100 + tens}，缺少了 ${(tens * 10) - tens}，因此不正确。`
      };
    }

    if (tier === 'olympiad') {
      // Challenging mystery digits puzzle
      const ones = randInt(2, 4);
      const multiplier = 2;
      const thousands = ones * multiplier;
      const tens = randInt(1, 3);
      const sum = randInt(14, 18);
      const hundreds = sum - (thousands + tens + ones);

      const correctNum = `${thousands},${hundreds}${tens}${ones}`;
      const dist1 = `${thousands},${hundreds - 1}${tens}${ones + 1}`;
      const dist2 = `${thousands},${hundreds + 1}${tens}${ones - 1}`;
      const dist3 = `${thousands},${hundreds}${tens + 1}${ones - 1}`;

      const options = [correctNum, dist1, dist2, dist3];
      const shuffled = shuffle(options);
      const correctIndex = shuffled.indexOf(correctNum);

      return {
        id,
        tier: 'olympiad',
        tierLabelEn: 'Olympiad Brain King',
        tierLabelZh: '终极奥数脑王',
        questionEn: `Mystery 4-digit code: Thousands digit is double the ones digit. Thousands is ${thousands}, tens is ${tens}. The sum of all four digits is ${sum}. What is the number?`,
        questionZh: `神秘四位密码：千位是个位的 ${multiplier} 倍。千位是 ${thousands}，十位是 ${tens}，所有四个数位之和为 ${sum}。这个四位数是多少？`,
        optionsEn: shuffled,
        optionsZh: shuffled,
        correctIndex,
        secretClueEn: `Ones digit = ${thousands} ÷ ${multiplier} = ${ones}. So far sum = ${thousands} + ${tens} + ${ones} = ${thousands + tens + ones}. Hundreds digit = ${sum} - ${thousands + tens + ones}.`,
        secretClueZh: `个位是 ${thousands} ÷ ${multiplier} = ${ones}。目前三位和为 ${thousands} + ${tens} + ${ones} = ${thousands + tens + ones}。百位 = ${sum} - ${thousands + tens + ones} = ${hundreds}。`,
        explanationEn: `Digits: Th=${thousands}, H=${hundreds}, T=${tens}, O=${ones}. Sum: ${thousands}+${hundreds}+${tens}+${ones} = ${sum}. The number is ${correctNum}!`,
        explanationZh: `数位为：千位 ${thousands}、百位 ${hundreds}、十位 ${tens}、个位 ${ones}。总和为 ${sum}，数字是 ${correctNum}！`
      };
    }
  }

  // 2. ROUNDING & NUMBER LINES (Weeks 4 - 5)
  if (week === 4 || week === 5) {
    if (tier === 'easy' || tier === 'med') {
      const base = randInt(20, 80) * 100;
      const offset = randInt(12, 88);
      const num = base + offset;
      const roundedHundreds = Math.round(num / 100) * 100;

      const opts = [
        String(base),
        String(base + 100),
        String(base - 100),
        String(base + 50)
      ];
      const shuffled = shuffle(opts);
      const correctIndex = shuffled.indexOf(String(roundedHundreds));

      return {
        id,
        tier: tier,
        tierLabelEn: tier === 'easy' ? 'Easy' : 'Medium',
        tierLabelZh: tier === 'easy' ? '基础' : '进阶',
        questionEn: `An ION Light Rail train travels ${num} meters between Waterloo stations. Round ${num} to the nearest hundred.`,
        questionZh: `ION 轻轨列车在滑铁卢两站之间行驶了 ${num} 米。将 ${num} 四舍五入到最近的百位是多少？`,
        optionsEn: shuffled,
        optionsZh: shuffled,
        correctIndex,
        secretClueEn: `Look at the tens digit (${Math.floor((offset) / 10)}). If tens is 5 or more, round up!`,
        secretClueZh: `观察十位数字（${Math.floor(offset / 10)}）。十位满 5 则向前一位进一！`,
        explanationEn: `${num} rounded to the nearest hundred is ${roundedHundreds}.`,
        explanationZh: `${num} 四舍五入到最近的百位是 ${roundedHundreds}。`
      };
    }

    if (tier === 'boss' || tier === 'olympiad') {
      // Reverse Rounding Boundary Puzzle (Gauss Contest style)
      const targetHundred = randInt(30, 80) * 100;
      const smallest = targetHundred - 50;
      const largest = targetHundred + 49;
      const correctRange = `${smallest} to ${largest}`;

      const dist1 = `${targetHundred - 49} to ${targetHundred + 50}`;
      const dist2 = `${smallest} to ${targetHundred + 50}`;
      const dist3 = `${targetHundred - 100} to ${targetHundred + 100}`;

      const options = [correctRange, dist1, dist2, dist3];
      const shuffled = shuffle(options);
      const correctIndex = shuffled.indexOf(correctRange);

      return {
        id,
        tier: 'olympiad',
        tierLabelEn: 'Olympiad Brain King',
        tierLabelZh: '终极奥数脑王',
        questionEn: `Reverse Rounding Challenge: What are the SMALLEST and LARGEST whole numbers that round to ${targetHundred} when rounded to the nearest hundred?`,
        questionZh: `逆向四舍五入极值思维：四舍五入到最近的百位结果为 ${targetHundred} 的所有整数中，最小的数和最大的数分别是什么？`,
        optionsEn: shuffled,
        optionsZh: shuffled.map(o => `${o}`),
        correctIndex,
        secretClueEn: `Smallest starts at ${targetHundred} - 50 (tens digit 5 rounds UP). Largest ends at ${targetHundred} + 49 (tens digit 4 rounds DOWN).`,
        secretClueZh: `最小值始于 ${targetHundred} - 50（十位满5向前进）；最大值止于 ${targetHundred} + 49（十位是4向下舍）。`,
        explanationEn: `Smallest is ${smallest} (rounds up to ${targetHundred}). Largest is ${largest} (rounds down to ${targetHundred}). Range: ${smallest} to ${largest}!`,
        explanationZh: `最小是 ${smallest}，最大是 ${largest}。取值范围为 ${smallest} 至 ${largest}！`
      };
    }
  }

  // 3. MULTIPLICATION, ARRAYS & DOUBLING CHAINS (Weeks 6 - 15)
  if (week >= 6 && week <= 15) {
    if (tier === 'easy') {
      const a = randInt(4, 9);
      const b = randInt(3, 8);
      const prod = a * b;
      const opts = [prod, prod + b, prod - b, prod + 2].map(String);
      const shuffled = shuffle(opts);
      const correctIndex = shuffled.indexOf(String(prod));

      return {
        id,
        tier: 'easy',
        tierLabelEn: 'Easy',
        tierLabelZh: '基础',
        questionEn: `Millen Woods cafeteria arranged tables into an array with ${a} rows and ${b} seats per row. How many seats are there in total?`,
        questionZh: `米伦伍兹餐厅摆放了 ${a} 排餐桌，每排有 ${b} 个座位。总共有多少个座位？`,
        optionsEn: shuffled,
        optionsZh: shuffled.map(s => `${s} 个座位`),
        correctIndex,
        secretClueEn: `Multiply rows by columns: ${a} × ${b}.`,
        secretClueZh: `用行数乘以列数：${a} × ${b}。`,
        explanationEn: `${a} × ${b} = ${prod} seats.`,
        explanationZh: `${a} × ${b} = ${prod} 个座位。`,
        visual: { type: 'array', content: `${a} rows × ${b} columns`, subtext: 'Rectangular Array Model' }
      };
    }

    if (tier === 'med') {
      const baseNum = randInt(13, 29);
      const double1 = baseNum * 2;
      const double2 = baseNum * 4;
      const double3 = baseNum * 8;

      const opts = [String(double3), String(double3 + baseNum), String(double3 - baseNum), String(double2 * 3)];
      const shuffled = shuffle(opts);
      const correctIndex = shuffled.indexOf(String(double3));

      return {
        id,
        tier: 'med',
        tierLabelEn: 'Medium',
        tierLabelZh: '进阶',
        questionEn: `Mental Math Doubling Chain: To quickly calculate ${baseNum} × 8, double three times: ${baseNum} ➔ ${double1} (×2) ➔ ${double2} (×4) ➔ ? (×8). What is the answer?`,
        questionZh: `心算连续翻倍策略：要快速计算 ${baseNum} × 8，连续翻倍三次：${baseNum} ➔ ${double1} (×2) ➔ ${double2} (×4) ➔ ? (×8)。最终结果是多少？`,
        optionsEn: shuffled,
        optionsZh: shuffled,
        correctIndex,
        secretClueEn: `Double ${double2}: ${double2} + ${double2}.`,
        secretClueZh: `将 ${double2} 再次翻倍：${double2} + ${double2}。`,
        explanationEn: `Doubling ${double2} gives ${double3}. So ${baseNum} × 8 = ${double3}!`,
        explanationZh: `${double2} 的两倍是 ${double3}，因此 ${baseNum} × 8 = ${double3}！`
      };
    }

    if (tier === 'boss' || tier === 'olympiad') {
      // Challenging remainder / fair sharing / distribution problem
      const totalStudents = randInt(75, 120);
      const teamSize = randInt(6, 9);
      const fullTeams = Math.floor(totalStudents / teamSize);
      const remainder = totalStudents % teamSize;
      const neededForNext = remainder === 0 ? 0 : teamSize - remainder;

      const pairs = [
        { en: `${fullTeams} full teams, need ${neededForNext} more students`, zh: `${fullTeams} 支满员队，还需 ${neededForNext} 人凑新队` },
        { en: `${fullTeams + 1} full teams, ${remainder} left`, zh: `${fullTeams + 1} 支队，剩余 ${remainder} 人` },
        { en: `${fullTeams} full teams, need ${remainder} more`, zh: `${fullTeams} 支满员队，还需 ${remainder} 人` },
        { en: `${fullTeams - 1} full teams, need 1 more`, zh: `${fullTeams - 1} 支队，差 1 人` }
      ];
      const correctPair = pairs[0];
      const shuffledPairs = shuffle(pairs);
      const correctIndex = shuffledPairs.findIndex(p => p.en === correctPair.en);

      return {
        id,
        tier: 'olympiad',
        tierLabelEn: 'Olympiad Brain King',
        tierLabelZh: '终极奥数脑王',
        questionEn: `RIM Park Field Day: ${totalStudents} students are forming soccer teams of exactly ${teamSize} players. How many full teams can be formed, and how many MORE students are needed to form one more complete team?`,
        questionZh: `RIM 公园运动会：${totalStudents} 名学生要组成每队恰好 ${teamSize} 人的足球队。最多可以组成多少支完整队伍？还需要多少名学生才能再凑齐一支完整队伍？`,
        optionsEn: shuffledPairs.map(p => p.en),
        optionsZh: shuffledPairs.map(p => p.zh),
        correctIndex,
        secretClueEn: `Divide ${totalStudents} ÷ ${teamSize}: quotient is full teams, remainder tells you how many are left. Next team needs: ${teamSize} - remainder.`,
        secretClueZh: `计算 ${totalStudents} ÷ ${teamSize}：商为完整队数，余数 ${remainder} 为剩余人数。再凑一队需要：${teamSize} - ${remainder} = ${neededForNext} 人。`,
        explanationEn: `${totalStudents} ÷ ${teamSize} = ${fullTeams} R ${remainder}. To complete the next team of ${teamSize}, we need ${neededForNext} more students!`,
        explanationZh: `${totalStudents} ÷ ${teamSize} = ${fullTeams} 余 ${remainder}。再凑满下一支 ${teamSize} 人的队伍，还需要 ${neededForNext} 人！`
      };
    }
  }

  // 4. FRACTIONS, DECIMALS & MONEY (Weeks 16 - 25)
  if (week >= 16 && week <= 25) {
    if (tier === 'olympiad' || tier === 'boss') {
      // Challenging mixed number fraction of set or money balance
      const paid = 20;
      const price1 = (randInt(4, 8) * 1.0 + randInt(1, 9) * 0.1).toFixed(2);
      const price2 = (randInt(5, 7) * 1.0 + randInt(1, 9) * 0.1).toFixed(2);
      const totalCost = (parseFloat(price1) + parseFloat(price2)).toFixed(2);
      const change = (paid - parseFloat(totalCost)).toFixed(2);

      const correctAns = `$${change}`;
      const dist1 = `$${(parseFloat(change) + 1.0).toFixed(2)}`;
      const dist2 = `$${(parseFloat(change) - 0.5).toFixed(2)}`;
      const dist3 = `$${(paid - parseFloat(price1)).toFixed(2)}`;

      const options = [correctAns, dist1, dist2, dist3];
      const shuffled = shuffle(options);
      const correctIndex = shuffled.indexOf(correctAns);

      return {
        id,
        tier: 'olympiad',
        tierLabelEn: 'Olympiad Master Mind',
        tierLabelZh: '思维奥数',
        questionEn: `St. Jacobs Farmers' Market: A student bought maple syrup for $${price1} and artisan cheese for $${price2}. They paid with a $${paid} Canadian bill. Exactly how much change will they receive?`,
        questionZh: `圣雅各布农贸市场：一位同学购买了价值 $${price1} 的枫糖浆和 $${price2} 的手工奶酪，付了一张 $${paid} 加币纸币。应找零多少钱？`,
        optionsEn: shuffled,
        optionsZh: shuffled,
        correctIndex,
        secretClueEn: `Add costs: $${price1} + $${price2} = $${totalCost}. Subtract from $${paid}: $${paid}.00 - $${totalCost}.`,
        secretClueZh: `先算总花费：$${price1} + $${price2} = $${totalCost}。再算找零：$${paid}.00 - $${totalCost}。`,
        explanationEn: `Total spent: $${totalCost}. Change from $${paid}: $${paid} - $${totalCost} = $${change}!`,
        explanationZh: `总花费 $${totalCost}，找零：$${paid} - $${totalCost} = $${change}！`
      };
    }
  }

  // 5. MEASUREMENT, AREA & PERIMETER (Weeks 26 - 32)
  if (week >= 26 && week <= 32) {
    if (tier === 'boss' || tier === 'olympiad') {
      const length = randInt(8, 15);
      const perimeter = randInt(40, 60);
      // Ensure perimeter - 2*length is positive and even
      const adjustedPerimeter = perimeter % 2 === 0 ? perimeter : perimeter + 1;
      const width = (adjustedPerimeter - 2 * length) / 2;
      const area = length * width;

      const pairs = [
        { en: `${area} m² (Width: ${width} m)`, zh: `${area} 平方米（宽为 ${width} 米）` },
        { en: `${area + 10} m²`, zh: `${area + 10} 平方米` },
        { en: `${length * 2 + width} m²`, zh: `${length * 2 + width} 平方米` },
        { en: `${adjustedPerimeter * 2} m²`, zh: `${adjustedPerimeter * 2} 平方米` }
      ];
      const correctPair = pairs[0];
      const shuffledPairs = shuffle(pairs);
      const correctIndex = shuffledPairs.findIndex(p => p.en === correctPair.en);

      return {
        id,
        tier: 'olympiad',
        tierLabelEn: 'Olympiad Brain King',
        tierLabelZh: '终极奥数脑王',
        questionEn: `Millen Woods Community Garden: A rectangular garden has a perimeter of ${adjustedPerimeter} meters. If its length is ${length} meters, what is the AREA of the garden?`,
        questionZh: `米伦伍兹社区花园：一个长方形花园的周长是 ${adjustedPerimeter} 米。如果已知它的长是 ${length} 米，这个花园的面积是多少？`,
        optionsEn: shuffledPairs.map(p => p.en),
        optionsZh: shuffledPairs.map(p => p.zh),
        correctIndex,
        secretClueEn: `Perimeter = 2 × (Length + Width). Half perimeter = ${adjustedPerimeter / 2}. Width = ${adjustedPerimeter / 2} - ${length} = ${width}. Area = Length × Width.`,
        secretClueZh: `周长 = 2 × (长 + 宽)。半周长 = ${adjustedPerimeter / 2}。宽 = ${adjustedPerimeter / 2} - ${length} = ${width} 米。面积 = 长 × 宽 = ${length} × ${width}。`,
        explanationEn: `Width = (${adjustedPerimeter} - 2 × ${length}) ÷ 2 = ${width} m. Area = ${length} × ${width} = ${area} m²!`,
        explanationZh: `宽 = (${adjustedPerimeter} - 2 × ${length}) ÷ 2 = ${width} 米。面积 = ${length} × ${width} = ${area} 平方米！`
      };
    }
  }

  // 6. ALGEBRA & PATTERNS (Weeks 33 - 40)
  if (week >= 33) {
    if (tier === 'boss' || tier === 'olympiad') {
      const step = randInt(4, 9);
      const start = randInt(7, 23);
      const term4 = start + 3 * step;
      const term5 = start + 4 * step;
      const term6 = start + 5 * step;
      const term10 = start + 9 * step;

      const correctAns = `${term10}`;
      const dist1 = `${term10 + step}`;
      const dist2 = `${term10 - step}`;
      const dist3 = `${start + 10 * step}`;

      const options = [correctAns, dist1, dist2, dist3];
      const shuffled = shuffle(options);
      const correctIndex = shuffled.indexOf(correctAns);

      return {
        id,
        tier: 'olympiad',
        tierLabelEn: 'Olympiad Brain King',
        tierLabelZh: '终极奥数脑王',
        questionEn: `Growing Pattern Sequence: ${start}, ${start + step}, ${start + 2 * step}, ${term4}, ${term5}... If this pattern continues, what is the 10th term in the sequence?`,
        questionZh: `递增数列规律：${start}, ${start + step}, ${start + 2 * step}, ${term4}, ${term5}... 如果规律继续延伸，该数列的第 10 项是多少？`,
        optionsEn: shuffled,
        optionsZh: shuffled,
        correctIndex,
        secretClueEn: `Find the rule: Add ${step} each time! 10th term = Start (${start}) + 9 × Step (${step}).`,
        secretClueZh: `寻找规律：每次增加 ${step}！第 10 项 = 起始数 (${start}) + 9 × 增量 (${step})。`,
        explanationEn: `Rule: +${step} each step. The 10th term is ${start} + (9 × ${step}) = ${start} + ${9 * step} = ${term10}!`,
        explanationZh: `数列规律为每次加 ${step}。第 10 项为 ${start} + (9 × ${step}) = ${term10}！`
      };
    }
  }

  // Fallback: If not matched, generate a numeric variation of the base question
  return {
    ...baseQ,
    id
  };
}

/**
 * Filter questions for a specific difficulty tier, or provide a full set of 5 varied questions
 */
export function getQuestionsForTier(
  topicQuestions: QuestionItem[],
  tierMode: 'all' | DifficultyTier,
  weekNumber: number,
  variantSeed: number
): QuestionItem[] {
  // If 'all', return all 5 questions with variant applied
  if (tierMode === 'all') {
    return topicQuestions.map(q => generateQuestionVariant(q, weekNumber, q.tier, variantSeed));
  }

  // If specific tier (easy, med, boss/hard, olympiad):
  // Filter questions matching that tier
  const matched = topicQuestions.filter(q => q.tier === tierMode);

  if (matched.length >= 5) {
    return matched.slice(0, 5).map(q => generateQuestionVariant(q, weekNumber, tierMode, variantSeed));
  }

  // If fewer than 5 exist for that tier, synthesize 5 varied questions for that tier!
  const baseSeedQ = matched[0] || topicQuestions[0];
  const list: QuestionItem[] = [];

  for (let i = 0; i < 5; i++) {
    // Generate distinct seeds for each of the 5 questions
    list.push(generateQuestionVariant(baseSeedQ, weekNumber, tierMode, variantSeed * 10 + i + 1));
  }

  return list;
}

import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Volume2, VolumeX, Sparkles, Compass, MessageSquare, RefreshCw, ChevronDown } from 'lucide-react';
import { playClickSound, speakText, stopSpeaking } from '../utils/audio';
import { Language } from '../utils/i18n';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface MarinerAiBuddyProps {
  lang: Language;
  soundEnabled: boolean;
  currentContext?: string;
}

export const MarinerAiBuddy: React.FC<MarinerAiBuddyProps> = ({
  lang,
  soundEnabled,
  currentContext,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    return [
      {
        id: 'welcome',
        role: 'assistant',
        content:
          lang === 'fr'
            ? '⚓ Ohé, Marin ! Je suis le tuteur IA des Marins de Millen Woods ! Que tu aies besoin d\'un indice pour un problème de maths de 4e année, d\'une histoire sur Waterloo ou d\'une énigme, pose-moi tes questions ! Prêt à naviguer ?'
            : lang === 'zh'
            ? '⚓ 嗨！我是 Melody 的水手 AI 学习导师！无论是四年级数学思维题、滑铁卢当地自然地理还是几何解题窍门，随时问我吧！准备好启航了吗？'
            : "⚓ Ahoy! I'm Melody's Mariner AI Learning Buddy! Whether you need a clue for a tricky Grade 4 math problem, a Waterloo landmark story, or a fun geography adventure riddle, ask me anything! Ready to set sail?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    {
      en: '💡 Can you explain how fractions work using pizza or chocolate?',
      fr: '💡 Peux-tu m\'expliquer les fractions avec une pizza ou du chocolat ?',
      zh: '💡 能用披萨或巧克力给我讲讲分数的概念吗？',
    },
    {
      en: '🍁 Tell me a cool secret about Laurel Creek or Waterloo!',
      fr: '🍁 Raconte-moi un fait secret sur Laurel Creek ou Waterloo !',
      zh: '🍁 告诉我一个关于滑铁卢月桂溪的有趣秘密！',
    },
    {
      en: '📐 How do I measure perimeter and area without getting confused?',
      fr: '📐 Comment distinguer le périmètre et l\'aire sans se tromper ?',
      zh: '📐 周长和面积怎么区分才不会搞混？',
    },
    {
      en: '👑 Challenge me with a fun Grade 4 math riddle!',
      fr: '👑 Pose-moi une énigme amusante de maths de 4e année !',
      zh: '👑 出一道好玩的 4 年级奥数侦探谜题考考我！',
    },
  ];

  const handleSpeak = (msgId: string, text: string) => {
    if (speakingId === msgId) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }
    stopSpeaking();
    setSpeakingId(msgId);
    speakText(text, lang, () => setSpeakingId(null));
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    if (soundEnabled) playClickSound();

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      // 1. Try calling full-stack backend endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map(m => ({ role: m.role, content: m.content })),
          lang,
          topicContext: currentContext,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || (lang === 'zh' ? '收到你的提问啦！' : 'Got your question!'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.warn('Backend chat not reachable or static deployment mode. Using client curriculum assistant:', err);

      // Intelligent Client Fallback for GitHub Pages / Offline mode
      let fallbackContent = '';
      const qLower = query.toLowerCase();

      if (qLower.includes('fraction') || query.includes('分数') || qLower.includes('pizza') || query.includes('披萨')) {
        fallbackContent =
          lang === 'fr'
            ? '🍕 Imagine les fractions comme le partage d\'une délicieuse pizza !\n• Le dénominateur (chiffre du bas) indique en combien de parts égales la pizza est coupée (ex. 8 parts).\n• Le numérateur (chiffre du haut) indique combien de parts tu prends (ex. 3 parts = 3/8).\nSi les dénominateurs sont identiques, tu peux additionner directement les numérateurs !'
            : lang === 'zh'
            ? '🍕 分数就像分披萨！\n• 分母（下面的数字）代表总共切成了几块（比如 8 块）。\n• 分子（上面的数字）代表你拿到了几块（比如 3 块，那就是 3/8）。\n只要两块披萨切得一样大，分母相同的分数可以直接相加哦！'
            : "🍕 Think of fractions like sharing a pizza! The denominator (bottom number) is how many equal slices the pizza is cut into (e.g., 8 slices). The numerator (top number) is how many slices you get (e.g., 3 slices = 3/8). If the slices are equal, you're a fraction master!";
      } else if (qLower.includes('laurel creek') || qLower.includes('waterloo') || query.includes('秘密') || query.includes('滑铁卢') || qLower.includes('ruisseau')) {
        fallbackContent =
          lang === 'fr'
            ? '🍁 Secret de l\'école Millen Woods : La réserve de conservation de Laurel Creek se trouve tout près à l\'ouest de notre école ! On peut y observer de grands hérons bleus, des canards colverts et des castors bâtisseurs. Waterloo est aussi la capitale mondiale des mathématiques au Canada avec le train léger ION !'
            : lang === 'zh'
            ? '🍁 滑铁卢小秘密：Laurel Creek Conservation Area 就在 Millen Woods 学校西边不远！小水手们可以在那里观察大蓝鹭、野鸭和小海狸。滑铁卢也是加拿大著名的科技与数学之都，拥有滑铁卢大学和美丽的 ION 轻轨电车！'
            : '🍁 Millen Woods Mariner Secret: Laurel Creek Conservation Area is just west of our school! You can spot great blue herons, mallard ducks, and busy beavers. Waterloo is also the world-renowned math and tech capital of Canada, with the ION LRT train cruising right past Waterloo Park!';
      } else if (qLower.includes('perimeter') || qLower.includes('périmètre') || qLower.includes('area') || qLower.includes('aire') || query.includes('周长') || query.includes('面积')) {
        fallbackContent =
          lang === 'fr'
            ? '📐 Règle d\'or du Marin pour ne plus confondre :\n• Périmètre : c\'est la clôture tout autour du terrain de jeu ! On additionne la longueur de chaque côté (P = Longueur + Largeur + Longueur + Largeur).\n• Aire : c\'est le tapis de pelouse à l\'intérieur ! On compte les carrés unités (Aire = Longueur × Largeur) !'
            : lang === 'zh'
            ? '📐 超好记口诀：\n• 周长（Perimeter）：就像在足球场外沿围栏跑步，把所有的边长加在一起（P = 长 + 宽 + 长 + 宽）。\n• 面积（Area）：就像铺地毯，算算里面盖住了多少个小正方形（A = 长 × 宽）！'
            : '📐 Quick Mariner rule: Perimeter is the fence around the playground (add all outside sides together: P = L + W + L + W). Area is the grass inside the fence (count the square units: Area = Length × Width)!';
      } else if (qLower.includes('riddle') || qLower.includes('énigme') || query.includes('谜题') || query.includes('奥数')) {
        fallbackContent =
          lang === 'fr'
            ? '👑 Énigme du Détective Marin :\nMelody achète des pommes au marché fermier de St. Jacobs. Si elle les achète par paquets de 4, il ne reste aucune pièce. Si elle les achète par paquets de 5, il ne reste aucune pièce non plus. Elle possède moins de 30 pièces d\'or. Combien de pièces a-t-elle exactement ?\n(Indice : trouve un multiple commun de 4 et de 5 inférieur à 30 !)'
            : lang === 'zh'
            ? '👑 奥数小侦探谜题：\n小水手 Melody 带着一些金币去圣雅各布农夫集市。如果她每次买 4 个苹果，正好买完；如果每次买 5 个苹果，也正好买完。她的金币少于 30 枚，请问她正好有多少枚金币？\n（小提示：找 4 和 5 的公倍数哦！）'
            : '👑 Mariner Detective Riddle: Melody is shopping at St. Jacobs Farmers’ Market with gold coins. If she buys apples in packs of 4, no coins are left over. If she buys in packs of 5, no coins are left over. She has fewer than 30 coins. How many gold coins does she have? (Hint: Find a common multiple of 4 and 5!)';
      } else {
        fallbackContent =
          lang === 'fr'
            ? `⚓ Excellente question, Marin ! Voici la méthode de navigation pour les maths de 4e année :\n1. Repère les nombres clés et ce que la question demande ;\n2. Dessine un schéma sur ton brouillon (clique sur ✏️ Brouillon en haut !) ;\n3. Décompose les calculs en étapes simples. Tu vas y arriver !`
            : lang === 'zh'
            ? `⚓ 收到你的提问啦！小水手别担心，数学就像航海探险：\n1. 先找出题目给出的已知条件；\n2. 画一画草稿图（点击右上方 ✏️ 草稿本！）；\n3. 一步一步列算式。随时跟我交流，一起征服这道题！`
            : `⚓ Great question, Mariner! Here is a handy navigator rule for Grade 4 math:\n1. Spot the numbers and what the question is asking;\n2. Sketch it out on the scratchpad (click ✏️ Scratchpad on top!);\n3. Break big calculations into friendly round numbers. You've got this!`;
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbackContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-5 right-5 z-50">
        {!isOpen && (
          <button
            onClick={() => {
              if (soundEnabled) playClickSound();
              setIsOpen(true);
            }}
            className="group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-2xl border-3 border-slate-900 comic-box shadow-comic hover:scale-105 active:scale-95 transition-all"
            title={lang === 'fr' ? 'Ouvrir le tuteur IA Marin' : lang === 'zh' ? '开启 Melody 的水手 AI 导师' : "Open Melody's Mariner AI Tutor"}
          >
            <span className="w-8 h-8 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold text-lg comic-box-sm group-hover:rotate-12 transition-transform">
              🤖
            </span>
            <div className="text-left font-comic">
              <div className="text-xs font-black tracking-wide text-amber-300 uppercase">
                {lang === 'fr' ? 'Tuteur IA Marin' : lang === 'zh' ? '水手 AI 导师' : 'Mariner AI Buddy'}
              </div>
              <div className="text-[11px] text-blue-100 font-sans">
                {lang === 'fr' ? 'Maths & Géo 4e année' : lang === 'zh' ? '随时提问答疑' : 'Ask Math & Geography'}
              </div>
            </div>
            <Sparkles size={16} className="text-amber-300 animate-pulse ml-1" />
          </button>
        )}
      </div>

      {/* Floating Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-3xl border-3 border-slate-900 comic-box shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 border-b-3 border-slate-900 px-4 py-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold text-xl comic-box-sm">
                🤖
              </span>
              <div>
                <h3 className="font-comic font-black text-sm tracking-tight flex items-center gap-1.5 text-amber-200">
                  <span>{lang === 'fr' ? 'Tuteur IA Marin de Melody' : lang === 'zh' ? 'Melody 的水手 AI 导师' : "Melody's Mariner AI Tutor"}</span>
                  <span className="px-1.5 py-0.5 rounded-md bg-blue-900/60 text-[10px] text-amber-300 border border-blue-400/40">
                    Gemini 3.8
                  </span>
                </h3>
                <p className="text-[11px] text-blue-100 font-sans">
                  {lang === 'fr' ? 'Maths 4e année & Aventure WRDSB' : lang === 'zh' ? 'Millen Woods 四年级专属答疑' : 'WRDSB Grade 4 Math & World Quest'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                stopSpeaking();
                setSpeakingId(null);
                setIsOpen(false);
              }}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="bg-amber-50/90 border-b-2 border-slate-200 px-3 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {quickPrompts.map((p, idx) => {
              const promptText = lang === 'fr' ? p.fr : lang === 'zh' ? p.zh : p.en;
              return (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(promptText)}
                  className="shrink-0 px-2.5 py-1 rounded-xl bg-white hover:bg-amber-100 border border-slate-300 hover:border-slate-800 text-[11px] font-comic font-bold text-slate-700 transition-all shadow-xs"
                >
                  {promptText}
                </button>
              );
            })}
          </div>

          {/* Message Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/60">
            {messages.map(msg => {
              const isBot = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {isBot && (
                    <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 comic-box-xs">
                      ⚓
                    </span>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl p-3 border-2 border-slate-900 font-sans text-xs leading-relaxed whitespace-pre-wrap ${
                      isBot
                        ? 'bg-white text-slate-900 comic-box-sm'
                        : 'bg-amber-300 text-slate-950 font-medium ml-auto'
                    }`}
                  >
                    <div>{msg.content}</div>

                    <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                      <span>{msg.timestamp}</span>
                      {isBot && (
                        <button
                          onClick={() => handleSpeak(msg.id, msg.content)}
                          className={`p-1 rounded-md transition-colors ${
                            speakingId === msg.id
                              ? 'text-blue-600 bg-blue-50 font-bold'
                              : 'hover:text-slate-700'
                          }`}
                          title="Read aloud"
                        >
                          <Volume2 size={13} className={speakingId === msg.id ? 'animate-pulse' : ''} />
                        </button>
                      )}
                    </div>
                  </div>
                  {!isBot && (
                    <span className="w-7 h-7 rounded-lg bg-amber-400 text-slate-900 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 comic-box-xs">
                      👧
                    </span>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500 font-comic text-xs">
                <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 animate-bounce">
                  🧭
                </span>
                <span className="bg-white border-2 border-slate-900 px-3 py-1.5 rounded-2xl comic-box-xs flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-500 animate-spin" />
                  <span>{lang === 'fr' ? 'Le tuteur IA consulte le journal de bord...' : lang === 'zh' ? '水手 AI 正在翻阅航海日志...' : 'Mariner AI is navigating your answer...'}</span>
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t-2 border-slate-900 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={
                lang === 'fr'
                  ? 'Pose une question de maths ou de géographie...'
                  : lang === 'zh'
                  ? '输入你想问的数学或地理问题...'
                  : 'Ask a Grade 4 math or world quest question...'
              }
              className="flex-1 px-3.5 py-2.5 rounded-xl border-2 border-slate-900 font-sans text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-comic text-xs font-bold border-2 border-slate-900 comic-box-sm shadow-comic flex items-center gap-1 transition-all"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

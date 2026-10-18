import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize GoogleGenAI
const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// API Route for Gemini Chatbot (Melody's Mariner AI Learning Buddy)
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, lang = 'en', topicContext } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const ai = getAIClient();
    if (!ai) {
      // Friendly fallback if no API key is configured yet
      const fallbackReply = lang === 'zh'
        ? '⚓ 嗨！我是航海水手学习小助手。当前后端尚未配置 GEMINI_API_KEY，但我依然可以在这里为你解答数学题和世界探索的疑问！你可以在设置面板中配置 API 密钥来激活超强 AI 思考力。'
        : '⚓ Ahoy! I am your Mariner Math & World Learning Buddy. The GEMINI_API_KEY is not configured yet in the environment, but I am still here to support your math expedition! Add your key in the Secrets panel to unlock full AI conversational powers.';
      return res.json({ reply: fallbackReply });
    }

    const systemInstruction = `You are "Melody's Mariner AI Navigator", a warm, enthusiastic, and patient Grade 4 Math & World Explorer tutor designed for students at Millen Woods Public School in Waterloo, Ontario.
Key guidelines:
1. Student context: Grade 4 Ontario curriculum (WRDSB). Concepts include 4-digit addition/subtraction, multiplication/division arrays, fractions, decimals, perimeter, 2D/3D geometry, angles, coordinates, probability, and financial literacy.
2. Local flavor: Connect math and geography problems to Waterloo Region when helpful (e.g. Laurel Creek, RIM Park, Waterloo Park, ION LRT train, Grand River, St. Jacobs Farmers' Market, Grand River Hospital).
3. Tone: Encouraging, supportive, failure-proof, and fun like a graphic novel mentor. Never just give the answer right away; break down confusing concepts with vivid visual analogies and step-by-step clues.
4. Language: Respond in ${lang === 'zh' ? 'Simplified Chinese (简体中文)' : 'English'}, matching the student's selected language. Keep explanations easy for a 9-year-old to understand.
${topicContext ? `Current context: The student is looking at ${topicContext}.` : ''}`;

    // Format chat contents for @google/genai
    // gemini-3.8-flash for general chat tasks
    const contents = messages.map((m: { role: 'user' | 'assistant' | 'model'; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : m.role,
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || (lang === 'zh' ? '航海日记没有接收到回应，请再试一次！' : 'Could not generate a response. Please try again!');
    return res.json({ reply });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Gemini chat error:', error);
    const { lang = 'en' } = req.body || {};
    const fallbackMessage = lang === 'zh'
      ? '⚓ 嗨！水手 AI 刚刚在航行中遇到了一阵小风浪。无论是关于 4 年级分数、面积计算，还是滑铁卢 Laurel Creek 的秘密，你随时可以在左下角打开草稿本或直接再问我一次！'
      : "⚓ Ahoy! Mariner AI just navigated through a tiny gust of sea mist! Feel free to ask me again or test out your calculations on the scratchpad in the bottom-left corner!";
    return res.json({ reply: fallbackMessage });
  }
});

// Vite middleware or static serving
async function setupServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, () => {
    console.log(`🚀 Mariner Server running at http://localhost:${port}`);
  });
}

setupServer();

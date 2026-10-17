/**
 * Millen Woods Mariners Audio Engine
 * Zero-dependency audio synthesizer using Web Audio API and Web Speech API.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/** Play an uplifting ascending chord for correct answers */
export function playCorrectSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.08);

    gain.gain.setValueAtTime(0.001, ctx.currentTime + index * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + index * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.08 + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + index * 0.08);
    osc.stop(ctx.currentTime + index * 0.08 + 0.3);
  });
}

/** Gentle clue ding */
export function playClueSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
  osc.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.12); // D6

  gain.gain.setValueAtTime(0.001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.36);
}

/** Grand fanfare for unlocking a 5-step Treasure Chest */
export function playChestFanfare() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const chords = [
    { notes: [440, 554.37, 659.25], time: 0.0, dur: 0.2 },      // A major
    { notes: [493.88, 622.25, 739.99], time: 0.22, dur: 0.2 },  // B major
    { notes: [554.37, 659.25, 830.61], time: 0.44, dur: 0.25 }, // C#m
    { notes: [659.25, 830.61, 987.77, 1318.51], time: 0.72, dur: 0.65 } // E major grand finish
  ];

  chords.forEach(chord => {
    chord.notes.forEach(freq => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + chord.time);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + chord.time);
      gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + chord.time + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + chord.time + chord.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + chord.time);
      osc.stop(ctx.currentTime + chord.time + chord.dur + 0.05);
    });
  });
}

/** Subtle tactile click */
export function playClickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);

  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.05);
}

/** Web Speech API English Read-Aloud */
let currentUtterance: SpeechSynthesisUtterance | null = null;

export function speakEnglish(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  // Cancel any running speech
  window.speechSynthesis.cancel();

  // Strip math symbols or formatting for smooth speech if needed
  const cleanedText = text
    .replace(/[×*]/g, ' times ')
    .replace(/[÷/]/g, ' divided by ')
    .replace(/=/g, ' equals ')
    .replace(/±/g, ' plus or minus ')
    .replace(/\$/g, ' dollars ');

  const utterance = new SpeechSynthesisUtterance(cleanedText);
  utterance.lang = 'en-US';
  utterance.rate = 0.95; // Friendly, clear pacing for 9-year-olds
  utterance.pitch = 1.05;

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };
  utterance.onerror = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

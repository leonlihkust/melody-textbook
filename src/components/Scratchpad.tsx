import React, { useRef, useState, useEffect } from 'react';
import { Pencil, Eraser, Trash2, RotateCcw, Grid, Maximize2, Minimize2, X, Ruler } from 'lucide-react';

import { Language, I18N } from '../utils/i18n';

interface ScratchpadProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const COLORS = [
  { name: 'Ink Navy', value: '#0f172a' },
  { name: 'Mariner Blue', value: '#2563eb' },
  { name: 'Maple Red', value: '#dc2626' },
  { name: 'Forest Green', value: '#16a34a' },
  { name: 'Golden Amber', value: '#d97706' },
  { name: 'Grape Purple', value: '#9333ea' },
];

export const Scratchpad: React.FC<ScratchpadProps> = ({ isOpen, onClose, lang }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#0f172a');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [isEraser, setIsEraser] = useState(false);
  const [gridMode, setGridMode] = useState<'grid' | 'dots' | 'plain'>('grid');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showRuler, setShowRuler] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);

  // Resize canvas to match display size
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Save initial blank state
    const blank = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([blank]);
  }, [isOpen, isExpanded]);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory(prev => [...prev.slice(-10), data]);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop(); // remove current
    const prev = newHistory[newHistory.length - 1];
    if (prev) {
      ctx.putImageData(prev, 0, 0);
      setHistory(newHistory);
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveState();
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.setPointerCapture(e.pointerId);
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = strokeWidth * 4;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas && canvas.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }
    setIsDrawing(false);
    saveState();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 transition-all duration-200 comic-box bg-white ${
        isExpanded
          ? 'inset-4 md:inset-8 rounded-2xl flex flex-col'
          : 'bottom-4 right-4 w-[92vw] sm:w-[460px] h-[520px] rounded-2xl flex flex-col'
      }`}
    >
      {/* Scratchpad Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-amber-400 border-b-2 border-slate-900 rounded-t-2xl select-none">
        <div className="flex items-center gap-2">
          <span className="text-xl">✏️</span>
          <div>
            <h3 className="font-comic text-base font-bold text-slate-900 leading-tight">
              {I18N[lang].scratchpad.title}
            </h3>
            <span className="text-[11px] font-medium text-amber-950">
              {I18N[lang].scratchpad.subtitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-amber-200 border-2 border-slate-900 hover:bg-white text-slate-900 transition-colors"
            title={isExpanded ? 'Restore' : 'Expand'}
            aria-label="Toggle scratchpad size"
          >
            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-rose-400 border-2 border-slate-900 hover:bg-rose-500 text-white transition-colors"
            title={I18N[lang].scratchpad.close}
            aria-label="Close scratchpad"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Toolbar Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-slate-100 border-b-2 border-slate-900 text-xs select-none">
        {/* Tool switches */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsEraser(false)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md border-2 border-slate-900 font-semibold transition-all ${
              !isEraser ? 'bg-amber-300 text-slate-900 shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Pencil size={13} />
            <span>{I18N[lang].scratchpad.pen}</span>
          </button>

          <button
            onClick={() => setIsEraser(true)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md border-2 border-slate-900 font-semibold transition-all ${
              isEraser ? 'bg-amber-300 text-slate-900 shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Eraser size={13} />
            <span>{I18N[lang].scratchpad.eraser}</span>
          </button>

          {/* Grid pattern switch */}
          <button
            onClick={() => {
              setGridMode(m => (m === 'grid' ? 'dots' : m === 'dots' ? 'plain' : 'grid'));
            }}
            className="flex items-center gap-1 px-2 py-1 rounded-md border-2 border-slate-900 bg-white hover:bg-slate-50 text-slate-700"
            title="Change background grid"
          >
            <Grid size={13} />
            <span className="capitalize">{gridMode}</span>
          </button>

          {/* Ruler toggle */}
          <button
            onClick={() => setShowRuler(r => !r)}
            className={`flex items-center gap-1 px-2 py-1 rounded-md border-2 border-slate-900 transition-colors ${
              showRuler ? 'bg-blue-300 text-slate-900 font-bold' : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
            title="Virtual ruler guide"
          >
            <Ruler size={13} />
            <span>{I18N[lang].scratchpad.ruler}</span>
          </button>
        </div>

        {/* Color Palette & Stroke sizes */}
        <div className="flex items-center gap-2">
          {!isEraser && (
            <div className="flex items-center gap-1">
              {COLORS.map(c => (
                <button
                  key={c.value}
                  onClick={() => setColor(c.value)}
                  style={{ backgroundColor: c.value }}
                  className={`w-5 h-5 rounded-full border-2 transition-transform ${
                    color === c.value ? 'scale-125 border-slate-900 shadow-sm' : 'border-slate-400 opacity-80 hover:opacity-100'
                  }`}
                  title={c.name}
                  aria-label={c.name}
                />
              ))}
            </div>
          )}

          {/* Stroke Width */}
          <div className="flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-md border border-slate-300">
            {[2, 4, 7].map(w => (
              <button
                key={w}
                onClick={() => setStrokeWidth(w)}
                className={`w-4 h-4 flex items-center justify-center rounded ${strokeWidth === w ? 'bg-slate-200' : ''}`}
                title={`Stroke ${w}px`}
              >
                <span
                  style={{ width: `${w * 2}px`, height: `${w * 2}px` }}
                  className="rounded-full bg-slate-900 inline-block"
                />
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <button
            onClick={handleUndo}
            disabled={history.length <= 1}
            className="p-1 rounded bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-40 text-slate-700"
            title="Undo"
          >
            <RotateCcw size={14} />
          </button>

          <button
            onClick={handleClear}
            className="p-1 rounded bg-white border border-slate-300 hover:bg-rose-50 text-rose-600"
            title="Clear canvas"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Canvas Drawing Stage */}
      <div
        className={`relative flex-1 overflow-hidden cursor-crosshair ${
          gridMode === 'grid'
            ? 'bg-grid-math bg-[#fafcff]'
            : gridMode === 'dots'
            ? 'bg-dot-math bg-[#fafcff]'
            : 'bg-white'
        }`}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
          className="absolute inset-0 w-full h-full touch-none"
        />

        {/* Optional overlay ruler */}
        {showRuler && (
          <div className="absolute top-2 left-2 right-2 h-10 bg-amber-100/90 border-2 border-slate-900 rounded shadow-md pointer-events-none flex items-end justify-between px-2 pb-1 font-mono text-[10px] text-slate-800">
            <span>0 cm</span>
            <span>| 2 cm</span>
            <span>| 4 cm</span>
            <span>| 6 cm</span>
            <span>| 8 cm</span>
            <span>| 10 cm</span>
            <span>| 12 cm</span>
            <span>| 14 cm</span>
          </div>
        )}
      </div>
    </div>
  );
};

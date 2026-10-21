import React, { useState } from 'react';
import { Copy, Check, X, QrCode, Smartphone } from 'lucide-react';
import { playClickSound } from '../utils/audio';
import { Language, I18N } from '../utils/i18n';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  soundEnabled: boolean;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, lang, soundEnabled }) => {
  const [copied, setCopied] = useState(false);
  const t = I18N[lang].share;

  // Fallback to the dedicated Cloud Run Shared App URL if window.location isn't the public one
  const shareUrl = typeof window !== 'undefined'
    ? (window.location.origin.includes('ais-dev')
        ? 'https://ais-pre-l6t452gmoqyhwv2dipdyhq-172462247321.us-west2.run.app'
        : window.location.href)
    : 'https://ais-pre-l6t452gmoqyhwv2dipdyhq-172462247321.us-west2.run.app';

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(shareUrl)}`;

  const handleCopy = async () => {
    if (soundEnabled) playClickSound();
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white comic-box-lg rounded-3xl max-w-lg w-full p-6 relative animate-in zoom-in-95 bg-halftone">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 comic-box-sm cursor-pointer"
          title={t.close}
          aria-label="Close share modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-2">
          <span className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-900 font-bold flex items-center justify-center text-xl comic-box-sm">
            🔗
          </span>
          <div>
            <h3 className="font-comic text-xl font-bold text-slate-900 leading-tight">
              {t.title}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* QR Code & Scan Section */}
        <div className="my-5 p-4 bg-amber-50 rounded-2xl border-2 border-slate-900 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="bg-white p-2 rounded-xl border-2 border-slate-900 shrink-0 shadow-sm">
            <img
              src={qrImageUrl}
              alt="Scan QR code to open Mariners Math Quest"
              className="w-32 h-32 object-contain rounded"
            />
          </div>
          <div>
            <div className="font-comic text-sm font-bold text-slate-900 mb-1 flex items-center justify-center sm:justify-start gap-1">
              <QrCode size={16} className="text-blue-600" />
              <span>{lang === 'fr' ? 'Scanner avec iPad / Téléphone' : lang === 'zh' ? '平板 / 手机微信扫一扫' : 'Scan with iPad / Phone'}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {lang === 'fr'
                ? 'Ouvre l\'appareil photo de ton iPad ou téléphone et pointe-le vers le code QR pour jouer instantanément !'
                : lang === 'zh'
                ? '用 iPad 相机或手机直接扫描左侧二维码，即可瞬间进入水手数学航海与世界探索！'
                : 'Open your camera app and point it at the QR code to launch the game instantly on any tablet or phone!'}
            </p>
          </div>
        </div>

        {/* Share Link Copy Field */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            {lang === 'fr' ? 'Lien de partage public' : lang === 'zh' ? '公开专属网址（永久有效）' : 'Public Shareable Link'}
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-100 border-2 border-slate-900 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 truncate select-all">
              {shareUrl}
            </div>
            <button
              onClick={handleCopy}
              className={`comic-btn px-4 py-2 font-comic text-xs font-bold rounded-xl flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-400 text-slate-900'
                  : 'bg-amber-400 hover:bg-amber-300 text-slate-900'
              }`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? t.copied : t.copyLink}</span>
            </button>
          </div>
        </div>

        {/* Install / Add to Home Screen Instructions */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
          <div className="font-comic font-bold text-slate-800 mb-1 flex items-center gap-1">
            <Smartphone size={14} className="text-blue-600" />
            <span>
              {lang === 'fr' ? '💡 Astuce : Ajouter à l\'écran d\'accueil sur iPad' : lang === 'zh' ? '💡 如何在 iPad 上像独立 App 一样玩：' : '💡 Tip: Add to iPad Home Screen'}
            </span>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-[11px] font-medium text-slate-600">
            <li>
              {lang === 'fr'
                ? 'Ouvre le lien dans Safari sur iPad / iPhone'
                : lang === 'zh'
                ? '在 Safari 浏览器中打开该链接'
                : 'Open the link in Safari on iPad / iPhone'}
            </li>
            <li>
              {lang === 'fr'
                ? 'Appuie sur l\'icône Partager (carré avec flèche vers le haut)'
                : lang === 'zh'
                ? '点击右上角“分享”图标（带有向上箭头的方框）'
                : 'Tap the Share icon (square with arrow pointing up)'}
            </li>
            <li>
              {lang === 'fr'
                ? 'Choisis "Sur l\'écran d\'accueil" pour l\'installer comme une vraie application !'
                : lang === 'zh'
                ? '滑动选择“添加到主屏幕 (Add to Home Screen)”'
                : 'Select "Add to Home Screen" to install it like an app!'}
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

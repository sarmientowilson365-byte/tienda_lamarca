import React, { useState, useEffect } from 'react';
import { Flame, Copy, Check, Clock, Sparkles } from 'lucide-react';

interface FlashSaleProps {
  onCopyCode: (code: string) => void;
}

export const FlashSale: React.FC<FlashSaleProps> = ({ onCopyCode }) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    onCopyCode('KICK15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="bg-gradient-to-r from-red-950 via-[#18181B] to-red-950 border-y border-red-900/40 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Callout */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center shrink-0">
            <Flame className="w-7 h-7 animate-pulse text-red-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
                OFERTA FLASH
              </span>
              <span className="text-xs font-bold text-red-400">Termina Pronto</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white uppercase italic tracking-tight mt-0.5">
              Obtén un 15% OFF Extra en Todo el Catálogo
            </h3>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-gray-400 hidden sm:block" />
          <div className="flex items-center gap-2">
            <div className="bg-[#0B0B0B] border border-red-500/30 rounded-xl px-3 py-1.5 text-center min-w-[50px]">
              <span className="text-lg font-black text-white block leading-none">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-gray-400 uppercase font-semibold">Horas</span>
            </div>
            <span className="text-red-500 font-bold text-xl">:</span>
            <div className="bg-[#0B0B0B] border border-red-500/30 rounded-xl px-3 py-1.5 text-center min-w-[50px]">
              <span className="text-lg font-black text-white block leading-none">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-gray-400 uppercase font-semibold">Min</span>
            </div>
            <span className="text-red-500 font-bold text-xl">:</span>
            <div className="bg-[#0B0B0B] border border-red-500/30 rounded-xl px-3 py-1.5 text-center min-w-[50px]">
              <span className="text-lg font-black text-white block leading-none text-red-400">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-gray-400 uppercase font-semibold">Seg</span>
            </div>
          </div>
        </div>

        {/* Coupon Code Copy Button */}
        <div className="flex items-center gap-2 bg-[#0B0B0B] border border-[#27272A] p-1.5 rounded-2xl">
          <div className="px-3 py-1">
            <span className="block text-[9px] text-gray-400 font-bold uppercase">Código Cupón</span>
            <span className="text-sm font-black text-red-500 tracking-wider">KICK15</span>
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Cupón</span>
              </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
};

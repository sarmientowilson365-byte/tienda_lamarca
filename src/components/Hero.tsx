import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RotateCcw, Flame, Check } from 'lucide-react';
import heroSneakerImg from '../assets/images/hero_red_sneaker_1784677348636.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onOpenCustomizer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenCustomizer }) => {
  const [activeColor, setActiveColor] = useState('#DC2626');
  const [activeTab, setActiveTab] = useState<'overview' | 'tech'>('overview');

  const hotspots = [
    { id: 1, title: 'Unidad Air Max 360°', desc: 'Absorción de impacto reactiva' },
    { id: 2, title: 'Cuero Premium Grain', desc: 'Resistencia y acabado de lujo' },
    { id: 3, title: 'Placa de Fibra de Carbono', desc: 'Retorno de energía continuo' },
  ];

  return (
    <section className="relative bg-[#0B0B0B] text-white overflow-hidden pt-6 pb-16 lg:py-20 border-b border-[#18181B]">
      {/* Red Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-red-700/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ef4444 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-800/50 text-red-400 text-xs font-bold tracking-wider uppercase backdrop-blur-md">
              <Flame className="w-4 h-4 text-red-500 animate-bounce" />
              <span>Colección Exclusiva 2026</span>
            </div>

            {/* Impactful Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-none italic">
              Lleva tu estilo <br />
              al <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-rose-600">siguiente nivel</span>
            </h1>

            {/* Explanatory Subtitle */}
            <p className="text-gray-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              Zapatillas y calzado urbano de las marcas más icónicas del mundo (Nike, Jordan, Adidas, Puma).
              Diseño innovador, comodidad absoluta y 100% garantizado.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-sm uppercase tracking-wider flex items-center gap-3 shadow-xl shadow-red-600/30 hover:scale-[1.02] active:scale-95 transition-all group"
              >
                <span>Ver Colección</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenCustomizer}
                className="px-6 py-3.5 rounded-xl bg-[#18181B] border border-[#27272A] hover:border-red-500/50 text-white font-bold text-sm flex items-center gap-2 hover:bg-white/5 transition-all"
              >
                <Sparkles className="w-4 h-4 text-red-500" />
                <span>Personalizar Zapatilla</span>
              </button>
            </div>

            {/* Value Props Strip */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-[#18181B] text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <ShieldCheck className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                  <p className="font-bold text-white">100% Original</p>
                  <p className="text-[10px] text-gray-400">Verificados por expertos</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Truck className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                  <p className="font-bold text-white">Envío Rápido</p>
                  <p className="text-[10px] text-gray-400">Despacho en 24h</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <RotateCcw className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                  <p className="font-bold text-white">Cambios Gratis</p>
                  <p className="text-[10px] text-gray-400">Hasta 30 días</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Interactive Floating Sneaker Showcase */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            
            {/* Background Glow Ring */}
            <div className="relative w-full max-w-lg aspect-square rounded-full bg-gradient-to-br from-red-600/20 via-black to-red-900/30 p-1 flex items-center justify-center shadow-2xl border border-red-500/20">
              
              {/* Floating Badge Top Right */}
              <div className="absolute top-4 right-4 z-20 bg-[#18181B]/90 border border-red-500/40 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xl text-xs font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>HOT RELEASE</span>
              </div>

              {/* Floating Discount Tag Bottom Left */}
              <div className="absolute bottom-6 left-4 z-20 bg-red-600 text-white px-3 py-1.5 rounded-xl shadow-lg text-xs font-black tracking-wider uppercase">
                ⚡ 20% OFF EXTRA
              </div>

              {/* Hero Image with Floating Animation */}
              <div className="relative w-full h-full flex items-center justify-center p-6">
                <img
                  src={heroSneakerImg}
                  alt="Sneaker Destacada KICKVAULT"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(220,38,38,0.45)] transform hover:scale-105 hover:-rotate-3 transition-transform duration-500 cursor-pointer"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Interactive Feature Pills */}
            <div className="w-full max-w-lg mt-6 bg-[#18181B] border border-[#27272A] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold">
                  360°
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Air Jordan 1 Retro "Chicago"</p>
                  <p className="text-[11px] text-gray-400">Piel vacuna premium + Amortiguación Air</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs text-gray-400 line-through mr-2">$220.00</span>
                <span className="text-base font-black text-red-500">$189.99</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

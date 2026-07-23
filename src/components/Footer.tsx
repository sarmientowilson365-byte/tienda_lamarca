import React, { useState } from 'react';
import { Send, Instagram, Facebook, Twitter, Youtube, Check, ShieldCheck, CreditCard, Lock } from 'lucide-react';

interface FooterProps {
  onCopyPromo: (code: string) => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onCopyPromo, onSelectCategory }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      onCopyPromo('KICK15');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0B0B0B] text-white border-t border-[#18181B] font-sans pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Newsletter Grid */}
        <div className="bg-gradient-to-r from-red-950 via-[#18181B] to-red-950 border border-red-900/30 rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs font-black uppercase text-red-500 tracking-widest">
              Comunidad KICKVAULT
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase italic text-white">
              Únete a la elite y recibe un 15% OFF
            </h3>
            <p className="text-xs text-gray-300 max-w-md">
              Suscríbete a nuestro boletín para acceder antes que nadie a lanzamientos limitados, drops secretos y ofertas exclusivas.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            {subscribed ? (
              <div className="bg-emerald-600 text-white px-6 py-3 rounded-2xl text-xs font-extrabold uppercase flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>¡Suscrito! Usa el cupón: KICK15</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="Tu correo electrónico..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#0B0B0B] border border-[#27272A] rounded-2xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500 min-w-[260px]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all shrink-0"
                >
                  <span>Suscribirse</span>
                  <Send className="w-4 h-4" />
                </button>
              </>
            )}
          </form>
        </div>

        {/* 4 Columns Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pt-6 border-t border-[#18181B] text-xs">
          
          {/* Brand Info Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-600 p-2 flex items-center justify-center text-white font-black italic">
                KV
              </div>
              <span className="text-xl font-black tracking-tight text-white uppercase italic">
                KICK<span className="text-red-500">VAULT</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Tu destino premium para zapatillas urbanas y de alto rendimiento. Distribuidor autorizado de Nike, Jordan, Adidas, Puma y New Balance.
            </p>
            <div className="flex items-center gap-3 pt-2 text-gray-400">
              <a href="#" className="w-8 h-8 rounded-full bg-[#18181B] hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#18181B] hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#18181B] hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#18181B] hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="font-extrabold uppercase text-white tracking-wider text-sm">Categorías</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => onSelectCategory('Basketball')} className="hover:text-red-400 transition-colors">
                  Zapatillas de Basketball
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Running')} className="hover:text-red-400 transition-colors">
                  Calzado de Running
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Lifestyle')} className="hover:text-red-400 transition-colors">
                  Lifestyle & Streetwear
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Skate')} className="hover:text-red-400 transition-colors">
                  Skateboarding
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Retro')} className="hover:text-red-400 transition-colors">
                  Colección Retro Vintage
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="font-extrabold uppercase text-white tracking-wider text-sm">Atención al Cliente</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-red-400">Seguimiento de Pedido</a></li>
              <li><a href="#" className="hover:text-red-400">Políticas de Envío y Devolución</a></li>
              <li><a href="#" className="hover:text-red-400">Guía de Tallas Oficial</a></li>
              <li><a href="#" className="hover:text-red-400">Garantía de Autenticidad</a></li>
              <li><a href="#" className="hover:text-red-400">Preguntas Frecuentes (FAQ)</a></li>
            </ul>
          </div>

          {/* Payment Methods & Trust */}
          <div className="space-y-3">
            <h4 className="font-extrabold uppercase text-white tracking-wider text-sm">Garantía & Pagos</h4>
            <p className="text-gray-400">Transacciones protegidas con certificación SSL de alta seguridad.</p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="bg-[#18181B] border border-[#27272A] px-2.5 py-1 rounded text-[10px] font-bold text-gray-300">VISA</span>
              <span className="bg-[#18181B] border border-[#27272A] px-2.5 py-1 rounded text-[10px] font-bold text-gray-300">Mastercard</span>
              <span className="bg-[#18181B] border border-[#27272A] px-2.5 py-1 rounded text-[10px] font-bold text-gray-300">PayPal</span>
              <span className="bg-[#18181B] border border-[#27272A] px-2.5 py-1 rounded text-[10px] font-bold text-gray-300">Apple Pay</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#18181B] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 KICKVAULT Footwear. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Términos de Servicio</a>
            <a href="#" className="hover:text-white">Política de Privacidad</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

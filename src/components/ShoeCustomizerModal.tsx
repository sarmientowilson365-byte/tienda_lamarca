import React, { useState } from 'react';
import { X, Sparkles, Check, ShoppingBag, RotateCcw } from 'lucide-react';
import { CustomShoeConfig, Sneaker } from '../types';

interface CustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomToCart: (customItem: {
    sneaker: Sneaker;
    selectedSize: number;
    colorName: string;
    customConfig: CustomShoeConfig;
  }) => void;
}

export const ShoeCustomizerModal: React.FC<CustomizerProps> = ({ isOpen, onClose, onAddCustomToCart }) => {
  if (!isOpen) return null;

  const [config, setConfig] = useState<CustomShoeConfig>({
    baseColor: '#DC2626', // Red
    soleColor: '#FFFFFF', // White
    lacesColor: '#000000', // Black
    accentColor: '#111827', // Dark Gray
    logoColor: '#F59E0B', // Gold
    customText: 'KICK-2026',
    selectedSize: 42,
  });

  const [added, setAdded] = useState(false);

  const palette = [
    { name: 'Red Crimson', hex: '#DC2626' },
    { name: 'Stealth Black', hex: '#111827' },
    { name: 'Pure White', hex: '#FFFFFF' },
    { name: 'Royal Blue', hex: '#2563EB' },
    { name: 'Electric Green', hex: '#22C55E' },
    { name: 'Metallic Gold', hex: '#F59E0B' },
    { name: 'Hot Pink', hex: '#EC4899' },
    { name: 'Cool Gray', hex: '#6B7280' },
  ];

  const handleAddToCart = () => {
    const customSneaker: Sneaker = {
      id: `custom-${Date.now()}`,
      name: `Custom Jordan KICKVAULT (${config.customText || 'Custom'})`,
      brand: 'Jordan',
      category: 'Lifestyle',
      gender: 'Unisex',
      price: 229.99,
      originalPrice: 260.00,
      rating: 5.0,
      reviewsCount: 1,
      isNew: true,
      colors: [{ name: 'Custom Palette', hex: config.baseColor }],
      sizes: [config.selectedSize],
      images: [
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80',
      ],
      description: `Zapatilla customizada en Studio 360°. Base: ${config.baseColor}, Suela: ${config.soleColor}, Texto personalizado: "${config.customText}".`,
      features: [
        'Edición personalizada única en Studio 360°',
        `Texto grabado: "${config.customText}"`,
        'Piel vacuna tratada a mano con acabado protector UV',
        'Caja especial de colección KICKVAULT'
      ],
      sku: `CUSTOM-${Date.now().toString().slice(-6)}`,
      stockStatus: 'In Stock',
    };

    onAddCustomToCart({
      sneaker: customSneaker,
      selectedSize: config.selectedSize,
      colorName: 'Studio Custom',
      customConfig: config,
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-[#121212] text-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative my-6 border border-[#27272A] flex flex-col lg:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#18181B] hover:bg-red-600 text-gray-300 hover:text-white flex items-center justify-center transition-all border border-[#27272A]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column SVG Interactive Preview Canvas */}
        <div className="lg:w-1/2 bg-[#0B0B0B] p-8 flex flex-col justify-between items-center relative border-b lg:border-b-0 lg:border-r border-[#27272A]">
          <div className="flex items-center gap-2 text-red-500 font-extrabold text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Studio 360° Configurator</span>
          </div>

          {/* Dynamic SVG Sneaker Model */}
          <div className="my-8 w-full max-w-xs relative flex items-center justify-center">
            <svg
              viewBox="0 0 500 300"
              className="w-full h-auto drop-shadow-[0_15px_25px_rgba(220,38,38,0.3)] transition-all duration-300"
            >
              {/* Sole */}
              <path
                d="M40 230 C 80 240, 380 240, 460 230 C 470 230, 475 250, 460 260 C 380 270, 80 270, 40 260 C 25 250, 25 230, 40 230 Z"
                fill={config.soleColor}
                stroke="#27272A"
                strokeWidth="3"
              />
              {/* Midsole Layer */}
              <path
                d="M50 215 C 100 225, 360 225, 450 215 L 455 230 C 370 240, 90 240, 45 230 Z"
                fill={config.accentColor}
              />
              {/* Upper Body Base */}
              <path
                d="M60 215 C 80 160, 140 120, 200 110 C 240 100, 280 120, 310 140 C 350 160, 410 180, 440 215 Z"
                fill={config.baseColor}
                stroke="#000"
                strokeWidth="2"
              />
              {/* Heel Collar */}
              <path
                d="M120 150 C 130 90, 180 80, 210 100 L 200 110 C 170 100, 140 120, 120 150 Z"
                fill={config.accentColor}
              />
              {/* Swoosh / Logo Accent */}
              <path
                d="M140 180 Q 230 190 340 130 Q 230 200 160 195 Z"
                fill={config.logoColor}
              />
              {/* Laces Area */}
              <path
                d="M230 110 L 290 145"
                stroke={config.lacesColor}
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M245 120 L 295 155"
                stroke={config.lacesColor}
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M260 130 L 300 165"
                stroke={config.lacesColor}
                strokeWidth="8"
                strokeLinecap="round"
              />

              {/* Custom Engraved Text */}
              {config.customText && (
                <text
                  x="120"
                  y="210"
                  fill="#FFFFFF"
                  fontSize="12"
                  fontWeight="900"
                  fontFamily="sans-serif"
                  letterSpacing="1"
                  opacity="0.9"
                >
                  {config.customText.toUpperCase()}
                </text>
              )}
            </svg>
          </div>

          <div className="text-center space-y-1">
            <p className="text-xs font-black text-white uppercase">Edición Exclusiva Personalizada</p>
            <p className="text-[10px] text-gray-400">Diseñado por ti • Grabado Láser Personalizado</p>
          </div>
        </div>

        {/* Right Column Controls */}
        <div className="lg:w-1/2 p-6 sm:p-8 space-y-5 overflow-y-auto max-h-[80vh]">
          <h3 className="text-xl font-black uppercase text-white tracking-tight italic">
            Configura tu Zapatilla
          </h3>

          {/* Color Base Selection */}
          <div>
            <label className="text-xs font-bold text-gray-300 uppercase block mb-2">
              Color Principal (Cuerpo)
            </label>
            <div className="flex flex-wrap gap-2">
              {palette.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setConfig({ ...config, baseColor: item.hex })}
                  className={`w-7 h-7 rounded-full border transition-all ${
                    config.baseColor === item.hex ? 'ring-2 ring-red-500 scale-110' : 'border-gray-700'
                  }`}
                  style={{ backgroundColor: item.hex }}
                  title={item.name}
                />
              ))}
            </div>
          </div>

          {/* Sole Color Selection */}
          <div>
            <label className="text-xs font-bold text-gray-300 uppercase block mb-2">
              Color de Suela
            </label>
            <div className="flex flex-wrap gap-2">
              {palette.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setConfig({ ...config, soleColor: item.hex })}
                  className={`w-7 h-7 rounded-full border transition-all ${
                    config.soleColor === item.hex ? 'ring-2 ring-red-500 scale-110' : 'border-gray-700'
                  }`}
                  style={{ backgroundColor: item.hex }}
                  title={item.name}
                />
              ))}
            </div>
          </div>

          {/* Logo / Swoosh Color */}
          <div>
            <label className="text-xs font-bold text-gray-300 uppercase block mb-2">
              Color del Logo / Swoosh
            </label>
            <div className="flex flex-wrap gap-2">
              {palette.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setConfig({ ...config, logoColor: item.hex })}
                  className={`w-7 h-7 rounded-full border transition-all ${
                    config.logoColor === item.hex ? 'ring-2 ring-red-500 scale-110' : 'border-gray-700'
                  }`}
                  style={{ backgroundColor: item.hex }}
                  title={item.name}
                />
              ))}
            </div>
          </div>

          {/* Custom Laser Text Input */}
          <div>
            <label className="text-xs font-bold text-gray-300 uppercase block mb-1">
              Grabado Láser Personalizado (Máx 10 caracteres)
            </label>
            <input
              type="text"
              maxLength={10}
              value={config.customText}
              onChange={(e) => setConfig({ ...config, customText: e.target.value })}
              placeholder="Ej. KICK-2026"
              className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-red-500 uppercase"
            />
          </div>

          {/* Size Selector */}
          <div>
            <label className="text-xs font-bold text-gray-300 uppercase block mb-2">
              Talla EU:
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {[39, 40, 41, 42, 43, 44, 45].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setConfig({ ...config, selectedSize: sz })}
                  className={`py-1.5 text-xs font-bold rounded-lg border ${
                    config.selectedSize === sz
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-[#18181B] text-gray-300 border-[#27272A]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Price & Add To Cart Button */}
          <div className="pt-4 border-t border-[#27272A] flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-gray-400 block uppercase font-bold">Precio Custom</span>
              <span className="text-xl font-black text-red-500">$229.99</span>
            </div>

            <button
              onClick={handleAddToCart}
              className={`px-6 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg active:scale-95 ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>¡Añadido!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Pedir Mi Diseño</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

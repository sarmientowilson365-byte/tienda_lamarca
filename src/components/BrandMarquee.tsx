import React from 'react';
import { BRANDS } from '../data/sneakers';

interface BrandMarqueeProps {
  selectedBrand: string;
  onSelectBrand: (brandName: string) => void;
}

export const BrandMarquee: React.FC<BrandMarqueeProps> = ({ selectedBrand, onSelectBrand }) => {
  return (
    <section className="bg-[#121212] py-8 border-b border-[#27272A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-5">
          <p className="text-xs font-bold uppercase tracking-widest text-red-500">
            Marcas Oficiales Garantizadas
          </p>
          <p className="text-sm text-gray-400 mt-0.5">
            Haz clic en cualquier marca para filtrar la colección
          </p>
        </div>

        {/* Brands Grid / Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => onSelectBrand('All')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold tracking-wider uppercase transition-all ${
              selectedBrand === 'All'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                : 'bg-[#18181B] text-gray-300 hover:text-white hover:bg-white/10 border border-[#27272A]'
            }`}
          >
            Todas las Marcas
          </button>

          {BRANDS.map((brand) => {
            const isSelected = selectedBrand === brand.name;
            return (
              <button
                key={brand.name}
                onClick={() => onSelectBrand(brand.name)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 group ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 border border-red-500'
                    : 'bg-[#18181B] text-gray-300 hover:text-white hover:bg-white/10 border border-[#27272A]'
                }`}
              >
                <span>{brand.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

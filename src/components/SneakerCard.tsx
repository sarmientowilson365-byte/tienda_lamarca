import React, { useState } from 'react';
import { Heart, Star, Eye, ShoppingBag, Check, Zap } from 'lucide-react';
import { Sneaker } from '../types';

interface SneakerCardProps {
  sneaker: Sneaker;
  isFavorite: boolean;
  onToggleFavorite: (sneaker: Sneaker) => void;
  onQuickView: (sneaker: Sneaker) => void;
  onAddToCart: (sneaker: Sneaker, size: number, colorName: string) => void;
}

export const SneakerCard: React.FC<SneakerCardProps> = ({
  sneaker,
  isFavorite,
  onToggleFavorite,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<number>(sneaker.sizes[2] || sneaker.sizes[0]);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(sneaker, selectedSize, sneaker.colors[selectedColorIndex].name);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discountPercent = sneaker.originalPrice
    ? Math.round(((sneaker.originalPrice - sneaker.price) / sneaker.originalPrice) * 100)
    : 0;

  const currentImg = hoveredImage || sneaker.images[0];

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative font-sans">
      
      {/* Card Top Header Badges & Actions */}
      <div className="relative aspect-square bg-[#F8F9FA] p-4 flex items-center justify-center overflow-hidden">
        
        {/* Badges Stack Top Left */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {sneaker.isOffer && discountPercent > 0 && (
            <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Zap className="w-3 h-3 fill-current" />
              -{discountPercent}% OFF
            </span>
          )}
          {sneaker.isNew && (
            <span className="bg-black text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider">
              NUEVO
            </span>
          )}
          {sneaker.isHot && (
            <span className="bg-amber-500 text-black text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider">
              HOT 🔥
            </span>
          )}
        </div>

        {/* Favorite Heart Button Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(sneaker);
          }}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isFavorite
              ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
              : 'bg-white/90 hover:bg-white text-gray-600 hover:text-red-600 shadow-sm'
          }`}
          title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Shoe Main Image */}
        <img
          src={currentImg}
          alt={sneaker.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 cursor-pointer"
          onClick={() => onQuickView(sneaker)}
          onMouseEnter={() => sneaker.images[1] && setHoveredImage(sneaker.images[1])}
          onMouseLeave={() => setHoveredImage(null)}
          referrerPolicy="no-referrer"
        />

        {/* Quick View Hover Trigger Button */}
        <button
          onClick={() => onQuickView(sneaker)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/80 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1.5 shadow-lg"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Vista Rápida</span>
        </button>
      </div>

      {/* Card Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Stock Status */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-black tracking-widest text-red-600 uppercase">
              {sneaker.brand}
            </span>
            <span className="text-[10px] font-semibold text-gray-600">
              {sneaker.category}
            </span>
          </div>

          {/* Model Name */}
          <h4
            onClick={() => onQuickView(sneaker)}
            className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 cursor-pointer leading-snug min-h-[2.5rem]"
          >
            {sneaker.name}
          </h4>

          {/* Rating Stars */}
          <div className="flex items-center gap-1 mt-2 mb-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(sneaker.rating) ? 'fill-amber-400' : 'text-gray-200 fill-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-gray-900 ml-1">{sneaker.rating}</span>
            <span className="text-[10px] text-gray-600">({sneaker.reviewsCount})</span>
          </div>

          {/* Colorway Dots */}
          <div className="flex items-center gap-1.5 mb-3">
            <span className="text-[10px] text-gray-600 font-bold uppercase mr-1">Colores:</span>
            {sneaker.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={() => setSelectedColorIndex(idx)}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColorIndex === idx ? 'ring-2 ring-red-600 scale-125' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>

          {/* Size Selector Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 mb-4 no-scrollbar">
            <span className="text-[10px] text-gray-600 font-bold uppercase mr-1 shrink-0">Talla EU:</span>
            {sneaker.sizes.slice(0, 5).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`text-[11px] font-bold px-2 py-0.5 rounded-md border shrink-0 transition-colors ${
                  selectedSize === size
                    ? 'bg-black text-white border-black'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
            {sneaker.sizes.length > 5 && (
              <span className="text-[10px] text-gray-600 font-semibold shrink-0">
                +{sneaker.sizes.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Add To Cart Button Footer */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          {/* Prices */}
          <div>
            {sneaker.originalPrice && (
              <span className="text-xs text-gray-600 line-through block leading-tight">
                ${sneaker.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-base font-black text-red-600 tracking-tight">
              ${sneaker.price.toFixed(2)}
            </span>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm active:scale-95 ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20'
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
                <span>Agregar</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

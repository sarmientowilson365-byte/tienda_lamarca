import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, Check, HelpCircle, Sparkles } from 'lucide-react';
import { Sneaker } from '../types';

interface QuickViewModalProps {
  sneaker: Sneaker | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (sneaker: Sneaker) => void;
  onAddToCart: (sneaker: Sneaker, size: number, colorName: string, quantity: number) => void;
  onOpenSizeGuide: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  sneaker,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  if (!isOpen || !sneaker) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number>(sneaker.sizes[2] || sneaker.sizes[0]);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(sneaker, selectedSize, sneaker.colors[selectedColorIndex].name, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discountPercent = sneaker.originalPrice
    ? Math.round(((sneaker.originalPrice - sneaker.price) / sneaker.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white text-gray-900 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative my-8 border border-gray-100 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/10 hover:bg-black text-gray-700 hover:text-white flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column Images Gallery */}
        <div className="md:w-1/2 bg-[#F8F9FA] p-6 flex flex-col justify-between items-center relative">
          
          {/* Favorite heart top left */}
          <button
            onClick={() => onToggleFavorite(sneaker)}
            className={`absolute top-4 left-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isFavorite
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:text-red-600 shadow-sm'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Main High-Res Image */}
          <div className="w-full h-64 sm:h-80 flex items-center justify-center p-2">
            <img
              src={sneaker.images[selectedImageIndex] || sneaker.images[0]}
              alt={sneaker.name}
              className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-xl"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex items-center gap-3 mt-4">
            {sneaker.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`w-14 h-14 rounded-xl border-2 overflow-hidden bg-white p-1 transition-all ${
                  selectedImageIndex === idx ? 'border-red-600 ring-2 ring-red-600/20' : 'border-gray-200 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Ángulo ${idx + 1}`}
                  className="w-full h-full object-contain mix-blend-multiply"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column Product Details */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 max-h-[80vh] md:max-h-[90vh]">
          
          {/* Brand & Category */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-widest text-red-600 uppercase">
                {sneaker.brand}
              </span>
              <span className="text-xs font-bold bg-gray-100 px-2.5 py-1 rounded-md text-gray-600">
                {sneaker.category} • {sneaker.gender}
              </span>
            </div>

            <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-snug mt-1">
              {sneaker.name}
            </h2>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(sneaker.rating) ? 'fill-amber-400' : 'text-gray-200 fill-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-900">{sneaker.rating}</span>
              <span className="text-xs text-gray-500">({sneaker.reviewsCount} opiniones)</span>
              <span className="text-xs text-emerald-600 font-bold ml-2">✓ SKU: {sneaker.sku}</span>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 block">Precio exclusivo online</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-red-600">${sneaker.price.toFixed(2)}</span>
                {sneaker.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">${sneaker.originalPrice.toFixed(2)}</span>
                )}
              </div>
            </div>
            {discountPercent > 0 && (
              <span className="bg-red-600 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl uppercase">
                Ahorras ${((sneaker.originalPrice || 0) - sneaker.price).toFixed(2)} ({discountPercent}%)
              </span>
            )}
          </div>

          {/* Color Option Selector */}
          <div>
            <label className="text-xs font-extrabold text-gray-900 uppercase block mb-2">
              Color Seleccionado:{' '}
              <span className="text-red-600 font-bold">{sneaker.colors[selectedColorIndex].name}</span>
            </label>
            <div className="flex items-center gap-3">
              {sneaker.colors.map((color, idx) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColorIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                    selectedColorIndex === idx
                      ? 'border-red-600 bg-red-50 text-red-900 ring-2 ring-red-600/30'
                      : 'border-gray-200 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full border" style={{ backgroundColor: color.hex }} />
                  <span>{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-extrabold text-gray-900 uppercase">
                Selecciona Talla (EU):
              </label>
              <button
                onClick={onOpenSizeGuide}
                className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Guía de Tallas</span>
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {sneaker.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    selectedSize === size
                      ? 'bg-black text-white border-black shadow-md'
                      : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {size} EU
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-gray-700 uppercase">Cantidad:</span>
              <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm font-bold hover:bg-gray-200 rounded-l-xl"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-black">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-sm font-bold hover:bg-gray-200 rounded-r-xl"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full py-3.5 rounded-2xl text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/30'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>¡Añadido al Carrito!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Añadir al Carrito (${(sneaker.price * quantity).toFixed(2)})</span>
                </>
              )}
            </button>
          </div>

          {/* Description & Features */}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <h4 className="text-xs font-extrabold text-gray-900 uppercase">Descripción & Características</h4>
            <p className="text-xs text-gray-600 leading-relaxed">{sneaker.description}</p>
            <ul className="grid grid-cols-1 gap-1.5 text-xs text-gray-700">
              {sneaker.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

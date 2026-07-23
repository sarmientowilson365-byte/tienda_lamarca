import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Sneaker } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  sneakers: Sneaker[];
  onRemoveFavorite: (sneaker: Sneaker) => void;
  onAddToCart: (sneaker: Sneaker, size: number, colorName: string) => void;
  onQuickView: (sneaker: Sneaker) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  sneakers,
  onRemoveFavorite,
  onAddToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  const favoriteSneakers = sneakers.filter((s) => favorites.includes(s.id));

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end transition-opacity font-sans">
      <div className="bg-[#121212] text-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl border-l border-[#27272A] animate-slide-left">
        
        {/* Header */}
        <div className="p-5 border-b border-[#27272A] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <h3 className="text-base font-black uppercase tracking-wider text-white">
              Mis Favoritos ({favoriteSneakers.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {favoriteSneakers.length > 0 ? (
            favoriteSneakers.map((sneaker) => (
              <div
                key={sneaker.id}
                className="bg-[#18181B] border border-[#27272A] p-3.5 rounded-2xl flex gap-3 items-center group"
              >
                <img
                  src={sneaker.images[0]}
                  alt={sneaker.name}
                  className="w-16 h-16 object-contain bg-black/40 rounded-xl p-1 shrink-0 cursor-pointer"
                  onClick={() => {
                    onClose();
                    onQuickView(sneaker);
                  }}
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-black uppercase text-red-500">
                    {sneaker.brand}
                  </span>
                  <h4
                    onClick={() => {
                      onClose();
                      onQuickView(sneaker);
                    }}
                    className="text-xs font-bold text-white truncate cursor-pointer hover:text-red-400"
                  >
                    {sneaker.name}
                  </h4>
                  <p className="text-xs font-black text-red-400 mt-1">${sneaker.price.toFixed(2)}</p>

                  <button
                    onClick={() => onAddToCart(sneaker, sneaker.sizes[0], sneaker.colors[0].name)}
                    className="mt-2 text-[11px] font-bold text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg flex items-center gap-1"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Mover al Carrito</span>
                  </button>
                </div>

                <button
                  onClick={() => onRemoveFavorite(sneaker)}
                  className="text-gray-500 hover:text-red-500 p-1"
                  title="Quitar de favoritos"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-16 space-y-3">
              <Heart className="w-12 h-12 text-gray-600 mx-auto" />
              <p className="text-sm font-bold text-white">No tienes favoritos guardados</p>
              <p className="text-xs text-gray-400">Haz clic en el corazón de cualquier zapatilla para guardarla aquí.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

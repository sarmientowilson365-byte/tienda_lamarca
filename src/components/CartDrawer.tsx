import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Truck, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onProceedToCheckout: () => void;
  promoCode: string;
  promoDiscount: number;
  onApplyPromoCode: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  promoCode,
  promoDiscount,
  onApplyPromoCode,
}) => {
  if (!isOpen) return null;

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.sneaker.price * item.quantity, 0);
  const discountAmount = subtotal * promoDiscount;
  const freeShippingThreshold = 100;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 9.99;
  const total = subtotal - discountAmount + shippingCost;

  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    const success = onApplyPromoCode(inputCode.trim().toUpperCase());
    if (success) {
      setPromoMessage({ text: '¡Cupón de 15% OFF aplicado con éxito!', isError: false });
    } else {
      setPromoMessage({ text: 'Código no válido. Usa "KICK15"', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end transition-opacity font-sans">
      <div className="bg-[#121212] text-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl border-l border-[#27272A] animate-slide-left">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#27272A] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-red-500" />
            <h3 className="text-base font-black uppercase tracking-wider text-white">
              Tu Carrito ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-[#18181B] px-5 py-3 border-b border-[#27272A]">
          <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
            {subtotal >= freeShippingThreshold ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" /> ¡Felicidades! Tienes ENVÍO GRATIS
              </span>
            ) : (
              <span className="text-gray-300">
                Añade <span className="text-red-400 font-extrabold">${(freeShippingThreshold - subtotal).toFixed(2)}</span> para Envío Gratis
              </span>
            )}
            <span className="text-[10px] text-gray-400 font-black">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.cartId}
                className="bg-[#18181B] border border-[#27272A] p-3.5 rounded-2xl flex gap-3 items-center group relative"
              >
                {/* Image */}
                <img
                  src={item.sneaker.images[0]}
                  alt={item.sneaker.name}
                  className="w-16 h-16 object-contain bg-black/40 rounded-xl p-1 shrink-0 border border-white/5"
                  referrerPolicy="no-referrer"
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-black uppercase text-red-500">
                    {item.sneaker.brand}
                  </span>
                  <h4 className="text-xs font-bold text-white truncate">{item.sneaker.name}</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Talla: <span className="text-white font-bold">{item.selectedSize} EU</span> • Color:{' '}
                    <span className="text-white font-bold">{item.selectedColor.name}</span>
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#27272A] rounded-lg bg-black/40">
                      <button
                        onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-gray-400 hover:text-white"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-gray-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-black text-red-400">
                      ${(item.sneaker.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => onRemoveItem(item.cartId)}
                  className="text-gray-500 hover:text-red-500 p-1 rounded-lg hover:bg-white/5 transition-colors shrink-0"
                  title="Eliminar producto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto" />
              <p className="text-sm font-bold text-white">Tu carrito está vacío</p>
              <p className="text-xs text-gray-400">¡Explora nuestro catálogo y añade tus zapatillas favoritas!</p>
            </div>
          )}
        </div>

        {/* Drawer Footer Calculations & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#27272A] bg-[#0B0B0B] space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Código de cupón (Ej. KICK15)"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="flex-1 bg-[#18181B] border border-[#27272A] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500 uppercase font-bold"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#27272A] hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Aplicar
              </button>
            </form>

            {promoMessage && (
              <p className={`text-[11px] font-bold ${promoMessage.isError ? 'text-red-400' : 'text-emerald-400'}`}>
                {promoMessage.text}
              </p>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Descuento (15% OFF)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Envío</span>
                <span className="font-bold text-white">
                  {shippingCost === 0 ? 'GRATIS' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-[#27272A]">
                <span>Total a Pagar</span>
                <span className="text-red-500">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-red-600/30 active:scale-95 transition-all"
            >
              <span>Proceder al Pago</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

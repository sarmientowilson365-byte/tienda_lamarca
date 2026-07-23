import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, Lock, ShieldCheck, ArrowRight, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  promoDiscount: number;
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  promoDiscount,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [formData, setFormData] = useState({
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@example.com',
    phone: '+34 612 345 678',
    address: 'Calle Gran Vía 42, 3º B',
    city: 'Madrid',
    postalCode: '28013',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '123',
  });

  const [orderNumber, setOrderNumber] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.sneaker.price * item.quantity, 0);
  const discountAmount = subtotal * promoDiscount;
  const shippingCost = subtotal >= 100 || subtotal === 0 ? 0 : 9.99;
  const total = subtotal - discountAmount + shippingCost;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'shipping') {
      setStep('payment');
    } else if (step === 'payment') {
      const generatedOrder = `KV-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      setStep('success');

      // Trigger Celebration Confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#DC2626', '#EF4444', '#FFFFFF', '#111827'],
      });

      onOrderComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in font-sans">
      <div className="bg-[#121212] text-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative my-6 border border-[#27272A]">
        
        {/* Header */}
        <div className="p-6 border-b border-[#27272A] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-red-500 tracking-wider">
              Proceso de Compra Seguro
            </span>
            <h3 className="text-xl font-black uppercase text-white tracking-tight italic">
              {step === 'shipping' && '1. Datos de Envío'}
              {step === 'payment' && '2. Método de Pago'}
              {step === 'success' && '¡Pedido Confirmado!'}
            </h3>
          </div>
          {step !== 'success' && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {step === 'shipping' && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-300 uppercase block mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-300 uppercase block mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-300 uppercase block mb-1">
                    Teléfono de Contacto
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-300 uppercase block mb-1">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 uppercase block mb-1">
                  Dirección Completa de Entrega
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block">Total del pedido:</span>
                  <span className="text-lg font-black text-red-500">${total.toFixed(2)}</span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Ir al Pago</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 uppercase block">
                  Selecciona Método de Pago
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['card', 'paypal', 'apple'].map((method) => (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setFormData({ ...formData, paymentMethod: method })}
                      className={`py-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                        formData.paymentMethod === method
                          ? 'border-red-500 bg-red-600/20 text-white'
                          : 'border-[#27272A] bg-[#18181B] text-gray-400'
                      }`}
                    >
                      {method === 'card' && 'Tarjeta'}
                      {method === 'paypal' && 'PayPal'}
                      {method === 'apple' && 'Apple Pay'}
                    </button>
                  ))}
                </div>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">
                      Número de Tarjeta
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                      <CreditCard className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">
                        Expiración
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cardExpiry}
                        onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                        className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">
                        CVC / CVV
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                        className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-gray-400 pt-2">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Encriptación SSL de 256 bits • Pago 100% protegido</span>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#27272A]">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs font-bold text-gray-400 hover:text-white"
                >
                  ← Volver a Dirección
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30"
                >
                  Pagar ${total.toFixed(2)}
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-500/40 animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-red-500" />
              </div>

              <div>
                <h4 className="text-2xl font-black uppercase italic text-white">¡Gracias por tu Compra!</h4>
                <p className="text-xs text-gray-400 mt-1">
                  Tu pedido ha sido procesado y te hemos enviado la confirmación a{' '}
                  <span className="text-white font-bold">{formData.email}</span>.
                </p>
              </div>

              <div className="bg-[#18181B] border border-[#27272A] p-4 rounded-2xl text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Número de Orden:</span>
                  <span className="font-extrabold text-red-400">{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Dirección de Entrega:</span>
                  <span className="font-bold text-white">{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tiempo estimado:</span>
                  <span className="font-bold text-emerald-400">24-48 horas laborables</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider"
              >
                Volver a la Tienda
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

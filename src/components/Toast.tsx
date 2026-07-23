import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
  image?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 bg-[#18181B] border border-[#27272A] text-white p-4 rounded-xl shadow-2xl backdrop-blur-md animate-slide-up transition-all"
        >
          {toast.image ? (
            <img
              src={toast.image}
              alt={toast.title}
              className="w-12 h-12 object-cover rounded-lg bg-black/40 border border-white/10"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="p-2 rounded-lg bg-red-600/20 text-red-500 shrink-0">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-red-500" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white leading-snug truncate">{toast.title}</p>
            {toast.message && (
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{toast.message}</p>
            )}
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="p-1 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

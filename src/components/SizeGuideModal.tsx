import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sizeChart = [
    { eu: 38, us: 5.5, uk: 5, cm: '24.0 cm' },
    { eu: 39, us: 6.5, uk: 6, cm: '24.5 cm' },
    { eu: 40, us: 7.5, uk: 6.5, cm: '25.0 cm' },
    { eu: 41, us: 8.0, uk: 7, cm: '26.0 cm' },
    { eu: 42, us: 8.5, uk: 7.5, cm: '26.5 cm' },
    { eu: 43, us: 9.5, uk: 8.5, cm: '27.5 cm' },
    { eu: 44, us: 10.0, uk: 9, cm: '28.0 cm' },
    { eu: 45, us: 11.0, uk: 10, cm: '29.0 cm' },
    { eu: 46, us: 12.0, uk: 11, cm: '30.0 cm' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in font-sans">
      <div className="bg-[#121212] text-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative border border-[#27272A] p-6 space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-red-500" />
            <h3 className="text-base font-black uppercase text-white tracking-wide">
              Guía de Tallas Oficial (Unisex)
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Mide desde el talón hasta la punta del dedo más largo con un calcetín puesto para obtener tu medida exacta en centímetros.
        </p>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-[#27272A]">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#18181B] text-gray-400 uppercase font-bold text-[10px] border-b border-[#27272A]">
              <tr>
                <th className="px-4 py-2.5 text-red-400 font-extrabold">EU</th>
                <th className="px-4 py-2.5">US</th>
                <th className="px-4 py-2.5">UK</th>
                <th className="px-4 py-2.5">CM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A]">
              {sizeChart.map((row) => (
                <tr key={row.eu} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-2 font-black text-white">{row.eu}</td>
                  <td className="px-4 py-2 text-gray-300">{row.us}</td>
                  <td className="px-4 py-2 text-gray-300">{row.uk}</td>
                  <td className="px-4 py-2 font-bold text-red-400">{row.cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase"
        >
          Entendido
        </button>

      </div>
    </div>
  );
};

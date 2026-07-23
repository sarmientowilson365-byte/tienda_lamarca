import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles, Flame, Tag, ArrowRight } from 'lucide-react';
import { Sneaker } from '../types';

interface NavbarProps {
  sneakers: Sneaker[];
  cartCount: number;
  favoritesCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenCustomizer: () => void;
  onSelectSneaker: (sneaker: Sneaker) => void;
  onCategorySelect: (category: string) => void;
  activeCategory: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  sneakers,
  cartCount,
  favoritesCount,
  onOpenCart,
  onOpenWishlist,
  onOpenCustomizer,
  onSelectSneaker,
  onCategorySelect,
  activeCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? sneakers
        .filter(
          (s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const navLinks = [
    { name: 'Inicio', category: 'All' },
    { name: 'Catálogo', category: 'All' },
    { name: 'Ofertas', category: 'Offers' },
    { name: 'Basketball', category: 'Basketball' },
    { name: 'Running', category: 'Running' },
    { name: 'Lifestyle', category: 'Lifestyle' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full font-sans">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-inner">
        <Flame className="w-3.5 h-3.5 animate-pulse text-yellow-300" />
        <span>
          ENVÍO GRATIS en pedidos superiores a $100 — Usa el código{' '}
          <span className="font-extrabold underline tracking-wide">KICK15</span> para 15% OFF extra
        </span>
        <Tag className="w-3.5 h-3.5 hidden sm:inline text-yellow-300 ml-1" />
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#0B0B0B]/95 backdrop-blur-md border-[#27272A] py-3 shadow-2xl'
            : 'bg-[#0B0B0B] border-[#18181B] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onCategorySelect('All');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group shrink-0"
          >
            {/* Custom SVG Sneaker Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 p-2 flex items-center justify-center text-white shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 transform -rotate-12"
              >
                <path d="M2.5 12C2.5 12 4 8 9.5 8C15 8 18 10 21.5 10C22.3 10 23 10.7 23 11.5V17.5C23 18.3 22.3 19 21.5 19H3.5C2.7 19 2 18.3 2 17.5V13.5C2 12.7 2.5 12 2.5 12Z" />
                <path d="M7 8L11 4.5C11.5 4 12.5 4 13 4.5L16 7.5" />
                <circle cx="7.5" cy="15.5" r="1.5" />
                <circle cx="16.5" cy="15.5" r="1.5" />
              </svg>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase italic flex items-center gap-1">
                KICK<span className="text-red-500">VAULT</span>
              </span>
              <span className="block text-[10px] font-semibold tracking-widest text-gray-400 uppercase -mt-1">
                Urban Footwear
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => onCategorySelect(link.category)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === link.category
                    ? 'text-white bg-red-600/20 border border-red-500/40 font-semibold'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </button>
            ))}

            {/* Customizer Studio Button */}
            <button
              onClick={onOpenCustomizer}
              className="ml-2 px-3 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 transition-all shadow-md shadow-red-600/20 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Studio 360°</span>
            </button>
          </div>

          {/* Search & Actions Right */}
          <div className="flex items-center gap-3">
            {/* Interactive Search Bar */}
            <div ref={searchRef} className="relative hidden sm:block w-48 md:w-56 lg:w-64">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar zapatillas, marca..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-full py-1.5 pl-9 pr-4 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Autocomplete Search Dropdown */}
              {searchFocused && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#18181B] border border-[#27272A] rounded-xl shadow-2xl py-2 z-50 overflow-hidden backdrop-blur-xl">
                  <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Resultados coincidentes ({searchResults.length})
                  </div>
                  {searchResults.map((sneaker) => (
                    <button
                      key={sneaker.id}
                      onClick={() => {
                        onSelectSneaker(sneaker);
                        setSearchFocused(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-white/5 flex items-center gap-3 transition-colors group"
                    >
                      <img
                        src={sneaker.images[0]}
                        alt={sneaker.name}
                        className="w-9 h-9 object-cover rounded-md bg-black/40 border border-white/10 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white truncate group-hover:text-red-400">
                          {sneaker.name}
                        </p>
                        <p className="text-[10px] text-gray-400">${sneaker.price.toFixed(2)}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-red-500 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Favorites Icon Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Lista de Deseos"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-600/30 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Carrito</span>
              {cartCount > 0 && (
                <span className="bg-white text-red-600 text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-4 text-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white rounded-xl hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 px-4 pt-2 pb-4 border-t border-[#27272A] bg-[#0B0B0B] space-y-3">
            {/* Mobile Search input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar zapatillas..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#18181B] border border-[#27272A] rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    onCategorySelect(link.category);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                    activeCategory === link.category
                      ? 'bg-red-600 text-white font-bold'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                onOpenCustomizer();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-800 text-white text-sm font-bold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Diseñar en Studio 360°</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

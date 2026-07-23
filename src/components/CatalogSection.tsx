import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, RotateCcw, Search, Tag, X, ChevronDown } from 'lucide-react';
import { Sneaker, FilterState, Brand, Category, Gender } from '../types';
import { SneakerCard } from './SneakerCard';

interface CatalogSectionProps {
  sneakers: Sneaker[];
  favorites: string[];
  onToggleFavorite: (sneaker: Sneaker) => void;
  onQuickView: (sneaker: Sneaker) => void;
  onAddToCart: (sneaker: Sneaker, size: number, colorName: string) => void;
  selectedCategoryFromNav: string;
  selectedBrandFromNav: string;
  searchQueryFromNav: string;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  sneakers,
  favorites,
  onToggleFavorite,
  onQuickView,
  onAddToCart,
  selectedCategoryFromNav,
  selectedBrandFromNav,
  searchQueryFromNav,
}) => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    brand: 'All',
    category: 'All',
    gender: 'All',
    priceRange: [0, 300],
    selectedSizes: [],
    onSaleOnly: false,
    sortBy: 'featured',
  });

  // Sync external props with filters when changed
  React.useEffect(() => {
    if (selectedCategoryFromNav === 'Offers') {
      setFilters((prev) => ({ ...prev, category: 'All', onSaleOnly: true }));
    } else if (selectedCategoryFromNav !== 'All') {
      setFilters((prev) => ({ ...prev, category: selectedCategoryFromNav as Category }));
    } else {
      setFilters((prev) => ({ ...prev, category: 'All' }));
    }
  }, [selectedCategoryFromNav]);

  React.useEffect(() => {
    setFilters((prev) => ({ ...prev, brand: selectedBrandFromNav as Brand | 'All' }));
  }, [selectedBrandFromNav]);

  React.useEffect(() => {
    setFilters((prev) => ({ ...prev, searchQuery: searchQueryFromNav }));
  }, [searchQueryFromNav]);

  const allSizes = [38, 39, 40, 41, 42, 43, 44, 45, 46];

  const toggleSize = (size: number) => {
    setFilters((prev) => ({
      ...prev,
      selectedSizes: prev.selectedSizes.includes(size)
        ? prev.selectedSizes.filter((s) => s !== size)
        : [...prev.selectedSizes, size],
    }));
  };

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      brand: 'All',
      category: 'All',
      gender: 'All',
      priceRange: [0, 300],
      selectedSizes: [],
      onSaleOnly: false,
      sortBy: 'featured',
    });
  };

  // Filter and Sort Logic
  const filteredSneakers = useMemo(() => {
    return sneakers
      .filter((sneaker) => {
        // Search query
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchName = sneaker.name.toLowerCase().includes(q);
          const matchBrand = sneaker.brand.toLowerCase().includes(q);
          const matchCategory = sneaker.category.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchCategory) return false;
        }

        // Brand
        if (filters.brand !== 'All' && sneaker.brand !== filters.brand) return false;

        // Category
        if (filters.category !== 'All' && sneaker.category !== filters.category) return false;

        // Gender
        if (filters.gender !== 'All' && sneaker.gender !== filters.gender && sneaker.gender !== 'Unisex') return false;

        // Price range
        if (sneaker.price < filters.priceRange[0] || sneaker.price > filters.priceRange[1]) return false;

        // On sale
        if (filters.onSaleOnly && !sneaker.isOffer) return false;

        // Sizes
        if (filters.selectedSizes.length > 0) {
          const hasSize = filters.selectedSizes.some((sz) => sneaker.sizes.includes(sz));
          if (!hasSize) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        if (filters.sortBy === 'rating') return b.rating - a.rating;
        if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0; // featured default
      });
  }, [sneakers, filters]);

  const activeFilterCount =
    (filters.brand !== 'All' ? 1 : 0) +
    (filters.category !== 'All' ? 1 : 0) +
    (filters.gender !== 'All' ? 1 : 0) +
    (filters.onSaleOnly ? 1 : 0) +
    filters.selectedSizes.length +
    (filters.searchQuery ? 1 : 0);

  return (
    <section id="catalog-section" className="bg-[#F8F9FA] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Catalog Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-gray-200 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-red-600">
              Catálogo de Zapatillas
            </span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase italic mt-1">
              {filters.category !== 'All'
                ? `Colección ${filters.category}`
                : filters.brand !== 'All'
                ? `Zapatillas ${filters.brand}`
                : 'Todas las Zapatillas'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Mostrando <span className="font-bold text-gray-900">{filteredSneakers.length}</span> de {sneakers.length} modelos disponibles
            </p>
          </div>

          {/* Controls Bar Right */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter Trigger Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2 bg-black text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm"
            >
              <Filter className="w-4 h-4 text-red-500" />
              <span>Filtros</span>
              {activeFilterCount > 0 && (
                <span className="bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium shadow-sm">
              <SlidersHorizontal className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500 hidden sm:inline">Ordenar:</span>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))
                }
                className="bg-transparent font-bold text-gray-900 focus:outline-none cursor-pointer"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Valorados</option>
                <option value="newest">Más Nuevos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-bold text-gray-500 mr-1">Filtros activos:</span>
            {filters.brand !== 'All' && (
              <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                Marca: {filters.brand}
                <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-400" onClick={() => setFilters((p) => ({ ...p, brand: 'All' }))} />
              </span>
            )}
            {filters.category !== 'All' && (
              <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                Categoría: {filters.category}
                <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-400" onClick={() => setFilters((p) => ({ ...p, category: 'All' }))} />
              </span>
            )}
            {filters.onSaleOnly && (
              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                Solo Ofertas 🔥
                <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setFilters((p) => ({ ...p, onSaleOnly: false }))} />
              </span>
            )}
            {filters.selectedSizes.length > 0 && (
              <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                Tallas: {filters.selectedSizes.join(', ')}
                <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-400" onClick={() => setFilters((p) => ({ ...p, selectedSizes: [] }))} />
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1 ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              Limpiar Todo
            </button>
          </div>
        )}

        {/* Main Catalog Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-red-600" />
                <h3 className="text-sm font-extrabold uppercase text-gray-900 tracking-wider">
                  Filtros
                </h3>
              </div>
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-gray-400 hover:text-red-600 transition-colors"
              >
                Resetear
              </button>
            </div>

            {/* Discounts Only Toggle */}
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-xl">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-red-600" />
                <span className="text-xs font-black text-red-900">Solo Ofertas</span>
              </div>
              <input
                type="checkbox"
                checked={filters.onSaleOnly}
                onChange={(e) => setFilters((prev) => ({ ...prev, onSaleOnly: e.target.checked }))}
                className="w-4 h-4 accent-red-600 cursor-pointer"
              />
            </div>

            {/* Brand Filter */}
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Marca</h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {['All', 'Nike', 'Jordan', 'Adidas', 'Puma', 'New Balance', 'Asics', 'Vans'].map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center justify-between text-xs text-gray-700 hover:text-red-600 cursor-pointer py-1"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="brand"
                        checked={filters.brand === brand}
                        onChange={() => setFilters((p) => ({ ...p, brand: brand as Brand | 'All' }))}
                        className="accent-red-600 cursor-pointer"
                      />
                      <span className={filters.brand === brand ? 'font-bold text-red-600' : ''}>
                        {brand === 'All' ? 'Todas las marcas' : brand}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Categoría</h4>
              <div className="space-y-1.5">
                {['All', 'Basketball', 'Running', 'Lifestyle', 'Skate', 'Retro'].map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center justify-between text-xs text-gray-700 hover:text-red-600 cursor-pointer py-1"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === cat}
                        onChange={() => setFilters((p) => ({ ...p, category: cat as Category | 'All' }))}
                        className="accent-red-600 cursor-pointer"
                      />
                      <span className={filters.category === cat ? 'font-bold text-red-600' : ''}>
                        {cat === 'All' ? 'Todas las categorías' : cat}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Size Filter Pills */}
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Talla (EU)</h4>
              <div className="grid grid-cols-4 gap-2">
                {allSizes.map((size) => {
                  const isSelected = filters.selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-red-600 text-white border-red-600 shadow-sm'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Precio Máximo</h4>
                <span className="text-xs font-extrabold text-red-600">${filters.priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="50"
                max="300"
                step="10"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: [prev.priceRange[0], parseInt(e.target.value)],
                  }))
                }
                className="w-full accent-red-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>$50</span>
                <span>$300+</span>
              </div>
            </div>

          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            {filteredSneakers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSneakers.map((sneaker) => (
                  <SneakerCard
                    key={sneaker.id}
                    sneaker={sneaker}
                    isFavorite={favorites.includes(sneaker.id)}
                    onToggleFavorite={onToggleFavorite}
                    onQuickView={onQuickView}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 uppercase">
                  No se encontraron zapatillas
                </h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  No encontramos modelos que coincidan con los filtros seleccionados. Prueba cambiando la marca, talla o reseteando los filtros.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-red-600 text-white text-xs font-bold uppercase rounded-xl hover:bg-red-700 transition-colors shadow-md shadow-red-600/20 inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Limpiar Filtros
                </button>
              </div>
            )}
          </main>

        </div>
      </div>

      {/* Mobile Filter Sheet Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-xs h-full p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h3 className="text-base font-black text-gray-900 uppercase">Filtros de Búsqueda</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Brands */}
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase mb-2">Marca</h4>
                <select
                  value={filters.brand}
                  onChange={(e) => setFilters((p) => ({ ...p, brand: e.target.value as Brand | 'All' }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-bold"
                >
                  {['All', 'Nike', 'Jordan', 'Adidas', 'Puma', 'New Balance', 'Asics', 'Vans'].map((b) => (
                    <option key={b} value={b}>
                      {b === 'All' ? 'Todas las marcas' : b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mobile Categories */}
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase mb-2">Categoría</h4>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters((p) => ({ ...p, category: e.target.value as Category | 'All' }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-bold"
                >
                  {['All', 'Basketball', 'Running', 'Lifestyle', 'Skate', 'Retro'].map((c) => (
                    <option key={c} value={c}>
                      {c === 'All' ? 'Todas las categorías' : c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mobile Sizes */}
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase mb-2">Talla (EU)</h4>
                <div className="grid grid-cols-4 gap-2">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`py-1.5 text-xs font-bold rounded-lg border ${
                        filters.selectedSizes.includes(size)
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-gray-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-red-600 text-white font-extrabold text-xs uppercase"
              >
                Aplicar Filtros ({filteredSneakers.length})
              </button>
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full py-2 text-xs font-bold text-gray-500 hover:text-black"
              >
                Limpiar Todo
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

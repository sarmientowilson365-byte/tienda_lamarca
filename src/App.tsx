import React, { useState, useEffect } from 'react';
import { INITIAL_SNEAKERS } from './data/sneakers';
import { Sneaker, CartItem, CustomShoeConfig } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandMarquee } from './components/BrandMarquee';
import { FlashSale } from './components/FlashSale';
import { CatalogSection } from './components/CatalogSection';
import { QuickViewModal } from './components/QuickViewModal';
import { ShoeCustomizerModal } from './components/ShoeCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  const [sneakers] = useState<Sneaker[]>(INITIAL_SNEAKERS);
  
  // Cart & Wishlist persistence or state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('kv_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('kv_favs');
    return saved ? JSON.parse(saved) : ['snk-001', 'snk-007'];
  });

  // Category & Filters
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeBrand, setActiveBrand] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [quickViewSneaker, setQuickViewSneaker] = useState<Sneaker | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Promo Code
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoCode, setPromoCode] = useState<string>('');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    localStorage.setItem('kv_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('kv_favs', JSON.stringify(favorites));
  }, [favorites]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, message?: string, image?: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, message, image }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const handleAddToCart = (sneaker: Sneaker, size: number, colorName: string, quantity = 1) => {
    const colorObj = sneaker.colors.find((c) => c.name === colorName) || sneaker.colors[0];
    const cartId = `${sneaker.id}-${size}-${colorName}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartId === cartId);
      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          cartId,
          sneaker,
          selectedSize: size,
          selectedColor: colorObj,
          quantity,
        },
      ];
    });

    addToast(
      'success',
      '¡Añadido al Carrito!',
      `${sneaker.name} (Talla ${size} EU)`,
      sneaker.images[0]
    );
  };

  const handleUpdateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(cartId);
      return;
    }
    setCart((prev) => prev.map((item) => (item.cartId === cartId ? { ...item, quantity } : item)));
  };

  const handleRemoveFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
    addToast('info', 'Producto eliminado del carrito');
  };

  // Favorites operation
  const handleToggleFavorite = (sneaker: Sneaker) => {
    setFavorites((prev) => {
      const isFav = prev.includes(sneaker.id);
      if (isFav) {
        addToast('info', 'Eliminado de Favoritos', sneaker.name);
        return prev.filter((id) => id !== sneaker.id);
      } else {
        addToast('success', 'Añadido a Favoritos ❤️', sneaker.name, sneaker.images[0]);
        return [...prev, sneaker.id];
      }
    });
  };

  // Promo Code Handler
  const handleApplyPromoCode = (code: string) => {
    if (code === 'KICK15') {
      setPromoDiscount(0.15);
      setPromoCode('KICK15');
      addToast('success', '¡Cupón KICK15 Aplicado!', '15% de descuento en tu orden total');
      return true;
    }
    return false;
  };

  const handleScrollToCatalog = () => {
    const element = document.getElementById('catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white font-sans selection:bg-red-600 selection:text-white">
      {/* Toast Overlay */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Main Navigation Header */}
      <Navbar
        sneakers={sneakers}
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        favoritesCount={favorites.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenCustomizer={() => setCustomizerOpen(true)}
        onSelectSneaker={(sneaker) => setQuickViewSneaker(sneaker)}
        onCategorySelect={(cat) => {
          setActiveCategory(cat);
          handleScrollToCatalog();
        }}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <Hero
        onExploreClick={handleScrollToCatalog}
        onOpenCustomizer={() => setCustomizerOpen(true)}
      />

      {/* Brand Marquee & Fast Filter */}
      <BrandMarquee
        selectedBrand={activeBrand}
        onSelectBrand={(brand) => {
          setActiveBrand(brand);
          handleScrollToCatalog();
        }}
      />

      {/* Flash Sale Banner with Countdown */}
      <FlashSale
        onCopyCode={(code) => {
          handleApplyPromoCode(code);
          addToast('success', '¡Cupón KICK15 Copiado!', 'Úsalo al momento de pagar para 15% OFF');
        }}
      />

      {/* Main Catalog Grid & Filters */}
      <CatalogSection
        sneakers={sneakers}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onQuickView={(sneaker) => setQuickViewSneaker(sneaker)}
        onAddToCart={handleAddToCart}
        selectedCategoryFromNav={activeCategory}
        selectedBrandFromNav={activeBrand}
        searchQueryFromNav={searchQuery}
      />

      {/* Footer */}
      <Footer
        onCopyPromo={(code) => handleApplyPromoCode(code)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          handleScrollToCatalog();
        }}
      />

      {/* Modals & Slide-over Drawers */}
      <QuickViewModal
        sneaker={quickViewSneaker}
        isOpen={!!quickViewSneaker}
        onClose={() => setQuickViewSneaker(null)}
        isFavorite={quickViewSneaker ? favorites.includes(quickViewSneaker.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
      />

      <ShoeCustomizerModal
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        onAddCustomToCart={(custom) => {
          handleAddToCart(
            custom.sneaker,
            custom.selectedSize,
            custom.colorName,
            1
          );
        }}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setCheckoutOpen(true)}
        promoCode={promoCode}
        promoDiscount={promoDiscount}
        onApplyPromoCode={handleApplyPromoCode}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        favorites={favorites}
        sneakers={sneakers}
        onRemoveFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
        onQuickView={(sneaker) => setQuickViewSneaker(sneaker)}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        promoDiscount={promoDiscount}
        onOrderComplete={() => {
          setCart([]);
          setPromoDiscount(0);
        }}
      />

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />
    </div>
  );
}

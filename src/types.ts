export type Brand = 'Nike' | 'Adidas' | 'Jordan' | 'Puma' | 'New Balance' | 'Asics' | 'Vans';

export type Category = 'Basketball' | 'Running' | 'Lifestyle' | 'Skate' | 'Retro';

export type Gender = 'Men' | 'Women' | 'Unisex';

export interface ColorOption {
  name: string;
  hex: string;
  image?: string;
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Sneaker {
  id: string;
  name: string;
  brand: Brand;
  category: Category;
  gender: Gender;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isHot?: boolean;
  isOffer?: boolean;
  colors: ColorOption[];
  sizes: number[];
  images: string[];
  description: string;
  features: string[];
  sku: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Pre-order';
  reviews?: Review[];
}

export interface CartItem {
  cartId: string;
  sneaker: Sneaker;
  selectedSize: number;
  selectedColor: ColorOption;
  quantity: number;
}

export interface FilterState {
  searchQuery: string;
  brand: Brand | 'All';
  category: Category | 'All';
  gender: Gender | 'All';
  priceRange: [number, number];
  selectedSizes: number[];
  onSaleOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface CustomShoeConfig {
  baseColor: string;
  soleColor: string;
  lacesColor: string;
  accentColor: string;
  logoColor: string;
  customText?: string;
  selectedSize: number;
}

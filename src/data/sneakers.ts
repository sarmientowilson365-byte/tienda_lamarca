import { Sneaker } from '../types';
import heroRedSneakerImg from '../assets/images/hero_red_sneaker_1784677348636.jpg';

export const INITIAL_SNEAKERS: Sneaker[] = [
  {
    id: 'snk-001',
    name: 'Air Jordan 1 Retro High OG "Chicago Red"',
    brand: 'Jordan',
    category: 'Basketball',
    gender: 'Unisex',
    price: 189.99,
    originalPrice: 220.00,
    rating: 4.9,
    reviewsCount: 142,
    isNew: true,
    isHot: true,
    isOffer: true,
    colors: [
      { name: 'Chicago Red & White', hex: '#DC2626' },
      { name: 'Shadow Gray & Black', hex: '#374151' },
      { name: 'Royal Blue & White', hex: '#1D4ED8' }
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    images: [
      heroRedSneakerImg,
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'El clásico atemporal de 1985 reinventado con materiales premium de cuero de grano entero, amortiguación Air-Sole encapsulada y la legendaria silueta de caña alta que cambió la cultura del calzado para siempre.',
    features: [
      'Cuero premium de primera calidad',
      'Unidad de amortiguación Air-Sole en el talón',
      'Suela de goma duradera con tracción concéntrica',
      'Cordonera tradicional de 9 ojales'
    ],
    sku: 'AJ1-CHI-2026',
    stockStatus: 'In Stock',
    reviews: [
      {
        id: 'rev-1',
        user: 'Carlos M.',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'Hace 2 días',
        comment: 'Las mejores Jordan que he tenido. El cuero es ultrasuave y el color rojo resalta muchísimo. Envío rapidísimo.',
        verifiedPurchase: true
      },
      {
        id: 'rev-2',
        user: 'Sofía R.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'Hace 1 semana',
        comment: '100% originales. Calce perfecto y el empaque impecable con doble caja.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'snk-002',
    name: 'Nike Air Max 270 "Crimson Pulse"',
    brand: 'Nike',
    category: 'Lifestyle',
    gender: 'Unisex',
    price: 149.99,
    originalPrice: 175.00,
    rating: 4.8,
    reviewsCount: 98,
    isHot: true,
    isOffer: true,
    colors: [
      { name: 'Pure Platinum & Red', hex: '#EF4444' },
      { name: 'All Black Stealth', hex: '#111827' },
      { name: 'White & Volt Green', hex: '#84CC16' }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Cuenta con la unidad Air Max más alta de Nike en el talón para una pisada súper suave que se siente tan imposible como parece. La parte superior tejida ligera ofrece ventilación estratégica.',
    features: [
      'Unidad Max Air de 270 grados visible',
      'Parte superior Flyknit transpirable y flexible',
      'Suela exterior de goma de alta tracción',
      'Diseño tipo calcetín de fácil calzado'
    ],
    sku: 'NK-AM270-RED',
    stockStatus: 'In Stock'
  },
  {
    id: 'snk-003',
    name: 'Adidas Ultraboost Light 23 "Scarlet Black"',
    brand: 'Adidas',
    category: 'Running',
    gender: 'Men',
    price: 169.99,
    originalPrice: 200.00,
    rating: 4.9,
    reviewsCount: 115,
    isNew: true,
    isOffer: true,
    colors: [
      { name: 'Core Black & Solar Red', hex: '#DC2626' },
      { name: 'Cloud White', hex: '#F3F4F6' }
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Experimenta un retorno de energía supremo con las Ultraboost más ligeras creadas hasta la fecha. La tecnología Light BOOST de Adidas amortigua cada zancada para carreras largas sin fatiga.',
    features: [
      'Entresuela Light BOOST de última generación',
      'Tejido Primeknit+ para un ajuste personalizado',
      'Suela Continental Rubber para máxima adherencia en mojado y seco',
      'Sistema LEP (Linear Energy Push) que incrementa la reactividad'
    ],
    sku: 'AD-UB23-SCAR',
    stockStatus: 'In Stock'
  },
  {
    id: 'snk-004',
    name: 'New Balance 9060 "Sea Salt & Crimson"',
    brand: 'New Balance',
    category: 'Lifestyle',
    gender: 'Unisex',
    price: 159.99,
    originalPrice: 180.00,
    rating: 4.7,
    reviewsCount: 84,
    isHot: true,
    isOffer: true,
    colors: [
      { name: 'Sea Salt & Cherry Red', hex: '#B91C1C' },
      { name: 'Castlerock Gray', hex: '#6B7280' }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Una reinterpretación innovadora del estilo clásico de las series 99X con una estética futurista y de silueta robusta (chunky). Amortiguación ABZORB y SBS para comodidad duradera todo el día.',
    features: [
      'Combinación de gamuza porcina de lujo y malla',
      'Amortiguación de entresuela ABZORB y SBS',
      'Logotipo N translúcido en el lateral',
      'Dispositivo CR en el talón inspirado en las 990'
    ],
    sku: 'NB-9060-RED',
    stockStatus: 'In Stock'
  },
  {
    id: 'snk-005',
    name: 'Puma RS-X3 "Super Flame"',
    brand: 'Puma',
    category: 'Lifestyle',
    gender: 'Unisex',
    price: 119.99,
    originalPrice: 140.00,
    rating: 4.6,
    reviewsCount: 67,
    isOffer: true,
    colors: [
      { name: 'Flame Red & White', hex: '#EF4444' },
      { name: 'Triple Black', hex: '#000000' }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'RS-X3 lleva la tendencia retro-futurista al límite con capas de textura exageradas, colores vibrantes y la reconocida tecnología de amortiguación Running System de Puma.',
    features: [
      'Capas superiores de malla, cuero sintetico y gamuza',
      'Tecnología Running System (RS) en entresuela',
      'Tirador en la lengüeta y talón para calce rápido',
      'Suela gruesa de goma resistente al desgaste'
    ],
    sku: 'PU-RSX3-FLM',
    stockStatus: 'In Stock'
  },
  {
    id: 'snk-006',
    name: 'Asics GEL-Kayano 14 "Metallic Crimson"',
    brand: 'Asics',
    category: 'Running',
    gender: 'Unisex',
    price: 154.99,
    originalPrice: 170.00,
    rating: 4.9,
    reviewsCount: 112,
    isNew: true,
    colors: [
      { name: 'Metallic Silver & Crimson', hex: '#991B1B' },
      { name: 'Pure White & Black', hex: '#1F2937' }
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Inspirada en la estética de finales de los años 2000, la GEL-Kayano 14 reaparece con tecnología de amortiguación GEL expuesta y estructura de soporte TRUSSTIC para una zancada estable y futurista.',
    features: [
      'Tecnología de amortiguación GEL en antepié y talón',
      'Soporte dinámico TRUSSTIC para estabilidad',
      'Malla de alto flujo de aire con revestimientos sintéticos',
      'Diseño icónico de archivo de Asics Running'
    ],
    sku: 'AS-GK14-CRM',
    stockStatus: 'Low Stock'
  },
  {
    id: 'snk-007',
    name: 'Air Jordan 4 Retro "Red Cement"',
    brand: 'Jordan',
    category: 'Retro',
    gender: 'Men',
    price: 215.00,
    originalPrice: 240.00,
    rating: 5.0,
    reviewsCount: 204,
    isHot: true,
    colors: [
      { name: 'White & Fire Red Cement', hex: '#B91C1C' }
    ],
    sizes: [40, 41, 42, 43, 44, 45, 46],
    images: [
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'La mítica silueta diseñada por Tinker Hatfield llega en el codiciado colorway Red Cement. Cuero blanco nítido contrastado con detalles moteados en rojo fuego y malla lateral transpirable.',
    features: [
      'Cuero vacuno suave de primera calidad',
      'Paneles de malla moldeada en laterales y lengüeta',
      'Unidad Air visible en el talón',
      'Aletas de ajuste de cordones icónicas de la AJ4'
    ],
    sku: 'AJ4-REDCEM-2026',
    stockStatus: 'Low Stock'
  },
  {
    id: 'snk-008',
    name: 'Nike Dunk Low "Crimson Red & Sail"',
    brand: 'Nike',
    category: 'Skate',
    gender: 'Unisex',
    price: 119.99,
    originalPrice: 135.00,
    rating: 4.8,
    reviewsCount: 178,
    isHot: true,
    isOffer: true,
    colors: [
      { name: 'University Red & Sail', hex: '#DC2626' },
      { name: 'Panda Black & White', hex: '#000000' }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Creadas para las canchas de baloncesto universitario en los 80s y adoptadas por la cultura skate y urbana mundial. La Dunk Low mantiene el espíritu retro con cuero flexible y tonos atrevidos.',
    features: [
      'Parte superior de cuero genuino que se suaviza con el uso',
      'Entresuela de espuma para amortiguación ligera',
      'Cuello acolchado de caña baja',
      'Suela de goma circular vintage'
    ],
    sku: 'NK-DUNK-RED',
    stockStatus: 'In Stock'
  },
  {
    id: 'snk-009',
    name: 'Vans Knu Skool "Red Fat Laces"',
    brand: 'Vans',
    category: 'Skate',
    gender: 'Unisex',
    price: 89.99,
    originalPrice: 100.00,
    rating: 4.7,
    reviewsCount: 89,
    isNew: true,
    colors: [
      { name: 'Red Suede & White Sidestripe', hex: '#DC2626' },
      { name: 'Black Suede', hex: '#18181B' }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Una versión reeditada con volumen extra estilo años 90. Destaca por su lengüeta super acolchada, la Sidestripe 3D abombada y cordones ultra gruesos.',
    features: [
      'Capas superiores de gamuza roja resistente',
      'Lengüeta y cuello con relleno extra para máxima comodidad',
      'Sidestripe™ 3D moldeada y prominente',
      'Suela de wafffle de goma original'
    ],
    sku: 'VN-KNUSKOOL-RED',
    stockStatus: 'In Stock'
  },
  {
    id: 'snk-010',
    name: 'Adidas Samba OG "Burgundy & White"',
    brand: 'Adidas',
    category: 'Retro',
    gender: 'Unisex',
    price: 110.00,
    originalPrice: 125.00,
    rating: 4.9,
    reviewsCount: 310,
    isHot: true,
    colors: [
      { name: 'Deep Burgundy & Cloud White', hex: '#881337' },
      { name: 'Core Black & Gum', hex: '#18181B' }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Nacida en los campos de fútbol helados y convertida en el icono definitivo del streetwear. Cuero suave con puntera T-toe de gamuza y la emblemática suela de goma caramelo.',
    features: [
      'Horma clásica con cierre de cordones',
      'Exterior de piel granulada con puntera T en ante',
      'Forro sintético cómodo',
      'Suela de goma tipo Gum para tracción retro'
    ],
    sku: 'AD-SAMBA-BURG',
    stockStatus: 'In Stock'
  },
  {
    id: 'snk-011',
    name: 'Nike Vaporfly 3 "Hyper Speed Crimson"',
    brand: 'Nike',
    category: 'Running',
    gender: 'Unisex',
    price: 259.99,
    originalPrice: 285.00,
    rating: 4.9,
    reviewsCount: 76,
    isNew: true,
    colors: [
      { name: 'Crimson & Volt Yellow', hex: '#EF4444' }
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'La zapatilla de maratón reina de los récords mundiales. Equipada con placa de fibra de carbono Flyplate de longitud completa y la espuma ultrapinch ZoomX.',
    features: [
      'Espuma Nike ZoomX de talón a puntera para máxima energía',
      'Placa de fibra de carbono Flyplate para impulso propulsivo',
      'Malla Flyknit ultra transpirable e hiperligera',
      'Rediseño de suela para menor peso y mayor durabilidad'
    ],
    sku: 'NK-VF3-HYPER',
    stockStatus: 'Low Stock'
  },
  {
    id: 'snk-012',
    name: 'New Balance 550 "White Red Varsity"',
    brand: 'New Balance',
    category: 'Retro',
    gender: 'Unisex',
    price: 129.99,
    originalPrice: 145.00,
    rating: 4.8,
    reviewsCount: 156,
    isOffer: true,
    colors: [
      { name: 'White & Varsity Red', hex: '#DC2626' },
      { name: 'White & Green', hex: '#15803D' }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Rindiendo homenaje a los jugadores de baloncesto universitario de 1989, la 550 es simple, limpia y fiel a su herencia retro con detalles en cuero perforado.',
    features: [
      'Empeine de cuero, sintético y malla',
      'Suela de goma para tracción y durabilidad',
      'Logotipo N clásico acolchado en relieve',
      'Cierre de cordones regulable'
    ],
    sku: 'NB-550-RED',
    stockStatus: 'In Stock'
  }
];

export const BRANDS = [
  { name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
  { name: 'Jordan', logo: 'https://upload.wikimedia.org/wikipedia/en/3/37/Jumpman_logo.svg' },
  { name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
  { name: 'Puma', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Puma_logo.svg' },
  { name: 'New Balance', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/New_Balance_logo.svg' },
  { name: 'Asics', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Asics_Logo.svg' },
  { name: 'Vans', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Vans-logo.svg' }
] as const;

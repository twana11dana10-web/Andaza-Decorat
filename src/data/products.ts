import { Product } from '../types/product'

export const SHOWROOM_PRODUCTS: Product[] = [
  {
    id: 'alucobond',
    code: 'AND-ALU-01',
    name: 'Alucobond',
    brand: 'ANDAZA DECORAT',
    category: 'cladding',
    price: 0,
    shortDescription: '',
    fullDescription: '',
    mainImage: '/images/products/alucobond.png',
    galleryImages: [
      '/images/products/alucobond.png',
    ],
    isFeatured: true,
  },
  {
    id: 'mechanical-porcelain',
    code: 'AND-PRC-02',
    name: 'Mechanical Porcelain',
    brand: 'ANDAZA DECORAT',
    category: 'facades',
    price: 0,
    shortDescription: '',
    fullDescription: '',
    mainImage: '/images/products/mechanical-porcelain.png',
    galleryImages: [
      '/images/products/mechanical-porcelain.png',
    ],
    isFeatured: true,
  },
]

import type { Product } from '../types';

export const products: Product[] = [
  // Mishti (Traditional Sweets)
  {
    id: 'cham-cham',
    name: 'Cham Cham',
    description: 'Oval-shaped paneer sweets soaked in syrup and coated with coconut or mawa.',
    price: 1.50,
    image: '/images/cham-cham.webp',
    available: true,
    category: 'Mishti',
  },
  {
    id: 'kalojam',
    name: 'Kalojam',
    description: 'Dark, caramelized version of gulab jamun with a deeper, richer flavor.',
    price: 1.50,
    image: '/images/kalojam.webp',
    available: true,
    category: 'Mishti',
  },
  {
    id: 'rajbhog',
    name: 'Rajbhog',
    description: 'Larger, saffron-flavored roshgolla stuffed with dry fruits. Fit for royalty.',
    price: 1.50,
    image: '/images/rajbhog.webp',
    available: true,
    category: 'Mishti',
  },
  {
    id: 'malai-curry',
    name: 'Malai Curry',
    description: 'Cham cham served in a rich, creamy malai sauce. A luxurious treat.',
    price: 1.50,
    image: '/images/malai-curry.webp',
    available: true,
    category: 'Mishti',
  },
  {
    id: 'roshgolla',
    name: 'Roshgolla',
    description: 'Light, spongy cottage cheese balls soaked in clear sugar syrup. The iconic Bengali sweet.',
    price: 1.75,
    image: '/images/roshgolla.webp',
    available: true,
    category: 'Mishti',
  },
  {
    id: 'gulab-jamun',
    name: 'Gulab Jamun',
    description: 'Soft, spongy milk-solid balls soaked in rose-flavored sugar syrup. A beloved classic.',
    price: 1.75,
    image: '/images/gulab-jamun.webp',
    available: true,
    category: 'Mishti',
  },
    {
    id: 'laddu',
    name: 'Laddu',
    description: 'Round sweets made from tiny boondi pearls, flavored with cardamom and saffron.',
    price: 1.75,
    image: '/images/motichoor-laddu.webp',
    available: true,
    category: 'Mishti',
  },
  
  // Desserts
  {
    id: 'sandesh',
    name: 'Sandesh',
    description: 'Delicate Bengali sweet made from fresh paneer and sugar. Light and aromatic.',
    price: 1.75,
    image: '/images/sandesh.jpg',
    available: true,
    category: 'Mishti',
  },

];

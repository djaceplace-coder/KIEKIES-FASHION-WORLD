import { Product, Currency } from '../types';

export const FEATURED_PRODUCTS: Product[] = [
  {
    sku: 'KFW-2601-LILAC',
    title: 'Oversized Silk Set',
    department: 'Women',
    category: 'Ready-to-Wear',
    price: { NGN: 95000, USD: 75, GBP: 60 },
    imageMain: 'https://picsum.photos/seed/kiekies_1/800/1000',
    imageHover: 'https://picsum.photos/seed/kiekies_2/800/1000', // Mock hover
    badge: 'LIMITED IMPORT',
    provenance: 'Milan, Italy • Hand Inspected',
    sizes: ['UK 6', 'UK 8', 'UK 10', 'UK 12'],
    colors: ['Lilac', 'Obsidian']
  },
  {
    sku: 'KFW-2602-OBSIDIAN',
    title: 'Technical Tailored Blazer',
    department: 'Men',
    category: 'Atelier',
    price: { NGN: 125000, USD: 95, GBP: 80 },
    imageMain: 'https://picsum.photos/seed/kiekies_3/800/1000',
    imageHover: 'https://picsum.photos/seed/kiekies_4/800/1000',
    badge: 'NEW',
    provenance: 'London, UK • Hand Inspected',
    sizes: ['38R', '40R', '42R', '44R'],
    colors: ['Obsidian']
  },
  {
    sku: 'KFW-2603-CREAM',
    title: 'Bouclé Knit Cardigan',
    department: 'Women',
    category: 'Knitwear',
    price: { NGN: 85000, USD: 65, GBP: 50 },
    imageMain: 'https://picsum.photos/seed/kiekies_5/800/1000',
    imageHover: 'https://picsum.photos/seed/kiekies_6/800/1000',
    badge: 'BEST SELLER',
    provenance: 'Paris, France • Hand Inspected',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Cream', 'Charcoal']
  },
  {
    sku: 'KFW-2604-VIOLET',
    title: 'Neo-Bento Cargo Pants',
    department: 'Men',
    category: 'Streetwear',
    price: { NGN: 105000, USD: 85, GBP: 70 },
    imageMain: 'https://picsum.photos/seed/kiekies_7/800/1000',
    imageHover: 'https://picsum.photos/seed/kiekies_8/800/1000',
    provenance: 'Tokyo, Japan • Hand Inspected',
    sizes: ['30', '32', '34', '36'],
    colors: ['Violet', 'Obsidian']
  },
  {
    sku: 'KAC-2605-ONYX',
    title: 'Onyx Leather Tote',
    department: 'Accessories',
    category: 'Bags',
    price: { NGN: 150000, USD: 120, GBP: 100 },
    imageMain: 'https://picsum.photos/seed/kiekies_9/800/1000',
    imageHover: 'https://picsum.photos/seed/kiekies_10/800/1000',
    badge: 'NEW DROP',
    provenance: 'Florence, Italy • Hand Crafted',
    sizes: ['One Size'],
    colors: ['Onyx', 'Tan']
  },
  {
    sku: 'KAC-2606-GOLD',
    title: 'Architectural Cuff',
    department: 'Accessories',
    category: 'Jewelry',
    price: { NGN: 65000, USD: 50, GBP: 40 },
    imageMain: 'https://picsum.photos/seed/kiekies_11/800/1000',
    imageHover: 'https://picsum.photos/seed/kiekies_12/800/1000',
    badge: 'BEST SELLER',
    provenance: 'Seoul, South Korea • Studio Forged',
    sizes: ['One Size'],
    colors: ['Gold', 'Silver']
  },
  {
    sku: 'KAC-2607-SILK',
    title: 'Monogram Silk Scarf',
    department: 'Accessories',
    category: 'Scarves',
    price: { NGN: 45000, USD: 35, GBP: 25 },
    imageMain: 'https://picsum.photos/seed/kiekies_13/800/1000',
    imageHover: 'https://picsum.photos/seed/kiekies_14/800/1000',
    badge: 'NEW DROP',
    provenance: 'Como, Italy • Hand Rolled',
    sizes: ['One Size'],
    colors: ['Monogram', 'Midnight']
  }
];

export const formatPrice = (price: number, currency: Currency) => {
  switch (currency) {
    case 'NGN': return `₦${price.toLocaleString()}`;
    case 'USD': return `$${price.toLocaleString()}`;
    case 'GBP': return `£${price.toLocaleString()}`;
  }
};

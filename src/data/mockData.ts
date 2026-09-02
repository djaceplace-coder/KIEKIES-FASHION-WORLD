import { Product, Currency } from '../types';

export const FEATURED_PRODUCTS: Product[] = [
  {
    sku: 'KFW-2601-LILAC',
    title: 'Oversized Silk Set',
    department: 'Women',
    category: 'Ready-to-Wear',
    price: { NGN: 95000, USD: 75, GBP: 60 },
    imageMain: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    imageHover: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800&sat=-100', // Mock hover
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
    imageMain: 'https://images.unsplash.com/photo-1593030761757-71fae4630b14?auto=format&fit=crop&q=80&w=800',
    imageHover: 'https://images.unsplash.com/photo-1593030761757-71fae4630b14?auto=format&fit=crop&q=80&w=800&sat=-100',
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
    imageMain: 'https://images.unsplash.com/photo-1434389670869-c87522f516a2?auto=format&fit=crop&q=80&w=800',
    imageHover: 'https://images.unsplash.com/photo-1434389670869-c87522f516a2?auto=format&fit=crop&q=80&w=800&sat=-100',
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
    imageMain: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
    imageHover: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800&sat=-100',
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
    imageMain: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800',
    imageHover: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800',
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
    imageMain: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
    imageHover: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800',
    badge: 'BEST SELLER',
    provenance: 'Seoul, South Korea • Studio Forged',
    sizes: ['One Size'],
    colors: ['Gold', 'Silver']
  }
];

export const formatPrice = (price: number, currency: Currency) => {
  switch (currency) {
    case 'NGN': return `₦${price.toLocaleString()}`;
    case 'USD': return `$${price.toLocaleString()}`;
    case 'GBP': return `£${price.toLocaleString()}`;
  }
};

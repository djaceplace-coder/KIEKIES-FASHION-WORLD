export type Currency = 'NGN' | 'USD' | 'GBP';

export interface Product {
  sku: string;
  title: string;
  department: string;
  category: string;
  price: {
    NGN: number;
    USD: number;
    GBP: number;
  };
  imageMain: string;
  imageHover: string;
  badge?: string;
  provenance: string;
  sizes: string[];
  colors: string[];
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

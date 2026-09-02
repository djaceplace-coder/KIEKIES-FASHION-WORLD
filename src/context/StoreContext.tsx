import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Currency, CartItem, Product } from '../types';

interface StoreContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  products: Product[];
  isLoadingProducts: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('NGN');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        
        // Map Supabase rows to our Product interface
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((row: any) => ({
            sku: row.sku,
            title: row.title,
            department: row.department,
            price: {
              NGN: row.base_price_ngn || 0,
              USD: row.base_price_usd || (row.base_price_ngn / 1500),
              GBP: row.base_price_gbp || (row.base_price_ngn / 1900)
            },
            imageMain: row.image_main,
            imageHover: row.image_hover,
            sizes: row.sizes ? row.sizes.split(',') : ['S', 'M', 'L'],
            colors: row.colors ? row.colors.split(',') : ['Default'],
            badge: row.is_new_drop ? 'New Drop' : undefined,
            provenance: row.provenance
          }));
          setProducts(mapped);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setIsLoadingProducts(false);
      }
    }
    fetchProducts();
  }, []);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(i => i.product.sku === item.product.sku && i.size === item.size && i.color === item.color);
      if (existing) {
        return prev.map(i => i === existing ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
    setIsCartOpen(true); // Auto-open cart on add
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <StoreContext.Provider value={{ currency, setCurrency, cart, addToCart, cartCount, isCartOpen, setIsCartOpen, products, isLoadingProducts }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

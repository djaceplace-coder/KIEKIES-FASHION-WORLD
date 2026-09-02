import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';
import { FEATURED_PRODUCTS, formatPrice } from '../data/mockData';
import { Plus } from 'lucide-react';

export default function NewArrivals() {
  const { currency, products: allProducts, isLoadingProducts } = useStore();
  
  // Filter new drops. Supabase gives them badge 'New Drop', Mock gives 'NEW'
  const newProducts = allProducts.filter(p => p.badge === 'New Drop' || p.badge === 'NEW');
  const mockNewProducts = FEATURED_PRODUCTS.filter(p => p.badge === 'NEW');
  
  const displayProducts = allProducts.length > 0 ? (newProducts.length > 0 ? newProducts : allProducts) : mockNewProducts;

  return (
    <div className="bg-silk-cream min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <header className="mb-16 md:mb-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-brand-violet/10 text-brand-violet font-black uppercase tracking-widest text-xs px-4 py-2 rounded-full mb-6"
          >
            Fresh From The Port
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-obsidian mb-6"
          >
            New Arrivals
          </motion.h1>
          <p className="text-lg text-obsidian/60 max-w-2xl mx-auto font-medium">
            The latest imports to hit the floor. Real-time drops updated directly from our global hubs.
          </p>
        </header>

        {isLoadingProducts ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-violet"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayProducts.map((product, i) => (
              <motion.div
                key={product.sku}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link to={`/product/${product.sku}`} className="group block relative">
                  <div className="bg-white rounded-[20px] md:rounded-2xl overflow-hidden aspect-[3/4] relative mb-4 shadow-sm border border-obsidian/5 group-hover:shadow-md transition-shadow">
                    
                    <div className="absolute top-4 left-4 z-20 bg-brand-violet text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">
                      NEW DROP
                    </div>

                    <img referrerPolicy="no-referrer" 
                      src={product.imageMain} 
                      alt={product.title}
                      className="w-full h-full object-cover object-center absolute inset-0 z-10 transition-opacity duration-500 group-hover:opacity-0"
                    />
                    <img referrerPolicy="no-referrer" 
                      src={product.imageHover || product.imageMain} 
                      alt={`${product.title} lifestyle`}
                      className="w-full h-full object-cover object-center absolute inset-0 z-0 scale-105 group-hover:scale-100 transition-transform duration-700"
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 hidden lg:block">
                      <button className="w-full bg-obsidian/90 backdrop-blur text-white rounded-xl py-3 text-sm font-bold flex items-center justify-center gap-2 hover:bg-brand-violet transition-colors">
                        <Plus className="w-4 h-4" /> Quick Add
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-center px-1">
                    <div className="text-[10px] sm:text-xs font-bold text-obsidian/50 uppercase tracking-widest mb-1 truncate">
                      {product.department} • {product.category}
                    </div>
                    <h3 className="font-bold text-obsidian text-sm sm:text-lg mb-1 truncate">{product.title}</h3>
                    <div className="font-medium text-brand-violet text-sm sm:text-base">
                      {formatPrice(product.price[currency], currency)}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

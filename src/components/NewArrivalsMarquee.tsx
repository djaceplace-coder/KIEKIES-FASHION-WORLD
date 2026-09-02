import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';
import { FEATURED_PRODUCTS, formatPrice } from '../data/mockData';

export default function NewArrivalsMarquee() {
  const { currency, products: allProducts } = useStore();
  
  const newProducts = allProducts.filter(p => p.badge === 'New Drop' || p.badge === 'NEW');
  const mockNewProducts = FEATURED_PRODUCTS.filter(p => p.badge === 'NEW');
  
  const displayProducts = allProducts.length > 0 ? (newProducts.length > 0 ? newProducts : allProducts.slice(0, 5)) : (mockNewProducts.length > 0 ? mockNewProducts : FEATURED_PRODUCTS);

  // Duplicate items for seamless infinite scroll (2 sets for perfect -50% loop)
  const marqueeItems = displayProducts;

  const MarqueeContent = () => (
    <div className="flex gap-6 pr-6">
      {marqueeItems.map((item, idx) => (
        <Link 
          to={`/product/${item.sku}`} 
          key={`${item.sku}-${idx}`}
          className="relative w-48 md:w-64 aspect-[3/4] rounded-2xl overflow-hidden shrink-0 group/card block bg-[#1C1A20] border border-white/5"
        >
          <img referrerPolicy="no-referrer" 
            src={item.imageMain} 
            alt={item.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110 opacity-80 group-hover/card:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-brand-violet mb-1">
              New Arrival
            </div>
            <h3 className="text-sm md:text-base font-bold text-white truncate">{item.title}</h3>
            <div className="text-xs md:text-sm font-bold text-white/70 mt-1">
              {formatPrice(item.price[currency], currency)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <section className="py-12 bg-obsidian text-white overflow-hidden border-t border-white/10">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8">
        <h2 className="text-xl md:text-3xl font-black uppercase tracking-widest">Just Landed</h2>
        <Link to="/new-arrivals" className="text-sm font-bold text-brand-violet hover:text-white transition-colors uppercase tracking-wider flex items-center gap-2">
          View All Drops <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <motion.div 
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
        >
          <MarqueeContent />
          <MarqueeContent />
        </motion.div>
      </div>
    </section>
  );
}

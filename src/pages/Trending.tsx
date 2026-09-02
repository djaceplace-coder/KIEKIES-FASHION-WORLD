import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';
import { FEATURED_PRODUCTS, formatPrice } from '../data/mockData';
import { ArrowUpRight } from 'lucide-react';

export default function Trending() {
  const { currency, products: allProducts } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const availableProducts = allProducts.length > 0 ? allProducts : FEATURED_PRODUCTS;
  const trendingItems = availableProducts.slice(0, 4);

  return (
    <div className="bg-silk-cream min-h-screen pt-24 pb-32" ref={containerRef}>
      <header className="px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto mb-16 md:mb-24 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-obsidian mb-6"
        >
          Trending Now.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl font-medium text-obsidian/60 max-w-2xl mx-auto"
        >
          Curated looks defining the current zeitgeist. Hand-selected for immediate impact.
        </motion.p>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {trendingItems.map((item, i) => (
            <motion.div 
              key={item.sku}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`group relative rounded-[32px] overflow-hidden ${i === 0 || i === 3 ? 'md:aspect-[3/4]' : 'md:aspect-square'}`}
            >
              <Link to={`/product/${item.sku}`} className="block w-full h-full">
                <img referrerPolicy="no-referrer" 
                  src={item.imageMain} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                
                {/* Subtle Hover Pricing & Title */}
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col items-start justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-obsidian mb-4 border border-white/20 shadow-xl">
                    {item.category}
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-white leading-tight mb-2 drop-shadow-xl">{item.title}</h3>
                  <div className="flex items-center gap-4 text-white/90">
                    <span className="text-xl font-bold tracking-widest bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                      {formatPrice(item.price[currency], currency)}
                    </span>
                    <span className="w-10 h-10 rounded-full bg-brand-violet flex items-center justify-center shadow-xl">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

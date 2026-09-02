import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';
import { FEATURED_PRODUCTS, formatPrice } from '../data/mockData';

export default function BestSellers() {
  const { currency, products: allProducts } = useStore();
  
  const availableProducts = allProducts.length > 0 ? allProducts : FEATURED_PRODUCTS;
  const bestSellers = availableProducts.slice(0, 3); // Pick top 3 for a beauty setup

  return (
    <div className="bg-obsidian min-h-screen pt-24 pb-32 text-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        
        <header className="mb-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-7xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 mb-6 drop-shadow-sm"
          >
            The Icons
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl font-medium text-amber-100/60 max-w-xl mx-auto uppercase tracking-widest"
          >
            Our most coveted pieces, permanently in demand.
          </motion.p>
        </header>

        <div className="flex flex-col gap-24 md:gap-32">
          {bestSellers.map((item, i) => (
            <motion.div 
              key={item.sku}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-200px" }}
              transition={{ duration: 1 }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
            >
              <div className="w-full md:w-1/2">
                <Link to={`/product/${item.sku}`} className="block relative group overflow-hidden rounded-[40px] aspect-[4/5] shadow-2xl border border-white/5 bg-[#1C1A20]">
                  <img referrerPolicy="no-referrer" 
                    src={item.imageMain} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent"></div>
                </Link>
              </div>

              <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left px-4 md:px-0">
                <div className="text-amber-300/80 text-xs font-bold uppercase tracking-[0.3em] mb-4">
                  0{i + 1} // Signature Piece
                </div>
                <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6">{item.title}</h2>
                <p className="text-white/50 text-lg mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
                  Crafted in {item.provenance.split('•')[0].trim()}. This iconic {item.category.toLowerCase()} has defined our collection and remains a global favorite.
                </p>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <span className="text-2xl font-bold tracking-widest text-amber-100">
                    {formatPrice(item.price[currency], currency)}
                  </span>
                  <Link 
                    to={`/product/${item.sku}`}
                    className="bg-amber-100 text-obsidian px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:bg-white transition-colors hover:scale-105 transform duration-300"
                  >
                    Acquire Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

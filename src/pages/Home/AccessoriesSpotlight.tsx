import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../../context/StoreContext';
import { Link } from 'react-router-dom';
import { FEATURED_PRODUCTS, formatPrice } from '../../data/mockData';
import { ArrowUpRight } from 'lucide-react';

export default function AccessoriesSpotlight() {
  const { currency, products: allProducts } = useStore();
  
  const accessories = allProducts.length > 0 
    ? allProducts.filter(p => p.department.toLowerCase() === 'accessories')
    : FEATURED_PRODUCTS.filter(p => p.department.toLowerCase() === 'accessories');
    
  if (accessories.length === 0) return null;

  return (
    <section className="py-24 bg-zinc-900 border-t border-white/5 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-amber-100 uppercase tracking-tighter mb-4">
              The Hardware.
            </h2>
            <p className="text-amber-100/60 max-w-md text-lg">
              Sculptural pieces and leather goods designed to anchor your look. 
            </p>
          </div>
          <Link 
            to="/shop/accessories"
            className="flex items-center gap-2 text-zinc-900 bg-amber-100 px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors"
          >
            Explore Accessories <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accessories.slice(0, 3).map((item, i) => (
            <motion.div 
              key={item.sku}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link to={`/product/${item.sku}`} className="group block h-full">
                <div className="relative aspect-square md:aspect-[4/5] rounded-[24px] overflow-hidden bg-[#1C1C1E] border border-amber-100/10 group-hover:border-amber-300/30 transition-colors">
                  <img referrerPolicy="no-referrer" 
                    src={item.imageMain} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-amber-300 text-[10px] font-bold uppercase tracking-widest mb-2">
                      {item.category}
                    </div>
                    <h3 className="text-2xl font-bold text-amber-100 mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <div className="text-amber-100/70 font-medium">
                      {formatPrice(item.price[currency], currency)}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

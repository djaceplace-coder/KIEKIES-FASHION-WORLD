import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Product } from '../../types';
import { FEATURED_PRODUCTS, formatPrice } from '../../data/mockData';
import { useStore } from '../../context/StoreContext';

gsap.registerPlugin(ScrollTrigger);

export default function ProductGrid() {
  const { currency } = useStore();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gsap.utils.toArray('.home-product-card', gridRef.current);
    
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {FEATURED_PRODUCTS.map((product) => (
          <Link key={product.sku} to={`/product/${product.sku}`} className="home-product-card group block relative">
            <div className="bg-silk-cream rounded-[20px] md:rounded-2xl overflow-hidden aspect-[3/4] relative mb-3 sm:mb-4 shadow-sm border border-obsidian/5 group-hover:shadow-md transition-shadow">
              
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-obsidian text-white text-[9px] sm:text-[10px] font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full tracking-wider uppercase">
                  {product.badge}
                </div>
              )}

              {/* Image Transition */}
              <img referrerPolicy="no-referrer" 
                src={product.imageMain} 
                alt={product.title}
                className="w-full h-full object-cover object-center absolute inset-0 z-10 transition-opacity duration-500 group-hover:opacity-0"
              />
              <img referrerPolicy="no-referrer" 
                src={product.imageHover} 
                alt={`${product.title} lifestyle`}
                className="w-full h-full object-cover object-center absolute inset-0 z-0"
              />

              {/* Hover Drawer (Desktop) */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 hidden lg:block">
                <button className="w-full bg-obsidian/90 backdrop-blur text-white rounded-xl py-3 text-sm font-bold flex items-center justify-center gap-2 hover:bg-brand-violet transition-colors">
                  <Plus className="w-4 h-4" /> Quick Add
                </button>
              </div>
            </div>

            <div className="text-center px-1">
              <div className="text-[10px] sm:text-xs font-bold text-obsidian/50 uppercase tracking-widest mb-1 truncate">{product.department} • {product.category}</div>
              <h3 className="font-bold text-obsidian text-sm sm:text-lg mb-1 truncate">{product.title}</h3>
              <div className="font-medium text-brand-violet text-sm sm:text-base">{formatPrice(product.price[currency], currency)}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, X, ShieldCheck } from 'lucide-react';
import { FEATURED_PRODUCTS, formatPrice } from '../data/mockData';
import { useStore } from '../context/StoreContext';

gsap.registerPlugin(ScrollTrigger);

export default function Shop() {
  const { category } = useParams<{ category: string }>();
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const { currency, products: allProducts, isLoadingProducts } = useStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const title = category ? category.toUpperCase() : 'THE COLLECTION';

  const getGenreStyles = (cat?: string) => {
    switch(cat?.toLowerCase()) {
      case 'men':
        return {
          bg: 'bg-obsidian',
          text: 'text-white',
          textSecondary: 'text-white/60',
          accent: 'text-gray-400',
          card: 'bg-[#18161B] border-white/10 rounded-sm hover:border-white/30',
          button: 'bg-white text-obsidian rounded-sm',
          headerBg: 'bg-[#111] text-white',
          filterCard: 'bg-[#111] rounded-sm',
          cardText: 'text-white',
          cardPrice: 'text-white'
        };
      case 'accessories':
        return {
          bg: 'bg-zinc-900',
          text: 'text-amber-100',
          textSecondary: 'text-amber-100/60',
          accent: 'text-amber-300',
          card: 'bg-[#1C1C1E] border-amber-100/10 rounded-xl hover:border-amber-300/30',
          button: 'bg-amber-100 text-zinc-900 rounded-xl hover:bg-amber-200',
          headerBg: 'bg-zinc-900 text-amber-100',
          filterCard: 'bg-[#1C1C1E] rounded-xl',
          cardText: 'text-amber-100',
          cardPrice: 'text-amber-200'
        };
      case 'kids':
        return {
          bg: 'bg-[#FFFAF0]',
          text: 'text-gray-900',
          textSecondary: 'text-gray-500',
          accent: 'text-[#FF8A65]',
          card: 'bg-white border-[#FF8A65]/20 rounded-[32px] hover:shadow-lg hover:-translate-y-1',
          button: 'bg-[#FF8A65] text-white rounded-full',
          headerBg: 'bg-[#FF8A65] text-white',
          filterCard: 'bg-white rounded-[32px]',
          cardText: 'text-gray-900',
          cardPrice: 'text-[#FF8A65]'
        };
      case 'women':
      default:
        return {
          bg: 'bg-silk-cream',
          text: 'text-obsidian',
          textSecondary: 'text-obsidian/60',
          accent: 'text-brand-violet',
          card: 'bg-white border-obsidian/5 rounded-[20px] sm:rounded-squircle hover:shadow-md',
          button: 'bg-brand-violet text-white rounded-squircle shadow-tactile-inset',
          headerBg: 'bg-obsidian text-white',
          filterCard: 'bg-obsidian rounded-squircle',
          cardText: 'text-obsidian',
          cardPrice: 'text-brand-violet'
        };
    }
  };

  const styles = getGenreStyles(category);

  // Filter products by department (case insensitive), or show all if not found
  const fallbackProducts = FEATURED_PRODUCTS.filter(p => p.department.toLowerCase() === category?.toLowerCase());
  const displayFallback = fallbackProducts.length > 0 ? fallbackProducts : FEATURED_PRODUCTS;
  
  const fetchedProducts = allProducts.filter(p => p.department.toLowerCase() === category?.toLowerCase());
  const displayFetched = fetchedProducts.length > 0 ? fetchedProducts : allProducts;
  
  const displayProducts = allProducts.length > 0 ? displayFetched : displayFallback;

  useEffect(() => {
    if (!gridRef.current || !headerRef.current) return;
    
    ScrollTrigger.getAll().forEach(t => t.kill());

    // S1: Header Text Reveal Animation
    const chars = headerRef.current.querySelectorAll('.char');
    gsap.fromTo(chars, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 1, ease: 'power4.out', delay: 0.1 }
    );

    // S3: Grid Stagger Animation
    const cards = gsap.utils.toArray('.product-card', gridRef.current);
    gsap.fromTo(
      cards,
      { y: 100, opacity: 0, rotateX: 10 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [category]);

  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ${category?.toLowerCase() === 'kids' ? 'text-gray-400' : 'text-obsidian/40 lg:text-silk-cream/40'}`}>Categories</h3>
        <div className={`space-y-4 text-sm font-medium ${category?.toLowerCase() === 'kids' ? 'text-gray-800' : 'text-obsidian/80 lg:text-silk-cream/70'}`}>
          {['Ready-to-Wear', 'Outerwear & Atelier', 'Knitwear', 'Streetwear'].map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className={`w-4 h-4 cursor-pointer ${category?.toLowerCase() === 'kids' ? 'accent-[#FF8A65]' : 'accent-brand-violet'}`} /> 
              <span className={`transition-colors hover:${styles.accent}`}>{cat}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className={`border-t pt-8 ${category?.toLowerCase() === 'kids' ? 'border-gray-200' : 'border-obsidian/10 lg:border-white/10'}`}>
        <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ${category?.toLowerCase() === 'kids' ? 'text-gray-400' : 'text-obsidian/40 lg:text-silk-cream/40'}`}>Availability</h3>
        <div className={`space-y-4 text-sm font-medium ${category?.toLowerCase() === 'kids' ? 'text-gray-800' : 'text-obsidian/80 lg:text-silk-cream/70'}`}>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className={`w-4 h-4 cursor-pointer ${category?.toLowerCase() === 'kids' ? 'accent-[#FF8A65]' : 'accent-brand-violet'}`} defaultChecked /> 
            <span className={`transition-colors hover:${styles.accent}`}>In Stock (Lagos Hub)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className={`w-4 h-4 cursor-pointer ${category?.toLowerCase() === 'kids' ? 'accent-[#FF8A65]' : 'accent-brand-violet'}`} /> 
            <span className={`transition-colors hover:${styles.accent}`}>Pre-order Drops</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${styles.bg} min-h-screen pb-24 transition-colors duration-500`}>
      
      {/* S1: Cinematic Header */}
      <div className={`relative h-[40vh] flex items-end p-8 md:p-12 overflow-hidden mb-8 lg:mb-16 ${styles.headerBg}`}>
        <div 
          className="absolute inset-0 bg-[url('https://picsum.photos/seed/kiekies_32/800/1000')] bg-cover bg-center opacity-40 mix-blend-overlay bg-fixed"
        />
        <h1 ref={headerRef} className="text-6xl md:text-9xl font-black text-white relative z-10 uppercase tracking-tighter flex overflow-hidden">
          {title.split('').map((char, i) => (
            <span key={i} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h1>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row gap-8">
        
        {/* S2: Desktop Sidebar Filter */}
        <aside className={`hidden lg:block w-1/4 ${styles.filterCard} text-white p-8 self-start sticky top-24`}>
          <h2 className={`text-2xl font-black mb-6 ${styles.accent} uppercase tracking-wider`}>Filters</h2>
          <FilterContent />
        </aside>

        {/* S2: Mobile Filter Button & Drawer */}
        <button 
          onClick={() => setIsFilterOpen(true)}
          className={`lg:hidden fixed bottom-[84px] left-1/2 -translate-x-1/2 z-40 ${styles.button} px-6 py-3 font-bold text-sm flex items-center gap-2 uppercase tracking-wider whitespace-nowrap shadow-xl`}
        >
          <SlidersHorizontal className="w-4 h-4" /> Filter & Sort
        </button>

        <AnimatePresence>
          {isFilterOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFilterOpen(false)}
                className="fixed inset-0 bg-obsidian/40 backdrop-blur-sm z-[100] lg:hidden"
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 bg-silk-cream rounded-t-[32px] p-6 z-[101] max-h-[85vh] overflow-y-auto lg:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.2)]"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className={`text-xl font-black uppercase tracking-wider ${category?.toLowerCase() === 'kids' ? 'text-gray-900' : 'text-obsidian'}`}>Filters</h2>
                  <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-obsidian/5 rounded-full hover:bg-obsidian/10">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterContent />
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className={`w-full font-bold py-4 mt-8 ${styles.button}`}
                >
                  Apply Filters
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* S3: The Collection Matrix */}
        <main className="w-full lg:w-3/4">
          <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
            {displayProducts.map((product) => (
              <Link 
                key={product.sku} 
                to={`/product/${product.sku}`} 
                className={`product-card group relative p-3 sm:p-4 overflow-hidden transition-all ${styles.card}`}
              >
                {product.badge && (
                  <div className={`absolute top-4 left-4 sm:top-6 sm:left-6 z-10 ${styles.button} px-2 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider`}>
                    {product.badge}
                  </div>
                )}
                <div className={`relative aspect-[3/4] w-full overflow-hidden mb-3 sm:mb-4 ${category?.toLowerCase() === 'men' ? 'rounded-sm' : category?.toLowerCase() === 'kids' ? 'rounded-2xl' : 'rounded-xl sm:rounded-2xl bg-silk-cream'}`}>
                  {/* Standard img tag acting like next/image for Vite context */}
                  <img referrerPolicy="no-referrer" 
                    src={product.imageMain} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="pt-1 pb-1 text-center px-1">
                  <div className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-1 truncate ${styles.textSecondary}`}>
                    {product.department}
                  </div>
                  <h3 className={`text-sm sm:text-lg font-bold leading-tight truncate ${styles.cardText}`}>{product.title}</h3>
                  <p className={`font-black mt-1 sm:mt-2 text-sm sm:text-base ${styles.cardPrice}`}>{formatPrice(product.price[currency], currency)}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* S4: Fabric & Craftsmanship Macro */}
          <div className={`w-full h-64 sm:h-96 relative mt-16 sm:mt-24 overflow-hidden group border border-obsidian/10 ${category?.toLowerCase() === 'men' ? 'rounded-sm' : category?.toLowerCase() === 'kids' ? 'rounded-[32px]' : 'rounded-squircle'}`}>
            <img referrerPolicy="no-referrer" 
              src="https://picsum.photos/seed/kiekies_33/800/1000" 
              alt="Silk Macro" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="bg-white/90 backdrop-blur-md rounded-squircle p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center max-w-sm w-full transform group-hover:scale-105 transition-transform duration-500">
                <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-brand-violet mb-3" />
                <h4 className="font-black text-obsidian text-lg sm:text-xl leading-tight">100% Authenticated Imports</h4>
                <p className="text-xs sm:text-sm font-medium text-obsidian/70 mt-2">Premium fabrics hand-inspected in our Lagos Hub.</p>
              </div>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}

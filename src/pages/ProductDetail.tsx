import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ShieldCheck, MessageCircle, ShoppingBag, Truck, ChevronRight, Globe, Plus } from 'lucide-react';
import { FEATURED_PRODUCTS, formatPrice } from '../data/mockData';
import { useStore } from '../context/StoreContext';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import ImageZoom from '../components/ImageZoom';
import { generateWhatsAppLink } from '../lib/whatsapp';

export default function ProductDetail() {
  const { sku } = useParams();
  const { currency, addToCart, products: allProducts } = useStore();
  
  const product = allProducts.find(p => p.sku === sku) || FEATURED_PRODUCTS.find(p => p.sku === sku) || FEATURED_PRODUCTS[0];
  const allAvailableProducts = allProducts.length > 0 ? allProducts : FEATURED_PRODUCTS;
  const crossSells = allAvailableProducts.filter(p => p.sku !== product.sku).slice(0, 4);
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  
  const images = [product.imageMain, product.imageHover];

  const handleAddToCart = () => {
    if (!selectedSize) return alert('Please select a size');
    addToCart({
      product,
      size: selectedSize,
      color: product.colors[0],
      quantity: 1
    });
  };

  const handleWhatsAppOrder = () => {
    if (!selectedSize) return alert('Please select a size');
    const url = generateWhatsAppLink(
      product.title, 
      product.sku, 
      selectedSize, 
      product.colors[0], 
      formatPrice(product.price[currency], currency)
    );
    window.open(url, '_blank');
  };

  return (
    <div className="bg-silk-cream min-h-screen pt-4 sm:pt-8 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-obsidian/50 uppercase tracking-widest mb-8">
          <Link to="/" className="hover:text-brand-violet transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/shop/${product.department.toLowerCase()}`} className="hover:text-brand-violet transition-colors">{product.department}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-obsidian">{product.title}</span>
        </div>

        {/* 60/40 Split Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 items-start">
          
          {/* S1: Split-Screen Media Stage */}
          <div className="w-full lg:w-[60%] lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
            <div className="w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar lg:grid lg:grid-cols-2 gap-4 lg:gap-6 rounded-none lg:rounded-[32px] -mx-4 px-4 lg:mx-0 lg:px-0 lg:overflow-visible">
              {images.map((img, idx) => (
                <div key={idx} className="min-w-[85vw] lg:min-w-0 snap-center shrink-0 w-full lg:h-auto h-[60vh] bg-gray-100 lg:rounded-2xl overflow-hidden">
                  <ImageZoom src={img} alt={`${product.title} view ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[40%] flex flex-col pt-2 sm:pt-4">
            
            {/* S3: Sourcing & Provenance Passport */}
            <div className="mb-6 sm:mb-8 p-4 border-2 border-brand-violet/10 bg-brand-violet/5 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-brand-violet animate-[spin_10s_linear_infinite]" />
              </div>
              <div>
                <h4 className="font-black text-xs sm:text-sm text-obsidian uppercase tracking-wider mb-1">Authenticity Verified</h4>
                <p className="text-[10px] sm:text-xs text-obsidian/70 font-medium">Imported from Milan, Italy. Hand-inspected in Lagos on {new Date().toLocaleDateString()}.</p>
              </div>
            </div>

            {/* Middle: Title & Price */}
            <h1 className="text-3xl sm:text-5xl font-black text-obsidian tracking-tighter mb-2 sm:mb-4 leading-tight">{product.title}</h1>
            
            <div className="flex items-center gap-4 mb-8 sm:mb-10">
              <span className="text-2xl sm:text-3xl font-black text-brand-violet">{formatPrice(product.price[currency], currency)}</span>
              <span className="text-xs sm:text-sm font-bold text-obsidian/40 border-l border-obsidian/10 pl-4 uppercase tracking-widest">SKU: {product.sku}</span>
            </div>

            {/* Size Selector Matrix */}
            <div className="space-y-4 mb-8 sm:mb-12">
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-obsidian/60 flex justify-between">
                <span>Select Size</span>
                <button className="text-brand-violet hover:underline">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold transition-all border text-sm",
                      selectedSize === size 
                        ? "bg-[#18161B] text-white shadow-[inset_0_4px_8px_rgba(0,0,0,0.5)] scale-95 border-[#18161B]" 
                        : "bg-white text-gray-900 border-gray-200 hover:border-brand-violet"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* S2: Tactile Action Panel (Fixed on mobile) */}
            <div className="fixed bottom-[calc(64px+env(safe-area-inset-bottom))] left-0 right-0 p-4 bg-white/95 backdrop-blur-md shadow-[0_-10px_40px_rgba(0,0,0,0.1)] lg:static lg:bg-transparent lg:p-0 lg:shadow-none z-50 flex flex-col gap-3 lg:gap-4 mt-2 lg:mb-12 border-t border-obsidian/10 lg:border-0 rounded-t-3xl lg:rounded-none">
              <motion.button 
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full bg-[#7A5AF8] hover:bg-[#6042d6] text-white py-4 sm:py-5 rounded-squircle sm:rounded-[28px] text-sm sm:text-lg font-bold flex items-center justify-center gap-2 transition-colors shadow-tactile-inset"
              >
                <ShoppingBag className="w-5 h-5" /> ADD TO BAG
              </motion.button>
              
              <motion.button 
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppOrder}
                className="w-full bg-white text-gray-900 border-2 border-[#18161B] py-4 sm:py-5 rounded-squircle sm:rounded-[28px] text-sm sm:text-lg font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" /> ORDER VIA WHATSAPP
              </motion.button>
            </div>

            {/* S5: Accordion Details */}
            <div className="mt-8 border-t border-obsidian/10 pb-8 lg:pb-0">
              <details className="group py-4 border-b border-obsidian/10">
                <summary className="flex justify-between items-center font-bold cursor-pointer list-none text-xs sm:text-sm uppercase tracking-wider text-obsidian">
                  Shipping & Returns
                  <Plus className="w-4 h-4 group-open:rotate-45 transition-transform" />
                </summary>
                <p className="pt-4 text-xs sm:text-sm text-obsidian/70 font-medium leading-relaxed">
                  Complimentary DHL Express shipping on orders over $200. Returns accepted within 14 days of delivery.
                </p>
              </details>
              <details className="group py-4 border-b border-obsidian/10">
                <summary className="flex justify-between items-center font-bold cursor-pointer list-none text-xs sm:text-sm uppercase tracking-wider text-obsidian">
                  Fabric & Care
                  <Plus className="w-4 h-4 group-open:rotate-45 transition-transform" />
                </summary>
                <p className="pt-4 text-xs sm:text-sm text-obsidian/70 font-medium leading-relaxed">
                  Dry clean only. Do not bleach. Cool iron inside out. Handle this luxury imported garment with care.
                </p>
              </details>
            </div>
          </div>
        </div>

        {/* S4: Complete The Look */}
        <div className="mt-16 sm:mt-24 border-t border-obsidian/5 pt-12">
          <h3 className="font-black text-xl sm:text-2xl uppercase tracking-wider mb-6 sm:mb-8 text-obsidian">Complete The Look</h3>
          <div className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
            {crossSells.map((cross) => (
              <Link 
                key={cross.sku} 
                to={`/product/${cross.sku}`} 
                className="min-w-[60vw] sm:min-w-[280px] snap-center bg-white rounded-[20px] sm:rounded-squircle overflow-hidden group relative p-3 sm:p-4 border border-obsidian/5 shadow-sm shrink-0 block"
              >
                <div className="relative aspect-[3/4] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-silk-cream mb-3 sm:mb-4">
                  <img referrerPolicy="no-referrer" src={cross.imageMain} alt={cross.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="text-center px-1">
                  <h3 className="text-sm font-bold text-obsidian leading-tight truncate mb-1">{cross.title}</h3>
                  <p className="text-brand-violet font-black text-sm">{formatPrice(cross.price[currency], currency)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Currency } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

function MagneticLogo({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <Link 
        to="/" 
        ref={ref} 
        onMouseMove={handleMouse} 
        onMouseLeave={reset}
        className="text-2xl font-black tracking-tighter uppercase p-2 block"
      >
        {children}
      </Link>
    </motion.div>
  );
}

export default function GlobalNav() {
  const { currency, setCurrency, cartCount, setIsCartOpen } = useStore();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { label: 'Women', href: '/shop/women' },
    { label: 'Men', href: '/shop/men' },
    { label: 'Kids', href: '/shop/kids' },
    { label: 'Accessories', href: '/shop/accessories' },
    { label: 'The Edit', href: '/editorial', highlight: false },
    { label: 'VIP Vault', href: '/vault', highlight: true }
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-silk-cream/70 backdrop-blur-xl border-b border-obsidian/5">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left: Magnetic Logo */}
          <div className="flex-1 flex justify-start items-center gap-4">
            <button 
              className="lg:hidden p-2 -ml-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6 text-obsidian" />
            </button>
            <MagneticLogo>Kiekies</MagneticLogo>
          </div>

          {/* Center: Department Links */}
          <nav className="hidden lg:flex flex-1 justify-center gap-8 items-center">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href || (location.pathname.startsWith('/shop/') && link.href.includes(location.pathname));
              return (
                <Link 
                  key={link.label}
                  to={link.href} 
                  className={`text-sm font-bold uppercase tracking-wider transition-all relative group flex items-center gap-2 ${link.highlight ? 'text-brand-violet' : (isActive ? 'text-brand-violet' : 'text-obsidian/70 hover:text-brand-violet')}`}
                >
                  {link.label}
                  {link.highlight && <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-violet opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-brand-violet"></span></span>}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-violet transition-all ${isActive && !link.highlight ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Currency & Cart */}
          <div className="flex-1 flex justify-end items-center gap-4 sm:gap-6">
            <div className="relative group hidden sm:block">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="appearance-none bg-transparent border-none text-sm font-bold text-obsidian outline-none cursor-pointer pr-4 hover:text-brand-violet transition-colors"
              >
                <option value="NGN">₦ NGN</option>
                <option value="USD">$ USD</option>
                <option value="GBP">£ GBP</option>
              </select>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-xs font-bold opacity-50">▼</div>
            </div>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-obsidian/5 rounded-full transition-colors group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:text-brand-violet transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brand-violet rounded-full border-2 border-silk-cream"></span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 z-[100] bg-silk-cream flex flex-col"
          >
            <div className="px-4 h-16 flex items-center justify-between border-b border-obsidian/5">
              <div className="text-2xl font-black tracking-tighter uppercase p-2 block">Kiekies</div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X className="w-8 h-8 text-obsidian" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-12 flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link 
                    to={link.href} 
                    className={`text-4xl font-black uppercase tracking-tighter flex items-center gap-4 ${location.pathname === link.href ? 'text-brand-violet' : 'text-obsidian'}`}
                  >
                    {link.label}
                    {link.highlight && <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-violet opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-brand-violet"></span></span>}
                  </Link>
                </motion.div>
              ))}
              
              <div className="mt-8 pt-8 border-t border-obsidian/10 flex flex-col gap-6">
                <Link to="/tracking" className="text-xl font-bold uppercase tracking-wider text-obsidian/70">Order Tracking</Link>
                <Link to="/sourcing" className="text-xl font-bold uppercase tracking-wider text-obsidian/70">Provenance & Sourcing</Link>
                
                <div className="relative group w-max mt-4">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as Currency)}
                    className="appearance-none bg-transparent border-b-2 border-brand-violet text-xl font-bold text-obsidian outline-none cursor-pointer pr-6 pb-1"
                  >
                    <option value="NGN">₦ NGN (Naira)</option>
                    <option value="USD">$ USD (Dollars)</option>
                    <option value="GBP">£ GBP (Pounds)</option>
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-sm font-bold text-brand-violet">▼</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

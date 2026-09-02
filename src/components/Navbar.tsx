import { Search, User, ShoppingBag, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Currency } from '../types';

export default function Navbar() {
  const { currency, setCurrency, cartCount } = useStore();

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-charcoal/5">
      <div className="bg-brand-charcoal text-white text-xs font-medium py-2 px-4 flex justify-between items-center text-center">
        <span className="hidden sm:inline-block w-1/3 text-left">Worldwide DHL Delivery</span>
        <span className="w-full sm:w-1/3 text-center">Live Drop #14</span>
        <span className="hidden sm:inline-block w-1/3 text-right text-brand-amber">Direct WhatsApp Concierge</span>
      </div>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold tracking-tighter uppercase">
            Kiekies
          </Link>
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link to="#" className="hover:text-brand-violet transition-colors">New In</Link>
            <Link to="#" className="hover:text-brand-violet transition-colors">Women</Link>
            <Link to="#" className="hover:text-brand-violet transition-colors">Men</Link>
            <Link to="#" className="hover:text-brand-violet transition-colors">Kids</Link>
            <Link to="#" className="text-red-500 hover:text-red-600 transition-colors">Sale</Link>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden sm:flex items-center gap-2 text-sm font-medium bg-brand-charcoal/5 px-2 py-1 rounded-md">
            <Globe className="w-4 h-4 text-brand-charcoal/60" />
            <select 
              className="bg-transparent border-none outline-none cursor-pointer pr-1"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
            >
              <option value="NGN">NGN ₦</option>
              <option value="USD">USD $</option>
              <option value="GBP">GBP £</option>
            </select>
          </div>
          <button className="p-2 hover:bg-brand-charcoal/5 rounded-full transition-colors"><Search className="w-5 h-5" /></button>
          <button className="hidden sm:block p-2 hover:bg-brand-charcoal/5 rounded-full transition-colors"><User className="w-5 h-5" /></button>
          <button className="p-2 hover:bg-brand-charcoal/5 rounded-full transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand-violet text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

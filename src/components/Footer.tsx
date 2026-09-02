import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-obsidian text-white pt-20 pb-[calc(100px+env(safe-area-inset-bottom))] md:pb-12 px-6 md:px-12 rounded-t-[40px] mt-12 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="md:col-span-2">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-brand-violet mb-4">KIEKIES.</h2>
          <p className="text-gray-400 max-w-sm text-lg">Premium imported fashion, curated for global citizens. Define your style.</p>
          
          {/* Newsletter Input */}
          <div className="mt-8 flex items-center bg-white/10 rounded-full p-2 max-w-sm border border-white/20">
            <input 
              type="email" 
              placeholder="Join the VIP Drop List..." 
              className="bg-transparent border-none outline-none text-white px-4 w-full placeholder-gray-500"
            />
            <button className="bg-brand-violet text-white px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform">
              JOIN
            </button>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col gap-4">
          <h4 className="text-brand-violet font-bold uppercase text-sm tracking-widest mb-2">Shop & Source</h4>
          <Link to="/shop/women" className="text-gray-400 hover:text-white transition-colors">Women's Salon</Link>
          <Link to="/shop/men" className="text-gray-400 hover:text-white transition-colors">Men's Atelier</Link>
          <Link to="/shop/kids" className="text-gray-400 hover:text-white transition-colors">Kids' Pavilion</Link>
          <Link to="/sourcing" className="text-gray-400 hover:text-white transition-colors">Import Provenance</Link>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col gap-4">
          <h4 className="text-brand-violet font-bold uppercase text-sm tracking-widest mb-2">Client Services</h4>
          <Link to="/tracking" className="text-gray-400 hover:text-white transition-colors">Worldwide Delivery</Link>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">WhatsApp Concierge</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Returns & Exchanges</a>
          <div className="mt-2 text-sm font-bold bg-white/10 w-max px-3 py-1 rounded-md text-gray-300">
            Currency: NGN (₦)
          </div>
        </div>

      </div>

      {/* Agency Signature Bottom Bar */}
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4 max-w-[1600px] mx-auto">
        <p>© {new Date().getFullYear()} Kiekies Fashion World. All rights reserved.</p>
        <p className="group cursor-pointer">
          ARCHITECTED BY <span className="font-bold text-gray-300 group-hover:text-brand-violet transition-colors">JUNE STUDIO</span>
        </p>
      </div>
    </footer>
  );
}

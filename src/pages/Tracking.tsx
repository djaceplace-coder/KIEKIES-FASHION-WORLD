import React, { useState } from 'react';
import { Package, Truck, CheckCircle2, ChevronRight, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Tracking() {
  const [isTracking, setIsTracking] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber) setIsTracking(true);
  };

  return (
    <div className="min-h-screen bg-silk-cream pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
      <div className="w-full max-w-xl text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-obsidian uppercase tracking-tighter mb-4">Track Shipment</h1>
        <p className="text-obsidian/60 font-medium text-sm md:text-base">Enter your order details to track your package's worldwide journey.</p>
      </div>

      <div className="w-full max-w-xl bg-white rounded-[32px] p-6 sm:p-10 shadow-sm border border-obsidian/5">
        <form onSubmit={handleTrack} className="flex flex-col gap-4 mb-8">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-obsidian/50 mb-2">Order Number</label>
            <input 
              type="text" 
              placeholder="e.g. KFW-98245" 
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="w-full bg-silk-cream border border-obsidian/10 rounded-2xl px-4 py-3 text-sm font-bold text-obsidian outline-none focus:border-brand-violet transition-colors placeholder:font-normal placeholder:text-obsidian/30"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-obsidian/50 mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="Email used for order" 
              className="w-full bg-silk-cream border border-obsidian/10 rounded-2xl px-4 py-3 text-sm font-bold text-obsidian outline-none focus:border-brand-violet transition-colors placeholder:font-normal placeholder:text-obsidian/30"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-brand-violet text-white font-bold py-4 rounded-2xl mt-2 flex items-center justify-center gap-2 shadow-tactile-inset hover:brightness-110 active:scale-[0.98] transition-all"
          >
            <Search className="w-4 h-4" /> Track Order
          </button>
        </form>

        <AnimatePresence>
          {isTracking && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="border-t border-obsidian/10 pt-8"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-obsidian/50 mb-1">Status</div>
                  <div className="text-lg font-black text-brand-violet uppercase">In Transit</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-obsidian/50 mb-1">Carrier</div>
                  <div className="text-sm font-bold text-obsidian">DHL Express</div>
                </div>
              </div>

              {/* Vertical Progress Tracker */}
              <div className="relative pl-6 space-y-8">
                {/* Tracker Line Background */}
                <div className="absolute left-[11px] top-2 bottom-6 w-0.5 bg-obsidian/5 rounded-full"></div>
                {/* Tracker Line Active (Progress) */}
                <div className="absolute left-[11px] top-2 h-[60%] w-0.5 bg-brand-violet rounded-full"></div>

                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-6 w-6 h-6 bg-brand-violet text-white rounded-full flex items-center justify-center shadow-[0_0_0_4px_white]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-obsidian">Order Processed</h4>
                  <p className="text-xs font-medium text-obsidian/50 mt-1">Lagos Hub, Nigeria • {new Date(Date.now() - 86400000 * 3).toLocaleDateString()}</p>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-6 w-6 h-6 bg-brand-violet text-white rounded-full flex items-center justify-center shadow-[0_0_0_4px_white]">
                    <Package className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-obsidian">Shipped & Exported</h4>
                  <p className="text-xs font-medium text-obsidian/50 mt-1">Murtala Muhammed Int. Airport • {new Date(Date.now() - 86400000 * 2).toLocaleDateString()}</p>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-[27px] w-7 h-7 bg-white border-2 border-brand-violet rounded-full flex items-center justify-center shadow-[0_0_0_4px_white] z-10">
                    <div className="w-2.5 h-2.5 bg-brand-violet rounded-full animate-pulse"></div>
                  </div>
                  <h4 className="text-sm font-bold text-brand-violet">In Transit (Current)</h4>
                  <p className="text-xs font-medium text-obsidian/50 mt-1">Customs Clearance, London Heathrow • {new Date(Date.now() - 86400000 * 1).toLocaleDateString()}</p>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <div className="absolute -left-6 w-6 h-6 bg-silk-cream border border-obsidian/20 rounded-full flex items-center justify-center shadow-[0_0_0_4px_white]">
                  </div>
                  <h4 className="text-sm font-bold text-obsidian/40">Delivered</h4>
                  <p className="text-xs font-medium text-obsidian/40 mt-1">Pending Destination Scan</p>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

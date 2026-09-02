import { Play, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const REELS = [
  { id: 1, image: 'https://picsum.photos/seed/kiekies_16/800/1000', items: 2 },
  { id: 2, image: 'https://picsum.photos/seed/kiekies_17/800/1000', items: 1 },
  { id: 3, image: 'https://picsum.photos/seed/kiekies_18/800/1000', items: 3 },
  { id: 4, image: 'https://picsum.photos/seed/kiekies_19/800/1000', items: 2 },
  { id: 5, image: 'https://picsum.photos/seed/kiekies_20/800/1000', items: 4 },
];

export default function EditorialReel() {
  return (
    <section className="bg-obsidian py-16 sm:py-24 my-12 overflow-hidden relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
          <div className="sticky left-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2 md:mb-4">Shop The Look</h2>
            <p className="text-silk-cream/60 max-w-md text-sm sm:text-base">Real styling from our global community. Swipe to explore, click to shop the curated items.</p>
          </div>
          <Link to="/editorial" className="hidden md:flex items-center gap-2 text-white font-bold hover:text-brand-violet transition-colors">
            View All Runway <div className="w-8 h-[2px] bg-current"></div>
          </Link>
        </div>

      </div>

      {/* Full Bleed Scroller */}
      <div className="flex gap-4 sm:gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-8 hide-scrollbar snap-x snap-mandatory relative z-20">
        {REELS.map((reel) => (
          <Link key={reel.id} to="/editorial" className="snap-center">
            <motion.div 
              className="relative min-w-[75vw] sm:min-w-[280px] md:min-w-[320px] aspect-[9/16] rounded-squircle overflow-hidden bg-[#1C1A20] cursor-pointer group flex-shrink-0 border border-white/10"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img referrerPolicy="no-referrer" src={reel.image} alt="Look" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white ml-1" />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between">
                <div className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold border border-white/20 flex items-center gap-2 hover:bg-brand-violet hover:border-brand-violet transition-colors">
                  <ShoppingBag className="w-3 h-3" /> {reel.items} Items
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}

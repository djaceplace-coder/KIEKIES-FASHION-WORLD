import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TILES = [
  { id: 1, title: "Women's Ready-to-Wear", subtitle: "Explore Collection", to: "/shop/women", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Men's Atelier", subtitle: "Explore Collection", to: "/shop/men", img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Kids' Pavilion", subtitle: "Explore Collection", to: "/shop/kids", img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "Import Sourcing & Provenance", subtitle: "Our Story", to: "/sourcing", img: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: "Worldwide Delivery Tracker", subtitle: "DHL Global", to: "/tracking", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "Care & Tailoring Guide", subtitle: "Garment Care", to: "/sourcing", img: "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?auto=format&fit=crop&q=80&w=800" },
  { id: 7, title: "WhatsApp Personal Shopper", subtitle: "Direct Concierge", to: "#", img: "https://images.unsplash.com/photo-1596526131083-e8c638c47006?auto=format&fit=crop&q=80&w=800" },
  { id: 8, title: "VIP Drop List", subtitle: "Join Waitlist", to: "/vault", img: "https://images.unsplash.com/photo-1550614000-4b95d466f914?auto=format&fit=crop&q=80&w=800" },
  { id: 9, title: "Editorial Lookbook", subtitle: "Volume 14", to: "/editorial", img: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=800" },
];

export default function TactileHub() {
  return (
    <section className="bg-obsidian py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4">Client Services & Collections</h2>
          <p className="text-silk-cream/50 max-w-2xl mx-auto">Immerse yourself in our world. From deep provenance to global tracking.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TILES.map((tile) => (
            <Link
              key={tile.id}
              to={tile.to}
              className="relative bg-[#1C1A20] rounded-[32px] p-8 text-left border border-white/5 overflow-hidden group flex flex-col justify-between aspect-square md:aspect-auto md:h-[320px] shadow-tactile-inset hover:brightness-110 active:scale-95 transition-all duration-300"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <img referrerPolicy="no-referrer" src={tile.img} alt={tile.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/20 group-hover:via-obsidian/40 transition-colors duration-300"></div>
              </div>
              
              <div className="flex justify-between items-start relative z-10">
                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-brand-violet group-hover:border-brand-violet transition-colors duration-300">
                  <ArrowUpRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                </div>
              </div>

              <div className="relative z-10 mt-auto pointer-events-none">
                <div className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2 drop-shadow-md">{tile.subtitle}</div>
                <h3 className="text-white text-2xl sm:text-3xl font-black leading-tight drop-shadow-lg">{tile.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

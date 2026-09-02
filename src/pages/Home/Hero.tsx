import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    const chars = textRef.current.querySelectorAll('.char');
    gsap.fromTo(chars, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.8, ease: "power4.out" }
    );
  }, []);

  const headline = "Define Your STYLE — Own Your WORLD";

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto overflow-visible">
      {/* Violet Bento Container */}
      <div className="bg-brand-violet rounded-squircle px-8 sm:px-12 pt-12 pb-0 relative flex flex-col lg:flex-row items-end min-h-[500px]">
        
        {/* Left: Typography */}
        <div className="w-full lg:w-1/2 pb-12 lg:pb-24 relative z-30">
          <h1 ref={textRef} className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] flex flex-wrap gap-x-3 gap-y-2">
            {headline.split(' ').map((word, i) => (
              <span key={i} className="inline-block overflow-hidden">
                {word.split('').map((char, j) => (
                  <span key={j} className="char inline-block">{char}</span>
                ))}
              </span>
            ))}
          </h1>
        </div>

        {/* Right: Breakout Model Image */}
        <div className="w-full lg:w-1/2 relative flex justify-end h-full">
          {/* Negative top margin and z-index for breakout effect */}
          <div className="relative -mt-24 lg:-mt-32 w-full max-w-[500px] z-20">
            <img referrerPolicy="no-referrer" 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" 
              alt="Model" 
              className="w-full h-auto object-contain drop-shadow-2xl mix-blend-plus-lighter pointer-events-none"
            />
          </div>
          
          {/* Floating White Squircle Card */}
          <div className="absolute right-0 lg:-right-8 bottom-4 lg:bottom-16 bg-white rounded-squircle p-3 sm:p-5 shadow-2xl z-30 w-40 sm:w-56 flex flex-col gap-2 sm:gap-3 scale-90 sm:scale-100 origin-bottom-right">
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-silk-cream relative">
              <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400" alt="Silk Set" className="w-full h-full object-cover" />
              <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-obsidian text-white text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full tracking-wider uppercase">
                New
              </div>
            </div>
            <div>
              <div className="text-[10px] sm:text-xs font-bold text-obsidian/60 uppercase leading-none mb-1">Imported Silk</div>
              <div className="text-sm sm:text-lg font-black text-brand-violet leading-none">₦85,000 <span className="text-[10px] sm:text-xs text-obsidian/40 hidden sm:inline">/ $65</span></div>
            </div>
            <Link to="/product/KFW-2601-LILAC" className="w-full bg-obsidian text-white rounded-xl py-2 sm:py-3 text-[10px] sm:text-sm font-bold flex items-center justify-center gap-1 sm:gap-2 hover:bg-black transition-colors">
              Explore <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

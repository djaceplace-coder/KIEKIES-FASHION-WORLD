import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function GlobalSourcingMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const path3Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const paths = [path1Ref.current, path2Ref.current, path3Ref.current].filter(Boolean);
    
    paths.forEach((path) => {
      if (!path) return;
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mapRef.current,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 1, // Smooth scrub animation tied to scroll position
      },
    });

    paths.forEach((path) => {
      if (path) {
        tl.to(path, { strokeDashoffset: 0, duration: 1, ease: 'none' }, 0);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="bg-silk-cream py-16 sm:py-24 overflow-hidden" ref={mapRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-obsidian tracking-tighter uppercase mb-4">
            Curated For Global Citizens
          </h2>
          <p className="text-obsidian/60 max-w-2xl mx-auto text-sm sm:text-base font-medium">
            From the ateliers of Milan, London, and Tokyo directly to our Lagos hub. Hand-inspected and shipped worldwide.
          </p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] sm:aspect-[21/9] bg-[#F4F4F5] rounded-squircle shadow-inner border border-obsidian/5 flex items-center justify-center p-4">
          
          {/* Conceptual SVG Map Connections */}
          <svg className="absolute inset-0 w-full h-full z-10 drop-shadow-md" preserveAspectRatio="none" viewBox="0 0 1000 400">
            {/* Path 1: London to Lagos */}
            <path ref={path1Ref} d="M 450 150 Q 420 250 480 320" fill="none" stroke="#7A5AF8" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 5" />
            
            {/* Path 2: Milan to Lagos */}
            <path ref={path2Ref} d="M 520 160 Q 550 250 480 320" fill="none" stroke="#7A5AF8" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 5" />
            
            {/* Path 3: Tokyo to Lagos */}
            <path ref={path3Ref} d="M 850 180 Q 700 350 480 320" fill="none" stroke="#7A5AF8" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 5" />
          </svg>

          {/* Nodes */}
          <div className="absolute inset-0 z-20">
            {/* London */}
            <motion.div className="absolute top-[35%] left-[44%] flex flex-col items-center -translate-x-1/2 -translate-y-1/2" whileHover={{ scale: 1.1 }}>
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-obsidian rounded-full border-2 border-white shadow-md"></div>
              <span className="text-[10px] sm:text-xs font-bold text-obsidian mt-1 uppercase tracking-widest bg-white/80 px-2 rounded-full backdrop-blur-sm">London</span>
            </motion.div>

            {/* Milan */}
            <motion.div className="absolute top-[38%] left-[53%] flex flex-col items-center -translate-x-1/2 -translate-y-1/2" whileHover={{ scale: 1.1 }}>
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-obsidian rounded-full border-2 border-white shadow-md"></div>
              <span className="text-[10px] sm:text-xs font-bold text-obsidian mt-1 uppercase tracking-widest bg-white/80 px-2 rounded-full backdrop-blur-sm">Milan</span>
            </motion.div>

            {/* Tokyo */}
            <motion.div className="absolute top-[42%] left-[86%] flex flex-col items-center -translate-x-1/2 -translate-y-1/2 hidden sm:flex" whileHover={{ scale: 1.1 }}>
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-obsidian rounded-full border-2 border-white shadow-md"></div>
              <span className="text-[10px] sm:text-xs font-bold text-obsidian mt-1 uppercase tracking-widest bg-white/80 px-2 rounded-full backdrop-blur-sm">Tokyo</span>
            </motion.div>

            {/* Lagos Hub (Destination) */}
            <motion.div className="absolute top-[80%] left-[48%] flex flex-col items-center -translate-x-1/2 -translate-y-1/2" 
              animate={{ y: [0, -5, 0] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-brand-violet rounded-full border-4 border-white shadow-tactile-inset flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full animate-ping bg-brand-violet opacity-30"></div>
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="text-[10px] sm:text-xs font-black text-brand-violet mt-2 uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm">Lagos Hub</span>
            </motion.div>
          </div>
          
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-10 pointer-events-none rounded-squircle mix-blend-overlay"></div>

        </div>
      </div>
    </section>
  );
}

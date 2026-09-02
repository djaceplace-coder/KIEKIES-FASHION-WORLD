import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, Anchor, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Sourcing() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current || !lineRef.current) return;
    
    ScrollTrigger.getAll().forEach(t => t.kill());

    gsap.fromTo(lineRef.current, 
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 50%',
          end: 'bottom 80%',
          scrub: true,
        }
      }
    );

    const nodes = gsap.utils.toArray('.timeline-node', timelineRef.current);
    nodes.forEach((node: any) => {
      gsap.fromTo(node,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: node,
            start: 'top 80%',
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-obsidian text-white pt-24 pb-32">
      
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
        <div className="inline-flex items-center gap-2 bg-brand-violet/20 text-brand-violet px-4 py-2 rounded-full text-sm font-bold tracking-wider mb-8 shadow-tactile-inset">
          <ShieldCheck className="w-4 h-4" /> Import Provenance
        </div>
        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-tight text-brand-violet">THE SOURCING JOURNEY</h1>
        <p className="text-lg md:text-2xl text-silk-cream/60 font-medium">Uncompromising quality. Globally sourced. Locally authenticated.</p>
      </div>

      {/* Editorial Timeline */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={timelineRef}>
        
        {/* The GSAP Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 rounded-full origin-top transform-gpu translate-x-[-50%]"></div>
        <div ref={lineRef} className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-brand-violet rounded-full origin-top transform-gpu translate-x-[-50%] scale-y-0"></div>

        <div className="space-y-24">
          
          {/* Section 1: The Selection */}
          <div className="timeline-node relative flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="absolute left-6 md:left-1/2 w-6 h-6 bg-obsidian border-4 border-brand-violet rounded-full translate-x-[-50%] z-10 shadow-[0_0_15px_rgba(122,90,248,0.5)]"></div>
            
            <div className="w-full md:w-1/2 pl-16 md:pl-0 md:text-right">
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4 text-brand-violet">1. The Selection</h2>
              <h3 className="text-xl font-bold mb-4 text-white">Milan, Paris, London, Tokyo</h3>
              <p className="text-silk-cream/70 leading-relaxed font-medium">Our buyers travel to the fashion capitals of the world, building relationships with legacy ateliers and avant-garde streetwear houses. We select only fabrics that pass our stringent visual and tactile tests.</p>
            </div>
            
            <div className="w-full md:w-1/2 pl-16 md:pl-0">
              <div className="bg-[#1C1A20] p-4 rounded-squircle shadow-tactile-inset border border-white/5 relative group overflow-hidden">
                <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800" alt="Selection" className="w-full aspect-[4/3] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-brand-violet/20 mix-blend-overlay"></div>
              </div>
            </div>
          </div>

          {/* Section 2: The Import Process */}
          <div className="timeline-node relative flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
            <div className="absolute left-6 md:left-1/2 w-6 h-6 bg-obsidian border-4 border-brand-violet rounded-full translate-x-[-50%] z-10 shadow-[0_0_15px_rgba(122,90,248,0.5)]"></div>
            
            <div className="w-full md:w-1/2 pl-16 md:pl-0 text-left">
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4 text-brand-violet">2. The Import</h2>
              <h3 className="text-xl font-bold mb-4 text-white">Secure Transit</h3>
              <p className="text-silk-cream/70 leading-relaxed font-medium">Every curated piece is professionally packed in climate-controlled environments and shipped via premium logistics partners directly to our Nigerian hub, ensuring pristine condition upon arrival.</p>
            </div>
            
            <div className="w-full md:w-1/2 pl-16 md:pl-0">
              <div className="bg-[#1C1A20] p-4 rounded-squircle shadow-tactile-inset border border-white/5 relative group overflow-hidden">
                <div className="absolute top-8 left-8 z-20 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                  <Anchor className="w-8 h-8 text-brand-violet mb-2" />
                  <div className="text-xs font-bold uppercase tracking-widest text-white">Logistics Secured</div>
                </div>
                <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1586528116311-ad8ed7c1590e?auto=format&fit=crop&q=80&w=800" alt="Import Logistics" className="w-full aspect-[4/3] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>

          {/* Section 3: Quality Check */}
          <div className="timeline-node relative flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="absolute left-6 md:left-1/2 w-6 h-6 bg-brand-violet border-4 border-white rounded-full translate-x-[-50%] z-10 shadow-[0_0_20px_rgba(255,255,255,0.8)]"></div>
            
            <div className="w-full md:w-1/2 pl-16 md:pl-0 md:text-right">
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4 text-white">3. Quality Check</h2>
              <h3 className="text-xl font-bold mb-4 text-brand-violet">Lagos Hub Authenticated</h3>
              <p className="text-silk-cream/70 leading-relaxed font-medium">Upon arrival in Lagos, our master tailors and quality control experts inspect every seam, button, and fabric weave. Only pieces that score a perfect 100 on our rubric are tagged with our Authenticity Seal and released for drop.</p>
            </div>
            
            <div className="w-full md:w-1/2 pl-16 md:pl-0">
              <div className="bg-[#1C1A20] p-4 rounded-squircle shadow-tactile-inset border border-white/5 relative group overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="bg-brand-violet/90 backdrop-blur-md p-6 rounded-full border-4 border-white/20 flex flex-col items-center justify-center shadow-2xl"
                  >
                    <CheckCircle className="w-12 h-12 text-white mb-2" />
                    <span className="text-white font-black text-xs uppercase tracking-widest text-center">Verified<br/>Authentic</span>
                  </motion.div>
                </div>
                <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&q=80&w=800" alt="Quality Check" className="w-full aspect-[4/3] object-cover rounded-2xl opacity-60 group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

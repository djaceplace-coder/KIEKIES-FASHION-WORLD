import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const LOOKS = [
  {
    id: 1,
    title: 'Lagos Nights in Lilac',
    category: 'Style Guide',
    image: 'https://picsum.photos/seed/kiekies_13/800/1000',
    desc: 'How to transition the Milan Silk set from a daytime brunch to an evening gala.',
    sku: 'KFW-2601-LILAC'
  },
  {
    id: 2,
    title: 'The Brutalist Tailor',
    category: 'Men’s Atelier',
    image: 'https://picsum.photos/seed/kiekies_14/800/1000',
    desc: 'Sharp edges, Obsidian tones. Discover the architecture of the new Men’s suit.',
    sku: 'KMW-1002-OBSIDIAN'
  },
  {
    id: 3,
    title: 'Playground to Palace',
    category: 'Kids’ Edit',
    image: 'https://picsum.photos/seed/kiekies_15/800/1000',
    desc: 'Durability meets luxury. The fabrics defining the new children’s collection.',
    sku: 'KKW-304-CREAM'
  }
];

export default function Editorial() {
  return (
    <div className="bg-silk-cream min-h-screen pt-24 pb-32 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-16 md:mb-24 text-center md:text-left">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-obsidian mb-6">The Edit.</h1>
          <p className="text-xl md:text-3xl font-medium text-obsidian/60 max-w-3xl">
            Shoppable lookbooks, style guides, and the stories behind the world’s finest fabrics.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {LOOKS.map((look, i) => (
            <motion.article 
              key={look.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[32px] mb-6">
                <img referrerPolicy="no-referrer" 
                  src={look.image} 
                  alt={look.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-obsidian">
                  {look.category}
                </div>
              </div>
              <h2 className="text-3xl font-black text-obsidian mb-3 leading-tight">{look.title}</h2>
              <p className="text-obsidian/70 font-medium mb-6 flex-1">{look.desc}</p>
              
              <Link 
                to={`/product/${look.sku}`}
                className="inline-flex items-center gap-2 text-brand-violet font-bold uppercase tracking-wider group-hover:gap-4 transition-all"
              >
                Shop The Look <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

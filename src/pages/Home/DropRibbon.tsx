import { Flame, Star, Package, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function DropRibbon() {
  const pills = [
    { id: 'trending', label: 'Trending Now', icon: <Flame className="w-4 h-4" />, to: '/trending' },
    { id: 'bestsellers', label: 'Best Sellers', icon: <Star className="w-4 h-4" />, to: '/bestsellers' },
    { id: 'new', label: 'New Arrivals', icon: <Package className="w-4 h-4" />, to: '/new-arrivals' },
    { id: 'delivery', label: 'Fast Delivery', icon: <Truck className="w-4 h-4" />, to: '/tracking' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex overflow-x-auto snap-x snap-mandatory flex-nowrap hide-scrollbar gap-4 px-4 sm:px-6 lg:px-8 pb-4">
        {pills.map((pill) => (
          <Link
            key={pill.id}
            to={pill.to}
            className="flex-1 snap-center flex items-center justify-center gap-2 py-4 px-6 rounded-squircle text-sm font-bold bg-white text-obsidian shadow-sm hover:shadow-md transition-shadow border border-obsidian/5 whitespace-nowrap min-w-[200px] sm:min-w-[160px] active:scale-95 hover:-translate-y-1 transform duration-200"
          >
            {pill.icon}
            {pill.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

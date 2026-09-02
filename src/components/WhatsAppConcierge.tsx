import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhatsAppConcierge() {
  const handleClick = () => {
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent("Hello Kiekies Fashion World! I need assistance with an order.")}`, '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-tactile-inset flex items-center justify-center group"
      aria-label="WhatsApp Concierge"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-full mr-4 bg-obsidian text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with Concierge
      </span>
    </motion.button>
  );
}

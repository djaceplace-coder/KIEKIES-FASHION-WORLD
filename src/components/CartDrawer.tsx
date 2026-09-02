import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../data/mockData';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, currency } = useStore();

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price[currency] * item.quantity), 0);

  const checkoutViaWhatsApp = () => {
    let message = `*NEW ORDER - Kiekies Fashion World*\n\n`;
    cart.forEach(item => {
      message += `- ${item.product.title} (SKU: ${item.product.sku}) | Size: ${item.size} | Qty: ${item.quantity} | ${formatPrice(item.product.price[currency], currency)}\n`;
    });
    message += `\n*Total: ${formatPrice(cartTotal, currency)}*\n\nPlease confirm availability and payment details.`;
    
    // Defaulting to a placeholder phone number from the prompt
    window.open(`https://wa.me/234XXXXXXXXXX?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handlePaystackCheckout = async () => {
    const email = window.prompt("Please enter your email address for the order receipt:");
    if (!email) return;

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems: cart,
          currency: currency,
          email: email,
        }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Checkout failed');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Checkout service is currently unavailable.');
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-obsidian/60 backdrop-blur-sm z-50 transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-silk-cream z-50 shadow-2xl flex flex-col"
          >
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
              <h2 className="text-2xl font-black uppercase">Your Bag ({cart.reduce((acc, item) => acc + item.quantity, 0)})</h2>
              <button onClick={() => setIsCartOpen(false)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                ✕
              </button>
            </div>

            {/* Free Shipping Progress */}
            {cartTotal > 0 && (
              <div className="bg-brand-violet/10 p-4 text-center text-sm font-bold text-brand-violet">
                {currency === 'NGN' && cartTotal < 250000 
                  ? `You are ${formatPrice(250000 - cartTotal, 'NGN')} away from Free Worldwide DHL Delivery.`
                  : 'You have unlocked Free Worldwide DHL Delivery!'}
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center text-obsidian/50 font-medium mt-12">
                  Your bag is empty.
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-24 h-32 bg-gray-200 rounded-xl overflow-hidden relative shrink-0">
                      <img referrerPolicy="no-referrer" src={item.product.imageMain} alt={item.product.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 leading-tight">{item.product.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">Size: {item.size} | Qty: {item.quantity}</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <p className="font-bold text-brand-violet">{formatPrice(item.product.price[currency] * item.quantity, currency)}</p>
                        <button className="text-xs font-bold text-gray-400 hover:text-red-500 uppercase transition-colors">Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Checkout Actions */}
            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-gray-200 pb-[calc(24px+env(safe-area-inset-bottom))]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold">Subtotal</span>
                  <span className="text-2xl font-black">{formatPrice(cartTotal, currency)}</span>
                </div>
                
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handlePaystackCheckout}
                    className="w-full bg-brand-violet text-white py-4 rounded-squircle font-bold text-lg hover:brightness-110 active:scale-95 transition-all"
                  >
                    SECURE CHECKOUT
                  </button>
                  <button 
                    onClick={checkoutViaWhatsApp}
                    className="w-full bg-obsidian text-white shadow-tactile-inset py-4 rounded-squircle font-bold text-lg hover:brightness-110 active:scale-95 transition-all"
                  >
                    ORDER VIA WHATSAPP
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

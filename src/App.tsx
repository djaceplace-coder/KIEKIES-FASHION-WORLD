import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalNav from './components/GlobalNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Shop from './pages/Shop';
import WhatsAppConcierge from './components/WhatsAppConcierge';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from './components/ScrollToTop';
import { StoreProvider } from './context/StoreContext';
import Lenis from 'lenis';

function AppLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-silk-cream">
      <GlobalNav />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppConcierge />
      <CartDrawer />
      <ScrollToTop />
    </div>
  );
}

import Sourcing from './pages/Sourcing';
import Tracking from './pages/Tracking';
import Vault from './pages/Vault';
import Editorial from './pages/Editorial';
import Trending from './pages/Trending';
import BestSellers from './pages/BestSellers';
import NewArrivals from './pages/NewArrivals';

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop/:category" element={<Shop />} />
            <Route path="/product/:sku" element={<ProductDetail />} />
            <Route path="/sourcing" element={<Sourcing />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/vault" element={<Vault />} />
            <Route path="/editorial" element={<Editorial />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/bestsellers" element={<BestSellers />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </StoreProvider>
  );
}

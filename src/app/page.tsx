'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import Header from '@/components/pf/Header';
import HeroSection from '@/components/pf/HeroSection';
import ToolGrid from '@/components/pf/ToolGrid';
import ToolWorkspace from '@/components/pf/ToolWorkspace';
import PricingSection from '@/components/pf/PricingSection';
import CrossPromo from '@/components/pf/CrossPromo';
import AdBanner from '@/components/pf/AdBanner';
import Footer from '@/components/pf/Footer';
import CheckoutModal from '@/components/pf/CheckoutModal';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const currentView = useStore((s) => s.currentView);
  const checkoutOpen = useStore((s) => s.checkoutOpen);
  const setCheckoutOpen = useStore((s) => s.setCheckoutOpen);
  const setView = useStore((s) => s.setView);
  const resetTool = useStore((s) => s.resetTool);

  const handleGoPro = () => {
    setCheckoutOpen(true);
  };

  const handleScrollToPricing = () => {
    setView('home');
    resetTool();
    setTimeout(() => {
      const el = document.getElementById('pricing-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d14]">
      <Header />

      <main className="flex-1">
        {currentView === 'home' ? (
          <>
            <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <AdBanner />
            <ToolGrid searchQuery={searchQuery} />
            <AdBanner />
            <PricingSection onGoPro={handleGoPro} />
            <AdBanner />
            <CrossPromo />
          </>
        ) : (
          <div className="pt-6">
            <ToolWorkspace />
          </div>
        )}
      </main>

      <Footer />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
}
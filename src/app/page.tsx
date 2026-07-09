'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import Header from '@/components/pf/Header';
import HeroSection from '@/components/pf/HeroSection';
import ToolGrid from '@/components/pf/ToolGrid';
import ToolWorkspace from '@/components/pf/ToolWorkspace';
import PricingSection from '@/components/pf/PricingSection';
import CrossPromo from '@/components/pf/CrossPromo';
import AdBanner from '@/components/pf/AdBanner';
import Footer from '@/components/pf/Footer';
import CheckoutModal from '@/components/pf/CheckoutModal';
import { getRecentlyUsed, ToolUsageRecord } from '@/lib/usage-counter';

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

  const [recentTools, setRecentTools] = useState<ToolUsageRecord[]>([]);

  useEffect(() => {
    setRecentTools(getRecentlyUsed(4));
  }, [currentView]);

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

            {/* Recently Used Section */}
            {recentTools.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-6xl mx-auto px-4 sm:px-6 pb-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                    Recently Used
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentTools.map((rt) => (
                    <button
                      key={rt.toolId}
                      onClick={() => {
                        setView('workspace');
                        useStore.getState().setActiveTool(rt.toolId);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-purple-500/30 rounded-xl transition-all group"
                    >
                      <span className="text-lg">{rt.toolIcon}</span>
                      <span>{rt.toolName}</span>
                      <span className="text-[10px] text-slate-600 group-hover:text-purple-400 transition-colors ml-1">
                        ({rt.count}x)
                      </span>
                    </button>
                  ))}
                </div>
              </motion.section>
            )}

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
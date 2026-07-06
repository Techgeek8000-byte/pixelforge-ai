'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Menu, X } from 'lucide-react';
import { getDailyUsage, FREE_DAILY_LIMIT } from '@/lib/image-engines';

const crossLinks = [
  { label: 'ToolPDF', href: 'https://tool-pdf-six.vercel.app' },
  { label: 'CalcHub', href: 'https://calchub.vercel.app' },
  { label: 'ConvertFlow', href: 'https://convertflow.vercel.app' },
  { label: 'SEOKit', href: 'https://seokit.vercel.app' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const resetTool = useStore((s) => s.resetTool);
  const setView = useStore((s) => s.setView);
  const setCheckoutOpen = useStore((s) => s.setCheckoutOpen);
  const isPremium = useStore((s) => s.isPremium);

  const handleGoPro = () => {
    resetTool();
    setView('home');
    setCheckoutOpen(true);
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.getElementById('pricing-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const usage = getDailyUsage();
  const showLimit = !isPremium;

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0d0d14]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => { resetTool(); setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2"
        >
          <span className="text-lg font-bold pf-gradient-text-animated tracking-tight">
            🎨 PixelForge AI
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {crossLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors rounded-md hover:bg-white/[0.04]"
            >
              {link.label}
            </a>
          ))}

          {showLimit && (
            <span className="ml-2 px-2.5 py-1 text-[10px] text-slate-400 bg-white/[0.04] rounded-full">
              {FREE_DAILY_LIMIT - usage} free left
            </span>
          )}

          {!isPremium && (
            <button
              onClick={handleGoPro}
              className="ml-2 px-4 py-1.5 text-xs font-semibold text-white pf-pro-gradient rounded-full hover:opacity-90 transition-opacity"
            >
              Go Pro
            </button>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-slate-200"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#0d0d14]/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {crossLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-sm text-slate-400 hover:text-slate-200 rounded-md hover:bg-white/[0.04]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {showLimit && (
              <div className="px-3 py-2 text-xs text-slate-500">
                {FREE_DAILY_LIMIT - usage} free generations left today
              </div>
            )}
            {!isPremium && (
              <button
                onClick={handleGoPro}
                className="w-full mt-2 px-4 py-2 text-sm font-semibold text-white pf-pro-gradient rounded-full"
              >
                Go Pro
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
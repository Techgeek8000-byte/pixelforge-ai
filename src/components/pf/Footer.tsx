'use client';

import AdBanner from './AdBanner';

const crossTools = [
  { label: 'ToolPDF', href: 'https://tool-pdf-six.vercel.app' },
  { label: 'CalcHub', href: 'https://calc-hub-ashy.vercel.app' },
  { label: 'ConvertFlow', href: 'https://convert-flow-beta.vercel.app' },
  { label: 'SEOKit', href: 'https://seo-kit-tau.vercel.app' },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/[0.06]">
      <AdBanner />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-sm font-bold pf-gradient-text mb-3">🎨 PixelForge AI</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Free AI image generation tools. Create avatars, logos, art, and more.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">AI Tools</h4>
            <ul className="space-y-1.5">
              <li><a href="#tools" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Text to Image</a></li>
              <li><a href="#tools" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">AI Avatar Maker</a></li>
              <li><a href="#tools" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">AI Logo Creator</a></li>
              <li><a href="#tools" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">AI Art Studio</a></li>
            </ul>
          </div>

          {/* More Tools */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">More Tools</h4>
            <ul className="space-y-1.5">
              {crossTools.map((t) => (
                <li key={t.label}>
                  <a href={t.href} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Legal</h4>
            <ul className="space-y-1.5">
              <li><a href="/privacy" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
          <p className="text-xs text-slate-600">&copy; 2025 PixelForge AI — A Project By Osama</p>
        </div>
      </div>
    </footer>
  );
}
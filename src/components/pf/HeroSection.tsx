'use client';

import { motion } from 'framer-motion';
import { Search, Sparkles, Zap, Shield } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const badges = [
  { icon: Sparkles, label: '100% Free AI' },
  { icon: Shield, label: 'No Signup Needed' },
  { icon: Zap, label: 'Instant Generation' },
];

const stats = ['10 AI Tools', 'Open Source Models', 'HD Quality'];

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: '1000px' }}>
      {/* Large purple orb */}
      <div
        className="pf-3d-mesh"
        style={{
          top: '-10%', left: '20%', width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%)',
          animationDuration: '8s',
        }}
      />
      {/* Pink orb */}
      <div
        className="pf-3d-mesh"
        style={{
          top: '10%', right: '10%', width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(236,72,153,0.1), transparent 70%)',
          animationDuration: '10s',
          animationDelay: '2s',
        }}
      />
      {/* Fuchsia orb */}
      <div
        className="pf-3d-mesh"
        style={{
          bottom: '0%', left: '40%', width: '350px', height: '350px',
          background: 'radial-gradient(circle, rgba(217,70,239,0.08), transparent 70%)',
          animationDuration: '12s',
          animationDelay: '4s',
        }}
      />

      {/* 3D Spinning Cube */}
      <div className="absolute top-[15%] left-[8%] hidden lg:block" style={{ animation: 'pf-float-1 12s ease-in-out infinite' }}>
        <div className="pf-cube-container">
          <div className="pf-cube">
            <div className="pf-cube-face front" />
            <div className="pf-cube-face back" />
            <div className="pf-cube-face right" />
            <div className="pf-cube-face left" />
            <div className="pf-cube-face top" />
            <div className="pf-cube-face bottom" />
          </div>
        </div>
      </div>

      {/* 3D Spinning Cube 2 */}
      <div className="absolute top-[30%] right-[6%] hidden lg:block" style={{ animation: 'pf-float-2 15s ease-in-out infinite' }}>
        <div className="pf-cube-container" style={{ width: '25px', height: '25px' }}>
          <div className="pf-cube" style={{ animationDuration: '30s' }}>
            <div className="pf-cube-face front" style={{ width: '25px', height: '25px', transform: 'translateZ(12.5px)', borderColor: 'rgba(236,72,153,0.3)', background: 'rgba(236,72,153,0.05)' }} />
            <div className="pf-cube-face back" style={{ width: '25px', height: '25px', transform: 'rotateY(180deg) translateZ(12.5px)', borderColor: 'rgba(236,72,153,0.3)', background: 'rgba(236,72,153,0.05)' }} />
            <div className="pf-cube-face right" style={{ width: '25px', height: '25px', transform: 'rotateY(90deg) translateZ(12.5px)', borderColor: 'rgba(236,72,153,0.3)', background: 'rgba(236,72,153,0.05)' }} />
            <div className="pf-cube-face left" style={{ width: '25px', height: '25px', transform: 'rotateY(-90deg) translateZ(12.5px)', borderColor: 'rgba(236,72,153,0.3)', background: 'rgba(236,72,153,0.05)' }} />
            <div className="pf-cube-face top" style={{ width: '25px', height: '25px', transform: 'rotateX(90deg) translateZ(12.5px)', borderColor: 'rgba(236,72,153,0.3)', background: 'rgba(236,72,153,0.05)' }} />
            <div className="pf-cube-face bottom" style={{ width: '25px', height: '25px', transform: 'rotateX(-90deg) translateZ(12.5px)', borderColor: 'rgba(236,72,153,0.3)', background: 'rgba(236,72,153,0.05)' }} />
          </div>
        </div>
      </div>

      {/* Floating ring 1 */}
      <div
        className="hidden lg:block absolute top-[60%] left-[12%] w-16 h-16 rounded-full border border-purple-500/20"
        style={{ animation: 'pf-float-3 10s ease-in-out infinite' }}
      />
      {/* Floating ring 2 */}
      <div
        className="hidden lg:block absolute top-[20%] right-[15%] w-10 h-10 rounded-full border border-pink-500/15"
        style={{ animation: 'pf-float-1 8s ease-in-out infinite reverse' }}
      />
      {/* Floating dot cluster */}
      <div className="hidden lg:block absolute bottom-[25%] right-[20%]" style={{ animation: 'pf-float-2 14s ease-in-out infinite' }}>
        <div className="grid grid-cols-3 gap-1.5">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-400/30" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  return (
    <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-16 text-center px-4 overflow-hidden">
      <FloatingShapes />

      <motion.h1
        initial={{ opacity: 0, y: 30, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight max-w-3xl mx-auto relative"
        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      >
        Create Stunning{' '}
        <span className="pf-gradient-text">AI Images</span>{' '}
        for Free
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed relative"
      >
        10 free AI image tools. Generate avatars, logos, wallpapers, art, thumbnails, and more. No signup, no API key needed.
      </motion.p>

      {/* Search bar with 3D effect */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-8 max-w-md mx-auto relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search AI tools…"
            className="pf-input w-full pl-11 pr-4 py-3 text-sm rounded-2xl relative z-10"
          />
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-6 flex flex-wrap justify-center gap-3"
      >
        {badges.map((b, i) => (
          <motion.span
            key={b.label}
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs text-purple-300 bg-purple-500/10 rounded-full border border-purple-500/20 backdrop-blur-sm"
            style={{ animationDelay: `${i * 0.5}s` }}
          >
            <b.icon className="w-3 h-3" />
            {b.label}
          </motion.span>
        ))}
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="mt-8 flex flex-wrap justify-center gap-6 sm:gap-10"
      >
        {stats.map((s) => (
          <motion.p
            key={s}
            whileHover={{ scale: 1.05 }}
            className="text-lg sm:text-xl font-bold text-slate-200 cursor-default"
          >
            {s}
          </motion.p>
        ))}
      </motion.div>
    </section>
  );
}
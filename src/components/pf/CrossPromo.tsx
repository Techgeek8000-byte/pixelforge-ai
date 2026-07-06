'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface CrossTool {
  name: string;
  emoji: string;
  description: string;
  href: string;
  gradient: string;
  glow: string;
}

const crossTools: CrossTool[] = [
  {
    name: 'ToolPDF',
    emoji: '📄',
    description: 'Free online PDF tools -- merge, split, compress, convert, and more.',
    href: 'https://tool-pdf-six.vercel.app',
    gradient: 'from-sky-500/20 to-blue-500/20',
    glow: 'rgba(56, 189, 248, 0.15)',
  },
  {
    name: 'CalcHub',
    emoji: '🧮',
    description: 'Free online calculators for math, finance, health, and everyday use.',
    href: 'https://calchub.vercel.app',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    glow: 'rgba(16, 185, 129, 0.15)',
  },
  {
    name: 'ConvertFlow',
    emoji: '🔄',
    description: 'Free online unit converters -- length, weight, temperature, and more.',
    href: 'https://convertflow.vercel.app',
    gradient: 'from-amber-500/20 to-orange-500/20',
    glow: 'rgba(245, 158, 11, 0.15)',
  },
  {
    name: 'SEOKit',
    emoji: '🔍',
    description: 'Free SEO tools -- meta tags, SERP preview, keyword density, and more.',
    href: 'https://seokit.vercel.app',
    gradient: 'from-purple-500/20 to-violet-500/20',
    glow: 'rgba(168, 85, 247, 0.15)',
  },
];

function PromoCard({ tool, index }: { tool: CrossTool; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -5;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5;
    setTilt({ x: rotateX, y: rotateY });
  };

  return (
    <motion.a
      ref={cardRef}
      href={tool.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20, rotateX: -3 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      whileHover={{ scale: 1.03 }}
      className="pf-card-3d pf-tool-card p-5 group block relative"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
    >
      <div
        className="absolute -inset-0.5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{ background: tool.glow }}
      />
      <div className="flex items-start justify-between relative z-10">
        <motion.span
          className="text-2xl"
          whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {tool.emoji}
        </motion.span>
        <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-purple-400 transition-colors" />
      </div>
      <h3 className="text-slate-200 font-semibold mt-3 text-sm relative z-10">{tool.name}</h3>
      <p className="text-slate-500 text-xs mt-1.5 leading-relaxed relative z-10">{tool.description}</p>
      <div className={`mt-3 h-0.5 w-8 rounded-full bg-gradient-to-r ${tool.gradient} relative z-10`} />
    </motion.a>
  );
}

export default function CrossPromo() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-200">
          More <span className="pf-gradient-text">Free Tools</span>
        </h2>
        <p className="mt-3 text-sm text-slate-400">
          Check out our other free tool suites
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {crossTools.map((t, i) => (
          <PromoCard key={t.name} tool={t} index={i} />
        ))}
      </div>
    </section>
  );
}
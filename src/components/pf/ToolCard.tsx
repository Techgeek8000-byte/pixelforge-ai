'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { AiTool } from '@/lib/tool-definitions';

interface ToolCardProps {
  tool: AiTool;
  onClick: () => void;
}

export default function ToolCard({ tool, onClick }: ToolCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="pf-card-3d pf-tool-card p-5 group relative cursor-pointer"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? 'translateY(-4px)' : 'translateY(0)'}`,
        transition: 'transform 0.15s ease-out',
      }}
    >
      {/* Glow reflection that follows mouse */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(circle at ${tilt.y > 0 ? '50%' : '50%'} ${(tilt.x * 5 + 50)}%, rgba(168,85,247,0.15), transparent 60%)`,
          }}
        />
      )}

      <div className="flex items-start justify-between relative z-10">
        <motion.span
          className="text-2xl"
          animate={isHovered ? { scale: 1.15, rotate: [0, -5, 5, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {tool.icon}
        </motion.span>
        <ArrowRight
          className="w-4 h-4 text-slate-600 group-hover:text-purple-400 transition-all duration-300 mt-1"
          style={{
            transform: isHovered ? `translateX(${tilt.y * 0.5}px)` : 'translateX(0)',
            opacity: isHovered ? 1 : 0.5,
          }}
        />
      </div>
      <h3 className="text-slate-200 font-semibold mt-3 text-sm relative z-10">{tool.name}</h3>
      <p className="text-slate-500 text-xs mt-1.5 leading-relaxed relative z-10">{tool.description}</p>
      <div className={`mt-3 h-0.5 w-8 rounded-full bg-gradient-to-r ${tool.gradient.replace('/20', '/60')} relative z-10`} />
    </motion.div>
  );
}
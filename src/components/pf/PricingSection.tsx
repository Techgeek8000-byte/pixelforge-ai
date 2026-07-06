'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Infinity, Clock, Star } from 'lucide-react';

interface PricingSectionProps {
  onGoPro: () => void;
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    description: 'Get started with AI image generation',
    badge: null,
    features: [
      '10 images per day',
      'All 10 AI tools',
      'Flux model',
      'Up to 1024px',
      'Watermark on downloads',
    ],
    cta: 'Current Plan',
    highlighted: false,
    icon: <Star className="w-5 h-5 text-purple-400" />,
  },
  {
    name: 'Weekly',
    price: '$1',
    period: '/week',
    description: 'Try Pro for a week',
    badge: null,
    features: [
      'Unlimited images',
      'All 10 AI tools',
      'Flux model',
      'Up to 1344px',
      'No watermark',
      'Priority generation',
    ],
    cta: 'Get Weekly',
    highlighted: false,
    icon: <Clock className="w-5 h-5 text-purple-400" />,
  },
  {
    name: 'Monthly',
    price: '$2',
    period: '/mo',
    originalPrice: '$4',
    description: 'Most popular for creators',
    badge: 'SAVE 50%',
    features: [
      'Unlimited images',
      'All 10 AI tools',
      'Flux model',
      'Up to 1344px',
      'No watermark',
      'Priority generation',
      'Early access to new tools',
    ],
    cta: 'Get Monthly',
    highlighted: true,
    icon: <Zap className="w-5 h-5 text-purple-400" />,
  },
  {
    name: 'Yearly',
    price: '$12',
    period: '/year',
    originalPrice: '$24',
    description: 'Best value for regular users',
    badge: 'SAVE 50%',
    features: [
      'Unlimited images',
      'All 10 AI tools',
      'Flux model',
      'Up to 1344px',
      'No watermark',
      'Priority generation',
      'Early access to new tools',
      'Priority support',
    ],
    cta: 'Get Yearly',
    highlighted: false,
    icon: <Infinity className="w-5 h-5 text-emerald-400" />,
  },
  {
    name: 'Lifetime',
    price: '$25',
    period: 'one-time',
    originalPrice: '$48',
    description: 'Pay once, create forever',
    badge: 'BEST VALUE',
    features: [
      'Everything in Yearly',
      'Lifetime access',
      'No recurring payments',
      'All future tools included',
      'All future model upgrades',
      'Priority support forever',
    ],
    cta: 'Get Lifetime',
    highlighted: false,
    icon: <Crown className="w-5 h-5 text-amber-400" />,
  },
];

function PricingCard({ plan, onGoPro, index }: { plan: typeof plans[0]; onGoPro: () => void; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, rotateX: -5 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`pf-card-3d p-5 flex flex-col relative ${
        plan.highlighted
          ? 'border-purple-500/30'
          : ''
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? 'translateY(-6px)' : 'translateY(0)'}`,
        transition: 'transform 0.15s ease-out',
      }}
    >
      {/* 3D glow for highlighted */}
      {plan.highlighted && (
        <>
          <div className="absolute -inset-px bg-gradient-to-b from-purple-500/30 to-pink-500/30 rounded-2xl blur-sm -z-10" />
          <div className="absolute -inset-1 bg-gradient-to-b from-purple-500/10 to-pink-500/10 rounded-3xl blur-lg -z-20" />
        </>
      )}

      {plan.badge && (
        <div className={`absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white rounded-full shadow-lg ${
          plan.badge === 'BEST VALUE' ? 'bg-amber-500 shadow-amber-500/25' : 'pf-pro-gradient shadow-purple-500/25'
        }`}>
          {plan.badge}
        </div>
      )}

      <div className="flex items-center gap-2 mb-3 relative z-10">
        {plan.icon}
        <h3 className="text-sm font-semibold text-slate-200">{plan.name}</h3>
      </div>

      <div className="mb-1 relative z-10">
        {plan.originalPrice && (
          <span className="text-xs text-slate-600 line-through mr-1">{plan.originalPrice}</span>
        )}
        <span className="text-2xl font-extrabold text-slate-100">{plan.price}</span>
        {plan.period && (
          <span className="text-xs text-slate-500 ml-1">{plan.period}</span>
        )}
      </div>
      <p className="text-[11px] text-slate-500 mb-4 relative z-10">{plan.description}</p>

      <ul className="space-y-2 mb-6 flex-1 relative z-10">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-xs text-slate-300">
            <Check className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>

      {plan.name === 'Free' ? (
        <div className="w-full py-2 text-xs text-center text-slate-500 bg-white/[0.03] rounded-xl border border-white/[0.06] relative z-10">
          {plan.cta}
        </div>
      ) : (
        <button
          onClick={onGoPro}
          className={`pf-btn-3d w-full py-2 text-xs font-semibold text-white rounded-xl relative z-10 ${
            plan.highlighted
              ? 'bg-gradient-to-r from-purple-500 to-pink-500'
              : 'bg-white/[0.08] hover:bg-white/[0.12]'
          }`}
        >
          {plan.cta}
        </button>
      )}
    </motion.div>
  );
}

export default function PricingSection({ onGoPro }: PricingSectionProps) {
  return (
    <section id="pricing-section" className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-200">
          Simple, <span className="pf-gradient-text">Transparent</span> Pricing
        </h2>
        <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto">
          Start free. Upgrade when you need more power.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4" style={{ perspective: '1200px' }}>
        {plans.map((plan, i) => (
          <PricingCard key={plan.name} plan={plan} onGoPro={onGoPro} index={i} />
        ))}
      </div>
    </section>
  );
}
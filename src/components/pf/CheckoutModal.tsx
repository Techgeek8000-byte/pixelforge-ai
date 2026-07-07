'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Zap, Crown, Clock, Infinity, Star } from 'lucide-react';
import { LEMON_SQUEEZY } from '@/lib/lemonsqueezy';

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

const options = [
  {
    name: 'Weekly',
    price: '$1/week',
    description: 'Billed weekly. Cancel anytime.',
    icon: <Clock className="w-5 h-5 text-purple-400" />,
    popular: false,
    features: ['Unlimited images', 'No watermark', 'Priority generation'],
  },
  {
    name: 'Monthly',
    price: '$2/mo',
    originalPrice: '$4/mo',
    description: 'Save 50% vs weekly. Billed monthly.',
    icon: <Zap className="w-5 h-5 text-purple-400" />,
    popular: true,
    features: ['Unlimited images', 'No watermark', 'Priority generation', 'Early access'],
  },
  {
    name: 'Yearly',
    price: '$12/yr',
    originalPrice: '$24/yr',
    description: 'Save 50% vs monthly. Best for regulars.',
    icon: <Infinity className="w-5 h-5 text-emerald-400" />,
    popular: false,
    features: ['Everything in Monthly', 'Priority support', 'Save $12/year'],
  },
  {
    name: 'Lifetime',
    price: '$25',
    originalPrice: '$48',
    description: 'Pay once. Create forever.',
    icon: <Crown className="w-5 h-5 text-amber-400" />,
    popular: false,
    features: ['Everything in Yearly', 'Lifetime access', 'All future updates', 'Best value'],
  },
];

export default function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="pf-card w-full max-w-lg p-6 sm:p-8 relative bg-[#1a1a2e] border border-white/[0.08] max-h-[90vh] overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 text-slate-500 hover:text-slate-300 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-slate-200">Upgrade to Pro</h2>
                <p className="text-sm text-slate-400 mt-1">Choose the plan that works for you</p>
              </div>

              <div className="space-y-3">
                {options.map((opt) => (
                  <div
                    key={opt.name}
                    className={`p-4 rounded-xl border transition-colors ${
                      opt.popular
                        ? 'border-purple-500/30 bg-purple-500/[0.04]'
                        : 'border-white/[0.06] bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {opt.icon}
                        <span className="font-semibold text-slate-200 text-sm">{opt.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {opt.originalPrice && (
                          <span className="text-xs text-slate-600 line-through">{opt.originalPrice}</span>
                        )}
                        <span className="text-lg font-bold text-slate-100">{opt.price}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mb-3">{opt.description}</p>

                    <ul className="space-y-1 mb-4">
                      {opt.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
                          <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => {
                        alert(`LemonSqueezy checkout for ${opt.name} (${opt.price}) would open here.`);
                      }}
                      className={`w-full py-2.5 text-sm font-semibold text-white rounded-xl transition-opacity hover:opacity-90 ${
                        opt.popular
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                          : 'bg-white/[0.08] hover:bg-white/[0.12]'
                      }`}
                    >
                      Get Pro — {opt.price}
                    </button>
                  </div>
                ))}
              </div>

              <p className="text-center text-[11px] text-slate-600 mt-4">
                Powered by LemonSqueezy. Secure payment via Meezan Bank.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
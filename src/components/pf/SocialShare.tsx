'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Share2, Copy, Check, X,
} from 'lucide-react';

interface SocialShareProps {
  imageUrl: string;
  prompt: string;
  toolName: string;
}

const platforms = [
  {
    name: 'Twitter / X',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    color: 'hover:bg-slate-700',
    getUrl: (text: string, url: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
  },
  {
    name: 'Facebook',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    color: 'hover:bg-blue-700',
    getUrl: (text: string, url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
  },
  {
    name: 'Reddit',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.958 11.333a1.882 1.882 0 0 1 0 3.765c-.643 0-1.203-.322-1.54-.81a9.007 9.007 0 0 1-4.614 2.504l.87 3.803.055.17 2.707-.603a1.333 1.333 0 1 1-.18 1.022l-2.31.515c-.138.031-.273-.016-.375-.13l-1.106-4.839a9.286 9.286 0 0 1-5.05-2.441 1.882 1.882 0 1 1 .67-3.2 8.85 8.85 0 0 1 .11-2.298l2.487-1.142.003-.002a.31.31 0 0 1 .354.058l2.892 1.434a8.808 8.808 0 0 1 6.908 0l2.892-1.434a.31.31 0 0 1 .354-.058l.003.002 2.487 1.142a8.85 8.85 0 0 1 .11 2.298 1.882 1.882 0 0 1 1.042 3.388z"/>
      </svg>
    ),
    color: 'hover:bg-orange-600',
    getUrl: (text: string, url: string) =>
      `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
  },
  {
    name: 'LinkedIn',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: 'hover:bg-blue-600',
    getUrl: (text: string, url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
];

export default function SocialShare({ imageUrl, prompt, toolName }: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `Check out this AI-generated image I created with ${toolName} on PixelForge AI! 🎨`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="py-2.5 px-3 text-xs text-slate-400 bg-white/[0.06] hover:bg-white/[0.1] rounded-xl transition-colors flex items-center gap-1.5"
        title="Share"
      >
        <Share2 className="w-3.5 h-3.5" />
        Share
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-full right-0 mb-2 z-50 w-56 pf-glass-3d p-2 rounded-xl shadow-xl"
            >
              <div className="flex items-center justify-between px-3 py-1.5 mb-1">
                <span className="text-xs font-semibold text-slate-300">Share to</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-500 hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {platforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.getUrl(shareText, shareUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 rounded-lg transition-colors ${platform.color} hover:text-white`}
                >
                  {platform.icon}
                  {platform.name}
                </a>
              ))}

              <div className="border-t border-white/[0.06] my-1" />

              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:bg-white/[0.06] rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </>
                )}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

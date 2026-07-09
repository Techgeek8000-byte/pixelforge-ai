'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Download, RefreshCw, Loader2, AlertCircle,
  Share2, Lock, ImageIcon, Lightbulb, Copy, Eye, FileText,
} from 'lucide-react';
import { toast } from 'sonner';
import { useStore } from '@/lib/store';
import { tools } from '@/lib/tool-definitions';
import { generateImage, preloadImage, downloadImage, canGenerate } from '@/lib/image-engines';
import { incrementUsage as recordToolUsage } from '@/lib/usage-counter';
import SocialShare from './SocialShare';

export default function ToolWorkspace() {
  const activeTool = useStore((s) => s.activeTool);
  const promptText = useStore((s) => s.promptText);
  const setPromptText = useStore((s) => s.setPromptText);
  const selectedStyle = useStore((s) => s.selectedStyle);
  const setSelectedStyle = useStore((s) => s.setSelectedStyle);
  const selectedSize = useStore((s) => s.selectedSize);
  const setSelectedSize = useStore((s) => s.setSelectedSize);
  const isGenerating = useStore((s) => s.isGenerating);
  const setIsGenerating = useStore((s) => s.setIsGenerating);
  const generatedImageUrl = useStore((s) => s.generatedImageUrl);
  const setGeneratedImageUrl = useStore((s) => s.setGeneratedImageUrl);
  const generatedPrompt = useStore((s) => s.generatedPrompt);
  const setGeneratedPrompt = useStore((s) => s.setGeneratedPrompt);
  const error = useStore((s) => s.error);
  const setError = useStore((s) => s.setError);
  const isPremium = useStore((s) => s.isPremium);
  const setView = useStore((s) => s.setView);
  const resetTool = useStore((s) => s.resetTool);
  const setCheckoutOpen = useStore((s) => s.setCheckoutOpen);
  const incrementUsage = useStore((s) => s.incrementUsage);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

  const tool = tools.find((t) => t.id === activeTool);

  const { remaining } = canGenerate(isPremium);

  const handleGenerate = useCallback(async () => {
    if (!tool) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedImageUrl(null);
    setGeneratedPrompt('');
    setShowBeforeAfter(false);

    const result = generateImage(tool, promptText, selectedStyle, selectedSize, isPremium);

    if ('error' in result) {
      setError(result.error);
      setIsGenerating(false);
      return;
    }

    try {
      await preloadImage(result.url);
      setGeneratedImageUrl(result.url);
      setGeneratedPrompt(result.fullPrompt);
      incrementUsage();
      recordToolUsage(tool.id, tool.name, tool.icon);
      toast.success('Image generated! 🎨', {
        description: 'Your AI image is ready.',
        duration: 3000,
      });
    } catch {
      setError('Failed to generate image. The AI service might be busy — please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [tool, promptText, selectedStyle, selectedSize, isPremium, setIsGenerating, setError, setGeneratedImageUrl, setGeneratedPrompt, incrementUsage]);

  const handleTryAgain = () => {
    handleGenerate();
  };

  const handleDownload = async () => {
    if (!generatedImageUrl) return;
    try {
      await downloadImage(generatedImageUrl, isPremium, `pixelforge-${tool?.id || 'image'}-${Date.now()}.png`);
      toast.success('Downloaded! 📥', {
        description: 'Image saved to your device.',
        duration: 3000,
      });
    } catch {
      setError('Failed to download. The image might still be loading.');
    }
  };

  const handleCopyImage = async () => {
    if (!generatedImageUrl) return;
    try {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.src = generatedImageUrl;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image'));
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');
      ctx.drawImage(img, 0, 0);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), 'image/png')
      );

      if (!blob) throw new Error('Failed to create image blob');

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
      toast.success('Image copied! 📋', {
        description: 'Paste it anywhere to share.',
        duration: 3000,
      });
    } catch {
      toast.error('Copy failed', {
        description: 'Unable to copy image to clipboard.',
        duration: 3000,
      });
    }
  };

  const handleShare = async () => {
    if (!generatedImageUrl) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `AI Image by PixelForge AI`,
          text: `Check out this AI-generated image! Created with PixelForge AI — free AI image tools.`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied! 🔗', {
          description: 'Share it with anyone.',
          duration: 3000,
        });
      }
    } catch {
      // User cancelled share
    }
  };

  const handleGoBack = () => {
    resetTool();
    setView('home');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPromptText(suggestion);
    setShowSuggestions(false);
  };

  if (!tool) return null;

  const currentSizeObj = tool.sizes.find((s) => s.label === selectedSize) || tool.sizes[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <button
          onClick={handleGoBack}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to tools
        </button>
      </motion.div>

      {/* Tool header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{tool.icon}</span>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-200">{tool.name}</h1>
            <p className="text-sm text-slate-400">{tool.description}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Prompt */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Describe what you want to generate
            </label>
            <div className="relative">
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder={tool.suggestions[0] || 'Describe your image...'}
                rows={4}
                className="pf-textarea w-full p-4 text-sm resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleGenerate();
                }}
              />
              <div className="absolute bottom-2 right-2 text-[10px] text-slate-600">
                {promptText.length}/500
              </div>
            </div>
            {/* Suggestions toggle */}
            <button
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="mt-2 inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Lightbulb className="w-3 h-3" />
              {showSuggestions ? 'Hide' : 'Show'} prompt ideas
            </button>
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 space-y-1.5 overflow-hidden"
                >
                  {tool.suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestionClick(s)}
                      className="w-full text-left px-3 py-2 text-xs text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] rounded-lg transition-colors truncate"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Style selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Style</label>
            <div className="flex flex-wrap gap-2">
              {tool.styles.map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(selectedStyle === style ? '' : style)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                    selectedStyle === style
                      ? 'border-purple-500/40 bg-purple-500/15 text-purple-300'
                      : 'border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-slate-300 hover:border-white/[0.15]'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Size selector */}
          {tool.sizes.length > 1 && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Size</label>
              <div className="flex flex-wrap gap-2">
                {tool.sizes.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size.label)}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                      selectedSize === size.label
                        ? 'border-purple-500/40 bg-purple-500/15 text-purple-300'
                        : 'border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-slate-300 hover:border-white/[0.15]'
                    }`}
                  >
                    {size.label}
                    <span className="text-[10px] text-slate-600 ml-1">{size.w}x{size.h}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Usage indicator */}
          {!isPremium && (
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <ImageIcon className="w-3 h-3" />
              {remaining} free generations remaining today
              <button
                onClick={() => { setCheckoutOpen(true); }}
                className="ml-1 text-purple-400 hover:underline"
              >
                Go Pro
              </button>
            </div>
          )}

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !promptText.trim()}
            className={`pf-btn-3d w-full py-3 text-sm font-semibold text-white rounded-2xl transition-all flex items-center justify-center gap-2 relative ${
              isGenerating || !promptText.trim()
                ? 'bg-white/[0.06] text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90'
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <ImageIcon className="w-4 h-4" />
                Generate Image
              </>
            )}
            <span className="text-[10px] opacity-70 ml-1">(Ctrl+Enter)</span>
          </button>
        </motion.div>

        {/* Right: Output */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="pf-glass-3d p-4 min-h-[400px] flex flex-col">
            {/* Loading Skeleton */}
            {isGenerating && (
              <div className="flex-1 flex flex-col gap-4">
                {/* Image skeleton */}
                <div className="flex-1 rounded-lg overflow-hidden bg-[#1a1a2e] relative">
                  <div className="absolute inset-0 pf-skeleton-shimmer" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full border-2 border-purple-500/30 border-t-purple-400 animate-spin" />
                    <div className="text-center space-y-2">
                      <div className="h-3 w-32 bg-white/[0.06] rounded animate-pulse mx-auto" />
                      <div className="h-2.5 w-24 bg-white/[0.04] rounded animate-pulse mx-auto" />
                    </div>
                  </div>
                </div>
                {/* Action bar skeleton */}
                <div className="flex gap-2">
                  <div className="flex-1 h-10 bg-white/[0.04] rounded-xl animate-pulse" />
                  <div className="flex-1 h-10 bg-white/[0.04] rounded-xl animate-pulse" />
                  <div className="w-10 h-10 bg-white/[0.04] rounded-xl animate-pulse" />
                </div>
              </div>
            )}

            {/* Error state */}
            {error && !isGenerating && (
              <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <AlertCircle className="w-10 h-10 text-rose-400" />
                <p className="text-sm text-rose-400 text-center max-w-xs">{error}</p>
                <button
                  onClick={() => { setError(null); }}
                  className="text-xs text-slate-400 hover:text-slate-300 underline"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Image result with Before/After support */}
            {!isGenerating && generatedImageUrl && (
              <div className="flex-1 flex flex-col">
                {/* Before/After Toggle */}
                <div className="flex items-center gap-2 mb-3">
                  <button
                    onClick={() => setShowBeforeAfter(false)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-all ${
                      !showBeforeAfter
                        ? 'border-purple-500/40 bg-purple-500/15 text-purple-300'
                        : 'border-white/[0.06] text-slate-500 hover:text-slate-400'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    After (Image)
                  </button>
                  <button
                    onClick={() => setShowBeforeAfter(true)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-all ${
                      showBeforeAfter
                        ? 'border-purple-500/40 bg-purple-500/15 text-purple-300'
                        : 'border-white/[0.06] text-slate-500 hover:text-slate-400'
                    }`}
                  >
                    <FileText className="w-3 h-3" />
                    Before (Prompt)
                  </button>
                </div>

                {/* Content: Image or Prompt */}
                <AnimatePresence mode="wait">
                  {!showBeforeAfter ? (
                    <motion.div
                      key="image"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="relative flex-1 rounded-lg overflow-hidden bg-[#0d0d1a] flex items-center justify-center min-h-[300px]"
                    >
                      <img
                        src={generatedImageUrl}
                        alt="AI generated image"
                        className="max-w-full max-h-[500px] object-contain rounded-lg"
                      />
                      {/* Watermark overlay for free users */}
                      {!isPremium && (
                        <span className="pf-watermark">A Project By Osama</span>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="prompt"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex-1 rounded-lg overflow-hidden bg-[#0d0d1a] flex items-center justify-center min-h-[300px] p-6"
                    >
                      <div className="text-center max-w-sm">
                        <FileText className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                        <p className="text-xs text-slate-500 mb-2">Generated Prompt</p>
                        <p className="text-sm text-slate-300 leading-relaxed italic">
                          &ldquo;{generatedPrompt}&rdquo;
                        </p>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(generatedPrompt);
                            toast.success('Prompt copied!');
                          }}
                          className="mt-4 inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                          Copy prompt
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleTryAgain}
                    className="flex-1 py-2.5 text-xs font-medium text-slate-300 bg-white/[0.06] hover:bg-white/[0.1] rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Try Again
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex-1 py-2.5 text-xs font-medium text-white pf-btn-3d bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 relative"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download{!isPremium ? ' (watermarked)' : ''}
                  </button>
                  <button
                    onClick={handleCopyImage}
                    className="py-2.5 px-3 text-xs text-slate-400 bg-white/[0.06] hover:bg-white/[0.1] rounded-xl transition-colors"
                    title="Copy image"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <SocialShare
                    imageUrl={generatedImageUrl}
                    prompt={generatedPrompt}
                    toolName={tool.name}
                  />
                </div>

                {/* Image info */}
                <div className="mt-3 flex items-center justify-between text-[10px] text-slate-600">
                  <span>{currentSizeObj.w} x {currentSizeObj.h}px</span>
                  {!isPremium && (
                    <span className="flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" />
                      Remove watermark with Pro
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Empty state */}
            {!isGenerating && !generatedImageUrl && !error && (
              <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-white/[0.03] flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-slate-700" />
                </div>
                <p className="text-sm text-slate-500">Your AI image will appear here</p>
                <p className="text-xs text-slate-600">Enter a prompt and click Generate</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

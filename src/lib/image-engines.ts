// ============================================================
// PixelForge AI — Image Generation Engine (Pollinations.ai)
// 100% free, no API key, no signup
// ============================================================

import type { AiTool } from './tool-definitions';

const BASE_URL = 'https://image.pollinations.ai/prompt/';

export const FREE_DAILY_LIMIT = 10;

// Check daily usage from localStorage
export function getDailyUsage(): number {
  if (typeof window === 'undefined') return 0;
  const today = new Date().toISOString().split('T')[0];
  const stored = localStorage.getItem('pf-usage');
  if (stored) {
    const data = JSON.parse(stored);
    if (data.date === today) return data.count;
  }
  return 0;
}

export function incrementDailyUsage(): number {
  if (typeof window === 'undefined') return 0;
  const today = new Date().toISOString().split('T')[0];
  const stored = localStorage.getItem('pf-usage');
  let count = 1;
  if (stored) {
    const data = JSON.parse(stored);
    if (data.date === today) count = data.count + 1;
  }
  localStorage.setItem('pf-usage', JSON.stringify({ date: today, count }));
  return count;
}

export function canGenerate(isPremium: boolean): { allowed: boolean; remaining: number } {
  if (isPremium) return { allowed: true, remaining: Infinity };
  const used = getDailyUsage();
  const remaining = Math.max(0, FREE_DAILY_LIMIT - used);
  return { allowed: used < FREE_DAILY_LIMIT, remaining };
}

// Build the full Pollinations URL
function buildUrl(
  fullPrompt: string,
  width: number,
  height: number,
  model: string,
  seed: number,
): string {
  const params = new URLSearchParams({
    width: String(width),
    height: String(height),
    model,
    nologo: 'true',
    seed: String(seed),
    nofeed: 'true',
  });
  return `${BASE_URL}${encodeURIComponent(fullPrompt)}?${params.toString()}`;
}

// Build the complete prompt from tool config
function buildPrompt(
  tool: AiTool,
  userPrompt: string,
  style: string,
): string {
  let prompt = userPrompt.trim();
  if (!prompt) return '';

  // Add style
  if (style && style !== 'None') {
    prompt = `${style} style, ${prompt}`;
  }

  // Add tool-specific prefix/suffix
  prompt = tool.promptPrefix + prompt + tool.promptSuffix;

  return prompt;
}

// Get size dimensions from tool config
export function getSizeDimensions(tool: AiTool, sizeLabel: string): { w: number; h: number } {
  const size = tool.sizes.find((s) => s.label === sizeLabel);
  if (size) return { w: size.w, h: size.h };
  return { w: tool.sizes[0].w, h: tool.sizes[0].h };
}

// Get the model to use
function getModel(isPremium: boolean): string {
  return isPremium ? 'flux' : 'flux';
}

// Generate image - returns the URL to load
export function generateImage(
  tool: AiTool,
  userPrompt: string,
  style: string,
  sizeLabel: string,
  isPremium: boolean,
): { url: string; fullPrompt: string } | { error: string } {
  // Check usage
  const { allowed, remaining } = canGenerate(isPremium);
  if (!allowed) {
    return { error: `Daily limit reached (${FREE_DAILY_LIMIT} images/day). Upgrade to Pro for unlimited generations.` };
  }

  if (!userPrompt.trim()) {
    return { error: 'Please enter a prompt to generate an image.' };
  }

  const fullPrompt = buildPrompt(tool, userPrompt, style);
  const { w, h } = getSizeDimensions(tool, sizeLabel);
  const model = getModel(isPremium);
  const seed = Math.floor(Math.random() * 999999999);
  const url = buildUrl(fullPrompt, w, h, model, seed);

  // Increment usage
  incrementDailyUsage();

  return { url, fullPrompt };
}

// Preload an image and return a promise that resolves when loaded
export function preloadImage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(url);
    img.onerror = () => reject(new Error('Failed to generate image. Please try again.'));
    img.src = url;
  });
}

// Download image with optional watermark
export function downloadImage(
  url: string,
  isPremium: boolean,
  filename?: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas not supported'));
        return;
      }

      ctx.drawImage(img, 0, 0);

      // Add watermark for free users
      if (!isPremium) {
        const fontSize = Math.max(16, Math.floor(canvas.width / 40));
        ctx.font = `600 ${fontSize}px Inter, system-ui, sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = 4;
        ctx.fillText('A Project By Osama', canvas.width - 16, canvas.height - 12);
      }

      const link = document.createElement('a');
      link.download = filename || `pixelforge-ai-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      resolve();
    };
    img.onerror = () => reject(new Error('Failed to download image'));
    img.src = url;
  });
}
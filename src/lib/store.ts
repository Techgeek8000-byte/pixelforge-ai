import { create } from 'zustand';

interface AppState {
  currentView: 'home' | 'workspace';
  setView: (view: 'home' | 'workspace') => void;
  activeTool: string | null;
  setActiveTool: (id: string | null) => void;
  promptText: string;
  setPromptText: (text: string) => void;
  selectedStyle: string;
  setSelectedStyle: (s: string) => void;
  selectedSize: string;
  setSelectedSize: (s: string) => void;
  isGenerating: boolean;
  setIsGenerating: (v: boolean) => void;
  generatedImageUrl: string | null;
  setGeneratedImageUrl: (url: string | null) => void;
  error: string | null;
  setError: (err: string | null) => void;
  isPremium: boolean;
  dailyUsageCount: number;
  incrementUsage: () => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (v: boolean) => void;
  resetTool: () => void;
}

export const useStore = create<AppState>((set) => ({
  currentView: 'home',
  setView: (view) => set({ currentView: view }),
  activeTool: null,
  setActiveTool: (id) => set({ activeTool: id }),
  promptText: '',
  setPromptText: (text) => set({ promptText: text }),
  selectedStyle: '',
  setSelectedStyle: (s) => set({ selectedStyle: s }),
  selectedSize: '1:1',
  setSelectedSize: (s) => set({ selectedSize: s }),
  isGenerating: false,
  setIsGenerating: (v) => set({ isGenerating: v }),
  generatedImageUrl: null,
  setGeneratedImageUrl: (url) => set({ generatedImageUrl: url }),
  error: null,
  setError: (err) => set({ error: err }),
  isPremium: false,
  dailyUsageCount: 0,
  incrementUsage: () =>
    set((s) => ({ dailyUsageCount: s.dailyUsageCount + 1 })),
  checkoutOpen: false,
  setCheckoutOpen: (v) => set({ checkoutOpen: v }),
  resetTool: () =>
    set({
      promptText: '',
      selectedStyle: '',
      selectedSize: '1:1',
      isGenerating: false,
      generatedImageUrl: null,
      error: null,
    }),
}));
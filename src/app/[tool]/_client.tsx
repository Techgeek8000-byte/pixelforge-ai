'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import Header from '@/components/pf/Header';
import ToolWorkspace from '@/components/pf/ToolWorkspace';
import Footer from '@/components/pf/Footer';

interface ToolMeta {
  title: string;
  description: string;
  keywords: string[];
}

export default function ToolPageClient({ toolSlug, toolMeta }: { toolSlug: string; toolMeta?: ToolMeta }) {
  const setActiveTool = useStore((s) => s.setActiveTool);
  const setView = useStore((s) => s.setView);
  const activeTool = useStore((s) => s.activeTool);

  useEffect(() => {
    if (toolMeta) {
      setActiveTool(toolSlug);
      setView('workspace');
    }
  }, [toolSlug, toolMeta, setActiveTool, setView]);

  if (!toolMeta) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0d0d14]">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-300">Tool not found</h1>
            <p className="text-slate-500 mt-2">This AI tool does not exist. Browse our available tools below.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d14]">
      <Header />
      <main className="flex-1 pt-6">
        <ToolWorkspace />
      </main>
      <Footer />
    </div>
  );
}

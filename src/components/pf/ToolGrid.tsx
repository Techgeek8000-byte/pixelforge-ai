'use client';

import { motion } from 'framer-motion';
import { Wand2, Palette, Smartphone, Briefcase } from 'lucide-react';
import { tools, categoryLabels } from '@/lib/tool-definitions';
import ToolCard from './ToolCard';
import { useStore } from '@/lib/store';

const categoryIcons: Record<string, React.ReactNode> = {
  'generate': <Wand2 className="w-4 h-4" />,
  'creative': <Palette className="w-4 h-4" />,
  'social': <Smartphone className="w-4 h-4" />,
  'business': <Briefcase className="w-4 h-4" />,
};

const categoryOrder = ['generate', 'creative', 'social', 'business'];

interface ToolGridProps {
  searchQuery: string;
}

export default function ToolGrid({ searchQuery }: ToolGridProps) {
  const setActiveTool = useStore((s) => s.setActiveTool);
  const setView = useStore((s) => s.setView);
  const resetTool = useStore((s) => s.resetTool);

  const q = searchQuery.toLowerCase().trim();

  const handleToolClick = (toolId: string) => {
    resetTool();
    setActiveTool(toolId);
    setView('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const grouped = categoryOrder
    .map((cat) => ({
      category: cat,
      label: categoryLabels[cat] || cat,
      icon: categoryIcons[cat],
      tools: tools.filter((t) => {
        if (t.category !== cat) return false;
        if (q) {
          return (
            t.name.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q)
          );
        }
        return true;
      }),
    }))
    .filter((g) => g.tools.length > 0);

  return (
    <section id="tools" className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
      {grouped.map((group, gi) => (
        <motion.div
          key={group.category}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: gi * 0.08 }}
        >
          <div className="flex items-center gap-2 mb-4 mt-10 first:mt-0">
            <span className="text-purple-300">{group.icon}</span>
            <h2 className="text-lg font-semibold text-slate-200">{group.label}</h2>
            <span className="text-xs text-slate-500 bg-white/[0.05] px-2 py-0.5 rounded-full">
              {group.tools.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {group.tools.map((tool, ti) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: gi * 0.08 + ti * 0.04 }}
              >
                <ToolCard tool={tool} onClick={() => handleToolClick(tool.id)} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      {grouped.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 text-sm">No tools found matching &ldquo;{searchQuery}&rdquo;</p>
        </div>
      )}
    </section>
  );
}
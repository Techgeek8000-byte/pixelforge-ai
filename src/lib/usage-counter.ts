// ============================================================
// PixelForge AI — Tool Usage Counter (localStorage-based)
// Tracks per-tool usage and recently used tools
// ============================================================

const STORAGE_KEY = 'pf-tool-usage';

export interface ToolUsageRecord {
  toolId: string;
  toolName: string;
  toolIcon: string;
  count: number;
  lastUsedAt: number; // timestamp
}

export function getToolUsage(): ToolUsageRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data: ToolUsageRecord[] = JSON.parse(stored);
      return Array.isArray(data) ? data : [];
    }
  } catch {
    // corrupted data, reset
  }
  return [];
}

export function incrementUsage(toolId: string, toolName: string, toolIcon: string): void {
  if (typeof window === 'undefined') return;
  const records = getToolUsage();
  const existing = records.find((r) => r.toolId === toolId);

  if (existing) {
    existing.count += 1;
    existing.lastUsedAt = Date.now();
  } else {
    records.push({
      toolId,
      toolName,
      toolIcon,
      count: 1,
      lastUsedAt: Date.now(),
    });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function getTotalGenerations(): number {
  const records = getToolUsage();
  return records.reduce((sum, r) => sum + r.count, 0);
}

export function getRecentlyUsed(limit = 4): ToolUsageRecord[] {
  const records = getToolUsage();
  return records
    .sort((a, b) => b.lastUsedAt - a.lastUsedAt)
    .slice(0, limit);
}

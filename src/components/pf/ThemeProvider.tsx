'use client';

import { useEffect, type ReactNode } from 'react';
import { useStore } from '@/lib/store';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('pf-light');
    } else {
      root.classList.remove('pf-light');
    }
  }, [theme]);

  return <>{children}</>;
}

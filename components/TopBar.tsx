'use client';

import { useEffect, useState } from 'react';

type Props = {
  query: string;
  onQueryChange: (q: string) => void;
  totalLinks: number;
  checkedLinks: number;
  onRefresh: () => void;
  refreshing: boolean;
};

export function TopBar({
  query,
  onQueryChange,
  totalLinks,
  checkedLinks,
  onRefresh,
  refreshing,
}: Props) {
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  useEffect(() => {
    const recompute = () => {
      try {
        let done = 0;
        const total = Number(localStorage.getItem('atlas.totalTopics') || '0');
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i) || '';
          if (k.startsWith('atlas.done.') && localStorage.getItem(k) === '1') done++;
        }
        setProgress({ done, total });
      } catch {}
    };
    recompute();
    const id = setInterval(recompute, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-accent to-accent2" />
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-ink">Atlas</span>
            <span className="text-[10px] uppercase tracking-wider text-muted">
              Frontier AI Roadmap
            </span>
          </div>
        </div>

        <div className="flex-1" />

        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search topics, resources, URLs…"
          className="w-64 sm:w-80 rounded-md border border-border bg-panel px-3 py-1.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent"
        />

        <div className="hidden md:flex items-center gap-3 text-xs text-muted">
          <span>
            <span className="text-ink">{checkedLinks}</span>
            <span>/{totalLinks} cached</span>
          </span>
          {progress.total > 0 && (
            <span>
              <span className="text-ok">{progress.done}</span>
              <span> topics done</span>
            </span>
          )}
        </div>

        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="rounded-md border border-border bg-panel px-2.5 py-1.5 text-xs text-ink hover:border-accent hover:text-accent disabled:opacity-50 transition"
          title="Refresh link-status cache for visible resources"
        >
          {refreshing ? 'Checking…' : 'Check links'}
        </button>
      </div>
    </header>
  );
}

'use client';

import { useEffect, useState, type LegacyRef, type RefObject } from 'react';
import type { BookTheme } from './BookShellContext';

type Props = {
  query: string;
  onQueryChange: (q: string) => void;
  totalLinks: number;
  checkedLinks: number;
  onRefresh: () => void;
  refreshing: boolean;
  searchInputRef?: RefObject<HTMLInputElement | null>;
  onToggleToc?: () => void;
  onToggleTheme?: () => void;
  onHome?: () => void;
  theme?: BookTheme;
  onPrev?: () => void;
  onNext?: () => void;
};

export function TopBar({
  query,
  onQueryChange,
  totalLinks,
  checkedLinks,
  onRefresh,
  refreshing,
  searchInputRef,
  onToggleToc,
  onToggleTheme,
  onHome,
  theme,
  onPrev,
  onNext,
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

  const pct = progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : 0;
  const cachePct = totalLinks > 0 ? Math.round((checkedLinks / totalLinks) * 100) : 0;

  return (
    <header
      className="sticky top-0 z-20 border-b backdrop-blur"
      style={{
        borderColor: 'var(--t-border-soft)',
        background: 'color-mix(in srgb, var(--t-bg) 82%, transparent)',
      }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 h-14 flex items-center gap-3">
        <button
          type="button"
          onClick={onHome}
          className="flex items-center gap-2.5 min-w-0 text-left group"
          title="All chapters (H)"
        >
          <span
            className="h-7 w-7 shrink-0 rounded-lg grid place-items-center font-serif text-[13px] font-bold text-white"
            style={{
              background: 'linear-gradient(135deg, var(--t-accent), var(--t-accent2))',
            }}
            aria-hidden
          >
            A
          </span>
          <span className="hidden sm:flex flex-col leading-tight min-w-0">
            <span className="font-serif font-semibold text-ink truncate text-[15px] group-hover:text-accent transition-colors">
              Atlas
            </span>
            <span className="kicker text-[9px] truncate -mt-0.5">Frontier AI · book</span>
          </span>
        </button>

        <span className="mx-1 h-5 w-px bg-[color:var(--t-border-soft)] hidden sm:block" />

        <div className="hidden sm:flex items-center gap-1">
          <button
            type="button"
            onClick={onPrev}
            className="icon-btn"
            title="Previous chapter (←)"
            aria-label="Previous chapter"
          >
            <ArrowIcon dir="left" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="icon-btn"
            title="Next chapter (→)"
            aria-label="Next chapter"
          >
            <ArrowIcon dir="right" />
          </button>
        </div>

        <div className="flex-1" />

        <div className="relative hidden md:block">
          <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            ref={searchInputRef as LegacyRef<HTMLInputElement> | undefined}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search topics… (/)"
            className="w-64 md:w-72 h-[30px] rounded-lg border bg-[color:var(--t-panel)] pl-8 pr-3 text-[13px] text-ink placeholder:text-muted font-sans focus:outline-none"
            style={{ borderColor: 'var(--t-border-soft)' }}
          />
        </div>

        <div className="hidden xl:flex items-center gap-3 text-[11px] text-muted font-sans tabular-nums">
          {progress.total > 0 && (
            <span title="Topics completed">
              <span className="text-ok">{progress.done}</span>/{progress.total} · {pct}%
            </span>
          )}
          <span title="Link status cache">
            <span className="text-ink">{checkedLinks}</span>/{totalLinks} · {cachePct}%
          </span>
        </div>

        {onToggleToc && (
          <button
            type="button"
            onClick={onToggleToc}
            className="lg:hidden nav-btn"
            title="Table of contents (T)"
          >
            TOC
          </button>
        )}

        {onToggleTheme && (
          <button
            type="button"
            onClick={onToggleTheme}
            className="icon-btn hidden sm:grid"
            title={theme === 'night' ? 'Switch to paper' : 'Switch to night'}
            aria-label="Toggle theme"
          >
            {theme === 'night' ? <SunIcon /> : <MoonIcon />}
          </button>
        )}

        <button
          type="button"
          onClick={onRefresh}
          disabled={refreshing}
          className="nav-btn disabled:opacity-50"
          title="Re-check link status"
        >
          {refreshing ? 'Checking…' : 'Check'}
        </button>
      </div>
    </header>
  );
}

function ArrowIcon({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {dir === 'left' ? (
        <path d="M9 2.5 4 7l5 4.5" />
      ) : (
        <path d="M5 2.5 10 7l-5 4.5" />
      )}
    </svg>
  );
}

function SearchIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="6.2" cy="6.2" r="4" />
      <path d="m9.2 9.2 2.6 2.6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.8 8.4A5 5 0 1 1 5.6 2.2a4 4 0 0 0 6.2 6.2z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="2.5" />
      <path d="M7 .8v1.8M7 11.4v1.8M1.4 7H3.2M10.8 7h1.8M2.9 2.9l1.3 1.3M9.8 9.8l1.3 1.3M2.9 11.1l1.3-1.3M9.8 4.2l1.3-1.3" />
    </svg>
  );
}

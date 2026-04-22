'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { BookNavItem } from '@/lib/bookChapters';
import type { Track } from '@/data/curriculum';
import { BookShellProvider, type BookTheme, type BookView } from './BookShellContext';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';

type Props = {
  children: ReactNode;
  items: BookNavItem[];
  tracks: Track[];
  totalLinks: number;
  checkedLinks: number;
  onRefresh: () => void;
  refreshing: boolean;
  query: string;
  onQueryChange: (q: string) => void;
};

const LS_THEME = 'atlas.theme';

function readLS(key: string, d: string): string {
  try {
    if (typeof window === 'undefined') return d;
    return localStorage.getItem(key) ?? d;
  } catch {
    return d;
  }
}

export function BookShell({
  children,
  items,
  tracks,
  totalLinks,
  checkedLinks,
  onRefresh,
  refreshing,
  query,
  onQueryChange,
}: Props) {
  const router = useRouter();
  const search = useSearchParams();
  const activeChapterId = search.get('c') ?? '';
  const activeTopicId = search.get('t');
  const view: BookView = !activeChapterId ? 'home' : activeTopicId ? 'topic' : 'chapter';

  const [theme, setTheme] = useState<BookTheme>(() =>
    readLS(LS_THEME, 'paper') === 'night' ? 'night' : 'paper'
  );
  const [tocOpen, setTocOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(LS_THEME, theme);
    } catch {
      /* */
    }
  }, [theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [activeChapterId, activeTopicId]);

  const navTo = useCallback(
    (params: { c?: string; t?: string } | null) => {
      if (!params || (!params.c && !params.t)) {
        router.push('/');
        return;
      }
      const q = new URLSearchParams();
      if (params.c) q.set('c', params.c);
      if (params.t) q.set('t', params.t);
      router.push(`/?${q.toString()}`);
    },
    [router]
  );

  const scrollToChapter = useCallback(
    (id: string) => {
      setTocOpen(false);
      if (!id) {
        navTo(null);
      } else {
        navTo({ c: id });
      }
    },
    [navTo]
  );

  const scrollToTopic = useCallback(
    (chapterId: string, topicId: string) => {
      setTocOpen(false);
      navTo({ c: chapterId, t: topicId });
    },
    [navTo]
  );

  const navChapter = useCallback(
    (delta: number) => {
      if (view === 'home') {
        const first = items.find((i) => i.id !== 'book-cover');
        if (first && delta > 0) scrollToChapter(first.id);
        return;
      }
      const idx = items.findIndex((i) => i.id === activeChapterId);
      if (idx < 0) return;
      const next = items[idx + delta];
      if (next) scrollToChapter(next.id);
      else if (delta < 0) scrollToChapter('');
    },
    [activeChapterId, items, scrollToChapter, view]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target;
      if (
        t instanceof HTMLInputElement ||
        t instanceof HTMLTextAreaElement ||
        (t instanceof HTMLElement && t.isContentEditable)
      ) {
        if (e.key === 'Escape' && t === searchInputRef.current) {
          (t as HTMLInputElement).blur();
        }
        return;
      }
      if (e.key === '/' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }
      if (e.key === 't' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setTocOpen((o) => !o);
        return;
      }
      if (e.key === 'h' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        scrollToChapter('');
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navChapter(-1);
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        navChapter(1);
        return;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navChapter, scrollToChapter]);

  const onPrev = useCallback(() => navChapter(-1), [navChapter]);
  const onNext = useCallback(() => navChapter(1), [navChapter]);

  const value = {
    view,
    activeChapterId,
    activeTopicId,
    items,
    theme,
    setTheme,
    tocOpen,
    setTocOpen,
    tracks,
    searchInputRef,
    scrollToChapter,
    scrollToTopic,
    onPrevChapter: onPrev,
    onNextChapter: onNext,
  };

  return (
    <BookShellProvider value={value}>
      <div className="min-h-screen book-root font-serif-article">
        <TopBar
          query={query}
          onQueryChange={onQueryChange}
          totalLinks={totalLinks}
          checkedLinks={checkedLinks}
          onRefresh={onRefresh}
          refreshing={refreshing}
          searchInputRef={searchInputRef}
          onToggleToc={() => setTocOpen((o) => !o)}
          onToggleTheme={() =>
            setTheme((t) => (t === 'night' ? 'paper' : 'night'))
          }
          onHome={() => scrollToChapter('')}
          theme={theme}
          onPrev={onPrev}
          onNext={onNext}
        />
        <div
          className={`lg:hidden ${tocOpen ? 'fixed' : 'hidden'} inset-0 z-30 backdrop-blur-sm`}
          style={{ background: 'color-mix(in srgb, var(--t-bg) 70%, transparent)' }}
          onClick={() => setTocOpen(false)}
          aria-hidden
        />
        <div
          className={`lg:hidden ${
            tocOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed z-40 top-14 left-0 bottom-0 w-[min(100%,20rem)] border-r overflow-y-auto transition-transform duration-200`}
          style={{
            background: 'var(--t-bg)',
            borderColor: 'var(--t-border-soft)',
          }}
        >
          <div className="p-4">
            <Sidebar onNavigate={() => setTocOpen(false)} isDrawer />
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-8 py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] gap-10 relative z-[1]">
          <aside className="hidden lg:block">
            <div className="lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 -mr-2">
              <Sidebar />
            </div>
          </aside>

          <main className="min-w-0 text-ink text-[0.95rem] leading-[1.7]">{children}</main>
        </div>
      </div>
    </BookShellProvider>
  );
}

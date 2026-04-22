'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { LinkStatus } from '@/lib/linkCache';

type ReaderPayload = {
  url: string;
  title: string;
  byline: string;
  excerpt: string;
  contentHtml: string;
  hostname: string;
  error?: string;
};

type Props = {
  url: string;
  className?: string;
  onOpenChild?: (u: string) => void;
  statusMap?: Record<string, LinkStatus>;
};

function ReaderInner({ url, statusMap, depth = 0 }: Props & { depth?: number }) {
  const [data, setData] = useState<ReaderPayload | null>(null);
  const [loadState, setLoadState] = useState<'loading' | 'ok' | 'err'>('loading');
  const [childUrl, setChildUrl] = useState<string | null>(null);
  const artRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ok = true;
    setLoadState('loading');
    setData(null);
    const ac = new AbortController();
    fetch(`/api/reader?url=${encodeURIComponent(url)}`, { signal: ac.signal })
      .then((r) => r.json())
      .then((j: ReaderPayload) => {
        if (!ok) return;
        setData(j);
        setLoadState(j.error && !j.contentHtml ? 'err' : 'ok');
      })
      .catch(() => {
        if (!ok) return;
        setLoadState('err');
      });
    return () => {
      ok = false;
      ac.abort();
    };
  }, [url]);

  useEffect(() => {
    const root = artRef.current;
    if (!root) return;
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('a[href]') as HTMLAnchorElement | null;
      if (!t) return;
      const href = t.getAttribute('href');
      if (!href || !/^https?:\/\//i.test(href)) return;
      e.preventDefault();
      e.stopPropagation();
      setChildUrl(href);
    };
    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
  }, [data?.contentHtml]);

  const childClose = useCallback(() => setChildUrl(null), []);

  if (loadState === 'loading' && !data) {
    return (
      <div className="p-4 text-sm text-muted animate-pulse" aria-live="polite">
        Extracting article…
      </div>
    );
  }
  if (!data || (data.error && !data.contentHtml)) {
    return (
      <div className="p-3 text-sm text-err/90 rounded-lg border border-border bg-panel/60">
        {data?.error || 'Reader could not load this page.'} Try opening the original in a new tab.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.excerpt && (
        <p className="text-sm text-muted font-serif border-l-2 border-accent/50 pl-3">
          {data.excerpt}
        </p>
      )}
      {data.byline && <p className="text-xs text-muted">— {data.byline}</p>}
      <div
        ref={artRef}
        className="prose max-w-none prose-reader-article font-serif text-[0.95rem] leading-[1.65] reader-article
        prose-p:my-2 prose-headings:font-serif prose-p:font-serif"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: data.contentHtml }}
      />
      {childUrl && depth < 2 && (
        <div className="rounded-lg border border-accent/30 bg-panel/40 p-3 pl-4 border-l-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs uppercase tracking-wider text-accent">Linked page</span>
            <button
              type="button"
              onClick={childClose}
              className="text-xs text-muted hover:text-ink"
            >
              Close
            </button>
          </div>
          <ReaderInner
            key={childUrl}
            url={childUrl}
            statusMap={statusMap}
            depth={depth + 1}
          />
        </div>
      )}
    </div>
  );
}

export function ReaderView(props: Props) {
  return <ReaderInner {...props} depth={0} />;
}

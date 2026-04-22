'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { LinkStatus } from '@/lib/linkCache';
import { ReaderView } from './ReaderView';

type Props = {
  url: string;
  statusMap?: Record<string, LinkStatus>;
};

type Payload = {
  content?: string;
  error?: string;
};

export function GithubReadme({ url, statusMap }: Props) {
  const [md, setMd] = useState<string | null>(null);
  const [useReader, setUseReader] = useState(false);
  const [loadState, setLoadState] = useState<'load' | 'ok'>('load');

  useEffect(() => {
    let on = true;
    fetch(`/api/github-readme?url=${encodeURIComponent(url)}`)
      .then((r) => r.json() as Promise<Payload>)
      .then((d) => {
        if (!on) return;
        if (d.error || !d.content) setUseReader(true);
        else setMd(d.content);
        setLoadState('ok');
      })
      .catch(() => {
        if (!on) return;
        setUseReader(true);
        setLoadState('ok');
      });
    return () => {
      on = false;
    };
  }, [url]);

  if (loadState === 'load' && !useReader) {
    return <div className="text-sm text-muted p-2 animate-pulse">Loading README…</div>;
  }
  if (useReader) {
    return <ReaderView url={url} statusMap={statusMap} />;
  }
  return (
    <div
      className="prose prose-sm max-w-none font-serif
      prose-p:my-1.5 prose-a:text-accent prose-code:text-ok prose-pre:bg-panel/80
      text-[0.9rem] leading-[1.6] github-readme"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{md ?? ''}</ReactMarkdown>
    </div>
  );
}

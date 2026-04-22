'use client';

import { useState } from 'react';

type Props = { src: string; title: string };

/**
 * @param src - proxied same-origin URL e.g. /api/proxy?url=...
 */
export function PdfEmbed({ src, title }: Props) {
  const [fit, setFit] = useState<'width' | 'page'>('width');

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted">
        <span>View</span>
        <button
          type="button"
          onClick={() => setFit('width')}
          className={`rounded px-2 py-0.5 border ${
            fit === 'width' ? 'border-accent text-accent' : 'border-border hover:text-ink'
          }`}
        >
          fit width
        </button>
        <button
          type="button"
          onClick={() => setFit('page')}
          className={`rounded px-2 py-0.5 border ${
            fit === 'page' ? 'border-accent text-accent' : 'border-border hover:text-ink'
          }`}
        >
          full page
        </button>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-accent hover:underline"
          download
        >
          download
        </a>
      </div>
      <div
        className={`relative w-full overflow-auto rounded-lg border border-border bg-panel/80 ${
          fit === 'width' ? 'h-[min(80vh,900px)]' : 'h-[min(100vh,1200px)]'
        }`}
      >
        <iframe
          title={title}
          src={src}
          className="h-full w-full min-h-[480px] bg-white"
        />
      </div>
    </div>
  );
}

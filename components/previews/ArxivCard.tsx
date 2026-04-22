'use client';

import { useState } from 'react';
import type { LinkStatus } from '@/lib/linkCache';
import { arxivToPdfUrl, isArxivAbsUrl } from '@/lib/linkMeta';
import { ReaderView } from './ReaderView';
import { PdfEmbed } from './PdfEmbed';

type Props = {
  url: string;
  label: string;
  statusMap?: Record<string, LinkStatus>;
};

export function ArxivCard({ url, label, statusMap }: Props) {
  const [mode, setMode] = useState<'read' | 'pdf'>('read');
  const pdf = isArxivAbsUrl(url) ? arxivToPdfUrl(url) : null;
  const proxiedPdf = pdf
    ? `/api/proxy?url=${encodeURIComponent(pdf)}`
    : null;

  if (mode === 'pdf' && proxiedPdf) {
    return (
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2 text-[11px]">
          <button
            type="button"
            onClick={() => setMode('read')}
            className="text-accent hover:underline"
          >
            Show abstract
          </button>
        </div>
        <PdfEmbed title={label} src={proxiedPdf} />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {pdf && (
        <button
          type="button"
          onClick={() => setMode('pdf')}
          className="text-xs font-medium text-accent2 hover:underline"
        >
          Read PDF inline
        </button>
      )}
      <ReaderView url={url} statusMap={statusMap} />
    </div>
  );
}

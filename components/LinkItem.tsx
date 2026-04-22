'use client';

import { useEffect, useState } from 'react';
import type { LinkStatus } from '@/lib/linkCache';
import { shortUrlId } from '@/lib/urlHash';
import { ResourcePreview } from './ResourcePreview';
import { LinkTypeIcon } from './LinkTypeIcon';

type Props = { label: string; url: string; statusMap?: Record<string, LinkStatus> };

function hostOf(u: string): string {
  try {
    return new URL(u).host.replace(/^www\./, '');
  } catch {
    return u;
  }
}

const openKey = (url: string) => `atlas.o.${shortUrlId(url)}`;

function readOpen(url: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(openKey(url)) === '1';
  } catch {
    return false;
  }
}

function writeOpen(url: string, v: boolean) {
  try {
    if (v) localStorage.setItem(openKey(url), '1');
    else localStorage.removeItem(openKey(url));
  } catch {
    /* ignore */
  }
}

export function LinkItem({ label, url, statusMap }: Props) {
  const [status, setStatus] = useState<LinkStatus | undefined>(statusMap?.[url]);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (statusMap?.[url]) setStatus(statusMap[url]);
  }, [statusMap, url]);

  useEffect(() => {
    setMounted(true);
    setOpen(readOpen(url));
  }, [url]);

  const setOpenPersist = (v: boolean) => {
    setOpen(v);
    writeOpen(url, v);
  };

  const dot = !status ? 'dot-pending' : status.ok ? 'dot-ok' : 'dot-err';
  const title = !status
    ? 'Not yet checked'
    : status.ok
    ? `OK (${status.status}) — checked ${new Date(status.checkedAt).toLocaleString()}`
    : `${status.status ?? 'ERR'}${status.error ? ` — ${status.error}` : ''}`;

  return (
    <div
      className={`${
        open ? 'w-full basis-full' : 'inline-block align-top max-w-full'
      }`}
    >
      <div className="inline-flex items-center flex-wrap gap-1.5 font-sans">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-chip group"
          title={title}
        >
          <LinkTypeIcon url={url} className="text-muted group-hover:text-accent" />
          <span className={`inline-block h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden />
          <span className="font-medium text-ink">{label}</span>
          <span className="text-muted group-hover:text-accent/70 text-[11px]">
            {hostOf(url)}
          </span>
        </a>
        <button
          type="button"
          onClick={() => setOpenPersist(!open)}
          className="text-[10.5px] uppercase tracking-wider text-accent hover:text-accent-hi border border-border-soft rounded-md px-2 py-1 transition-colors"
          style={{ borderColor: 'var(--t-border-soft)' }}
        >
          {open ? 'Hide' : 'Preview'}
        </button>
      </div>
      {mounted && open && (
        <div className="preview-frame">
          <ResourcePreview label={label} url={url} statusMap={statusMap} />
        </div>
      )}
    </div>
  );
}

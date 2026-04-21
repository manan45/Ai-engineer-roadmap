'use client';

import { useEffect, useState } from 'react';
import type { LinkStatus } from '@/lib/linkCache';

type Props = { label: string; url: string; statusMap?: Record<string, LinkStatus> };

function hostOf(u: string): string {
  try {
    return new URL(u).host.replace(/^www\./, '');
  } catch {
    return u;
  }
}

export function LinkItem({ label, url, statusMap }: Props) {
  const [status, setStatus] = useState<LinkStatus | undefined>(statusMap?.[url]);

  useEffect(() => {
    if (statusMap?.[url]) setStatus(statusMap[url]);
  }, [statusMap, url]);

  const dot = !status
    ? 'dot-pending'
    : status.ok
    ? 'dot-ok'
    : 'dot-err';
  const title = !status
    ? 'Not yet checked'
    : status.ok
    ? `OK (${status.status}) — checked ${new Date(status.checkedAt).toLocaleString()}`
    : `${status.status ?? 'ERR'}${status.error ? ` — ${status.error}` : ''}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-chip group"
      title={title}
    >
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${dot}`} />
      <span className="font-medium">{label}</span>
      <span className="text-muted group-hover:text-accent/80">· {hostOf(url)}</span>
    </a>
  );
}

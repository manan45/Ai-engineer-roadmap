'use client';

import { classifyUrl, type LinkKind } from '@/lib/linkMeta';

type Props = { url: string; className?: string };

const PATHS: Record<LinkKind, JSX.Element> = {
  youtube: (
    <>
      <rect x="2" y="4" width="14" height="10" rx="2.5" />
      <path d="M7.5 6.5l4 2.5-4 2.5v-5z" fill="currentColor" stroke="none" />
    </>
  ),
  'youtube-playlist': (
    <>
      <rect x="2" y="3" width="11" height="8" rx="1.8" />
      <path d="M15 5v10M5 13h10M6.5 15h8" />
    </>
  ),
  pdf: (
    <>
      <path d="M4.5 2h6l3 3v10.5A1.5 1.5 0 0 1 12 17H4.5A1.5 1.5 0 0 1 3 15.5v-12A1.5 1.5 0 0 1 4.5 2z" />
      <path d="M10 2v3h3" />
      <path d="M5.5 11h1.2c.5 0 .9.4.9.9v0c0 .5-.4.9-.9.9H5.5zm3.3 0h.8c.8 0 1.4.6 1.4 1.4v.2c0 .8-.6 1.4-1.4 1.4h-.8zm3.2 0h1.5m-1.5 1.5h1" />
    </>
  ),
  arxiv: (
    <>
      <path d="M3 3l10 10M13 3L3 13" />
      <path d="M9 8.5h4l-2 4.5" />
    </>
  ),
  github: (
    <>
      <path d="M9 2a7 7 0 0 0-2.2 13.6c.35.07.48-.15.48-.34v-1.18c-1.95.43-2.36-.94-2.36-.94-.32-.82-.78-1.03-.78-1.03-.64-.44.05-.43.05-.43.7.05 1.07.72 1.07.72.63 1.08 1.64.77 2.04.58.06-.45.24-.77.44-.94-1.55-.18-3.19-.78-3.19-3.46 0-.77.27-1.39.72-1.88-.07-.18-.31-.88.07-1.84 0 0 .59-.19 1.93.72a6.7 6.7 0 0 1 3.52 0c1.34-.91 1.93-.72 1.93-.72.38.96.14 1.66.07 1.84.45.49.72 1.11.72 1.88 0 2.69-1.64 3.28-3.2 3.45.25.22.47.65.47 1.31v1.94c0 .19.13.41.48.34A7 7 0 0 0 9 2z" />
    </>
  ),
  docs: (
    <>
      <path d="M4 3h9a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M5.5 6.5h6M5.5 9h6M5.5 11.5h4" />
    </>
  ),
  generic: (
    <>
      <circle cx="9" cy="9" r="6.5" />
      <path d="M2.5 9h13M9 2.5c2 2.2 2 10.8 0 13M9 2.5c-2 2.2-2 10.8 0 13" />
    </>
  ),
};

export function LinkTypeIcon({ url, className = '' }: Props) {
  const k = classifyUrl(url);
  return (
    <svg
      viewBox="0 0 18 18"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      aria-hidden
    >
      {PATHS[k]}
    </svg>
  );
}

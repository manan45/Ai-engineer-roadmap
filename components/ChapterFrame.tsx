'use client';

import { type ReactNode } from 'react';

type Props = { id: string; children: ReactNode; className?: string };

/** Plain wrapper that tags a region with an id/data-chapter; kept for backwards compat. */
export function ChapterFrame({ id, children, className = '' }: Props) {
  return (
    <div id={id} data-chapter={id} className={`scroll-mt-24 ${className}`.trim()}>
      {children}
    </div>
  );
}

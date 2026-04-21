'use client';

import type { Track } from '@/data/curriculum';

type Props = { tracks: Track[] };

const appendixLinks = [
  { id: 'appendix-a', label: 'A · First 90 Days' },
  { id: 'appendix-b', label: 'B · 55 Papers' },
  { id: 'appendix-c', label: 'C · University Courses' },
  { id: 'appendix-d', label: 'D · YouTube' },
  { id: 'appendix-e', label: 'E · Staying Current' },
];

export function Sidebar({ tracks }: Props) {
  return (
    <nav className="sticky top-6 flex flex-col gap-4 text-sm">
      <div>
        <div className="mb-2 text-[11px] uppercase tracking-wider text-muted">Tracks</div>
        <ul className="space-y-1">
          {tracks.map((t) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="text-ink/80 hover:text-accent transition">
                {t.title.replace(/^Track [\d.]+: /, '')}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="mb-2 text-[11px] uppercase tracking-wider text-muted">Appendices</div>
        <ul className="space-y-1">
          {appendixLinks.map((a) => (
            <li key={a.id}>
              <a href={`#${a.id}`} className="text-ink/80 hover:text-accent transition">
                {a.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

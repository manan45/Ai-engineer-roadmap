'use client';

import type { YoutubeCategory } from '@/data/curriculum';
import type { LinkStatus } from '@/lib/linkCache';
import { LinkItem } from './LinkItem';

type Props = { categories: YoutubeCategory[]; statusMap?: Record<string, LinkStatus> };

export function AppendixD({ categories, statusMap }: Props) {
  return (
    <section id="appendix-d" className="scroll-mt-24">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-ink">Appendix D · YouTube Gold Mines</h2>
      </div>
      <div className="grid gap-3">
        {categories.map((cat) => (
          <div key={cat.label} className="rounded-xl border border-border bg-panel/60 p-5">
            <h3 className="text-sm font-semibold text-accent">{cat.label}</h3>
            <div className="mt-3 space-y-3">
              {cat.channels.map((ch) => (
                <div key={ch.name}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-ink">{ch.name}</span>
                    {ch.url && <LinkItem label="channel" url={ch.url} statusMap={statusMap} />}
                  </div>
                  {ch.note && <p className="mt-1 text-xs text-muted italic">{ch.note}</p>}
                  {ch.items && ch.items.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {ch.items.map((l) => (
                        <LinkItem key={l.url} label={l.label} url={l.url} statusMap={statusMap} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

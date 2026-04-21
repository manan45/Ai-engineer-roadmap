'use client';

import type { StayingCurrentSection } from '@/data/curriculum';
import type { LinkStatus } from '@/lib/linkCache';
import { LinkItem } from './LinkItem';

type Props = { sections: StayingCurrentSection[]; statusMap?: Record<string, LinkStatus> };

export function AppendixE({ sections, statusMap }: Props) {
  return (
    <section id="appendix-e" className="scroll-mt-24">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-ink">Appendix E · Staying Current in 2026</h2>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {sections.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-panel/60 p-5">
            <h3 className="text-sm font-semibold text-accent">{s.label}</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {s.entries.map((e) => (
                <LinkItem key={e.url} label={e.label} url={e.url} statusMap={statusMap} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

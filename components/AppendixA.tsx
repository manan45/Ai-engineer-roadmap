'use client';

import type { Week } from '@/data/curriculum';
import type { LinkStatus } from '@/lib/linkCache';
import { LinkItem } from './LinkItem';
import { useEffect, useState } from 'react';

type Props = { weeks: Week[]; statusMap?: Record<string, LinkStatus> };

function useDone(id: string): [boolean, (v: boolean) => void] {
  const [done, setDone] = useState(false);
  useEffect(() => {
    try {
      setDone(localStorage.getItem(`atlas.done.${id}`) === '1');
    } catch {}
  }, [id]);
  const persist = (v: boolean) => {
    setDone(v);
    try {
      if (v) localStorage.setItem(`atlas.done.${id}`, '1');
      else localStorage.removeItem(`atlas.done.${id}`);
    } catch {}
  };
  return [done, persist];
}

function WeekCard({ w, statusMap }: { w: Week; statusMap?: Record<string, LinkStatus> }) {
  const id = `week-${w.n}`;
  const [done, setDone] = useDone(id);
  return (
    <div
      id={id}
      className={`rounded-xl border border-border bg-panel/60 p-5 ${done ? 'opacity-70' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-accent">Week {w.n}</div>
          <h3 className="mt-0.5 text-base font-semibold text-ink">{w.title}</h3>
        </div>
        <label className="flex items-center gap-1.5 text-xs text-muted cursor-pointer select-none">
          <input
            type="checkbox"
            checked={done}
            onChange={(e) => setDone(e.target.checked)}
            className="accent-accent"
          />
          Done
        </label>
      </div>
      <ul className="mt-3 text-sm text-ink/90 list-disc pl-5 space-y-1">
        {w.items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
      {w.links.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {w.links.map((l) => (
            <LinkItem key={l.url} label={l.label} url={l.url} statusMap={statusMap} />
          ))}
        </div>
      )}
      <p className="mt-3 text-sm text-muted">
        <span className="text-accent2 font-medium">Deliverable: </span>
        {w.deliverable}
      </p>
    </div>
  );
}

export function AppendixA({ weeks, statusMap }: Props) {
  return (
    <section className="scroll-mt-0">
      <div className="mb-4">
        <h2 className="text-xl font-serif font-semibold text-ink">Practice A · First 90 Days</h2>
        <p className="mt-1 text-sm text-muted max-w-3xl">
          ~20h/week: ~2h weekday + ~6h weekend. Double down on what your background can&apos;t teach
          you — deep transformer internals, efficient ML at LLM scale, post-training.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {weeks.map((w) => (
          <WeekCard key={w.n} w={w} statusMap={statusMap} />
        ))}
      </div>
    </section>
  );
}

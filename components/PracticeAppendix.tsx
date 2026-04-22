'use client';

import type { PracticeAppendixData } from '@/data/curriculum';
import type { LinkStatus } from '@/lib/linkCache';
import { LinkItem } from './LinkItem';
import { useEffect, useState } from 'react';

type Props = { data: PracticeAppendixData; statusMap?: Record<string, LinkStatus> };

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

function ProblemCard({
  id,
  title,
  note,
  links,
  statusMap,
}: {
  id: string;
  title: string;
  note?: string;
  links: { label: string; url: string }[];
  statusMap?: Record<string, LinkStatus>;
}) {
  const [done, setDone] = useDone(id);
  return (
    <div className={`surface-raised p-4 transition ${done ? 'opacity-75' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-serif text-[15px] text-ink font-semibold leading-snug">
          {title}
        </h4>
        <label className="flex items-center gap-1.5 text-[11px] text-muted cursor-pointer select-none font-sans shrink-0">
          <input
            type="checkbox"
            checked={done}
            onChange={(e) => setDone(e.target.checked)}
            className="accent-accent"
          />
          Done
        </label>
      </div>
      {note && (
        <p className="mt-1.5 text-[13px] text-muted font-serif leading-relaxed">{note}</p>
      )}
      {links.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {links.map((l) => (
            <LinkItem key={l.url} label={l.label} url={l.url} statusMap={statusMap} />
          ))}
        </div>
      )}
    </div>
  );
}

export function PracticeAppendix({ data, statusMap }: Props) {
  return (
    <div>
      <header className="mb-8">
        <div className="flex items-baseline gap-4">
          <span
            aria-hidden
            className="font-serif font-semibold leading-none shrink-0 text-accent2"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 4rem)' }}
          >
            {data.letter}
          </span>
          <div className="min-w-0 flex-1">
            <p className="kicker">Practice</p>
            <h2 className="mt-1 font-serif text-[1.75rem] sm:text-[2.1rem] text-ink font-semibold leading-[1.08] tracking-tight">
              {data.title}
            </h2>
          </div>
        </div>
        <p className="mt-5 text-[0.98rem] leading-[1.7] text-ink-2/90 font-serif max-w-2xl">
          {data.blurb}
        </p>
        <div className="mt-7 h-px bg-[color:var(--t-border-soft)]" />
      </header>

      <div className="space-y-10">
        {data.groups.map((g) => (
          <section key={g.label}>
            <div className="mb-4 flex items-baseline gap-3">
              <span className="text-[10.5px] uppercase tracking-[0.14em] font-sans font-semibold text-accent">
                {g.label}
              </span>
              <span className="text-[11px] text-muted font-sans tabular-nums">
                · {g.problems.length}
              </span>
              <span className="h-px flex-1 bg-[color:var(--t-border-soft)]" />
            </div>
            {g.blurb && (
              <p className="mb-4 text-[13.5px] text-muted font-serif max-w-2xl">{g.blurb}</p>
            )}
            <div className="grid gap-3 md:grid-cols-2">
              {g.problems.map((p, i) => (
                <ProblemCard
                  key={p.title}
                  id={`${data.id}-${g.label}-${i}`}
                  title={p.title}
                  note={p.note}
                  links={p.links}
                  statusMap={statusMap}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import type { Topic } from '@/data/curriculum';
import type { LinkStatus } from '@/lib/linkCache';
import { LinkItem } from './LinkItem';

type Props = { topic: Topic; statusMap?: Record<string, LinkStatus> };

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

export function TopicCard({ topic, statusMap }: Props) {
  const [done, setDone] = useDone(topic.id);
  const [open, setOpen] = useState(true);

  return (
    <div
      id={topic.id}
      className={`rounded-xl border border-border bg-panel/60 p-5 transition ${
        done ? 'opacity-70' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-ink">{topic.title}</h3>
            {topic.hours && <span className="badge">{topic.hours}</span>}
          </div>
          {topic.why && (
            <p className="mt-2 text-sm text-muted">
              <span className="text-accent2 font-medium">Why: </span>
              {topic.why}
            </p>
          )}
          {topic.concept && (
            <p className="mt-2 text-sm text-muted">
              <span className="text-accent2 font-medium">Concept: </span>
              {topic.concept}
            </p>
          )}
          {topic.focus && (
            <p className="mt-2 text-sm text-muted">
              <span className="text-accent font-medium">Focus: </span>
              {topic.focus}
            </p>
          )}
          {topic.note && <p className="mt-2 text-sm text-muted italic">{topic.note}</p>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <label className="flex items-center gap-1.5 text-xs text-muted cursor-pointer select-none">
            <input
              type="checkbox"
              checked={done}
              onChange={(e) => setDone(e.target.checked)}
              className="accent-accent"
            />
            Done
          </label>
          <button
            onClick={() => setOpen((o) => !o)}
            className="text-xs text-muted hover:text-ink"
            aria-label="toggle"
          >
            {open ? '−' : '+'}
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-4 space-y-3">
          <div>
            <div className="text-[11px] uppercase tracking-wide text-accent mb-1.5">
              Primary
            </div>
            <div className="flex flex-wrap gap-1.5">
              {topic.primary.map((l) => (
                <LinkItem key={l.url} label={l.label} url={l.url} statusMap={statusMap} />
              ))}
            </div>
          </div>

          {topic.fallbacks?.map((g, i) => (
            <div key={i}>
              <div className="text-[11px] uppercase tracking-wide text-muted mb-1.5">
                Fallback · {g.label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {g.links.map((l) => (
                  <LinkItem key={l.url} label={l.label} url={l.url} statusMap={statusMap} />
                ))}
              </div>
            </div>
          ))}

          {topic.extras?.map((g, i) => (
            <div key={i}>
              <div className="text-[11px] uppercase tracking-wide text-accent2 mb-1.5">
                {g.label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {g.links.map((l) => (
                  <LinkItem key={l.url} label={l.label} url={l.url} statusMap={statusMap} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

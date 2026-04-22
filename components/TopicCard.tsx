'use client';

import { useEffect, useState } from 'react';
import type { Topic } from '@/data/curriculum';
import type { LinkStatus } from '@/lib/linkCache';
import { LinkItem } from './LinkItem';
import { useBookShellOptional } from './BookShellContext';

type Props = {
  topic: Topic;
  statusMap?: Record<string, LinkStatus>;
  chapterId?: string;
};

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

export function TopicCard({ topic, statusMap, chapterId }: Props) {
  const [done, setDone] = useDone(topic.id);
  const [open, setOpen] = useState(false);
  const book = useBookShellOptional();
  const canNavigate = Boolean(book && chapterId);

  const totalResources =
    topic.primary.length +
    (topic.fallbacks ?? []).reduce((a, g) => a + g.links.length, 0) +
    (topic.extras ?? []).reduce((a, g) => a + g.links.length, 0);

  return (
    <div
      id={topic.id}
      className={`surface-raised p-5 transition ${done ? 'opacity-75' : ''}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {canNavigate ? (
              <button
                type="button"
                onClick={() => book!.scrollToTopic(chapterId!, topic.id)}
                className="text-[1.05rem] font-serif font-semibold text-ink hover:text-accent transition-colors text-left"
                title="Open topic"
              >
                {topic.title}
              </button>
            ) : (
              <h3 className="text-[1.05rem] font-serif font-semibold text-ink">
                {topic.title}
              </h3>
            )}
            {topic.hours && <span className="pill">{topic.hours}</span>}
            <span className="pill">
              {totalResources} {totalResources === 1 ? 'resource' : 'resources'}
            </span>
          </div>
          {topic.why && (
            <p className="mt-2.5 text-[13.5px] text-muted font-serif leading-relaxed">
              <span className="text-accent2 font-medium font-sans text-[11px] uppercase tracking-wider mr-1.5">
                Why
              </span>
              {topic.why}
            </p>
          )}
          {topic.concept && (
            <p className="mt-1.5 text-[13.5px] text-muted font-serif leading-relaxed">
              <span className="text-accent2 font-medium font-sans text-[11px] uppercase tracking-wider mr-1.5">
                Concept
              </span>
              {topic.concept}
            </p>
          )}
          {topic.focus && (
            <p className="mt-1.5 text-[13.5px] text-muted font-serif leading-relaxed">
              <span className="text-accent font-medium font-sans text-[11px] uppercase tracking-wider mr-1.5">
                Focus
              </span>
              {topic.focus}
            </p>
          )}
          {topic.note && (
            <p className="mt-1.5 text-[13px] text-muted/90 italic font-serif">{topic.note}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0 font-sans">
          <label className="flex items-center gap-1.5 text-[11px] text-muted cursor-pointer select-none">
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
            className="icon-btn"
            aria-label={open ? 'Collapse resources' : 'Expand resources'}
            title={open ? 'Collapse' : 'Expand resources'}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              className={`transition-transform ${open ? 'rotate-180' : ''}`}
            >
              <path d="M3 4.5 6 7.5 9 4.5" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-5 space-y-4 border-t border-[color:var(--t-border-soft)] pt-4">
          <ResourceGroup
            label="Primary"
            count={topic.primary.length}
            color="text-accent"
            links={topic.primary}
            statusMap={statusMap}
          />
          {topic.fallbacks?.map((g, i) => (
            <ResourceGroup
              key={`f-${i}`}
              label={`Fallback · ${g.label}`}
              count={g.links.length}
              color="text-muted"
              links={g.links}
              statusMap={statusMap}
            />
          ))}
          {topic.extras?.map((g, i) => (
            <ResourceGroup
              key={`e-${i}`}
              label={g.label}
              count={g.links.length}
              color="text-accent2"
              links={g.links}
              statusMap={statusMap}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ResourceGroup({
  label,
  count,
  color,
  links,
  statusMap,
}: {
  label: string;
  count: number;
  color: string;
  links: { label: string; url: string }[];
  statusMap?: Record<string, LinkStatus>;
}) {
  return (
    <div>
      <div className={`mb-2 flex items-center gap-2 font-sans`}>
        <span className={`text-[10.5px] uppercase tracking-[0.12em] font-semibold ${color}`}>
          {label}
        </span>
        <span className="text-[10.5px] text-muted tabular-nums">·  {count}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {links.map((l) => (
          <LinkItem key={l.url} label={l.label} url={l.url} statusMap={statusMap} />
        ))}
      </div>
    </div>
  );
}

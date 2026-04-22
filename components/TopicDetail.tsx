'use client';

import { useEffect, useState } from 'react';
import type { Topic } from '@/data/curriculum';
import type { LinkStatus } from '@/lib/linkCache';
import { LinkItem } from './LinkItem';
import { useBookShell } from './BookShellContext';

type Props = {
  topic: Topic;
  chapterId: string;
  chapterLabel: string;
  prevTopic?: { id: string; title: string };
  nextTopic?: { id: string; title: string };
  statusMap?: Record<string, LinkStatus>;
};

function useDone(id: string): [boolean, (v: boolean) => void] {
  const [done, setDone] = useState(false);
  useEffect(() => {
    try {
      setDone(localStorage.getItem(`atlas.done.${id}`) === '1');
    } catch {
      /* */
    }
  }, [id]);
  const persist = (v: boolean) => {
    setDone(v);
    try {
      if (v) localStorage.setItem(`atlas.done.${id}`, '1');
      else localStorage.removeItem(`atlas.done.${id}`);
    } catch {
      /* */
    }
  };
  return [done, persist];
}

export function TopicDetail({
  topic,
  chapterId,
  chapterLabel,
  prevTopic,
  nextTopic,
  statusMap,
}: Props) {
  const [done, setDone] = useDone(topic.id);
  const { scrollToChapter, scrollToTopic } = useBookShell();

  const primaryCount = topic.primary.length;
  const fallbackCount = (topic.fallbacks ?? []).reduce((a, g) => a + g.links.length, 0);
  const extraCount = (topic.extras ?? []).reduce((a, g) => a + g.links.length, 0);
  const total = primaryCount + fallbackCount + extraCount;

  return (
    <div>
      <nav className="mb-5 text-[11.5px] font-sans text-muted flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => scrollToChapter('')}
          className="hover:text-accent transition-colors"
        >
          All chapters
        </button>
        <span aria-hidden className="text-muted-2">›</span>
        <button
          type="button"
          onClick={() => scrollToChapter(chapterId)}
          className="hover:text-accent transition-colors"
        >
          {chapterLabel}
        </button>
        <span aria-hidden className="text-muted-2">›</span>
        <span className="text-ink/80">{topic.title}</span>
      </nav>

      <article>
        <header className="mb-7">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <p className="kicker">Topic</p>
              <h1 className="mt-1.5 font-serif text-[1.9rem] sm:text-[2.2rem] text-ink font-semibold leading-[1.1] tracking-tight">
                {topic.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2 font-sans">
                {topic.hours && <span className="pill">{topic.hours}</span>}
                <span className="pill">{total} resources</span>
                {primaryCount > 0 && <span className="pill">{primaryCount} primary</span>}
              </div>
            </div>
            <label className="flex items-center gap-2 text-[12px] text-muted cursor-pointer select-none shrink-0 font-sans nav-btn">
              <input
                type="checkbox"
                checked={done}
                onChange={(e) => setDone(e.target.checked)}
                className="accent-accent"
              />
              {done ? 'Completed' : 'Mark done'}
            </label>
          </div>

          <div className="mt-5 space-y-2 max-w-3xl">
            {topic.why && <Annotation tag="Why" color="accent2" text={topic.why} />}
            {topic.concept && <Annotation tag="Concept" color="accent2" text={topic.concept} />}
            {topic.focus && <Annotation tag="Focus" color="accent" text={topic.focus} />}
            {topic.note && (
              <p className="text-[13.5px] text-muted/90 italic font-serif">{topic.note}</p>
            )}
          </div>
        </header>

        <div className="space-y-6">
          <ResourceSection
            label="Primary"
            count={primaryCount}
            color="text-accent"
            description="Start here. These are the canonical resources for the topic."
            links={topic.primary}
            statusMap={statusMap}
          />

          {topic.fallbacks?.map((g, i) => (
            <ResourceSection
              key={`f-${i}`}
              label={`Fallback · ${g.label}`}
              count={g.links.length}
              color="text-muted"
              description=""
              links={g.links}
              statusMap={statusMap}
            />
          ))}

          {topic.extras?.map((g, i) => (
            <ResourceSection
              key={`e-${i}`}
              label={g.label}
              count={g.links.length}
              color="text-accent2"
              description=""
              links={g.links}
              statusMap={statusMap}
            />
          ))}
        </div>
      </article>

      <nav className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {prevTopic ? (
          <button
            type="button"
            onClick={() => scrollToTopic(chapterId, prevTopic.id)}
            className="surface-raised p-4 text-left group"
            title="Previous topic"
          >
            <span className="kicker">← Previous</span>
            <span className="mt-1 block font-serif text-[14px] text-ink/85 group-hover:text-accent transition-colors">
              {prevTopic.title}
            </span>
          </button>
        ) : (
          <span />
        )}
        {nextTopic ? (
          <button
            type="button"
            onClick={() => scrollToTopic(chapterId, nextTopic.id)}
            className="surface-raised p-4 text-right group sm:col-start-2"
            title="Next topic"
          >
            <span className="kicker">Next →</span>
            <span className="mt-1 block font-serif text-[14px] text-ink/85 group-hover:text-accent transition-colors">
              {nextTopic.title}
            </span>
          </button>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}

function Annotation({
  tag,
  color,
  text,
}: {
  tag: string;
  color: 'accent' | 'accent2';
  text: string;
}) {
  return (
    <p className="text-[14.5px] leading-[1.65] text-ink-2/90 font-serif">
      <span
        className={`text-[10.5px] uppercase tracking-[0.14em] font-sans font-semibold mr-2 align-middle ${
          color === 'accent' ? 'text-accent' : 'text-accent2'
        }`}
      >
        {tag}
      </span>
      {text}
    </p>
  );
}

function ResourceSection({
  label,
  count,
  color,
  description,
  links,
  statusMap,
}: {
  label: string;
  count: number;
  color: string;
  description?: string;
  links: { label: string; url: string }[];
  statusMap?: Record<string, LinkStatus>;
}) {
  return (
    <section>
      <div className="mb-3 flex items-baseline gap-3">
        <span className={`text-[10.5px] uppercase tracking-[0.14em] font-sans font-semibold ${color}`}>
          {label}
        </span>
        <span className="text-[11px] text-muted tabular-nums font-sans">· {count}</span>
        <span className="h-px flex-1 bg-[color:var(--t-border-soft)]" />
      </div>
      {description && (
        <p className="mb-3 text-[13px] text-muted font-serif max-w-2xl">{description}</p>
      )}
      <div className="flex flex-wrap gap-1.5">
        {links.map((l) => (
          <LinkItem key={l.url} label={l.label} url={l.url} statusMap={statusMap} />
        ))}
      </div>
    </section>
  );
}

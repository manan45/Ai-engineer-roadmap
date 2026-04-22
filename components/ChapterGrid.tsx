'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Track } from '@/data/curriculum';
import type { BookNavItem } from '@/lib/bookChapters';
import { useBookShell } from './BookShellContext';

const APP_BLURB: Record<string, string> = {
  'book-cover': 'Welcome + how to read this book.',
  'appendix-a': '12-week cadence — an accelerated path through the core.',
  'appendix-b': 'Reading list — papers every frontier engineer should know.',
  'appendix-c': 'University courses — MIT, Stanford, Berkeley, CMU and more.',
  'appendix-d': 'YouTube channels — lectures, explainers, builders, systems.',
  'appendix-e': 'Staying current — blogs, newsletters, conferences, communities.',
  'appendix-f': 'Coding & DSA — NeetCode 150, Codeforces EDU, CSES, systems-coding drills.',
  'appendix-g': 'ML-from-scratch drills — Karpathy stack, transformer, LoRA, Triton, toy diffusion.',
  'appendix-h': 'ML system design — RAG at scale, inference serving, ads/CTR, coding-agent design.',
  'appendix-i': 'Paper reproductions & projects — nanoGPT, FlashAttention, DPO, shipped RAG.',
};

const APP_TAG: Record<string, string> = {
  'appendix-a': 'A',
  'appendix-b': 'B',
  'appendix-c': 'C',
  'appendix-d': 'D',
  'appendix-e': 'E',
  'appendix-f': 'F',
  'appendix-g': 'G',
  'appendix-h': 'H',
  'appendix-i': 'I',
};

type Props = {
  items: BookNavItem[];
  tracks: Track[];
  trackRoman: Map<string, string>;
};

function usePollingDone(): Set<string> {
  const [set, setSet] = useState<Set<string>>(new Set());
  useEffect(() => {
    const refresh = () => {
      try {
        const next = new Set<string>();
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith('atlas.done.') && localStorage.getItem(k) === '1') {
            next.add(k.slice('atlas.done.'.length));
          }
        }
        setSet(next);
      } catch {
        /* */
      }
    };
    refresh();
    const id = setInterval(refresh, 1200);
    return () => clearInterval(id);
  }, []);
  return set;
}

export function ChapterGrid({ items, tracks, trackRoman }: Props) {
  const { scrollToChapter } = useBookShell();
  const trackById = useMemo(() => new Map(tracks.map((t) => [t.id, t])), [tracks]);
  const done = usePollingDone();

  const chapters = items.filter((c) => !c.id.startsWith('appendix') && c.id !== 'book-cover');
  const appendices = items.filter((c) => c.id.startsWith('appendix'));

  const totalTopics = tracks.reduce((a, t) => a + t.topics.length, 0);
  const totalResources = tracks.reduce(
    (a, t) =>
      a +
      t.topics.reduce(
        (b, tp) =>
          b +
          tp.primary.length +
          (tp.fallbacks ?? []).reduce((c, g) => c + g.links.length, 0) +
          (tp.extras ?? []).reduce((c, g) => c + g.links.length, 0),
        0
      ),
    0
  );
  const doneTopics = chapters.reduce(
    (a, c) => a + c.topicIds.filter((id) => done.has(id)).length,
    0
  );
  const overallPct = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;

  return (
    <div>
      <header className="mb-10">
        <p className="kicker">Atlas · Frontier AI Engineering</p>
        <h1 className="mt-2 font-serif text-[2.2rem] sm:text-5xl text-ink font-semibold leading-[1.05] tracking-tight">
          A book, not a link list.
        </h1>
        <p className="mt-4 text-[0.95rem] leading-relaxed text-muted font-serif max-w-2xl">
          Every paper, lecture, repo and doc a senior engineer needs to reach AI / Staff at a
          frontier lab — read inline, track progress in your browser, no tabs lost.
        </p>

        <dl className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
          <Stat k="Chapters" v={String(chapters.length)} sub={`+ ${appendices.length} practice`} />
          <Stat k="Topics" v={String(totalTopics)} sub={`${doneTopics} done`} />
          <Stat k="Resources" v={String(totalResources)} sub="inline previewable" />
          <Stat k="Your progress" v={`${overallPct}%`} sub={`${doneTopics}/${totalTopics} topics`} />
        </dl>
      </header>

      <section>
        <SectionHead eyebrow="Part I" title="Core chapters" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {chapters.map((c) => {
            const track = trackById.get(c.id);
            const tag = trackRoman.get(c.id) ?? '';
            const doneCount = c.topicIds.filter((id) => done.has(id)).length;
            const pct = c.topicIds.length
              ? Math.round((doneCount / c.topicIds.length) * 100)
              : 0;
            return (
              <ChapterCard
                key={c.id}
                onClick={() => scrollToChapter(c.id)}
                tag={tag}
                eyebrow="Chapter"
                title={(track?.title ?? c.label).replace(/^Track [\d.]+: /, '')}
                blurb={track?.blurb ?? ''}
                footer={
                  <CardFooter
                    left={`${c.topicIds.length} topics`}
                    rightPrimary={`${doneCount}/${c.topicIds.length}`}
                    rightSecondary={`${pct}%`}
                    pct={pct}
                  />
                }
              />
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <SectionHead eyebrow="Part II" title="Practice problems & references" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {appendices.map((c) => (
            <ChapterCard
              key={c.id}
              onClick={() => scrollToChapter(c.id)}
              tag={APP_TAG[c.id] ?? ''}
              eyebrow="Practice"
              title={c.label.replace(/^(Appendix|Practice) [A-Z]: /, '')}
              blurb={APP_BLURB[c.id] ?? ''}
              muted
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ k, v, sub }: { k: string; v: string; sub?: string }) {
  return (
    <div className="surface-raised px-4 py-3">
      <div className="kicker">{k}</div>
      <div className="mt-1 font-serif text-2xl text-ink font-semibold leading-none">{v}</div>
      {sub && <div className="mt-1 text-[11px] text-muted font-sans">{sub}</div>}
    </div>
  );
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-5 flex items-baseline gap-3">
      <span className="kicker">{eyebrow}</span>
      <span className="h-px flex-1 bg-[color:var(--t-border-soft)]" />
      <h2 className="font-serif text-lg text-ink font-semibold">{title}</h2>
    </div>
  );
}

function ChapterCard({
  onClick,
  tag,
  eyebrow,
  title,
  blurb,
  footer,
  muted,
}: {
  onClick: () => void;
  tag: string;
  eyebrow: string;
  title: string;
  blurb?: string;
  footer?: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative overflow-hidden text-left surface-raised p-5 pr-6 min-h-[9.5rem]"
    >
      <span
        aria-hidden
        className={`absolute top-3 right-4 font-serif select-none leading-none transition-colors ${
          muted ? 'text-muted/40' : 'text-[color:var(--t-accent)]/25'
        } group-hover:text-[color:var(--t-accent)]/60`}
        style={{ fontSize: muted ? '2.5rem' : '3.4rem', fontWeight: 600 }}
      >
        {tag}
      </span>
      <div className="kicker">{eyebrow}</div>
      <h3 className="mt-1.5 pr-10 font-serif text-[1.05rem] sm:text-[1.15rem] text-ink font-semibold leading-snug group-hover:text-accent transition-colors">
        {title}
      </h3>
      {blurb && (
        <p className="mt-2.5 text-[13.5px] leading-[1.55] text-muted font-serif line-clamp-3">
          {blurb}
        </p>
      )}
      {footer && <div className="mt-4">{footer}</div>}
    </button>
  );
}

function CardFooter({
  left,
  rightPrimary,
  rightSecondary,
  pct,
}: {
  left: string;
  rightPrimary: string;
  rightSecondary: string;
  pct: number;
}) {
  return (
    <div className="space-y-2 font-sans">
      <div className="flex items-center justify-between text-[11px] text-muted">
        <span>{left}</span>
        <span className="tabular-nums">
          <span className={pct === 100 ? 'text-ok' : pct > 0 ? 'text-warn' : 'text-muted'}>
            {rightPrimary}
          </span>
          <span className="text-muted"> · {rightSecondary}</span>
        </span>
      </div>
      <div className="progress-track">
        <div className="progress-bar" style={{ transform: `scaleX(${pct / 100})` }} />
      </div>
    </div>
  );
}

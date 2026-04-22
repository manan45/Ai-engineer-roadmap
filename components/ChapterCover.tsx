'use client';

import type { Topic } from '@/data/curriculum';
import { useBookShellOptional } from './BookShellContext';

type Props = {
  roman: string;
  fullTitle: string;
  blurb?: string;
  topics: Pick<Topic, 'id' | 'title' | 'hours'>[];
  chapterId?: string;
  className?: string;
};

export function ChapterCover({
  roman,
  fullTitle,
  blurb,
  topics,
  chapterId,
  className = '',
}: Props) {
  const book = useBookShellOptional();
  const shortTitle = fullTitle.replace(/^Track [\d.]+: /, '');

  return (
    <div className={`mb-8 ${className}`.trim()}>
      <div className="flex items-baseline gap-4">
        <span
          aria-hidden
          className="font-serif font-semibold leading-none shrink-0 text-accent"
          style={{ fontSize: 'clamp(2.6rem, 6vw, 4rem)' }}
        >
          {roman}
        </span>
        <div className="min-w-0 flex-1">
          <p className="kicker">Chapter</p>
          <h2 className="mt-1 font-serif text-[1.75rem] sm:text-[2.1rem] text-ink font-semibold leading-[1.08] tracking-tight">
            {shortTitle}
          </h2>
        </div>
      </div>

      {blurb && (
        <p className="mt-5 text-[0.98rem] leading-[1.7] text-ink-2/90 font-serif max-w-2xl">
          {blurb}
        </p>
      )}

      {topics.length > 0 && (
        <div className="mt-6">
          <p className="kicker mb-2">In this chapter · {topics.length} topics</p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1 font-serif text-[14.5px]">
            {topics.map((t) => (
              <li key={t.id}>
                {book && chapterId ? (
                  <button
                    type="button"
                    onClick={() => book.scrollToTopic(chapterId, t.id)}
                    className="text-ink-2 hover:text-accent transition-colors text-left"
                  >
                    {t.title}
                  </button>
                ) : (
                  <span className="text-ink-2">{t.title}</span>
                )}
                {t.hours && (
                  <span className="text-[11px] text-muted font-sans ml-1.5 tabular-nums">
                    {t.hours}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 h-px bg-[color:var(--t-border-soft)]" />
    </div>
  );
}

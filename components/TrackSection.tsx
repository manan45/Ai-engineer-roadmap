'use client';

import { useMemo } from 'react';
import type { Track } from '@/data/curriculum';
import type { LinkStatus } from '@/lib/linkCache';
import { ChapterCover } from './ChapterCover';
import { TopicCard } from './TopicCard';

type Props = {
  track: Track;
  query: string;
  statusMap?: Record<string, LinkStatus>;
  bookRoman?: string;
};

export function TrackSection({ track, query, statusMap, bookRoman }: Props) {
  const filtered = useMemo(() => {
    if (!query) return track.topics;
    const q = query.toLowerCase();
    return track.topics.filter((t) => {
      const hay = [
        t.title,
        t.why ?? '',
        t.concept ?? '',
        t.focus ?? '',
        t.note ?? '',
        ...t.primary.map((l) => `${l.label} ${l.url}`),
        ...(t.fallbacks ?? []).flatMap((g) => [g.label, ...g.links.map((l) => `${l.label} ${l.url}`)]),
        ...(t.extras ?? []).flatMap((g) => [g.label, ...g.links.map((l) => `${l.label} ${l.url}`)]),
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [track, query]);

  if (filtered.length === 0) return null;

  return (
    <section className="scroll-mt-0">
      {bookRoman && (
        <ChapterCover
          roman={bookRoman}
          fullTitle={track.title}
          blurb={track.blurb}
          topics={filtered}
          chapterId={track.id}
        />
      )}
      {!bookRoman && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-ink font-serif">{track.title}</h2>
          {track.blurb && (
            <p className="mt-1 text-sm text-muted max-w-3xl font-serif">{track.blurb}</p>
          )}
        </div>
      )}
      <div className="grid gap-3">
        {filtered.map((t) => (
          <TopicCard
            key={t.id}
            topic={t}
            statusMap={statusMap}
            chapterId={track.id}
          />
        ))}
      </div>
    </section>
  );
}

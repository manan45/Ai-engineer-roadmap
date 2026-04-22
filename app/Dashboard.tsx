'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type {
  Paper,
  PracticeAppendixData,
  Track,
  UniversityCourses,
  Week,
  YoutubeCategory,
  StayingCurrentSection,
} from '@/data/curriculum';
import type { LinkStatus } from '@/lib/linkCache';
import { buildChapterNav, romanByIdOrder } from '@/lib/bookChapters';
import { BookShell } from '@/components/BookShell';
import { ChapterGrid } from '@/components/ChapterGrid';
import { TopicDetail } from '@/components/TopicDetail';
import { TrackSection } from '@/components/TrackSection';
import { AppendixA } from '@/components/AppendixA';
import { AppendixB } from '@/components/AppendixB';
import { AppendixC } from '@/components/AppendixC';
import { AppendixD } from '@/components/AppendixD';
import { AppendixE } from '@/components/AppendixE';
import { PracticeAppendix } from '@/components/PracticeAppendix';

type Props = {
  tracks: Track[];
  weeks: Week[];
  papers: Paper[];
  universities: UniversityCourses[];
  youtubeCategories: YoutubeCategory[];
  stayingCurrent: StayingCurrentSection[];
  practiceAppendices: PracticeAppendixData[];
  initialStatus: Record<string, LinkStatus>;
  allUrls: string[];
};

export function Dashboard(props: Props) {
  return (
    <Suspense fallback={null}>
      <DashboardInner {...props} />
    </Suspense>
  );
}

function DashboardInner({
  tracks,
  weeks,
  papers,
  universities,
  youtubeCategories,
  stayingCurrent,
  practiceAppendices,
  initialStatus,
  allUrls,
}: Props) {
  const search = useSearchParams();
  const activeChapterId = search.get('c') ?? '';
  const activeTopicId = search.get('t');

  const [query, setQuery] = useState('');
  const [statusMap, setStatusMap] = useState<Record<string, LinkStatus>>(initialStatus);
  const [refreshing, setRefreshing] = useState(false);
  const { items } = useMemo(
    () => buildChapterNav(tracks, weeks, practiceAppendices),
    [tracks, weeks, practiceAppendices]
  );
  const trackRoman = useMemo(() => romanByIdOrder(tracks), [tracks]);

  const totalLinks = allUrls.length;
  const checkedLinks = allUrls.filter((u) => statusMap[u]).length;

  useEffect(() => {
    try {
      const totalTopics =
        tracks.reduce((a, t) => a + t.topics.length, 0) + weeks.length;
      localStorage.setItem('atlas.totalTopics', String(totalTopics));
    } catch {
      /* */
    }
  }, [tracks, weeks]);

  const runCheck = async (force = false) => {
    setRefreshing(true);
    try {
      const batchSize = 60;
      const merged: Record<string, LinkStatus> = { ...statusMap };
      for (let i = 0; i < allUrls.length; i += batchSize) {
        const chunk = allUrls.slice(i, i + batchSize);
        const res = await fetch('/api/link-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ urls: chunk, force }),
        });
        if (!res.ok) continue;
        const data = (await res.json()) as Record<string, LinkStatus>;
        Object.assign(merged, data);
        setStatusMap({ ...merged });
      }
    } finally {
      setRefreshing(false);
    }
  };

  const track = tracks.find((t) => t.id === activeChapterId);
  const topic = track?.topics.find((tt) => tt.id === activeTopicId);

  return (
    <BookShell
      items={items}
      tracks={tracks}
      totalLinks={totalLinks}
      checkedLinks={checkedLinks}
      onRefresh={() => runCheck(false)}
      refreshing={refreshing}
      query={query}
      onQueryChange={setQuery}
    >
      {!activeChapterId && (
        <ChapterGrid items={items} tracks={tracks} trackRoman={trackRoman} />
      )}

      {activeChapterId === 'book-cover' && (
        <CoverPanel
          papers={papers}
          totalLinks={totalLinks}
        />
      )}

      {track && topic && (
        <TopicDetail
          topic={topic}
          chapterId={track.id}
          chapterLabel={`${trackRoman.get(track.id) ?? ''}. ${track.title.replace(
            /^Track [\d.]+: /,
            ''
          )}`}
          prevTopic={(() => {
            const i = track.topics.findIndex((x) => x.id === topic.id);
            const p = i > 0 ? track.topics[i - 1] : undefined;
            return p ? { id: p.id, title: p.title } : undefined;
          })()}
          nextTopic={(() => {
            const i = track.topics.findIndex((x) => x.id === topic.id);
            const n = i >= 0 && i < track.topics.length - 1 ? track.topics[i + 1] : undefined;
            return n ? { id: n.id, title: n.title } : undefined;
          })()}
          statusMap={statusMap}
        />
      )}

      {track && !topic && (
        <TrackSection
          track={track}
          query={query}
          statusMap={statusMap}
          bookRoman={trackRoman.get(track.id) ?? ''}
        />
      )}

      {activeChapterId === 'appendix-a' && (
        <AppendixA weeks={weeks} statusMap={statusMap} />
      )}
      {activeChapterId === 'appendix-b' && (
        <AppendixB papers={papers} statusMap={statusMap} />
      )}
      {activeChapterId === 'appendix-c' && (
        <AppendixC universities={universities} statusMap={statusMap} />
      )}
      {activeChapterId === 'appendix-d' && (
        <AppendixD categories={youtubeCategories} statusMap={statusMap} />
      )}
      {activeChapterId === 'appendix-e' && (
        <AppendixE sections={stayingCurrent} statusMap={statusMap} />
      )}

      {(() => {
        const a = practiceAppendices.find((x) => x.id === activeChapterId);
        return a ? <PracticeAppendix data={a} statusMap={statusMap} /> : null;
      })()}

      <footer className="mt-14 pt-6 border-t text-[11px] text-muted font-sans max-w-3xl" style={{ borderColor: 'var(--t-border-soft)' }}>
        <p>Atlas · every URL is from the original curriculum. Link status is cached; completion is stored in your browser.</p>
        <p className="mt-1 text-muted-2">Previews use a server reader mode for sites that block iframes — use the host link to open the original.</p>
      </footer>
    </BookShell>
  );
}

function CoverPanel({ papers, totalLinks }: { papers: Paper[]; totalLinks: number }) {
  return (
    <div className="max-w-3xl">
      <p className="kicker">Compiled April 19, 2026</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl text-ink font-semibold leading-[1.05] tracking-tight">
        Atlas
      </h1>
      <p className="mt-2 text-[0.95rem] text-muted font-sans">
        Frontier AI Engineering — an inline book.
      </p>
      <p className="mt-6 book-drop-cap text-ink-2/90 font-serif text-[1rem] leading-[1.72] max-w-2xl">
        <span className="block">
          Self-contained curriculum for a senior engineer reaching AI / Staff at a frontier lab in
          2–3 years. Every resource is listed here — use Preview to read PDFs, play videos, and
          extract articles inline. Progress stays in your browser.
        </span>
      </p>
      <div className="mt-7 flex flex-wrap gap-2 font-sans">
        <span className="pill">8 tracks + 5 appendices</span>
        <span className="pill">{papers.length} papers</span>
        <span className="pill">{totalLinks} resources</span>
      </div>
      <div className="mt-8 rounded-xl border p-4 max-w-md" style={{ borderColor: 'var(--t-border-soft)' }}>
        <p className="kicker mb-2">Keyboard</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[12px] font-sans text-muted">
          <div><Kbd>H</Kbd> home</div>
          <div><Kbd>T</Kbd> toggle TOC</div>
          <div><Kbd>←</Kbd><Kbd>→</Kbd> chapters</div>
          <div><Kbd>/</Kbd> search</div>
        </div>
      </div>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd
      className="inline-grid place-items-center mr-1 px-1.5 min-w-[1.35rem] h-[1.35rem] rounded border text-[10.5px] text-ink/80 bg-[color:var(--t-panel)]"
      style={{ borderColor: 'var(--t-border-soft)' }}
    >
      {children}
    </kbd>
  );
}

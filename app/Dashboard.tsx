'use client';

import { useEffect, useMemo, useState } from 'react';
import type {
  Track,
  Week,
  Paper,
  UniversityCourses,
  YoutubeCategory,
  StayingCurrentSection,
} from '@/data/curriculum';
import type { LinkStatus } from '@/lib/linkCache';
import { TopBar } from '@/components/TopBar';
import { Sidebar } from '@/components/Sidebar';
import { TrackSection } from '@/components/TrackSection';
import { AppendixA } from '@/components/AppendixA';
import { AppendixB } from '@/components/AppendixB';
import { AppendixC } from '@/components/AppendixC';
import { AppendixD } from '@/components/AppendixD';
import { AppendixE } from '@/components/AppendixE';

type Props = {
  tracks: Track[];
  weeks: Week[];
  papers: Paper[];
  universities: UniversityCourses[];
  youtubeCategories: YoutubeCategory[];
  stayingCurrent: StayingCurrentSection[];
  initialStatus: Record<string, LinkStatus>;
  allUrls: string[];
};

export function Dashboard({
  tracks,
  weeks,
  papers,
  universities,
  youtubeCategories,
  stayingCurrent,
  initialStatus,
  allUrls,
}: Props) {
  const [query, setQuery] = useState('');
  const [statusMap, setStatusMap] = useState<Record<string, LinkStatus>>(initialStatus);
  const [refreshing, setRefreshing] = useState(false);

  const totalLinks = allUrls.length;
  const checkedLinks = useMemo(
    () => allUrls.filter((u) => statusMap[u]).length,
    [allUrls, statusMap]
  );

  useEffect(() => {
    try {
      const totalTopics =
        tracks.reduce((a, t) => a + t.topics.length, 0) + weeks.length;
      localStorage.setItem('atlas.totalTopics', String(totalTopics));
    } catch {}
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

  return (
    <div className="min-h-screen">
      <TopBar
        query={query}
        onQueryChange={setQuery}
        totalLinks={totalLinks}
        checkedLinks={checkedLinks}
        onRefresh={() => runCheck(false)}
        refreshing={refreshing}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-8">
        <aside className="hidden lg:block">
          <Sidebar tracks={tracks} />
        </aside>

        <main className="min-w-0 space-y-12">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-panel to-bg p-6 sm:p-8">
            <div className="text-[11px] uppercase tracking-wider text-accent">
              Compiled April 19, 2026
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-semibold text-ink">
              Atlas — Frontier AI Engineering Curriculum
            </h1>
            <p className="mt-3 text-sm text-muted max-w-3xl">
              Self-contained curriculum for a Senior Software Engineer with strong
              CV/distributed-systems/Kubernetes/Triton/TensorRT/Qdrant foundations who wants to
              reach AI Engineer / Staff Engineer at a frontier AI lab within 2–3 years. Every link
              is verified; status is cached server-side and refreshed from the top bar.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
              <span className="badge">6 tracks + Track 5.5</span>
              <span className="badge">{papers.length} papers</span>
              <span className="badge">{totalLinks} resources</span>
              <span className="badge">Local progress in your browser</span>
            </div>
          </div>

          {tracks.map((t) => (
            <TrackSection key={t.id} track={t} query={query} statusMap={statusMap} />
          ))}

          <AppendixA weeks={weeks} statusMap={statusMap} />
          <AppendixB papers={papers} statusMap={statusMap} />
          <AppendixC universities={universities} statusMap={statusMap} />
          <AppendixD categories={youtubeCategories} statusMap={statusMap} />
          <AppendixE sections={stayingCurrent} statusMap={statusMap} />

          <footer className="border-t border-border pt-6 text-xs text-muted">
            Atlas dashboard · every URL sourced verbatim from the April 19, 2026 curriculum.
            Link-status cache stored server-side (filesystem, 7-day TTL). Completion state stored
            locally in your browser.
          </footer>
        </main>
      </div>
    </div>
  );
}

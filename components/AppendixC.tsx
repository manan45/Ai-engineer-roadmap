'use client';

import type { UniversityCourses } from '@/data/curriculum';
import type { LinkStatus } from '@/lib/linkCache';
import { LinkItem } from './LinkItem';

type Props = { universities: UniversityCourses[]; statusMap?: Record<string, LinkStatus> };

export function AppendixC({ universities, statusMap }: Props) {
  return (
    <section className="scroll-mt-0">
      <div className="mb-4">
        <h2 className="text-xl font-serif font-semibold text-ink">Practice C · Best University Courses</h2>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {universities.map((u) => (
          <div key={u.university} className="rounded-xl border border-border bg-panel/60 p-5">
            <h3 className="text-base font-semibold text-accent">{u.university}</h3>
            <div className="mt-3 space-y-3">
              {u.courses.map((c) => (
                <div key={c.name} className="border-t border-border pt-3 first:border-0 first:pt-0">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-medium text-ink">{c.name}</span>
                    {c.hours && <span className="badge">{c.hours}</span>}
                  </div>
                  {(c.prof || c.note) && (
                    <div className="mt-0.5 text-xs text-muted">
                      {c.prof}
                      {c.prof && c.note ? ' · ' : ''}
                      {c.note && <span className="italic">{c.note}</span>}
                    </div>
                  )}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {c.links.map((l) => (
                      <LinkItem key={l.url} label={l.label} url={l.url} statusMap={statusMap} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

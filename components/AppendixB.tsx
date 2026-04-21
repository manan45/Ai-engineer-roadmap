'use client';

import { useMemo, useState } from 'react';
import type { Paper } from '@/data/curriculum';
import type { LinkStatus } from '@/lib/linkCache';

type Props = { papers: Paper[]; statusMap?: Record<string, LinkStatus> };

export function AppendixB({ papers, statusMap }: Props) {
  const [cat, setCat] = useState<string>('All');
  const categories = useMemo(() => {
    const s = new Set<string>(papers.map((p) => p.category));
    return ['All', ...Array.from(s)];
  }, [papers]);
  const filtered = cat === 'All' ? papers : papers.filter((p) => p.category === cat);

  return (
    <section id="appendix-b" className="scroll-mt-24">
      <div className="mb-4 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-semibold text-ink">Appendix B · Paper Reading List</h2>
          <p className="mt-1 text-sm text-muted">
            {papers.length} canonical papers. Read three/week using Yannic Kilcher or Lilian Weng
            as an accountability partner.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-md border px-2.5 py-1 text-xs transition ${
                cat === c
                  ? 'border-accent text-accent bg-panel'
                  : 'border-border text-muted hover:text-ink hover:border-ink/40'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-panel/60">
        <table className="w-full text-sm">
          <thead className="bg-panel">
            <tr className="text-left text-[11px] uppercase tracking-wide text-muted">
              <th className="px-4 py-2 font-medium">Paper</th>
              <th className="px-4 py-2 font-medium">Authors</th>
              <th className="px-4 py-2 font-medium">Year</th>
              <th className="px-4 py-2 font-medium">Category</th>
              <th className="px-4 py-2 font-medium">Note</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const s = statusMap?.[p.url];
              const dot = !s ? 'dot-pending' : s.ok ? 'dot-ok' : 'dot-err';
              return (
                <tr key={p.url} className="border-t border-border hover:bg-panel/80">
                  <td className="px-4 py-2">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-ink hover:text-accent"
                    >
                      <span className={`inline-block h-1.5 w-1.5 rounded-full ${dot}`} />
                      {p.title}
                    </a>
                  </td>
                  <td className="px-4 py-2 text-muted">{p.authors ?? '—'}</td>
                  <td className="px-4 py-2 text-muted">{p.year ?? '—'}</td>
                  <td className="px-4 py-2 text-muted">{p.category}</td>
                  <td className="px-4 py-2 text-muted">{p.note ?? ''}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

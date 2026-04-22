'use client';

import { useEffect, useMemo, useState } from 'react';
import { useBookShell } from './BookShellContext';

type Props = {
  onNavigate?: () => void;
  isDrawer?: boolean;
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
    const id = setInterval(refresh, 1500);
    return () => clearInterval(id);
  }, []);
  return set;
}

export function Sidebar({ onNavigate }: Props) {
  const {
    items,
    activeChapterId,
    activeTopicId,
    scrollToChapter,
    scrollToTopic,
    tracks,
  } = useBookShell();
  const trackById = useMemo(() => new Map(tracks.map((t) => [t.id, t])), [tracks]);
  const done = usePollingDone();

  const chapters = items.filter((c) => !c.id.startsWith('appendix') && c.id !== 'book-cover');
  const appendices = items.filter((c) => c.id.startsWith('appendix'));

  const renderChapter = (c: (typeof items)[number], index: number) => {
    const isActive = activeChapterId === c.id;
    const track = trackById.get(c.id);
    const doneN = c.topicIds.filter((id) => done.has(id)).length;
    const total = c.topicIds.length;
    const statusColor =
      total === 0
        ? 'var(--t-muted-2)'
        : doneN === total
        ? 'var(--t-ok)'
        : doneN > 0
        ? 'var(--t-warn)'
        : 'var(--t-muted-2)';

    return (
      <div key={c.id}>
        <button
          type="button"
          onClick={() => {
            scrollToChapter(c.id);
            onNavigate?.();
          }}
          className={`w-full text-left flex items-center gap-2 rounded-md pl-2 pr-2 py-1.5 transition ${
            isActive
              ? 'bg-[color:var(--t-panel)] text-accent'
              : 'text-ink/85 hover:text-accent hover:bg-[color:var(--t-panel)]/50'
          }`}
        >
          <span
            className="h-1.5 w-1.5 rounded-full shrink-0"
            style={{ background: statusColor }}
            aria-hidden
          />
          <span className="font-serif text-[12px] text-muted tabular-nums w-4 shrink-0">
            {index + 1}
          </span>
          <span className="text-[13px] font-medium truncate">
            {c.label.replace(/^Track [\d.]+: /, '')}
          </span>
        </button>
        {isActive && track && track.topics.length > 0 && (
          <ul className="mt-1 ml-5 pl-2 border-l border-[color:var(--t-border-soft)] space-y-0.5">
            {track.topics.map((p) => {
              const isTopic = activeTopicId === p.id;
              const isDone = done.has(p.id);
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => {
                      scrollToTopic(c.id, p.id);
                      onNavigate?.();
                    }}
                    className={`block w-full text-left py-1 pl-2 pr-1 rounded text-[12px] leading-snug truncate transition ${
                      isTopic
                        ? 'text-accent bg-[color:var(--t-panel)]'
                        : isDone
                        ? 'text-muted/70 line-through'
                        : 'text-ink/70 hover:text-accent'
                    }`}
                  >
                    {p.title}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  return (
    <nav className="flex flex-col gap-4 text-sm font-sans" aria-label="Table of contents">
      <button
        type="button"
        onClick={() => {
          scrollToChapter('');
          onNavigate?.();
        }}
        className={`text-left rounded-md px-2 py-1.5 font-medium transition text-[13px] ${
          !activeChapterId
            ? 'text-accent bg-[color:var(--t-panel)]'
            : 'text-ink/90 hover:text-accent'
        }`}
      >
        ← All chapters
      </button>

      <div>
        <div className="kicker px-2 mb-1.5">Chapters</div>
        <div className="flex flex-col gap-0.5">
          {chapters.map((c, i) => renderChapter(c, i))}
        </div>
      </div>

      <div>
        <div className="kicker px-2 mb-1.5">Practice</div>
        <div className="flex flex-col gap-0.5">
          {appendices.map((c) => {
            const isActive = activeChapterId === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  scrollToChapter(c.id);
                  onNavigate?.();
                }}
                className={`w-full text-left flex items-center gap-2 rounded-md px-2 py-1.5 transition ${
                  isActive
                    ? 'bg-[color:var(--t-panel)] text-accent'
                    : 'text-ink/80 hover:text-accent hover:bg-[color:var(--t-panel)]/50'
                }`}
              >
                <span className="text-[12px] font-serif text-muted w-4 shrink-0">
                  {c.label.match(/^(?:Appendix|Practice) ([A-Z])/)?.[1] ?? ''}
                </span>
                <span className="text-[13px] truncate">
                  {c.label.replace(/^(?:Appendix|Practice) [A-Z]: /, '')}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

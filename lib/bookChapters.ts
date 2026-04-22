import type { PracticeAppendixData, Track, Week } from '@/data/curriculum';

export type BookNavItem = { id: string; label: string; topicIds: string[] };

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as const;

const APP_LABELS: Record<string, string> = {
  'appendix-a': 'Practice A',
  'appendix-b': 'Practice B',
  'appendix-c': 'Practice C',
  'appendix-d': 'Practice D',
  'appendix-e': 'Practice E',
  'appendix-f': 'Practice F',
  'appendix-g': 'Practice G',
  'appendix-h': 'Practice H',
  'appendix-i': 'Practice I',
};

/**
 * Map track id → book Roman numeral (order follows `tracks` in curriculum data).
 */
export function romanByIdOrder(tracks: Track[]): Map<string, string> {
  const m = new Map<string, string>();
  let n = 0;
  for (const t of tracks) {
    if (t.id === 'track-5-5') {
      m.set(t.id, 'V.5');
    } else {
      m.set(t.id, (ROMAN[n] ?? `§${n + 1}`) as string);
      n += 1;
    }
  }
  return m;
}

/**
 * Build ordered chapter list: cover + tracks (curriculum order) + appendices.
 */
export function buildChapterNav(
  tracks: Track[],
  weeks: Week[],
  practiceAppendices: PracticeAppendixData[] = []
): { items: BookNavItem[]; trackRoman: Map<string, string> } {
  const trackRoman = romanByIdOrder(tracks);
  const items: BookNavItem[] = [{ id: 'book-cover', label: 'Cover', topicIds: [] }];

  for (const t of tracks) {
    const rom = trackRoman.get(t.id) ?? '—';
    const short = t.title.replace(/^Track [\d.]+: /, '');
    items.push({
      id: t.id,
      label: `${rom}. ${short}`,
      topicIds: t.topics.map((p) => p.id),
    });
  }

  items.push(
    {
      id: 'appendix-a',
      label: 'Practice A',
      topicIds: weeks.map((w) => `week-${w.n}`),
    },
    { id: 'appendix-b', label: 'Practice B', topicIds: [] },
    { id: 'appendix-c', label: 'Practice C', topicIds: [] },
    { id: 'appendix-d', label: 'Practice D', topicIds: [] },
    { id: 'appendix-e', label: 'Practice E', topicIds: [] }
  );

  for (const a of practiceAppendices) {
    items.push({
      id: a.id,
      label: `Practice ${a.letter}`,
      topicIds: a.groups.flatMap((g) => g.problems.map((_, i) => `${a.id}-${g.label}-${i}`)),
    });
  }

  return { items, trackRoman };
}

export function appendixIdToLabel(id: string): string {
  return APP_LABELS[id] ?? id;
}

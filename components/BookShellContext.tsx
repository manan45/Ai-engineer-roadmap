'use client';

import { createContext, useContext, type ReactNode, type RefObject } from 'react';
import type { BookNavItem } from '@/lib/bookChapters';
import type { Track } from '@/data/curriculum';

export type BookTheme = 'paper' | 'night';
export type BookView = 'home' | 'chapter' | 'topic';

export type BookShellValue = {
  view: BookView;
  activeChapterId: string;
  activeTopicId: string | null;
  items: BookNavItem[];
  theme: BookTheme;
  setTheme: (t: BookTheme) => void;
  tocOpen: boolean;
  setTocOpen: (v: boolean) => void;
  tracks: Track[];
  searchInputRef: RefObject<HTMLInputElement | null>;
  /** id="" navigates home, otherwise navigates to chapter view. */
  scrollToChapter: (id: string) => void;
  scrollToTopic: (chapterId: string, topicId: string) => void;
  onPrevChapter: () => void;
  onNextChapter: () => void;
};

const Ctx = createContext<BookShellValue | null>(null);

export function useBookShell(): BookShellValue {
  const c = useContext(Ctx);
  if (!c) {
    throw new Error('useBookShell must be used under BookShellProvider');
  }
  return c;
}

export function useBookShellOptional(): BookShellValue | null {
  return useContext(Ctx);
}

type ProviderProps = { value: BookShellValue; children: ReactNode };

export function BookShellProvider({ value, children }: ProviderProps) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

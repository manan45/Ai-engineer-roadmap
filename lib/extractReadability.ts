import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import createDOMPurify from 'dompurify';

export type ReadabilityResult = {
  title: string;
  byline: string;
  excerpt: string;
  contentHtml: string;
  length: number;
};

/**
 * Server-only: run Readability + sanitize via DOMPurify bound to jsdom's window.
 */
export function extractFromHtml(
  url: string,
  html: string
): ReadabilityResult | null {
  const dom = new JSDOM(html, { url });
  const doc = dom.window.document;
  const reader = new Readability(doc);
  const art = reader.parse();
  if (!art?.content) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DOMPurify = createDOMPurify(dom.window as any);
  const clean = DOMPurify.sanitize(art.content, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ['target', 'rel'],
  });
  return {
    title: art.title || 'Untitled',
    byline: art.byline || '',
    excerpt: art.excerpt || '',
    contentHtml: clean,
    length: art.length || 0,
  };
}

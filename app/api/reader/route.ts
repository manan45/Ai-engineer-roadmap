import { NextRequest, NextResponse } from 'next/server';
import { isUrlAllowedForProxy } from '@/lib/curriculumAllowlist';
import { extractFromHtml } from '@/lib/extractReadability';
import { getCached, setEntry, isFresh, type ReaderEntry } from '@/lib/readerCache';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MAX_HTML_BYTES = 5 * 1024 * 1024;
const TIMEOUT_MS = 20_000;

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('url');
  const force = req.nextUrl.searchParams.get('force') === '1';
  if (!raw) {
    return NextResponse.json({ error: 'missing url' }, { status: 400 });
  }
  if (!isUrlAllowedForProxy(raw)) {
    return NextResponse.json({ error: 'url not in curriculum allowlist' }, { status: 403 });
  }

  if (!force) {
    const cached = await getCached(raw);
    if (cached && isFresh(cached) && !cached.error) {
      return NextResponse.json(cached, {
        headers: { 'Cache-Control': 'public, max-age=60, s-maxage=600' },
      });
    }
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(raw, {
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': 'AtlasRoadmapBot/1.0 (+reader)' },
    });
    const ct = res.headers.get('content-type') || '';
    if (!ct.includes('text/html') && !ct.includes('application/xhtml')) {
      const entry: ReaderEntry = {
        url: raw,
        title: 'Not a web page',
        byline: '',
        excerpt: '',
        contentHtml: '',
        hostname: new URL(raw).hostname,
        length: 0,
        fetchedAt: Date.now(),
        error: `content-type: ${ct}`,
      };
      await setEntry(raw, entry);
      return NextResponse.json(entry, { status: 200 });
    }
    const buf = await res.arrayBuffer();
    if (buf.byteLength > MAX_HTML_BYTES) {
      const err: ReaderEntry = {
        url: raw,
        title: 'Page too large',
        byline: '',
        excerpt: '',
        contentHtml: '',
        hostname: new URL(raw).hostname,
        length: 0,
        fetchedAt: Date.now(),
        error: 'exceeds max size',
      };
      await setEntry(raw, err);
      return NextResponse.json(err, { status: 200 });
    }
    const html = new TextDecoder('utf-8', { fatal: false }).decode(buf);
    const parsed = extractFromHtml(raw, html);
    const hostname = new URL(raw).hostname;
    if (!parsed) {
      const entry: ReaderEntry = {
        url: raw,
        title: 'Could not extract',
        byline: '',
        excerpt: '',
        contentHtml: '',
        hostname,
        length: 0,
        fetchedAt: Date.now(),
        error: 'readability returned empty',
      };
      await setEntry(raw, entry);
      return NextResponse.json(entry, { status: 200 });
    }
    const entry: ReaderEntry = {
      url: raw,
      title: parsed.title,
      byline: parsed.byline,
      excerpt: parsed.excerpt,
      contentHtml: parsed.contentHtml,
      hostname,
      length: parsed.length,
      fetchedAt: Date.now(),
    };
    await setEntry(raw, entry);
    return NextResponse.json(entry, {
      headers: { 'Cache-Control': 'public, max-age=60, s-maxage=600' },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'fetch failed';
    const err: ReaderEntry = {
      url: raw,
      title: 'Error',
      byline: '',
      excerpt: '',
      contentHtml: '',
      hostname: (() => {
        try {
          return new URL(raw).hostname;
        } catch {
          return '';
        }
      })(),
      length: 0,
      fetchedAt: Date.now(),
      error: msg,
    };
    await setEntry(raw, err);
    return NextResponse.json(err, { status: 200 });
  } finally {
    clearTimeout(timer);
  }
}

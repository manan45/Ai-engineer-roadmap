import { NextRequest, NextResponse } from 'next/server';
import { isUrlAllowedForProxy } from '@/lib/curriculumAllowlist';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MAX_BYTES = 25 * 1024 * 1024;
const TIMEOUT_MS = 20_000;

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('url');
  if (!raw) {
    return NextResponse.json({ error: 'missing url' }, { status: 400 });
  }
  if (!isUrlAllowedForProxy(raw)) {
    return NextResponse.json({ error: 'url not in curriculum allowlist' }, { status: 403 });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(raw, {
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': 'AtlasRoadmapBot/1.0 (+proxy)' },
    });

    const cl = res.headers.get('content-length');
    if (cl && Number(cl) > MAX_BYTES) {
      return NextResponse.json({ error: 'resource too large' }, { status: 413 });
    }

    if (!res.ok || !res.body) {
      return NextResponse.json(
        { error: `upstream ${res.status}` },
        { status: res.status >= 500 ? 502 : 400 }
      );
    }

    let size = 0;
    const stream = res.body.pipeThrough(
      new TransformStream<Uint8Array, Uint8Array>({
        transform(chunk, ctrl) {
          size += chunk.byteLength;
          if (size > MAX_BYTES) {
            ctrl.error(new Error('max size'));
            return;
          }
          ctrl.enqueue(chunk);
        },
      })
    );

    const type =
      res.headers.get('content-type') || 'application/octet-stream';
    const disp = res.headers.get('content-disposition');
    const headers = new Headers();
    headers.set('Content-Type', type);
    if (type.includes('pdf') || raw.toLowerCase().includes('.pdf')) {
      headers.set('Content-Disposition', 'inline');
    } else if (disp) {
      headers.set('Content-Disposition', 'inline');
    } else {
      headers.set('Content-Disposition', 'inline');
    }
    headers.set('Cache-Control', 'public, max-age=300, s-maxage=3600');
    // Do not pass X-Frame-Options or CSP to allow iframe use

    return new NextResponse(stream, { status: 200, headers });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'fetch failed';
    if (msg === 'max size' || /max size/.test(msg)) {
      return NextResponse.json({ error: 'resource too large' }, { status: 413 });
    }
    return NextResponse.json({ error: msg }, { status: 502 });
  } finally {
    clearTimeout(timer);
  }
}

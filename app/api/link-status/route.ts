import { NextRequest, NextResponse } from 'next/server';
import { getMany, snapshot } from '@/lib/linkCache';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (url) {
    const res = await getMany([url]);
    return NextResponse.json(res[url], {
      headers: { 'Cache-Control': 'public, max-age=60, s-maxage=86400, stale-while-revalidate=604800' },
    });
  }
  const data = await snapshot();
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, max-age=60, s-maxage=86400, stale-while-revalidate=604800' },
  });
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as { urls?: string[]; force?: boolean };
  const urls = Array.isArray(body.urls) ? body.urls.slice(0, 200) : [];
  if (urls.length === 0) return NextResponse.json({}, { status: 400 });
  const res = await getMany(urls, Boolean(body.force));
  return NextResponse.json(res, {
    headers: { 'Cache-Control': 'public, max-age=60, s-maxage=86400, stale-while-revalidate=604800' },
  });
}

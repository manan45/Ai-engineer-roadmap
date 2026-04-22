import { NextRequest, NextResponse } from 'next/server';
import { isUrlAllowedForProxy } from '@/lib/curriculumAllowlist';
import { parseGithubRepo } from '@/lib/linkMeta';
import {
  getCached,
  setEntry,
  isFresh,
  type GithubReadmeEntry,
} from '@/lib/githubReadmeCache';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const GITHUB_TOKEN = process.env.GITHUB_README_TOKEN || process.env.GITHUB_TOKEN;

function cacheKey(owner: string, repo: string) {
  return `github:${owner}/${repo}`;
}

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('url');
  const force = req.nextUrl.searchParams.get('force') === '1';
  if (!raw) {
    return NextResponse.json({ error: 'missing url' }, { status: 400 });
  }
  if (!isUrlAllowedForProxy(raw)) {
    return NextResponse.json({ error: 'url not in curriculum allowlist' }, { status: 403 });
  }
  const parsed = parseGithubRepo(raw);
  if (!parsed) {
    return NextResponse.json({ error: 'not a root repo url' }, { status: 400 });
  }
  const { owner, repo } = parsed;
  const key = cacheKey(owner, repo);

  if (!force) {
    const cached = await getCached(key);
    if (cached && isFresh(cached) && !cached.error) {
      return NextResponse.json(cached, {
        headers: { 'Cache-Control': 'public, max-age=60, s-maxage=600' },
      });
    }
  }

  const baseHeaders: Record<string, string> = {
    'User-Agent': 'AtlasRoadmapBot/1.0 (+github-readme)',
  };
  if (GITHUB_TOKEN) baseHeaders.Authorization = `Bearer ${GITHUB_TOKEN}`;

  const api = `https://api.github.com/repos/${owner}/${repo}/readme`;
  try {
    const resRaw = await fetch(api, {
      headers: { ...baseHeaders, Accept: 'application/vnd.github.v3.raw' },
    });
    if (resRaw.ok) {
      const content = await resRaw.text();
      if (content && !content.trim().startsWith('{')) {
        const ent: GithubReadmeEntry = {
          url: raw,
          owner,
          repo,
          content,
          encoding: 'utf8',
          fetchedAt: Date.now(),
        };
        await setEntry(key, ent);
        return NextResponse.json(ent, {
          headers: { 'Cache-Control': 'public, max-age=60, s-maxage=600' },
        });
      }
    }
    const resJ = await fetch(api, {
      headers: { ...baseHeaders, Accept: 'application/vnd.github+json' },
    });
    if (resJ.ok) {
      const j = (await resJ.json()) as {
        content?: string;
        encoding?: string;
        sha?: string;
      };
      if (j.content) {
        const dec =
          j.encoding === 'base64'
            ? Buffer.from(j.content, 'base64').toString('utf8')
            : j.content;
        const ent: GithubReadmeEntry = {
          url: raw,
          owner,
          repo,
          content: dec,
          encoding: 'utf8',
          sha: j.sha,
          fetchedAt: Date.now(),
        };
        await setEntry(key, ent);
        return NextResponse.json(ent, {
          headers: { 'Cache-Control': 'public, max-age=60, s-maxage=600' },
        });
      }
    }
  } catch {
    /* fall through */
  }

  const ent: GithubReadmeEntry = {
    url: raw,
    owner,
    repo,
    content: '',
    encoding: 'utf8',
    fetchedAt: Date.now(),
    error: 'github api failed; use reader view for this page',
  };
  await setEntry(key, ent);
  return NextResponse.json(ent, { status: 200 });
}

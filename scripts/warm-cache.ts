import { promises as fs } from 'node:fs';
import path from 'node:path';
import { allLinks } from '../data/curriculum';
import { isUrlAllowedForProxy } from '../lib/curriculumAllowlist';
import { extractFromHtml } from '../lib/extractReadability';
import { classifyUrl, parseGithubRepo } from '../lib/linkMeta';
import {
  getCached as getGithubCache,
  isFresh as isGithubFresh,
  setEntry as setGithubEntry,
  type GithubReadmeEntry,
} from '../lib/githubReadmeCache';
import { getCached, isFresh, setEntry, type ReaderEntry } from '../lib/readerCache';

type LinkStatus = {
  url: string;
  ok: boolean;
  status: number | null;
  checkedAt: number;
  error?: string;
};

const ROOT = process.cwd();
const CACHE_DIR = path.join(ROOT, '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'link-status.json');
const TTL_MS = 1000 * 60 * 60 * 24 * 7;
const READER_MAX = 5 * 1024 * 1024;
const READER_TO = 20_000;
const GITHUB_TOKEN = process.env.GITHUB_README_TOKEN || process.env.GITHUB_TOKEN;

async function probe(url: string): Promise<LinkStatus> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 7000);
  try {
    let res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': 'AtlasRoadmapBot/1.0 (+link-check)' },
    });
    if (res.status === 405 || res.status === 403 || res.status === 400) {
      res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'user-agent': 'AtlasRoadmapBot/1.0 (+link-check)' },
      });
    }
    return { url, ok: res.ok, status: res.status, checkedAt: Date.now() };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { url, ok: false, status: null, checkedAt: Date.now(), error: msg };
  } finally {
    clearTimeout(timer);
  }
}

function ghKey(owner: string, repo: string) {
  return `github:${owner}/${repo}`;
}

async function warmReaderUrl(url: string) {
  if (!isUrlAllowedForProxy(url)) return;
  const c = await getCached(url);
  if (c && isFresh(c)) return;
  const controller = new AbortController();
  const to = setTimeout(() => controller.abort(), READER_TO);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'user-agent': 'AtlasRoadmapBot/1.0 (+warm-reader)' },
    });
    const ct = res.headers.get('content-type') || '';
    if (!ct.includes('text/html') && !ct.includes('application/xhtml')) {
      const err: ReaderEntry = {
        url,
        title: 'Not HTML',
        byline: '',
        excerpt: '',
        contentHtml: '',
        hostname: new URL(url).hostname,
        length: 0,
        fetchedAt: Date.now(),
        error: `content-type: ${ct}`,
      };
      await setEntry(url, err);
      return;
    }
    const buf = await res.arrayBuffer();
    if (buf.byteLength > READER_MAX) {
      const err: ReaderEntry = {
        url,
        title: 'Large',
        byline: '',
        excerpt: '',
        contentHtml: '',
        hostname: new URL(url).hostname,
        length: 0,
        fetchedAt: Date.now(),
        error: 'exceeds max',
      };
      await setEntry(url, err);
      return;
    }
    const html = new TextDecoder('utf-8', { fatal: false }).decode(buf);
    const parsed = extractFromHtml(url, html);
    const hostname = new URL(url).hostname;
    if (!parsed) {
      await setEntry(url, {
        url,
        title: 'Unparsed',
        byline: '',
        excerpt: '',
        contentHtml: '',
        hostname,
        length: 0,
        fetchedAt: Date.now(),
        error: 'readability',
      });
      return;
    }
    await setEntry(url, {
      url,
      title: parsed.title,
      byline: parsed.byline,
      excerpt: parsed.excerpt,
      contentHtml: parsed.contentHtml,
      hostname,
      length: parsed.length,
      fetchedAt: Date.now(),
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await setEntry(url, {
      url,
      title: 'err',
      byline: '',
      excerpt: '',
      contentHtml: '',
      hostname: (() => {
        try {
          return new URL(url).hostname;
        } catch {
          return '';
        }
      })(),
      length: 0,
      fetchedAt: Date.now(),
      error: msg,
    });
  } finally {
    clearTimeout(to);
  }
}

async function warmGithubReadmePage(url: string) {
  const p = parseGithubRepo(url);
  if (!p) return;
  const key = ghKey(p.owner, p.repo);
  const c = await getGithubCache(key);
  if (c && isGithubFresh(c)) return;
  const h: Record<string, string> = {
    'user-agent': 'AtlasRoadmapBot/1.0',
    accept: 'application/vnd.github.v3.raw',
  };
  if (GITHUB_TOKEN) h.authorization = `Bearer ${GITHUB_TOKEN}`;
  try {
    const api = `https://api.github.com/repos/${p.owner}/${p.repo}/readme`;
    const resR = await fetch(api, { headers: h });
    if (resR.ok) {
      const text = await resR.text();
      if (text && !text.trim().startsWith('{')) {
        const ent: GithubReadmeEntry = {
          url,
          owner: p.owner,
          repo: p.repo,
          content: text,
          encoding: 'utf8',
          fetchedAt: Date.now(),
        };
        await setGithubEntry(key, ent);
        return;
      }
    }
    const h2: Record<string, string> = {
      'user-agent': 'AtlasRoadmapBot/1.0',
      accept: 'application/vnd.github+json',
    };
    if (GITHUB_TOKEN) h2.authorization = `Bearer ${GITHUB_TOKEN}`;
    const resJ = await fetch(api, { headers: h2 });
    if (resJ.ok) {
      const j = (await resJ.json()) as { content?: string; encoding?: string; sha?: string };
      if (j.content) {
        const dec =
          j.encoding === 'base64'
            ? Buffer.from(j.content, 'base64').toString('utf8')
            : j.content;
        await setGithubEntry(key, {
          url,
          owner: p.owner,
          repo: p.repo,
          content: dec,
          encoding: 'utf8',
          sha: j.sha,
          fetchedAt: Date.now(),
        });
        return;
      }
    }
    await setGithubEntry(key, {
      url,
      owner: p.owner,
      repo: p.repo,
      content: '',
      encoding: 'utf8',
      fetchedAt: Date.now(),
      error: 'api',
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await setGithubEntry(key, {
      url,
      owner: p.owner,
      repo: p.repo,
      content: '',
      encoding: 'utf8',
      fetchedAt: Date.now(),
      error: msg,
    });
  }
}

async function warmContent(urls: string[]) {
  const wantReader: string[] = [];
  const wantGithub: string[] = [];
  for (const u of urls) {
    if (!isUrlAllowedForProxy(u)) continue;
    const k = classifyUrl(u);
    if (k === 'youtube' || k === 'youtube-playlist' || k === 'pdf') continue;
    if (k === 'github' && parseGithubRepo(u)) wantGithub.push(u);
    else if (k !== 'github') wantReader.push(u);
  }
  console.log(
    `[warm-cache] reader: ${wantReader.length} · github: ${wantGithub.length}`
  );
  const C = 4;
  for (let i = 0; i < wantReader.length; i += C) {
    const batch = wantReader.slice(i, i + C);
    await Promise.all(batch.map((u) => warmReaderUrl(u)));
    process.stdout.write(`  reader ${Math.min(i + C, wantReader.length)}/${wantReader.length}\r`);
  }
  if (wantReader.length) console.log();
  for (let i = 0; i < wantGithub.length; i += C) {
    const batch = wantGithub.slice(i, i + C);
    await Promise.all(batch.map((u) => warmGithubReadmePage(u)));
    process.stdout.write(`  github ${Math.min(i + C, wantGithub.length)}/${wantGithub.length}\r`);
  }
  if (wantGithub.length) console.log();
}

async function main() {
  await fs.mkdir(CACHE_DIR, { recursive: true });
  let existing: Record<string, LinkStatus> = {};
  try {
    existing = JSON.parse(await fs.readFile(CACHE_FILE, 'utf8'));
  } catch {}

  const urls = allLinks().map((l) => l.url);
  console.log(`[warm-cache] ${urls.length} URLs; existing: ${Object.keys(existing).length}`);

  const now = Date.now();
  const todo = urls.filter((u) => !existing[u] || now - existing[u].checkedAt > TTL_MS);
  console.log(`[warm-cache] probing: ${todo.length}`);

  const CONC = 10;
  for (let i = 0; i < todo.length; i += CONC) {
    const batch = todo.slice(i, i + CONC);
    const results = await Promise.all(batch.map((u) => probe(u)));
    results.forEach((r) => (existing[r.url] = r));
    process.stdout.write(`  ${Math.min(i + CONC, todo.length)}/${todo.length}\r`);
  }
  await fs.writeFile(CACHE_FILE, JSON.stringify(existing), 'utf8');
  const ok = Object.values(existing).filter((s) => s.ok).length;
  console.log(`\n[warm-cache] links done · ok ${ok}/${Object.keys(existing).length}`);

  try {
    await warmContent(urls);
    console.log('[warm-cache] reader + github pass complete (best-effort)');
  } catch (e) {
    console.warn('[warm-cache] content warm non-fatal', e);
  }
}

main().catch((e) => {
  console.error('[warm-cache] failed', e);
  process.exit(0);
});

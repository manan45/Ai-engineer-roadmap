import { promises as fs } from 'node:fs';
import path from 'node:path';
import { allLinks } from '../data/curriculum';

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
  console.log(`\n[warm-cache] done · ok ${ok}/${Object.keys(existing).length}`);
}

main().catch((e) => {
  console.error('[warm-cache] failed', e);
  process.exit(0);
});

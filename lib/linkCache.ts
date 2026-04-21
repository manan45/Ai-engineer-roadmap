import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

export type LinkStatus = {
  url: string;
  ok: boolean;
  status: number | null;
  checkedAt: number;
  error?: string;
};

const TTL_MS = 1000 * 60 * 60 * 24 * 7;

function baselineFile(): string {
  return path.join(process.cwd(), '.cache', 'link-status.json');
}

function writeDir(): string {
  return process.env.NETLIFY || process.env.VERCEL
    ? path.join(os.tmpdir(), 'atlas-link-cache')
    : path.join(process.cwd(), '.cache');
}

function writeFile(): string {
  return path.join(writeDir(), 'link-status.json');
}

async function ensureWriteDir(): Promise<void> {
  await fs.mkdir(writeDir(), { recursive: true });
}

let memCache: Record<string, LinkStatus> | null = null;

async function readJson(p: string): Promise<Record<string, LinkStatus>> {
  try {
    const raw = await fs.readFile(p, 'utf8');
    return JSON.parse(raw) as Record<string, LinkStatus>;
  } catch {
    return {};
  }
}

async function loadAll(): Promise<Record<string, LinkStatus>> {
  if (memCache) return memCache;
  const baseline = await readJson(baselineFile());
  const runtime = await readJson(writeFile());
  const merged: Record<string, LinkStatus> = { ...baseline };
  for (const [u, s] of Object.entries(runtime)) {
    const b = merged[u];
    if (!b || s.checkedAt > b.checkedAt) merged[u] = s;
  }
  memCache = merged;
  return memCache;
}

async function saveAll(data: Record<string, LinkStatus>): Promise<void> {
  memCache = data;
  try {
    await ensureWriteDir();
    await fs.writeFile(writeFile(), JSON.stringify(data), 'utf8');
  } catch {
    // best-effort cache
  }
}

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
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'fetch failed';
    return { url, ok: false, status: null, checkedAt: Date.now(), error: msg };
  } finally {
    clearTimeout(timer);
  }
}

export async function getStatus(url: string, force = false): Promise<LinkStatus> {
  const all = await loadAll();
  const hit = all[url];
  if (!force && hit && Date.now() - hit.checkedAt < TTL_MS) return hit;
  const fresh = await probe(url);
  all[url] = fresh;
  await saveAll(all);
  return fresh;
}

export async function getMany(urls: string[], force = false): Promise<Record<string, LinkStatus>> {
  const all = await loadAll();
  const out: Record<string, LinkStatus> = {};
  const toProbe: string[] = [];
  for (const u of urls) {
    const hit = all[u];
    if (!force && hit && Date.now() - hit.checkedAt < TTL_MS) {
      out[u] = hit;
    } else {
      toProbe.push(u);
    }
  }
  const batchSize = 8;
  for (let i = 0; i < toProbe.length; i += batchSize) {
    const batch = toProbe.slice(i, i + batchSize);
    const results = await Promise.all(batch.map((u) => probe(u)));
    results.forEach((r) => {
      all[r.url] = r;
      out[r.url] = r;
    });
  }
  if (toProbe.length > 0) await saveAll(all);
  return out;
}

export async function snapshot(): Promise<Record<string, LinkStatus>> {
  return loadAll();
}

import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

export type ReaderEntry = {
  url: string;
  title: string;
  byline: string;
  excerpt: string;
  contentHtml: string;
  hostname: string;
  length: number;
  fetchedAt: number;
  error?: string;
};

const TTL_MS = 1000 * 60 * 60 * 24 * 30;

function baselineFile(): string {
  return path.join(process.cwd(), '.cache', 'reader-cache.json');
}

function writeDir(): string {
  return process.env.NETLIFY || process.env.VERCEL
    ? path.join(os.tmpdir(), 'atlas-reader-cache')
    : path.join(process.cwd(), '.cache');
}

function writeFile(): string {
  return path.join(writeDir(), 'reader-cache.json');
}

async function ensureWriteDir(): Promise<void> {
  await fs.mkdir(writeDir(), { recursive: true });
}

let memCache: Record<string, ReaderEntry> | null = null;

async function readJson(p: string): Promise<Record<string, ReaderEntry>> {
  try {
    const raw = await fs.readFile(p, 'utf8');
    return JSON.parse(raw) as Record<string, ReaderEntry>;
  } catch {
    return {};
  }
}

async function loadAll(): Promise<Record<string, ReaderEntry>> {
  if (memCache) return memCache;
  const baseline = await readJson(baselineFile());
  const runtime = await readJson(writeFile());
  const merged: Record<string, ReaderEntry> = { ...baseline };
  for (const [k, e] of Object.entries(runtime)) {
    const b = merged[k];
    if (!b || e.fetchedAt > b.fetchedAt) merged[k] = e;
  }
  memCache = merged;
  return memCache;
}

async function saveAll(data: Record<string, ReaderEntry>): Promise<void> {
  memCache = data;
  try {
    await ensureWriteDir();
    await fs.writeFile(writeFile(), JSON.stringify(data), 'utf8');
  } catch {
    /* best-effort */
  }
}

export function isFresh(entry: ReaderEntry | undefined): boolean {
  if (!entry) return false;
  if (entry.error) return Date.now() - entry.fetchedAt < TTL_MS;
  return Date.now() - entry.fetchedAt < TTL_MS;
}

export async function getCached(url: string): Promise<ReaderEntry | undefined> {
  const all = await loadAll();
  return all[url];
}

export async function setEntry(url: string, entry: ReaderEntry): Promise<void> {
  const all = await loadAll();
  all[url] = entry;
  await saveAll(all);
}

export async function getMany(
  urls: string[]
): Promise<Record<string, ReaderEntry | undefined>> {
  const all = await loadAll();
  const out: Record<string, ReaderEntry | undefined> = {};
  for (const u of urls) out[u] = all[u];
  return out;
}

export function snapshotUrl(url: string): Promise<ReaderEntry | undefined> {
  return getCached(url);
}

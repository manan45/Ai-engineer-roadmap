import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

export type GithubReadmeEntry = {
  url: string;
  owner: string;
  repo: string;
  content: string;
  encoding: 'base64' | 'utf8';
  sha?: string;
  fetchedAt: number;
  error?: string;
};

const TTL_MS = 1000 * 60 * 60 * 24 * 30;

function baselineFile(): string {
  return path.join(process.cwd(), '.cache', 'github-readme-cache.json');
}

function writeDir(): string {
  return process.env.NETLIFY || process.env.VERCEL
    ? path.join(os.tmpdir(), 'atlas-github-readme-cache')
    : path.join(process.cwd(), '.cache');
}

function writeFile(): string {
  return path.join(writeDir(), 'github-readme-cache.json');
}

async function ensureWriteDir(): Promise<void> {
  await fs.mkdir(writeDir(), { recursive: true });
}

let memCache: Record<string, GithubReadmeEntry> | null = null;

async function readJson(p: string): Promise<Record<string, GithubReadmeEntry>> {
  try {
    const raw = await fs.readFile(p, 'utf8');
    return JSON.parse(raw) as Record<string, GithubReadmeEntry>;
  } catch {
    return {};
  }
}

async function loadAll(): Promise<Record<string, GithubReadmeEntry>> {
  if (memCache) return memCache;
  const baseline = await readJson(baselineFile());
  const runtime = await readJson(writeFile());
  const merged: Record<string, GithubReadmeEntry> = { ...baseline };
  for (const [k, e] of Object.entries(runtime)) {
    const b = merged[k];
    if (!b || e.fetchedAt > b.fetchedAt) merged[k] = e;
  }
  memCache = merged;
  return memCache;
}

async function saveAll(data: Record<string, GithubReadmeEntry>): Promise<void> {
  memCache = data;
  try {
    await ensureWriteDir();
    await fs.writeFile(writeFile(), JSON.stringify(data), 'utf8');
  } catch {
    /* best-effort */
  }
}

export function isFresh(entry: GithubReadmeEntry | undefined): boolean {
  if (!entry) return false;
  if (entry.error) return Date.now() - entry.fetchedAt < TTL_MS;
  return Date.now() - entry.fetchedAt < TTL_MS;
}

export async function getCached(
  key: string
): Promise<GithubReadmeEntry | undefined> {
  const all = await loadAll();
  return all[key];
}

export async function setEntry(
  key: string,
  entry: GithubReadmeEntry
): Promise<void> {
  const all = await loadAll();
  all[key] = entry;
  await saveAll(all);
}

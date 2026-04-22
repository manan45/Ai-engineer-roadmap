import { allLinks } from '@/data/curriculum';

let hostSet: Set<string> | null = null;

/**
 * Hostnames of every URL in the curriculum (lowercase, no leading www).
 */
export function getAllowedHosts(): Set<string> {
  if (hostSet) return hostSet;
  const s = new Set<string>();
  for (const l of allLinks()) {
    try {
      s.add(new URL(l.url).hostname.toLowerCase().replace(/^www\./, ''));
    } catch {
      /* ignore */
    }
  }
  hostSet = s;
  return s;
}

export function isUrlAllowedForProxy(url: string): boolean {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return false;
  }
  if (u.protocol !== 'https:' && u.protocol !== 'http:') return false;
  const h = u.hostname.toLowerCase().replace(/^www\./, '');
  return getAllowedHosts().has(h);
}

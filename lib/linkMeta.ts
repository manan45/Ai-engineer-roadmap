/**
 * Classify curriculum URLs for inline previews.
 */
export type LinkKind =
  | 'youtube'
  | 'youtube-playlist'
  | 'pdf'
  | 'arxiv'
  | 'github'
  | 'docs'
  | 'generic';

export function classifyUrl(url: string): LinkKind {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return 'generic';
  }
  const host = u.hostname.toLowerCase().replace(/^www\./, '');
  const path = u.pathname.toLowerCase();
  const search = u.search;

  if (host === 'github.com') {
    const bad = /\/(tree|blob|raw|issues|pull|discussions|actions|wiki|settings|edit)\//.test(
      path
    );
    if (!bad) {
      const parts = path.split('/').filter(Boolean);
      if (parts.length === 2) return 'github';
    }
  }
  if (path.endsWith('.pdf') || /\.pdf($|[?#])/i.test(path)) {
    return 'pdf';
  }
  if (host === 'arxiv.org' || host.endsWith('.arxiv.org')) {
    if (path.includes('/pdf/') || path.endsWith('.pdf')) return 'pdf';
    return 'arxiv';
  }
  if (host === 'youtu.be' || host.endsWith('youtube.com')) {
    if (search.includes('list=') || (path === '/watch' && search.includes('list=')))
      return 'youtube-playlist';
    if (path.includes('playlist') && search.includes('list=')) return 'youtube-playlist';
    if (path.startsWith('/channel/') || path.startsWith('/@') || path === '/c/' || path.startsWith('/user/')) {
      return 'generic';
    }
    if (
      (path === '/watch' && search.includes('v=')) ||
      host === 'youtu.be' ||
      path.startsWith('/shorts/') ||
      path.startsWith('/embed/')
    ) {
      return 'youtube';
    }
  }
  if (host === 'readthedocs.io' || host.endsWith('readthedocs.io') || /docs\./.test(url)) {
    return 'docs';
  }
  return 'generic';
}

export function getYoutubeVideoId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be' || u.hostname === 'www.youtu.be') {
      const id = u.pathname.split('/').filter(Boolean)[0];
      return id || null;
    }
    if (u.hostname.replace(/^www\./, '').endsWith('youtube.com')) {
      if (u.searchParams.get('v')) return u.searchParams.get('v');
      const p = u.pathname;
      if (p.startsWith('/shorts/')) {
        return p.split('/').filter(Boolean)[1] || null;
      }
      if (p.startsWith('/embed/')) {
        return p.split('/').filter(Boolean)[1] || null;
      }
    }
  } catch {
    return null;
  }
  return null;
}

export function getYoutubePlaylistId(url: string): string | null {
  try {
    const u = new URL(url);
    const list = u.searchParams.get('list');
    if (list) return list;
  } catch {
    return null;
  }
  return null;
}

/**
 * /abs/ and /html/ pages.
 */
export function isArxivAbsUrl(url: string): boolean {
  try {
    const u = new URL(url);
    const h = u.hostname.toLowerCase().replace(/^www\./, '');
    if (h !== 'arxiv.org' && h !== 'export.arxiv.org' && h !== 'www.arxiv.org') return false;
    return u.pathname.includes('/abs/') || u.pathname.includes('/html/');
  } catch {
    return false;
  }
}

export function arxivToPdfUrl(url: string): string | null {
  if (!isArxivAbsUrl(url)) return null;
  try {
    const u = new URL(url);
    const m = u.pathname.match(/\/(?:abs|html)\/([^/]+)/);
    if (m) return `https://arxiv.org/pdf/${m[1]}.pdf`;
  } catch {
    return null;
  }
  return null;
}

export function parseGithubRepo(
  url: string
): { owner: string; repo: string } | null {
  try {
    const u = new URL(url);
    const h = u.hostname.toLowerCase().replace(/^www\./, '');
    if (h !== 'github.com') return null;
    const parts = u.pathname.split('/').filter(Boolean);
    if (parts.length < 2) return null;
    if (['settings', 'orgs', 'topics', 'collections', 'sponsors'].includes(parts[0].toLowerCase())) return null;
    return {
      owner: parts[0],
      repo: parts[1].replace(/\.git$/, ''),
    };
  } catch {
    return null;
  }
}

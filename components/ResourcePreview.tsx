'use client';

import type { LinkStatus } from '@/lib/linkCache';
import {
  classifyUrl,
  getYoutubeVideoId,
  getYoutubePlaylistId,
} from '@/lib/linkMeta';
import { YouTubeEmbed } from './previews/YouTubeEmbed';
import { PdfEmbed } from './previews/PdfEmbed';
import { ReaderView } from './previews/ReaderView';
import { ArxivCard } from './previews/ArxivCard';
import { GithubReadme } from './previews/GithubReadme';

type Props = {
  label: string;
  url: string;
  statusMap?: Record<string, LinkStatus>;
};

/**
 * Picks the best inline preview (YouTube, PDF, arXiv, GitHub README, reader).
 */
export function ResourcePreview({ label, url, statusMap }: Props) {
  const kind = classifyUrl(url);
  const vid = getYoutubeVideoId(url);
  const list = getYoutubePlaylistId(url);
  const proxied =
    kind === 'pdf' ? `/api/proxy?url=${encodeURIComponent(url)}` : null;

  if (kind === 'youtube' || kind === 'youtube-playlist') {
    if (list) {
      return <YouTubeEmbed videoId={vid} playlistId={list} title={label} />;
    }
    if (vid) {
      return <YouTubeEmbed videoId={vid} playlistId={null} title={label} />;
    }
  }

  if (kind === 'pdf' && proxied) {
    return <PdfEmbed title={label} src={proxied} />;
  }

  if (kind === 'arxiv') {
    return <ArxivCard label={label} url={url} statusMap={statusMap} />;
  }

  if (kind === 'github') {
    return <GithubReadme url={url} statusMap={statusMap} />;
  }

  return <ReaderView url={url} statusMap={statusMap} />;
}

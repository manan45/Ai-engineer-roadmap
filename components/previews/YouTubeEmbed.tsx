'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  videoId?: string | null;
  playlistId?: string | null;
  title: string;
};

const ORIGIN = typeof window !== 'undefined' ? window.location.origin : '';

export function YouTubeEmbed({ videoId, playlistId, title }: Props) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const src = playlistId
    ? `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(playlistId)}&rel=0&modestbranding=1&origin=${encodeURIComponent(ORIGIN)}`
    : videoId
    ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0&modestbranding=1&origin=${encodeURIComponent(ORIGIN)}`
    : null;

  if (!src) {
    return (
      <p className="text-sm text-muted p-2">Could not build YouTube embed. Use &quot;Open original&quot;.</p>
    );
  }

  return (
    <div ref={ref} className="relative w-full aspect-video max-h-[80vh] rounded-lg overflow-hidden border border-border bg-panel">
      {visible && (
        <iframe
          title={title}
          className="absolute inset-0 h-full w-full"
          src={src}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';

export default function ProcessVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPlayback = () => {
      if (reducedMotion.matches || document.hidden) {
        video.pause();
        return;
      }
      void video.play().catch(() => {
        /* The first frame remains visible when autoplay is unavailable. */
      });
    };

    syncPlayback();
    reducedMotion.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      reducedMotion.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="process-video"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/media/pozan-process-loop.mp4" type="video/mp4" />
    </video>
  );
}

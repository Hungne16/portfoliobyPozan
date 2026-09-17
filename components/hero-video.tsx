'use client';

import { useEffect, useRef } from 'react';

export default function HeroVideo() {
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
        /* The poster remains visible when a browser blocks autoplay. */
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
      className="hero-video"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/anime-studio.png"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/media/pozan-hero-loop.mp4" type="video/mp4" />
    </video>
  );
}

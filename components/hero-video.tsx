'use client';

import { useEffect, useRef } from 'react';

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inViewport = true;
    const syncPlayback = () => {
      if (reducedMotion.matches || document.hidden || !inViewport) {
        video.pause();
        return;
      }
      void video.play().catch(() => {
        /* The poster remains visible when a browser blocks autoplay. */
      });
    };

    syncPlayback();
    const observer = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.01 });
    observer.observe(video);
    reducedMotion.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      reducedMotion.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
      observer.disconnect();
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

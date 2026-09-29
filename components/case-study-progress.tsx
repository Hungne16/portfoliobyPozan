'use client';

import { useEffect, useRef } from 'react';

export default function CaseStudyProgress() {
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      bar.current?.style.setProperty('--case-progress', `${Math.min(1, scrollY / max)}`);
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener('scroll', requestUpdate, { passive: true });
    addEventListener('resize', requestUpdate);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('scroll', requestUpdate);
      removeEventListener('resize', requestUpdate);
    };
  }, []);

  return <span ref={bar} className="case-reading-progress" aria-hidden="true" />;
}

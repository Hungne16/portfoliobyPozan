'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

gsap.registerPlugin(useGSAP);

export default function IntroCurtain({ onReady }: { onReady: () => void }) {
  const root = useRef<HTMLDialogElement>(null);
  useGSAP(
    () => {
      const overlay = root.current!;
      const content =
        overlay.parentElement!.querySelector<HTMLElement>('.story-content')!;
      const html = document.documentElement;
      const previousOverflow = html.style.overflow;
      const previousInert = content.inert;
      const previousFocus = document.activeElement as HTMLElement | null;
      let done = false;
      let disposed = false;
      let timeline: gsap.core.Timeline | undefined;
      const release = () => {
        if (done || disposed) return;
        done = true;
        timeline?.kill();
        overlay.close();
        overlay.style.display = 'none';
        content.inert = previousInert;
        html.style.overflow = previousOverflow;
        if (overlay.contains(document.activeElement))
          previousFocus?.focus({ preventScroll: true });
        onReady();
      };
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        release();
        return;
      }
      overlay.style.display = 'grid';
      overlay.showModal();
      content.inert = true;
      html.style.overflow = 'hidden';
      const skip = overlay.querySelector<HTMLButtonElement>('button')!;
      skip.focus({ preventScroll: true });
      skip.addEventListener('click', release);
      const escape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') release();
      };
      window.addEventListener('keydown', escape);
      // A bounded asset wait: the curtain can never trap visitors behind failed assets.
      const safety = window.setTimeout(release, 4500);
      let waitTimer: ReturnType<typeof setTimeout>;
      let minimumTimer: ReturnType<typeof setTimeout>;
      const image = content.querySelector<HTMLImageElement>('.hero-art img');
      const assets = Promise.allSettled([
        document.fonts.ready,
        image?.decode() ?? Promise.resolve(),
      ]);
      const bounded = Promise.race([
        assets,
        new Promise((resolve) => {
          waitTimer = setTimeout(resolve, 2200);
        }),
      ]);
      const minimum = new Promise((resolve) => {
        minimumTimer = setTimeout(resolve, 450);
      });
      void Promise.all([bounded, minimum]).then(() => {
        if (done || disposed) return;
        timeline = gsap
          .timeline({ onComplete: release, defaults: { ease: 'power4.inOut' } })
          .to(overlay.querySelector('.curtain-title'), {
            opacity: 0,
            y: -18,
            duration: 0.3,
          })
          .to(
            overlay.querySelectorAll('.curtain-top .curtain-tile'),
            {
              yPercent: -102,
              duration: 1.1,
              stagger: { each: 0.065, from: 'center' },
            },
            0.15,
          )
          .to(
            overlay.querySelectorAll('.curtain-bottom .curtain-tile'),
            {
              yPercent: 102,
              duration: 1.1,
              stagger: { each: 0.065, from: 'center' },
            },
            0.15,
          )
          .to(skip, { opacity: 0, duration: 0.2 }, 0.15);
      });
      return () => {
        disposed = true;
        timeline?.kill();
        clearTimeout(safety);
        clearTimeout(waitTimer);
        clearTimeout(minimumTimer);
        skip.removeEventListener('click', release);
        window.removeEventListener('keydown', escape);
        content.inert = previousInert;
        html.style.overflow = previousOverflow;
        overlay.style.display = 'none';
        overlay.close();
      };
    },
    { scope: root },
  );

  return (
    <dialog ref={root} className="intro-curtain" aria-label="Đang mở portfolio">
      <div className="curtain-half curtain-top" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <span className="curtain-tile" key={i} />
        ))}
      </div>
      <div className="curtain-half curtain-bottom" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <span className="curtain-tile" key={i} />
        ))}
      </div>
      <div className="curtain-title">
        <span>想像から、はじまる。</span>
        <strong>✳ pozan.</strong>
        <p>ENGINEERING IMAGINATION — SYSTEM BOOTING</p>
      </div>
      <button type="button" className="curtain-skip">
        Bỏ qua phần mở đầu ↗
      </button>
    </dialog>
  );
}

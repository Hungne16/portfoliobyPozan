'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

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
      let hasSeenIntro = false;
      try {
        hasSeenIntro = window.sessionStorage.getItem('pozan-ink-intro') === '1';
      } catch {
        /* The intro remains available when session storage is unavailable. */
      }
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
        try {
          window.sessionStorage.setItem('pozan-ink-intro', '1');
        } catch {
          /* Storage is an enhancement, not a requirement for releasing content. */
        }
        if (overlay.contains(document.activeElement))
          previousFocus?.focus({ preventScroll: true });
        onReady();
      };
      if (
        hasSeenIntro ||
        window.matchMedia(
          '(prefers-reduced-motion: reduce), (max-width: 700px)',
        ).matches
      ) {
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
      const video = content.querySelector<HTMLVideoElement>('.hero-video');
      const videoReady = new Promise<void>((resolve) => {
        if (!video || video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          resolve();
          return;
        }
        video.addEventListener('loadeddata', () => resolve(), { once: true });
        video.addEventListener('error', () => resolve(), { once: true });
      });
      const assets = Promise.allSettled([document.fonts.ready, videoReady]);
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
        const progress = { value: 0 };
        const progressLabel =
          overlay.querySelector<HTMLElement>('.curtain-progress')!;
        const inkSurface = overlay.querySelector<HTMLElement>('.ink-surface')!;
        const inkPool = overlay.querySelector<HTMLElement>('.ink-pool')!;
        const inkDrops = overlay.querySelectorAll<HTMLElement>('.ink-drip');
        const inkRipples = overlay.querySelectorAll<HTMLElement>('.ink-ripple');
        const inkSplatters = overlay.querySelectorAll<HTMLElement>('.ink-splatter');
        timeline = gsap
          .timeline({ onComplete: release, defaults: { ease: 'power3.inOut' } })
          .to(progress, {
            value: 100,
            duration: 1.45,
            ease: 'power2.inOut',
            onUpdate: () => {
              progressLabel.textContent = `${Math.round(progress.value)
                .toString()
                .padStart(2, '0')}%`;
            },
          })
          .to(overlay.querySelector('.curtain-loader'), {
            autoAlpha: 0,
            duration: 0.26,
            y: -18,
          })
          .fromTo(
            inkRipples,
            { autoAlpha: 0, scale: 0.14 },
            {
              autoAlpha: 0.88,
              duration: 0.62,
              ease: 'power2.out',
              scale: 1.1,
              stagger: 0.1,
              transformOrigin: '50% 50%',
            },
            1.32,
          )
          .to(
            inkDrops,
            {
              duration: 0.58,
              ease: 'back.out(1.3)',
              scaleY: (index) => 1.04 + index * 0.08,
              stagger: { each: 0.055, from: 'center' },
              y: (index) => 30 + index * 10,
            },
            1.38,
          )
          .fromTo(
            inkSplatters,
            { autoAlpha: 0, scale: 0.2 },
            {
              autoAlpha: 0.9,
              duration: 0.34,
              ease: 'back.out(1.8)',
              scale: 1,
              stagger: 0.06,
              transformOrigin: '50% 50%',
            },
            1.56,
          )
          .to(
            inkSurface,
            {
              duration: 0.98,
              ease: 'power4.in',
              scaleY: 0.1,
              transformOrigin: '50% 100%',
            },
            1.62,
          )
          .to(
            inkPool,
            {
              duration: 0.78,
              ease: 'power3.inOut',
              scaleX: 1.12,
              scaleY: 0.48,
              transformOrigin: '50% 100%',
            },
            1.76,
          )
          .to(
            inkDrops,
            {
              autoAlpha: 0,
              duration: 0.3,
              ease: 'power2.in',
              stagger: { each: 0.025, from: 'edges' },
              y: '+=54',
            },
            2.18,
          )
          .to(
            [inkSurface, inkPool, inkRipples, inkSplatters],
            {
              autoAlpha: 0,
              duration: 0.22,
              ease: 'power1.out',
            },
            2.38,
          )
          .to(
            overlay,
            {
              autoAlpha: 0,
              duration: 0.24,
            },
            2.46,
          )
          .to(skip, { autoAlpha: 0, duration: 0.16 }, 2.36);
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
      <div className="ink-surface" aria-hidden="true">
        <span className="ink-glow" />
        {Array.from({ length: 7 }, (_, i) => (
          <span className={`ink-drip ink-drip-${i + 1}`} key={i} />
        ))}
      </div>
      <div className="ink-pool" aria-hidden="true">
        <span className="ink-ripple ink-ripple-1" />
        <span className="ink-ripple ink-ripple-2" />
        <span className="ink-ripple ink-ripple-3" />
        {Array.from({ length: 5 }, (_, i) => (
          <span className={`ink-splatter ink-splatter-${i + 1}`} key={i} />
        ))}
      </div>
      <div className="curtain-loader">
        <span className="curtain-loader-kicker">POZAN / INK PROTOCOL</span>
        <strong className="curtain-loader-mark">PZ</strong>
        <div className="curtain-loader-line">
          <span>
            INK FORMING — <b className="curtain-progress">00%</b>
          </span>
          <i />
          <span>ORIGIN / STORY / BUILD</span>
        </div>
        <div className="curtain-spinner" aria-hidden="true">
          <i />
        </div>
        <p>IDEAS LEAVE A MARK BEFORE THEY BECOME A WORLD.</p>
      </div>
      <button type="button" className="curtain-skip">
        Bỏ qua phần mở đầu ↗
      </button>
    </dialog>
  );
}

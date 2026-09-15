'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

gsap.registerPlugin(useGSAP);

type SpotlightSetters = {
  x: (value: number) => gsap.core.Tween;
  y: (value: number) => gsap.core.Tween;
};

export default function SignalCursor() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cursor = root.current!;
      const core = cursor.querySelector<HTMLElement>('.signal-cursor-core')!;
      const ring = cursor.querySelector<HTMLElement>('.signal-cursor-ring')!;
      const label = cursor.querySelector<HTMLElement>('.signal-cursor-label')!;
      const media = gsap.matchMedia();

      media.add(
        '(pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          document.documentElement.classList.add('signal-cursor-enabled');
          cursor.classList.add('is-enabled');
          gsap.set([core, ring], { xPercent: -50, yPercent: -50 });

          const coreX = gsap.quickTo(core, 'x', {
            duration: 0.12,
            ease: 'power3.out',
          });
          const coreY = gsap.quickTo(core, 'y', {
            duration: 0.12,
            ease: 'power3.out',
          });
          const ringX = gsap.quickTo(ring, 'x', {
            duration: 0.42,
            ease: 'power3.out',
          });
          const ringY = gsap.quickTo(ring, 'y', {
            duration: 0.42,
            ease: 'power3.out',
          });
          const spotlightSetters = new WeakMap<HTMLElement, SpotlightSetters>();
          let activeVisual: HTMLElement | null = null;
          let activeTarget: Element | null = null;

          const getSpotlightSetters = (visual: HTMLElement) => {
            const existing = spotlightSetters.get(visual);
            if (existing) return existing;
            const setters = {
              x: gsap.quickTo(visual, '--spot-x', {
                duration: 0.28,
                ease: 'power2.out',
              }),
              y: gsap.quickTo(visual, '--spot-y', {
                duration: 0.28,
                ease: 'power2.out',
              }),
            };
            spotlightSetters.set(visual, setters);
            return setters;
          };

          const resolveLabel = (target: Element | null) => {
            if (!target) return '';
            if (target.matches('.project-visual')) return 'VIEW PROJECT';
            if (target.matches('summary')) return 'EXPAND';
            if (target.matches('.language-switcher button')) return 'SELECT';
            if (target.matches('a')) return 'OPEN';
            if (target.matches('button')) return 'SELECT';
            return '';
          };

          const move = (event: PointerEvent) => {
            coreX(event.clientX);
            coreY(event.clientY);
            ringX(event.clientX);
            ringY(event.clientY);
            cursor.classList.add('is-visible');

            const element = event.target as Element;
            const visual = element.closest<HTMLElement>('.project-visual');
            if (visual !== activeVisual) {
              activeVisual?.classList.remove('is-pointer-active');
              activeVisual = visual;
              activeVisual?.classList.add('is-pointer-active');
            }
            if (visual) {
              const rect = visual.getBoundingClientRect();
              const setters = getSpotlightSetters(visual);
              setters.x(
                gsap.utils.clamp(
                  0,
                  100,
                  ((event.clientX - rect.left) / rect.width) * 100,
                ),
              );
              setters.y(
                gsap.utils.clamp(
                  0,
                  100,
                  ((event.clientY - rect.top) / rect.height) * 100,
                ),
              );
            }

            const target = element.closest(
              '.project-visual, a, button, summary',
            );
            if (target !== activeTarget) {
              activeTarget = target;
              const nextLabel = resolveLabel(target);
              label.textContent = nextLabel;
              cursor.classList.toggle('is-interactive', Boolean(nextLabel));
              gsap.to(ring, {
                scale: nextLabel ? 1.28 : 1,
                duration: 0.28,
                ease: 'power3.out',
                overwrite: 'auto',
              });
            }
          };

          const leave = () => {
            cursor.classList.remove('is-visible', 'is-interactive');
            activeVisual?.classList.remove('is-pointer-active');
            activeVisual = null;
            activeTarget = null;
          };

          const press = () => {
            gsap.fromTo(
              ring,
              { scale: 0.68, opacity: 0.25 },
              {
                scale: cursor.classList.contains('is-interactive') ? 1.28 : 1,
                opacity: 1,
                duration: 0.38,
                ease: 'back.out(2.2)',
                overwrite: true,
              },
            );
          };

          window.addEventListener('pointermove', move, { passive: true });
          document.documentElement.addEventListener('mouseleave', leave);
          window.addEventListener('blur', leave);
          window.addEventListener('pointerdown', press, { passive: true });

          return () => {
            window.removeEventListener('pointermove', move);
            document.documentElement.removeEventListener('mouseleave', leave);
            window.removeEventListener('blur', leave);
            window.removeEventListener('pointerdown', press);
            activeVisual?.classList.remove('is-pointer-active');
            document.documentElement.classList.remove('signal-cursor-enabled');
            cursor.classList.remove(
              'is-enabled',
              'is-visible',
              'is-interactive',
            );
          };
        },
      );

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="signal-cursor" aria-hidden="true">
      <span className="signal-cursor-core" />
      <span className="signal-cursor-ring">
        <i className="signal-cursor-label" />
      </span>
    </div>
  );
}

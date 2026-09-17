'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const chapters = [
  ['home', '00', 'ORIGIN', '#c7ff3d'],
  ['about', '01', 'SIGNAL', '#c7ff3d'],
  ['experience', '02', 'PROCESS', '#c7ff3d'],
  ['projects', '03', 'EVIDENCE', '#c7ff3d'],
  ['visual-lab', '04', 'VISUAL LAB', '#c7ff3d'],
  ['skills', '05', 'TOOLKIT', '#c7ff3d'],
  ['cv', '06', 'PROFILE', '#c7ff3d'],
  ['contact', '07', 'TRANSMISSION', '#c7ff3d'],
] as const;

export default function CinematicEffects() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = root.current!;
      const media = gsap.matchMedia();

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const chapterCode = container.querySelector<HTMLElement>(
          '.chapter-transmission-code',
        )!;
        const chapterName = container.querySelector<HTMLElement>(
          '.chapter-transmission-name',
        )!;
        const chapterLine = container.querySelector<HTMLElement>(
          '.chapter-transmission-line',
        )!;
        const aura = container.querySelector<HTMLElement>('.chapter-aura')!;
        const warp = container.querySelector<HTMLElement>('.scroll-warp')!;
        const velocity = container.querySelector<HTMLElement>(
          '.scroll-velocity-value',
        )!;
        let activeChapter = '';

        const showChapter = (code: string, name: string, color: string) => {
          if (activeChapter === code) return;
          activeChapter = code;
          gsap
            .timeline({ defaults: { overwrite: 'auto' } })
            .to([chapterCode, chapterName], {
              y: -10,
              autoAlpha: 0,
              duration: 0.16,
              ease: 'power2.in',
            })
            .set(chapterCode, { textContent: code })
            .set(chapterName, { textContent: name })
            .fromTo(
              [chapterCode, chapterName],
              { y: 12, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.34,
                stagger: 0.035,
                ease: 'power3.out',
              },
            )
            .fromTo(
              chapterLine,
              { scaleX: 0, transformOrigin: 'left center' },
              { scaleX: 1, duration: 0.5, ease: 'power3.out' },
              '<',
            );
          gsap.to(aura, {
            '--aura-color': color,
            duration: 1.1,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        };

        chapters.forEach(([id, code, name, color]) => {
          ScrollTrigger.create({
            trigger: document.getElementById(id),
            start: 'top center',
            end: 'bottom center',
            onRefresh: (self) => {
              if (self.isActive) showChapter(code, name, color);
            },
            onEnter: () => showChapter(code, name, color),
            onEnterBack: () => showChapter(code, name, color),
          });
        });

        const warpOpacity = gsap.quickTo(warp, 'opacity', {
          duration: 0.16,
          ease: 'power2.out',
        });
        const warpScale = gsap.quickTo(warp, 'scaleY', {
          duration: 0.18,
          ease: 'power2.out',
        });
        const settle = gsap
          .delayedCall(0.1, () => {
            warpOpacity(0);
            warpScale(0.8);
            velocity.textContent = '0000';
          })
          .pause();

        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            let current: (typeof chapters)[number] = chapters[0];
            chapters.forEach((chapter) => {
              if (
                (document.getElementById(chapter[0])?.getBoundingClientRect()
                  .top ?? Infinity) <=
                innerHeight * 0.5
              )
                current = chapter;
            });
            showChapter(current[1], current[2], current[3]);
            const rawVelocity = Math.abs(self.getVelocity());
            const intensity = gsap.utils.clamp(0, 1, rawVelocity / 2600);
            velocity.textContent = Math.round(rawVelocity)
              .toString()
              .padStart(4, '0')
              .slice(-4);
            warpOpacity(intensity * 0.42);
            warpScale(0.8 + intensity * 0.7);
            settle.restart(true);
          },
        });

        return () => settle.kill();
      });

      media.add(
        '(pointer: fine) and (min-width: 901px) and (prefers-reduced-motion: no-preference)',
        () => {
          const magneticLinks = gsap.utils.toArray<HTMLElement>(
            document.querySelectorAll<HTMLElement>(
              '.hero-actions a, .project-live, .cv-cta',
            ),
          );
          const cleanups: Array<() => void> = [];

          magneticLinks.forEach((link) => {
            const moveX = gsap.quickTo(link, 'x', {
              duration: 0.32,
              ease: 'power3.out',
            });
            const moveY = gsap.quickTo(link, 'y', {
              duration: 0.32,
              ease: 'power3.out',
            });
            const move = (event: PointerEvent) => {
              const rect = link.getBoundingClientRect();
              moveX(((event.clientX - rect.left) / rect.width - 0.5) * 14);
              moveY(((event.clientY - rect.top) / rect.height - 0.5) * 10);
            };
            const leave = () => {
              moveX(0);
              moveY(0);
            };
            link.addEventListener('pointermove', move);
            link.addEventListener('pointerleave', leave);
            cleanups.push(() => {
              link.removeEventListener('pointermove', move);
              link.removeEventListener('pointerleave', leave);
            });
          });

          return () => cleanups.forEach((cleanup) => cleanup());
        },
      );

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="cinematic-effects" aria-hidden="true">
      <div className="chapter-aura" />
      <div className="scroll-warp" />
      <div className="chapter-transmission">
        <span className="chapter-transmission-code">00</span>
        <i className="chapter-transmission-line" />
        <span className="chapter-transmission-name">ORIGIN</span>
      </div>
      <div className="scroll-velocity">
        <span>SCROLL VELOCITY</span>
        <b className="scroll-velocity-value">0000</b>
      </div>
    </div>
  );
}

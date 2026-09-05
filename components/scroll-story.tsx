'use client';

import { useCallback, useRef, useState, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { SplitText } from 'gsap/SplitText';
import IntroCurtain from './intro-curtain';
import ImmersiveWorld from './immersive-world';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, SplitText);

const chapters = [
  ['home', 'Khởi hành'],
  ['about', 'Tín hiệu'],
  ['projects', 'Tác phẩm'],
  ['skills', 'Năng lực'],
  ['contact', 'Kết nối'],
];

export default function ScrollStory({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const enter = useCallback(() => setReady(true), []);

  useGSAP(
    () => {
      if (!ready || !root.current) return;
      const el = root.current;
      const q = gsap.utils.selector(el);
      const media = gsap.matchMedia();

      media.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          desktop: '(min-width: 900px)',
        },
        (context) => {
          const { motion, desktop } = context.conditions!;
          const chapterLinks = q('.story-chapters a') as HTMLAnchorElement[];
          const activate = (index: number) => {
            chapterLinks.forEach((link, i) => {
              if (i === index) link.setAttribute('aria-current', 'step');
              else link.removeAttribute('aria-current');
            });
          };

          chapters.forEach(([id], index) => {
            ScrollTrigger.create({
              trigger: `#${id}`,
              start: 'top center',
              end: 'bottom center',
              onEnter: () => activate(index),
              onEnterBack: () => activate(index),
              toggleClass: { targets: `#${id}`, className: 'is-active' },
            });
          });

          gsap.to(q('.story-progress-fill'), {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { start: 0, end: 'max', scrub: 0.2 },
          });

          if (motion) {
            gsap.from(
              q('.hero-kicker, .hero-title, .hero-copy, .hero-actions'),
              {
                y: 35,
                autoAlpha: 0,
                stagger: 0.1,
                duration: 1,
                ease: 'power4.out',
              },
            );
            gsap.utils
              .toArray<HTMLElement>('.chapter-title', el)
              .forEach((heading) => {
                const split = SplitText.create(heading, {
                  type: 'words',
                  wordsClass: 'chapter-word',
                  aria: 'auto',
                });
                gsap.from(split.words, {
                  yPercent: 110,
                  opacity: 0,
                  rotateX: -55,
                  stagger: 0.08,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: heading,
                    start: 'top 84%',
                    end: 'top 46%',
                    scrub: 0.6,
                  },
                });
              });
            gsap.utils
              .toArray<HTMLElement>('.signal-card, .skill-orbit', el)
              .forEach((card, index) => {
                gsap.from(card, {
                  y: 60,
                  x: desktop ? (index % 2 ? 35 : -35) : 0,
                  opacity: 0,
                  rotateY: desktop ? (index % 2 ? -8 : 8) : 0,
                  duration: 1,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    once: true,
                  },
                });
              });
            gsap.utils
              .toArray<HTMLElement>('.project-orbit', el)
              .forEach((project, index) => {
                const visual = project.querySelector('.project-visual');
                const copy = project.querySelector('.project-copy');
                gsap
                  .timeline({
                    scrollTrigger: {
                      trigger: project,
                      start: 'top 88%',
                      end: 'top 28%',
                      scrub: 0.65,
                    },
                  })
                  .from(visual, {
                    scale: 0.72,
                    rotate: index % 2 ? 8 : -8,
                    filter: 'blur(10px)',
                    opacity: 0.15,
                  })
                  .from(copy, { y: 55, opacity: 0 }, '<0.1');
              });
            gsap.utils
              .toArray<HTMLElement>('.glitch-cut', el)
              .forEach((cut) => {
                gsap.fromTo(
                  cut,
                  { opacity: 0, scaleX: 0.75 },
                  {
                    opacity: 0.75,
                    scaleX: 1,
                    duration: 0.12,
                    repeat: 3,
                    yoyo: true,
                    scrollTrigger: {
                      trigger: cut,
                      start: 'top 72%',
                      once: true,
                    },
                  },
                );
              });
          }

          const navigate = (event: MouseEvent) => {
            const link = (event.target as Element).closest<HTMLAnchorElement>(
              'a[href^="#"]',
            );
            if (
              !link ||
              event.metaKey ||
              event.ctrlKey ||
              event.shiftKey ||
              event.altKey
            )
              return;
            const target = el.querySelector<HTMLElement>(link.hash);
            if (!target) return;
            event.preventDefault();
            gsap.to(window, {
              scrollTo: { y: target, offsetY: 0, autoKill: true },
              duration: motion ? 1.05 : 0,
              ease: 'power3.inOut',
              onComplete: () => history.pushState(null, '', link.hash),
            });
          };
          el.addEventListener('click', navigate);
          return () => el.removeEventListener('click', navigate);
        },
        root,
      );

      const refresh = () => ScrollTrigger.refresh();
      void document.fonts.ready.then(refresh);
      window.addEventListener('load', refresh, { once: true });
      return () => {
        window.removeEventListener('load', refresh);
        media.revert();
      };
    },
    { scope: root, dependencies: [ready], revertOnUpdate: true },
  );

  return (
    <div ref={root} className="scroll-story">
      <IntroCurtain onReady={enter} />
      <ImmersiveWorld />
      <div className="fx-noise" aria-hidden="true" />
      <div className="fx-vignette" aria-hidden="true" />
      <div className="story-progress" aria-hidden="true">
        <div className="story-progress-fill" />
      </div>
      <nav className="story-chapters" aria-label="Các chương của portfolio">
        {chapters.map(([id, label], index) => (
          <a key={id} href={`#${id}`}>
            <span>0{index + 1}</span>
            <span>{label}</span>
          </a>
        ))}
      </nav>
      <div className="story-content">{children}</div>
    </div>
  );
}

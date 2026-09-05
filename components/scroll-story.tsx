'use client';

import { useRef, useState, useCallback, type ReactNode } from 'react';
import IntroCurtain from './intro-curtain';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, SplitText);

const chapters = [
  ['home', 'Mở đầu'],
  ['about', 'Về mình'],
  ['projects', 'Dự án'],
  ['skills', 'Kỹ năng'],
  ['contact', 'Kết nối'],
];

export default function ScrollStory({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const enter = useCallback(() => setReady(true), []);

  useGSAP(
    () => {
      if (!ready) return;
      const el = root.current!;
      const q = gsap.utils.selector(el);
      const media = gsap.matchMedia();
      let disposed = false;
      let refreshFrame = 0;
      const refresh = () => {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
      };

      media.add(
        {
          desktop: '(min-width: 1000px) and (min-height: 760px)',
          mobile: '(max-width: 999px), (max-height: 759px)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { desktop, reduced } = context.conditions!;
          // MatchMedia reverts all transforms, split text and pins when preferences change.
          if (!reduced) {
            const hero = q('.hero')[0] as HTMLElement;
            const canPin =
              desktop && hero.offsetHeight < window.innerHeight - 50;
            const heroStory = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: hero,
                start: canPin ? 'top 30px' : 'top top',
                end: () => `+=${window.innerHeight * (canPin ? 0.65 : 0.5)}`,
                pin: canPin,
                scrub: 0.65,
                invalidateOnRefresh: true,
              },
            });
            heroStory
              .addLabel('enter-world')
              .to(
                q('.hero-art'),
                {
                  y: desktop ? -25 : -10,
                  rotation: -2,
                  scale: desktop ? 1.055 : 1.015,
                },
                'enter-world',
              )
              .to(q('.sticker'), { y: -22, rotation: 3 }, 'enter-world')
              .to(q('.art-spark'), { rotation: 100, scale: 0.8 }, 'enter-world')
              .to(
                q('.hero > div:first-child'),
                { y: desktop ? -32 : -12 },
                'enter-world',
              );

            gsap.from(q('.greeting, h1, .intro, .hero-foot'), {
              y: 24,
              autoAlpha: 0,
              stagger: 0.09,
              duration: 0.8,
              ease: 'power3.out',
              clearProps: 'transform,opacity,visibility',
            });
            gsap.to(q('.ribbon span'), {
              x: desktop ? -95 : -35,
              ease: 'none',
              scrollTrigger: {
                trigger: q('.ribbon')[0],
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            });

            // Split words only: natural wrapping survives font loading and resizing.
            gsap.utils
              .toArray<HTMLElement>(
                '#about h2, #projects h2, #skills h2, #contact h2',
                el,
              )
              .forEach((heading) => {
                const split = SplitText.create(heading, {
                  type: 'words',
                  tag: 'span',
                  wordsClass: 'story-word',
                  aria: 'auto',
                });
                gsap.from(split.words, {
                  opacity: 0.25,
                  y: 16,
                  stagger: 0.07,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: heading,
                    start: 'clamp(top 88%)',
                    end: 'clamp(top 45%)',
                    scrub: 0.4,
                  },
                });
              });
            gsap.from(q('.about-grid > div:last-child > p'), {
              y: 25,
              opacity: 0.3,
              stagger: 0.18,
              ease: 'none',
              scrollTrigger: {
                trigger: q('.about-grid')[0],
                start: 'top 80%',
                end: 'top 35%',
                scrub: 0.6,
              },
            });
            gsap.from(q('.tags span'), {
              y: 15,
              rotation: -4,
              opacity: 0,
              stagger: 0.12,
              duration: 0.55,
              ease: 'back.out(1.3)',
              scrollTrigger: {
                trigger: q('.tags')[0],
                start: 'top 90%',
                once: true,
              },
            });

            const covers = gsap.utils.toArray<HTMLElement>(
              '.project-cover',
              el,
            );
            const angle = gsap.utils.wrap([-5, 5, -3]);
            covers.forEach((cover, index) => {
              const artwork = cover.querySelector(
                '.coffee-pack, .music-card, .poster',
              );
              gsap
                .timeline({
                  defaults: { ease: 'none' },
                  scrollTrigger: {
                    trigger: cover.parentElement!,
                    start: 'top 92%',
                    end: 'top 30%',
                    scrub: 0.55,
                  },
                })
                .from(cover, {
                  y: desktop ? 70 + index * 24 : 35,
                  rotation: angle(index),
                  scale: 0.92,
                  opacity: 0.35,
                })
                .from(artwork, { y: 35, rotation: 0, scale: 0.85 }, '<');
            });
            gsap.to(q('.record'), {
              rotation: 230,
              ease: 'none',
              scrollTrigger: {
                trigger: q('.yoru')[0],
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.7,
              },
            });
            gsap.utils
              .toArray<HTMLElement>('.skill', el)
              .forEach((card, index) => {
                gsap
                  .timeline({
                    defaults: { duration: 0.65, ease: 'power3.out' },
                    scrollTrigger: {
                      trigger: card,
                      start: 'top 88%',
                      once: true,
                    },
                  })
                  .from(card, {
                    y: 30,
                    opacity: 0.25,
                    delay: desktop ? index * 0.12 : 0,
                  })
                  .from(
                    card.querySelector('svg'),
                    { rotation: -45, scale: 0.5, ease: 'back.out(1.8)' },
                    '<0.12',
                  );
              });
            gsap.from(q('.achievement'), {
              y: 20,
              opacity: 0.3,
              duration: 0.7,
              scrollTrigger: {
                trigger: q('.achievement')[0],
                start: 'top 92%',
                once: true,
              },
            });
            gsap.to(q('.contact-spark'), {
              rotation: 195,
              y: -35,
              ease: 'none',
              scrollTrigger: {
                trigger: q('#contact')[0],
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: 0.8,
              },
            });

            // Event-created tweens belong to this media context, including during cleanup.
            context.add('navigate', (event: MouseEvent) => {
              if (
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              )
                return;
              const link = (event.target as Element).closest<HTMLAnchorElement>(
                'a[href^="#"]',
              );
              if (!link || link.classList.contains('skip')) return;
              const hash = link.getAttribute('href')!;
              const target = el.querySelector<HTMLElement>(hash);
              if (!target) return;
              event.preventDefault();
              gsap.to(window, {
                scrollTo: { y: target, offsetY: 24, autoKill: true },
                duration: gsap.utils.clamp(
                  0.35,
                  1.1,
                  Math.abs(target.getBoundingClientRect().top) / 1800,
                ),
                ease: 'power2.inOut',
                overwrite: 'auto',
                onComplete: () => {
                  history.pushState(null, '', hash);
                  const original = target.getAttribute('tabindex');
                  target.setAttribute('tabindex', '-1');
                  target.focus({ preventScroll: true });
                  if (original === null) target.removeAttribute('tabindex');
                  else target.setAttribute('tabindex', original);
                },
              });
            });
            el.addEventListener('click', context.navigate);
          }

          const chapterLinks = q('.story-chapters a') as HTMLAnchorElement[];
          const setChapter = (index: number) => {
            chapterLinks.forEach((link, i) => {
              if (i === index) link.setAttribute('aria-current', 'step');
              else link.removeAttribute('aria-current');
            });
          };
          chapters.forEach(([id], index) => {
            ScrollTrigger.create({
              trigger: q(`#${id}`)[0],
              start: 'top 55%',
              end: 'bottom 55%',
              onEnter: () => setChapter(index),
              onEnterBack: () => setChapter(index),
            });
          });
          const progress = q('.story-progress-fill')[0];
          gsap.fromTo(
            progress,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: { start: 0, end: 'max', scrub: true },
            },
          );
          ScrollTrigger.sort();
          refresh();
          return () => {
            if (context.navigate)
              el.removeEventListener('click', context.navigate);
            chapterLinks.forEach((link) =>
              link.removeAttribute('aria-current'),
            );
          };
        },
        root,
      );

      const details = q('details') as HTMLDetailsElement[];
      details.forEach((detail) => detail.addEventListener('toggle', refresh));
      const images = q('img') as HTMLImageElement[];
      images.forEach((img) => img.addEventListener('load', refresh));
      void document.fonts.ready.then(() => {
        if (!disposed) refresh();
      });
      return () => {
        disposed = true;
        cancelAnimationFrame(refreshFrame);
        details.forEach((detail) =>
          detail.removeEventListener('toggle', refresh),
        );
        images.forEach((img) => img.removeEventListener('load', refresh));
        media.revert();
      };
    },
    { scope: root, dependencies: [ready], revertOnUpdate: true },
  );

  return (
    <div ref={root} className="scroll-story">
      <IntroCurtain onReady={enter} />
      <div className="story-content">
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
        {children}
      </div>
    </div>
  );
}

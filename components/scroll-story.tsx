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
  ['experience', 'Kinh nghiệm'],
  ['projects', 'Tác phẩm'],
  ['skills', 'Năng lực'],
  ['cv', 'CV'],
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
            gsap.to(q('.hero-copy-block'), {
              yPercent: -20,
              scale: 0.94,
              opacity: 0.18,
              ease: 'none',
              scrollTrigger: {
                trigger: '#home',
                start: 'top top',
                end: 'bottom 25%',
                scrub: 0.7,
              },
            });
            gsap.utils
              .toArray<HTMLElement>('.parallax-slow', el)
              .forEach((layer) => {
                gsap.to(layer, {
                  yPercent: -14,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: layer.parentElement ?? layer,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.8,
                  },
                });
              });
            gsap.utils
              .toArray<HTMLElement>('.parallax-fast', el)
              .forEach((layer) => {
                gsap.to(layer, {
                  yPercent: -38,
                  rotate: 5,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: layer.parentElement ?? layer,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.55,
                  },
                });
              });
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
              .toArray<HTMLElement>('.signal-card, .skills-orbit', el)
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
              .toArray<HTMLElement>('.experience-entry', el)
              .forEach((entry, index) => {
                gsap.from(entry, {
                  xPercent: index % 2 ? 10 : -10,
                  clipPath:
                    index % 2 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
                  opacity: 0.15,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: entry,
                    start: 'top 92%',
                    end: 'top 52%',
                    scrub: 0.55,
                  },
                });
              });
            const cvPortal = q('.cv-portal');
            const cvWindow = q('.cv-window');
            const cvReveal = q('.cv-reveal');
            const cvPanel = q('.cv-panel');
            const cvCue = q('.cv-scroll-cue');

            gsap.set(cvReveal, { autoAlpha: 0 });
            gsap.set(cvPanel, {
              y: 56,
              scale: 0.94,
              filter: 'blur(14px)',
            });

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: '#cv',
                  start: 'top top',
                  end: desktop ? '+=240%' : '+=180%',
                  pin: q('.cv-pin')[0],
                  scrub: 0.8,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                  onUpdate: (self) => {
                    if (self.isActive) activate(5);
                  },
                  onLeave: () => activate(6),
                  onEnterBack: () => activate(5),
                },
              })
              .fromTo(
                cvWindow,
                {
                  scale: desktop ? 0.48 : 0.68,
                  z: -700,
                  rotateX: 7,
                  rotateY: -3,
                },
                {
                  scale: desktop ? 0.82 : 0.92,
                  z: -180,
                  rotateX: 2,
                  rotateY: 0,
                  duration: 0.28,
                  ease: 'power1.out',
                },
              )
              .to(
                cvWindow,
                {
                  scale: desktop ? 4.8 : 7.2,
                  z: 780,
                  rotateX: 0,
                  duration: 0.52,
                  ease: 'power2.in',
                },
                0.28,
              )
              .to(cvCue, { autoAlpha: 0, y: 16, duration: 0.16 }, 0.25)
              .to(cvPortal, { autoAlpha: 0, duration: 0.12 }, 0.7)
              .to(cvReveal, { autoAlpha: 1, duration: 0.2 }, 0.69)
              .to(
                cvPanel,
                {
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                  duration: 0.27,
                  ease: 'power3.out',
                },
                0.7,
              )
              .from(
                q('.cv-intro, .cv-education, .cv-stats, .cv-foundation'),
                {
                  y: 24,
                  autoAlpha: 0,
                  stagger: 0.035,
                  duration: 0.18,
                },
                0.74,
              );
            gsap.from(q('.skills-orbit > div'), {
              y: 45,
              opacity: 0,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: '.skills-orbit',
                start: 'top 84%',
                once: true,
              },
            });
            gsap.to(q('.cinema-flare'), {
              xPercent: 85,
              yPercent: -35,
              rotate: 24,
              ease: 'none',
              scrollTrigger: { start: 0, end: 'max', scrub: 1.2 },
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
      <div className="cinema-flare" aria-hidden="true" />
      <div className="cinema-frame" aria-hidden="true">
        <span className="cinema-bar cinema-bar-top" />
        <span className="cinema-bar cinema-bar-bottom" />
        <i className="frame-corner frame-tl" />
        <i className="frame-corner frame-tr" />
        <i className="frame-corner frame-bl" />
        <i className="frame-corner frame-br" />
      </div>
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

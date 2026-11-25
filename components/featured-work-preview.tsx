'use client';

import Image from 'next/image';
import { useRef, type CSSProperties } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { PortfolioProject } from '@/data/projects';
import { projectSlug } from '@/data/projects';
import { LocalText } from './pozan-system';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export default function FeaturedWorkPreview({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current || projects.length < 2) return;

      const host = root.current;
      const stage = host.querySelector<HTMLElement>('.featured-preview-stage');
      const track = host.querySelector<HTMLElement>('.featured-preview-track');
      if (!stage || !track) return;

      const query = gsap.utils.selector(host);
      const media = gsap.matchMedia();

      media.add(
        '(min-width: 901px) and (prefers-reduced-motion: no-preference)',
        () => {
          const travel = -((projects.length - 1) * 100) / projects.length;
          const story = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              anticipatePin: 1,
              end: () => `+=${Math.round(window.innerHeight * 2.15)}`,
              invalidateOnRefresh: true,
              pin: stage,
              refreshPriority: 1,
              scrub: 0.85,
              start: 'top top',
              trigger: stage,
            },
          });

          story
            .to(track, { duration: 1, xPercent: travel }, 0)
            .to(
              query('.featured-preview-progress i'),
              { duration: 1, scaleY: 1, transformOrigin: '50% 0%' },
              0,
            )
            .to(
              query('.featured-preview-card-watermark'),
              { duration: 1, xPercent: -16 },
              0,
            )
            .to(
              query('.featured-preview-image img'),
              { duration: 1, scale: 1.1 },
              0,
            )
            .to(
              query('.featured-preview-intro-orbit'),
              { duration: 1, rotation: 80, scale: 1.18 },
              0,
            );

          return () => story.kill();
        },
      );

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const intro = gsap.from(
          query('.featured-preview-intro > *'),
          {
            autoAlpha: 0,
            duration: 0.75,
            ease: 'power3.out',
            stagger: 0.08,
            y: 22,
            scrollTrigger: {
              start: 'top 82%',
              trigger: host,
            },
          },
        );

        return () => intro.kill();
      });

      return () => media.revert();
    },
    {
      dependencies: [projects.length],
      revertOnUpdate: true,
      scope: root,
    },
  );

  const style = {
    '--featured-count': projects.length,
    '--featured-track-width': `${projects.length * 100}%`,
  } as CSSProperties;

  return (
    <section
      className="featured-preview system-section"
      ref={root}
      aria-labelledby="featured-work-title"
    >
      <div className="featured-preview-stage">
        <div className="featured-preview-intro">
          <div className="featured-preview-intro-orbit" aria-hidden="true">
            <span />
            <span />
            <i />
          </div>
          <p className="section-meta">
            01 / FEATURED WORK{' '}
            <span>PRODUCT · INTERACTION · DIGITAL EXPERIENCE</span>
          </p>
          <span className="featured-preview-kicker">SELECTED SIGNALS / 2026</span>
          <h2 id="featured-work-title" className="chapter-title">
            <LocalText
              vi="Những thế giới đã được đưa vào chuyển động."
              en="Worlds already set in motion."
            />
          </h2>
          <p>
            <LocalText
              vi="Ba lát cắt cho thấy cách mình nối product thinking, visual direction và code thành những trải nghiệm có thể chạm vào."
              en="Three cuts of work showing how I connect product thinking, visual direction and code into experiences you can feel."
            />
          </p>
          <a className="featured-preview-all-work" href="#projects">
            <span>
              <LocalText vi="Đi đến toàn bộ dự án" en="Enter the full archive" />
            </span>
            <b>↘</b>
          </a>
          <div className="featured-preview-progress" aria-hidden="true">
            <span>01</span>
            <i />
            <span>{String(projects.length).padStart(2, '0')}</span>
          </div>
        </div>

        <div className="featured-preview-rail">
          <div className="featured-preview-track" style={style}>
            {projects.map((project, index) => (
              <a
                className="featured-preview-card"
                href={`#work-${projectSlug(project.name)}`}
                key={project.name}
              >
                <div className="featured-preview-image">
                  {project.imageKey && (
                    <Image
                      src={project.imageKey}
                      alt=""
                      fill
                      sizes="(max-width: 900px) 92vw, 60vw"
                    />
                  )}
                  <span className="featured-preview-card-index">
                    0{index + 1} / {project.disciplines?.join(' + ')}
                  </span>
                  <span className="featured-preview-card-watermark" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <span className="featured-preview-card-status">
                    LIVE CASE / {project.year}
                  </span>
                </div>
                <div className="featured-preview-card-copy">
                  <div>
                    <p>CASE_{String(index + 1).padStart(2, '0')}</p>
                    <h3>{project.name}</h3>
                  </div>
                  <p>{project.sub}</p>
                  <b>OPEN PROJECT ↘</b>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

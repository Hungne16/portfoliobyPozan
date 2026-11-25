'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export default function HeroCosmos() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;

      const host = root.current;
      const scene = host.closest<HTMLElement>('.hero-chapter');
      if (!scene) return;

      const select = gsap.utils.selector(scene);
      const floats = gsap.utils.toArray<HTMLElement>(
        '.hero-cosmos-float',
        host,
      );
      const depthOne = host.querySelector<HTMLElement>(
        '.hero-cosmos-depth-one .hero-cosmos-float',
      );
      const depthTwo = host.querySelector<HTMLElement>(
        '.hero-cosmos-depth-two .hero-cosmos-float',
      );
      const media = gsap.matchMedia();

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const entrance = gsap.timeline({
          defaults: { ease: 'power3.out' },
        });

        entrance
          .from(select('.hero-wordmark'), {
            autoAlpha: 0,
            duration: 1.15,
            scale: 0.94,
            yPercent: 16,
          })
          .from(
            select('.hero-copy-block > *'),
            {
              autoAlpha: 0,
              duration: 0.72,
              stagger: 0.075,
              y: 24,
            },
            '<0.2',
          )
          .from(
            select('.hero-cosmos-object'),
            {
              autoAlpha: 0,
              duration: 0.68,
              scale: 0.62,
              stagger: 0.1,
            },
            '<0.08',
          );

        floats.forEach((item, index) => {
          gsap.to(item, {
            duration: 3.8 + index * 0.6,
            ease: 'sine.inOut',
            repeat: -1,
            rotation: index % 2 === 0 ? 9 : -7,
            y: index % 2 === 0 ? -18 : 16,
            yoyo: true,
          });
        });
      });

      media.add(
        '(min-width: 701px) and (prefers-reduced-motion: no-preference)',
        () => {
          const story = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              anticipatePin: 1,
              end: () => `+=${Math.round(window.innerHeight * 1.55)}`,
              invalidateOnRefresh: true,
              pin: true,
              scrub: 0.8,
              start: 'top top',
              trigger: scene,
            },
          });

          story
            .addLabel('signal', 0)
            .to(
              select('.hero-video'),
              { scale: 1.16, xPercent: -3, yPercent: 6 },
              'signal',
            )
            .to(
              select('.hero-cosmos-grid'),
              { rotation: -8, scale: 1.14, xPercent: 8, yPercent: -4 },
              'signal',
            )
            .to(
              select('.hero-cosmos-orbit-one'),
              { rotation: 18, scale: 1.25, xPercent: -8 },
              'signal',
            )
            .to(
              select('.hero-cosmos-orbit-two'),
              { rotation: 78, scale: 1.38, xPercent: 18, yPercent: -8 },
              'signal',
            )
            .to(
              select('.hero-wordmark'),
              {
                autoAlpha: 0.63,
                scale: 1.08,
                transformOrigin: '25% 50%',
                yPercent: -5,
              },
              'signal',
            )
            .to(
              select('.hero-copy-block'),
              { autoAlpha: 0.9, yPercent: -9 },
              'signal',
            )
            .to(
              select('.hero-scroll-cue i'),
              { scaleX: 2.3, transformOrigin: '0 50%' },
              'signal',
            )
            .addLabel('cross', 0.36)
            .to(
              select('.hero-cosmos-portal'),
              { autoAlpha: 0.85, rotation: 18, scale: 1.55 },
              'cross',
            )
            .to(
              select('.hero-cosmos-horizon'),
              { autoAlpha: 0.74, scale: 1.25, xPercent: -17, yPercent: 7 },
              'cross',
            )
            .to(
              select('.hero-cosmos-depth-one'),
              {
                autoAlpha: 0.05,
                rotation: 42,
                scale: 4,
                xPercent: -225,
                yPercent: 112,
              },
              'cross',
            )
            .to(
              select('.hero-cosmos-depth-two'),
              {
                autoAlpha: 0.08,
                rotation: -36,
                scale: 5,
                xPercent: 158,
                yPercent: -155,
              },
              'cross',
            )
            .to(
              select('.hero-cosmos-signal'),
              { autoAlpha: 0, rotation: 180, scale: 2.4 },
              'cross',
            )
            .to(
              select('.hero-copy-block'),
              { autoAlpha: 0, xPercent: -18, yPercent: -16 },
              'cross',
            )
            .to(
              select('.coordinate, .hero-scroll-cue'),
              { autoAlpha: 0, y: -18 },
              'cross',
            )
            .addLabel('handoff', 0.75)
            .to(
              select('.hero-video'),
              { scale: 1.34, xPercent: -5, yPercent: 13 },
              'handoff',
            )
            .to(
              select('.hero-cosmos-grid'),
              { autoAlpha: 0.14, rotation: -22, scale: 2.1, xPercent: 24 },
              'handoff',
            )
            .to(
              select('.hero-cosmos-portal'),
              { autoAlpha: 0.96, rotation: 55, scale: 4.3 },
              'handoff',
            )
            .to(
              select('.hero-cosmos-horizon'),
              { autoAlpha: 0, scale: 1.75, xPercent: -34 },
              'handoff',
            )
            .to(
              select('.hero-cosmos-stardust'),
              { autoAlpha: 0, scale: 1.9 },
              'handoff',
            )
            .to(
              select('.hero-cosmos-veil'),
              { autoAlpha: 0.96 },
              'handoff',
            )
            .to(
              select('.hero-wordmark'),
              {
                autoAlpha: 0,
                scale: 1.35,
                xPercent: -15,
                yPercent: -18,
              },
              'handoff',
            );

          return () => story.kill();
        },
      );

      media.add(
        '(pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          if (!depthOne || !depthTwo) return;

          const oneX = gsap.quickTo(depthOne, 'x', {
            duration: 0.7,
            ease: 'power3.out',
          });
          const oneY = gsap.quickTo(depthOne, 'y', {
            duration: 0.7,
            ease: 'power3.out',
          });
          const twoX = gsap.quickTo(depthTwo, 'x', {
            duration: 0.9,
            ease: 'power3.out',
          });
          const twoY = gsap.quickTo(depthTwo, 'y', {
            duration: 0.9,
            ease: 'power3.out',
          });

          const move = (event: PointerEvent) => {
            const bounds = scene.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            oneX(x * 42);
            oneY(y * 30);
            twoX(x * -24);
            twoY(y * -18);
          };
          const leave = () => {
            oneX(0);
            oneY(0);
            twoX(0);
            twoY(0);
          };

          scene.addEventListener('pointermove', move, { passive: true });
          scene.addEventListener('pointerleave', leave);

          return () => {
            scene.removeEventListener('pointermove', move);
            scene.removeEventListener('pointerleave', leave);
          };
        },
      );

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div className="hero-cosmos" ref={root} aria-hidden="true">
      <span className="hero-cosmos-veil" />
      <span className="hero-cosmos-grid" />
      <span className="hero-cosmos-portal" />
      <span className="hero-cosmos-horizon" />
      <span className="hero-cosmos-stardust">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="hero-cosmos-orbit hero-cosmos-orbit-one" />
      <span className="hero-cosmos-orbit hero-cosmos-orbit-two" />
      <span className="hero-cosmos-object hero-cosmos-depth-one">
        <span className="hero-cosmos-float">
          <i>✦</i>
        </span>
      </span>
      <span className="hero-cosmos-object hero-cosmos-depth-two">
        <span className="hero-cosmos-float">
          <i>✳</i>
        </span>
      </span>
      <span className="hero-cosmos-object hero-cosmos-signal">
        <span className="hero-cosmos-float">
          <i>01</i>
        </span>
      </span>
      <span className="hero-cosmos-readout hero-cosmos-readout-top">
        CREATIVE UNIVERSE / HANOI
      </span>
      <span className="hero-cosmos-readout hero-cosmos-readout-bottom">
        DESIGN × CODE × MOTION
      </span>
    </div>
  );
}

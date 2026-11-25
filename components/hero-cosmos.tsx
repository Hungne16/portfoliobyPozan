'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

gsap.registerPlugin(useGSAP);

export default function HeroCosmos() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;

      const host = root.current;
      const floats = gsap.utils.toArray<HTMLElement>(
        '.hero-cosmos-float',
        host,
      );
      const depthOne = host.querySelector<HTMLElement>(
        '.hero-cosmos-depth-one',
      );
      const depthTwo = host.querySelector<HTMLElement>(
        '.hero-cosmos-depth-two',
      );
      const media = gsap.matchMedia();

      media.add('(prefers-reduced-motion: no-preference)', () => {
        floats.forEach((item, index) => {
          gsap.to(item, {
            y: index % 2 === 0 ? -18 : 16,
            rotation: index % 2 === 0 ? 9 : -7,
            duration: 3.8 + index * 0.6,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        });
      });

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
            const bounds = host.getBoundingClientRect();
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

          host.addEventListener('pointermove', move, { passive: true });
          host.addEventListener('pointerleave', leave);

          return () => {
            host.removeEventListener('pointermove', move);
            host.removeEventListener('pointerleave', leave);
          };
        },
      );

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div className="hero-cosmos" ref={root} aria-hidden="true">
      <span className="hero-cosmos-grid" />
      <span className="hero-cosmos-orbit hero-cosmos-orbit-one" />
      <span className="hero-cosmos-orbit hero-cosmos-orbit-two" />
      <span className="hero-cosmos-object hero-cosmos-depth-one hero-cosmos-float">
        <i>✦</i>
      </span>
      <span className="hero-cosmos-object hero-cosmos-depth-two hero-cosmos-float">
        <i>✳</i>
      </span>
      <span className="hero-cosmos-object hero-cosmos-signal hero-cosmos-float">
        <i>01</i>
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

'use client';

import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { LocalText } from './pozan-system';

gsap.registerPlugin(useGSAP, ScrollToPlugin);

export default function ProjectJump() {
  const trigger = useRef<HTMLButtonElement>(null);
  const { contextSafe } = useGSAP({ scope: trigger });

  const scrollToProjects = contextSafe(() => {
    const target = document.querySelector<HTMLElement>('#projects');
    if (!target) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
      return;
    }

    gsap.to(window, {
      duration: 1.05,
      ease: 'power3.inOut',
      overwrite: 'auto',
      scrollTo: { y: target, offsetY: 72 },
    });
  });

  return (
    <button
      ref={trigger}
      className="hero-project-jump"
      type="button"
      onClick={scrollToProjects}
    >
      <span>
        <small>01 / SELECTED WORK</small>
        <b>
          <LocalText vi="Đi tới dự án" en="Jump to projects" />
        </b>
      </span>
      <ArrowDown aria-hidden="true" />
    </button>
  );
}

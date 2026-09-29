import type { ReactNode } from 'react';

export default function SketchStory({ children }: { children: ReactNode }) {
  return <div className="sketch-story">
    {children}
    <nav className="sketch-nav" aria-label="Portfolio chapters">
      <a href="#home">Home</a><a href="#projects">Work</a><a href="#about">About</a><a href="#contact">Contact ↗</a>
    </nav>
  </div>;
}

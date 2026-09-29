import type { ReactNode } from 'react';

export default function SketchStory({ children }: { children: ReactNode }) {
  return <div className="sketch-story">
    <div className="sketch-doodles" aria-hidden="true">
      <svg viewBox="0 0 360 300" fill="none">
        <path d="M55 90 C5 60 25 10 68 35 C108 -8 138 47 107 78 C141 120 84 148 55 90Z M60 89 C21 65 33 22 68 39 C104 5 128 48 103 77 C132 113 86 134 60 89Z" />
        <path d="M68 60L71 76 M88 59L91 74 M72 89Q86 99 97 83 M189 63L264 38L242 112L220 81Z M194 63L256 44L238 104 M220 81L264 38 M148 161Q301 123 290 191Q275 240 182 222 M182 222L198 201 M182 222L214 230 M69 204L79 231L109 234L85 250L88 278L66 260L39 271L48 244L28 225L59 227Z" />
      </svg>
    </div>
    {children}
    <nav className="sketch-nav" aria-label="Portfolio chapters">
      <a href="#home">Home</a><a href="#projects">Work</a><a href="#about">About</a><a href="#contact">Contact ↗</a>
    </nav>
  </div>;
}

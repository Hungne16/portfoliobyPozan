import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Divider,
  MetaLink,
  SystemButton,
  Tag,
} from '@/components/pozan-system';
import ProjectCollection from '@/components/project-collection';
import { sampleProjects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'POZAN SYSTEM — Design language',
  alternates: { canonical: '/design-system' },
};
const colors = [
  ['black', '#0B0B0D'],
  ['surface', '#111114'],
  ['surface-2', '#18181C'],
  ['white', '#FAFAFA'],
  ['gray-300', '#B8B8BF'],
  ['gray-500', '#77777F'],
  ['gray-700', '#34343A'],
  ['lime', '#C7FF3D'],
  ['blue', '#5B7CFF'],
  ['violet', '#9B7BFF'],
];

export default function DesignSystem() {
  return (
    <main className="system-page">
      <header>
        <Link className="hud-brand" href="/">
          ✳ POZAN
        </Link>
        <MetaLink href="/">BACK TO PORTFOLIO</MetaLink>
      </header>
      <h1>
        POZAN
        <br />
        SYSTEM.
      </h1>
      <p>CODE × STORY × MOTION / VERSION 01</p>
      <section>
        <span className="micro-label">01 / PHILOSOPHY</span>
        <h2>Editorial Tech × Creative Studio × Digital Laboratory</h2>
        <p>
          A personal design language at the intersection of software
          engineering, UI/UX and creative development. Typography establishes
          hierarchy. Space gives the work room. Motion explains relationships.
          The work stays at the center.
        </p>
      </section>
      <section>
        <span className="micro-label">02 / COLOR</span>
        <h2>Restraint, with a signal.</h2>
        <p>
          Black, white and gray form 85–90% of the interface. Lime marks an
          action or a point of emphasis. Blue and violet are reserved for
          isolated studies; never combine all three accents in one composition.
          Gray 500 is for nonessential metadata and decoration, not body copy.
        </p>
        <div className="swatch-grid">
          {colors.map(([name, hex]) => (
            <div key={name}>
              <div
                className="swatch"
                style={{ background: `var(--pozan-${name})` }}
              />
              <div className="token-label">
                {name}
                <br />
                {hex}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <span className="micro-label">03 / TYPOGRAPHY</span>
        <h2>Manrope / DM Mono</h2>
        <p>
          Manrope carries the story. DM Mono labels the system. Use short
          display copy, generous line height in body text, and quiet metadata.
        </p>
        <div
          style={{
            fontSize: 'var(--text-display)',
            lineHeight: 1.1,
            letterSpacing: '-.06em',
          }}
        >
          Ideas, made real.
        </div>
        <h2 style={{ fontSize: 'var(--text-h1)' }}>Heading one</h2>
        <h2 style={{ fontSize: 'var(--text-h2)' }}>Heading two</h2>
        <h3 style={{ fontSize: 'var(--text-h3)' }}>Heading three</h3>
        <p style={{ fontSize: 'var(--text-large)' }}>Body large / 18–20px</p>
        <p>Body / 16px / line-height 1.8</p>
        <span className="token-label">METADATA / 11–13PX / DM MONO</span>
      </section>
      <section>
        <span className="micro-label">04 / GRID</span>
        <h2>A flexible editorial grid.</h2>
        <p>
          1360px maximum. 12 columns on desktop, 8 on tablet, 4 on mobile. 24px
          gutters. Page margins scale from 20px to 80px.
        </p>
        <div className="system-grid-demo">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
      </section>
      <section>
        <span className="micro-label">05 / SPACING</span>
        <h2>Room to think.</h2>
        <div className="system-spacing">
          {[4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160].map((n) => (
            <div key={n}>
              <i style={{ height: n }} />
              <span className="token-label">{n}px</span>
            </div>
          ))}
        </div>
      </section>
      <section>
        <span className="micro-label">06 / RADIUS</span>
        <h2>Precision over softness.</h2>
        <div className="system-examples">
          {['xs', 'sm', 'md', 'lg', 'pill'].map((name, i) => (
            <div
              key={name}
              style={{
                border: '1px solid var(--line)',
                padding: 24,
                borderRadius: `var(--radius-${name})`,
              }}
            >
              <span className="token-label">{[4, 8, 12, 20, 999][i]}px</span>
            </div>
          ))}
        </div>
      </section>
      <section>
        <span className="micro-label">07 / COMPONENTS</span>
        <h2>Shared, not duplicated.</h2>
        <div className="system-examples">
          <SystemButton href="/#projects">SELECTED WORK</SystemButton>
          <MetaLink href="/#contact">LET’S TALK</MetaLink>
          <Tag>UI/UX DESIGN</Tag>
          <Tag>DEVELOPMENT</Tag>
        </div>
        <Divider />
        <nav className="system-examples" aria-label="Navigation specimen">
          <MetaLink href="/#about">01 / ABOUT</MetaLink>
          <MetaLink href="/#experience">02 / PROCESS</MetaLink>
          <MetaLink href="/#projects">03 / WORK</MetaLink>
        </nav>
        <Divider />
        <ProjectCollection projects={[sampleProjects[6]]} />
      </section>
      <section>
        <span className="micro-label">08 / MOTION</span>
        <h2>Continuity, not decoration.</h2>
        <p>
          New interactions use 160ms (feedback), 280ms (state), 480ms
          (movement), 700ms (reveal). Ease out: cubic-bezier(.22,1,.36,1). Ease
          in/out: cubic-bezier(.65,0,.35,1). Prefer transform and opacity. No
          bounce. Respect reduced motion.
        </p>
        <p>
          Existing intro and scroll sequences retain their authored duration,
          delay, easing, stagger and trigger values. These tokens apply to new
          interactions.
        </p>
        <Link className="system-button" href="/#visual-lab">
          HOVER / FOCUS TO EXPLORE ↗
        </Link>
      </section>
      <section>
        <span className="micro-label">09 / COMPOSITION</span>
        <h2>Work first. System underneath.</h2>
        <p>
          Pair one strong image with a clear title, role and outcome. Alternate
          visual weight across featured work. Use asymmetry for explorations and
          a consistent grid for the archive. Keep controls visible on touch
          screens; never hide essential context behind hover.
        </p>
        <MetaLink href="/">SEE THE SYSTEM IN USE</MetaLink>
      </section>
    </main>
  );
}

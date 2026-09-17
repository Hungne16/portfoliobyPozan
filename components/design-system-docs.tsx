'use client';

import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clipboard,
  Contrast,
  Focus,
  Grid3X3,
  Languages,
  Menu,
  MousePointer2,
  Search,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  allSystemItems,
  colorTokens,
  componentStatuses,
  motionTokens,
  spacingTokens,
  systemNavigation,
} from '@/data/design-system';
import { MetaLink, SystemButton, Tag } from './pozan-system';
import ProjectCollection from './project-collection';
import { sampleProjects } from '@/data/projects';

function CodeBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const fallback = document.createElement('textarea');
      fallback.value = code;
      fallback.setAttribute('readonly', '');
      fallback.style.position = 'fixed';
      fallback.style.opacity = '0';
      document.body.appendChild(fallback);
      fallback.select();
      // oxlint-disable-next-line typescript/no-deprecated -- supports browsers that deny the async Clipboard API
      document.execCommand('copy');
      fallback.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="docs-code">
      <div className="docs-code-bar">
        <span>{label}</span>
        <button type="button" onClick={copy} aria-label={`Copy ${label} code`}>
          {copied ? <Check /> : <Clipboard />}
          {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Status({ status }: { status: 'Stable' | 'Experimental' }) {
  return (
    <span className={`docs-status is-${status.toLowerCase()}`}>
      <i /> {status}
    </span>
  );
}

function Guidance({
  type,
  title,
  children,
}: {
  type: 'do' | 'avoid' | 'note';
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className={`docs-guidance is-${type}`}>
      <span>
        {type === 'do' ? <Check /> : type === 'avoid' ? <X /> : <Sparkles />}
      </span>
      <div>
        <b>{title}</b>
        <p>{children}</p>
      </div>
    </article>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="docs-section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}

function DocsNavigation({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="docs-navigation" aria-label="POZAN System navigation">
      {systemNavigation.map((group) => (
        <div key={group.label}>
          <b>{group.label}</b>
          {group.items.map((item) => (
            <a
              href={`#${item.id}`}
              key={item.id}
              aria-current={active === item.id ? 'location' : undefined}
              onClick={onNavigate}
            >
              {item.label}
            </a>
          ))}
        </div>
      ))}
    </nav>
  );
}

export default function DesignSystemDocs() {
  const [active, setActive] = useState('overview');
  const [query, setQuery] = useState('');
  const [mobileNav, setMobileNav] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return allSystemItems.filter((item) =>
      `${item.label} ${item.group} ${item.keywords}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  useEffect(() => {
    const sections = allSystemItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-20% 0px -62%', threshold: [0, 0.2, 0.55] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey)
        return;
      const target = event.target as HTMLElement;
      if (target.matches('input, textarea, select, [contenteditable="true"]'))
        return;
      event.preventDefault();
      searchInput.current?.focus();
    };
    window.addEventListener('keydown', focusSearch);
    return () => window.removeEventListener('keydown', focusSearch);
  }, []);

  const selectResult = (id: string) => {
    setQuery('');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <div className="docs-shell">
      <a className="skip-link" href="#docs-content">
        Skip to documentation
      </a>
      <header className="docs-topbar">
        <div className="docs-brand">
          <Link href="/" aria-label="Back to Pozan portfolio">
            <span>✳</span> POZAN
          </Link>
          <i />
          <span>SYSTEM</span>
          <small>01.1</small>
        </div>
        <div className="docs-search-wrap">
          <label className="docs-search">
            <Search />
            <span className="sr-only">Search the design system</span>
            <input
              ref={searchInput}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search foundations, components, patterns…"
            />
            <kbd>/</kbd>
          </label>
          {query && (
            <div className="docs-search-results" aria-label="Search results">
              {results.length ? (
                results.slice(0, 7).map((result) => (
                  <button
                    key={result.id}
                    type="button"
                    onClick={() => selectResult(result.id)}
                  >
                    <span>{result.label}</span>
                    <small>{result.group}</small>
                  </button>
                ))
              ) : (
                <p>No system guidance found.</p>
              )}
            </div>
          )}
        </div>
        <Link className="docs-portfolio-link" href="/">
          PORTFOLIO <ArrowUpRight />
        </Link>
        <button
          className="docs-menu-button"
          type="button"
          aria-expanded={mobileNav}
          aria-controls="docs-mobile-navigation"
          onClick={() => setMobileNav((value) => !value)}
        >
          {mobileNav ? <X /> : <Menu />} <span>MENU</span>
        </button>
      </header>

      <aside className="docs-sidebar">
        <DocsNavigation active={active} />
        <div className="docs-sidebar-meta">
          <span>VERSION 01.1</span>
          <span>UPDATED SEP 2026</span>
          <Link href="/">VIEW LIVE SYSTEM ↗</Link>
        </div>
      </aside>

      {mobileNav && (
        <div id="docs-mobile-navigation" className="docs-mobile-navigation">
          <DocsNavigation
            active={active}
            onNavigate={() => setMobileNav(false)}
          />
        </div>
      )}

      <main id="docs-content" className="docs-content">
        <section id="overview" className="docs-hero docs-anchor">
          <div className="docs-hero-orbit" aria-hidden="true">
            <span />
            <i />
          </div>
          <p>POZAN / DESIGN LANGUAGE</p>
          <h1>
            A system for ideas
            <br />
            made <em>real.</em>
          </h1>
          <p className="docs-hero-copy">
            A shared language for designing and building POZAN
            experiences—across portfolio stories, interfaces, motion and code.
          </p>
          <div className="docs-hero-actions">
            <a href="#principles">
              START WITH THE PRINCIPLES <ArrowUpRight />
            </a>
            <a href="#button">
              EXPLORE COMPONENTS <ArrowUpRight />
            </a>
          </div>
          <dl className="docs-facts">
            <div>
              <dt>VERSION</dt>
              <dd>01.1</dd>
            </div>
            <div>
              <dt>FOUNDATIONS</dt>
              <dd>06</dd>
            </div>
            <div>
              <dt>COMPONENTS</dt>
              <dd>05</dd>
            </div>
            <div>
              <dt>PATTERNS</dt>
              <dd>04</dd>
            </div>
          </dl>
        </section>

        <section id="principles" className="docs-section docs-anchor">
          <SectionHeading
            eyebrow="01 / START HERE"
            title="Principles before pixels."
            description="Four principles guide every decision. They are practical filters for what belongs in the system and what does not."
          />
          <div className="docs-principle-grid">
            {[
              [
                '01',
                'Clarity earns attention.',
                'Make the purpose obvious before adding personality. Hierarchy, labels and actions must remain understandable.',
              ],
              [
                '02',
                'Motion explains change.',
                'Movement should reveal hierarchy, continuity or spatial relationships. Every animation needs a reason.',
              ],
              [
                '03',
                'Craft serves the work.',
                'Visual character supports the project story. The portfolio evidence remains the main subject.',
              ],
              [
                '04',
                'Build for real use.',
                'Responsive behavior, keyboard access and implementation constraints are part of the design from the start.',
              ],
            ].map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="architecture" className="docs-section docs-anchor">
          <SectionHeading
            eyebrow="02 / SYSTEM MODEL"
            title="From atom to experience."
            description="The system is layered so a decision made once can travel consistently from a token to a complete story."
          />
          <div className="docs-architecture">
            {[
              [
                '01',
                'Foundations',
                'Color, type, space, shape, motion and access.',
              ],
              ['02', 'Components', 'Reusable controls and content structures.'],
              [
                '03',
                'Patterns',
                'Components combined to solve recurring needs.',
              ],
              [
                '04',
                'Experiences',
                'Portfolio, case studies and visual narratives.',
              ],
            ].map(([number, name, copy]) => (
              <article key={name}>
                <span>{number}</span>
                <div>
                  <h3>{name}</h3>
                  <p>{copy}</p>
                </div>
                <ArrowUpRight />
              </article>
            ))}
          </div>
        </section>

        <section id="color" className="docs-section docs-anchor">
          <SectionHeading
            eyebrow="03 / FOUNDATIONS"
            title="Color carries hierarchy."
            description="Neutral surfaces create focus. Signal lime marks action and system state. Blue and violet are controlled accents, never simultaneous decoration."
          />
          <div className="docs-token-table docs-color-table">
            <div className="docs-token-header">
              <span>Token</span>
              <span>Value</span>
              <span>Role</span>
              <span>Preview</span>
            </div>
            {colorTokens.map((color) => (
              <article key={color.name}>
                <code>{color.css}</code>
                <span>{color.hex}</span>
                <p>{color.role}</p>
                <i
                  style={{ background: color.hex }}
                  aria-label={`${color.name} color preview`}
                />
              </article>
            ))}
          </div>
          <div className="docs-guidance-grid">
            <Guidance type="do" title="Use signal color with purpose">
              Reserve lime for selected state, focus, progress and the primary
              action.
            </Guidance>
            <Guidance type="avoid" title="Avoid accent competition">
              Do not place lime, blue and violet in the same composition.
            </Guidance>
          </div>
          <CodeBlock
            label="CSS / COLOR"
            code={`color: var(--pozan-white);\nbackground: var(--pozan-black);\nborder-color: var(--pozan-gray-700);\naccent-color: var(--pozan-lime);`}
          />
        </section>

        <section id="typography" className="docs-section docs-anchor">
          <SectionHeading
            eyebrow="04 / FOUNDATIONS"
            title="Type tells the story."
            description="Manrope carries expressive narrative and readable body copy. DM Mono exposes the system underneath through labels, data and controls."
          />
          <div className="docs-type-specimen">
            <div>
              <span>DISPLAY / MANROPE 800</span>
              <strong>
                Make ideas
                <br />
                tangible.
              </strong>
              <small>64–144px / 0.95 line height</small>
            </div>
            <div>
              <span>BODY / MANROPE 400</span>
              <p>
                Design makes the solution clear. Engineering makes it work.
                Motion gives it character.
              </p>
              <small>16–20px / 1.8 line height</small>
            </div>
            <div>
              <span>META / DM MONO 400</span>
              <code>DESIGN / CODE / MOTION / SYSTEMS</code>
              <small>11–13px / uppercase optional</small>
            </div>
          </div>
          <div className="docs-guidance-grid">
            <Guidance type="do" title="Create decisive hierarchy">
              Use one dominant statement per viewport and let supporting text
              stay quiet.
            </Guidance>
            <Guidance type="avoid" title="Avoid decorative metadata">
              Mono labels must provide context, status or navigation—not visual
              noise.
            </Guidance>
          </div>
        </section>

        <section id="layout" className="docs-section docs-anchor">
          <SectionHeading
            eyebrow="05 / FOUNDATIONS"
            title="A grid with room to breathe."
            description="The grid creates alignment without making every composition symmetrical. Editorial tension comes from deliberate column spans and whitespace."
          />
          <div className="docs-grid-demo" aria-label="Twelve column grid">
            {Array.from({ length: 12 }, (_, index) => (
              <i key={index}>{String(index + 1).padStart(2, '0')}</i>
            ))}
          </div>
          <div className="docs-layout-stats">
            <div>
              <b>12 / 8 / 4</b>
              <span>Desktop / tablet / mobile columns</span>
            </div>
            <div>
              <b>24PX</b>
              <span>Consistent column gap</span>
            </div>
            <div>
              <b>1360PX</b>
              <span>Maximum content width</span>
            </div>
            <div>
              <b>20–80PX</b>
              <span>Responsive page gutter</span>
            </div>
          </div>
          <h3 className="docs-subheading">Spacing scale</h3>
          <div className="docs-spacing-scale">
            {spacingTokens.map((space) => (
              <div key={space}>
                <i style={{ width: space }} />
                <span>{space}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="shape" className="docs-section docs-anchor">
          <SectionHeading
            eyebrow="06 / FOUNDATIONS"
            title="Precision over softness."
            description="Small radii keep the interface exact. Depth comes from borders, contrast and spatial layering rather than heavy glass effects."
          />
          <div className="docs-shape-grid">
            {[
              ['04', 'XS', 'Controls'],
              ['08', 'SM', 'Panels'],
              ['12', 'MD', 'Dialogs'],
              ['20', 'LG', 'Feature surfaces'],
            ].map(([value, name, use]) => (
              <article key={name}>
                <div style={{ borderRadius: `${value}px` }} />
                <b>
                  {name} / {value}px
                </b>
                <span>{use}</span>
              </article>
            ))}
          </div>
          <Guidance type="note" title="Elevation rule">
            Prefer a one-pixel border and surface contrast. Add shadow only when
            an overlay must clearly separate from the page.
          </Guidance>
        </section>

        <section id="motion" className="docs-section docs-anchor">
          <SectionHeading
            eyebrow="07 / FOUNDATIONS"
            title="Motion makes continuity visible."
            description="Use motion to connect cause and effect, establish depth and preserve context. Scroll choreography keeps its authored timing; interface motion uses shared tokens."
          />
          <div className="docs-motion-list">
            {motionTokens.map((motion) => (
              <article key={motion.token}>
                <span
                  style={
                    { '--motion-demo': motion.value } as React.CSSProperties
                  }
                >
                  <i />
                </span>
                <code>--motion-{motion.token}</code>
                <b>{motion.value}</b>
                <p>{motion.purpose}</p>
              </article>
            ))}
          </div>
          <div className="docs-guidance-grid">
            <Guidance type="do" title="Animate compositor properties">
              Prefer transform and opacity to preserve scroll performance.
            </Guidance>
            <Guidance type="avoid" title="No motion without meaning">
              Avoid bounce, perpetual ornament and pinned scenes that add no
              narrative value.
            </Guidance>
          </div>
          <CodeBlock
            label="CSS / MOTION"
            code={`transition: transform var(--motion-base) var(--ease-out);\n\n@media (prefers-reduced-motion: reduce) {\n  transition: none;\n}`}
          />
        </section>

        <section id="accessibility" className="docs-section docs-anchor">
          <SectionHeading
            eyebrow="08 / FOUNDATIONS"
            title="Access is a system property."
            description="Accessibility is designed into tokens, states, motion and component behavior—not applied as a final audit."
          />
          <div className="docs-access-grid">
            {[
              [
                Contrast,
                'Contrast',
                'Primary body copy maintains clear contrast on dark surfaces. Gray 500 is reserved for nonessential metadata.',
              ],
              [
                Focus,
                'Focus',
                'Every interactive element receives a visible two-pixel signal ring with offset.',
              ],
              [
                MousePointer2,
                'Targets',
                'Controls use a minimum 44px target on touch surfaces.',
              ],
              [
                Zap,
                'Motion',
                'Reduced motion removes the intro, 3D canvas and nonessential transitions.',
              ],
            ].map(([Icon, title, copy]) => {
              const AccessIcon = Icon as typeof Contrast;
              return (
                <article key={title as string}>
                  <AccessIcon />
                  <h3>{title as string}</h3>
                  <p>{copy as string}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="button"
          className="docs-section docs-anchor docs-component-section"
        >
          <SectionHeading
            eyebrow="09 / COMPONENTS"
            title="Button"
            description="Buttons initiate an action. Choose emphasis from the importance of that action, not from visual preference."
          />
          <div className="docs-component-meta">
            <Status status="Stable" />
            <span>IMPLEMENTED / SHARED</span>
          </div>
          <div className="docs-specimen docs-button-specimen">
            <div>
              <span>PRIMARY</span>
              <SystemButton href="#button">SELECTED WORK</SystemButton>
            </div>
            <div>
              <span>SECONDARY</span>
              <a className="docs-secondary-button" href="#button">
                EXPLORE SYSTEM <ArrowUpRight />
              </a>
            </div>
            <div>
              <span>DISABLED</span>
              <button className="system-button" disabled>
                UNAVAILABLE <ArrowUpRight />
              </button>
            </div>
          </div>
          <div className="docs-anatomy">
            <span>01 LABEL</span>
            <span>02 DIRECTIONAL CUE</span>
            <span>03 44PX MIN TARGET</span>
          </div>
          <div className="docs-guidance-grid">
            <Guidance type="do" title="Use a verb-led label">
              Describe the outcome: View project, Open case study, Send message.
            </Guidance>
            <Guidance type="avoid" title="Avoid multiple primary actions">
              One region should have one strongest next step.
            </Guidance>
          </div>
          <CodeBlock
            label="REACT / BUTTON"
            code={`<SystemButton href="/#projects">\n  Selected work\n</SystemButton>`}
          />
        </section>

        <section
          id="tag"
          className="docs-section docs-anchor docs-component-section"
        >
          <SectionHeading
            eyebrow="10 / COMPONENTS"
            title="Tag"
            description="Tags classify content. They are compact, neutral and readable without interaction."
          />
          <div className="docs-component-meta">
            <Status status="Stable" />
            <span>IMPLEMENTED / SHARED</span>
          </div>
          <div className="docs-specimen docs-tag-specimen">
            <Tag>UI/UX DESIGN</Tag>
            <Tag>DEVELOPMENT</Tag>
            <Tag>CREATIVE TECHNOLOGY</Tag>
            <Tag>2026</Tag>
          </div>
          <CodeBlock
            label="REACT / TAG"
            code={`<Tag>Creative Technology</Tag>`}
          />
        </section>

        <section
          id="links"
          className="docs-section docs-anchor docs-component-section"
        >
          <SectionHeading
            eyebrow="11 / COMPONENTS"
            title="Meta link"
            description="Meta links move between destinations while keeping a quiet place in the hierarchy."
          />
          <div className="docs-component-meta">
            <Status status="Stable" />
            <span>IMPLEMENTED / SHARED</span>
          </div>
          <div className="docs-specimen docs-link-specimen">
            <MetaLink href="#links">VIEW CASE STUDY</MetaLink>
            <MetaLink href="/">RETURN TO PORTFOLIO</MetaLink>
          </div>
          <CodeBlock
            label="REACT / META LINK"
            code={`<MetaLink href="/#contact">Let's talk</MetaLink>`}
          />
        </section>

        <section
          id="project-card"
          className="docs-section docs-anchor docs-component-section"
        >
          <SectionHeading
            eyebrow="12 / COMPONENTS"
            title="Project card"
            description="The project card is the core evidence component. Image leads; title, role and direct actions make the work easy to assess."
          />
          <div className="docs-component-meta">
            <Status status="Stable" />
            <span>FEATURED + ARCHIVE VARIANTS</span>
          </div>
          <div className="docs-project-specimen">
            <ProjectCollection projects={[sampleProjects[6]]} />
          </div>
          <div className="docs-anatomy">
            <span>01 PROJECT IMAGE</span>
            <span>02 CATEGORY + YEAR</span>
            <span>03 ROLE</span>
            <span>04 LIVE + CASE ACTIONS</span>
          </div>
        </section>

        <section
          id="dialog"
          className="docs-section docs-anchor docs-component-section"
        >
          <SectionHeading
            eyebrow="13 / COMPONENTS"
            title="Case dialog"
            description="A focused reading surface for deeper project context without losing the collection position."
          />
          <div className="docs-component-meta">
            <Status status="Stable" />
            <span>NATIVE DIALOG</span>
          </div>
          <div className="docs-dialog-diagram">
            <div className="docs-dialog-bar">
              <span>POZAN / CASE STUDY</span>
              <b>CLOSE ×</b>
            </div>
            <div>
              <small>PROJECT TYPE / YEAR</small>
              <h3>Project title</h3>
              <p>Problem → Role → Process → Outcome</p>
            </div>
          </div>
          <div className="docs-guidance-grid">
            <Guidance type="do" title="Preserve focus">
              Trap focus while open and restore it to the trigger on close.
            </Guidance>
            <Guidance type="do" title="Support familiar dismissal">
              Escape and an explicit Close control are both required.
            </Guidance>
          </div>
        </section>

        <section id="storytelling" className="docs-section docs-anchor">
          <SectionHeading
            eyebrow="14 / PATTERNS"
            title="Scroll storytelling"
            description="Build a sequence of clear chapters. Each scroll scene advances the argument instead of simply adding spectacle."
          />
          <div className="docs-pattern-flow">
            {[
              'ORIGIN',
              'CONTEXT',
              'PROCESS',
              'EVIDENCE',
              'CAPABILITY',
              'CONTACT',
            ].map((step, index) => (
              <article key={step}>
                <span>0{index}</span>
                <b>{step}</b>
                <i />
              </article>
            ))}
          </div>
          <Guidance type="note" title="Narrative rule">
            Every pinned or scrubbed sequence must answer: what does the viewer
            understand after this movement that they did not understand before?
          </Guidance>
        </section>

        <section id="case-study" className="docs-section docs-anchor">
          <SectionHeading
            eyebrow="15 / PATTERNS"
            title="Case study structure"
            description="Every project uses the same evidence model so recruiters and clients can compare work without decoding a new layout."
          />
          <div className="docs-case-flow">
            {[
              ['01', 'Problem', 'What needed to change?'],
              ['02', 'Role', 'What did Pozan own?'],
              ['03', 'Process', 'How was the solution shaped?'],
              ['04', 'Outcome', 'What exists now?'],
            ].map(([n, title, copy]) => (
              <article key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="localization" className="docs-section docs-anchor">
          <SectionHeading
            eyebrow="16 / PATTERNS"
            title="Localization"
            description="Vietnamese and English express the same intent while allowing natural phrasing in each language."
          />
          <div className="docs-localization">
            <Languages />
            <div>
              <b>VI</b>
              <p>Từ ý tưởng đến trải nghiệm số chạy thật.</p>
            </div>
            <div>
              <b>EN</b>
              <p>From idea to a digital experience that works.</p>
            </div>
          </div>
          <Guidance type="avoid" title="Avoid literal word-by-word translation">
            Translate meaning, rhythm and user intent. Recheck layout after
            every language change.
          </Guidance>
        </section>

        <section id="responsive" className="docs-section docs-anchor">
          <SectionHeading
            eyebrow="17 / PATTERNS"
            title="Responsive behavior"
            description="Layouts adapt by priority. Content order stays meaningful even when composition changes."
          />
          <div className="docs-breakpoints">
            <div>
              <Grid3X3 />
              <b>DESKTOP / 12</b>
              <span>≥ 1025px</span>
            </div>
            <div>
              <Grid3X3 />
              <b>TABLET / 8</b>
              <span>701–1024px</span>
            </div>
            <div>
              <Grid3X3 />
              <b>MOBILE / 4</b>
              <span>≤ 700px</span>
            </div>
          </div>
        </section>

        <section id="voice" className="docs-section docs-anchor">
          <SectionHeading
            eyebrow="18 / CONTENT"
            title="Confident, precise, human."
            description="The voice shows technical ability without hiding behind jargon. It is direct enough for a recruiter and expressive enough for a creative collaborator."
          />
          <div className="docs-voice-grid">
            <article>
              <b>Clear</b>
              <p>Lead with what was made and why it matters.</p>
            </article>
            <article>
              <b>Specific</b>
              <p>Name the role, process and implemented outcome.</p>
            </article>
            <article>
              <b>Curious</b>
              <p>Show exploration without overstating expertise.</p>
            </article>
            <article>
              <b>Concise</b>
              <p>
                One idea per sentence. Remove filler before removing
                personality.
              </p>
            </article>
          </div>
        </section>

        <section id="microcopy" className="docs-section docs-anchor">
          <SectionHeading
            eyebrow="19 / CONTENT"
            title="Interface copy moves people."
            description="Labels should predict the result of an action and remain understandable outside the surrounding visual."
          />
          <div className="docs-copy-comparison">
            <Guidance type="do" title="View selected work">
              Names the content the visitor will reach.
            </Guidance>
            <Guidance type="avoid" title="Click here">
              Requires context and says nothing about the destination.
            </Guidance>
          </div>
        </section>

        <section id="governance" className="docs-section docs-anchor">
          <SectionHeading
            eyebrow="20 / CONTRIBUTE"
            title="A living system, with rules."
            description="Components move through visible maturity states. A new pattern earns system status only after it solves a recurring need and passes quality checks."
          />
          <div className="docs-status-table">
            <div>
              <span>Component</span>
              <span>Status</span>
              <span>Purpose</span>
            </div>
            {componentStatuses.map((item) => (
              <article key={item.name}>
                <b>{item.name}</b>
                <Status status={item.status as 'Stable' | 'Experimental'} />
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <div className="docs-lifecycle">
            {['PROPOSE', 'TEST', 'DOCUMENT', 'ADOPT', 'REVIEW'].map(
              (step, index) => (
                <div key={step}>
                  <span>0{index + 1}</span>
                  <b>{step}</b>
                </div>
              ),
            )}
          </div>
        </section>

        <section id="release-checklist" className="docs-section docs-anchor">
          <SectionHeading
            eyebrow="21 / CONTRIBUTE"
            title="Ready means verified."
            description="A component is ready when design intent, code behavior and accessibility agree across supported viewports."
          />
          <div className="docs-checklist">
            {[
              'Uses shared tokens instead of one-off values',
              'Includes default, hover, focus, active and disabled states',
              'Works with keyboard and screen reader semantics',
              'Respects reduced motion',
              'Verified at 375, 768, 1024 and 1440px',
              'Documented with purpose, anatomy and usage guidance',
            ].map((item) => (
              <div key={item}>
                <CheckCircle2 />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <footer className="docs-footer">
          <div>
            <span>POZAN SYSTEM / 01.1</span>
            <h2>
              Designed to evolve.
              <br />
              Built to stay coherent.
            </h2>
          </div>
          <Link href="/">
            <ArrowLeft /> RETURN TO PORTFOLIO
          </Link>
        </footer>
      </main>
    </div>
  );
}

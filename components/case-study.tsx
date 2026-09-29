import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { CaseStudyProject } from '@/data/case-studies';
import CaseStudyProgress from './case-study-progress';

function SectionHeader({
  index,
  eyebrow,
  title,
  copy,
}: {
  index: string;
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <header className="case-section-header">
      <span>{index} / {eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </header>
  );
}

function CaseStudyHero({ project }: { project: CaseStudyProject }) {
  const metadata = [
    ['ROLE', project.role],
    ['PLATFORM', project.platform],
    ['YEAR', project.year],
    ['TOOLS', project.tools?.join(' · ')],
  ].filter(([, value]) => value);

  return (
    <header className="case-hero">
      <div className="case-hero-topline">
        <Link href="/#projects"><ArrowLeft /> ALL PROJECTS</Link>
        <span>CASE STUDY / {project.index}</span>
      </div>
      <div className="case-hero-copy">
        <p>{project.positioning}</p>
        <h1>{project.title}</h1>
        <p className="case-hero-summary">{project.summary}</p>
        <div className="case-hero-actions">
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">LIVE PRODUCT <ArrowUpRight /></a>}
          {project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noreferrer">GITHUB <ArrowUpRight /></a>}
        </div>
      </div>
      {project.heroImage && (
        <figure className="case-hero-visual">
          <Image
            src={project.heroImage}
            alt={project.heroAlt ?? `${project.title} product interface`}
            fill
            priority
            sizes="100vw"
          />
          <figcaption>PUBLISHED PRODUCT / RESPONSIVE WEB</figcaption>
        </figure>
      )}
      <dl className="case-meta">
        {metadata.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

function ProblemSection({ project }: { project: CaseStudyProject }) {
  if (!project.problem) return null;
  return (
    <section className="case-section case-problem">
      <SectionHeader index="01" eyebrow="CONTEXT" title="The product opportunity." />
      <div className="case-problem-grid">
        <article><span>WHO</span><p>{project.problem.audience}</p></article>
        <article><span>FRICTION</span><p>{project.problem.statement}</p></article>
        <article><span>OPPORTUNITY</span><p>{project.problem.opportunity}</p></article>
      </div>
    </section>
  );
}

function InsightCards({ project }: { project: CaseStudyProject }) {
  if (!project.insights?.length) return null;
  return (
    <section className="case-section case-insights">
      <SectionHeader
        index="02"
        eyebrow="RESEARCH FRAME"
        title="Start with needs, not features."
        copy="The available project record does not include participant research or measured findings. These are documented product-design assumptions drawn from the defined concept."
      />
      {project.evidenceLabel && <p className="case-evidence-label">{project.evidenceLabel}</p>}
      <div className="case-insight-grid">
        {project.insights.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span><h3>{item.title}</h3><p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductPrinciples({ project }: { project: CaseStudyProject }) {
  if (!project.principles?.length) return null;
  return (
    <section className="case-section case-principles">
      <SectionHeader index="02" eyebrow="PRODUCT PRINCIPLES" title="A product that gets out of the way." />
      <div className="case-principle-list">
        {project.principles.map((item, index) => (
          <article key={item.word}>
            <span>0{index + 1}</span><h3>{item.word}</h3><p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function UserFlow({ project }: { project: CaseStudyProject }) {
  if (!project.flow?.length) return null;
  return (
    <section className="case-section case-flow-section">
      <SectionHeader index="03" eyebrow="CORE FLOW" title="One clear path through the product." />
      <ol className="case-flow">
        {project.flow.map((step, index) => (
          <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><b>{step}</b><i aria-hidden="true">→</i></li>
        ))}
      </ol>
    </section>
  );
}

function InformationArchitecture({ project }: { project: CaseStudyProject }) {
  if (!project.architecture?.length) return null;
  return (
    <section className="case-section case-architecture-section">
      <SectionHeader index="04" eyebrow="INFORMATION ARCHITECTURE" title="A wellness system in four layers." />
      <div className="case-architecture">
        {project.architecture.map((group) => (
          <article key={group.group}>
            <h3>{group.group}</h3>
            <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function DesignSystem({ project }: { project: CaseStudyProject }) {
  if (!project.visualSystem) return null;
  return (
    <section className="case-section case-system-section">
      <SectionHeader index={project.slug === 'u-life' ? '05' : '04'} eyebrow="DESIGN SYSTEM" title="From visual direction to reusable interface." copy={project.visualSystem.note} />
      <div className="case-palette">
        {project.visualSystem.colors.map((color) => (
          <article key={color.name} style={{ '--case-swatch': color.value } as React.CSSProperties}>
            <i /><b>{color.name}</b><span>{color.value}</span>
          </article>
        ))}
      </div>
      <div className="case-component-cloud" aria-label="Documented interface components">
        {project.visualSystem.components.map((component, index) => (
          <span key={component}><i>{String(index + 1).padStart(2, '0')}</i>{component}</span>
        ))}
      </div>
    </section>
  );
}

function ScreenGallery({ project }: { project: CaseStudyProject }) {
  if (!project.heroImage) return null;
  return (
    <section className="case-section case-final-section">
      <SectionHeader index={project.slug === 'u-life' ? '06' : '06'} eyebrow="FINAL EXPERIENCE" title={project.slug === 'u-life' ? 'A calmer entry point to student wellbeing.' : 'Discovery designed around real choices.'} />
      <div className="case-screen-composition">
        <figure className="case-screen-main">
          <Image src={project.heroImage} alt={project.heroAlt ?? ''} fill sizes="(max-width: 800px) 100vw, 80vw" />
        </figure>
        <div className="case-screen-detail" aria-hidden="true">
          <Image src={project.heroImage} alt="" fill sizes="(max-width: 800px) 60vw, 30vw" />
        </div>
        <p>SUPPLIED PROJECT VISUAL / {project.year}</p>
      </div>
    </section>
  );
}

function InteractionDemo({ project }: { project: CaseStudyProject }) {
  if (!project.interactions?.length) return null;
  return (
    <section className="case-section case-interactions">
      <SectionHeader index="05" eyebrow="INTERACTION DESIGN" title="States that keep discovery moving." />
      <div className="case-interaction-grid">
        {project.interactions.map((item, index) => (
          <article key={item.name}><span>0{index + 1}</span><div className="case-interaction-demo"><i /><i /><i /></div><h3>{item.name}</h3><p>{item.body}</p></article>
        ))}
      </div>
    </section>
  );
}

function DevelopmentSection({ project }: { project: CaseStudyProject }) {
  if (!project.delivery?.length) return null;
  return (
    <section className="case-section case-delivery">
      <SectionHeader index="07" eyebrow="DESIGN → ENGINEERING" title="The interface became a working product." copy="Each layer reflects the real BeeTools source and deployment stack." />
      <ol>
        {project.delivery.map((item, index) => (
          <li key={item.label}><span>{String(index + 1).padStart(2, '0')}</span><b>{item.label}</b><p>{item.value}</p></li>
        ))}
      </ol>
    </section>
  );
}

function OutcomeSection({ project }: { project: CaseStudyProject }) {
  if (!project.outcome) return null;
  return (
    <section className="case-section case-outcome">
      <span>OUTCOME / VERIFIED WITHOUT INVENTED METRICS</span>
      <h2>{project.outcome}</h2>
      {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">{project.slug === 'beetools' ? 'TRY BEETOOLS' : 'VIEW U-LIFE'} <ArrowUpRight /></a>}
    </section>
  );
}

function NextProject({ project, next }: { project: CaseStudyProject; next: CaseStudyProject }) {
  return (
    <footer className="case-next">
      <div><span>END / {project.title}</span><Link href="/#projects"><ArrowLeft /> ALL PROJECTS</Link></div>
      <Link href={`/projects/${next.slug}`}>
        <span>NEXT PROJECT</span><strong>{next.title}</strong><ArrowUpRight />
      </Link>
    </footer>
  );
}

export default function CaseStudy({ project, next }: { project: CaseStudyProject; next: CaseStudyProject }) {
  return (
    <main className={`case-study case-${project.slug}`}>
      <CaseStudyProgress />
      <CaseStudyHero project={project} />
      <ProblemSection project={project} />
      <InsightCards project={project} />
      <ProductPrinciples project={project} />
      <UserFlow project={project} />
      <InformationArchitecture project={project} />
      <DesignSystem project={project} />
      <InteractionDemo project={project} />
      <ScreenGallery project={project} />
      <DevelopmentSection project={project} />
      <OutcomeSection project={project} />
      <NextProject project={project} next={next} />
    </main>
  );
}

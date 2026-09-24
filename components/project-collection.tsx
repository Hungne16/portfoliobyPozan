'use client';

import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';
import type { PortfolioProject } from '@/data/projects';
import { projectSlug } from '@/data/projects';
import { LocalText, Tag } from './pozan-system';

function ProjectCard({
  project,
  index,
  featured,
}: {
  project: PortfolioProject;
  index: number;
  featured: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const slug = projectSlug(project.name);
  const stack = project.stack?.length
    ? project.stack
    : ['Design', 'Development'];
  const close = () => {
    dialog.current?.close();
    trigger.current?.focus();
  };
  const open = () => {
    dialog.current?.showModal();
  };
  return (
    <article
      className={featured ? 'project-orbit' : 'archive-card'}
      id={`work-${slug}`}
      style={featured ? { zIndex: index + 1 } : undefined}
    >
      <div className={`project-visual visual-${index % 3}`}>
        <div className="project-visual-inner">
          {project.imageKey ? (
            <Image
              src={
                project.imageKey.startsWith('/')
                  ? project.imageKey
                  : `/api/project-image?key=${encodeURIComponent(project.imageKey)}`
              }
              alt={`Project — ${project.name}`}
              fill
              sizes={
                featured
                  ? '(max-width: 800px) 92vw, 60vw'
                  : '(max-width: 700px) 92vw, 40vw'
              }
              unoptimized
            />
          ) : (
            <div className="project-symbol">{project.name}</div>
          )}
          <span className="visual-index">
            {String(index + (featured ? 1 : 5)).padStart(2, '0')} /{' '}
            {project.type}
          </span>
          <span className="visual-year">{project.year}</span>
          {project.flagship && (
            <span className="flagship-badge">
              <LocalText vi="CASE STUDY NỔI BẬT" en="FLAGSHIP CASE STUDY" />
            </span>
          )}
          {featured && (
            <>
              <span
                className="project-signal"
                data-signal={`DESIGN / BUILD / ${project.year}`}
              >
                DESIGN / BUILD / {project.year}
              </span>
              <i className="project-reticle" aria-hidden="true" />
            </>
          )}
        </div>
      </div>
      <div className="project-copy">
        <p className="micro-label">
          {project.disciplines?.join(' + ') ?? project.type} / {project.year}
        </p>
        <h3>{project.name}</h3>
        <p className="project-sub">{project.sub}</p>
        {project.quickFacts && (
          <dl className="project-facts">
            {project.quickFacts.map((fact) => (
              <div key={fact.labelEn}>
                <dt>
                  <LocalText vi={fact.labelVi} en={fact.labelEn} />
                </dt>
                <dd>
                  <LocalText vi={fact.valueVi} en={fact.valueEn} />
                </dd>
              </div>
            ))}
          </dl>
        )}
        <div className="project-proof">
          <div>
            <span>
              <LocalText vi="VAI TRÒ" en="MY ROLE" />
            </span>
            <p>{project.role}</p>
          </div>
          <div>
            <span>
              <LocalText vi="KẾT QUẢ" en="OUTCOME" />
            </span>
            <p>{project.result}</p>
          </div>
        </div>
        <div className="project-disciplines">
          {project.disciplines?.map((item) => (
            <Tag key={item}>{item.toUpperCase()}</Tag>
          ))}
          {stack.slice(0, 3).map((item) => (
            <Tag key={item}>{item.toUpperCase()}</Tag>
          ))}
        </div>
        <div className="project-actions">
          {project.projectUrl && (
            <a
              className="system-link"
              href={project.projectUrl}
              target="_blank"
              rel="noreferrer"
            >
              <LocalText vi="Mở dự án" en="Live website" /> ↗
            </a>
          )}
          <button className="system-link" ref={trigger} onClick={open}>
            <LocalText vi="Xem case study" en="Read case study" /> ↗
          </button>
        </div>
      </div>
      <dialog
        className="project-dialog"
        ref={dialog}
        aria-labelledby={`case-${slug}`}
        onClose={() => trigger.current?.focus()}
      >
        <div className="dialog-toolbar">
          <span>POZAN / CASE STUDY</span>
          <button onClick={close} autoFocus>
            <LocalText vi="Đóng" en="Close" /> ×
          </button>
        </div>
        <div className="case-heading">
          <span>
            {project.type} / {project.year}
          </span>
          <h2 id={`case-${slug}`}>{project.name}</h2>
          <p>{project.sub}</p>
        </div>
        {project.imageKey && (
          <figure className="case-hero-media">
            <Image
              src={project.imageKey}
              alt={`${project.name} final design`}
              fill
              sizes="(max-width: 760px) 92vw, 760px"
            />
            <figcaption>FINAL DESIGN / PROJECT EVIDENCE</figcaption>
          </figure>
        )}
        <div className="case-grid">
          {[
            ['Bối cảnh', 'Problem / Context', project.brief],
            ['Vai trò', 'My role', project.role],
            ['Hướng triển khai', 'Design direction', project.process],
            ['Kết quả', 'Outcome', project.result],
          ].filter(([, , value]) => Boolean(value)).map(([vi, en, value], i) => (
            <div key={en}>
              <b>
                0{i + 1} / <LocalText vi={vi} en={en} />
              </b>
              <p>{value}</p>
            </div>
          ))}
        </div>
        {project.deepDive && (
          <section className="flagship-deep-dive">
            <div className="flagship-deep-dive-heading">
              <span>05 / PRODUCT & ENGINEERING DEEP DIVE</span>
              <h3>
                <LocalText
                  vi={project.deepDive.titleVi}
                  en={project.deepDive.titleEn}
                />
              </h3>
              <p>
                <LocalText
                  vi={project.deepDive.introVi}
                  en={project.deepDive.introEn}
                />
              </p>
            </div>
            <div className="flagship-deep-dive-grid">
              {project.deepDive.points.map((point, index) => (
                <div key={point.label}>
                  <b>
                    0{index + 1} / {point.label}
                  </b>
                  <p>
                    <LocalText vi={point.vi} en={point.en} />
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
        {project.engineering && (
          <section className="engineering-note">
            <div>
              <span>{project.deepDive ? '06' : '05'} / ENGINEERING NOTES</span>
              <h3>
                <LocalText
                  vi="Quyết định đứng sau trải nghiệm."
                  en="Decisions behind the experience."
                />
              </h3>
            </div>
            <p>
              <LocalText
                vi={project.engineering.vi}
                en={project.engineering.en}
              />
            </p>
            <div className="engineering-stack" aria-label="Technology stack">
              {stack.map((item) => (
                <Tag key={item}>{item.toUpperCase()}</Tag>
              ))}
            </div>
          </section>
        )}
        {project.projectUrl && (
          <a
            className="system-button"
            href={project.projectUrl}
            target="_blank"
            rel="noreferrer"
          >
            <LocalText vi="Khám phá dự án" en="Explore the project" /> ↗
          </a>
        )}
      </dialog>
    </article>
  );
}

export default function ProjectCollection({
  projects,
  featured = false,
}: {
  projects: PortfolioProject[];
  featured?: boolean;
}) {
  const [activeDiscipline, setActiveDiscipline] = useState('ALL');
  const disciplines = ['ALL', 'UI/UX', 'SOCIAL', 'BRANDING', 'CREATIVE DEV'];
  const visibleProjects = useMemo(
    () =>
      activeDiscipline === 'ALL'
        ? projects
        : projects.filter((project) =>
            project.disciplines?.some(
              (discipline) => discipline.toUpperCase() === activeDiscipline,
            ),
          ),
    [activeDiscipline, projects],
  );

  return (
    <div className={featured ? 'project-stack' : 'work-collection'}>
      {!featured && (
        <nav className="work-filter" aria-label="Filter work by discipline">
          {disciplines.map((discipline) => (
            <button
              key={discipline}
              type="button"
              className={activeDiscipline === discipline ? 'is-active' : ''}
              onClick={() => setActiveDiscipline(discipline)}
              aria-pressed={activeDiscipline === discipline}
            >
              {discipline}
            </button>
          ))}
        </nav>
      )}
      <div className={featured ? 'project-stack' : 'archive-grid'} aria-live="polite">
      {visibleProjects.map((project, index) => (
        <ProjectCard
          key={project.name}
          project={project}
          index={index}
          featured={featured}
        />
      ))}
      {!visibleProjects.length && (
        <p className="work-filter-empty">No published work in this discipline yet.</p>
      )}
      </div>
    </div>
  );
}

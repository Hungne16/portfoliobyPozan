'use client';

import Image from 'next/image';
import { useRef } from 'react';
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
          {project.type} / {project.year}
        </p>
        <h3>{project.name}</h3>
        <p className="project-sub">{project.sub}</p>
        <div className="project-proof">
          <div>
            <span>MY ROLE</span>
            <p>{project.role}</p>
          </div>
        </div>
        <div className="project-disciplines">
          <Tag>DESIGN</Tag>
          <Tag>DEVELOPMENT</Tag>
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
        <div className="case-grid">
          {[
            ['Bối cảnh', 'Problem', project.brief],
            ['Vai trò', 'My role', project.role],
            ['Quá trình', 'Process', project.process],
            ['Kết quả', 'Outcome', project.result],
          ].map(([vi, en, value], i) => (
            <div key={en}>
              <b>
                0{i + 1} / <LocalText vi={vi} en={en} />
              </b>
              <p>{value}</p>
            </div>
          ))}
        </div>
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
  return (
    <div className={featured ? 'project-stack' : 'archive-grid'}>
      {projects.map((project, index) => (
        <ProjectCard
          key={project.name}
          project={project}
          index={index}
          featured={featured}
        />
      ))}
    </div>
  );
}

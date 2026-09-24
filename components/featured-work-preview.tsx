import Image from 'next/image';
import type { PortfolioProject } from '@/data/projects';
import { projectSlug } from '@/data/projects';
import { LocalText } from './pozan-system';

export default function FeaturedWorkPreview({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  return (
    <section className="featured-preview system-section" aria-labelledby="featured-work-title">
      <div className="section-meta">
        01 / FEATURED WORK <span>PRODUCT · INTERACTION · DIGITAL EXPERIENCE</span>
      </div>
      <div className="featured-preview-heading">
        <div>
          <h2 id="featured-work-title" className="chapter-title">
            <LocalText vi="Đi thẳng vào những gì mình đã làm." en="Start with the work." />
          </h2>
          <p>
            <LocalText
              vi="Một lát cắt ngắn về tư duy sản phẩm, thiết kế trải nghiệm và creative development."
              en="A short view into product thinking, experience design and creative development."
            />
          </p>
        </div>
        <a className="system-link" href="#projects">VIEW ALL WORK ↘</a>
      </div>
      <div className="featured-preview-grid">
        {projects.map((project, index) => (
          <a className="featured-preview-card" href={`#work-${projectSlug(project.name)}`} key={project.name}>
            <div className="featured-preview-image">
              {project.imageKey && (
                <Image src={project.imageKey} alt="" fill sizes="(max-width: 700px) 92vw, 31vw" />
              )}
              <span>0{index + 1} / {project.disciplines?.join(' + ')}</span>
            </div>
            <div>
              <h3>{project.name}</h3>
              <p>{project.sub}</p>
              <b>OPEN PROJECT ↘</b>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

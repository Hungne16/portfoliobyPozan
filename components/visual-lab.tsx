import Image from 'next/image';
import { visualLab } from '@/data/visual-lab';
import { LocalText } from './pozan-system';

export default function VisualLab() {
  return (
    <section id="visual-lab" className="system-section visual-lab">
      <div className="section-meta">
        04 / VISUAL LAB <span>OBSERVE / FRAME / EXPLORE</span>
      </div>
      <div className="section-heading">
        <h2 className="chapter-title">Beyond the build.</h2>
        <p>
          <LocalText
            vi="Một góc nhìn gần hơn vào hình ảnh và giao diện trong những dự án của mình. Các khung hình dưới đây được trích từ dự án thật."
            en="A closer look at visual direction and interfaces in my projects. These frames are details from existing work."
          />
        </p>
      </div>
      <div className="lab-grid">
        {visualLab.map((item) => (
          <figure key={item.id} className={`lab-item lab-${item.aspect}`}>
            <a href={item.source} aria-label={item.title}>
              <div className="lab-image">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width:700px) 92vw, 60vw"
                  unoptimized
                />
              </div>
              <figcaption>
                <span>
                  {item.discipline} / {item.year}
                </span>
                <h3>{item.title} ↗</h3>
                <small>
                  <LocalText
                    vi="Chi tiết từ dự án"
                    en="Detail from an existing project"
                  />
                </small>
              </figcaption>
            </a>
          </figure>
        ))}
      </div>
    </section>
  );
}

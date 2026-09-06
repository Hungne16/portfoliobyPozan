import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Mail,
  Palette,
  PenTool,
} from 'lucide-react';
import ScrollStory from '../components/scroll-story';
import { listProjects } from '@/db';

type PortfolioProject = {
  name: string;
  sub: string;
  type: string;
  brief: string;
  role: string;
  process: string;
  result: string;
  projectUrl: string | null;
  year: string;
  imageKey: string | null;
};

const sampleProjects: PortfolioProject[] = [
  {
    name: 'Kumo Café',
    sub: 'Một chút Nhật Bản, một chút bình yên.',
    type: 'BRAND IDENTITY',
    brief:
      'Xây dựng nhận diện cho một quán cà phê nhỏ lấy cảm hứng từ nhịp sống Nhật Bản.',
    role: 'Thiết kế nhận diện & bao bì',
    process: 'Moodboard → phác thảo → bảng màu → ứng dụng bao bì.',
    result: 'Bộ nhận diện concept gồm logo, menu và bao bì.',
    projectUrl: null,
    year: '2026',
    imageKey: null,
  },
  {
    name: 'Yoru — Music App',
    sub: 'Giai điệu dành riêng cho thế giới của bạn.',
    type: 'UI/UX DESIGN',
    brief: 'Khám phá cách tìm nhạc phù hợp với tâm trạng người nghe.',
    role: 'Thiết kế trải nghiệm & giao diện',
    process: 'Persona giả định → user flow → wireframe → prototype.',
    result: 'Prototype concept cho hành trình khám phá và lưu nhạc.',
    projectUrl: null,
    year: '2026',
    imageKey: null,
  },
  {
    name: 'Những ngày xanh',
    sub: 'Gom những điều nhỏ bé thành câu chuyện.',
    type: 'ILLUSTRATION',
    brief: 'Kể lại cảm giác những ngày hè qua một bộ tranh cá nhân.',
    role: 'Ý tưởng & minh họa',
    process: 'Quan sát đời sống → phác thảo → thử màu → hoàn thiện.',
    result: 'Định hướng mỹ thuật cho bộ postcard cá nhân.',
    projectUrl: null,
    year: '2026',
    imageKey: null,
  },
];

export const dynamic = 'force-dynamic';

export default async function Home() {
  let projects = sampleProjects;
  try {
    const saved = await listProjects();
    if (saved.length) {
      projects = saved.map((project) => ({
        name: project.title,
        sub: project.subtitle,
        type: project.category,
        brief: project.brief,
        role: project.role,
        process: project.process,
        result: project.result,
        projectUrl: project.projectUrl,
        year: project.year,
        imageKey: project.imageKey,
      }));
    }
  } catch {
    /* The authored projects remain visible before the first database migration. */
  }

  return (
    <ScrollStory>
      <a className="skip-link" href="#main">
        Đến nội dung chính
      </a>
      <header className="site-hud">
        <a className="hud-brand" href="#home">
          <span>✳</span> SORA/夢
        </a>
        <div className="hud-status">
          <i /> AVAILABLE FOR SELECT PROJECTS
        </div>
        <a className="hud-contact" href="#contact">
          CONTACT <ArrowUpRight />
        </a>
      </header>

      <main id="main">
        <section className="scene-chapter hero-chapter" id="home">
          <div className="coordinate coordinate-left">
            35.6762° N<br />
            139.6503° E
          </div>
          <div className="hero-copy-block">
            <p className="hero-kicker">DIGITAL DESIGNER / VISUAL STORYTELLER</p>
            <h1 className="hero-title">
              Dreams
              <br />
              <em>in motion.</em>
            </h1>
            <p className="hero-copy">
              Mình tạo nên những thế giới số nơi hình ảnh, chuyển động và câu
              chuyện gặp nhau.
            </p>
            <div className="hero-actions">
              <a href="#projects">
                Khám phá thế giới <ArrowDown />
              </a>
              <span>SCROLL TO ENTER / 巻物</span>
            </div>
          </div>
          <div className="hero-kanji" aria-hidden="true">
            夢
          </div>
          <div className="coordinate coordinate-right">
            CHAPTER_00
            <br />
            ORIGIN_SIGNAL
          </div>
        </section>

        <div className="glitch-cut" aria-hidden="true">
          <span>SORA_SIGNAL // 001</span>
        </div>

        <section className="scene-chapter about-chapter" id="about">
          <div className="chapter-index">
            <b>01</b>
            <span>IDENTITY / 自己紹介</span>
          </div>
          <div className="signal-card">
            <p className="micro-label">INCOMING TRANSMISSION</p>
            <h2 className="chapter-title">
              Một người hay mơ.
              <br />
              Một góc nhìn <em>khác.</em>
            </h2>
            <div className="signal-copy">
              <p>
                Mình là Sora — một designer yêu anime, những góc phố Nhật Bản và
                cảm giác khi một ý tưởng nhỏ dần trở thành cả một thế giới.
              </p>
              <p>
                Mình kết hợp thiết kế đồ họa, giao diện và chuyển động để tạo ra
                trải nghiệm có cá tính, dễ hiểu và đọng lại lâu hơn một lần
                lướt.
              </p>
            </div>
            <div className="signal-tags">
              <span>CURIOUS</span>
              <span>PLAYFUL</span>
              <span>STORY-DRIVEN</span>
            </div>
          </div>
          <p className="side-note">
            EVERYTHING STARTS
            <br />
            WITH A LITTLE DREAM ✦
          </p>
        </section>

        <div className="glitch-cut inverse" aria-hidden="true">
          <span>作品集 // SELECTED WORK</span>
        </div>

        <section className="projects-chapter" id="projects">
          <div className="projects-intro">
            <div className="chapter-index">
              <b>02</b>
              <span>SELECTED WORK / 作品集</span>
            </div>
            <h2 className="chapter-title">
              Những tín hiệu
              <br />
              mình đã <em>gửi đi.</em>
            </h2>
            <p>Mỗi dự án là một thế giới riêng. Cuộn để tiến sâu hơn.</p>
          </div>
          <div className="project-stack">
            {projects.map((project, index) => (
              <article
                className="project-orbit"
                key={`${project.name}-${index}`}
              >
                <div className={`project-visual visual-${index % 3}`}>
                  {project.imageKey ? (
                    <Image
                      src={
                        project.imageKey.startsWith('/')
                          ? project.imageKey
                          : `/api/project-image?key=${encodeURIComponent(project.imageKey)}`
                      }
                      alt={`Ảnh dự án ${project.name}`}
                      fill
                      sizes="(max-width: 800px) 92vw, 58vw"
                      unoptimized
                    />
                  ) : (
                    <div className="project-symbol" aria-hidden="true">
                      <span>{['雲', '夜', '青'][index % 3]}</span>
                      <i />
                    </div>
                  )}
                  <span className="visual-index">PROJECT / 0{index + 1}</span>
                  <span className="visual-year">{project.year}</span>
                </div>
                <div className="project-copy">
                  <p className="micro-label">{project.type}</p>
                  <h3>{project.name}</h3>
                  <p className="project-sub">{project.sub}</p>
                  {project.projectUrl && (
                    <a
                      className="project-live"
                      href={project.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Mở dự án thật <ArrowUpRight />
                    </a>
                  )}
                  <details>
                    <summary>
                      Xem case study <ArrowUpRight />
                    </summary>
                    <div className="case-grid">
                      <div>
                        <b>Bối cảnh</b>
                        <p>{project.brief}</p>
                      </div>
                      <div>
                        <b>Vai trò</b>
                        <p>{project.role}</p>
                      </div>
                      <div>
                        <b>Quá trình</b>
                        <p>{project.process}</p>
                      </div>
                      <div>
                        <b>Kết quả</b>
                        <p>{project.result}</p>
                      </div>
                    </div>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="glitch-cut" aria-hidden="true">
          <span>CAPABILITY_MATRIX // ONLINE</span>
        </div>

        <section className="scene-chapter skills-chapter" id="skills">
          <div className="chapter-index">
            <b>03</b>
            <span>CAPABILITIES / 技術</span>
          </div>
          <div className="skills-copy">
            <h2 className="chapter-title">
              Ý tưởng cần
              <br />
              <em>đúng công cụ.</em>
            </h2>
            <p>Từ nét vẽ đầu tiên đến trải nghiệm tương tác cuối cùng.</p>
          </div>
          <div className="skills-orbit">
            <div>
              <Palette />
              <span>01</span>
              <h3>Visual Design</h3>
              <p>Branding · Art Direction · Photoshop · Illustrator</p>
            </div>
            <div>
              <PenTool />
              <span>02</span>
              <h3>UI / UX</h3>
              <p>Figma · Wireframe · Prototype · Design System</p>
            </div>
            <div>
              <Code2 />
              <span>03</span>
              <h3>Creative Web</h3>
              <p>React · GSAP · Three.js · Interaction Design</p>
            </div>
          </div>
        </section>

        <section className="scene-chapter contact-chapter" id="contact">
          <div className="contact-ring" aria-hidden="true">
            LET&apos;S CREATE · 一緒に作ろう ·{' '}
          </div>
          <p className="micro-label">FINAL TRANSMISSION / 04</p>
          <h2 className="chapter-title">
            Có một thế giới
            <br />
            muốn cùng mình <em>tạo nên?</em>
          </h2>
          <a className="contact-button" href="mailto:hello@sora.design">
            <Mail /> HELLO@SORA.DESIGN <ArrowUpRight />
          </a>
          <p className="contact-note">
            OPEN FOR FREELANCE, COLLABORATION & GOOD STORIES.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <span>© 2026 SORA STUDIO</span>
        <span>DESIGNED WITH CURIOSITY / BUILT WITH HEART</span>
        <Link href="/admin">STUDIO ADMIN ↗</Link>
      </footer>
    </ScrollStory>
  );
}

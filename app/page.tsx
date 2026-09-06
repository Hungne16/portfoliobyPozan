import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Database,
  GitBranch,
  GraduationCap,
  Mail,
  MapPin,
  Palette,
  Radio,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
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
          <span>✳</span> POZAN/創
        </a>
        <div className="hud-status">
          <i /> SOFTWARE ENGINEER / CREATIVE DEVELOPER
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
            <p className="hero-kicker">
              SOFTWARE ENGINEERING / CREATIVE TECHNOLOGY
            </p>
            <h1 className="hero-title">
              Code. Craft.
              <br />
              <em>Impact.</em>
            </h1>
            <p className="hero-copy">
              Mình là Pozan — sinh viên Công nghệ Phần mềm tại HUCE. Mình biến ý
              tưởng thành sản phẩm số chỉn chu bằng tư duy kỹ sư và cảm quan
              thiết kế.
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
          <span>POZAN_SYSTEM // IDENTITY_LOADED</span>
        </div>

        <section className="scene-chapter about-chapter" id="about">
          <div className="chapter-index">
            <b>01</b>
            <span>IDENTITY / 自己紹介</span>
          </div>
          <div className="signal-card">
            <p className="micro-label">INCOMING TRANSMISSION</p>
            <h2 className="chapter-title">
              Kỹ sư biết mơ.
              <br />
              Người làm biết <em>đến cùng.</em>
            </h2>
            <div className="signal-copy">
              <p>
                Mình là Pozan, hiện theo học ngành Công nghệ Phần mềm tại Trường
                Đại học Xây dựng Hà Nội — HUCE. Mình quan tâm đến cách một hệ
                thống được thiết kế, xây dựng và vận hành trọn vẹn.
              </p>
              <p>
                Thế mạnh của mình nằm ở giao điểm giữa kỹ thuật và sáng tạo:
                kiến trúc giao diện rõ ràng, code có cấu trúc, trải nghiệm dễ
                dùng và chuyển động có chủ đích.
              </p>
            </div>
            <div className="signal-tags">
              <span>CURIOUS</span>
              <span>SYSTEM THINKER</span>
              <span>PRODUCT-MINDED</span>
              <span>SHIP-FOCUSED</span>
            </div>
          </div>
          <p className="side-note">
            EVERYTHING STARTS
            <br />
            WITH A WORKING SYSTEM ✦
          </p>
        </section>

        <section className="experience-chapter" id="experience">
          <div className="chapter-index">
            <b>02</b>
            <span>EXPERIENCE LOG / 経験</span>
          </div>
          <div className="experience-heading parallax-slow">
            <p className="micro-label">
              FIELD NOTES / PROJECT-BASED EXPERIENCE
            </p>
            <h2 className="chapter-title">
              Học bằng cách
              <br />
              <em>xây thật.</em>
            </h2>
            <p>
              Kinh nghiệm của mình được tích lũy qua chu trình hoàn chỉnh: tìm
              vấn đề, thiết kế giải pháp, phát triển, kiểm thử và đưa sản phẩm
              lên môi trường thực tế.
            </p>
          </div>
          <div className="experience-timeline">
            <article className="experience-entry">
              <span>01 / PRODUCT</span>
              <div>
                <h3>Product Engineering</h3>
                <p>BeeTools · Temsy · Arcade Học Đường</p>
              </div>
              <p>
                Xây dựng ứng dụng web từ luồng người dùng đến giao diện hoạt
                động, bao gồm tìm kiếm, phân loại, phòng tương tác và trạng thái
                dữ liệu.
              </p>
            </article>
            <article className="experience-entry">
              <span>02 / COMMUNITY</span>
              <div>
                <h3>Community Platforms</h3>
                <p>ULIS Eco · WULIS · BookBridge · Lost & Found</p>
              </div>
              <p>
                Chuyển các vấn đề trong đời sống sinh viên thành nền tảng có cấu
                trúc nội dung rõ ràng, hành trình sử dụng dễ hiểu và bản sắc thị
                giác riêng.
              </p>
            </article>
            <article className="experience-entry">
              <span>03 / DIGITAL</span>
              <div>
                <h3>Interactive Web Experiences</h3>
                <p>Orbits DeFi · U-Life · U-RUN</p>
              </div>
              <p>
                Thiết kế và phát triển website responsive, kết hợp animation, hệ
                thống component và tối ưu trải nghiệm trên nhiều thiết bị.
              </p>
            </article>
          </div>
        </section>

        <div className="glitch-cut inverse" aria-hidden="true">
          <span>作品集 // TEN PRODUCTS SHIPPED</span>
        </div>

        <section className="projects-chapter" id="projects">
          <div className="projects-intro">
            <div className="chapter-index">
              <b>03</b>
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
            <b>04</b>
            <span>ENGINEERING MATRIX / 技術</span>
          </div>
          <div className="skills-copy">
            <h2 className="chapter-title">
              Viết code để
              <br />
              <em>giải quyết vấn đề.</em>
            </h2>
            <p>
              Từ nền tảng khoa học máy tính đến sản phẩm chạy ổn định ngoài thực
              tế.
            </p>
          </div>
          <div className="skills-orbit">
            <div>
              <Code2 />
              <span>01</span>
              <h3>Frontend Engineering</h3>
              <p>
                React · Next.js · TypeScript · Responsive UI · Accessibility
              </p>
            </div>
            <div>
              <Server />
              <span>02</span>
              <h3>Backend & API</h3>
              <p>Node.js · REST API · Authentication · Server Actions</p>
            </div>
            <div>
              <Database />
              <span>03</span>
              <h3>Data Engineering</h3>
              <p>SQL · Data Modeling · SQLite · D1 · Object Storage</p>
            </div>
            <div>
              <GitBranch />
              <span>04</span>
              <h3>Software Practice</h3>
              <p>Git · Clean Code · Component Architecture · Documentation</p>
            </div>
            <div>
              <ShieldCheck />
              <span>05</span>
              <h3>Quality & Security</h3>
              <p>
                Validation · Error Handling · Testing · Performance · Security
                Basics
              </p>
            </div>
            <div>
              <Palette />
              <span>06</span>
              <h3>Creative Technology</h3>
              <p>Figma · GSAP · Three.js · Motion · Design Systems</p>
            </div>
          </div>
        </section>

        <section className="cv-chapter" id="cv">
          <div className="cv-pin">
            <div className="cv-portal" aria-hidden="true">
              <div className="cv-window">
                <div className="cv-window-topbar">
                  <span />
                  <span />
                  <span />
                  <b>POZAN_PROFILE.EXE</b>
                </div>
                <div className="cv-window-view">
                  <i className="cv-window-cross cv-window-cross-x" />
                  <i className="cv-window-cross cv-window-cross-y" />
                  <div className="cv-window-horizon" />
                  <div className="cv-window-sun">05</div>
                  <p>SCROLL TO ENTER</p>
                </div>
                <span className="cv-window-corner cv-window-corner-tl" />
                <span className="cv-window-corner cv-window-corner-tr" />
                <span className="cv-window-corner cv-window-corner-bl" />
                <span className="cv-window-corner cv-window-corner-br" />
              </div>
            </div>

            <div className="cv-reveal">
              <div className="cv-watermark" aria-hidden="true">
                CV
              </div>
              <div className="chapter-index">
                <b>05</b>
                <span>CURRICULUM VITAE / 履歴書</span>
              </div>
              <div className="cv-panel">
                <div className="cv-intro">
                  <p className="micro-label">
                    UNDERGRADUATE ACADEMIC CV / 2026
                  </p>
                  <h2>POZAN</h2>
                  <p>
                    B.Eng. Software Engineering Student
                    <br />
                    Creative Developer
                  </p>
                </div>
                <div className="cv-education">
                  <GraduationCap />
                  <span>EDUCATION</span>
                  <h3>Trường Đại học Xây dựng Hà Nội</h3>
                  <p>
                    Kỹ sư Công nghệ Phần mềm · Đang theo học
                    <br />
                    Hanoi University of Civil Engineering — HUCE
                  </p>
                </div>
                <div className="cv-projects">
                  <span>SELECTED ENGINEERING PROJECTS</span>
                  <ol>
                    <li>
                      <b>BeeTools</b>
                      <small>Ứng dụng web · Khám phá công cụ AI</small>
                    </li>
                    <li>
                      <b>Arcade Học Đường</b>
                      <small>EdTech · Trải nghiệm học tập tương tác</small>
                    </li>
                    <li>
                      <b>ULIS Digital Ecosystem</b>
                      <small>Nền tảng cộng đồng · Thiết kế sản phẩm</small>
                    </li>
                  </ol>
                </div>
                <div className="cv-foundation">
                  <span>ACADEMIC & TECHNICAL FOUNDATION</span>
                  <ul>
                    <li>Cấu trúc dữ liệu & giải thuật</li>
                    <li>Lập trình hướng đối tượng</li>
                    <li>Cơ sở dữ liệu & thiết kế hệ thống</li>
                    <li>Mạng máy tính & hệ điều hành</li>
                    <li>Phân tích yêu cầu & vòng đời phần mềm</li>
                    <li>Làm việc nhóm, Git workflow & giao tiếp kỹ thuật</li>
                  </ul>
                </div>
                <div className="cv-focus">
                  <span>AREAS OF INTEREST</span>
                  <p>
                    Human–Computer Interaction <i>/</i> Software Architecture{' '}
                    <i>/</i> Web Engineering <i>/</i> Creative Technology
                  </p>
                </div>
                <a className="cv-cta" href="#contact">
                  <Terminal /> TRAO ĐỔI CƠ HỘI <ArrowUpRight />
                </a>
              </div>
            </div>
            <div className="cv-scroll-cue" aria-hidden="true">
              <span>SCROLL</span>
              <i />
              <b>ENTER THE PROFILE</b>
            </div>
          </div>
        </section>

        <section className="scene-chapter contact-chapter" id="contact">
          <div className="contact-wordmark" aria-hidden="true">
            SIGNAL
          </div>
          <div className="contact-orbit-system" aria-hidden="true">
            <span className="contact-orbit orbit-a" />
            <span className="contact-orbit orbit-b" />
            <span className="contact-orbit orbit-c" />
            <i className="contact-satellite satellite-a" />
            <i className="contact-satellite satellite-b" />
            <div className="contact-core">
              <Radio />
            </div>
          </div>
          <div className="contact-layout">
            <div className="contact-heading">
              <p className="micro-label">FINAL TRANSMISSION / 06</p>
              <h2 className="chapter-title">
                Gửi một <em>tín hiệu.</em>
                <br />
                Mình sẽ biến nó thành chuyển động.
              </h2>
              <p>
                Thực tập, dự án nghiên cứu sinh viên, sản phẩm web hoặc một ý
                tưởng chưa có tên — hãy bắt đầu bằng một lời chào.
              </p>
            </div>
            <div className="contact-console">
              <div className="contact-console-bar">
                <span />
                <b>POZAN / COMMS_CHANNEL</b>
                <small>● ONLINE</small>
              </div>
              <div className="contact-console-body">
                <div className="contact-location">
                  <MapPin />
                  <span>
                    BASED IN
                    <b>HÀ NỘI, VIỆT NAM</b>
                  </span>
                </div>
                <a className="contact-button" href="mailto:hello@pozan.dev">
                  <span>
                    <small>DIRECT CHANNEL</small>
                    HELLO@POZAN.DEV
                  </span>
                  <Mail />
                  <ArrowUpRight />
                </a>
                <div className="contact-topics">
                  <span>INTERNSHIP</span>
                  <span>STUDENT RESEARCH</span>
                  <span>WEB PROJECT</span>
                  <span>CREATIVE COLLAB</span>
                </div>
                <p>
                  <Sparkles /> CHANNEL READY — YOUR MESSAGE STARTS THE NEXT
                  CHAPTER.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>© 2026 POZAN</span>
        <span>ENGINEERED WITH LOGIC / CRAFTED WITH IMAGINATION</span>
        <Link href="/admin">STUDIO ADMIN ↗</Link>
      </footer>
    </ScrollStory>
  );
}

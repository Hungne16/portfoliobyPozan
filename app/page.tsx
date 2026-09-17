import {
  sampleProjects,
  featuredNames,
  type PortfolioProject,
} from '@/data/projects';
import { LocalText } from '@/components/pozan-system';
import ProjectCollection from '@/components/project-collection';
import VisualLab from '@/components/visual-lab';
import Capabilities from '@/components/capabilities';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  GraduationCap,
  Mail,
  MapPin,
  Radio,
  Sparkles,
  Terminal,
} from 'lucide-react';
import ScrollStory from '../components/scroll-story';
import AboutStory from '../components/about-story';
import LanguageSwitcher from '../components/language-switcher';
import HeroVideo from '../components/hero-video';
import ProcessVideo from '../components/process-video';
import { listProjects } from '@/db';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let projects: PortfolioProject[] = sampleProjects;
  try {
    const saved = await listProjects();
    if (saved.length) {
      projects = saved.map((project) => {
        const authored = sampleProjects.find(
          (candidate) => candidate.name === project.title,
        );

        return {
          ...authored,
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
        };
      });
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
          <i /> CREATIVE DEVELOPER / UI/UX DESIGNER / SOFTWARE ENGINEER
        </div>
        <div className="hud-actions">
          <LanguageSwitcher />
          <a className="hud-contact" href="#contact">
            CONTACT <ArrowUpRight />
          </a>
        </div>
      </header>

      <main id="main">
        <section className="scene-chapter hero-chapter" id="home">
          <div className="hero-art" aria-hidden="true">
            <HeroVideo />
          </div>
          <div className="hero-wordmark" aria-hidden="true">
            POZAN
          </div>
          <div className="coordinate coordinate-left">
            STORY_001 / HANOI
            <br />
            THE MAKING OF AN IDEA
          </div>
          <div className="hero-copy-block">
            <p className="hero-kicker">PROLOGUE / THE FIRST SIGNAL</p>
            <p className="hero-positioning">
              <LocalText
                vi="SINH VIÊN CÔNG NGHỆ PHẦN MỀM @ HUCE / CREATIVE FRONTEND DEVELOPER"
                en="SOFTWARE ENGINEERING STUDENT @ HUCE / CREATIVE FRONTEND DEVELOPER"
              />
            </p>
            <h1 className="hero-title">
              <LocalText
                vi="Từ ý tưởng đến trải nghiệm số chạy thật."
                en="From idea to a digital experience that works."
              />
            </h1>
            <p className="hero-copy">
              <LocalText
                vi="Mình thiết kế và phát triển website tương tác từ UI/UX đến frontend và deployment."
                en="I design and build interactive websites—from UI/UX through frontend implementation and deployment."
              />
            </p>
            <div className="hero-actions">
              <a href="#projects">
                <LocalText vi="Xem Selected Work" en="View Selected Work" />{' '}
                <ArrowDown />
              </a>
              <a className="hero-contact-link" href="#visual-lab">
                <LocalText vi="Khám phá Visual Lab" en="Explore Visual Lab" />{' '}
                <ArrowUpRight />
              </a>
            </div>
            <div className="hero-proof" aria-label="Năng lực nổi bật">
              <div>
                <b>10</b>
                <span>
                  <LocalText vi="SẢN PHẨM ĐÃ SHIP" en="SHIPPED PRODUCTS" />
                </span>
              </div>
              <div>
                <b>REACT + NEXT</b>
                <span>CORE FRONTEND</span>
              </div>
              <div>
                <b>END–TO–END</b>
                <span>DESIGN · CODE · DEPLOY</span>
              </div>
              <div>
                <b>OPEN</b>
                <span>
                  <LocalText
                    vi="THỰC TẬP · WEB COLLAB"
                    en="INTERNSHIP · WEB COLLAB"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="coordinate coordinate-right">
            CHAPTER_00 / ORIGIN
            <br />
            CODE × STORY × MOTION
          </div>
        </section>

        <div className="glitch-cut" aria-hidden="true">
          <span>POZAN_SYSTEM // EVERY STORY STARTS WITH A QUESTION</span>
        </div>

        <AboutStory />

        <section className="experience-chapter system-section" id="experience">
          <div className="section-meta">
            02 / PROCESS{' '}
            <span>RESEARCH → STRUCTURE → DESIGN → BUILD → SHIP</span>
          </div>
          <div className="process-intro">
            <div className="process-intro-copy">
              <span>HOW I TURN AMBIGUITY INTO DIRECTION</span>
              <h2 className="chapter-title">
                <LocalText
                  vi="Từ câu hỏi đến sản phẩm."
                  en="From question to working product."
                />
              </h2>
              <p>
                <LocalText
                  vi="Mỗi dự án đi qua một vòng lặp rõ ràng: hiểu đúng vấn đề, định hình hệ thống, tạo trải nghiệm và đưa nó vào sử dụng."
                  en="Every project follows a clear loop: understand the problem, shape the system, create the experience and put it into use."
                />
              </p>
            </div>
            <figure className="process-visual">
              <div className="process-visual-bar">
                <span>POZAN_PROCESS.MONITOR</span>
                <span>● LIVE LOOP</span>
              </div>
              <div className="process-video-frame">
                <ProcessVideo />
                <div className="process-video-grid" aria-hidden="true" />
                <div className="process-video-readout" aria-hidden="true">
                  <span>INPUT / IDEA</span>
                  <span>OUTPUT / EXPERIENCE</span>
                </div>
              </div>
              <figcaption>
                RESEARCH → SYSTEM → INTERFACE → IMPLEMENTATION
              </figcaption>
            </figure>
          </div>
          <div className="experience-timeline">
            {[
              ['DISCOVER', 'Problem · Context · Research · Requirements'],
              [
                'DEFINE',
                'Information Architecture · User Flow · Product Direction',
              ],
              ['DESIGN', 'UI/UX · Visual System · Prototype · Motion'],
              ['BUILD', 'Frontend · Interaction · Data · Deploy'],
            ].map(([title, text], index) => (
              <article className="experience-entry" key={title}>
                <span>0{index + 1} /</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="glitch-cut inverse" aria-hidden="true">
          <span>作品集 // TEN PRODUCTS SHIPPED</span>
        </div>

        <section className="projects-chapter system-section" id="projects">
          <div className="section-meta">
            03 / SELECTED WORK <span>DESIGN × DEVELOPMENT</span>
          </div>
          <div className="section-heading">
            <h2 className="chapter-title">
              <LocalText vi="Ý tưởng. Thành hình." en="Ideas. Made real." />
            </h2>
            <p>
              <LocalText
                vi="Bốn dự án. Bốn cách kết nối thiết kế và công nghệ."
                en="Four projects. Four ways to connect design and technology."
              />
            </p>
          </div>
          <ProjectCollection
            projects={[...projects]
              .filter((p) => featuredNames.includes(p.name))
              .sort(
                (a, b) =>
                  featuredNames.indexOf(a.name) - featuredNames.indexOf(b.name),
              )}
            featured
          />
          <div className="archive-heading">
            <h3>PROJECT ARCHIVE</h3>
            <span>
              {String(
                projects.filter((p) => !featuredNames.includes(p.name)).length,
              ).padStart(2, '0')}{' '}
              / MORE EXPLORATIONS
            </span>
          </div>
          <ProjectCollection
            projects={projects.filter((p) => !featuredNames.includes(p.name))}
          />
        </section>
        <VisualLab />
        <Capabilities />

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
                  <div className="cv-window-sun">06</div>
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
                <b>06</b>
                <span>THE PERSON / 履歴書</span>
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
                    Creative Developer / UI/UX Designer
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
              <p className="micro-label">FINAL TRANSMISSION / 07</p>
              <h2 className="chapter-title">
                <span data-localized data-vi="Gửi một" data-en="Send a">
                  Gửi một
                </span>{' '}
                <em data-localized data-vi="tín hiệu." data-en="signal.">
                  tín hiệu.
                </em>
                <br />
                <span
                  data-localized
                  data-vi="Cùng tạo điều tiếp theo."
                  data-en="Let’s make what’s next."
                >
                  Cùng tạo điều tiếp theo.
                </span>
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
                <div className="contact-links">
                  <a
                    className="contact-button"
                    href="mailto:vumanhhung03012004@gmail.com"
                  >
                    <span>
                      <small>DIRECT CHANNEL</small>
                      vumanhhung03012004@gmail.com
                    </span>
                    <Mail />
                    <ArrowUpRight />
                  </a>
                  <a
                    className="contact-button contact-button-secondary"
                    href="https://github.com/Hungne16"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>
                      <small>CODE & REPOSITORIES</small>
                      GITHUB.COM/HUNGNE16
                    </span>
                    <Code2 />
                    <ArrowUpRight />
                  </a>
                </div>
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
        <div className="footer-links">
          <a
            href="https://github.com/Hungne16"
            target="_blank"
            rel="noreferrer"
          >
            GITHUB ↗
          </a>
          <Link href="/design-system">POZAN SYSTEM ↗</Link>
          <Link href="/admin">STUDIO ADMIN ↗</Link>
        </div>
      </footer>
    </ScrollStory>
  );
}

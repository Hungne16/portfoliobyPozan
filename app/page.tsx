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
    name: 'ULIS Eco',
    sub: 'Sống xanh bắt đầu từ những thay đổi nhỏ trong cộng đồng sinh viên.',
    type: 'COMMUNITY PLATFORM',
    brief:
      'Một nền tảng giúp sinh viên ULIS chia sẻ mẹo tái chế, trao đổi đồ dùng cũ và kết nối quanh lối sống bền vững.',
    role: 'Thiết kế UI/UX, định hướng hình ảnh và phát triển website.',
    process:
      'Phân tích vấn đề lãng phí trong trường học → xây dựng kiến trúc nội dung → thiết kế giao diện → hoàn thiện trải nghiệm responsive.',
    result:
      'Website truyền tải rõ câu chuyện sống xanh và tạo điểm chạm trực quan cho hoạt động cộng đồng.',
    projectUrl: 'https://uliseco.framer.website/about',
    year: '2026',
    imageKey: '/projects/ulis-eco.png',
  },
  {
    name: 'U-RUN — Be ULISer, Be Runner',
    sub: 'Đường đua số dành riêng cho cộng đồng sinh viên ULIS.',
    type: 'CAMPAIGN WEBSITE',
    brief:
      'Xây dựng điểm đến số cho giải chạy sinh viên, giúp người tham gia hiểu chương trình và đăng ký nhanh.',
    role: 'Thiết kế trải nghiệm, giao diện và phát triển website.',
    process:
      'Xác định hành trình đăng ký → xây dựng visual direction năng động → thiết kế responsive → triển khai.',
    result:
      'Một landing page giàu năng lượng, giúp thông tin giải chạy dễ tiếp cận và thúc đẩy đăng ký.',
    projectUrl: 'https://urunbeuliser.framer.website/',
    year: '2026',
    imageKey: '/projects/urun-be-uliser.png',
  },
  {
    name: 'U-Life',
    sub: 'Chăm sóc sức khỏe thể chất và tinh thần cho sinh viên ĐHQGHN.',
    type: 'HEALTH PRODUCT',
    brief:
      'Concept nền tảng giúp sinh viên theo dõi sức khỏe, xây dựng thói quen và tiếp cận nội dung hỗ trợ phù hợp.',
    role: 'Nghiên cứu sản phẩm, thiết kế UI/UX và phát triển website giới thiệu.',
    process:
      'Nghiên cứu nhu cầu → xác định nhóm tính năng → user flow → prototype → landing page.',
    result:
      'Concept sản phẩm kết nối theo dõi thể chất, tinh thần và hỗ trợ xây dựng thói quen tích cực.',
    projectUrl: 'https://ulife.framer.website/',
    year: '2026',
    imageKey: '/projects/ulife.png',
  },
  {
    name: 'WULIS — Workshop ULIS',
    sub: 'Một điểm đến tập trung cho workshop và sự kiện học thuật.',
    type: 'EDTECH PLATFORM',
    brief:
      'Giải quyết tình trạng thông tin workshop phân tán bằng một nền tảng tập trung, dễ tìm kiếm và khám phá.',
    role: 'Thiết kế sản phẩm, UI/UX và phát triển giao diện.',
    process:
      'Phân nhóm nội dung → thiết kế kiến trúc thông tin → component system → responsive implementation.',
    result:
      'Nền tảng tổng hợp workshop theo khoa và chủ đề, giúp sinh viên tìm cơ hội phát triển nhanh hơn.',
    projectUrl: 'https://wulis.framer.website/',
    year: '2026',
    imageKey: '/projects/wulis.png',
  },
  {
    name: 'The BookBridge',
    sub: 'Cầu nối giáo trình đáng tin cậy cho cộng đồng ULIS.',
    type: 'COMMUNITY MARKETPLACE',
    brief:
      'Tạo không gian kết nối sách cũ với sinh viên đang cần, giảm chi phí và kéo dài vòng đời tài liệu.',
    role: 'Xây dựng concept, thiết kế visual và phát triển website.',
    process:
      'Xác định giá trị cộng đồng → content flow → visual storytelling → responsive build.',
    result:
      'Một nền tảng kể câu chuyện rõ ràng về việc kết nối sách cũ với người đang cần chúng.',
    projectUrl: 'https://thebookbridge.framer.website/',
    year: '2025',
    imageKey: '/projects/the-book-bridge.png',
  },
  {
    name: 'ULIS Lost & Found',
    sub: 'Nơi đồ thất lạc tìm đường về, đồ cũ bắt đầu hành trình mới.',
    type: 'COMMUNITY SERVICE',
    brief:
      'Kết nối nhu cầu tìm đồ thất lạc và trao đổi đồ cũ trong một hành trình cộng đồng thống nhất.',
    role: 'Thiết kế trải nghiệm, art direction và phát triển website.',
    process:
      'Phân tích tình huống sử dụng → phân luồng nội dung → thiết kế visual → triển khai.',
    result:
      'Một trải nghiệm kết nối hoạt động tìm đồ, trao đổi đồ cũ và tinh thần chia sẻ bền vững.',
    projectUrl: 'https://ulislostandfound.framer.website/',
    year: '2026',
    imageKey: '/projects/ulis-lost-found.png',
  },
  {
    name: 'Orbits DeFi',
    sub: 'Cánh cửa trực quan bước vào tài chính phi tập trung.',
    type: 'FINTECH LANDING PAGE',
    brief:
      'Biến một sản phẩm DeFi phức tạp thành câu chuyện số dễ tiếp cận và có định hướng chuyển đổi.',
    role: 'Thiết kế UI, motion direction và phát triển landing page.',
    process:
      'Xây dựng narrative → dark visual system → motion prototype → responsive implementation.',
    result:
      'Landing page đậm chất công nghệ với hệ màu tối, ánh sáng và nhịp chuyển động tập trung vào chuyển đổi.',
    projectUrl: 'https://orbitsdefi.framer.website/',
    year: '2026',
    imageKey: '/projects/orbits-defi.png',
  },
  {
    name: 'BeeTools',
    sub: 'Kho công cụ AI và tiện ích được tuyển chọn cho công việc hằng ngày.',
    type: 'WEB APPLICATION',
    brief:
      'Thiết kế một thư viện giúp người dùng tìm, lọc và lưu các công cụ số phù hợp với công việc.',
    role: 'Thiết kế sản phẩm và phát triển ứng dụng web.',
    process:
      'Data model → search & category flow → component architecture → deployment.',
    result:
      'Ứng dụng thư viện công cụ với tìm kiếm nhanh, danh mục, yêu thích và giao diện tối nhất quán.',
    projectUrl: 'https://beetls.vercel.app/',
    year: '2026',
    imageKey: '/projects/beetls.png',
  },
  {
    name: 'Temsy',
    sub: 'Biến từng khoảnh khắc thành một con tem kỷ niệm.',
    type: 'DIGITAL COLLECTIBLES',
    brief:
      'Tạo trải nghiệm sưu tầm kỹ thuật số mang cảm giác gần gũi thay vì kỹ thuật và xa cách.',
    role: 'Thiết kế sản phẩm, giao diện và phát triển ứng dụng.',
    process:
      'Concept exploration → collection flow → UI system → responsive development.',
    result:
      'Ứng dụng sưu tầm tem kỹ thuật số với không gian khám phá tối giản và gần gũi.',
    projectUrl: 'https://temsy.vercel.app/',
    year: '2026',
    imageKey: '/projects/temsy.png',
  },
  {
    name: 'Arcade Học Đường',
    sub: 'Biến tiết học thành một sân chơi tương tác kiểu arcade.',
    type: 'EDTECH GAME',
    brief:
      'Tạo công cụ giúp giáo viên biến hoạt động trên lớp thành trò chơi có nhịp độ và phản hồi trực tiếp.',
    role: 'Thiết kế trải nghiệm trò chơi và phát triển ứng dụng web.',
    process:
      'Classroom flow → game mechanics → realtime room states → responsive interface.',
    result:
      'Một lớp học tương tác theo thời gian thực với mã phòng, vòng quay may mắn và ngôn ngữ arcade vui nhộn.',
    projectUrl: 'https://arcadeschool.vercel.app/index.html',
    year: '2026',
    imageKey: '/projects/arcade-school.png',
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
          <div className="hero-art" aria-hidden="true">
            <Image src="/anime-studio.png" alt="" fill priority sizes="100vw" />
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
            <h1 className="hero-title">
              Bạn mang đến một ý tưởng.
              <br />
              Mình xây thế giới để nó <em>sống.</em>
            </h1>
            <p className="hero-copy">
              Đây là câu chuyện về cách tò mò trở thành ý tưởng, ý tưởng thành
              sản phẩm, và sản phẩm trở thành trải nghiệm khiến người ta muốn ở
              lại.
            </p>
            <div className="hero-actions">
              <a href="#about">
                Bắt đầu câu chuyện <ArrowDown />
              </a>
              <span>SCROLL TO BEGIN / 物語</span>
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

        <section className="scene-chapter about-chapter" id="about">
          <div className="chapter-index">
            <b>01</b>
            <span>THE QUESTION / 問い</span>
          </div>
          <div className="signal-card">
            <p className="micro-label">EVERY PROJECT STARTS WITH WHY</p>
            <h2 className="chapter-title">
              Trước khi viết code,
              <br />
              mình tìm điều cần <em>thay đổi.</em>
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
            <span>THE PROCESS / 過程</span>
          </div>
          <div className="experience-heading parallax-slow">
            <p className="micro-label">FROM QUESTION TO WORKING PRODUCT</p>
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
              <span>THE EVIDENCE / 実績</span>
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
                style={{ zIndex: index + 1 }}
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
                  <span
                    className="project-signal"
                    aria-label={`Tín hiệu dự án ${index + 1}`}
                  >
                    SIGNAL_{String(index + 1).padStart(2, '0')} / DATA_STREAM
                  </span>
                  <i className="project-reticle" aria-hidden="true" />
                </div>
                <div className="project-copy">
                  <p className="micro-label">{project.type}</p>
                  <h3>{project.name}</h3>
                  <p className="project-sub">{project.sub}</p>
                  <div className="project-proof">
                    <div>
                      <span>MY ROLE</span>
                      <p>{project.role}</p>
                    </div>
                    <div>
                      <span>DELIVERED</span>
                      <p>{project.result}</p>
                    </div>
                  </div>
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
                      <span>Xem case study</span> <ArrowUpRight />
                    </summary>
                    <div className="case-heading">
                      <span>
                        CASE STUDY / {String(index + 1).padStart(2, '0')}
                      </span>
                      <h4>{project.name}</h4>
                      <p>{project.sub}</p>
                    </div>
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
            <span>THE TOOLKIT / 技術</span>
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
            <div className="capability-proof">
              <div>
                <b>1+ NĂM</b>
                <span>Xây dựng sản phẩm web thực tế · 2025 — nay</span>
              </div>
              <div>
                <b>10</b>
                <span>Sản phẩm đã đưa lên môi trường thật</span>
              </div>
              <div>
                <b>END–TO–END</b>
                <span>Từ bài toán, UI đến triển khai</span>
              </div>
              <div>
                <b>CODE × DESIGN</b>
                <span>Một quy trình, hai góc nhìn</span>
              </div>
            </div>
          </div>
          <div className="skills-marquee" aria-hidden="true">
            <div>
              <span>
                REACT ✦ NEXT.JS ✦ TYPESCRIPT ✦ NODE.JS ✦ SQL ✦ GSAP ✦ THREE.JS ✦
                FIGMA ✦ CLOUDFLARE ✦ VERCEL ✦ ACCESSIBILITY ✦ PRODUCT THINKING ✦
              </span>
              <span>
                REACT ✦ NEXT.JS ✦ TYPESCRIPT ✦ NODE.JS ✦ SQL ✦ GSAP ✦ THREE.JS ✦
                FIGMA ✦ CLOUDFLARE ✦ VERCEL ✦ ACCESSIBILITY ✦ PRODUCT THINKING ✦
              </span>
            </div>
          </div>
          <div className="skills-resume">
            <div className="skills-resume-head">
              <div>
                <span className="status-dot" />
                TECHNICAL PROFILE / 2026
              </div>
              <b>SOFTWARE ENGINEERING · HUCE</b>
            </div>

            <div className="experience-stamp">
              <span>EXPERIENCE</span>
              <strong>1+ năm Frontend & Product Development</strong>
              <p>10 sản phẩm thực tế · Community · EdTech · Web App · Web3</p>
              <i>2025 — PRESENT</i>
            </div>

            <div className="skill-panel language-panel">
              <div className="skill-panel-title">
                <Code2 />
                <span>01 / PROGRAMMING LANGUAGES</span>
              </div>
              <div className="language-list">
                {[
                  ['JavaScript / TypeScript', 'ADVANCED', 5],
                  ['HTML / CSS', 'ADVANCED', 5],
                  ['SQL', 'PROFICIENT', 4],
                  ['Java', 'ACADEMIC', 3],
                  ['C / C++', 'FOUNDATION', 3],
                  ['Python', 'FOUNDATION', 3],
                ].map(([name, level, score]) => (
                  <div className="language-row" key={String(name)}>
                    <strong>{name}</strong>
                    <div
                      className="skill-meter"
                      aria-label={`${name}: ${level}`}
                    >
                      {[1, 2, 3, 4, 5].map((step) => (
                        <i
                          className={step <= Number(score) ? 'is-active' : ''}
                          key={step}
                        />
                      ))}
                    </div>
                    <small>{level}</small>
                  </div>
                ))}
              </div>
            </div>

            <div className="skill-panel stack-panel">
              <div className="skill-panel-title">
                <Server />
                <span>02 / FRAMEWORKS & DATA</span>
              </div>
              <div className="skill-chip-grid">
                <span>React</span>
                <span>Next.js</span>
                <span>Node.js</span>
                <span>REST API</span>
                <span>Drizzle ORM</span>
                <span>SQLite / D1</span>
                <span>GSAP</span>
                <span>Three.js</span>
              </div>
            </div>

            <div className="skill-panel tools-panel">
              <div className="skill-panel-title">
                <Terminal />
                <span>03 / TOOLS I WORK WITH</span>
              </div>
              <div className="tool-cloud">
                <span>Git</span>
                <span>GitHub</span>
                <span>VS Code</span>
                <span>Figma</span>
                <span>Framer</span>
                <span>Postman</span>
                <span>Vercel</span>
                <span>Cloudflare</span>
              </div>
            </div>

            <div className="competency-grid">
              <article>
                <GitBranch />
                <b>ANALYSIS & DESIGN</b>
                <p>Requirements · UML · User flows · System design</p>
                <small>Chuyển bài toán thành đặc tả và kiến trúc rõ ràng</small>
              </article>
              <article>
                <Database />
                <b>IMPLEMENTATION</b>
                <p>OOP · Data structures · REST · Component architecture</p>
                <small>
                  Xây dựng frontend, API và luồng dữ liệu end-to-end
                </small>
              </article>
              <article>
                <ShieldCheck />
                <b>QUALITY & SECURITY</b>
                <p>Testing · Debugging · Validation · Performance</p>
                <small>Kiểm soát lỗi, accessibility và security basics</small>
              </article>
              <article>
                <ArrowUpRight />
                <b>DELIVERY & TEAMWORK</b>
                <p>Git · Agile/Scrum · Documentation · CI/CD concepts</p>
                <small>Làm việc theo vòng đời phát triển phần mềm</small>
              </article>
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

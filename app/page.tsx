import FloatingWorld from '../components/floating-world';
import ScrollStory from '../components/scroll-story';
import { listProjects } from '@/db';
import Image from 'next/image';
import {
  ArrowUpRight,
  ArrowDown,
  Palette,
  PenTool,
  Code2,
  Heart,
  Mail,
} from 'lucide-react';
type PortfolioProject = {
  name: string;
  sub: string;
  type: string;
  cls: string;
  brief: string;
  role: string;
  process: string;
  result: string;
  year: string;
  imageKey: string | null;
};
const sampleProjects: PortfolioProject[] = [
  {
    name: 'Kumo Café',
    sub: 'Một chút Nhật Bản, một chút bình yên.',
    type: 'BRAND IDENTITY',
    cls: 'kumo',
    brief:
      'Xây dựng nhận diện cho một quán cà phê nhỏ lấy cảm hứng từ nhịp sống Nhật Bản.',
    role: 'Thiết kế nhận diện & bao bì',
    process: 'Moodboard → phác thảo → bảng màu → ứng dụng bao bì.',
    result: 'Bộ nhận diện concept gồm logo, menu và bao bì.',
    year: '2026',
    imageKey: null,
  },
  {
    name: 'Yoru — Music App',
    sub: 'Giai điệu dành riêng cho thế giới của bạn.',
    type: 'UI/UX DESIGN',
    cls: 'yoru',
    brief: 'Khám phá cách tìm nhạc phù hợp với tâm trạng người nghe.',
    role: 'Thiết kế trải nghiệm & giao diện',
    process: 'Persona giả định → user flow → wireframe → prototype.',
    result: 'Prototype concept cho hành trình khám phá và lưu nhạc.',
    year: '2026',
    imageKey: null,
  },
  {
    name: 'Những ngày xanh',
    sub: 'Gom những điều nhỏ bé thành câu chuyện.',
    type: 'ILLUSTRATION',
    cls: 'days',
    brief: 'Kể lại cảm giác những ngày hè qua một bộ tranh cá nhân.',
    role: 'Ý tưởng & minh họa',
    process: 'Quan sát đời sống → phác thảo → thử màu → hoàn thiện.',
    result: 'Định hướng mỹ thuật cho bộ postcard cá nhân.',
    year: '2026',
    imageKey: null,
  },
];
export const dynamic = 'force-dynamic';
export default async function Home() {
  let projects = sampleProjects;
  try {
    const saved = await listProjects();
    if (saved.length)
      projects = saved.map((project, index) => ({
        name: project.title,
        sub: project.subtitle,
        type: project.category,
        cls: ['kumo', 'yoru', 'days'][index % 3],
        brief: project.brief,
        role: project.role,
        process: project.process,
        result: project.result,
        year: project.year,
        imageKey: project.imageKey,
      }));
  } catch {
    /* Sample projects keep the local preview useful before migrations. */
  }
  return (
    <ScrollStory>
      <a className="skip" href="#main">
        Đến nội dung chính
      </a>
      <header>
        <a className="brand" href="#home">
          <span>✳</span> sora<b>.</b>
          <small>
            CREATIVE
            <br />
            PORTFOLIO
          </small>
        </a>
        <nav aria-label="Điều hướng chính">
          <a href="#about">Về mình</a>
          <a href="#projects">Dự án</a>
          <a href="#skills">Kỹ năng</a>
        </nav>
        <a className="nav-contact" href="#contact">
          Cùng trò chuyện <ArrowUpRight size={17} />
        </a>
      </header>
      <main id="main">
        <section className="hero wrap" id="home">
          <div>
            <div className="eyebrow">
              ● &nbsp; MỘT TÂM HỒN SÁNG TẠO, NHIỀU ĐIỀU MUỐN KỂ
            </div>
            <p className="greeting">
              こんにちは! Mình là Sora <em>✦</em>
            </p>
            <h1>
              Biến ý tưởng
              <br />
              thành <em>điều kỳ diệu.</em>
            </h1>
            <p className="intro">
              Một designer yêu những câu chuyện, nét vẽ
              <br />
              và những trải nghiệm số có chút khác biệt.
            </p>
            <div className="actions">
              <a className="button" href="#projects">
                Khám phá dự án <ArrowUpRight size={21} />
              </a>
              <a className="text-link" href="#about">
                Làm quen nhé <ArrowDown size={17} />
              </a>
            </div>
            <p className="hero-foot">
              ✧ &nbsp; Thiết kế bằng sự tò mò. Tạo nên bằng trái tim.
            </p>
          </div>
          <div className="hero-art">
            <div className="art-top">
              <span>CHAPTER 01 — MY LITTLE WORLD</span>
              <span>● ● ●</span>
            </div>
            <Image
              src="/anime-studio.png"
              alt="Minh họa anime: designer làm việc trong căn phòng nhìn ra thị trấn biển Nhật Bản"
              width="1536"
              height="1024"
            />
            <div className="art-bottom">
              <span>想像から、はじまる。</span>
              <span>EVERYTHING STARTS WITH A LITTLE DREAM ↗</span>
            </div>
            <span className="sticker">
              Made of
              <br />
              <b>little dreams ✧</b>
            </span>
            <span className="art-spark" aria-hidden="true">
              ✦
            </span>
          </div>
        </section>
        <div className="ribbon" aria-hidden="true">
          <span>DESIGN WITH SOUL</span> ✳ <span>夢を描く</span> ✳{' '}
          <span>A LITTLE PLAYFUL. A LOT OF HEART.</span> ✳{' '}
          <span>STAY CURIOUS</span> ✳
        </div>
        <section className="wrap section" id="about">
          <div className="section-label">
            01 / VỀ MÌNH <span>はじめまして</span>
          </div>
          <div className="about-grid">
            <div>
              <h2>
                Đằng sau những nét vẽ,
                <br />
                là một người <em>hay mơ.</em>
              </h2>
              <p className="handnote">Và luôn tò mò về thế giới! ↗</p>
              <FloatingWorld />
            </div>
            <div>
              <p>
                Mình là Sora — tên mẫu cho người kể câu chuyện này. Mình khám
                phá thiết kế đồ họa, giao diện và minh họa, tìm cảm hứng từ
                anime, những góc phố và các chi tiết đời thường.
              </p>
              <p>
                Mình tin một thiết kế tốt vừa đẹp, vừa giúp mọi thứ dễ hiểu hơn.
                Từ ý tưởng đầu tiên đến chi tiết cuối cùng, mình muốn tạo ra
                những trải nghiệm có cá tính và có ý nghĩa.
              </p>
              <div className="tags">
                <span>☀ Luôn tò mò</span>
                <span>✎ Chú ý chi tiết</span>
                <span>♡ Yêu kể chuyện</span>
              </div>
            </div>
          </div>
        </section>
        <section className="projects wrap section" id="projects">
          <div className="section-label">
            02 / DỰ ÁN TIÊU BIỂU <span>作品集</span>
          </div>
          <div className="section-heading">
            <h2>
              Một vài điều mình <em>đã tạo.</em>
            </h2>
            <p>Những concept mẫu, mang màu sắc riêng.</p>
          </div>
          <div className="project-grid">
            {projects.map((p, i) => (
              <article key={p.name}>
                <div className={'project-cover ' + p.cls}>
                  <span className="project-no">0{i + 1} / CONCEPT</span>
                  {p.imageKey ? (
                    <Image
                      className="uploaded-cover"
                      src={`/api/project-image?key=${encodeURIComponent(p.imageKey)}`}
                      alt={`Ảnh bìa dự án ${p.name}`}
                      fill
                      sizes="(max-width: 650px) 100vw, 33vw"
                      unoptimized
                    />
                  ) : i === 0 ? (
                    <div className="coffee-pack">
                      <span>☁</span>
                      <strong>KUMO</strong>
                      <small>COFFEE & SLOW DAYS</small>
                    </div>
                  ) : i === 1 ? (
                    <div className="music-card">
                      <small>YOUR NIGHT, YOUR SOUND</small>
                      <strong>yoru.</strong>
                      <div className="record">♫</div>
                      <div className="player">
                        ◀ &nbsp; Ⅱ &nbsp; ▶ <span>01:24 ━━━━━</span>
                      </div>
                    </div>
                  ) : (
                    <div className="poster">
                      <small>A COLLECTION OF LITTLE MOMENTS</small>
                      <strong>
                        Những
                        <br />
                        ngày xanh ✳
                      </strong>
                      <p>SUMMER MEMORIES / 青い日々</p>
                    </div>
                  )}
                </div>
                <div className="project-meta">
                  <span>{p.type}</span>
                  <span>{p.year}</span>
                </div>
                <h3>{p.name}</h3>
                <p className="project-sub">{p.sub}</p>
                <details>
                  <summary>
                    Khám phá câu chuyện <ArrowUpRight size={19} />
                  </summary>
                  <div className="case-study">
                    <b>Bối cảnh</b>
                    <p>{p.brief}</p>
                    <b>Vai trò</b>
                    <p>{p.role}</p>
                    <b>Quá trình</b>
                    <p>{p.process}</p>
                    <b>Kết quả concept</b>
                    <p>{p.result}</p>
                  </div>
                </details>
              </article>
            ))}
          </div>
        </section>
        <section className="skills section" id="skills">
          <div className="wrap">
            <div className="section-label">
              03 / KỸ NĂNG & DẤU ẤN <span>できること</span>
            </div>
            <div className="section-heading">
              <h2>
                Trong chiếc túi <em>sáng tạo.</em>
              </h2>
              <span>✧</span>
            </div>
            <div className="skill-grid">
              {[
                {
                  icon: Palette,
                  title: 'Thiết kế đồ họa',
                  text: 'Nhận diện thương hiệu · Bố cục · Màu sắc',
                  tools: 'Illustrator / Photoshop',
                },
                {
                  icon: PenTool,
                  title: 'UI/UX & Minh họa',
                  text: 'Wireframe · Prototype · Kể chuyện bằng hình ảnh',
                  tools: 'Figma / Procreate',
                },
                {
                  icon: Code2,
                  title: 'Biến ý tưởng thành web',
                  text: 'Responsive · Tương tác · Chi tiết giao diện',
                  tools: 'HTML / CSS / JavaScript',
                },
              ].map((s) => (
                <div className="skill" key={s.title}>
                  <s.icon size={28} />
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span>{s.tools}</span>
                </div>
              ))}
            </div>
            <div className="achievement">
              <span>✷</span>
              <div>
                <b>Mỗi bước nhỏ đều đáng được ghi lại.</b>
                <p>
                  Chứng chỉ, giải thưởng và phản hồi thực tế sẽ được cập nhật
                  tại đây.
                </p>
              </div>
              <small>TO BE CONTINUED →</small>
            </div>
          </div>
        </section>
        <section className="contact wrap section" id="contact">
          <div className="section-label">
            04 / KẾT NỐI <span>話しましょう</span>
          </div>
          <span className="contact-spark" aria-hidden="true">
            ✳
          </span>
          <p>Bạn có một ý tưởng thú vị?</p>
          <h2>
            Cùng viết nên
            <br />
            <em>chương tiếp theo.</em> <ArrowUpRight />
          </h2>
          <p>
            Một dự án mới, một lời chào, hay một câu chuyện.
            <br />
            Mình luôn sẵn lòng lắng nghe.
          </p>
          <a className="button" href="mailto:hello@example.com">
            <Mail size={19} /> Gửi lời chào <ArrowUpRight size={20} />
          </a>
          <small className="sample-note">
            Email mẫu: hello@example.com · Thay bằng địa chỉ của bạn trước khi
            chia sẻ.
          </small>
        </section>
      </main>
      <footer className="wrap">
        <a className="brand" href="#home">
          ✳ sora.
        </a>
        <span>© 2026 · Portfolio mẫu, chờ câu chuyện của bạn.</span>
        <span>
          Made with <Heart size={14} /> & a little imagination.
        </span>
        <a href="#home" aria-label="Về đầu trang">
          ↑
        </a>
      </footer>
    </ScrollStory>
  );
}

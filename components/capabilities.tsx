import { LocalText, Tag } from './pozan-system';

const groups = [
  {
    title: 'Design',
    level: 'DESIGN PRACTICE',
    text: 'Các năng lực dùng để định hình sản phẩm và trải nghiệm số.',
    en: 'Skills used to shape products and digital experiences.',
    skills: [
      'Figma', 'Framer', 'UI Design', 'UX Design', 'Design Systems', 'Prototyping',
    ],
  },
  {
    title: 'Visual / Social',
    level: 'VISUAL EXPLORATION',
    text: 'Những hướng thiết kế hình ảnh và truyền thông mình đang phát triển qua dự án và thử nghiệm.',
    en: 'Visual and communication directions I am developing through projects and experiments.',
    skills: [
      'Social Media Design', 'Art Direction', 'Typography', 'Campaign Design', 'Branding', 'Visual Storytelling',
    ],
  },
  {
    title: 'Development',
    level: 'CREATIVE BUILD',
    text: 'Công nghệ mình sử dụng để biến hệ thống thiết kế và tương tác thành trải nghiệm chạy thật.',
    en: 'Technology I use to turn design systems and interaction into working experiences.',
    skills: [
      'React', 'Next.js', 'JavaScript / TypeScript', 'GSAP', 'Three.js', 'Frontend Development', 'Git', 'Vercel', 'Design-to-Code', 'AI-assisted Workflow',
    ],
  },
];

export default function Capabilities() {
  return (
    <section id="skills" className="skills-chapter system-section">
      <div className="section-meta">
        05 / CAPABILITIES <span>THINK / DESIGN / BUILD</span>
      </div>
      <div className="section-heading">
        <h2 className="chapter-title">
          <LocalText
            vi="Năng lực, theo lĩnh vực thực hành."
            en="Skills, by practice area."
          />
        </h2>
        <p>
          <LocalText
            vi="Nhìn nhanh những công cụ và hướng làm việc mình sử dụng để kết nối ý tưởng, hình ảnh và sản phẩm số."
            en="A quick view of the tools and practices I use to connect ideas, visuals and digital products."
          />
        </p>
      </div>
      <div className="skills-resume capability-columns">
        {groups.map((group, index) => (
          <article className="capability-column" key={group.title}>
            <span className="micro-label">0{index + 1} /</span>
            <h3>{group.title}</h3>
            <span className="capability-level">{group.level}</span>
            <p>
              <LocalText vi={group.text} en={group.en} />
            </p>
            <div className="skill-chip-grid">
              {group.skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </div>
          </article>
        ))}
      </div>
      <p className="capability-note">
        <LocalText
          vi="Các nhóm kỹ năng thể hiện phạm vi thực hành hiện tại, không phải tuyên bố về cấp độ chuyên môn."
          en="These skill groups describe my current practice areas, not a claim of professional seniority."
        />
      </p>
    </section>
  );
}

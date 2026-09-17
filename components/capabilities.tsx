import { LocalText, Tag } from './pozan-system';

const groups = [
  {
    title: 'Core',
    level: 'READY TO SHIP',
    text: 'Năng lực mình có thể tự chủ để đưa một giao diện từ ý tưởng đến production.',
    en: 'Skills I can own to take an interface from idea to production.',
    skills: [
      'UI/UX',
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'HTML / CSS',
      'Responsive UI',
      'Git',
    ],
  },
  {
    title: 'Working with',
    level: 'PROJECT EXPERIENCE',
    text: 'Công cụ và phương pháp đã được mình áp dụng trong các dự án thực tế.',
    en: 'Tools and methods I have applied across working projects.',
    skills: [
      'Node.js',
      'REST APIs',
      'SQL',
      'GSAP',
      'Figma',
      'Framer',
      'Design Systems',
      'Vercel',
      'Cloudflare',
    ],
  },
  {
    title: 'Exploring',
    level: 'ACTIVE R&D',
    text: 'Những hướng mình đang thử nghiệm để tạo trải nghiệm web có chiều sâu hơn.',
    en: 'Areas I am actively exploring to create richer web experiences.',
    skills: [
      'Three.js',
      'WebGL',
      'CSS 3D',
      'Generative Visuals',
      'Shader Fundamentals',
      'AI-assisted Creative Workflow',
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
            vi="Năng lực, theo mức độ sẵn sàng."
            en="Skills, by readiness."
          />
        </h2>
        <p>
          <LocalText
            vi="Nhìn nhanh những gì mình có thể tự chủ, đã áp dụng trong dự án và đang tiếp tục đào sâu."
            en="See what I can own, what I have used in projects and what I am actively developing next."
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
          vi="Năng lực được kiểm chứng qua 10 sản phẩm đã ship và quá trình học Công nghệ Phần mềm tại HUCE."
          en="Validated through 10 shipped products and Software Engineering studies at HUCE."
        />
      </p>
    </section>
  );
}

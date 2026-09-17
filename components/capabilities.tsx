import { LocalText, Tag } from './pozan-system';

const groups = [
  {
    title: 'Design',
    text: 'Từ cấu trúc đến bản sắc.',
    en: 'From structure to identity.',
    skills: [
      'UI/UX',
      'Visual Direction',
      'Design Systems',
      'Responsive Design',
      'Interaction Design',
      'Wireframing & Prototyping',
      'Figma',
      'Framer',
    ],
  },
  {
    title: 'Development',
    text: 'Từ giao diện đến sản phẩm.',
    en: 'From interface to product.',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'HTML / CSS',
      'Node.js',
      'REST APIs',
      'SQL',
      'Git',
      'Vercel',
      'Cloudflare',
    ],
  },
  {
    title: 'Creative Technology',
    text: 'Từ chuyển động đến cảm xúc.',
    en: 'From motion to feeling.',
    skills: [
      'GSAP',
      'Three.js',
      'Motion Design',
      'Interactive Web',
      'AI-assisted Creative Workflow',
      'Rapid Prototyping',
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
            vi="Một tư duy. Ba góc nhìn."
            en="One mindset. Three perspectives."
          />
        </h2>
        <p>
          <LocalText
            vi="Thiết kế giúp giải pháp dễ hiểu. Kỹ thuật giúp nó hoạt động. Chuyển động tạo nên cá tính."
            en="Design makes a solution clear. Engineering makes it work. Motion gives it character."
          />
        </p>
      </div>
      <div className="skills-resume capability-columns">
        {groups.map((group, index) => (
          <article className="capability-column" key={group.title}>
            <span className="micro-label">0{index + 1} /</span>
            <h3>{group.title}</h3>
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
          vi="Thực hành qua dự án cá nhân và quá trình học Công nghệ Phần mềm tại HUCE."
          en="Practiced through personal projects and Software Engineering studies at HUCE."
        />
      </p>
    </section>
  );
}

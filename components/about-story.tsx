import Image from 'next/image';

const scenes = [
  {
    tag: '01 / THE PERSON',
    title: 'Mình là Pozan.',
    enTitle: 'I’m Pozan.',
    text: 'Một người thích tìm hiểu cách mọi thứ hoạt động, rồi tự tay xây chúng. Mình theo học Công nghệ Phần mềm tại Trường Đại học Xây dựng Hà Nội — HUCE.',
    en: 'I like understanding how things work, then building them myself. I study Software Engineering at Hanoi University of Civil Engineering — HUCE.',
    mark: 'POZAN',
    note: 'HANOI / VIETNAM',
  },
  {
    tag: '02 / THE FOUNDATION',
    title: 'Tò mò. Học. Làm.',
    enTitle: 'Explore. Learn. Build.',
    text: 'Từ cấu trúc dữ liệu và lập trình hướng đối tượng đến giao diện người dùng, mình học bằng cách đưa kiến thức vào dự án. Mỗi sản phẩm là một cơ hội để hiểu sâu hơn về kỹ thuật và con người.',
    en: 'From data structures and object-oriented programming to user interfaces, I learn by applying ideas to projects. Each product helps me understand both engineering and people a little better.',
    mark: 'HUCE',
    note: 'SOFTWARE ENGINEERING',
  },
  {
    tag: '03 / THE CRAFT',
    title: 'Logic có cá tính.',
    enTitle: 'Logic with personality.',
    text: 'Mình kết hợp code có cấu trúc với thiết kế và chuyển động có chủ đích. Từ nền tảng cộng đồng ULIS đến BeeTools, Temsy và Arcade Học Đường, mình muốn sản phẩm vừa hữu ích vừa có bản sắc.',
    en: 'I combine structured code with thoughtful design and motion. From ULIS community platforms to BeeTools, Temsy, and Classroom Arcade, I want products to be useful and have a personality of their own.',
    mark: 'CREATE',
    note: 'DESIGN × CODE × MOTION',
  },
];

export default function AboutStory() {
  return (
    <section id="about" className="identity-story" aria-label="About Pozan">
      <div className="identity-heading">
        <span>01 / BEHIND THE SCREEN</span>
        <p
          data-localized
          data-vi="Người đứng sau những dòng code."
          data-en="The person behind the code."
        >
          Người đứng sau những dòng code.
        </p>
      </div>
      {scenes.map((scene, index) => (
        <article className="identity-scene" key={scene.tag}>
          <div className="identity-stage">
            <div className="identity-art" aria-hidden="true">
              <Image
                src="/anime-studio.png"
                alt=""
                loading="lazy"
                width="1536"
                height="1024"
              />
              <div className="identity-plane plane-back" />
              <div className="identity-plane plane-front">
                <span>{scene.note}</span>
                <strong>{scene.mark}</strong>
                <span>POZAN / FIELD NOTES — 0{index + 1}</span>
              </div>
              <span className="identity-number">0{index + 1}</span>
            </div>
            <div className="identity-copy">
              <span className="identity-tag">{scene.tag}</span>
              <h2 data-localized data-vi={scene.title} data-en={scene.enTitle}>
                {scene.title}
              </h2>
              <p data-localized data-vi={scene.text} data-en={scene.en}>
                {scene.text}
              </p>
              {index === 2 && (
                <a href="#projects">
                  <span
                    data-localized
                    data-vi="Khám phá những gì mình đã xây"
                    data-en="Explore what I’ve built"
                  >
                    Khám phá những gì mình đã xây
                  </span>{' '}
                  ↗
                </a>
              )}
              <div className="identity-track" aria-hidden="true">
                <i />
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

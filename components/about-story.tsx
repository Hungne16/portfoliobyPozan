import Image from 'next/image';

const scenes = [
  {
    tag: '01 / ABOUT POZAN',
    title: 'Mình là Pozan.',
    enTitle: 'I’m Pozan.',
    text: 'Mình học Công nghệ Phần mềm tại HUCE và tập trung vào giao điểm giữa thiết kế, công nghệ và trải nghiệm số. Mình thích bắt đầu từ một vấn đề, tìm cách trực quan hóa nó, rồi biến giải pháp đó thành một sản phẩm chạy thật.',
    en: 'I study Software Engineering at HUCE, exploring the intersection of design, technology and digital experiences. I like starting with a problem, making it tangible, then turning the solution into a working product.',
    mark: 'POZAN',
    note: 'HANOI / VIETNAM',
  },
];

const signals = [
  {
    label: 'EDUCATION',
    vi: 'CNPM · HUCE',
    en: 'SOFTWARE ENGINEERING · HUCE',
  },
  {
    label: 'PRACTICE',
    vi: 'UI/UX → FRONTEND',
    en: 'UI/UX → FRONTEND',
  },
  {
    label: 'METHOD',
    vi: 'BRIEF → BUILD → SHIP',
    en: 'BRIEF → BUILD → SHIP',
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
          <div className="identity-stage identity-stage--about">
            <div className="identity-art identity-art--anime" aria-hidden="true">
              <Image
                className="identity-anime-image"
                src="/media/pozan-about-anime.png"
                alt=""
                loading="lazy"
                width="1536"
                height="1024"
                sizes="(max-width: 900px) 100vw, 52vw"
              />
              <div className="identity-frame-index">
                <span>FIELD RECORD / 01</span>
                <span>HANOI / VIETNAM</span>
              </div>
              <div className="identity-plane plane-front">
                <span>{scene.note} / 2026</span>
                <strong>{scene.mark}</strong>
                <span>DESIGN → BUILD → SHIP / 0{index + 1}</span>
              </div>
            </div>
            <div className="identity-copy">
              <span className="identity-tag">{scene.tag}</span>
              <h2 data-localized data-vi={scene.title} data-en={scene.enTitle}>
                {scene.title}
              </h2>
              <p data-localized data-vi={scene.text} data-en={scene.en}>
                {scene.text}
              </p>
              <div className="identity-evidence">
                {signals.map((signal) => (
                  <div key={signal.label}>
                    <span>{signal.label}</span>
                    <strong
                      data-localized
                      data-vi={signal.vi}
                      data-en={signal.en}
                    >
                      {signal.vi}
                    </strong>
                  </div>
                ))}
              </div>
              {index === 0 && (
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
              <div className="identity-disciplines">
                DESIGN / CODE / MOTION / SYSTEMS / EXPERIMENT
              </div>
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

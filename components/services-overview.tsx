import { LocalText, Tag } from './pozan-system';

const services = [
  {
    code: '01',
    titleVi: 'Landing page & campaign website',
    titleEn: 'Landing pages & campaign websites',
    descriptionVi:
      'Biến thông điệp thương hiệu thành một hành trình rõ ràng, có điểm nhấn thị giác và CTA dễ hành động.',
    descriptionEn:
      'Turn a brand message into a clear journey with strong visual moments and actionable calls to action.',
    fitVi: 'Phù hợp với ra mắt sản phẩm, chiến dịch, sự kiện và portfolio.',
    fitEn: 'Ideal for product launches, campaigns, events and portfolios.',
    deliverables: ['UI/UX', 'RESPONSIVE BUILD', 'DEPLOYMENT'],
  },
  {
    code: '02',
    titleVi: 'Product website & UI/UX',
    titleEn: 'Product websites & UI/UX',
    descriptionVi:
      'Làm rõ bài toán, tổ chức user flow và xây dựng giao diện có hệ thống để sản phẩm dễ hiểu, dễ dùng và dễ mở rộng.',
    descriptionEn:
      'Clarify the problem, structure user flows and build a systematic interface that is understandable, usable and extensible.',
    fitVi: 'Phù hợp với web app, nền tảng cộng đồng và sản phẩm sinh viên.',
    fitEn: 'Ideal for web apps, community platforms and student products.',
    deliverables: ['USER FLOWS', 'DESIGN SYSTEM', 'FRONTEND'],
  },
  {
    code: '03',
    titleVi: 'Creative frontend & motion',
    titleEn: 'Creative frontend & motion',
    descriptionVi:
      'Tạo chuyển động, scroll storytelling và tương tác có chủ đích để website truyền tải cá tính mà vẫn giữ trải nghiệm sử dụng rõ ràng.',
    descriptionEn:
      'Create purposeful motion, scroll storytelling and interaction so a website feels distinctive while remaining clear to use.',
    fitVi: 'Phù hợp với thương hiệu cần trải nghiệm số khác biệt và đáng nhớ.',
    fitEn:
      'Ideal for brands that need a distinctive, memorable digital experience.',
    deliverables: ['GSAP MOTION', 'INTERACTION', 'PERFORMANCE'],
  },
];

export default function ServicesOverview() {
  return (
    <section className="client-offer" aria-labelledby="client-offer-title">
      <div className="client-offer-heading">
        <p className="micro-label">WHAT I CAN HELP WITH / 03 WAYS</p>
        <h2 id="client-offer-title">
          <LocalText
            vi="Bạn mang mục tiêu. Mình biến nó thành trải nghiệm chạy thật."
            en="You bring the goal. I turn it into a working experience."
          />
        </h2>
        <p>
          <LocalText
            vi="Một đầu mối từ định hướng giao diện, thiết kế, phát triển frontend đến triển khai."
            en="One point of ownership from interface direction and design through frontend development and deployment."
          />
        </p>
      </div>

      <div className="client-offer-grid">
        {services.map((service) => (
          <article className="client-offer-card" key={service.code}>
            <span className="client-offer-index">{service.code} /</span>
            <h3>
              <LocalText vi={service.titleVi} en={service.titleEn} />
            </h3>
            <p>
              <LocalText
                vi={service.descriptionVi}
                en={service.descriptionEn}
              />
            </p>
            <small>
              <LocalText vi={service.fitVi} en={service.fitEn} />
            </small>
            <div className="client-offer-tags">
              {service.deliverables.map((deliverable) => (
                <Tag key={deliverable}>{deliverable}</Tag>
              ))}
            </div>
          </article>
        ))}
      </div>

      <a className="system-link client-offer-cta" href="#contact">
        <LocalText vi="Trao đổi yêu cầu của bạn" en="Discuss your brief" /> ↗
      </a>
    </section>
  );
}

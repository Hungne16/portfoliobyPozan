'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LocalText, Tag } from './pozan-system';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const services = [
  {
    code: '01',
    titleVi: 'Landing page & campaign website',
    titleEn: 'Landing pages & campaign websites',
    descriptionVi:
      'Biến thông điệp thương hiệu thành một hành trình rõ ràng, có điểm nhấn thị giác và CTA dễ hành động.',
    descriptionEn:
      'Turn a brand message into a clear journey with strong visual moments and actionable calls to action.',
    outcomeVi: 'Một điểm đến số khiến thông điệp dễ nhớ và dễ hành động.',
    outcomeEn: 'A digital destination that makes the message memorable and actionable.',
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
    outcomeVi: 'Một hệ thống giúp người dùng đi đúng hướng ngay từ lần chạm đầu.',
    outcomeEn: 'A system that guides users in the right direction from the first interaction.',
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
    outcomeVi: 'Một trải nghiệm có nhịp điệu, không chỉ là một trang web đẹp.',
    outcomeEn: 'An experience with rhythm, not just a beautiful web page.',
    fitVi: 'Phù hợp với thương hiệu cần trải nghiệm số khác biệt và đáng nhớ.',
    fitEn:
      'Ideal for brands that need a distinctive, memorable digital experience.',
    deliverables: ['GSAP MOTION', 'INTERACTION', 'PERFORMANCE'],
  },
];

export default function ServicesOverview() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;

      const host = root.current;
      const query = gsap.utils.selector(host);
      const cards = gsap.utils.toArray<HTMLElement>(
        '.client-offer-card',
        host,
      );
      const media = gsap.matchMedia();

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const heading = gsap.from(
          query('.client-offer-status, .client-offer-heading'),
          {
            autoAlpha: 0,
            duration: 0.72,
            ease: 'power3.out',
            stagger: 0.08,
            y: 30,
            scrollTrigger: {
              start: 'top 82%',
              trigger: host,
            },
          },
        );
        const cardTriggers = ScrollTrigger.batch(cards, {
          batchMax: 3,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { autoAlpha: 0, rotateX: -7, y: 54 },
              {
                autoAlpha: 1,
                duration: 0.82,
                ease: 'power3.out',
                rotateX: 0,
                stagger: 0.11,
                transformOrigin: '50% 100%',
                y: 0,
              },
            ),
          once: true,
          start: 'top 84%',
        });
        const runway = gsap.from(query('.client-offer-runway'), {
          autoAlpha: 0,
          duration: 0.62,
          ease: 'power3.out',
          scrollTrigger: {
            start: 'top 88%',
            trigger: host,
          },
          y: 18,
        });

        return () => {
          heading.kill();
          runway.kill();
          cardTriggers.forEach((trigger) => trigger.kill());
        };
      });

      media.add(
        '(pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          const cleanups: Array<() => void> = [];

          cards.forEach((card) => {
            const lens = card.querySelector<HTMLElement>(
              '.client-offer-card-orbit',
            );
            if (!lens) return;

            const moveX = gsap.quickTo(lens, 'x', {
              duration: 0.48,
              ease: 'power3.out',
            });
            const moveY = gsap.quickTo(lens, 'y', {
              duration: 0.48,
              ease: 'power3.out',
            });
            const moveRotation = gsap.quickTo(lens, 'rotation', {
              duration: 0.68,
              ease: 'power3.out',
            });
            const move = (event: PointerEvent) => {
              const bounds = card.getBoundingClientRect();
              const x = (event.clientX - bounds.left) / bounds.width - 0.5;
              const y = (event.clientY - bounds.top) / bounds.height - 0.5;
              moveX(x * 22);
              moveY(y * 18);
              moveRotation(x * 12);
            };
            const leave = () => {
              moveX(0);
              moveY(0);
              moveRotation(0);
            };

            card.addEventListener('pointermove', move, { passive: true });
            card.addEventListener('pointerleave', leave);
            cleanups.push(() => {
              card.removeEventListener('pointermove', move);
              card.removeEventListener('pointerleave', leave);
            });
          });

          return () => cleanups.forEach((cleanup) => cleanup());
        },
      );

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section
      className="client-offer"
      ref={root}
      aria-labelledby="client-offer-title"
    >
      <div className="client-offer-status" aria-hidden="true">
        <span>CLIENT SYSTEM / 03 MODES</span>
        <span>BRIEF → SYSTEM → LIVE</span>
      </div>
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
          <article
            className={`client-offer-card client-offer-card-${service.code}`}
            key={service.code}
          >
            <div className="client-offer-card-orbit" aria-hidden="true">
              <span />
              <span />
              <i />
            </div>
            <span className="client-offer-index">{service.code} /</span>
            <p className="client-offer-signal" aria-hidden="true">
              SIGNAL / READY
            </p>
            <h3>
              <LocalText vi={service.titleVi} en={service.titleEn} />
            </h3>
            <p className="client-offer-description">
              <LocalText
                vi={service.descriptionVi}
                en={service.descriptionEn}
              />
            </p>
            <div className="client-offer-outcome">
              <span>OUTCOME /</span>
              <strong>
                <LocalText vi={service.outcomeVi} en={service.outcomeEn} />
              </strong>
            </div>
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

      <div className="client-offer-runway" aria-hidden="true">
        <span>BRIEF</span>
        <i />
        <span>SYSTEM</span>
        <i />
        <span>LIVE</span>
      </div>
      <a className="system-link client-offer-cta" href="#contact">
        <LocalText vi="Trao đổi yêu cầu của bạn" en="Discuss your brief" /> ↗
      </a>
    </section>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LocalText } from './pozan-system';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type CRTType = 'identity' | 'timeline' | 'skills' | 'education' | 'system';

export const profileArchiveData = {
  identity: {
    fullName: 'VŨ MẠNH HÙNG',
    birthDate: '03 / 01 / 2004',
    location: 'HANOI, VIETNAM',
    roles: [
      'CREATIVE DEVELOPER',
      'UI/UX DESIGNER',
      'SOFTWARE ENGINEERING STUDENT',
    ],
    avatar: null as string | null,
    avatarReplacementPath: '/images/profile/avatar.webp',
  },
  timeline: [
    {
      years: '2022 — 2023',
      phase: 'FOUNDATION',
      copy: {
        vi: 'Nền tảng lập trình, khám phá UI và web cơ bản.',
        en: 'Programming foundations, UI exploration and basic web development.',
      },
    },
    {
      years: '2023 — 2025',
      phase: 'DESIGN × DEVELOPMENT',
      copy: {
        vi: 'UI/UX, Figma, frontend và các sản phẩm dành cho sinh viên.',
        en: 'UI/UX, Figma, frontend and student-focused digital products.',
      },
    },
    {
      years: '2025 — 2026',
      phase: 'CREATIVE DEVELOPMENT',
      copy: {
        vi: 'Website tương tác, Framer, React, motion và sản phẩm thật.',
        en: 'Interactive websites, Framer, React, motion and shipped products.',
      },
    },
    {
      years: '2026 — NOW',
      phase: 'BUILDING & EXPLORING',
      copy: {
        vi: 'Product design, creative technology và interactive web.',
        en: 'Product design, creative technology and interactive web.',
      },
    },
  ],
  skills: [
    {
      group: 'CORE',
      items: ['FIGMA', 'FRAMER', 'UI/UX', 'RESPONSIVE UI'],
    },
    {
      group: 'DEVELOPMENT',
      items: ['REACT', 'NEXT.JS', 'JAVASCRIPT', 'TYPESCRIPT'],
    },
    {
      group: 'WORKFLOW',
      items: ['GIT', 'VERCEL', 'DESIGN SYSTEMS', 'PROTOTYPING'],
    },
  ],
  skillSignals: [
    'HTML / CSS',
    'WEB DESIGN',
    'INTERACTION DESIGN',
    'MOTION DESIGN',
    'FRONTEND DEVELOPMENT',
  ],
  education: {
    university: 'HANOI UNIVERSITY OF CIVIL ENGINEERING',
    shortName: 'HUCE',
    program: 'Software Engineering · Engineering Program',
    period: '2022 — PRESENT',
    status: 'FINAL-YEAR STUDENT',
    focus: [
      'SOFTWARE ENGINEERING',
      'FRONTEND DEVELOPMENT',
      'HUMAN-COMPUTER INTERACTION',
      'UI/UX DESIGN',
      'WEB ENGINEERING',
      'SOFTWARE ARCHITECTURE',
    ],
  },
  designSystem: {
    name: 'POZAN DESIGN SYSTEM',
    status: 'SYSTEM STATUS // ACTIVE',
    modules: [
      'FOUNDATIONS',
      'COMPONENTS',
      'TOKENS',
      'TYPOGRAPHY',
      'COLORS',
      'MOTION',
    ],
    url: '/design-system',
  },
} as const;

function CRTMonitor({
  type,
  label,
  children,
}: {
  type: CRTType;
  label: string;
  children: ReactNode;
}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <article
      className={`profile-crt-monitor profile-crt-${type}${isActive ? ' is-active' : ''}`}
      aria-label={label}
    >
      <div className="profile-crt-shell">
        <div className="profile-crt-screen">
          <div className="profile-crt-screen-content">{children}</div>
          <span className="profile-crt-scanlines" aria-hidden="true" />
          <span className="profile-crt-reflection" aria-hidden="true" />
          <span className="profile-crt-static-flash" aria-hidden="true" />
          <span className="profile-crt-boot-mask" aria-hidden="true" />
        </div>
        <div className="profile-crt-controls">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <i aria-hidden="true" />
          <b>POZAN_SIGNAL</b>
          <button
            type="button"
            aria-expanded={isActive}
            onClick={() => setIsActive((current) => !current)}
          >
            {isActive ? 'CLOSE' : 'FOCUS'}
          </button>
        </div>
      </div>
      <div className="profile-crt-foot" aria-hidden="true" />
    </article>
  );
}

function IdentityScreen() {
  const identity = profileArchiveData.identity;
  return (
    <div className="crt-identity-screen">
      <header className="crt-screen-header">
        <span>PERSONAL_IDENTITY</span>
        <b>PROFILE_ID // POZAN</b>
      </header>
      <div className="crt-identity-layout">
        <div
          className="crt-avatar"
          data-replacement-path={identity.avatarReplacementPath}
        >
          {identity.avatar ? (
            <Image
              src={identity.avatar}
              alt="Vũ Mạnh Hùng"
              fill
              sizes="240px"
            />
          ) : (
            <div className="crt-avatar-placeholder" aria-label="Avatar slot">
              <span>VH</span>
              <small>AVATAR_SLOT</small>
            </div>
          )}
          <i aria-hidden="true" />
        </div>
        <dl className="crt-identity-data">
          <div>
            <dt>FULL NAME</dt>
            <dd>{identity.fullName}</dd>
          </div>
          <div>
            <dt>DATE OF BIRTH</dt>
            <dd>{identity.birthDate}</dd>
          </div>
          <div>
            <dt>LOCATION</dt>
            <dd>{identity.location}</dd>
          </div>
          <div>
            <dt>ROLE</dt>
            <dd>
              {identity.roles.map((role) => (
                <span key={role}>{role}</span>
              ))}
            </dd>
          </div>
        </dl>
      </div>
      <footer className="crt-screen-status">
        <span>STATUS // ONLINE</span>
        <i aria-hidden="true" />
      </footer>
    </div>
  );
}

function TimelineScreen() {
  return (
    <div className="crt-timeline-screen">
      <header className="crt-screen-header">
        <span>ACTIVITY_LOG</span>
        <b>2022 → NOW</b>
      </header>
      <ol className="crt-timeline-list">
        {profileArchiveData.timeline.map((entry) => (
          <li key={entry.years}>
            <i aria-hidden="true" />
            <time>{entry.years}</time>
            <b>{entry.phase}</b>
            <p>
              <LocalText vi={entry.copy.vi} en={entry.copy.en} />
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function SkillsScreen() {
  return (
    <div className="crt-skills-screen">
      <header className="crt-screen-header">
        <span>CAPABILITY_DIAGNOSTIC</span>
        <b>NO FAKE METRICS</b>
      </header>
      <div className="crt-skill-groups">
        {profileArchiveData.skills.map((group, groupIndex) => (
          <section
            key={group.group}
            style={{ '--skill-order': groupIndex } as React.CSSProperties}
          >
            <h3>{group.group}</h3>
            <div>
              {group.items.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="crt-skill-signals">
        {profileArchiveData.skillSignals.join(' · ')}
      </p>
    </div>
  );
}

function EducationScreen() {
  const education = profileArchiveData.education;
  return (
    <div className="crt-education-screen">
      <header className="crt-screen-header">
        <span>STUDENT_RECORD</span>
        <b>ACADEMIC_DATA</b>
      </header>
      <div className="crt-education-mark">{education.shortName}</div>
      <p className="crt-education-university">{education.university}</p>
      <p className="crt-education-program">{education.program}</p>
      <div className="crt-education-meta">
        <span>{education.period}</span>
        <b>{education.status}</b>
      </div>
      <ul>
        {education.focus.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <small>HUCE // HANOI</small>
    </div>
  );
}

function DesignSystemScreen() {
  const designSystem = profileArchiveData.designSystem;
  return (
    <div className="crt-system-screen">
      <header className="crt-screen-header">
        <span>{designSystem.status}</span>
        <b>DS_01</b>
      </header>
      <div className="crt-system-layout">
        <div>
          <span>POZAN</span>
          <h3>DESIGN SYSTEM</h3>
          <Link href={designSystem.url} className="crt-system-link">
            <LocalText vi="MỞ DESIGN SYSTEM" en="OPEN DESIGN SYSTEM" /> ↗
          </Link>
        </div>
        <ul>
          {designSystem.modules.map((module) => (
            <li key={module}>{module}</li>
          ))}
        </ul>
        <div className="crt-system-preview" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <span />
        </div>
      </div>
    </div>
  );
}

const monitorLabels: Record<CRTType, string> = {
  identity: 'Personal identity monitor',
  timeline: 'Development timeline monitor',
  skills: 'Skills monitor',
  education: 'Education monitor',
  system: 'Pozan Design System monitor',
};

export default function ProfileCRTWall() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;
      const media = gsap.matchMedia();

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const monitors = gsap.utils.toArray<HTMLElement>(
          '.profile-crt-monitor',
          root.current,
        );
        const flashes = gsap.utils.toArray<HTMLElement>(
          '.profile-crt-static-flash',
          root.current,
        );
        const masks = gsap.utils.toArray<HTMLElement>(
          '.profile-crt-boot-mask',
          root.current,
        );
        const contents = gsap.utils.toArray<HTMLElement>(
          '.profile-crt-screen-content',
          root.current,
        );

        gsap.set(monitors, { autoAlpha: 0, y: 20, scale: 0.96 });
        gsap.set(masks, { autoAlpha: 1 });
        gsap.set(flashes, { autoAlpha: 0 });
        gsap.set(contents, { autoAlpha: 0, y: 8 });

        const powerOn = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top 76%',
            once: true,
          },
          onComplete: () => {
            gsap.set(monitors, { clearProps: 'transform,opacity,visibility' });
            gsap.set(contents, { clearProps: 'transform,opacity,visibility' });
          },
        });

        powerOn
          .to(monitors, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.42,
            stagger: 0.14,
            ease: 'power3.out',
          })
          .to(
            flashes,
            {
              autoAlpha: 0.82,
              duration: 0.07,
              stagger: 0.14,
              ease: 'none',
            },
            0.08,
          )
          .to(
            flashes,
            {
              autoAlpha: 0,
              duration: 0.18,
              stagger: 0.14,
              ease: 'power1.out',
            },
            0.16,
          )
          .to(
            masks,
            {
              autoAlpha: 0,
              duration: 0.3,
              stagger: 0.14,
              ease: 'power2.out',
            },
            0.12,
          )
          .to(
            contents,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.38,
              stagger: 0.14,
              ease: 'power2.out',
            },
            0.22,
          );
      });

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section
      className="profile-archive system-section"
      id="profile-archive"
      ref={root}
      aria-labelledby="profile-archive-title"
    >
      <div className="section-meta">
        01B / PROFILE ARCHIVE <span>FIVE SIGNALS / ONE IDENTITY</span>
      </div>
      <div className="profile-archive-heading">
        <p className="micro-label">IDENTITY_SIGNAL // DECODED</p>
        <h2 className="chapter-title" id="profile-archive-title">
          <LocalText
            vi="Năm tín hiệu. Một bản sắc."
            en="Five signals. One identity."
          />
        </h2>
        <p>
          <LocalText
            vi="Một kho lưu trữ tương tác về con người, hành trình học tập và hệ thống mình đang xây dựng."
            en="An interactive archive of the person, learning journey and systems I am building."
          />
        </p>
      </div>

      <div className="profile-crt-stage">
        <div className="profile-crt-ambient" aria-hidden="true">
          <span className="crt-ambient-terminal">DESIGN / CODE / BUILD_</span>
          <span className="crt-ambient-rec">● REC</span>
          <span className="crt-ambient-signal">SIGNAL // 03.01.04</span>
          <i className="crt-ambient-wave" />
          <i className="crt-ambient-orbit" />
        </div>

        <div className="profile-crt-wall">
          <CRTMonitor type="identity" label={monitorLabels.identity}>
            <IdentityScreen />
          </CRTMonitor>
          <CRTMonitor type="timeline" label={monitorLabels.timeline}>
            <TimelineScreen />
          </CRTMonitor>
          <CRTMonitor type="skills" label={monitorLabels.skills}>
            <SkillsScreen />
          </CRTMonitor>
          <CRTMonitor type="education" label={monitorLabels.education}>
            <EducationScreen />
          </CRTMonitor>
          <CRTMonitor type="system" label={monitorLabels.system}>
            <DesignSystemScreen />
          </CRTMonitor>
        </div>
      </div>
    </section>
  );
}

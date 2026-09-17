'use client';

import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { visualLab, type VisualExperiment } from '@/data/visual-lab';
import { LocalText } from './pozan-system';

const fieldPoints = [
  [11, 18, 5],
  [27, 12, 3],
  [45, 24, 4],
  [68, 14, 6],
  [86, 28, 3],
  [18, 48, 4],
  [37, 59, 7],
  [58, 44, 3],
  [79, 57, 5],
  [92, 68, 3],
  [9, 81, 3],
  [28, 88, 5],
  [51, 78, 4],
  [69, 87, 3],
  [84, 83, 6],
] as const;

function SignalField() {
  const [seed, setSeed] = useState(0);
  const points = useMemo(
    () =>
      fieldPoints.map(([x, y, size], index) => ({
        x: (x + seed * (index % 3 === 0 ? 7 : 3)) % 94,
        y: (y + seed * (index % 2 === 0 ? 5 : -4) + 94) % 94,
        size,
      })),
    [seed],
  );

  return (
    <div className="lab-specimen signal-field">
      <div className="signal-grid" aria-hidden="true" />
      <div className="signal-orbit" aria-hidden="true" />
      {points.map((point, index) => (
        <i
          key={index}
          style={
            {
              '--point-x': `${point.x}%`,
              '--point-y': `${point.y}%`,
              '--point-size': `${point.size}px`,
              '--point-delay': `${index * -0.18}s`,
            } as CSSProperties
          }
        />
      ))}
      <div className="signal-readout" aria-hidden="true">
        <span>FIELD_{String(seed + 1).padStart(2, '0')}</span>
        <span>15 ACTIVE NODES</span>
      </div>
      <button type="button" onClick={() => setSeed((value) => (value + 1) % 9)}>
        REGENERATE FIELD <span aria-hidden="true">↻</span>
      </button>
    </div>
  );
}

const reactorWords = ['MAKE', 'MOVE', 'MEAN'];

function TypeReactor() {
  const [phase, setPhase] = useState(0);
  const word = reactorWords[phase];
  return (
    <div className={`lab-specimen type-reactor phase-${phase}`}>
      <span className="reactor-index">0{phase + 1} / 03</span>
      <button
        type="button"
        className="reactor-word"
        onClick={() => setPhase((value) => (value + 1) % reactorWords.length)}
        aria-label={`Change kinetic type phase. Current word: ${word}`}
      >
        <span aria-hidden="true">{word}</span>
        <span aria-hidden="true">{word}</span>
        <b>{word}</b>
      </button>
      <p>CLICK TYPE TO SHIFT PHASE</p>
    </div>
  );
}

function OrbitalForm() {
  const stage = useRef<HTMLDivElement>(null);
  const move = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    stage.current?.style.setProperty('--orbit-x', `${y * -24}deg`);
    stage.current?.style.setProperty('--orbit-y', `${x * 30}deg`);
  };
  const reset = () => {
    stage.current?.style.setProperty('--orbit-x', '-8deg');
    stage.current?.style.setProperty('--orbit-y', '12deg');
  };

  return (
    <div
      className="lab-specimen orbital-form"
      onPointerMove={move}
      onPointerLeave={reset}
    >
      <div className="orbital-stage" ref={stage} aria-hidden="true">
        <div className="orbital-core">
          <span />
          <span />
          <span />
          <i />
        </div>
      </div>
      <div className="orbital-axis" aria-hidden="true">
        <span>X / 180</span>
        <span>Y / 240</span>
      </div>
      <p>MOVE POINTER / BEND SPACE</p>
    </div>
  );
}

function InterfacePulse() {
  const [mode, setMode] = useState<'focus' | 'explore'>('focus');
  return (
    <div className={`lab-specimen interface-pulse is-${mode}`}>
      <div className="pulse-toolbar">
        <span>POZAN / SIGNAL DESK</span>
        <div>
          <button
            type="button"
            className={mode === 'focus' ? 'is-active' : ''}
            onClick={() => setMode('focus')}
          >
            FOCUS
          </button>
          <button
            type="button"
            className={mode === 'explore' ? 'is-active' : ''}
            onClick={() => setMode('explore')}
          >
            EXPLORE
          </button>
        </div>
      </div>
      <div className="pulse-layout" aria-live="polite">
        <div className="pulse-primary">
          <span>{mode === 'focus' ? '01 / PRIORITY' : '01 / DISCOVERY'}</span>
          <strong>
            {mode === 'focus' ? 'BUILD THE SIGNAL.' : 'FOLLOW THE NOISE.'}
          </strong>
          <i />
        </div>
        <div className="pulse-data">
          <span>CLARITY</span>
          <b>{mode === 'focus' ? '94' : '72'}%</b>
        </div>
        <div className="pulse-data">
          <span>ENERGY</span>
          <b>{mode === 'focus' ? '76' : '98'}%</b>
        </div>
      </div>
    </div>
  );
}

function Specimen({ type }: { type: VisualExperiment['specimen'] }) {
  if (type === 'field') return <SignalField />;
  if (type === 'type') return <TypeReactor />;
  if (type === 'orbit') return <OrbitalForm />;
  return <InterfacePulse />;
}

export default function VisualLab() {
  return (
    <section id="visual-lab" className="system-section visual-lab">
      <div className="section-meta">
        04 / VISUAL LAB <span>SELF-INITIATED / LIVE EXPERIMENTS</span>
      </div>
      <div className="section-heading visual-lab-heading">
        <h2 className="chapter-title">
          <LocalText vi="Ý tưởng đang chuyển động." en="Ideas in motion." />
        </h2>
        <div>
          <p>
            <LocalText
              vi="Không phải dự án khách hàng. Đây là nơi mình thử nghiệm hình ảnh, chuyển động và tương tác trước khi chúng trở thành sản phẩm thật."
              en="These are not client projects. This is where I test image, motion and interaction before they become real products."
            />
          </p>
          <span className="lab-heading-note">04 STUDIES / BUILT IN CODE</span>
        </div>
      </div>

      <div className="lab-grid">
        {visualLab.map((item) => (
          <article
            key={item.id}
            className={`lab-item lab-${item.size}`}
            id={item.id}
          >
            <div className="lab-frame">
              <div className="lab-frame-bar">
                <span>{item.index}</span>
                <span>{item.status}</span>
              </div>
              <Specimen type={item.specimen} />
            </div>
            <div className="lab-caption">
              <div>
                <span>
                  {item.discipline} / {item.year}
                </span>
                <h3>{item.title}</h3>
              </div>
              <p>
                <LocalText vi={item.description.vi} en={item.description.en} />
              </p>
              <ul aria-label={`${item.title} technology`}>
                {item.stack.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

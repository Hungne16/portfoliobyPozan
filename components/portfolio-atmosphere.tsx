'use client';

import { useCallback, useState } from 'react';
import CinematicEffects from './cinematic-effects';
import IntroCurtain from './intro-curtain';
import SignalCursor from './signal-cursor';

/**
 * A deliberately small client island for the portfolio's ambient interactions.
 * It keeps the actual page server-rendered while the cinematic layer remains
 * independently mounted and cleaned up on navigation.
 */
export default function PortfolioAtmosphere() {
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);

  return (
    <div
      className="portfolio-atmosphere"
      data-portfolio-ready={ready ? 'true' : 'false'}
    >
      <SignalCursor />
      <CinematicEffects />
      <IntroCurtain onReady={markReady} />
    </div>
  );
}

'use client';

import { Fragment, useEffect, useRef } from 'react';
import { clamp01, onFrame, onMeasure, pageRect, setStyle } from '@/lib/motion';
import { MANIFESTO_WORDS } from '@/lib/data/landing';
import { Eyebrow } from '../ui';
import s from './Manifesto.module.css';

/** The statement lights up word by word as it scrolls through the viewport. */
export function Manifesto() {
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const p = pRef.current!;
    const words = [...p.querySelectorAll<HTMLElement>('[data-w]')];
    const N = words.length;
    let m = { top: 0, h: 0 };
    const offMeasure = onMeasure(() => { m = pageRect(p); });
    const offFrame = onFrame(({ sy, vh }) => {
      const q = clamp01((sy + vh * 0.82 - m.top) / (vh * 0.45 + m.h * 0.7));
      const reach = q * (N + 6);
      words.forEach((w, i) => setStyle(w, 'opacity', (0.14 + 0.86 * clamp01((reach - i) / 6)).toFixed(2)));
    });
    return () => { offMeasure(); offFrame(); };
  }, []);

  return (
    <section id="p5-man" className={s.man} aria-label="Why this page exists">
      <div className={s.inner}>
        <Eyebrow color="rgba(243,238,230,.72)">Why this page exists</Eyebrow>
        <p ref={pRef} className={s.text}>
          {MANIFESTO_WORDS.map(({ w, accent }, i) => (
            <Fragment key={i}>
              {accent ? <em data-w="" className={s.accent}>{w}</em> : <span data-w="">{w}</span>}{' '}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}

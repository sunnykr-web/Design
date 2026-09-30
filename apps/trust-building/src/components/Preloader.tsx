'use client';

import { useEffect, useRef, useState } from 'react';
import { clamp01, isIntroDone, prefersReducedMotion, startIntro } from '@/lib/motion';
import { POST_COUNT_LABEL } from '@/lib/data/landing';
import s from './Preloader.module.css';

const DURATION = 1400;

/** Counts 000 → 100, then wipes up and starts the hero intro. Click to skip. Shown once per visit. */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  // Returning to the page via client navigation skips the preloader.
  const [gone, setGone] = useState(() => typeof window !== 'undefined' && isIntroDone());

  useEffect(() => {
    const pl = ref.current;
    if (!pl) return;
    if (prefersReducedMotion()) { startIntro(); setGone(true); return; }
    pl.classList.add(s.js);
    const timers: number[] = [];
    let raf = 0;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      if (pctRef.current) pctRef.current.textContent = '100';
      pl.classList.add(s.out);
      timers.push(window.setTimeout(startIntro, 360));
      timers.push(window.setTimeout(() => setGone(true), 1250));
    };
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = clamp01((now - t0) / DURATION);
      const e = 1 - Math.pow(1 - p, 3);
      if (pctRef.current) pctRef.current.textContent = String(Math.round(e * 100)).padStart(3, '0');
      if (barRef.current) barRef.current.style.transform = `scaleX(${e.toFixed(4)})`;
      if (p < 1) raf = requestAnimationFrame(tick); else finish();
    };
    raf = requestAnimationFrame(tick);
    pl.addEventListener('click', finish);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      pl.removeEventListener('click', finish);
    };
  }, []);

  if (gone) return null;
  return (
    <div ref={ref} className={s.pre} aria-hidden="true">
      <div className={s.top}>
        <span className={s.logo}>upGrad</span>
        <span className={s.tag}>In their own words</span>
      </div>
      <div className={s.bottom}>
        <div className={s.row}>
          <span ref={pctRef} className={s.pct}>000</span>
          <span className={s.note}>Collecting {POST_COUNT_LABEL} posts written by upGrad learners on their own LinkedIn.</span>
        </div>
        <div className={s.track}><div ref={barRef} className={s.bar} /></div>
      </div>
    </div>
  );
}

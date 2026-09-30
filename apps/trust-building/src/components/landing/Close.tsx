'use client';

import { useEffect, useRef } from 'react';
import { clamp01, onFrame, onMeasure, pageRect, setStyle } from '@/lib/motion';
import { POST_COUNT_LABEL } from '@/lib/data/landing';
import { LINKS } from '@/lib/links';
import { Lines, Logo } from '../ui';
import s from './Close.module.css';

export function Close() {
  const secRef = useRef<HTMLElement>(null);
  const hRef = useRef<HTMLHeadingElement>(null);

  // The headline grows from 86% to full size as the section scrolls in.
  useEffect(() => {
    let top = 0;
    const offMeasure = onMeasure(() => { if (secRef.current) top = pageRect(secRef.current).top; });
    const offFrame = onFrame(({ sy, vh }) => {
      const q = clamp01((sy + vh - top) / (vh * 0.9));
      setStyle(hRef.current, 'transform', `scale(${(0.86 + 0.14 * q).toFixed(4)})`);
    });
    return () => { offMeasure(); offFrame(); };
  }, []);

  return (
    <section id="p5-close" ref={secRef} className={s.close} aria-labelledby="close-title">
      <div className={s.inner}>
        <span data-rv="" className={s.eyebrow}>Your turn</span>
        <h2 id="close-title" ref={hRef} data-lines="" className={s.h2}>
          <Lines lines={[{ text: 'The next post' }, { text: 'could be yours.', style: { fontStyle: 'italic' } }]} />
        </h2>
        <p data-rv="" className={s.p}>Tell us where you’re starting from and we’ll show you the programmes the people in these posts took.</p>
        <div data-rv="" className={s.ctas}>
          <a href={LINKS.programmes} data-mag="" className={s.primary}>Explore programmes<span className={s.arrow} aria-hidden="true">→</span></a>
          <a href={LINKS.allPosts} data-mag="" className={s.secondary}>Read all {POST_COUNT_LABEL} posts</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={s.footer}>
      <Logo />
      <span className={s.note}>Every post on this page links to the live original on its author’s profile. We didn’t edit a word.</span>
    </footer>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { clamp01, onFrame, onMeasure, pageRect, scrollToId, setStyle, smoothScrollTo } from '@/lib/motion';
import { NAV } from '@/lib/data/landing';
import { LINKS } from '@/lib/links';
import { Logo, cx } from '../ui';
import s from './Header.module.css';

/**
 * Transparent over the hero, frosted once you scroll past 80% of it.
 * Hides while scrolling down past the hero and returns on scroll up.
 */
export function Header() {
  const progRef = useRef<HTMLSpanElement>(null);
  const [st, setSt] = useState({ solid: false, hide: false, sec: '' });

  useEffect(() => {
    let heroH = 0, docH = 0, hy = window.scrollY;
    let secs: { id: string; top: number; h: number }[] = [];
    const cur = { solid: false, hide: false, sec: '' };
    const offMeasure = onMeasure(() => {
      const hero = document.getElementById('p5-hero');
      heroH = hero ? hero.offsetHeight : window.innerHeight;
      docH = document.documentElement.scrollHeight - window.innerHeight;
      secs = NAV.flatMap(({ id }) => { const el = document.getElementById(id); return el ? [{ id, ...pageRect(el) }] : []; });
    });
    const offFrame = onFrame(({ y, vh }) => {
      const solid = y > heroH * 0.8;
      let hide = cur.hide;
      if (Math.abs(y - hy) > 12) { hide = y > heroH && y > hy; hy = y; }
      if (y < heroH) hide = false;
      let sec = '';
      for (const x of secs) if (y + vh * 0.4 >= x.top && y + vh * 0.4 < x.top + x.h) sec = x.id;
      if (solid !== cur.solid || hide !== cur.hide || sec !== cur.sec) {
        Object.assign(cur, { solid, hide, sec });
        setSt({ solid, hide, sec });
      }
      setStyle(progRef.current, 'transform', `scaleX(${(docH > 0 ? clamp01(y / docH) : 0).toFixed(4)})`);
    });
    return () => { offMeasure(); offFrame(); };
  }, []);

  return (
    <header className={cx(s.header, st.solid && s.solid, st.hide && s.hidden)}>
      <a href="#p5-hero" aria-label="upGrad, back to top" onClick={e => { e.preventDefault(); smoothScrollTo(0); }}>
        <Logo />
      </a>
      <nav className={s.nav} aria-label="Sections">
        {NAV.map(n => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={cx(s.navLink, st.sec === n.id && s.active)}
            aria-current={st.sec === n.id ? 'location' : undefined}
            onClick={e => { e.preventDefault(); scrollToId(n.id); }}
          >
            <span className={s.navDot} />{n.label}
          </a>
        ))}
      </nav>
      <a href={LINKS.programmes} className={s.cta}>Explore programmes</a>
      <span ref={progRef} className={s.prog} aria-hidden="true" />
    </header>
  );
}

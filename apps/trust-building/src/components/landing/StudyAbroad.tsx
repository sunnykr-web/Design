'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { clamp01, onFrame, onMeasure, pageRect, prefersReducedMotion, setStyle } from '@/lib/motion';
import { useDragRail } from '@/lib/useDragRail';
import { ABROAD_POSTS, ABROAD_VIDEOS } from '@/lib/data/landing';
import { LINKS } from '@/lib/links';
import planeImg from '@/assets/sa-plane.png';
import { LinkedInBadge } from '../ui';
import { Lines, RowHead, SectionHead } from './Section';
import s from './StudyAbroad.module.css';

const AUTO_MS = 5600;
const N = ABROAD_POSTS.length;
const wrap = (i: number) => ((i % N) + N) % N;

export function StudyAbroad() {
  const [idx, setIdx] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const timer = useRef({ t: 0, paused: false, visible: false });
  useDragRail(railRef);

  const go = (i: number) => { timer.current.t = 0; setIdx(wrap(i)); };

  useEffect(() => {
    const stage = stageRef.current!, panel = panelRef.current!;
    const reduced = prefersReducedMotion();
    const tm = timer.current;
    const io = new IntersectionObserver(([e]) => { tm.visible = e.isIntersecting; });
    io.observe(stage);

    // Swipe between posts.
    let x0: number | null = null;
    const down = (e: PointerEvent) => { x0 = e.clientX; };
    const up = (e: PointerEvent) => {
      if (x0 === null) return;
      const dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) { tm.t = 0; setIdx(i => wrap(i + (dx < 0 ? 1 : -1))); }
    };
    stage.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);

    let m = { top: 0, h: 0 };
    const offMeasure = onMeasure(() => { m = pageRect(panel); });
    const offFrame = onFrame(({ sy, vh, dt }) => {
      if (sy + vh > m.top && sy < m.top + m.h) {
        const q = clamp01((sy + vh - m.top) / (vh + m.h));
        setStyle(bgRef.current, 'transform', `translate3d(0,${((q - 0.5) * -110).toFixed(1)}px,0) scale(1.06)`);
      }
      // Auto-advance while on screen, not hovered and the tab is visible.
      if (!reduced && tm.visible && !tm.paused && !document.hidden) tm.t += dt;
      if (tm.t >= AUTO_MS) { tm.t = 0; setIdx(i => wrap(i + 1)); }
    });
    return () => {
      io.disconnect();
      stage.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      offMeasure(); offFrame();
    };
  }, []);

  return (
    <section id="p5-abroad" className={s.abroad} aria-labelledby="abroad-title">
      <SectionHead
        id="abroad-title" className={s.head} num="02" title="Study abroad" sub="When the classroom" accent="got a passport."
        side="Some learners took their programme further than their desk. These are the posts they wrote from the other side."
      />

      <div ref={panelRef} data-rv="" className={s.panel}>
        <div className={s.bgClip} aria-hidden="true">
          <div ref={bgRef} className={s.bg}>
            <Image src={planeImg} alt="" fill sizes="100vw" className={s.bgImg} />
          </div>
          <div className={s.shade} />
        </div>
        <a href={LINKS.studyAbroadStories} className={s.viewAll}>View all →</a>
        <h3 className={s.h3}>They left for a degree. <em>They wrote home on LinkedIn.</em></h3>

        <div
          ref={stageRef}
          className={s.stage}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="LinkedIn posts from learners who studied abroad. Use the left and right arrow keys to browse."
          onKeyDown={e => {
            if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1); }
            if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1); }
          }}
          onMouseEnter={() => { timer.current.paused = true; }}
          onMouseLeave={() => { timer.current.paused = false; }}
        >
          {ABROAD_POSTS.map((p, i) => {
            let o = i - idx; if (o > N / 2) o -= N; if (o < -N / 2) o += N;
            const a = Math.abs(o), sg = Math.sign(o);
            return (
              <article
                key={i}
                aria-hidden={a !== 0}
                onClick={() => { if (a !== 0) go(i); }}
                className={s.post}
                style={{
                  transform: `translate3d(-50%,-50%,0) translateX(${sg * (a === 0 ? 0 : a === 1 ? 66 : 112)}%) rotateY(${-sg * (a === 0 ? 0 : 18)}deg) scale(${a === 0 ? 1 : a === 1 ? 0.84 : 0.7})`,
                  opacity: a === 0 ? 1 : a === 1 ? 0.6 : 0,
                  filter: a === 0 ? 'none' : `blur(${a * 2}px)`,
                  zIndex: 10 - a * 3,
                  pointerEvents: a > 1 ? 'none' : 'auto',
                  cursor: a === 0 ? 'default' : 'pointer',
                  boxShadow: a === 0 ? '0 50px 90px -30px rgba(10,14,30,.6)' : '0 20px 40px -24px rgba(10,14,30,.4)',
                }}
              >
                <header className={s.postHead}>
                  <span className={s.av}>
                    {p.ini}
                    {p.av && <Image src={p.av} alt="" width={44} height={44} className={s.avImg} draggable={false} />}
                  </span>
                  <span className={s.who}>
                    <span className={s.name}>{p.name}</span>
                    <span className={s.role}>{p.role} · {p.date}</span>
                  </span>
                  <LinkedInBadge size={24} />
                </header>
                <p className={s.text}>{p.body}</p>
                <div className={s.photo}>
                  <Image src={p.photo} alt={p.photoAlt} fill sizes="400px" className={s.photoImg} draggable={false} />
                  <a href={LINKS.studyAbroadStories} className={s.story} tabIndex={a === 0 ? undefined : -1}>
                    View story<span className={s.storyArrow} aria-hidden="true">→</span>
                  </a>
                </div>
                <div className={s.stats}>
                  <span className={s.reacts}>
                    <span className={s.dots3} aria-hidden="true">
                      <span style={{ background: '#378FE9' }} /><span style={{ background: '#DF704D' }} /><span style={{ background: '#6DAE4F' }} />
                    </span>
                    {p.likes}
                  </span>
                  <span>{p.comments}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className={s.lower}>
        <RowHead
          className={s.rowHead}
          title={<Lines lines={[{ text: <>Hear from the <span className={s.accent}>upGrad</span> learner</>, style: { fontSize: 38.91 } }]} />}
          side="Real voices, real struggles, and triumphs. Hear the unscripted stories of learners who forged lifelong friendships through late-night study sessions."
        />
        <div ref={railRef} data-drag="" className={s.rail}>
          {ABROAD_VIDEOS.map(v => (
            <div key={v.alt} data-ir="" className={s.video}>
              <Image src={v.src} alt={v.alt} fill sizes="290px" className={s.videoImg} draggable={false} />
              <div className={s.videoShade} />
              <span className={s.play} aria-hidden="true">
                <svg viewBox="0 0 12 12" width="14" height="14" fill="#FFFFFF" style={{ marginLeft: 2 }}><path d="M3 1.6v8.8a.6.6 0 0 0 .9.5l7-4.4a.6.6 0 0 0 0-1L3.9 1.1a.6.6 0 0 0-.9.5Z" /></svg>
              </span>
              <p className={s.videoCap}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

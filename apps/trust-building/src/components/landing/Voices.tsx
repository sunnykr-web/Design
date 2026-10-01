'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { onFrame, onMeasure, setStyle } from '@/lib/motion';
import { POST_COUNT_LABEL, VOICE_ROW_A, VOICE_ROW_B, type VoiceCard as VoiceCardData } from '@/lib/data/landing';
import { LINKS } from '@/lib/links';
import { Eyebrow, LinkedInBadge, Lines } from '../ui';
import s from './Voices.module.css';


/** Two endless marquee rows in opposite directions. They speed up with scroll and ease to a stop on hover. */
export function Voices() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    const state = rows.map(el => ({ el, dir: Number(el.dataset.dir) || -1, x: 0, sp: 0, half: 0, hover: false }));
    const cleanups: (() => void)[] = [];
    state.forEach(o => {
      const enter = () => { o.hover = true; }, leave = () => { o.hover = false; };
      o.el.addEventListener('mouseenter', enter);
      o.el.addEventListener('mouseleave', leave);
      cleanups.push(() => { o.el.removeEventListener('mouseenter', enter); o.el.removeEventListener('mouseleave', leave); });
    });
    let first = true;
    const offMeasure = onMeasure(() => {
      state.forEach(o => {
        o.half = o.el.scrollWidth / 2;
        if (first && o.dir > 0) o.x = -o.half / 2;
      });
      first = false;
    });
    const offFrame = onFrame(({ vel, k, reduced }) => {
      for (const o of state) {
        if (!o.half) continue;
        const target = reduced || o.hover ? 0 : o.dir * (0.5 + Math.min(Math.abs(vel) * 0.32, 14));
        o.sp += (target - o.sp) * 0.08 * k;
        o.x += o.sp * k;
        if (o.x <= -o.half) o.x += o.half;
        if (o.x > 0) o.x -= o.half;
        setStyle(o.el, 'transform', `translate3d(${o.x.toFixed(1)}px,0,0)`);
      }
    });
    return () => { cleanups.forEach(f => f()); offMeasure(); offFrame(); };
  }, []);

  return (
    <section id="p5-words" className={s.words} aria-labelledby="words-title">
      <div className={s.head}>
        <div className={s.title}>
          <Eyebrow color="var(--red-deep)">04 · In their own words</Eyebrow>
          <h2 id="words-title" data-lines="" className={s.h2}>
            <Lines lines={[
              { text: `${POST_COUNT_LABEL} learners wrote about us.` },
              { text: 'We didn’t edit a word.', style: { fontStyle: 'italic', color: 'var(--muted)' } },
            ]} />
          </h2>
        </div>
        <div data-rv="">
          <Link href={LINKS.allPosts} className={s.all}>Read all {POST_COUNT_LABEL} posts →</Link>
        </div>
      </div>
      <div className={s.rows}>
        {[VOICE_ROW_A, VOICE_ROW_B].map((row, r) => (
          <div key={r} ref={el => { rowRefs.current[r] = el; }} data-dir={r === 0 ? -1 : 1} className={s.row}>
            {/* Each row renders twice so the loop is seamless; the copy is hidden from assistive tech. */}
            {[...row, ...row].map((w, i) => <VoiceCard key={i} w={w} dup={i >= row.length} />)}
          </div>
        ))}
      </div>
    </section>
  );
}

function VoiceCard({ w, dup }: { w: VoiceCardData; dup: boolean }) {
  return (
    <article className={s.card} aria-hidden={dup || undefined}>
      <header className={s.cardHead}>
        <span className={s.av}>
          {w.ini}
          {w.av && <Image src={w.av} alt={w.name} width={44} height={44} className={s.avImg} />}
        </span>
        <span className={s.who}>
          <span className={s.name}>{w.name}</span>
          <span className={s.role}>{w.role}</span>
          <span className={s.date}>{w.date} · Edited</span>
        </span>
        <span className={s.badge}><LinkedInBadge size={22} /></span>
      </header>
      <p className={s.text}>{w.text}</p>
      <span className={s.more}>…see more</span>
      <div className={s.stats}>
        <span className={s.reacts}>
          <span className={s.dots} aria-hidden="true"><span style={{ background: '#378FE9' }} /><span style={{ background: '#DF704D' }} /><span style={{ background: '#6DAE4F' }} /></span>
          {w.likes}
        </span>
        <span>{w.comments}</span>
      </div>
      <div className={s.actions} aria-hidden="true"><span>Like</span><span>Comment</span><span>Repost</span><span>Send</span></div>
    </article>
  );
}

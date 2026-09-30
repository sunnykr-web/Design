'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { clamp01, onFrame, onIntro, onMeasure, prefersReducedMotion, scrollToId, setStyle } from '@/lib/motion';
import { HERO_POSTS, POST_COUNT, POST_COUNT_LABEL, type HeroPost } from '@/lib/data/landing';
import { Eyebrow, Lines } from '../ui';
import s from './Hero.module.css';

const AUTO_MS = 5200;

type Slot = { x: number; y: number; z: number; ry: number; s: number; blur: number; op: number; zi: number };

/** Where a card sits for offset `o` from the active card. */
function slotFor(o: number, hovered: boolean): Slot {
  const a = Math.abs(o), d = Math.sign(o);
  if (o === 0) return { x: 0, y: 0, z: 90, ry: 0, s: 1, blur: 0, op: 1, zi: 30 };
  const b = { x: d * (a === 1 ? 300 : 520), y: a * 14, z: -150 * a - 70 * a * a, ry: -d * (22 + 8 * a), s: 1 - 0.08 * a, blur: 2 * a + Math.max(a - 1, 0), op: a > 2 ? 0 : 1 - 0.14 * a, zi: 20 - a };
  if (hovered) return { x: b.x * 0.95, y: 0, z: b.z + 100, ry: b.ry * 0.5, s: b.s + 0.04, blur: 0, op: 1, zi: 25 };
  return b;
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const swipeRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const veilRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current!, rig = rigRef.current!, swipe = swipeRef.current!;
    const slots = slotRefs.current as HTMLDivElement[];
    const cards = cardRefs.current as HTMLElement[];
    const veils = veilRefs.current as HTMLDivElement[];
    const N = slots.length;
    const reduced = prefersReducedMotion();
    const fine = window.matchMedia('(pointer: fine)').matches;
    const sc = { active: Math.floor(N / 2), hovered: null as number | null, auto: !reduced, hover: false, t: 0, ready: false, rx: 0, ry: 0, gx: innerWidth / 2, gy: innerHeight * 0.64 };
    const off = (i: number) => { let o = i - sc.active; if (o > N / 2) o -= N; if (o < -N / 2) o += N; return o; };
    const cleanups: (() => void)[] = [];
    const on = <K extends keyof HTMLElementEventMap>(t: HTMLElement | Window, ev: K, fn: (e: HTMLElementEventMap[K]) => void, o?: AddEventListenerOptions) => {
      t.addEventListener(ev, fn as EventListener, o);
      cleanups.push(() => t.removeEventListener(ev, fn as EventListener, o));
    };
    const timers: number[] = [];

    const render = () => {
      slots.forEach((el, i) => {
        if (!sc.ready) { el.style.opacity = '0'; return; }
        const o = off(i), t = slotFor(o, sc.hovered === i);
        el.style.transform = `translate3d(${t.x}px,${t.y}px,${t.z}px) rotateY(${t.ry}deg) scale(${t.s})`;
        el.style.opacity = String(t.op);
        el.style.filter = t.blur ? `blur(${t.blur}px)` : 'none';
        el.style.zIndex = String(t.zi);
        el.style.pointerEvents = t.op === 0 ? 'none' : 'auto';
        el.style.cursor = o === 0 ? 'default' : 'pointer';
        el.setAttribute('aria-hidden', o === 0 ? 'false' : 'true');
        veils[i].style.opacity = String(o === 0 || sc.hovered === i ? 0 : 0.3 + 0.14 * Math.abs(o));
      });
    };
    const go = (i: number) => {
      sc.hovered = null; sc.t = 0;
      cards.forEach(c => { c.style.transform = ''; });
      sc.active = ((i % N) + N) % N;
      render();
    };

    on(stage, 'pointerenter', () => { sc.hover = true; });
    on(stage, 'pointerleave', () => { sc.hover = false; });
    on(stage, 'keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(sc.active + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(sc.active - 1); }
    });
    slots.forEach((el, i) => {
      on(el, 'pointerenter', () => { if (off(i) !== 0) { sc.hovered = i; render(); } });
      on(el, 'pointerleave', () => { if (sc.hovered === i) { sc.hovered = null; render(); } });
      on(el, 'click', () => { if (off(i) !== 0) go(i); });
      const card = cards[i];
      on(card, 'pointermove', e => {
        if (reduced || off(i) !== 0) return;
        const r = card.getBoundingClientRect(), nx = clamp01((e.clientX - r.left) / r.width), ny = clamp01((e.clientY - r.top) / r.height);
        card.style.transition = 'transform .2s ease-out';
        card.style.transform = `rotateX(${((0.5 - ny) * 12).toFixed(2)}deg) rotateY(${((nx - 0.5) * 16).toFixed(2)}deg) translateZ(20px)`;
      });
      on(card, 'pointerleave', () => { card.style.transition = 'transform .8s cubic-bezier(.16,1,.3,1)'; card.style.transform = ''; });
    });

    // Swipe the empty stage to rotate.
    let s0: { x: number; t: number; id: number } | null = null;
    on(swipe, 'pointerdown', e => { s0 = { x: e.clientX, t: performance.now(), id: e.pointerId }; swipe.style.cursor = 'grabbing'; try { swipe.setPointerCapture(e.pointerId); } catch { /* not capturable */ } });
    on(swipe, 'pointerup', e => {
      swipe.style.cursor = 'grab';
      if (!s0 || s0.id !== e.pointerId) return;
      const dx = e.clientX - s0.x, v = (dx / Math.max(performance.now() - s0.t, 1)) * 1000;
      s0 = null;
      if (dx < -50 || v < -400) go(sc.active + 1); else if (dx > 50 || v > 400) go(sc.active - 1);
    });
    on(swipe, 'pointercancel', () => { s0 = null; swipe.style.cursor = 'grab'; });
    render();

    // Intro: fly the cards in, fade the halo up, count the posts.
    let cRaf = 0;
    const offIntro = onIntro(() => {
      sc.ready = true;
      slots.forEach((el, i) => { el.style.transitionDuration = '1.6s'; el.style.transitionDelay = `${0.35 + Math.abs(off(i)) * 0.14}s`; });
      render();
      if (haloRef.current) { haloRef.current.style.transitionDelay = '.6s'; haloRef.current.style.opacity = '1'; }
      timers.push(window.setTimeout(() => slots.forEach(el => { el.style.transitionDuration = ''; el.style.transitionDelay = ''; }), 2400));
      const el = countRef.current;
      if (!el || reduced) return;
      const T = 2000, t0 = performance.now() + 500;
      el.textContent = '0';
      const f = (now: number) => {
        const p = clamp01((now - t0) / T), e = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(POST_COUNT * e).toLocaleString('en-IN');
        if (p < 1) cRaf = requestAnimationFrame(f);
      };
      cRaf = requestAnimationFrame(f);
    });

    let heroH = 0;
    const offMeasure = onMeasure(() => { heroH = heroRef.current?.offsetHeight ?? innerHeight; });
    const offFrame = onFrame(({ sy, dt, k, vw, vh, mx, my }) => {
      if (sy >= heroH + 50) return;
      const p = clamp01(sy / heroH);
      setStyle(contentRef.current, 'transform', `translate3d(0,${(-p * 120).toFixed(1)}px,0)`);
      setStyle(contentRef.current, 'opacity', Math.max(0, 1 - p * 1.7).toFixed(3));

      if (sc.ready && sc.auto && !sc.hover && p < 0.6) { sc.t += dt; if (sc.t >= AUTO_MS) go(sc.active + 1); }
      const has = fine && mx >= 0 && !reduced;
      const tx = has ? (mx / vw - 0.5) * 10 : 0, ty = has ? (my / vh - 0.5) * -6 : 0;
      sc.ry += (tx - sc.ry) * 0.05 * k;
      sc.rx += (ty - sc.rx) * 0.05 * k;
      const scale = Math.max(0.56, Math.min(1, vw / 1100));
      setStyle(rig, 'transform', `scale(${scale.toFixed(3)}) rotateX(${(sc.rx + p * 20).toFixed(2)}deg) rotateY(${sc.ry.toFixed(2)}deg)`);
      setStyle(stage, 'transform', `translate3d(0,${(-p * 90).toFixed(1)}px,0) scale(${(1 - p * 0.1).toFixed(4)})`);
      setStyle(stage, 'opacity', Math.max(0, 1 - p * 1.2).toFixed(3));
      if (has) { sc.gx += (mx - sc.gx) * 0.04 * k; sc.gy += (my + window.scrollY - sc.gy) * 0.04 * k; }
      setStyle(glowRef.current, 'transform', `translate3d(${sc.gx.toFixed(1)}px,${sc.gy.toFixed(1)}px,0)`);
    });

    return () => {
      cleanups.forEach(f => f());
      timers.forEach(clearTimeout);
      cancelAnimationFrame(cRaf);
      offIntro(); offMeasure(); offFrame();
    };
  }, []);

  return (
    <section id="p5-hero" ref={heroRef} className={s.hero} aria-labelledby="hero-title">
      <div ref={glowRef} className={s.glow} aria-hidden="true" />
      <div className={s.floor} aria-hidden="true" />
      <div ref={contentRef} className={s.content}>
        <span data-hf="" style={{ ['--i' as string]: 0 }}>
          <Eyebrow wide pulse color="rgba(255,255,255,.86)">Unedited · Unprompted · Unpaid</Eyebrow>
        </span>
        <h1 id="hero-title" data-lines="hero" className={s.h1}>
          <Lines lines={[{ text: 'Don’t take our word for it.' }, { text: 'Take theirs.', style: { fontStyle: 'italic', color: 'var(--red-bright)' } }]} />
        </h1>
        <p data-hf="" style={{ ['--i' as string]: 1 }} className={s.lede}>Real posts from upGrad learners, on their own profiles, in their own words.</p>
      </div>

      <div
        ref={stageRef}
        className={s.stage}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Posts written by upGrad learners. Use the left and right arrow keys to browse."
      >
        <div ref={swipeRef} className={s.swipe} />
        <div ref={rigRef} className={s.rig}>
          <div ref={haloRef} className={s.halo} aria-hidden="true" />
          {HERO_POSTS.map((p, i) => (
            <div key={p.name} ref={el => { slotRefs.current[i] = el; }} className={s.slot}>
              <PostCard post={p} cardRef={el => { cardRefs.current[i] = el; }} />
              <div ref={el => { veilRefs.current[i] = el; }} className={s.veil} />
            </div>
          ))}
        </div>
      </div>

      <div data-hf="" style={{ ['--i' as string]: 2 }} className={s.bar}>
        <div className={s.countWrap}>
          <span ref={countRef} className={s.count}>{POST_COUNT_LABEL}</span>
          <span className={s.countLabel}>Posts, all still live</span>
        </div>
        <span aria-hidden="true" />
        <a href="#p5-man" className={s.cta} onClick={e => { e.preventDefault(); scrollToId('p5-man'); }}>
          Read their posts<span className={s.ctaArrow} aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}

function PostCard({ post: p, cardRef }: { post: HeroPost; cardRef: (el: HTMLElement | null) => void }) {
  return (
    <article ref={cardRef} className={s.card}>
      <header className={s.cardHead}>
        <span className={s.av} style={{ background: p.avBg }}>
          <span className={s.avIni}>{p.ini}</span>
          <Image src={p.av} alt={p.name} width={34} height={34} className={s.avImg} draggable={false} />
        </span>
        <span className={s.who}>
          <span className={s.name}>{p.name}</span>
          <span className={s.role}>{p.role}</span>
        </span>
        <span className={s.date}>{p.date}</span>
      </header>
      <div className={s.body}>
        <p>{p.t1}</p>
        <p>{p.t2}</p>
      </div>
      {p.badge && (
        <div className={s.badge}>
          <div className={s.shield}>PMP</div>
          <span className={s.badgeLabel}>Project Management Professional</span>
        </div>
      )}
      {p.photo && <Image src={p.photo} alt={p.photoAlt ?? ''} sizes="300px" className={s.photo} draggable={false} />}
      <div className={s.stats}>
        <span className={s.reacts}>
          <span className={s.reactRow} aria-hidden="true">
            <span className={s.react} style={{ zIndex: 3, background: '#378fe9' }}>👍</span>
            <span className={s.react} style={{ zIndex: 2, background: '#df704d' }}>❤️</span>
            <span className={s.react} style={{ zIndex: 1, background: '#f5bb5c' }}>💡</span>
          </span>
          <span className={s.likes}>{p.likes}</span>
        </span>
        <span className={s.nowrap}>{p.stats}</span>
      </div>
      <footer className={s.cardFoot}>
        <span className={s.read}>Read on LinkedIn <span aria-hidden="true">↗</span></span>
      </footer>
    </article>
  );
}

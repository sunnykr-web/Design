'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { clamp01, onFrame, onMeasure, pageRect, prefersReducedMotion, setStyle, smoothScrollTo } from '@/lib/motion';
import { useDragRail } from '@/lib/useDragRail';
import { IMMERSION_CARDS, IMMERSION_STEPS } from '@/lib/data/landing';
import { IMMERSIONS, immersionHref } from '@/lib/data/immersions';
import cafeImg from '@/assets/cafe.png';
import { Lines, RowHead, SectionTitle } from './Section';
import s from './Immersion.module.css';

const N = IMMERSION_STEPS.length;
const cityName = (slug: string) => IMMERSIONS.find(i => i.slug === slug)?.city ?? slug;

/**
 * A sticky 100vh stage inside a 380vh track. Scroll progress picks the active step:
 * images stack up from below, the caption crossfades and the step counter rolls.
 */
export function Immersion() {
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const rollRef = useRef<HTMLSpanElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement>(null);
  const act = useRef(0);
  useDragRail(railRef);

  const goStep = (i: number) => {
    const st = stageRef.current;
    if (!st) return;
    const span = st.offsetHeight - innerHeight;
    smoothScrollTo(pageRect(st).top + span * (i / (N - 1)) + 2);
  };

  useEffect(() => {
    const stage = stageRef.current!, media = mediaRef.current!;
    const reduced = prefersReducedMotion();
    let m = { top: 0, h: 0 };
    let lastAct = -1;
    const offMeasure = onMeasure(() => { m = pageRect(stage); });
    const smooth = (x: number) => { x = clamp01((x - 0.16) / 0.68); return x * x * (3 - 2 * x); };

    const offFrame = onFrame(({ sy, vh }) => {
      if (!m.h || sy + vh * 1.5 < m.top || sy > m.top + m.h + vh * 0.5) return;
      const span = Math.max(1, m.h - vh);
      const t = clamp01((sy - m.top) / span), raw = t * (N - 1);
      const k = Math.min(N - 2, Math.floor(raw)), f = raw - k;
      // Hold on each step, then ease to the next.
      const seg = raw >= N - 1 ? N - 1 : k + smooth(f);
      const a = Math.round(seg);
      act.current = a;
      for (let i = 0; i < N; i++) {
        const d = seg - i, c = layerRefs.current[i], tx = textRefs.current[i], row = stepRefs.current[i];
        if (c) {
          if (d < 0) {
            const p = Math.min(1, -d);
            setStyle(c, 'transform', `translate3d(0,${(p * 110).toFixed(2)}%,0) rotate(${(p * 5).toFixed(2)}deg) scale(${(1 + p * 0.06).toFixed(4)})`);
            setStyle(c, 'filter', 'none');
            setStyle(c, 'opacity', '1');
          } else {
            const q = Math.min(1, d);
            setStyle(c, 'transform', `translate3d(0,${(-q * 4).toFixed(2)}%,0) scale(${(1 - q * 0.08).toFixed(4)})`);
            setStyle(c, 'filter', q > 0.002 ? `blur(${(q * 6).toFixed(2)}px)` : 'none');
            setStyle(c, 'opacity', (1 - q * 0.5).toFixed(3));
          }
        }
        if (tx) {
          const al = clamp01(1 - Math.abs(d) * 2.4);
          setStyle(tx, 'opacity', al.toFixed(3));
          setStyle(tx, 'transform', `translate3d(0,${(-d * 32).toFixed(1)}px,0)`);
          setStyle(tx, 'filter', al < 0.995 ? `blur(${((1 - al) * 8).toFixed(2)}px)` : 'none');
          setStyle(tx, 'pointer-events', al > 0.5 ? 'auto' : 'none');
          tx.setAttribute('aria-hidden', i === a ? 'false' : 'true');
        }
        setStyle(fillRefs.current[i], 'transform', `scaleX(${clamp01(seg - i + 1).toFixed(4)})`);
        if (row && a !== lastAct) row.toggleAttribute('data-active', i === a);
      }
      lastAct = a;
      setStyle(rollRef.current, 'transform', `translate3d(0,${(-seg).toFixed(4)}em,0)`);
      setStyle(bgRef.current, 'transform', `scale(${(1.14 - t * 0.12).toFixed(4)})`);
    });

    // Tilt the active image toward the cursor.
    let tiltEl: HTMLElement | null = null;
    const move = (e: PointerEvent) => {
      if (reduced || e.pointerType !== 'mouse') return;
      const img = imgRefs.current[act.current];
      if (!img) return;
      const r = media.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
      if (tiltEl && tiltEl !== img) tiltEl.style.transform = '';
      tiltEl = img;
      img.style.transition = 'transform .35s ease-out';
      img.style.transform = `perspective(1400px) rotateX(${(-ny * 6).toFixed(2)}deg) rotateY(${(nx * 8).toFixed(2)}deg) scale(1.02)`;
    };
    const leave = () => {
      if (!tiltEl) return;
      tiltEl.style.transition = 'transform 1s cubic-bezier(.16,1,.3,1)';
      tiltEl.style.transform = '';
    };
    media.addEventListener('pointermove', move);
    media.addEventListener('pointerleave', leave);
    return () => {
      offMeasure(); offFrame();
      media.removeEventListener('pointermove', move);
      media.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <section id="p5-imm" className={s.imm} aria-labelledby="imm-title">
      <div ref={stageRef} className={s.stage}>
        <div className={s.sticky}>
          <div ref={bgRef} className={s.bg}>
            <Image src={cafeImg} alt="" fill sizes="100vw" className={s.bgImg} />
          </div>
          <div className={s.shade} />
          <div className={s.inner}>
            <div className={s.left}>
              <div className={s.top}>
                <SectionTitle dark id="imm-title" num="03" title="Immersion" sub="When the course" accent="stepped off the screen." />
                <div className={s.steps}>
                  {IMMERSION_STEPS.map((st, i) => (
                    <div key={st.label} ref={el => { stepRefs.current[i] = el; }} className={s.step} data-active={i === 0 ? '' : undefined}>
                      <span ref={el => { fillRefs.current[i] = el; }} className={s.stepFill} style={{ transform: `scaleX(${i === 0 ? 1 : 0})` }} />
                      <button type="button" className={s.stepBtn} onClick={() => goStep(i)}>
                        <span className={s.stepNum}>0{i + 1}</span><span>{st.label}</span>
                      </button>
                      <StepArrow href={immersionHref(st.city)} label={`Explore the ${cityName(st.city)} immersion`} />
                    </div>
                  ))}
                </div>
              </div>
              <div className={s.bottom}>
                <div className={s.counter} aria-hidden="true">
                  <span className={s.rollWin}>
                    <span ref={rollRef} className={s.roll}>{IMMERSION_STEPS.map((_, i) => <span key={i}>0{i + 1}</span>)}</span>
                  </span>
                  <span className={s.total}>/ 0{N}</span>
                </div>
                <div className={s.texts}>
                  {IMMERSION_STEPS.map((st, i) => (
                    <div key={st.label} ref={el => { textRefs.current[i] = el; }} className={s.text} style={{ opacity: i === 0 ? 1 : 0 }} aria-hidden={i !== 0}>
                      <span className={s.tag}>{st.tag}</span>
                      <p className={s.line}>{st.line}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div ref={mediaRef} className={s.media}>
              {IMMERSION_STEPS.map((st, i) => (
                <div key={st.label} ref={el => { layerRefs.current[i] = el; }} className={s.layer} style={{ zIndex: i + 1, transform: i === 0 ? 'none' : 'translate3d(0,110%,0)' }}>
                  <Image
                    ref={el => { imgRefs.current[i] = el; }}
                    src={st.src} alt={st.alt} sizes="(max-width: 900px) 100vw, 60vw" draggable={false}
                    className={s.layerImg} priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <RowHead
        className={s.rowHead}
        lineHeight={0.98}
        sideColor="rgba(243,238,230,.72)"
        title={<Lines lines={[{ text: 'One week on campus,' }, { text: 'frame by frame.', style: { fontStyle: 'italic', color: 'var(--red-bright)' } }]} />}
        side="Faculty, mentors and founders in the same room as the learners they teach."
      />
      <div ref={railRef} data-drag="" className={s.rail}>
        {IMMERSION_CARDS.map(c => (
          <Link key={c.desc} href={immersionHref(c.city)} className={s.card} draggable={false}>
            <div data-ir="" className={s.cardImg}>
              <Image src={c.src} alt={c.alt} fill sizes="400px" className={s.cardPic} draggable={false} />
            </div>
            <span className={s.cap}>
              <span className={s.meta}><span>{c.place}</span><span>{c.year}</span></span>
              <span className={s.desc}>{c.desc}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Round arrow that opens the city's detail page. Its glyph leans toward the cursor while hovered. */
function StepArrow({ href, label }: { href: string; label: string }) {
  const glyph = useRef<HTMLSpanElement>(null);
  return (
    <Link
      href={href}
      aria-label={label}
      title="View event details"
      className={s.go}
      onPointerMove={e => {
        if (e.pointerType !== 'mouse' || !glyph.current) return;
        const r = e.currentTarget.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        const ang = Math.max(-60, Math.min(60, (Math.atan2(dy, dx) * 180) / Math.PI));
        glyph.current.style.transform = `translate(${(dx * 0.18).toFixed(1)}px,${(dy * 0.18).toFixed(1)}px) rotate(${ang.toFixed(1)}deg)`;
      }}
      onPointerLeave={() => { if (glyph.current) glyph.current.style.transform = ''; }}
    >
      <span ref={glyph} className={s.goGlyph} aria-hidden="true">→</span>
    </Link>
  );
}

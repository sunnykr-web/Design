'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { clamp01, onFrame, onMeasure, setStyle } from '@/lib/motion';
import { useDragRail } from '@/lib/useDragRail';
import { CONV_STRIP } from '@/lib/data/landing';
import { convLook, convocationHref } from '@/lib/data/convocations';
import { LINKS } from '@/lib/links';
import { PostCard } from './PostCard';
import { SectionHead } from './Section';
import s from './Convocation.module.css';

export function Convocation() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  useDragRail(scrollRef);

  useEffect(() => {
    const sc = scrollRef.current!;
    let imgs: { img: HTMLElement; x: number; w: number }[] = [];
    const offMeasure = onMeasure(() => {
      imgs = [...sc.querySelectorAll<HTMLElement>('[data-parallax]')].map(img => {
        const card = img.closest<HTMLElement>('[data-card]')!;
        return { img, x: card.offsetLeft, w: card.offsetWidth };
      });
    });
    // Photos drift against the rail's scroll; the progress bar tracks it.
    const offFrame = onFrame(({ vw }) => {
      const t = clamp01(sc.scrollLeft / Math.max(1, sc.scrollWidth - sc.clientWidth));
      const tx = -sc.scrollLeft;
      for (const o of imgs) {
        const r = (o.x + tx + o.w / 2 - vw / 2) / vw;
        setStyle(o.img, 'transform', `translate3d(${(-r * 7).toFixed(2)}%,0,0) scale(1.16)`);
      }
      setStyle(barRef.current, 'transform', `scaleX(${t.toFixed(4)})`);
    });
    return () => { offMeasure(); offFrame(); };
  }, []);

  return (
    <section id="p5-conv" className={s.conv} aria-labelledby="conv-title">
      <div className={s.col}>
        <SectionHead
          id="conv-title" num="01" title="Convocation" sub="Months on screen." accent="One day on stage."
          side="Trade your virtual classroom for the campus grounds as you finally meet the peers you’ve studied alongside for months."
        />
        <Link data-rv="" href={LINKS.convocationStories} className={s.viewAll}>View all →</Link>
        <div ref={scrollRef} data-drag="" className={s.scroll}>
          <div className={s.track}>
            {CONV_STRIP.map((item, i) => {
              if (item.kind === 'quote') return <QuoteCard key="quote" />;
              if (item.kind === 'post') {
                return (
                  <Link key={i} href={convocationHref(item.conv.slug)} className={`${s.postFig} post-hover`} aria-label={`LinkedIn post by ${item.post.name}`} draggable={false}>
                    <PostCard post={item.post} img={item.conv.img} alt={item.conv.alt} />
                    <span className={s.postCap}><span>{item.post.name}, on LinkedIn</span><span className={s.year}>2026</span></span>
                  </Link>
                );
              }
              const { conv, place, year, ar } = item;
              const look = convLook(conv);
              return (
                <Link key={i} href={convocationHref(conv.slug)} data-card="" className={s.card} aria-label={`View details: ${place}`} draggable={false}>
                  <div className={s.frame} style={{ aspectRatio: ar, background: look.bg }}>
                    <div className={s.zoom}>
                      <Image
                        src={conv.img} alt={conv.alt} fill sizes="620px" draggable={false}
                        className={s.img} data-parallax={conv.post ? undefined : ''}
                        style={{ objectFit: look.fit, padding: look.pad }}
                      />
                    </div>
                    <span className={s.pill} aria-hidden="true">View story<span className={s.pillArrow}>→</span></span>
                  </div>
                  <span className={s.cap}><span>{place}</span><span className={s.year}>{year}</span></span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className={s.foot}>
          <span>Convocation 2026</span>
          <div className={s.barTrack}><div ref={barRef} className={s.bar} /></div>
          <span>Drag to explore</span>
        </div>
      </div>
    </section>
  );
}

function QuoteCard() {
  return (
    <figure className={s.quoteFig}>
      <blockquote className={s.quote}>
        <span className={s.qMark} aria-hidden="true">“</span>
        <p className={s.qText}>I didn’t tell anyone in my family I had enrolled. This post is how they found out I graduated.</p>
        <footer className={s.qFoot}><span className={s.qName}>Ramesh Iyer</span><span>Senior Manager, Tata Steel</span></footer>
      </blockquote>
      <figcaption className={s.qCap}><a href={LINKS.courseDetails} className={s.underline}>Course details ↗</a></figcaption>
    </figure>
  );
}

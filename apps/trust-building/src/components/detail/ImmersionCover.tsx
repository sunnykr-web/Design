import Image from 'next/image';
import type { CSSProperties } from 'react';
import poster from '@/assets/ftgu-poster.webp';
import type { Immersion } from '@/lib/data/immersions';
import { cx } from '../ui';
import s from './ImmersionCover.module.css';

/** The city's Luma event card: title, RSVP and the From the Ground Up poster. Fills its positioned parent. */
export function ImmersionCover({ u, className, style }: { u: Immersion; className?: string; style?: CSSProperties }) {
  return (
    <div role="img" aria-label={u.alt} className={cx(s.cover, className)} style={style}>
      <span className={s.luma} aria-hidden="true">luma<span className={s.spark}>✦</span></span>
      <p className={s.title} aria-hidden="true">{u.title}</p>
      <span className={s.rsvp} aria-hidden="true">RSVP</span>
      <div className={s.poster}>
        <Image src={poster} alt="" fill sizes="(max-width: 900px) 45vw, 25vw" className={s.posterImg} />
      </div>
    </div>
  );
}

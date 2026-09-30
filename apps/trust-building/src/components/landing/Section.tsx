import type { ReactNode } from 'react';
import { Eyebrow, Lines, cx } from '../ui';
import s from './Section.module.css';

/** Numbered section title: eyebrow, big serif H2 and a serif sub-line with an italic accent. */
export function SectionTitle({ num, title, sub, accent, dark, id }: {
  num: string; title: string; sub: string; accent: string; dark?: boolean; id?: string;
}) {
  return (
    <div data-lines="" className={cx(s.title, dark && s.dark)}>
      <Eyebrow size="lg" color={dark ? 'rgba(255,255,255,.82)' : 'var(--red-deep)'}>{num}</Eyebrow>
      <h2 id={id} className={s.h2}><Lines tall lines={[{ text: title }]} /></h2>
      <p className={s.sub}>
        <Lines tall start={1} lines={[{ text: <>{sub} <span className={s.subAccent}>{accent}</span></> }]} />
      </p>
    </div>
  );
}

export function SectionHead({ side, className, ...title }: Parameters<typeof SectionTitle>[0] & { side: string; className?: string }) {
  return (
    <div className={cx(s.head, className)}>
      <SectionTitle {...title} />
      <p data-rv="" className={s.side}>{side}</p>
    </div>
  );
}

/** Smaller H3 row that introduces a rail of cards. */
export function RowHead({ title, side, className, sideColor, lineHeight }: {
  title: ReactNode; side: string; className?: string; sideColor?: string; lineHeight?: number;
}) {
  return (
    <div className={cx(s.rowHead, className)}>
      <h3 data-lines="" className={s.h3} style={{ lineHeight }}>{title}</h3>
      <p data-rv="" className={s.rowSide} style={{ color: sideColor }}>{side}</p>
    </div>
  );
}

export { Lines };

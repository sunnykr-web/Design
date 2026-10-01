import Link from 'next/link';
import type { ReactNode } from 'react';
import { DetailHeader } from '../detail/DetailHeader';
import d from '../detail/Detail.module.css';
import { RevealObserver } from '../RevealObserver';
import { Eyebrow, Lines, cx } from '../ui';
import s from './Listing.module.css';

/** Cream page shell with the detail header, eyebrow, H1 and optional lede. */
export function ListingPage({ back, eyebrow, lines, lede, tight, children }: {
  back: string; eyebrow: string; lines: { text: string; italic?: boolean }[]; lede?: string; tight?: boolean; children: ReactNode;
}) {
  return (
    <div className={cx(s.page, d.light, 'detail')}>
      <DetailHeader backHref={back} backLabel="Back" />
      <main className={s.section}>
        <div className={cx(s.intro, tight && s.introTight)}>
          <div className={s.titleCol}>
            <Eyebrow reveal color="var(--red-deep)">{eyebrow}</Eyebrow>
            <h1 data-lines="" className={s.h1}>
              <Lines lines={lines.map(l => ({ text: l.text, style: l.italic ? { fontStyle: 'italic', color: 'var(--muted)' } : undefined }))} />
            </h1>
          </div>
          {lede && <p data-rv="" className={s.lede}>{lede}</p>}
        </div>
        {children}
      </main>
      <RevealObserver />
    </div>
  );
}

/** Grid card: image with a pill button, then meta, title and description. */
export function ListingCard({ href, media, pill, place, num, title, desc }: {
  href: string; media: ReactNode; pill: string; place: string; num: string; title: string; desc: string;
}) {
  return (
    <Link data-rv="" href={href} className={s.item}>
      {media}
      <span className={s.meta}><span>{place}</span><span className={s.num}>{num}</span></span>
      <span className={s.title}>{title}</span>
      <span className={s.desc}>{desc}</span>
      <span className="sr-only">{pill}</span>
    </Link>
  );
}

export function Pill({ label }: { label: string }) {
  return <span className={s.pill} aria-hidden="true">{label}<span className={s.pillArrow}>→</span></span>;
}

export { s as listingStyles };

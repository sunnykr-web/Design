import type { Metadata } from 'next';
import { CoverImage } from '@/components/detail/CoverImage';
import { ListingCard, ListingPage, Pill, listingStyles as s } from '@/components/pages/ListingParts';
import { IMMERSIONS, immersionHref } from '@/lib/data/immersions';

export const metadata: Metadata = { title: 'Immersion events · upGrad' };

export default function ImmersionEvents() {
  return (
    <ListingPage back="/#p5-imm" eyebrow="Immersion · All events" lines={[{ text: 'Immersion' }]}>
      <div className={s.grid}>
        {IMMERSIONS.map((u, k) => (
          <ListingCard
            key={u.slug}
            href={immersionHref(u.slug)}
            pill="View event"
            place={u.place}
            num={String(k + 1).padStart(2, '0')}
            title={u.title}
            desc={u.desc}
            media={
              <div className={s.media} style={{ aspectRatio: '800/420', background: 'var(--warm-grey)' }}>
                <CoverImage u={u} lazy className={s.pic} />
                <Pill label="View event" />
              </div>
            }
          />
        ))}
      </div>
    </ListingPage>
  );
}

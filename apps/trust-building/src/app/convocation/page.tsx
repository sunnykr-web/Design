import type { Metadata } from 'next';
import Image from 'next/image';
import { ListingCard, ListingPage, Pill, listingStyles as s } from '@/components/pages/ListingParts';
import { CONVOCATIONS, convLook, convocationHref } from '@/lib/data/convocations';

export const metadata: Metadata = { title: 'Convocation stories · upGrad' };

export default function ConvocationStories() {
  return (
    <ListingPage
      back="/#p5-conv"
      eyebrow="Convocation · All stories"
      lines={[{ text: 'Months on screen.' }, { text: 'One day on stage.', italic: true }]}
      lede="Trade your virtual classroom for the campus grounds as you finally meet the peers you’ve studied alongside for months."
    >
      <div className={s.grid}>
        {CONVOCATIONS.map((c, k) => {
          const look = convLook(c);
          return (
            <ListingCard
              key={c.slug}
              href={convocationHref(c.slug)}
              pill="View story"
              place={c.place}
              num={String(k + 1).padStart(2, '0')}
              title={c.title}
              desc={c.desc}
              media={
                <div className={s.media} style={{ aspectRatio: '4/3', background: look.bg }}>
                  <Image src={c.img} alt={c.alt} fill sizes="(max-width: 700px) 100vw, 33vw" className={s.pic} style={{ objectFit: look.fit, objectPosition: look.pos, padding: look.pad }} />
                  <Pill label="View story" />
                </div>
              }
            />
          );
        })}
      </div>
    </ListingPage>
  );
}

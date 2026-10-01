'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ABROAD_STORIES_MIXED, type AbroadStory } from '@/lib/data/posts';
import { LiPostCard } from './LiPostCard';
import s from './Listing.module.css';

const FILTERS = ['All', 'Videos', 'LinkedIn posts'] as const;
const pick = (f: (typeof FILTERS)[number]): AbroadStory[] =>
  f === 'Videos' ? ABROAD_STORIES_MIXED.filter(x => x.kind === 'video')
  : f === 'LinkedIn posts' ? ABROAD_STORIES_MIXED.filter(x => x.kind === 'post')
  : ABROAD_STORIES_MIXED;

/** Study-abroad videos and posts with All / Videos / LinkedIn posts filters. */
export function AbroadFeed() {
  const [f, setF] = useState<(typeof FILTERS)[number]>('All');
  return (
    <>
      <div role="tablist" aria-label="Filter stories" className={s.tabs}>
        {FILTERS.map(label => (
          <button key={label} type="button" role="tab" aria-selected={label === f} className={s.tab} onClick={() => setF(label)}>
            {label}<span className={s.count}>{pick(label).length}</span>
          </button>
        ))}
      </div>
      <div className={s.masonry4}>
        {pick(f).map((it, k) =>
          it.kind === 'post' ? (
            <LiPostCard key={'p' + k + it.post.name} post={it.post} photoPos="center 30%" />
          ) : (
            <div key={'v' + k + it.video.alt} data-rv="" className={s.video}>
              <div className={s.videoMedia}>
                <Image src={it.video.src} alt={it.video.alt} fill sizes="(max-width: 700px) 100vw, 25vw" className={s.pic} style={{ objectFit: 'cover' }} />
                <span className={s.videoTag}>Video</span>
                <span className={s.play} aria-hidden="true">▶</span>
              </div>
              <span className={s.videoDesc}>{it.video.desc}</span>
            </div>
          ),
        )}
      </div>
    </>
  );
}

'use client';

import { useState } from 'react';
import { ALL_POSTS, POST_FILTERS } from '@/lib/data/posts';
import { LiPostCard } from './LiPostCard';
import s from './Listing.module.css';

/** Filterable masonry of every LinkedIn post. */
export function PostsFeed() {
  const [f, setF] = useState<(typeof POST_FILTERS)[number]>('All');
  const posts = f === 'All' ? ALL_POSTS : ALL_POSTS.filter(p => p.tag === f);
  return (
    <>
      <div role="tablist" aria-label="Filter posts" className={s.tabs}>
        {POST_FILTERS.map(label => (
          <button key={label} type="button" role="tab" aria-selected={label === f} className={s.tab} onClick={() => setF(label)}>{label}</button>
        ))}
      </div>
      <div className={s.masonry3}>
        {posts.map(p => <LiPostCard key={p.name + p.text.slice(0, 12)} post={p} variant="feed" />)}
      </div>
    </>
  );
}

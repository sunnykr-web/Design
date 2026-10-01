import Image from 'next/image';
import type { LiPost } from '@/lib/data/posts';
import { initials } from '@/lib/data/landing';
import { LinkedInBadge, cx } from '../ui';
import s from './LiPostCard.module.css';

/** A LinkedIn post. "compact" sits on detail pages; "feed" adds "· Edited" and the action row, as on the all-posts page. */
export function LiPostCard({ post, variant = 'compact', bordered, inGrid, photoPos }: {
  post: LiPost; variant?: 'compact' | 'feed'; bordered?: boolean; inGrid?: boolean; photoPos?: string;
}) {
  const feed = variant === 'feed';
  return (
    <article data-rv="" className={cx(s.card, feed && s.feed, bordered && s.bordered, inGrid && s.inGrid)}>
      <header className={s.head}>
        <span className={s.av}>
          {initials(post.name)}
          {post.av && <Image src={post.av} alt={post.name} width={44} height={44} className={s.avImg} />}
        </span>
        <span className={s.who}>
          <span className={s.name}>{post.name}</span>
          <span className={s.role}>{post.role}</span>
          <span className={s.date}>{post.date}{feed && ' · Edited'}</span>
        </span>
        <span className={s.badge}><LinkedInBadge size={22} /></span>
      </header>
      <p className={s.text}>{post.text}</p>
      {post.photo && (
        <div className={s.photo}>
          <Image src={post.photo} alt={`Photo shared by ${post.name}`} fill sizes="(max-width: 700px) 100vw, 33vw" className={s.photoImg} style={{ objectPosition: photoPos }} />
        </div>
      )}
      <div className={s.stats}>
        <span className={s.reacts}>
          <span className={s.dots} aria-hidden="true"><span style={{ background: '#378FE9' }} /><span style={{ background: '#DF704D' }} /><span style={{ background: '#6DAE4F' }} /></span>
          {post.likes}
        </span>
        <span>{post.comments}</span>
      </div>
      {feed && <div className={s.actions} aria-hidden="true"><span>Like</span><span>Comment</span><span>Repost</span><span>Send</span></div>}
    </article>
  );
}

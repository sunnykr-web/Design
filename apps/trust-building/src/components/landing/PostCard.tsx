import Image, { type StaticImageData } from 'next/image';
import { initials, type PostCardData } from '@/lib/data/landing';
import { LinkedInBadge, cx } from '../ui';
import s from './PostCard.module.css';

/** Compact LinkedIn post with a photo and a "View story" button. Put class "post-hover" on the wrapping link. */
export function PostCard({ post, img, alt, dark }: { post: PostCardData; img: StaticImageData; alt: string; dark?: boolean }) {
  return (
    <article className={cx(s.card, dark && s.dark)}>
      <header className={s.head}>
        <span className={s.av}>
          {initials(post.name)}
          {post.av && <Image src={post.av} alt="" width={34} height={34} className={s.avImg} draggable={false} />}
        </span>
        <span className={s.who}>
          <span className={s.name}>{post.name}</span>
          <span className={s.role}>{post.role} · {post.date}</span>
        </span>
        <LinkedInBadge size={20} />
      </header>
      <p className={s.text}>{post.text}</p>
      <div className={s.media}>
        <Image src={img} alt={alt} fill sizes="300px" className={s.pic} draggable={false} />
        <span className={s.btn} aria-hidden="true">View story<span className={s.btnArrow}>→</span></span>
      </div>
      <div className={s.stats}>
        <span className={s.reacts}>
          <span className={s.dots} aria-hidden="true"><span style={{ background: '#378FE9' }} /><span style={{ background: '#DF704D' }} /><span style={{ background: '#6DAE4F' }} /></span>
          {post.likes}
        </span>
        <span>{post.comments}</span>
      </div>
    </article>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { DetailHeader } from '@/components/detail/DetailHeader';
import s from '@/components/detail/Detail.module.css';
import { ImmersionCover } from '@/components/detail/ImmersionCover';
import { Grain } from '@/components/Grain';
import { RevealObserver } from '@/components/RevealObserver';
import { LiPostCard } from '@/components/pages/LiPostCard';
import { Eyebrow, Lines, cx } from '@/components/ui';
import { immersionPosts } from '@/lib/data/posts';
import { LINKS } from '@/lib/links';
import { IMMERSIONS, immersionHref } from '@/lib/data/immersions';

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => IMMERSIONS.map(c => ({ slug: c.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const u = IMMERSIONS.find(x => x.slug === slug) ?? IMMERSIONS[0];
  return { title: `${u.title} · upGrad`, description: u.desc };
}

const BACK = '/#p5-imm';

export default async function ImmersionDetail({ params }: Props) {
  const { slug } = await params;
  const u = IMMERSIONS.find(x => x.slug === slug);
  // Unknown slugs fall back to the first city.
  if (!u) redirect(immersionHref(IMMERSIONS[0].slug));
  const others = IMMERSIONS.filter(x => x !== u);

  return (
    <div className={cx(s.page, s.dark, 'detail')}>
      <Grain />
      <DetailHeader backHref={BACK} backLabel="All cities" />
      <main>
        <section className={s.hero}>
          <div className={s.heroGrid}>
            <div className={s.heroText}>
              <Eyebrow reveal wide pulse color="rgba(255,255,255,.86)">{u.place}</Eyebrow>
              <h1 data-lines="" className={s.h1}><Lines lines={[{ text: u.title }]} /></h1>
              <p data-rv="" className={s.desc}>{u.desc}</p>
              <div data-rv="" className={s.btns}>
                <a href={u.url} target="_blank" rel="noopener" className={s.primary}>
                  Request to join<span className={s.primaryArrow} aria-hidden="true">→</span>
                  <span className="sr-only"> (opens Luma in a new tab)</span>
                </a>
                <Link href={BACK} className={s.outline}>Other cities</Link>
              </div>
            </div>
            <div data-rv="" style={{ position: 'relative', aspectRatio: '40/21', borderRadius: 24, overflow: 'hidden', background: 'var(--card-dark)', boxShadow: '0 50px 90px -30px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.06)' }}>
              <ImmersionCover u={u} className={s.kb} style={{ ['--kb-from' as string]: 1.16 }} />
            </div>
          </div>
          {/* No event dates yet: Luma doesn't expose them. Add a date fact when available. */}
          <div className={s.facts}>
            {u.facts.map(f => (
              <div key={f.k} data-rv="" className={s.fact}>
                <span className={s.factK}>{f.k}</span>
                <span className={s.factV}>{f.v}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={s.panel} style={{ background: 'var(--cream)', color: 'var(--ink)' }}>
          <div className={s.twoCol}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <Eyebrow reveal color="var(--red-deep)">01 · Here’s what’s brewing</Eyebrow>
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', borderBottom: '1px solid var(--hairline)' }}>
                {u.brew.map(d => (
                  <li key={d.d} data-rv="" style={{ display: 'grid', gridTemplateColumns: '56px minmax(0,1fr)', alignItems: 'baseline', gap: 18, padding: '22px 0', borderTop: '1px solid var(--hairline)', color: 'var(--ink)' }}>
                    <span aria-hidden="true" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px,3vw,44px)', lineHeight: 0.9, letterSpacing: '-.03em', fontStyle: 'italic', color: 'var(--red-deep)' }}>{d.d}</span>
                    <span style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px,1.9vw,28px)', lineHeight: 1.2, textWrap: 'pretty' }}>{d.t}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <Eyebrow reveal color="var(--red-deep)">02 · About</Eyebrow>
                {u.about.map(p => (
                  <p key={p} data-rv="" className={s.serifP} style={{ fontSize: 'clamp(22px,1.9vw,28px)', lineHeight: 1.3 }}>{p}</p>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Eyebrow reveal color="var(--red-deep)">03 · Good to know</Eyebrow>
                <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', borderBottom: '1px solid var(--hairline)' }}>
                  {u.agenda.map(a => (
                    <div key={a.d} data-rv="" style={{ display: 'grid', gridTemplateColumns: '120px minmax(0,1fr)', gap: 16, padding: '16px 0', borderTop: '1px solid var(--hairline)', fontSize: 15 }}>
                      <dt style={{ fontWeight: 600, color: 'var(--red-deep)' }}>{a.d}</dt>
                      <dd style={{ margin: 0 }}>{a.t}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section className={cx(s.stacked, s.stackWhite)} style={{ zIndex: 3 }} aria-labelledby="li-title">
          <div className={s.liHead}>
            <div className={s.moreHead} style={{ marginBottom: 0 }}>
              <Eyebrow reveal color="var(--red-deep)">From LinkedIn</Eyebrow>
              <h2 id="li-title" data-lines="" className={s.h2}>
                <Lines lines={[{ text: 'What people said' }, { text: 'after the last one.', style: { fontStyle: 'italic', color: 'var(--muted)' } }]} />
              </h2>
            </div>
            <Link data-rv="" href={LINKS.allPosts} className={s.viewAll}>View all →</Link>
          </div>
          <div className={s.postGrid}>
            {immersionPosts(u.city).map(p => <LiPostCard key={p.name} post={p} bordered inGrid />)}
          </div>
        </section>

        <section className={s.more} style={{ zIndex: 4 }} aria-labelledby="more-title">
          <div className={s.moreHead}>
            <Eyebrow reveal color="rgba(243,238,230,.72)">Other cities</Eyebrow>
            <h2 id="more-title" data-lines="" className={s.h2}>
              <Lines lines={[{ text: 'Not your city?' }, { text: 'Try another one.', style: { fontStyle: 'italic', color: 'var(--red-bright)' } }]} />
            </h2>
          </div>
          <div className={s.grid} style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))' }}>
            {others.map(o => (
              <Link key={o.slug} data-rv="" href={immersionHref(o.slug)} className={s.card}>
                <div className={s.cardImg} style={{ aspectRatio: '40/21', background: 'var(--card-dark)' }}>
                  <ImmersionCover u={o} className={s.cardPic} />
                </div>
                <span className={s.cardMeta}><span>{o.place}</span><span className={s.cardArrow} aria-hidden="true">→</span></span>
                <span className={s.cardTitle}>{o.title}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <RevealObserver />
    </div>
  );
}

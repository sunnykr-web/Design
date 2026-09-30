import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { DetailHeader } from '@/components/detail/DetailHeader';
import s from '@/components/detail/Detail.module.css';
import { RevealObserver } from '@/components/RevealObserver';
import { Eyebrow, Lines, cx } from '@/components/ui';
import { CONVOCATIONS, convLook, convocationHref } from '@/lib/data/convocations';

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => CONVOCATIONS.map(c => ({ slug: c.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = CONVOCATIONS.find(x => x.slug === slug) ?? CONVOCATIONS[0];
  return { title: `${c.title} · Convocation · upGrad`, description: c.desc };
}

const BACK = '/#p5-conv';

export default async function ConvocationDetail({ params }: Props) {
  const { slug } = await params;
  const i = CONVOCATIONS.findIndex(x => x.slug === slug);
  // Unknown slugs fall back to the first moment.
  if (i < 0) redirect(convocationHref(CONVOCATIONS[0].slug));
  const u = CONVOCATIONS[i];
  const look = convLook(u);
  const next = CONVOCATIONS[(i + 1) % CONVOCATIONS.length];
  const others = CONVOCATIONS.filter(x => x !== u);

  return (
    <div className={cx(s.page, s.light, 'detail')}>
      <DetailHeader backHref={BACK} backLabel="All moments" />
      <main>
        <section className={s.hero}>
          <div className={s.heroGrid}>
            <div className={s.heroText}>
              <Eyebrow reveal wide color="var(--red-deep)">Convocation · {u.place}</Eyebrow>
              <h1 data-lines="" className={s.h1}><Lines lines={[{ text: u.title }]} /></h1>
              <p data-rv="" className={s.desc}>{u.desc}</p>
              <div data-rv="" className={s.btns}>
                <Link href={convocationHref(next.slug)} className={s.primary}>Next moment<span className={s.primaryArrow} aria-hidden="true">→</span></Link>
                <Link href={BACK} className={s.outline}>Back to convocation</Link>
              </div>
            </div>
            <div data-rv="" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: 0 }}>
              {/* The photo keeps its natural aspect ratio. */}
              <div style={{ position: 'relative', maxWidth: '100%', borderRadius: 24, overflow: 'hidden', background: look.bg, boxShadow: 'var(--shadow-card)' }}>
                <Image
                  src={u.img} alt={u.alt} priority sizes="(max-width: 900px) 100vw, 50vw" className={s.kb}
                  style={{ display: 'block', width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: 'min(72vh,640px)', padding: look.pad }}
                />
              </div>
            </div>
          </div>
          <div className={s.facts}>
            {u.facts.map(([k, v]) => (
              <div key={k} data-rv="" className={s.fact}>
                <span className={s.factK}>{k}</span>
                <span className={s.factV}>{v}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={s.panel} style={{ background: '#FFFFFF' }}>
          <div className={s.twoCol}>
            <Eyebrow reveal color="var(--red-deep)">01 · The moment</Eyebrow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {u.about.map(p => (
                <p key={p} data-rv="" className={s.serifP} style={{ fontSize: 'clamp(24px,2.2vw,32px)', lineHeight: 1.28 }}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section className={s.more} aria-labelledby="more-title">
          <div className={s.moreHead}>
            <Eyebrow reveal color="rgba(243,238,230,.72)">02 · More from convocation</Eyebrow>
            <h2 id="more-title" data-lines="" className={s.h2}>
              <Lines lines={[{ text: 'Every graduate,' }, { text: 'on stage.', style: { fontStyle: 'italic', color: 'var(--red-bright)' } }]} />
            </h2>
          </div>
          <div className={s.grid} style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))' }}>
            {others.map(o => {
              const l = convLook(o);
              return (
                <Link key={o.slug} data-rv="" href={convocationHref(o.slug)} className={s.card}>
                  <div className={s.cardImg} style={{ aspectRatio: '670/436', background: l.bg }}>
                    <Image src={o.img} alt={o.alt} fill sizes="(max-width: 600px) 100vw, 33vw" className={s.cardPic} style={{ objectFit: l.fit, objectPosition: l.pos, padding: l.pad }} />
                  </div>
                  <span className={s.cardMeta}><span>{o.place}</span><span className={s.cardArrow} aria-hidden="true">→</span></span>
                  <span className={s.cardTitle}>{o.title}</span>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <RevealObserver />
    </div>
  );
}

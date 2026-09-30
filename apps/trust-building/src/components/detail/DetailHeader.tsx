import Link from 'next/link';
import { Logo } from '../ui';
import s from './Detail.module.css';

export function DetailHeader({ backHref, backLabel }: { backHref: string; backLabel: string }) {
  return (
    <header className={s.header}>
      <Link href="/" aria-label="upGrad, back to the main page"><Logo /></Link>
      <Link href={backHref} className={s.back}>← {backLabel}</Link>
    </header>
  );
}

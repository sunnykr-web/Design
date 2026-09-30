import type { CSSProperties, ReactNode } from 'react';
import s from './ui.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

export function Eyebrow({ children, color, size, wide, pulse, className, reveal }: {
  children: ReactNode; color?: string; size?: 'lg'; wide?: boolean; pulse?: boolean; className?: string; reveal?: boolean;
}) {
  return (
    <span className={cx(s.eyebrow, size === 'lg' && s.lg, wide && s.wide, className)} style={{ color }} data-rv={reveal ? '' : undefined}>
      <span className={cx(s.dot, pulse && s.pulse)} />
      {children}
    </span>
  );
}

/** Headline lines that slide up out of an overflow mask. Pair with data-lines on the heading. */
export function Lines({ lines, tall, start = 0 }: { lines: { text: ReactNode; style?: CSSProperties }[]; tall?: boolean; start?: number }) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={i} className={cx(s.mask, tall && s.tall)}>
          <span data-ln="" className={s.line} style={{ ...l.style, ['--i' as string]: start + i }}>{l.text}</span>
        </span>
      ))}
    </>
  );
}

export function Logo({ className }: { className?: string }) {
  // Replace with the real upGrad logo asset.
  return <span className={cx(s.logo, className)}>upGrad</span>;
}

export function LinkedInBadge({ size }: { size: number }) {
  return <span className={s.li} style={{ width: size, height: size, fontSize: Math.round(size * 0.54) }} aria-hidden="true">in</span>;
}

export { cx };

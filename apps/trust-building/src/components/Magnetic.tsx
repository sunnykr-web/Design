'use client';

import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

type Mag = HTMLElement & { __mx?: number; __my?: number };

/** Elements with data-mag drift slightly toward a mouse cursor hovering them. */
export function Magnetic() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cur: Mag | null = null;
    const release = (el: Mag) => { el.style.translate = '0 0'; el.__mx = 0; el.__my = 0; };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const mg = (e.target as Element | null)?.closest?.<Mag>('[data-mag]') ?? null;
      if (cur && cur !== mg) release(cur);
      cur = mg;
      if (!mg) return;
      const r = mg.getBoundingClientRect();
      const cx = r.left + r.width / 2 - (mg.__mx || 0);
      const cy = r.top + r.height / 2 - (mg.__my || 0);
      mg.__mx = (e.clientX - cx) * 0.3;
      mg.__my = (e.clientY - cy) * 0.4;
      mg.style.translate = `${mg.__mx.toFixed(1)}px ${mg.__my.toFixed(1)}px`;
    };
    const leave = () => { if (cur) release(cur); cur = null; };
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, []);
  return null;
}

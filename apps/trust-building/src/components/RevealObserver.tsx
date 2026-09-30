'use client';

import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

const SELECTOR = '[data-lines]:not([data-lines="hero"]),[data-rv],[data-ir]';

/** Adds .in to reveal targets as they scroll into view (see the Reveals block in globals.css). */
export function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(SELECTOR);
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

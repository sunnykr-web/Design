'use client';

import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

const SELECTOR = '[data-lines]:not([data-lines="hero"]),[data-rv],[data-ir]';

/**
 * Adds .in to reveal targets as they scroll into view (see the Reveals block in globals.css).
 * Also picks up targets added later, e.g. cards shown by a filter.
 */
export function RevealObserver() {
  useEffect(() => {
    const instant = prefersReducedMotion() || !('IntersectionObserver' in window);
    const io = instant ? null : new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io!.unobserve(e.target);
    }), { rootMargin: '0px 0px -8% 0px' });
    const watch = (el: Element) => {
      if (el.classList.contains('in')) return;
      if (io) io.observe(el); else el.classList.add('in');
    };
    document.querySelectorAll(SELECTOR).forEach(watch);
    const mo = new MutationObserver(records => records.forEach(r => r.addedNodes.forEach(n => {
      if (!(n instanceof Element)) return;
      if (n.matches(SELECTOR)) watch(n);
      n.querySelectorAll(SELECTOR).forEach(watch);
    })));
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io?.disconnect(); mo.disconnect(); };
  }, []);
  return null;
}

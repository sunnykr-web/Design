'use client';

import { useEffect, type RefObject } from 'react';
import { onFrame } from './motion';

/**
 * Mouse drag-to-scroll with momentum for a horizontal overflow rail.
 * Touch and trackpads keep native scrolling. A drag never triggers a click.
 */
export function useDragRail(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = { down: false, x: 0, l: 0, v: 0, lx: 0, moved: 0 };
    const down = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      Object.assign(r, { down: true, x: e.clientX, lx: e.clientX, l: el.scrollLeft, v: 0, moved: 0 });
      el.style.cursor = 'grabbing';
    };
    const move = (e: PointerEvent) => {
      if (!r.down) return;
      const dx = e.clientX - r.x;
      r.moved = Math.max(r.moved, Math.abs(dx));
      el.scrollLeft = r.l - dx;
      r.v = (e.clientX - r.lx) * 0.9;
      r.lx = e.clientX;
    };
    const up = () => { if (!r.down) return; r.down = false; el.style.cursor = ''; };
    const click = (e: MouseEvent) => { if (r.moved > 6) { e.preventDefault(); e.stopPropagation(); } r.moved = 0; };
    const dragstart = (e: DragEvent) => e.preventDefault();
    el.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    el.addEventListener('click', click, true);
    el.addEventListener('dragstart', dragstart);
    const offFrame = onFrame(({ k }) => {
      if (!r.down && Math.abs(r.v) > 0.15) { el.scrollLeft -= r.v * k; r.v *= Math.pow(0.93, k); }
    });
    return () => {
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      el.removeEventListener('click', click, true);
      el.removeEventListener('dragstart', dragstart);
      offFrame();
    };
  }, [ref]);
}

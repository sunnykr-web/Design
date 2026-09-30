'use client';

/**
 * One shared requestAnimationFrame loop for every scroll- and pointer-driven effect,
 * ported from the prototype's `frame()` so all sections read the same smoothed values.
 */

export const EASE = 'cubic-bezier(.16,1,.3,1)';

export type FrameState = {
  /** Milliseconds since the last frame (capped at 64). */
  dt: number;
  /** dt normalised to a 60fps frame; multiply easing factors by this. */
  k: number;
  /** Raw scrollY. */
  y: number;
  /** Smoothed scrollY (lerps toward y). */
  sy: number;
  /** Smoothed scroll velocity in px per frame. */
  vel: number;
  vw: number;
  vh: number;
  /** Last pointer position; -200 until the pointer moves. */
  mx: number;
  my: number;
  reduced: boolean;
  fine: boolean;
};

type Sub = (s: FrameState) => void;

const subs = new Set<Sub>();
const measureSubs = new Set<() => void>();
let last = 0;
let started = false;
const S: FrameState = { dt: 16.67, k: 1, y: 0, sy: 0, vel: 0, vw: 0, vh: 0, mx: -200, my: -200, reduced: false, fine: false };
let ly = 0;

export const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/** Writes a style property only when it changed, to keep per-frame DOM writes cheap. */
export function setStyle(el: HTMLElement | null | undefined, prop: string, value: string) {
  if (!el) return;
  const cache = ((el as unknown as { __c?: Record<string, string> }).__c ??= {});
  if (cache[prop] === value) return;
  cache[prop] = value;
  el.style.setProperty(prop, value);
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function start() {
  if (started) return;
  started = true;
  S.reduced = prefersReducedMotion();
  S.fine = window.matchMedia('(pointer: fine)').matches;
  S.y = S.sy = ly = window.scrollY;
  window.addEventListener('pointermove', e => { S.mx = e.clientX; S.my = e.clientY; }, { passive: true });
  const remeasure = () => measureSubs.forEach(f => f());
  window.addEventListener('resize', remeasure);
  window.addEventListener('load', remeasure);
  if ('ResizeObserver' in window) new ResizeObserver(remeasure).observe(document.body);
  document.fonts?.ready.then(remeasure);
  last = performance.now();
  const loop = (now: number) => {
    requestAnimationFrame(loop);
    if (!subs.size) return;
    S.dt = Math.min(64, now - last);
    last = now;
    S.k = S.dt / 16.67;
    S.y = window.scrollY;
    S.vw = window.innerWidth;
    S.vh = window.innerHeight;
    S.sy = S.reduced ? S.y : S.sy + (S.y - S.sy) * Math.min(1, 0.1 * S.k);
    if (Math.abs(S.y - S.sy) < 0.1) S.sy = S.y;
    S.vel += (S.y - ly - S.vel) * 0.12;
    ly = S.y;
    subs.forEach(f => f(S));
  };
  requestAnimationFrame(loop);
}

/** Runs `fn` every animation frame until the returned function is called. */
export function onFrame(fn: Sub) {
  start();
  subs.add(fn);
  return () => { subs.delete(fn); };
}

/** Runs `fn` now and whenever layout may have changed (resize, load, fonts, body size). */
export function onMeasure(fn: () => void) {
  start();
  measureSubs.add(fn);
  fn();
  return () => { measureSubs.delete(fn); };
}

export function frameState() {
  start();
  return S;
}

/** Page-relative top and height of an element. */
export function pageRect(el: Element) {
  const r = el.getBoundingClientRect();
  return { top: r.top + window.scrollY, h: r.height };
}

export function smoothScrollTo(top: number) {
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) smoothScrollTo(pageRect(el).top);
}

/* ---------- Intro: fired when the preloader lifts ---------- */
let introDone = false;
const introSubs = new Set<() => void>();
export function startIntro() {
  if (introDone) return;
  introDone = true;
  document.documentElement.classList.add('intro');
  introSubs.forEach(f => f());
}
export const isIntroDone = () => introDone;
export function onIntro(fn: () => void) {
  if (introDone) { fn(); return () => {}; }
  introSubs.add(fn);
  return () => { introSubs.delete(fn); };
}

// Hash routes for the preview: #convocation-<slug>, #immersion-<slug>; anything else is the landing page.
export type Route = { page: 'home' } | { page: 'convocation' | 'immersion'; slug: string };

export function parse(hash: string): Route {
  const m = /^#(convocation|immersion)-(.+)$/.exec(hash);
  return m ? { page: m[1] as 'convocation' | 'immersion', slug: m[2] } : { page: 'home' };
}

/** App paths (/convocation/x, /#p5-conv, /) → preview hrefs. */
export function toHash(href: string) {
  const m = /^\/(convocation|immersion)\/([^/#?]+)/.exec(href);
  if (m) return `#${m[1]}-${m[2]}`;
  if (href.startsWith('/#')) return href.slice(1);
  if (href === '/') return '#top';
  return href;
}

export function navigate(href: string) {
  const h = toHash(href);
  const anchor = parse(h).page === 'home' && h.startsWith('#') ? h.slice(1) : '';
  history.pushState(null, '', h);
  window.dispatchEvent(new CustomEvent('preview:navigate', { detail: anchor }));
}

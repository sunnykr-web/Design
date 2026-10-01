// Hash routes for the preview: #convocation-<slug>, #immersion-<slug>, and the listing pages
// #convocation, #immersion, #posts, #study-abroad. Anything else is the landing page.
export const LISTINGS = ['convocation', 'immersion', 'posts', 'study-abroad'] as const;
export type Listing = (typeof LISTINGS)[number];
export type Route =
  | { page: 'home' }
  | { page: 'convocation' | 'immersion'; slug: string }
  | { page: 'list'; list: Listing };

export function parse(hash: string): Route {
  const m = /^#(convocation|immersion)-(.+)$/.exec(hash);
  if (m) return { page: m[1] as 'convocation' | 'immersion', slug: m[2] };
  const l = hash.slice(1) as Listing;
  if ((LISTINGS as readonly string[]).includes(l)) return { page: 'list', list: l };
  return { page: 'home' };
}

/** App paths (/convocation/x, /posts, /#p5-conv, /) → preview hrefs. */
export function toHash(href: string) {
  const m = /^\/(convocation|immersion)\/([^/#?]+)/.exec(href);
  if (m) return `#${m[1]}-${m[2]}`;
  const l = /^\/([a-z-]+)\/?$/.exec(href);
  if (l && (LISTINGS as readonly string[]).includes(l[1])) return `#${l[1]}`;
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

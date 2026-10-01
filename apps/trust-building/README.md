# Trust Building landing page (V6)

A Next.js build of the handoff in [`handoffs/trust-building-v6`](../../handoffs/trust-building-v6/README.md): the long-scroll landing page plus the Convocation Detail and Immersion Detail templates.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck  # needs one `dev` or `build` first, which generates next-env.d.ts
npm run export     # static Next.js site in out/
npm run preview    # single self-contained page in preview/ (hash routes), for sharing as an artifact
```

## Routes

| Route | Page |
|---|---|
| `/` | Landing page. Section ids: `p5-hero`, `p5-man`, `p5-conv`, `p5-abroad`, `p5-imm`, `p5-words`, `p5-close` |
| `/convocation/[slug]` | Convocation Detail, one per moment (7, prerendered) |
| `/immersion/[slug]` | Immersion Detail for `chennai`, `chandigarh`, `ahmedabad` (prerendered) |
| `/convocation` | Convocation Stories: every moment |
| `/immersion` | Immersion Events: every city |
| `/study-abroad` | Study Abroad Stories: videos and posts, filterable |
| `/posts` | LinkedIn Posts: every post, filterable by topic |

These replace the prototype's `?c=` and `?u=` query strings. An unknown slug redirects to the first item, as the spec asks.

## Where things live

- `src/lib/data/`: all copy and content: `landing.ts`, `convocations.ts`, `immersions.ts`
- `src/lib/links.ts`: destinations the prototype left as `#` (Explore programmes, Read all posts, Course details)
- `src/lib/motion.ts`: one shared animation-frame loop (smoothed scroll, velocity, pointer) that every scroll-linked effect subscribes to, plus the preloader → hero intro signal
- `src/lib/useDragRail.ts`: mouse drag-to-scroll with momentum. A drag never fires a click.
- `src/components/RevealObserver.tsx` + the Reveals block in `src/app/globals.css`: `data-lines`, `data-rv`, `data-ir` and `data-hf` reveals. Start states only apply once `<html class="js">` is set, so the page renders without JS. `prefers-reduced-motion` turns all motion off and skips the preloader.
- `src/components/landing/*`: one component per section
- `src/assets/`: images, imported statically so `next/image` sizes and optimises them

## Before launch

- **Placeholder content.** The copy in `convocations.ts` (desc, facts, about) is placeholder. The hero post cards (David Chen, Apex Solutions, Nikita Menon, Aisha Okafor) are sample content, and so are the testimonial names and roles.
- **Links.** Fill in `src/lib/links.ts`.
- **Logo.** Swap the `upGrad` wordmark in `components/ui.tsx` (`Logo`) and the preloader for the real asset.
- **Event dates.** Immersion pages show no dates because Luma doesn't expose them. Add a fact when you have them.
- **Luma covers.** These load straight from `images.lumacdn.com` with a plain `<img>`. To optimise them, add the host to `images.remotePatterns` and switch to `next/image`.

## Where this differs from the prototype

The prototype (`Trust Building V6.dc.html`) and its README disagree in a few places. Here is what was built:

- **Hero TOC rows.** The README describes a 4-row table of contents with hover thumbnails. The V6 template renders that list empty, so it isn't built. Say if you want it back.
- **Custom cursor follower** (`#p5-cur`). It is `display:none` in V6, so it isn't built.
- **V1–V6 version switcher.** Prototype-only, dropped.
- **Immersion step arrows.** Built per the updated V6 file: an outline arrow that becomes a white "View event" pill on the active step.
- **LinkedIn Posts data.** The design reads its posts from `linkedin-posts.js`, which wasn't in the handoff. `/posts` shows the posts already used elsewhere in the design (`ALL_POSTS` in `src/lib/data/posts.ts`) until that file arrives.
- **Hover.** One rule everywhere (tokens in `globals.css`): cards lift 6px with a soft shadow and their image zooms 4%; filled buttons turn red (white on the red section); outline buttons and links change colour; arrows nudge 4px. The prototype's magnetic buttons, 3D card tilts, expanding "View story" pill and hover-only video captions were dropped.
- **"All cities" back link.** Goes to `/#p5-imm`. In the prototype it went to `#im-<city>`, which the landing page immediately redirected back to the detail page.
- **Mobile (< 900px).** The prototype wrapped the Immersion images below the pinned viewport, where they could never be seen. They now stack between the steps and the caption. The hero's "Read their posts" button no longer wraps on phones.
- **Accessibility.** Real links for cards and arrows instead of `role=button` spans nested in buttons. Carousel keyboard support is kept. The duplicated marquee copy is hidden from screen readers. Carousel dots have a 44px hit area.

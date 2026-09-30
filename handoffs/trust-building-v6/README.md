# Handoff: upGrad Trust Building Landing Page (V6)

## Overview
A long-scroll landing page for upGrad that builds trust through real, offline moments from learners: convocation on campus, study abroad, in-person immersion events ("From the Ground Up" coffee sessions in Chennai, Chandigarh, Ahmedabad) and unedited LinkedIn posts. It comes with two detail templates:
- **Convocation Detail**: one page per convocation photo/story.
- **Immersion Detail**: one page per city event, with a "Request to join" CTA that opens the Luma event.

## About the Design Files
The files in this bundle are **design references created in HTML**. They are prototypes that show the intended look and behaviour, not production code to copy. The task is to **recreate these designs in the target codebase's environment** (React/Next.js, Vue, etc.) using its established patterns. If there is no existing environment, pick an appropriate framework (Next.js + CSS modules or Tailwind is a sensible default).

The `.dc.html` files open directly in a browser (they load `support.js`, a small runtime). Each file has an HTML template with inline styles plus a `class Component` logic block at the bottom that computes values and handlers. Read the logic block for exact data, copy and state transitions.

## Fidelity
**High-fidelity.** Final colours, type, spacing, copy and motion. Recreate it pixel-accurately.

## Pages and sections

### 1. Trust Building V6 (`Trust Building V6.dc.html`)
The sections run top to bottom. Section ids are used as scroll targets.

| # | id | Section | Notes |
|---|----|---------|-------|
| 00 | `p5-hero` | Hero | Dark `#0E0C0B`, 100vh (min 900px). A cursor-following red radial glow (`#h6-glow`), a floating LinkedIn-post card collage (`h6Posts`) and a table-of-contents list with 4 rows (01 Convocation, 02 Study abroad, 03 Immersion, 04 Voices), each with a hover thumbnail. |
| 01 | `p5-man` | Manifesto | Large serif statement on dark. Lines reveal with a mask. |
| 02 | `p5-conv` | Convocation | Cream `#F3EEE6`, 32px top radius. Horizontal drag/scroll strip of photo cards plus one quote card. **Each photo card links to Convocation Detail** (`?c=<slug>`). A card has a corner pill button (light → red on hover, arrow −45° → 0°, "View story" label expands). |
| 03 | `p5-abroad` | Study abroad | A full-bleed panel with a parallax plane image (`sa-plane.png`) and a strip of 7 video-style cards (`sa-v0…6.png`) with a play badge. |
| 04 | `p5-imm` | Immersion | A sticky, scroll-driven stage 380vh tall with 3 steps (crossfading images, a progress fill). Each step has a **solid red arrow** that goes to `Immersion Detail.dc.html?u=<city>`. Step→city mapping: 01 Chennai, 02 Chandigarh, 03 Ahmedabad. Below it is a gallery of 5 immersion cards. |
| 05 | `p5-words` | In Their Own Words | Two infinite marquee rows of testimonial cards (rows go in opposite directions and pause on hover). |
| 06 | `p5-close` | Close / CTA | Red `#E4041C` background, centred, "Your turn" eyebrow, big serif headline, a magnetic pill CTA. |

Header: fixed, 68px. It's transparent over the hero and turns into `rgba(14,12,11,.72)` with a blur and a hairline once you scroll.

### 2. Immersion Detail (`Immersion Detail.dc.html?u=chennai|chandigarh|ahmedabad`)
The data comes from `immersions.js` (`window.IMM_DATA`) and mirrors each Luma event page.
- Hero: eyebrow (city · Food & Drink), serif title "From the Ground Up | {City}", description, the Luma cover image (`images.lumacdn.com`), a primary red CTA "Request to join" (opens `https://luma.com/{id}` in a new tab) and a row of 3 facts (Duration 2 hours / Where A café counter / Spots 20 only).
- About paragraphs, "What you'll do" 01–04 list, info rows (Registration, Location, Hosted by, Presented by).
- Other cities grid.
- **No event dates are shown** because Luma doesn't expose them. Add dates when they're available.

### 3. Convocation Detail (`Convocation Detail.dc.html?c=<slug>`)
The data comes from `convocations.js` (`window.CONV_DATA`). Slugs: `iit-bombay-stage, annual-convocation, degree-in-hand, iiit-bangalore, gunavardhan-dandi, whole-cohort, iit-bombay-2026`.
- Fixed header with the logo and "← All moments" (back to `#p5-conv`).
- Hero (a 2-column auto-fit grid, `minmax(min(100%,400px),1fr)`): eyebrow "Convocation · {place}", serif H1, description, a "Next moment →" red pill and a "Back to convocation" outline pill. On the right, the photo is shown at its **natural aspect ratio** (max-height `min(72vh,640px)`, radius 24px, layered shadow). The LinkedIn post (`post: true`) sits on `#DAD2C4` with 6% padding.
- 3 facts row (top border `#D9D1C4`, 11px uppercase label, serif value 28–42px).
- "01 · The moment": a white section with a 32px top radius holding serif paragraphs at 24–32px.
- "02 · More from convocation": dark section, "Every graduate, / *on stage.*" headline and a grid of the other moments (hover: lift −8px, image zoom 1.07, arrow slides 6px). The `degree-in-hand` thumbnail uses `object-position: center 30%`.
- ⚠ The description, fact and "about" copy in `convocations.js` is **placeholder** and needs real content.

## Interactions & Behaviour
- **Reveals**: elements with `data-rv` fade/rise in (`opacity 0→1, translateY 24px→0, blur 6px→0`, 1000ms). Headline lines with `data-ln` slide up out of an overflow mask (`translateY(110%) rotate(2deg)` → none, 1200ms, 110ms stagger). Both use IntersectionObserver with rootMargin `0 0 -8% 0`. Respect `prefers-reduced-motion`.
- **Standard easing**: `cubic-bezier(.16,1,.3,1)` everywhere. Hover transitions run .3–.7s and image zooms 1.4s.
- **Detail hero image**: Ken Burns scale 1.12→1 over 2200ms on load.
- **Convocation strip**: drag to scroll horizontally (hidden scrollbar). Scroll padding lets card shadows fade instead of clipping. A drag must not trigger a click. Cards are keyboard accessible (`role=button`, Enter/Space).
- **Immersion stage**: sticky 100vh. Scroll progress picks the active step (3 steps over 380vh). The active step's arrow is solid red with a glow. The arrow tilts toward the cursor on hover.
- **Hero TOC rows**: hovering a row reveals its thumbnail. Clicking smooth-scrolls to the section.
- **Magnetic CTAs** (`data-mag`) follow the cursor slightly.
- **Marquee**: continuous translateX loop that pauses on hover.

## State
- V6: hover map (per-card `on` flags), the active immersion step, the header `solid` flag (scrollY > threshold) and drag state for strips.
- Detail pages: the slug comes from the URL query (`u` / `c`). Fall back to the first item if it's unknown.

## Design Tokens
Colours:
- Ink `#0E0C0B` · Cream `#F3EEE6` · White `#FFFFFF`
- Brand red `#E4041C` · Deep red (eyebrows on light) `#B80317` · Bright red (on dark) `#FF3B4A`
- Body text on light `#4A453F` · Muted `#6A645C` · Hairline `#D9D1C4` · Warm grey `#2A2723` (image placeholders) · Post backdrop `#DAD2C4`
- Muted text on dark: `rgba(243,238,230,.62–.72)`

Typography (Google Fonts):
- Display: **Instrument Serif** 400 (plus italic for accent words). H1 is `clamp(48px,6vw,100px)` with line-height .92 and letter-spacing −.035em. H2 is `clamp(40px,4.6vw,72px)`.
- UI/body: **DM Sans** 400/500/600/700. Body is `clamp(15px,1.2vw,18px)` with line-height 1.6. Eyebrows are 12px, 600 weight, uppercase, tracking .24–.28em, and have a 6–7px red dot.
- Logo: the "upGrad" wordmark in DM Sans 700 at 23px, −.04em, `#E4041C`. Replace it with the real logo asset.

Spacing and shape:
- Section padding: `clamp(96px,13vh,150px)` vertical, `clamp(18px,6vw,96px)` horizontal.
- Radii: 999px for pills, 32px for section tops and large panels, 24px for hero media, 16px for cards, 10px for thumbnails.
- Card shadow: `0 2px 4px rgba(14,12,11,.06), 0 12px 24px -8px rgba(14,12,11,.14), 0 40px 72px -28px rgba(14,12,11,.32)`
- Hover shadow on dark: `0 40px 70px -30px rgba(0,0,0,.8)`
- Minimum hit target: 44px.

## Assets
Everything is in `assets/`:
- `conv-*.png`, `cv-card-sharp.png`: convocation photos and the LinkedIn post (Gunavardhan Dandi).
- `sa-plane.png`, `sa-v0…6.png`: study abroad.
- `cafe.png`, `im-*.png`, `im3-*.png`: immersion.
- `al3-*.png`: alumni events (Mixers, Career Crossroads).
- `avatars/a0…a8.png`, `showcase/…`: testimonial and post avatars and media. Some showcase entries (David Chen, Apex Solutions, etc.) are **sample content**. Replace them with real posts.
- The immersion covers load remotely from Luma's CDN (see `immersions.js`).

## Files
- `Trust Building V6.dc.html`: main landing page
- `Immersion Detail.dc.html` + `immersions.js`
- `Convocation Detail.dc.html` + `convocations.js`
- `support.js`: runtime needed only to open the prototypes in a browser (don't port it)

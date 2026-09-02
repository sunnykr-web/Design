# Wall of Voices — working prototype

`index.html` is the desktop page from Figma node
[`74:2293`](https://www.figma.com/design/13hMVjIUc9X1sKOfVHmSc1/Wall-of-Voices?node-id=74-2293),
built as a running page. Open the file directly in a browser — no build step, no
server, no network.

```
index.html                     the page
tokens/wov.css                 the token set (unchanged — mirrors "WOV Tokens" in Figma)
assets/css/fonts.css           @font-face for the four families the node specifies
assets/css/wov-prototype.css   everything else
assets/fonts/*.woff2           Fraunces, DM Sans, Work Sans, Inter (OFL, self-hosted)
assets/js/data.js              every string on the page, transcribed from the node
assets/js/app.js               card rendering, filtering, sorting, motion
```

## What came from where

Every section carries the Figma node id it was built from, as an HTML comment.

| Section | Node |
|---|---|
| Prototype banner | `74:2295` |
| Header | `74:2297` |
| Overture — eyebrow, H1, lede, card fan, PostCard | `74:2304`, `78:4600` |
| Ledger | `74:2329` |
| Act I ghost band | `74:2353`, card anatomy from `74:2357` |
| Pull quote | `74:2926` |
| The turn | `74:2933` |
| Controls | `74:2935` |
| Archive grid | `74:2959`, card anatomy from `74:2960` |
| Method note | `74:3897` |
| CTA | `74:3919` |
| Surface label | `74:3928` |
| Homepage band | `74:3930` |
| Footer | `74:4326` |

Section heights against the node, at 1512px: banner 37/37 · header 65/65 ·
hero 658/659 · ledger 250/248 · Act I band 651/651 · controls 100/100 ·
CTA 282/281 · surface label 52/51 · homepage band 411/409 · footer 85/85.
Fourteen of the fifteen archive cards render at exactly their Figma height
(235, 256, 276, 296, 441, 461, 481 …); the fifteenth (Lakshmi Reddy) is 522
against 583, because that node's stats row carries 61px the other fourteen
do not — an import artefact, not a layout rule.

## Deliberate departures

1. **Images are the design's own placeholder, everywhere.** The node's photo
   slots are a mix of raster screenshots and the designed placeholder — a
   `167.18°` grey-violet gradient captioned `PHOTO · FROM THE POST`. The raster
   exports live on `figma.com`, which this environment's egress policy blocks,
   so every photo slot uses the designed placeholder. It is the design's own
   treatment, at the design's own geometry (full card width, 1.6:1). Swapping in
   real images is a `background-image` on `.wov-post__media`.
2. **Avatars are initials on `--wov-halo`.** Same reason, and it is the card's
   designed no-avatar state (spec §5.1, state 5). One node avatar carried a
   raster; the rest were already initials.
3. **LinkedIn chrome is redrawn as inline SVG** — the globe, the three reaction
   discs, and the Like / Comment / Repost / Send glyphs. Same reason again.
   Colours and sizes are the node's: `#378fe9`, `#df704d`, `#6dae4f`, 18px discs
   with a 2px white ring; 17px action glyphs at `rgba(0,0,0,.6)`.
4. **`140 posts` is the resting count**, exactly as drawn, while the archive
   holds the fifteen cards the node draws. Filtering or searching switches the
   line to `N of 140 posts`, so the number is never wrong about what is on
   screen.
5. **The Act I band and the hero fan are real cards, not rasters.** The node
   ghosts them behind a mask; the prototype ghosts live DOM the same way, which
   keeps the page self-contained and lets the cards stay selectable text.
6. **Fonts are self-hosted.** The node specifies Fraunces (display), DM Sans
   (body), Work Sans (UI) and Inter (the WOV PostCard); LinkedIn chrome keeps
   its Segoe UI system stack, as drawn. Serving them from `assets/fonts/` means
   the page renders identically with no network at all.

## What it does

- **Filter chips** are a real `role="tablist"` — arrow keys, `Home`/`End`,
  roving `tabindex`, and the count line is `aria-live="polite"` (spec §5.2, §9).
- **Search** debounces at 200ms over name, company and headline (spec §8).
- **Sort** — newest, oldest, most reactions.
- **Empty state** first: *"No posts match that yet."* plus three company names
  that do have posts, and a one-tap clear (spec §10).
- **Masonry** places each card in the shortest column, which is what the node's
  grid is; columns go 1 → 2 → 3 → 4 across 640 / 900 / 1200 / 1440.
- **Cards** are one link target to the permalink, `target="_blank" rel="noopener"`,
  hover moves the border to `--wov-rule-strong` in 160ms and nothing else moves,
  focus keeps a 2px accent ring at 2px offset (PostCard description, `22:1436`).
- **Controls bar** sticks and condenses to 56px over 200ms, reserving its height.
- **Counters** run once on first intersection over 1.2s, then stay put.
- **Marquee** loops in 28s and pauses on hover *and* focus-within.
- **Entrances** are opacity + `translateY(8px)`, never scale, staggered 40ms and
  capped at six (spec §7).
- **`prefers-reduced-motion`** kills the marquee, renders counters at their final
  value, shows entrances instantly and drops every transition to 1ms.
- Skip link to the archive; no horizontal scroll at 390, 900 or 1440.

## Still open

Everything in spec §12. The content here is sample data — the banner and the
footer both say so, as the design does. Nothing on this page is a cleared
learner record, and the accent red is still the `#E5202E` placeholder from
`tokens/wov.css` (the node's logo, H1 and CTA use `#EE2A3D`; both are kept
exactly as drawn until the upGrad DS token replaces them).

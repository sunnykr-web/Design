# Wall of Voices — Figma handoff

File: https://www.figma.com/design/13hMVjIUc9X1sKOfVHmSc1/Wall-of-Voices

## What is designed

| Deliverable | Where | Node |
|---|---|---|
| Desktop page, 1440, all nine sections | page `Landing Page (wip)` | `16:1789` |
| Mobile page, 390 | page `Landing Page (wip)` | `33:548` |
| Homepage band, 1440x420 | page `Landing Page (wip)` | `31:548` |
| PostCard component set, six states | page `Wall of Voices — Components` | `22:1436` |
| Empty / loading / error states sheet | page `Wall of Voices — Components` | `32:2` |
| Consent open questions (spec §12) | page `Wall of Voices — Components` | `32:36` |
| Token variables (`WOV Tokens`) | local variables | collection `21:2` |

## PostCard

Built from the LinkedIn post format supplied in the file (`1:2404`), retaining its anatomy:
avatar 40 -> name -> role + company -> date, body paragraphs, media, reaction pills and
comment count. Two deliberate departures:

1. **The LinkedIn action bar (Like / Comment / Repost / Send) is replaced by a single
   `Read on LinkedIn ↗` footer.** Those four controls do nothing off LinkedIn; the outbound
   link is the product. The social-stats row is kept because it is evidence, not chrome.
2. **No `...more`.** The body clamps at five lines with a 32px fade to the card surface,
   per spec §5.1.

Card width 392 (1240 container, three columns, 32 gutter). No shadows; 1px `--wov-rule`
hairline, `--wov-radius` 10. Hover, focus and touch-target rules are recorded in the
component description in Figma.

Variants: `Text only` · `With photo` · `With certificate` · `Truncated` · `No avatar` · `Loading`.

## Page order (desktop)

`nav` → `01 Overture` → `02 The claim` → `03 Ledger` → `04a Act I` → `04b Pull quote` →
`04c Act I continued` → `04d Pull quote` → `05 The turn` → `06a Controls (sticky)` →
`06b Act II archive` → `07 Interstitial` → `08 Method note` → `09 CTA` → `10 Footer`

Scroll arc: one → few → many → one. No grid renders above the fold.

## Known placeholders

- **Accent red is `#E5202E`, a stand-in.** Replace with the upGrad red token from the
  existing design system.
- **Display serif is Instrument Serif**, the free stand-in named in the spec. Swap for
  Freight Display / Tiempos Headline / GT Super when licensed.
- **Content is representative, not cleared.** Names, roles, employers and post text are
  written for layout. Real records replace them only after consent clearance.
- Two photo/avatar images are reused from the supplied LinkedIn card mock.

## Open before final design (spec §12)

Consent mechanism · removal route · LinkedIn ToS review · partner-university certificate
images · employer names. If avatars or employer names are cut, the PostCard changes
completely. Owner: Ashish (repository) + Legal.

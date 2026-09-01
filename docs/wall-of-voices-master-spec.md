# WALL OF VOICES — MASTER BUILD SPEC
upGrad · social proof surface
Light UI · Editorial direction · v1

> Single source of truth for design and build. If something contradicts this file, this file wins until it's updated here.

---

## 1. THE ONE-LINE BRIEF

A verifiable public record of unpaid, unedited LinkedIn posts by upGrad learners — designed so a sceptic can check it, a spouse can trust it, and a career-switcher can find someone exactly like themselves.

**Emotion to produce:** vindication, not excitement.
**Register:** annual report / broadsheet letters page. Not a landing page.
**Success test:** a visitor who assumed every testimonial is paid leaves believing these are not.

---

## 2. NON-NEGOTIABLES

1. **Light UI.** No dark theme anywhere, including the homepage band.
2. **Every card links to the live post.** Verifiability is the product.
3. **Five fields are mandatory on every card:** name, face, role + company, date, outbound link. A fake can't have all five.
4. **Red is punctuation, never paint.** No red backgrounds, no gradients.
5. **No drop shadows.** Hairlines only.
6. **Consent-gated.** No field ships until Legal confirms it (see §12).

---

## 3. DESIGN TOKENS

### 3.1 Colour

```css
:root {
  /* Ground */
  --wov-paper:        #FBF9F6;  /* page background — warm off-white */
  --wov-paper-raised: #FFFFFF;  /* card surface */
  --wov-halo:         #F2EDE6;  /* interstitial bands, quiet zoning */

  /* Ink */
  --wov-ink:          #16130F;  /* headlines, post body */
  --wov-ink-mid:      #46403A;  /* secondary body */
  --wov-ink-muted:    #6B635B;  /* metadata, dates, roles */

  /* Structure */
  --wov-rule:         #E6E0D8;  /* 1px borders, dividers */
  --wov-rule-strong:  #16130F;  /* hover border */

  /* Accent — upGrad red, use sparingly */
  --wov-accent:       <upGrad red from existing DS>;
  --wov-accent-soft:  <same at 8% over paper>;
}
```

**Accent is permitted in exactly five places.** The logo. One word in the H1. Link hover. The live-count dot. The primary CTA fill. Nowhere else.

**Contrast floors (WCAG AA):** body text ≥ 4.5:1 against its own surface. `--wov-ink-muted` on `--wov-paper-raised` must be verified at 12px+ — if it fails, use `--wov-ink-mid` for anything under 14px.

### 3.2 Typography

| Role | Family | Notes |
|---|---|---|
| Display | High-contrast serif — Freight Display / Tiempos Headline / GT Super. Free stand-in: Instrument Serif | H1 and pull-quotes **only** |
| UI + body | upGrad's existing sans (existing DS) | All metadata, buttons, chips, post body |

**Post body stays sans.** It's someone else's writing — setting it in your display serif puts words in their mouth.

```css
--wov-text-xs:   12px / 1.4    /* date, badge */
--wov-text-sm:   14px / 1.5    /* role, company */
--wov-text-base: 16px / 1.6    /* post body — never smaller */
--wov-text-lg:   20px / 1.5
--wov-quote:     clamp(28px, 3.4vw, 44px) / 1.25   /* serif, interstitials */
--wov-h1:        clamp(40px, 6vw, 76px) / 1.05     /* serif */
```

Measure: 68–72ch on pull quotes. Never wider.

### 3.3 Spacing & layout

```css
--wov-space-1: 4px;   --wov-space-2: 8px;   --wov-space-3: 12px;
--wov-space-4: 16px;  --wov-space-6: 24px;  --wov-space-8: 32px;
--wov-space-12: 48px; --wov-space-16: 64px; --wov-space-24: 96px;
--wov-space-32: 128px;  /* section gaps — spacious by default */

--wov-radius:   10px;   /* cards */
--wov-radius-full: 999px;  /* chips, avatars */
--wov-container: 1240px;
--wov-gutter-mobile: 20px;
```

Breakpoints: `640 / 900 / 1200 / 1440`. Mobile-first.
Grid columns: 1 → 2 → 3 → 4 (only above 1440).

---

## 4. DATA SCHEMA

Build-time static JSON. No runtime LinkedIn dependency.

```ts
type Post = {
  id: string;
  author: {
    name: string;
    headline: string;        // role — as written on LinkedIn
    company: string | null;
    avatarUrl: string | null;
  };
  body: string;              // plain text, emoji preserved
  postedAt: string;          // ISO date
  permalink: string;         // live LinkedIn URL — REQUIRED
  media: {
    type: 'photo' | 'certificate' | 'none';
    url: string | null;
    width: number; height: number;   // required, for CLS
  };
  reactions: number | null;
  category: 'convocation' | 'on-campus' | 'thank-you'
          | 'recommendation' | 'milestone';
  programme: string | null;
  featured: boolean;         // hand-picked for Act I
};
```

**Search index is separate and lean** — `{ id, name, company, headline }` only. Do not ship full post text to the client for search; at 6,400 records that's a multi-MB payload for a feature almost nobody uses on body text.

---

## 5. COMPONENTS

### 5.1 PostCard — the atom

Get this right and 80% of the page is done.

**Anatomy (top to bottom):** avatar 40px + name + role/company (left) · date (right) → body → media → footer link.

**Rules**
- Fixed max height. Body clamps at **5 lines**, then a 32px fade to `--wov-paper-raised`, then `Read on LinkedIn ↗`. Never a raw `...more`.
- 1px `--wov-rule` border, `--wov-radius`, **no shadow**.
- Media: single 16:9 crop, `object-fit: cover`, explicit width/height attributes.
- Certificates get reduced visual weight — 0.9 opacity, `--wov-halo` inset background. They're evidence, not hero imagery.
- Entire card is one link target to `permalink`, `target="_blank" rel="noopener"`.
- Hover: border → `--wov-rule-strong`, 160ms. Nothing else moves.
- Focus: 2px accent outline, 2px offset. **Never remove the focus ring.**
- Touch target minimum 44×44 on the footer link.

**Six required states — build all of them before styling anything else**
1. Text-only
2. With photo
3. With certificate
4. Long → truncated
5. No avatar (fallback: initials on `--wov-halo`)
6. Loading skeleton (reserves exact final height)

### 5.2 Chip / filter
Pill, 1px rule, transparent fill. Active: `--wov-ink` fill, paper text. 44px tall. `role="tab"` semantics, arrow-key navigable.

### 5.3 Counter
Number in serif, label in sans caps at 12px with 0.08em tracking. Animates once on first intersection, 1.2s ease-out, then static forever.

### 5.4 PullQuote
Full-width band on `--wov-halo`. Serif at `--wov-quote`, max 72ch, attribution beneath in sans. Used as interstitial every ~40 cards.

---

## 6. PAGE STRUCTURE

| # | Section | Contents | Job |
|---|---|---|---|
| 1 | **Overture** | H1 + one hero testimony + one number | The first 3 seconds |
| 2 | **The claim** | `UNPAID · UNEDITED · UNPROMPTED` + 2 lines | State the terms |
| 3 | **Ledger** | Reactions large; posts / learners / programmes small | Scale |
| 4 | **Act I — the edit** | ~15 `featured` posts, mixed sizes, 2 full-width quotes | Prove taste |
| 5 | **The turn** | One line: *"And another six thousand."* Controls appear + stick | Hand over control |
| 6 | **Act II — archive** | Virtualized grid, search, filters, sort, infinite scroll ×24 | Volume as argument |
| 7 | **Interstitials** | PullQuote every ~40 cards | Rest the eye |
| 8 | **Method note** | Collection, consent, removal request | The trust close — the sceptic reads this |
| 9 | **CTA** | One line, one button | Convert |

**Scroll arc: one → few → many → one.**

### 6.1 First three seconds (§1 detail)
- 0.0–0.8s: near-empty paper, one line arriving
- 0.8–1.8s: H1 resolves; below it a *single* testimony set large — not a card in a grid
- 1.8–3.0s: quietly, **6,404 more**. One number, not four.

**Do not render a grid above the fold.** A grid on load reads as content farm.

### 6.2 Homepage band (separate surface)
Full-bleed, ~420px. Eyebrow + one-line headline + slow single-row marquee of 12–16 cards + `See all 6,404 →`. **No filters, no search, no counters.** Must be built inside the **existing upGrad design system** — current tech constraints rule out the newer one. Self-contained component; no page-shell changes.

Placement: below the category grid, above the final CTA.

---

## 7. MOTION SYSTEM

```css
--wov-dur-micro: 160ms;   /* hover, focus, chip toggle */
--wov-dur-enter: 520ms;   /* entrances */
--wov-dur-exit:  364ms;   /* 0.7 × enter */
--wov-ease: cubic-bezier(0.22, 1, 0.36, 1);
```

- **Two durations only.** A third is a bug.
- Entrance = `opacity` + `translateY(8px)`. **Never scale.** Scaling text is the fastest way to look cheap.
- Stagger 40ms, capped at 6 items.
- Marquee: 28s per loop. Pauses on hover **and** focus-within.
- No parallax on text, ever. Interstitial background band only, ≤8% displacement.
- Sticky bar condenses to 56px over 200ms and **reserves its own height** — no layout shift.
- Animate only `transform` and `opacity`. Never `width`/`height`/`top`.

**Reduced motion (mandatory):**
```css
@media (prefers-reduced-motion: reduce) {
  /* entrances instant; marquee static + arrow controls;
     counters render final values; all transitions ≤ 1ms */
}
```

**Test:** screenshot any mid-animation frame — it should look like a finished layout.

---

## 8. TECH STACK

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js App Router, **statically generated** | 6,400 cards can't be a client fetch; SEO matters ("upGrad reviews") |
| Data | Build-time JSON from Ashish's sheet, committed as static asset | No runtime LinkedIn dependency or scraping liability |
| Virtualization | `@tanstack/react-virtual` or Virtuoso — archive grid only | 6,400 DOM nodes destroys INP on mid-range Android |
| Masonry | CSS `columns` + fixed card height | Avoids JS masonry reflow jank |
| Images | `next/image`, AVIF + WebP, blur placeholder, explicit dimensions | Certificates are the heaviest asset class |
| Search | Fuse.js over the lean index, 200ms debounce | Index only what people search |
| Motion | **Pick one.** Framer Motion (default) or GSAP ScrollTrigger | Shipping both is a common, expensive mistake |
| Homepage band | Existing upGrad DS, zero new dependencies | Tech constraint on current system |

**Performance budget — agree before designing, not after:**
LCP < 2.0s on 4G · CLS < 0.1 · INP < 200ms during archive scroll · initial JS < 180KB gzipped.

---

## 9. ACCESSIBILITY CHECKLIST

- [ ] All text ≥ 4.5:1 contrast on its own surface
- [ ] Every card reachable and activatable by keyboard; visible focus ring
- [ ] Filter chips as a proper tablist, arrow-key navigable
- [ ] `aria-live="polite"` on the result count when filters change
- [ ] All avatars and media have alt text; decorative rules `aria-hidden`
- [ ] Touch targets ≥ 44×44 with ≥ 8px spacing
- [ ] `prefers-reduced-motion` fully honoured
- [ ] Page usable at 200% zoom with no horizontal scroll
- [ ] Skip-link to the archive grid

---

## 10. EMPTY, LOADING & ERROR STATES

**Build these before the populated versions.** The prototype's blank "Convocation" result is exactly what happens otherwise.

| State | Treatment |
|---|---|
| Filter → no results | Centred, serif line: *"No posts match that yet."* + a one-tap "Clear filters" |
| Search → no results | Same, plus 3 suggested company names that do have posts |
| Loading | Skeleton cards at exact final height — never a spinner |
| Image fails | Card collapses to text-only cleanly; no broken-image icon |
| Data fetch fails | Act I still renders from static; archive shows a retry line |

---

## 11. CONTENT RULES

- Posts are **never edited**. Not for typos, not for length, not for tone. Truncation is display-only and the full text is one click away. This is the entire integrity claim.
- Act I selection must show **range**, not just the best outcomes: convocations, promotions, thank-yous, doctorates, campus immersions, and at least two that are quiet rather than triumphant.
- No engagement-bait framing. No "See what our happy learners say!" The copy register is flat and factual — the content does the persuading.
- Dates are shown always. A wall of undated posts looks staged.

---

## 12. BLOCKER — RESOLVE BEFORE FINAL DESIGN

The prototype header reads *"Internal prototype — learner consent pending."*

Public visibility on LinkedIn is **not** licence to republish on a commercial site. Under India's DPDP Act, name + photo + employer is personal data. Additionally, certificate images carry partner university marks.

**Get written answers on:**
1. Consent mechanism — opt-in, or notice + opt-out?
2. Removal request route (and it must appear in §8 Method note)
3. LinkedIn ToS review for republication
4. Whether partner-university certificate images can be shown
5. Whether employer names can be shown

**If avatars or employer names get cut, §5.1 changes completely.** Do not finalise the card until this is answered. Owner: likely Ashish (repository) + Legal.

---

## 13. BUILD ORDER

| Phase | Deliverable |
|---|---|
| **0** | Consent clearance (§12) — can kill or reshape the project |
| **1** | Data audit — 200 real records against §4. What % have images? Exceed 5 lines? Usable avatars? Design to the real distribution, not the happy path |
| **2** | PostCard, all six states (§5.1) |
| **3** | Overture + Ledger — the first three seconds |
| **4** | Act I — requires an editorial pass with Ashish's team to pick 15 |
| **5** | The turn + archive — **empty states first**, then virtualization |
| **6** | Interstitials, Method note, CTA |
| **7** | Homepage band — **last**. It's a compressed remix of a language you must establish first. Building the trailer before the film means redoing it |
| **8** | Four separate passes: motion · reduced-motion · accessibility · performance |

---

## 14. NEAR-TERM DELIVERABLE

For the first review with Deepesh:
1. Overture key visual, light, full fidelity
2. PostCard component sheet (six states)
3. Homepage band flat
4. One slide: §12 open questions

That's forwardable to Chirag, settles scope, and puts consent on the table before anyone falls in love with a design that can't ship.

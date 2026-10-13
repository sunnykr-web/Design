# Wall of Voices — social proof surface

Design lives in Figma: **Wall of Voices** — `13hMVjIUc9X1sKOfVHmSc1`.
This repo holds the spec of record and the token source that the build must match.

- `docs/wall-of-voices-master-spec.md` — the master build spec (single source of truth)
- `docs/figma-handoff.md` — what has been designed, where each node lives, and what is still open
- `tokens/wov.css` — the token set, mirroring the `WOV Tokens` variable collection in Figma

**Nothing ships until the consent questions in §12 of the spec are answered in writing.**

---

# UPI payment journey — checkout

Rebuild of the four desktop frames in Figma **payment-journey-redesign** (`lxtmz9bC4EPIvYj841j19c`, node `4:2581`).

- `upi-payment/index.html` — the checkout page; open it directly in a browser
- `upi-payment/checkout.css` / `checkout.js` — components and the step logic
- `upi-payment/assets/` — icons and images exported from the Figma frames
- `tokens/upgrad-ds.css` — Upgrad Design System tokens (spacing, radius, icon sizes, colour), mirroring the library's variables

Each frame has a deep link: `#select` (1:2), `#upi` (3:1102), `#upi-amount` (3:1400), `#review` (4:1735).
The flow also runs end to end: pick UPI, enter an amount between INR 1,000 and INR 65,000, press Next.

The frames use a navy/grey palette that the Upgrad DS library has no variables for; those values are named once as `--co-*` tokens in `checkout.css`.
The frames are set in Circular, which is licensed and not bundled here; the page falls back to Inter, so some lines wrap differently until Circular is loaded.

## V2 — improved UX

`upi-payment/v2/index.html` reworks the same flow; V1 stays the Figma-exact build. A switch in the bottom-left corner of both pages moves between them (`upi-payment/version-toggle.css` / `.js`).

- Plan, amount and method sit on one screen instead of the amount appearing only after a method is picked.
- Quick amounts (minimum, 10,000, half, full fee), Indian digit grouping as you type, and inline errors that say what is wrong instead of a silently disabled button.
- The summary shows the balance and its due date and carries the main button, which names the amount ("Continue to pay INR 1,027"); on phones it moves to a bottom bar.
- The pay step leads with the QR, a 10-minute expiry timer with "Get a new QR", short how-to steps and a waiting state; notes and consent move below, with a working "Read more".
- Responsive down to phone width, real radio inputs, visible focus and 44px+ targets.
- Visual finish follows the UI references sunny shared: light grey canvas, white cards with large radii and soft shadows, near-black for the strong elements (dark "Paying now" card, pill buttons, selected icon tiles), big figures with a light currency unit, a delivery-style progress tracker and a numbered timeline for the QR steps. Spacing, radius and icon sizes come from the Upgrad DS scale and the DS red stays the brand accent; neutrals with no DS variable are `--ck-*` tokens in `checkout-v2.css`.

Deep links: `#v2-select`, `#v2-amount`, `#v2-review`.

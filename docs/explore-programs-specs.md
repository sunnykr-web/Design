# Explore Programs — extracted Figma specification

Source: file `13hMVjIUc9X1sKOfVHmSc1` (Wall of Voices), node **`914:18698`**.
Build: `build/explore-programs/`. Every value below is read from the node, not estimated.

## Frames

| | |
|---|---|
| Artboard | 1512 x 846, fill `#FFFFFF` |
| Design canvas | 1775 x 753, at artboard `x -131, y 61` (centred, clipped by the artboard) |

All coordinates below are in **canvas space** (the 1775 x 753 frame).

## Type

| Element | Family | Weight | Size | Line height | Tracking | Colour |
|---|---|---|---|---|---|---|
| `One of the Post could be yours` | Fraunces | 400 | 48px | 71.4px | -0.68px | `#16130F` (`colour/ink`) |
| Subheading | DM Sans | 400 | 24px | normal | 0 (`letter-spacing/0`) | `#16130F` |
| `Explore Programs` | Work Sans | 600 | 15px | 24px | 0 | `#FFFFFF` (`colour/paper-raised`) |
| Card `CTA` pill | Fraunces | 600 | 15.319px | 24.51px | 3.6765px | `#16130F` |
| Card `TEXT HERE` | Fraunces | 600 | 37.202px | 24.51px | 3.6765px | `#FFFFFF` |

Fraunces runs with `font-variation-settings: "SOFT" 0, "WONK" 1`; DM Sans with `"opsz" 14`.

## Placement

| Element | x (centre) | y (top) | Size |
|---|---|---|---|
| Heading | 889.07 | 0 | 635 x 72 |
| Subheading | 904.50 | 81 | 1155 x 31 |
| CTA button | 886.996 | 151 | 217.242 x 52 |

The heading, subheading and button are each centred on a **different** axis in the
design (+1.57, +17.00 and -0.50 against the canvas midline of 887.5). This is
reproduced rather than corrected — see "Deviations from the design" below.

## CTA button

Fill `#EE2A3D` · radius `999px` (`radius/full`) · 217.242 x 52.

## Cards

Five identical cards, one shared image fill, **384.06 x 473.783**, corner radius **62.88px**.

| # | Unrotated top-left | Rotation | Blur | White veil | Extras |
|---|---|---|---|---|---|
| 1 | 111.602, 587.163 | -57.48° | 7px | 60% | CTA pill, `TEXT HERE` |
| 2 | 340.602, 336.165 | -30.20° | 1px | 20% | CTA pill |
| 3 | 687.602, 250.166 | 0° | — | — | 1px `#FFF` border, shadow `10px 24px 34px rgba(255,255,255,.25)` |
| 4 | 1031.024, 337.456 | +29.46° | 1px | 20% | — |
| 5 | 1281.825, 580.543 | +59.41° | 3.5px | 20% | CTA pill, `TEXT HERE` |

Card sub-elements (card-local coordinates):

- CTA pill — `31.73, 396.64`, 145.527 x 48.144, fill `#FFF`, 1.094px `#000` hairline, radius 32.826px, label inset 51.43px from the inner edge.
- `TEXT HERE` — `31.73, 356.16`.

## The shared axis

The five card centres sit on a common circle. Least-squares fit over all five:

- **Centre `(889.02, 1177.10)`** in canvas space — 690.0px directly below the centre card, i.e. 424px below the bottom of the canvas.
- **Radius 690.11px**, RMS residual **7.64px** (the arc was laid out by hand; cards 1 and 2 are the outliers at 10px and 12px).

The build keeps each card at its exact Figma position at rest and puts the orbit on
an outer seat element whose `transform-origin` is offset per card so all five
resolve to that one point. Rotation angle 0 is therefore the design frame exactly,
and any non-zero angle swings the whole fan around the shared axis.

## Deviations from the design

1. **Five cards, not three.** The brief described three images; node `914:18698`
   contains five (`914:19866`, `19870`, `19871`, `19875`, `19878`). The build
   follows the node.
2. **The photograph is a placeholder.** `www.figma.com` is blocked by the egress
   policy on the build runner, so the image fill could not be fetched. See
   `build/explore-programs/assets/README.md`.
3. **Copy is reproduced verbatim,** including `One of the Post could be yours`.
   Reads like a typo for `One of these posts could be yours`; left as designed.
4. The three copy elements are centred on three different axes (above). Held as
   designed; worth a decision before ship.

# assets

## `card.webp`

The design's photograph, supplied by the repository owner and used by all five
cards in the fan — as it is in the design, where one image fills every card.

Provenance: Figma node **`926:22119`** (`image 20493`) in file
`13hMVjIUc9X1sKOfVHmSc1`, exported as the **frame** at 2x — 774 x 952, WebP with
an alpha channel.

## What "exported as the frame" means for the CSS

The export is the 387 x 476 frame, not the raw 454.5 x 544 image fill. Two things
are therefore already baked into the file, and `styles.css` must not redo them:

1. **The crop.** In Figma the fill sits at `(-23, -10)` and bleeds past the frame
   on every side. The export has that framing applied, so `.card__media img`
   applies no offset of its own.
2. **The corners.** The frame's 64px radius is baked in, which is what the alpha
   channel carries. Scaled to the card's 384.06 width that is a ~63.5px radius,
   marginally wider than the card's own 62.88px clip — so the image is bled 1px
   on every side and the card's clip owns the corner. Without that bleed a
   hairline of transparent pixels shows inside the radius.

If the file is ever replaced with the **raw fill** instead of the frame, both of
those have to come back: restore the `(-23, -10)` offset at 451.05 x 541.47 and
drop the 1px bleed.

`.card__media` also carries a CSS gradient beneath the `<img>` as a fallback
ground, so the band still reads if the file is ever missing.

## Before ship

Per spec 12, the consent questions govern real people appearing on this surface.
This image is design-supplied and is not covered by anything in this repo.

# assets

## `card.png` — PLACEHOLDER, replace before ship

The real photograph is the image fill on Figma node **`926:22119`**
(`image 20493`, file `13hMVjIUc9X1sKOfVHmSc1`) — the same alumni-networking shot
the fan uses in `914:18698`.

It could not be pulled into the build session: `www.figma.com` is not on the
egress allowlist for this runner, so the MCP asset URL, the raw image URL and
the node export all returned `403` at the proxy. That is an organisation policy,
not a transient failure, so the file has to come across by hand.

`card.png` here is a locally drawn stand-in at 909x1088 (the 454.5 x 544 fill at
2x). It follows the real photo's composition — window light upper left, the man
in the dark suit at left, the subject centre in a navy blazer with a name badge,
the navy `Alumni` banner right, white flowers bottom centre — so the crop, blur
ladder and white veils can be judged. It is deliberately illustrated rather than
photographic, so it cannot be mistaken for the real asset. It must not ship.

## Swapping in the real image

1. In Figma, select `926:22119` and export **`image 20493`** as PNG @2x
   (909 x 1088). Export the image fill, not the 387 x 476 frame — the fill
   bleeds past the frame and `styles.css` reproduces that crop itself.
2. Save it over `assets/card.png`.

No markup or CSS change is needed: all five cards reference this one file, as
they do in the design.

## Crop

`.card__media img` in `styles.css` reproduces node `926:22119`'s framing: a
454.5 x 544 fill placed at `(-23, -10)` inside a 387 x 476 frame, rescaled to the
fan card's 384.06 x 473.783. If the replacement export has a different aspect
ratio, that rule is the only thing to revisit.

`.card__media` also carries a CSS gradient underneath the `<img>`, so the band
still reads as designed if the file is ever missing.

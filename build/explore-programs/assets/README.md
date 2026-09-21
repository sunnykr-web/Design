# assets

## `card.png` — PLACEHOLDER, replace before ship

The real photograph is the image fill on Figma node `914:19878`
(file `13hMVjIUc9X1sKOfVHmSc1`, frame `914:18698`). It could not be pulled into
this session: `www.figma.com` is denied by the egress policy on this runner, so
both the MCP asset URL and the raw image URL returned `403` at the proxy.

`card.png` here is a neutral abstract stand-in generated locally at 768x948 so
the composition, blur ladder and white veils can be judged. It is **not** the
design's photograph and must not ship.

To swap in the real asset:

1. In Figma, select `914:19878` and export the image fill as PNG @2x.
2. Save it over `assets/card.png`. No markup or CSS change is needed — all five
   cards reference this one file, as they do in the design.

`.card__media` also carries a CSS gradient underneath the `<img>`, so the band
still reads as designed if the file is ever missing.

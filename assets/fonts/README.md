# Web fonts

Self-hosted so the page has no third-party runtime dependency.

| Family | Role in the design | Licence |
|---|---|---|
| Fraunces | Display serif — H1, pull quote, section headings, counters | SIL Open Font License 1.1 |
| DM Sans | Post body, standfirst, controls | SIL Open Font License 1.1 |
| Work Sans | UI chrome — logo, labels, band cards, footer | SIL Open Font License 1.1 |
| Poppins | Profile cards in the "Explore the Unfiltered Journey!" row | SIL Open Font License 1.1 |

All four are Google Fonts released under the SIL Open Font License 1.1
(<https://openfontlicense.org>); the full text ships with each family's
upstream release. Files here are the latin and latin-ext subsets only,
fetched from `fonts.gstatic.com`. `fonts.css` is the Google Fonts CSS with the
URLs rewritten to these local files and `font-display: swap` on every face.

Regenerate by re-running the fetch documented in the repository README.

Fraunces is a variable font with `SOFT` and `WONK` axes; the design sets
`font-variation-settings: "SOFT" 0, "WONK" 1`, which the stylesheet applies to
every display-serif rule.

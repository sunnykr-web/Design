# Trust Building — V5

`index.html` is the V5 "In their own words" page, copied unchanged from `Trust_Building_V5.dc.html`.
`support.js` is the runtime it needs. At load time it pulls React 18.3.1, ReactDOM and Babel from unpkg.com, so open the page over HTTP with internet access:

```sh
cd trust-building && python3 -m http.server 8000   # then open http://localhost:8000
```

## Assets

The page loads its media from `./assets/`. These files are not in the repo yet. Add them with these exact names:

- `reel.mp4` (hero video)
- `alumni-ballroom.png`, `sa-plane.png`, `cafe.png`, `career-move-v4.png` (section backgrounds)
- `conv-l1.png` … `conv-l5.png`, `conv-p2.png`, `cv-card-sharp.png` (convocation strip)
- `al3-harish.png`, `al3-mixers.png`, `al3-crossroads.png` (alumni)
- `sa-v0.png` … `sa-v6.png` (study abroad)
- `im-1.png` … `im-5.png`, `im3-first.png`, `im3-cities.png`, `im3-voices.png` (immersion)
- `avatars/a0.png` … `avatars/a8.png` (voice-card avatars)

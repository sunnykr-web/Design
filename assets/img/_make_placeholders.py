#!/usr/bin/env python3
"""Generate the photographic stand-ins used by the Wall of Voices build.

The Figma file's bitmaps (learner photos, avatars, the archive backdrop) could not
be exported into this repo — the session's network policy blocks figma.com, so the
`get_design_context` asset URLs are unreachable. These SVGs hold the exact geometry
the design gives each photo and carry the same subject matter, so the page composes
correctly. Replace them with the cleared photography once consent is settled
(spec §12) and the file names below stay the same.
"""
import pathlib

HERE = pathlib.Path(__file__).parent

GRAIN = """  <filter id="g" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.055"/></feComponentTransfer>
  </filter>"""


def doc(w, h, body, defs=""):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
            f'width="{w}" height="{h}" role="img">\n  <defs>\n{GRAIN}\n{defs}  </defs>\n'
            f'{body}\n  <rect width="{w}" height="{h}" filter="url(#g)" opacity=".55"/>\n</svg>\n')


def cap(x, y, s, fill, op=1.0):
    """A mortarboard: board + tassel."""
    return (f'<g fill="{fill}" opacity="{op}">'
            f'<path d="M{x-1.55*s} {y} L{x} {y-0.62*s} L{x+1.55*s} {y} L{x} {y+0.62*s} Z"/>'
            f'<path d="M{x-0.78*s} {y+0.24*s} L{x-0.78*s} {y+0.95*s} '
            f'Q{x} {y+1.45*s} {x+0.78*s} {y+0.95*s} L{x+0.78*s} {y+0.24*s} Z"/>'
            f'<rect x="{x+1.32*s}" y="{y-0.05*s}" width="{0.09*s}" height="{0.95*s}" rx="{0.045*s}"/>'
            f'</g>')


def figure(x, base, h, fill, op=1.0, capped=True):
    """A head-and-shoulders silhouette standing on `base`, `h` tall."""
    head = h * 0.26
    g = [f'<g fill="{fill}" opacity="{op}">']
    g.append(f'<circle cx="{x}" cy="{base-h+head*0.55}" r="{head*0.55}"/>')
    g.append(f'<path d="M{x-h*0.34} {base} Q{x-h*0.34} {base-h*0.66} {x} {base-h*0.68} '
             f'Q{x+h*0.34} {base-h*0.66} {x+h*0.34} {base} Z"/>')
    g.append('</g>')
    if capped:
        g.append(cap(x, base - h + head * 0.16, h * 0.15, fill, op))
    return "".join(g)


def linear(id_, stops, x1=0, y1=0, x2=0, y2=1):
    s = "".join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in stops)
    return (f'    <linearGradient id="{id_}" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}">'
            f'{s}</linearGradient>\n')


def write(name, svg):
    (HERE / name).write_text(svg, encoding="utf-8")
    print(name, len(svg))


# ---------------------------------------------------------------- convocation
def convocation(w, h, name):
    defs = (linear("sky", [(0, "#2A1E3D"), (0.55, "#4A2E45"), (1, "#7A4A3A")]) +
            linear("floor", [(0, "#B5793F"), (1, "#7A4A26")]) +
            linear("glow", [(0, "#FFD9A0"), (1, "rgba(255,217,160,0)")]))
    horizon = h * 0.62
    body = [f'  <rect width="{w}" height="{h}" fill="url(#sky)"/>',
            f'  <rect y="{horizon}" width="{w}" height="{h-horizon}" fill="url(#floor)"/>',
            f'  <ellipse cx="{w*0.5}" cy="{horizon}" rx="{w*0.46}" ry="{h*0.36}" fill="url(#glow)" opacity=".55"/>']
    for i in range(9):
        x = w * (0.08 + i * 0.105)
        body.append(figure(x, horizon + h * 0.06, h * (0.30 + (i % 3) * 0.02), "#120C18", 0.55))
    for i, (fx, fh) in enumerate(((0.36, 0.52), (0.5, 0.56), (0.64, 0.52))):
        body.append(figure(w * fx, h * 0.98, h * fh, "#1B1220", 0.92))
    body.append(f'  <rect x="{w*0.44}" y="{h*0.60}" width="{w*0.12}" height="{h*0.11}" rx="2" '
                f'fill="#F3E3C4" opacity=".9"/>')
    write(name, doc(w, h, "\n".join(body), defs))


# --------------------------------------------------------------------- campus
def campus(w, h, name):
    defs = (linear("csky", [(0, "#CBD7DE"), (1, "#EEE6DA")]) +
            linear("wall", [(0, "#D9C8AE"), (1, "#B39C7C")]) +
            linear("lawn", [(0, "#8FA07A"), (1, "#68764F")]))
    body = [f'  <rect width="{w}" height="{h}" fill="url(#csky)"/>',
            f'  <rect x="{w*0.06}" y="{h*0.16}" width="{w*0.88}" height="{h*0.56}" fill="url(#wall)"/>',
            f'  <path d="M{w*0.02} {h*0.18} L{w*0.5} {h*0.02} L{w*0.98} {h*0.18} Z" fill="#9C8563"/>',
            f'  <rect y="{h*0.72}" width="{w}" height="{h*0.28}" fill="url(#lawn)"/>']
    for i in range(6):
        x = w * (0.14 + i * 0.145)
        body.append(f'  <rect x="{x}" y="{h*0.30}" width="{w*0.055}" height="{h*0.42}" rx="{w*0.028}" fill="#F2ECE0" opacity=".75"/>')
    for i, fx in enumerate((0.18, 0.31, 0.46, 0.59, 0.73, 0.86)):
        body.append(figure(w * fx, h * 0.99, h * (0.30 + (i % 2) * 0.04), "#2C2A26", 0.8, capped=(i % 2 == 0)))
    write(name, doc(w, h, "\n".join(body), defs))


# ------------------------------------------------------------------- workshop
def workshop(w, h, name):
    defs = (linear("room", [(0, "#EFE7DA"), (1, "#D6CBBA")]) +
            linear("desk", [(0, "#B9A184"), (1, "#8E7554")]))
    body = [f'  <rect width="{w}" height="{h}" fill="url(#room)"/>',
            f'  <rect x="{w*0.08}" y="{h*0.12}" width="{w*0.5}" height="{h*0.34}" rx="4" fill="#41504F" opacity=".85"/>',
            f'  <rect x="{w*0.11}" y="{h*0.17}" width="{w*0.2}" height="{h*0.035}" rx="2" fill="#EDE3D2" opacity=".7"/>',
            f'  <rect x="{w*0.11}" y="{h*0.24}" width="{w*0.34}" height="{h*0.025}" rx="2" fill="#EDE3D2" opacity=".45"/>',
            f'  <rect x="{w*0.11}" y="{h*0.30}" width="{w*0.28}" height="{h*0.025}" rx="2" fill="#EDE3D2" opacity=".45"/>',
            f'  <rect y="{h*0.70}" width="{w}" height="{h*0.30}" fill="url(#desk)"/>']
    for i, fx in enumerate((0.20, 0.40, 0.62, 0.84)):
        body.append(figure(w * fx, h * 0.78, h * 0.42, "#2E2A25", 0.85, capped=False))
        body.append(f'  <rect x="{w*fx-w*0.055}" y="{h*0.74}" width="{w*0.11}" height="{h*0.07}" rx="2" fill="#5B5750" opacity=".9"/>')
    write(name, doc(w, h, "\n".join(body), defs))


# ------------------------------------------------------------------ immersion
def immersion(w, h, name):
    defs = (linear("hall", [(0, "#E8DFD2"), (1, "#C9BCA9")]) +
            linear("board", [(0, "#33413F"), (1, "#222C2B")]))
    body = [f'  <rect width="{w}" height="{h}" fill="url(#hall)"/>',
            f'  <rect x="{w*0.14}" y="{h*0.10}" width="{w*0.72}" height="{h*0.38}" rx="3" fill="url(#board)"/>']
    for i in range(4):
        body.append(f'  <rect x="{w*0.18}" y="{h*(0.17+i*0.07)}" width="{w*(0.55-i*0.09)}" height="{h*0.028}" rx="2" fill="#E9DFCC" opacity="{0.55-i*0.08}"/>')
    for row, (base, scale, op) in enumerate(((0.72, 0.24, 0.55), (0.88, 0.30, 0.75), (1.04, 0.36, 0.9))):
        n = 7 - row
        for i in range(n):
            x = w * (0.12 + i * (0.76 / max(n - 1, 1)))
            body.append(figure(x, h * base, h * scale, "#2A2620", op, capped=False))
    write(name, doc(w, h, "\n".join(body), defs))


# -------------------------------------------------------- single graduate 4:5
def portrait_convocation(w, h, name):
    defs = (linear("pbg", [(0, "#3A2A46"), (0.6, "#6B4340"), (1, "#9A6540")]) +
            linear("pglow", [(0, "rgba(255,214,160,.65)"), (1, "rgba(255,214,160,0)")]))
    body = [f'  <rect width="{w}" height="{h}" fill="url(#pbg)"/>',
            f'  <ellipse cx="{w*0.5}" cy="{h*0.42}" rx="{w*0.62}" ry="{h*0.48}" fill="url(#pglow)"/>']
    for i, fx in enumerate((0.12, 0.26, 0.76, 0.9)):
        body.append(figure(w * fx, h * 1.02, h * 0.55, "#1A121F", 0.45))
    body.append(figure(w * 0.5, h * 1.06, h * 0.86, "#171019", 0.95))
    body.append(f'  <path d="M{w*0.36} {h*0.52} L{w*0.42} {h*1.06} L{w*0.46} {h*1.06} L{w*0.41} {h*0.52} Z" fill="#B8892F" opacity=".85"/>')
    body.append(f'  <path d="M{w*0.64} {h*0.52} L{w*0.58} {h*1.06} L{w*0.54} {h*1.06} L{w*0.59} {h*0.52} Z" fill="#B8892F" opacity=".85"/>')
    write(name, doc(w, h, "\n".join(body), defs))


# ------------------------------------------------- three graduates + a scroll
def graduates_trio(w, h, name):
    defs = (linear("tsky", [(0, "#EFE8DC"), (0.55, "#E2D6C3"), (1, "#CDBBA1")]) +
            linear("robe", [(0, "#584668"), (1, "#3A2E46")]) +
            linear("tglow", [(0, "rgba(255,236,205,.85)"), (1, "rgba(255,236,205,0)")]))
    body = [f'  <rect width="{w}" height="{h}" fill="url(#tsky)"/>',
            f'  <ellipse cx="{w*0.5}" cy="{h*0.34}" rx="{w*0.62}" ry="{h*0.34}" fill="url(#tglow)"/>']
    # a soft crowd far behind
    for i in range(11):
        x = w * (0.02 + i * 0.096)
        body.append(figure(x, h * 0.74, h * 0.15, "#9C8B76", 0.22))
    for fx, fh in ((0.22, 0.44), (0.5, 0.50), (0.78, 0.44)):
        base = h * 1.02
        top = base - h * fh
        head = h * fh * 0.20
        body.append(f'  <circle cx="{w*fx}" cy="{top+head*0.58}" r="{head*0.5}" fill="#7A5B42"/>')
        body.append(f'  <path d="M{w*fx-h*fh*0.30} {base} Q{w*fx-h*fh*0.30} {top+head*1.0} {w*fx} {top+head*0.92} '
                    f'Q{w*fx+h*fh*0.30} {top+head*1.0} {w*fx+h*fh*0.30} {base} Z" fill="url(#robe)"/>')
        for side in (-1, 1):
            body.append(f'  <path d="M{w*fx+side*h*fh*0.11} {top+head*1.2} L{w*fx+side*h*fh*0.14} {base} '
                        f'L{w*fx+side*h*fh*0.06} {base} L{w*fx+side*h*fh*0.035} {top+head*1.2} Z" '
                        f'fill="#6E4E93" opacity=".55"/>')
        body.append(cap(w * fx, top + head * 0.2, h * fh * 0.11, "#241B2E"))
    body.append(f'  <rect x="{w*0.40}" y="{h*0.60}" width="{w*0.20}" height="{h*0.14}" rx="3" '
                f'fill="#F7F0E1" stroke="#C6A75A" stroke-width="2.5"/>')
    body.append(f'  <circle cx="{w*0.5}" cy="{h*0.67}" r="{h*0.025}" fill="#C6A75A" opacity=".7"/>')
    write(name, doc(w, h, "\n".join(body), defs))


# --------------------------------------------------------- profile cut-out
def profile(w, h, name):
    """Head-and-shoulders stand-in, cropped at the bottom like the design's photo."""
    defs = (linear("skin", [(0, "#9A7358"), (1, "#6B4E3A")]) +
            linear("shirt", [(0, "#F2EDE4"), (1, "#DCD5C8")]))
    cx = w * 0.5
    head_cy = h * 0.34
    head_rx = w * 0.20
    head_ry = h * 0.20
    shoulder_top = h * 0.66
    body = [
        # shoulders / torso
        f'  <path d="M{cx-w*0.44} {h} '
        f'C{cx-w*0.44} {shoulder_top+h*0.03} {cx-w*0.24} {shoulder_top-h*0.02} {cx-w*0.10} {shoulder_top-h*0.05} '
        f'L{cx+w*0.10} {shoulder_top-h*0.05} '
        f'C{cx+w*0.24} {shoulder_top-h*0.02} {cx+w*0.44} {shoulder_top+h*0.03} {cx+w*0.44} {h} Z" fill="url(#shirt)"/>',
        # collar
        f'  <path d="M{cx-w*0.10} {shoulder_top-h*0.05} L{cx} {shoulder_top+h*0.05} L{cx+w*0.10} {shoulder_top-h*0.05}" '
        f'fill="none" stroke="#C8BFAF" stroke-width="2.5" stroke-linejoin="round"/>',
        # neck
        f'  <rect x="{cx-head_rx*0.42}" y="{head_cy+head_ry*0.55}" width="{head_rx*0.84}" '
        f'height="{shoulder_top-head_cy-head_ry*0.4}" rx="{head_rx*0.3}" fill="#7C5A43"/>',
        # head
        f'  <ellipse cx="{cx}" cy="{head_cy}" rx="{head_rx}" ry="{head_ry}" fill="url(#skin)"/>',
        # ears
        f'  <ellipse cx="{cx-head_rx}" cy="{head_cy+head_ry*0.1}" rx="{head_rx*0.13}" ry="{head_ry*0.16}" fill="#7C5A43"/>',
        f'  <ellipse cx="{cx+head_rx}" cy="{head_cy+head_ry*0.1}" rx="{head_rx*0.13}" ry="{head_ry*0.16}" fill="#7C5A43"/>',
        # hair
        f'  <path d="M{cx-head_rx*1.04} {head_cy-head_ry*0.10} '
        f'C{cx-head_rx*1.02} {head_cy-head_ry*1.28} {cx+head_rx*1.02} {head_cy-head_ry*1.28} {cx+head_rx*1.04} {head_cy-head_ry*0.10} '
        f'C{cx+head_rx*0.72} {head_cy-head_ry*0.72} {cx-head_rx*0.72} {head_cy-head_ry*0.72} {cx-head_rx*1.04} {head_cy-head_ry*0.10} Z" '
        f'fill="#241A16"/>',
    ]
    write(name, doc(w, h, "\n".join(body), defs))


# ----------------------------------------------------------- archive backdrop
def backdrop(w, h, name):
    defs = (linear("bsky", [(0, "#2B2118"), (0.5, "#54402C"), (1, "#8A6A44")]) +
            linear("bfade", [(0, "rgba(0,0,0,.55)"), (1, "rgba(0,0,0,.15)")]))
    body = [f'  <rect width="{w}" height="{h}" fill="url(#bsky)"/>']
    for row, (base, scale, op) in enumerate(((0.58, 0.16, 0.35), (0.72, 0.22, 0.45), (0.9, 0.28, 0.55), (1.1, 0.36, 0.62))):
        n = 22 - row * 3
        for i in range(n):
            x = w * (0.02 + i * (0.96 / max(n - 1, 1)))
            body.append(figure(x, h * base, h * scale, "#140E09", op, capped=(i % 3 == 0)))
    body.append(f'  <ellipse cx="{w*0.5}" cy="{h*0.30}" rx="{w*0.55}" ry="{h*0.40}" fill="#FFD9A0" opacity=".18"/>')
    body.append(f'  <rect width="{w}" height="{h}" fill="url(#bfade)"/>')
    write(name, doc(w, h, "\n".join(body), defs))


if __name__ == "__main__":
    convocation(560, 370, "photo-convocation.svg")
    convocation(1160, 560, "photo-convocation-stage.svg")
    campus(560, 370, "photo-campus.svg")
    workshop(560, 370, "photo-workshop.svg")
    immersion(560, 370, "photo-immersion.svg")
    portrait_convocation(560, 370, "photo-portrait-convocation.svg")
    graduates_trio(704, 876, "photo-graduates-trio.svg")
    profile(620, 704, "photo-profile.svg")
    backdrop(1600, 942, "backdrop-archive.svg")

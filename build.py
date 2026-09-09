#!/usr/bin/env python3
"""Render index.html for Wall of Voices from data/posts.json.

Static generation, no dependencies: `python3 build.py` rewrites index.html.
The design of record is Figma file 13hMVjIUc9X1sKOfVHmSc1, node 242:6008.
"""
import html
import json
import pathlib

ROOT = pathlib.Path(__file__).parent
DATA = json.loads((ROOT / "data" / "posts.json").read_text(encoding="utf-8"))

MEDIA = {
    "campus": ("assets/img/photo-campus.svg", "Learners outside the campus building on immersion week"),
    "convocation": ("assets/img/photo-convocation.svg", "Graduates on stage at the convocation ceremony"),
    "workshop": ("assets/img/photo-workshop.svg", "A project workshop in progress"),
    "immersion": ("assets/img/photo-immersion.svg", "A cohort seated in a campus lecture hall"),
    "portrait-convocation": ("assets/img/photo-portrait-convocation.svg", "A graduate photographed after the ceremony"),
    "convocation-stage": ("assets/img/photo-convocation-stage.svg", "Graduates receiving their degree on the convocation stage"),
}

# ---------------------------------------------------------------- icons ----
ICONS = {
    "globe": '<svg class="wov-i" viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" focusable="false"><path fill="currentColor" d="M8 1a7 7 0 100 14A7 7 0 008 1zm4.9 4.5h-2a10.7 10.7 0 00-1-2.6 5.6 5.6 0 013 2.6zM8 2.5c.5.6 1 1.7 1.3 3H6.7C7 4.2 7.5 3.1 8 2.5zM2.6 9.5A5.5 5.5 0 012.4 8c0-.5.1-1 .2-1.5h2.3a12 12 0 000 3H2.6zm.5 1.5h2a10.7 10.7 0 001 2.6 5.6 5.6 0 01-3-2.6zm2-5.5h-2a5.6 5.6 0 013-2.6 10.7 10.7 0 00-1 2.6zM8 13.5c-.5-.6-1-1.7-1.3-3h2.6c-.3 1.3-.8 2.4-1.3 3zm1.5-4.5h-3a10.6 10.6 0 010-3h3a10.6 10.6 0 010 3zm.4 4.6a10.7 10.7 0 001-2.6h2a5.6 5.6 0 01-3 2.6zm1.3-4.1a12 12 0 000-3h2.3a5.4 5.4 0 010 3h-2.3z"/></svg>',
    "like": '<svg class="wov-i" viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" d="M7 10.5v9H4.5a1 1 0 01-1-1v-7a1 1 0 011-1H7zm0 0l3.6-7.2a1.6 1.6 0 013 .7v3.5h4.6a1.8 1.8 0 011.8 2.2l-1.4 6.4a2 2 0 01-2 1.6H7"/></svg>',
    "comment": '<svg class="wov-i" viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" d="M20.5 11.6c0 4-3.8 7.2-8.5 7.2a9.9 9.9 0 01-2.6-.3l-5 1.9 1.6-4A6.8 6.8 0 013.5 11.6c0-4 3.8-7.1 8.5-7.1s8.5 3.2 8.5 7.1z"/></svg>',
    "repost": '<svg class="wov-i" viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M4 9.5V8a3 3 0 013-3h11m0 0l-3-3m3 3l-3 3M20 14.5V16a3 3 0 01-3 3H6m0 0l3 3m-3-3l3-3"/></svg>',
    "send": '<svg class="wov-i" viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" d="M21 3L2.5 10.2l7.6 2.4M21 3l-7.3 18-3.6-7.4M21 3l-10.9 9.6"/></svg>',
    "chevron": '<svg class="wov-i" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M4 6.5L8 10.5l4-4"/></svg>',
    "search": '<svg class="wov-i" viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false"><circle cx="7" cy="7" r="4.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10.4 10.4L14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    "linkedin": '<svg class="wov-i" viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" focusable="false"><rect width="24" height="24" rx="3" fill="#0A66C2"/><path fill="#fff" d="M7.1 9.4H4.6V19h2.5V9.4zM5.85 8.3a1.45 1.45 0 100-2.9 1.45 1.45 0 000 2.9zM19.4 19h-2.5v-4.7c0-1.2-.4-2-1.5-2a1.6 1.6 0 00-1.5 1.1 2 2 0 00-.1.7V19H11.3s0-8.7 0-9.6h2.5v1.4a2.5 2.5 0 012.3-1.2c1.6 0 2.9 1 2.9 3.4V19z"/></svg>',
}

REACTIONS = (
    '<span class="wov-react" aria-hidden="true">'
    '<span class="wov-react__dot wov-react__dot--like">'
    '<svg viewBox="0 0 12 12" width="10" height="10"><path fill="#fff" d="M4 5.2V10H2.9a.6.6 0 01-.6-.6V5.8a.6.6 0 01.6-.6H4zm.7 0l1.8-3.6a.8.8 0 011.5.4v1.7h2.3a.9.9 0 01.9 1.1l-.7 3.2a1 1 0 01-1 .8H4.7z"/></svg></span>'
    '<span class="wov-react__dot wov-react__dot--love">'
    '<svg viewBox="0 0 12 12" width="9" height="9"><path fill="#fff" d="M6 10.2S1.6 7.6 1.6 4.7A2.4 2.4 0 016 3.3a2.4 2.4 0 014.4 1.4c0 2.9-4.4 5.5-4.4 5.5z"/></svg></span>'
    '<span class="wov-react__dot wov-react__dot--clap">'
    '<svg viewBox="0 0 12 12" width="9" height="9"><path fill="#fff" d="M3.2 5.1l-.9-2a.6.6 0 011-.5l1.2 1.8.4-.2-1-2.3a.6.6 0 011.1-.5l1 2.3.4-.1-.5-2.1a.6.6 0 011.2-.3l.7 2.7c.5 2-.4 3.6-2 4.1-1.4.5-2.6-.2-3.1-1.5L2 5.2a.6.6 0 011.1-.5z"/></svg></span>'
    "</span>"
)


def esc(s):
    return html.escape(s, quote=False)


def initials_avatar(initials, cls="wov-avatar", size=None):
    style = f' style="--avatar-size:{size}px"' if size else ""
    return (f'<span class="{cls}"{style} aria-hidden="true">'
            f'<span class="{cls}__initials">{esc(initials)}</span></span>')


# --------------------------------------------------------- archive card ----
def archive_card(p):
    media = ""
    if p["media"]:
        src, alt = MEDIA[p["media"]]
        media = (
            '<div class="wov-post__media">'
            f'<img src="{src}" alt="{esc(alt)}" width="560" height="370" loading="lazy" decoding="async">'
            '<span class="wov-post__media-caption">Photo · from the post</span>'
            "</div>"
        )
    body = esc(p["body"])
    more = '<span class="wov-post__more">…more</span>' if p["truncated"] else ""
    body_cls = "wov-post__body" + (" is-truncated" if p["truncated"] else "")
    return f"""      <article class="wov-post" data-category="{p['category']}" data-name="{esc(p['name'])}" data-company="{esc(p['company'])}" data-headline="{esc(p['headline'])}" data-id="{p['id']}">
        <a class="wov-post__link" href="{p['permalink']}" target="_blank" rel="noopener noreferrer">
          <span class="wov-post__linkedin" aria-hidden="true">in</span>
          <span class="wov-sr">Read {esc(p['name'])}’s post on LinkedIn</span>
        </a>
        <header class="wov-post__head">
          {initials_avatar(p['initials'], 'wov-post__avatar')}
          <span class="wov-post__who">
            <span class="wov-post__name">{esc(p['name'])}</span>
            <span class="wov-post__role">{esc(p['headline'])} · {esc(p['company'])}</span>
            <span class="wov-post__date">{esc(p['postedAt'])} · {ICONS['globe']}</span>
          </span>
        </header>
        <div class="{body_cls}"><p>{body}</p>{more}</div>
        {media}
        <div class="wov-post__stats">
          <span class="wov-post__reactions">{REACTIONS}<span class="wov-post__count">{esc(p['reactions'])}</span></span>
          <span class="wov-post__comments">{esc(p['comments'])}</span>
        </div>
        <div class="wov-post__actions" aria-hidden="true">
          <span class="wov-post__action">{ICONS['like']}Like</span>
          <span class="wov-post__action">{ICONS['comment']}Comment</span>
          <span class="wov-post__action-icons">{ICONS['repost']}{ICONS['send']}</span>
        </div>
      </article>"""


# ------------------------------------------------------- featured linkcard --
def link_card(extra_class=""):
    f = DATA["featured"]
    src, alt = MEDIA[f["media"]]
    paras = "".join(f"<p>{esc(t)}</p>" for t in f["paragraphs"])
    return f"""<article class="wov-linkcard {extra_class}">
        <header class="wov-linkcard__head">
          {initials_avatar(f['initials'], 'wov-linkcard__avatar')}
          <span class="wov-linkcard__who">
            <span class="wov-linkcard__name">{esc(f['name'])}</span>
            <span class="wov-linkcard__role">{esc(f['headline'])}</span>
          </span>
          <span class="wov-linkcard__date">{esc(f['postedAt'])}</span>
        </header>
        <div class="wov-linkcard__body">{paras}</div>
        <div class="wov-linkcard__media"><img src="{src}" alt="{esc(alt)}" width="1160" height="560" loading="lazy" decoding="async"></div>
        <div class="wov-linkcard__stats">
          <span class="wov-linkcard__reactions">{REACTIONS}<span>{esc(f['reactions'])}</span></span>
          <span>{esc(f['comments'])}</span>
        </div>
        <a class="wov-linkcard__foot" href="{f['permalink']}" target="_blank" rel="noopener noreferrer">Read on LinkedIn <span aria-hidden="true">↗</span></a>
      </article>"""


def ghost_card(style, media=True, klass="wov-ghost"):
    """A blurred, out-of-focus post used as texture behind the sharp ones.

    The design crops these to a fixed box, so each carries its own --h."""
    media_html = '<div class="wov-ghost__media"></div>' if media else ""
    return f"""<div class="{klass}" style="{style}" aria-hidden="true">
          <div class="wov-ghost__head"><span class="wov-ghost__avatar"></span><span class="wov-ghost__lines"><i></i><i></i></span></div>
          <div class="wov-ghost__body"><i></i><i></i><i></i><i></i></div>
          {media_html}
          <div class="wov-ghost__foot"><i></i><i></i><i></i></div>
        </div>"""


# ------------------------------------------------------------- band card ----
def band_card(c):
    return f"""        <article class="wov-bandcard">
          <header class="wov-bandcard__head">
            {initials_avatar(c['initials'], 'wov-bandcard__avatar')}
            <span class="wov-bandcard__who">
              <span class="wov-bandcard__name">{esc(c['name'])}</span>
              <span class="wov-bandcard__role">{esc(c['role'])}</span>
            </span>
          </header>
          <p class="wov-bandcard__body">{esc(c['body'])}</p>
        </article>"""


def profile_card(p, feature=False):
    quote = ""
    if feature and p["quote"]:
        quote = (f'<p class="wov-profile__quote"><span class="wov-profile__mark" aria-hidden="true">“</span>'
                 f'{esc(p["quote"])}</p>')
    return f"""        <article class="wov-profile{' wov-profile--wide' if feature else ''}">
          <div class="wov-profile__photo"><img src="assets/img/photo-profile.svg" alt="" width="620" height="704" loading="lazy" decoding="async"></div>
          <div class="wov-profile__text">
            {quote}
            <div class="wov-profile__id">
              <span class="wov-profile__name">{esc(p['name'])}</span>
              <span class="wov-profile__role">{esc(p['role'])}</span>
            </div>
            <a class="wov-profile__link" href="{p['permalink']}" target="_blank" rel="noopener noreferrer">{ICONS['linkedin']}<span>LinkedIn Profile</span></a>
          </div>
        </article>"""


# ------------------------------------------------------------------ page ----
def render():
    posts = DATA["posts"]
    ledger = DATA["meta"]["ledger"]
    cats = DATA["meta"]["categories"]

    columns = []
    for col in (1, 2, 3, 4):
        cards = "\n".join(archive_card(p) for p in posts if p["column"] == col)
        columns.append(f'    <div class="wov-grid__col" data-col="{col}">\n{cards}\n    </div>')
    grid = "\n".join(columns)

    chips = "\n".join(
        f'          <button class="wov-chip{" is-active" if i == 0 else ""}" role="tab" '
        f'aria-selected="{"true" if i == 0 else "false"}" tabindex="{0 if i == 0 else -1}" '
        f'data-category="{c.lower()}" id="wov-tab-{c.lower()}">{esc(c)}</button>'
        for i, c in enumerate(cats)
    )

    band = "\n".join(band_card(c) for c in DATA["band"])
    band_loop = band + "\n" + band.replace('class="wov-bandcard"', 'class="wov-bandcard" aria-hidden="true"')

    ghosts_hero = "\n        ".join([
        ghost_card("--x:22px;  --y:56px;  --w:196px; --h:274px; --o:.6;  --b:4.6px"),
        ghost_card("--x:170px; --y:26px;  --w:236px; --h:306px; --o:.85; --b:3.4px"),
        ghost_card("--x:604px; --y:22px;  --w:250px; --h:312px; --o:.9;  --b:3.4px"),
        ghost_card("--x:790px; --y:48px;  --w:214px; --h:280px; --o:.6;  --b:4.6px"),
    ])

    ghosts_quote = "\n        ".join([
        ghost_card("--x:169px;  --y:21px;  --w:193px; --h:122px; --o:.74; --b:2.3px", media=False),
        ghost_card("--x:392px;  --y:0px;   --w:242px; --h:155px; --o:1;   --b:3.7px", media=False),
        ghost_card("--x:1023px; --y:0px;   --w:306px; --h:128px; --o:1;   --b:4.2px", media=False),
        ghost_card("--x:118px;  --y:452px; --w:193px; --h:122px; --o:.44; --b:2.3px", media=False),
        ghost_card("--x:330px;  --y:397px; --w:193px; --h:122px; --o:.74; --b:2.3px", media=False),
        ghost_card("--x:579px;  --y:397px; --w:306px; --h:193px; --o:1;   --b:3.65px"),
        ghost_card("--x:1035px; --y:483px; --w:242px; --h:155px; --o:.28; --b:3.7px", media=False),
    ])

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Wall of Voices — upGrad</title>
<meta name="description" content="A verifiable public record of unpaid, unedited, unprompted LinkedIn posts by upGrad learners. Every post links to the live original.">
<meta name="robots" content="noindex">
<link rel="stylesheet" href="assets/fonts/fonts.css">
<link rel="stylesheet" href="tokens/wov.css">
<link rel="stylesheet" href="assets/css/wall-of-voices.css">
</head>
<body>
<a class="wov-skip" href="#archive">Skip to the archive</a>

<div class="wov-notice">Internal prototype · sample data throughout</div>

<header class="wov-masthead">
  <div class="wov-container wov-masthead__inner">
    <a class="wov-logo" href="#">upGrad</a>
    <span class="wov-masthead__title">Wall of Voices</span>
  </div>
</header>

<main id="main">

  <!-- 01 · Overture ------------------------------------------------------ -->
  <section class="wov-overture" aria-labelledby="wov-h1">
    <div class="wov-container">
      <p class="wov-eyebrow">Unedited <span aria-hidden="true">·</span> Unprompted <span aria-hidden="true">·</span> Unpaid</p>
      <h1 class="wov-h1" id="wov-h1">Don’t take our word for it.<br><em>Take theirs.</em></h1>
      <p class="wov-standfirst">6,404 upGrad learners posted about their experience on their own
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        — unpaid, unedited, unprompted. Every post here links to the live original.</p>
    </div>
    <div class="wov-collage" role="group" aria-label="One learner’s post, among many">
      <div class="wov-collage__stage">
        {ghosts_hero}
        {link_card('wov-linkcard--hero')}
      </div>
    </div>
  </section>

  <!-- 03 · Ledger --------------------------------------------------------- -->
  <section class="wov-ledger" aria-label="The record in numbers">
    <div class="wov-container wov-ledger__grid">
      <div class="wov-ledger__lead">
        <span class="wov-ledger__badges" aria-hidden="true">
          <span class="wov-react__dot wov-react__dot--like wov-react__dot--lg"><svg viewBox="0 0 12 12" width="16" height="16"><path fill="#fff" d="M4 5.2V10H2.9a.6.6 0 01-.6-.6V5.8a.6.6 0 01.6-.6H4zm.7 0l1.8-3.6a.8.8 0 011.5.4v1.7h2.3a.9.9 0 01.9 1.1l-.7 3.2a1 1 0 01-1 .8H4.7z"/></svg></span>
          <span class="wov-react__dot wov-react__dot--heart wov-react__dot--lg"><svg viewBox="0 0 12 12" width="14" height="14"><path fill="#fff" d="M6 10.2S1.6 7.6 1.6 4.7A2.4 2.4 0 016 3.3a2.4 2.4 0 014.4 1.4c0 2.9-4.4 5.5-4.4 5.5z"/></svg></span>
        </span>
        <span class="wov-ledger__figure wov-ledger__figure--xl">{ledger['reactions']}</span>
        <span class="wov-ledger__label">Reactions from their networks</span>
      </div>
      <div class="wov-ledger__item"><span class="wov-ledger__figure">{ledger['posts']}</span><span class="wov-ledger__label">Posts</span></div>
      <div class="wov-ledger__item"><span class="wov-ledger__figure">{ledger['learners']}</span><span class="wov-ledger__label">Learners</span></div>
      <div class="wov-ledger__item"><span class="wov-ledger__figure">{ledger['programmes']}</span><span class="wov-ledger__label">Programmes</span></div>
    </div>
  </section>

  <!-- 04 · Pull quote interstitial ---------------------------------------- -->
  <section class="wov-interstitial" aria-label="From one of the posts">
    <div class="wov-interstitial__stage">
      <div class="wov-interstitial__ghosts" aria-hidden="true">
        {ghosts_quote}
      </div>
      <div class="wov-interstitial__band">
        <figure class="wov-quote">
          <blockquote>“I didn’t tell anyone in my family I had enrolled. This post is how they found out I graduated.”</blockquote>
          <figcaption>Ramesh Iyer, Senior Manager, Tata Steel —
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">read the post <span aria-hidden="true">↗</span></a>
          </figcaption>
        </figure>
        <div class="wov-interstitial__card">{link_card('wov-linkcard--quote')}</div>
        <div class="wov-interstitial__photo"><img src="assets/img/photo-graduates-trio.svg" alt="Three graduates holding a framed certificate" width="704" height="876" loading="lazy" decoding="async"></div>
        <svg class="wov-interstitial__thread" viewBox="0 0 805 226" fill="none" aria-hidden="true" focusable="false">
          <path d="M2 88C120 26 250 4 392 30c150 27 236 128 411 165" stroke="#9DBFA6" stroke-width="1.5" stroke-dasharray="5 7" stroke-linecap="round"/>
          <circle cx="4" cy="88" r="5.5" fill="#4CAF7D"/>
          <circle cx="800" cy="193" r="5.5" fill="#3E8FD6"/>
        </svg>
      </div>
    </div>
  </section>

  <!-- Profiles ------------------------------------------------------------ -->
  <section class="wov-explore" aria-labelledby="wov-explore-h">
    <div class="wov-container">
      <h2 class="wov-explore__title" id="wov-explore-h">Explore the Unfiltered Journey!</h2>
    </div>
    <div class="wov-explore__row">
{profile_card(DATA['profiles'][0], feature=True)}
{profile_card(DATA['profiles'][1])}
{profile_card(DATA['profiles'][2])}
    </div>
  </section>

  <!-- 05/06 · The turn + the archive -------------------------------------- -->
  <section class="wov-archive" id="archive" aria-labelledby="wov-archive-h">
    <div class="wov-archive__backdrop" aria-hidden="true">
      <img src="assets/img/backdrop-archive.svg" alt="" width="1600" height="942" loading="lazy" decoding="async">
    </div>
    <div class="wov-archive__head">
      <div class="wov-container">
        <div class="wov-controls" role="group" aria-label="Filter, search and sort the archive">
          <div class="wov-chips" role="tablist" aria-label="Filter by category">
{chips}
          </div>
          <label class="wov-search">
            <span class="wov-sr">Search posts by name or company</span>
            {ICONS['search']}
            <input type="search" id="wov-search" placeholder="Search name or company" autocomplete="off">
          </label>
          <div class="wov-sort">
            <label class="wov-sr" for="wov-sort">Sort posts</label>
            <select id="wov-sort" class="wov-sort__select">
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="reactions">Most reactions</option>
            </select>
            <span class="wov-sort__chevron" aria-hidden="true">{ICONS['chevron']}</span>
          </div>
        </div>
        <h2 class="wov-archive__title" id="wov-archive-h">And another six thousand.</h2>
      </div>
    </div>

    <div class="wov-container">
      <p class="wov-archive__count" id="wov-count" role="status" aria-live="polite"></p>
      <div class="wov-grid" id="wov-grid">
{grid}
      </div>
      <p class="wov-empty" id="wov-empty" hidden>
        <span class="wov-empty__line">No posts match that yet.</span>
        <button class="wov-empty__clear" type="button" id="wov-clear">Clear filters</button>
      </p>
    </div>
  </section>

  <!-- 08 · Method note ----------------------------------------------------- -->
  <section class="wov-method" aria-labelledby="wov-method-h">
    <div class="wov-container">
      <h2 class="wov-method__title" id="wov-method-h">How this page is made</h2>
      <div class="wov-method__grid">
        <div>
          <h3>Collection</h3>
          <p>Posts are found by our alumni team when learners tag upGrad or a programme on LinkedIn. They are captured as written — text, typos, emoji and all — and republished here with a link back to the original. We never edit a post, and we never pay for one.</p>
        </div>
        <div>
          <h3>Consent</h3>
          <p>Every author is contacted before their post appears here and can decline or withdraw at any time. A post whose original is deleted on LinkedIn is removed from this page in the next monthly update.</p>
        </div>
        <div>
          <h3>Removal</h3>
          <p>If your post appears here and you’d like it taken down, write to <a href="mailto:voices@upgrad.com">voices@upgrad.com</a> with the link. It comes down within five working days, no questions asked.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 09 · CTA ------------------------------------------------------------- -->
  <section class="wov-cta">
    <div class="wov-container">
      <p class="wov-cta__line">One of these posts could be yours.</p>
      <a class="wov-cta__button" href="https://www.upgrad.com/">Explore programmes</a>
    </div>
  </section>

  <!-- 6.2 · Homepage band (separate surface) -------------------------------- -->
  <div class="wov-surfacenote">Separate surface · homepage band (existing upGrad DS)</div>

  <section class="wov-band" aria-labelledby="wov-band-h">
    <div class="wov-container wov-band__head">
      <p class="wov-band__eyebrow">In their own words</p>
      <h2 class="wov-band__title" id="wov-band-h">6,404 learners wrote about us. We didn’t edit a word.</h2>
      <a class="wov-band__all" href="#archive">See all 6,404 <span aria-hidden="true">→</span></a>
    </div>
    <div class="wov-band__viewport">
      <div class="wov-band__track" id="wov-band-track">
{band_loop}
      </div>
    </div>
    <div class="wov-band__controls">
      <button type="button" class="wov-band__btn" data-dir="-1" aria-label="Previous posts">‹</button>
      <button type="button" class="wov-band__btn" data-dir="1" aria-label="Next posts">›</button>
    </div>
  </section>
</main>

<footer class="wov-footer">
  <div class="wov-container">
    <p>Wall of Voices is a public record maintained by upGrad. Posts belong to their authors.
      Prototype — all names, posts, and figures on this page are sample data.</p>
  </div>
</footer>

<script src="assets/js/wall-of-voices.js" defer></script>
</body>
</html>
"""


if __name__ == "__main__":
    (ROOT / "index.html").write_text(render(), encoding="utf-8")
    print("index.html written:", (ROOT / "index.html").stat().st_size, "bytes")

/* WALL OF VOICES — prototype behaviour
   Motion follows spec §7 (two durations, opacity + translateY, 40ms stagger
   capped at 6, marquee pauses on hover and focus, reduced motion honoured).
   Interaction follows spec §5.2, §9 and §10. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------- icons
     LinkedIn chrome is redrawn as inline SVG: the Figma exports live on an
     asset host this environment cannot reach (see docs/prototype.md). */
  var ICON = {
    globe: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 1.3c1 0 2 1.1 2.4 2.8H5.6C6 3.4 7 2.3 8 2.3zM5.3 5.4h5.4c.1.6.2 1.3.2 2s-.1 1.4-.2 2H5.3c-.1-.6-.2-1.3-.2-2s.1-1.4.2-2zM4 5.4c-.1.6-.2 1.3-.2 2s.1 1.4.2 2H2.5A5.7 5.7 0 0 1 2.3 7.4c0-.7.1-1.4.2-2zm8 0h1.5c.1.6.2 1.3.2 2s-.1 1.4-.2 2H12c.1-.6.2-1.3.2-2s-.1-1.4-.2-2zM3 4.1a5.8 5.8 0 0 1 2.6-1.6c-.4.5-.7 1-.9 1.6zm7.4 0c-.2-.6-.5-1.1-.9-1.6A5.8 5.8 0 0 1 13 4.1zM3 10.7h1.7c.2.6.5 1.2.9 1.6a5.8 5.8 0 0 1-2.6-1.6zm2.6 0h4.8c-.4 1.7-1.4 2.8-2.4 2.8s-2-1.1-2.4-2.8zm5.5 0H13a5.8 5.8 0 0 1-2.6 1.6c.4-.4.7-1 .9-1.6z"/></svg>',
    thumb: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 10h2.2l2.9-6.1c.2-.5.7-.8 1.2-.7 1.2.2 2 1.3 1.8 2.5L13.7 9h4.2c1.3 0 2.3 1.2 2 2.5l-1.4 6.3c-.2 1-1.1 1.7-2.1 1.7H6zM2.8 10H5v10H2.8A.8.8 0 0 1 2 19.2v-8.4c0-.4.4-.8.8-.8z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.3 3.9 12.6C1.8 10.6 2 7.1 4.4 5.4 6.4 4 9.1 4.4 10.6 6.2l1.4 1.6 1.4-1.6c1.5-1.8 4.2-2.2 6.2-.8 2.4 1.7 2.6 5.2.5 7.2z"/></svg>',
    clap:  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.6 2.5a1.2 1.2 0 0 1 2.3-.6l1.5 4.5-1.2.4zm4 .3a1.2 1.2 0 0 1 2.3-.5l1.3 4.6-1.2.3zM6.3 5a1.2 1.2 0 0 1 2.2-.8l2 4.9-1.1.5zM18 7.6a1.2 1.2 0 0 1 2.3.5L19 13.9c-.7 3.4-3.4 5.6-6.6 5.6-2.6 0-4.6-1-6-3.2L4 12.8a1.2 1.2 0 0 1 1.8-1.6l1.9 2 .6-.4-2-5.3z"/></svg>',
    like:  '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M7 10.5v9m0-9L10.4 3a2.2 2.2 0 0 1 2 2.7L11.6 9h5.7a2 2 0 0 1 2 2.4l-1.2 6.2a2.4 2.4 0 0 1-2.4 1.9H7m0-9H4.6c-.6 0-1.1.5-1.1 1v7c0 .5.5 1 1.1 1H7"/></svg>',
    comment: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M20.5 11.6c0 4.2-3.8 7.6-8.5 7.6-1 0-2-.2-3-.5L4 20.2l1.6-3.5a7 7 0 0 1-2.1-5c0-4.3 3.8-7.7 8.5-7.7s8.5 3.4 8.5 7.6z"/></svg>',
    repost: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M4 9V7.5A3.5 3.5 0 0 1 7.5 4H17m0 0-3-3m3 3-3 3M20 15v1.5a3.5 3.5 0 0 1-3.5 3.5H7m0 0 3 3m-3-3 3-3"/></svg>',
    send: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M21 3 3 10.4l7.3 2.9m10.7-10.3L13.6 21l-3.3-7.7m10.7-10.3-10.7 10.3"/></svg>'
  };

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function initials(name) {
    return name.split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0); }).join('').toUpperCase();
  }
  function comma(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

  /* ---------------------------------------------- the reproduced post card */
  function postCard(p, opts) {
    opts = opts || {};
    var body = WOV_BODIES[p.body];
    var tag = opts.static ? 'div' : 'a';
    var attrs = opts.static
      ? ''
      : ' href="https://www.linkedin.com/" target="_blank" rel="noopener"' +
        ' aria-label="' + esc(p.name + ' on LinkedIn: ' + body.slice(0, 90)) + '…"';

    return '<' + tag + ' class="wov-post"' + attrs + '>' +
      '<div class="wov-post__header">' +
        '<span class="wov-post__avatar">' + esc(initials(p.name)) + '</span>' +
        '<span class="wov-post__meta">' +
          '<span class="wov-post__name">' + esc(p.name) + '</span>' +
          '<span class="wov-post__headline">' + esc(p.role + ' · ' + p.company) + '</span>' +
          '<span class="wov-post__date">' + esc(p.date) + ' ·' + ICON.globe + '</span>' +
        '</span>' +
        '<span class="wov-post__in" aria-hidden="true"><span>in</span></span>' +
      '</div>' +
      '<div class="wov-post__body' + (p.clamp ? ' is-clamped' : '') + '">' +
        '<p>' + esc(body) + '</p>' +
        (p.clamp ? '<span class="wov-post__more">…more</span>' : '') +
      '</div>' +
      (p.media ? '<div class="wov-post__media"><span>Photo · from the post</span></div>' : '') +
      '<div class="wov-post__stats">' +
        '<span class="wov-post__reactions" aria-hidden="true">' +
          '<i>' + ICON.thumb + '</i><i>' + ICON.heart + '</i><i>' + ICON.clap + '</i>' +
        '</span>' +
        '<span>' + comma(p.reactions) + '</span>' +
        '<span class="wov-post__comments">' + p.comments + ' comments</span>' +
      '</div>' +
      '<div class="wov-post__actions" aria-hidden="true">' +
        '<span class="wov-post__action">' + ICON.like + 'Like</span>' +
        '<span class="wov-post__action">' + ICON.comment + 'Comment</span>' +
        '<span class="wov-post__action">' + ICON.repost + 'Repost</span>' +
        '<span class="wov-post__action">' + ICON.send + 'Send</span>' +
      '</div>' +
    '</' + tag + '>';
  }

  /* ------------------------------------------------------- hero PostCard */
  function heroCard(c) {
    return '<a class="wov-postcard" href="https://www.linkedin.com/" target="_blank" rel="noopener">' +
      '<div class="wov-postcard__header">' +
        '<span class="wov-postcard__avatar"><span>' + esc(initials(c.name)) + '</span></span>' +
        '<span class="wov-postcard__identity">' +
          '<span class="wov-postcard__name">' + esc(c.name) + '</span>' +
          '<span class="wov-postcard__headline">' + esc(c.headline) + '</span>' +
        '</span>' +
        '<span class="wov-postcard__date">' + esc(c.date) + '</span>' +
      '</div>' +
      '<div class="wov-postcard__body">' +
        c.paragraphs.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
      '</div>' +
      '<div class="wov-postcard__media"></div>' +
      '<div class="wov-postcard__stats">' +
        '<span class="wov-reactions wov-post__reactions" aria-hidden="true">' +
          '<i>' + ICON.thumb + '</i><i>' + ICON.heart + '</i><i>' + ICON.clap + '</i>' +
        '</span>' +
        '<span>' + esc(c.reactions) + '</span>' +
        '<span class="wov-spacer"></span>' +
        '<span>' + esc(c.comments) + '</span>' +
      '</div>' +
      '<div class="wov-postcard__footer"><span>Read on LinkedIn</span><span>↗</span></div>' +
    '</a>';
  }

  /* ------------------------------------------------------------- render */
  function byId(id) { return document.getElementById(id); }

  byId('wov-hero-fan').innerHTML = '<div class="wov-hero__fan__track">' +
    WOV_HERO_FAN.concat(WOV_HERO_FAN.slice(0, 1)).map(function (p) {
      return postCard(p, { static: true });
    }).join('') + '</div>';
  byId('wov-hero-card').innerHTML = heroCard(WOV_HERO_CARD);

  /* Act I — three ghosted columns, in the design's column order */
  (function () {
    var cols = [[], [], []];
    WOV_ACT_ONE.forEach(function (p, i) { cols[i % 3].push(p); });
    byId('wov-actone').innerHTML = cols.map(function (col) {
      return '<div class="wov-actone__col">' +
        col.map(function (p) { return postCard(p, { static: true }); }).join('') +
        '</div>';
    }).join('');
  }());

  /* the three blurred posts that flank the pull quote */
  (function () {
    var ghosts = [WOV_ACT_ONE[3], WOV_ACT_ONE[0], WOV_ACT_ONE[8]];
    var nodes = document.querySelectorAll('[data-ghost]');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].innerHTML = postCard(ghosts[i % ghosts.length], { static: true });
    }
  }());

  /* homepage band marquee — the track is doubled so the loop is seamless */
  (function () {
    var mini = WOV_BAND.map(function (p) {
      return '<a class="wov-mini" href="https://www.linkedin.com/" target="_blank" rel="noopener">' +
        '<div class="wov-mini__head">' +
          '<span class="wov-mini__avatar">' + esc(initials(p.name)) + '</span>' +
          '<span>' +
            '<span class="wov-mini__name">' + esc(p.name) + '</span>' +
            '<span class="wov-mini__role">' + esc(p.role) + '</span>' +
          '</span>' +
        '</div>' +
        '<p class="wov-mini__body">' + esc(WOV_BODIES[p.body]) + '</p>' +
      '</a>';
    }).join('');
    byId('wov-marquee-track').innerHTML = mini + mini;
  }());

  /* --------------------------------------------------- archive behaviour */
  var masonry = byId('wov-masonry');
  var empty = byId('wov-empty');
  var emptyHint = byId('wov-empty-hint');
  var countEl = byId('wov-count');
  var searchEl = byId('wov-search');
  var sortEl = byId('wov-sort');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.wov-tab'));

  /* The design's resting count. Sample data, like the 6,404 and 412,880. */
  var CATALOGUE_TOTAL = 140;

  var state = { category: 'all', query: '', sort: 'newest' };

  function columnCount() {
    var w = window.innerWidth;
    if (w <= 639) return 1;
    if (w <= 899) return 2;
    if (w <= 1439) return 3;
    return 4;
  }

  function matches(p) {
    if (state.category !== 'all' && p.category !== state.category) return false;
    if (!state.query) return true;
    var q = state.query.toLowerCase();
    return (p.name + ' ' + p.company + ' ' + p.role).toLowerCase().indexOf(q) !== -1;
  }

  function sorted(list) {
    var out = list.slice();
    if (state.sort === 'reactions') out.sort(function (a, b) { return b.reactions - a.reactions; });
    else if (state.sort === 'oldest') out.reverse();
    return out;
  }

  function render() {
    var list = sorted(WOV_ARCHIVE.filter(matches));
    var n = columnCount();
    var i;

    masonry.innerHTML = '';
    var cols = [];
    for (i = 0; i < n; i++) {
      var col = document.createElement('div');
      col.className = 'wov-masonry__col';
      masonry.appendChild(col);
      cols.push(col);
    }
    /* shortest-column placement, which is what the design's masonry is */
    list.forEach(function (p) {
      var shortest = cols[0];
      cols.forEach(function (c) { if (c.offsetHeight < shortest.offsetHeight) shortest = c; });
      var slot = document.createElement('div');
      slot.className = 'wov-enter';
      slot.innerHTML = postCard(p);
      shortest.appendChild(slot);
    });

    var filtering = state.category !== 'all' || state.query !== '';
    countEl.textContent = filtering
      ? list.length + ' of ' + CATALOGUE_TOTAL + ' posts'
      : CATALOGUE_TOTAL + ' posts';

    empty.classList.toggle('is-visible', list.length === 0);
    masonry.style.display = list.length === 0 ? 'none' : '';
    if (list.length === 0 && state.query) {
      var suggestions = ['PhonePe', 'Wipro', 'Delhivery'];
      emptyHint.textContent = 'Try ' + suggestions.join(', ') + ' — those have posts.';
    } else {
      emptyHint.textContent = '';
    }

    reveal(masonry.querySelectorAll('.wov-enter'));
  }

  /* tablist: arrow-key navigation per spec §5.2 */
  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () { select(index); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next === null) return;
      e.preventDefault();
      select(next);
      tabs[next].focus();
    });
  });

  function select(index) {
    tabs.forEach(function (t, i) {
      t.setAttribute('aria-selected', i === index ? 'true' : 'false');
      t.tabIndex = i === index ? 0 : -1;
    });
    state.category = tabs[index].dataset.category;
    render();
  }

  var debounce;
  searchEl.addEventListener('input', function () {
    clearTimeout(debounce);
    debounce = setTimeout(function () {
      state.query = searchEl.value.trim();
      render();
    }, 200);
  });

  sortEl.addEventListener('change', function () {
    state.sort = sortEl.value;
    render();
  });

  byId('wov-clear').addEventListener('click', function () {
    searchEl.value = '';
    state.query = '';
    select(0);
    tabs[0].focus();
  });

  var resizeCols = columnCount();
  window.addEventListener('resize', function () {
    if (columnCount() === resizeCols) return;
    resizeCols = columnCount();
    render();
  });

  /* ------------------------------------------------------------ motion */
  function reveal(nodes) {
    if (reduced || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(nodes, function (n) { n.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      var shown = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.setProperty('--wov-stagger', Math.min(shown, 5) * 40 + 'ms');
        entry.target.classList.add('is-in');
        shown++;
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(nodes, function (n) { io.observe(n); });
  }

  /* counters — animate once on first intersection, then static forever */
  (function () {
    var values = document.querySelectorAll('[data-count]');
    if (reduced || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        var el = entry.target;
        var target = parseInt(el.dataset.count, 10);
        var useComma = el.dataset.format === 'comma';
        var start = performance.now();
        var dur = 1200;
        (function tick(now) {
          var t = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - t, 3);
          var v = Math.round(target * eased);
          el.textContent = useComma ? comma(v) : String(v);
          if (t < 1) requestAnimationFrame(tick);
        })(start);
      });
    }, { threshold: 0.4 });
    Array.prototype.forEach.call(values, function (v) { io.observe(v); });
  }());

  reveal(document.querySelectorAll('.wov-hero .wov-enter'));

  /* sticky controls condense to 56px, reserving their own height */
  (function () {
    var controls = byId('wov-controls');
    var sentinel = document.createElement('div');
    sentinel.style.height = '1px';
    controls.parentNode.insertBefore(sentinel, controls);
    if (!('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (entries) {
      var e = entries[0];
      /* condense only once the sentinel has passed above the viewport */
      controls.classList.toggle('is-condensed', !e.isIntersecting && e.boundingClientRect.top < 0);
    }, { threshold: 0 }).observe(sentinel);
  }());

  render();
}());

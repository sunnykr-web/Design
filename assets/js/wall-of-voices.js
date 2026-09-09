/* Wall of Voices — archive controls, counters and entrances.
   No dependencies. Everything here is progressive: the page is complete
   and readable with JavaScript switched off. */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ------------------------------------------------------------ archive -- */
  var grid = document.getElementById("wov-grid");
  if (grid) initArchive(grid);

  function initArchive(grid) {
    var chips = Array.prototype.slice.call(document.querySelectorAll(".wov-chip"));
    var search = document.getElementById("wov-search");
    var sort = document.getElementById("wov-sort");
    var count = document.getElementById("wov-count");
    var empty = document.getElementById("wov-empty");
    var clear = document.getElementById("wov-clear");

    /* Snapshot the design's own column assignment before touching the DOM. */
    var posts = Array.prototype.slice.call(grid.querySelectorAll(".wov-post"))
      .map(function (el, i) {
        return {
          el: el,
          order: i,
          column: parseInt(el.closest(".wov-grid__col").dataset.col, 10),
          category: el.dataset.category,
          haystack: (el.dataset.name + " " + el.dataset.company + " " + el.dataset.headline).toLowerCase(),
          reactions: parseInt((el.querySelector(".wov-post__count").textContent || "0").replace(/[^\d]/g, ""), 10)
        };
      });

    var state = { category: "all", query: "", sort: "newest" };

    function columnCount() {
      var w = window.innerWidth;
      if (w <= 640) return 1;
      if (w <= 900) return 2;
      if (w <= 1200) return 3;
      return 4;
    }

    function visible() {
      var q = state.query.trim().toLowerCase();
      var list = posts.filter(function (p) {
        if (state.category !== "all" && p.category !== state.category) return false;
        if (q && p.haystack.indexOf(q) === -1) return false;
        return true;
      });
      if (state.sort === "oldest") list = list.slice().reverse();
      else if (state.sort === "reactions") {
        list = list.slice().sort(function (a, b) { return b.reactions - a.reactions; });
      }
      return list;
    }

    function render() {
      var list = visible();
      var cols = columnCount();
      var pristine = state.category === "all" && !state.query.trim() && state.sort === "newest" && cols === 4;

      var buckets = [];
      for (var i = 0; i < cols; i++) buckets.push([]);

      if (pristine) {
        list.forEach(function (p) { buckets[p.column - 1].push(p); });
      } else {
        /* Shortest-column-first packing keeps the masonry balanced once the
           design's own column assignment no longer applies. */
        var heights = buckets.map(function () { return 0; });
        list.forEach(function (p) {
          var t = 0;
          for (var i = 1; i < cols; i++) if (heights[i] < heights[t]) t = i;
          buckets[t].push(p);
          heights[t] += p.el.offsetHeight || 320;
        });
      }

      var frag = document.createDocumentFragment();
      buckets.forEach(function (bucket, i) {
        var col = document.createElement("div");
        col.className = "wov-grid__col";
        col.dataset.col = String(i + 1);
        bucket.forEach(function (p) { col.appendChild(p.el); });
        frag.appendChild(col);
      });
      grid.textContent = "";
      grid.appendChild(frag);

      grid.hidden = list.length === 0;
      if (empty) empty.hidden = list.length !== 0;
      if (count) {
        /* Silent at rest — the design shows no count line until the reader
           narrows the archive — but always a live region (spec §9). */
        var narrowed = state.category !== "all" || !!state.query.trim();
        count.textContent = narrowed
          ? (list.length === 1 ? "1 post matches" : list.length + " posts match")
          : "";
      }
    }

    chips.forEach(function (chip, i) {
      chip.addEventListener("click", function () { select(i); });
      chip.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight") next = (i + 1) % chips.length;
        else if (e.key === "ArrowLeft") next = (i - 1 + chips.length) % chips.length;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = chips.length - 1;
        if (next === null) return;
        e.preventDefault();
        select(next);
        chips[next].focus();
      });
    });

    function select(i) {
      chips.forEach(function (c, j) {
        var on = i === j;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-selected", on ? "true" : "false");
        c.tabIndex = on ? 0 : -1;
      });
      state.category = chips[i].dataset.category;
      render();
    }

    if (search) {
      var t;
      search.addEventListener("input", function () {
        clearTimeout(t);
        t = setTimeout(function () { state.query = search.value; render(); }, 200);
      });
    }

    if (sort) sort.addEventListener("change", function () { state.sort = sort.value; render(); });

    if (clear) clear.addEventListener("click", function () {
      if (search) search.value = "";
      if (sort) sort.value = "newest";
      state.query = ""; state.sort = "newest";
      select(0);
      if (search) search.focus();
    });

    var last = columnCount();
    window.addEventListener("resize", function () {
      var now = columnCount();
      if (now !== last) { last = now; render(); }
    });

    render();
  }

  /* ----------------------------------------------------------- counters -- */
  var figures = Array.prototype.slice.call(document.querySelectorAll(".wov-ledger__figure"));
  if (figures.length && "IntersectionObserver" in window && !reduced.matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        countUp(entry.target);
      });
    }, { threshold: 0.4 });
    figures.forEach(function (f) { io.observe(f); });
  }

  function countUp(el) {
    var final = el.textContent;
    var digits = final.replace(/[^\d]/g, "");
    if (!digits) return;
    var target = parseInt(digits, 10);
    var grouped = final.indexOf(",") !== -1;
    var start = performance.now();
    var dur = 1200;
    el.style.fontVariantNumeric = "tabular-nums";
    function frame(now) {
      var t = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      var value = Math.round(target * eased);
      el.textContent = grouped ? value.toLocaleString("en-IN").replace(/ /g, ",") : String(value);
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = final;
    }
    requestAnimationFrame(frame);
  }

  /* ---------------------------------------------------------- entrances -- */
  if ("IntersectionObserver" in window && !reduced.matches) {
    var targets = document.querySelectorAll(
      ".wov-post, .wov-bandcard, .wov-profile, .wov-method__grid > div, .wov-quote"
    );
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        seen.unobserve(entry.target);
        entry.target.style.setProperty("--wov-delay", Math.min(i, 5) * 40 + "ms");
        entry.target.classList.add("is-in");
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    Array.prototype.forEach.call(targets, function (el) {
      el.classList.add("wov-reveal");
      seen.observe(el);
    });
  }

  /* -------------------------------------------------------------- band --- */
  var track = document.getElementById("wov-band-track");
  if (track) {
    var viewport = track.parentElement;
    Array.prototype.forEach.call(document.querySelectorAll(".wov-band__btn"), function (btn) {
      btn.addEventListener("click", function () {
        viewport.scrollBy({ left: parseInt(btn.dataset.dir, 10) * 316 * 2, behavior: reduced.matches ? "auto" : "smooth" });
      });
    });
    if (reduced.matches) viewport.style.overflowX = "auto";
  }
})();

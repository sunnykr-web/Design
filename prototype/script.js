(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------------
     Quotes marquee — build cards from data, duplicate once for a
     seamless CSS-driven loop (marquee scrolls exactly -50%).
     ---------------------------------------------------------------- */
  var quotes = [
    { initials: "AI", name: "Aditya Iyer", role: "Supply Chain Manager, Reliance Retail", body: "Received my degree at the convocation ceremony today. Quietly proud." },
    { initials: "AN", name: "Ananya Nair", role: "HR Business Partner, Wipro", body: "Grateful post. My buddy group from the programme still meets on a call every Sunday, eight months after graduating. That wasn’t in the brochure." },
    { initials: "SG", name: "Sneha Gupta", role: "Operations Manager, Delhivery", body: "Just back from the campus immersion week. Meeting 60 people from my cohort in person after a year of seeing them in little squares was something else." },
    { initials: "SN", name: "Sanjay Nair", role: "Business Analyst, Deloitte", body: "Six months ago I finished the programme. Today I got promoted to lead the team I used to report to. Connecting those dots publicly for anyone weighing this up." },
    { initials: "RM", name: "Ritika Menon", role: "Data Engineer, PhonePe", body: "Just back from the campus immersion week. Meeting 60 people from my cohort in person after a year of seeing them in little squares was something else." },
    { initials: "NI", name: "Nikhil Iyer", role: "Product Manager, Swiggy", body: "Honest review after finishing: the projects are the point. Skip the videos if you must, never skip the projects. Recommended." },
    { initials: "NJ", name: "Neha Joshi", role: "HR Business Partner, Wipro", body: "Received my degree at the convocation ceremony today. Quietly proud." },
    { initials: "LR", name: "Lakshmi Reddy", role: "Data Engineer, PhonePe", body: "Received my degree at the convocation ceremony today. Quietly proud." },
    { initials: "RM", name: "Rohan Menon", role: "Marketing Lead, Nykaa", body: "Six months ago I finished the programme. Today I got promoted to lead the team I used to report to. Connecting those dots publicly for anyone weighing this up." },
    { initials: "LI", name: "Lakshmi Iyer", role: "Sales Head, Asian Paints", body: "Just back from the campus immersion week. Meeting 60 people from my cohort in person after a year of seeing them in little squares was something else." },
    { initials: "IK", name: "Isha Khan", role: "Business Analyst, Deloitte", body: "Just back from the campus immersion week. Meeting 60 people from my cohort in person after a year of seeing them in little squares was something else." },
    { initials: "AS", name: "Arjun Saxena", role: "Operations Manager, Delhivery", body: "Honest review after finishing: the projects are the point. Skip the videos if you must, never skip the projects. Recommended." }
  ];

  var track = document.getElementById("quotes-track");
  if (track) {
    function cardHTML(q) {
      return (
        '<article class="wov-mini-card" role="listitem">' +
          '<div class="wov-mini-card__head">' +
            '<span class="wov-mini-card__avatar" aria-hidden="true">' + q.initials + "</span>" +
            "<div>" +
              '<div class="wov-mini-card__name">' + q.name + "</div>" +
              '<div class="wov-mini-card__role">' + q.role + "</div>" +
            "</div>" +
          "</div>" +
          '<p class="wov-mini-card__body">' + q.body + "</p>" +
        "</article>"
      );
    }
    var html = quotes.map(cardHTML).join("");
    track.innerHTML = html + html; // duplicate for the -50% loop
  }

  /* ----------------------------------------------------------------
     Hero carousel — cycles which post is centred/staggered.
     ---------------------------------------------------------------- */
  var heroTrack = document.querySelector("[data-carousel-track]");
  if (heroTrack) {
    var order = [
      "postcard-ghost--far-l",
      "postcard-ghost--l",
      "postcard-ghost--near-l",
      "postcard-ghost--center",
      "postcard-ghost--near-r",
      "postcard-ghost--r"
    ];
    var cards = Array.prototype.slice.call(heroTrack.children);

    function applyPositions() {
      cards.forEach(function (card, i) {
        order.forEach(function (cls) { card.classList.remove(cls); });
        card.classList.add(order[i % order.length]);
      });
    }

    function rotate(dir) {
      if (dir > 0) {
        cards.push(cards.shift());
      } else {
        cards.unshift(cards.pop());
      }
      applyPositions();
    }

    var prevBtn = document.querySelector("[data-carousel-prev]");
    var nextBtn = document.querySelector("[data-carousel-next]");
    if (prevBtn) prevBtn.addEventListener("click", function () { rotate(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { rotate(1); });

    var autoplay;
    function startAutoplay() {
      if (reduceMotion) return;
      stopAutoplay();
      autoplay = setInterval(function () { rotate(1); }, 5000);
    }
    function stopAutoplay() { if (autoplay) clearInterval(autoplay); }
    heroTrack.addEventListener("mouseenter", stopAutoplay);
    heroTrack.addEventListener("mouseleave", startAutoplay);
    heroTrack.addEventListener("focusin", stopAutoplay);
    heroTrack.addEventListener("focusout", startAutoplay);
    startAutoplay();
  }

  /* ----------------------------------------------------------------
     Generic horizontal-scroll arrow buttons
     (Discover Alumni row — data-scroll-prev/next="<id>")
     ---------------------------------------------------------------- */
  document.querySelectorAll("[data-scroll-prev], [data-scroll-next]").forEach(function (btn) {
    var targetId = btn.getAttribute("data-scroll-prev") || btn.getAttribute("data-scroll-next");
    var isPrev = btn.hasAttribute("data-scroll-prev");
    var el = document.getElementById(targetId);
    if (!el) return;
    btn.addEventListener("click", function () {
      var amount = el.clientWidth * 0.6;
      el.scrollBy({ left: isPrev ? -amount : amount, behavior: reduceMotion ? "auto" : "smooth" });
    });
  });

  /* ----------------------------------------------------------------
     Scroll-reveal for chapter heads and key blocks
     ---------------------------------------------------------------- */
  if (!reduceMotion && "IntersectionObserver" in window) {
    var revealTargets = document.querySelectorAll(
      ".chapter-head, .quote-band__text, .quote-band__byline, .alumni-discover__head, " +
      ".study-panel__heading, .dark-panel__heading, .learner-video-head, .wov-band__head, .cta__content"
    );
    revealTargets.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(8px)";
      el.style.transition = "opacity 520ms cubic-bezier(0.22,1,0.36,1), transform 520ms cubic-bezier(0.22,1,0.36,1)";
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -60px 0px" });
    revealTargets.forEach(function (el) { io.observe(el); });
  }
})();

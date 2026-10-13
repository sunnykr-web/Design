// Keeps the bottom-left V1/V2 switch clear of whichever bottom bar is showing
// (V1's "Paying Now" bar, V2's phone action bar).
(function () {
  const toggle = document.querySelector('.ug-version');
  if (!toggle) return;
  const BARS = '.co-paybar, .ck-mobilebar';

  function place() {
    let lift = 0;
    document.querySelectorAll(BARS).forEach((bar) => {
      const box = bar.getBoundingClientRect();
      const showing = box.height > 0 && getComputedStyle(bar).display !== 'none';
      if (showing && box.bottom >= window.innerHeight - 1) lift = Math.max(lift, window.innerHeight - box.top);
    });
    toggle.style.bottom = 'calc(' + (16 + Math.round(lift)) + 'px + env(safe-area-inset-bottom, 0px))';
  }

  new MutationObserver(place).observe(document.body, { attributes: true, subtree: true, attributeFilter: ['hidden', 'class', 'style'] });
  window.addEventListener('resize', place);
  window.addEventListener('scroll', place, { passive: true });
  window.ugPlaceVersionToggle = place;
  place();
})();

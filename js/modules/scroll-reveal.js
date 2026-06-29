/* scroll-reveal.js — Scroll-reveal animation.
   Adds .in to .reveal elements as they enter the viewport, then stops
   observing each one (animation runs once). */

/* initReveal — observe every .reveal element and fade it in on entry.
   No-op if there are no .reveal elements on the page. */
export function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  /* Observer callback: when an element scrolls into view, add .in to trigger
     the CSS animation, then unobserve it so it only ever fires once. */
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  /* Start observing each target. */
  els.forEach(function (el) { observer.observe(el); });
}

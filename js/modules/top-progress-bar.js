/* top-progress-bar.js — Top reading-progress bar.
   The bar's width tracks how far the page has been scrolled. */

/* initProgress — bind the scroll/resize listeners that size the bar.
   No-op if the bar element isn't on the page. */
export function initProgress() {
  const bar = document.getElementById('scrollbar');
  if (!bar) return;

  const root = document.documentElement;

  /* update — set the bar width to the % of the page that's been scrolled
     (guards against divide-by-zero on pages shorter than the viewport). */
  function update() {
    const scrollable = root.scrollHeight - root.clientHeight;
    bar.style.width = (scrollable > 0 ? (root.scrollTop / scrollable) * 100 : 0) + '%';
  }

  /* Recompute on scroll and on resize, plus once now for the initial state. */
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

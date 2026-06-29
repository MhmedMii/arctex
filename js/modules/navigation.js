/* navigation.js — Sticky navigation bar state.
   Adds .scrolled to the nav once the page is scrolled past 60px. */

/* initNav — watch the scroll position and toggle the nav's .scrolled class.
   That class drives the condensed / solid-background nav style. No-op if the
   nav isn't on the page. */
export function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  /* Scroll handler: nav is "scrolled" once past 60px from the top. */
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

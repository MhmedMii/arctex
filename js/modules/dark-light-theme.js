/* dark-light-theme.js — Light / dark theme toggle.
   Owns the 'arctex-theme' preference. On first visit the theme follows the
   visitor's OS setting (prefers-color-scheme); once they click the toggle,
   their choice is saved and wins from then on. The initial value is applied
   pre-paint by the inline <head> script (kept inline to avoid FOUC). */

const STORAGE_KEY = 'arctex-theme';
const root = document.documentElement;
const osPref = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;

/* initTheme — wire the header toggle button and keep following the OS until
   the visitor makes a manual choice. No-op on pages without the toggle. */
export function initTheme() {
  /* While no manual choice is saved, mirror live OS theme changes. */
  if (osPref) {
    osPref.addEventListener('change', function (e) {
      if (!localStorage.getItem(STORAGE_KEY)) {
        root.setAttribute('data-theme', e.matches ? 'light' : 'dark');
      }
    });
  }

  const btn = document.getElementById('tgl');
  if (!btn) return;

  /* Click handler: swap the current theme to its opposite and save it. */
  btn.addEventListener('click', function () {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
  });
}

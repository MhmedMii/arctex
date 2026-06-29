/* language-toggle.js — Arabic / English language toggle.
   Owns the 'arctex-lang' preference. Keeps <html> lang + dir in sync and
   broadcasts a 'localechange' event so other modules (e.g. the form) can
   react without this module needing to know they exist. */

const STORAGE_KEY = 'arctex-lang';
const root = document.documentElement;

/* applyLocale — single source of truth for a language switch.
   Sets <html lang> + text direction (rtl for Arabic), persists the choice,
   then announces it via a 'localechange' event for any listening module. */
export function applyLocale(lang) {
  root.setAttribute('lang', lang);
  root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  localStorage.setItem(STORAGE_KEY, lang);
  document.dispatchEvent(new CustomEvent('localechange', { detail: { lang: lang } }));
}

/* initLocale — wire the header language button.
   On click, toggle between Arabic and English via applyLocale. No-op if the
   button isn't on the page. */
export function initLocale() {
  const btn = document.getElementById('lang');
  if (!btn) return;

  /* Click handler: flip the active language to the other one. */
  btn.addEventListener('click', function () {
    applyLocale(root.getAttribute('lang') === 'ar' ? 'en' : 'ar');
  });
}

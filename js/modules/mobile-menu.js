/* mobile-menu.js — Mobile navigation drawer.
   Slide-in page menu with backdrop; closes on link click, backdrop tap,
   the close button, or the Escape key. Locks body scroll while open. */

/* initDrawer — wire the burger, backdrop, close button and drawer links.
   Bails if the core elements are missing. */
export function initDrawer() {
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  const backdrop = document.getElementById('navBackdrop');
  const drawerClose = document.getElementById('drawerClose');
  if (!burger || !drawer || !backdrop) return;

  /* open — reveal the drawer + backdrop, update ARIA, lock body scroll. */
  function open() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  /* close — hide the drawer + backdrop, reset ARIA, release body scroll. */
  function close() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* Burger opens; backdrop and the close button both close. */
  burger.addEventListener('click', open);
  backdrop.addEventListener('click', close);
  if (drawerClose) drawerClose.addEventListener('click', close);

  /* Tapping any link inside the drawer closes it before navigating. */
  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', close);
  });

  /* Escape key closes the drawer (keyboard accessibility). */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
}

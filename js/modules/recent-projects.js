/* recent-projects.js — Interactive "Recent projects" index.
   Clicking (or hovering, on pointer devices) a project in the list marks it
   active and crossfades the showcase image to that project. Self-contained
   and a no-op when the section isn't on the page. */

export function initRecent() {
  const section = document.querySelector('.recent');
  if (!section) return;

  const items = Array.from(section.querySelectorAll('.recent-item'));
  const media = section.querySelector('.recent-media');
  const img = section.querySelector('.recent-img');
  if (!items.length || !media || !img) return;

  /* Preload every project image so swaps are instant (no flash of empty box). */
  items.forEach(function (item) {
    if (item.dataset.img) { new Image().src = item.dataset.img; }
  });

  let current = items.find(function (i) { return i.classList.contains('is-active'); }) || items[0];

  /* The frame is a fixed ratio in CSS (same height for every project, so the
     layout never jumps when switching). Each item only sets how its photo is
     cropped inside that frame, via data-pos (object-position; default centred).
     The wide ~2:1 shots fill it untouched; the near-square one is cropped. */
  function applyCrop(item) {
    img.style.objectPosition = (item && item.dataset.pos) || 'center';
  }
  applyCrop(current);

  /* select — make `item` the active project and crossfade its image in. */
  function select(item) {
    const src = item.dataset.img;
    if (!src || item === current) return;

    current.classList.remove('is-active');
    current.removeAttribute('aria-current');
    item.classList.add('is-active');
    item.setAttribute('aria-current', 'true');
    current = item;

    /* Fade out, swap the source once decoded, fade back in (frame stays put). */
    media.classList.add('is-swapping');
    const next = new Image();
    next.onload = function () {
      applyCrop(item);
      img.src = src;
      if (item.dataset.alt) { img.alt = item.dataset.alt; }
      media.classList.remove('is-swapping');
    };
    next.src = src;
  }

  items.forEach(function (item) {
    item.addEventListener('click', function () { select(item); });
  });

  /* On pointer devices, hovering a row also previews that project. */
  if (window.matchMedia && window.matchMedia('(hover: hover)').matches) {
    items.forEach(function (item) {
      item.addEventListener('mouseenter', function () { select(item); });
    });
  }
}

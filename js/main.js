/* =============================================================
   ARCTEX — main.js (entry point)

   Every page behavior lives in its own module under js/modules/.
   Each module exposes a single init* function and is fully self-
   contained: to change one feature, edit only its file — nothing
   else depends on its internals. The locale<->form link is done
   through a 'localechange' event, so no module imports another.

   This file just wires the modules up. Loaded with type="module",
   so it runs after the DOM is parsed (no DOMContentLoaded needed).

   Modules:
     dark-light-theme.js     1. Light / dark theme toggle
     language-toggle.js    2. Arabic / English language toggle (+ RTL)
     navigation.js       3. Sticky-nav state on scroll
     mobile-menu.js    4. Mobile navigation drawer
     scroll-reveal.js    5. Scroll-reveal for .reveal elements
     top-progress-bar.js  6. Top reading-progress bar
     recent-projects.js    7. Interactive "Recent projects" index (home)
     contact-form.js      8. Client enquiry form
   ============================================================= */

import { initTheme }    from './modules/dark-light-theme.js?v=20260614a';
import { initLocale }   from './modules/language-toggle.js';
import { initNav }      from './modules/navigation.js';
import { initDrawer }   from './modules/mobile-menu.js';
import { initReveal }   from './modules/scroll-reveal.js';
import { initProgress } from './modules/top-progress-bar.js';
import { initRecent }   from './modules/recent-projects.js?v=20260614e';
import { initForm }     from './modules/contact-form.js?v=20260624c';

/* 
   Boot every feature. Order is intentional: theme + locale first so the
   page is in the right state before the rest bind their listeners. Each
   init is a no-op when its element isn't on the current page, so the same
   bundle runs safely on all pages. 
*/

initTheme();
initLocale();
initNav();
initDrawer();
initReveal();
initProgress();
initRecent();
initForm();

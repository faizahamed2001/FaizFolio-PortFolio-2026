/* =================================================================
   Faiz — Portfolio behaviour (vanilla JS, no dependencies)
   Handles:
     1. Theme toggle (persisted in localStorage)
     2. Mobile hamburger menu
     3. Sticky-header shadow on scroll
     4. Scroll-reveal animations (Intersection Observer)
     5. Count-up for the "years of experience" highlight
     6. Footer year
   Everything degrades gracefully and respects prefers-reduced-motion.
   ================================================================= */

(function () {
  'use strict';

  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------- */
  /* 1. THEME TOGGLE                                                 */
  /* --------------------------------------------------------------- */
  const themeToggle = document.getElementById('theme-toggle');

  function syncTogglePressed() {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (themeToggle) themeToggle.setAttribute('aria-pressed', String(isLight));
  }
  syncTogglePressed();

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked */ }
      syncTogglePressed();
    });
  }

  /* --------------------------------------------------------------- */
  /* 2. MOBILE MENU                                                  */
  /* --------------------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  function closeMenu() {
    if (!navToggle || !navLinks) return;
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close after tapping a link (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* --------------------------------------------------------------- */
  /* 3. STICKY HEADER SHADOW                                         */
  /* --------------------------------------------------------------- */
  const header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --------------------------------------------------------------- */
  /* 4. SCROLL-REVEAL (Intersection Observer)                        */
  /* --------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // No animation: just show everything.
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    const io = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // reveal once, then stop watching
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    // Stagger the hero elements slightly for a refined cascade.
    const heroReveals = document.querySelectorAll('.hero__inner [data-reveal]');
    heroReveals.forEach(function (el, i) {
      el.style.setProperty('--reveal-delay', (i * 90) + 'ms');
    });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* --------------------------------------------------------------- */
  /* 5. COUNT-UP for numeric highlights (e.g. years of experience)   */
  /* --------------------------------------------------------------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
    const counterIO = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { counterIO.observe(el); });
  }

  function animateCount(el) {
    const target = parseFloat(el.getAttribute('data-count')) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1100;
    let start = null;

    function tick(ts) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* --------------------------------------------------------------- */
  /* 6. FOOTER YEAR                                                  */
  /* --------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();

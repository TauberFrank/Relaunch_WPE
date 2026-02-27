/**
 * nav.js — Mobile-Menu-Toggle
 */
(function () {
  'use strict';

  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('mobile-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    const isOpen = menu.classList.contains('is-open');

    if (isOpen) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-label', 'Menü öffnen');
      document.body.style.overflow = '';
    } else {
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-label', 'Menü schließen');
      document.body.style.overflow = 'hidden';
    }
  });

  // Schließen bei Klick auf Links
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  // Schließen bei Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      toggle.focus();
    }
  });

  // Aktive Seite markieren
  const currentPath = window.location.pathname;
  document.querySelectorAll('.main-nav__link, .mobile-menu__link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && href !== '/' && currentPath.startsWith(href)) {
      link.classList.add('main-nav__link--active');
      link.classList.add('mobile-menu__link--active');
    } else if (href === '/' && currentPath === '/') {
      link.classList.add('main-nav__link--active');
    }
  });

}());

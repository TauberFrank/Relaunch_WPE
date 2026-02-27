/**
 * lazy-images.js — IntersectionObserver für Bilder
 * Fallback für Browser ohne natives loading="lazy"
 */
(function () {
  'use strict';

  // Natives lazy loading wird von modernen Browsern unterstützt.
  // Dieses Script ergänzt es für ältere Browser.
  if ('loading' in HTMLImageElement.prototype) return;
  if (!('IntersectionObserver' in window)) return;

  const images = document.querySelectorAll('img[loading="lazy"]');
  if (!images.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
      observer.unobserve(img);
    });
  }, {
    rootMargin: '200px 0px'
  });

  images.forEach(function (img) {
    observer.observe(img);
  });

}());

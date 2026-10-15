(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function init() {
    var counters = document.querySelectorAll('.stats b');
    if (!counters.length) {
      window.setTimeout(init, 250);
      return;
    }

  function countTo(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = 'true';
    var raw = (el.textContent || '').trim();
    var match = raw.match(/^(\d+)(.*)$/);
    if (!match) return;
    var target = Number(match[1]);
    var suffix = match[2] || '';
    if (reduceMotion || !target) {
      el.textContent = raw;
      return;
    }
    var start = performance.now();
    var duration = 850;
    function frame(now) {
      var progress = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if (!('IntersectionObserver' in window) || reduceMotion) {
    counters.forEach(countTo);
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stats b').forEach(countTo);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  var section = document.querySelector('#sobre') || document.querySelector('.trust');
  if (section) observer.observe(section);
  }
  init();
})();

(function () {
  'use strict';
  function syncFaq() {
    document.querySelectorAll('.question').forEach(function (item) {
      item.classList.toggle('active', !!item.querySelector('p'));
    });
  }
  syncFaq();
  new MutationObserver(syncFaq).observe(document.body, { childList: true, subtree: true });
})();

(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function init() {
    var counters = document.querySelectorAll('.stats b');
    if (!counters.length) {
      window.setTimeout(init, 250);
      return;
    }

    var gallery = document.querySelector('#portfolio .gallery');
    if (gallery && !gallery.dataset.curated) {
      gallery.dataset.curated = 'true';
      var projects = [
        ['/comunicar-espaco-baby-4k.png', 'FACHADA COMERCIAL EM ACM', 'Aplicação de comunicação visual para negócio local.'],
        ['/toldo-comercial.jpeg', 'TOLDOS E PROTEÇÃO DE FACHADA', 'Soluções de cobertura e acabamento para entradas comerciais.'],
        ['/comunicar-projeto-3d-4k.png', 'PROJETO 3D DE FACHADA', 'Pré-visualização da fachada antes da produção e instalação.'],
        ['/comunicar-embalagens.png', 'PROJETOS DE GRANDE PORTE', 'Produção e instalação com estrutura completa.'],
        ['/comunicar-totem.png', 'TOTENS E ELEMENTOS 3D', 'Elementos de destaque para reforçar a marca.'],
        ['/comunicar-boutique.png', 'FACHADAS COMERCIAIS', 'Composição visual alinhada ao posicionamento do negócio.']
      ];
      gallery.innerHTML = projects.map(function (project, index) {
        return '<figure class="reveal ' + (index === 0 ? 'big' : '') + '"><img src="' + project[0] + '" alt="' + project[1] + '" loading="lazy"><figcaption><strong>' + project[1] + '</strong><small>' + project[2] + '</small></figcaption></figure>';
      }).join('');
    }

    var serviceImage = document.querySelector('.service .cols > div:first-child img');
    if (!serviceImage) {
      var serviceHeading = Array.prototype.slice.call(document.querySelectorAll('h2')).find(function (heading) {
        return (heading.textContent || '').indexOf('Fachadas completas') !== -1;
      });
      serviceImage = serviceHeading && serviceHeading.closest('section, .blue, .new-service-section') && serviceHeading.closest('section, .blue, .new-service-section').querySelector('img');
    }
    if (serviceImage && !serviceImage.dataset.curated) {
      serviceImage.dataset.curated = 'true';
      serviceImage.alt = 'Fachada comercial em ACM realizada pela COMUNICAR';
      var visual = serviceImage.parentElement;
      if (visual && !visual.querySelector('.service-extra-projects')) {
        var extras = document.createElement('div');
        extras.className = 'service-extra-projects';
        extras.innerHTML = '<img src="/comunicar-espaco-baby-4k.png" alt="Fachada do Espaço Baby em ACM" loading="lazy"><img src="/comunicar-otica-toldos-4k.png" alt="Fachada da Ótica Nova Visão com toldos" loading="lazy">';
        visual.appendChild(extras);
      }
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

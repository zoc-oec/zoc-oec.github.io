/* Will-Lab Portal - client-side JS */
(function () {
  'use strict';

  /* ----- Mobile nav toggle ----- */
  var toggle = document.querySelector('.nav__toggle');
  var links  = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
    });
    /* close on link click */
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  /* ----- Active nav link ----- */
  var current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(function (a) {
    var href = a.getAttribute('href').split('/').pop();
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ----- Language toggle (EN / Chinese) ----- */
  (function () {
    var btn = document.querySelector('.lang-toggle');
    if (!btn) return;
    function apply(lang) {
      document.querySelectorAll('[data-zh]').forEach(function (el) {
        if (el.getAttribute('data-en') === null) el.setAttribute('data-en', el.innerHTML);
        el.innerHTML = (lang === 'zh') ? el.getAttribute('data-zh') : el.getAttribute('data-en');
      });
      document.documentElement.lang = (lang === 'zh') ? 'zh-CN' : 'en';
      btn.textContent = (lang === 'zh') ? 'EN' : '\u4e2d\u6587';
      try { localStorage.setItem('wl-lang', lang); } catch (e) {}
    }
    var saved = 'en';
    try { saved = localStorage.getItem('wl-lang') || 'en'; } catch (e) {}
    apply(saved);
    btn.addEventListener('click', function () {
      apply(btn.textContent === 'EN' ? 'en' : 'zh');
    });
  })();

  /* ----- Day / Night theme toggle ----- */
  (function () {
    var SUN = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5 5l1.4 1.4M17.6 17.6 19 19M19 5l-1.4 1.4M6.4 17.6 5 19"/></svg>';
    var MOON = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
    var langBtn = document.querySelector('.lang-toggle');
    if (!langBtn) return;
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle day / night mode');
    var li = document.createElement('li');
    li.appendChild(btn);
    var langLi = langBtn.closest('li');
    langLi.parentNode.insertBefore(li, langLi);
    function setIcon(t) { btn.innerHTML = (t === 'light') ? MOON : SUN; }
    function apply(t) {
      document.documentElement.setAttribute('data-theme', t);
      setIcon(t);
      try { localStorage.setItem('wl-theme', t); } catch (e) {}
    }
    setIcon(document.documentElement.getAttribute('data-theme') || 'light');
    btn.addEventListener('click', function () {
      var c = document.documentElement.getAttribute('data-theme') || 'light';
      apply(c === 'light' ? 'dark' : 'light');
    });
  })();

  /* ----- Animated counters ----- */
  var counters = document.querySelectorAll('.hero__stat-num, .info-band__stat strong');
  if (counters.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target; io.unobserve(el);
        var raw = (el.getAttribute('data-target') || el.textContent).trim();
        var m = raw.match(/^([0-9]*\.?[0-9]+)(.*)$/);
        if (!m) return;
        el.setAttribute('data-target', raw);
        var target = parseFloat(m[1]), suffix = m[2], dec = m[1].indexOf('.') >= 0 ? 1 : 0;
        var dur = 1500, t0 = performance.now();
        (function tick(now) {
          var p = Math.min(1, (now - t0) / dur);
          var val = target * (1 - Math.pow(1 - p, 3));
          el.textContent = (dec ? val.toFixed(1) : Math.round(val)) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (n) { io.observe(n); });
  }

  /* ----- Scroll reveal animation ----- */
  if ('IntersectionObserver' in window) {
    var revSel = '.sec-hd, .feature-item, .cohort-card, .research-card, .pub-frame, .chart-card, .team-photo, .faculty-card, .da-step, .cohort-overview__card, .team-pi, .join-us, .team-bottom > *, .cta-banner';
    var revs = [].slice.call(document.querySelectorAll(revSel));
    if (revs.length) {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('reveal--in'); ro.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revs.forEach(function (el, idx) {
        el.classList.add('reveal');
        el.style.transitionDelay = ((idx % 4) * 70) + 'ms';
        ro.observe(el);
      });
    }
  }

  /* ----- Faculty bio modal ----- */
  var fmodal = document.getElementById('faculty-modal');
  if (fmodal) {
    var fbody = fmodal.querySelector('.fmodal__content');
    function openFaculty(card) {
      var d = card.querySelector('.faculty-detail');
      if (!d) return;
      fbody.innerHTML = d.innerHTML;
      fmodal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeFaculty() {
      fmodal.classList.remove('open');
      document.body.style.overflow = '';
    }
    document.querySelectorAll('.faculty-card[data-bio]').forEach(function (card) {
      card.addEventListener('click', function () { openFaculty(card); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFaculty(card); }
      });
    });
    fmodal.addEventListener('click', function (e) {
      if (e.target === fmodal || e.target.classList.contains('fmodal__close')) closeFaculty();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeFaculty();
    });
  }

  /* ----- Custom chart tooltip (publications.html) ----- */
  (function () {
    var hits = document.querySelectorAll('.chart-hit');
    if (!hits.length) return;
    var tip = document.createElement('div');
    tip.className = 'chart-tip';
    tip.style.display = 'none';
    document.body.appendChild(tip);
    function move(e) {
      tip.style.left = e.clientX + 'px';
      tip.style.top  = (e.clientY - 16) + 'px';
    }
    function show(e) {
      var t = e.currentTarget;
      tip.innerHTML = '<span class="chart-tip__y">' + t.getAttribute('data-ty') +
                      '</span><span class="chart-tip__v">' + t.getAttribute('data-tv') + '</span>';
      tip.style.display = 'block';
      move(e);
    }
    function hide() { tip.style.display = 'none'; }
    hits.forEach(function (h) {
      h.addEventListener('mouseenter', show);
      h.addEventListener('mousemove', move);
      h.addEventListener('mouseleave', hide);
    });
  })();

  /* ----- News gallery lightbox (news.html) ----- */
  (function () {
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    var tiles = [].slice.call(document.querySelectorAll('.news-tile'));
    if (!tiles.length) return;
    var imgEl = lb.querySelector('.lightbox__img');
    var idx = 0;
    function show(i) { idx = (i + tiles.length) % tiles.length; imgEl.src = tiles[idx].getAttribute('data-full'); }
    function open(i) { show(i); lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }
    tiles.forEach(function (t, i) { t.addEventListener('click', function () { open(i); }); });
    lb.querySelector('.lightbox__close').addEventListener('click', close);
    lb.querySelector('.lightbox__prev').addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
    lb.querySelector('.lightbox__next').addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(idx - 1);
      else if (e.key === 'ArrowRight') show(idx + 1);
    });
  })();

  /* ----- Publication filters (publications.html only) ----- */
  var filterArea = document.getElementById('pub-filters');
  if (!filterArea) return;

  var searchInput  = document.getElementById('pub-search');
  var cohortBtns   = document.querySelectorAll('.filter-btn[data-cohort]');
  var yearBtns     = document.querySelectorAll('.filter-btn[data-year]');
  var kwBtns       = document.querySelectorAll('.kw-btn');
  var countEl      = document.getElementById('pub-count');
  var pubContainer = filterArea.closest('.container');
  var items        = Array.from(document.querySelectorAll('.pub-item'));

  function sortPublicationsByYear() {
    if (!pubContainer || !items.length) return;

    var grouped = {};
    items.forEach(function (item) {
      var year = item.dataset.year || 'Other';
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(item);
    });

    Array.from(pubContainer.querySelectorAll('.year-section')).forEach(function (section) {
      section.remove();
    });

    Object.keys(grouped).sort(function (a, b) {
      return Number(b) - Number(a);
    }).forEach(function (year) {
      var section = document.createElement('div');
      section.className = 'year-section';
      section.dataset.year = year;

      var heading = document.createElement('div');
      heading.className = 'year-heading';
      heading.textContent = year;

      var list = document.createElement('div');
      list.className = 'pub-list';

      grouped[year].sort(function (a, b) {
        return (b.classList.contains('featured') ? 1 : 0) - (a.classList.contains('featured') ? 1 : 0);
      }).forEach(function (item) {
        list.appendChild(item);
      });

      section.appendChild(heading);
      section.appendChild(list);
      pubContainer.appendChild(section);
    });
  }

  sortPublicationsByYear();
  items = Array.from(document.querySelectorAll('.pub-item'));

  function getFilters() {
    var activeCohort = document.querySelector('.filter-btn[data-cohort].active');
    var activeYear   = document.querySelector('.filter-btn[data-year].active');
    return {
      cohort: activeCohort ? activeCohort.dataset.cohort : 'all',
      year:   activeYear   ? activeYear.dataset.year     : 'all',
      q:      searchInput  ? searchInput.value.trim().toLowerCase() : ''
    };
  }

  function applyFilters() {
    var f = getFilters();
    var visible = 0;
    items.forEach(function (item) {
      var c = item.dataset.cohort || 'all';
      var y = item.dataset.year   || '';
      var txt = item.textContent.toLowerCase();
      var ok = (f.cohort === 'all' || c === f.cohort) &&
               (f.year   === 'all' || y === f.year)   &&
               (!f.q || txt.includes(f.q));
      item.classList.toggle('pub-hidden', !ok);
      if (ok) visible++;
    });
    if (countEl) countEl.textContent = 'Showing ' + visible + ' of ' + items.length + ' publications';

    /* hide empty year sections */
    document.querySelectorAll('.year-section').forEach(function (sec) {
      var anyVisible = Array.from(sec.querySelectorAll('.pub-item'))
                            .some(function (i) { return !i.classList.contains('pub-hidden'); });
      sec.classList.toggle('pub-hidden', !anyVisible);
    });
  }

  cohortBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      cohortBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyFilters();
    });
  });

  yearBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      yearBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyFilters();
    });
  });

  /* ----- Keyword chips -> search + persistent highlight ----- */
  function syncKeyword(val) {
    kwBtns.forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-q') === val);
    });
  }
  kwBtns.forEach(function (t) {
    t.addEventListener('click', function () {
      if (!searchInput) return;
      var wasActive = t.classList.contains('active');
      if (wasActive) {
        t.classList.remove('active');
        searchInput.value = '';
      } else {
        syncKeyword(t.getAttribute('data-q'));
        searchInput.value = t.getAttribute('data-q');
      }
      applyFilters();
    });
  });

  if (searchInput) searchInput.addEventListener('input', function () {
    syncKeyword(searchInput.value.trim().toLowerCase());
    applyFilters();
  });

  /* ----- Deep-link: ?cohort=zap pre-selects a cohort ----- */
  (function () {
    var params = new URLSearchParams(location.search);
    var pc = params.get('cohort');
    if (!pc) return;
    var target = document.querySelector('.filter-btn[data-cohort="' + pc.toLowerCase() + '"]');
    if (!target) return;
    cohortBtns.forEach(function (b) { b.classList.remove('active'); });
    target.classList.add('active');
    requestAnimationFrame(function () {
      filterArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  })();

  applyFilters(); /* initial run */
})();

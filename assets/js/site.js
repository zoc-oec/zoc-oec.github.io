/* ZOC-OEC Portal – client-side JS */
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

  /* ----- Publication filters (publications.html only) ----- */
  var filterArea = document.getElementById('pub-filters');
  if (!filterArea) return;

  var searchInput  = document.getElementById('pub-search');
  var cohortBtns   = document.querySelectorAll('.filter-btn[data-cohort]');
  var yearSelect   = document.getElementById('year-filter');
  var countEl      = document.getElementById('pub-count');
  var items        = Array.from(document.querySelectorAll('.pub-item'));

  function getFilters() {
    var activeCohort = document.querySelector('.filter-btn[data-cohort].active');
    return {
      cohort: activeCohort ? activeCohort.dataset.cohort : 'all',
      year:   yearSelect   ? yearSelect.value              : 'all',
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

  if (yearSelect)   yearSelect.addEventListener('change', applyFilters);
  if (searchInput)  searchInput.addEventListener('input',  applyFilters);

  applyFilters(); /* initial run */
})();

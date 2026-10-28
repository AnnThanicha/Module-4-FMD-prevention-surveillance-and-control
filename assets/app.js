(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role=tab]'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('[role=tabpanel]'));
  if (!tabs.length) return;
  var tabbar = document.querySelector('.tabbar');

  function idOf(el) { return el.id.replace(/^[tp]-/, ''); }

  function show(id, opts) {
    opts = opts || {};
    var found = false;
    tabs.forEach(function (t) {
      var on = idOf(t) === id;
      if (on) found = true;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      if (on && opts.scrollTab !== false) {
        try { t.scrollIntoView({ block: 'nearest', inline: 'center' }); } catch (e) {}
      }
    });
    if (!found) return false;
    panels.forEach(function (p) { p.hidden = idOf(p) !== id; });
    if (opts.push) {
      try { history.replaceState(null, '', '#' + id); } catch (e) { location.hash = id; }
    }
    if (opts.scrollTop) {
      var top = tabbar ? tabbar.getBoundingClientRect().top + window.pageYOffset - 0 : 0;
      window.scrollTo(0, Math.max(0, top - 4));
    }
    return true;
  }

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { show(idOf(t), { push: true, scrollTop: false }); });
    t.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') n = tabs[0];
      else if (e.key === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); show(idOf(n), { push: true }); n.focus(); }
    });
  });

  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-go]') : null;
    if (b) { show(b.getAttribute('data-go'), { push: true, scrollTop: true }); }
  });

  window.addEventListener('hashchange', function () {
    var id = location.hash.slice(1);
    if (id) show(id, { scrollTop: false });
  });

  var start = location.hash.slice(1);
  if (!start || !show(start, { scrollTab: true })) show(idOf(tabs[0]), { scrollTab: false });
})();

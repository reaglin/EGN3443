(function(){
  var s = document.createElement('style');
  s.textContent =
    '.pm-embed-link{font-size:.82em;margin-left:.45em;color:#1a6fb4;text-decoration:none;white-space:nowrap}'
    + '.pm-embed-hub{display:inline-block;margin:10px 0;padding:7px 14px;background:#eef4fb;'
    + 'border:1px solid #cfe0f0;border-radius:8px;color:#1a3c6e;text-decoration:none;font-weight:600}';
  document.head.appendChild(s);

  function norm(h){ if(!h) return ''; h = h.split('#')[0].split('?')[0]; return h.replace(/^\.\//,''); }

  fetch('embed-artifacts.json').then(function(r){ return r.json(); }).then(function(items){
    var map = {};
    (items||[]).forEach(function(it){ map[norm(it.href)] = it; });

    document.querySelectorAll('a[href]').forEach(function(a){
      var raw = a.getAttribute('href') || '';
      // Links into a section of a page (the topic cards) are not offered: the page is,
      // once, where it is linked whole. The module page itself is on the hub below.
      if(raw.indexOf('#') >= 0) return;
      var key = norm(raw);
      if(!key || key === 'index.html' || a.hasAttribute('data-pm-embed')) return;
      var it = map[key]; if(!it) return;
      a.setAttribute('data-pm-embed','1');
      var name = it.title || a.textContent.trim();
      var em = document.createElement('a');
      em.className = 'pm-embed-link';
      em.href = 'embed.html?u=' + encodeURIComponent(key) + '&t=' + encodeURIComponent(name);
      em.textContent = '(Embed)';
      em.title = 'Get LMS embed code for this page';
      em.setAttribute('aria-label', 'Embed code for ' + name);
      a.insertAdjacentElement('afterend', em);
    });

    var hub = document.createElement('a');
    hub.className = 'pm-embed-hub';
    hub.href = 'embed.html';
    hub.textContent = '\u{1F517} Embed a page in your LMS';
    // At the bottom of the page: it is for the teacher, not the student.
    var main = document.querySelector('main') || document.body;
    main.appendChild(hub);
  }).catch(function(){});
})();
/* Renders one language of cv.json into a container.
   Usage: <script>renderCv('nl')</script> after the cv-content div. */
(function () {
  function escapeText(s) {
    return String(s || '').replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
  }
  function renderBlock(b) {
    /* content is trusted HTML (it may contain inline <strong>, <a href>, <br/>, etc.
       from the original page or as edited by the maintainer). */
    if (b.type === 'h2') return '<h2>' + (b.content || '') + '</h2>';
    return '<p>' + (b.content || '') + '</p>';
  }
  window.renderCv = function (lang) {
    var container = document.getElementById('cv-content');
    if (!container) return;
    fetch('cv.json', { cache: 'no-cache' })
      .then(r => r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status)))
      .then(all => {
        var cv = all[lang];
        if (!cv) { container.innerHTML = '<p>(geen CV voor taal ' + escapeText(lang) + ')</p>'; return; }
        var html = '';
        if (cv.title) html += '<h1>' + escapeText(cv.title) + '</h1>';
        html += cv.blocks.map(renderBlock).join('\n');
        container.innerHTML = html;
      })
      .catch(err => {
        container.innerHTML = '<p style="color:#a00">CV kon niet geladen worden: ' + escapeText(err.message) + '</p>';
      });
  };
})();

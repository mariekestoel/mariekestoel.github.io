/* Renders lessen.json into #lessen-content. */
(function () {
  function escapeText(s) {
    return String(s || '').replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
  }
  function renderBlock(b) {
    if (b.type === 'h2') return '<h2>' + (b.content || '') + '</h2>';
    return '<p align="left">' + (b.content || '') + '</p>';
  }
  var container = document.getElementById('lessen-content');
  if (!container) return;
  fetch('lessen.json', { cache: 'no-cache' })
    .then(r => r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status)))
    .then(data => {
      var html = '';
      if (data.title) html += '<h1>' + escapeText(data.title) + '</h1>';
      html += (data.blocks || []).map(renderBlock).join('\n');
      container.innerHTML = html;
    })
    .catch(err => {
      container.innerHTML = '<p style="color:#a00">Inhoud kon niet geladen worden: ' + escapeText(err.message) + '</p>';
    });
})();

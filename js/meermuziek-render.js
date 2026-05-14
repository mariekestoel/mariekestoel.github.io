/* Renders meermuziek.json into #meermuziek-container.
   Critically: shows nothing at all if the list is empty (the header
   would look awkward without content). */
(function () {
  function escapeAttr(s) { return String(s || '').replace(/[&"<>]/g, c => ({'&':'&amp;','"':'&quot;','<':'&lt;','>':'&gt;'}[c])); }
  function escapeText(s) { return String(s || '').replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])); }

  var container = document.getElementById('meermuziek-container');
  if (!container) return;

  fetch('meermuziek.json', { cache: 'no-cache' })
    .then(r => r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status)))
    .then(items => {
      if (!items || items.length === 0) {
        // Nothing to show — leave container empty so no header appears.
        container.innerHTML = '';
        return;
      }
      var entries = items.map(it =>
        '  <p>' + escapeText(it.description || '') +
        '<br />\n    <audio controls>\n' +
        '      <source src="' + escapeAttr(it.file) + '" type="audio/mpeg">\n' +
        '    </audio>\n  </p>'
      ).join('\n');
      container.innerHTML =
        '<h1>Meer muziek</h1>\n' +
        entries;
    })
    .catch(err => {
      container.innerHTML = '<p style="color:#a00">Meer muziek kon niet geladen worden: ' + escapeText(err.message) + '</p>';
    });
})();

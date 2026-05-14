/* Renders composities.json into #composities-table-container. */
(function () {
  function escapeAttr(s) { return String(s || '').replace(/[&"<>]/g, c => ({'&':'&amp;','"':'&quot;','<':'&lt;','>':'&gt;'}[c])); }
  function escapeText(s) { return String(s || '').replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])); }

  var container = document.getElementById('composities-table-container');
  if (!container) return;

  fetch('composities.json', { cache: 'no-cache' })
    .then(r => r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status)))
    .then(items => {
      var rows = items.map(item =>
        '  <tr>\n' +
        '    <td valign="middle"><h6>' + escapeText(item.title) + '</h6></td>\n' +
        '    <td align="center" valign="middle"><a href="' + escapeAttr(item.link) + '" target="_blank"><img src="Pictures/PDF_icon.gif" width="45" border="0" alt="PDF" /></a></td>\n' +
        '  </tr>'
      ).join('\n');
      container.innerHTML =
        '<table width="550" border="0" cellspacing="5" cellpadding="8">\n' +
        '  <tr>\n' +
        '    <td width="350"><center><h3>Titel</h3></center></td>\n' +
        '    <td width="100"><center><h3>Partituur</h3></center></td>\n' +
        '  </tr>\n' +
        rows + '\n' +
        '</table>';
    })
    .catch(err => {
      container.innerHTML = '<p style="color:#a00">Composities kon niet geladen worden: ' + escapeText(err.message) + '</p>';
    });
})();

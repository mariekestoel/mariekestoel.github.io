/* Fetches /agenda.json and renders the agenda tables.
   The structure of the rendered HTML is intentionally the same as what
   was previously hard-coded in index.htm, so the existing #agendatable
   CSS rules continue to work. */
(function () {
  function escapeAttr(s) {
    return String(s || '').replace(/[&"<>]/g, function (c) {
      return { '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' }[c];
    });
  }

  function escapeText(s) {
    return String(s || '').replace(/[&<>]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c];
    });
  }

  function renderRow(r) {
    var dateCell = '<strong>' + escapeText(r.date) + '</strong>';
    if (r.time) dateCell += ' ' + escapeText(r.time);
    /* desc may contain a small amount of inline HTML (e.g. <i>) that was
       present in the original page, so we trust it rather than escaping. */
    var desc = r.desc || '';
    if (r.link) {
      desc = '<a href="' + escapeAttr(r.link) + '" target="_blank">' + desc + '</a>';
    }
    return '<tr><td>' + dateCell + '</td><td>' + desc + '</td></tr>';
  }

  function renderYear(y) {
    var rows = (y.rows || []).map(renderRow).join('\n      ');
    return '<table id="agendatable">\n' +
           '      <tr><td colspan="2"><strong><u>' + escapeText(y.label) + '</u></strong></td></tr>\n      ' +
           rows + '\n    </table>';
  }

  var container = document.getElementById('agenda-container');
  if (!container) return;

  fetch('agenda.json', { cache: 'no-cache' })
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (years) {
      container.innerHTML = years.map(renderYear).join('\n\n    ');
    })
    .catch(function (err) {
      container.innerHTML = '<p style="color:#a00">De agenda kon niet geladen worden: ' +
        escapeText(err.message) + '</p>';
    });
})();

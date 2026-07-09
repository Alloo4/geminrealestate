(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var toc = document.getElementById('policy-toc');
    var body = document.getElementById('policy-body');
    var metaDate = document.getElementById('policy-updated');
    if (!body) return;

    fetch('/policy-data.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        metaDate.textContent = data.updated || '';

        toc.innerHTML = (data.sections || []).map(function (sec) {
          return '<a href="#' + sec.id + '"><span>' + sec.kicker + '</span><span>' + sec.title + '</span></a>';
        }).join('');

        body.innerHTML = (data.sections || []).map(function (sec) {
          var blocks = (sec.blocks || []).map(function (b) {
            if (b.t === 'h') return '<h3>' + b.text + '</h3>';
            if (b.t === 'p') return '<p>' + b.text + '</p>';
            if (b.t === 'list') return '<ul>' + b.items.map(function (it) { return '<li>' + it + '</li>'; }).join('') + '</ul>';
            return '';
          }).join('');
          return (
            '<div class="policy-section" id="' + sec.id + '">' +
              '<div class="policy-section__kicker">' + sec.kicker + '</div>' +
              '<h2>' + sec.title + '</h2>' +
              blocks +
            '</div>'
          );
        }).join('');
      })
      .catch(function (e) { console.warn('policy data failed to load', e); });
  });
})();

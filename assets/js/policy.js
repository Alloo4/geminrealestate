(function () {
  function getPolicyDataUrl() {
    var candidates = [
      new URL('/policy-data.json', window.location.origin).href,
      new URL('../policy-data.json', window.location.href).href,
      new URL('./policy-data.json', window.location.href).href,
      new URL('policy-data.json', window.location.href).href
    ];

    return candidates.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
  }

  function renderPolicy(data, toc, body, metaDate) {
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
  }

  document.addEventListener('DOMContentLoaded', function () {
    var toc = document.getElementById('policy-toc');
    var body = document.getElementById('policy-body');
    var metaDate = document.getElementById('policy-updated');
    if (!body || !toc || !metaDate) return;

    var dataUrls = getPolicyDataUrl();
    var requestIndex = 0;

    function attemptLoad() {
      if (requestIndex >= dataUrls.length) {
        body.innerHTML = '<p>Policy content is temporarily unavailable. Please refresh the page or contact us at geminrealestate@gmail.com.</p>';
        return;
      }

      fetch(dataUrls[requestIndex])
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        })
        .then(function (data) {
          renderPolicy(data, toc, body, metaDate);
        })
        .catch(function (e) {
          requestIndex += 1;
          attemptLoad();
        });
    }

    attemptLoad();
  });
})();

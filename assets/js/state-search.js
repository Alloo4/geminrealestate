(function () {
  var coveredMarkets = {
    'Alabama': 'Birmingham, Huntsville, and Mobile',
    'Arizona': 'Phoenix, Tucson, and Mesa',
    'Florida': 'Miami, Tampa, Orlando, and Jacksonville',
    'Georgia': 'the Atlanta metro and secondary cities',
    'Kentucky': 'Louisville and Lexington',
    'North Carolina': 'Charlotte, Raleigh, and the Triad',
    'Ohio': 'Columbus, Cleveland, and Cincinnati',
    'Oregon': 'Portland and emerging secondary markets',
    'Tennessee': 'Nashville, Memphis, and Knoxville',
    'Texas': 'Dallas–Fort Worth, Houston, Austin, and San Antonio',
    'Virginia': 'Northern Virginia, Richmond, and Hampton Roads',
    'Washington': 'the Seattle metro and eastern Washington',
    'West Virginia': 'Charleston, Huntington, and affordable entry markets'
  };

  var allStates = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

  document.addEventListener('DOMContentLoaded', function () {
    var input = document.getElementById('state-query');
    var matchesBox = document.getElementById('state-matches');
    var resultBox = document.getElementById('state-result');
    var chips = document.querySelectorAll('.state-chip');
    if (!input) return;

    function renderResult(name) {
      var covered = !!coveredMarkets[name];
      resultBox.innerHTML = '';
      var wrap = document.createElement('div');
      wrap.className = 'state-result' + (covered ? ' state-result--covered' : '');

      var title = document.createElement('div');
      title.className = 'state-result__title';
      title.textContent = covered
        ? 'Yes — we have private money lenders in ' + name + '.'
        : 'No private money coverage in ' + name + ' — yet.';
      wrap.appendChild(title);

      var text = document.createElement('div');
      text.className = 'state-result__text';
      text.textContent = covered
        ? 'Serving ' + coveredMarkets[name] + '. Submit your deal and we’ll match it to gap, lien position, and fix & flip lenders active in ' + name + '.'
        : 'Our private money network currently covers 13 states. But our transactional funding network covers all 50 — including ' + name + '.';
      wrap.appendChild(text);

      var cta = document.createElement('a');
      if (covered) {
        cta.href = 'https://tally.so/r/31BNEW';
        cta.className = 'link-cta link-cta--on-dark';
        cta.textContent = 'Submit Your Deal →';
      } else {
        cta.href = '/transactional-funding/';
        cta.className = 'btn btn-outline-dark';
        cta.textContent = 'See Transactional Funding →';
      }
      wrap.appendChild(cta);

      resultBox.appendChild(wrap);
      resultBox.style.display = 'block';
      matchesBox.style.display = 'none';
      matchesBox.innerHTML = '';
    }

    function selectState(name) {
      input.value = name;
      renderResult(name);
    }

    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      resultBox.style.display = 'none';
      resultBox.innerHTML = '';
      if (!q) { matchesBox.style.display = 'none'; matchesBox.innerHTML = ''; return; }
      var matches = allStates.filter(function (n) {
        return n.toLowerCase().indexOf(q) !== -1;
      }).slice(0, 6);
      if (!matches.length) { matchesBox.style.display = 'none'; matchesBox.innerHTML = ''; return; }
      matchesBox.innerHTML = '';
      matches.forEach(function (name) {
        var item = document.createElement('div');
        item.className = 'state-search__match';
        item.textContent = name;
        item.addEventListener('click', function () { selectState(name); });
        matchesBox.appendChild(item);
      });
      matchesBox.style.display = 'block';
    });

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        selectState(chip.getAttribute('data-state'));
      });
    });
  });
})();

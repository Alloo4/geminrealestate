(function () {
  var allStates = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

  var stateAbbrevs = { 'Alabama':'AL','Alaska':'AK','Arizona':'AZ','Arkansas':'AR','California':'CA','Colorado':'CO','Connecticut':'CT','Delaware':'DE','Florida':'FL','Georgia':'GA','Hawaii':'HI','Idaho':'ID','Illinois':'IL','Indiana':'IN','Iowa':'IA','Kansas':'KS','Kentucky':'KY','Louisiana':'LA','Maine':'ME','Maryland':'MD','Massachusetts':'MA','Michigan':'MI','Minnesota':'MN','Mississippi':'MS','Missouri':'MO','Montana':'MT','Nebraska':'NE','Nevada':'NV','New Hampshire':'NH','New Jersey':'NJ','New Mexico':'NM','New York':'NY','North Carolina':'NC','North Dakota':'ND','Ohio':'OH','Oklahoma':'OK','Oregon':'OR','Pennsylvania':'PA','Rhode Island':'RI','South Carolina':'SC','South Dakota':'SD','Tennessee':'TN','Texas':'TX','Utah':'UT','Vermont':'VT','Virginia':'VA','Washington':'WA','West Virginia':'WV','Wisconsin':'WI','Wyoming':'WY' };

  var pmlTermsAll = [
    { title: 'PML Option 1', coverage: 'list', states: ['GA'], statesLabel: 'Georgia', lien: '1st', ltv: 'Not listed', term: '6-mo balloon + 6-mo extension', notes: 'Can fund within 24 hours once approved. Fix & flip or other deals if the exit is within 6 months. Prefers single-family homes.' },
    { title: 'PML Option 2', coverage: 'list', states: ['AZ','KY','MO','OH','OR','TN','TX','WA'], statesLabel: 'AZ · KY · MO · OH · OR · TN · TX · WA', lien: '1st & 2nd with collateral', ltv: '70% CLTV', term: '10–12 months + extensions', notes: 'Fix & flips, commercial, creative finance, rentals/BRRRR, cash-out refi, probates, small business seed capital. No credit/income verification. No 3rd party appraisals. Close in 10 days or less.' },
    { title: 'PML Option 3', coverage: 'exceptTX', states: [], statesLabel: 'All states except TX', lien: '2nd', ltv: 'Max 80% of ARV', term: '6 months', notes: 'Loan amounts $20k–$100k. Above $100k requires experience in the area, cross collateral, and liquid personal assets. Minimal permitting / small rehabs preferred. 25%–30% cash on cash return.' },
    { title: 'PML Option 4', coverage: 'list', states: ['TN','NC','VA','AL','GA'], statesLabel: 'TN · NC · VA · AL · GA', lien: '1st preferred & 2nd', ltv: 'Not listed', term: '9 months', notes: 'Funding in as little as 48 hours. Up to 100% purchase and 100% construction.' },
    { title: 'PML Option 5', coverage: 'nationwide', states: [], statesLabel: 'Nationwide — land only', lien: '1st lien, land only', ltv: 'Under 50%', term: '12 months', notes: 'Land deals only — price of property does not matter. Lots above 5,000 sqft. Signed PSA required. No wetlands, flood zones, or HOA.' },
    { title: 'PML Option 6', coverage: 'list', states: ['TX'], statesLabel: 'Texas', lien: '1st', ltv: '75% LTV / 90% LTC', term: '12–18 months', notes: 'Fast funding. Minimum 650 credit score. Ground-up construction, fix & flip, bridge, DSCR.' },
    { title: 'PML Option 7', coverage: 'list', states: ['NC','WV','OH','GA'], statesLabel: 'NC · WV · OH · GA', lien: '1st', ltv: 'Up to 70% LTARV / 90% LTC', term: '210 days', notes: '100% financing up to $3M. Fix & flips — SFH/MFH up to 4 units. Zero points and no monthly payments. Early payoff discounts. Minimum FICO 620.' },
    { title: 'PML Option 8', coverage: 'list', states: ['FL'], statesLabel: 'Florida', lien: '1st', ltv: 'Under 65%, max 75%', term: 'Not listed', notes: 'Bridge, construction, DSCR, cash-out/refi. 100% purchase and rehab financing with cross collateral. Florida-based lender.' }
  ];

  function cardHTML(t) {
    var tile = '<div class="term-card__placeholder"><div class="term-card__placeholder-wordmark">GIREC</div><div class="term-card__placeholder-label">PML Terms</div></div>';
    return (
      '<div class="term-card">' +
        '<div class="term-card__tile">' + tile + '</div>' +
        '<div class="term-card__body">' +
          '<div class="term-card__head"><div class="term-card__title">' + t.title + '</div><div class="term-card__states">' + t.statesLabel + '</div></div>' +
          '<div class="term-card__stats">' +
            '<div><div class="term-card__stat-label">Lien position</div><div class="term-card__stat-value">' + t.lien + '</div></div>' +
            '<div><div class="term-card__stat-label">LTV / LTC / ARV</div><div class="term-card__stat-value">' + t.ltv + '</div></div>' +
            '<div><div class="term-card__stat-label">Term length</div><div class="term-card__stat-value">' + t.term + '</div></div>' +
          '</div>' +
          '<div class="term-card__notes">' + t.notes + '</div>' +
          '<div class="term-card__cta"><a href="https://tally.so/r/31BNEW?source=pml_terms">Submit Your Deal for This Option &rarr;</a></div>' +
        '</div>' +
      '</div>'
    );
  }

  function emptyHTML() {
    return (
      '<div class="term-empty">' +
        '<div class="term-empty__title">No displayed PML terms currently match this filter.</div>' +
        '<p class="term-empty__text">Submit your deal anyway. GIREC is always building new lender relationships, and we may still be able to find a funding option that is not shown publicly.</p>' +
        '<a href="https://tally.so/r/31BNEW?source=pml_terms" class="btn btn-primary">Submit Your Deal</a>' +
      '</div>'
    );
  }

  document.addEventListener('DOMContentLoaded', function () {
    var select = document.getElementById('pml-state-select');
    var grid = document.getElementById('pml-term-grid');
    var count = document.getElementById('pml-count-label');
    if (!select) return;

    allStates.forEach(function (name) {
      var opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    function render() {
      var sel = select.value;
      var visible = sel === 'All states' ? pmlTermsAll : pmlTermsAll.filter(function (t) {
        if (t.coverage === 'nationwide') return true;
        if (t.coverage === 'exceptTX') return sel !== 'Texas';
        return t.states.indexOf(stateAbbrevs[sel]) !== -1;
      });

      grid.innerHTML = visible.length
        ? visible.map(cardHTML).join('')
        : emptyHTML();

      count.textContent = sel === 'All states'
        ? visible.length + ' PML term summaries · all states'
        : visible.length + ' PML term ' + (visible.length === 1 ? 'summary matches' : 'summaries match') + ' ' + sel;
    }

    select.addEventListener('change', render);
    render();
  });
})();

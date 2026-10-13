// UPI payment journey — four steps from the Figma frames:
//   select  — no method chosen (frame 1:2)
//   amount  — UPI chosen, amount empty (frame 3:1102)
//   amount  — amount entered, Next enabled (frame 3:1400)
//   review  — review and scan to pay (frame 4:1735)
// Each step is also reachable by hash for review: #select, #upi, #upi-amount, #review.

(function () {
  const COURSE_FEE = 65000;
  const MIN_AMOUNT = 1000;
  const PROGRESS = { choose: '15%', review: '80%' };

  const state = { method: null, amount: null, view: 'choose' };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const inr = (n) => 'INR ' + n.toLocaleString('en-IN');

  const input = $('#amount');
  const form = $('[data-amount-form]');
  const next = $('.ug-button', form);

  function isValid(amount) {
    return Number.isInteger(amount) && amount >= MIN_AMOUNT && amount <= COURSE_FEE;
  }

  function render() {
    const paying = isValid(state.amount);
    const flags = {
      'no-method': !state.method,
      method: Boolean(state.method),
      upi: state.method === 'UPI',
      paying,
    };
    $$('[data-when]').forEach((el) => { el.hidden = !flags[el.dataset.when]; });

    $$('[data-view]').forEach((el) => { el.hidden = el.dataset.view !== state.view; });
    document.body.dataset.step = state.view === 'review' ? 'review' : state.method ? 'amount' : 'select';
    $('[data-progress]').style.width = PROGRESS[state.view];

    $$('.ug-method').forEach((el) => {
      el.setAttribute('aria-checked', String(el.dataset.method === state.method));
    });

    next.disabled = !paying;
    input.setAttribute('aria-invalid', String(input.value !== '' && !paying));

    if (paying) {
      $$('[data-amount]').forEach((el) => { el.textContent = inr(state.amount); });
    }
    $('[data-total-label]').textContent = paying ? 'Balance Amount' : 'Total';
    $('[data-total]').textContent = inr(paying ? COURSE_FEE - state.amount : COURSE_FEE);
    $('[data-method-label]').textContent = state.method || '';
  }

  function setAmount(value) {
    const n = value === '' ? null : Number(value);
    state.amount = Number.isFinite(n) ? n : null;
  }

  $$('.ug-method').forEach((el) => {
    el.addEventListener('click', () => {
      state.method = el.dataset.method;
      render();
      input.focus();
    });
  });

  input.addEventListener('input', () => {
    setAmount(input.value);
    render();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!isValid(state.amount)) return;
    state.view = 'review';
    render();
    window.scrollTo(0, 0);
  });

  $('[data-edit]').addEventListener('click', () => {
    state.view = 'choose';
    render();
    input.focus();
  });

  $('[data-reveal]').addEventListener('click', () => {
    $('[data-qr]').classList.add('co-qr--revealed');
  });

  // Deep links to each frame, for review against Figma.
  const presets = {
    select: { method: null, amount: null, view: 'choose' },
    upi: { method: 'UPI', amount: null, view: 'choose' },
    'upi-amount': { method: 'UPI', amount: 1000, view: 'choose' },
    review: { method: 'UPI', amount: 1027, view: 'review' },
  };
  function applyHash() {
    const preset = presets[location.hash.slice(1)];
    if (!preset) return;
    Object.assign(state, preset);
    input.value = state.amount === null ? '' : String(state.amount);
    render();
    if (state.method && state.view === 'choose') input.focus();
  }
  window.addEventListener('hashchange', applyHash);

  applyHash();
  render();
})();

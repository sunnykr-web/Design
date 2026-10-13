// UPI payment journey, V2 — the same flow as V1 with the UX reworked:
//   choose — plan, amount and method on one screen; the action lives in the summary
//   review — the QR is the page's focus, with a timer and plain steps
// Every query is scoped to [data-ck-root] so V2 can share a document with V1.
// Deep links: #v2-select, #v2-amount, #v2-review.

(function () {
  const root = document.querySelector('[data-ck-root]');
  if (!root) return;

  const COURSE_FEE = 65000;
  const MIN_AMOUNT = 1000;
  const BALANCE_DAYS = 7;
  const QR_SECONDS = 600;
  const PLANS = {
    reserve: 'Reserve a seat',
    recommended: 'Recommended',
    pocket: 'Pocket-friendly',
    upfront: 'Pay upfront',
  };

  const state = { plan: 'reserve', amount: null, method: null, view: 'choose', touched: false };

  const $ = (sel) => root.querySelector(sel);
  const $$ = (sel) => Array.from(root.querySelectorAll(sel));
  const inr = (n) => 'INR ' + n.toLocaleString('en-IN');
  const dueDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + BALANCE_DAYS);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  })();

  const input = $('#ck-amount');
  const field = $('[data-ck-field]');
  const help = $('[data-ck-help]');

  function amountError() {
    if (state.plan === 'upfront') return null;
    if (state.amount === null) return state.touched ? 'Enter an amount to continue.' : null;
    if (state.amount < MIN_AMOUNT) return 'The minimum is INR 1,000.';
    if (state.amount > COURSE_FEE) return 'That is more than the course fee of INR 65,000.';
    return null;
  }
  const amountOk = () => state.amount !== null && state.amount >= MIN_AMOUNT && state.amount <= COURSE_FEE;
  const planOk = () => state.plan === 'reserve' || state.plan === 'upfront';

  function blocker() {
    if (!planOk()) return 'Choose Reserve a seat or Pay upfront in this prototype';
    if (!amountOk()) return 'Enter an amount to continue';
    if (!state.method) return 'Choose how you want to pay';
    return null;
  }

  function render() {
    const ok = amountOk();
    const balance = ok ? COURSE_FEE - state.amount : COURSE_FEE;

    // views and steps
    root.dataset.ckView = state.view;
    $$('[data-ck-panel]').forEach((el) => { el.hidden = el.dataset.ckPanel !== state.view; });
    $$('[data-ck-step]').forEach((el) => {
      const isCurrent = el.dataset.ckStep === state.view;
      if (isCurrent) el.setAttribute('aria-current', 'step'); else el.removeAttribute('aria-current');
      el.classList.toggle('is-done', state.view === 'review' && el.dataset.ckStep === 'choose');
    });

    // plan
    $$('input[name="ck-plan"]').forEach((el) => { el.checked = el.value === state.plan; });
    $('[data-ck-plan-note]').hidden = planOk();
    $('[data-ck-amount-card]').hidden = !planOk();
    const upfront = state.plan === 'upfront';
    input.readOnly = upfront;
    field.classList.toggle('is-readonly', upfront);
    $$('[data-ck-quick]').forEach((el) => {
      el.disabled = upfront;
      el.setAttribute('aria-pressed', String(Number(el.dataset.ckQuick) === state.amount));
    });

    // amount feedback
    const error = amountError();
    field.classList.toggle('is-invalid', Boolean(error));
    input.setAttribute('aria-invalid', String(Boolean(error)));
    help.classList.toggle('is-error', Boolean(error));
    if (error) help.textContent = error;
    else if (upfront) help.textContent = 'The full course fee. Nothing is left to pay later.';
    else if (ok) help.innerHTML = 'You pay the balance of <strong>' + inr(balance) + '</strong> by <strong>' + dueDate + '</strong>.';
    else help.textContent = 'Minimum INR 1,000. You pay the balance within 7 days.';

    // method
    $$('input[name="ck-method"]').forEach((el) => { el.checked = el.value === state.method; });
    $('[data-ck-upi-note]').hidden = state.method !== 'UPI';

    // summary and actions
    $$('[data-ck-amount]').forEach((el) => { el.textContent = ok ? inr(state.amount) : '–'; });
    $$('[data-ck-amount-or-dash]').forEach((el) => { el.textContent = ok ? inr(state.amount) : '–'; });
    $$('[data-ck-balance]').forEach((el) => { el.textContent = inr(balance); });
    $('[data-ck-due-line]').textContent = balance === 0 ? 'nothing left to pay' : (ok ? 'due by ' + dueDate : 'due within 7 days');
    $$('[data-ck-due]').forEach((el) => { el.textContent = dueDate; });
    $$('[data-ck-method]').forEach((el) => { el.textContent = state.method || ''; });
    $$('[data-ck-method-lower]').forEach((el) => { el.textContent = (state.method || '').toLowerCase(); });
    $('[data-ck-plan-label]').textContent = PLANS[state.plan];

    const why = blocker();
    $$('[data-ck-next]').forEach((el) => {
      el.disabled = Boolean(why);
      el.textContent = why ? 'Continue' : 'Continue to pay ' + inr(state.amount);
    });
    $('[data-ck-hint]').textContent = why || 'You can review everything on the next step';

    // review
    const upi = state.method === 'UPI';
    $('[data-ck-pay-upi]').hidden = !upi;
    $('[data-ck-pay-other]').hidden = upi;
    $('[data-ck-cta-wrap]').hidden = state.view === 'review';
    $('[data-ck-mobilebar]').hidden = state.view === 'review';
  }

  // ---- QR timer ----
  let timer = null;
  let left = QR_SECONDS;
  function tick() {
    const m = Math.floor(left / 60);
    const s = String(left % 60).padStart(2, '0');
    $('[data-ck-timer]').textContent = m + ':' + s;
    $('[data-ck-timer-wrap]').classList.toggle('is-low', left <= 60);
    const expired = left <= 0;
    $('[data-ck-expired]').hidden = !expired;
    $('[data-ck-waiting]').hidden = expired;
    if (expired) stopTimer();
    left -= 1;
  }
  function startTimer() {
    stopTimer();
    left = QR_SECONDS;
    tick();
    timer = setInterval(tick, 1000);
  }
  function stopTimer() { if (timer) clearInterval(timer); timer = null; }

  function go(view) {
    state.view = view;
    render();
    if (view === 'review' && state.method === 'UPI') startTimer(); else stopTimer();
    window.scrollTo(0, 0);
  }

  // ---- events ----
  root.addEventListener('change', (event) => {
    const el = event.target;
    if (el.name === 'ck-plan') {
      state.plan = el.value;
      if (state.plan === 'upfront') { state.amount = COURSE_FEE; input.value = COURSE_FEE.toLocaleString('en-IN'); }
      render();
    }
    if (el.name === 'ck-method') { state.method = el.value; render(); }
  });

  input.addEventListener('input', () => {
    const digits = input.value.replace(/\D/g, '').slice(0, 7);
    state.amount = digits ? Number(digits) : null;
    // regroup digits the Indian way as they type (1,00,000)
    input.value = digits ? Number(digits).toLocaleString('en-IN') : '';
    render();
  });
  input.addEventListener('blur', () => { state.touched = true; render(); });

  $$('[data-ck-quick]').forEach((el) => {
    el.addEventListener('click', () => {
      state.amount = Number(el.dataset.ckQuick);
      state.touched = true;
      input.value = state.amount.toLocaleString('en-IN');
      render();
    });
  });

  $$('[data-ck-next]').forEach((el) => el.addEventListener('click', () => { if (!blocker()) go('review'); }));
  $('[data-ck-back]').addEventListener('click', () => { go('choose'); input.focus(); });

  const reveal = $('[data-ck-reveal]');
  if (reveal) reveal.addEventListener('click', () => { $('[data-ck-qr]').classList.add('is-revealed'); });
  $('[data-ck-refresh]').addEventListener('click', startTimer);
  $('[data-ck-proceed]').addEventListener('click', () => { $('[data-ck-proceed-note]').hidden = false; });

  $('[data-ck-more]').addEventListener('click', (event) => {
    const open = $('[data-ck-consent]').classList.toggle('is-open');
    event.currentTarget.setAttribute('aria-expanded', String(open));
    event.currentTarget.textContent = open ? 'Show less' : 'Read more';
  });

  // ---- deep links ----
  const presets = {
    'v2-select': { plan: 'reserve', amount: null, method: null, view: 'choose', touched: false },
    'v2-amount': { plan: 'reserve', amount: 1000, method: 'UPI', view: 'choose', touched: true },
    'v2-review': { plan: 'reserve', amount: 1027, method: 'UPI', view: 'review', touched: true },
  };
  function applyHash() {
    const preset = presets[location.hash.slice(1)];
    if (!preset) return;
    Object.assign(state, preset);
    input.value = state.amount === null ? '' : state.amount.toLocaleString('en-IN');
    $('[data-ck-qr]').classList.remove('is-revealed');
    go(state.view);
  }
  window.addEventListener('hashchange', applyHash);

  render();
  applyHash();
})();

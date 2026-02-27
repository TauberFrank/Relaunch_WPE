/**
 * wizard.js — M4 Beratungsassistent
 * WPE Waschplatz-Experten
 *
 * Einbindung: <script src="/assets/js/wizard.js" defer></script>
 * HTML:       <div id="wpe-wizard" data-context="homepage"></div>
 *
 * Vanilla JavaScript, keine Abhängigkeiten
 */

(function () {
  'use strict';

  // ============================================================
  // KONFIGURATION
  // ============================================================

  const QUESTIONS = [
    {
      id: 'problem',
      question: 'Welche Herausforderung bringt Ihr Bad?',
      type: 'single-choice',
      options: [
        { label: 'Kleines Bad / geringe Tiefe',  value: 'kleines-bad',    link: 'raumloesungen/kleines-bad/' },
        { label: 'Nische',                        value: 'nische',         link: 'raumloesungen/nische/' },
        { label: 'Dachschräge',                   value: 'dachschraege',   link: 'raumloesungen/dachschraege/' },
        { label: 'Waschmaschine muss rein',       value: 'waschmaschine',  link: 'raumloesungen/waschmaschine-im-bad/' },
        { label: 'Gäste-WC',                      value: 'gaeste-wc',      link: 'raumloesungen/gaeste-wc/' },
        { label: 'Barrierefreiheit',              value: 'barrierefrei',   link: 'raumloesungen/barrierefrei/' },
        { label: 'Hauswirtschaftsraum',           value: 'hwz',            link: 'raumloesungen/hauswirtschaftsraum/' },
        { label: 'Design-Suche (kein Problem)',   value: 'design',         link: null }
      ]
    },
    {
      id: 'masse',
      question: 'Wie groß ist Ihr verfügbarer Platz?',
      type: 'input-dual',
      fields: [
        { id: 'breite', label: 'Breite', unit: 'cm', min: 17, max: 270, placeholder: 'z.B. 80' },
        { id: 'tiefe',  label: 'Tiefe',  unit: 'cm', min: 15, max: 67,  placeholder: 'z.B. 45' }
      ],
      hint: 'Keine genauen Maße? Kein Problem — eine Schätzung reicht für den Start.',
      optional: true
    },
    {
      id: 'stil',
      question: 'Welchen Stil bevorzugen Sie?',
      type: 'single-choice',
      options: [
        { label: 'Minimalistisch / Schlicht', value: 'minimal' },
        { label: 'Holzoptik / Warm',          value: 'holz' },
        { label: 'Farbe / Persönlich',        value: 'farbe' },
        { label: 'Industrie / Beton',         value: 'beton' },
        { label: 'Weiß / Hell',               value: 'weiss' },
        { label: 'Bin offen',                 value: 'offen' }
      ]
    },
    {
      id: 'material',
      question: 'Welches Material interessiert Sie?',
      type: 'single-choice',
      options: [
        { label: 'Fugenloser Mineralguss', value: 'mineralguss' },
        { label: 'Keramik auf Maß',        value: 'keramik' },
        { label: 'Gress (Feinsteinzeug)',  value: 'gress' },
        { label: 'HPL (Holzoptik)',        value: 'hpl' },
        { label: 'Corian',                 value: 'corian' },
        { label: 'Noch keine Ahnung',      value: 'offen' }
      ]
    },
    {
      id: 'timing',
      question: 'Wann planen Sie Ihren Umbau?',
      type: 'single-choice',
      options: [
        { label: 'In den nächsten 3 Monaten', value: 'kurzfristig' },
        { label: 'In 3–6 Monaten',            value: 'mittelfristig' },
        { label: 'Noch offen / Erstinfo',     value: 'offen' }
      ]
    }
  ];

  // Lesbarer Label-Text für Zusammenfassung
  const LABEL_MAP = {
    // Problem
    'kleines-bad':   'Kleines Bad / geringe Tiefe',
    'nische':        'Nische',
    'dachschraege':  'Dachschräge',
    'waschmaschine': 'Waschmaschine im Bad',
    'gaeste-wc':     'Gäste-WC',
    'barrierefrei':  'Barrierefreiheit',
    'hwz':           'Hauswirtschaftsraum',
    'design':        'Design-Suche',
    // Stil
    'minimal':   'Minimalistisch / Schlicht',
    'holz':      'Holzoptik / Warm',
    'farbe':     'Farbe / Persönlich',
    'beton':     'Industrie / Beton',
    'weiss':     'Weiß / Hell',
    // Material
    'mineralguss': 'Fugenloser Mineralguss',
    'keramik':     'Keramik auf Maß',
    'gress':       'Gress (Feinsteinzeug)',
    'hpl':         'HPL (Holzoptik)',
    'corian':      'Corian',
    // Timing
    'kurzfristig':  'In den nächsten 3 Monaten',
    'mittelfristig': 'In 3–6 Monaten',
    // Universal
    'offen': 'Noch offen'
  };

  // ============================================================
  // WIZARD STATE
  // ============================================================

  const state = {
    currentStep: 0,
    answers: {},
    container: null,
    context: 'homepage'
  };

  // ============================================================
  // INIT
  // ============================================================

  function init() {
    const el = document.getElementById('wpe-wizard');
    if (!el) return;

    state.container = el;
    state.context   = el.dataset.context || 'homepage';
    render();
  }

  // ============================================================
  // RENDER
  // ============================================================

  function render() {
    if (state.currentStep >= QUESTIONS.length) {
      renderResult();
      return;
    }
    renderQuestion(QUESTIONS[state.currentStep]);
  }

  function renderQuestion(q) {
    const total    = QUESTIONS.length;
    const current  = state.currentStep + 1;
    const progress = Math.round((state.currentStep / total) * 100);

    let bodyHTML = '';

    if (q.type === 'single-choice') {
      bodyHTML = `
        <div class="wizard__options" role="group" aria-labelledby="wizard-q-${q.id}">
          ${q.options.map(opt => `
            <button
              class="wizard__option${state.answers[q.id] === opt.value ? ' wizard__option--selected' : ''}"
              data-value="${esc(opt.value)}"
              data-qid="${esc(q.id)}"
              type="button"
              aria-pressed="${state.answers[q.id] === opt.value ? 'true' : 'false'}"
            >${esc(opt.label)}</button>
          `).join('')}
        </div>
      `;
    } else if (q.type === 'input-dual') {
      bodyHTML = `
        <div class="wizard__inputs">
          ${q.fields.map(f => `
            <div class="wizard__input-group">
              <label class="wizard__input-label" for="wizard-${f.id}">${esc(f.label)}</label>
              <div class="wizard__input-wrap">
                <input
                  type="number"
                  id="wizard-${f.id}"
                  class="wizard__input"
                  placeholder="${esc(f.placeholder)}"
                  min="${f.min}"
                  max="${f.max}"
                  value="${state.answers[f.id] || ''}"
                  data-fieldid="${esc(f.id)}"
                  inputmode="numeric"
                >
                <span class="wizard__input-unit">${esc(f.unit)}</span>
              </div>
            </div>
          `).join('')}
        </div>
        <p class="wizard__hint">${esc(q.hint)}</p>
      `;
    }

    state.container.innerHTML = `
      <div class="wizard" role="form" aria-label="Beratungsassistent">
        <div class="wizard__progress" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" aria-label="Fortschritt">
          <div class="wizard__progress-bar" style="width:${progress}%"></div>
        </div>
        <div class="wizard__header">
          <span class="wizard__step-label">Frage ${current} von ${total}</span>
          <div class="wizard__step-dots" aria-hidden="true">
            ${Array.from({length: total}, (_, i) => `
              <span class="wizard__dot${i < state.currentStep ? ' wizard__dot--done' : (i === state.currentStep ? ' wizard__dot--active' : '')}"></span>
            `).join('')}
          </div>
        </div>
        <div class="wizard__body">
          <h3 class="wizard__question" id="wizard-q-${q.id}">${esc(q.question)}</h3>
          ${bodyHTML}
        </div>
        <div class="wizard__footer">
          <button
            class="wizard__back"
            type="button"
            aria-label="Zurück zur vorherigen Frage"
            ${state.currentStep === 0 ? 'disabled' : ''}
          >&larr; Zurück</button>
          ${q.type === 'input-dual' || q.optional ? `
            <button class="btn btn-primary wizard__next" type="button">
              ${state.currentStep < total - 1 ? 'Weiter &rarr;' : 'Ergebnis ansehen'}
            </button>
          ` : ''}
        </div>
      </div>
    `;

    // Events binden
    bindEvents(q);
  }

  function renderResult() {
    const a = state.answers;

    // URL-Parameter für Beratungsseite aufbauen
    const params = new URLSearchParams();
    if (a.problem)   params.set('problem',   a.problem);
    if (a.breite)    params.set('breite',     a.breite);
    if (a.tiefe)     params.set('tiefe',      a.tiefe);
    if (a.stil)      params.set('stil',       a.stil);
    if (a.material)  params.set('material',   a.material);
    if (a.timing)    params.set('timing',     a.timing);
    const beratungURL = `beratung-kauf/?${params.toString()}`;

    // Zusammenfassung bauen
    const summaryItems = [];
    if (a.problem)                            summaryItems.push(LABEL_MAP[a.problem]  || a.problem);
    if (a.breite || a.tiefe) {
      const b = a.breite ? `${a.breite} cm Breite` : '';
      const t = a.tiefe  ? `${a.tiefe} cm Tiefe`   : '';
      summaryItems.push([b, t].filter(Boolean).join(', '));
    }
    if (a.stil)                               summaryItems.push(LABEL_MAP[a.stil]     || a.stil);
    if (a.material)                           summaryItems.push(LABEL_MAP[a.material] || a.material);
    if (a.timing)                             summaryItems.push(LABEL_MAP[a.timing]   || a.timing);

    state.container.innerHTML = `
      <div class="wizard">
        <div class="wizard__progress" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
          <div class="wizard__progress-bar" style="width:100%"></div>
        </div>
        <div class="wizard__result">
          <h3 class="wizard__result-title">Perfekt — das ist Ihre Ausgangslage</h3>
          <p class="wizard__result-sub">Wir haben alle Angaben notiert. Im Beratungsgespräch zeigen wir Ihnen die passenden Lösungen.</p>

          ${summaryItems.length ? `
            <div class="wizard__result-summary">
              <strong>Ihre Angaben</strong>
              <div class="wizard__result-tags">
                ${summaryItems.map(item => `<span class="tag tag--primary">${esc(item)}</span>`).join('')}
              </div>
            </div>
          ` : ''}

          <div class="wizard__result-cta">
            <a href="${beratungURL}" class="btn btn-primary">
              Kostenloses Beratungsgespräch vereinbaren
            </a>
            ${a.problem && QUESTIONS[0].options.find(o => o.value === a.problem)?.link ? `
              <a href="${QUESTIONS[0].options.find(o => o.value === a.problem).link}" class="btn btn-secondary">
                Lösungen für Ihren Raumtyp ansehen
              </a>
            ` : ''}
          </div>

          <button class="wizard__restart" type="button">Nochmal von vorne</button>
        </div>
      </div>
    `;

    // Restart
    state.container.querySelector('.wizard__restart').addEventListener('click', function () {
      state.currentStep = 0;
      state.answers = {};
      render();
    });
  }

  // ============================================================
  // EVENTS
  // ============================================================

  function bindEvents(q) {
    const container = state.container;

    // Single-Choice: Direkt weiter nach Auswahl
    if (q.type === 'single-choice') {
      container.querySelectorAll('.wizard__option').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const qid   = this.dataset.qid;
          const value = this.dataset.value;
          state.answers[qid] = value;
          state.currentStep++;
          render();
        });
        // Keyboard: Enter / Space
        btn.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
          }
        });
      });
    }

    // Input-Dual: Werte speichern
    if (q.type === 'input-dual') {
      container.querySelectorAll('.wizard__input').forEach(function (input) {
        input.addEventListener('input', function () {
          state.answers[this.dataset.fieldid] = this.value;
        });
        input.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') {
            const nextBtn = container.querySelector('.wizard__next');
            if (nextBtn) nextBtn.click();
          }
        });
      });
    }

    // Weiter-Button (bei optionalen Feldern)
    const nextBtn = container.querySelector('.wizard__next');
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        state.currentStep++;
        render();
      });
    }

    // Zurück-Button
    const backBtn = container.querySelector('.wizard__back');
    if (backBtn && !backBtn.disabled) {
      backBtn.addEventListener('click', function () {
        if (state.currentStep > 0) {
          state.currentStep--;
          render();
        }
      });
    }
  }

  // ============================================================
  // HILFSFUNKTION: HTML escapen
  // ============================================================

  function esc(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ============================================================
  // START
  // ============================================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());

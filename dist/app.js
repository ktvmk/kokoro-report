const STORAGE_KEY = 'kororo-entries-v1';
const PREF_KEY = 'kororo-preferences-v1';
const CATEGORY_TO_SWITCH = {
  A: 'movement',
  B: 'reward',
  C: 'planning',
  D: 'talk',
  E: 'create',
  F: 'clean',
  G: 'solo',
  H: 'immersion'
};

const state = {
  entries: [],
  preferences: {}
};

let monthlyChart;

document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
  if (document.getElementById('step1Questions')) {
    renderDiagnosisQuestions();
  }
  if (document.getElementById('mindSliders')) {
    renderMindSliders();
  }
  if (document.getElementById('switchSliders')) {
    renderSwitchSliders();
  }
  if (document.getElementById('typeGrid')) {
    renderTypeGrid();
  }
  attachGlobalHandlers();
  loadState();
  if (document.getElementById('monthlyChart')) {
    initChart();
  }
  updateUI();
}

// -----------------------------------------------------------------------------
// Rendering helpers
function renderDiagnosisQuestions() {
  buildQuestionBlock('step1Questions', STEP1_QUESTIONS);
  buildQuestionBlock('step2Questions', STEP2_QUESTIONS);
  buildQuestionBlock('step3Questions', STEP3_QUESTIONS);
}

function buildQuestionBlock(targetId, questions) {
  const container = document.getElementById(targetId);
  container.innerHTML = questions
    .map(
      ({ id, label, category }) => `
        <div class="question">
          <label>${label}</label>
          <input type="range" min="-10" max="10" value="0" data-question-id="${id}" data-category="${category}" data-range-id="${id}">
          <div class="range-display" data-display-for="${id}">0</div>
        </div>
      `
    )
    .join('');
}

function renderMindSliders() {
  const container = document.getElementById('mindSliders');
  container.innerHTML = MIND_METRICS.map(
    ({ key, label }) => `
      <div class="slider">
        <label>${label}</label>
        <input type="range" name="mind-${key}" min="-10" max="10" value="0" data-range-id="mind-${key}">
        <div class="range-display" data-display-for="mind-${key}">0</div>
      </div>`
  ).join('');
}

function renderSwitchSliders() {
  const container = document.getElementById('switchSliders');
  container.innerHTML = TYPE_LIBRARY.map(({ key, title }) => `
    <div class="switch-card" data-switch="${key}">
      <h4>${title}</h4>
      <div class="slider-grid">
        <div class="slider">
          <label>実践した？</label>
          <input type="range" name="switch-${key}-intensity" min="-10" max="10" value="0" data-range-id="${key}-intensity">
          <div class="range-display" data-display-for="${key}-intensity">0</div>
        </div>
        <div class="slider">
          <label>その後のスッキリ度</label>
          <input type="range" name="switch-${key}-relief" min="-10" max="10" value="0" data-range-id="${key}-relief">
          <div class="range-display" data-display-for="${key}-relief">0</div>
        </div>
      </div>
    </div>`).join('');
}

function renderTypeGrid() {
  const grid = document.getElementById('typeGrid');
  grid.innerHTML = TYPE_LIBRARY.map(({ key, title, description, actions }) => `
    <article class="type-card" data-switch-key="${key}">
      <h3>${title}</h3>
      <p>${description}</p>
      <ul>
        ${actions.map((action) => `<li>${action}</li>`).join('')}
      </ul>
    </article>
  `).join('');
}

// -----------------------------------------------------------------------------
// Event handlers
function attachGlobalHandlers() {
  document.addEventListener('input', handleRangeInput);

  const runDiagnosisBtn = document.getElementById('runDiagnosis');
  if (runDiagnosisBtn) runDiagnosisBtn.addEventListener('click', handleDiagnosis);

  const resetBtn = document.getElementById('resetPreferences');
  if (resetBtn) resetBtn.addEventListener('click', resetDiagnosisInputs);

  const logForm = document.getElementById('logForm');
  if (logForm) logForm.addEventListener('submit', handleLogSubmit);

  const clearBtn = document.getElementById('clearEntries');
  if (clearBtn) clearBtn.addEventListener('click', clearAllEntries);

  const loadDemoBtn = document.getElementById('loadDemo');
  if (loadDemoBtn) loadDemoBtn.addEventListener('click', loadDemoData);

  const monthPicker = document.getElementById('monthPicker');
  if (monthPicker) monthPicker.addEventListener('change', handleMonthChange);

  const scrollLog = document.getElementById('scrollToLog');
  if (scrollLog) scrollLog.addEventListener('click', () => scrollToSection('dailyLog'));

  const scrollDiag = document.getElementById('scrollToDiagnosis');
  if (scrollDiag) scrollDiag.addEventListener('click', () => scrollToSection('diagnosis'));
}

function handleRangeInput(event) {
  const id = event.target.dataset.rangeId;
  if (!id) return;
  const display = document.querySelector(`[data-display-for="${id}"]`);
  if (display) display.textContent = Number(event.target.value);
  if (event.target.matches('[data-question-id]')) {
    savePreferenceValue(event.target.dataset.questionId, Number(event.target.value));
  }
}

function handleDiagnosis() {
  const sliders = document.querySelectorAll('[data-question-id]');
  const scores = {};
  sliders.forEach((slider) => {
    const category = slider.dataset.category;
    const value = Number(slider.value);
    scores[category] = (scores[category] || 0) + value;
  });

  const allCategories = Object.keys(CATEGORY_LIBRARY);
  if (!allCategories.length) return;

  const scoreList = allCategories.map((category) => ({
    category,
    score: scores[category] || 0
  }));

  const minScore = Math.min(...scoreList.map(({ score }) => score));
  const shift = minScore < 0 ? Math.abs(minScore) : 0;
  const normalizedList = scoreList.map((item) => ({
    ...item,
    normalized: item.score + shift
  }));

  let total = normalizedList.reduce((acc, item) => acc + item.normalized, 0);
  if (!Number.isFinite(total) || total === 0) total = 1;

  const resultList = normalizedList
    .map((item) => ({
      ...item,
      percent: ((item.normalized / total) * 100)
    }))
    .sort((a, b) => b.percent - a.percent);

  const resultHtml = resultList
    .map(({ category, score, percent }) => {
      const meta = CATEGORY_LIBRARY[category];
      const percentLabel = percent.toFixed(1);
      const barWidth = Math.max(percent, 0);
      return `
        <div class="diagnosis-type">
          <div class="diagnosis-type__header">
            <div>
              <h4>${meta.title}</h4>
              <p class="diagnosis-type__desc">${meta.description}</p>
            </div>
            <span class="diagnosis-type__percent">${percentLabel}%</span>
          </div>
          <div class="diagnosis-type__bar">
            <div class="diagnosis-type__bar-fill" style="width: ${barWidth}%;"></div>
          </div>
          <p class="range-display">スコア: ${score}</p>
        </div>`;
    })
    .join('');

  document.getElementById('diagnosisResult').innerHTML = resultHtml;
  const highlightKeys = resultList
    .slice(0, 3)
    .map(({ category }) => CATEGORY_TO_SWITCH[category])
    .filter(Boolean);
  highlightTypeCards(highlightKeys);
}

function resetDiagnosisInputs() {
  document.querySelectorAll('[data-question-id]').forEach((slider) => {
    slider.value = 0;
    const id = slider.dataset.rangeId;
    const display = document.querySelector(`[data-display-for="${id}"]`);
    if (display) display.textContent = '0';
  });
  state.preferences = {};
  localStorage.removeItem(PREF_KEY);
  document.getElementById('diagnosisResult').innerHTML = '<p>入力が完了したら、あなたのタイプをここに表示します。</p>';
  highlightTypeCards([]);
}

function handleLogSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const entry = buildEntryPayload(formData);
  state.entries.push(entry);
  saveEntries();
  form.reset();
  resetRangeDisplays(form);
  ensureMonthValue(entry.date.substring(0, 7));
  updateUI();
}

function clearAllEntries() {
  if (!state.entries.length) return;
  if (!confirm('保存済みの記録をすべて削除しますか？')) return;
  state.entries = [];
  saveEntries();
  updateUI();
}

function loadDemoData() {
  const form = document.getElementById('logForm');
  if (!form) return;
  form.elements.heartRate.value = 78;
  form.elements.bloodPressure.value = '118/75';
  form.elements.sleepHours.value = 6;
  form.elements.sleepMinutes.value = 30;
  form.elements.exerciseMinutes.value = 25;

  form.querySelectorAll('input[name="symptoms"]').forEach((checkbox) => {
    checkbox.checked = ['肩こり', 'だるさ'].includes(checkbox.value);
  });

  form.elements.dietHealth.value = 2;
  updateRangeDisplayById('dietHealth', 2);
  form.querySelectorAll('input[name="flavors"]').forEach((checkbox) => {
    checkbox.checked = ['健康的', 'さっぱり'].includes(checkbox.value);
  });
  form.elements.alcohol.checked = false;
  form.elements.caffeine.checked = true;

  MIND_METRICS.forEach(({ key }) => {
    const input = form.querySelector(`[name="mind-${key}"]`);
    const value = key === 'mood' ? 2 : key === 'anxiety' ? -2 : 0;
    input.value = value;
    updateRangeDisplayById(`mind-${key}`, value);
  });

  TYPE_LIBRARY.forEach(({ key }) => {
    const intensityInput = form.querySelector(`[name="switch-${key}-intensity"]`);
    const reliefInput = form.querySelector(`[name="switch-${key}-relief"]`);
    const intensity = ['movement', 'reward', 'planning'].includes(key) ? 5 : 0;
    const relief = intensity ? 7 : 0;
    intensityInput.value = intensity;
    reliefInput.value = relief;
    updateRangeDisplayById(`${key}-intensity`, intensity);
    updateRangeDisplayById(`${key}-relief`, relief);
  });

  form.elements.diary.value = '午前は会議づくし。夕方に軽く散歩したら少し楽になった。';
}

function handleMonthChange(event) {
  const month = event.target.value;
  updateChart(month);
  updateRanking(month);
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// -----------------------------------------------------------------------------
// State persistence
function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  state.entries = stored ? JSON.parse(stored) : [];

  const pref = localStorage.getItem(PREF_KEY);
  state.preferences = pref ? JSON.parse(pref) : {};
  applyStoredPreferences();
}

function saveEntries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.entries));
}

function savePreferenceValue(questionId, value) {
  state.preferences[questionId] = value;
  localStorage.setItem(PREF_KEY, JSON.stringify(state.preferences));
}

function applyStoredPreferences() {
  Object.entries(state.preferences).forEach(([id, value]) => {
    const slider = document.querySelector(`[data-question-id="${id}"]`);
    if (slider) {
      slider.value = value;
      updateRangeDisplayById(id, value);
    }
  });
}

// -----------------------------------------------------------------------------
// Entry payload
function buildEntryPayload(formData) {
  const hours = Number(formData.get('sleepHours')) || 0;
  const minutes = Number(formData.get('sleepMinutes')) || 0;
  const sleepMinutes = hours * 60 + minutes;
  const date = new Date();

  const symptoms = formData.getAll('symptoms');
  const filteredSymptoms = symptoms.length > 1 ? symptoms.filter((s) => s !== '特になし') : symptoms;

  const mind = {};
  MIND_METRICS.forEach(({ key }) => {
    mind[key] = Number(formData.get(`mind-${key}`)) || 0;
  });

  const switches = {};
  TYPE_LIBRARY.forEach(({ key }) => {
    switches[key] = {
      intensity: Number(formData.get(`switch-${key}-intensity`)) || 0,
      relief: Number(formData.get(`switch-${key}-relief`)) || 0
    };
  });

  return {
    id: date.toISOString(),
    date: date.toISOString().slice(0, 10),
    timestamp: date.getTime(),
    body: {
      heartRate: Number(formData.get('heartRate')) || 0,
      bloodPressure: formData.get('bloodPressure') || '',
      sleepMinutes,
      exerciseMinutes: Number(formData.get('exerciseMinutes')) || 0,
      symptoms: filteredSymptoms
    },
    diet: {
      healthScore: Number(formData.get('dietHealth')) || 0,
      flavors: formData.getAll('flavors'),
      alcohol: Boolean(formData.get('alcohol')),
      caffeine: Boolean(formData.get('caffeine'))
    },
    mind,
    switches,
    diary: (formData.get('diary') || '').trim(),
    meta: {
      recordedHour: date.getHours()
    }
  };
}

function resetRangeDisplays(scope) {
  scope.querySelectorAll('[data-range-id]').forEach((input) => {
    const display = document.querySelector(`[data-display-for="${input.dataset.rangeId}"]`);
    if (display) display.textContent = input.value;
  });
}

function updateRangeDisplayById(id, value) {
  const display = document.querySelector(`[data-display-for="${id}"]`);
  if (display) display.textContent = value;
}

// -----------------------------------------------------------------------------
// UI refresh
function updateUI() {
  if (document.getElementById('entryList')) {
    renderEntries();
  }

  const monthPicker = document.getElementById('monthPicker');
  if (monthlyChart && document.getElementById('switchRanking')) {
    const month = monthPicker?.value || getCurrentMonth();
    if (monthPicker && !monthPicker.value) {
      ensureMonthValue(month);
    }
    updateChart(month);
    updateRanking(month);
  }

  if (document.getElementById('fatigueSummary')) {
    updateRecommendations();
  }
}

function renderEntries() {
  const list = document.getElementById('entryList');
  if (!list) return;
  if (!state.entries.length) {
    list.innerHTML = '<p>まだ記録がありません。</p>';
    return;
  }

  const cards = state.entries
    .slice()
    .reverse()
    .map((entry) => {
      const date = new Date(entry.timestamp);
      const switchSummary = getActiveSwitches(entry)
        .map((key) => `${getSwitchLabel(key)}（${entry.switches[key].relief}）`)
        .join('、 ');

      return `
        <article class="entry-card">
          <header>
            <strong>${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
            <span>気分: ${entry.mind.mood}</span>
          </header>
          <p>脈拍 ${entry.body.heartRate} bpm ／ 血圧 ${entry.body.bloodPressure} ／ 睡眠 ${formatSleep(entry.body.sleepMinutes)}</p>
          <p>運動 ${entry.body.exerciseMinutes} 分 ／ 食事ヘルス ${entry.diet.healthScore}</p>
          <p>スイッチ: ${switchSummary || 'なし'}</p>
          <p>${entry.diary || '（日記未入力）'}</p>
        </article>`;
    })
    .join('');

  list.innerHTML = cards;
}

// -----------------------------------------------------------------------------
// Chart & Ranking
function initChart() {
  const ctx = document.getElementById('monthlyChart').getContext('2d');
  monthlyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: '気分',
          data: [],
          borderColor: '#ff8570',
          tension: 0.3,
          fill: false
        },
        {
          label: '人間関係の負荷',
          data: [],
          borderColor: '#7b6cff',
          tension: 0.3,
          fill: false
        },
        {
          label: '脈拍',
          data: [],
          borderColor: '#00a4a6',
          tension: 0.3,
          fill: false,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      interaction: { intersect: false, mode: 'index' },
      scales: {
        x: {
          title: { display: true, text: '日付' }
        },
        y: {
          title: { display: true, text: '気分・ストレス（-10〜10）' },
          suggestedMin: -10,
          suggestedMax: 10,
          grid: { drawBorder: false }
        },
        y1: {
          position: 'right',
          title: { display: true, text: '脈拍 (bpm)' },
          suggestedMin: 50,
          suggestedMax: 120,
          grid: { drawBorder: false }
        }
      },
      plugins: {
        legend: { display: true }
      }
    }
  });
}

function updateChart(month) {
  if (!monthlyChart) return;
  const monthEntries = getEntriesByMonth(month);
  const labels = monthEntries.map((entry) => new Date(entry.timestamp).getDate());
  monthlyChart.data.labels = labels;
  monthlyChart.data.datasets[0].data = monthEntries.map((entry) => entry.mind.mood);
  monthlyChart.data.datasets[1].data = monthEntries.map((entry) => entry.mind.relationshipLoad);
  monthlyChart.data.datasets[2].data = monthEntries.map((entry) => entry.body.heartRate);
  monthlyChart.update();
}

function updateRanking(month) {
  const container = document.getElementById('switchRanking');
  if (!container) return;
  const monthEntries = getEntriesByMonth(month);
  if (!monthEntries.length) {
    container.innerHTML = '<p>この月のデータがまだありません。</p>';
    return;
  }

  const totals = {};
  TYPE_LIBRARY.forEach(({ key }) => {
    totals[key] = { sum: 0, count: 0 };
  });

  monthEntries.forEach((entry) => {
    Object.entries(entry.switches).forEach(([key, { relief, intensity }]) => {
      if (intensity > 0) {
        totals[key].sum += relief;
        totals[key].count += 1;
      }
    });
  });

  const ranking = Object.entries(totals)
    .filter(([, { count }]) => count > 0)
    .map(([key, { sum, count }]) => ({ key, avg: sum / count }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 3);

  if (!ranking.length) {
    container.innerHTML = '<p>今月はスイッチがまだ実践されていません。</p>';
    return;
  }

  container.innerHTML = ranking
    .map(
      ({ key, avg }, index) => `
        <div class="ranking-item">
          <span>${index + 1}. ${getSwitchLabel(key)}</span>
          <strong>平均スッキリ度 ${avg.toFixed(1)}</strong>
        </div>`
    )
    .join('');
}

// -----------------------------------------------------------------------------
// Recommendations
function updateRecommendations() {
  const target = document.getElementById('fatigueSummary');
  const patternTarget = document.getElementById('patternSuggestions');
  if (!state.entries.length) {
    target.innerHTML = '<p>記録を保存すると、ここに疲労タイプと提案が表示されます。</p>';
    patternTarget.innerHTML = '';
    return;
  }

  const latest = state.entries[state.entries.length - 1];
  const fatigue = detectFatigue(latest, state.entries);

  if (fatigue) {
    target.innerHTML = `
      <article class="recommendation-card">
        <h3>No.${fatigue.no} ${fatigue.title}</h3>
        <p>${fatigue.advice}</p>
        <ul>
          <li><strong>鉄板:</strong> ${fatigue.pillars.iron}</li>
          <li><strong>意外:</strong> ${fatigue.pillars.surprise}</li>
          <li><strong>体調連動:</strong> ${fatigue.pillars.body}</li>
        </ul>
      </article>`;
  } else {
    target.innerHTML = '<p>条件に一致する疲労タイプがありません。引き続きデータを蓄積しましょう。</p>';
  }

  const patterns = detectPatterns(state.entries);
  if (!patterns.length) {
    patternTarget.innerHTML = '<p>現在のデータでは追加アドバイスはありません。</p>';
    return;
  }

  patternTarget.innerHTML = patterns
    .map(
      ({ title, message, followUp }) => `
        <article class="suggestion-card">
          <h4>${title}</h4>
          <p>${message}</p>
          <p class="muted">${followUp}</p>
        </article>`
    )
    .join('');
}

// -----------------------------------------------------------------------------
// Fatigue detection
function detectFatigue(entry, entries) {
  for (const item of FATIGUE_LIBRARY) {
    if (fatigueMatchers[item.key]?.(entry, entries)) {
      return item;
    }
  }
  return null;
}

const fatigueMatchers = {
  brainOverheat: (entry) =>
    isSwitchActive(entry, 'planning') &&
    isSwitchActive(entry, 'immersion') &&
    entry.body.sleepMinutes < 360 &&
    entry.mind.environmentStress >= 3,

  empathyDrain: (entry) =>
    isSwitchActive(entry, 'talk') &&
    entry.mind.relationshipLoad >= 4 &&
    entry.mind.calm >= -1 &&
    entry.mind.mood <= -1,

  pressureDrop: (entry) =>
    entry.mind.environmentStress >= 4 &&
    hasSymptom(entry, ['頭痛', 'だるさ']) &&
    entry.mind.sunlight <= -3,

  digestiveLoad: (entry) =>
    entry.diet.healthScore <= -7 &&
    entry.diet.flavors.some((f) => ['脂っこい', '甘い'].includes(f)) &&
    entry.body.sleepMinutes >= 420 &&
    hasSymptom(entry, ['胃痛', 'だるさ']),

  digitalOverload: (entry) =>
    isSwitchActive(entry, 'immersion', 4) &&
    !isSwitchActive(entry, 'solo', 1) &&
    entry.mind.mood <= -2 &&
    entry.body.heartRate >= 85,

  energyStagnation: (entry) =>
    entry.body.exerciseMinutes === 0 &&
    entry.mind.relationshipLoad <= 1 &&
    hasSymptom(entry, ['肩こり']),

  decisionFatigue: (entry) =>
    isSwitchActive(entry, 'planning', 4) &&
    entry.mind.mood <= -2 &&
    entry.mind.relationshipLoad <= 1,

  sensoryOverload: (entry) =>
    entry.mind.environmentStress >= 4 &&
    hasSymptom(entry, ['頭痛']) &&
    !isSwitchActive(entry, 'solo', 1),

  peoplePleaser: (entry) =>
    isSwitchActive(entry, 'talk', 3) &&
    Math.abs(entry.mind.calm) <= 2 &&
    entry.body.heartRate >= 85,

  routineStagnation: (entry, entries) => {
    if (entries.length < 3) return false;
    const last3 = entries.slice(-3);
    const moodStable = last3.every((e) => Math.abs(e.mind.mood - last3[0].mind.mood) <= 2);
    return (
      moodStable &&
      entry.switches.create.intensity <= 0 &&
      entry.switches.immersion.intensity <= 0 &&
      Math.abs(entry.mind.mood) <= 2
    );
  },

  sunsetBlue: (entry) =>
    entry.mind.sunlight <= -3 &&
    entry.meta.recordedHour >= 18 &&
    entry.meta.recordedHour <= 21 &&
    entry.mind.anxiety >= 2,

  boundaryBlur: (entry) =>
    entry.switches.talk.intensity >= 2 &&
    entry.switches.immersion.intensity >= 2 &&
    entry.switches.solo.intensity <= 0,

  freezeEmotion: (entry) =>
    entry.mind.relationshipLoad >= 5 &&
    Math.abs(entry.mind.calm) <= 1 &&
    hasSymptom(entry, ['胃痛']),

  multitaskAfterimage: (entry) =>
    isSwitchActive(entry, 'planning') &&
    isSwitchActive(entry, 'talk') &&
    isSwitchActive(entry, 'create') &&
    entry.mind.mood <= -1,

  serotoninLow: (entry) =>
    entry.mind.sunlight <= -3 &&
    entry.body.exerciseMinutes === 0 &&
    entry.mind.mood <= -3,

  rewardTolerance: (entry) =>
    entry.switches.reward.intensity >= 4 &&
    entry.switches.immersion.intensity >= 3 &&
    entry.switches.reward.relief <= 3,

  habitatStress: (entry) =>
    entry.mind.environmentStress >= 4 &&
    hasSymptom(entry, ['頭痛']) &&
    entry.switches.clean.intensity <= 0,

  muscleFreeze: (entry) =>
    entry.body.exerciseMinutes === 0 &&
    hasSymptom(entry, ['肩こり']) &&
    entry.mind.mood <= -1,

  resonanceFatigue: (entry) =>
    entry.mind.environmentStress >= 4 &&
    entry.switches.immersion.intensity >= 3 &&
    entry.mind.anxiety >= 2 &&
    entry.switches.talk.intensity <= 0,

  waitingFatigue: (entry) =>
    isSwitchActive(entry, 'planning', 3) &&
    entry.mind.anxiety >= 2 &&
    entry.body.heartRate >= 80,

  inventoryFatigue: (entry) =>
    entry.mind.relationshipLoad >= 3 &&
    Math.abs(entry.mind.calm) <= 1 &&
    entry.diary.length < 20,

  sunlightLag: (entry) =>
    entry.mind.sunlight <= -3 &&
    entry.body.heartRate >= 80 &&
    entry.body.sleepMinutes <= 360,

  knowledgeHeat: (entry) =>
    isSwitchActive(entry, 'planning', 4) &&
    entry.switches.immersion.intensity <= 0 &&
    hasSymptom(entry, ['頭痛']),

  rhythmCrash: (entry, entries) => {
    const prev = entries[entries.length - 2];
    if (!prev) return false;
    const sleepDiff = Math.abs(entry.body.sleepMinutes - prev.body.sleepMinutes);
    const exerciseDiff = Math.abs(entry.body.exerciseMinutes - prev.body.exerciseMinutes);
    return entry.diet.healthScore <= -5 && (sleepDiff >= 90 || exerciseDiff >= 20) && entry.mind.anxiety >= 2;
  },

  brainOverheat: () => false // placeholder to avoid lint; overwritten above but ensures key exists
};

// Ensure unique keys in fatigue matchers
fatigueMatchers.brainOverheat = fatigueMatchers.brainOverheat;

// -----------------------------------------------------------------------------
// Pattern suggestions
function detectPatterns(entries) {
  if (!entries.length) return [];
  const latest = entries[entries.length - 1];
  const suggestions = [];

  const addSuggestion = (key, replacements = {}) => {
    const pattern = PATTERN_LIBRARY.find((item) => item.key === key);
    if (!pattern) return;
    const message = pattern.message
      .replace('{switch}', replacements.switch || '')
      .replace('{altSwitch}', replacements.altSwitch || '');
    suggestions.push({ title: pattern.title, message, followUp: pattern.followUp });
  };

  const bestSwitch = getSwitchWith(latest, (data) => data.intensity > 2 && data.relief >= 8);
  if (bestSwitch) addSuggestion('effectBoost', { switch: getSwitchLabel(bestSwitch) });

  const lowSwitch = getSwitchWith(latest, (data) => data.intensity > 2 && data.relief <= 3 && latest.mind.mood <= -2);
  if (lowSwitch) addSuggestion('emptySwing', { switch: getSwitchLabel(lowSwitch), altSwitch: pickOppositeSwitch(lowSwitch) });

  if (entries.length >= 3) {
    const recent = entries.slice(-3);
    TYPE_LIBRARY.forEach(({ key }) => {
      if (recent.every((entry) => entry.switches[key].intensity > 2)) {
        const alt = TYPE_LIBRARY.find((type) => recent.every((entry) => entry.switches[type.key].intensity <= 0));
        addSuggestion('habitBias', { switch: getSwitchLabel(key), altSwitch: alt ? getSwitchLabel(alt.key) : '別のスイッチ' });
      }
    });
  }

  if (PASSIVE_SWITCHES.every((key) => latest.switches[key].intensity > 0) && latest.mind.anxiety >= 2) {
    addSuggestion('outputLacking');
  }

  const activeLoad = ACTIVE_SWITCHES.reduce((acc, key) => acc + Math.max(0, latest.switches[key].intensity), 0);
  if (activeLoad >= 12 && latest.body.heartRate >= 85) {
    addSuggestion('overdoing');
  }

  if (
    ['solo', 'immersion', 'clean'].every((key) => latest.switches[key].intensity >= 2) &&
    latest.mind.mood <= -1
  ) {
    addSuggestion('lonely');
  }

  if (fatigueMatchers.brainOverheat(latest, entries) && latest.switches.planning.relief <= 4) {
    addSuggestion('switchMismatch', { switch: getSwitchLabel('planning') });
  }

  if (latest.switches.immersion.intensity >= 4 && latest.switches.immersion.relief <= 3 && hasSymptom(latest, ['目の疲れ'])) {
    addSuggestion('passiveDrain');
  }

  if (latest.mind.anxiety >= 3 && latest.switches.reward.intensity >= 4 && latest.switches.reward.relief <= 3) {
    addSuggestion('rewardCover');
  }

  if (latest.switches.talk.intensity >= 3 && latest.switches.talk.relief <= 4 && latest.body.heartRate >= 85) {
    addSuggestion('quietCraving');
  }

  if (
    (latest.switches.create.intensity >= 2 || latest.switches.clean.intensity >= 2) &&
    /できなかった|未完|途中/.test(latest.diary)
  ) {
    addSuggestion('unfinished');
  }

  if (
    latest.body.heartRate >= 70 &&
    latest.switches.solo.intensity >= 3 &&
    latest.switches.solo.relief >= 8 &&
    latest.switches.solo.intensity > 0
  ) {
    addSuggestion('detoxSuccess', { switch: getSwitchLabel('solo') });
  }

  if (latest.switches.immersion.intensity >= 5 && latest.switches.immersion.relief <= 3) {
    addSuggestion('sunkCost', { switch: getSwitchLabel('immersion') });
  }

  if (latest.switches.solo.intensity >= 3 && latest.switches.talk.intensity >= 2 && latest.mind.mood <= -1) {
    addSuggestion('falseRest');
  }

  if (
    latest.switches.planning.intensity >= 4 &&
    latest.switches.immersion.intensity <= 0 &&
    latest.switches.movement.intensity <= 0
  ) {
    addSuggestion('mindOnly');
  }

  if (
    latest.switches.clean.intensity >= 2 &&
    latest.switches.planning.intensity >= 2 &&
    latest.switches.reward.intensity <= 0
  ) {
    addSuggestion('selfNeglect');
  }

  if (latest.switches.create.intensity >= 4 && latest.mind.mood - latest.mind.sadness >= 4) {
    addSuggestion('catharsis', { switch: getSwitchLabel('create') });
  }

  if (latest.mind.sunlight <= -3 && latest.switches.clean.intensity >= 2) {
    addSuggestion('sunlightMiss');
  }

  const sameSwitch = TYPE_LIBRARY.find(({ key }) => entries.length >= 7 && entries.slice(-7).every((entry) => entry.switches[key].intensity > 2));
  if (sameSwitch && latest.switches[sameSwitch.key].relief <= 4) {
    addSuggestion('highFreqLowEffect', { switch: getSwitchLabel(sameSwitch.key) });
  }

  if (latest.switches.create.intensity >= 3 && latest.mind.sadness >= 2 && /反省|ダメ/.test(latest.diary)) {
    addSuggestion('selfCritic');
  }

  if (isWeekend() && getActiveSwitches(latest).length >= 4 && latest.mind.mood <= 0) {
    addSuggestion('weekendPressure');
  }

  if (latest.mind.relationshipLoad >= 5 && getActiveSwitches(latest).length === 0) {
    addSuggestion('silentEndurance');
  }

  if (latest.switches.talk.intensity >= 2 && latest.switches.talk.relief <= 3) {
    addSuggestion('expectationGap');
  }

  if (
    getActiveSwitches(latest).length >= 2 &&
    latest.switches.reward.relief >= 9 &&
    latest.mind.mood >= 8 &&
    latest.diary.length > 30
  ) {
    addSuggestion('perfectEnding');
  }

  return suggestions.slice(0, 4);
}

// -----------------------------------------------------------------------------
// Utilities
function highlightTypeCards(keys) {
  document.querySelectorAll('[data-switch-key]').forEach((card) => {
    if (keys.includes(card.dataset.switchKey)) card.classList.add('highlight');
    else card.classList.remove('highlight');
  });
}

function getEntriesByMonth(month) {
  return state.entries.filter((entry) => entry.date.startsWith(month));
}

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

function ensureMonthValue(month) {
  const picker = document.getElementById('monthPicker');
  picker.value = month;
}

function formatSleep(minutes) {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}時間${mins}分`;
}

function hasSymptom(entry, candidates) {
  return entry.body.symptoms.some((symptom) => candidates.includes(symptom));
}

function isSwitchActive(entry, key, threshold = 2) {
  return entry.switches[key]?.intensity >= threshold;
}

function getSwitchLabel(key) {
  return TYPE_LIBRARY.find((type) => type.key === key)?.title.replace(/^\d+\s*/, '') || key;
}

function getActiveSwitches(entry) {
  return Object.entries(entry.switches)
    .filter(([, { intensity }]) => intensity > 0)
    .map(([key]) => key);
}

function getSwitchWith(entry, predicate) {
  for (const [key, data] of Object.entries(entry.switches)) {
    if (predicate(data)) return key;
  }
  return null;
}

function pickOppositeSwitch(key) {
  if (PASSIVE_SWITCHES.includes(key)) return getSwitchLabel('movement');
  if (key === 'movement') return getSwitchLabel('solo');
  return '別のスイッチ';
}

function isWeekend() {
  const today = new Date();
  const day = today.getDay();
  return day === 0 || day === 6;
}

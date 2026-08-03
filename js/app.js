/**
 * Impostor – hlavní logika hry
 * Pass & Play party hra, 100 % client-side
 */

const STORAGE_KEY = 'impostor-game-state';
const HIDE_ROLE_DELAY_MS = 1000;

/** @typedef {'setup'|'pass'|'role'|'gameplay'|'resolution'|'result'} Screen */

/** @type {object} */
let setupConfig = {
  playerCount: 4,
  impostorCount: 1,
  timerMinutes: 5,
  vibrateOnEnd: true,
  showCategoryToImpostor: false,
  hardcoreMode: false,
  theme: 'dark',
  selectedCategories: [],
};

/** @type {object|null} */
let gameState = null;

/** @type {number|null} */
let timerInterval = null;

/** @type {number} */
let timerRemainingSec = 0;

/** @type {number} */
let timerTotalSec = 0;

/** @type {boolean} */
let timerPaused = false;

/** @type {number|null} */
let hideRoleTimeout = null;

// --- DOM refs ---
const screens = {
  setup: document.getElementById('screen-setup'),
  pass: document.getElementById('screen-pass'),
  role: document.getElementById('screen-role'),
  gameplay: document.getElementById('screen-gameplay'),
  resolution: document.getElementById('screen-resolution'),
  result: document.getElementById('screen-result'),
};

const els = {
  playersValue: document.getElementById('players-value'),
  playersRange: document.getElementById('players-range'),
  impostorsHint: document.getElementById('impostors-hint'),
  passPlayerLabel: document.getElementById('pass-player-label'),
  passProgress: document.getElementById('pass-progress'),
  roleInnocent: document.getElementById('role-innocent'),
  roleImpostor: document.getElementById('role-impostor'),
  roleCategory: document.getElementById('role-category'),
  roleWord: document.getElementById('role-word'),
  roleImpostorCategory: document.getElementById('role-impostor-category'),
  roleCategoriesList: document.getElementById('role-categories-list'),
  btnHideRole: document.getElementById('btn-hide-role'),
  hideCountdown: document.getElementById('hide-countdown'),
  timerDisplay: document.getElementById('timer-display'),
  timerProgress: document.getElementById('timer-progress'),
  categoriesReference: document.getElementById('categories-reference'),
  resultImpostors: document.getElementById('result-impostors'),
  resultWord: document.getElementById('result-word'),
  resultCategory: document.getElementById('result-category'),
  resultPlayers: document.getElementById('result-players'),
  resumeBanner: document.getElementById('resume-banner'),
};

// --- Utilities ---

/**
 * Fisher-Yates shuffle – vrátí nové pole
 * @param {number[]} arr
 * @returns {number[]}
 */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * @param {number} totalSec
 * @returns {string}
 */
function formatTime(totalSec) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/**
 * @param {Screen} name
 */
function showScreen(name) {
  Object.entries(screens).forEach(([key, el]) => {
    el.classList.toggle('hidden', key !== name);
  });
  if (gameState) {
    gameState.screen = name;
    persistState();
  }
}

function persistState() {
  if (!gameState) {
    localStorage.removeItem(STORAGE_KEY);
    els.resumeBanner.classList.add('hidden');
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ setupConfig, gameState }));
    els.resumeBanner.classList.add('hidden');
  } catch {
    /* quota exceeded – ignore */
  }
}

function loadPersistedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function clearState() {
  gameState = null;
  stopTimer();
  localStorage.removeItem(STORAGE_KEY);
  els.resumeBanner.classList.add('hidden');
}

// --- Theme ---

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  setupConfig.theme = theme;
  // Sync radio buttons
  const radio = document.querySelector(`input[name="theme"][value="${theme}"]`);
  if (radio) radio.checked = true;
}

// --- Category Modal ---

let _pendingCategories = [];

function buildCategoryModal() {
  const list = document.getElementById('category-list');
  list.innerHTML = '';
  Object.entries(WORD_DICTIONARY).forEach(([key, cat]) => {
    const label = document.createElement('label');
    label.className = 'category-modal-item';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.value = key;
    cb.id = `cat-${key}`;
    cb.checked = setupConfig.selectedCategories.includes(key);
    const span = document.createElement('span');
    span.textContent = cat.name;
    label.append(cb, span);
    list.appendChild(label);
  });
  // Sync "Všechny" checkbox
  syncAllCategoriesCheckbox();
}

function syncAllCategoriesCheckbox() {
  const allCb = document.getElementById('cat-all');
  const allKeys = Object.keys(WORD_DICTIONARY);
  const checked = document.querySelectorAll('#category-list input[type="checkbox"]:checked');
  allCb.checked = checked.length === allKeys.length || checked.length === 0;
  allCb.indeterminate = checked.length > 0 && checked.length < allKeys.length;
}

function openCategoryModal() {
  buildCategoryModal();
  document.getElementById('category-modal').showModal();
}

function closeCategoryModal() {
  document.getElementById('category-modal').close();
}

function confirmCategorySelection() {
  const checked = document.querySelectorAll('#category-list input[type="checkbox"]:checked');
  const allKeys = Object.keys(WORD_DICTIONARY);
  const selected = Array.from(checked).map(cb => cb.value);
  // If all selected or none, treat as "all" (empty = all)
  setupConfig.selectedCategories = (selected.length === allKeys.length) ? [] : selected;
  updateCategoriesBadge();
  closeCategoryModal();
}

function updateCategoriesBadge() {
  const badge = document.getElementById('categories-badge');
  const n = setupConfig.selectedCategories.length;
  if (n === 0) {
    badge.classList.add('hidden');
  } else {
    badge.textContent = n;
    badge.classList.remove('hidden');
  }
}


// --- Setup ---

function getMaxImpostors(playerCount) {
  if (playerCount <= 4) return 1;
  if (playerCount <= 7) return 2;
  return 2;
}

function updateSetupUI() {
  els.playersValue.textContent = String(setupConfig.playerCount);
  els.playersRange.value = String(setupConfig.playerCount);

  const maxImp = getMaxImpostors(setupConfig.playerCount);
  document.getElementById('impostors-2').disabled = maxImp < 2;
  if (setupConfig.impostorCount > maxImp) {
    setupConfig.impostorCount = maxImp;
  }

  document.getElementById('impostors-1').classList.toggle('active', setupConfig.impostorCount === 1);
  document.getElementById('impostors-2').classList.toggle('active', setupConfig.impostorCount === 2);

  els.impostorsHint.textContent =
    maxImp < 2
      ? '2 impostory lze od 5 hráčů'
      : 'Doporučeno pro větší skupiny';

  document.querySelectorAll('.timer-btn').forEach((btn) => {
    const mins = Number(btn.dataset.minutes);
    btn.classList.toggle('active', mins === setupConfig.timerMinutes);
    btn.disabled = setupConfig.hardcoreMode && mins !== 3;
  });
  // Sync hardcore side-effects
  const showCatLabel = document.getElementById('opt-show-category-label');
  if (showCatLabel) {
    showCatLabel.style.opacity = setupConfig.hardcoreMode ? '0.4' : '1';
    showCatLabel.style.pointerEvents = setupConfig.hardcoreMode ? 'none' : '';
  }
}

function startGame() {
  const { categoryKey, categoryName, word } = pickRandomWord(setupConfig.selectedCategories);
  const playerIndices = shuffle(Array.from({ length: setupConfig.playerCount }, (_, i) => i));
  const impostorIndices = playerIndices.slice(0, setupConfig.impostorCount).sort((a, b) => a - b);

  gameState = {
    screen: 'pass',
    categoryKey,
    categoryName,
    word,
    impostorIndices,
    currentPlayerIndex: 0,
    roleRevealed: false,
    timerStartedAt: null,
    timerRemainingSec: setupConfig.timerMinutes * 60,
    timerPaused: false,
  };

  persistState();
  showPassScreen();
}

function startGameSameSettings() {
  clearState();
  startGame();
}

// --- Pass & Role ---

function showPassScreen() {
  showScreen('pass');
  const num = gameState.currentPlayerIndex + 1;
  els.passPlayerLabel.textContent = `Hráči ${num}`;
  els.passProgress.textContent = `${num} / ${setupConfig.playerCount}`;
}

function isCurrentPlayerImpostor() {
  return gameState.impostorIndices.includes(gameState.currentPlayerIndex);
}

function showRoleScreen() {
  showScreen('role');
  gameState.roleRevealed = true;
  persistState();

  const impostor = isCurrentPlayerImpostor();

  els.roleInnocent.classList.toggle('hidden', impostor);
  els.roleImpostor.classList.toggle('hidden', !impostor);

  if (impostor) {
    populateCategoriesList(els.roleCategoriesList);
    if (setupConfig.showCategoryToImpostor) {
      els.roleImpostorCategory.textContent = `Kategorie: ${gameState.categoryName}`;
      els.roleImpostorCategory.classList.remove('hidden');
    } else {
      els.roleImpostorCategory.classList.add('hidden');
    }
  } else {
    els.roleCategory.textContent = gameState.categoryName;
    els.roleWord.textContent = gameState.word;
  }

  els.btnHideRole.disabled = true;
  els.hideCountdown.classList.remove('hidden');

  let remaining = HIDE_ROLE_DELAY_MS / 1000;
  els.hideCountdown.textContent = ` (${remaining}s)`;

  if (hideRoleTimeout) clearInterval(hideRoleTimeout);

  hideRoleTimeout = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      clearInterval(hideRoleTimeout);
      hideRoleTimeout = null;
      els.btnHideRole.disabled = false;
      els.hideCountdown.classList.add('hidden');
    } else {
      els.hideCountdown.textContent = ` (${remaining}s)`;
    }
  }, 1000);
}

function populateCategoriesList(container) {
  container.innerHTML = '';
  Object.values(WORD_DICTIONARY).forEach((cat) => {
    const li = document.createElement('li');
    li.textContent = cat.name;
    container.appendChild(li);
  });
}

function hideRoleAndNext() {
  if (hideRoleTimeout) {
    clearInterval(hideRoleTimeout);
    hideRoleTimeout = null;
  }

  gameState.currentPlayerIndex += 1;
  gameState.roleRevealed = false;

  if (gameState.currentPlayerIndex >= setupConfig.playerCount) {
    startGameplay();
  } else {
    persistState();
    showPassScreen();
  }
}

// --- Gameplay & Timer ---

function renderCategoriesReference() {
  els.categoriesReference.innerHTML = '';
  Object.values(WORD_DICTIONARY).forEach((cat) => {
    const block = document.createElement('div');
    block.className = 'category-block';
    const h4 = document.createElement('h4');
    h4.textContent = cat.name;
    const ul = document.createElement('ul');
    cat.words.forEach((w) => {
      const li = document.createElement('li');
      li.textContent = w;
      ul.appendChild(li);
    });
    block.append(h4, ul);
    els.categoriesReference.appendChild(block);
  });
}

function startGameplay() {
  showScreen('gameplay');
  renderCategoriesReference();

  timerTotalSec = setupConfig.timerMinutes * 60;
  timerRemainingSec = gameState.timerRemainingSec ?? timerTotalSec;
  timerPaused = gameState.timerPaused ?? false;

  updateTimerDisplay();
  
  // Re-sync icon
  const pauseBtn = document.getElementById('btn-pause');
  if (timerPaused) {
    pauseBtn.innerHTML = '<i class="ph-bold ph-play"></i> Pokračovat v čase';
  } else {
    pauseBtn.innerHTML = '<i class="ph-bold ph-pause"></i> Pozastavit čas';
    startTimer();
  }

  gameState.screen = 'gameplay';
  persistState();
}

function startTimer() {
  stopTimer();
  timerPaused = false;
  gameState.timerPaused = false;
  
  gameState.timerTargetMs = Date.now() + (timerRemainingSec * 1000);

  timerInterval = setInterval(() => {
    if (timerPaused) return;
    
    timerRemainingSec = Math.max(0, Math.ceil((gameState.timerTargetMs - Date.now()) / 1000));
    gameState.timerRemainingSec = timerRemainingSec;
    
    updateTimerDisplay();
    
    // Uložíme jen každou vteřinu, abychom zbytečně nespamovali localStorage
    if (timerRemainingSec % 1 === 0) {
       persistState();
    }

    if (timerRemainingSec <= 0) {
      stopTimer();
      onTimerEnd();
    }
  }, 250);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimerDisplay() {
  els.timerDisplay.textContent = formatTime(Math.max(0, timerRemainingSec));
  const pct = timerTotalSec > 0 ? (timerRemainingSec / timerTotalSec) * 100 : 0;
  els.timerProgress.style.width = `${pct}%`;

  if (timerRemainingSec <= 30) {
    els.timerDisplay.classList.add('text-neon-pink');
    els.timerDisplay.classList.remove('text-neon-cyan');
  } else {
    els.timerDisplay.classList.remove('text-neon-pink');
    els.timerDisplay.classList.add('text-neon-cyan');
  }
}

function togglePause() {
  timerPaused = !timerPaused;
  gameState.timerPaused = timerPaused;
  
  const pauseBtn = document.getElementById('btn-pause');
  if (timerPaused) {
    pauseBtn.innerHTML = '<i class="ph-bold ph-play"></i> Pokračovat v čase';
    stopTimer();
  } else {
    pauseBtn.innerHTML = '<i class="ph-bold ph-pause"></i> Pozastavit čas';
    if (timerRemainingSec > 0) {
      startTimer();
    }
  }
  
  persistState();
}

function onTimerEnd() {
  if (setupConfig.vibrateOnEnd && navigator.vibrate) {
    navigator.vibrate([200, 100, 200]);
  }
  showScreen('resolution');
  gameState.screen = 'resolution';
  persistState();
}

function endDiscussionEarly() {
  stopTimer();
  showScreen('resolution');
  gameState.screen = 'resolution';
  persistState();
}

// --- Result ---

function revealResult() {
  showScreen('result');

  const impostorLabels = gameState.impostorIndices
    .map((i) => `Hráč ${i + 1}`)
    .join(' a ');

  els.resultImpostors.textContent = impostorLabels;
  els.resultWord.textContent = gameState.word;
  els.resultCategory.textContent = gameState.categoryName;

  els.resultPlayers.innerHTML = '';
  for (let i = 0; i < setupConfig.playerCount; i++) {
    const li = document.createElement('li');
    const isImp = gameState.impostorIndices.includes(i);
    li.className = isImp ? 'player-row-impostor' : 'player-row-innocent';
    li.textContent = isImp
      ? `Hráč ${i + 1} – IMPOSTOR`
      : `Hráč ${i + 1} – znal slovo „${gameState.word}“`;
    els.resultPlayers.appendChild(li);
  }

  gameState.screen = 'result';
  persistState();
}

function resumeGame() {
  const saved = loadPersistedState();
  if (!saved?.gameState) return;

  setupConfig = saved.setupConfig;
  gameState = saved.gameState;
  updateSetupUI();

  document.getElementById('opt-vibrate').checked = setupConfig.vibrateOnEnd;
  document.getElementById('opt-show-category-impostor').checked = setupConfig.showCategoryToImpostor;
  document.getElementById('opt-hardcore').checked = setupConfig.hardcoreMode ?? false;
  applyTheme(setupConfig.theme ?? 'dark');
  updateCategoriesBadge();

  const screen = gameState.screen;

  if (screen === 'pass' || (screen === 'role' && !gameState.roleRevealed)) {
    showPassScreen();
  } else if (screen === 'role') {
    showRoleScreen();
  } else if (screen === 'gameplay') {
    startGameplay();
  } else if (screen === 'resolution') {
    showScreen('resolution');
  } else if (screen === 'result') {
    revealResult();
  } else {
    showScreen('setup');
  }

  els.resumeBanner.classList.add('hidden');
}

// --- Event listeners ---

function bindEvents() {
  document.getElementById('players-minus').addEventListener('click', () => {
    setupConfig.playerCount = Math.max(3, setupConfig.playerCount - 1);
    updateSetupUI();
  });

  document.getElementById('players-plus').addEventListener('click', () => {
    setupConfig.playerCount = Math.min(10, setupConfig.playerCount + 1);
    updateSetupUI();
  });

  els.playersRange.addEventListener('input', (e) => {
    setupConfig.playerCount = Number(e.target.value);
    updateSetupUI();
  });

  document.getElementById('impostors-1').addEventListener('click', () => {
    setupConfig.impostorCount = 1;
    updateSetupUI();
  });

  document.getElementById('impostors-2').addEventListener('click', () => {
    if (getMaxImpostors(setupConfig.playerCount) >= 2) {
      setupConfig.impostorCount = 2;
      updateSetupUI();
    }
  });

  document.querySelectorAll('.timer-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      setupConfig.timerMinutes = Number(btn.dataset.minutes);
      updateSetupUI();
    });
  });

  document.getElementById('opt-vibrate').addEventListener('change', (e) => {
    setupConfig.vibrateOnEnd = e.target.checked;
  });

  document.getElementById('opt-show-category-impostor').addEventListener('change', (e) => {
    setupConfig.showCategoryToImpostor = e.target.checked;
  });

  document.getElementById('opt-hardcore').addEventListener('change', (e) => {
    setupConfig.hardcoreMode = e.target.checked;
    if (setupConfig.hardcoreMode) {
      setupConfig.timerMinutes = 3;
      setupConfig.showCategoryToImpostor = false;
      document.getElementById('opt-show-category-impostor').checked = false;
    }
    updateSetupUI();
  });

  document.querySelectorAll('input[name="theme"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
      applyTheme(e.target.value);
    });
  });

  // Category modal
  document.getElementById('btn-open-categories').addEventListener('click', openCategoryModal);
  document.getElementById('btn-close-categories').addEventListener('click', closeCategoryModal);
  document.getElementById('btn-cancel-categories').addEventListener('click', closeCategoryModal);
  document.getElementById('btn-confirm-categories').addEventListener('click', confirmCategorySelection);

  document.getElementById('cat-all').addEventListener('change', (e) => {
    const cbs = document.querySelectorAll('#category-list input[type="checkbox"]');
    cbs.forEach(cb => { cb.checked = e.target.checked; });
    syncAllCategoriesCheckbox();
  });

  document.getElementById('category-list').addEventListener('change', () => {
    syncAllCategoriesCheckbox();
  });

  document.getElementById('btn-start').addEventListener('click', () => {
    clearState();
    startGame();
  });

  document.getElementById('btn-reveal').addEventListener('click', showRoleScreen);
  els.btnHideRole.addEventListener('click', hideRoleAndNext);

  document.getElementById('btn-pause').addEventListener('click', togglePause);
  document.getElementById('btn-end-discussion').addEventListener('click', endDiscussionEarly);
  document.getElementById('btn-reveal-result').addEventListener('click', revealResult);

  document.getElementById('btn-play-again').addEventListener('click', () => {
    clearState();
    showScreen('setup');
  });

  document.getElementById('btn-same-settings').addEventListener('click', startGameSameSettings);

  document.getElementById('btn-rules').addEventListener('click', () => {
    document.getElementById('rules-modal').showModal();
  });

  document.getElementById('btn-close-rules').addEventListener('click', () => {
    document.getElementById('rules-modal').close();
  });

  document.getElementById('btn-resume').addEventListener('click', resumeGame);

  document.getElementById('btn-discard').addEventListener('click', () => {
    clearState();
    els.resumeBanner.classList.add('hidden');
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && gameState?.screen === 'role') {
      /* extra safety – no auto action */
    }
  });
}

function init() {
  bindEvents();
  updateSetupUI();

  const saved = loadPersistedState();
  if (saved?.gameState && saved.gameState.screen !== 'setup') {
    // Restore saved theme
    if (saved.setupConfig?.theme) {
      applyTheme(saved.setupConfig.theme);
    } else {
      applyTheme('dark');
    }
    els.resumeBanner.classList.remove('hidden');
  } else {
    // Apply default dark theme
    applyTheme(setupConfig.theme);
  }
}

init();

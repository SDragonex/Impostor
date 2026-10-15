/**
 * Impostor – Hlavní herní logika (90s / 00s Minimalistický Papírový Styl)
 * Fáze 1, 2, 3 a 4: Undercover mód, vosková pečeť, párty výzvy, vlastní slova, scoreboard.
 */

const STORAGE_KEY = 'impostor-game-state';
const SQUAD_STORAGE_KEY = 'impostor-squad-names';
const SQUAD_MODE_KEY = 'impostor-use-custom-names';
const SCORES_STORAGE_KEY = 'impostor-session-scores';
const HOLD_DURATION_MS = 380;
const PLAYER_MIN = 3;
const PLAYER_MAX = 10;
const IMPOSTOR_MODES = ['1', '2', '3', 'random'];

const CODENAMES_POOL = [
  'Stín', 'Liška', 'Kobra', 'Havran', 'Duch', 'Orel', 
  'Gepard', 'Sokol', 'Panter', 'Rys', 'Vlk', 'Jestřáb'
];

/** @typedef {'setup'|'pass'|'gameplay'|'voting'|'result'} Screen */
/** @typedef {'classic'|'undercover'} GameMode */

/**
 * @typedef {object} SetupConfig
 * @property {GameMode} gameMode
 * @property {number} playerCount
 * @property {number} impostorCount
 * @property {'1'|'2'|'3'|'random'} impostorMode
 * @property {number} timerMinutes
 * @property {boolean} soundEnabled
 * @property {boolean} vibrateOnEnd
 * @property {boolean} showCategoryToImpostor
 * @property {boolean} hardcoreMode
 * @property {boolean} partyChallenge
 * @property {'light'|'dark'} theme
 * @property {string[]} selectedCategories
 * @property {boolean} useCustomNames
 * @property {string[]} squadNames
 */

/** @type {SetupConfig} */
let setupConfig = {
  gameMode: 'classic',
  playerCount: 4,
  impostorCount: 1,
  impostorMode: '1',
  timerMinutes: 5,
  soundEnabled: localStorage.getItem('impostor-sound') !== 'false',
  vibrateOnEnd: true,
  showCategoryToImpostor: true,
  hardcoreMode: false,
  partyChallenge: false,
  theme: localStorage.getItem('impostor-theme') || 'light',
  selectedCategories: [],
  useCustomNames: localStorage.getItem(SQUAD_MODE_KEY) === 'true',
  squadNames: loadSquadNames(),
};

/** @type {object|null} */
let gameState = null;

// Session Score
let sessionScores = loadSessionScores();

// Timer state
let timerInterval = null;
let timerRemainingSec = 0;
let timerTotalSec = 0;
let timerPaused = false;

// Wax Seal Scanner state
let sealHoldStartTime = null;
let sealAnimFrame = null;
let sealIsDecrypted = false;
let currentPlayerHasRevealed = false;

// --- DOM References ---
const screens = {
  setup: document.getElementById('screen-setup'),
  pass: document.getElementById('screen-pass'),
  gameplay: document.getElementById('screen-gameplay'),
  voting: document.getElementById('screen-voting'),
  result: document.getElementById('screen-result'),
};

const els = {
  playersValue: document.getElementById('players-value'),
  playersRange: document.getElementById('players-range'),
  impostorsHint: document.getElementById('impostors-hint'),
  passDossierNum: document.getElementById('pass-dossier-num'),
  passPlayerLabel: document.getElementById('pass-player-label'),
  passProgress: document.getElementById('pass-progress'),
  envelopeWrapper: document.getElementById('envelope-wrapper'),
  waxSealBtn: document.getElementById('wax-seal-btn'),
  waxSealCircle: document.getElementById('wax-seal-circle'),
  sealInstruction: document.getElementById('seal-instruction'),
  dossierSecretView: document.getElementById('dossier-secret-view'),
  roleInnocent: document.getElementById('role-innocent'),
  roleImpostor: document.getElementById('role-impostor'),
  impostorTitle: document.getElementById('impostor-title'),
  impostorDesc: document.getElementById('impostor-desc'),
  undercoverWordBox: document.getElementById('undercover-word-box'),
  undercoverWord: document.getElementById('undercover-word'),
  roleCategory: document.getElementById('role-category'),
  roleWord: document.getElementById('role-word'),
  roleImpostorCategory: document.getElementById('role-impostor-category'),
  roleCategoriesList: document.getElementById('role-categories-list'),
  btnPassNext: document.getElementById('btn-pass-next'),
  passNextLabel: document.getElementById('pass-next-label'),
  firstSpeakerName: document.getElementById('first-speaker-name'),
  partyChallengeCard: document.getElementById('party-challenge-card'),
  partyChallengeText: document.getElementById('party-challenge-text'),
  timerDisplay: document.getElementById('timer-display'),
  timerProgress: document.getElementById('timer-progress'),
  categoriesReference: document.getElementById('categories-reference'),
  votingSuspectsGrid: document.getElementById('voting-suspects-grid'),
  btnConfirmAccuse: document.getElementById('btn-confirm-accuse'),
  btnSkipVoting: document.getElementById('btn-skip-voting'),
  interrogationModal: document.getElementById('interrogation-modal'),
  interrogationSuspenseBox: document.getElementById('interrogation-suspense-box'),
  interrogationResultBox: document.getElementById('interrogation-result-box'),
  interrogatedNameSuspense: document.getElementById('interrogated-name-suspense'),
  interrogatedNameResult: document.getElementById('interrogated-name-result'),
  interrogationBadgeContainer: document.getElementById('interrogation-badge-container'),
  interrogationDesc: document.getElementById('interrogation-desc'),
  interrogationActions: document.getElementById('interrogation-actions'),
  lastChanceModal: document.getElementById('last-chance-modal'),
  lastChanceWord: document.getElementById('last-chance-word'),
  btnLastChanceSuccess: document.getElementById('btn-last-chance-success'),
  btnLastChanceFailed: document.getElementById('btn-last-chance-failed'),
  squadModal: document.getElementById('squad-modal'),
  squadInputsList: document.getElementById('squad-inputs-list'),
  squadNamesPreview: document.getElementById('squad-names-preview'),
  squadChipsList: document.getElementById('squad-chips-list'),
  squadCount: document.getElementById('squad-count'),
  modeNumbers: document.getElementById('mode-numbers'),
  modeNames: document.getElementById('mode-names'),
  btnEditSquad: document.getElementById('btn-edit-squad'),
  customWordsModal: document.getElementById('custom-words-modal'),
  customWordsTextarea: document.getElementById('custom-words-textarea'),
  customWordsCount: document.getElementById('custom-words-count'),
  btnSaveCustomWords: document.getElementById('btn-save-custom-words'),
  btnCancelCustomWords: document.getElementById('btn-cancel-custom-words'),
  scoreInnocents: document.getElementById('score-innocents'),
  scoreImpostor: document.getElementById('score-impostor'),
  btnSoundToggle: document.getElementById('btn-sound-toggle'),
  soundIcon: document.getElementById('sound-icon'),
  btnRulesHeader: document.getElementById('btn-rules-header'),
  optPartyChallenge: document.getElementById('opt-party-challenge'),
  optSound: document.getElementById('opt-sound'),
  optVibrate: document.getElementById('opt-vibrate'),
  optShowCategoryImpostor: document.getElementById('opt-show-category-impostor'),
  optHardcore: document.getElementById('opt-hardcore'),
  resultImpostors: document.getElementById('result-impostors'),
  resultWord: document.getElementById('result-word'),
  resultCategory: document.getElementById('result-category'),
  resultPlayers: document.getElementById('result-players'),
  resumeBanner: document.getElementById('resume-banner'),
};

// --- Utilities ---

function loadSquadNames() {
  try {
    const raw = localStorage.getItem(SQUAD_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return ['Petr', 'Jana', 'David', 'Míša', 'Tomáš', 'Tereza', 'Ondra', 'Bára', 'Filip', 'Klára'];
}

function saveSquadNames(names) {
  setupConfig.squadNames = names;
  try {
    localStorage.setItem(SQUAD_STORAGE_KEY, JSON.stringify(names));
  } catch {}
}

function loadSessionScores() {
  try {
    const raw = localStorage.getItem(SCORES_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { innocents: 0, impostor: 0 };
}

function saveSessionScores(scores) {
  sessionScores = scores;
  try {
    localStorage.setItem(SCORES_STORAGE_KEY, JSON.stringify(scores));
  } catch {}
  updateScoreboardUI();
}

function updateScoreboardUI() {
  if (els.scoreInnocents) els.scoreInnocents.textContent = String(sessionScores.innocents);
  if (els.scoreImpostor) els.scoreImpostor.textContent = String(sessionScores.impostor);
}

function getPlayerName(index) {
  if (setupConfig.useCustomNames && setupConfig.squadNames && setupConfig.squadNames[index]) {
    const custom = setupConfig.squadNames[index].trim();
    if (custom) return custom;
  }
  return `Hráč ${index + 1}`;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(totalSec) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function showScreen(name) {
  Object.entries(screens).forEach(([key, el]) => {
    if (el) el.classList.toggle('hidden', key !== name);
  });
  if (gameState) {
    gameState.screen = name;
    persistState();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
  } catch {}
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

// --- Theme & Sound UI ---

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  setupConfig.theme = theme;
  localStorage.setItem('impostor-theme', theme);

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute('content', theme === 'dark' ? '#0e0f13' : '#f5f0e6');
  }

  const btnLight = document.getElementById('theme-btn-light');
  const btnDark = document.getElementById('theme-btn-dark');
  if (btnLight && btnDark) {
    btnLight.classList.toggle('active', theme === 'light');
    btnDark.classList.toggle('active', theme === 'dark');
  }
}

function updateSoundUI() {
  const enabled = window.soundFx.isEnabled();
  setupConfig.soundEnabled = enabled;
  if (els.soundIcon) {
    els.soundIcon.className = enabled ? 'ph-bold ph-speaker-high' : 'ph-bold ph-speaker-slash text-[var(--text-subtle)]';
  }
  if (els.optSound) {
    els.optSound.dataset.enabled = String(enabled);
  }
}

// --- Squad Names Management ---

function updateSquadUI() {
  if (els.squadCount) els.squadCount.textContent = String(setupConfig.playerCount);
  
  if (els.modeNumbers) {
    els.modeNumbers.className = !setupConfig.useCustomNames ? 'mode-pill active' : 'mode-pill';
  }
  if (els.modeNames) {
    els.modeNames.className = setupConfig.useCustomNames ? 'mode-pill active' : 'mode-pill';
  }

  if (els.squadNamesPreview) {
    els.squadNamesPreview.classList.toggle('hidden', !setupConfig.useCustomNames);
  }

  if (els.squadChipsList) {
    els.squadChipsList.innerHTML = '';
    for (let i = 0; i < setupConfig.playerCount; i++) {
      const chip = document.createElement('span');
      chip.className = 'squad-chip';
      chip.innerHTML = `<i class="ph-bold ph-user text-[var(--stamp-red)]"></i> ${getPlayerName(i)}`;
      els.squadChipsList.appendChild(chip);
    }
  }
}

function openSquadModal() {
  window.soundFx.tap();
  els.squadInputsList.innerHTML = '';
  for (let i = 0; i < setupConfig.playerCount; i++) {
    const row = document.createElement('div');
    row.className = 'flex items-center gap-2 p-1.5 rounded sub-card';
    
    const label = document.createElement('span');
    label.className = 'text-xs font-mono text-[var(--stamp-red)] font-bold w-12 shrink-0';
    label.textContent = `#${i + 1}:`;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'flex-1 rounded px-2 py-1 text-xs theme-input outline-none';
    input.value = setupConfig.squadNames[i] || `Hráč ${i + 1}`;
    input.placeholder = `Jméno hráče ${i + 1}`;
    input.dataset.index = String(i);

    row.append(label, input);
    els.squadInputsList.appendChild(row);
  }
  els.squadModal.showModal();
}

function saveSquadFromModal() {
  window.soundFx.stamp();
  const inputs = els.squadInputsList.querySelectorAll('input');
  const newNames = [...setupConfig.squadNames];
  inputs.forEach((inp) => {
    const idx = Number(inp.dataset.index);
    const val = inp.value.trim();
    if (val) newNames[idx] = val;
  });
  saveSquadNames(newNames);
  updateSquadUI();
  els.squadModal.close();
}

function generateCodenamePool() {
  window.soundFx.tap();
  const shuffled = shuffle(CODENAMES_POOL);
  const inputs = els.squadInputsList.querySelectorAll('input');
  inputs.forEach((inp, idx) => {
    inp.value = `${shuffled[idx % shuffled.length]}`;
  });
}

// --- Custom Words Editor Modal ---

function openCustomWordsModal() {
  window.soundFx.tap();
  const words = getCustomWords();
  els.customWordsTextarea.value = words.join(', ');
  updateCustomWordsCount();
  els.customWordsModal.showModal();
}

function updateCustomWordsCount() {
  const text = els.customWordsTextarea.value;
  const words = text.split(/[,\n]/).map((w) => w.trim()).filter((w) => w.length > 0);
  els.customWordsCount.textContent = String(words.length);
}

function saveCustomWordsFromModal() {
  window.soundFx.stamp();
  const text = els.customWordsTextarea.value;
  const words = text.split(/[,\n]/).map((w) => w.trim()).filter((w) => w.length > 0);
  saveCustomWords(words);
  els.customWordsModal.close();
}

// --- Categories Modal ---

function buildCategoryModal() {
  const list = document.getElementById('category-list');
  list.innerHTML = '';
  
  // Custom words option
  const customWords = getCustomWords();
  const hasCustom = customWords.length >= 3;
  const customItem = document.createElement('div');
  customItem.className = 'flex items-center justify-between p-2 rounded sub-card';
  customItem.innerHTML = `
    <span class="flex items-center gap-2 text-xs font-bold text-[var(--stamp-green)]">
      <i class="ph-bold ph-pencil-simple text-sm"></i> Vlastní slova (${customWords.length})
    </span>
    <button type="button" class="toggle-switch" data-enabled="${String(setupConfig.selectedCategories.includes('custom'))}" data-key="custom" ${!hasCustom ? 'disabled style="opacity:0.4;"' : ''}>
      <span class="toggle-slider"></span>
    </button>
  `;
  list.appendChild(customItem);

  Object.entries(WORD_DICTIONARY).forEach(([key, cat]) => {
    const item = document.createElement('div');
    item.className = 'flex items-center justify-between p-2 rounded sub-card';
    
    const iconSpan = document.createElement('span');
    iconSpan.className = 'flex items-center gap-2 text-xs font-medium text-[var(--text-ink)]';
    iconSpan.innerHTML = `<i class="ph-bold ${cat.icon} text-[var(--stamp-red)] text-sm"></i> ${cat.name}`;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'toggle-switch';
    toggle.dataset.enabled = String(setupConfig.selectedCategories.includes(key));
    toggle.dataset.key = key;
    toggle.setAttribute('aria-label', cat.name);
    
    const slider = document.createElement('span');
    slider.className = 'toggle-slider';
    toggle.appendChild(slider);

    item.append(iconSpan, toggle);
    list.appendChild(item);
  });
  syncAllCategoriesToggle();
}

function syncAllCategoriesToggle() {
  const allBtn = document.getElementById('cat-all');
  const allKeys = Object.keys(WORD_DICTIONARY);
  const enabled = document.querySelectorAll('#category-list .toggle-switch[data-enabled="true"]');
  allBtn.dataset.enabled = String(enabled.length === allKeys.length || enabled.length === 0);
}

function openCategoryModal() {
  window.soundFx.tap();
  buildCategoryModal();
  document.getElementById('category-modal').showModal();
}

function closeCategoryModal() {
  window.soundFx.tap();
  document.getElementById('category-modal').close();
}

function confirmCategorySelection() {
  window.soundFx.stamp();
  const enabled = document.querySelectorAll('#category-list .toggle-switch[data-enabled="true"]');
  const allKeys = Object.keys(WORD_DICTIONARY);
  const selectedKeys = Array.from(enabled).map((btn) => btn.dataset.key).filter(Boolean);
  setupConfig.selectedCategories = (selectedKeys.length === allKeys.length) ? [] : selectedKeys;
  updateCategoriesBadge();
  closeCategoryModal();
}

function updateCategoriesBadge() {
  const badge = document.getElementById('categories-badge');
  const n = setupConfig.selectedCategories.length;
  if (n === 0) {
    badge.classList.add('hidden');
  } else {
    badge.textContent = String(n);
    badge.classList.remove('hidden');
  }
}

// --- Setup UI Sync ---

function getMaxImpostors(playerCount) {
  if (playerCount <= 4) return 1;
  if (playerCount <= 8) return 2;
  return 3;
}

function resolveImpostorCount() {
  if (setupConfig.gameMode === 'undercover') {
    return 1; // Undercover má vždy 1 tajného agenta
  }
  if (setupConfig.impostorMode === 'random') {
    const max = getMaxImpostors(setupConfig.playerCount);
    return Math.floor(Math.random() * max) + 1;
  }
  return setupConfig.impostorCount;
}

function updateSetupUI() {
  els.playersValue.textContent = String(setupConfig.playerCount);
  els.playersRange.value = String(setupConfig.playerCount);

  // Game mode pills
  const modeClassic = document.getElementById('mode-classic');
  const modeUndercover = document.getElementById('mode-undercover');
  const fieldsetImpostors = document.getElementById('fieldset-impostors');

  if (modeClassic && modeUndercover) {
    modeClassic.classList.toggle('active', setupConfig.gameMode === 'classic');
    modeUndercover.classList.toggle('active', setupConfig.gameMode === 'undercover');
  }

  // Undercover mode hides impostor count (always 1)
  if (fieldsetImpostors) {
    fieldsetImpostors.style.display = setupConfig.gameMode === 'undercover' ? 'none' : '';
  }

  const maxImp = getMaxImpostors(setupConfig.playerCount);
  IMPOSTOR_MODES.forEach((mode) => {
    const btn = document.getElementById(`impostors-${mode}`);
    if (!btn) return;
    const isEnabled = mode === 'random' ? true : Number(mode) <= maxImp;
    btn.disabled = !isEnabled;
    btn.classList.toggle('active', setupConfig.impostorMode === mode);
    btn.classList.toggle('opacity-40', mode !== 'random' && Number(mode) > maxImp);
  });

  els.impostorsHint.innerHTML =
    setupConfig.impostorMode === 'random'
      ? `<i class="ph-bold ph-dice-six text-[#b91c1c]"></i> Náhodně 1–${maxImp} impostorů`
      : `<i class="ph-bold ph-info"></i> ${setupConfig.impostorMode} impostor${Number(setupConfig.impostorMode) > 1 ? 'i' : ''}`;

  document.querySelectorAll('.timer-btn').forEach((btn) => {
    const mins = Number(btn.dataset.minutes);
    btn.classList.toggle('active', mins === setupConfig.timerMinutes);
    btn.disabled = setupConfig.hardcoreMode && mins !== 3;
  });

  if (els.optPartyChallenge) els.optPartyChallenge.dataset.enabled = String(setupConfig.partyChallenge);
  if (els.optSound) els.optSound.dataset.enabled = String(setupConfig.soundEnabled);
  if (els.optVibrate) els.optVibrate.dataset.enabled = String(setupConfig.vibrateOnEnd);
  if (els.optShowCategoryImpostor) els.optShowCategoryImpostor.dataset.enabled = String(setupConfig.showCategoryToImpostor);
  if (els.optHardcore) els.optHardcore.dataset.enabled = String(setupConfig.hardcoreMode);

  const showCatLabel = document.getElementById('opt-show-category-label');
  if (showCatLabel) {
    showCatLabel.style.opacity = (setupConfig.hardcoreMode || setupConfig.gameMode === 'undercover') ? '0.4' : '1';
    showCatLabel.style.pointerEvents = (setupConfig.hardcoreMode || setupConfig.gameMode === 'undercover') ? 'none' : '';
  }

  updateSquadUI();
  updateCategoriesBadge();
  updateScoreboardUI();
}

// --- Start Game ---

function startGame() {
  window.soundFx.init();
  window.soundFx.stamp();

  let categoryName = '';
  let categoryIcon = 'ph-tag';
  let wordCivilians = '';
  let wordUndercover = '';

  if (setupConfig.gameMode === 'undercover') {
    const pair = pickUndercoverPair();
    categoryName = pair.categoryName;
    wordCivilians = pair.wordCivilians;
    wordUndercover = pair.wordUndercover;
  } else {
    const picked = pickRandomWord(setupConfig.selectedCategories);
    categoryName = picked.categoryName;
    categoryIcon = picked.icon;
    wordCivilians = picked.word;
  }

  const totalImpostors = resolveImpostorCount();
  const playerIndices = shuffle(Array.from({ length: setupConfig.playerCount }, (_, i) => i));
  const impostorIndices = playerIndices.slice(0, totalImpostors).sort((a, b) => a - b);
  const firstSpeakerIndex = Math.floor(Math.random() * setupConfig.playerCount);
  const challenge = setupConfig.partyChallenge ? pickRandomChallenge() : null;

  gameState = {
    screen: 'pass',
    gameMode: setupConfig.gameMode,
    categoryName,
    categoryIcon,
    word: wordCivilians,
    wordUndercover,
    impostorIndices,
    currentPlayerIndex: 0,
    firstSpeakerIndex,
    challenge,
    accusedHistory: [],
    selectedSuspectIndex: null,
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

// --- Pass & Wax Seal Hold-to-Reveal ---

function showPassScreen() {
  showScreen('pass');
  const num = gameState.currentPlayerIndex + 1;
  const name = getPlayerName(gameState.currentPlayerIndex);
  
  els.passDossierNum.textContent = `OBÁLKA #${num}`;
  els.passPlayerLabel.textContent = name;
  els.passProgress.textContent = `${num} / ${setupConfig.playerCount}`;

  // Reset seal state
  currentPlayerHasRevealed = false;
  sealIsDecrypted = false;
  resetSealVisuals();

  els.btnPassNext.disabled = true;
  if (gameState.currentPlayerIndex === setupConfig.playerCount - 1) {
    els.passNextLabel.textContent = 'Zahájit diskusi u stolu';
  } else {
    els.passNextLabel.textContent = 'Předat dalšímu hráči';
  }
}

function resetSealVisuals() {
  if (els.waxSealCircle) {
    els.waxSealCircle.style.strokeDashoffset = '345';
  }
  if (els.waxSealBtn) {
    els.waxSealBtn.classList.remove('holding');
  }
  if (els.sealInstruction) {
    els.sealInstruction.innerHTML = '<i class="ph-bold ph-hand-tap"></i> Přidrž pečeť pro nahlédnutí';
    els.sealInstruction.className = 'text-xs font-mono font-bold uppercase tracking-wider mt-4 text-[#b91c1c] flex items-center gap-1.5';
  }
  if (els.dossierSecretView) {
    els.dossierSecretView.classList.add('hidden');
  }
  if (els.envelopeWrapper) {
    els.envelopeWrapper.classList.remove('hidden');
  }
}

function startSealHold(e) {
  if (e) e.preventDefault();
  window.soundFx.init();
  if (sealHoldStartTime !== null) return;

  sealHoldStartTime = performance.now();
  els.waxSealBtn.classList.add('holding');
  els.sealInstruction.innerHTML = '<i class="ph-bold ph-envelope-open"></i> Otevírání obálky...';
  
  window.soundFx.startSealHold();
  if (navigator.vibrate) navigator.vibrate(25);

  function tick(now) {
    if (sealHoldStartTime === null) return;
    const elapsed = now - sealHoldStartTime;
    const progress = Math.min(1, elapsed / HOLD_DURATION_MS);
    
    // 345 circumference -> 0
    const offset = 345 - (345 * progress);
    els.waxSealCircle.style.strokeDashoffset = String(offset);

    if (progress >= 1) {
      onSealComplete();
    } else {
      sealAnimFrame = requestAnimationFrame(tick);
    }
  }

  sealAnimFrame = requestAnimationFrame(tick);
}

function endSealHold(e) {
  if (e) e.preventDefault();
  if (sealAnimFrame) {
    cancelAnimationFrame(sealAnimFrame);
    sealAnimFrame = null;
  }
  sealHoldStartTime = null;
  window.soundFx.stopSealHold();

  // Instant Redaction! Paper slides back into envelope
  if (sealIsDecrypted) {
    sealIsDecrypted = false;
    els.dossierSecretView.classList.add('hidden');
    els.envelopeWrapper.classList.remove('hidden');
    els.waxSealBtn.classList.remove('holding');
    els.waxSealCircle.style.strokeDashoffset = '0';
    els.sealInstruction.innerHTML = '<i class="ph-bold ph-check text-[#15803d]"></i> Dopis přečten (Obálka uzavřena)';
    els.sealInstruction.className = 'text-xs font-mono font-bold uppercase tracking-wider mt-4 text-[#15803d] flex items-center gap-1.5';
    
    currentPlayerHasRevealed = true;
    els.btnPassNext.disabled = false;
  } else {
    resetSealVisuals();
  }
}

function onSealComplete() {
  if (sealAnimFrame) {
    cancelAnimationFrame(sealAnimFrame);
    sealAnimFrame = null;
  }
  window.soundFx.stopSealHold();
  window.soundFx.envelopeOpen();
  if (navigator.vibrate) navigator.vibrate([40, 70]);

  sealIsDecrypted = true;
  els.waxSealBtn.classList.remove('holding');

  const isImpostor = gameState.impostorIndices.includes(gameState.currentPlayerIndex);
  const isUndercover = gameState.gameMode === 'undercover' && isImpostor;

  if (isUndercover) {
    // Undercover mode: Impostor gets a decoy word and thinks they are civilian!
    els.roleInnocent.classList.add('hidden');
    els.roleImpostor.classList.remove('hidden');
    els.undercoverWordBox.classList.remove('hidden');
    els.undercoverWord.textContent = gameState.wordUndercover;
    els.impostorTitle.textContent = 'JSI UNDERCOVER!';
    els.impostorDesc.textContent = 'Pozor! Máš mírně odlišné slovo než ostatní, ale nevíš jaké! Poslouchej nápovědy a zkus zjistit, co mají ostatní.';
    els.roleImpostorCategory.classList.add('hidden');
  } else if (isImpostor) {
    // Classic Impostor
    els.roleInnocent.classList.add('hidden');
    els.roleImpostor.classList.remove('hidden');
    els.undercoverWordBox.classList.add('hidden');
    els.impostorTitle.textContent = 'JSI IMPOSTOR!';
    els.impostorDesc.textContent = 'Neznáš tajné slovo! Tvař se nenápadně, poslouchej nápovědy ostatních a splyň s davem.';

    populateCategoriesList(els.roleCategoriesList);
    if (setupConfig.showCategoryToImpostor && !setupConfig.hardcoreMode) {
      els.roleImpostorCategory.textContent = `Téma: ${gameState.categoryName}`;
      els.roleImpostorCategory.classList.remove('hidden');
    } else {
      els.roleImpostorCategory.classList.add('hidden');
    }
  } else {
    // Innocent
    els.roleInnocent.classList.remove('hidden');
    els.roleImpostor.classList.add('hidden');
    els.roleCategory.textContent = gameState.categoryName;
    els.roleWord.textContent = gameState.word;
  }

  els.envelopeWrapper.classList.add('hidden');
  els.dossierSecretView.classList.remove('hidden');
}

function populateCategoriesList(container) {
  container.innerHTML = '';
  Object.values(WORD_DICTIONARY).forEach((cat) => {
    const li = document.createElement('li');
    li.innerHTML = `<i class="ph-bold ${cat.icon} text-[#b91c1c]"></i> ${cat.name}`;
    container.appendChild(li);
  });
}

function onPassNext() {
  window.soundFx.tap();
  gameState.currentPlayerIndex += 1;

  if (gameState.currentPlayerIndex >= setupConfig.playerCount) {
    startGameplay();
  } else {
    persistState();
    showPassScreen();
  }
}

// --- Gameplay & Discussion Timer ---

function renderCategoriesReference() {
  els.categoriesReference.innerHTML = '';
  Object.values(WORD_DICTIONARY).forEach((cat) => {
    const block = document.createElement('div');
    block.className = 'category-block';
    
    const h4 = document.createElement('h4');
    h4.innerHTML = `<i class="ph-bold ${cat.icon} text-[#b91c1c]"></i> ${cat.name}`;

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

  // First speaker designation
  const speakerName = getPlayerName(gameState.firstSpeakerIndex);
  els.firstSpeakerName.textContent = speakerName;

  // Party Challenge Banner
  if (gameState.challenge) {
    els.partyChallengeCard.classList.remove('hidden');
    els.partyChallengeText.textContent = `${gameState.challenge.title}: ${gameState.challenge.desc}`;
  } else {
    els.partyChallengeCard.classList.add('hidden');
  }

  timerTotalSec = setupConfig.timerMinutes * 60;
  timerRemainingSec = gameState.timerRemainingSec ?? timerTotalSec;
  timerPaused = gameState.timerPaused ?? false;

  updateTimerDisplay();

  const pauseBtn = document.getElementById('btn-pause');
  if (timerPaused) {
    pauseBtn.innerHTML = '<i class="ph-bold ph-play"></i> Pokračovat v diskusi';
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

    // Clock tick during final 10 seconds
    if (timerRemainingSec <= 10 && timerRemainingSec > 0) {
      window.soundFx.clockTick(timerRemainingSec % 2 === 0);
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
    els.timerDisplay.classList.add('text-[#b91c1c]');
  } else {
    els.timerDisplay.classList.remove('text-[#b91c1c]');
  }
}

function togglePause() {
  window.soundFx.tap();
  timerPaused = !timerPaused;
  gameState.timerPaused = timerPaused;

  const pauseBtn = document.getElementById('btn-pause');
  if (timerPaused) {
    pauseBtn.innerHTML = '<i class="ph-bold ph-play"></i> Pokračovat v diskusi';
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
  window.soundFx.bell();
  if (setupConfig.vibrateOnEnd && navigator.vibrate) {
    navigator.vibrate([200, 100, 200]);
  }
  goToVotingArena();
}

function endDiscussionEarly() {
  window.soundFx.stamp();
  stopTimer();
  goToVotingArena();
}

// --- Interactive Voting Arena ---

function goToVotingArena() {
  stopTimer();
  showScreen('voting');
  gameState.screen = 'voting';
  gameState.selectedSuspectIndex = null;
  persistState();
  renderSuspectsGrid();
}

function renderSuspectsGrid() {
  els.votingSuspectsGrid.innerHTML = '';
  els.btnConfirmAccuse.disabled = true;
  els.btnConfirmAccuse.innerHTML = '<i class="ph-bold ph-magnifying-glass"></i> Vyberte podezřelého';

  for (let i = 0; i < setupConfig.playerCount; i++) {
    const card = document.createElement('div');
    const isAlreadyAccused = gameState.accusedHistory.includes(i);
    const isSelected = gameState.selectedSuspectIndex === i;

    card.className = `suspect-card ${isSelected ? 'selected' : ''} ${isAlreadyAccused ? 'opacity-40 pointer-events-none' : ''}`;
    
    const icon = isAlreadyAccused ? 'ph-bold ph-check text-[var(--text-subtle)]' : 'ph-bold ph-user text-[var(--stamp-red)]';
    
    card.innerHTML = `
      <div class="w-8 h-8 rounded bg-[var(--bg-surface)] border border-[var(--border-paper)] flex items-center justify-center shrink-0">
        <i class="${icon} text-lg"></i>
      </div>
      <div class="flex-1 leading-tight">
        <p class="font-bold text-sm text-[var(--text-ink)]">${getPlayerName(i)}</p>
        <p class="text-[10px] font-mono text-[var(--text-subtle)] mt-0.5">${isAlreadyAccused ? 'JIŽ PROVĚŘEN' : `Hráč #${i + 1}`}</p>
      </div>
      ${isSelected ? '<span class="paper-stamp paper-stamp-red text-[9px] !py-0.5">PODEZŘELÝ</span>' : ''}
    `;

    if (!isAlreadyAccused) {
      card.addEventListener('click', () => {
        window.soundFx.tap();
        gameState.selectedSuspectIndex = i;
        renderSuspectsGrid();
        els.btnConfirmAccuse.disabled = false;
        els.btnConfirmAccuse.innerHTML = `<i class="ph-bold ph-magnifying-glass"></i> Prověřit podezřelého: <strong>${getPlayerName(i)}</strong>`;
      });
    }

    els.votingSuspectsGrid.appendChild(card);
  }
}

function confirmAccusation() {
  if (gameState.selectedSuspectIndex === null) return;
  const accusedIdx = gameState.selectedSuspectIndex;
  const name = getPlayerName(accusedIdx);
  gameState.accusedHistory.push(accusedIdx);
  persistState();

  els.interrogatedNameSuspense.textContent = name;
  els.interrogationSuspenseBox.classList.remove('hidden');
  els.interrogationResultBox.classList.add('hidden');
  els.interrogationModal.showModal();

  window.soundFx.clockTick(false);
  setTimeout(() => window.soundFx.clockTick(true), 600);
  setTimeout(() => window.soundFx.clockTick(false), 1200);

  setTimeout(() => {
    resolveAccusation(accusedIdx);
  }, 1800);
}

function resolveAccusation(accusedIdx) {
  const isImpostor = gameState.impostorIndices.includes(accusedIdx);
  const name = getPlayerName(accusedIdx);

  els.interrogationSuspenseBox.classList.add('hidden');
  els.interrogationResultBox.classList.remove('hidden');
  els.interrogatedNameResult.textContent = name;

  if (isImpostor) {
    window.soundFx.impostorFound();
    if (navigator.vibrate) navigator.vibrate([100, 50, 200]);

    const titleText = gameState.gameMode === 'undercover' ? 'UNDERCOVER ODHALEN!' : 'IMPOSTOR ODHALEN!';
    els.interrogationBadgeContainer.innerHTML = `<span class="paper-stamp paper-stamp-red text-sm py-1 px-3"><i class="ph-bold ph-check"></i> ${titleText}</span>`;
    els.interrogationDesc.textContent = `Hráč ${name} byl skutečně vetřelcem! Tým úspěšně boduje.`;

    els.interrogationActions.innerHTML = `
      <button type="button" id="btn-open-last-chance" class="btn-primary w-full !bg-[#b91c1c] !border-[#b91c1c] text-white py-3 text-xs font-bold">
        <i class="ph-bold ph-trophy"></i> Poslední šance: Uhodne impostor slovo?
      </button>
      <button type="button" id="btn-direct-result" class="btn-secondary w-full text-xs py-2">
        <i class="ph-bold ph-file-text"></i> Zobrazit výsledek kola
      </button>
    `;

    document.getElementById('btn-open-last-chance').addEventListener('click', () => {
      els.interrogationModal.close();
      openLastChanceModal();
    });

    document.getElementById('btn-direct-result').addEventListener('click', () => {
      els.interrogationModal.close();
      awardScore('innocents');
      revealResult();
    });

  } else {
    window.soundFx.innocentMistake();
    if (navigator.vibrate) navigator.vibrate(150);

    els.interrogationBadgeContainer.innerHTML = '<span class="paper-stamp text-sm py-1 px-3"><i class="ph-bold ph-x"></i> NEVINNÝ HRÁČ!</span>';
    els.interrogationDesc.textContent = `Hráč ${name} nebyl impostor! Skutečný vetřelec stále uniká.`;

    const remainingSuspects = setupConfig.playerCount - gameState.accusedHistory.length;

    els.interrogationActions.innerHTML = `
      ${remainingSuspects > 1 ? `
        <button type="button" id="btn-continue-accusing" class="btn-primary w-full py-2.5 text-xs font-bold">
          <i class="ph-bold ph-magnifying-glass"></i> Pokračovat ve vyšetřování
        </button>
      ` : ''}
      <button type="button" id="btn-innocent-to-result" class="btn-secondary w-full text-xs py-2">
        <i class="ph-bold ph-file-text"></i> Zobrazit výsledek kola
      </button>
    `;

    if (document.getElementById('btn-continue-accusing')) {
      document.getElementById('btn-continue-accusing').addEventListener('click', () => {
        els.interrogationModal.close();
        renderSuspectsGrid();
      });
    }

    document.getElementById('btn-innocent-to-result').addEventListener('click', () => {
      els.interrogationModal.close();
      awardScore('impostor');
      revealResult();
    });
  }
}

// --- Scoreboard Awards ---

function awardScore(winner) {
  if (winner === 'innocents') {
    sessionScores.innocents += 1;
  } else if (winner === 'impostor') {
    sessionScores.impostor += 1;
  }
  saveSessionScores(sessionScores);
}

// --- Last Chance Guess Modal ---

function openLastChanceModal() {
  window.soundFx.tap();
  els.lastChanceWord.textContent = gameState.word;
  els.lastChanceModal.showModal();
}

function onLastChanceFailed() {
  window.soundFx.victory();
  els.lastChanceModal.close();
  awardScore('innocents');
  revealResult();
}

function onLastChanceSuccess() {
  window.soundFx.stamp();
  els.lastChanceModal.close();
  awardScore('impostor');
  revealResult(true);
}

// --- Final Result Screen ---

function revealResult(impostorStoleVictory = false) {
  showScreen('result');
  window.soundFx.victory();

  const impostorNames = gameState.impostorIndices
    .map((i) => getPlayerName(i))
    .join(' a ');

  els.resultImpostors.textContent = impostorNames + (impostorStoleVictory ? ' (Uhodl heslo v Poslední šanci!)' : '');
  els.resultWord.textContent = gameState.word;
  els.resultCategory.innerHTML = `<i class="ph-bold ${gameState.categoryIcon || 'ph-tag'} text-[var(--stamp-red)]"></i> ${gameState.categoryName}`;

  els.resultPlayers.innerHTML = '';
  for (let i = 0; i < setupConfig.playerCount; i++) {
    const li = document.createElement('li');
    const isImp = gameState.impostorIndices.includes(i);
    const wasAccused = gameState.accusedHistory.includes(i);
    const pName = getPlayerName(i);

    li.className = isImp ? 'player-row-impostor' : 'player-row-innocent';
    
    let statusBadge = '';
    if (isImp) {
      const impLabel = gameState.gameMode === 'undercover' ? `UNDERCOVER („${gameState.wordUndercover}“)` : 'IMPOSTOR';
      statusBadge = `<span class="paper-stamp paper-stamp-red text-[9px]">${impLabel}</span>`;
    } else if (wasAccused) {
      statusBadge = '<span class="paper-stamp text-[9px]">CHYBNĚ OBVINĚN</span>';
    } else {
      statusBadge = '<span class="paper-stamp paper-stamp-green text-[9px]">NEVINNÝ</span>';
    }

    li.innerHTML = `
      <div class="flex items-center gap-2">
        <i class="ph-bold ${isImp ? 'ph-mask-sad text-[var(--stamp-red)]' : 'ph-check text-[var(--stamp-green)]'}"></i>
        <span><strong>${pName}</strong></span>
      </div>
      ${statusBadge}
    `;
    els.resultPlayers.appendChild(li);
  }

  gameState.screen = 'result';
  persistState();
}

// --- Resume Game ---

function resumeGame() {
  const saved = loadPersistedState();
  if (!saved?.gameState) return;

  setupConfig = saved.setupConfig;
  gameState = saved.gameState;
  updateSetupUI();
  updateSoundUI();
  applyTheme(setupConfig.theme ?? 'light');

  const screen = gameState.screen;
  if (screen === 'pass') {
    showPassScreen();
  } else if (screen === 'gameplay') {
    startGameplay();
  } else if (screen === 'voting') {
    goToVotingArena();
  } else if (screen === 'result') {
    revealResult();
  } else {
    showScreen('setup');
  }

  els.resumeBanner.classList.add('hidden');
}

// --- Event Binding ---

function bindEvents() {
  // Game Mode selector
  const modeClassic = document.getElementById('mode-classic');
  const modeUndercover = document.getElementById('mode-undercover');
  if (modeClassic && modeUndercover) {
    modeClassic.addEventListener('click', () => {
      window.soundFx.tap();
      setupConfig.gameMode = 'classic';
      updateSetupUI();
    });
    modeUndercover.addEventListener('click', () => {
      window.soundFx.tap();
      setupConfig.gameMode = 'undercover';
      updateSetupUI();
    });
  }

  // Sound toggle button in header
  els.btnSoundToggle.addEventListener('click', () => {
    window.soundFx.toggle();
    updateSoundUI();
  });

  // Sound toggle switch in settings
  els.optSound.addEventListener('click', () => {
    window.soundFx.toggle();
    updateSoundUI();
  });

  // Rules in header
  els.btnRulesHeader.addEventListener('click', () => {
    window.soundFx.tap();
    document.getElementById('rules-modal').showModal();
  });

  document.getElementById('btn-close-rules').addEventListener('click', () => {
    window.soundFx.tap();
    document.getElementById('rules-modal').close();
  });

  // Stepper buttons
  document.getElementById('players-minus').addEventListener('click', () => {
    window.soundFx.tap();
    setupConfig.playerCount = Math.max(PLAYER_MIN, setupConfig.playerCount - 1);
    updateSetupUI();
  });

  document.getElementById('players-plus').addEventListener('click', () => {
    window.soundFx.tap();
    setupConfig.playerCount = Math.min(PLAYER_MAX, setupConfig.playerCount + 1);
    updateSetupUI();
  });

  els.playersRange.addEventListener('input', (e) => {
    setupConfig.playerCount = Number(e.target.value);
    updateSetupUI();
  });

  // Squad Names Mode toggles
  els.modeNumbers.addEventListener('click', () => {
    window.soundFx.tap();
    setupConfig.useCustomNames = false;
    localStorage.setItem(SQUAD_MODE_KEY, 'false');
    updateSquadUI();
  });

  els.modeNames.addEventListener('click', () => {
    window.soundFx.tap();
    setupConfig.useCustomNames = true;
    localStorage.setItem(SQUAD_MODE_KEY, 'true');
    updateSquadUI();
  });

  els.btnEditSquad.addEventListener('click', openSquadModal);
  document.getElementById('btn-close-squad').addEventListener('click', () => {
    window.soundFx.tap();
    els.squadModal.close();
  });
  document.getElementById('btn-cancel-squad').addEventListener('click', () => {
    window.soundFx.tap();
    els.squadModal.close();
  });
  document.getElementById('btn-confirm-squad').addEventListener('click', saveSquadFromModal);
  document.getElementById('btn-generate-codenames').addEventListener('click', generateCodenamePool);

  // Custom Words Modal
  document.getElementById('btn-open-custom-words').addEventListener('click', openCustomWordsModal);
  document.getElementById('btn-close-custom-words').addEventListener('click', () => {
    window.soundFx.tap();
    els.customWordsModal.close();
  });
  els.btnCancelCustomWords.addEventListener('click', () => {
    window.soundFx.tap();
    els.customWordsModal.close();
  });
  els.btnSaveCustomWords.addEventListener('click', saveCustomWordsFromModal);
  els.customWordsTextarea.addEventListener('input', updateCustomWordsCount);

  // Impostor count buttons
  IMPOSTOR_MODES.forEach((mode) => {
    const btn = document.getElementById(`impostors-${mode}`);
    if (!btn) return;
    btn.addEventListener('click', () => {
      window.soundFx.tap();
      const maxImp = getMaxImpostors(setupConfig.playerCount);
      if (mode !== 'random' && Number(mode) > maxImp) return;
      setupConfig.impostorMode = mode;
      if (mode !== 'random') {
        setupConfig.impostorCount = Number(mode);
      }
      updateSetupUI();
    });
  });

  // Timer length buttons
  document.querySelectorAll('.timer-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      window.soundFx.tap();
      setupConfig.timerMinutes = Number(btn.dataset.minutes);
      updateSetupUI();
    });
  });

  // Toggle switch helper
  function toggleHandler(btn, configKey) {
    window.soundFx.tap();
    const currentlyEnabled = btn.dataset.enabled === 'true';
    btn.dataset.enabled = String(!currentlyEnabled);
    setupConfig[configKey] = !currentlyEnabled;
  }

  els.optPartyChallenge.addEventListener('click', (e) => {
    toggleHandler(e.currentTarget, 'partyChallenge');
  });

  els.optVibrate.addEventListener('click', (e) => {
    toggleHandler(e.currentTarget, 'vibrateOnEnd');
  });

  els.optShowCategoryImpostor.addEventListener('click', (e) => {
    toggleHandler(e.currentTarget, 'showCategoryToImpostor');
  });

  els.optHardcore.addEventListener('click', (e) => {
    toggleHandler(e.currentTarget, 'hardcoreMode');
    if (setupConfig.hardcoreMode) {
      setupConfig.timerMinutes = 3;
      setupConfig.showCategoryToImpostor = false;
      els.optShowCategoryImpostor.dataset.enabled = 'false';
    }
    updateSetupUI();
  });

  // Theme buttons
  document.getElementById('theme-btn-light').addEventListener('click', () => {
    window.soundFx.tap();
    applyTheme('light');
  });
  document.getElementById('theme-btn-dark').addEventListener('click', () => {
    window.soundFx.tap();
    applyTheme('dark');
  });

  // Categories Modal
  document.getElementById('btn-open-categories').addEventListener('click', openCategoryModal);
  document.getElementById('btn-close-categories').addEventListener('click', closeCategoryModal);
  document.getElementById('btn-cancel-categories').addEventListener('click', closeCategoryModal);
  document.getElementById('btn-confirm-categories').addEventListener('click', confirmCategorySelection);

  document.getElementById('cat-all').addEventListener('click', (e) => {
    window.soundFx.tap();
    const enabled = e.currentTarget.dataset.enabled === 'true';
    const newEnabled = !enabled;
    e.currentTarget.dataset.enabled = String(newEnabled);
    document.querySelectorAll('#category-list .toggle-switch').forEach((btn) => {
      btn.dataset.enabled = String(newEnabled);
    });
    syncAllCategoriesToggle();
  });

  document.getElementById('category-list').addEventListener('click', (e) => {
    const toggle = e.target.closest('.toggle-switch');
    if (toggle && !toggle.disabled) {
      window.soundFx.tap();
      const currentlyEnabled = toggle.dataset.enabled === 'true';
      toggle.dataset.enabled = String(!currentlyEnabled);
      syncAllCategoriesToggle();
    }
  });

  // Start button
  document.getElementById('btn-start').addEventListener('click', () => {
    clearState();
    startGame();
  });

  // Wax Seal Hold-to-Reveal Event Listeners
  if (els.waxSealBtn) {
    els.waxSealBtn.addEventListener('pointerdown', startSealHold);
    els.waxSealBtn.addEventListener('pointerup', endSealHold);
    els.waxSealBtn.addEventListener('pointercancel', endSealHold);
    els.waxSealBtn.addEventListener('pointerleave', endSealHold);
    els.waxSealBtn.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.code === 'Enter') startSealHold(e);
    });
    els.waxSealBtn.addEventListener('keyup', (e) => {
      if (e.code === 'Space' || e.code === 'Enter') endSealHold(e);
    });
  }

  els.btnPassNext.addEventListener('click', onPassNext);

  // Gameplay buttons
  document.getElementById('btn-pause').addEventListener('click', togglePause);
  document.getElementById('btn-end-discussion').addEventListener('click', endDiscussionEarly);

  // Voting Arena
  els.btnConfirmAccuse.addEventListener('click', confirmAccusation);
  els.btnSkipVoting.addEventListener('click', () => {
    window.soundFx.tap();
    awardScore('innocents');
    revealResult();
  });

  // Last Chance Modal
  els.btnLastChanceSuccess.addEventListener('click', onLastChanceSuccess);
  els.btnLastChanceFailed.addEventListener('click', onLastChanceFailed);

  // Play Again & Reset
  document.getElementById('btn-play-again').addEventListener('click', () => {
    window.soundFx.tap();
    clearState();
    showScreen('setup');
  });

  document.getElementById('btn-same-settings').addEventListener('click', () => {
    window.soundFx.tap();
    startGameSameSettings();
  });

  // Resume banner
  document.getElementById('btn-resume').addEventListener('click', resumeGame);
  document.getElementById('btn-discard').addEventListener('click', () => {
    clearState();
    els.resumeBanner.classList.add('hidden');
  });
}

// --- Initialization ---

function init() {
  bindEvents();
  updateSetupUI();
  updateSoundUI();
  applyTheme(setupConfig.theme);

  const saved = loadPersistedState();
  if (saved?.gameState && saved.gameState.screen !== 'setup') {
    els.resumeBanner.classList.remove('hidden');
  }
}

init();

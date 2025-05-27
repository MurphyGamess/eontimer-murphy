const targetFrameInput = document.getElementById("targetFrame");
const preTimerInput = document.getElementById("preTimer");
const calibrationInput = document.getElementById("calibration");
const frameHitInput = document.getElementById("frameHit");
const mainTimer = document.getElementById("mainTimer");
const subTimer = document.getElementById("subTimer");
const startButton = document.getElementById("startButton");
const updateButton = document.getElementById("updateButton");

// NUEVO: Mostrar info de frames
let frameInfo = document.getElementById("frameInfo");
if (!frameInfo) {
  frameInfo = document.createElement("div");
  frameInfo.id = "frameInfo";
  frameInfo.style.marginTop = "8px";
  subTimer.parentNode.insertBefore(frameInfo, subTimer.nextSibling);
}

let consoleFpsValue = 59.6555; // Valor inicial

// Propiedad reactiva para consoleFps
Object.defineProperty(window, 'consoleFps', {
  configurable: true,
  enumerable: true,
  get() {
    return consoleFpsValue;
  },
  set(value) {
    consoleFpsValue = value;
    // Recalcular targetMillis y actualizar subTimer cuando cambia FPS
    targetMillis = framesToMillis(+targetFrameInput.value || 0);
    updateSubTimer();
  }
});

// Función para recibir CPS (FPS) desde fuera y actualizar
window.recibirCPS = function(cpsValue) {
  console.log('Valor CPS recibido:', cpsValue);
  window.consoleFps = cpsValue;
};

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const beepSoundPath = "resources/sounds/beep.wav";

let beepBuffer = null;
fetch(beepSoundPath)
  .then(res => res.arrayBuffer())
  .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
  .then(buffer => { beepBuffer = buffer; })
  .catch(err => console.error("Audio load error:", err));

const playBeep = () => {
  if (!beepBuffer) return;
  const source = audioContext.createBufferSource();
  source.buffer = beepBuffer;
  source.connect(audioContext.destination);
  source.start();

  mainTimer.style.backgroundColor = "red";
  setTimeout(() => { mainTimer.style.backgroundColor = ""; }, 50);
};

let preTimerMillis = +preTimerInput.value || 0;
let targetMillis = 0;
let frameHitMillis = 0;
let adjustedTargetMillis = 0;
let timerInterval = null;

// AJUSTADO: Redondeo para máxima precisión
const framesToMillis = f => Math.round(f * 1000 / window.consoleFps);
const millisToFrames = ms => Math.round(ms / 1000 * window.consoleFps);

const formatTime = millis => {
  const seconds = Math.floor(millis / 1000);
  const ms = millis - seconds * 1000;
  return `${seconds}:${ms.toString().padStart(3, "0")}`;
};

// AJUSTADO: Ya no guardamos calibración en localStorage automáticamente
const getAdjustedTargetMillis = (target, hit) => {
  if (hit <= 0) return target;
  const offset = target - hit;
  calibrationInput.value = offset;
  return target + offset;
};

const updateSubTimer = () => {
  adjustedTargetMillis = getAdjustedTargetMillis(targetMillis, frameHitMillis);
  subTimer.textContent = formatTime(adjustedTargetMillis);
  // Mostrar información de frames y estado de calibración
  if (frameInfo) {
    const diff = frameHitMillis > 0 ? targetMillis - frameHitMillis : 0;
    const status = diff === 0 ? '✓' : diff > 0 ? '⏪ Temprano' : '⏩ Tarde';
    const statusClass = diff === 0 ? 'text-success' : diff > 0 ? 'text-info' : 'text-warning';
    frameInfo.innerHTML = `
      <div>Objetivo: ${+targetFrameInput.value} | Alcanzado: ${frameHitMillis > 0 ? millisToFrames(frameHitMillis) : "-"}</div>
      <div class="${statusClass}">${frameHitMillis > 0 ? status : ''}</div>
    `;
  }
};

const resetTimer = () => {
  clearInterval(timerInterval);
  mainTimer.textContent = formatTime(preTimerMillis);
  updateSubTimer();
  updateButton.disabled = false;
  targetFrameInput.disabled = false;
  preTimerInput.disabled = false;
  frameHitInput.disabled = false;
  calibrationInput.disabled = false;
  startButton.textContent = "Start";
  isTimerRunning = false;
};

// AJUSTADO: Permitir configurar el número de beeps
let beepCountConfig = 5; // Puedes cambiar este valor si quieres más o menos beeps

// Configuraciones predeterminadas
const presets = {
  'gba_wild': { name: 'GBA Wild', cps: '59.7275', preTimer: 5000, targetFrame: 1000 },
  'ds_wild': { name: 'DS Wild', cps: '59.6555', preTimer: 5000, targetFrame: 1000 },
  'channel_egg': { name: 'Channel Egg (NTSC)', cps: '134', preTimer: 5000, targetFrame: 1000 }
};

let editingConfig = null;

// Función para sincronizar configuraciones con settings.json
const syncConfigsWithFile = (configs) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const configDir = path.join(__dirname, 'config');
    const settingsFile = path.join(configDir, 'settings.json');

    // Crear directorio si no existe
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir);
    }

    // Leer configuraciones existentes del archivo
    let fileConfigs = {};
    if (fs.existsSync(settingsFile)) {
      const fileContent = fs.readFileSync(settingsFile, 'utf8');
      fileConfigs = JSON.parse(fileContent);
    }

    // Actualizar configuraciones
    fileConfigs.rngConfigs = configs;

    // Guardar en archivo
    fs.writeFileSync(settingsFile, JSON.stringify(fileConfigs, null, 2));
  } catch (error) {
    console.error('Error al sincronizar configuraciones:', error);
  }
};

// Cargar configuraciones desde archivo
const loadConfigsFromFile = () => {
  try {
    const fs = require('fs');
    const path = require('path');
    const settingsFile = path.join(__dirname, 'config', 'settings.json');
    
    if (fs.existsSync(settingsFile)) {
      const fileContent = fs.readFileSync(settingsFile, 'utf8');
      const fileConfigs = JSON.parse(fileContent);
      return fileConfigs.rngConfigs || {};
    }
  } catch (error) {
    console.error('Error al cargar configuraciones:', error);
  }
  return {};
};

// Guardar configuración actual
const saveCurrentConfig = (name) => {
  const config = {
    name,
    cps: window.consoleFps,
    preTimer: +preTimerInput.value,
    targetFrame: +targetFrameInput.value,
    calibration: +calibrationInput.value
  };
  
  const savedConfigs = JSON.parse(localStorage.getItem('rngConfigs') || '{}');
  savedConfigs[name] = config;
  localStorage.setItem('rngConfigs', JSON.stringify(savedConfigs));
  
  // Sincronizar con archivo
  syncConfigsWithFile(savedConfigs);
  
  return config;
};

// Eliminar configuración
const deleteConfig = (name) => {
  const savedConfigs = JSON.parse(localStorage.getItem('rngConfigs') || '{}');
  delete savedConfigs[name];
  localStorage.setItem('rngConfigs', JSON.stringify(savedConfigs));
  
  // Sincronizar con archivo
  syncConfigsWithFile(savedConfigs);
};

// Cargar configuración
const loadConfig = (config) => {
  if (!config) return;
  
  window.consoleFps = config.cps;
  preTimerInput.value = config.preTimer;
  targetFrameInput.value = config.targetFrame;
  calibrationInput.value = config.calibration || 0;
  
  // Actualizar select-cps si existe
  const selectCps = document.getElementById('select-cps');
  if (selectCps) {
    const option = Array.from(selectCps.options).find(opt => opt.value === String(config.cps));
    if (option) {
      selectCps.value = config.cps;
    } else {
      selectCps.value = 'personalizado';
      const inputCps = document.getElementById('input-cps');
      if (inputCps) {
        inputCps.value = config.cps;
        inputCps.disabled = false;
      }
    }
  }
  
  onInputChange();
};

// Modificar el startTimer para mayor precisión
const startTimer = (millis, onComplete) => {
  audioContext.resume();
  let beepCount = beepCountConfig;

  const endTime = Date.now() + millis;
  const startTime = Date.now();

  timerInterval = setInterval(() => {
    const now = Date.now();
    const elapsed = now - startTime;
    const remaining = endTime - now;

    // Compensación de drift
    const expectedElapsed = Date.now() - startTime;
    const drift = elapsed - expectedElapsed;
    
    if (remaining <= beepCount * 500 && beepCount > 0) {
      playBeep();
      beepCount--;
    }

    if (remaining <= 0) {
      clearInterval(timerInterval);
      onComplete();
      return;
    }

    mainTimer.textContent = formatTime(remaining);
  }, 1); // Cambiado a 1ms para mayor precisión
};

let isTimerRunning = false;

// AJUSTADO: Cargar calibración guardada al iniciar
const onInputChange = () => {
  targetMillis = framesToMillis(+targetFrameInput.value || 0);
  preTimerMillis = +preTimerInput.value || 0;
  // Solo actualiza frameHitMillis si hay valor positivo para evitar borrar calibración al escribir
  if (+frameHitInput.value > 0) {
    frameHitMillis = framesToMillis(+frameHitInput.value);
  }
  updateSubTimer();
  mainTimer.textContent = formatTime(preTimerMillis);
};

// Event listeners para configuraciones
window.addEventListener("load", () => {
  onInputChange();
  
  // Cargar configuraciones desde archivo
  const fileConfigs = loadConfigsFromFile();
  localStorage.setItem('rngConfigs', JSON.stringify(fileConfigs));
  
  // Actualizar select con configuraciones
  updateConfigSelect();
});

const updateConfigSelect = () => {
  const savedConfigs = JSON.parse(localStorage.getItem('rngConfigs') || '{}');
  const presetSelect = document.getElementById('preset-select');
  
  if (presetSelect) {
    // Mantener las opciones predeterminadas
    const defaultOptions = Array.from(presetSelect.options).filter(opt => !opt.dataset.custom);
    presetSelect.innerHTML = '';
    defaultOptions.forEach(opt => presetSelect.appendChild(opt));
    
    // Agregar configuraciones guardadas
    Object.entries(savedConfigs).forEach(([key, config]) => {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = config.name;
      option.dataset.custom = 'true';
      presetSelect.appendChild(option);
    });
  }
};

document.getElementById('preset-select')?.addEventListener('change', (e) => {
  const selectedValue = e.target.value;
  if (!selectedValue) return;
  
  const savedConfigs = JSON.parse(localStorage.getItem('rngConfigs') || '{}');
  const config = presets[selectedValue] || savedConfigs[selectedValue];
  if (config) {
    loadConfig(config);
  }
});

document.getElementById('edit-config')?.addEventListener('click', () => {
  const presetSelect = document.getElementById('preset-select');
  const selectedValue = presetSelect.value;
  
  if (!selectedValue || !presetSelect.selectedOptions[0].dataset.custom) {
    alert('Selecciona una configuración personalizada para editar');
    return;
  }
  
  const savedConfigs = JSON.parse(localStorage.getItem('rngConfigs') || '{}');
  const config = savedConfigs[selectedValue];
  
  if (config) {
    editingConfig = selectedValue;
    document.getElementById('config-name').value = config.name;
    document.getElementById('save-config').textContent = 'Actualizar';
    document.getElementById('cancel-edit').style.display = 'block';
  }
});

document.getElementById('delete-config')?.addEventListener('click', () => {
  const presetSelect = document.getElementById('preset-select');
  const selectedValue = presetSelect.value;
  
  if (!selectedValue || !presetSelect.selectedOptions[0].dataset.custom) {
    alert('Selecciona una configuración personalizada para eliminar');
    return;
  }
  
  if (confirm('¿Estás seguro de que quieres eliminar esta configuración?')) {
    deleteConfig(selectedValue);
    updateConfigSelect();
    presetSelect.value = '';
  }
});

document.getElementById('cancel-edit')?.addEventListener('click', () => {
  editingConfig = null;
  document.getElementById('config-name').value = '';
  document.getElementById('save-config').textContent = 'Guardar';
  document.getElementById('cancel-edit').style.display = 'none';
});

document.getElementById('save-config')?.addEventListener('click', () => {
  const configName = document.getElementById('config-name')?.value.trim();
  if (!configName) {
    alert('Por favor ingresa un nombre para la configuración');
    return;
  }
  
  const config = saveCurrentConfig(editingConfig || configName);
  updateConfigSelect();
  
  // Seleccionar la configuración guardada
  const presetSelect = document.getElementById('preset-select');
  if (presetSelect) {
    presetSelect.value = editingConfig || configName;
  }
  
  // Resetear el formulario
  editingConfig = null;
  document.getElementById('config-name').value = '';
  document.getElementById('save-config').textContent = 'Guardar';
  document.getElementById('cancel-edit').style.display = 'none';
});

targetFrameInput.addEventListener("input", onInputChange);
preTimerInput.addEventListener("input", onInputChange);

frameHitInput.addEventListener("input", () => {
  if (+frameHitInput.value > 0) {
    frameHitMillis = framesToMillis(+frameHitInput.value);
    updateSubTimer();
    //frameHitInput.value = ""; // Limpia después de calibrar
  }
});

updateButton.addEventListener("click", () => {
  if (+frameHitInput.value > 0) {
    frameHitMillis = framesToMillis(+frameHitInput.value);
    updateSubTimer();
    //frameHitInput.value = "";
  }
});

startButton.onclick = () => {
  if (isTimerRunning) {
    resetTimer();
  } else {
    updateButton.disabled = true;
    targetFrameInput.disabled = true;
    preTimerInput.disabled = true;
    frameHitInput.disabled = true;
    calibrationInput.disabled = true;
    startButton.textContent = "Stop";
    isTimerRunning = true;

    startTimer(preTimerMillis, () => {
      subTimer.textContent = formatTime(0);
      startTimer(adjustedTargetMillis, () => {
        resetTimer();
      });
    });
  }
}

// Modo Entrenamiento
let trainingStats = {
  hits: 0,
  misses: 0,
  currentStreak: 0,
  bestStreak: 0,
  attempts: []
};

const trainingMode = document.getElementById('training-mode');
const trainingSection = document.getElementById('training-section');
const accuracyDisplay = document.getElementById('accuracy');
const attemptsDisplay = document.getElementById('attempts');
const bestStreakDisplay = document.getElementById('best-streak');
const currentStreakDisplay = document.getElementById('current-streak');
const hitsBar = document.getElementById('hits-bar');
const missesBar = document.getElementById('misses-bar');

// Sistema de Notas
const addNoteBtn = document.getElementById('add-note');
const notesContainer = document.getElementById('notes-container');
const noteTemplate = document.getElementById('note-template');

// Calculadora de Delay
const calculateDelayBtn = document.getElementById('calculate-delay');
const targetFrameDelay = document.getElementById('target-frame-delay');
const hitFrameDelay = document.getElementById('hit-frame-delay');
const delayHistory = document.getElementById('delay-history');

// Activar/Desactivar modo entrenamiento
trainingMode?.addEventListener('change', (e) => {
  if (trainingSection) {
    trainingSection.style.display = e.target.checked ? 'block' : 'none';
  }
  if (e.target.checked) {
    loadTrainingStats();
  }
});

// Cargar estadísticas de entrenamiento
function loadTrainingStats() {
  const saved = localStorage.getItem('trainingStats');
  if (saved) {
    trainingStats = JSON.parse(saved);
    updateTrainingDisplay();
  }
}

// Actualizar display de estadísticas
function updateTrainingDisplay() {
  const total = trainingStats.hits + trainingStats.misses;
  const accuracy = total > 0 ? Math.round((trainingStats.hits / total) * 100) : 0;
  
  if (accuracyDisplay) accuracyDisplay.textContent = `${accuracy}%`;
  if (attemptsDisplay) attemptsDisplay.textContent = `Intentos: ${total}`;
  if (bestStreakDisplay) bestStreakDisplay.textContent = trainingStats.bestStreak;
  if (currentStreakDisplay) currentStreakDisplay.textContent = `Racha actual: ${trainingStats.currentStreak}`;
  
  if (hitsBar && missesBar) {
    const hitWidth = total > 0 ? (trainingStats.hits / total) * 100 : 0;
    hitsBar.style.width = `${hitWidth}%`;
    missesBar.style.width = `${100 - hitWidth}%`;
  }
  
  localStorage.setItem('trainingStats', JSON.stringify(trainingStats));
}

// Registrar intento de entrenamiento
function recordTrainingAttempt(success) {
  if (!trainingMode?.checked) return;
  
  if (success) {
    trainingStats.hits++;
    trainingStats.currentStreak++;
    if (trainingStats.currentStreak > trainingStats.bestStreak) {
      trainingStats.bestStreak = trainingStats.currentStreak;
    }
  } else {
    trainingStats.misses++;
    trainingStats.currentStreak = 0;
  }
  
  trainingStats.attempts.push({
    timestamp: Date.now(),
    success,
    targetFrame: +targetFrameInput.value,
    hitFrame: +frameHitInput.value
  });
  
  // Mantener solo los últimos 100 intentos
  if (trainingStats.attempts.length > 100) {
    trainingStats.attempts.shift();
  }
  
  updateTrainingDisplay();
}

// Sistema de Notas
addNoteBtn?.addEventListener('click', () => {
  const noteContent = noteTemplate.content.cloneNode(true);
  notesContainer.appendChild(noteContent);
  saveNotes();
});

notesContainer?.addEventListener('click', (e) => {
  if (e.target.closest('.delete-note')) {
    e.target.closest('.note-item').remove();
    saveNotes();
  }
});

notesContainer?.addEventListener('input', (e) => {
  if (e.target.matches('.note-title, .note-content')) {
    saveNotes();
  }
});

function saveNotes() {
  const notes = Array.from(notesContainer.children).map(note => ({
    title: note.querySelector('.note-title').value,
    content: note.querySelector('.note-content').value
  }));
  localStorage.setItem('rngNotes', JSON.stringify(notes));
}

function loadNotes() {
  const saved = localStorage.getItem('rngNotes');
  if (saved && notesContainer) {
    const notes = JSON.parse(saved);
    notesContainer.innerHTML = '';
    notes.forEach(note => {
      const noteElem = noteTemplate.content.cloneNode(true);
      noteElem.querySelector('.note-title').value = note.title;
      noteElem.querySelector('.note-content').value = note.content;
      notesContainer.appendChild(noteElem);
    });
  }
}

// Calculadora de Delay
calculateDelayBtn?.addEventListener('click', () => {
  const targetF = +targetFrameDelay.value;
  const hitF = +hitFrameDelay.value;
  if (!targetF || !hitF) return;
  
  const delay = targetF - hitF;
  const method = document.getElementById('select-cps').value;
  const success = Math.abs(delay) <= 1;
  
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${method}</td>
    <td>${delay}</td>
    <td><i class="bi bi-${success ? 'check text-success' : 'x text-danger'}"></i></td>
  `;
  
  delayHistory.insertBefore(row, delayHistory.firstChild);
  
  // Guardar historial
  const history = JSON.parse(localStorage.getItem('delayHistory') || '[]');
  history.unshift({ method, delay, success, timestamp: Date.now() });
  if (history.length > 50) history.pop();
  localStorage.setItem('delayHistory', JSON.stringify(history));
});

// Cargar historial de delays
function loadDelayHistory() {
  const history = JSON.parse(localStorage.getItem('delayHistory') || '[]');
  if (delayHistory) {
    delayHistory.innerHTML = '';
    history.forEach(entry => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${entry.method}</td>
        <td>${entry.delay}</td>
        <td><i class="bi bi-${entry.success ? 'check text-success' : 'x text-danger'}"></i></td>
      `;
      delayHistory.appendChild(row);
    });
  }
}

// Modificar el updateButton para incluir el modo entrenamiento
document.getElementById('updateButton')?.addEventListener('click', () => {
  if (+frameHitInput.value > 0) {
    frameHitMillis = framesToMillis(+frameHitInput.value);
    updateSubTimer();
    
    // Registrar intento en modo entrenamiento
    const targetFrame = +targetFrameInput.value;
    const hitFrame = +frameHitInput.value;
    const success = Math.abs(targetFrame - hitFrame) <= 1;
    recordTrainingAttempt(success);
  }
});

// Cargar todo al iniciar
window.addEventListener('load', () => {
  loadTrainingStats();
  loadNotes();
  loadDelayHistory();
});

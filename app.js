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

// AJUSTADO: Guardar calibración en localStorage
const getAdjustedTargetMillis = (target, hit) => {
  if (hit <= 0) return target;
  const offset = target - hit;
  calibrationInput.value = offset;
  // Guardar calibración
  localStorage.setItem('rngCalibration', offset);
  return target + offset;
};

const updateSubTimer = () => {
  adjustedTargetMillis = getAdjustedTargetMillis(targetMillis, frameHitMillis);
  subTimer.textContent = formatTime(adjustedTargetMillis);
  // NUEVO: Mostrar información de frames
  if (frameInfo) {
    frameInfo.textContent = `Objetivo: ${+targetFrameInput.value} | Alcanzado: ${frameHitMillis > 0 ? millisToFrames(frameHitMillis) : "-"}`;
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

const startTimer = (millis, onComplete) => {
  audioContext.resume();
  let beepCount = beepCountConfig;

  const endTime = Date.now() + millis;

  timerInterval = setInterval(() => {
    const now = Date.now();
    const remaining = endTime - now;

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
  }, 10);
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

// Escuchar cambios en inputs para actualizar en tiempo real
window.addEventListener("load", () => {
  const savedCalib = localStorage.getItem('rngCalibration');
  if (savedCalib !== null) calibrationInput.value = savedCalib;
  onInputChange();
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

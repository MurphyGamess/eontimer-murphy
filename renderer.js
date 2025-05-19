const path = require('path');
const fs = require('fs');

const SETTINGS_FILE = path.join(__dirname, 'config', 'settings.json');
const THEMES_FOLDER = path.join(__dirname, 'resources', 'themes', 'default', 'images');
const LOGOS_FOLDER = path.join(__dirname, 'resources', 'themes', 'default', 'logos');

const backgroundSelect = document.getElementById('backgroundSelect');
const logoSelect = document.getElementById('logoSelect');
const saveSettingsButton = document.getElementById('saveSettingsButton');
const settingsModalEl = document.getElementById('settingsModal');
const settingsModal = new bootstrap.Modal(settingsModalEl);

const backgroundUpload = document.getElementById('backgroundUpload');
const logoUpload = document.getElementById('logoUpload');

const inputCPS = document.getElementById('input-cps');

// NUEVO: inputs para posición del logo y vista previa
const logoTopInput = document.getElementById('logoTopInput');
const logoPreviewBox = document.getElementById('logoPreviewImage');
const navbarLogo = document.getElementById('navbarLogo');
const logoPreviewImage = document.getElementById('logoPreviewImage');
const logoContainer = document.querySelector('.logo-container');

function ajustarPosicionLogo(px) {
  logoContainer.style.top = `${px}px`;
}

function ensureSettingsFolder() {
  const configDir = path.join(__dirname, 'config');
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
  }
}

function loadSettings() {
  ensureSettingsFolder();
  if (fs.existsSync(SETTINGS_FILE)) {
    try {
      const data = fs.readFileSync(SETTINGS_FILE);
      return JSON.parse(data);
    } catch {
      return {};
    }
  }
  return {};
}

function saveSettings(settings) {
  ensureSettingsFolder();
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
}

function listFiles(folderPath) {
  if (!fs.existsSync(folderPath)) return [];
  return fs.readdirSync(folderPath).filter((file) => /\.(png|jpg|jpeg|gif)$/i.test(file));
}

function populateSelect(selectElement, items) {
  selectElement.innerHTML = '';
  items.forEach((item) => {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    selectElement.appendChild(option);
  });
}

function applyBackground(imageFile) {
  if (!imageFile) return;
  document.body.style.backgroundImage = `url('resources/themes/default/images/${imageFile}')`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundPosition = 'center center';
}

function applyLogo(imageFile) {
  if (!imageFile) {
    navbarLogo.style.display = 'none';
    navbarLogo.src = '';
    logoPreviewImage.style.display = 'none';
    logoPreviewImage.src = '';
  } else {
    navbarLogo.src = `resources/themes/default/logos/${imageFile}`;
    navbarLogo.style.display = 'inline-block';
    logoPreviewImage.src = `resources/themes/default/logos/${imageFile}`;
    logoPreviewImage.style.display = 'inline-block';
  }
}


// NUEVO: aplicar la posición vertical del logo en la navbar
function applyLogoTop(topValue) {
  if (typeof topValue === 'number' || (typeof topValue === 'string' && topValue !== '')) {
    navbarLogo.style.position = 'relative';
    navbarLogo.style.top = `${topValue}px`;

    logoPreviewImage.style.position = 'relative';
    logoPreviewImage.style.top = `${topValue}px`;
  } else {
    navbarLogo.style.top = '';
    logoPreviewImage.style.top = '';
  }
}



// NUEVO: aplicar la posición en la vista previa del modal
function applyLogoPreviewTop(topValue) {
  if (!logoPreviewBox) return;

  logoPreviewBox.style.position = 'relative';
  logoPreviewBox.style.top = `${topValue}px`;
}


function refreshLists() {
  const backgrounds = listFiles(THEMES_FOLDER);
  const logos = listFiles(LOGOS_FOLDER);

  populateSelect(backgroundSelect, backgrounds);
  populateSelect(logoSelect, logos);
}

function copyFileToFolder(sourcePath, destFolder) {
  const ext = path.extname(sourcePath);
  const files = fs.existsSync(destFolder) ? fs.readdirSync(destFolder) : [];
  let i = 0;
  let newName;
  do {
    const prefix = destFolder.includes('images') ? 'background' : 'logo';
    newName = `${prefix}${i.toString().padStart(2, '0')}${ext}`;
    i++;
  } while (files.includes(newName));

  const destPath = path.join(destFolder, newName);
  fs.copyFileSync(sourcePath, destPath);

  return newName;
}

backgroundUpload.addEventListener('change', () => {
  if (backgroundUpload.files.length === 0) return;

  const filePath = backgroundUpload.files[0].path;
  try {
    const newName = copyFileToFolder(filePath, THEMES_FOLDER);
    refreshLists();
    backgroundSelect.value = newName;
    applyBackground(newName);
  } catch (e) {
    alert('Error al subir fondo: ' + e.message);
  }

  backgroundUpload.value = '';
});

logoUpload.addEventListener('change', () => {
  if (logoUpload.files.length === 0) return;

  const filePath = logoUpload.files[0].path;
  try {
    const newName = copyFileToFolder(filePath, LOGOS_FOLDER);
    refreshLists();
    logoSelect.value = newName;
    applyLogo(newName);
  } catch (e) {
    alert('Error al subir logo: ' + e.message);
  }

  logoUpload.value = '';
});

function init() {
  refreshLists();
  const settings = loadSettings();

  // Cargar fondo, logo y posición del logo
  if (settings.background && listFiles(THEMES_FOLDER).includes(settings.background)) {
    backgroundSelect.value = settings.background;
    applyBackground(settings.background);
  }

  if (settings.logo && listFiles(LOGOS_FOLDER).includes(settings.logo)) {
    logoSelect.value = settings.logo;
    applyLogo(settings.logo);
  }

  // NUEVO: cargar posición guardada al input y aplicarla
  if (typeof settings.logoTop !== 'undefined') {
    logoTopInput.value = settings.logoTop;
    applyLogoTop(settings.logoTop);
    applyLogoPreviewTop(settings.logoTop);
  } else {
    logoTopInput.value = 0;
    applyLogoTop(0);
    applyLogoPreviewTop(0);
  }

}

// NUEVO: vista previa en tiempo real al cambiar el input
logoTopInput.addEventListener('input', () => {
  const topValue = Number(logoTopInput.value) || 0;
  applyLogoPreviewTop(topValue);
});

// NUEVO: al abrir el modal, mostrar la vista previa actual
settingsModalEl.addEventListener('show.bs.modal', () => {
  const settings = loadSettings();
  const topValue = typeof settings.logoTop !== 'undefined' ? settings.logoTop : 0;
  logoTopInput.value = topValue;
  applyLogoPreviewTop(topValue);
});

// GUARDAR ajustes, incluyendo logoTop
saveSettingsButton.addEventListener('click', () => {
  const selectedBackground = backgroundSelect.value;
  const selectedLogo = logoSelect.value;
  const logoTop = Number(logoTopInput.value) || 0;

  const settings = {
    background: selectedBackground,
    logo: selectedLogo,
    logoTop: logoTop
  };
  saveSettings(settings);
  applyBackground(selectedBackground);
  applyLogo(selectedLogo);
  applyLogoTop(logoTop);

  settingsModal.hide();
});


function enviarCPSaAppJS() {
  const cpsValue = inputCPS.value;
  if (typeof window.recibirCPS === 'function') {
    window.recibirCPS(cpsValue);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const selectCPS = document.getElementById('select-cps');
  if (typeof window.recibirCPS === 'function') {
    window.recibirCPS(inputCPS.value);
  }

  selectCPS.addEventListener('change', () => {
    if (selectCPS.value === 'personalizado') {
      inputCPS.disabled = false;
      inputCPS.focus();
    } else {
      inputCPS.disabled = true;
      inputCPS.value = selectCPS.value;
      enviarCPSaAppJS();
    }
  });

  inputCPS.addEventListener('input', enviarCPSaAppJS);
});

// --- Fin sección corregida ---

function mostrarTiempoFormateadoEnBoton(frames) {
  const ms = Math.floor(frames * 1000 / consoleFps); // convertir frames a milisegundos

  const minutos = Math.floor(ms / 60000);
  const segundos = Math.floor((ms % 60000) / 1000);
  const centesimas = Math.floor((ms % 1000) / 10); // dos dígitos de centésimas

  const tiempoFormateado =
    String(minutos).padStart(2, '0') + ':' +
    String(segundos).padStart(2, '0') + ',' +
    String(centesimas).padStart(2, '0');

  const btn = document.getElementById("mostrarTiempoBtn");
  if (btn) {
    btn.textContent = `Minutos:Segundos,Centésimas = ${tiempoFormateado}`;
  }
}

const frameInput = document.getElementById("targetFrame");

if (frameInput) {
  frameInput.addEventListener("input", () => {
    const frames = +frameInput.value;
    if (frames > 0) {
      mostrarTiempoFormateadoEnBoton(frames);
    }
  });

  window.addEventListener("DOMContentLoaded", () => {
    const frames = +frameInput.value;
    if (frames > 0) {
      mostrarTiempoFormateadoEnBoton(frames);
    }
  });
}

window.addEventListener('DOMContentLoaded', init);

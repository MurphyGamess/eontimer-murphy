const path = require('path');
const fs = require('fs');

const SETTINGS_FILE = path.join(process.cwd(), 'config', 'settings.json');
const THEMES_FOLDER = path.join(process.cwd(), 'resources', 'themes', 'default', 'images');
const LOGOS_FOLDER = path.join(process.cwd(), 'resources', 'themes', 'default', 'logos');

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
  const configDir = path.join(process.cwd(), 'config');
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

function applyBackground(filename) {
  if (!filename) return;
  
  // Usar rutas relativas correctas para Electron
  const relativePath = `resources/themes/default/images/${filename}`;
  const absolutePath = path.join(process.cwd(), 'resources', 'themes', 'default', 'images', filename);
  
  console.log(`🖼️ Applying background: ${filename}`);
  console.log(`📁 Relative path: ${relativePath}`);
  console.log(`📂 Absolute path: ${absolutePath}`);
  
  // Verificar si el archivo existe
  if (!fs.existsSync(absolutePath)) {
    console.warn(`❌ Background image not found: ${filename}`);
    return;
  }
  
  console.log('✅ Background file exists, proceeding...');
  
  // Aplicar la imagen inmediatamente
  console.log(`🎨 Setting CSS variables for background`);
  
  // Construir ruta absoluta para evitar problemas de rutas relativas
  const absoluteImagePath = `file:///${absolutePath.replace(/\\/g, '/')}`;
  console.log(`🖼️ CSS background URL: url('${absoluteImagePath}')`);
  
  // Aplicar directamente sin análisis de color complejo
  document.documentElement.style.setProperty('--bg-fade-color', '#121212');
  document.documentElement.style.setProperty('--bg-image', `url('${absoluteImagePath}')`);
  
  // Guardar en configuración
  const settings = loadSettings();
  settings.background = filename;
  saveSettings(settings);
  
  // Cargar la imagen para análisis de color (opcional, en background)
  const img = new Image();
  img.onload = () => {
    try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
      canvas.height = 1;
    ctx.drawImage(img, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, 1).data;
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < imageData.length; i += 4) {
      r += imageData[i];
      g += imageData[i + 1];
      b += imageData[i + 2];
    }
    const pixels = imageData.length / 4;
      const avgColor = `rgb(${Math.round(r / pixels)}, ${Math.round(g / pixels)}, ${Math.round(b / pixels)})`;
    
      // Actualizar color de fondo con el color analizado
      document.documentElement.style.setProperty('--bg-fade-color', avgColor);
      console.log(`🌈 Updated background color: ${avgColor}`);
    } catch (e) {
      console.warn('Color analysis failed, using default');
    }
  };
    
  // Para cargar la imagen desde JavaScript, necesitamos la ruta absoluta
  img.src = absoluteImagePath;
  img.onerror = () => {
    console.warn(`❌ Could not load background image: ${filename} from ${relativePath}`);
  };
}

function applyLogo(imageFile) {
  if (!imageFile) {
    navbarLogo.style.display = 'none';
    navbarLogo.src = '';
    logoPreviewImage.style.display = 'none';
    logoPreviewImage.src = '';
    return;
  }

  const relativePath = `resources/themes/default/logos/${imageFile}`;
  const absolutePath = path.join(process.cwd(), 'resources', 'themes', 'default', 'logos', imageFile);

  // Verificar si el archivo existe
  if (!fs.existsSync(absolutePath)) {
    console.warn(`Logo file not found: ${imageFile}`);
    return;
  }

  // Construir ruta absoluta para el logo
  const absoluteLogoPath = `file:///${absolutePath.replace(/\\/g, '/')}`;
  console.log(`🏷️ Logo absolute path: ${absoluteLogoPath}`);
  
  navbarLogo.src = absoluteLogoPath;
  navbarLogo.style.display = 'inline-block';
  logoPreviewImage.src = absoluteLogoPath;
  logoPreviewImage.style.display = 'inline-block';
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
  if (!logoPreviewImage) return;

  logoPreviewImage.style.position = 'relative';
  logoPreviewImage.style.top = `${topValue}px`;
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

// Event listeners para cambios en los selects
backgroundSelect.addEventListener('change', () => {
  const selectedBackground = backgroundSelect.value;
  if (selectedBackground) {
    console.log('🔄 Background changed to:', selectedBackground);
    applyBackground(selectedBackground);
  }
});

logoSelect.addEventListener('change', () => {
  const selectedLogo = logoSelect.value;
  if (selectedLogo) {
    console.log('🔄 Logo changed to:', selectedLogo);
    applyLogo(selectedLogo);
  }
});

function cleanSettings() {
  const settings = loadSettings();
  let changed = false;

  // Verificar que el fondo existe
  const availableBackgrounds = listFiles(THEMES_FOLDER);
  if (settings.background && !availableBackgrounds.includes(settings.background)) {
    console.log(`Removing invalid background: ${settings.background}`);
    delete settings.background;
    changed = true;
  }

  // Verificar que el logo existe
  const availableLogos = listFiles(LOGOS_FOLDER);
  if (settings.logo && !availableLogos.includes(settings.logo)) {
    console.log(`Removing invalid logo: ${settings.logo}`);
    delete settings.logo;
    changed = true;
  }

  // Guardar solo si hubo cambios
  if (changed) {
    saveSettings(settings);
    console.log('Settings cleaned and saved');
  }
}

function init() {
  console.log('🚀 Initializing renderer...');
  
  // Validar assets disponibles
  const assetStatus = validateAssets();
  
  // Limpiar configuración inválida primero
  cleanSettings();
  
  refreshLists();
  const settings = loadSettings();
  console.log('📋 Loaded settings:', settings);

  // Limpiar configuración de archivos inexistentes
  const availableBackgrounds = listFiles(THEMES_FOLDER);
  const availableLogos = listFiles(LOGOS_FOLDER);

  // Cargar fondo si existe
  if (settings.background && availableBackgrounds.includes(settings.background)) {
    console.log(`✅ Loading saved background: ${settings.background}`);
    backgroundSelect.value = settings.background;
    applyBackground(settings.background);
  } else if (availableBackgrounds.length > 0) {
    // Aplicar el primer fondo disponible si no hay uno válido configurado
    const firstBackground = availableBackgrounds[0];
    console.log(`⚠️ Saved background not found, using: ${firstBackground}`);
    backgroundSelect.value = firstBackground;
    applyBackground(firstBackground);
  } else {
    console.error('❌ No background images found!');
  }

  // Cargar logo si existe
  if (settings.logo && availableLogos.includes(settings.logo)) {
    console.log(`✅ Loading saved logo: ${settings.logo}`);
    logoSelect.value = settings.logo;
    applyLogo(settings.logo);
  } else if (availableLogos.length > 0) {
    // Aplicar el primer logo disponible si no hay uno válido configurado
    const firstLogo = availableLogos[0];
    console.log(`⚠️ Saved logo not found, using: ${firstLogo}`);
    logoSelect.value = firstLogo;
    applyLogo(firstLogo);
  } else {
    console.error('❌ No logo images found!');
  }

  // Cargar posición del logo
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

// Inicializar cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
  console.log('🔄 DOM loaded, starting initialization...');
  
  // Forzar aplicación inmediata del fondo y logo desde settings
  const settings = loadSettings();
  console.log('🔧 Force applying settings on DOM load:', settings);
  
  if (settings.background) {
    console.log('🔧 Force applying background:', settings.background);
    applyBackground(settings.background);
  }
  
  if (settings.logo) {
    console.log('🔧 Force applying logo:', settings.logo);
    applyLogo(settings.logo);
  }
  
  // Luego ejecutar la inicialización normal
  init();
});

// También intentar después de que todo esté completamente cargado
window.addEventListener('load', () => {
  console.log('🔄 Page fully loaded, ensuring initialization...');
  // Solo re-aplicar el fondo si no se ha aplicado ya
  const settings = loadSettings();
  if (settings.background && !document.documentElement.style.getPropertyValue('--bg-image')) {
    console.log('🔄 Re-applying background...');
    applyBackground(settings.background);
  }
});

function validateAssets() {
  console.log('🔍 Validating application assets...');
  
  // Verificar directorios
  const themesDir = path.join(process.cwd(), 'resources', 'themes', 'default');
  const imagesDir = path.join(themesDir, 'images');
  const logosDir = path.join(themesDir, 'logos');
  
  if (!fs.existsSync(imagesDir)) {
    console.warn('⚠️  Images directory not found:', imagesDir);
  }
  
  if (!fs.existsSync(logosDir)) {
    console.warn('⚠️  Logos directory not found:', logosDir);
  }
  
  // Contar archivos
  const backgrounds = listFiles(imagesDir);
  const logos = listFiles(logosDir);
  
  console.log(`✅ Found ${backgrounds.length} background(s):`, backgrounds);
  console.log(`✅ Found ${logos.length} logo(s):`, logos);
  
  return {
    backgrounds: backgrounds.length,
    logos: logos.length,
    valid: backgrounds.length > 0 && logos.length > 0
  };
}

// Función de debug global para probar manualmente
window.debugRenderer = function() {
  console.log('🐛 Debug renderer state:');
  const settings = loadSettings();
  console.log('Settings:', settings);
  
  const currentBgImage = document.documentElement.style.getPropertyValue('--bg-image');
  console.log('Current --bg-image CSS var:', currentBgImage);
  
  const currentBgColor = document.documentElement.style.getPropertyValue('--bg-fade-color');
  console.log('Current --bg-fade-color CSS var:', currentBgColor);
  
  if (settings.background) {
    console.log('🔄 Manually re-applying background:', settings.background);
    applyBackground(settings.background);
  }
  
  return { settings, currentBgImage, currentBgColor };
};

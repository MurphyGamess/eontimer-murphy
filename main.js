const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    fullscreen: true, // ⭐ PANTALLA COMPLETA AUTOMÁTICA
    show: false, // No mostrar hasta que esté lista
    webPreferences: {
      nodeIntegration: true,  // para que en renderer.js puedas usar require
      contextIsolation: false, // lo mismo para habilitar require()
    },
  });

  //win.loadFile('test-pokeball-electron.html');
  win.loadFile('index.html');
  // Mostrar ventana cuando esté lista (evita parpadeo)
  win.once('ready-to-show', () => {
    win.show();
    console.log('🎮 EonTimer-Murphy v2.0 iniciado en PANTALLA COMPLETA');
  });
  
  // ⌨️ ATAJOS DE TECLADO PARA PANTALLA COMPLETA
  win.webContents.on('before-input-event', (event, input) => {
    // F11: Toggle pantalla completa
    if (input.key === 'F11' && input.type === 'keyDown') {
      win.setFullScreen(!win.isFullScreen());
    }
    // ESC: Salir de pantalla completa
    if (input.key === 'Escape' && input.type === 'keyDown' && win.isFullScreen()) {
      win.setFullScreen(false);
    }
  });
  
  // Quitar DevTools por defecto (descomenta solo para debug)
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

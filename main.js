const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    //frame: false,  // Oculta la barra nativa
    webPreferences: {
      nodeIntegration: true,  // para que en renderer.js puedas usar require
      contextIsolation: false, // lo mismo para habilitar require()
    },
  });

  win.loadFile('index.html');
  // win.webContents.openDevTools(); // Descomenta para debug
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

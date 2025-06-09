const { contextBridge, ipcRenderer, shell, BrowserWindow } = require('electron');
const { app } = require('@electron/remote');

contextBridge.exposeInMainWorld('electronAPI', {
  getAppPath: () => app.getAppPath(),
  getCurrentWindow: () => require('@electron/remote').getCurrentWindow(),
  minimize: () => require('@electron/remote').getCurrentWindow().minimize(),
  close: () => require('@electron/remote').getCurrentWindow().close(),
});

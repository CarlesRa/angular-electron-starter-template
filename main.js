const { app, BrowserWindow, ipcMain } = require('electron');
const Store = require('electron-store');
const fs = require('fs');

let appWindow;
const store = new Store();

if (!store.get('clicks')) {
  store.set('clicks', 0);
}

/**
 * Function to create window
 */
createWindow = () => {
  appWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Angular Electron Starter',
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  });

  appWindow.loadURL(`file://${__dirname}/dist/browser/index.html`).then();
  appWindow.setMenu(null);
  appWindow.webContents.openDevTools();

  appWindow.on('closed', () => {
    appWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('message', (event) => {
  event.reply('reply', 'Hello from main process');
});

const { app, BrowserWindow, ipcMain } = require('electron');
const Store = require('electron-store');
const cmd = require('child_process');

let appWindow;
const store = new Store();

if (!store.get('clicks')) {
  store.set('clicks', 0);
}

createWindow = () => {

  appWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
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
  event.reply('reply', 'Hello world from main process');
});

ipcMain.on('execute-command', (event, command) => {
  console.log(command);
  cmd.exec(`start cmd ${command[0].option} ${command[0].command}`,
    (error) => {
    if (error) {
      event.reply('resp-execute-command', false);
      return;
    }
    event.reply('resp-execute-command', true);
  });
})

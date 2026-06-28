const { app, BrowserWindow, ipcMain } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 650,
    title: 'Demini - Gemini CLI Windows App',
    backgroundColor: '#0f172a',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

ipcMain.handle('gemini', async (event, prompt) => {
  return new Promise((resolve) => {
    const proc = spawn('gemini', [prompt], { shell: true, timeout: 60000 });
    let output = '';
    let error = '';

    proc.stdout.on('data', (data) => { output += data.toString(); });
    proc.stderr.on('data', (data) => { error += data.toString(); });
    proc.on('close', () => {
      resolve({ output: output || error, error: !output && !!error });
    });
    proc.on('error', (err) => {
      resolve({ output: '', error: true, message: err.message });
    });
  });
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

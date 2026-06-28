const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

let mainWindow;
let geminiReady = false;
let installStatus = 'checking'; // checking | installing | ready | error

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 950,
    height: 700,
    title: 'Demini - Gemini CLI Windows App',
    backgroundColor: '#0f172a',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

// Gemini CLI 설치 확인 및 자동 설치
async function checkAndInstallGemini() {
  return new Promise((resolve) => {
    // gemini 명령어 확인
    exec('gemini --version', { timeout: 15000 }, async (err, stdout) => {
      if (!err && stdout) {
        geminiReady = true;
        installStatus = 'ready';
        console.log('Gemini CLI found:', stdout.trim());
        resolve(true);
        return;
      }

      // 없으면 설치
      installStatus = 'installing';
      mainWindow?.webContents.send('install-status', 'Gemini CLI 설치 중... (최초 1회, 1~3분 소요)');

      try {
        await new Promise((res, rej) => {
          const install = exec('npm install -g @google/gemini-cli', {
            timeout: 300000 // 5분 타임아웃
          });
          install.stdout.on('data', (d) => {
            mainWindow?.webContents.send('install-log', d.toString().trim());
          });
          install.stderr.on('data', (d) => {
            mainWindow?.webContents.send('install-log', d.toString().trim());
          });
          install.on('close', (code) => {
            if (code === 0) res();
            else rej(new Error('install failed with code ' + code));
          });
        });

        geminiReady = true;
        installStatus = 'ready';
        mainWindow?.webContents.send('install-status', 'Gemini CLI 설치 완료!');
        resolve(true);
      } catch (e) {
        installStatus = 'error';
        mainWindow?.webContents.send('install-status', '설치 실패: ' + e.message);
        resolve(false);
      }
    });
  });
}

// IPC: Gemini 실행
ipcMain.handle('gemini', async (event, prompt) => {
  if (!geminiReady) {
    return { output: '', error: true, message: 'Gemini CLI가 아직 설치되지 않았습니다.' };
  }

  return new Promise((resolve) => {
    const proc = spawn('gemini', [prompt], {
      shell: true,
      timeout: 120000,
      env: { ...process.env, PATH: process.env.PATH }
    });
    let output = '';
    let error = '';

    proc.stdout.on('data', (data) => {
      const text = data.toString();
      output += text;
      // 실시간 스트리밍
      mainWindow?.webContents.send('stream-output', text);
    });
    proc.stderr.on('data', (data) => {
      const text = data.toString();
      error += text;
      mainWindow?.webContents.send('stream-output', text);
    });
    proc.on('close', () => {
      resolve({ output: output || error, error: !output && !!error });
    });
    proc.on('error', (err) => {
      resolve({ output: '', error: true, message: err.message });
    });
  });
});

// IPC: 설치 상태 확인
ipcMain.handle('install-status', async () => {
  if (installStatus === 'ready') return { status: 'ready' };
  if (installStatus === 'error') return { status: 'error' };
  if (installStatus === 'installing') return { status: 'installing' };

  // 체크 필요
  await checkAndInstallGemini();
  return { status: installStatus };
});

// IPC: Node.js 확인
ipcMain.handle('check-node', async () => {
  return new Promise((resolve) => {
    exec('node --version', { timeout: 5000 }, (err, stdout) => {
      if (!err) resolve({ installed: true, version: stdout.trim() });
      else resolve({ installed: false });
    });
  });
});

app.whenReady().then(async () => {
  createWindow();
  // 백그라운드에서 Gemini CLI 설치 확인
  checkAndInstallGemini();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

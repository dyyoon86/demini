const { app, BrowserWindow, ipcMain, shell } = require('electron');
const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

let mainWindow;
let geminiReady = false;
let installStatus = 'checking'; // checking | installing | ready | error | need-login

// 생성된 페이지가 저장될 작업 폴더 (문서/Demini작품)
const WORK_DIR = path.join(os.homedir(), 'Documents', 'Demini작품');
function ensureWorkDir() {
  try { fs.mkdirSync(WORK_DIR, { recursive: true }); } catch (e) {}
  return WORK_DIR;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 760,
    minWidth: 820,
    title: 'Demini - 코딩 몰라도 나만의 페이지',
    backgroundColor: '#0f172a',
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

// ── Gemini CLI 설치 확인 및 자동 설치 ──
async function checkAndInstallGemini() {
  return new Promise((resolve) => {
    exec('gemini --version', { timeout: 15000 }, async (err, stdout) => {
      if (!err && stdout) {
        geminiReady = true;
        installStatus = 'ready';
        console.log('Gemini CLI found:', stdout.trim());
        resolve(true);
        return;
      }
      installStatus = 'installing';
      mainWindow?.webContents.send('install-status', 'Gemini CLI 설치 중... (최초 1회, 1~3분 소요)');
      try {
        await new Promise((res, rej) => {
          const install = exec('npm install -g @google/gemini-cli', { timeout: 300000 });
          install.stdout.on('data', (d) => mainWindow?.webContents.send('install-log', d.toString().trim()));
          install.stderr.on('data', (d) => mainWindow?.webContents.send('install-log', d.toString().trim()));
          install.on('close', (code) => (code === 0 ? res() : rej(new Error('install failed code ' + code))));
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

// 응답 텍스트에서 HTML 코드 추출
function extractHtml(text) {
  if (!text) return null;
  // 1) ```html ... ``` 코드펜스
  const m = text.match(/```(?:html)?\s*([\s\S]*?)```/i);
  let code = m ? m[1].trim() : null;
  // 2) 펜스 없이 통 HTML 문서
  if (!code) {
    const dm = text.match(/<!DOCTYPE html[\s\S]*<\/html>/i) || text.match(/<html[\s\S]*<\/html>/i);
    if (dm) code = dm[0].trim();
  }
  if (!code) return null;
  // 조각이면 최소 래핑
  if (!/<html[\s\S]*<\/html>/i.test(code)) {
    code = `<!DOCTYPE html>\n<html lang="ko"><head><meta charset="UTF-8">` +
           `<meta name="viewport" content="width=device-width,initial-scale=1"></head>` +
           `<body>\n${code}\n</body></html>`;
  }
  return code;
}

// 인증 필요 여부 감지
function looksLikeAuthError(text) {
  if (!text) return false;
  return /(login|log in|authenticate|auth|sign in|credentials|로그인|인증|unauthor)/i.test(text);
}

// ── IPC: Gemini 실행 (stdin 파이프 = 특수문자/따옴표 안전, 크로스플랫폼) ──
ipcMain.handle('gemini', async (event, prompt) => {
  if (!geminiReady) return { error: true, message: 'Gemini CLI가 아직 준비되지 않았습니다.' };
  ensureWorkDir();

  return new Promise((resolve) => {
    // shell:true → 윈도우에서 gemini.cmd 자동 해석. 프롬프트는 args가 아닌 stdin으로 전달.
    const proc = spawn('gemini', [], { shell: true, cwd: WORK_DIR, env: { ...process.env } });
    let output = '';
    let error = '';

    proc.stdout.on('data', (d) => {
      const t = d.toString();
      output += t;
      mainWindow?.webContents.send('stream-output', t);
    });
    proc.stderr.on('data', (d) => {
      const t = d.toString();
      error += t;
      mainWindow?.webContents.send('stream-output', t);
    });
    proc.on('close', () => {
      const combined = (output || '') + (error || '');
      if (!output && looksLikeAuthError(error)) {
        installStatus = 'need-login';
        resolve({ error: true, needLogin: true, message: '구글 로그인이 필요합니다.' });
        return;
      }
      // HTML 추출 → 파일 저장
      let saved = null;
      const html = extractHtml(output) || extractHtml(combined);
      if (html) {
        try {
          const fname = `page_${Date.now()}.html`;
          const fpath = path.join(WORK_DIR, fname);
          fs.writeFileSync(fpath, html, 'utf-8');
          saved = { path: fpath, name: fname, html };
        } catch (e) {}
      }
      resolve({ output: output || error, error: !output && !!error, saved });
    });
    proc.on('error', (err) => resolve({ error: true, message: err.message }));

    // 프롬프트를 stdin으로 전달 (웹페이지면 단일 HTML로 출력 유도 → 미리보기 적중률↑)
    const guided = prompt +
      '\n\n(만약 웹페이지를 만드는 요청이면, CSS와 JS를 모두 포함한 완성된 단일 HTML 파일을 ' +
      '```html 코드블록 하나로만 출력해줘. 그 외 요청이면 평소대로 답해줘.)';
    try {
      proc.stdin.write(guided + '\n');
      proc.stdin.end();
    } catch (e) {}
  });
});

// ── IPC: 구글 로그인 (대화형 gemini 실행 → OAuth 브라우저 흐름) ──
ipcMain.handle('login', async () => {
  let cmd;
  if (process.platform === 'win32') cmd = 'start cmd /k gemini';
  else if (process.platform === 'darwin') cmd = `osascript -e 'tell app "Terminal" to do script "gemini"'`;
  else cmd = 'x-terminal-emulator -e gemini || gnome-terminal -- gemini';
  exec(cmd, () => {});
  return { started: true };
});

// ── IPC: 파일/폴더 열기 ──
ipcMain.handle('open-path', async (e, p) => { shell.openPath(p); return true; });
ipcMain.handle('open-folder', async () => { shell.openPath(ensureWorkDir()); return true; });

// ── IPC: 설치 상태 ──
ipcMain.handle('install-status', async () => {
  if (installStatus === 'ready') return { status: 'ready', workDir: WORK_DIR };
  if (installStatus === 'error') return { status: 'error' };
  if (installStatus === 'installing') return { status: 'installing' };
  await checkAndInstallGemini();
  return { status: installStatus, workDir: WORK_DIR };
});

ipcMain.handle('check-node', async () => new Promise((resolve) => {
  exec('node --version', { timeout: 5000 }, (err, stdout) =>
    resolve(err ? { installed: false } : { installed: true, version: stdout.trim() }));
}));

app.whenReady().then(() => {
  ensureWorkDir();
  createWindow();
  checkAndInstallGemini();
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

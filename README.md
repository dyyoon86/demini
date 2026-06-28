# Demini

Gemini CLI를 윈도우 앱으로 래핑한 Electron 앱.

## 특징

- Gemini CLI를 GUI 앱으로 사용
- 터미널 없이 질문 + 응답 가능
- 코딩 가능
- 무료

## 설치 방법

### 1. Gemini CLI 설치

```bash
npm install -g @google/gemini-cli
gemini auth
```

### 2. Demini 실행

```bash
git clone https://github.com/dyyoon86/demini.git
cd demini/gemini-cli-app
npm install
npm start
```

### 3. 빌드 (실행 파일)

```bash
npm run build
# → dist/Demini-1.0.0.exe
```

## 사용법

1. 앱 실행
2. 질문 입력
3. 응답 확인
4. 코딩 가능

## 기술 스택

- Electron
- Gemini CLI (Google AI)
- Node.js

## 라이선스

MIT

# DoGem - Gemini CLI Windows App

> 코딩 몰라도 AI한테 시켜서 만드는 나만의 페이지

## 특징

- **Gemini CLI 자동 설치**: 앱 실행 시 Gemini CLI가 없으면 자동으로 설치합니다 (최초 1회)
- **GUI 인터페이스**: 터미널 없이 창에서 프롬프트 입력하고 결과 확인
- **결과 즉시 미리보기**: 만든 웹페이지가 오른쪽 화면에 바로 떠요 (iframe 라이브 프리뷰)
- **자동 저장 + 열기**: 생성한 HTML이 `문서/DoGem작품` 폴더에 자동 저장 → "브라우저에서 열기" / "폴더 열기" 버튼
- **구글 로그인 안내**: 최초 1회 구글 로그인이 필요하면 버튼으로 안내 (코딩 몰라도 OK)
- **완전 무료**: Gemini CLI 무료 티어 사용, API 키 불필요
- **원클릭 실행**: `npm install` → `npm start` 끝

## 시작하기

### 1. 이 저장소 클론

```bash
git clone https://github.com/dyyoon86/demini.git
cd demini/gemini-cli-app
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 앱 실행

```bash
npm start
```

실행하면:
1. Gemini CLI 자동 설치 확인 (최초 1~3분)
2. (최초 1회) 구글 로그인 — 안내 버튼을 누르면 브라우저에서 로그인
3. 만들고 싶은 걸 한국어로 입력 → 오른쪽에 결과 페이지가 바로 미리보기
4. "브라우저에서 열기"로 내 페이지 확인 (`문서/DoGem작품`에 자동 저장)

## 사용 예시

앱에서 이렇게 입력해보세요:

```
HTML로 버튼 만들어줘
```

```
이미지 생성기 페이지 만들어줘. Pollinations.ai API 사용
```

```
한국어 번역기 웹 페이지 만들어줘
```

## 다운로드 (일반 사용자)

코딩 몰라도 됩니다 — [**Releases**](https://github.com/dyyoon86/demini/releases)에서 받으세요.

- **`DoGem-Portable-x.x.x.exe`** — 설치 없이 **더블클릭하면 바로 실행** (추천, 제일 간편)
- `DoGem-Setup-x.x.x.exe` — 설치형(바탕화면 바로가기 생성)

## 직접 빌드 (개발자)

```bash
cd gemini-cli-app
npm install
npm run build      # dist/DoGem-Setup-x.x.x.exe 생성 (윈도우)
```

## 배포 (자동)

GitHub Actions가 윈도우 설치 파일을 자동으로 만들어 Release에 올립니다.

```bash
git tag v1.0.0
git push origin v1.0.0   # → CI가 .exe 빌드 후 v1.0.0 Release에 첨부
```

(Actions 탭에서 수동 실행 시 빌드 결과를 artifact로도 받을 수 있습니다.)

## 영상 가이드

투두TV 채널의 영상 "코딩 몰라도 나만의 페이지 만들기"에서 사용하는 래퍼 앱입니다.

영상 시청: [링크 예정]

## 라이센스

MIT

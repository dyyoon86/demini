export default function FunnelPage() {
  return (
    <main className="min-h-screen bg-canvas text-fg">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-5 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-line2 text-xs text-muted mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            완전 무료 · API 키 불필요
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            코딩 몰라도<br />
            <span className="bg-gradient-to-r from-accent to-accent-fg bg-clip-text text-transparent">
              나만의 AI 앱
            </span>을<br />
            만드세요
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            터미널도, 코드도, 개발자 도구도 필요 없습니다.<br />
            그냥 하고 싶은 말만 AI한테 전달하세요.
          </p>
          <a
            href="#download"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-canvas font-bold text-lg rounded-xl hover:brightness-105 transition-all"
          >
            무료로 시작하기 →
          </a>
          <p className="text-sm text-subtle mt-4">Windows 7/10/11 · 30초 설치</p>
        </div>
      </section>

      {/* Problem Empathy */}
      <section className="border-t border-line bg-surface/50">
        <div className="max-w-5xl mx-auto px-5 py-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            이런 경험 있으신가요?
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { icon: "✗", text: "코드를 배워야 한다고 생각했는데..." },
              { icon: "✗", text: "터미널 화면이 무서워서 시작도 못 했고..." },
              { icon: "✗", text: "API 키? 설정? 어디서부터 해야 할지..." },
              { icon: "✗", text: "유튜브 보며 따라 했는데 에러만 계속..." },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-5 rounded-2xl bg-surface border border-line"
              >
                <span className="text-danger text-lg font-bold shrink-0">{item.icon}</span>
                <span className="text-fg2">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="border-t border-line">
        <div className="max-w-5xl mx-auto px-5 py-20">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">
              Solution
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              DoGem가 뭔가요?
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              코딩 없이 AI한테 시켜서 만드는 나만의 윈도우 앱
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🤖",
                title: "AI가 코드를 짜줍니다",
                desc: "Gemini AI가 프롬프트만으로 코드를 생성합니다. 코딩 지식 불필요.",
              },
              {
                icon: "🖥️",
                title: "터미널 없이 창에서만",
                desc: "명령어 칠 필요 없습니다. 앱 창에서 입력하고 결과만 확인하세요.",
              },
              {
                icon: "📦",
                title: "실행하면 자동 설치",
                desc: "Gemini CLI가 없으면 앱이 자동으로 설치합니다. 클릭 한 번이면 끝.",
              },
              {
                icon: "💰",
                title: "완전 무료",
                desc: "구독도, API 키도 없습니다. 무료 티어로 무제한 사용.",
              },
              {
                icon: "🇰🇷",
                title: "한국어 완벽 지원",
                desc: "프롬프트도 한국어로 입력하세요. 결과도 한국어로 나옵니다.",
              },
              {
                icon: "⚡",
                title: "3분이면 충분",
                desc: "앱 실행 → 입력 → 코드 생성. 이 3단계면 끝입니다.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-surface border border-line hover:border-line3 transition-colors"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-fg mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-line bg-surface/50">
        <div className="max-w-5xl mx-auto px-5 py-20">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">
              How it works
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              이렇게 쉬워요
            </h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "앱을 실행하세요",
                desc: "다운로드 후 앱을 켜면 Gemini CLI를 자동으로 설치합니다. (최초 1회, 1~3분)",
              },
              {
                step: "02",
                title: "하고 싶은 말을 입력하세요",
                desc: '예: "버튼 만들어줘", "이미지 생성기 만들어줘", "번역기 웹 페이지 만들어줘"',
              },
              {
                step: "03",
                title: "코드가 완성됩니다",
                desc: "AI가 코드를 짜줍니다. 복사해서 저장하면 나만의 앱 완성!",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center">
                  <span className="text-accent font-bold text-lg">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-fg mb-1">{item.title}</h3>
                  <p className="text-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example */}
      <section className="border-t border-line">
        <div className="max-w-5xl mx-auto px-5 py-20">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">
              Example
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              이런 걸 만들 수 있어요
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { emoji: "🎨", title: "AI 이미지 생성기", desc: "텍스트 입력하면 이미지 생성" },
              { emoji: "📝", title: "한영 번역기", desc: "문장 입력하면 자동 번역" },
              { emoji: "📊", title: "가계부 앱", desc: "수입/지출 기록하고 차트로 보기" },
              { emoji: "🎯", title: "투두 리스트", desc: "할 일 추가하고 완료 체크" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-surface border border-line text-center hover:border-line3 transition-colors"
              >
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-fg mb-1">{item.title}</h3>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Download */}
      <section id="download" className="border-t border-line bg-surface/50">
        <div className="max-w-3xl mx-auto px-5 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-muted text-lg mb-10 max-w-lg mx-auto">
            코딩 몰라도 됩니다. 그냥 다운로드하고, 입력하고, 결과 받으세요.
          </p>
          <a
            href="https://github.com/dyyoon86/demini/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-accent text-canvas font-bold text-xl rounded-2xl hover:brightness-105 transition-all shadow-lg shadow-accent/20"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            무료 다운로드 (Windows)
          </a>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-subtle">
            <span>✓ 무료</span>
            <span>✓ 30초 설치</span>
            <span>✓ API 키 불필요</span>
          </div>
          <div className="mt-10 p-5 rounded-2xl bg-inset border border-line max-w-md mx-auto">
            <p className="text-xs text-muted mb-2">처음이신가요? 영상 가이드를 보세요</p>
            <a
              href="https://www.youtube.com/@todotv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent text-sm font-semibold hover:underline"
            >
              투두TV 채널에서 영상 보기 →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line">
        <div className="max-w-5xl mx-auto px-5 py-8 text-center text-sm text-subtle">
          <p>DoGem · 코딩 몰라도 나만의 AI 앱 만들기 · MIT License</p>
        </div>
      </footer>
    </main>
  );
}

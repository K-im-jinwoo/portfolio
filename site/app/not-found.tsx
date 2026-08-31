export default function NotFound() {
  return (
    <main className="site-container min-h-[70vh] py-24">
      <p className="text-sm font-semibold text-[var(--secondary-ink)]">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)]">
        페이지를 찾을 수 없습니다.
      </h1>
      <p className="mt-5 text-base text-[var(--secondary-ink)]">
        주소가 변경되었거나 존재하지 않는 프로젝트입니다.
      </p>
      <a
        href="/"
        className="mt-10 inline-block border-b border-[var(--ink)] pb-1 text-sm font-semibold text-[var(--ink)]"
      >
        홈으로 돌아가기
      </a>
    </main>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--line)] bg-[var(--canvas)]">
      <nav
        aria-label="주요 메뉴"
        className="site-container flex h-20 items-center justify-between"
      >
        <a
          href="/"
          className="text-sm font-semibold tracking-[0.12em] text-[var(--ink)]"
        >
          JINWOO KIM
        </a>
        <div className="flex items-center gap-6 text-sm font-medium text-[var(--secondary-ink)] sm:gap-9">
          <a href="/#work">Work</a>
          <a href="/about">About</a>
        </div>
      </nav>
    </header>
  );
}

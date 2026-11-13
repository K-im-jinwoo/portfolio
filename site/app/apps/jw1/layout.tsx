import type { ReactNode } from "react";

export default function AssistantLayout({ children }: { children: ReactNode }) {
  return (
    <main className="site-container py-12 sm:py-20">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold tracking-[0.1em] text-[var(--secondary-ink)]">
          PERSONAL APP / JW1
        </p>
        <nav
          aria-label="앱 안내"
          className="mb-10 mt-5 flex flex-wrap gap-x-6 gap-y-3 border-b border-[var(--line)] pb-6 text-sm text-[var(--secondary-ink)]"
        >
          <a className="underline underline-offset-4" href="/apps/jw1">앱 소개</a>
          <a className="underline underline-offset-4" href="/apps/jw1/privacy">개인정보 안내</a>
        </nav>
        {children}
      </div>
    </main>
  );
}

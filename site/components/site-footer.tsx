import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-[var(--line)] py-14">
      <div className="site-container flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--secondary-ink)]">
            새로운 업무와 협업 이야기를 기다립니다.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mobile-scroll-safe mt-2 inline-block text-lg font-semibold text-[var(--ink)] underline decoration-[var(--line)] underline-offset-8"
          >
            {profile.email}
          </a>
        </div>
        <div className="flex flex-col gap-4 sm:items-end">
          <nav aria-label="개인 비서 정보" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--secondary-ink)]">
            <a className="underline underline-offset-4" href="/apps/jw1">개인 비서 소개</a>
            <a className="underline underline-offset-4" href="/apps/jw1/privacy">개인정보 안내</a>
          </nav>
          <p className="text-sm text-[var(--secondary-ink)]">
            © 2026 Jinwoo Kim
          </p>
        </div>
      </div>
    </footer>
  );
}

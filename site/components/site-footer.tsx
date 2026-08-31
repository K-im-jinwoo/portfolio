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
        <p className="text-sm text-[var(--secondary-ink)]">
          © 2026 Jinwoo Kim
        </p>
      </div>
    </footer>
  );
}

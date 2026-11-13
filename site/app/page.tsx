import { ProfilePortrait } from "@/components/profile-portrait";
import { ProjectList } from "@/components/project-list";
import { additionalProjects, featuredProjects } from "@/content/projects";
import { profile } from "@/content/profile";

export default function HomePage() {
  return (
    <main>
      <section
        data-testid="home-hero"
        className="site-container mobile-stack grid min-h-0 items-center gap-10 py-16 sm:py-20 lg:min-h-[70vh] lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16 lg:py-12"
      >
        <div>
          <p className="text-sm font-semibold tracking-[0.1em] text-[var(--secondary-ink)]">
            {profile.nameKo} / {profile.nameEn}
          </p>
          <h1 className="mt-6 max-w-3xl text-[clamp(2.75rem,5vw,4.5rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-[var(--ink)]">
            {profile.headline}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-[var(--secondary-ink)] sm:text-lg">
            {profile.intro}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="/#work"
              className="inline-flex border-b border-[var(--ink)] pb-1 text-sm font-semibold text-[var(--ink)]"
            >
              대표 사례 보기 <span aria-hidden="true">↓</span>
            </a>
            <span className="text-sm font-semibold text-[var(--secondary-ink)]">
              {profile.role}
            </span>
          </div>
        </div>
        <ProfilePortrait />
      </section>

      <section
        id="work"
        aria-labelledby="featured-work-title"
        className="site-container scroll-mt-8 py-20 lg:pb-24 lg:pt-16"
      >
        <ProjectList
          id="featured-work-title"
          eyebrow="SELECTED WORK"
          title="주요 업무 시스템과 자동화 사례"
          projects={featuredProjects}
        />
      </section>

      <section className="site-container pb-28">
        <ProjectList
          id="additional-work-title"
          eyebrow="MORE WORK"
          title="추가 업무·산학·개인 프로젝트"
          projects={additionalProjects}
        />
      </section>
    </main>
  );
}

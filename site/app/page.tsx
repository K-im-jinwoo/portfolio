import { ProfilePortrait } from "@/components/profile-portrait";
import { ProjectList } from "@/components/project-list";
import { additionalProjects, featuredProjects } from "@/content/projects";
import { profile } from "@/content/profile";

export default function HomePage() {
  return (
    <main>
      <section className="site-container mobile-stack grid min-h-[calc(100vh-80px)] items-center gap-14 py-20 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-20">
        <div>
          <p className="text-sm font-semibold tracking-[0.1em] text-[var(--secondary-ink)]">
            {profile.nameKo} / {profile.nameEn}
          </p>
          <h1 className="mt-6 max-w-3xl text-[clamp(2.75rem,7vw,5.6rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-[var(--ink)]">
            {profile.headline}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-[var(--secondary-ink)] sm:text-lg">
            {profile.intro}
          </p>
          <p className="mt-10 text-sm font-semibold text-[var(--ink)]">
            {profile.role}
          </p>
        </div>
        <ProfilePortrait />
      </section>

      <section
        id="work"
        aria-labelledby="featured-work-title"
        className="site-container scroll-mt-8 py-24"
      >
        <ProjectList
          id="featured-work-title"
          eyebrow="SELECTED WORK"
          title="업무의 병목을 찾아, 사용할 수 있는 시스템으로 만들었습니다."
          projects={featuredProjects}
        />
      </section>

      <section className="site-container pb-28">
        <ProjectList
          id="additional-work-title"
          eyebrow="MORE WORK"
          title="데이터 처리와 운영 개선 경험"
          projects={additionalProjects}
        />
      </section>
    </main>
  );
}

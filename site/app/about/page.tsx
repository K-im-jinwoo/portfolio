import { CapabilityLinks } from "@/components/capability-links";
import { CareerTimeline } from "@/components/career-timeline";
import { ProfilePortrait } from "@/components/profile-portrait";
import { capabilities, profile } from "@/content/profile";

export default function AboutPage() {
  return (
    <main>
      <section className="site-container mobile-stack grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-20">
        <div>
          <p className="text-sm font-semibold tracking-[0.1em] text-[var(--secondary-ink)]">
            {profile.nameKo} / {profile.nameEn}
          </p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[var(--ink)]">
            업무의 병목을 찾고, 개선을 실제 시스템으로 정착시킵니다.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-[var(--secondary-ink)] sm:text-lg">
            {profile.intro}
          </p>
        </div>
        <ProfilePortrait size="about" />
      </section>

      <section className="site-container py-20">
        <p className="text-sm font-semibold tracking-[0.1em] text-[var(--secondary-ink)]">
          CORE CAPABILITIES
        </p>
        <h2 className="mb-12 mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--ink)] sm:text-4xl">
          역량을 프로젝트 증거로 연결했습니다.
        </h2>
        <CapabilityLinks items={capabilities} />
      </section>

      <section className="site-container py-20">
        <CareerTimeline
          experience={profile.experience}
          education={profile.education}
        />
      </section>
    </main>
  );
}

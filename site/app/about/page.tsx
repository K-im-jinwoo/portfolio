import { CareerTimeline } from "@/components/career-timeline";
import { ProfilePortrait } from "@/components/profile-portrait";
import { SkillGroups } from "@/components/skill-groups";
import { profile } from "@/content/profile";

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto grid w-[min(100%-40px,1120px)] items-center gap-14 py-20 sm:w-[min(100%-48px,1120px)] sm:py-28 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-20">
        <div>
          <p className="text-sm font-semibold tracking-[0.1em] text-[var(--secondary-ink)]">
            ABOUT
          </p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[var(--ink)]">
            업무의 병목을 찾고, 개선을 실제 시스템으로 정착시킵니다.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-[var(--secondary-ink)] sm:text-lg">
            {profile.intro}
          </p>
        </div>
        <ProfilePortrait className="lg:max-w-[420px]" />
      </section>

      <section className="mx-auto w-[min(100%-40px,1120px)] py-20 sm:w-[min(100%-48px,1120px)]">
        <CareerTimeline
          experience={profile.experience}
          education={profile.education}
        />
      </section>

      <section className="mx-auto w-[min(100%-40px,1120px)] py-20 sm:w-[min(100%-48px,1120px)]">
        <p className="text-sm font-semibold tracking-[0.1em] text-[var(--secondary-ink)]">
          SUPPORTING EXPERIENCE
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--ink)] sm:text-4xl">
          HWASHIN QMS 업무 시스템 개발
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--secondary-ink)]">
          React·TypeScript 기반 검사 및 부적합 관리 화면을 개발하고, 반복되는
          Dialog·Popup·탭 UI를 여러 화면에서 재사용할 수 있도록 공통 컴포넌트
          기반 구축에 참여했습니다. MSSQL Stored Procedure 연계와 PM2 배포
          과정에도 참여했습니다.
        </p>
      </section>

      <section className="mx-auto w-[min(100%-40px,1120px)] py-20 sm:w-[min(100%-48px,1120px)]">
        <p className="text-sm font-semibold tracking-[0.1em] text-[var(--secondary-ink)]">
          SKILLS
        </p>
        <h2 className="mb-12 mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--ink)] sm:text-4xl">
          업무를 끝까지 연결하는 기술
        </h2>
        <SkillGroups skills={profile.skills} />
      </section>

      <section className="mx-auto w-[min(100%-40px,1120px)] py-24 sm:w-[min(100%-48px,1120px)]">
        <p className="text-sm text-[var(--secondary-ink)]">CONTACT</p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-4 inline-block text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)] underline decoration-[var(--line)] underline-offset-8 sm:text-4xl"
        >
          {profile.email}
        </a>
      </section>
    </main>
  );
}

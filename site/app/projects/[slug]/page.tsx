import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudySection } from "@/components/case-study-section";
import { ImpactMetrics } from "@/components/impact-metrics";
import { ProcessSteps } from "@/components/process-steps";
import { ProjectMeta } from "@/components/project-meta";
import { getProjectBySlug, projects } from "@/content/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);

  if (!project) return {};

  return {
    title: `${project.title} | Jinwoo Kim`,
    description: project.summary,
    openGraph: { images: [] },
    twitter: { images: [] },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug((await params).slug);

  if (!project) notFound();

  const currentIndex = projects.findIndex(({ slug }) => slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main>
      <article className="site-container py-20 sm:py-28">
        <a
          href="/#work"
          className="text-sm font-semibold text-[var(--secondary-ink)]"
        >
          ← 모든 프로젝트
        </a>
        <p className="mt-16 text-sm font-semibold tracking-[0.1em] text-[var(--secondary-ink)]">
          CASE STUDY
        </p>
        <h1 className="mt-5 max-w-4xl text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[var(--ink)]">
          {project.title}
        </h1>
        <p className="mb-14 mt-7 max-w-3xl text-lg leading-8 text-[var(--secondary-ink)] sm:text-xl">
          {project.summary}
        </p>

        <ProjectMeta project={project} />
        {project.metrics.length > 0 && (
          <div className="mt-14">
            <ImpactMetrics metrics={project.metrics} />
          </div>
        )}

        <div className="mt-24">
          <CaseStudySection
            index="01"
            label="OVERVIEW"
            title="어떤 업무를 개선한 프로젝트인가"
          >
            <p>{project.summary}</p>
          </CaseStudySection>
          <CaseStudySection
            index="02"
            label="PROBLEM"
            title="무엇이 업무를 어렵게 만들었는가"
          >
            <p>{project.problem}</p>
          </CaseStudySection>
          <CaseStudySection
            index="03"
            label="SOLUTION"
            title="문제를 어떻게 시스템으로 풀었는가"
          >
            <p>{project.solution}</p>
          </CaseStudySection>
          <CaseStudySection
            index="04"
            label="PROCESS"
            title="업무 흐름을 어떤 단계로 구성했는가"
          >
            <ProcessSteps steps={project.steps} />
          </CaseStudySection>
          <CaseStudySection
            index="05"
            label="RESULT"
            title="업무에 무엇이 남았는가"
          >
            <p>{project.result}</p>
          </CaseStudySection>
        </div>

        <nav
          aria-label="프로젝트 이동"
          className="border-t border-[var(--line)] pt-12"
        >
          <a
            href={`/projects/${nextProject.slug}`}
            className="mobile-scroll-safe grid gap-3 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-12"
          >
            <span className="text-sm font-semibold text-[var(--secondary-ink)]">
              다음 프로젝트
            </span>
            <strong className="text-2xl tracking-[-0.03em] text-[var(--ink)] sm:text-3xl">
              {nextProject.title} <span aria-hidden="true">→</span>
            </strong>
          </a>
        </nav>
      </article>
    </main>
  );
}

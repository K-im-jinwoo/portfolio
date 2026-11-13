import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { BeforeAfter } from "@/components/before-after";
import { CaseStudySection } from "@/components/case-study-section";
import { EvidenceCapture } from "@/components/evidence-capture";
import { EvidenceList } from "@/components/evidence-list";
import { ImpactMetrics } from "@/components/impact-metrics";
import { ProcessSteps } from "@/components/process-steps";
import { ProjectMeta } from "@/components/project-meta";
import { ProjectSnapshotView } from "@/components/project-snapshot";
import { SystemArchitecture } from "@/components/system-architecture";
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
  const sections: Array<{
    label: string;
    title: string;
    content: ReactNode;
  }> = [
    {
      label: "SNAPSHOT",
      title: "한눈에 보는 결과",
      content: <ProjectSnapshotView snapshot={project.snapshot} />,
    },
    ...(project.comparison?.before.length && project.comparison.after.length
      ? [
          {
            label: "BEFORE / AFTER",
            title: "Before → After",
            content: <BeforeAfter comparison={project.comparison} />,
          },
        ]
      : []),
    ...(project.discovery
      ? [
          {
            label: "DISCOVERY",
            title: "업무 배경",
            content: <p>{project.discovery}</p>,
          },
        ]
      : []),
    ...(project.decisions?.length
      ? [
          {
            label: "DECISIONS",
            title: "구현 내용과 선택 배경",
            content: <EvidenceList items={project.decisions} />,
          },
        ]
      : []),
    ...(project.architecture
      ? [
          {
            label: "SYSTEM ARCHITECTURE & WORKFLOW",
            title: project.architecture.title ?? "수집·정제·질의 구조",
            content: <SystemArchitecture architecture={project.architecture} />,
          },
        ]
      : project.system?.length
        ? [
            {
              label: "SYSTEM",
              title: "실제 시스템",
              content: <ProcessSteps steps={project.system} />,
            },
          ]
        : []),
    {
      label: "VERIFICATION",
      title: "확인 기록",
      content: (
        <div className="grid gap-10">
          <EvidenceList items={project.verification} />
          {project.evidence && <EvidenceCapture evidence={project.evidence} />}
        </div>
      ),
    },
    {
      label: "SCOPE",
      title: "적용 범위와 한계",
      content: <EvidenceList items={project.limits} />,
    },
  ];

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
          CASE STUDY / {project.projectKind}
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
          {sections.map((section, index) => (
            <CaseStudySection
              key={section.title}
              index={String(index + 1).padStart(2, "0")}
              label={section.label}
              title={section.title}
            >
              {section.content}
            </CaseStudySection>
          ))}
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

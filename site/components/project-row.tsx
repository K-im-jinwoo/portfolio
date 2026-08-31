import type { Project } from "@/content/projects";

type ProjectRowProps = {
  index: number;
  project: Project;
};

export function ProjectRow({ index, project }: ProjectRowProps) {
  return (
    <li className="border-t border-[var(--line)]">
      <a
        href={`/projects/${project.slug}`}
        className="mobile-stack mobile-scroll-safe group grid gap-4 py-8 sm:grid-cols-[56px_minmax(0,1fr)_auto] sm:items-start sm:gap-6"
      >
        <span className="text-sm font-medium text-[var(--secondary-ink)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span>
          <span className="block text-xl font-semibold tracking-[-0.025em] text-[var(--ink)] sm:text-2xl">
            {project.title}
          </span>
          <span className="mt-3 block max-w-2xl text-sm leading-7 text-[var(--secondary-ink)] sm:text-base">
            {project.summary}
          </span>
          <span className="mt-4 block text-sm text-[var(--secondary-ink)]">
            {project.stack.join(" · ")}
          </span>
        </span>
        <span className="text-sm font-semibold text-[var(--ink)] sm:pt-1">
          상세 보기 <span aria-hidden="true">↗</span>
          <span className="sr-only"> 프로젝트 보기</span>
        </span>
      </a>
    </li>
  );
}

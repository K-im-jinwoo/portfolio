import type { Project } from "@/content/projects";

export function ProjectMeta({ project }: { project: Project }) {
  const items = [
    ["기간", project.period],
    ["역할", project.role],
    ["환경", project.context],
    ["기술", project.stack.join(" · ")],
  ];

  return (
    <dl className="grid border-y border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="border-b border-[var(--line)] py-6 last:border-b-0 sm:px-5 sm:first:pl-0 sm:[&:nth-child(3)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
        >
          <dt className="text-xs font-semibold tracking-[0.08em] text-[var(--secondary-ink)]">
            {label}
          </dt>
          <dd className="mt-3 text-sm leading-6 text-[var(--ink)]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

import type { Project } from "@/content/projects";
import { ProjectRow } from "@/components/project-row";

type ProjectListProps = {
  eyebrow: string;
  id: string;
  projects: Project[];
  title: string;
};

export function ProjectList({
  eyebrow,
  id,
  projects,
  title,
}: ProjectListProps) {
  return (
    <div>
      <p className="text-sm font-semibold tracking-[0.1em] text-[var(--secondary-ink)]">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mb-14 mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--ink)] sm:text-5xl"
      >
        {title}
      </h2>
      <ol className="border-b border-[var(--line)]">
        {projects.map((project, index) => (
          <ProjectRow key={project.slug} index={index} project={project} />
        ))}
      </ol>
    </div>
  );
}

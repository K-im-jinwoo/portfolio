import type { Project } from "@/content/projects";

export function ProcessSteps({ steps }: { steps: Project["steps"] }) {
  return (
    <ol className="mt-8 grid border-y border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li
          key={`${step.label}-${index}`}
          className="border-b border-[var(--line)] py-6 sm:px-5 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
        >
          <span className="text-xs font-semibold text-[var(--secondary-ink)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <strong className="mt-4 block text-base text-[var(--ink)]">
            {step.label}
          </strong>
          <p className="mt-2 text-sm leading-6 text-[var(--secondary-ink)]">
            {step.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}

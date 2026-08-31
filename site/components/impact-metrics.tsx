import type { ProjectMetric } from "@/content/projects";

export function ImpactMetrics({ metrics }: { metrics: ProjectMetric[] }) {
  if (metrics.length === 0) return null;

  return (
    <section aria-label="주요 성과" className="grid border-y border-[var(--line)] sm:grid-cols-2">
      {metrics.map((metric) => (
        <div key={metric.label} className="py-8 sm:px-6 sm:first:pl-0">
          <strong className="block text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)]">
            {metric.value}
          </strong>
          <span className="mt-2 block text-sm text-[var(--secondary-ink)]">
            {metric.label}
          </span>
        </div>
      ))}
    </section>
  );
}

import type { ReactNode } from "react";

type CaseStudySectionProps = {
  children: ReactNode;
  index: string;
  label: string;
  title: string;
};

export function CaseStudySection({
  children,
  index,
  label,
  title,
}: CaseStudySectionProps) {
  return (
    <section className="grid gap-6 border-t border-[var(--line)] py-14 md:grid-cols-[180px_minmax(0,1fr)] md:gap-12">
      <div>
        <span
          data-testid="case-study-index"
          className="text-xs font-semibold text-[var(--secondary-ink)]"
        >
          {index}
        </span>
        <p className="mt-2 text-sm font-semibold tracking-[0.08em] text-[var(--secondary-ink)]">
          {label}
        </p>
      </div>
      <div className="min-w-0">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)] sm:text-3xl">
          {title}
        </h2>
        <div className="mt-5 max-w-3xl text-base leading-8 text-[var(--secondary-ink)] sm:text-lg">
          {children}
        </div>
      </div>
    </section>
  );
}

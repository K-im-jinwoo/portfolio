import type { ProjectArchitecture, ProjectStep } from "@/content/projects";

function FlowCard({
  step,
  emphasized = false,
}: {
  step: ProjectStep;
  emphasized?: boolean;
}) {
  return (
    <div
      className={`rounded-[var(--radius)] border border-[var(--line)] p-5 ${
        emphasized ? "bg-[var(--ink)] text-[var(--canvas)]" : "bg-[var(--canvas)]"
      }`}
    >
      <p
        className={`text-xs font-semibold tracking-[0.08em] ${
          emphasized ? "text-[var(--canvas)]/70" : "text-[var(--secondary-ink)]"
        }`}
      >
        {step.label}
      </p>
      <p
        className={`mt-3 text-sm leading-6 ${
          emphasized ? "text-[var(--canvas)]/85" : "text-[var(--secondary-ink)]"
        }`}
      >
        {step.detail}
      </p>
    </div>
  );
}

function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-3 text-xs font-semibold text-[var(--secondary-ink)]">
      <span aria-hidden="true" className="text-base">
        ↓
      </span>
      {label && <span>{label}</span>}
    </div>
  );
}

export function SystemArchitecture({
  architecture,
}: {
  architecture: ProjectArchitecture;
}) {
  return (
    <div data-testid="system-architecture" className="mt-8 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {architecture.inputs.map((step) => (
          <FlowCard key={step.label} step={step} />
        ))}
      </div>

      <FlowArrow label="입력 통합" />
      <FlowCard step={architecture.router} emphasized />

      <div className="grid gap-5 pt-2 lg:grid-cols-2">
        {architecture.branches.map((branch) => (
          <section
            key={branch.label}
            className="rounded-[var(--radius)] border border-[var(--line)] p-5"
          >
            <h3 className="text-sm font-semibold tracking-[0.08em] text-[var(--ink)]">
              {branch.label}
            </h3>
            <ol className="mt-5 space-y-3">
              {branch.steps.map((step, index) => (
                <li
                  key={`${branch.label}-${step.label}`}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 text-xs font-semibold text-[var(--secondary-ink)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--ink)]">
                      {step.label}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[var(--secondary-ink)]">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <FlowArrow label="메모 저장 후 수동 정제" />
      <div className="grid gap-5 lg:grid-cols-2">
        {architecture.curation.map((step) => (
          <FlowCard key={step.label} step={step} />
        ))}
      </div>

      <FlowArrow label="정리된 지식" />
      <FlowCard step={architecture.knowledgeBase} emphasized />
    </div>
  );
}

import type { ProjectEvidence } from "@/content/projects";

/* oxlint-disable next/no-img-element */

export function EvidenceCapture({ evidence }: { evidence: ProjectEvidence }) {
  return (
    <div data-testid="evidence-summary-card" className="grid gap-5">
      <div className="overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--paper)]">
        <div className="grid md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <div className="bg-[var(--ink)] p-6 text-[var(--canvas)] sm:p-8">
            <p className="text-xs font-semibold tracking-[0.12em] text-[var(--canvas)]/65">
              실제 /ask 질의
            </p>
            <p className="mt-8 text-xl font-medium leading-8 tracking-[-0.02em] sm:text-2xl">
              {evidence.query}
            </p>
          </div>
          <div className="grid gap-8 p-6 sm:p-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.12em] text-[var(--secondary-ink)]">
                응답에서 확인한 값
              </p>
              <ul className="mt-5 grid gap-3">
                {evidence.facts.map((fact, index) => (
                  <li
                    key={fact}
                    className="flex items-baseline gap-3 border-b border-[var(--line)] pb-3 last:border-b-0 last:pb-0"
                  >
                    <span className="text-xs font-semibold text-[var(--secondary-ink)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-medium text-[var(--ink)]">
                      {fact}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.12em] text-[var(--secondary-ink)]">
                근거 문서
              </p>
              <ul className="mt-4 grid gap-2 text-sm leading-6 text-[var(--secondary-ink)]">
                {evidence.sources.map((source) => (
                  <li key={source}>— {source}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-[var(--line)] px-6 py-4 sm:px-8">
          <p className="text-sm leading-6 text-[var(--secondary-ink)]">
            {evidence.note}
          </p>
        </div>
      </div>

      <p className="text-base leading-7 text-[var(--ink)]">{evidence.caption}</p>

      <details className="rounded-[1.25rem] border border-[var(--line)] bg-[var(--paper)] p-4 sm:p-6">
        <summary className="cursor-pointer text-sm font-semibold text-[var(--ink)]">
          원본 Telegram 캡처 보기
        </summary>
        <div className="mt-5 overflow-hidden rounded-[1rem] border border-[var(--line)] bg-[var(--canvas)]">
          <img
            src={evidence.src}
            alt={evidence.alt}
            className="mx-auto block h-auto w-full max-w-[31.3125rem] object-contain"
          />
        </div>
      </details>
    </div>
  );
}

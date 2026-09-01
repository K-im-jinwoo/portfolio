import type { ProjectComparison } from "@/content/projects";

export function BeforeAfter({
  comparison,
}: {
  comparison: ProjectComparison;
}) {
  const columns = [
    { label: "기존 흐름", items: comparison.before },
    { label: "변경 후", items: comparison.after },
  ];

  return (
    <div className="grid border-y border-[var(--line)] md:grid-cols-2">
      {columns.map((column) => (
        <div
          key={column.label}
          className="border-b border-[var(--line)] py-6 md:border-b-0 md:px-7 md:first:border-r md:first:pl-0"
        >
          <h3 className="text-sm font-semibold text-[var(--ink)]">
            {column.label}
          </h3>
          <ul className="mt-4 space-y-3">
            {column.items.map((item) => (
              <li key={item} className="flex gap-3 text-base leading-7">
                <span aria-hidden="true" className="text-[var(--secondary-ink)]">
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

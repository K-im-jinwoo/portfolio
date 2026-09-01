import type { ProjectSnapshot } from "@/content/projects";

export function ProjectSnapshotView({
  snapshot,
}: {
  snapshot: ProjectSnapshot;
}) {
  const items = [
    ["문제", snapshot.problem],
    ["내 역할", snapshot.role],
    ["핵심 변화", snapshot.change],
    ["확인된 범위", snapshot.scope],
  ] as const;

  return (
    <dl className="grid border-y border-[var(--line)] sm:grid-cols-2">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="border-b border-[var(--line)] py-6 sm:px-6 sm:odd:pl-0"
        >
          <dt className="text-xs font-semibold tracking-[0.08em] text-[var(--secondary-ink)]">
            {label}
          </dt>
          <dd className="mt-3 text-base leading-7 text-[var(--ink)]">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

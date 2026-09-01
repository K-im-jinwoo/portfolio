export function EvidenceList({ items }: { items: string[] }) {
  return (
    <ul className="border-y border-[var(--line)]">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-4 border-b border-[var(--line)] py-5 last:border-b-0"
        >
          <span aria-hidden="true" className="text-[var(--secondary-ink)]">
            —
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

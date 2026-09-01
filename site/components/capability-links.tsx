export type CapabilityLink = {
  title: string;
  description: string;
  href: string;
};

export function CapabilityLinks({ items }: { items: CapabilityLink[] }) {
  return (
    <div className="border-b border-[var(--line)]">
      {items.map((item, index) => (
        <a
          key={item.href}
          href={item.href}
          className="mobile-scroll-safe group grid gap-4 border-t border-[var(--line)] py-7 sm:grid-cols-[56px_minmax(0,1fr)_auto] sm:items-start sm:gap-6"
        >
          <span className="text-sm text-[var(--secondary-ink)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>
            <strong className="block text-xl text-[var(--ink)]">
              {item.title}
            </strong>
            <span className="mt-2 block max-w-2xl text-sm leading-7 text-[var(--secondary-ink)] sm:text-base">
              {item.description}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="text-lg text-[var(--ink)] transition-transform group-hover:translate-x-1"
          >
            ↗
          </span>
        </a>
      ))}
    </div>
  );
}

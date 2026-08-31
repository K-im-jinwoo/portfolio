type TimelineItem = {
  description: string;
  organization: string;
  period: string;
};

type CareerTimelineProps = {
  education: readonly TimelineItem[];
  experience: readonly TimelineItem[];
};

function TimelineGroup({
  items,
  title,
}: {
  items: readonly TimelineItem[];
  title: string;
}) {
  return (
    <section>
      <h2 className="text-sm font-semibold tracking-[0.1em] text-[var(--secondary-ink)]">
        {title}
      </h2>
      <ol className="mt-6 border-b border-[var(--line)]">
        {items.map((item) => (
          <li
            key={`${item.period}-${item.organization}`}
            className="grid gap-3 border-t border-[var(--line)] py-7 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8"
          >
            <span className="text-sm text-[var(--secondary-ink)]">
              {item.period}
            </span>
            <div>
              <strong className="text-lg text-[var(--ink)]">
                {item.organization}
              </strong>
              <p className="mt-2 text-sm leading-7 text-[var(--secondary-ink)]">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CareerTimeline({
  education,
  experience,
}: CareerTimelineProps) {
  return (
    <div className="grid gap-14">
      <TimelineGroup title="EXPERIENCE" items={experience} />
      <TimelineGroup title="EDUCATION" items={education} />
    </div>
  );
}

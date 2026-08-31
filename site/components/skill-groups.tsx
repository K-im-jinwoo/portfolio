type SkillGroupsProps = {
  skills: Record<string, readonly string[]>;
};

export function SkillGroups({ skills }: SkillGroupsProps) {
  return (
    <div className="grid border-b border-[var(--line)] md:grid-cols-2">
      {Object.entries(skills).map(([group, items]) => (
        <section
          key={group}
          className="border-t border-[var(--line)] py-7 md:px-6 md:odd:pl-0"
        >
          <h3 className="text-sm font-semibold text-[var(--ink)]">{group}</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--secondary-ink)]">
            {items.join(" · ")}
          </p>
        </section>
      ))}
    </div>
  );
}

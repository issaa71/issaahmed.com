/* ──────────────────────────────────────────────────────────────────────────
   TechStack: the case-study "Tech stack" section, rebuilt to match the home
   page Skills treatment. Replaces the old EquipList (a small mono dotted list
   Issa called "poorly made / low effort"). Each domain group is a card with a
   red-square heading; the tools are outlined Archivo tags. Server-safe.

   Pass `groups` (a re-grouping of the project's real stack into 2-4 domain
   buckets). Every item must be a real part of the stack: this is presentation
   only, never invent tools.
   ────────────────────────────────────────────────────────────────────────── */

export function TechStack({
  groups,
  className,
}: {
  groups: { group: string; items: string[] }[];
  className?: string;
}) {
  const single = groups.length === 1;
  return (
    <div
      className={`grid gap-4 ${single ? "" : "sm:grid-cols-2"} ${className ?? ""}`}
    >
      {groups.map((g) => (
        <div
          key={g.group}
          className="flex flex-col border border-line bg-paper p-6"
        >
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="h-2.5 w-2.5 shrink-0 bg-red" />
            <h3 className="font-struct text-[16px] font-bold uppercase tracking-[0.08em] text-ink">
              {g.group}
            </h3>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {g.items.map((it) => (
              <li
                key={it}
                className="border border-line px-3 py-1.5 font-struct text-[14px] font-medium leading-none text-ink-soft"
              >
                {it}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

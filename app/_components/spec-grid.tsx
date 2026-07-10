/* ──────────────────────────────────────────────────────────────────────────
   SpecGrid — hairline-separated component/spec cells (name + role). The
   "engineering-breadth up top" grid: hardware for the robotics projects, a
   stack-&-methods table for the ML ones. Server-safe, stacks 2-up on mobile.
   Extracted from the RECLAIM page so every project shares one grid.
   ────────────────────────────────────────────────────────────────────────── */

/** sm+ column count — static class names so Tailwind's compiler can see them
    (it can't resolve dynamically-built strings). Mobile is always 2-up. */
const SPEC_COLS: Record<2 | 3, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

export function SpecGrid({
  label,
  cols = 3,
  items,
  className,
}: {
  label?: string;
  cols?: 2 | 3;
  items: { name: string; role: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      {label ? <p className="anno">{label}</p> : null}
      <div
        className={`${label ? "mt-3" : ""} grid grid-cols-2 gap-px border border-line bg-line ${SPEC_COLS[cols]}`}
      >
        {items.map((c) => (
          <div key={c.name} className="bg-paper p-4">
            <div className="font-struct text-[14px] font-bold leading-snug text-ink">
              {c.name}
            </div>
            <div className="mt-1 font-prose text-[13px] leading-snug text-ink-soft">
              {c.role}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

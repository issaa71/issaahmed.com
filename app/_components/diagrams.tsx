import { Fragment } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   REDLINE diagrams: hairline boxes, mono labels, drafting arrows (1px stroke
   + small solid triangular head). Red marks only the emphasized element.
   Pure CSS/SVG, server-safe, stacks cleanly on mobile.
   ────────────────────────────────────────────────────────────────────────── */

/** Drafting arrow: 1px line + small filled triangle head. `currentColor`. */
function Arrow({
  dir = "right",
  className,
}: {
  dir?: "right" | "down";
  className?: string;
}) {
  if (dir === "down") {
    return (
      <svg
        width="10"
        height="20"
        viewBox="0 0 10 20"
        fill="none"
        aria-hidden
        className={className}
      >
        <line x1="5" y1="0" x2="5" y2="15" stroke="currentColor" strokeWidth="1" />
        <path d="M2 13 L5 19 L8 13 Z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg
      width="24"
      height="10"
      viewBox="0 0 24 10"
      fill="none"
      aria-hidden
      className={className}
    >
      <line x1="0" y1="5" x2="18" y2="5" stroke="currentColor" strokeWidth="1" />
      <path d="M17 2 L23 5 L17 8 Z" fill="currentColor" />
    </svg>
  );
}

/** Red mono kicker row + hairline. Every diagram wears one. */
function Kicker({ label }: { label: string }) {
  return (
    <p className="mb-5 border-b border-line pb-2 font-anno text-[10px] uppercase tracking-[0.16em] text-red">
      {label}
    </p>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <figcaption className="mt-5 border-t border-line pt-3 font-prose text-[13px] italic leading-snug text-ink-soft">
      {children}
    </figcaption>
  );
}

const PLATE = "border border-line bg-plate p-5 sm:p-6";

/* FlowDiagram -------------------------------------------------------------- */

export function FlowDiagram({
  label = "Process",
  steps,
  caption,
}: {
  label?: string;
  steps: { label: string; sub?: string; accent?: boolean }[];
  caption?: string;
}) {
  return (
    <figure className={PLATE}>
      <Kicker label={label} />
      <ol className="flex flex-col items-stretch sm:flex-row sm:items-stretch">
        {steps.map((s, i) => (
          <Fragment key={s.label}>
            <li
              className={`flex flex-1 flex-col justify-center border bg-paper px-3 py-3 text-center ${s.accent ? "border-red" : "border-line"}`}
            >
              <span
                className={`font-anno text-[12px] font-medium ${s.accent ? "text-red" : "text-ink"}`}
              >
                {s.label}
              </span>
              {s.sub ? (
                <span className="mt-1 font-anno text-[10px] leading-snug text-graphite">
                  {s.sub}
                </span>
              ) : null}
            </li>
            {i < steps.length - 1 ? (
              <span className="flex shrink-0 items-center justify-center py-1 text-graphite sm:px-1 sm:py-0">
                <Arrow dir="right" className="hidden sm:block" />
                <Arrow dir="down" className="sm:hidden" />
              </span>
            ) : null}
          </Fragment>
        ))}
      </ol>
      {caption ? <Note>{caption}</Note> : null}
    </figure>
  );
}

/* FsmDiagram --------------------------------------------------------------- */

export function FsmDiagram({
  label = "State machine",
  states,
  events,
  caption,
}: {
  label?: string;
  states: { name: string; role: string; via?: string }[];
  events: string[];
  caption?: string;
}) {
  return (
    <figure className={PLATE}>
      <Kicker label={label} />
      <ol className="flex flex-col items-stretch sm:flex-row sm:items-start">
        {states.map((s, i) => (
          <Fragment key={s.name}>
            <li className="flex flex-1 flex-col items-center gap-1.5 text-center">
              <span className="border border-line bg-paper px-3 py-1.5 font-anno text-[12px] font-medium text-ink">
                {s.name}
              </span>
              <span className="font-prose text-[12px] leading-snug text-ink-soft">
                {s.role}
              </span>
            </li>
            {i < states.length - 1 ? (
              <span className="flex shrink-0 flex-col items-center gap-1 self-center py-1.5 text-graphite sm:w-24 sm:self-start sm:pt-2">
                <Arrow dir="right" className="hidden sm:block" />
                <Arrow dir="down" className="sm:hidden" />
                {states[i + 1].via ? (
                  <span className="max-w-[6rem] text-center font-anno text-[9px] uppercase leading-tight tracking-[0.08em] text-graphite">
                    {states[i + 1].via}
                  </span>
                ) : null}
              </span>
            ) : null}
          </Fragment>
        ))}
      </ol>
      {events.length ? (
        <div className="mt-6 border-t border-line pt-4">
          <p className="mb-2.5 font-anno text-[10px] uppercase tracking-[0.16em] text-graphite">
            Event ladder
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
            {events.map((e) => (
              <li
                key={e}
                className="flex items-center gap-2 font-anno text-[11px] text-ink-soft"
              >
                <span aria-hidden className="h-1 w-1 rounded-full bg-red/60" />
                {e}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {caption ? <Note>{caption}</Note> : null}
    </figure>
  );
}

/* Timeline ----------------------------------------------------------------- */

export function Timeline({
  label = "Timeline",
  items,
  caption,
}: {
  label?: string;
  items: { year: string; title: string; detail?: string; accent?: boolean }[];
  caption?: string;
}) {
  return (
    <figure className={PLATE}>
      <Kicker label={label} />
      <ol>
        {items.map((it, i) => (
          <li
            key={`${it.year}-${i}`}
            className="grid grid-cols-[3.25rem_1fr] gap-4 sm:grid-cols-[4.5rem_1fr]"
          >
            <div className="pt-1.5 text-right">
              <span
                className={`font-anno text-[12px] tabular-nums ${it.accent ? "font-medium text-red" : "text-graphite"}`}
              >
                {it.year}
              </span>
            </div>
            <div className="relative border-l border-line pb-6 pl-5 last:pb-0">
              <span
                aria-hidden
                className={`absolute -left-[3.5px] top-1.5 h-1.5 w-1.5 ${it.accent ? "bg-red" : "bg-graphite"}`}
              />
              <p className="font-struct text-[16.5px] font-semibold leading-snug text-ink">
                {it.title}
              </p>
              {it.detail ? (
                <p className="mt-1.5 font-prose text-[15px] leading-relaxed text-ink-soft">
                  {it.detail}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
      {caption ? <Note>{caption}</Note> : null}
    </figure>
  );
}

/* DeepSetsDiagram ---------------------------------------------------------- */

const DS_NODE = "border bg-paper px-3 py-2 text-center font-anno text-[11px] leading-snug";

function DsNode({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`${DS_NODE} ${accent ? "border-red text-red" : "border-line text-ink"}`}
    >
      {children}
    </div>
  );
}

function DsLane({
  head,
  steps,
  out,
}: {
  head: string;
  steps: { t: React.ReactNode; s?: string }[];
  out: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-3 font-anno text-[10px] uppercase tracking-[0.16em] text-graphite">
        {head}
      </p>
      <div className="w-full max-w-[15rem]">
        {steps.map((st, i) => (
          <Fragment key={i}>
            <DsNode>
              <span>{st.t}</span>
              {st.s ? (
                <span className="mt-0.5 block font-anno text-[9px] text-graphite">
                  {st.s}
                </span>
              ) : null}
            </DsNode>
            <div className="flex justify-center py-1 text-graphite">
              <Arrow dir="down" />
            </div>
          </Fragment>
        ))}
        <DsNode accent>{out}</DsNode>
      </div>
    </div>
  );
}

export function DeepSetsDiagram({
  label = "Architecture · forward pass",
  caption,
}: {
  label?: string;
  caption?: string;
}) {
  return (
    <figure className={PLATE}>
      <Kicker label={label} />
      <div className="mx-auto w-full max-w-[15rem]">
        <DsNode>
          <span className="text-ink">Ball-handler state</span>
          <span className="mt-0.5 block font-anno text-[9px] text-graphite">
            context, feeds both heads
          </span>
        </DsNode>
      </div>
      <div className="flex justify-center py-1 text-graphite">
        <Arrow dir="down" />
      </div>
      <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
        <DsLane
          head="Shoot path"
          steps={[
            { t: "5 defenders" },
            {
              t: (
                <>
                  φ<sub>def</sub>, shared
                </>
              ),
              s: "applied per defender",
            },
            { t: "mean-pool → context", s: "permutation-invariant" },
          ]}
          out={<>Shoot head → Q(shoot)</>}
        />
        <DsLane
          head="Pass path"
          steps={[
            { t: "4 teammates" },
            {
              t: (
                <>
                  φ<sub>tm</sub>, shared
                </>
              ),
              s: "applied per teammate",
            },
            { t: "kept per-entity (×4)", s: "permutation-equivariant" },
          ]}
          out={
            <>
              Pass head (shared) → Q(pass<sub>i</sub>)
            </>
          }
        />
      </div>
      <Note>
        {caption ??
          "One shared pass head scores every teammate, so the policy is invariant to which physical player occupies slot i: the fix for variable-identity pass actions."}
      </Note>
    </figure>
  );
}

/* MetricBars --------------------------------------------------------------- */

export function MetricBars({
  title = "Measured",
  bars,
  caption,
}: {
  title?: string;
  bars: { label: string; value: number; display?: string; accent?: boolean }[];
  caption?: string;
}) {
  const max = Math.max(...bars.map((b) => Math.abs(b.value)), 0.0001);
  return (
    <figure className={PLATE}>
      <Kicker label={title} />
      <div className="relative border-l border-frame/50 pl-4">
        {/* faint graduation ticks along the top edge */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1.5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, var(--line) 0, var(--line) 1px, transparent 1px, transparent 44px)",
          }}
        />
        <ul className="space-y-4 pt-4">
          {bars.map((b) => {
            const pct = Math.max(2, (Math.abs(b.value) / max) * 100);
            return (
              <li key={b.label}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-prose text-[13px] text-ink">
                    {b.label}
                  </span>
                  <span
                    className={`font-anno text-[11.5px] tabular-nums ${b.accent ? "text-red" : "text-ink-soft"}`}
                  >
                    {b.display ?? String(b.value)}
                  </span>
                </div>
                <div className="mt-1.5 h-[5px] w-full">
                  <div
                    className={`h-[5px] ${b.accent ? "bg-red" : "bg-ink-soft/35"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {caption ? <Note>{caption}</Note> : null}
    </figure>
  );
}

/* SystemGraph -------------------------------------------------------------- */

/** Layered node graph: tiers of nodes wired by named topic/message buses,
    flowing top→bottom. Accent a tier (or a single node) in red to mark
    authored code against a vendor/platform substrate. Reads as a real ROS2
    graph; stacks cleanly on mobile. */
export function SystemGraph({
  label = "Node graph",
  tiers,
  caption,
}: {
  label?: string;
  tiers: {
    lane: string;
    accent?: boolean;
    nodes: { name: string; sub?: string; accent?: boolean }[];
    edge?: string;
  }[];
  caption?: string;
}) {
  return (
    <figure className={PLATE}>
      <Kicker label={label} />
      <div className="flex flex-col">
        {tiers.map((t, ti) => (
          <Fragment key={t.lane}>
            <div
              className={`border p-3 ${t.accent ? "border-red bg-red-wash/25" : "border-line bg-paper"}`}
            >
              <p
                className={`mb-2.5 font-anno text-[9.5px] uppercase tracking-[0.16em] ${t.accent ? "text-red" : "text-graphite"}`}
              >
                {t.lane}
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                {t.nodes.map((n) => {
                  const red = n.accent ?? t.accent;
                  return (
                    <div
                      key={n.name}
                      className={`flex-1 border bg-paper px-2.5 py-2 text-center ${red ? "border-red/70" : "border-line"}`}
                    >
                      <div
                        className={`font-anno text-[11.5px] font-medium leading-tight ${red ? "text-red" : "text-ink"}`}
                      >
                        {n.name}
                      </div>
                      {n.sub ? (
                        <div className="mt-1 font-anno text-[9px] leading-snug text-graphite">
                          {n.sub}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
            {ti < tiers.length - 1 ? (
              <div className="flex flex-col items-center gap-1 py-2 text-graphite">
                <Arrow dir="down" />
                {t.edge ? (
                  <span className="max-w-full px-2 text-center font-anno text-[9.5px] leading-snug text-graphite">
                    {t.edge}
                  </span>
                ) : null}
              </div>
            ) : null}
          </Fragment>
        ))}
      </div>
      {caption ? <Note>{caption}</Note> : null}
    </figure>
  );
}

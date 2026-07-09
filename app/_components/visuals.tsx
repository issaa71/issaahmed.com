import { Fragment } from "react";
import { Play, Clapperboard, Workflow } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   Proof visuals — an editorial "lab-journal / scientific-figure" language for
   conveying project work: narrated-video + diagram PLACEHOLDERS (1:1 swappable
   with the real components once assets exist) and REAL build-now diagrams.

   Design intent (warm-paper, emerald, Fraunces display, Geist mono):
   - Every proof NUMBER is set in the display serif — characterful, not chart-y.
   - Connectors are hairline custom marks, never chunky chevrons.
   - Each figure wears a mono "kicker" label, like a numbered plate in a paper.
   - Data viz stays calm + precise; placeholders carry a little signature
     character (film-reel edge, registration marks) so a visitor knows a real
     asset is coming, and it still looks deliberate.

   SWAP CONTRACT
   - <VideoPlaceholder title="…" covers="…" />  ⇄  <YouTubeEmbed id="…" title="…" caption="…" />
   - <DiagramPlaceholder title="…" shows="…" /> ⇄  <Figure src="…" alt="…" caption="…" … />

   All components are server-safe (no hooks / browser APIs).
   ────────────────────────────────────────────────────────────────────────── */

/* Shared chrome ----------------------------------------------------------- */

// Plate: warm card with a layered lift and a hairline lit top edge.
const PLATE =
  "relative overflow-hidden rounded-2xl border border-border bg-surface " +
  "shadow-[0_1px_1px_rgba(28,26,23,0.03),0_4px_10px_-5px_rgba(28,26,23,0.08),0_22px_44px_-26px_rgba(28,26,23,0.22)] " +
  "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-white/70 before:content-['']";

function Kicker({ label }: { label: string }) {
  return (
    <p className="mb-5 flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">
      <span aria-hidden className="inline-block h-3 w-px bg-accent" />
      {label}
    </p>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <figcaption className="mt-5 border-t border-border/70 pt-4 text-xs leading-relaxed text-faint">
      {children}
    </figcaption>
  );
}

// Hairline arrow — horizontal on sm+, vertical when stacked.
function Arrow({ vertical = false }: { vertical?: boolean }) {
  if (vertical) {
    return (
      <svg width="9" height="22" viewBox="0 0 9 22" className="text-accent/45" aria-hidden>
        <line x1="4.5" y1="0" x2="4.5" y2="15" stroke="currentColor" strokeWidth="1" />
        <path d="M1.5 14.5 L4.5 20 L7.5 14.5" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    );
  }
  return (
    <svg width="26" height="9" viewBox="0 0 26 9" className="text-accent/45" aria-hidden>
      <line x1="0" y1="4.5" x2="19" y2="4.5" stroke="currentColor" strokeWidth="1" />
      <path d="M18.5 1.5 L24 4.5 L18.5 7.5" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

// Engineering crop-mark corners for placeholder plates.
function CropMarks() {
  return (
    <>
      <span aria-hidden className="absolute left-3 top-3 h-2.5 w-2.5 border-l border-t border-accent/30" />
      <span aria-hidden className="absolute right-3 top-3 h-2.5 w-2.5 border-r border-t border-accent/30" />
      <span aria-hidden className="absolute bottom-3 left-3 h-2.5 w-2.5 border-b border-l border-accent/30" />
      <span aria-hidden className="absolute bottom-3 right-3 h-2.5 w-2.5 border-b border-r border-accent/30" />
    </>
  );
}

/* Placeholders ------------------------------------------------------------ */

/* A narrated walkthrough not yet recorded — styled as a film "reel" card with
   sprocket edges so it reads as an intentional video slot, not a broken embed.
   Record it, upload unlisted to YouTube, then swap for <YouTubeEmbed>. */
export function VideoPlaceholder({
  title,
  covers,
  lengthHint,
  caption,
}: {
  title: string;
  covers?: string;
  lengthHint?: string;
  caption?: string;
}) {
  const sprocket = {
    backgroundImage:
      "repeating-linear-gradient(to bottom, transparent 0 9px, var(--border) 9px 15px)",
  };
  return (
    <figure className={PLATE}>
      <div className="relative flex aspect-video items-center justify-center overflow-hidden">
        <span
          aria-hidden
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(120% 130% at 50% -15%, var(--accent-soft) 0%, transparent 55%)",
          }}
        />
        <span aria-hidden className="absolute inset-y-0 left-0 w-3 opacity-60" style={sprocket} />
        <span aria-hidden className="absolute inset-y-0 right-0 w-3 opacity-60" style={sprocket} />
        <div className="relative flex flex-col items-center gap-4 px-10 text-center">
          <span className="relative flex h-16 w-16 items-center justify-center">
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-accent/15 motion-safe:animate-[glow-pulse_3.2s_ease-in-out_infinite]"
            />
            <span aria-hidden className="absolute inset-1.5 rounded-full border border-accent/30" />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-accent text-surface shadow-[0_10px_22px_-6px_rgba(4,120,87,0.6)]">
              <Play size={20} className="ml-0.5" fill="currentColor" aria-hidden />
            </span>
          </span>
          <span>
            <span className="block font-display text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
              {title}
            </span>
            <span className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-pulse" />
              Recording soon
              {lengthHint ? <span className="text-faint">· {lengthHint}</span> : null}
            </span>
          </span>
        </div>
      </div>
      <figcaption className="flex items-start gap-2.5 border-t border-border bg-surface px-5 py-3.5 text-xs text-muted">
        <Clapperboard size={13} className="mt-0.5 shrink-0 text-accent" aria-hidden />
        <span>
          <span className="font-medium text-foreground/90">Narrated walkthrough</span>
          {covers ? <span> — {covers}</span> : null}
          {caption ? <span className="ml-1">{caption}</span> : null}
        </span>
      </figcaption>
    </figure>
  );
}

/* A figure that needs a real captured asset (screenshot / photo / export).
   Reach for this only when FlowDiagram / Timeline / etc. can't draw it in code. */
export function DiagramPlaceholder({
  title,
  shows,
  caption,
}: {
  title: string;
  shows?: string;
  caption?: string;
}) {
  return (
    <figure className={PLATE}>
      <div className="relative flex aspect-video items-center justify-center overflow-hidden px-10 text-center">
        <span
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <CropMarks />
        <div className="relative flex flex-col items-center gap-3.5">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-dashed border-accent/40 bg-surface text-accent">
            <Workflow size={20} aria-hidden />
          </span>
          <span>
            <span className="block font-display text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
              {title}
            </span>
            {shows ? (
              <span className="mt-1.5 block max-w-sm text-xs leading-relaxed text-muted">
                {shows}
              </span>
            ) : null}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
            Figure to come
          </span>
        </div>
      </div>
      <figcaption className="flex items-start gap-2.5 border-t border-border bg-surface px-5 py-3.5 text-xs text-muted">
        <Workflow size={13} className="mt-0.5 shrink-0 text-accent" aria-hidden />
        <span>
          <span className="font-medium text-foreground/90">Diagram</span>
          {caption ? <span> — {caption}</span> : null}
        </span>
      </figcaption>
    </figure>
  );
}

/* Real, build-now diagrams ------------------------------------------------ */

/* Sequential process — open stages (serif index, no boxes) joined by hairline
   arrows. Mark a stage accent to highlight it. */
export function FlowDiagram({
  steps,
  caption,
  label = "Process",
}: {
  steps: { label: string; sub?: string; accent?: boolean }[];
  caption?: string;
  label?: string;
}) {
  return (
    <figure className={`${PLATE} p-6 sm:p-7`}>
      <Kicker label={label} />
      <ol className="flex flex-col items-stretch sm:flex-row sm:items-center">
        {steps.map((s, i) => (
          <Fragment key={s.label}>
            <li className="flex flex-1 flex-col items-center gap-1 px-2 py-2 text-center">
              <span
                className={`font-display text-sm font-semibold tabular-nums ${
                  s.accent ? "text-accent" : "text-faint"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`text-sm font-semibold tracking-tight ${
                  s.accent ? "text-accent" : "text-foreground"
                }`}
              >
                {s.label}
              </span>
              {s.sub ? (
                <span className="font-mono text-[10.5px] leading-snug text-muted">
                  {s.sub}
                </span>
              ) : null}
            </li>
            {i < steps.length - 1 ? (
              <span className="flex shrink-0 items-center justify-center py-1 sm:px-1 sm:py-0">
                <span className="hidden sm:block">
                  <Arrow />
                </span>
                <span className="sm:hidden">
                  <Arrow vertical />
                </span>
              </span>
            ) : null}
          </Fragment>
        ))}
      </ol>
      {caption ? <Note>{caption}</Note> : null}
    </figure>
  );
}

/* Event-driven state machine — pill state nodes with labeled hairline
   transitions, plus a titled transition legend for the priority-arbitrated
   back-edges. */
export function FsmDiagram({
  states,
  events,
  caption,
  label = "State machine",
}: {
  states: { name: string; role: string; via?: string }[];
  events: string[];
  caption?: string;
  label?: string;
}) {
  return (
    <figure className={`${PLATE} p-6 sm:p-7`}>
      <Kicker label={label} />
      <ol className="flex flex-col items-stretch sm:flex-row sm:items-start">
        {states.map((s, i) => (
          <Fragment key={s.name}>
            <li className="flex flex-1 flex-col items-center gap-1.5 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft/30 px-3.5 py-1.5">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-mono text-[12px] font-semibold tracking-wide text-foreground">
                  {s.name}
                </span>
              </span>
              <span className="text-[11px] leading-snug text-muted">{s.role}</span>
            </li>
            {i < states.length - 1 ? (
              <span className="flex shrink-0 flex-col items-center gap-1 self-center py-1.5 sm:w-20 sm:self-start sm:pt-2.5">
                <span className="hidden sm:block">
                  <Arrow />
                </span>
                <span className="sm:hidden">
                  <Arrow vertical />
                </span>
                {states[i + 1].via ? (
                  <span className="max-w-[6rem] text-center font-mono text-[9.5px] leading-tight text-faint">
                    {states[i + 1].via}
                  </span>
                ) : null}
              </span>
            ) : null}
          </Fragment>
        ))}
      </ol>
      {events.length ? (
        <div className="mt-6 border-t border-border/70 pt-4">
          <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
            Transitions
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
            {events.map((e) => (
              <li key={e} className="flex items-center gap-2 font-mono text-[11px] text-muted">
                <span aria-hidden className="h-1 w-1 rounded-full bg-accent/60" />
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

/* Two-column before/after — a hairline-divided ledger with big serif metrics;
   the "after" side is emerald-highlighted. */
type ComparePanelData = {
  tag: string;
  title: string;
  points: string[];
  metric: string;
  metricLabel: string;
};

function ComparePanel({
  data,
  accent = false,
}: {
  data: ComparePanelData;
  accent?: boolean;
}) {
  return (
    <div className={`flex flex-col p-5 ${accent ? "bg-accent-soft/45" : "bg-surface"}`}>
      <span
        className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
          accent ? "text-accent" : "text-faint"
        }`}
      >
        {data.tag}
      </span>
      <span className="mt-2 text-sm font-medium text-foreground">{data.title}</span>
      <ul className="mt-2.5 space-y-1.5">
        {data.points.map((p) => (
          <li key={p} className="flex gap-2 text-xs leading-relaxed text-muted">
            <span
              aria-hidden
              className={`mt-[7px] h-1 w-1 shrink-0 rounded-full ${
                accent ? "bg-accent" : "bg-faint/60"
              }`}
            />
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-baseline gap-2">
        <span
          className={`font-display text-[2.5rem] font-semibold leading-none tracking-tight tabular-nums ${
            accent ? "text-accent" : "text-foreground"
          }`}
        >
          {data.metric}
        </span>
        <span className="text-[11px] uppercase tracking-wide text-faint">
          {data.metricLabel}
        </span>
      </div>
    </div>
  );
}

export function BeforeAfter({
  before,
  after,
  caption,
  label = "Before / after",
}: {
  before: ComparePanelData;
  after: ComparePanelData;
  caption?: string;
  label?: string;
}) {
  return (
    <figure className={`${PLATE} p-6 sm:p-7`}>
      <Kicker label={label} />
      <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
        <ComparePanel data={before} />
        <ComparePanel data={after} accent />
      </div>
      {caption ? <Note>{caption}</Note> : null}
    </figure>
  );
}

/* Single-axis ranking as a refined dot-plot (lollipop) — value in the display
   serif, a hairline track, a ringed end-dot; the winner in emerald. */
export function MetricBars({
  title,
  bars,
  caption,
}: {
  title?: string;
  bars: { label: string; value: number; display?: string; accent?: boolean }[];
  caption?: string;
}) {
  const max = Math.max(...bars.map((b) => Math.abs(b.value)), 0.0001);
  return (
    <figure className={`${PLATE} p-6 sm:p-7`}>
      <Kicker label={title ?? "Measured"} />
      <ul className="space-y-5">
        {bars.map((b) => {
          const pct = Math.max(4, (Math.abs(b.value) / max) * 100);
          return (
            <li key={b.label} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4">
              <span
                className={`text-[13px] ${
                  b.accent ? "font-medium text-foreground" : "text-muted"
                }`}
              >
                {b.label}
              </span>
              <span
                className={`font-display text-xl font-semibold tabular-nums ${
                  b.accent ? "text-accent" : "text-foreground/80"
                }`}
              >
                {b.display ?? String(b.value)}
              </span>
              <span className="col-span-2 mt-2.5">
                <span className="relative block h-px w-full bg-border">
                  <span
                    className={`absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full ${
                      b.accent ? "bg-accent" : "bg-faint/45"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                  <span
                    className={`absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ring-2 ring-surface ${
                      b.accent ? "bg-accent" : "bg-faint/70"
                    }`}
                    style={{ left: `calc(${pct}% - 5px)` }}
                  />
                </span>
              </span>
            </li>
          );
        })}
      </ul>
      {caption ? <Note>{caption}</Note> : null}
    </figure>
  );
}

/* Vertical milestone timeline — serif years, ringed nodes that punch through
   the rail; accent milestones get a filled node. */
export function Timeline({
  items,
  caption,
  label = "Timeline",
}: {
  items: { year: string; title: string; detail?: string; accent?: boolean }[];
  caption?: string;
  label?: string;
}) {
  return (
    <figure className={`${PLATE} p-6 sm:p-7`}>
      <Kicker label={label} />
      <ol className="relative ml-2 space-y-7 border-l border-border pl-7">
        {items.map((it) => (
          <li key={`${it.year}-${it.title}`} className="relative">
            <span
              aria-hidden
              className={`absolute -left-[34px] top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full ring-4 ring-surface ${
                it.accent ? "bg-accent" : "border border-accent/55 bg-surface"
              }`}
            >
              {it.accent ? <span className="h-1.5 w-1.5 rounded-full bg-surface" /> : null}
            </span>
            <span className="font-display text-base font-semibold tracking-tight text-accent">
              {it.year}
            </span>
            <p className="mt-0.5 text-[15px] font-medium leading-snug text-foreground">
              {it.title}
            </p>
            {it.detail ? (
              <p className="mt-1 text-sm leading-relaxed text-muted">{it.detail}</p>
            ) : null}
          </li>
        ))}
      </ol>
      {caption ? <Note>{caption}</Note> : null}
    </figure>
  );
}

/* Per-Entity Deep Sets forward pass — a shared ball-handler context fans into
   two color-coded lanes (emerald = shoot, neutral = pass), each with hairline
   stage connectors. Conveys the fan-out → pool/per-entity → two-head topology
   prose can't. */
const DS_NODE =
  "rounded-lg border px-3 py-2 text-center text-[12px] leading-snug";

function DsStage({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: "input" | "muted" | "shoot" | "pass";
}) {
  const cls =
    tone === "shoot"
      ? "border-accent/40 bg-accent-soft/45 font-medium text-accent"
      : tone === "pass"
        ? "border-border bg-background font-medium text-foreground"
        : tone === "input"
          ? "border-border bg-background text-foreground"
          : "border-border bg-surface text-muted";
  return <div className={`${DS_NODE} ${cls}`}>{children}</div>;
}

function DsLane({
  head,
  accent,
  steps,
  out,
  outTone,
}: {
  head: string;
  accent?: boolean;
  steps: { t: React.ReactNode; s?: string }[];
  out: React.ReactNode;
  outTone: "shoot" | "pass";
}) {
  return (
    <div className="flex flex-col items-center">
      <p
        className={`mb-3 font-mono text-[10px] uppercase tracking-[0.2em] ${
          accent ? "text-accent" : "text-faint"
        }`}
      >
        {head}
      </p>
      <div className="w-full max-w-[15rem]">
        {steps.map((st, i) => (
          <Fragment key={i}>
            <DsStage tone="muted">
              <span>{st.t}</span>
              {st.s ? <span className="block font-mono text-[10px] text-faint">{st.s}</span> : null}
            </DsStage>
            <div className="flex justify-center py-1">
              <Arrow vertical />
            </div>
          </Fragment>
        ))}
        <DsStage tone={outTone}>{out}</DsStage>
      </div>
    </div>
  );
}

export function DeepSetsDiagram({
  caption,
  label = "Architecture · forward pass",
}: {
  caption?: string;
  label?: string;
}) {
  return (
    <figure className={`${PLATE} p-6 sm:p-7`}>
      <Kicker label={label} />
      <div className="mx-auto w-full max-w-[15rem]">
        <DsStage tone="input">
          <span className="font-medium text-foreground">Ball-handler state</span>
          <span className="block font-mono text-[10px] text-faint">
            context — feeds both heads
          </span>
        </DsStage>
      </div>
      <div className="flex justify-center py-1">
        <Arrow vertical />
      </div>
      <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
        <DsLane
          head="Shoot path"
          accent
          outTone="shoot"
          steps={[
            { t: "5 defenders" },
            {
              t: (
                <>
                  φ<sub>defender</sub> — shared
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
          outTone="pass"
          steps={[
            { t: "4 teammates" },
            {
              t: (
                <>
                  φ<sub>teammate</sub> — shared
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
          "One shared pass head scores every teammate, so the policy is invariant to which physical player occupies slot i — the fix for variable-identity pass actions."}
      </Note>
    </figure>
  );
}

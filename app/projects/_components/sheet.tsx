import Link from "next/link";
import {
  TopBar,
  TitleBlockFooter,
  Stamp,
  type StampTone,
} from "../../_components/drafting";

/* ──────────────────────────────────────────────────────────────────────────
   REDLINE case-study shell — each project is a numbered sheet. Prose lives in
   a 46rem column; wide elements use the `.breakout` utility. The <article>
   drives the § (section) and FIG. (figure) CSS counters.

   NOTE: the old app/projects/_components/case-study.tsx is intentionally left
   in place so the not-yet-migrated pages keep compiling. New/migrated pages
   import from THIS file.
   ────────────────────────────────────────────────────────────────────────── */

export function SheetShell({
  sheetNo,
  sheetCount,
  eyebrow,
  title,
  tagline,
  meta,
  status,
  children,
}: {
  sheetNo: string;
  sheetCount: string;
  eyebrow: string;
  title: string;
  tagline: string;
  meta: string;
  status?: { label: string; tone?: StampTone; pulse?: boolean }[];
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col bg-paper text-ink">
      <TopBar variant="case" sheet={`SHT ${sheetNo} / ${sheetCount}`} />

      <main className="mx-auto w-full max-w-[46rem] flex-1 px-6 lg:px-10">
        <header className="pt-14 pb-10">
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
            <span className="font-anno text-[10.5px] uppercase tracking-[0.16em] text-red">
              {eyebrow}
            </span>
            <span className="font-anno text-[10.5px] uppercase tracking-[0.16em] text-graphite">
              SHT {sheetNo} OF {sheetCount}
            </span>
          </div>
          <h1
            className="wide mt-6 font-struct text-[clamp(2rem,5.5vw,3.3rem)] uppercase leading-[1.02] text-ink"
            style={{ fontWeight: 750 }}
          >
            {title}
          </h1>
          <p className="mt-5 font-prose text-[18px] leading-[1.65] text-ink">
            {tagline}
          </p>
          <p className="mt-4 font-anno text-[11px] text-graphite">{meta}</p>
          {status?.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {status.map((s, i) => (
                <Stamp key={i} tone={s.tone ?? "ink"} pulse={s.pulse}>
                  {s.label}
                </Stamp>
              ))}
            </div>
          ) : null}
        </header>

        <article className="rl-article space-y-16 pb-16">{children}</article>

        <div className="pb-10">
          <Link
            href="/#index"
            className="font-anno text-[11px] uppercase tracking-[0.14em] text-graphite transition-colors hover:text-red"
          >
            ← INDEX
          </Link>
        </div>
      </main>

      <TitleBlockFooter sheet={`SHT ${sheetNo}`} />
    </div>
  );
}

/** Case-study section — auto-numbered §, hairline top rule, serif prose body. */
export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-baseline gap-3 border-t border-line pt-5">
        <span className="sec-num shrink-0 font-anno text-[10.5px] uppercase tracking-[0.16em] text-red" />
        <h2
          className="font-struct text-[20px] leading-tight text-ink"
          style={{ fontWeight: 650 }}
        >
          {title}
        </h2>
      </div>
      <div className="rl-prose mt-4 space-y-4 font-prose text-[16.5px] leading-[1.75] text-ink">
        {children}
      </div>
    </section>
  );
}

/* Re-exports so pages import everything from one place ---------------------- */

export {
  Callout,
  CalloutStrip,
  Stamp,
  LiveBar,
  Ref,
  RefRow,
  EquipList,
  NoteBlock,
  RevBlock,
  DimensionedName,
  TitleBlockFooter,
  TopBar,
  PulseDot,
} from "../../_components/drafting";
export type { StampTone, RevRow } from "../../_components/drafting";

export {
  FigurePlate,
  Reel,
  VideoGrid,
  DataTable,
  PlaceholderPlate,
} from "../../_components/plates";

export {
  FlowDiagram,
  FsmDiagram,
  Timeline,
  DeepSetsDiagram,
  MetricBars,
} from "../../_components/diagrams";

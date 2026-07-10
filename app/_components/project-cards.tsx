import Link from "next/link";
import Image from "next/image";
import { Stamp } from "./drafting";
import { PROJECTS } from "../_data/site";

/* ──────────────────────────────────────────────────────────────────────────
   REDLINE project cards — the shared sheet data + card chrome used by BOTH the
   home page (compact ProjectGrid) and the /projects sheet index (full-width
   ProjectSheetList). Server components only (no client hooks).

   Every fact/number/string in SHEETS + PHOTO is carried verbatim from the
   original app/page.tsx (spec §6/§8); titles + blurbs are pulled from PROJECTS
   (site.ts) at render so numbers can't drift between two copies.
   ────────────────────────────────────────────────────────────────────────── */

type Spec = { label: string; value: string };
type CardStamp = { label: string; tone: "red" | "ink"; pulse?: boolean };

type Sheet = {
  no: string;
  slug: string;
  category: string;
  role: string;
  specs: Spec[];
  stamps: CardStamp[];
  live?: string; // RUN LIVE target — external when it starts with http
  flip: boolean; // on lg, photo moves to the right on flipped rows
};

/* Ordered 01–06 to match the sheet numbering (spec §9). Titles + blurbs are
   pulled verbatim from PROJECTS (site.ts) at render; everything here is the
   §6 presentation layer. Spec-row values keep their exact case; labels/roles/
   categories are up-cased by the mono utilities. */
export const SHEETS: Sheet[] = [
  {
    no: "01",
    slug: "reclaim",
    category: "Robotics · ROS2 · Computer Vision",
    role: "Team of 4 — I owned perception + control",
    specs: [
      { label: "Nav missions", value: "15/15 (re-benchmark)" },
      { label: "Perception", value: "30 FPS on Jetson" },
      { label: "Placement", value: "3rd overall · 1st in AI division" },
    ],
    stamps: [
      { label: "As built", tone: "ink" },
      { label: "Live", tone: "red", pulse: true },
    ],
    live: "https://reclaim-nav-sim.vercel.app",
    flip: false,
  },
  {
    no: "02",
    slug: "assistive-wheelchair",
    category: "Robotics · ROS2 · Nav2 · Computer Vision",
    role: "Designed & built end-to-end",
    specs: [
      { label: "Room-to-room", value: "route via Nav2" },
      { label: "Hazard detection", value: "10 Hz OpenCV" },
      { label: "Arrival", value: "QR-verified" },
    ],
    stamps: [
      { label: "As built", tone: "ink" },
      { label: "Live", tone: "red", pulse: true },
    ],
    live: "/projects/assistive-wheelchair#sim",
    flip: true,
  },
  {
    no: "03",
    slug: "tha-pain-prediction",
    category: "Clinical ML · Published",
    role: "2nd of 7 authors — the only engineer",
    specs: [
      { label: "Journal", value: "J. Arthroplasty 2026" },
      { label: "Best T3 MSE", value: "2.70 vs 3.07 baseline" },
      { label: "Patients", value: "513 (SAFE-T cohort)" },
    ],
    stamps: [{ label: "Published", tone: "red" }],
    flip: false,
  },
  {
    no: "04",
    slug: "nba-shot-selection",
    category: "Reinforcement learning",
    role: "Solo course project",
    specs: [
      { label: "Vs NBA selection", value: "+0.19 to +0.32 PPS (real outcomes)" },
      { label: "Shot-quality model", value: "AUC 0.733" },
      { label: "Trained on", value: "116,928 possessions" },
    ],
    stamps: [
      { label: "Audited & regrounded", tone: "ink" },
      { label: "Live", tone: "red", pulse: true },
    ],
    live: "https://nba-rl-sim.vercel.app",
    flip: true,
  },
  {
    no: "05",
    slug: "glenoid-classifier",
    category: "Clinical ML",
    role: "Solo project",
    specs: [
      { label: "Healthy-vs-diseased", value: "~91% · AUC 0.98" },
      { label: "Walch classes", value: "6" },
      { label: "End-to-end 6-way", value: "~63% (honest)" },
    ],
    stamps: [
      { label: "Live", tone: "red", pulse: true },
      { label: "In-browser model", tone: "ink" },
    ],
    live: "/projects/glenoid-classifier#calculator",
    flip: false,
  },
  {
    no: "06",
    slug: "no-fly-list-kids",
    category: "Advocacy · Policy",
    role: "Coalition member since 2017",
    specs: [
      { label: "Legislation", value: "Bill C-59 · passed 2019" },
      { label: "Redress funding", value: "$81M (2018 budget)" },
      { label: "Op-ed", value: "Toronto Star · sole author" },
    ],
    stamps: [{ label: "Ongoing", tone: "ink" }],
    flip: true,
  },
];

/* Reused photography — alt text carried verbatim from the current page.tsx. */
export const PHOTO: Record<
  string,
  { src: string; alt: string; width: number; height: number }
> = {
  reclaim: {
    src: "/projects/reclaim/demo.jpg",
    alt: "The RECLAIM robot on the capstone showcase floor — drive base, sensor mast, and 4-DOF sorting arm",
    width: 768,
    height: 1024,
  },
  "assistive-wheelchair": {
    src: "/projects/assistive-wheelchair/tile.jpg",
    alt: "The assistive-navigation robot on its taped test course, red-tape waypoint markers on a white foam-board floor",
    width: 1500,
    height: 1000,
  },
  "nba-shot-selection": {
    src: "/projects/nba-shot-selection/decision-maps-tile.png",
    alt: "Court-zone heatmaps of learned shoot probability for the DQN and Dueling DQN agents — high near the basket, suppressed in mid-range",
    width: 2330,
    height: 1850,
  },
};

/* ── Public renderers ─────────────────────────────────────────────────────── */

/** The six full-width stacked sheet cards — the detailed /projects index. */
export function ProjectSheetList() {
  return (
    <div className="mt-8 space-y-10">
      {SHEETS.map((s) => (
        <SheetCard key={s.slug} sheet={s} />
      ))}
    </div>
  );
}

/** Compact three-up grid of all six sheets — the home-page index at a glance. */
export function ProjectGrid() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SHEETS.map((s) => (
        <GridCard key={s.slug} sheet={s} />
      ))}
    </div>
  );
}

/* A compact index cell: media on top, then SHT · category, the title (the whole
   card is its link via the inset-0 ::after overlay), and a stamp row. */
function GridCard({ sheet }: { sheet: Sheet }) {
  const proj = PROJECTS.find((p) => p.slug === sheet.slug);
  if (!proj) return null;
  const { no, slug, category, stamps, live } = sheet;
  const first = stamps[0];
  // The status stamp already carries LIVE for the always-on tools (e.g.
  // Glenoid); only add a separate Live pip when the lead stamp doesn't pulse.
  const showLive = Boolean(live) && !first?.pulse;

  return (
    <article className="group relative flex flex-col border border-line bg-plate transition-colors hover:border-red/40">
      {/* media */}
      <div className="relative aspect-[3/2] overflow-hidden border-b border-line">
        <CardMedia slug={slug} />
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="flex flex-wrap items-center gap-x-2">
          <span className="anno-red">SHT {no}</span>
          <span aria-hidden className="text-line">
            ·
          </span>
          <span className="anno">{category}</span>
        </p>

        <h3 className="mt-2 font-struct text-[17px] font-bold leading-[1.2] tracking-tight text-ink">
          <Link
            href={`/projects/${slug}`}
            className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-red"
          >
            <span className="sr-only">Open sheet — </span>
            {proj.title}
          </Link>
        </h3>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
          {first ? (
            <Stamp tone={first.tone} pulse={first.pulse}>
              {first.label}
            </Stamp>
          ) : null}
          {showLive ? (
            <Stamp tone="red" pulse>
              Live
            </Stamp>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/* A full-width sheet card: photo one side, spec sheet the other. The whole card
   links to the case page via the OPEN SHEET link's inset-0 ::after overlay; the
   external RUN LIVE button rides above it on z-10 (spec §6). */
function SheetCard({ sheet }: { sheet: Sheet }) {
  const proj = PROJECTS.find((p) => p.slug === sheet.slug);
  if (!proj) return null;
  const { no, slug, category, role, specs, stamps, live, flip } = sheet;
  const external = live ? /^https?:/.test(live) : false;

  const runLiveClass =
    "relative z-10 inline-flex items-center gap-1.5 rounded-[2px] border-[1.5px] border-red px-3 py-1.5 font-anno text-[10.5px] uppercase tracking-[0.12em] text-red transition-colors hover:bg-red-wash";

  return (
    <article
      className={`group relative grid border border-line bg-plate lg:min-h-[26rem] ${
        flip ? "lg:grid-cols-[5fr_7fr]" : "lg:grid-cols-[7fr_5fr]"
      }`}
    >
      {/* media */}
      <div
        className={`relative aspect-[3/2] overflow-hidden lg:row-start-1 lg:aspect-auto ${
          flip ? "lg:col-start-2" : "lg:col-start-1"
        }`}
      >
        <CardMedia slug={slug} />
      </div>

      {/* spec sheet */}
      <div
        className={`flex flex-col border-t border-line p-7 lg:row-start-1 lg:border-t-0 ${
          flip ? "lg:col-start-1 lg:border-r" : "lg:col-start-2 lg:border-l"
        }`}
      >
        <p className="flex flex-wrap items-center gap-x-2">
          <span className="anno-red">SHT {no}</span>
          <span aria-hidden className="text-line">
            ·
          </span>
          <span className="anno">{category}</span>
        </p>

        <h3 className="mt-3 font-struct text-[26px] font-bold leading-[1.1] tracking-tight text-ink sm:text-[28px]">
          {proj.title}
        </h3>
        <p className="mt-1.5 font-anno text-[10.5px] uppercase tracking-[0.14em] text-red">
          {role}
        </p>
        <p className="mt-3 font-prose text-[15px] leading-relaxed text-ink-soft/95">
          {proj.blurb}
        </p>

        <div className="mt-auto pt-6">
          <dl className="border-t border-line">
            {specs.map((s) => (
              <div
                key={s.label}
                className="flex items-baseline justify-between gap-4 border-b border-line py-2 last:border-b-0"
              >
                <dt className="shrink-0 font-anno text-[11px] uppercase tracking-[0.12em] text-graphite">
                  {s.label}
                </dt>
                <dd className="text-right font-anno text-[11px] tabular-nums text-ink">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {stamps.map((s) => (
              <Stamp key={s.label} tone={s.tone} pulse={s.pulse}>
                {s.label}
              </Stamp>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Link
              href={`/projects/${slug}`}
              className="font-anno text-[10.5px] uppercase tracking-[0.14em] text-ink transition-colors after:absolute after:inset-0 after:content-[''] hover:text-red"
            >
              <span className="sr-only">{proj.title} — </span>
              Open sheet
              <span
                aria-hidden
                className="ml-1 inline-block transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            {live ? (
              external ? (
                <a
                  href={live}
                  target="_blank"
                  rel="noreferrer"
                  className={runLiveClass}
                >
                  Run live ↗
                </a>
              ) : (
                <Link href={live} className={runLiveClass}>
                  Run live →
                </Link>
              )
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function CardMedia({ slug }: { slug: string }) {
  const photo = PHOTO[slug];
  if (photo) {
    // RECLAIM's source is portrait (768×1024) with the robot low in the frame;
    // bias the crop downward so the arm + bins stay in view on the wide cell.
    const position = slug === "reclaim" ? "object-[50%_70%]" : "object-center";
    return (
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        className={`absolute inset-0 h-full w-full object-cover ${position} transition-transform duration-500 group-hover:scale-[1.015]`}
      />
    );
  }

  if (slug === "tha-pain-prediction") {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-paper-deep p-6">
        <Image
          src="/projects/tha-pain-prediction/journal-cover.png"
          alt="Cover of The Journal of Arthroplasty — the 2026 issue featuring the peer-reviewed pain-prediction paper"
          width={237}
          height={298}
          className="h-[85%] max-h-[26rem] w-auto border border-line shadow-[0_10px_30px_-10px_rgba(28,26,23,0.45)] transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  if (slug === "glenoid-classifier") {
    return <GlenoidInstrument />;
  }

  // no-fly-list-kids
  return <NflkClipping />;
}

/* Bespoke line-art "instrument face" for the live Walch classifier: a three-tier
   decision tree (Screen → Type → Subtype) with the B2 route inked red. It fills
   the panel-driven cell (contain, centered). Decorative — name comes from the link. */
function GlenoidInstrument() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-plate p-6">
      <svg
        viewBox="0 0 360 330"
        fill="none"
        aria-hidden
        className="h-full w-auto max-w-full"
      >
        {/* tier headers */}
        <text
          x="16"
          y="34"
          fontSize={9}
          letterSpacing={1.4}
          className="fill-graphite font-anno"
        >
          SCREEN
        </text>
        <text
          x="16"
          y="166"
          fontSize={9}
          letterSpacing={1.4}
          className="fill-graphite font-anno"
        >
          TYPE
        </text>
        <text
          x="16"
          y="276"
          fontSize={9}
          letterSpacing={1.4}
          className="fill-graphite font-anno"
        >
          SUBTYPE
        </text>

        {/* connectors — ink */}
        <g strokeLinecap="round">
          <line x1="106" y1="84" x2="180" y2="84" strokeWidth={1} className="stroke-ink/45" />
          <line x1="106" y1="84" x2="106" y2="100" strokeWidth={1} className="stroke-ink/45" />
          <line x1="84" y1="152" x2="180" y2="152" strokeWidth={1} className="stroke-ink/45" />
          <line x1="254" y1="152" x2="276" y2="152" strokeWidth={1} className="stroke-ink/45" />
          <line x1="84" y1="152" x2="84" y2="178" strokeWidth={1} className="stroke-ink/45" />
          <line x1="276" y1="152" x2="276" y2="178" strokeWidth={1} className="stroke-ink/45" />
          {/* B → B3 (ink child), rail spans only B's two children */}
          <line x1="180" y1="246" x2="210" y2="246" strokeWidth={1} className="stroke-ink/45" />
          <line x1="210" y1="246" x2="210" y2="288" strokeWidth={1} className="stroke-ink/45" />
        </g>

        {/* connectors — red route (Screen → Diseased → B → B2) */}
        <g strokeLinecap="round">
          <line x1="180" y1="68" x2="180" y2="84" strokeWidth={1.5} className="stroke-red" />
          <line x1="180" y1="84" x2="254" y2="84" strokeWidth={1.5} className="stroke-red" />
          <line x1="254" y1="84" x2="254" y2="100" strokeWidth={1.5} className="stroke-red" />
          <line x1="254" y1="126" x2="254" y2="152" strokeWidth={1.5} className="stroke-red" />
          <line x1="180" y1="152" x2="254" y2="152" strokeWidth={1.5} className="stroke-red" />
          <line x1="180" y1="152" x2="180" y2="178" strokeWidth={1.5} className="stroke-red" />
          <line x1="180" y1="204" x2="180" y2="246" strokeWidth={1.5} className="stroke-red" />
          {/* fork left to B2 (the selected child) */}
          <line x1="150" y1="246" x2="180" y2="246" strokeWidth={1.5} className="stroke-red" />
          <line x1="150" y1="246" x2="150" y2="288" strokeWidth={1.5} className="stroke-red" />
        </g>

        {/* nodes */}
        <rect x="150" y="44" width="60" height="24" rx={2} strokeWidth={1} className="fill-none stroke-ink/55" />
        <rect x="64" y="100" width="84" height="26" rx={2} strokeWidth={1} className="fill-none stroke-ink/55" />
        <rect x="212" y="100" width="84" height="26" rx={2} strokeWidth={1.3} className="fill-none stroke-red" />
        <rect x="60" y="178" width="48" height="26" rx={2} strokeWidth={1} className="fill-none stroke-ink/55" />
        <rect x="156" y="178" width="48" height="26" rx={2} strokeWidth={1.3} className="fill-none stroke-red" />
        <rect x="252" y="178" width="48" height="26" rx={2} strokeWidth={1} className="fill-none stroke-ink/55" />
        <rect x="124" y="288" width="52" height="28" rx={2} strokeWidth={1.5} className="fill-red-wash stroke-red" />
        <rect x="184" y="288" width="52" height="28" rx={2} strokeWidth={1} className="fill-none stroke-ink/55" />

        {/* node labels */}
        <text x="106" y="113" textAnchor="middle" dominantBaseline="central" fontSize={8} letterSpacing={0.8} className="fill-graphite font-anno">
          HEALTHY
        </text>
        <text x="254" y="113" textAnchor="middle" dominantBaseline="central" fontSize={8} letterSpacing={0.8} className="fill-red font-anno">
          DISEASED
        </text>
        <text x="84" y="191" textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight={700} className="fill-ink font-struct">
          A
        </text>
        <text x="180" y="191" textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight={700} className="fill-red font-struct">
          B
        </text>
        <text x="276" y="191" textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight={700} className="fill-ink font-struct">
          E
        </text>
        <text x="150" y="302" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700} className="fill-red font-struct">
          B2
        </text>
        <text x="210" y="302" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700} className="fill-ink font-struct">
          B3
        </text>
      </svg>
    </div>
  );
}

/* Typeset op-ed "clipping" standing in for a broadcast still. */
function NflkClipping() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-paper-deep p-8">
      {/* SWAP CONTRACT: NFLK broadcast still to be issued. When Issa supplies the
          image, replace this typeset clipping with the broadcast still (add a
          descriptive alt); the newspaper-deck rules can stay as its caption. */}
      <figure className="w-full max-w-[22rem]">
        <div aria-hidden className="border-t border-ink/25" />
        <figcaption className="mt-3 font-anno text-[9.5px] uppercase tracking-[0.18em] text-graphite">
          Toronto Star · Op-ed · Sole author
        </figcaption>
        <p className="mt-2 font-prose text-[22px] italic leading-[1.25] text-ink">
          {"Grounded: what it’s like to be a No Fly List kid"}
        </p>
        <div aria-hidden className="mt-3 border-b border-ink/25" />
      </figure>
    </div>
  );
}

/* Pending SHT 07 — RideGuide, in preparation. Blueprint construction-line
   treatment, intentionally NOT linked (no rideguide route on the sheet index). */
export function PendingStrip() {
  return (
    <div className="mt-10 border-b border-t border-dashed border-blueprint-line py-6">
      <p className="font-anno text-[10px] uppercase tracking-[0.16em] text-blueprint">
        In preparation — SHT 07
      </p>
      <p className="mt-2 max-w-3xl font-prose text-[15px] leading-relaxed text-ink-soft">
        {
          "RideGuide — an AI transit assistant for the Greater Toronto & Hamilton Area: live arrivals, delays, and trip planning across 10 agencies, drawn from real-time GTFS-RT feeds and fronted by an LLM query pipeline. Full write-up on the way — more sheets to follow."
        }
      </p>
    </div>
  );
}

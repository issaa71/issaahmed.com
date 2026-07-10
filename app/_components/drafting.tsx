import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

/* ──────────────────────────────────────────────────────────────────────────
   REDLINE chrome. The drafting language lives here: hairlines, small mono
   labels, stamps, dimension marks. Prose stays large/serif/ink elsewhere.
   All components are server-safe (no client hooks). Max border-radius 3px.
   Bespoke inline SVG marks only: no icon library, no emoji.
   ────────────────────────────────────────────────────────────────────────── */

/* Shared primitives -------------------------------------------------------- */

/** 6px vermilion dot with a motion-safe ping: the "LIVE" affordance. */
export function PulseDot({ className }: { className?: string }) {
  return (
    <span className={`relative flex h-1.5 w-1.5 shrink-0 ${className ?? ""}`}>
      <span
        aria-hidden
        className="absolute inline-flex h-full w-full rounded-full bg-red opacity-60 motion-safe:animate-ping"
      />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red" />
    </span>
  );
}

/* 2 · TopBar --------------------------------------------------------------- */

const NAV_LINK =
  "inline-flex min-h-[40px] items-center font-anno text-[11px] uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-red";

/** Sticky header inside the frame. Home variant lists the page anchors; case
    variant (pass `sheet`, e.g. "SHT 01 / 06") shows the sheet id + INDEX/CONTACT. */
export function TopBar({
  variant = "home",
  sheet,
}: {
  variant?: "home" | "case";
  sheet?: string;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-[48px] max-w-[72rem] items-center justify-between gap-4 px-6 lg:px-10">
        <Link href="/" className="group flex items-baseline gap-1.5 py-2">
          <span className="font-struct text-[13px] font-bold uppercase tracking-[0.08em] text-ink transition-colors group-hover:text-red">
            Issa Ahmed
          </span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-5">
          {variant === "case" ? (
            <>
              {sheet ? (
                <span className="font-anno text-[11px] uppercase tracking-[0.12em] text-graphite">
                  {sheet}
                </span>
              ) : null}
              <Link href="/projects" className={NAV_LINK}>
                Projects
              </Link>
              <Link href="/#contact" className={NAV_LINK}>
                Contact
              </Link>
            </>
          ) : (
            <>
              <Link href="/projects" className={NAV_LINK}>
                Projects
              </Link>
              <a href="#notes" className={`${NAV_LINK} max-sm:hidden`}>
                Philosophy
              </a>
              <a href="#equipment" className={`${NAV_LINK} max-sm:hidden`}>
                Skills
              </a>
              <a href="#contact" className={NAV_LINK}>
                Contact
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

/* 3 · SiteFooter ----------------------------------------------------------- */

/** Minimal page footer: a single quiet copyright line. */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 px-6 pb-10 lg:px-10">
      <div className="mx-auto max-w-[72rem]">
        <p className="font-anno text-[10px] text-graphite">
          © {year} · Toronto, ON · Next.js + Vercel
        </p>
      </div>
    </footer>
  );
}

/* 4 · Stamp ---------------------------------------------------------------- */

export type StampTone = "red" | "ink" | "blue";

/** Inline certification/status stamp. The red tone tilts -1°. */
export function Stamp({
  tone = "ink",
  pulse = false,
  children,
  className,
}: {
  tone?: StampTone;
  pulse?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const tones: Record<StampTone, string> = {
    red: "border-red text-red bg-red-wash/40",
    ink: "border-ink-soft text-ink-soft",
    blue: "border-blueprint text-blueprint",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[2px] border-[1.5px] px-2 py-[3px] font-anno text-[10px] uppercase tracking-[0.14em] ${tones[tone]} ${className ?? ""}`}
    >
      {pulse ? <PulseDot /> : null}
      {children}
    </span>
  );
}

/* 5 · DimensionedName ------------------------------------------------------ */

/** The hero signature: real, selectable H1 text wrapped in drafting dimension
    chrome. The name is never opacity-animated; only the decorative strokes and
    label animate (motion-safe). The inline-block wrapper hugs the text width so
    the dimension line spans it exactly at every viewport. */
export function DimensionedName({ className }: { className?: string }) {
  return (
    <div className={`relative inline-block ${className ?? ""}`}>
      <h1 className="font-struct text-[clamp(2.05rem,10.5vw,7rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-ink">
        Issa Ahmed
      </h1>
    </div>
  );
}

/* 6 · Callout strip -------------------------------------------------------- */

/** Column count on md+: static class names so Tailwind's compiler can see them
    (it can't resolve dynamically-built strings). */
const CALLOUT_COLS: Record<2 | 3 | 4, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

/** Hairline-separated metric cells (not floating cards). */
export function CalloutStrip({
  children,
  cols = 3,
  className,
}: {
  children: React.ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-2 gap-px border border-line bg-line ${CALLOUT_COLS[cols]} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export function Callout({
  label,
  value,
  hint,
  accent = false,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-paper p-4">
      <div className="font-anno text-[10px] uppercase tracking-[0.16em] text-graphite">
        {label}
      </div>
      <div
        className={`mt-2 font-struct text-[28px] font-bold leading-none tabular-nums ${accent ? "text-red" : "text-ink"}`}
      >
        {value}
      </div>
      {hint ? (
        <div className="mt-1.5 font-prose text-[13px] leading-snug text-ink-soft/85">
          {hint}
        </div>
      ) : null}
    </div>
  );
}

/* 7 · RevBlock ------------------------------------------------------------- */

export type RevRow = {
  rev: string;
  description: React.ReactNode;
  date?: string;
  tone?: "ink" | "red";
};

/** The honesty-arc revision table. Replaces BeforeAfter. */
export function RevBlock({
  rows,
  context,
  caption,
  className,
}: {
  rows: RevRow[];
  context?: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={`border border-line bg-paper ${className ?? ""}`}>
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2">
        <span className="anno">Revisions</span>
        {context ? <span className="anno text-graphite">{context}</span> : null}
      </div>
      <div>
        {rows.map((r, i) => {
          const red = r.tone === "red";
          return (
            <div
              key={i}
              className={`relative grid grid-cols-[2.25rem_1fr] items-baseline gap-x-3 gap-y-1 px-4 py-3 sm:grid-cols-[2.25rem_1fr_auto] ${i > 0 ? "border-t border-line" : ""} ${red ? "bg-red-wash/30" : ""}`}
            >
              {red ? (
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-[3px] bg-red"
                />
              ) : null}
              <span
                className={`font-anno text-[12px] font-medium ${red ? "text-red" : "text-graphite"}`}
              >
                {r.rev}
              </span>
              <span className="font-prose text-[14.5px] leading-snug text-ink">
                {r.description}
              </span>
              {r.date ? (
                <span className="col-start-2 whitespace-nowrap font-anno text-[11px] text-graphite sm:col-start-3">
                  {r.date}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
      {caption ? (
        <figcaption className="border-t border-line px-4 py-2.5 font-prose text-[13px] italic leading-snug text-ink-soft">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/* 8 · NoteBlock ------------------------------------------------------------ */

/** Left-ruled note. Replaces Callout boxes. No background fill. */
export function NoteBlock({
  title,
  children,
  tone = "red",
  className,
}: {
  title: string;
  children: React.ReactNode;
  tone?: "red" | "ink";
  className?: string;
}) {
  const red = tone !== "ink";
  return (
    <div
      className={`border-l-2 pl-4 ${red ? "border-red" : "border-graphite"} ${className ?? ""}`}
    >
      <p
        className={`font-anno text-[10.5px] uppercase tracking-[0.16em] ${red ? "text-red" : "text-graphite"}`}
      >
        NOTE: {title}
      </p>
      <div className="mt-1.5 font-prose text-[15px] leading-relaxed text-ink">
        {children}
      </div>
    </div>
  );
}

/* 10 · RefRow / Ref -------------------------------------------------------- */

/** Hairline-separated list of reference documents. Replaces Artifact cards. */
export function RefRow({
  heading = "Reference documents",
  children,
  className,
}: {
  heading?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {heading ? <p className="anno mb-1">{heading}</p> : null}
      <ul className="border-t border-line">{children}</ul>
    </div>
  );
}

export function Ref({
  href,
  label,
  detail,
  logo,
}: {
  href: string;
  label: string;
  detail?: string;
  logo?: { src: string; alt: string; width: number; height: number };
}) {
  return (
    <li className="border-b border-line">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group flex flex-wrap items-center gap-x-3 gap-y-1 py-3"
      >
        {logo ? (
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            unoptimized
            className="h-4 w-auto"
          />
        ) : null}
        <span className="font-struct text-[15px] font-semibold text-ink transition-colors group-hover:text-red">
          {label}
        </span>
        {detail ? (
          <span className="font-prose text-[14px] text-ink-soft">{detail}</span>
        ) : null}
        <span aria-hidden className="ml-auto font-anno text-[12px] text-red">
          ↗
        </span>
      </a>
    </li>
  );
}

/* 11 · EquipList ----------------------------------------------------------- */

/** Inline mono list joined by hairline dots. Replaces TechRow pills. */
export function EquipList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <p
      className={`font-anno text-[12px] leading-relaxed text-ink-soft ${className ?? ""}`}
    >
      {items.map((item, i) => (
        <Fragment key={item}>
          {i > 0 ? <span className="text-line"> · </span> : null}
          {item}
        </Fragment>
      ))}
    </p>
  );
}

/* 16 · LiveBar ------------------------------------------------------------- */

/** The demo CTA banner. Whole bar is the anchor; internal hrefs use next/link. */
export function LiveBar({
  href,
  kicker = "WITNESS TEST · RUNS IN YOUR BROWSER",
  title,
  sub,
  cta = "RUN ↗",
  className,
}: {
  href: string;
  kicker?: string;
  title: string;
  sub?: string;
  cta?: string;
  className?: string;
}) {
  const external = /^https?:/.test(href);
  const cls = `group flex items-center gap-4 border border-line bg-paper px-5 py-4 transition-colors hover:border-red/40 ${className ?? ""}`;
  const inner = (
    <>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <PulseDot />
          <span className="font-anno text-[10px] uppercase tracking-[0.16em] text-red">
            {kicker}
          </span>
        </span>
        <span className="mt-1.5 block font-struct text-[18px] font-semibold leading-snug text-ink">
          {title}
        </span>
        {sub ? (
          <span className="mt-0.5 block font-anno text-[11px] text-graphite">
            {sub}
          </span>
        ) : null}
      </span>
      <span className="shrink-0 rounded-[2px] border-[1.5px] border-red px-3 py-1.5 font-anno text-[11px] uppercase tracking-[0.12em] text-red transition-colors group-hover:bg-red-wash">
        {cta}
      </span>
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

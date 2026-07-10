import { Fragment } from "react";
import Link from "next/link";
import { TopBar, SiteFooter, DimensionedName } from "./_components/drafting";
import { CopyEmail } from "./_components/copy-email";
import { ProjectGrid } from "./_components/project-cards";
import { PROFILE, SKILLS, CERTIFICATIONS } from "./_data/site";

/* ──────────────────────────────────────────────────────────────────────────
   REDLINE home — the general-arrangement sheet: TopBar → Hero → Projects index
   (a compact grid of the six sheets, linking to /projects for the full stacked
   cards) → General notes → Equipment & certifications → Contact → title block.
   The sheet data + card chrome live in ./_components/project-cards.
   Every fact/number is carried from app/_data/site.ts; presentation chrome
   (SHT NN, tier labels, stamps) is decorative.
   ────────────────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <TopBar variant="home" />
      <main className="mx-auto w-full max-w-[72rem] flex-1 px-6 lg:px-10">
        <Hero />
        <SheetIndex />
        <GeneralNotes />
        <Equipment />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}

/* Hero — the name + thesis, centered in the column; the body sections below
   stay left-aligned. pt-14 clears the sticky TopBar. */
function Hero() {
  return (
    <section className="pb-10 pt-14 text-center">
      <DimensionedName />

      <p className="mt-8 max-w-2xl mx-auto font-prose text-[22px] leading-snug text-ink sm:text-[24px]">
        {PROFILE.tagline}
      </p>
      <p className="mt-4 max-w-2xl mx-auto font-prose text-[15.5px] leading-relaxed text-ink-soft">
        {PROFILE.currentLine}
      </p>
    </section>
  );
}

/* Sheet index — a compact grid of the six sheets (they ARE the index); the full
   stacked sheet cards + the pending SHT 07 strip live on /projects. */
function SheetIndex() {
  return (
    <section
      id="index"
      className="scroll-mt-20 border-t border-line py-14 sm:py-16"
    >
      <h2 className="anno-red">Projects</h2>
      <p className="mt-3 max-w-2xl font-prose text-[15.5px] leading-relaxed text-ink-soft">
        Six projects — five I designed and built, one I fought for: two
        autonomous robots, an offline-RL agent, two clinical ML tools, and a
        federal advocacy campaign. Open any sheet for the full story.
      </p>

      <ProjectGrid />

      <div className="mt-8">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-1.5 font-anno text-[10.5px] uppercase tracking-[0.14em] text-ink transition-colors hover:text-red"
        >
          View all six
          <span
            aria-hidden
            className="inline-block transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}

/* General notes — the through-line, stated as revision-note style principles,
   each anchored to a sheet (bodies verbatim from the current PRINCIPLES, spec §8.3). */
const NOTES = [
  {
    title: "Calibrate to reality",
    body: "After the capstone I stopped trusting my own navigation benchmark, rebuilt the simulator to the real robot's measured specs, and published that the algorithm I demoed completes only 6 of 15 missions on it. The rewrite does 15/15.",
    evidence: "RECLAIM · the re-baseline",
    href: "/projects/reclaim",
  },
  {
    title: "Pick the honest metric",
    body: "A model can hit 90.1% “accuracy” by predicting the average on skewed data. I lead with the measures that reflect what was actually learned — MSE, shot-quality, buffer accuracy — and flag the trap out loud.",
    evidence: "THA · the accuracy trap",
    href: "/projects/tha-pain-prediction",
  },
  {
    title: "Ship it so you can check",
    body: "Four of these projects run live in your browser, and the NBA explorer's in-browser network reproduces the Python pipeline to within 1e-6 on every feature, checked by a 250-vector parity suite. Claims you can poke at beat claims you take on faith.",
    evidence: "NBA · the live explorer",
    href: "/projects/nba-shot-selection",
  },
];

function GeneralNotes() {
  return (
    <section
      id="notes"
      className="scroll-mt-20 border-t border-line py-14 sm:py-16"
    >
      <h2 className="anno-red">Design philosophy</h2>
      <p className="mt-3 max-w-2xl font-prose text-[17px] leading-relaxed text-ink">
        One instinct runs through everything here: build the real thing, then be
        honest about exactly what it does — and make it checkable.
      </p>

      <ol className="mt-8 border-t border-line">
        {NOTES.map((n, i) => (
          <li
            key={n.title}
            className="grid gap-2 border-b border-line py-6 sm:grid-cols-[7rem_1fr] sm:gap-8"
          >
            <p className="font-anno text-[10.5px] uppercase tracking-[0.16em] text-red">
              {String(i + 1).padStart(2, "0")}
            </p>
            <div>
              <h3 className="font-struct text-[18px] font-semibold text-ink">
                {n.title}
              </h3>
              <p className="mt-2 font-prose text-[15.5px] leading-relaxed text-ink-soft">
                {n.body}
              </p>
              <Link
                href={n.href}
                className="group mt-3 inline-flex items-center gap-1.5 font-anno text-[10.5px] uppercase tracking-[0.14em] text-graphite transition-colors hover:text-red"
              >
                {n.evidence}
                <span
                  aria-hidden
                  className="inline-block transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* Equipment & methods — the skills as a spec table, then certification stamps. */
function Equipment() {
  return (
    <section
      id="equipment"
      className="scroll-mt-20 border-t border-line py-14 sm:py-16"
    >
      <h2 className="anno-red">{"Skills & tools"}</h2>

      <div className="mt-8 border-t border-line">
        {SKILLS.map((g) => (
          <div
            key={g.group}
            className="grid gap-1 border-b border-line py-3 sm:grid-cols-[11rem_1fr] sm:gap-6"
          >
            <div className="font-anno text-[10.5px] uppercase tracking-[0.16em] text-graphite">
              {g.group}
            </div>
            <div className="font-anno text-[12.5px] leading-relaxed text-ink">
              {g.items.map((it, i) => (
                <Fragment key={it}>
                  {i > 0 ? <span className="text-line"> · </span> : null}
                  {it}
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="anno">Certifications</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CERTIFICATIONS.map((c) => {
            const inner = (
              <>
                <div className="font-struct text-[15px] font-bold tabular-nums text-ink">
                  {c.code}
                </div>
                <div className="mt-1 font-prose text-[13px] leading-snug text-ink">
                  {c.name}
                </div>
                <div className="mt-2 font-anno text-[10px] uppercase tracking-[0.14em] text-graphite">
                  {c.issuer}
                  {c.year ? ` · ${c.year}` : ""}
                </div>
                {c.verifyUrl ? (
                  <div className="mt-2 font-anno text-[10px] uppercase tracking-[0.14em] text-red">
                    Verify ↗
                  </div>
                ) : null}
              </>
            );
            return c.verifyUrl ? (
              <a
                key={c.code}
                href={c.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col rounded-[2px] border-[1.5px] border-ink-soft/45 p-4 transition-colors hover:border-red"
              >
                {inner}
              </a>
            ) : (
              <div
                key={c.code}
                className="flex flex-col rounded-[2px] border-[1.5px] border-ink-soft/45 p-4"
              >
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line py-16">
      <h2 className="anno-red">Contact</h2>
      <p className="mt-4 max-w-2xl font-prose text-[17px] leading-relaxed text-ink">
        Open to roles and collaborations in robotics, AI / ML, and full-stack
        engineering.
      </p>

      {/* Email — copies the address to the clipboard (the "Send an Email"
          button below owns the mailto). */}
      <CopyEmail email={PROFILE.email} />

      {/* Primary + secondary actions. Fill = focal CTA; outline = supporting. */}
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={`mailto:${PROFILE.email}`}
          className="inline-flex min-h-[44px] items-center justify-center rounded-[2px] bg-red px-5 py-3 font-anno text-[11px] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-red-deep"
        >
          Send an Email
        </a>
        <a
          href="/resume.pdf"
          download
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[2px] border-[1.5px] border-ink-soft/55 px-5 py-3 font-anno text-[11px] uppercase tracking-[0.14em] text-ink transition-colors hover:border-red hover:text-red"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            focusable={false}
            className="shrink-0"
          >
            <path
              d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 19.5h14"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
          Download Resume
        </a>
      </div>

      {/* Profiles — quieter outlined pair. */}
      <div className="mt-3 flex flex-wrap gap-3">
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-[2px] border border-line px-4 py-2 font-anno text-[11px] uppercase tracking-[0.12em] text-ink-soft transition-colors hover:border-red hover:text-red"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-3.5 w-3.5 shrink-0"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
          </svg>
          LinkedIn
        </a>
      </div>
    </section>
  );
}

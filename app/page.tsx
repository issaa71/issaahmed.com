import Link from "next/link";
import { ArrowUpRight, Mail, BadgeCheck } from "lucide-react";
import { Github, Linkedin } from "./_components/icons";
import {
  Eyebrow,
  GlassCard,
  Pill,
  ButtonLink,
  StatusBadge,
} from "./_components/ui";
import { Reveal } from "./_components/reveal";
import {
  PROFILE,
  PROJECTS,
  EXPERIENCE,
  SKILLS,
  CERTIFICATIONS,
} from "./_data/site";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 sm:px-8">
        <Hero />
        <ProofStrip />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

/* Mono HUD chip used in the hero status row. */
function HudChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
      {children}
    </span>
  );
}

/* Oversized ghost-numeral section header. */
function SectionHeader({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-end gap-4">
      <span
        aria-hidden="true"
        className="font-display text-5xl sm:text-6xl leading-none text-foreground/15 tabular-nums"
      >
        {index}
      </span>
      <Eyebrow className="pb-1.5">{label}</Eyebrow>
    </div>
  );
}

function Nav() {
  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
        <a href="#top" className="font-mono text-sm tracking-tight">
          issa.ahmed<span className="text-accent">_</span>
        </a>
        <ul className="flex items-center gap-5 text-sm text-foreground/80 max-sm:gap-4 max-sm:text-xs">
          <li>
            <a href="#projects" className="hover:text-accent transition-colors">
              Projects
            </a>
          </li>
          <li>
            <a
              href="#experience"
              className="hover:text-accent transition-colors"
            >
              Experience
            </a>
          </li>
          <li className="hidden sm:block">
            <a
              href="#certifications"
              className="hover:text-accent transition-colors"
            >
              Certifications
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-accent transition-colors">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[78svh] scroll-mt-24 flex-col justify-center py-20"
    >
      {/* HUD corner brackets */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-8 h-10 w-10 border-l-2 border-t-2 border-accent/30"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 right-0 h-10 w-10 border-b-2 border-r-2 border-accent/30"
      />

      <div className="animate-rise flex flex-wrap gap-2 [animation-delay:0ms]">
        <HudChip>
          <span className="h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-pulse" />
          Open to new-grad roles — 2026
        </HudChip>
        <HudChip>Toronto, ON</HudChip>
        <HudChip>BESc Mechatronics + AI · Western</HudChip>
      </div>

      <h1 className="animate-rise mt-8 font-display uppercase leading-[0.95] tracking-[-0.02em] text-[clamp(3.75rem,11vw,8rem)] [animation-delay:120ms]">
        {PROFILE.name}
      </h1>

      <p className="animate-rise mt-6 max-w-2xl text-xl sm:text-2xl leading-relaxed text-foreground/90 [animation-delay:180ms]">
        {PROFILE.tagline}
      </p>

      <p className="animate-rise mt-4 max-w-2xl text-base text-muted [animation-delay:240ms]">
        Currently Product Engineer at Scooty Mobility — building an AI transit
        companion app, in pilot conversations with GTHA municipalities.
      </p>

      <div className="animate-rise mt-10 flex flex-wrap gap-3 [animation-delay:240ms]">
        <ButtonLink href="#projects" variant="primary">
          See projects <ArrowUpRight size={16} />
        </ButtonLink>
        <ButtonLink href={`mailto:${PROFILE.email}`} variant="ghost">
          <Mail size={15} /> Email
        </ButtonLink>
        <ButtonLink href={PROFILE.github} variant="ghost" external>
          <Github size={15} /> GitHub
        </ButtonLink>
        <ButtonLink href={PROFILE.linkedin} variant="ghost" external>
          <Linkedin size={15} /> LinkedIn
        </ButtonLink>
        {/* TODO: re-add resume CTA once /public/resume.pdf is added */}
      </div>
    </section>
  );
}

function ProofStrip() {
  const stats = [
    {
      value: "15/15",
      caption: "nav missions completed · re-baselined sim",
    },
    {
      value: "30 FPS",
      caption: "edge perception · Jetson Orin NX",
    },
    {
      value: "513",
      caption: "patients · peer-reviewed ML (J. Arthroplasty)",
    },
    {
      value: "$81M",
      caption: "federal funding · Bill C-59 advocacy (NFLK coalition)",
    },
  ];
  return (
    <section
      aria-label="Proof points"
      className="grid grid-cols-2 border-y border-border/60 lg:grid-cols-4"
    >
      {stats.map((s, i) => {
        // Internal dividers only — outer edges come from the section's border-y.
        // Mobile 2-col: vertical between cols (cells 1,3), horizontal between rows (cells 2,3).
        // lg 4-col: vertical between all cells except the first (cells 1,2,3), no horizontal.
        const vertical =
          i % 2 === 1 ? "border-l" : i === 2 ? "lg:border-l" : "";
        const horizontal = i >= 2 ? "border-t lg:border-t-0" : "";
        return (
          <div
            key={s.value}
            className={`border-border/60 px-5 py-7 sm:px-7 sm:py-8 ${vertical} ${horizontal}`}
          >
            <p className="font-display text-4xl sm:text-5xl leading-none text-accent tabular-nums">
              {s.value}
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-wide leading-relaxed text-muted">
              {s.caption}
            </p>
          </div>
        );
      })}
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-border/60 py-20 sm:py-28"
    >
      <Reveal>
        <SectionHeader index="01" label="About" />
        <div className="mt-8 lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">
          <div className="max-w-2xl space-y-4 text-[15px] sm:text-base leading-[1.75] text-foreground/90">
            <p>
              I&apos;m a Mechatronics Engineering with AI Specialization
              undergraduate at Western University, graduating Spring 2026 (GPA
              3.70, Dean&apos;s List 2022–2024). My work spans autonomous
              robotics, applied ML, and full-stack systems — breadth I treat as
              the differentiator, not a hedge.
            </p>
            <p>
              I&apos;m a co-author on a peer-reviewed publication in{" "}
              <em>The Journal of Arthroplasty</em> (2026), led the perception
              and control stack on an award-placing autonomous waste-sorting
              capstone, and built offline RL agents that outperform real NBA
              player decisions on 100K+ tracking possessions. Outside
              engineering, I&apos;ve been part of the No Fly List Kids federal
              advocacy coalition since I was five; the campaign contributed to
              the passage of Bill C-59 and an $81M federal redress budget.
            </p>
          </div>
          <GlassCard className="mt-6 h-fit p-5 lg:mt-0">
            <dl className="space-y-3">
              <div>
                <dt className="eyebrow text-faint">Degree</dt>
                <dd className="mt-1 text-sm text-foreground/90">
                  BESc Mechatronics + AI
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-faint">Graduating</dt>
                <dd className="mt-1 text-sm text-foreground/90">Spring 2026</dd>
              </div>
              <div>
                <dt className="eyebrow text-faint">GPA</dt>
                <dd className="mt-1 text-sm text-foreground/90">
                  3.70 · Dean&apos;s List &apos;22–24
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-faint">Based in</dt>
                <dd className="mt-1 text-sm text-foreground/90">Toronto, ON</dd>
              </div>
            </dl>
          </GlassCard>
        </div>
      </Reveal>
    </section>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-border/60 py-20 sm:py-28"
    >
      <SectionHeader index="02" label="Projects" />
      <ul className="mt-10 grid gap-4 lg:grid-cols-3">
        {PROJECTS.map((p, i) => {
          const flagship =
            p.slug === "reclaim" || p.slug === "nba-shot-selection";
          const span =
            p.slug === "reclaim" || p.slug === "no-fly-list-kids"
              ? "lg:col-span-2"
              : "";
          const prjCode = `PRJ-0${i + 1}`;
          return (
            <li key={p.slug} className={`h-full ${span}`}>
              <Reveal delay={i * 60} className="h-full">
                <Link
                  href={`/projects/${p.slug}`}
                  className="group block h-full"
                >
                  <GlassCard className="relative h-full overflow-hidden p-5 transition-[border-color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:border-accent/40">
                    {/* HUD target-lock corner brackets on hover */}
                    <CornerBrackets />
                    <div className="flex items-start justify-between">
                      <p className="eyebrow text-faint">{prjCode}</p>
                      {flagship ? (
                        <StatusBadge tone="accent">Flagship</StatusBadge>
                      ) : null}
                    </div>
                    <p className="mt-1 font-mono text-[11px] text-muted">
                      {p.codename}
                    </p>
                    <h3 className="mt-2 text-base sm:text-lg font-semibold tracking-[-0.01em] leading-snug">
                      {p.title}
                    </h3>
                    {p.stats ? (
                      <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-accent">
                        {p.stats.map((s, si) => (
                          <li key={s} className="flex items-center gap-3">
                            {si > 0 ? (
                              <span className="text-faint">·</span>
                            ) : null}
                            {s}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                      {p.blurb}
                    </p>
                    {!p.stats ? (
                      <p className="mt-3 font-mono text-[11px] leading-relaxed text-accent">
                        {p.highlight}
                      </p>
                    ) : null}
                    <p className="mt-4 inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-faint group-hover:text-accent transition-colors">
                      Read case study{" "}
                      <ArrowUpRight
                        size={11}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </p>
                  </GlassCard>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* Four accent L-brackets that fade in on group-hover — HUD target lock. */
function CornerBrackets() {
  const base =
    "pointer-events-none absolute h-4 w-4 border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100";
  return (
    <>
      <span
        aria-hidden="true"
        className={`${base} left-2 top-2 border-l-2 border-t-2`}
      />
      <span
        aria-hidden="true"
        className={`${base} right-2 top-2 border-r-2 border-t-2`}
      />
      <span
        aria-hidden="true"
        className={`${base} bottom-2 left-2 border-b-2 border-l-2`}
      />
      <span
        aria-hidden="true"
        className={`${base} bottom-2 right-2 border-b-2 border-r-2`}
      />
    </>
  );
}

function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 border-t border-border/60 py-20 sm:py-28"
    >
      <SectionHeader index="03" label="Experience" />
      <ol className="mt-10 space-y-12">
        {EXPERIENCE.map((e) => (
          <li key={e.role + e.org}>
            <Reveal>
              <div className="grid gap-2 sm:grid-cols-[180px_1fr] sm:gap-6">
                <div className="font-mono text-xs uppercase tracking-wider text-faint pt-1">
                  {e.period}
                </div>
                <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:border before:border-accent/60 before:bg-accent-soft">
                  <h3 className="text-base sm:text-lg font-semibold tracking-[-0.01em] leading-snug">
                    {e.role} <span className="text-faint">·</span>{" "}
                    <span className="text-foreground/90">{e.org}</span>
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/90">
                    {e.bullets.map((b, i) => (
                      <li key={i} className="relative pl-4">
                        <span className="absolute left-0 top-[0.55em] h-1 w-1 rounded-full bg-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-t border-border/60 py-20 sm:py-28"
    >
      <SectionHeader index="04" label="Skills & Certs" />
      <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((g) => (
          <div key={g.group}>
            <p className="eyebrow text-faint">{g.group}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <Pill key={item}>{item}</Pill>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div id="certifications" className="mt-16 scroll-mt-24">
        <Eyebrow className="text-faint">Certifications</Eyebrow>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {CERTIFICATIONS.map((c) => {
            const inner = (
              <>
                <BadgeCheck size={16} className="mt-0.5 shrink-0 text-accent" />
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-snug">
                    {c.name}{" "}
                    <span className="font-mono text-[11px] text-faint">
                      · {c.code}
                    </span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {c.issuer}
                    {c.year ? ` · ${c.year}` : ""}
                    {c.verifyUrl ? (
                      <span className="ml-1 text-accent">· Verify ↗</span>
                    ) : null}
                  </p>
                </div>
              </>
            );
            return (
              <li key={c.code}>
                {c.verifyUrl ? (
                  <a href={c.verifyUrl} target="_blank" rel="noreferrer">
                    <GlassCard className="flex items-start gap-3 p-4 transition-colors hover:border-accent/40">
                      {inner}
                    </GlassCard>
                  </a>
                ) : (
                  <GlassCard className="flex items-start gap-3 p-4">
                    {inner}
                  </GlassCard>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border/60 py-24 sm:py-32"
    >
      <Reveal>
        <SectionHeader index="05" label="Contact" />
        <h2 className="mt-6 font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em]">
          Get in touch
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] sm:text-base leading-[1.75] text-foreground/90">
          Open to new-grad full-time roles in robotics, AI / ML, and full-stack
          engineering. Easiest way to reach me is email.
        </p>
        <a
          href={`mailto:${PROFILE.email}`}
          className="group mt-8 inline-flex items-center gap-2 font-display text-3xl sm:text-4xl tracking-[-0.02em] text-foreground transition-colors hover:text-accent"
        >
          <span className="underline-offset-8 group-hover:underline">
            {PROFILE.email}
          </span>
          <ArrowUpRight
            size={28}
            className="text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={PROFILE.github} variant="ghost" external>
            <Github size={15} /> github.com/issaa71
          </ButtonLink>
          <ButtonLink href={PROFILE.linkedin} variant="ghost" external>
            <Linkedin size={15} /> LinkedIn
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a
            href={`mailto:${PROFILE.email}`}
            className="font-mono text-xs text-muted hover:text-accent transition-colors"
          >
            issaahmed1@icloud.com
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-muted hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-muted hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          {/* TODO: add resume link here too once /public/resume.pdf exists */}
        </div>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-faint">
            © {new Date().getFullYear()} Issa Ahmed
          </p>
          <p className="font-mono text-xs text-faint">
            Toronto, ON · Next.js + Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}

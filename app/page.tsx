import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, BadgeCheck, ArrowRight } from "lucide-react";
import { Github, Linkedin } from "./_components/icons";
import { Eyebrow, Pill, ButtonLink, GlassCard } from "./_components/ui";
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
      <main className="mx-auto max-w-5xl px-6 sm:px-8">
        <Intro />
        <Projects />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Nav() {
  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-8">
        <a
          href="#top"
          className="font-display text-base font-semibold tracking-tight text-foreground"
        >
          Issa Ahmed
        </a>
        <ul className="flex items-center gap-5 text-sm text-muted max-sm:gap-4 max-sm:text-xs">
          <li>
            <a href="#projects" className="inline-flex items-center py-2 transition-colors hover:text-foreground">
              Projects
            </a>
          </li>
          <li>
            <a
              href="#experience"
              className="inline-flex items-center py-2 transition-colors hover:text-foreground"
            >
              Experience
            </a>
          </li>
          <li className="hidden sm:block">
            <a
              href="#certifications"
              className="inline-flex items-center py-2 transition-colors hover:text-foreground"
            >
              Certifications
            </a>
          </li>
          <li>
            <a href="#contact" className="inline-flex items-center py-2 transition-colors hover:text-foreground">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function Intro() {
  return (
    <section id="top" className="scroll-mt-24 pt-24 pb-16 sm:pt-32">
      <h1 className="animate-rise font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl [animation-delay:0ms]">
        {PROFILE.name}
      </h1>
      <p className="animate-rise mt-6 max-w-2xl text-xl leading-snug text-muted sm:text-2xl [animation-delay:80ms]">
        {PROFILE.tagline}
      </p>
      <p className="animate-rise mt-4 max-w-2xl text-base leading-relaxed text-muted [animation-delay:140ms]">
        {PROFILE.currentLine}
      </p>
      <div className="animate-rise mt-9 flex flex-wrap gap-3 [animation-delay:200ms]">
        <ButtonLink href="#projects" variant="primary">
          See projects <ArrowUpRight size={16} />
        </ButtonLink>
        <ButtonLink href={`mailto:${PROFILE.email}`} variant="ghost">
          <Mail size={15} /> Email
        </ButtonLink>
        {/* GitHub + LinkedIn intentionally NOT repeated in the hero — a visitor
            arriving from LinkedIn already has those surfaces; the hero leads with
            the projects (what the resume can't show). They remain in Contact +
            Footer. TODO: resume CTA once /public/resume.pdf is added. */}
      </div>
      <ul className="animate-rise mt-6 flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-xs text-muted [animation-delay:260ms]">
        <li>
          <Link
            href="/projects/tha-pain-prediction"
            className="transition-colors hover:text-accent"
          >
            Published · J. Arthroplasty
          </Link>
        </li>
        <li aria-hidden className="text-border">·</li>
        <li>
          <Link
            href="/projects/reclaim"
            className="transition-colors hover:text-accent"
          >
            3rd-place autonomous robot
          </Link>
        </li>
        <li aria-hidden className="text-border">·</li>
        <li>
          <Link
            href="/projects/no-fly-list-kids"
            className="transition-colors hover:text-accent"
          >
            Bill C-59 · $81M
          </Link>
        </li>
        <li aria-hidden className="text-border">·</li>
        <li>
          <a
            href="https://nba-rl-sim.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-accent"
          >
            2 live demos ↗
          </a>
        </li>
      </ul>
    </section>
  );
}

/* Per-tile presentation, keyed by slug. Category + metric chips are drawn from
   canonical numbers; media is rendered by ProjectMedia below. liveDemo, when
   present, surfaces a "Live demo ↗" action on the tile. */
const TILE: Record<
  string,
  { category: string; chips: string[]; liveDemo?: string }
> = {
  reclaim: {
    category: "Robotics · ROS2",
    chips: ["15/15 nav missions", "30 FPS perception", "3rd place"],
    liveDemo: "https://reclaim-nav-sim.vercel.app",
  },
  "nba-shot-selection": {
    category: "Reinforcement Learning",
    chips: ["+0.273 EPSA", "116,928 possessions", "Dueling DQN"],
    liveDemo: "https://nba-rl-sim.vercel.app",
  },
  "tha-pain-prediction": {
    category: "Clinical ML · Published",
    chips: ["J. Arthroplasty 2026", "513 patients", "85.9% ±2 buffer"],
  },
  "no-fly-list-kids": {
    category: "Advocacy · Policy",
    chips: ["Bill C-59", "$81M redress", "Toronto Star op-ed"],
  },
};

function ProjectMedia({ slug }: { slug: string }) {
  if (slug === "reclaim") {
    return (
      <Image
        src="/projects/reclaim/demo.jpg"
        alt="The RECLAIM robot on the capstone showcase floor — drive base, sensor mast, and 6-DOF sorting arm"
        width={768}
        height={1024}
        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
      />
    );
  }
  if (slug === "nba-shot-selection") {
    return (
      <Image
        src="/projects/nba-shot-selection/decision-maps-tile.png"
        alt="Court-zone heatmaps of learned shoot probability for the DQN and Dueling DQN agents — high near the basket, suppressed in mid-range"
        width={2330}
        height={1850}
        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
      />
    );
  }
  if (slug === "tha-pain-prediction") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-accent-soft/60 p-6 text-center">
        <p className="font-display text-6xl font-semibold tracking-tight text-foreground sm:text-7xl">
          85.9%
        </p>
        <p className="mt-3 text-sm text-muted">
          buffer accuracy ±2 pts · 513 patients
        </p>
        <p className="eyebrow mt-3 text-faint">Published · J. Arthroplasty</p>
      </div>
    );
  }
  // no-fly-list-kids
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[#f1efe9] p-6 text-center">
      <p className="font-display text-6xl font-semibold tracking-tight text-foreground sm:text-7xl">
        $81M
      </p>
      <p className="mt-3 text-sm text-muted">
        federal redress funding · Bill C-59
      </p>
    </div>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-border py-16 sm:py-20"
    >
      <h2 className="eyebrow text-accent">Selected Projects</h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        Four things I built and shipped — a robot, a research model, a clinical
        tool, and a federal campaign. Open any one to read the full story.
      </p>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {PROJECTS.map((p, i) => {
          const t = TILE[p.slug];
          return (
            <li key={p.slug}>
              <Reveal delay={i * 60}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(28,26,23,0.04),0_8px_24px_-12px_rgba(28,26,23,0.10)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_2px_4px_rgba(28,26,23,0.05),0_16px_36px_-14px_rgba(28,26,23,0.18)]">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="flex flex-1 flex-col"
                  >
                    <div className="aspect-[3/2] w-full overflow-hidden border-b border-border">
                      <ProjectMedia slug={p.slug} />
                    </div>
                    <div className="flex flex-1 flex-col p-6 pb-4">
                      <p className="eyebrow text-faint">{t.category}</p>
                      <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">
                        {p.blurb}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {t.chips.map((c) => (
                          <Pill key={c}>{c}</Pill>
                        ))}
                      </ul>
                    </div>
                  </Link>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border px-6 py-4">
                    {/* The live demo is the resume-proof asset — lead with it
                        (filled emerald), case study secondary. Tiles without a
                        demo just show the case-study link. */}
                    {t.liveDemo ? (
                      <a
                        href={t.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-accent px-3.5 py-1.5 text-sm font-medium text-background transition-colors hover:bg-accent/90"
                      >
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-background opacity-70" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-background" />
                        </span>
                        Try it live ↗
                      </a>
                    ) : null}
                    <Link
                      href={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent/80"
                    >
                      Case study
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-border py-16 sm:py-20"
    >
      <Reveal>
        <h2 className="eyebrow text-accent">About</h2>
        <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-[1.75] text-foreground/85 sm:text-base">
          <p>
            I&apos;m a Mechatronics Engineering with AI Specialization
            undergraduate at Western University, graduating Spring 2026 (GPA
            3.70, Dean&apos;s List 2022–2024). My work spans autonomous
            robotics, applied ML, and full-stack systems — breadth I treat as
            the differentiator, not a hedge.
          </p>
          <p>
            I&apos;m a co-author on a peer-reviewed publication in{" "}
            <em>The Journal of Arthroplasty</em> (2026), led the perception and
            control stack on an award-placing autonomous waste-sorting capstone,
            and built offline RL agents that outperform real NBA player
            decisions on 100K+ tracking possessions. Outside engineering,
            I&apos;ve been flagged on Canada&apos;s no-fly list since I was five.
            In 2017 I joined the No Fly List Kids coalition, whose campaign
            contributed to Bill C-59 and an $81M federal redress budget.
          </p>
        </div>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-faint">
          <li>BESc Mechatronics + AI</li>
          <li className="text-border">·</li>
          <li>Graduating Spring 2026</li>
          <li className="text-border">·</li>
          <li>GPA 3.70 · Dean&apos;s List &apos;22–24</li>
          <li className="text-border">·</li>
          <li>Toronto, ON</li>
        </ul>
      </Reveal>
    </section>
  );
}

function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 border-t border-border py-16 sm:py-20"
    >
      <h2 className="eyebrow text-accent">Experience</h2>
      <ol className="mt-10 space-y-12">
        {EXPERIENCE.map((e) => (
          <li key={e.role + e.org}>
            <Reveal>
              <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:gap-6">
                <div className="pt-1 font-mono text-xs uppercase tracking-wider text-faint">
                  {e.period}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {e.role} <span className="text-faint">·</span>{" "}
                    <span className="text-muted">{e.org}</span>
                  </h3>
                  <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-foreground/85">
                    {e.bullets.map((b, i) => (
                      <li key={i} className="relative pl-4">
                        <span className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-accent" />
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
      className="scroll-mt-24 border-t border-border py-16 sm:py-20"
    >
      <h2 className="eyebrow text-accent">Skills</h2>
      <div className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
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
        <Eyebrow>Certifications</Eyebrow>
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
      className="scroll-mt-24 border-t border-border py-20 sm:py-28"
    >
      <Reveal>
        <Eyebrow>Contact</Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Get in touch
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-[1.75] text-foreground/85 sm:text-base">
          Open to new-grad full-time roles in robotics, AI / ML, and full-stack
          engineering. Easiest way to reach me is email.
        </p>
        <a
          href={`mailto:${PROFILE.email}`}
          className="mt-8 inline-block font-display text-2xl tracking-tight text-foreground underline decoration-accent/40 decoration-2 underline-offset-8 transition-colors hover:decoration-accent sm:text-3xl"
        >
          {PROFILE.email}
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
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a
            href={`mailto:${PROFILE.email}`}
            className="font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            issaahmed1@icloud.com
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-muted transition-colors hover:text-accent"
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

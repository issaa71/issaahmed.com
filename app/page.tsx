import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, BadgeCheck, ArrowRight } from "lucide-react";
import { Github, Linkedin } from "./_components/icons";
import { Eyebrow, Pill, ButtonLink, GlassCard } from "./_components/ui";
import { Reveal } from "./_components/reveal";
import { PROFILE, PROJECTS, SKILLS, CERTIFICATIONS } from "./_data/site";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-6 sm:px-8">
        <Intro />
        <Projects />
        <Approach />
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
            <a href="#approach" className="inline-flex items-center py-2 transition-colors hover:text-foreground">
              Approach
            </a>
          </li>
          <li>
            <a
              href="#skills"
              className="inline-flex items-center py-2 transition-colors hover:text-foreground"
            >
              Skills
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
      <p className="animate-rise mb-6 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-faint [animation-delay:0ms]">
        <span aria-hidden className="inline-block h-3 w-px bg-accent" />
        Robotics · Applied ML · Full-stack · Toronto
      </p>
      <h1 className="animate-rise font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl [animation-delay:70ms]">
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
            AI-division-winning autonomous robot
</Link>
        </li>
        <li aria-hidden className="text-border">·</li>
        <li>
          <Link
            href="/projects/no-fly-list-kids"
            className="transition-colors hover:text-accent"
          >
            No Fly List Kids · Toronto Star op-ed
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
            3 live demos ↗
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
  { category: string; role: string; chips: string[]; liveDemo?: string }
> = {
  reclaim: {
    category: "Robotics · ROS2",
    role: "Team of 4 — I owned perception + control",
    chips: ["15/15 nav missions", "30 FPS perception", "3rd · 1st in AI division"],
    liveDemo: "https://reclaim-nav-sim.vercel.app",
  },
  "assistive-wheelchair": {
    category: "Robotics · ROS2",
    role: "Designed & built end-to-end",
    chips: ["A* room-to-room nav", "10 Hz hazard detection", "QR arrival checks"],
  },
  "nba-shot-selection": {
    category: "Reinforcement Learning",
    role: "Solo course project",
    chips: ["+0.273 EPSA", "~6× vs NBA players", "116,928 possessions"],
    liveDemo: "https://nba-rl-sim.vercel.app",
  },
  rideguide: {
    category: "Applied AI · Full-stack",
    // CONFIRM: solo vs. collaborator (research flagged "Ahmed Naeem"). Byline is
    // scope-based for now to avoid overclaiming team composition.
    role: "Applied-AI · full-stack build",
    chips: ["10 GTHA agencies", "GTFS-RT real-time", "GPT-4o-mini + Claude agent"],
  },
  "tha-pain-prediction": {
    category: "Clinical ML · Published",
    role: "The only engineer of 7 co-authors",
    chips: ["J. Arthroplasty 2026", "2nd of 7 authors", "13 models compared"],
  },
  "glenoid-classifier": {
    category: "Clinical ML",
    role: "Solo project",
    chips: ["Live in-browser tool", "~91% screen · AUC 0.98", "6 Walch classes"],
  },
  "no-fly-list-kids": {
    category: "Advocacy · Policy",
    role: "Coalition member since 2017",
    chips: ["Bill C-59", "$81M redress", "Toronto Star op-ed"],
  },
};

function ProjectMedia({ slug }: { slug: string }) {
  if (slug === "reclaim") {
    return (
      <Image
        src="/projects/reclaim/demo.jpg"
        alt="The RECLAIM robot on the capstone showcase floor — drive base, sensor mast, and 4-DOF sorting arm"
        width={768}
        height={1024}
        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
      />
    );
  }
  if (slug === "assistive-wheelchair") {
    return (
      <Image
        src="/projects/assistive-wheelchair/tile.jpg"
        alt="The assistive-navigation robot on its taped test course, red-tape waypoint markers on a white foam-board floor"
        width={1500}
        height={1000}
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
      <div className="flex h-full w-full items-center justify-center bg-[#f1efe9] p-6">
        <Image
          src="/projects/tha-pain-prediction/journal-cover.png"
          alt="Cover of The Journal of Arthroplasty — the 2026 issue featuring the peer-reviewed pain-prediction paper"
          width={237}
          height={298}
          className="h-full max-h-[86%] w-auto rounded-md border border-border shadow-[0_10px_30px_-10px_rgba(28,26,23,0.45)] transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
    );
  }
  if (slug === "rideguide") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#f1efe9] p-6 text-center">
        <p className="font-display text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
          “Is the 504
          <br />
          on time?”
        </p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-muted">
          live GTFS-RT · 10 agencies
        </p>
      </div>
    );
  }
  if (slug === "glenoid-classifier") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#f1efe9] p-6 text-center">
        <p className="font-display text-6xl font-semibold tracking-tight text-foreground sm:text-7xl">
          A·B·E
        </p>
        <p className="mt-3 text-sm text-muted">
          Walch glenoid types · 3-tier classifier
        </p>
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
        Seven projects I built and shipped — two autonomous robots, an
        offline-RL agent, an AI transit assistant, two clinical ML tools, and a
        federal advocacy campaign. Open any one to read the full story.
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
                      <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-accent/90">
                        {t.role}
                      </p>
                      <p className="mt-2.5 text-[15px] leading-relaxed text-foreground/85">
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

/* The through-line across every project — stated as principles, each anchored
   to concrete evidence on a case study (not generic "values"). This is the
   "I think, and I can show my work" frame the projects then prove. */
const PRINCIPLES = [
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
    body: "Two of these projects run live in your browser, and the NBA explorer's in-browser network reproduces the Python pipeline to within 1e-6 on every feature, checked by a 250-vector parity suite. Claims you can poke at beat claims you take on faith.",
    evidence: "NBA · the live explorer",
    href: "/projects/nba-shot-selection",
  },
];

function Approach() {
  return (
    <section
      id="approach"
      className="scroll-mt-24 border-t border-border py-16 sm:py-20"
    >
      <h2 className="eyebrow text-accent">How I work</h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/85">
        One instinct runs through everything here: build the real thing, then be
        honest about exactly what it does — and make it checkable.
      </p>
      <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
        {PRINCIPLES.map((p, i) => (
          <li key={p.title} className="flex flex-col bg-surface p-6">
            <span className="font-display text-sm font-semibold tabular-nums text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
              {p.title}
            </h3>
            <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-foreground/80">
              {p.body}
            </p>
            <Link
              href={p.href}
              className="group mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-accent transition-colors hover:text-accent/75"
            >
              {p.evidence}
              <ArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
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
          Open to roles and collaborations in robotics, AI / ML, and full-stack
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

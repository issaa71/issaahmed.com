import Link from "next/link";
import { ArrowUpRight, Mail, BadgeCheck } from "lucide-react";

function Github({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function Linkedin({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const PROFILE = {
  name: "Issa Ahmed",
  tagline:
    "Mechatronics & AI Systems Engineering student at Western University. I build autonomous robots, applied ML systems, and full-stack tools.",
  currentLine:
    "Currently Product Engineer at Scooty Mobility, building an AI-powered transit companion app in pilot conversations with municipalities across the GTHA.",
  email: "issaahmed1@icloud.com",
  github: "https://github.com/issaa71",
  linkedin: "https://www.linkedin.com/in/issa-ahmed-032490190/",
};

const PROJECTS: {
  slug: string;
  title: string;
  codename: string;
  blurb: string;
  highlight: string;
}[] = [
  {
    slug: "reclaim",
    title: "RECLAIM — Autonomous Waste-Sorting Robot",
    codename: "Robotics · ROS2 · Computer Vision",
    blurb:
      "Indoor autonomous robot that scans, detects, drives, picks, and sorts waste across recyclable, compost, and landfill streams. Capstone project (3rd place).",
    highlight:
      "8.1 items/min · 30 FPS perception on Jetson Orin NX · mAP50 0.693 → 0.826",
  },
  {
    slug: "nba-shot-selection",
    title: "NBA Shot Selection — Offline RL",
    codename: "Reinforcement Learning · PyTorch",
    blurb:
      "Dueling DQN with per-entity Deep Sets architecture and PBRS reward shaping that learns shoot-or-pass policies from real SportVU tracking data.",
    highlight:
      "+0.246 EPSA vs +0.042 NBA player baseline · 116,928 possessions · 631 games",
  },
  {
    slug: "tha-pain-prediction",
    title: "Predicting Pain After Total Hip Arthroplasty",
    codename: "Applied ML · Research · Streamlit",
    blurb:
      "Peer-reviewed ML pipeline comparing 13 models on 513 patients from the SAFE-T cohort. Co-authored with Sunnybrook + University of Toronto Orthopaedics.",
    highlight:
      "J. Arthroplasty 2026 · KNN MSE 2.70 @ T3 · 85.9% buffer accuracy ±2",
  },
  {
    slug: "no-fly-list-kids",
    title: "No Fly List Kids — Federal Advocacy",
    codename: "Policy · Communication · Coalition work",
    blurb:
      "Long-running federal advocacy via the No Fly List Kids coalition. Toronto Star op-ed, multiple media features, direct engagement with the PMO and federal Cabinet.",
    highlight: "Contributed to Bill C-59 + $81M federal redress budget",
  },
];

const EXPERIENCE: {
  role: string;
  org: string;
  period: string;
  bullets: string[];
}[] = [
  {
    role: "Product Engineer",
    org: "Scooty Mobility",
    period: "May 2025 — Present",
    bullets: [
      "Building an AI-powered transit companion app for the GTHA — conversational trip planning and cross-agency routing across TTC, GO Transit, and MiWay. Currently in pilot conversations with municipalities.",
      "Architecting serverless backend on AWS Lambda + API Gateway; developing Python RESTful APIs that simulate PRESTO card-based fare transactions.",
      "Designed and delivered an AI in Finance training curriculum in partnership with Ontario Tech University — 5 weeks of materials, 80 participants, Microsoft SC-900 certification prep.",
    ],
  },
  {
    role: "Thermodynamics Engineering Intern",
    org: "Bombardier Aerospace",
    period: "Summers 2022 & 2023",
    bullets: [
      "Core developer on Global Companion — a finalist-award-winning AI chatbot that dynamically sequences aircraft testing procedures based on part availability.",
      "Built automated data pipelines (Microsoft VBA) that transformed raw parameters into simulation-ready input files for thermal calculations.",
      "Performed flight-test data analysis using SQL and Python to extract, clean, and validate temperature data across aircraft thermal systems.",
    ],
  },
  {
    role: "R&D Summer Intern",
    org: "Glaukos Corporation",
    period: "Aug — Sep 2021",
    bullets: [
      "Worked with the R&D team on medical-device and combination pharmaceutical product development; performed lab tests on a retinal drug implant using a Phantom high-speed camera, an Instron material-properties testing machine, and a Keyence dimensional inspection system.",
      "Designed and reconfigured manufacturing process fixturing in SolidWorks — rapid-iterated with Formlabs SLA printing, then produced the first fixture on a Tormach CNC.",
      "Iterated on eye-stent CAD drawings and models alongside R&D engineers.",
    ],
  },
  {
    role: "Engineering Summer Student",
    org: "Thurber Engineering",
    period: "Summers 2020 & 2021",
    bullets: [
      "Conducted standardized geotechnical lab testing and digitized technical engineering documentation systems.",
    ],
  },
];

const SKILLS: { group: string; items: string[] }[] = [
  {
    group: "Robotics",
    items: [
      "ROS2 Humble",
      "Nav2",
      "SLAM Toolbox",
      "MoveIt2",
      "micro-ROS",
      "Jetson Orin NX",
      "OAK-D / DepthAI",
      "RPLIDAR",
      "SolidWorks",
    ],
  },
  {
    group: "AI / ML",
    items: [
      "PyTorch",
      "scikit-learn",
      "XGBoost",
      "OpenCV",
      "Roboflow",
      "YOLOv8",
      "TensorRT",
      "Gymnasium",
      "Streamlit",
    ],
  },
  {
    group: "Software",
    items: [
      "Python",
      "TypeScript",
      "C",
      "React",
      "Next.js",
      "FastAPI",
      "RESTful APIs",
      "SQL",
      "VBA",
    ],
  },
  {
    group: "Cloud & Tools",
    items: [
      "AWS Lambda",
      "AWS API Gateway",
      "GCP",
      "Docker",
      "n8n",
      "Jira",
      "SAP",
    ],
  },
];

const CERTIFICATIONS: {
  name: string;
  code: string;
  issuer: string;
  year?: string;
  verifyUrl?: string;
}[] = [
  {
    name: "Azure AI Fundamentals",
    code: "AI-900",
    issuer: "Microsoft",
    year: "2025",
    verifyUrl:
      "https://learn.microsoft.com/en-us/users/issaahmed-3571/credentials/ec72eb1f9331a5a9",
  },
  {
    name: "Security, Compliance & Identity Fundamentals",
    code: "SC-900",
    issuer: "Microsoft",
    year: "2025",
    verifyUrl:
      "https://learn.microsoft.com/en-us/users/issaahmed-3571/credentials/1978cdc579e763a4",
  },
  {
    name: "SolidWorks Design Associate",
    code: "CSWA",
    issuer: "Dassault Systèmes",
    year: "2021",
    verifyUrl: "https://cv.virtualtester.com/qr/?b=SLDWRKS&i=C-79BYK8QFZ6",
  },
  {
    name: "SolidWorks Simulation Associate",
    code: "CSWA-S",
    issuer: "Dassault Systèmes",
    year: "2023",
    verifyUrl: "https://cv.virtualtester.com/qr/?b=SLDWRKS&i=C-PY2M54RUNJ",
  },
];

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 sm:px-8">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4 sm:px-8">
        <a
          href="#top"
          className="font-mono text-sm tracking-tight text-foreground hover:text-accent transition-colors"
        >
          issa.ahmed
        </a>
        <ul className="flex items-center gap-5 text-sm text-muted">
          <li>
            <a href="#projects" className="hover:text-foreground transition-colors">
              Projects
            </a>
          </li>
          <li>
            <a href="#experience" className="hover:text-foreground transition-colors">
              Experience
            </a>
          </li>
          <li>
            <a href="#certifications" className="hover:text-foreground transition-colors">
              Certifications
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-foreground transition-colors">
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
    <section id="top" className="pt-24 pb-20 sm:pt-32 sm:pb-28">
      <p className="font-mono text-xs uppercase tracking-widest text-accent mb-5">
        Mechatronics & AI Systems · Western University · 2026
      </p>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1]">
        {PROFILE.name}
      </h1>
      <p className="mt-6 text-lg sm:text-xl text-foreground/90 leading-relaxed max-w-2xl">
        {PROFILE.tagline}
      </p>
      <p className="mt-4 text-base text-muted leading-relaxed max-w-2xl">
        {PROFILE.currentLine}
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <a
          href="#projects"
          className="inline-flex h-10 items-center gap-1.5 rounded-full bg-foreground px-4 text-sm font-medium text-background hover:opacity-90 transition-opacity"
        >
          See projects <ArrowUpRight size={16} />
        </a>
        <a
          href={`mailto:${PROFILE.email}`}
          className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-medium hover:border-accent hover:text-accent transition-colors"
        >
          <Mail size={15} /> Email
        </a>
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-medium hover:border-accent hover:text-accent transition-colors"
        >
          <Github size={15} /> GitHub
        </a>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-medium hover:border-accent hover:text-accent transition-colors"
        >
          <Linkedin size={15} /> LinkedIn
        </a>
        {/* TODO: re-add resume CTA once /public/resume.pdf is added */}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-12 border-t border-border/60">
      <SectionLabel>About</SectionLabel>
      <div className="mt-6 space-y-4 text-foreground/90 leading-relaxed">
        <p>
          I&apos;m a Mechatronics Engineering with AI Specialization undergraduate at
          Western University, graduating Spring 2026 (GPA 3.70, Dean&apos;s List 2022–2024).
          My work spans autonomous robotics, applied ML, and full-stack systems —
          breadth I treat as the differentiator, not a hedge.
        </p>
        <p>
          I&apos;m a co-author on a peer-reviewed publication in <em>The Journal of
          Arthroplasty</em> (2026), led the perception and control stack on an
          award-placing autonomous waste-sorting capstone, and built offline RL
          agents that outperform real NBA player decisions on 100K+ tracking
          possessions. Outside engineering, I&apos;ve been part of the No Fly List
          Kids federal advocacy coalition since age ~5; the campaign contributed
          to the passage of Bill C-59 and an $81M federal redress budget.
        </p>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-16 border-t border-border/60">
      <SectionLabel>Featured Projects</SectionLabel>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {PROJECTS.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="group block h-full rounded-xl border border-border p-5 hover:border-accent/60 transition-colors"
            >
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                {p.codename}
              </p>
              <h3 className="mt-2 text-base font-semibold leading-snug">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
                {p.blurb}
              </p>
              <p className="mt-3 font-mono text-[11px] text-accent">
                {p.highlight}
              </p>
              <p className="mt-4 inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-muted group-hover:text-accent transition-colors">
                Read case study <ArrowUpRight size={11} />
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-16 border-t border-border/60">
      <SectionLabel>Experience</SectionLabel>
      <ol className="mt-8 space-y-10">
        {EXPERIENCE.map((e) => (
          <li
            key={e.role + e.org}
            className="grid gap-2 sm:grid-cols-[160px_1fr] sm:gap-6"
          >
            <div className="font-mono text-xs uppercase tracking-wider text-muted pt-1">
              {e.period}
            </div>
            <div>
              <h3 className="text-base font-semibold leading-tight">
                {e.role} <span className="text-muted">·</span>{" "}
                <span className="text-foreground/90">{e.org}</span>
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-foreground/80 leading-relaxed">
                {e.bullets.map((b, i) => (
                  <li key={i} className="relative pl-4">
                    <span className="absolute left-0 top-[0.55em] h-1 w-1 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-16 border-t border-border/60">
      <SectionLabel>Skills</SectionLabel>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {SKILLS.map((g) => (
          <div key={g.group}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
              {g.group}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border px-3 py-1 text-xs"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div id="certifications" className="mt-12 scroll-mt-24">
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
          Certifications
        </h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {CERTIFICATIONS.map((c) => {
            const inner = (
              <>
                <BadgeCheck size={16} className="mt-0.5 shrink-0 text-accent" />
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-snug">
                    {c.name}{" "}
                    <span className="font-mono text-[11px] text-muted">
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
                  <a
                    href={c.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-3 rounded-lg border border-border p-3 hover:border-accent/60 transition-colors"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="flex items-start gap-3 rounded-lg border border-border p-3">
                    {inner}
                  </div>
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
    <section id="contact" className="py-20 border-t border-border/60">
      <SectionLabel>Contact</SectionLabel>
      <h2 className="mt-5 text-2xl sm:text-3xl font-semibold tracking-tight">
        Get in touch
      </h2>
      <p className="mt-3 text-foreground/85 max-w-xl leading-relaxed">
        Open to new-grad full-time roles in robotics, AI / ML, and full-stack
        engineering. Easiest way to reach me is email.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${PROFILE.email}`}
          className="inline-flex h-10 items-center gap-1.5 rounded-full bg-foreground px-4 text-sm font-medium text-background hover:opacity-90 transition-opacity"
        >
          <Mail size={15} /> {PROFILE.email}
        </a>
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-medium hover:border-accent hover:text-accent transition-colors"
        >
          <Github size={15} /> github.com/issaa71
        </a>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-medium hover:border-accent hover:text-accent transition-colors"
        >
          <Linkedin size={15} /> LinkedIn
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 mt-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} Issa Ahmed
        </p>
        <p className="font-mono text-xs text-muted">
          Toronto, ON · Next.js + Vercel
        </p>
      </div>
    </footer>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-widest text-accent">
      {children}
    </p>
  );
}

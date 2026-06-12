import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Pill } from "../../_components/ui";

export { StatusBadge } from "../../_components/ui";

export function CaseStudyShell({
  eyebrow,
  title,
  tagline,
  meta,
  children,
}: {
  eyebrow: string;
  title: string;
  tagline: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background text-foreground">
      <nav
        aria-label="Primary"
        className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4 sm:px-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 font-mono text-sm tracking-tight text-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft size={14} /> issa.ahmed
          </Link>
          <ul className="flex items-center gap-5 text-sm text-muted">
            <li>
              <Link href="/#projects" className="hover:text-foreground transition-colors">
                All projects
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 sm:px-8">
        <header className="pt-20 pb-12 border-b border-border/60">
          <p className="eyebrow text-accent">{eyebrow}</p>
          <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-[1.12]">
            {title}
          </h1>
          <p className="mt-5 text-lg text-foreground/85 leading-relaxed">
            {tagline}
          </p>
          <p className="mt-4 font-mono text-xs text-faint">{meta}</p>
        </header>

        <article className="cs-article py-12 space-y-14">{children}</article>
      </main>

      <footer className="border-t border-border/60 mt-10">
        <div className="mx-auto max-w-3xl px-6 py-8 sm:px-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href="mailto:issaahmed1@icloud.com"
              className="font-mono text-xs text-muted hover:text-accent transition-colors"
            >
              issaahmed1@icloud.com
            </a>
            <a
              href="https://github.com/issaa71"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-muted hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/issa-ahmed-032490190/"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-muted hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted">
              © {new Date().getFullYear()} Issa Ahmed
            </p>
            <Link
              href="/"
              className="font-mono text-xs text-muted hover:text-accent transition-colors"
            >
              ← back to home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="cs-section-title eyebrow text-accent">{title}</h2>
      <div className="mt-5 space-y-4 text-[15px] sm:text-base text-foreground/80 leading-[1.75]">
        {children}
      </div>
    </section>
  );
}

export function Metric({
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
    <div className="glass rounded-xl p-4">
      <p className="eyebrow text-faint">{label}</p>
      <p
        className={`mt-2 text-2xl font-semibold tracking-tight tabular-nums ${
          accent ? "text-accent" : ""
        }`}
      >
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-xs text-faint leading-relaxed">{hint}</p>
      ) : null}
    </div>
  );
}

export function MetricGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
  );
}

export function Artifact({
  href,
  label,
  detail,
}: {
  href: string;
  label: string;
  detail?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="glass rounded-xl p-4 group flex items-center justify-between transition-colors hover:border-accent/40"
    >
      <span>
        <span className="block text-sm font-medium">{label}</span>
        {detail ? (
          <span className="block text-xs text-muted">{detail}</span>
        ) : null}
      </span>
      <ArrowUpRight
        size={14}
        className="text-faint transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}

export function ArtifactRow({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

export function TechRow({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <Pill key={t}>{t}</Pill>
      ))}
    </ul>
  );
}

export function YouTubeEmbed({
  id,
  title,
  caption,
}: {
  id: string;
  title: string;
  caption?: string;
}) {
  return (
    <figure className="glass overflow-hidden rounded-xl">
      <div className="relative aspect-video w-full bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <figcaption className="border-t border-border bg-white/[0.02] px-4 py-3 text-xs text-faint">
        <span className="text-foreground/90">{title}</span>
        {caption ? <span className="ml-1">— {caption}</span> : null}
      </figcaption>
    </figure>
  );
}

export function VideoGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

export function Figure({
  src,
  alt,
  caption,
  width,
  height,
  priority = false,
  plate = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  priority?: boolean;
  plate?: boolean;
}) {
  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className="h-auto w-full"
    />
  );
  return (
    <figure className="glass overflow-hidden rounded-xl">
      {plate ? <div className="bg-white">{image}</div> : image}
      {caption ? (
        <figcaption className="border-t border-border bg-white/[0.02] px-4 py-3 text-xs text-faint">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function ComparisonTable({
  columns,
  rows,
  caption,
}: {
  columns: string[];
  rows: { cells: (string | number)[]; highlight?: boolean }[];
  caption?: string;
}) {
  return (
    <div className="glass overflow-x-auto rounded-xl">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th
                key={col}
                className={`eyebrow text-faint px-4 py-3 ${
                  i === 0 ? "text-left" : "text-right"
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-mono text-xs">
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={`border-b border-border/60 ${
                row.highlight ? "bg-accent-soft/40 font-semibold text-accent" : ""
              }`}
            >
              {row.cells.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-4 py-3 ${
                    ci === 0 ? "text-left" : "text-right"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption ? (
        <p className="border-t border-border p-3 text-xs text-faint">{caption}</p>
      ) : null}
    </div>
  );
}

export function Callout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-accent/20 border-l-2 border-l-accent bg-accent-soft/30 p-4 text-sm text-foreground/80 leading-relaxed">
      {title ? <p className="eyebrow text-accent mb-2">{title}</p> : null}
      {children}
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
        className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md"
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
        <header className="pt-20 pb-10 border-b border-border/60">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.15]">
            {title}
          </h1>
          <p className="mt-5 text-lg text-foreground/85 leading-relaxed">
            {tagline}
          </p>
          <p className="mt-3 font-mono text-xs text-muted">{meta}</p>
        </header>

        <article className="prose-custom py-12 space-y-12">{children}</article>
      </main>

      <footer className="border-t border-border/60 mt-10">
        <div className="mx-auto flex max-w-3xl flex-col gap-2 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
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
      <h2 className="font-mono text-xs uppercase tracking-widest text-accent">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-foreground/90 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export function Metric({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-border p-4">
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className="mt-2 text-xl font-semibold tracking-tight">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
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
      className="group flex items-center justify-between rounded-lg border border-border p-3 hover:border-accent/60 transition-colors"
    >
      <span>
        <span className="block text-sm font-medium">{label}</span>
        {detail ? (
          <span className="block text-xs text-muted">{detail}</span>
        ) : null}
      </span>
      <span className="font-mono text-xs text-muted group-hover:text-accent transition-colors">
        ↗
      </span>
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
        <li
          key={t}
          className="rounded-full border border-border px-3 py-1 text-xs"
        >
          {t}
        </li>
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
    <figure className="overflow-hidden rounded-xl border border-border">
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
      <figcaption className="px-4 py-3 text-xs text-muted border-t border-border bg-background">
        <span className="font-medium text-foreground">{title}</span>
        {caption ? <span className="ml-1">— {caption}</span> : null}
      </figcaption>
    </figure>
  );
}

export function VideoGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

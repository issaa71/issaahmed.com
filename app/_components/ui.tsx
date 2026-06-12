import Link from "next/link";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`eyebrow text-accent ${className ?? ""}`}>{children}</p>;
}

export function GlassCard({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return <Tag className={`glass rounded-xl ${className ?? ""}`}>{children}</Tag>;
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full border border-border bg-white/[0.03] px-3 py-1 text-xs text-muted">
      {children}
    </li>
  );
}

export function ButtonLink({
  href,
  variant = "ghost",
  external = false,
  children,
}: {
  href: string;
  variant?: "primary" | "ghost";
  external?: boolean;
  children: React.ReactNode;
}) {
  const className =
    variant === "primary"
      ? "inline-flex h-10 items-center gap-1.5 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
      : "inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-white/[0.02] px-4 text-sm font-medium text-foreground/90 transition-colors hover:border-accent/50 hover:text-accent";

  const externalProps = external
    ? { target: "_blank", rel: "noreferrer" }
    : {};

  const isAnchor =
    external || href.startsWith("#") || href.startsWith("mailto:");

  if (isAnchor) {
    return (
      <a href={href} className={className} {...externalProps}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function StatusBadge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "accent" | "neutral";
}) {
  if (tone === "accent") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent-soft/60 px-2.5 py-0.5 font-mono text-[11px] text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {children}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-faint">
      <span className="h-1.5 w-1.5 rounded-full bg-faint" />
      {children}
    </span>
  );
}

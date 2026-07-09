import Image from "next/image";

/* ──────────────────────────────────────────────────────────────────────────
   REDLINE plates — figures, video reels, data tables, and non-photo-blue
   construction placeholders. Server-safe; hairline chrome, max radius 3px.
   ────────────────────────────────────────────────────────────────────────── */

/* 9 · PlaceholderPlate ----------------------------------------------------- */

/** Blueprint corner crop-marks. */
function CropTicks() {
  const corner = "absolute h-2.5 w-2.5 border-blueprint";
  return (
    <>
      <span aria-hidden className={`${corner} left-2 top-2 border-l border-t`} />
      <span aria-hidden className={`${corner} right-2 top-2 border-r border-t`} />
      <span
        aria-hidden
        className={`${corner} bottom-2 left-2 border-b border-l`}
      />
      <span
        aria-hidden
        className={`${corner} bottom-2 right-2 border-b border-r`}
      />
    </>
  );
}

/** Circled-triangle play glyph — line art in blueprint, not a filled disc. */
function PlayGlyph() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      className="text-blueprint"
    >
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1" />
      <path
        d="M16 13 L28 20 L16 27 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Reserved space for a not-yet-issued asset — deliberate, not broken. */
export function PlaceholderPlate({
  kind,
  title,
  covers,
  note,
  className,
}: {
  kind: "VIDEO" | "FIGURE" | "PHOTO";
  title: string;
  covers: string;
  note?: string;
  className?: string;
}) {
  return (
    <figure
      className={`relative border border-dashed border-blueprint-line bg-plate p-8 sm:p-10 ${className ?? ""}`}
    >
      <CropTicks />
      <div className="mx-auto flex max-w-md flex-col items-center gap-3 text-center">
        {kind === "VIDEO" ? <PlayGlyph /> : null}
        <span className="font-anno text-[10px] uppercase tracking-[0.16em] text-blueprint">
          TO BE ISSUED — {kind}
        </span>
        <span className="font-prose text-[14px] leading-snug text-ink-soft">
          {title}
        </span>
        <span className="font-prose text-[13px] leading-normal text-ink-soft/85">
          {covers}
        </span>
        {note ? (
          <span className="font-anno text-[10px] tracking-[0.08em] text-blueprint">
            {note}
          </span>
        ) : null}
      </div>
    </figure>
  );
}

/* 12 · FigurePlate --------------------------------------------------------- */

/** Bordered figure plate with an auto-numbered FIG. caption (CSS `fig`
    counter, set on the case-study article). */
export function FigurePlate({
  src,
  alt,
  caption,
  width,
  height,
  priority = false,
  plate = false,
  sub,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  priority?: boolean;
  plate?: boolean;
  sub?: string;
  className?: string;
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
    <figure className={`border border-line bg-plate ${className ?? ""}`}>
      {plate ? <div className="bg-plate p-4">{image}</div> : image}
      {caption || sub ? (
        <figcaption className="border-t border-line px-4 py-2.5">
          {caption ? (
            <p className="text-[13px] leading-snug text-ink-soft">
              <span className="fig-num mr-1.5 font-anno text-[10px] uppercase tracking-[0.14em] text-red" />
              <span className="italic">{caption}</span>
            </p>
          ) : null}
          {sub ? (
            <p className="mt-1 font-anno text-[10px] uppercase tracking-[0.12em] text-graphite">
              {sub}
            </p>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

/* 13 · Reel / VideoGrid ---------------------------------------------------- */

/** Lazy YouTube (nocookie) embed with a drafting caption bar. */
export function Reel({
  id,
  title,
  caption,
}: {
  id: string;
  title: string;
  caption?: string;
}) {
  return (
    <figure className="overflow-hidden border border-line bg-plate">
      <div className="relative aspect-video w-full bg-ink">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <figcaption className="border-t border-line px-4 py-2.5">
        <p className="font-anno text-[10px] uppercase tracking-[0.14em] text-red">
          REC ▸ {title}
        </p>
        {caption ? (
          <p className="mt-1 font-prose text-[13px] italic leading-snug text-ink-soft">
            {caption}
          </p>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function VideoGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${className ?? ""}`}>
      {children}
    </div>
  );
}

/* 14 · DataTable ----------------------------------------------------------- */

/** Hairline comparison table — first column left, the rest right-aligned. */
export function DataTable({
  columns,
  rows,
  caption,
}: {
  columns: string[];
  rows: { cells: (string | number)[]; highlight?: boolean }[];
  caption?: string;
}) {
  return (
    <figure className="border border-line bg-paper">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-line">
              {columns.map((col, i) => (
                <th
                  key={col}
                  className={`px-4 py-2.5 font-anno text-[10px] uppercase tracking-[0.14em] text-graphite ${i === 0 ? "text-left" : "text-right"}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className={`border-b border-line last:border-b-0 ${row.highlight ? "bg-red-wash/30" : ""}`}
              >
                {row.cells.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-4 py-2.5 font-anno text-[12.5px] tabular-nums text-ink ${ci === 0 ? "text-left" : "text-right"} ${row.highlight && ci === 0 ? "border-l-[2.5px] border-red font-semibold" : ""}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption ? (
        <figcaption className="border-t border-line px-4 py-2.5 font-prose text-[13px] italic leading-snug text-ink-soft">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

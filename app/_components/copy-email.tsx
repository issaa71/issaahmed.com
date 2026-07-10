"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   CopyEmail — the Contact email box, made interactive. Renders the same
   bordered display as the static box (envelope mark + address) but as a real
   <button> that writes the address to the clipboard on click; the copy mark
   swaps to a check + "COPIED" for ~2s, then reverts. The separate "Send an
   Email" button owns the mailto. Client-only (clipboard + local copied state).
   Bespoke inline SVG marks only — no icon library, no emoji. Max radius 2px.
   ────────────────────────────────────────────────────────────────────────── */

const REVERT_MS = 2000;

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  // Clear any pending revert timer on unmount.
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== undefined) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      // Reset the 2s revert window on every successful copy (incl. re-clicks).
      if (timeoutRef.current !== undefined) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), REVERT_MS);
    } catch {
      // Clipboard unavailable (insecure context / denied) — leave the box at rest.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy email address ${email}`}
      className="group mt-8 flex min-h-[52px] w-full max-w-md cursor-pointer items-center gap-3 rounded-[2px] border border-line bg-paper px-5 py-4 text-left transition-colors hover:border-red/50"
    >
      {/* Envelope — keeps the email identity. */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        focusable={false}
        className="shrink-0 text-ink transition-colors group-hover:text-red"
      >
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M4 7.5l8 5 8-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="font-anno text-[13px] text-ink transition-colors group-hover:text-red">
        {email}
      </span>

      {/* Copy affordance → check + COPIED on success. aria-live announces the
          change; the label is proper-case (uppercased via CSS) so it reads as a
          word, not letter-by-letter. */}
      <span className="ml-auto flex shrink-0 items-center gap-1.5">
        {copied ? (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            focusable={false}
            className="shrink-0 text-red"
          >
            <path
              d="M5 12.5l4 4 10-10"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            focusable={false}
            className="shrink-0 text-graphite transition-colors group-hover:text-red"
          >
            <rect
              x="4"
              y="4"
              width="12"
              height="12"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <rect
              x="8"
              y="8"
              width="12"
              height="12"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        )}
        <span
          aria-live="polite"
          className={`font-anno text-[10px] uppercase tracking-[0.14em] transition-opacity ${
            copied
              ? "text-red opacity-100"
              : "text-graphite opacity-0 group-hover:opacity-100"
          }`}
        >
          {copied ? "Copied" : "Copy"}
        </span>
      </span>
    </button>
  );
}

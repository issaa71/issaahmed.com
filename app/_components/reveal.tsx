"use client";
import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot reveal: reduced-motion users skip the entrance animation entirely
      setShown(true);
      return;
    }
    // Reveal immediately if any part of the element is in the viewport ON MOUNT.
    // Without this, content sitting at/just below the fold (notably the project
    // tiles) never trips the IntersectionObserver threshold and stays invisible
    // until the visitor scrolls — i.e. the page's whole point renders blank on
    // first paint. Content genuinely below the fold still animates in on scroll.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      // one-shot reveal of content already on screen at mount
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal-hidden transition-all duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

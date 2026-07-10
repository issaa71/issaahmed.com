"use client";

import { useEffect, useRef, useState } from "react";
import { PulseDot } from "../../_components/drafting";

/* ──────────────────────────────────────────────────────────────────────────
   Assistive-wheelchair navigation SIMULATION: a faithful web rebuild of the
   Python turtle sim (AISE 4020B). It is NOT pathfinding: every room has ONE
   fixed waypoint route I authored, and the chair pauses at each checkpoint to
   "scan" the matching QR code before moving on. Geometry is carried verbatim
   from the original sim (viewBox 1000×700). Colours are the REDLINE tokens via
   Tailwind fill-/stroke- utilities; the marker animates with requestAnimation-
   Frame and snaps between checkpoints under prefers-reduced-motion.
   ────────────────────────────────────────────────────────────────────────── */

type Pt = { x: number; y: number };

type Room = {
  name: string;
  x: number; // top-left
  y: number;
  door: Pt; // checkpoint on the room's wall
  route: string[]; // ordered waypoint labels → looked up in POINTS
};

const ROOM_W = 180;
const ROOM_H = 100;

/* Rooms + their fixed routes, exactly as defined in the original simulation. */
const ROOMS: Room[] = [
  { name: "Kitchen", x: 100, y: 100, door: { x: 190, y: 200 }, route: ["Mid1", "Mid2", "Mid3", "Mid4", "Kitchen"] },
  { name: "Living Room", x: 300, y: 100, door: { x: 390, y: 200 }, route: ["Mid1", "Mid2", "Mid3", "Living Room"] },
  { name: "Bedroom 1", x: 500, y: 100, door: { x: 590, y: 200 }, route: ["Mid1", "Mid2", "Bedroom 1"] },
  { name: "Bedroom 2", x: 700, y: 100, door: { x: 790, y: 200 }, route: ["Mid1", "Bedroom 2"] },
  { name: "Bathroom", x: 100, y: 250, door: { x: 190, y: 250 }, route: ["Mid1", "Mid2", "Mid3", "Mid4", "Bathroom"] },
  { name: "Laundry", x: 300, y: 250, door: { x: 390, y: 250 }, route: ["Mid1", "Mid2", "Mid3", "Laundry"] },
  { name: "Study", x: 500, y: 250, door: { x: 590, y: 250 }, route: ["Mid1", "Mid2", "Study"] },
  { name: "Entrance", x: 700, y: 250, door: { x: 790, y: 250 }, route: ["Entrance"] },
  { name: "Storage", x: 100, y: 400, door: { x: 190, y: 400 }, route: ["Mid1", "Mid2", "Mid3", "Mid5", "Storage"] },
  { name: "Gym Room", x: 320, y: 400, door: { x: 410, y: 400 }, route: ["Mid1", "Mid2", "Mid3", "Mid6", "Gym Room"] },
  { name: "Office", x: 520, y: 400, door: { x: 610, y: 400 }, route: ["Mid1", "Mid2", "Mid3", "Mid7", "Office"] },
];

/* Corridor checkpoints: the QR waypoints between room rows. */
const MIDS: Record<string, Pt> = {
  Mid1: { x: 790, y: 225 },
  Mid2: { x: 590, y: 225 },
  Mid3: { x: 390, y: 225 },
  Mid4: { x: 190, y: 225 },
  Mid5: { x: 190, y: 375 },
  Mid6: { x: 410, y: 375 },
  Mid7: { x: 610, y: 375 },
};

/* Unified label → point map: {...doors, ...mids}. Doors are keyed by room name. */
const POINTS: Record<string, Pt> = (() => {
  const m: Record<string, Pt> = { ...MIDS };
  for (const r of ROOMS) m[r.name] = r.door;
  return m;
})();

const MID_NAMES = new Set<string>(Object.keys(MIDS));
const ENTRANCE: Pt = { x: 790, y: 250 }; // the chair always starts here

/* ── log model ── */
type LogKind = "start" | "move" | "scan" | "arrive";
type LogEntry = { kind: LogKind; main: string };
const LINE_COLOR: Record<LogKind, string> = {
  start: "text-graphite",
  move: "text-ink-soft",
  scan: "text-ink",
  arrive: "font-semibold text-ink",
};

/* ── animation control token: lets a run cancel its own RAF + timers ── */
type Token = { cancelled: boolean; raf: number; timeout: number };

const pointsAttr = (pts: Pt[]) => pts.map((p) => `${p.x},${p.y}`).join(" ");

export function WheelchairSim() {
  const [destination, setDestination] = useState<string | null>(null);
  const [marker, setMarker] = useState<Pt>(ENTRANCE);
  const [running, setRunning] = useState(false);
  const [reached, setReached] = useState(0); // # of route stops QR-matched so far
  const [scanned, setScanned] = useState<Set<string>>(() => new Set());
  const [log, setLog] = useState<LogEntry[]>([]);

  const tokenRef = useRef<Token | null>(null);
  const logRef = useRef<HTMLOListElement>(null);

  // Cancel any in-flight animation/timer on unmount.
  useEffect(() => {
    return () => {
      const t = tokenRef.current;
      if (t) {
        t.cancelled = true;
        cancelAnimationFrame(t.raf);
        clearTimeout(t.timeout);
      }
    };
  }, []);

  // Keep the newest log line in view.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log]);

  const append = (entry: LogEntry) => setLog((prev) => [...prev, entry]);

  const cancelRun = () => {
    const t = tokenRef.current;
    if (t) {
      t.cancelled = true;
      cancelAnimationFrame(t.raf);
      clearTimeout(t.timeout);
    }
    tokenRef.current = null;
  };

  // Smoothly move the marker from → to, then run done(). Snaps instantly under
  // reduced motion (or for a zero-length hop).
  const animate = (token: Token, from: Pt, to: Pt, reduce: boolean, done: () => void) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.hypot(dx, dy);
    if (reduce || dist < 0.5) {
      setMarker(to);
      done();
      return;
    }
    const duration = Math.min(850, Math.max(200, dist * 2));
    let start = 0; // captured from the first frame's timestamp
    const tick = (now: number) => {
      if (token.cancelled) return;
      if (start === 0) start = now;
      const t = Math.min(1, (now - start) / duration);
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // easeInOutQuad
      setMarker({ x: from.x + dx * e, y: from.y + dy * e });
      if (t < 1) token.raf = requestAnimationFrame(tick);
      else done();
    };
    token.raf = requestAnimationFrame(tick);
  };

  const begin = (name: string) => {
    cancelRun();
    const room = ROOMS.find((r) => r.name === name);
    if (!room) return;

    const route = room.route;
    const pathPts = [ENTRANCE, ...route.map((l) => POINTS[l])];
    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const token: Token = { cancelled: false, raf: 0, timeout: 0 };
    tokenRef.current = token;

    setDestination(name);
    setScanned(new Set());
    setReached(0);
    setMarker(ENTRANCE);
    setRunning(true);
    setLog([{ kind: "start", main: `Starting navigation to ${name}…` }]);

    const moveTo = (i: number) => {
      if (token.cancelled) return;
      if (i >= route.length) {
        append({ kind: "arrive", main: `Arrived: ${name}. Navigation complete.` });
        setRunning(false);
        if (tokenRef.current === token) tokenRef.current = null;
        return;
      }
      const label = route[i];
      const from = pathPts[i];
      const to = pathPts[i + 1];
      append({ kind: "move", main: `Moving to ${label}…` });
      animate(token, from, to, reduce, () => {
        if (token.cancelled) return;
        // Pause at the checkpoint to "scan" the QR code before continuing.
        token.timeout = window.setTimeout(() => {
          if (token.cancelled) return;
          if (MID_NAMES.has(label)) {
            setScanned((prev) => {
              const next = new Set(prev);
              next.add(label);
              return next;
            });
          }
          setReached(i + 1);
          append({ kind: "scan", main: `QR matched: ${label}` });
          moveTo(i + 1);
        }, 450);
      });
    };

    moveTo(0);
  };

  const pick = (name: string) => {
    if (!running) begin(name);
  };

  const reset = () => {
    cancelRun();
    setDestination(null);
    setScanned(new Set());
    setReached(0);
    setMarker(ENTRANCE);
    setRunning(false);
    setLog([]);
  };

  // Route geometry for the current selection (recomputed each frame from marker).
  const activeRoom = destination ? ROOMS.find((r) => r.name === destination) ?? null : null;
  const pathPts = activeRoom ? [ENTRANCE, ...activeRoom.route.map((l) => POINTS[l])] : [];
  const solidPts = activeRoom ? [...pathPts.slice(0, reached + 1), marker] : [];
  const dashedPts = activeRoom ? [marker, ...pathPts.slice(reached + 1)] : [];

  const statusText = running
    ? "Driving the fixed route, pausing to scan each QR checkpoint."
    : destination
      ? "Route complete: arrived and QR-verified."
      : "Idle. Eleven rooms, each with the fixed route I defined for it.";

  return (
    <figure className="overflow-hidden rounded-[3px] border border-line bg-plate">
      {/* header strip */}
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3 sm:px-6">
        <span className="flex items-center gap-2">
          <PulseDot />
          <span className="font-anno text-[10px] uppercase tracking-[0.16em] text-red">
            Live simulation: runs in your browser
          </span>
        </span>
        <span className="hidden shrink-0 font-anno text-[10px] uppercase tracking-[0.14em] text-graphite sm:block">
          Fixed routes · QR checkpoints
        </span>
      </div>

      {/* floor plan */}
      <div className="border-b border-line bg-paper p-3 sm:p-4">
        <svg
          viewBox="0 0 1000 700"
          className="h-auto w-full select-none"
          role="group"
          aria-label="Floor plan: activate a room to send the wheelchair its fixed route"
        >
          {/* title + live HUD (decorative) */}
          <g aria-hidden>
            <text x={28} y={48} className="fill-graphite font-anno" fontSize={16} letterSpacing={2.5}>
              NAVIGATION PLAN
            </text>
            <text x={28} y={68} className="fill-graphite font-anno" fontSize={11.5} letterSpacing={1}>
              GROUND FLOOR · 11 ROOMS · QR CHECKPOINTS
            </text>
            <text
              x={972}
              y={52}
              textAnchor="end"
              className={`font-anno ${running ? "fill-red" : "fill-graphite"}`}
              fontSize={13}
              letterSpacing={2}
            >
              {running ? "▶ EN ROUTE" : destination ? "■ ARRIVED" : "◦ STANDBY"}
            </text>
            <line x1={28} y1={86} x2={972} y2={86} className="stroke-line" strokeWidth={1} />
            <line x1={28} y1={556} x2={972} y2={556} className="stroke-line" strokeWidth={1} />
          </g>

          {/* rooms: each is an accessible button */}
          {ROOMS.map((r) => {
            const selected = destination === r.name;
            const cx = r.x + ROOM_W / 2;
            const cy = r.y + ROOM_H / 2;
            const rectClass = selected
              ? "fill-red-wash stroke-red"
              : `fill-plate stroke-line transition-colors ${
                  running ? "" : "group-hover:fill-red-wash/40 group-hover:stroke-red/70"
                }`;
            const labelClass = selected
              ? "fill-red"
              : `fill-ink transition-colors ${running ? "" : "group-hover:fill-red"}`;
            return (
              <g
                key={r.name}
                role="button"
                aria-label={`Drive the wheelchair to ${r.name}`}
                aria-pressed={selected}
                aria-disabled={running || undefined}
                tabIndex={running ? -1 : 0}
                onClick={() => pick(r.name)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    pick(r.name);
                  }
                }}
                className={`group ${running ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <rect
                  x={r.x}
                  y={r.y}
                  width={ROOM_W}
                  height={ROOM_H}
                  rx={1.5}
                  className={rectClass}
                  strokeWidth={selected ? 2 : 1.3}
                />
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`${labelClass} font-anno`}
                  fontSize={13.5}
                  letterSpacing={0.6}
                >
                  {r.name.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* doorways: a paper-coloured gap cut into each room's wall */}
          <g aria-hidden className="pointer-events-none">
            {ROOMS.map((r) => (
              <line
                key={`door-${r.name}`}
                x1={r.door.x - 13}
                y1={r.door.y}
                x2={r.door.x + 13}
                y2={r.door.y}
                className="stroke-paper"
                strokeWidth={3.4}
              />
            ))}
          </g>

          {/* START flag on the Entrance */}
          <text
            aria-hidden
            x={790}
            y={322}
            textAnchor="middle"
            className="fill-red font-anno"
            fontSize={9.5}
            letterSpacing={2}
          >
            START
          </text>

          {/* route: dashed pending under solid traversed */}
          {activeRoom ? (
            <g aria-hidden className="pointer-events-none" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {dashedPts.length > 1 ? (
                <polyline
                  points={pointsAttr(dashedPts)}
                  className="stroke-red"
                  strokeWidth={1.8}
                  strokeDasharray="5 7"
                  style={{ opacity: 0.5 }}
                />
              ) : null}
              {solidPts.length > 1 ? (
                <polyline points={pointsAttr(solidPts)} className="stroke-red" strokeWidth={2.4} />
              ) : null}
            </g>
          ) : null}

          {/* checkpoints */}
          <g aria-hidden className="pointer-events-none">
            {Object.entries(MIDS).map(([name, p]) => {
              const on = scanned.has(name);
              const s = 9;
              return (
                <g key={name}>
                  <rect
                    x={p.x - s / 2}
                    y={p.y - s / 2}
                    width={s}
                    height={s}
                    rx={1}
                    className={on ? "fill-red stroke-red" : "fill-paper stroke-ink"}
                    strokeWidth={1.3}
                  />
                  {on ? (
                    <path
                      d={`M${p.x - 2.4} ${p.y + 0.2} L${p.x - 0.6} ${p.y + 2} L${p.x + 2.6} ${p.y - 2.1}`}
                      className="fill-none stroke-paper"
                      strokeWidth={1.4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : null}
                </g>
              );
            })}
          </g>

          {/* wheelchair marker */}
          <g aria-hidden className="pointer-events-none" transform={`translate(${marker.x} ${marker.y})`}>
            {running ? (
              <circle
                r={12}
                className="fill-none stroke-red motion-safe:animate-ping"
                strokeWidth={1.2}
                style={{ transformBox: "fill-box", transformOrigin: "center", opacity: 0.5 }}
              />
            ) : null}
            {/* rear wheel + push-rim + hub */}
            <circle r={8} className="fill-none stroke-red" strokeWidth={1.5} />
            <circle r={5.4} className="fill-none stroke-red/50" strokeWidth={0.8} />
            <circle r={1.6} className="fill-red" />
            {/* front caster */}
            <circle cx={10} cy={6.5} r={1.8} className="fill-none stroke-red" strokeWidth={1.2} />
            {/* seated figure */}
            <circle cx={1.5} cy={-12.5} r={2.9} className="fill-red" />
            <path
              d="M1.5 -9.6 L0 -3.4 L8 -3.4 L10 3.6"
              className="fill-none stroke-red"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* legend */}
          <g aria-hidden className="pointer-events-none">
            {/* checkpoint */}
            <rect x={200} y={583} width={9} height={9} rx={1} className="fill-paper stroke-ink" strokeWidth={1.3} />
            <text x={218} y={588} className="fill-graphite font-anno" fontSize={12.5} letterSpacing={1}>
              QR CHECKPOINT
            </text>
            {/* scanned */}
            <rect x={430} y={583} width={9} height={9} rx={1} className="fill-red stroke-red" strokeWidth={1.3} />
            <path
              d="M431.9 587.7 L433.7 589.5 L436.9 585.4"
              className="fill-none stroke-paper"
              strokeWidth={1.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x={448} y={588} className="fill-graphite font-anno" fontSize={12.5} letterSpacing={1}>
              SCANNED
            </text>
            {/* wheelchair */}
            <g transform="translate(615 587.5)">
              <circle r={5} className="fill-none stroke-red" strokeWidth={1.3} />
              <circle r={1.1} className="fill-red" />
            </g>
            <text x={628} y={588} className="fill-graphite font-anno" fontSize={12.5} letterSpacing={1}>
              WHEELCHAIR
            </text>
          </g>
        </svg>
      </div>

      {/* controls + status log */}
      <div className="grid lg:grid-cols-2">
        {/* controls */}
        <div className="flex flex-col border-b border-line p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <p className="anno mb-2">Destination</p>
          <p
            className={`font-struct text-[26px] font-bold leading-tight tracking-tight ${
              destination ? "text-red" : "text-ink"
            }`}
          >
            {destination ?? "Pick a room"}
          </p>
          <p className="mt-2 font-prose text-[13.5px] leading-snug text-ink-soft">{statusText}</p>

          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={reset}
              disabled={!destination && !running}
              className="rounded-[2px] border border-line px-3 py-1.5 font-anno text-[11px] uppercase tracking-[0.1em] text-ink-soft transition-colors enabled:hover:border-red enabled:hover:text-red disabled:pointer-events-none disabled:opacity-40"
            >
              Reset
            </button>
            <span className="font-anno text-[10.5px] uppercase tracking-[0.12em] text-graphite">
              {running ? "Locked while driving" : "Select a room on the plan"}
            </span>
          </div>

          <p className="mt-5 border-t border-line pt-4 font-prose text-[13px] leading-relaxed text-ink-soft/90">
            Fixed waypoint routes with QR-gated checkpoints, not live pathfinding. The
            chair drives to each corridor checkpoint, waits to scan the matching QR code,
            then continues to the next.
          </p>
        </div>

        {/* status log */}
        <div className="flex flex-col p-5 sm:p-6">
          <p className="anno mb-2">Status log</p>
          <div className="flex-1 overflow-hidden rounded-[2px] border border-line bg-paper">
            <div className="flex items-center justify-between border-b border-line px-3 py-1.5">
              <span className="font-anno text-[10px] uppercase tracking-[0.14em] text-graphite">
                nav · readout
              </span>
              <span className="font-anno text-[10px] text-graphite">
                {log.length ? `${log.length} events` : "–"}
              </span>
            </div>
            <ol
              ref={logRef}
              aria-live="polite"
              aria-label="Navigation status log"
              className="max-h-[15rem] min-h-[9rem] space-y-1 overflow-y-auto px-3 py-3 font-anno text-[11.5px] leading-relaxed"
            >
              {log.length === 0 ? (
                <li className="text-graphite">Awaiting destination: select a room to begin.</li>
              ) : (
                log.map((e, i) => (
                  <li key={i} className="animate-rise">
                    <span className={LINE_COLOR[e.kind]}>{e.main}</span>
                    {e.kind === "scan" ? <span className="font-semibold text-red"> ✓</span> : null}
                  </li>
                ))
              )}
              {running ? (
                <li aria-hidden className="flex items-center text-graphite">
                  <span className="mr-1 text-red">›</span>
                  <span className="inline-block h-[1.05em] w-[6px] translate-y-[1px] bg-red/80 motion-safe:animate-pulse" />
                </li>
              ) : null}
            </ol>
          </div>
        </div>
      </div>
    </figure>
  );
}

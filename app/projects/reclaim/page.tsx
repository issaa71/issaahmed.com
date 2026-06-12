import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import {
  CaseStudyShell,
  Section,
  Metric,
  MetricGrid,
  Artifact,
  ArtifactRow,
  TechRow,
  YouTubeEmbed,
  VideoGrid,
  Figure,
  ComparisonTable,
  Callout,
} from "../_components/case-study";

export const metadata: Metadata = {
  title: "RECLAIM — Autonomous Waste-Sorting Robot",
  description:
    "Autonomous waste-sorting capstone robot (ROS2, Jetson Orin NX, 6-DOF arm) — 3rd place. Post-capstone, the navigation simulator was rebuilt to the real robot's calibrated specs and re-benchmarked: 15/15 missions complete vs the showcase algorithm's 6/15.",
  openGraph: {
    title: "RECLAIM — Autonomous Waste-Sorting Robot",
    description:
      "Autonomous waste-sorting capstone robot (ROS2, Jetson Orin NX, 6-DOF arm) — 3rd place. Post-capstone, the navigation simulator was rebuilt to the real robot's calibrated specs and re-benchmarked: 15/15 missions complete vs the showcase algorithm's 6/15.",
    type: "article",
  },
};

// Stills from reclaim_v2's clean-screenshot (H-key) mode. These 4 PNGs are
// captured later and dropped into public/projects/reclaim/. The section below
// renders automatically once all four files are present and the site rebuilds —
// until then it is omitted entirely, so the page is never placeholder-free nor
// shows broken images.
const STILLS = [
  {
    src: "/projects/reclaim/sim-route-cafeteria.png",
    alt: "Top-down view of the cafeteria flagship run (seed 42) mid-COLLECT, with the planned route drawn over the venue.",
    caption:
      "Planned route on the cafeteria flagship run (seed 42) — the Held-Karp-ordered batch with the dump stop inserted at the minimum-detour boundary.",
  },
  {
    src: "/projects/reclaim/sim-frontier-fog.png",
    alt: "Fog-of-war during the SCAN behavior, showing a frontier cluster and the directed scan arc.",
    caption:
      "Frontier exploration: scan viewpoints sit on the seen side of the fog boundary, scored by unseen cells revealed per unit of travel-plus-scan time.",
  },
  {
    src: "/projects/reclaim/sim-timeline.png",
    alt: "The behavior timeline panel with live detection captions and the preset and seed reproducibility chip.",
    caption:
      "Behavior timeline and live detection captions. The preset · seed chip reproduces this run byte-for-byte.",
  },
  {
    src: "/projects/reclaim/sim-dashboard.png",
    alt: "The comparison dashboard across all five algorithms, with per-metric winner badges and persisted run history.",
    caption:
      "Comparison dashboard across all five algorithms — per-metric winner badges and persisted run history.",
  },
] as const;

const stillsReady = STILLS.every((s) =>
  existsSync(path.join(process.cwd(), "public", s.src))
);

export default function Page() {
  return (
    <CaseStudyShell
      eyebrow="Robotics · ROS2 · Computer Vision"
      title="RECLAIM — Autonomous Indoor Waste-Sorting Robot"
      tagline="An end-to-end robot for post-event venues that scans for litter, drives to it, picks it up with a 6-DOF arm, classifies it, and sorts it into the correct bin — fully autonomously."
      meta="MSE 4499 Mechatronic Design Project · Western Engineering · 3rd place · Showcase March 2026 · Nav stack rebuilt + re-benchmarked June 2026"
    >
      <figure className="overflow-hidden rounded-xl border border-border">
        <Image
          src="/projects/reclaim/team.jpg"
          alt="The RECLAIM capstone team with the prototype at the Western Engineering MSE 4499 showcase."
          width={1024}
          height={768}
          priority
          quality={60}
          sizes="(max-width: 768px) 100vw, 672px"
          className="w-full h-auto"
        />
        <figcaption className="px-4 py-3 text-xs text-muted border-t border-border bg-background">
          Team RECLAIM with the prototype at the Western Engineering MSE 4499 showcase (March 26, 2026). 3rd place placement.
        </figcaption>
      </figure>

      <Section title="Headline">
        <MetricGrid>
          <Metric
            label="Mission completion"
            value="15/15"
            hint="navigation re-benchmark on a sim calibrated to the real robot (June 2026) — 5 venue presets × 3 seeds, all complete; best baseline: 12/15"
            accent
          />
          <Metric
            label="Per-meter efficiency"
            value="5.2×"
            hint="cafeteria flagship: 80/80 items in 179.1 m vs nearest-neighbor's 75/80 in 929.5 m"
          />
          <Metric
            label="Perception mAP50"
            value="0.826"
            hint="up from 0.693 via 7 training iterations + confusion-matrix-driven class elimination"
          />
          <Metric
            label="Inference rate"
            value="30 FPS"
            hint="YOLO26n + TensorRT FP16 on Jetson Orin NX"
          />
          <Metric
            label="Live demo"
            value="6 classes · 0 manual interventions"
            hint="March 26, 2026 — full scan→detect→drive→pick→sort cycles"
          />
          <Metric label="Placement" value="🥉 3rd place" hint="MSE 4499 cohort" />
        </MetricGrid>
      </Section>

      <Section title="Demo videos">
        <p>
          Three pick-attempt runs on the physical prototype, captured during capstone
          testing and on the showcase floor (March 2026). Each exercises the full
          vision-servo loop: detect → approach → pick → sort. (The navigation
          re-benchmark above is post-capstone, in simulation.)
        </p>
        <VideoGrid>
          <YouTubeEmbed
            id="_Bktd8VUelg"
            title="Pickup 1 — Tissue, then water bottle"
            caption="Two-item autonomous run from capstone prototype testing, March 2026: landfill (tissue) → recyclable (water bottle), correctly classified and sorted."
          />
          <YouTubeEmbed
            id="vifXLBFmasQ"
            title="Pickup 2 — Aluminum can"
            caption="Single-item run on a recyclable, March 2026 — the scan → detect → drive → pick → sort loop on the physical prototype."
          />
          <YouTubeEmbed
            id="jR9Q2AjDWao"
            title="Pickup 3 — Three-class sweep"
            caption="Showcase-period run across all three waste streams: landfill (paper cup) → recyclable (aluminum can) → compost (half-eaten apple). Physical prototype, March 2026."
          />
        </VideoGrid>
      </Section>

      {/* Inside the rebuilt simulator — renders automatically once all four
          H-key stills are dropped into public/projects/reclaim/ and the site
          rebuilds. Until then the section is omitted (no placeholder, no broken
          image). See STILLS above for the expected filenames. */}
      {stillsReady ? (
        <Section title="Inside the rebuilt simulator">
          <p>
            Stills from reclaim_v2&apos;s clean-screenshot mode — what the live demo looks
            like under the hood.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {STILLS.map((s) => (
              <Figure
                key={s.src}
                src={s.src}
                alt={s.alt}
                caption={s.caption}
                width={1600}
                height={900}
              />
            ))}
          </div>
        </Section>
      ) : null}

      <Section title="Results — the re-benchmarked navigation stack">
        <p>
          Re-benchmarked across 5 venue presets × 3 seeds (15 missions per algorithm), v2
          completed every venue — from conference (30 items; seed 7: 1030.6 s, 130.3 m) to
          expo (70 items; seed 42: 3142 s, 508.4 m, 5 dump trips):
        </p>
        <ComparisonTable
          columns={["Algorithm", "Missions complete", "Items collected", "Notes"]}
          rows={[
            {
              cells: [
                "RECLAIM v2",
                "15/15",
                "447/450",
                "99.0–100% verified coverage every run; 3 items declared unviewable, logged",
              ],
              highlight: true,
            },
            {
              cells: [
                "Info-gain explorer",
                "12/15",
                "380/450",
                "stalls out; leaves 3–10 items per run",
              ],
            },
            {
              cells: [
                "Nearest-neighbor",
                "10/15",
                "412/450",
                "avg 602.8 m driven vs v2's 301.2 m",
              ],
            },
            {
              cells: [
                "Full boustrophedon",
                "6/15",
                "318/450",
                "rigid stripes fail in complex venues",
              ],
            },
            {
              cells: [
                "RECLAIM v1 (showcase algorithm)",
                "6/15",
                "246/450",
                "self-declares done prematurely at ~95% fog",
              ],
            },
          ]}
          caption="5 venue presets (conference 30 items, banquet 60, gym 50, cafeteria 80, expo 70) × 3 seeds, calibrated 0.3 m/s robot model. Deterministic — byte-identical replays per (preset, seed). Supersedes the Appendix D benchmarks in the final report, which were measured on the idealized 0.5 m/s v1 simulator."
        />
        <Callout title="Flagship run — cafeteria, 80 items, seed 42">
          RECLAIM v2 collected 80/80 items in 179.1 m of driving. The nearest-neighbor
          baseline drove 929.5 m — 5.2× farther — and still finished with 75/80. Per meter
          of travel, that&apos;s the difference between a robot that finishes the job and
          one that wanders.
        </Callout>
        <Callout title="Why items per minute is the wrong headline">
          v2 posts lower items-per-minute than some baselines, and that&apos;s by
          construction. It models the real robot&apos;s stop-look-drive approach — TURN,
          DRIVE, ALIGN, roughly 13 seconds per item at calibrated speeds — while the
          baselines grab items with idealized continuous motion. v2 also refuses to declare
          a mission done before reaching ≥99% verified coverage and returning for a final
          dump; baselines quit at 90–96%. Throughput comparisons across that asymmetry would
          flatter the wrong side. The numbers that survive it are mission completion and
          distance per item collected — so those are the headlines.
        </Callout>
      </Section>

      <Section title="Artifacts">
        <ArtifactRow>
          <Artifact
            href="https://github.com/issaa71/CapstoneRECLAIM"
            label="GitHub repository"
            detail="5-package ROS2 monorepo — issaa71/CapstoneRECLAIM"
          />
          <Artifact
            href="https://reclaim-nav-sim.vercel.app"
            label="Interactive 3D navigation simulation"
            detail="Live React + Three.js (reclaim_v2) — 5 seeded venue presets, comparison dashboard, behavior timeline, deterministic replays"
          />
          <Artifact
            href="https://www.youtube.com/watch?v=jR9Q2AjDWao"
            label="Demo video · Three-class sweep"
            detail="YouTube · autonomous run across landfill, recyclable, and compost in one demo"
          />
        </ArtifactRow>
      </Section>

      <Section title="Problem">
        <p>
          Post-event waste at large indoor venues is a concurrent operational and
          environmental problem. A single NFL game generates 35–40 tonnes of waste at
          cleanup costs approaching $46,000, while single-stream recycling contamination
          rates of 25–30% cost the U.S. recycling industry an estimated $3.5–4 billion
          annually. Existing automation addresses these problems in isolation — floor
          scrubbers lack end effectors, stationary sorters like AMP Robotics Cortex
          require fixed conveyor infrastructure. No commercially available platform
          integrates autonomous navigation, object-level detection, physical pickup, and
          multi-stream sorting on a single mobile base.
        </p>
      </Section>

      <Section title="My role">
        <p>
          4-person capstone team (Abdul Kassem, Issa Ahmed, Dev Panara, Shady Siam). I
          owned the perception + control stack end-to-end: the Jetson Orin NX onboard
          computer and every Python ROS2 node running on it, the Teensy 4.1 firmware
          + pinout/wiring for actuators and encoders, the YOLO perception model design
          and TensorRT export pipeline, and the URDF + servo work for the 6-DOF arm.
        </p>
      </Section>

      <Section title="System architecture">
        <p>
          The product integrates five subsystems on a differential-drive platform: 24V
          E-S planetary gearmotors for locomotion, a 6-DOF arm for pick-and-place, an
          OAK-D stereo camera with YOLO under TensorRT FP16 for detection across
          waste classes, a Livox Mid-360 3D LiDAR with SLAM Toolbox + a hybrid coverage
          algorithm for navigation, and an STM32F405 microcontroller for CAN-bus
          actuator control. The reduced-scope prototype used lower-cost substitutes —
          OAK-D Lite, a hobby-servo arm with a LewanSoul claw, YOLO26n (6 classes),
          Teensy 4.1, and a vision-servo state machine — but exercised the full
          scan→detect→drive→pick→sort loop.
        </p>
        <p>
          The repository is a five-package ROS2 monorepo:{" "}
          <code>reclaim_perception</code>, <code>reclaim_navigation</code>,{" "}
          <code>reclaim_control</code>, <code>reclaim_bringup</code>, and{" "}
          <code>reclaim_interfaces</code>.
        </p>
      </Section>

      <Section title="Approach — perception">
        <p>
          YOLO26n trained on a combination of Roboflow + Kaggle waste datasets, refined
          across 7 iterations using confusion-matrix-driven class elimination to remove
          ambiguous classes. mAP50 improved from 0.693 to 0.826 across iterations.
          Exported under TensorRT FP16 to hit 30 FPS on the Jetson Orin NX — sufficient
          to drive a vision-servo control loop without dropping frames.
        </p>
      </Section>

      <Section title="Approach — navigation (rebuilt post-capstone)">
        <p>
          The capstone shipped a robot — and a navigation benchmark I stopped trusting.
          The original simulator assumed an idealized 0.5 m/s robot with continuous
          motion, and its numbers made it into the final report. After the March showcase
          I rebuilt the simulator from scratch (reclaim_v2, June 2026), calibrated to the
          real robot&apos;s measured specs — 0.3 m/s max linear velocity, 1.0 rad/s
          angular, 0.3 m/s² acceleration, 0.470 m wheel separation, the OAK-D&apos;s 73°
          FOV and 0.4–3.0 m detection range, and the ~13 s/item stop-look-drive approach
          cadence from the real <code>waste_tracker_v2.py</code> pipeline — then
          re-benchmarked every algorithm on it. Every navigation number on this page comes
          from that re-baseline. The honest result: the algorithm I presented at the
          showcase completes 6 of 15 missions on the calibrated simulator. The rewrite
          completes 15 of 15.
        </p>
        <p>
          reclaim_v2 is an event-driven executive over four behaviors — SCAN, COLLECT,
          SWEEP, DUMP — arbitrated by priority:
        </p>
        <ul className="space-y-3 pl-5 list-disc">
          <li>
            <strong>Commits, doesn&apos;t thrash.</strong> The executive re-decides only
            on events — item picked, scan finished, path blocked — never per-tick, so
            target switches happen at plan boundaries instead of oscillating between goals.
          </li>
          <li>
            <strong>SCAN — frontier exploration.</strong> Scan viewpoints sit on the seen
            side of the fog boundary, scored by unseen cells revealed per unit of
            travel-plus-scan time, with a directed pivot scan on arrival (0.25 rad/s around
            the left wheel, like the real robot).
          </li>
          <li>
            <strong>COLLECT — exact routing where it&apos;s affordable.</strong> Batches of
            ≤7 items are routed exactly (Held-Karp) over true A* path distances; larger
            batches use nearest-neighbor + 2-opt. Dump-station stops are inserted at the
            tour boundary that adds the least detour, computed in closed form from an
            init-time Dijkstra field.
          </li>
          <li>
            <strong>Motion + recovery.</strong> Pure-pursuit driving with acceleration
            limits matching the real drivetrain, plus a watchdog recovery ladder — 3
            consecutive A* failures requeues the item, 6 abandons and logs it — so one
            unreachable item can never hang a mission.
          </li>
        </ul>
        <p>
          The simulator runs entirely client-side — React + Three.js (R3F), with a headless
          Node harness that regenerates the benchmark matrix from a single command. Every
          run is reproducible byte-for-byte from its (preset · seed) chip, shown in the UI.
          Try it live: pick a venue and seed, watch the planned route, behavior timeline,
          and live detection captions, and pit v2 against the four baselines on the
          comparison dashboard —{" "}
          <a
            href="https://reclaim-nav-sim.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            interactive 3D demo ↗
          </a>
          .
        </p>
      </Section>

      <Section title="Approach — manipulation">
        <p>
          The product arm is a 4-DOF CubeMars BLDC arm with a Robotis parallel gripper
          driven by MoveIt2 motion planning. MATLAB inverse-dynamics confirmed adequate
          torque margins across all arm joints with a 500 g payload, and a computed
          torque controller achieved near-zero tracking error across pick-and-place
          trajectories. The prototype substituted a hobby-servo arm with PI joint
          control and a PI tracking controller for vision-servo approach behaviour.
        </p>
      </Section>

      <Section title="Live demo (March 26, 2026)">
        <p>
          The prototype was demonstrated live, completing fully autonomous
          scan→detect→drive→pick→sort cycles across all six waste classes with no manual
          intervention. The cohort awarded the project 3rd place.
        </p>
        <figure className="mt-6 mx-auto max-w-md overflow-hidden rounded-xl border border-border">
          <Image
            src="/projects/reclaim/demo.jpg"
            alt="The RECLAIM prototype on the showcase floor with status monitors in the background showing the SCAN phase of the state machine."
            width={768}
            height={1024}
            className="w-full h-auto"
          />
          <figcaption className="px-4 py-3 text-xs text-muted border-t border-border bg-background">
            Prototype on the showcase floor. Status monitors (background) show the state machine in the SCAN phase.
          </figcaption>
        </figure>
      </Section>

      <Section title="Tech stack">
        <TechRow
          items={[
            "ROS2 Humble",
            "Python",
            "C / micro-ROS",
            "PyTorch",
            "OpenCV",
            "YOLO26n",
            "TensorRT FP16",
            "Roboflow",
            "Nav2",
            "SLAM Toolbox",
            "MoveIt2",
            "Foxglove Studio",
            "Three.js (R3F)",
            "Jetson Orin NX",
            "OAK-D Lite",
            "RPLIDAR A1M8",
            "Teensy 4.1",
            "SolidWorks",
            "MATLAB",
          ]}
        />
      </Section>

      <Section title="Reflection">
        <p>
          The tightest engineering constraint was the gap between the product spec and
          what we could realistically build in 8 months on an undergraduate budget. The
          response was to scope two layers — a fully specified product (CubeMars BLDC
          arm, OAK-D Pro, Livox Mid-360 LiDAR, STM32F405 + CAN, 27+ waste classes,
          MoveIt2 + Nav2) and a reduced-scope prototype that exercised the same control
          loop with hobby-grade components. That separation forced honest reasoning
          about what we were validating with each subsystem and is what carried us
          through the live demo without manual intervention.
        </p>
        <p>
          The second constraint was self-imposed, after the grade was in: the navigation
          benchmark I&apos;d presented was measured on an idealized simulator, and I knew
          it. Rebuilding the simulator around the real robot&apos;s calibrated dynamics —
          and publishing that the showcase-era algorithm completes 6 of 15 missions on it
          — cost me the headline number and bought a result I can defend line by line.
        </p>
      </Section>
    </CaseStudyShell>
  );
}

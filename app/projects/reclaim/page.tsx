import type { Metadata } from "next";
import {
  SheetShell,
  Section,
  CalloutStrip,
  Callout,
  LiveBar,
  Reel,
  VideoGrid,
  FigurePlate,
  DataTable,
  NoteBlock,
  RevBlock,
  EquipList,
  FlowDiagram,
  FsmDiagram,
  SpecGrid,
} from "../_components/sheet";

export const metadata: Metadata = {
  title: "RECLAIM: Autonomous Waste-Sorting Robot",
  description:
    "Autonomous waste-sorting capstone robot (ROS2, Jetson Orin NX, 4-DOF arm): 3rd overall and 1st in the AI division. Post-capstone, I rebuilt the navigation simulator to the real robot's calibrated specs and re-benchmarked it: 15/15 missions complete vs the showcase algorithm's 6/15.",
  openGraph: {
    title: "RECLAIM: Autonomous Waste-Sorting Robot",
    description:
      "Autonomous waste-sorting capstone robot (ROS2, Jetson Orin NX, 4-DOF arm): 3rd overall and 1st in the AI division. Post-capstone, I rebuilt the navigation simulator to the real robot's calibrated specs and re-benchmarked it: 15/15 missions complete vs the showcase algorithm's 6/15.",
    type: "article",
  },
};

export default function Page() {
  return (
    <SheetShell
      sheetNo="01"
      sheetCount="06"
      eyebrow="Robotics · ROS2 · Computer Vision"
      title="RECLAIM: Autonomous Indoor Waste-Sorting Robot"
      tagline="An end-to-end robot for post-event venues that scans for litter, drives to it, picks it up with a 4-DOF arm, classifies it, and sorts it into the correct bin, fully autonomously."
      meta="MSE 4499 Mechatronic Design Project · Western Engineering · 3rd overall + 1st in the AI division · Showcase March 2026 · Nav stack rebuilt + re-benchmarked June 2026"
      status={[
        { label: "3rd overall · 1st in AI division", tone: "red" },
        { label: "Live sim", tone: "red", pulse: true },
      ]}
    >
      <FigurePlate
        src="/projects/reclaim/demo.jpg"
        alt="The RECLAIM prototype on the showcase floor: autonomous drive base, sensor mast, 4-DOF sorting arm, and the labelled TRASH and COMPOST bins."
        caption="The RECLAIM prototype: an autonomous drive base, a 4-DOF sorting arm, and the recyclable / compost / landfill bins it sorts into."
        width={768}
        height={1024}
        priority
        className="mx-auto max-w-lg"
      />

      <CalloutStrip>
        <Callout
          label="Mission completion"
          value="15/15"
          hint="navigation re-benchmark on a sim calibrated to the real robot (June 2026), 5 venue presets × 3 seeds, all complete; best baseline: 12/15"
          accent
        />
        <Callout
          label="Per-meter efficiency"
          value="5.2×"
          hint="cafeteria flagship: 80/80 items in 179.1 m vs nearest-neighbor's 75/80 in 929.5 m"
        />
        <Callout
          label="Perception mAP50"
          value="0.826"
          hint="up from 0.693 via three training cycles + confusion-matrix-driven class elimination (11 → 6 classes)"
        />
        <Callout
          label="Inference rate"
          value="30 FPS"
          hint="YOLO26n + TensorRT FP16 on Jetson Orin NX"
        />
        <Callout
          label="Showcase run"
          value="0"
          hint="manual interventions: 6 waste classes, full scan → detect → drive → pick → sort cycles, March 26 2026"
        />
        <Callout
          label="Placement"
          value="3rd"
          hint="overall, and 1st in the AI division · MSE 4499 capstone cohort"
          accent
        />
      </CalloutStrip>

      {/* Interactive 3D simulator: runs live in the visitor's browser. */}
      <LiveBar
        href="https://reclaim-nav-sim.vercel.app"
        kicker="Interactive 3D simulator · runs in your browser"
        title="Watch the 15/15 navigation stack run: pick a venue and seed, race it against four baselines"
        sub="reclaim_v2 · deterministic replays · comparison dashboard"
        className="breakout"
      />

      <Section title="System architecture">
        <SpecGrid
          label="Product design (specified, not built)"
          items={[
            { name: "Livox Mid-360", role: "3D LiDAR: SLAM + navigation" },
            { name: "6-DOF arm", role: "MoveIt2 pick-and-place, product spec (prototype: 4-DOF)" },
            { name: "Jetson Orin NX", role: "onboard compute; runs every ROS2 node" },
            { name: "STM32F405", role: "CAN-bus actuator control" },
            { name: "Onboard battery", role: "untethered power for compute + drive" },
            { name: "OAK-D Pro", role: "stereo depth camera for YOLO perception" },
          ]}
        />
        <FlowDiagram
          label="Autonomy loop"
          steps={[
            { label: "SCAN", sub: "LiDAR + frontier exploration" },
            { label: "DETECT", sub: "YOLO26n · 30 FPS" },
            { label: "DRIVE", sub: "pure-pursuit nav" },
            { label: "PICK", sub: "4-DOF arm" },
            { label: "SORT", sub: "3 waste streams" },
          ]}
          caption="The full autonomy loop, run once per item at the real robot's ~13 s stop-look-drive cadence. Every section below details one stage."
        />
        <p>
          The product integrates five subsystems on a differential-drive platform: 24V
          E-S planetary gearmotors for locomotion, a 6-DOF arm for pick-and-place, an
          OAK-D stereo camera with YOLO under TensorRT FP16 for detection across
          waste classes, a Livox Mid-360 3D LiDAR with SLAM Toolbox + a hybrid coverage
          algorithm for navigation, and an STM32F405 microcontroller for CAN-bus
          actuator control. The reduced-scope prototype used lower-cost substitutes,
          OAK-D Lite, a 4-DOF hobby-servo arm with a LewanSoul claw, YOLO26n (6 classes),
          Teensy 4.1, and a vision-servo state machine, with an RPLIDAR A1M8 on the
          prototype, but exercised the full scan→detect→drive→pick→sort loop.
        </p>
        <p>
          The repository is a five-package ROS2 monorepo:{" "}
          <code>reclaim_perception</code>, <code>reclaim_navigation</code>,{" "}
          <code>reclaim_control</code>, <code>reclaim_bringup</code>, and{" "}
          <code>reclaim_interfaces</code>.
        </p>
        <FigurePlate
          src="/projects/reclaim/ros2-architecture.png"
          alt="ROS2 node graph for the RECLAIM product: a Navigation cluster (livox_driver, slam_toolbox, Nav2), a Perception node (OAK-D + YOLO, TensorRT FP16 at 30 FPS), a central waste_tracker state machine (SCAN → APPROACH → PICK → DEPOSIT), a Manipulation cluster (pick_and_place, move_group/MoveIt2, controller_manager over CAN), a Locomotion drive_controller, and a Monitoring bridge, with the ROS2 topics wiring them together."
          caption="The product ROS2 node graph: every node and the topics wiring perception → planning → navigation → manipulation, all running on a Jetson Orin NX (ROS 2 Humble)."
          width={1239}
          height={962}
          className="breakout"
        />
      </Section>

      <Section title="Hardware & electronics">
        <p>
          Beyond the software, the product is a full electromechanical design: mechanical
          CAD, the microcontroller wiring I laid out, and its power distribution. I owned the
          perception + control electronics and the arm; the chassis CAD is the team&apos;s
          product concept.
        </p>
        <FigurePlate
          src="/projects/reclaim/cad-product.png"
          alt="SolidWorks render of the RECLAIM product concept: a differential-drive chassis with three translucent sort bins, an e-stop and status beacon on top, a battery and compute bay, and a 6-DOF arm with a gripper."
          caption="The product-concept CAD: a differential-drive chassis, three sort bins, an e-stop + status beacon, and the 6-DOF sorting arm I did the URDF + servo work for."
          width={924}
          height={689}
          className="mx-auto max-w-2xl"
        />
        <FigurePlate
          src="/projects/reclaim/prototype-labeled.jpg"
          alt="Top-down labeled photo of the RECLAIM prototype's electronics on its plywood base: OAK-D Lite camera, Teensy 4.1 microcontroller, MIC-711 computer, battery, robotic arm, fuse block, Wago power splitter, Cytron motor controller, and buck converter."
          caption="The prototype electronics, labeled: Teensy 4.1, MIC-711 compute, OAK-D Lite, the Cytron motor controller, battery, buck converter, fuse block, and Wago power splitter. I owned the Teensy firmware and the actuator/encoder wiring."
          width={1400}
          height={781}
          className="breakout"
        />
      </Section>

      <Section title="Demo videos">
        <p>
          Three pick-attempt runs on the physical prototype, captured during capstone
          testing and on the showcase floor (March 2026). Each exercises the full
          vision-servo loop: detect → approach → pick → sort. (The navigation
          re-benchmark above is post-capstone, in simulation.)
        </p>
        <VideoGrid className="breakout">
          <Reel
            id="_Bktd8VUelg"
            title="Pickup 1: Tissue, then water bottle"
            caption="Two-item autonomous run from capstone prototype testing, March 2026: landfill (tissue) → recyclable (water bottle), correctly classified and sorted."
          />
          <Reel
            id="vifXLBFmasQ"
            title="Pickup 2: Aluminum can"
            caption="Single-item run on a recyclable, March 2026: the scan → detect → drive → pick → sort loop on the physical prototype."
          />
          <Reel
            id="jR9Q2AjDWao"
            title="Pickup 3: Three-class sweep"
            caption="Showcase-period run across all three waste streams: landfill (paper cup) → recyclable (aluminum can) → compost (half-eaten apple). Physical prototype, March 2026."
          />
        </VideoGrid>
      </Section>

      <Section title="Results: the re-benchmarked navigation stack">
        <p>
          Re-benchmarked across 5 venue presets × 3 seeds (15 missions per algorithm), v2
          completed every venue, from conference (30 items; seed 7: 1030.6 s, 130.3 m) to
          expo (70 items; seed 42: 3142 s, 508.4 m, 5 dump trips):
        </p>
        <div className="breakout">
          <DataTable
            columns={["Algorithm", "Missions complete", "Items collected", "Notes"]}
            rows={[
              {
                cells: [
                  "RECLAIM v2",
                  "15/15",
                  "867/870",
                  "99.0–100% verified coverage every run; 3 items declared unviewable, logged",
                ],
                highlight: true,
              },
              {
                cells: [
                  "Info-gain explorer",
                  "12/15",
                  "820/870",
                  "stalls out; leaves 3–10 items per run",
                ],
              },
              {
                cells: [
                  "Nearest-neighbor",
                  "10/15",
                  "846/870",
                  "avg 655.1 m driven vs v2's 299.4 m",
                ],
              },
              {
                cells: [
                  "Full boustrophedon",
                  "6/15",
                  "810/870",
                  "rigid stripes fail in complex venues",
                ],
              },
              {
                cells: [
                  "RECLAIM v1 (showcase algorithm)",
                  "6/15",
                  "808/870",
                  "self-declares done prematurely at ~95% fog",
                ],
              },
            ]}
            caption="5 venue presets (conference 30 items, banquet 60, gym 50, cafeteria 80, expo 70: 290 per seed × 3 seeds = 870 items per algorithm), calibrated 0.3 m/s robot model. Deterministic: byte-identical replays per (preset, seed), regenerated straight from the headless harness (BENCHMARKS.txt). Supersedes the Appendix D benchmarks in the final report, which were measured on the idealized 0.5 m/s v1 simulator."
          />
        </div>
        <NoteBlock title="Flagship run: cafeteria, 80 items, seed 42">
          RECLAIM v2 collected 80/80 items in 179.1 m of driving. The nearest-neighbor
          baseline drove 929.5 m (5.2× farther) and still finished with 75/80. Per meter
          of travel, that&apos;s the difference between a robot that finishes the job and
          one that wanders.
        </NoteBlock>
        <NoteBlock title="Why items per minute is the wrong headline">
          v2 posts lower items-per-minute than some baselines, and that&apos;s by
          construction. It models the real robot&apos;s stop-look-drive approach (TURN,
          DRIVE, ALIGN, roughly 13 seconds per item at calibrated speeds) while the
          baselines grab items with idealized continuous motion. v2 also refuses to declare
          a mission done before reaching ≥99% verified coverage and returning for a final
          dump; baselines quit at 90–96%. Throughput comparisons across that asymmetry would
          flatter the wrong side. The numbers that survive it are mission completion and
          distance per item collected, so those are the headlines.
        </NoteBlock>
      </Section>

      <Section title="Problem">
        <p>
          Post-event waste at large indoor venues is a concurrent operational and
          environmental problem. A single NFL game generates 35–40 tonnes of waste at
          cleanup costs approaching $46,000, while single-stream recycling contamination
          rates of 25–30% cost the U.S. recycling industry an estimated $3.5–4 billion
          annually. Existing automation addresses these problems in isolation: floor
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
          and TensorRT export pipeline, and the URDF + servo work for the 4-DOF prototype arm.
        </p>
      </Section>

      <Section title="Approach: perception">
        <p>
          YOLO26n trained on a combination of Roboflow + Kaggle waste datasets, refined
          across three training cycles (v3, v5, v6) using confusion-matrix-driven class
          elimination to cut the class set from 11 to 6 and drop ambiguous categories. mAP50
          improved from 0.693 to 0.826 across those cycles.
          Exported under TensorRT FP16 to hit 30 FPS on the Jetson Orin NX, sufficient
          to drive a vision-servo control loop without dropping frames.
        </p>
        <FigurePlate
          src="/projects/reclaim/showcase-perception.jpg"
          alt="Issa presenting the RECLAIM perception stack at the showcase, monitors showing the detector's throughput, model size, and class-to-bin map."
          caption="Demoing the perception stack at the showcase: the monitors show the TensorRT-FP16 detector at 30 FPS, its 5.1 MB model, and the class-to-bin mapping."
          width={1200}
          height={1600}
          className="mx-auto max-w-md"
        />
        <FigurePlate
          src="/projects/reclaim/perception-detection.jpg"
          alt="The RECLAIM perception node's live output: YOLO bounding boxes labeling a cup (0.70), a napkin (0.42), and a plastic bottle (0.41), each annotated with its 3D X/Y/Z position in millimetres from the depth camera."
          caption="The detector running live: each waste item gets a YOLO class + confidence and a 3D position (X/Y/Z in mm) fused from the OAK-D depth camera (what the arm uses to reach for it)."
          width={1600}
          height={1277}
        />
      </Section>

      <Section title="Approach: navigation (rebuilt post-capstone)">
        <p>
          The capstone shipped a robot, and a navigation benchmark I stopped trusting.
          The original simulator assumed an idealized 0.5 m/s robot with continuous
          motion, and its numbers made it into the final report. After the March showcase
          I rebuilt the simulator from scratch (reclaim_v2, June 2026), calibrated to the
          real robot&apos;s measured specs: 0.3 m/s max linear velocity, 1.0 rad/s
          angular, 0.3 m/s² acceleration, 0.470 m wheel separation, the OAK-D&apos;s 73°
          FOV and 0.4–3.0 m detection range, and the ~13 s/item stop-look-drive approach
          cadence from the real <code>waste_tracker_v2.py</code> pipeline, then
          re-benchmarked every algorithm on it. Every navigation number on this page comes
          from that re-baseline. The honest result: the algorithm I presented at the
          showcase completes 6 of 15 missions on the calibrated simulator. The rewrite
          completes 15 of 15.
        </p>
        <RevBlock
          context="Navigation benchmark"
          rows={[
            {
              rev: "A",
              tone: "ink",
              description:
                "Idealized simulator: 0.5 m/s, continuous motion; the numbers that shipped in the report. 6 / 15 missions.",
              date: "MAR 2026",
            },
            {
              rev: "B",
              tone: "red",
              description:
                "Rebuilt and calibrated to the real robot: 0.3 m/s, 73° FOV, ~13 s/item. Every navigation number on this page. 15 / 15 missions.",
              date: "JUN 2026",
            },
          ]}
          caption="Same algorithm family, honest dynamics: the re-baseline cost the headline number and bought one I can defend line by line."
          className="breakout"
        />
        <p>
          reclaim_v2 is an event-driven executive over four behaviors (SCAN, COLLECT,
          SWEEP, DUMP) arbitrated by priority:
        </p>
        <FsmDiagram
          label="Nav executive"
          states={[
            { name: "SCAN", role: "frontier exploration" },
            { name: "COLLECT", role: "route + pick items", via: "items detected" },
            { name: "SWEEP", role: "close coverage gaps", via: "coverage ≥ 99%" },
            { name: "DUMP", role: "empty the bin", via: "buffer full / final" },
          ]}
          events={[
            "item picked → re-decide",
            "scan finished → COLLECT",
            "path blocked ×3 → requeue · ×6 → abandon",
            "buffer full → DUMP → resume",
          ]}
          caption="Event-driven executive: it re-decides only on events (item picked, scan finished, path blocked), never per tick, so targets switch at plan boundaries instead of oscillating between goals. Transitions are priority-arbitrated; the primary path is shown."
        />
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong>Commits, doesn&apos;t thrash.</strong>{" "}The executive re-decides only
            on events (item picked, scan finished, path blocked) never per-tick, so
            target switches happen at plan boundaries instead of oscillating between goals.
          </li>
          <li>
            <strong>SCAN: frontier exploration.</strong>{" "}Scan viewpoints sit on the seen
            side of the fog boundary, scored by unseen cells revealed per unit of
            travel-plus-scan time, with a directed pivot scan on arrival (0.25 rad/s around
            the left wheel, like the real robot).
          </li>
          <li>
            <strong>COLLECT: exact routing where it&apos;s affordable.</strong>{" "}Batches of
            ≤7 items are routed exactly (Held-Karp) over true A* path distances; larger
            batches use nearest-neighbor + 2-opt. Dump-station stops are inserted at the
            tour boundary that adds the least detour, computed in closed form from an
            init-time Dijkstra field.
          </li>
          <li>
            <strong>Motion + recovery.</strong>{" "}Pure-pursuit driving with acceleration
            limits matching the real drivetrain, plus a watchdog recovery ladder: 3
            consecutive A* failures requeues the item, 6 abandons and logs it, so one
            unreachable item can never hang a mission.
          </li>
        </ul>
        <p>
          The simulator runs entirely client-side: React + Three.js (R3F), with a headless
          Node harness that regenerates the benchmark matrix from a single command. Every
          run is reproducible byte-for-byte from its (preset · seed) chip, shown in the UI.
          Try it live: pick a venue and seed, watch the planned route, behavior timeline,
          and live detection captions, and pit v2 against the four baselines on the
          comparison dashboard,{" "}
          <a
            href="https://reclaim-nav-sim.vercel.app"
            target="_blank"
            rel="noreferrer"
          >
            interactive 3D demo ↗
          </a>
          .
        </p>
      </Section>

      <Section title="Approach: manipulation">
        <p>
          The product arm is a 6-DOF CubeMars BLDC arm with a Robotis parallel gripper
          driven by MoveIt2 motion planning. MATLAB inverse-dynamics confirmed adequate
          torque margins across all arm joints with a 500 g payload, and a computed
          torque controller achieved near-zero tracking error across pick-and-place
          trajectories. The prototype substituted a 4-DOF hobby-servo arm with PI joint
          control and a PI tracking controller for vision-servo approach behaviour.
        </p>
      </Section>

      <Section title="Live demo (March 26, 2026)">
        <p>
          The prototype was demonstrated live, completing fully autonomous
          scan→detect→drive→pick→sort cycles across all six waste classes with no manual
          intervention. The cohort awarded the project 3rd place overall, and 1st in the
          AI division.
        </p>
        <FigurePlate
          src="/projects/reclaim/team.jpg"
          alt="The RECLAIM capstone team of four with the prototype at the Western Engineering MSE 4499 showcase."
          caption="Team RECLAIM with the prototype at the MSE 4499 showcase (March 26, 2026): 3rd place overall, and 1st in the AI division."
          width={1024}
          height={768}
          className="breakout"
        />
        <FigurePlate
          src="/projects/reclaim/showcase-robot.jpg"
          alt="Issa Ahmed standing with the RECLAIM prototype at the showcase, holding an aluminum can and a plastic water bottle."
          caption="At the showcase with the prototype and two of the items it sorts: an aluminum can and a plastic bottle, both recyclables."
          width={1200}
          height={1600}
          className="mx-auto max-w-md"
        />
      </Section>

      <Section title="Tech stack">
        <EquipList
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
          response was to scope two layers: a fully specified product (CubeMars BLDC
          arm, OAK-D Pro, Livox Mid-360 LiDAR, STM32F405 + CAN, 27+ waste classes,
          MoveIt2 + Nav2) and a reduced-scope prototype that exercised the same control
          loop with hobby-grade components. That separation forced honest reasoning
          about what we were validating with each subsystem and is what carried us
          through the live demo without manual intervention.
        </p>
        <p>
          The second constraint was self-imposed, after the grade was in: the navigation
          benchmark I&apos;d presented was measured on an idealized simulator, and I knew
          it. Rebuilding the simulator around the real robot&apos;s calibrated dynamics
          (and publishing that the showcase-era algorithm completes 6 of 15 missions on it)
          cost me the headline number and bought a result I can defend line by line.
        </p>
      </Section>
    </SheetShell>
  );
}

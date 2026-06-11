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
} from "../_components/case-study";

export const metadata: Metadata = {
  title: "RECLAIM — Autonomous Waste-Sorting Robot",
  description:
    "ROS2 capstone robot that scans, detects, drives, picks, and sorts waste into recyclable, compost, and landfill bins. 3rd place placement.",
};

export default function Page() {
  return (
    <CaseStudyShell
      eyebrow="Robotics · ROS2 · Computer Vision"
      title="RECLAIM — Autonomous Indoor Waste-Sorting Robot"
      tagline="An end-to-end robot for post-event venues that scans for litter, drives to it, picks it up with a 6-DOF arm, classifies it, and sorts it into the correct bin — fully autonomously."
      meta="MSE 4499 Mechatronic Design Project · Western Engineering · 3rd place · April 2026"
    >
      <figure className="overflow-hidden rounded-xl border border-border">
        <Image
          src="/projects/reclaim/team.jpg"
          alt="The RECLAIM capstone team with the prototype at the Western Engineering MSE 4499 showcase."
          width={1024}
          height={768}
          priority
          className="w-full h-auto"
        />
        <figcaption className="px-4 py-3 text-xs text-muted border-t border-border bg-background">
          Team RECLAIM with the prototype at the Western Engineering MSE 4499 showcase (March 26, 2026). 3rd place placement.
        </figcaption>
      </figure>

      <Section title="Headline">
        <MetricGrid>
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
            label="Collection rate"
            value="8.1 items/min"
            hint="hybrid coverage algorithm — beat random walk, NN, boustrophedon, info-gain"
          />
          <Metric
            label="Payload"
            value="500 g"
            hint="MATLAB inverse-dynamics validated across all arm joints"
          />
          <Metric
            label="Live demo"
            value="6 classes · 0 manual interventions"
            hint="March 26, 2026 — full scan→detect→drive→pick→sort cycles"
          />
          <Metric label="Placement" value="🥉 3rd place" hint="MSE 4499 cohort" />
        </MetricGrid>
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

      <Section title="Approach — navigation">
        <p>
          A hybrid coverage algorithm was benchmarked in simulation against four
          baselines — random walk, nearest-neighbour, boustrophedon, and information-gain
          exploration — across three room presets (Conference 20×15m, Arena 30×20m,
          Dense 15×12m). The hybrid algorithm achieved <strong>8.1 items per
          minute</strong> on the 100-item venue, beating every alternative. The
          simulation itself was implemented as a React + Three.js + R3F app and
          deployed as an interactive demo — visitors can pick an algorithm, room, and
          item density and watch the robot path animate live.
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
            "Jetson Orin NX",
            "OAK-D Lite",
            "RPLIDAR A1M8",
            "Teensy 4.1",
            "SolidWorks",
            "MATLAB",
          ]}
        />
      </Section>

      <Section title="Artifacts">
        <ArtifactRow>
          <Artifact
            href="https://github.com/issaa71/RECLAIM"
            label="GitHub repository"
            detail="5-package ROS2 monorepo — issaa71/RECLAIM"
          />
          <Artifact
            href="#"
            label="🛠 Navigation simulation"
            detail="Interactive 3D React/Three.js demo — deployment in progress"
          />
          <Artifact
            href="#"
            label="🛠 Demo video"
            detail="Full cycle from the March 26 live demo — YouTube upload in progress"
          />
          <Artifact
            href="#"
            label="🛠 Final report (133 pp)"
            detail="MSE 4499 final report — PDF upload in progress"
          />
        </ArtifactRow>
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
      </Section>
    </CaseStudyShell>
  );
}

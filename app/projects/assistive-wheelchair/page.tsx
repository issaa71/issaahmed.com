import type { Metadata } from "next";
import Link from "next/link";
import {
  SheetShell,
  Section,
  CalloutStrip,
  Callout,
  LiveBar,
  FigurePlate,
  NoteBlock,
  TechStack,
  SpecGrid,
  FlowDiagram,
  SystemGraph,
} from "../_components/sheet";
import { WheelchairSim } from "./_sim";

export const metadata: Metadata = {
  title: "Assistive Navigation Robot: ROS2 Smart-Wheelchair Prototype",
  description:
    "A ROS2 robot that maps a home, localizes, and drives itself to a named room: detecting obstacles, flagging floor-level danger zones with OpenCV, and confirming arrival by QR code. A proof-of-concept for an assistive smart wheelchair.",
  openGraph: {
    title: "Assistive Navigation Robot: ROS2 Smart-Wheelchair Prototype",
    description:
      "A ROS2 assistive-navigation robot: room-to-room route planning via a custom Nav2 client, OpenCV danger-zone detection, and QR-checkpoint arrival, on a Yahboom Raspberry Pi 5 platform.",
    type: "article",
  },
};

export default function Page() {
  return (
    <SheetShell
      sheetNo="02"
      sheetCount="06"
      eyebrow="Robotics · ROS2 · Computer Vision"
      title="Assistive Navigation Robot"
      tagline="A ROS2 robot that maps a home, localizes within it, and drives itself to a named room on command: planning around obstacles, flagging floor-level danger zones with computer vision, and confirming arrival by QR code. A proof-of-concept for an assistive smart wheelchair."
      meta="AISE 4020B capstone · ROS2 · Nav2 · OpenCV · Yahboom Raspberry Pi 5"
      status={[
        { label: "As built", tone: "ink" },
        { label: "Designed & built end-to-end", tone: "ink" },
      ]}
    >
      <FigurePlate
        src="/projects/assistive-wheelchair/robot-driving.jpg"
        alt="The robot mid-run inside a white foam-board test arena, with yellow QR waypoint markers on the walls and floor."
        caption="The robot mid-run in my test arena. The yellow markers are the QR checkpoints it scans to confirm which room it has reached."
        width={1130}
        height={720}
        priority
      />

      <CalloutStrip cols={4}>
        <Callout
          label="Room-to-room planning"
          value="Nav2"
          hint="a custom ROS2 node I wrote sends the destination to Nav2, which plans and drives the route over a pre-mapped home"
          accent
        />
        <Callout
          label="Obstacle reaction"
          value="0.5 m"
          hint="obstacle range at which Nav2's costmap flags it and re-plans the path around it rather than stopping dead"
        />
        <Callout
          label="Danger detection"
          value="10 Hz"
          hint="OpenCV red-tape detector flags floor-level hazards using dual HSV colour bands"
        />
        <Callout
          label="Arrival check"
          value="QR"
          hint="10-digit location IDs scanned at each room to confirm it arrived where it intended"
        />
      </CalloutStrip>

      <LiveBar
        href="#sim"
        kicker="Interactive sim · runs in your browser"
        title="Drive the wheelchair to a room; it waits to scan each QR checkpoint before moving on"
        sub="a browser rebuild of the navigation-checkpoint simulation I wrote"
        cta="TRY IT ↓"
      />

      <Section title="System architecture">
        <SpecGrid
          label="Platform hardware"
          items={[
            {
              name: "Raspberry Pi 5",
              role: "onboard compute: runs the full ROS 2 graph",
            },
            {
              name: "Oradar MS200",
              role: "360° 2D LiDAR: mapping + /scan for Nav2",
            },
            {
              name: "Orbbec Astra",
              role: "RGB-D camera: colour + depth for the CV detectors",
            },
            {
              name: "Onboard IMU",
              role: "fused with wheel odometry via an EKF",
            },
            {
              name: "micro-ROS control board",
              role: "real-time motor control + wheel-encoder odometry",
            },
            {
              name: "Yahboom MicroROS-Pi5",
              role: "the rover base platform I built the stack on",
            },
          ]}
        />
        <FlowDiagram
          label="Navigation loop"
          steps={[
            { label: "LOCALIZE", sub: "AMCL · pre-mapped home" },
            { label: "PLAN", sub: "Nav2 → the named room" },
            { label: "DRIVE", sub: "DWB · re-plan on obstacles" },
            { label: "SENSE", sub: "red-tape + furniture CV" },
            { label: "ARRIVE", sub: "QR checkpoint · 10-digit ID" },
          ]}
          caption="The high-level loop for one trip. Hazard and furniture detection actually run continuously alongside driving rather than as a discrete step; they're drawn inline here for readability."
        />
        <p>
          The robot runs ROS 2 on a Raspberry Pi 5. I built the assistive-navigation
          layer (three application nodes) on top of the Yahboom platform&apos;s vendor
          stack (the sensor drivers, EKF localization, SLAM mapping, and the Nav2
          navigation pipeline), which is what let me spend my effort on the navigation
          logic instead of re-solving mapping and motion control.{" "}
          <code>room_navigator</code> turns a named room into a Nav2 goal pose;{" "}
          <code>red_tape_detector</code> injects floor-hazard no-go regions into the
          costmap; and a furniture detector keys on room objects by colour, shape, and
          pattern.
        </p>
        <SystemGraph
          label="ROS2 node graph"
          tiers={[
            {
              lane: "Sensor drivers",
              nodes: [
                { name: "oradar_scan", sub: "MS200 2D LiDAR" },
                { name: "astra_camera", sub: "Orbbec Astra RGB-D" },
                { name: "base_node", sub: "wheel odometry + IMU" },
              ],
              edge: "/scan · /camera/color · /camera/depth · odom_raw · /imu/data_raw",
            },
            {
              lane: "Localization & mapping · vendor stack",
              nodes: [
                {
                  name: "robot_localization",
                  sub: "EKF · fuses odom + IMU → /odom",
                },
                {
                  name: "amcl",
                  sub: "localize against the saved 2D map → /amcl_pose",
                },
              ],
              edge: "/odom · /amcl_pose · /map · /tf",
            },
            {
              lane: "Application layer · my nodes",
              accent: true,
              nodes: [
                { name: "room_navigator", sub: "named room → Nav2 goal" },
                { name: "red_tape_detector", sub: "HSV hazard mask · 10 Hz" },
                { name: "furniture_detector", sub: "colour + shape + pattern" },
              ],
              edge: "navigate_to_pose goal · costmap no-go regions",
            },
            {
              lane: "Nav2 navigation · vendor stack",
              nodes: [
                { name: "bt_navigator", sub: "behavior-tree orchestration" },
                { name: "planner_server", sub: "NavFn global plan" },
                { name: "controller_server", sub: "DWB local controller" },
              ],
              edge: "/cmd_vel",
            },
            {
              lane: "Base",
              nodes: [
                {
                  name: "base_node (micro-ROS)",
                  sub: "drives the motors from /cmd_vel",
                },
              ],
            },
          ]}
          caption="The ROS 2 graph as I built it: the Yahboom platform supplies the vendor sensor, localization, and Nav2 layers (grey); my three application nodes (red) sit on top. /scan also feeds AMCL and the Nav2 costmaps directly, and the base node closes the loop: publishing odometry at the top and driving the motors from /cmd_vel at the bottom. Custom-node topics follow each node's role; the exact names live in the project code."
        />
      </Section>

      <Section title="Problem">
        <p>
          Navigating tight domestic spaces is hard for wheelchair users, and the repetitive
          trips (kitchen, bathroom, bedroom) add up to real daily strain. I set out to
          prototype the software for an assistive &quot;smart wheelchair&quot;: a system that could
          map a home, localize within it, detect and route around obstacles, flag floor-level danger
          zones, and drive a user from wherever they are to a room they name, safely, and with a
          check that it actually arrived.
        </p>
      </Section>

      <Section title="My role">
        <p>
          I designed and built this end to end. I wrote the navigation system and the whole
          application layer on top of the robot&apos;s ROS2 stack: the room-to-room route planning,
          the computer-vision detectors for floor hazards and furniture, the QR-checkpoint arrival
          logic, and a parallel software simulation of the entire navigation loop. The workflow
          diagram below is mine.
        </p>
        <p>
          I built on a standard robotics foundation. The Yahboom Raspberry Pi 5 platform ships a
          ready-made ROS2 stack (Nav2 navigation, SLAM mapping, the Astra depth-camera and lidar
          drivers, EKF sensor fusion), which is exactly what let me put my effort into the
          assistive-navigation logic instead of reinventing mapping and motion control.
        </p>
      </Section>

      <Section title="Approach">
        <FigurePlate
          src="/projects/assistive-wheelchair/floor-plan.png"
          alt="Schematic floor plan of the L-shaped test course, with labelled rooms (bedroom, kitchen, bathroom, dining, living) and dimensions in centimetres."
          caption="The five-room test &quot;house&quot; I taped out and mapped: the layout the robot planned and navigated against."
          width={980}
          height={954}
          plate
        />
        <p>
          The robot first builds a 2D map of the space with its onboard lidar, then localizes
          against it. On a &quot;go to the bedroom&quot; command, a custom ROS2 node I wrote looks up
          the room&apos;s recorded coordinates and hands them to Nav2 to plan the route, and when the
          lidar sees an obstacle within ~0.5 m of the planned path, Nav2&apos;s costmap flags it and the
          planner routes around it rather than stopping dead.
        </p>
        <FigurePlate
          src="/projects/assistive-wheelchair/workflow.png"
          alt="Navigation decision-logic flowchart: localization, QR scan, determine start node, fetch path, compute shortest route, drive, continuously read QR codes, and branch on deviation vs temporary/permanent obstacle."
          caption="The navigation decision logic I designed: localize → scan a QR code to fix the start → compute the shortest route → drive while continuously re-reading QR codes for drift, branching a detected obstacle into a small avoidance nudge (temporary) or a full re-plan (permanent)."
          width={931}
          height={861}
          plate
        />
        <p>
          Two computer-vision pieces run alongside the planner. A <strong>red-tape detector</strong>
          {" "}segments red floor tape (a stand-in for stair edges and other hazards) using two HSV
          colour bands (so it survives changing light) with morphological cleanup, at 10 Hz, so the
          planner can treat those regions as no-go. A furniture detector combines colour, shape, and
          pattern cues to identify objects in a room. And at each destination, the robot scans a wall
          QR code carrying a 10-digit location ID to verify it reached the room it was actually
          headed for.
        </p>
        <FigurePlate
          src="/projects/assistive-wheelchair/red-tape-segmentation.jpg"
          alt="Side-by-side view: the robot's raw camera frame with a green bounding box on the red floor tape (left), and the binary segmentation mask isolating that tape as white on black (right)."
          caption="My red-tape detector segmenting the floor tape: the raw camera frame (left) and the binary mask it builds from two HSV colour bands (right), which the planner treats as a no-go region."
          width={1800}
          height={840}
        />
        <FigurePlate
          src="/projects/assistive-wheelchair/furniture-detection.jpg"
          alt="The furniture detector's view: a green bounding box and centre dot on the bedroom's bed prop, a 'Found furniture / Position' overlay, a small binary colour-mask panel, and HSV calibration sliders."
          caption="My furniture detector keying on the bedroom's bed: colour, aspect ratio, and the bed's flower pattern combine into a labelled hit, alongside the colour mask and the HSV controls I tuned it with."
          width={1800}
          height={1082}
        />
        <p>
          I also built the whole navigation loop as a parallel <strong>software simulation</strong>:
          a turtle-graphics agent with an OpenCV / pyzbar barcode reader, running the scanner and the
          moving agent as concurrent processes so the agent pauses at each checkpoint until the right
          code is read. It gave me a clean, controllable testbed for the path-planning and
          checkpoint logic while the physical build fought real sensor noise.
        </p>
      </Section>

      <Section title="Results">
        <p>
          I delivered a working system on both fronts (a physical robot and the simulation) and
          recorded a demo of it driving the arena autonomously. In the taped-out five-room
          &quot;house&quot; I built, the robot localized, planned to named rooms, reacted to
          obstacles inside 0.5 m, flagged red-tape danger zones, and confirmed arrival by QR code.
        </p>
        <div id="sim" className="scroll-mt-24">
          <p className="font-anno text-[10px] uppercase tracking-[0.16em] text-red">
            TRY IT · RUNS IN YOUR BROWSER
          </p>
          <div className="mt-3">
            <WheelchairSim />
          </div>
          <p className="mt-3 font-prose text-[13.5px] italic leading-snug text-ink-soft">
            Pick a room: the wheelchair drives the fixed route I defined for it, waiting to
            scan the right QR checkpoint at each stop before moving on.
          </p>
        </div>
        <NoteBlock title="Honest scope">
          This is a capstone proof-of-concept, and I&apos;d rather name its edges than oversell it.
          I settled real parameters (0.5 m obstacle range, dual HSV red bands, 0.05 m/px maps)
          and got repeatable behaviour, but I didn&apos;t formally measure a
          navigation success rate or localization error, which is the first thing I&apos;d quantify
          next. The furniture-recognition-to-approach behaviour (driving up to a specific object like
          a bed) was designed but not fully implemented. And the hardest lessons were physical: the
          lidar struggled to read tall objects as in-bounds, so I kept the walls low; and red-tape
          detection failed against low-contrast flooring until I laid down a white poster-board
          floor for reliable contrast.
        </NoteBlock>
      </Section>

      <Section title="Tech stack">
        <TechStack
          groups={[
            {
              group: "Software & CV",
              items: ["Python", "OpenCV", "pyzbar (QR / barcode)"],
            },
            {
              group: "Robotics & Navigation",
              items: [
                "ROS2",
                "Nav2",
                "SLAM (gmapping / Cartographer)",
                "route planning",
                "robot_localization (EKF)",
              ],
            },
            {
              group: "Hardware & Sensors",
              items: ["Astra depth camera", "2D lidar", "Raspberry Pi 5"],
            },
          ]}
        />
      </Section>

      <Section title="Reflection">
        <p>
          The instinct I&apos;m proudest of here is leverage: building on a capable vendor platform
          let me put the effort where the actual problem was (the assistive-navigation logic, the
          hazard detection, the arrival guarantee) instead of re-solving mapping and motion control.
          It pairs with my{" "}
          <Link href="/projects/reclaim">RECLAIM capstone</Link>{" "}
          as a second robotics build around the same closed perception → planning → actuation loop,
          just aimed at helping a person move through their own home.
        </p>
      </Section>
    </SheetShell>
  );
}

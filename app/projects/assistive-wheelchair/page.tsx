import type { Metadata } from "next";
import Link from "next/link";
import {
  SheetShell,
  Section,
  CalloutStrip,
  Callout,
  FigurePlate,
  PlaceholderPlate,
  NoteBlock,
  EquipList,
} from "../_components/sheet";

export const metadata: Metadata = {
  title: "Assistive Navigation Robot — ROS2 Smart-Wheelchair Prototype",
  description:
    "A ROS2 robot that maps a home, localizes, and drives itself to a named room — detecting obstacles, flagging floor-level danger zones with OpenCV, and confirming arrival by QR code. A proof-of-concept for an assistive smart wheelchair.",
  openGraph: {
    title: "Assistive Navigation Robot — ROS2 Smart-Wheelchair Prototype",
    description:
      "A ROS2 assistive-navigation robot: A* room-to-room planning, OpenCV danger-zone detection, and QR-checkpoint arrival, on a Yahboom Raspberry Pi 5 platform.",
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
      tagline="A ROS2 robot that maps a home, localizes within it, and drives itself to a named room on command — planning around obstacles, flagging floor-level danger zones with computer vision, and confirming arrival by QR code. A proof-of-concept for an assistive smart wheelchair."
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
        width={720}
        height={1130}
        priority
        className="mx-auto max-w-md"
      />

      <CalloutStrip cols={4}>
        <Callout
          label="Room-to-room planning"
          value="A*"
          hint="a custom ROS2 node plans over a pre-mapped home, on top of the Nav2 stack"
          accent
        />
        <Callout
          label="Obstacle reaction"
          value="0.5 m"
          hint="lidar range where it re-plans, generating 8 candidate approach points around the obstacle"
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

      <Section title="Problem">
        <p>
          Navigating tight domestic spaces is hard for wheelchair users, and the repetitive
          trips — kitchen, bathroom, bedroom — add up to real daily strain. I set out to
          prototype the software for an assistive &quot;smart wheelchair&quot;: a system that could
          map a home, localize within it, detect and route around obstacles, flag floor-level danger
          zones, and drive a user from wherever they are to a room they name — safely, and with a
          check that it actually arrived.
        </p>
      </Section>

      <Section title="My role">
        <p>
          I designed and built this end to end. I wrote the navigation system and the whole
          application layer on top of the robot&apos;s ROS2 stack: the room-to-room A* path planning,
          the computer-vision detectors for floor hazards and furniture, the QR-checkpoint arrival
          logic, and a parallel software simulation of the entire navigation loop. The workflow
          diagram below is mine.
        </p>
        <p>
          I built on a standard robotics foundation — the Yahboom Raspberry Pi 5 platform ships a
          ready-made ROS2 stack (Nav2 navigation, SLAM mapping, the Astra depth-camera and lidar
          drivers, EKF sensor fusion) — which is exactly what let me put my effort into the
          assistive-navigation logic instead of reinventing mapping and motion control.
        </p>
      </Section>

      <Section title="Approach">
        <p>
          The robot first builds a 2D map of the space with its onboard lidar, then localizes
          against it. On a &quot;go to the bedroom&quot; command, a custom ROS2 node I hooked into
          Nav2 looks up the room&apos;s recorded coordinates and plans a route with A* — and when the
          lidar sees an obstacle within 0.5 m, it generates eight geometric approach points and
          re-plans around it rather than stopping dead.
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
          {" "}segments red floor tape — a stand-in for stair edges and other hazards — using two HSV
          colour bands (so it survives changing light) with morphological cleanup, at 10 Hz, so the
          planner can treat those regions as no-go. A furniture detector combines colour, shape, and
          pattern cues to identify objects in a room. And at each destination, the robot scans a wall
          QR code carrying a 10-digit location ID to verify it reached the room it was actually
          headed for.
        </p>
        <FigurePlate
          src="/projects/assistive-wheelchair/red-tape-detection.jpg"
          alt="OpenCV window titled 'Red Tape Detection' showing the robot's camera view with the HSV bounds printed, a green bounding box locked onto red tape on the floor, and an 'OK !!!' status."
          caption="My red-tape detector running live on the robot: dual HSV bands segment the red floor tape, a green box locks on, and the node reports the hit ('OK !!!') so the planner routes around it."
          width={1300}
          height={1704}
        />
        <p>
          I also built the whole navigation loop as a parallel <strong>software simulation</strong> —
          a turtle-graphics agent with an OpenCV / pyzbar barcode reader, running the scanner and the
          moving agent as concurrent processes so the agent pauses at each checkpoint until the right
          code is read. It gave me a clean, controllable testbed for the path-planning and
          checkpoint logic while the physical build fought real sensor noise.
        </p>
      </Section>

      <Section title="Results">
        <p>
          I delivered a working system on both fronts — a physical robot and the simulation — and
          recorded a demo of it driving the arena autonomously. In the taped-out five-room
          &quot;house&quot; I built, the robot localized, planned to named rooms, reacted to
          obstacles inside 0.5 m, flagged red-tape danger zones, and confirmed arrival by QR code.
        </p>
        {/* TO BE ISSUED — a ≈60s screen-capture of a full autonomous run through the taped house. */}
        <PlaceholderPlate
          kind="VIDEO"
          title="The robot driving itself to a room"
          covers="a full autonomous run through the taped 'house' — planning, obstacle reaction, and a QR arrival check"
          note="≈ 60s"
        />
        <NoteBlock title="Honest scope">
          This is a capstone proof-of-concept, and I&apos;d rather name its edges than oversell it.
          I settled real parameters (0.5 m obstacle range, dual HSV red bands, 8 approach points,
          0.05 m/px maps) and got repeatable behaviour — but I didn&apos;t formally measure a
          navigation success rate or localization error, which is the first thing I&apos;d quantify
          next. The furniture-recognition-to-approach behaviour (driving up to a specific object like
          a bed) was designed but not fully implemented. And the hardest lessons were physical: the
          lidar struggled to read tall objects as in-bounds, so I kept the walls low; and red-tape
          detection failed against low-contrast flooring until I laid down a white poster-board
          floor for reliable contrast.
        </NoteBlock>
      </Section>

      <Section title="Tech stack">
        <EquipList
          items={[
            "ROS2",
            "Nav2",
            "SLAM (gmapping / Cartographer)",
            "A* planning",
            "OpenCV",
            "pyzbar (QR / barcode)",
            "robot_localization (EKF)",
            "Astra depth camera",
            "2D lidar",
            "Python",
            "Raspberry Pi 5",
          ]}
        />
      </Section>

      <Section title="Reflection">
        <p>
          The instinct I&apos;m proudest of here is leverage: building on a capable vendor platform
          let me put the effort where the actual problem was — the assistive-navigation logic, the
          hazard detection, the arrival guarantee — instead of re-solving mapping and motion control.
          It pairs with my{" "}
          <Link href="/projects/reclaim">RECLAIM capstone</Link>{" "}
          as a second robotics build around the same closed perception → planning → actuation loop,
          just aimed at helping a person move through their own home.
        </p>
      </Section>
    </SheetShell>
  );
}

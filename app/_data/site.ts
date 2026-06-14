export const PROFILE = {
  name: "Issa Ahmed",
  tagline:
    "Mechatronics & AI Systems Engineering student at Western University. I build autonomous robots, applied ML systems, and full-stack tools.",
  currentLine:
    "Currently Product Engineer at Scooty Mobility — building an AI transit companion app, in pilot conversations with GTHA municipalities.",
  email: "issaahmed1@icloud.com",
  github: "https://github.com/issaa71",
  linkedin: "https://www.linkedin.com/in/issa-ahmed-032490190/",
};

export const PROJECTS: {
  slug: string;
  title: string;
  codename: string;
  blurb: string;
  highlight: string;
  stats?: string[];
}[] = [
  {
    slug: "reclaim",
    title: "RECLAIM — Autonomous Waste-Sorting Robot",
    codename: "Robotics · ROS2 · Computer Vision",
    blurb:
      "Indoor autonomous robot that scans, detects, drives, picks, and sorts waste across recyclable, compost, and landfill streams. Capstone project (3rd place).",
    highlight:
      "15/15 nav missions on the re-baselined sim · 30 FPS perception on Jetson Orin NX · mAP50 0.693 → 0.826",
    stats: ["15/15 missions", "99–100% coverage", "30 FPS"],
  },
  {
    slug: "nba-shot-selection",
    title: "NBA Shot Selection — Offline RL",
    codename: "Reinforcement Learning · PyTorch",
    blurb:
      "Dueling DQN with per-entity Deep Sets architecture and PBRS reward shaping that learns shoot-or-pass policies from real SportVU tracking data.",
    highlight:
      "+0.273 EPSA vs +0.044 player baseline · 116,928 possessions · 631 games",
    stats: ["+0.273 EPSA", "116,928 possessions", "631 games"],
  },
  {
    slug: "tha-pain-prediction",
    title: "Predicting Pain After Total Hip Arthroplasty",
    codename: "Applied ML · Research · Streamlit",
    blurb:
      "Peer-reviewed ML pipeline comparing 13 models on 513 patients from the SAFE-T cohort. Co-authored with Sunnybrook + University of Toronto Orthopaedics.",
    highlight:
      "J. Arthroplasty 2026 · KNN MSE 2.70 @ T3 · 85.9% buffer accuracy ±2",
  },
  {
    slug: "no-fly-list-kids",
    title: "No Fly List Kids — Federal Advocacy",
    codename: "Policy · Communication · Coalition work",
    blurb:
      "Long-running federal advocacy via the No Fly List Kids coalition. Toronto Star op-ed, multiple media features, direct engagement with the PMO and federal Cabinet.",
    highlight: "Contributed to Bill C-59 + $81M federal redress budget",
  },
];

export const EXPERIENCE: {
  role: string;
  org: string;
  period: string;
  bullets: string[];
}[] = [
  {
    role: "Product Engineer",
    org: "Scooty Mobility",
    period: "May 2025 — Present",
    bullets: [
      "Building an AI-powered transit companion app for the GTHA — conversational trip planning and cross-agency routing across TTC, GO Transit, and MiWay. Currently in pilot conversations with municipalities.",
      "Architecting serverless backend on AWS Lambda + API Gateway; developing Python RESTful APIs that simulate PRESTO card-based fare transactions.",
      "Designed and delivered an AI in Finance training curriculum in partnership with Ontario Tech University — 5 weeks of materials, 80 participants, Microsoft SC-900 certification prep.",
    ],
  },
  {
    role: "Thermodynamics Engineering Intern",
    org: "Bombardier Aerospace",
    period: "Summers 2022 & 2023",
    bullets: [
      "Core developer on Global Companion — a finalist-award-winning AI chatbot that dynamically sequences aircraft testing procedures based on part availability.",
      "Built automated data pipelines (Microsoft VBA) that transformed raw parameters into simulation-ready input files for thermal calculations.",
      "Performed flight-test data analysis using SQL and Python to extract, clean, and validate temperature data across aircraft thermal systems.",
    ],
  },
  {
    role: "R&D Summer Intern",
    org: "Glaukos Corporation",
    period: "Aug — Sep 2021",
    bullets: [
      "Worked with the R&D team on medical-device and combination pharmaceutical product development; performed lab tests on a retinal drug implant using a Phantom high-speed camera, an Instron material-properties testing machine, and a Keyence dimensional inspection system.",
      "Designed and reconfigured manufacturing process fixturing in SolidWorks — rapid-iterated with Formlabs SLA printing, then produced the first fixture on a Tormach CNC.",
      "Iterated on eye-stent CAD drawings and models alongside R&D engineers.",
    ],
  },
  {
    role: "Engineering Summer Student",
    org: "Thurber Engineering",
    period: "Summers 2020 & 2021",
    bullets: [
      "Conducted standardized geotechnical lab testing and digitized technical engineering documentation systems.",
    ],
  },
];

export const SKILLS: { group: string; items: string[] }[] = [
  {
    group: "Robotics",
    items: [
      "ROS2 Humble",
      "Nav2",
      "SLAM Toolbox",
      "MoveIt2",
      "Jetson Orin NX",
      "OAK-D / DepthAI",
      "SolidWorks",
    ],
  },
  {
    group: "AI / ML",
    items: [
      "PyTorch",
      "scikit-learn",
      "XGBoost",
      "OpenCV",
      "YOLOv8",
      "TensorRT",
      "Gymnasium",
    ],
  },
  {
    group: "Software",
    items: [
      "Python",
      "TypeScript",
      "C",
      "React",
      "Next.js",
      "FastAPI",
      "SQL",
    ],
  },
  {
    group: "Cloud & Tools",
    items: [
      "AWS Lambda",
      "AWS API Gateway",
      "GCP",
      "Docker",
      "n8n",
      "Jira",
    ],
  },
];

export const CERTIFICATIONS: {
  name: string;
  code: string;
  issuer: string;
  year?: string;
  verifyUrl?: string;
}[] = [
  {
    name: "Azure AI Fundamentals",
    code: "AI-900",
    issuer: "Microsoft",
    year: "2025",
    verifyUrl:
      "https://learn.microsoft.com/en-us/users/issaahmed-3571/credentials/ec72eb1f9331a5a9",
  },
  {
    name: "Security, Compliance & Identity Fundamentals",
    code: "SC-900",
    issuer: "Microsoft",
    year: "2025",
    verifyUrl:
      "https://learn.microsoft.com/en-us/users/issaahmed-3571/credentials/1978cdc579e763a4",
  },
  {
    name: "SolidWorks Design Associate",
    code: "CSWA",
    issuer: "Dassault Systèmes",
    year: "2021",
    verifyUrl: "https://cv.virtualtester.com/qr/?b=SLDWRKS&i=C-79BYK8QFZ6",
  },
  {
    name: "SolidWorks Simulation Associate",
    code: "CSWA-S",
    issuer: "Dassault Systèmes",
    year: "2023",
    verifyUrl: "https://cv.virtualtester.com/qr/?b=SLDWRKS&i=C-PY2M54RUNJ",
  },
];

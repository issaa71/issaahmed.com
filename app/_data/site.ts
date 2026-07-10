export const PROFILE = {
  name: "Issa Ahmed",
  tagline:
    "I build autonomous robots, applied ML and AI systems, and full-stack tools.",
  currentLine:
    "Everything here is something I designed, built, and shipped, and four of the projects run live, right in your browser.",
  identity:
    "New-grad engineer · Toronto · open to robotics, applied-ML & full-stack roles",
  email: "issaahmed1@icloud.com",
  github: "https://github.com/issaa71",
  linkedin: "https://www.linkedin.com/in/issa-ahmed-032490190/",
};

// Tile presentation (category, role, chips, liveDemo) lives in app/page.tsx's
// TILE map, which is the single source of truth for home-page headline numbers.
// Keep this list to title/blurb only so numbers can't drift between two copies.
export const PROJECTS: {
  slug: string;
  title: string;
  codename: string;
  blurb: string;
}[] = [
  {
    slug: "reclaim",
    title: "RECLAIM: Autonomous Waste-Sorting Robot",
    codename: "Robotics · ROS2 · Computer Vision",
    blurb:
      "Indoor autonomous robot that scans, detects, drives, picks, and sorts waste across recyclable, compost, and landfill streams. Capstone project (3rd place).",
  },
  {
    slug: "assistive-wheelchair",
    title: "Assistive Navigation Robot",
    codename: "Robotics · ROS2 · Nav2",
    blurb:
      "A ROS2 robot that maps a home, localizes, and drives itself to a named room, planning around obstacles, flagging floor hazards with computer vision, and confirming arrival by QR code. A smart-wheelchair prototype.",
  },
  {
    slug: "nba-shot-selection",
    title: "NBA Shot Selection: Offline RL",
    codename: "Reinforcement Learning · PyTorch",
    blurb:
      "A Dueling DQN with a per-entity Deep Sets architecture, trained on real SportVU tracking to call shoot-or-pass, then audited until its own headline metric broke, and regrounded on real shot outcomes.",
  },
  {
    slug: "tha-pain-prediction",
    title: "Predicting Pain After Total Hip Arthroplasty",
    codename: "Applied ML · Research · Streamlit",
    blurb:
      "Peer-reviewed ML pipeline comparing 13 models on 513 patients from the SAFE-T cohort. Co-authored with Sunnybrook + University of Toronto Orthopaedics.",
  },
  {
    slug: "glenoid-classifier",
    title: "Glenoid Morphology Classifier",
    codename: "Clinical ML · scikit-learn",
    blurb:
      "A three-tier ML pipeline that maps CT-derived shoulder measurements onto the Walch glenoid classification, with the real trained model running live in your browser. Healthy-vs-diseased screen ~91% (AUC 0.98).",
  },
  {
    slug: "no-fly-list-kids",
    title: "No Fly List Kids: Federal Advocacy",
    codename: "Policy · Communication · Coalition work",
    blurb:
      "Long-running federal advocacy via the No Fly List Kids coalition. Toronto Star op-ed, multiple media features, direct engagement with the PMO and federal Cabinet.",
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
      "MATLAB",
      "Jetson Orin NX",
      "OAK-D / DepthAI",
      "Raspberry Pi",
      "Arduino",
      "SolidWorks",
    ],
  },
  {
    group: "AI / ML",
    items: [
      "classical & deep-learning models",
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "OpenCV",
      "YOLO",
      "Roboflow",
      "TensorRT",
      "RAG",
      "NLP",
      "LLM fine-tuning",
    ],
  },
  {
    group: "Software",
    items: [
      "Python",
      "TypeScript",
      "C",
      "VBA",
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
      "SAP",
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

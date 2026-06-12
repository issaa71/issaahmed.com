import { ImageResponse } from "next/og";

export const alt = "Issa Ahmed — Mechatronics & AI Systems Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// TODO: switch to https://issaahmed.com once the custom domain is wired up
const HOSTNAME = "issaahmed-com.vercel.app";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(800px 400px at 50% -10%, rgba(52,211,153,0.16), transparent 70%)",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#34d399",
            fontSize: 24,
            letterSpacing: 4,
          }}
        >
          MECHATRONICS & AI SYSTEMS · WESTERN 2026
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              color: "#f4f4f5",
            }}
          >
            Issa Ahmed
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#a1a1aa",
            }}
          >
            Autonomous robots · applied ML · full-stack systems
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#82828c",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex" }}>{HOSTNAME}</div>
          <div style={{ display: "flex" }}>robotics / ai-ml / software / cloud</div>
        </div>
      </div>
    ),
    { ...size }
  );
}

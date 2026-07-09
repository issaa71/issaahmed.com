import { ImageResponse } from "next/og";

export const alt = "Issa Ahmed — Robotics, ML & Full-Stack Projects";
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
          backgroundColor: "#faf9f7",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            color: "#047857",
            fontSize: 24,
            letterSpacing: 4,
          }}
        >
          <div style={{ display: "flex" }}>
            ROBOTICS · APPLIED ML · FULL-STACK · TORONTO
          </div>
          <div
            style={{
              display: "flex",
              width: 120,
              height: 2,
              backgroundColor: "#047857",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              color: "#1c1a17",
            }}
          >
            Issa Ahmed
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#5f5a52",
            }}
          >
            Autonomous robots · applied ML · full-stack systems
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#7d786e",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex" }}>{HOSTNAME}</div>
          <div style={{ display: "flex" }}>
            Published research · AI-division-winning robot · 2 live demos
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

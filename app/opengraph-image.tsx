import { ImageResponse } from "next/og";

export const alt = "Issa Ahmed · Robotics, ML & Full-Stack Projects";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// TODO: switch to https://issaahmed.com once the custom domain is wired up
const HOSTNAME = "issaahmed-com.vercel.app";

// REDLINE OG card: the share image is typeset as an engineering drawing sheet:
// warm paper, a double-line border frame, a dimensioned signature, and a real
// title-block strip along the bottom. Satori: flexbox + inline styles only.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#faf7f0",
          padding: 24,
        }}
      >
        {/* sheet frame: 2px border + inner hairline (the double-line drawing look) */}
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            border: "2px solid #a49a83",
            padding: 8,
          }}
        >
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              border: "1px solid rgba(164,154,131,0.5)",
            }}
          >
            {/* HERO */}
            <div
              style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                paddingTop: 40,
                paddingLeft: 48,
                paddingRight: 48,
                paddingBottom: 0,
              }}
            >
              {/* top annotation row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    color: "#bc3f21",
                    fontSize: 23,
                    fontWeight: 500,
                    letterSpacing: 4,
                  }}
                >
                  ROBOTICS · APPLIED ML · FULL-STACK · TORONTO
                </div>
                <div
                  style={{
                    display: "flex",
                    color: "#7a7160",
                    fontSize: 13,
                    letterSpacing: 2.5,
                  }}
                >
                  DRAWING PACKAGE
                </div>
              </div>

              {/* signature, vertically centered in the remaining space */}
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  {/* dimension-line motif: witness ticks + inward line + arrowheads */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: 632,
                      height: 14,
                      marginBottom: 26,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: 1,
                        height: 14,
                        backgroundColor: "rgba(33,29,22,0.5)",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        width: 7,
                        height: 7,
                        borderTop: "1.5px solid rgba(33,29,22,0.55)",
                        borderLeft: "1.5px solid rgba(33,29,22,0.55)",
                        transform: "rotate(-45deg)",
                        marginLeft: 3,
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexGrow: 1,
                        height: 1,
                        backgroundColor: "rgba(33,29,22,0.5)",
                        marginLeft: 3,
                        marginRight: 3,
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        width: 7,
                        height: 7,
                        borderRight: "1.5px solid rgba(33,29,22,0.55)",
                        borderBottom: "1.5px solid rgba(33,29,22,0.55)",
                        transform: "rotate(-45deg)",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        width: 1,
                        height: 14,
                        backgroundColor: "rgba(33,29,22,0.5)",
                        marginLeft: 3,
                      }}
                    />
                  </div>

                  {/* name */}
                  <div
                    style={{
                      display: "flex",
                      fontSize: 110,
                      fontWeight: 700,
                      letterSpacing: -3,
                      color: "#211d16",
                      lineHeight: 1,
                    }}
                  >
                    ISSA AHMED
                  </div>

                  {/* subtitle */}
                  <div
                    style={{
                      display: "flex",
                      fontSize: 30,
                      color: "#4a443a",
                      marginTop: 24,
                    }}
                  >
                    Autonomous robots · applied ML · full-stack systems
                  </div>
                </div>
              </div>
            </div>

            {/* TITLE-BLOCK STRIP: bordered cells, hairline dividers */}
            <div style={{ display: "flex", borderTop: "1px solid #ddd5c2" }}>
              {/* DRAWN BY */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  flexBasis: 0,
                  paddingTop: 16,
                  paddingBottom: 16,
                  paddingLeft: 24,
                  paddingRight: 22,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: 12,
                    letterSpacing: 2,
                    color: "#7a7160",
                    marginBottom: 6,
                  }}
                >
                  DRAWN BY
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: 19,
                    fontWeight: 700,
                    color: "#211d16",
                  }}
                >
                  ISSA AHMED
                </div>
              </div>

              {/* LOCATION */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  flexBasis: 0,
                  paddingTop: 16,
                  paddingBottom: 16,
                  paddingLeft: 22,
                  paddingRight: 22,
                  borderLeft: "1px solid #ddd5c2",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: 12,
                    letterSpacing: 2,
                    color: "#7a7160",
                    marginBottom: 6,
                  }}
                >
                  LOCATION
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: 19,
                    fontWeight: 700,
                    color: "#211d16",
                  }}
                >
                  TORONTO, ON
                </div>
              </div>

              {/* SCALE */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 0.7,
                  flexBasis: 0,
                  paddingTop: 16,
                  paddingBottom: 16,
                  paddingLeft: 22,
                  paddingRight: 22,
                  borderLeft: "1px solid #ddd5c2",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: 12,
                    letterSpacing: 2,
                    color: "#7a7160",
                    marginBottom: 6,
                  }}
                >
                  SCALE
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: 19,
                    fontWeight: 700,
                    color: "#211d16",
                  }}
                >
                  N.T.S.
                </div>
              </div>

              {/* STATUS: the corrected live-demo count, in redline vermilion */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1.2,
                  flexBasis: 0,
                  paddingTop: 16,
                  paddingBottom: 16,
                  paddingLeft: 22,
                  paddingRight: 22,
                  borderLeft: "1px solid #ddd5c2",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: 12,
                    letterSpacing: 2,
                    color: "#7a7160",
                    marginBottom: 6,
                  }}
                >
                  STATUS
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      width: 9,
                      height: 9,
                      borderRadius: 9,
                      backgroundColor: "#bc3f21",
                      marginRight: 9,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      fontSize: 19,
                      fontWeight: 700,
                      color: "#bc3f21",
                    }}
                  >
                    4 LIVE DEMOS
                  </div>
                </div>
              </div>

              {/* SITE */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1.7,
                  flexBasis: 0,
                  paddingTop: 16,
                  paddingBottom: 16,
                  paddingLeft: 22,
                  paddingRight: 24,
                  borderLeft: "1px solid #ddd5c2",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: 12,
                    letterSpacing: 2,
                    color: "#7a7160",
                    marginBottom: 6,
                  }}
                >
                  SITE
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#211d16",
                  }}
                >
                  {HOSTNAME}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

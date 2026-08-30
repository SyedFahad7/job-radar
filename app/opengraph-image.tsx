import { ImageResponse } from "next/og";

export const alt = "Job radar · DevRel";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080a09",
          color: "#efe8d4",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#c8f04d",
          }}
        >
          Contact board · Syed Fahad
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 86, lineHeight: 1, letterSpacing: "-0.03em" }}>
            Job radar · DevRel
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 28,
              color: "#8f9688",
            }}
          >
            Intern / junior / mid Developer Relations
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#8f9688",
          }}
        >
          First sweep · 29 Aug 2026 · 50 roles
        </div>
      </div>
    ),
    { ...size },
  );
}

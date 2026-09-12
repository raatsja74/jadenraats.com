import { ImageResponse } from "next/og";

export const alt = "Jaden Raats — AI for business owners, proven in a real business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Token values mirrored from globals.css (no raw hex — design law)
const PAPER = "rgb(242, 239, 230)";
const INK = "rgb(10, 10, 9)";
const SOFT = "rgb(58, 54, 45)";
const ACCENT = "rgb(244, 81, 30)";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: PAPER,
          color: INK,
          fontFamily: "Impact, Arial Narrow, sans-serif",
        }}
      >
        <div style={{ fontSize: 170, letterSpacing: "0.005em", display: "flex", textTransform: "uppercase" }}>
          jaden raats<span style={{ color: ACCENT }}>*</span>
        </div>
        <div style={{ marginTop: 24, fontSize: 30, color: SOFT, maxWidth: 900, display: "flex", fontFamily: "monospace" }}>
          REAL SYSTEMS. REAL RESULTS. — Phoenix, AZ.
        </div>
      </div>
    ),
    { ...size },
  );
}
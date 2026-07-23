import { ImageResponse } from "next/og";

export const alt = "Jaden Raats — AI for business owners, proven in a real business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Token values mirrored from globals.css (no raw hex — design law)
const CREAM = "rgb(244, 239, 230)";
const INK = "rgb(30, 27, 21)";
const SOFT = "rgb(108, 100, 87)";
const ACCENT = "rgb(191, 87, 49)";

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
          background: CREAM,
          color: INK,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 150, fontWeight: 500, letterSpacing: "-0.04em", display: "flex" }}>
          jaden raats<span style={{ color: ACCENT }}>*</span>
        </div>
        <div style={{ marginTop: 28, fontSize: 36, color: SOFT, maxWidth: 900, display: "flex" }}>
          AI for business owners — proven in a real business. Phoenix, AZ.
        </div>
      </div>
    ),
    { ...size },
  );
}

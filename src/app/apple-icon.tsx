import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Token values mirrored from globals.css (no raw hex — design law)
const INK = "rgb(30, 27, 21)";
const ACCENT = "rgb(191, 87, 49)";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: INK,
        }}
      >
        <svg width="118" height="118" viewBox="0 0 32 32">
          <g stroke={ACCENT} strokeWidth="3.6" strokeLinecap="round">
            <line x1="16" y1="7.5" x2="16" y2="24.5" />
            <line x1="23.36" y1="11.75" x2="8.64" y2="20.25" />
            <line x1="23.36" y1="20.25" x2="8.64" y2="11.75" />
          </g>
        </svg>
      </div>
    ),
    { ...size },
  );
}

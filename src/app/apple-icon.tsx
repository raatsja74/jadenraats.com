import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Token values mirrored from globals.css (no raw hex — design law)
const INK = "rgb(10, 10, 9)";
const PAPER = "rgb(242, 239, 230)";

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
        <svg width="118" height="118" viewBox="0 0 48 48">
          <g stroke={PAPER} strokeWidth="5" strokeLinecap="square">
            <line x1="24" y1="4" x2="24" y2="44" />
            <line x1="41.32" y1="14" x2="6.68" y2="34" />
            <line x1="6.68" y1="14" x2="41.32" y2="34" />
          </g>
        </svg>
      </div>
    ),
    { ...size },
  );
}
